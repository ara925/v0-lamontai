"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useOnboarding } from "./onboarding-context"

export function GoogleSearchConsoleStep() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)

    try {
      // Redirect to the Google OAuth flow
      window.location.href = "/api/auth/google-search-console?onboarding=true"
    } catch (error) {
      console.error("Error connecting to Google Search Console:", error)
      setIsConnecting(false)
    }
  }

  const handleSkip = () => {
    updateData({ gscConnected: false })
    setCurrentStep(5)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white px-2 py-1 text-sm font-medium">Step 4</div>
      </div>

      <h2 className="text-3xl font-bold">Connect Google Search Console</h2>
      <p className="text-gray-600">This helps us understand what kind of content to produce.</p>

      <div className="border rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="m22 8-6 4 6 4V8Z" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
              <path d="M6 12h.01" />
              <path d="M10 12h.01" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Connect Google Search Console</h3>
            <p className="text-sm text-gray-500">Click to connect your GSC account</p>
          </div>
          <Button
            onClick={handleConnect}
            className="ml-auto rounded-full bg-black text-white hover:bg-gray-800"
            disabled={isConnecting}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-medium">Why do you need access?</h3>
        <p className="text-sm text-gray-600">
          Google Search Console (GSC) is essential for SEO success. GSC provides vital data that enables
          BabyLoveGrowth.ai to deliver personalized, SEO-optimized content that resonates with your audience.
        </p>

        <h3 className="font-medium">Can it hurt my site?</h3>
        <p className="text-sm text-gray-600">
          No! We can only view your data & request indexing of content you create.
        </p>

        <h3 className="font-medium">I don't have Google Search Console?</h3>
        <p className="text-sm text-gray-600">
          Not an issue, you can still use BabyLoveGrowth.ai without it and connect it later.
        </p>

        <h3 className="font-medium">Have another question?</h3>
        <p className="text-sm text-gray-600">
          <a href="#" className="text-blue-500 hover:underline">
            Talk to us.
          </a>
        </p>
      </div>

      <Button onClick={handleSkip} variant="outline" className="w-full">
        Skip for now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
