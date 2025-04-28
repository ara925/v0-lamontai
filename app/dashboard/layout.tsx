import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatWidget } from "@/components/chat-widget"
import { Toaster } from "@/components/ui/toaster"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
      <ChatWidget />
      <Toaster />
    </div>
  )
}
