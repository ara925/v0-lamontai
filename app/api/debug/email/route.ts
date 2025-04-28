import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get the authenticated user
    const supabase = createRouteHandlerClient({ cookies })

    // Get the site URL for redirect
    const requestUrl = new URL(req.url)
    const siteUrl = `${requestUrl.protocol}//${requestUrl.host}`

    console.log("Debug email test to:", email)
    console.log("Using redirect URL:", `${siteUrl}/auth/callback`)

    // Try to send a test email
    const { error, data } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    })

    if (error) {
      console.error("Error sending test email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Test email sent",
      debug: {
        email,
        redirectUrl: `${siteUrl}/auth/callback`,
        response: data,
      },
    })
  } catch (error: any) {
    console.error("Error in debug email endpoint:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
