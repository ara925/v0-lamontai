"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    niche: "",
    competitors: ["", "", ""],
  })
  const router = useRouter()
  const { toast } = useToast()
  const { supabase } = useSupabase()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...formData.competitors]
    newCompetitors[index] = value
    setFormData((prev) => ({ ...prev, competitors: newCompetitors }))
  }

  const handleNext = () => {
    if (step === 1 && (!formData.businessName || !formData.website)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (step === 2 && !formData.niche) {
      toast({
        title: "Missing information",
        description: "Please enter your business niche",
        variant: "destructive",
      })
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      // In a real app, you would update the organization with the onboarding data
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete onboarding",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to Lamont.ai</CardTitle>
          <CardDescription>Let's set up your account in a few simple steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      i <= step ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && <div className={`h-1 w-12 ${i < step ? "bg-orange-500" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>Business Info</span>
              <span>Your Niche</span>
              <span>Competitors</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="niche">What's your business niche?</Label>
                <Input
                  id="niche"
                  name="niche"
                  value={formData.niche}
                  onChange={handleInputChange}
                  placeholder="e.g. Digital Marketing, Health & Fitness, etc."
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This helps us generate relevant content topics for your business.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Who are your top competitors? (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  We'll analyze their content to suggest better topics for you.
                </p>
                {formData.competitors.map((competitor, index) => (
                  <div key={index} className="mt-2">
                    <Input
                      value={competitor}
                      onChange={(e) => handleCompetitorChange(index, e.target.value)}
                      placeholder={`Competitor ${index + 1} website`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
            {loading ? (
              "Processing..."
            ) : step === 3 ? (
              "Complete"
            ) : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
