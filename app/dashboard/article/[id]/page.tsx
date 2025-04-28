"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArticleEditor({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("Boost Your Online Presence with PPC and SEO Services")
  const [content, setContent] = useState(`
The digital marketing arena is evolving rapidly, with recent studies showing that businesses effectively integrating PPC and SEO see up to 113% more organic conversions. But here's the kicker—many still treat these two powerful strategies as separate entities. The truth is, combining PPC with SEO not only amplifies your visibility but fortifies your overall online presence. This unexpected synergy can redefine how customers interact with your brand, leading to remarkable growth opportunities.

The most successful digital marketing strategies recognize that PPC and SEO services aren't competing approaches but complementary tools in your marketing arsenal. When strategically implemented together, they create a comprehensive search presence that captures both immediate opportunities and long-term market position.

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

### Enhanced SERP Visibility and Brand Dominance

One of the most immediate benefits of combining PPC and SEO services is dominating search engine results pages. When your business appears in both paid and organic listings for the same search query, you effectively double your visibility. This dual presence creates what marketers call the "second impression" effect, where users subconsciously register your brand as more established and trustworthy.

This enhanced visibility directly translates to improved click-through rates. According to research from Seer Interactive, businesses that appear in both paid and organic results see a 25% higher click-through rate compared to those appearing in just one section of the SERP. The combined approach creates multiple entry points to your website, increasing the likelihood that users will choose your business over competitors.
  `)

  const [metadata, setMetadata] = useState({
    country: "US",
    keywords: 2,
    keywordDifficulty: 1,
    targetedKeyword: "ppc and seo services",
    searchVolume: 110,
    metaDescription:
      "Scale your business with expert PPC and SEO services. Our proven strategies drive traffic, boost leads, and increase revenue—see measurable results today.",
  })

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Article</h1>
          <Button className="ml-auto bg-blue-500 hover:bg-blue-600">Save</Button>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                <Image src="/waving-us-flag.png" alt="US" width={24} height={16} className="rounded-sm" />
                <Image src="/german-tricolor.png" alt="DE" width={24} height={16} className="rounded-sm" />
                <Image src="/tricolor-flag-fluttering.png" alt="FR" width={24} height={16} className="rounded-sm" />
                <Image src="/spanish-flag-waving.png" alt="ES" width={24} height={16} className="rounded-sm" />
              </div>
            </div>

            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold border-none shadow-none focus-visible:ring-0 px-0 text-black"
                placeholder="Article Title"
              />
            </div>

            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[600px] border-none shadow-none focus-visible:ring-0 px-0 text-black resize-none"
                  placeholder="Article content..."
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="prose max-w-none">
                  <h1>{title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="relative h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <Image
                src="/marketing-brainstorm.png"
                alt="Article featured image"
                width={600}
                height={300}
                className="rounded-lg object-cover"
              />
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">Article Metadata</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">COUNTRY</label>
                <div className="flex items-center gap-2">
                  <Image src="/waving-us-flag.png" alt="US" width={24} height={16} className="rounded-sm" />
                  <span className="text-sm">{metadata.country}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">TITLE</label>
                <div className="text-sm">{title}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">NUMBER OF KEYWORDS</label>
                <div className="text-sm">{metadata.keywords}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">KEYWORD DIFFICULTY</label>
                <div className="text-sm">{metadata.keywordDifficulty}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">TARGETED KEYWORD</label>
                <div className="text-sm">{metadata.targetedKeyword}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">SEARCH VOLUME</label>
                <div className="text-sm">{metadata.searchVolume}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">META DESCRIPTION</label>
                <Textarea
                  value={metadata.metaDescription}
                  onChange={(e) => setMetadata({ ...metadata, metaDescription: e.target.value })}
                  className="text-sm resize-none h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase">SLUG</label>
                <Input value="ppc-and-seo-services" className="text-sm" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
