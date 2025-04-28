import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user's organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id, role")
      .eq("user_id", session.user.id)
      .single()

    if (!orgUser) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Check if the user is an admin
    if (orgUser.role !== "admin" && orgUser.role !== "owner") {
      return NextResponse.json({ error: "Only admins can reactivate subscriptions" }, { status: 403 })
    }

    // Get the organization's subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", orgUser.organization_id)
      .single()

    if (!subscription) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    if (!subscription.cancel_at_period_end) {
      return NextResponse.json({ error: "Subscription is not scheduled for cancellation" }, { status: 400 })
    }

    // If Stripe is configured and we have a Stripe subscription ID, reactivate it in Stripe
    if (stripe && subscription.stripe_subscription_id) {
      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        cancel_at_period_end: false,
      })
    }

    // Update the subscription in the database
    const { error } = await supabase
      .from("subscriptions")
      .update({
        cancel_at_period_end: false,
      })
      .eq("organization_id", orgUser.organization_id)

    if (error) {
      console.error("Error reactivating subscription:", error)
      return NextResponse.json({ error: "Error reactivating subscription" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Subscription has been reactivated",
    })
  } catch (error: any) {
    console.error("Reactivate subscription error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
