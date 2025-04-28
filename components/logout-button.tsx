"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out.",
      })

      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })

      // Force a hard refresh to clear any cached state
      window.location.href = "/"
    } catch (error: any) {
      console.error("Logout error:", error)
      toast({
        title: "Error logging out",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Log out from all devices
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will log you out from all devices where you're currently signed in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
