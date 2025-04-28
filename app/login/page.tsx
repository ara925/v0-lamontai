"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertCircle } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Get the tab from the URL query parameters
  const tab = searchParams.get("tab") || "login"
  const errorParam = searchParams.get("error")
  const errorDescription = searchParams.get("error_description")
  const code = searchParams.get("code")
  const emailVerified = searchParams.get("email_verified") === "true"

  useEffect(() => {
    setActiveTab(tab)

    // Handle error from URL parameters
    if (errorParam) {
      setError(errorDescription || "Authentication error occurred")

      // Show toast for expired link
      if (errorParam === "access_denied" && errorDescription?.includes("expired")) {
        toast({
          title: "Email link expired",
          description: "Your confirmation link has expired. Please request a new one.",
          variant: "destructive",
        })
      }
    }

    // If email was verified, show success message
    if (emailVerified) {
      toast({
        title: "Email verified successfully",
        description: "You can now log in with your credentials.",
        variant: "default",
      })
    }

    // If there's a code parameter, handle it
    if (code) {
      handleCodeExchange(code)
    }
  }, [tab, errorParam, errorDescription, code, emailVerified, toast])

  // Handle code exchange directly on the client side
  const handleCodeExchange = async (code: string) => {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      // Successfully authenticated
      toast({
        title: "Successfully authenticated",
        description: "Redirecting to onboarding...",
      })

      router.push("/onboarding")
      router.refresh()
    } catch (err) {
      console.error("Exception during code exchange:", err)
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Check if the error is about user not found
        if (error.message.includes("Invalid login credentials") || error.message.includes("user not found")) {
          setError("No account found with this email. Please sign up first.")
          toast({
            title: "Account not found",
            description: "No account exists with this email. Please register first.",
            variant: "destructive",
          })
          setActiveTab("register")
          setLoading(false)
          return
        }
        throw error
      }

      toast({
        title: "Signed in successfully",
        description: "Redirecting...",
      })

      // Check if user has completed onboarding
      const { data: user } = await supabase.auth.getUser()

      if (user && user.user) {
        const { data: orgUser } = await supabase
          .from("organization_users")
          .select("organization_id")
          .eq("user_id", user.user.id)
          .single()

        if (orgUser) {
          const { data: org } = await supabase
            .from("organizations")
            .select("onboarding_completed")
            .eq("id", orgUser.organization_id)
            .single()

          if (org && !org.onboarding_completed) {
            // Redirect to onboarding if not completed
            router.push("/onboarding")
          } else {
            // Redirect to dashboard if onboarding is completed
            router.push("/dashboard")
          }
        } else {
          // No organization found, redirect to onboarding
          router.push("/onboarding")
        }
      } else {
        // Fallback to dashboard
        router.push("/dashboard")
      }

      router.refresh()
    } catch (error: any) {
      console.error("Sign in error:", error)
      setError(error.message)
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Check if email already exists - FIXED VERSION
  const checkEmailExists = async (email: string) => {
    try {
      // First, try to get the user directly
      const { data: userData, error: userError } = await supabase.auth.admin.getUserByEmail(email)

      // If we successfully got a user, the email exists
      if (userData && userData.user) {
        return true
      }

      // If we got a specific error about the user not existing, the email doesn't exist
      if (userError && userError.message.includes("user not found")) {
        return false
      }

      // If we can't determine directly, try the sign-in method as fallback
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      })

      // If the error specifically mentions user not found, the email doesn't exist
      if (error && error.message.includes("user not found")) {
        return false
      }

      // For any other error or if we can't determine, proceed with registration
      // This is safer than blocking registration incorrectly
      return false
    } catch (error) {
      console.error("Exception checking email:", error)
      // In case of exception, allow registration to proceed
      return false
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSignupSuccess(false)

    try {
      // Skip email check for now - it's causing false positives
      // const emailExists = await checkEmailExists(email)
      //
      // if (emailExists) {
      //   setError("An account with this email already exists. Please sign in instead.")
      //   toast({
      //     title: "Email already registered",
      //     description: "Please sign in with your existing account.",
      //     variant: "destructive",
      //   })
      //   setActiveTab("login")
      //   setLoading(false)
      //   return
      // }

      // Get the site URL for redirect
      const siteUrl = "https://lamontai.vercel.app"

      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
          data: {
            onboarding_completed: false,
          },
        },
      })

      if (error) {
        // Check if the error is about the email already being registered
        if (error.message.includes("already registered")) {
          setError("An account with this email already exists. Please sign in instead.")
          toast({
            title: "Email already registered",
            description: "Please sign in with your existing account.",
            variant: "destructive",
          })
          setActiveTab("login")
          return
        }

        // Check for rate limit error
        if (error.message.includes("security purposes") || error.message.includes("rate limit")) {
          throw new Error("Please wait a moment before trying again. We have a limit on sign-up attempts.")
        }
        throw error
      }

      console.log("Sign up response:", data)

      setSignupSuccess(true)
      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete your registration.",
      })
    } catch (error: any) {
      console.error("Sign up error:", error)
      setError(error.message)
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to resend the confirmation link.",
        variant: "destructive",
      })
      return
    }

    setResendLoading(true)
    try {
      // Get the site URL for redirect
      const siteUrl = "https://lamontai.vercel.app"

      console.log("Resending confirmation to:", email)
      console.log("Redirect URL:", `${siteUrl}/auth/callback`)

      const { error, data } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback`,
        },
      })

      console.log("Resend response:", data)

      if (error) throw error

      toast({
        title: "Confirmation email sent",
        description: "Please check your email for a new confirmation link.",
      })
    } catch (error: any) {
      console.error("Resend error:", error)
      toast({
        title: "Error sending confirmation",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold">🚀 Lamont.ai</h1>
          </Link>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Show expired link error alert if present */}
          {errorParam === "access_denied" && errorDescription?.includes("expired") && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Email link expired</AlertTitle>
              <AlertDescription>
                Your confirmation link has expired. Please enter your email and request a new one.
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={handleResendConfirmation}
                  disabled={resendLoading || !email}
                >
                  {resendLoading ? "Sending..." : "Resend confirmation email"}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Show email verified success message if present */}
          {emailVerified && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <InfoIcon className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Email verified successfully</AlertTitle>
              <AlertDescription className="text-green-700">
                Your email has been verified. You can now log in with your credentials.
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  {error && activeTab === "login" && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-blue-500 hover:text-blue-800">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>

                  <div className="text-center text-sm text-gray-500 mt-2">
                    <span>Need to confirm your email? </span>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-500"
                      onClick={handleResendConfirmation}
                      disabled={resendLoading || !email}
                    >
                      Resend confirmation
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  {searchParams.get("trial") === "true"
                    ? "Start your 4-day free trial by creating an account"
                    : "Enter your details to create a new account"}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  {error && activeTab === "register" && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {signupSuccess && (
                    <Alert className="bg-green-50 text-green-800 border-green-200">
                      <InfoIcon className="h-4 w-4" />
                      <AlertDescription>
                        Please check your email for a confirmation link to complete your registration.
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full"
                          onClick={handleResendConfirmation}
                          disabled={resendLoading}
                        >
                          {resendLoading ? "Sending..." : "Resend confirmation email"}
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
