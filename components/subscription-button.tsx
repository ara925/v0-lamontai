"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { PlanType } from "@/lib/stripe"
import { useRouter } from "next/navigation"

interface SubscriptionButtonProps {
  plan: PlanType
  className?: string
}

export function SubscriptionButton({ plan, className }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubscribe = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "Something went wrong")
      }

      toast({
        title: "Subscription created",
        description: `You are now subscribed to the ${plan} plan.`,
      })

      // Redirect to the dashboard
      router.push("/dashboard?subscription=success")
    } catch (error: any) {
      console.error("Subscription error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create subscription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSubscribe} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : "Subscribe"}
    </Button>
  )
}
