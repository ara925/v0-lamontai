"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { useOnboarding } from "./onboarding-context"
import { useToast } from "@/components/ui/use-toast"

export function SitemapStep() {
  const { data, updateData, setCurrentStep, isLoading, setIsLoading } = useOnboarding()
  const [sitemapUrl, setSitemapUrl] = useState(data.sitemapUrl)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const isValidUrl = (url: string) => {
    if (!url) return true // Empty is valid (optional)
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleContinue = async () => {
    // If empty, skip processing but save the empty value
    if (!sitemapUrl) {
      updateData({ sitemapUrl: "" })
      setCurrentStep(4)
      return
    }

    // Add http:// if missing
    let formattedUrl = sitemapUrl
    if (!sitemapUrl.startsWith("http://") && !sitemapUrl.startsWith("https://")) {
      formattedUrl = `https://${sitemapUrl}`
    }

    if (!isValidUrl(formattedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid sitemap URL or leave it empty",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setIsLoading(true)

    try {
      // Simulate sitemap processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, we would call an API to process the sitemap
      // const response = await fetch("/api/process-sitemap", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ url: formattedUrl })
      // })
      // const data = await response.json()

      updateData({ sitemapUrl: formattedUrl })
      setCurrentStep(4)
    } catch (error) {
      toast({
        title: "Error processing sitemap",
        description: "There was an error processing your sitemap. Please try again or skip this step.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setIsLoading(false)
    }
  }

  const handleSkip = () => {
    updateData({ sitemapUrl: "" })
    setCurrentStep(4)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white px-2 py-1 text-sm font-medium">Step 3</div>
      </div>

      <h2 className="text-3xl font-bold">Input your Sitemap URL (Optional)</h2>
      <p className="text-gray-600">This helps us add relevant internal links to articles.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Sitemap helps us add relevant internal links to articles</li>
          <li>Sitemap helps us analyze your previous articles to match your writing style</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="https://example.com/sitemap.xml"
          value={sitemapUrl}
          onChange={(e) => setSitemapUrl(e.target.value)}
          className="text-base"
          disabled={isProcessing}
        />
      </div>

      <Button onClick={handleContinue} className="bg-black hover:bg-gray-800 text-white w-full" disabled={isProcessing}>
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
