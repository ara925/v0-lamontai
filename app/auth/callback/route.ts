import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")
  const error_description = requestUrl.searchParams.get("error_description")

  // If there's an error, redirect to login with error params
  if (error) {
    const redirectUrl = new URL("/login", requestUrl.origin)
    redirectUrl.searchParams.set("error", error)
    redirectUrl.searchParams.set("error_description", error_description || "")
    redirectUrl.searchParams.set("tab", "login") // Set tab to login
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    try {
      // Exchange code for session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        const redirectUrl = new URL("/login", requestUrl.origin)
        redirectUrl.searchParams.set("error", "auth_error")
        redirectUrl.searchParams.set("error_description", error.message)
        redirectUrl.searchParams.set("tab", "login")
        return NextResponse.redirect(redirectUrl)
      }

      // Check if this is a signup confirmation
      if (data.user && data.user.email_confirmed_at) {
        // Create user record if it doesn't exist
        const { data: existingUser } = await supabase.from("users").select().eq("id", data.user.id).single()

        if (!existingUser) {
          console.log("Creating new user record for:", data.user.email)

          // Create user record
          await supabase.from("users").insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: data.user.user_metadata.full_name || null,
            avatar_url: data.user.user_metadata.avatar_url || null,
          })

          // Create default organization
          const { data: organization } = await supabase
            .from("organizations")
            .insert({
              name: data.user.user_metadata.full_name
                ? `${data.user.user_metadata.full_name}'s Organization`
                : "My Organization",
              onboarding_completed: false,
            })
            .select()
            .single()

          if (organization) {
            console.log("Created organization:", organization.id)

            // Link user to organization
            await supabase.from("organization_users").insert({
              organization_id: organization.id,
              user_id: data.user.id,
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

        // Sign out the user - we want them to explicitly log in after email verification
        await supabase.auth.signOut()

        // Redirect to login page with email_verified=true
        const loginUrl = new URL("/login", requestUrl.origin)
        loginUrl.searchParams.set("email_verified", "true")
        loginUrl.searchParams.set("tab", "login")
        return NextResponse.redirect(loginUrl)
      }
    } catch (err) {
      console.error("Exception during code exchange:", err)
      const redirectUrl = new URL("/login", requestUrl.origin)
      redirectUrl.searchParams.set("error", "server_error")
      redirectUrl.searchParams.set("error_description", "An unexpected error occurred")
      redirectUrl.searchParams.set("tab", "login")
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Default redirect to login
  return NextResponse.redirect(new URL("/login", requestUrl.origin))
}
