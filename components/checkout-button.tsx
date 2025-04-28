"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { PlanType } from "@/lib/stripe"

interface CheckoutButtonProps {
  plan: PlanType
  className?: string
}

export function CheckoutButton({ plan, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/checkout", {
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

      if (data.url) {
        window.location.href = data.url
      } else {
        // If no URL is returned, show a message
        toast({
          title: "Subscription system unavailable",
          description: "Please contact support to subscribe to this plan.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to process checkout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? "Processing..." : "Subscribe"}
    </Button>
  )
}
