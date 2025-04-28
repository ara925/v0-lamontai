"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ContentStatus = "Downloaded" | "Planned" | "In Progress"

interface ContentDay {
  date: number
  status: ContentStatus
  title?: string
  keywordDifficulty?: number
  searchVolume?: number
}

export default function ContentPlan() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Sample data for April 2025
  const contentData = [
    {
      date: 5,
      status: "Downloaded" as ContentStatus,
      title: "Medical Digital Marketing: Essential Strategies for Growth",
      keywordDifficulty: 3,
      searchVolume: 320,
    },
    {
      date: 6,
      status: "Downloaded" as ContentStatus,
      title: "Boost Your Online Presence with PPC and SEO Services",
      keywordDifficulty: 4,
      searchVolume: 140,
    },
    {
      date: 7,
      status: "Planned" as ContentStatus,
      title: "working with a marketing agency",
      keywordDifficulty: 4,
      searchVolume: 140,
    },
    {
      date: 8,
      status: "Planned" as ContentStatus,
      title: "how to choose a marketing agency",
      keywordDifficulty: 1,
      searchVolume: 90,
    },
    {
      date: 9,
      status: "Planned" as ContentStatus,
      title: "digital marketing for startups",
      keywordDifficulty: 2,
      searchVolume: 880,
    },
    {
      date: 10,
      status: "Planned" as ContentStatus,
      title: "digital marketing strategies",
      keywordDifficulty: 20,
      searchVolume: 27100,
    },
    {
      date: 11,
      status: "Planned" as ContentStatus,
      title: "impact of digital marketing",
      keywordDifficulty: 2,
      searchVolume: 480,
    },
    {
      date: 12,
      status: "Planned" as ContentStatus,
      title: "lead generation techniques",
      keywordDifficulty: 27,
      searchVolume: 1000,
    },
    // Add more content for other days
  ]

  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "Downloaded":
        return "bg-orange-100 text-orange-800"
      case "Planned":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  // Get day names
  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  // Calculate days for the calendar grid
  const getDaysGrid = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Adjust for Monday start
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

    const daysGrid: (ContentDay | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      daysGrid.push(null)
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const contentForDay = contentData.find((item) => item.date === i)
      if (contentForDay) {
        daysGrid.push(contentForDay)
      } else {
        daysGrid.push({ date: i, status: "Planned" })
      }
    }

    return daysGrid
  }

  const daysGrid = getDaysGrid()

  return (
    <div className="h-full p-4 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Content Plan</h1>
          <p className="text-sm text-gray-500">You can change content plan by hovering over the calendar</p>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-medium py-2">
              {day}
            </div>
          ))}

          {daysGrid.map((day, index) => (
            <div
              key={index}
              className={`border rounded-lg p-2 min-h-[120px] ${!day ? "border-transparent" : "border-gray-200"}`}
            >
              {day && (
                <>
                  <div className="text-right font-medium mb-2">{day.date}</div>
                  {day.title && (
                    <>
                      <div className={`text-xs px-2 py-1 rounded-md ${getStatusColor(day.status)}`}>{day.status}</div>
                      <div className="mt-2 text-xs">
                        <p className="font-medium truncate">{day.title}</p>
                        {day.keywordDifficulty && (
                          <p className="text-gray-500">Keyword Difficulty: {day.keywordDifficulty}</p>
                        )}
                        {day.searchVolume && <p className="text-gray-500">Search volume: {day.searchVolume}</p>}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
