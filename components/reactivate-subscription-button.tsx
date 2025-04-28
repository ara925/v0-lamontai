"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReactivateSubscriptionButtonProps {
  subscriptionId: string
}

export function ReactivateSubscriptionButton({ subscriptionId }: ReactivateSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleReactivate = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/subscriptions/reactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      toast({
        title: "Subscription Reactivated",
        description: "Your subscription has been reactivated successfully.",
      })

      router.refresh()
    } catch (error: any) {
      console.error("Reactivate subscription error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to reactivate subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleReactivate} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Reactivating...
        </>
      ) : (
        "Reactivate Subscription"
      )}
    </Button>
  )
}
