import { JSDOM } from "jsdom"

export interface WebsiteAnalysisResult {
  title: string
  description: string
  keywords: string[]
  language: string
  headings: {
    h1: string[]
    h2: string[]
    h3: string[]
  }
  links: string[]
  wordCount: number
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysisResult> {
  try {
    // Fetch the website content
    const response = await fetch(url)
    const html = await response.text()

    // Parse the HTML
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract metadata
    const title = document.querySelector("title")?.textContent || ""
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || ""
    const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content") || ""
    const language = document.documentElement.getAttribute("lang") || "en"

    // Extract headings
    const h1Elements = Array.from(document.querySelectorAll("h1")).map((el) => el.textContent?.trim() || "")
    const h2Elements = Array.from(document.querySelectorAll("h2")).map((el) => el.textContent?.trim() || "")
    const h3Elements = Array.from(document.querySelectorAll("h3")).map((el) => el.textContent?.trim() || "")

    // Extract links
    const links = Array.from(document.querySelectorAll("a[href]"))
      .map((el) => el.getAttribute("href") || "")
      .filter((href) => href && !href.startsWith("#") && !href.startsWith("javascript:"))

    // Count words in the body
    const bodyText = document.body.textContent || ""
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length

    // Extract keywords from meta tag
    const keywordsArray = metaKeywords
      ? metaKeywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      : []

    return {
      title,
      description: metaDescription,
      keywords: keywordsArray,
      language,
      headings: {
        h1: h1Elements,
        h2: h2Elements,
        h3: h3Elements,
      },
      links,
      wordCount,
    }
  } catch (error) {
    console.error("Error analyzing website:", error)
    throw new Error("Failed to analyze website")
  }
}
