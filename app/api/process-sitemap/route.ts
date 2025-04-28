import { NextResponse } from "next/server"
import { XMLParser } from "fast-xml-parser"

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Validate URL format
    let sitemapUrl: string
    try {
      const urlObj = new URL(url)
      sitemapUrl = urlObj.href
    } catch (error) {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    try {
      // Fetch the sitemap
      const response = await fetch(sitemapUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Lamont.ai Sitemap Processor",
        },
      })

      if (!response.ok) {
        return NextResponse.json({ error: "Sitemap not found or not accessible" }, { status: 404 })
      }

      const xml = await response.text()

      // Parse the XML
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
      })

      const result = parser.parse(xml)

      // Extract URLs from sitemap
      let urls: string[] = []

      if (result.urlset && result.urlset.url) {
        // Standard sitemap
        const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url]
        urls = urlEntries.map((entry: any) => entry.loc)
      } else if (result.sitemapindex && result.sitemapindex.sitemap) {
        // Sitemap index
        const sitemapEntries = Array.isArray(result.sitemapindex.sitemap)
          ? result.sitemapindex.sitemap
          : [result.sitemapindex.sitemap]

        urls = sitemapEntries.map((entry: any) => entry.loc)
        return NextResponse.json({
          success: true,
          data: {
            type: "sitemapindex",
            sitemapCount: urls.length,
            sitemaps: urls,
          },
        })
      } else {
        return NextResponse.json({ error: "Invalid sitemap format" }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        data: {
          type: "urlset",
          urlCount: urls.length,
          urls: urls.slice(0, 100), // Return first 100 URLs to avoid response size issues
        },
      })
    } catch (error) {
      console.error("Error processing sitemap:", error)
      return NextResponse.json({ error: "Failed to process sitemap" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
