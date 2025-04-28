import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/database.types"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

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
  return NextResponse.redirect(requestUrl.origin + "/dashboard")
}
