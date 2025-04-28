import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { niche, organizationId } = await req.json()

    if (!niche || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate topic suggestions using AI
    const prompt = `
      Generate 10 SEO-optimized blog post topic ideas for a business in the "${niche}" niche.
      
      For each topic, provide:
      1. The main keyword/topic
      2. Estimated keyword difficulty (1-100)
      3. Estimated monthly search volume
      4. Source (competitor, website, or manual)
      
      Format the response as a JSON array with objects containing these properties:
      [
        {
          "topic": "string",
          "keywordDifficulty": number,
          "searchVolume": number,
          "source": "string"
        }
      ]
    `

    const { text: topicsJson } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
    })

    // Parse the JSON response
    const topics = JSON.parse(topicsJson)

    // Store topics in database
    const supabase = createServerSupabaseClient()

    const keywordsToInsert = topics.map((topic: any) => ({
      organization_id: organizationId,
      keyword: topic.topic,
      difficulty: topic.keywordDifficulty,
      search_volume: topic.searchVolume,
      source: topic.source.toLowerCase(),
    }))

    const { data, error } = await supabase.from("keywords").insert(keywordsToInsert).select()

    if (error) {
      return NextResponse.json({ error: "Failed to store topics" }, { status: 500 })
    }

    return NextResponse.json({ topics: data })
  } catch (error) {
    console.error("Error generating topics:", error)
    return NextResponse.json({ error: "Failed to generate topics" }, { status: 500 })
  }
}
