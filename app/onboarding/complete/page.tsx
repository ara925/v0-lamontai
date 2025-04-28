"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function OnboardingCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto" />
        <h1 className="text-2xl font-bold">Setting up your account...</h1>
        <p className="text-gray-600">
          We're preparing your dashboard and generating your first content recommendations.
        </p>
      </div>
    </div>
  )
}
