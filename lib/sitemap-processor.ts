import { XMLParser } from "fast-xml-parser"

export interface SitemapProcessingResult {
  urls: string[]
  lastModified: Record<string, string>
}

export async function processSitemap(url: string): Promise<SitemapProcessingResult> {
  try {
    // Fetch the sitemap XML
    const response = await fetch(url)
    const xml = await response.text()

    // Parse the XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    })
    const result = parser.parse(xml)

    // Extract URLs from sitemap
    const urls: string[] = []
    const lastModified: Record<string, string> = {}

    // Handle standard sitemap format
    if (result.urlset && result.urlset.url) {
      const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url]

      for (const entry of urlEntries) {
        if (entry.loc) {
          urls.push(entry.loc)
          if (entry.lastmod) {
            lastModified[entry.loc] = entry.lastmod
          }
        }
      }
    }

    // Handle sitemap index format
    if (result.sitemapindex && result.sitemapindex.sitemap) {
      const sitemapEntries = Array.isArray(result.sitemapindex.sitemap)
        ? result.sitemapindex.sitemap
        : [result.sitemapindex.sitemap]

      for (const entry of sitemapEntries) {
        if (entry.loc) {
          // Recursively process each sitemap
          const subResult = await processSitemap(entry.loc)
          urls.push(...subResult.urls)
          Object.assign(lastModified, subResult.lastModified)
        }
      }
    }

    return {
      urls,
      lastModified,
    }
  } catch (error) {
    console.error("Error processing sitemap:", error)
    throw new Error("Failed to process sitemap")
  }
}
