"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Smile, Paperclip, Mic } from "lucide-react"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, you would send the message to an API
      setMessage("")
    }
  }

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <img src="/abstract-geometric-logo.png" alt="BabyLoveGrowth" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Questions? Chat with us!</h3>
                <p className="text-xs">Was last active 3 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-orange-600">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center">
                <img src="/abstract-geometric-logo.png" alt="BabyLoveGrowth" className="w-6 h-6" />
              </div>
              <div className="ml-2 bg-gray-100 p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Anything you want to ask?</p>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Compose your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <div className="absolute right-2 top-2 flex items-center gap-1">
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Button type="submit" size="icon" className="bg-orange-500 hover:bg-orange-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-center mt-2 text-gray-500">
              We run on <span className="font-medium">crisp</span>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={toggleChat}
          size="icon"
          className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
