"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { TopicSelectorDialog } from "./topic-selector-dialog"
import { Sparkles } from "lucide-react"

interface ArticleGeneratorProps {
  organizationId: string
}

export function ArticleGenerator({ organizationId }: ArticleGeneratorProps) {
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [instructions, setInstructions] = useState("")
  const [generating, setGenerating] = useState(false)
  const [showTopicSelector, setShowTopicSelector] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!topic) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your article.",
        variant: "destructive",
      })
      return
    }

    setGenerating(true)
    try {
      // In a real app, you would call an API to generate the article
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast({
        title: "Article generated",
        description: "Your article has been successfully generated.",
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleSelectTopic = (selectedTopic: string) => {
    setTopic(selectedTopic)
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Generate New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <div className="flex gap-2">
                <Input
                  id="topic"
                  placeholder="e.g. SEO best practices"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={() => setShowTopicSelector(true)}>
                  Browse
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                placeholder="e.g. SEO, content marketing, backlinks"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Additional Instructions (optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any specific requirements or focus areas for the article"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating || !topic}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {generating ? (
                "Generating..."
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Article
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <TopicSelectorDialog
        open={showTopicSelector}
        onOpenChange={setShowTopicSelector}
        onSelectTopic={handleSelectTopic}
      />
    </>
  )
}
