"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { UserProfileDropdown } from "./user-profile-dropdown"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    const event = new CustomEvent("toggle-mobile-sidebar")
    window.dispatchEvent(event)
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center lg:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open sidebar</span>
              </Button>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center">{!loading && user && <UserProfileDropdown user={user} />}</div>
        </div>
      </div>
    </header>
  )
}
