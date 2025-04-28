import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  // Check if Stripe is configured
  if (!stripe) {
    return NextResponse.json({ error: "Stripe integration is not configured" }, { status: 503 })
  }

  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing stripe-signature or webhook secret" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  const supabase = createServerSupabaseClient()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any
        const organizationId = session.metadata.organization_id
        const plan = session.metadata.plan
        const subscriptionId = session.subscription

        // Get the subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        // Create or update the subscription in the database
        const { error } = await supabase.from("subscriptions").upsert({
          organization_id: organizationId,
          plan,
          status: subscription.status,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
        })

        if (error) {
          console.error("Error creating subscription:", error)
          return NextResponse.json({ error: "Error creating subscription" }, { status: 500 })
        }

        break
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as any
        const organizationId = subscription.metadata.organization_id

        // Update the subscription in the database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("stripe_subscription_id", subscription.id)

        if (error) {
          console.error("Error updating subscription:", error)
          return NextResponse.json({ error: "Error updating subscription" }, { status: 500 })
        }

        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as any

        // Update the subscription in the database
        const { error } = await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
          })
          .eq("stripe_subscription_id", subscription.id)

        if (error) {
          console.error("Error canceling subscription:", error)
          return NextResponse.json({ error: "Error canceling subscription" }, { status: 500 })
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: `Webhook handler failed: ${error.message}` }, { status: 500 })
  }
}
