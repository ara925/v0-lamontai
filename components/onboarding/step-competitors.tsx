"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, X, Plus } from "lucide-react"
import { useOnboarding } from "./onboarding-context"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export function CompetitorsStep() {
  const { data, updateData, setCurrentStep } = useOnboarding()
  const [competitors, setCompetitors] = useState<string[]>(data.competitors)
  const [newCompetitor, setNewCompetitor] = useState("")
  const { toast } = useToast()

  const isValidDomain = (domain: string) => {
    // Simple domain validation
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    return pattern.test(domain)
  }

  const addCompetitor = () => {
    if (!newCompetitor) return

    // Clean up the domain (remove http://, https://, www. and trailing paths)
    let domain = newCompetitor.toLowerCase()
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "")
    domain = domain.split("/")[0]

    if (!isValidDomain(domain)) {
      toast({
        title: "Invalid domain",
        description: "Please enter a valid domain name (e.g. example.com)",
        variant: "destructive",
      })
      return
    }

    if (competitors.includes(domain)) {
      toast({
        title: "Duplicate competitor",
        description: "This competitor is already in your list",
        variant: "destructive",
      })
      return
    }

    setCompetitors([...competitors, domain])
    setNewCompetitor("")
  }

  const removeCompetitor = (index: number) => {
    const newCompetitors = [...competitors]
    newCompetitors.splice(index, 1)
    setCompetitors(newCompetitors)
  }

  const handleContinue = () => {
    if (competitors.length < 1) {
      toast({
        title: "Add competitors",
        description: "Please add at least one competitor to continue",
        variant: "destructive",
      })
      return
    }

    updateData({ competitors })
    setCurrentStep(3)
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600">Select at least 4 competitors.</p>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-md">
        <p className="text-sm font-medium">
          This step is really important. Choose competitors that are popular, relevant, and active in your industry.
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p className="text-gray-600">Analyzing your competition helps us:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Find trending topics and content gaps to stay ahead of the competition</li>
            <li>Identify industry keywords to understand the language of your domain</li>
          </ul>
          <p className="text-orange-600 mt-2">Find inspiration through competitor analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type competitor domain (e.g. domain.com)"
            value={newCompetitor}
            onChange={(e) => setNewCompetitor(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addCompetitor()
              }
            }}
            className="flex-1"
          />
          <Button onClick={addCompetitor} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {competitors.map((competitor, index) => (
            <Badge key={index} variant="outline" className="py-2 px-3 bg-white">
              <span className="mr-1">{competitor}</span>
              <button onClick={() => removeCompetitor(index)} className="ml-1 text-gray-500 hover:text-gray-700">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          {competitors.length === 0 && <p className="text-sm text-gray-500">No competitors added yet</p>}
        </div>
      </div>

      <Button onClick={handleContinue} className="bg-black hover:bg-gray-800 text-white w-full md:w-auto">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
