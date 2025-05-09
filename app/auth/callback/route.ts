import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"
import { getSiteUrl } from "@/lib/get-site-url"

// At the top of the file, add this code to handle localhost redirects

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")

  // Check if we're on localhost but should be on production
  if (requestUrl.hostname === "localhost" || requestUrl.hostname === "127.0.0.1") {
    // Redirect to production with the same parameters
    const productionUrl = new URL("https://lamontai.vercel.app/auth/callback")

    // Copy all search parameters
    requestUrl.searchParams.forEach((value, key) => {
      productionUrl.searchParams.set(key, value)
    })

    return NextResponse.redirect(productionUrl)
  }

  // Rest of your existing code...
  const next = requestUrl.searchParams.get("next") || "/login"
  const siteUrl = getSiteUrl()

  // Handle email verification
  if (requestUrl.searchParams.get("type") === "email_change" || requestUrl.searchParams.get("type") === "signup") {
    // Redirect to login with email_verified flag
    const redirectUrl = new URL("/login", siteUrl)
    redirectUrl.searchParams.set("email_verified", "true")
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Check if user exists in our users table
      const { data: existingUser } = await supabase.from("users").select().eq("id", user.id).single()

      if (!existingUser) {
        // Create user record
        await supabase.from("users").insert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata.full_name || null,
          avatar_url: user.user_metadata.avatar_url || null,
        })

        // Create default organization
        const { data: organization } = await supabase
          .from("organizations")
          .insert({
            name: user.user_metadata.full_name ? `${user.user_metadata.full_name}'s Organization` : "My Organization",
          })
          .select()
          .single()

        if (organization) {
          // Link user to organization
          await supabase.from("organization_users").insert({
            organization_id: organization.id,
            user_id: user.id,
            role: "owner",
          })

          // Create default settings
          await supabase.from("settings").insert({
            organization_id: organization.id,
            include_youtube_videos: true,
            include_website_screenshots: true,
            include_citations: true,
            include_json_ld: false,
            english_variant: "American",
          })

          // Create default subscription
          await supabase.from("subscriptions").insert({
            organization_id: organization.id,
            plan: "free",
            status: "active",
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, siteUrl))
}
