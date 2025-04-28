"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, Settings, FileText, Home, CreditCard, LogOut, Menu, X, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Content Plan", href: "/dashboard/content-plan", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Referrals", href: "/dashboard/referrals", icon: Share2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    const handleToggleMobileSidebar = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    window.addEventListener("toggle-mobile-sidebar", handleToggleMobileSidebar)

    return () => {
      window.removeEventListener("toggle-mobile-sidebar", handleToggleMobileSidebar)
    }
  }, [isMobileMenuOpen])

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
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold">🚀 Lamont.ai</span>
        </Link>
        <button
          type="button"
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex-1 h-0 pt-16 pb-4 overflow-y-auto">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-4 flex-shrink-0 h-6 w-6",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Button
                variant="ghost"
                className="flex items-center text-gray-600 hover:text-gray-900 w-full justify-start"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                {isLoggingOut ? "Logging out..." : "Log out"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-xl font-bold">🚀 Lamont.ai</span>
            </Link>
          </div>
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                )}
              >
                <item.icon
                  className={cn(
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-5 w-5",
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Button
            variant="ghost"
            className="flex items-center text-gray-600 hover:text-gray-900 w-full justify-start"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </div>
      </div>
    </>
  )
}
