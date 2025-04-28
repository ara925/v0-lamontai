import { type NextRequest, NextResponse } from "next/server"
import { stripe, STRIPE_PLANS } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        {
          error: "Payment processing is not configured. Please contact support.",
          message: "Stripe integration is currently disabled. Please try again later or contact support.",
        },
        { status: 503 },
      )
    }

    // Get the current user
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the plan from the request body
    const { plan, successUrl, cancelUrl } = await req.json()

    if (!plan || !Object.keys(STRIPE_PLANS).includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Get the user's organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id")
      .eq("user_id", session.user.id)
      .single()

    if (!orgUser) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Get the organization
    const { data: organization } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", orgUser.organization_id)
      .single()

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Check if the organization already has a subscription
    const { data: existingSubscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", orgUser.organization_id)
      .single()

    // Create or update the customer in Stripe
    let customerId = existingSubscription?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: organization.name,
        metadata: {
          organization_id: orgUser.organization_id,
          user_id: session.user.id,
        },
      })
      customerId = customer.id
    }

    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PLANS[plan as keyof typeof STRIPE_PLANS].id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
      subscription_data: {
        metadata: {
          organization_id: orgUser.organization_id,
          user_id: session.user.id,
        },
        trial_period_days: 4, // 4-day free trial
      },
      metadata: {
        organization_id: orgUser.organization_id,
        user_id: session.user.id,
        plan,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
