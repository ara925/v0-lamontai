import { NextResponse } from "next/server"
import { google } from "googleapis"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")
    const stateParam = url.searchParams.get("state")

    if (!code || !stateParam) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    // Decode the state parameter
    let state
    try {
      state = JSON.parse(Buffer.from(stateParam, "base64").toString())
    } catch (error) {
      return NextResponse.json({ error: "Invalid state parameter" }, { status: 400 })
    }

    const { userId, timestamp } = state

    // Check if the state is expired (10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return NextResponse.json({ error: "State expired" }, { status: 400 })
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code)

    if (!tokens.refresh_token) {
      return NextResponse.json({ error: "No refresh token received" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Get the user's organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id")
      .eq("user_id", userId)
      .single()

    if (!orgUser) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Store the tokens in the database
    await supabase.from("integrations").upsert({
      organization_id: orgUser.organization_id,
      type: "google_search_console",
      credentials: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    // Update the organization's GSC connection status
    await supabase
      .from("organizations")
      .update({
        gsc_connected: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orgUser.organization_id)

    // Redirect back to the onboarding page or dashboard
    if (url.searchParams.get("onboarding") === "true") {
      return NextResponse.redirect(new URL("/onboarding?step=5", req.url))
    } else {
      return NextResponse.redirect(new URL("/dashboard/settings?tab=integrations&success=gsc", req.url))
    }
  } catch (error) {
    console.error("Error in Google Search Console callback:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
