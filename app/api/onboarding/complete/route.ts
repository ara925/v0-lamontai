import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient()

    const { websiteUrl, competitors, sitemapUrl, gscConnected, languages, plan } = await req.json()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user's organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (!orgUser) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Update the organization with the onboarding data
    const { error } = await supabase
      .from("organizations")
      .update({
        website_url: websiteUrl,
        sitemap_url: sitemapUrl,
        gsc_connected: gscConnected,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orgUser.organization_id)

    if (error) {
      throw error
    }

    // Store competitors
    for (const competitor of competitors) {
      await supabase.from("competitors").upsert({
        organization_id: orgUser.organization_id,
        domain: competitor,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    // Update subscription plan
    await supabase
      .from("subscriptions")
      .update({
        plan,
        updated_at: new Date().toISOString(),
      })
      .eq("organization_id", orgUser.organization_id)

    // Update language preferences
    const languageEntries = Object.entries(languages).filter(([_, enabled]) => enabled)

    for (const [language, _] of languageEntries) {
      await supabase.from("organization_languages").upsert({
        organization_id: orgUser.organization_id,
        language_code: language,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 })
  }
}
