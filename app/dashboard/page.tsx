"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/components/supabase-provider"
import { Calendar } from "@/components/ui/calendar"
import { Download, Eye } from "lucide-react"
import { ArticleGenerator } from "@/components/article-generator"

export default function Dashboard() {
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [organizationId, setOrganizationId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) return

        // Get user's organization
        const { data: orgUser } = await supabase
          .from("organization_users")
          .select("organization_id")
          .eq("user_id", user.id)
          .single()

        if (orgUser) {
          setOrganizationId(orgUser.organization_id)
        }

        // Fetch latest article
        const { data: articleData } = await supabase
          .from("articles")
          .select("*")
          .eq("organization_id", orgUser?.organization_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (articleData) {
          setArticle(articleData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [supabase])

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Your daily article is ready!</h1>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p>Loading your latest article...</p>
          </div>
        ) : article ? (
          <Card className="border border-blue-200 bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">APR 5TH, 2025</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1">BLOG TITLE</h3>
                    <p className="text-lg font-medium">Boost Your Online Presence with PPC and SEO Services</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="text-center">
                    <h3 className="text-xs font-semibold mb-1">SEO IMPACT</h3>
                    <p className="text-2xl font-bold">92</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-semibold mb-1">KEYWORDS</h3>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-semibold mb-1">SEARCH VOLUME</h3>
                    <p className="text-2xl font-bold">1,410</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Your Daily Envelope
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Blog
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p>No articles found. Your first article will appear here once generated.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {organizationId && <ArticleGenerator organizationId={organizationId} />}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Organic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <Button variant="outline" className="w-full">
                  Connect Google Search Console
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Integration with Google Search Console is crucial for gaining insights into your website's organic
                  performance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
