"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

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
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">Lamont.ai</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium"
              >
                Pricing
              </button>
              <Link href="/success-stories" className="text-white hover:text-orange-400 px-3 py-2 text-sm font-medium">
                Success Stories
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-gray-800">
                Sign In
              </Button>
            </Link>
            <Link href="/login?tab=register&trial=true">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">4-Day Free Trial</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-black" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("features")}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 w-full text-left"
            >
              Pricing
            </button>
            <Link
              href="/success-stories"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
            >
              Success Stories
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                Sign In
              </Link>
              <Link
                href="/login?tab=register&trial=true"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              >
                4-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
