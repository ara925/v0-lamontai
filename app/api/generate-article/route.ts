import { NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

export async function POST(req: Request) {
  try {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { keyword, language, organizationId } = await req.json()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user belongs to the organization
    const { data: orgUser } = await supabase
      .from("organization_users")
      .select("*")
      .eq("user_id", user.id)
      .eq("organization_id", organizationId)
      .single()

    if (!orgUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, we would call an AI service to generate the article
    // For now, we'll create a dummy article

    // Generate article content based on the keyword
    const title = `Boost Your Online Presence with ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}`
    const content = `
The digital marketing arena is evolving rapidly, with recent studies showing that businesses effectively integrating PPC and SEO see up to 113% more organic conversions. But here's the kicker—many still treat these two powerful strategies as separate entities. The truth is, combining PPC with SEO not only amplifies your visibility but fortifies your overall online presence. This unexpected synergy can redefine how customers interact with your brand, leading to remarkable growth opportunities.

## Key Takeaways

| Takeaway | Explanation |
| --- | --- |
| Integrate PPC and SEO for Maximum Impact | Combining PPC and SEO strategies enhances visibility, creating multiple touchpoints with potential customers and reinforcing brand trust. |
| Leverage Keyword Intelligence Across Channels | Use PPC data to identify high-converting keywords for SEO optimization, while organic search performance can inform PPC bidding strategies. |
| Optimize Landing Pages for Both Channels | Develop landing pages that incorporate both SEO best practices and PPC conversion elements to maximize performance across both strategies. |
| Utilize Integrated Analytics for Better Insights | Implement comprehensive tracking to understand customer journeys and develop sophisticated attribution models that account for both PPC and SEO contributions. |
| Stay Agile Against Market Changes | Monitor algorithm updates and ensure collaboration between PPC and SEO teams to adapt strategies and maintain a competitive edge. |

## Benefits of Integrated PPC and SEO

While PPC and SEO can work effectively as standalone strategies, their true power emerges when they're integrated into a cohesive digital marketing approach. Businesses that coordinate their PPC and SEO efforts experience several substantial advantages that can significantly impact their bottom line.
`

    // Insert the article into the database
    const { data: article, error } = await supabase
      .from("articles")
      .insert({
        title,
        content,
        organization_id: organizationId,
        language,
        keyword,
        seo_score: 92,
        keyword_count: 2,
        search_volume: 1410,
        meta_description: `Scale your business with expert ${keyword} strategies. Our proven approach drives traffic, boosts leads, and increases revenue—see measurable results today.`,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating article:", error)
      return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Error generating article:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
