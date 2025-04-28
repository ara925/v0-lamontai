"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ArticleActionsProps {
  articleId: string
}

export function ArticleActions({ articleId }: ArticleActionsProps) {
  const { toast } = useToast()

  const handleRefresh = async () => {
    // In a real app, you would call an API to refresh the article
    toast({
      title: "Refreshing article",
      description: "Your article is being refreshed with the latest data.",
    })
  }

  const handleDelete = async () => {
    // In a real app, you would call an API to delete the article
    toast({
      title: "Article deleted",
      description: "Your article has been deleted successfully.",
    })
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
      <Button variant="ghost" size="icon" onClick={handleRefresh} className="h-8 w-8 rounded-full hover:bg-white">
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8 rounded-full hover:bg-white">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
