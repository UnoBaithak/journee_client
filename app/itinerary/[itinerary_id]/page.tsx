"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Edit, Share2, Download, Bookmark, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useItinerary } from "../itinerary_context"

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

export default function ItineraryViewPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string

  const { itineraryDetails, setItineraryDetails } = useItinerary();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        // Simulating API call delay
        const itinerary = await(await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/itinerary/${itineraryId}`)).json(); 
        setItineraryDetails(itinerary)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setLoading(false)
      }
    }

    fetchItinerary()
  }, [itineraryId])

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

  const editItinerary = () => {
    router.push(`/plan/${itineraryId}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-64 w-full rounded-lg mb-8" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!itineraryDetails) {
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
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with background */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-6xl mx-auto w-full text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
              >
                <MapPin className="h-3 w-3" />
                {itineraryDetails.metadata.destination}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
              >
                <Calendar className="h-3 w-3" />
                {itineraryDetails.metadata.num_days} days
              </Badge>
              <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                {itineraryDetails.metadata.preferences}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{itineraryDetails.title}</h1>
            <div className="flex flex-wrap gap-3">
              <Button onClick={editItinerary} className="bg-teal-600 hover:bg-teal-700">
                <Edit className="mr-2 h-4 w-4" />
                Edit with AI
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-8">
                {itineraryDetails.details.map((day) => (
                  <div key={day.day_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{day.day_id}</h2>
                        <Button asChild variant="outline">
                          <Link href={`/itinerary/${itineraryId}/day/${day.day_id.toLowerCase().replace(" ", "-")}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-6">
                        {day.activities.map((activity) => (
                          <li key={activity.activity_id} className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/4 flex flex-col">
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                {formatTime(activity.time)}
                              </span>
                              <span className="font-medium">
                                {activity.duration} {activity.duration === 1 ? "hour" : "hours"}
                              </span>
                              <Badge className={`mt-2 self-start ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </Badge>
                            </div>
                            <div className="md:w-3/4">
                              <h3 className="font-bold text-lg">{activity.title}</h3>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">{activity.description}</p>

                              {activity.pois.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {activity.pois.map((poi) => (
                                    <Badge key={poi.name} variant="outline" className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {poi.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Map</CardTitle>
                  <CardDescription>View all locations in your itinerary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 dark:bg-gray-700 h-[500px] rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Interactive map would be displayed here</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Showing all locations in {itineraryDetails.metadata.destination}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Documents</CardTitle>
                  <CardDescription>Important documents for your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">No documents have been added yet.</p>
                    <Button>Upload Document</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Notes</CardTitle>
                  <CardDescription>Your personal notes for this trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">No notes have been added yet.</p>
                    <Button>Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
