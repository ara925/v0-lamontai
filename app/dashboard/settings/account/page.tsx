"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LogoutButton } from "@/components/logout-button"

export default function AccountSettings() {
  const [name, setName] = useState("Armin Avdic")
  const [email, setEmail] = useState("arminslist@gmail.com")
  const [subscribed, setSubscribed] = useState(true)
  const [gscConnected, setGscConnected] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real app, you would save the data to an API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Settings saved",
        description: "Your account settings have been updated successfully.",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Security</h3>
                <div className="flex justify-between items-center">
                  <span>Password</span>
                  <Button variant="outline" size="sm">
                    Change password
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.5 12.5C22.5 10.92 21.625 9.55 20.352 8.9C20.429 8.6 20.5 8.31 20.5 8C20.5 6.07 18.93 4.5 17 4.5C16.691 4.5 16.4 4.57 16.102 4.648C15.451 3.375 14.08 2.5 12.5 2.5C10.92 2.5 9.55 3.375 8.9 4.648C8.6 4.57 8.31 4.5 8 4.5C6.07 4.5 4.5 6.07 4.5 8C4.5 8.31 4.57 8.6 4.648 8.9C3.375 9.55 2.5 10.92 2.5 12.5C2.5 14.08 3.375 15.45 4.648 16.102C4.57 16.4 4.5 16.691 4.5 17C4.5 18.93 6.07 20.5 8 20.5C8.31 20.5 8.6 20.429 8.9 20.352C9.55 21.625 10.92 22.5 12.5 22.5C14.08 22.5 15.45 21.625 16.102 20.352C16.4 20.429 16.691 20.5 17 20.5C18.93 20.5 20.5 18.93 20.5 17C20.5 16.691 20.429 16.4 20.352 16.102C21.625 15.45 22.5 14.08 22.5 12.5Z"
                      fill="#4285F4"
                    />
                    <path d="M12 11L16 15H13.2V19H10.8V15H8L12 11Z" fill="white" />
                    <path d="M8 8.8H10.8V12.8H13.2V8.8H16L12 4.8L8 8.8Z" fill="white" />
                  </svg>
                  <span>Google Search Console</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500">Disconnected</span>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Product Updates</h3>
                <div className="flex justify-between items-center">
                  <span>Subscribed</span>
                  <Switch checked={subscribed} onCheckedChange={setSubscribed} />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSave} disabled={saving} className="bg-orange-500 hover:bg-orange-600">
                  {saving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900">Account Actions</h3>
              <p className="mt-1 text-sm text-gray-500">Permanently log out from all devices or delete your account.</p>
              <div className="mt-4 space-y-4">
                <LogoutButton />
                {/* Other account actions like delete account could go here */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
