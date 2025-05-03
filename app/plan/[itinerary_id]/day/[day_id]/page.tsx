"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowLeft, Send, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
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

export default function DayPlanPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string
  const dayId = params.day_id as string
  const formattedDayId = dayId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [dayDetails, setDayDetails] = useState<DayDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    // In a real app, fetch the itinerary data from an API
    const fetchItinerary = async () => {
      try {
        // Simulating API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Using the sample data provided
        const sampleData: Itinerary = {
          _id: "680e99f9372c01bc1191c1b4",
          metadata: {
            destination: "Canada",
            num_days: 7,
            preferences: "Adventure solo trip",
          },
          title: "7-Day Canadian Adventure Itinerary",
          details: [
            {
              day_id: "Day 1",
              activities: [
                {
                  activity_id: "activity_1",
                  pois: [
                    {
                      name: "Banff National Park",
                      lat: 51.4881335,
                      lon: -115.9380498,
                      category: null,
                      description: "Explore the stunning mountain scenery, turquoise lakes, and abundant wildlife.",
                      website: "www.pc.gc.ca/en/pn-np/ab/banff",
                    },
                  ],
                  title: "Arrival in Banff & Sightseeing",
                  time: "1400-10-20T21:00:00",
                  duration: 4,
                  category: "Nature & Sightseeing",
                  description:
                    "Arrive at Calgary International Airport (YYC), pick up rental car, and drive to Banff (approx. 1.5 hrs). Check into your hotel and spend the afternoon exploring the townsite, taking in the views of the surrounding mountains.",
                },
                {
                  activity_id: "activity_2",
                  pois: [],
                  title: "Banff Gondola Ride",
                  time: "1800-10-21T01:00:00",
                  duration: 2,
                  category: "Adventure",
                  description:
                    "Take a gondola ride up Sulphur Mountain for panoramic views of Banff and the Bow Valley.",
                },
              ],
            },
            {
              day_id: "Day 2",
              activities: [
                {
                  activity_id: "activity_3",
                  pois: [
                    {
                      name: "Lake Louise",
                      lat: 51.4249668,
                      lon: -116.177535,
                      category: null,
                      description: "Iconic turquoise lake nestled in the heart of Banff National Park.",
                      website: "www.pc.gc.ca/en/pn-np/ab/banff/activites/lac-louise",
                    },
                  ],
                  title: "Lake Louise Exploration",
                  time: "0900-10-21T16:00:00",
                  duration: 4,
                  category: "Nature & Sightseeing",
                  description:
                    "Visit the breathtaking Lake Louise, rent a canoe, or take a short hike around the lake. Enjoy the scenery and capture stunning photos.",
                },
                {
                  activity_id: "activity_4",
                  pois: [],
                  title: "Moraine Lake",
                  time: "1400-10-21T21:00:00",
                  duration: 3,
                  category: "Nature & Sightseeing",
                  description:
                    "Drive to Moraine Lake, another stunning glacial lake with incredible views. Take a short walk or simply relax by the lake and enjoy the tranquility.",
                },
              ],
            },
          ],
          created_at: "2024-10-20T12:00:00",
          updated_at: "2024-10-20T12:00:00",
        }

        setItinerary(sampleData)

        // Find the day details that match the day_id from the URL
        const day = sampleData.details.find((d) => d.day_id.toLowerCase().replace(" ", "-") === dayId)
        setDayDetails(day || null)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setLoading(false)
      }
    }

    fetchItinerary()
  }, [itineraryId, dayId])

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

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="flex-grow p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" />
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

  if (!itinerary || !dayDetails) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-2xl font-bold">Day not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The day you're looking for doesn't exist in this itinerary.
        </p>
        <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
          <Link href={`/plan/${itineraryId}`}>Back to Itinerary</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-grow p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4 pl-0 hover:bg-transparent hover:text-teal-600 dark:hover:text-teal-400"
              asChild
            >
              <Link href={`/plan/${itineraryId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Itinerary
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{dayDetails.day_id}</h1>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {itinerary.metadata.destination}
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            {dayDetails.activities.map((activity) => (
              <Card
                key={activity.activity_id}
                className="overflow-hidden border-l-4 border-l-teal-500 dark:border-l-teal-400"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{activity.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(activity.time)} • {activity.duration} {activity.duration === 1 ? "hour" : "hours"}
                      </CardDescription>
                    </div>
                    <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>

                  {activity.pois.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Points of Interest:</h4>
                      <ul className="space-y-3">
                        {activity.pois.map((poi) => (
                          <li key={poi.name} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium">{poi.name}</h5>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                View on Map
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{poi.description}</p>
                            {poi.website && (
                              <a
                                href={`https://${poi.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-teal-600 hover:underline dark:text-teal-400 mt-1 inline-block"
                              >
                                Visit Website
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 dark:text-red-400">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
              <PlusCircle className="h-4 w-4" />
              Add Activity
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
                placeholder={`Ask anything about ${dayDetails.day_id}...`}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800"
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
