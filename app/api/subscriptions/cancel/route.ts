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
      return NextResponse.json({ error: "Only admins can cancel subscriptions" }, { status: 403 })
    }

    // Get the organization's subscription
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", orgUser.organization_id)
      .single()

    if (!subscription) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 })
    }

    // If Stripe is configured and we have a Stripe subscription ID, cancel it in Stripe
    if (stripe && subscription.stripe_subscription_id) {
      await stripe.subscriptions.update(subscription.stripe_subscription_id, {
        cancel_at_period_end: true,
      })
    }

    // Update the subscription in the database
    const { error } = await supabase
      .from("subscriptions")
      .update({
        cancel_at_period_end: true,
      })
      .eq("organization_id", orgUser.organization_id)

    if (error) {
      console.error("Error canceling subscription:", error)
      return NextResponse.json({ error: "Error canceling subscription" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Subscription will be canceled at the end of the billing period",
    })
  } catch (error: any) {
    console.error("Cancel subscription error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
