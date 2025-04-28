import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    let websiteUrl: string
    try {
      const urlObj = new URL(url)
      websiteUrl = urlObj.origin
    } catch (error) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Get the authenticated user
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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

    // Check if the URL already exists for this organization
    const { data: existingWebsite } = await supabase
      .from("websites")
      .select("id")
      .eq("url", websiteUrl)
      .eq("organization_id", orgUser.organization_id)
      .single()

    if (existingWebsite) {
      return NextResponse.json(
        {
          error: "This website URL has already been submitted",
          duplicate: true,
        },
        { status: 409 },
      )
    }

    // Store the website URL
    await supabase.from("websites").insert({
      url: websiteUrl,
      organization_id: orgUser.organization_id,
    })

    // Fetch the website to check if it exists and get metadata
    try {
      const response = await fetch(websiteUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Lamont.ai Website Analyzer",
        },
      })

      if (!response.ok) {
        return NextResponse.json({ error: "Website not found or not accessible" }, { status: 404 })
      }

      const html = await response.text()

      // Extract title
      const titleMatch = html.match(/<title>(.*?)<\/title>/i)
      const title = titleMatch ? titleMatch[1] : ""

      // Extract meta description
      const descriptionMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i)
      const description = descriptionMatch ? descriptionMatch[1] : ""

      // Extract meta keywords
      const keywordsMatch = html.match(/<meta\s+name="keywords"\s+content="(.*?)"/i)
      const keywordsStr = keywordsMatch ? keywordsMatch[1] : ""
      const keywords = keywordsStr ? keywordsStr.split(",").map((k) => k.trim()) : []

      return NextResponse.json({
        success: true,
        data: {
          url: websiteUrl,
          title,
          description,
          keywords,
        },
      })
    } catch (error) {
      console.error("Error analyzing website:", error)
      return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
