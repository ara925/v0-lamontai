export interface KeywordData {
  keyword: string
  difficulty: number
  searchVolume: number
  source: "competitor" | "website" | "manual"
}

export interface CompetitorKeywordResult {
  domain: string
  keywords: KeywordData[]
}

// In a real implementation, this would connect to a keyword research API
// For now, we'll simulate keyword data
export async function analyzeKeywords(domain: string): Promise<KeywordData[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate some random keyword data based on the domain
  const baseKeywords = [
    "seo",
    "marketing",
    "content",
    "strategy",
    "analytics",
    "social media",
    "advertising",
    "branding",
    "email marketing",
    "conversion rate",
  ]

  const domainPrefix = domain.split(".")[0].toLowerCase()

  return baseKeywords.map((keyword) => ({
    keyword: `${domainPrefix} ${keyword}`,
    difficulty: Math.floor(Math.random() * 100),
    searchVolume: Math.floor(Math.random() * 10000),
    source: "competitor" as const,
  }))
}

export async function getCompetitorKeywords(domains: string[]): Promise<CompetitorKeywordResult[]> {
  const results: CompetitorKeywordResult[] = []

  for (const domain of domains) {
    const keywords = await analyzeKeywords(domain)
    results.push({
      domain,
      keywords,
    })
  }

  return results
}

export function findKeywordGaps(
  ownKeywords: KeywordData[],
  competitorKeywords: CompetitorKeywordResult[],
): KeywordData[] {
  // Extract all competitor keywords
  const allCompetitorKeywords = competitorKeywords.flatMap((result) => result.keywords)

  // Get unique keywords
  const uniqueKeywords = new Map<string, KeywordData>()

  for (const keyword of allCompetitorKeywords) {
    if (!uniqueKeywords.has(keyword.keyword)) {
      uniqueKeywords.set(keyword.keyword, keyword)
    }
  }

  // Filter out keywords that we already have
  const ownKeywordSet = new Set(ownKeywords.map((k) => k.keyword))
  const gaps: KeywordData[] = []

  for (const [keyword, data] of uniqueKeywords.entries()) {
    if (!ownKeywordSet.has(keyword)) {
      gaps.push(data)
    }
  }

  // Sort by search volume (highest first)
  return gaps.sort((a, b) => b.searchVolume - a.searchVolume)
}
