"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Settings() {
  const [languages, setLanguages] = useState({
    english: true,
    spanish: true,
    french: true,
    german: true,
  })

  const [settings, setSettings] = useState({
    youtubeVideos: true,
    websiteScreenshot: true,
    includeCitations: true,
    includeJsonLd: false,
    englishVariant: "American",
  })

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="seo">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
          </TabsList>

          <TabsContent value="seo" className="mt-6">
            <div className="grid gap-6">
              <Card className="bg-black text-white">
                <CardHeader>
                  <CardTitle>YOUR PLAN</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold mb-2">Scale</h3>
                  <p className="text-sm mb-4">Supporting 4 languages</p>
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    Change Plan
                  </Button>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 bg-blue-100 rounded-full"></span>
                      English
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Audience: 1.5B</span>
                      </div>
                      <Switch
                        checked={languages.english}
                        onCheckedChange={(checked) => setLanguages({ ...languages, english: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 bg-yellow-100 rounded-full"></span>
                      Spanish
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Audience: 475M</span>
                      </div>
                      <Switch
                        checked={languages.spanish}
                        onCheckedChange={(checked) => setLanguages({ ...languages, spanish: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 bg-blue-100 rounded-full"></span>
                      French
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Audience: 330M</span>
                      </div>
                      <Switch
                        checked={languages.french}
                        onCheckedChange={(checked) => setLanguages({ ...languages, french: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="inline-block w-6 h-6 bg-red-100 rounded-full"></span>
                      German
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Audience: 130M</span>
                      </div>
                      <Switch
                        checked={languages.german}
                        onCheckedChange={(checked) => setLanguages({ ...languages, german: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Article Generation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>YouTube Videos</Label>
                    </div>
                    <Switch
                      checked={settings.youtubeVideos}
                      onCheckedChange={(checked) => setSettings({ ...settings, youtubeVideos: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Website Screenshot</Label>
                    </div>
                    <Switch
                      checked={settings.websiteScreenshot}
                      onCheckedChange={(checked) => setSettings({ ...settings, websiteScreenshot: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Include Citations</Label>
                      <p className="text-xs text-muted-foreground">Recommended</p>
                    </div>
                    <Switch
                      checked={settings.includeCitations}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeCitations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Include JSON-LD</Label>
                    </div>
                    <Switch
                      checked={settings.includeJsonLd}
                      onCheckedChange={(checked) => setSettings({ ...settings, includeJsonLd: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>English</Label>
                    <Select
                      value={settings.englishVariant}
                      onValueChange={(value) => setSettings({ ...settings, englishVariant: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="American">American</SelectItem>
                        <SelectItem value="British">British</SelectItem>
                        <SelectItem value="Australian">Australian</SelectItem>
                        <SelectItem value="Canadian">Canadian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sitemap Url</Label>
                    <Input placeholder="https://tigmarketing.com/sitemap.xml" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-orange-500 hover:bg-orange-600">Save</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
