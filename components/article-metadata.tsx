"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ArticleMetadataProps {
  articleId: string
  initialData?: {
    country: string
    title: string
    keywordCount: number
    keywordDifficulty: number
    targetedKeyword: string
    searchVolume: number
    metaDescription: string
    slug: string
  }
}

export function ArticleMetadata({
  articleId,
  initialData = {
    country: "US",
    title: "Boost Your Online Presence with PPC and SEO Services",
    keywordCount: 2,
    keywordDifficulty: 1,
    targetedKeyword: "ppc and seo services",
    searchVolume: 110,
    metaDescription:
      "Scale your business with expert PPC and SEO services. Our proven strategies drive traffic, boost leads, and increase revenue—see measurable results today.",
    slug: "ppc-and-seo-services",
  },
}: ArticleMetadataProps) {
  const [data, setData] = useState(initialData)
  const { toast } = useToast()

  const handleChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  return (
    <div className="w-full max-w-xs space-y-6 border-l border-gray-200 bg-white p-4">
      <div className="space-y-1.5">
        <div className="flex items-center">
          <Label className="text-xs font-semibold uppercase text-gray-500">COUNTRY</Label>
        </div>
        <div className="flex items-center gap-2">
          <img src="/waving-us-flag.png" alt="US Flag" className="h-6 w-6 rounded-full" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">TITLE</Label>
        <Textarea
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">NUMBER OF KEYWORDS:</Label>
        <Input
          type="number"
          value={data.keywordCount}
          onChange={(e) => handleChange("keywordCount", Number.parseInt(e.target.value))}
          min={1}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">KEYWORD DIFFICULTY:</Label>
        <Input
          type="number"
          value={data.keywordDifficulty}
          onChange={(e) => handleChange("keywordDifficulty", Number.parseInt(e.target.value))}
          min={1}
          max={100}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">TARGETED KEYWORD:</Label>
        <Input value={data.targetedKeyword} onChange={(e) => handleChange("targetedKeyword", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">SEARCH VOLUME:</Label>
        <Input
          type="number"
          value={data.searchVolume}
          onChange={(e) => handleChange("searchVolume", Number.parseInt(e.target.value))}
          min={0}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">META DESCRIPTION:</Label>
        <div className="relative">
          <Textarea
            value={data.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            className="resize-none pr-8"
            rows={4}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-blue-600"
            onClick={() => copyToClipboard(data.metaDescription)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold uppercase text-gray-500">SLUG:</Label>
        <Input value={data.slug} onChange={(e) => handleChange("slug", e.target.value)} />
      </div>

      <div className="pt-4">
        <Button className="w-full bg-orange-500 hover:bg-orange-600">Create First Integration</Button>
      </div>

      <div className="pt-2">
        <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
          Download All
        </Button>
      </div>
    </div>
  )
}
