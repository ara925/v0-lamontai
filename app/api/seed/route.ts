import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const supabase = createServerSupabaseClient()

    // Seed languages
    await supabase.from("languages").upsert([
      {
        name: "English",
        code: "en",
        flag_url: "/flags/en.png",
        audience_size: 1500000000,
      },
      {
        name: "Spanish",
        code: "es",
        flag_url: "/flags/es.png",
        audience_size: 475000000,
      },
      {
        name: "French",
        code: "fr",
        flag_url: "/flags/fr.png",
        audience_size: 330000000,
      },
      {
        name: "German",
        code: "de",
        flag_url: "/flags/de.png",
        audience_size: 130000000,
      },
    ])

    // Seed sample keywords
    const { data: organization } = await supabase.from("organizations").select("id").limit(1).single()

    if (organization) {
      await supabase.from("keywords").upsert([
        {
          organization_id: organization.id,
          keyword: "seo competitors analysis",
          difficulty: 17,
          search_volume: 720,
          source: "competitor",
        },
        {
          organization_id: organization.id,
          keyword: "seo for education",
          difficulty: 2,
          search_volume: 170,
          source: "competitor",
        },
        {
          organization_id: organization.id,
          keyword: "lead nurturing tactics",
          difficulty: 8,
          search_volume: 50,
          source: "website",
        },
        {
          organization_id: organization.id,
          keyword: "business growth strategies",
          difficulty: 11,
          search_volume: 5400,
          source: "website",
        },
        {
          organization_id: organization.id,
          keyword: "email marketing strategies",
          difficulty: 15,
          search_volume: 880,
          source: "website",
        },
        {
          organization_id: organization.id,
          keyword: "what is content marketing",
          difficulty: 34,
          search_volume: 12100,
          source: "website",
        },
      ])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
