"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface Topic {
  id: string
  topic: string
  keywordDifficulty: number
  searchVolume: number
  source: string
}

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void
}

export function TopicSelector({ onSelectTopic }: TopicSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([])
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          niche: searchTerm,
          organizationId: "placeholder-org-id", // This would come from your auth context
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch topics")
      }

      const data = await response.json()
      setTopics(data.topics)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch topic recommendations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTopic = (topic: string) => {
    onSelectTopic(topic)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Choose Alternative Topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Alternative Topic</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">Choose among our topic recommendations or insert your own.</p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search or insert your own topic (e.g. 'teeth whitening')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {topics.length > 0 && (
            <div className="mt-4 border rounded-md">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium text-sm border-b">
                <div>Topic</div>
                <div>Keyword Difficulty</div>
                <div>Search Volume</div>
                <div>Source</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSelectTopic(topic.topic)}
                  >
                    <div className="text-sm">{topic.topic}</div>
                    <div className="text-sm">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          topic.keywordDifficulty < 10
                            ? "bg-green-100 text-green-800"
                            : topic.keywordDifficulty < 30
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {topic.keywordDifficulty}
                      </span>
                    </div>
                    <div className="text-sm">{topic.searchVolume.toLocaleString()}</div>
                    <div className="text-sm capitalize">{topic.source}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSelectTopic(searchTerm)} disabled={!searchTerm.trim()}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
