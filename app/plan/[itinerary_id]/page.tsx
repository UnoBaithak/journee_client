"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, ChevronRight, Send, PlusCircle, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Define TypeScript interfaces based on the JSON schema
interface POI {
  name: string
  lat: number
  lon: number
  category: string | null
  description: string
  website: string
}

interface Activity {
  activity_id: string
  pois: POI[]
  title: string
  time: string
  duration: number
  category: string
  description: string
}

interface DayDetails {
  day_id: string
  activities: Activity[]
}

interface Itinerary {
  _id: string
  metadata: {
    destination: string
    num_days: number
    preferences: string
  }
  title: string
  details: DayDetails[]
  created_at: string
  updated_at: string
}

export default function ItineraryPlanPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string

  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/itinerary/${itineraryId}`)
        const data = await response.json()

        setItinerary(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setLoading(false)
      }
    }

    fetchItinerary()
  }, [itineraryId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle user input
    console.log("User input:", userInput)
    setUserInput("")
  }

  // Function to format time from the API format
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch (e) {
      return "Time not available"
    }
  }

  // Function to get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Nature & Sightseeing":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Adventure":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Relaxation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "Travel":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const viewItinerary = () => {
    router.push(`/itinerary/${itineraryId}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-grow p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Input bar at bottom */}
        <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-grow" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!itinerary) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-2xl font-bold">Itinerary not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The itinerary you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
          <Link href="/plan">Create New Plan</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header with background */}
      <div className="relative h-[30vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center p-8">
          <div className="text-white max-w-4xl mx-auto w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">{itinerary.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
              >
                <MapPin className="h-3 w-3" />
                {itinerary.metadata.destination}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
              >
                <Calendar className="h-3 w-3" />
                {itinerary.metadata.num_days} days
              </Badge>
              <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                {itinerary.metadata.preferences}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-xl font-bold">Planning Your Trip</h2>
            <Button
              onClick={viewItinerary}
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              <Plane className="mr-2 h-4 w-4" />
              View Full Itinerary
            </Button>
          </div>

          <div className="space-y-4">
            {itinerary.details.map((day) => (
              <Link href={`/plan/${itineraryId}/day/${day.day_id.toLowerCase().replace(" ", "-")}`} key={day.day_id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden border-l-4 border-l-teal-500 dark:border-l-teal-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{day.day_id}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </CardTitle>
                    <CardDescription>
                      {day.activities.length} {day.activities.length === 1 ? "activity" : "activities"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {day.activities.slice(0, 2).map((activity) => (
                        <li key={activity.activity_id} className="flex items-start gap-3">
                          <Badge className={`mt-1 ${getCategoryColor(activity.category)}`}>
                            {activity.category.split(" ")[0]}
                          </Badge>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(activity.time)} • {activity.duration}{" "}
                              {activity.duration === 1 ? "hour" : "hours"}
                            </p>
                          </div>
                        </li>
                      ))}
                      {day.activities.length > 2 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400">
                          +{day.activities.length - 2} more activities
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <Button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
              <PlusCircle className="h-4 w-4" />
              Add Another Day
            </Button>
          </div>
        </div>
      </div>

      {/* Input bar at bottom */}
      <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-grow relative">
              <Input
                placeholder="Ask anything about your itinerary..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="pr-10 bg-white dark:bg-gray-800"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="bg-teal-100 text-teal-600 text-xs dark:bg-teal-900 dark:text-teal-300">
                    AI
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <Button
              type="submit"
              size="icon"
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
