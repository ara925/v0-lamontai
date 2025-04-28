"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "lucide-react"

export default function Analytics() {
  const [period, setPeriod] = useState("30d")

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={period === "7d" ? "bg-orange-100" : ""}
              onClick={() => setPeriod("7d")}
            >
              7 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={period === "30d" ? "bg-orange-100" : ""}
              onClick={() => setPeriod("30d")}
            >
              30 days
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={period === "90d" ? "bg-orange-100" : ""}
              onClick={() => setPeriod("90d")}
            >
              90 days
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,521</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span>↑</span> 12% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,432</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span>↑</span> 8% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Position</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.2</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span>↑</span> 3 positions from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Over Time</CardTitle>
              <Tabs defaultValue="impressions">
                <div className="flex items-center gap-4">
                  <TabsList>
                    <TabsTrigger value="impressions" className="flex items-center gap-1">
                      <BarChart className="h-4 w-4" />
                      Impressions
                    </TabsTrigger>
                    <TabsTrigger value="clicks" className="flex items-center gap-1">
                      <LineChart className="h-4 w-4" />
                      Clicks
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-muted-foreground">Connect Google Search Console to view performance data</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Article
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Impressions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Clicks
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CTR
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Avg. Position
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">Boost Your Online Presence with PPC and SEO Services</td>
                    <td className="px-6 py-4">5,421</td>
                    <td className="px-6 py-4">342</td>
                    <td className="px-6 py-4">6.3%</td>
                    <td className="px-6 py-4">8.2</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">Digital Marketing Strategies for 2025</td>
                    <td className="px-6 py-4">4,892</td>
                    <td className="px-6 py-4">287</td>
                    <td className="px-6 py-4">5.9%</td>
                    <td className="px-6 py-4">9.1</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 font-medium">How to Choose a Marketing Agency</td>
                    <td className="px-6 py-4">3,754</td>
                    <td className="px-6 py-4">198</td>
                    <td className="px-6 py-4">5.3%</td>
                    <td className="px-6 py-4">12.4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
