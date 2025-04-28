"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { useOnboarding } from "./onboarding-context"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WebsiteStep() {
  const { data, updateData, setCurrentStep, isLoading, setIsLoading } = useOnboarding()
  const [url, setUrl] = useState(data.websiteUrl)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleContinue = async () => {
    if (!url) {
      setError("Website URL is required")
      return
    }

    // Add http:// if missing
    let formattedUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`
    }

    if (!isValidUrl(formattedUrl)) {
      setError("Please enter a valid website URL")
      return
    }

    setError(null)
    setIsAnalyzing(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError("This website URL has already been submitted. Please use a different URL.")
        } else {
          setError(data.error || "There was an error analyzing your website")
        }
        return
      }

      updateData({ websiteUrl: formattedUrl })
      setCurrentStep(2)
    } catch (error) {
      setError("There was an error analyzing your website. Please try again.")
    } finally {
      setIsAnalyzing(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600">Enter your website URL so we can analyze your content and suggest improvements.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-base"
            disabled={isAnalyzing}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
          <h3 className="font-medium text-blue-800">Why do we need your website?</h3>
          <p className="text-sm text-blue-700 mt-1">
            We analyze your website to understand your content structure, identify SEO opportunities, and generate
            content that matches your brand voice and style.
          </p>
        </div>
      </div>

      <Button
        onClick={handleContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing your website...
          </>
        ) : (
          <>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  )
}
