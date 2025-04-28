"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"

interface GoogleSearchConsoleIntegrationProps {
  organizationId: string
}

export function GoogleSearchConsoleIntegration({ organizationId }: GoogleSearchConsoleIntegrationProps) {
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const { toast } = useToast()
  const { supabase } = useSupabase()

  const handleConnect = async () => {
    if (!verificationCode) {
      toast({
        title: "Missing verification code",
        description: "Please enter your Google Search Console verification code",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // In a real app, you would validate the verification code with Google's API
      // For now, we'll just simulate a successful connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the integration in the database
      await supabase.from("integrations").insert({
        organization_id: organizationId,
        type: "google_search_console",
        credentials: { verification_code: verificationCode },
        status: "active",
      })

      toast({
        title: "Integration successful",
        description: "Your website has been connected to Google Search Console",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Google Search Console",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Google Search Console</CardTitle>
        <CardDescription>Track your website's performance in Google Search results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verification-code">Verification Code</Label>
          <Input
            id="verification-code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter your Google Search Console verification code"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>To connect your website:</p>
          <ol className="list-decimal pl-4 space-y-1 mt-2">
            <li>Go to Google Search Console</li>
            <li>Add your property</li>
            <li>Choose "HTML tag" verification method</li>
            <li>Copy the verification code</li>
            <li>Paste it here</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleConnect}
          disabled={loading || !verificationCode}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {loading ? "Connecting..." : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  )
}
