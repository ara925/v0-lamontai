import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MissingKeywordsToolPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Missing Keywords Tool</h1>
        <p className="text-gray-600 text-center mb-12">
          Find keywords your competitors are ranking for that you're missing out on
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Analyze Your Missing Keywords</CardTitle>
            <CardDescription>
              Enter your domain and up to 3 competitor domains to discover keyword opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="your-domain">Your Domain</Label>
                <Input id="your-domain" placeholder="yourdomain.com" />
              </div>

              <div className="space-y-2">
                <Label>Competitor Domains</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="competitor1.com" />
                  <Input placeholder="competitor2.com" />
                  <Input placeholder="competitor3.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-branded" className="rounded border-gray-300" />
                    <Label htmlFor="include-branded">Include branded keywords</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="high-volume" className="rounded border-gray-300" />
                    <Label htmlFor="high-volume">Focus on high-volume keywords</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">Find Missing Keywords</Button>
          </CardFooter>
        </Card>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Sample Results</h2>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All Keywords</TabsTrigger>
              <TabsTrigger value="high-intent">High Intent</TabsTrigger>
              <TabsTrigger value="low-competition">Low Competition</TabsTrigger>
              <TabsTrigger value="quick-wins">Quick Wins</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="border rounded-lg p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Keyword</th>
                      <th className="text-left p-2">Search Volume</th>
                      <th className="text-left p-2">Difficulty</th>
                      <th className="text-left p-2">Ranking Competitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">content marketing strategy</td>
                      <td className="p-2">5,400</td>
                      <td className="p-2">67</td>
                      <td className="p-2">2/3</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">seo content writing</td>
                      <td className="p-2">3,200</td>
                      <td className="p-2">58</td>
                      <td className="p-2">3/3</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">ai content generator</td>
                      <td className="p-2">8,100</td>
                      <td className="p-2">72</td>
                      <td className="p-2">2/3</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">blog post ideas</td>
                      <td className="p-2">4,700</td>
                      <td className="p-2">45</td>
                      <td className="p-2">1/3</td>
                    </tr>
                    <tr>
                      <td className="p-2">keyword research tools</td>
                      <td className="p-2">6,300</td>
                      <td className="p-2">63</td>
                      <td className="p-2">3/3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="high-intent" className="border rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-500">Select this tab to view high-intent keywords</p>
              </div>
            </TabsContent>

            <TabsContent value="low-competition" className="border rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-500">Select this tab to view low-competition keywords</p>
              </div>
            </TabsContent>

            <TabsContent value="quick-wins" className="border rounded-lg p-4">
              <div className="text-center py-8">
                <p className="text-gray-500">Select this tab to view quick-win keyword opportunities</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Want more powerful SEO tools?</h3>
          <p className="mb-4">
            This free tool is just a sample of what Lamont.ai can do for your content strategy. Sign up today to access
            our full suite of AI-powered SEO and content generation tools.
          </p>
          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600">Try Lamont.ai Free for 4 Days</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
