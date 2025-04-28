"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export default function DebugEmail() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleSendTest = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to test.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/debug/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send test email")
      }

      setResult(data)
      toast({
        title: "Test email sent",
        description: "Check your email inbox for the test message.",
      })
    } catch (error: any) {
      console.error("Error sending test email:", error)
      setError(error.message)
      toast({
        title: "Error sending test email",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Email Debug Tool</CardTitle>
            <CardDescription>Test email delivery for troubleshooting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium mb-2">Debug Information:</h3>
                <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSendTest} className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? "Sending..." : "Send Test Email"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
