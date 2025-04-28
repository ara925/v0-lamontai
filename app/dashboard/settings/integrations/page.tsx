"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IntegrationsPage() {
  const integrations = [
    {
      id: "wordpress",
      name: "WordPress",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" />
          <path d="M3.009 12c0 4.976 4.015 9 8.991 9 4.975 0 8.991-4.024 8.991-9 0-4.975-4.016-9-8.991-9-4.976 0-8.991 4.025-8.991 9zm16.787-1.021c.044.338.076.679.076 1.021 0 1.061-.213 2.212-.628 3.193l-2.521-6.905c.151.023.29.06.436.06.443 0 .872-.059 1.277-.169.044.169.1.338.145.506.246.9.796 1.464 1.215 2.294z" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "api",
      name: "API",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "webhook",
      name: "Webhook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "webflow",
      name: "Webflow",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.76 2.18A5.93 5.93 0 0 0 12.28 0c-1.21 0-2.37.36-3.34 1a6.17 6.17 0 0 0-2.32 2.7 6.05 6.05 0 0 0-4.56 2.95A6.08 6.08 0 0 0 2.82 12c.24.7.63 1.33 1.14 1.86-1.4 1.1-2.28 2.79-2.28 4.68 0 3.27 2.68 5.46 5.94 5.46 1.19 0 2.31-.35 3.25-.96a5.9 5.9 0 0 0 2.23-2.42 6 6 0 0 0 4.76-2.95 6.08 6.08 0 0 0-.76-7.24 5.94 5.94 0 0 0 .66-8.25z" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "shopify",
      name: "Shopify",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M15.34 15.5c-.2.1-.42.18-.65.26-.23.08-.48.15-.73.21-.25.06-.52.1-.8.14-.28.03-.56.05-.85.05-.42 0-.8-.03-1.14-.1-.34-.07-.63-.18-.88-.32-.25-.14-.44-.33-.58-.56-.14-.23-.2-.52-.2-.85 0-.25.04-.5.12-.72.08-.23.2-.43.36-.6.16-.17.36-.3.6-.4.24-.1.52-.15.84-.15.1 0 .2.01.3.02.1.01.2.03.3.05.1.02.2.04.3.07.1.03.2.06.3.1v-2.11c-.43-.12-.9-.18-1.4-.18-.56 0-1.08.08-1.54.25-.47.17-.87.4-1.2.7-.33.3-.6.66-.78 1.08-.19.42-.28.88-.28 1.39 0 .58.1 1.08.31 1.5.2.42.48.77.83 1.04.35.27.76.47 1.23.6.47.13.97.2 1.5.2.5 0 .98-.05 1.44-.15.46-.1.88-.24 1.27-.42v-1.79z" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "wix",
      name: "Wix",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M5.8 2L0 12.2 5.8 22h12.4l5.8-9.8L18.2 2H5.8zm9.8 15.4l-2.4-4.6-2.4 4.6-2.4-9.6 1.8.4 1.4 5.4 1.6-3.4-1-2-1.6.2 1-1.8 5 .4-1 1.8-1.6-.2-1 2 1.6 3.4 1.4-5.4 1.8-.4-2.4 9.6z" />
        </svg>
      ),
      status: "available",
    },
    {
      id: "wordpress-com",
      name: "Wordpress.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 19.5c-5.247 0-9.5-4.253-9.5-9.5S6.753 2.5 12 2.5s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5z" />
          <path d="M3.009 12c0 4.976 4.015 9 8.991 9 4.975 0 8.991-4.024 8.991-9 0-4.975-4.016-9-8.991-9-4.976 0-8.991 4.025-8.991 9zm16.787-1.021c.044.338.076.679.076 1.021 0 1.061-.213 2.212-.628 3.193l-2.521-6.905c.151.023.29.06.436.06.443 0 .872-.059 1.277-.169.044.169.1.338.145.506.246.9.796 1.464 1.215 2.294z" />
        </svg>
      ),
      status: "coming-soon",
    },
  ]

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Integrations</h1>
        </div>

        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Integrations</TabsTrigger>
            <TabsTrigger value="connected">Connected Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <h2 className="text-xl font-bold mb-4">Integrate with your favorite CMS platform:</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {integrations.map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center">{integration.icon}</div>
                      <div className="text-center">
                        <h3 className="text-lg font-medium">{integration.name}</h3>
                        {integration.status === "coming-soon" ? (
                          <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                        ) : (
                          <Button variant="outline" className="mt-4 w-full">
                            Configure now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connected" className="mt-6">
            <div className="text-center py-8 text-muted-foreground">
              No integrations connected yet. Configure an integration to get started.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
