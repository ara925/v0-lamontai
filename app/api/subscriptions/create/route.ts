import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { STRIPE_PLANS } from "@/lib/stripe"

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

    // Get the plan from the request body
    const { plan } = await req.json()

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

    // Check if the organization already has a subscription
    const { data: existingSubscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("organization_id", orgUser.organization_id)
      .single()

    if (existingSubscription) {
      return NextResponse.json({ error: "Organization already has a subscription" }, { status: 400 })
    }

    // Calculate period dates
    const now = new Date()
    const currentPeriodStart = now.toISOString()
    const currentPeriodEnd = new Date(now.setMonth(now.getMonth() + 1)).toISOString()

    // Create the subscription in the database
    const { error } = await supabase.from("subscriptions").insert({
      organization_id: orgUser.organization_id,
      plan,
      status: "active",
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: false,
    })

    if (error) {
      console.error("Error creating subscription:", error)
      return NextResponse.json({ error: "Error creating subscription" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Subscription created successfully",
    })
  } catch (error: any) {
    console.error("Create subscription error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
