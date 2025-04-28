"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useOnboarding } from "./onboarding-context"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function LanguagesStep() {
  const { data, updateData } = useOnboarding()
  const [languages, setLanguages] = useState({
    english: data.languages.english,
    spanish: data.languages.spanish,
    french: data.languages.french,
    german: data.languages.german,
  })
  const [plan, setPlan] = useState<"starter" | "growth" | "scale">(data.plan)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLanguageToggle = (language: keyof typeof languages) => {
    setLanguages((prev) => ({
      ...prev,
      [language]: !prev[language],
    }))
  }

  const getSelectedLanguageCount = () => {
    return Object.values(languages).filter(Boolean).length
  }

  const handleComplete = async () => {
    const selectedCount = getSelectedLanguageCount()

    if (selectedCount === 0) {
      toast({
        title: "Select at least one language",
        description: "Please select at least one language to continue",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Update the onboarding data
      updateData({
        languages,
        plan,
      })

      // In a real implementation, we would call an API to save all the onboarding data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to dashboard
      toast({
        title: "Onboarding complete!",
        description: "Your account is now set up and ready to use.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error completing onboarding",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 text-white px-2 py-1 text-sm font-medium">Last Step</div>
      </div>

      <h2 className="text-3xl font-bold">Select your target audience</h2>
      <p className="text-gray-600">Select the languages based on your target audience</p>

      <div className="grid grid-cols-2 gap-4">
        <Card className={`border-2 ${languages.english ? "border-blue-500" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">English</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="flex gap-1">
                    <Image src="/waving-us-flag.png" alt="US" width={20} height={20} className="rounded-sm" />
                    <Image src="/union-jack-flying.png" alt="UK" width={20} height={20} className="rounded-sm" />
                    <Image src="/canadian-maple-leaf.png" alt="CA" width={20} height={20} className="rounded-sm" />
                  </span>
                  <span className="text-xs text-gray-500 ml-1">More</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Audience: 1.5B</p>
              </div>
              <Switch checked={languages.english} onCheckedChange={() => handleLanguageToggle("english")} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${languages.spanish ? "border-blue-500" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Spanish</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="flex gap-1">
                    <Image src="/spanish-flag-waving.png" alt="ES" width={20} height={20} className="rounded-sm" />
                    <Image src="/waving-mexican-flag.png" alt="MX" width={20} height={20} className="rounded-sm" />
                  </span>
                  <span className="text-xs text-gray-500 ml-1">More</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Audience: 475M</p>
              </div>
              <Switch checked={languages.spanish} onCheckedChange={() => handleLanguageToggle("spanish")} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${languages.french ? "border-blue-500" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">French</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="flex gap-1">
                    <Image src="/tricolor-flag-fluttering.png" alt="FR" width={20} height={20} className="rounded-sm" />
                    <Image src="/belgian-tricolor.png" alt="BE" width={20} height={20} className="rounded-sm" />
                  </span>
                  <span className="text-xs text-gray-500 ml-1">More</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Audience: 330M</p>
              </div>
              <Switch checked={languages.french} onCheckedChange={() => handleLanguageToggle("french")} />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${languages.german ? "border-blue-500" : "border-gray-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">German</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="flex gap-1">
                    <Image src="/german-tricolor.png" alt="DE" width={20} height={20} className="rounded-sm" />
                    <Image src="/swiss-flag-flying.png" alt="CH" width={20} height={20} className="rounded-sm" />
                    <Image src="/austrian-flag-waving.png" alt="AT" width={20} height={20} className="rounded-sm" />
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Audience: 130M</p>
              </div>
              <Switch checked={languages.german} onCheckedChange={() => handleLanguageToggle("german")} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="border-2 border-gray-200 bg-black text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Scale</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Monthly</span>
                <Switch checked={true} />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Yearly</span>
                  <span className="text-xs text-blue-400">3 months free</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-blue-400 mb-4">
              <Check className="h-4 w-4 mr-2" />
              <span className="text-sm">Daily article in {getSelectedLanguageCount()} languages</span>
            </div>

            <div className="text-3xl font-bold mb-6">
              $299 <span className="text-base font-normal text-gray-400">/ month</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Rank on Google and ChatGPT</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Daily SEO article in {getSelectedLanguageCount()} languages</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Automatic keyword research</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Automatic keyword clustering</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Comprehensive SEO tracking</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Cited articles with research</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Custom feature requests</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm">Priority customer support</span>
              </div>
            </div>

            <Button onClick={handleComplete} className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
              {isSubmitting ? "Setting up your account..." : "4-Day Free Trial"}
            </Button>

            <p className="text-xs text-center text-gray-400 mt-4">Cancel anytime. Keep the content.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
