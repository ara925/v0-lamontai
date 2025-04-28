"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

interface OnboardingData {
  websiteUrl: string
  competitors: string[]
  sitemapUrl: string
  gscConnected: boolean
  languages: {
    english: boolean
    spanish: boolean
    french: boolean
    german: boolean
  }
  plan: "starter" | "growth" | "scale"
}

interface OnboardingContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  data: OnboardingData
  updateData: (newData: Partial<OnboardingData>) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const stepParam = searchParams.get("step")

  const [currentStep, setCurrentStepState] = useState<number>(stepParam ? Number.parseInt(stepParam) : 1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [data, setData] = useState<OnboardingData>({
    websiteUrl: "",
    competitors: [],
    sitemapUrl: "",
    gscConnected: false,
    languages: {
      english: true,
      spanish: false,
      french: false,
      german: false,
    },
    plan: "scale",
  })

  const setCurrentStep = (step: number) => {
    setCurrentStepState(step)
    router.push(`/onboarding?step=${step}`)
  }

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        data,
        updateData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
