import { NextResponse } from "next/server"
import { google } from "googleapis"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const state = url.searchParams.get("state")

    if (!state) {
      // Generate a new OAuth URL
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      )

      const scopes = [
        "https://www.googleapis.com/auth/webmasters.readonly",
        "https://www.googleapis.com/auth/webmasters",
      ]

      const supabase = createServerSupabaseClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      // Store the user ID in the state parameter
      const stateParam = Buffer.from(
        JSON.stringify({
          userId: session.user.id,
          timestamp: Date.now(),
        }),
      ).toString("base64")

      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        prompt: "consent", // Force to get refresh_token
        state: stateParam,
      })

      return NextResponse.redirect(authUrl)
    }

    // This is a callback from Google OAuth
    return NextResponse.redirect(new URL("/api/auth/google-search-console/callback", req.url))
  } catch (error) {
    console.error("Error in Google Search Console auth:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
