"use client"

import { OnboardingLayout } from "@/components/onboarding/onboarding-layout"
import { OnboardingProvider, useOnboarding } from "@/components/onboarding/onboarding-context"
import { WebsiteStep } from "@/components/onboarding/step-website"
import { CompetitorsStep } from "@/components/onboarding/step-competitors"
import { SitemapStep } from "@/components/onboarding/step-sitemap"
import { GoogleSearchConsoleStep } from "@/components/onboarding/step-gsc"
import { LanguagesStep } from "@/components/onboarding/step-languages"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

function OnboardingSteps() {
  const { currentStep, setCurrentStep } = useOnboarding()
  const searchParams = useSearchParams()

  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam) {
      const step = Number.parseInt(stepParam)
      if (step >= 1 && step <= 5) {
        setCurrentStep(step)
      }
    }
  }, [searchParams, setCurrentStep])

  const stepTitles = [
    "Enter your website URL",
    "Select your competitors",
    "Input your Sitemap URL (Optional)",
    "Connect Google Search Console",
    "Select your target audience",
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WebsiteStep />
      case 2:
        return <CompetitorsStep />
      case 3:
        return <SitemapStep />
      case 4:
        return <GoogleSearchConsoleStep />
      case 5:
        return <LanguagesStep />
      default:
        return <WebsiteStep />
    }
  }

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={5} stepTitle={stepTitles[currentStep - 1]}>
      {renderStep()}
    </OnboardingLayout>
  )
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingSteps />
    </OnboardingProvider>
  )
}
