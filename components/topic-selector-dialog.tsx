"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Topic {
  id: string
  topic: string
  keywordDifficulty: number
  searchVolume: number
  source: string
}

interface TopicSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTopic: (topic: string) => void
}

export function TopicSelectorDialog({ open, onOpenChange, onSelectTopic }: TopicSelectorDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "1",
      topic: "seo competitors analysis",
      keywordDifficulty: 17,
      searchVolume: 720,
      source: "Competitor",
    },
    {
      id: "2",
      topic: "seo for education",
      keywordDifficulty: 2,
      searchVolume: 170,
      source: "Competitor",
    },
    {
      id: "3",
      topic: "lead nurturing tactics",
      keywordDifficulty: 8,
      searchVolume: 50,
      source: "Website",
    },
    {
      id: "4",
      topic: "business growth strategies",
      keywordDifficulty: 11,
      searchVolume: 5400,
      source: "Website",
    },
    {
      id: "5",
      topic: "email marketing strategies",
      keywordDifficulty: 15,
      searchVolume: 880,
      source: "Website",
    },
    {
      id: "6",
      topic: "what is content marketing",
      keywordDifficulty: 34,
      searchVolume: 12100,
      source: "Website",
    },
  ])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      // In a real app, you would fetch topics from an API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // For now, we'll just filter the existing topics
      const filteredTopics = topics.filter((topic) => topic.topic.toLowerCase().includes(searchTerm.toLowerCase()))
      setTopics(filteredTopics.length ? filteredTopics : topics)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTopic = (topic: string) => {
    onSelectTopic(topic)
    onOpenChange(false)
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 10) return "bg-green-100 text-green-800"
    if (difficulty < 30) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Alternative Topic</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">Choose among our topic recommendations or insert your own.</p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search or insert your own topic (e.g. 'teeth whitening')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {topics.length > 0 && (
            <div className="mt-4 border rounded-md">
              <div className="grid grid-cols-4 gap-4 p-4 font-medium text-sm border-b bg-gray-50">
                <div>Topic</div>
                <div>Keyword Difficulty</div>
                <div>Search Volume</div>
                <div>Source</div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleSelectTopic(topic.topic)}
                  >
                    <div className="text-sm">{topic.topic}</div>
                    <div className="text-sm">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${getDifficultyColor(topic.keywordDifficulty)}`}
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
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSelectTopic(searchTerm)}
            disabled={!searchTerm.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
