"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Camera, Map, Hotel, Car, Clock, Calendar, MapPin, Edit, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useItinerary } from "@/app/itinerary/itinerary_context"

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

export default function DayViewPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string
  const dayId = params.day_id as string
  const formattedDayId = dayId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const dayNumber = parseInt(dayId.split("-").at(1)?.trim()??"1")

  const {itineraryDetails, setItineraryDetails} = useItinerary();

  const [dayDetails, setDayDetails] = useState<DayDetails | undefined>(itineraryDetails?.details[dayNumber-1])
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   // In a real app, fetch the itinerary data from an API
  //   const fetchItinerary = async () => {
  //     try {
  //       // Simulating API call delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000))

  //       // Using the sample data provided
  //       const sampleData: Itinerary = {
  //         _id: "680e99f9372c01bc1191c1b4",
  //         metadata: {
  //           destination: "Canada",
  //           num_days: 7,
  //           preferences: "Adventure solo trip",
  //         },
  //         title: "7-Day Canadian Adventure Itinerary",
  //         details: [
  //           {
  //             day_id: "Day 1",
  //             activities: [
  //               {
  //                 activity_id: "activity_1",
  //                 pois: [
  //                   {
  //                     name: "Banff National Park",
  //                     lat: 51.4881335,
  //                     lon: -115.9380498,
  //                     category: null,
  //                     description: "Explore the stunning mountain scenery, turquoise lakes, and abundant wildlife.",
  //                     website: "www.pc.gc.ca/en/pn-np/ab/banff",
  //                   },
  //                 ],
  //                 title: "Arrival in Banff & Sightseeing",
  //                 time: "1400-10-20T21:00:00",
  //                 duration: 4,
  //                 category: "Nature & Sightseeing",
  //                 description:
  //                   "Arrive at Calgary International Airport (YYC), pick up rental car, and drive to Banff (approx. 1.5 hrs). Check into your hotel and spend the afternoon exploring the townsite, taking in the views of the surrounding mountains.",
  //               },
  //               {
  //                 activity_id: "activity_2",
  //                 pois: [],
  //                 title: "Banff Gondola Ride",
  //                 time: "1800-10-21T01:00:00",
  //                 duration: 2,
  //                 category: "Adventure",
  //                 description:
  //                   "Take a gondola ride up Sulphur Mountain for panoramic views of Banff and the Bow Valley.",
  //               },
  //             ],
  //           },
  //           {
  //             day_id: "Day 2",
  //             activities: [
  //               {
  //                 activity_id: "activity_3",
  //                 pois: [
  //                   {
  //                     name: "Lake Louise",
  //                     lat: 51.4249668,
  //                     lon: -116.177535,
  //                     category: null,
  //                     description: "Iconic turquoise lake nestled in the heart of Banff National Park.",
  //                     website: "www.pc.gc.ca/en/pn-np/ab/banff/activites/lac-louise",
  //                   },
  //                 ],
  //                 title: "Lake Louise Exploration",
  //                 time: "0900-10-21T16:00:00",
  //                 duration: 4,
  //                 category: "Nature & Sightseeing",
  //                 description:
  //                   "Visit the breathtaking Lake Louise, rent a canoe, or take a short hike around the lake. Enjoy the scenery and capture stunning photos.",
  //               },
  //               {
  //                 activity_id: "activity_4",
  //                 pois: [],
  //                 title: "Moraine Lake",
  //                 time: "1400-10-21T21:00:00",
  //                 duration: 3,
  //                 category: "Nature & Sightseeing",
  //                 description:
  //                   "Drive to Moraine Lake, another stunning glacial lake with incredible views. Take a short walk or simply relax by the lake and enjoy the tranquility.",
  //               },
  //             ],
  //           },
  //         ],
  //         created_at: "2024-10-20T12:00:00",
  //         updated_at: "2024-10-20T12:00:00",
  //       }

  //       setItinerary(sampleData)
        
  //       // Find the day details that match the day_id from the URL
  //       const day = sampleData.details.find(
  //         (d) => d.day_id.toLowerCase().replace(" ", "-") === dayId
  //       )
  //       setDayDetails(day || undefined)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error fetching itinerary:", error)
  //       setLoading(false)
  //     }
  //   }

  //   fetchItinerary()
  // }, [itineraryId, dayId])

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

  // Function to get icon for activity category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Nature & Sightseeing":
        return <Camera className="h-4 w-4" />
      case "Adventure":
        return <Map className="h-4 w-4" />
      case "Relaxation":
        return <Hotel className="h-4 w-4" />
      case "Travel":
        return <Car className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const editDay = () => {
    router.push(`/plan/${itineraryId}/day/${dayId}`)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
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
      </main>
    )
  }

  if (!itineraryDetails || !dayDetails) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-2xl font-bold">Day not found</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">The day you're looking for doesn't exist in this itinerary.</p>
        <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
          <Link href={`/itinerary/${itineraryId}`}>Back to Itinerary</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with background */}
      <div className="relative h-[30vh] w-full overflow-hidden">
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
            <Button
              variant="ghost"
              className="mb-4 pl-0 hover:bg-transparent hover:text-white/80 text-white"
              asChild
            >
              <Link href={`/itinerary/${itineraryId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Itinerary
              </Link>
            </Button>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40">
                <Calendar className="h-3 w-3" />
                {dayDetails.day_id}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40">
                <MapPin className="h-3 w-3" />
                {itineraryDetails.metadata.destination}
              </Badge>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-3xl md:text-4xl font-bold drop-shadow-md">{dayDetails.day_id} of {itineraryDetails.title}</h1>
              <Button onClick={editDay} className="bg-teal-600 hover:bg-teal-700">
                <Edit className="mr-2 h-4 w-4" />
                Edit with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/4 w-px h-full bg-gray-200 dark:bg-gray-700 transform translate-x-4 md:translate-x-0"></div>
                
                <div className="space-y-8 ml-10 md:ml-0">
                  {dayDetails.activities.map((activity, index) => (
                    <div key={activity.activity_id} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/4 w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 border-4 border-teal-500 dark:border-teal-600 transform -translate-x-4 md:-translate-x-4 flex items-center justify-center">
                        {getCategoryIcon(activity.category)}
                      </div>
                      
                      <div className="md:ml-[calc(25%+2rem)]">
                        <Card className="overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{activity.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(activity.time)} • {activity.duration} {activity.duration === 1 ? "hour" : "hours"}
                                </CardDescription>
                              </div>
                              <Badge className={getCategoryColor(activity.category)}>
                                {activity.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
                            
                            {activity.pois.length > 0 && (
                              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                                <h4 className="font-medium mb-3">Points of Interest:</h4>
                                <ul className="space-y-4">
                                  {activity.pois.map((poi) => (
                                    <li key={poi.name}>
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
                        </Card>
                      </div>
                    </div>
                  ))
                }
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card>
                <CardHeader>
                  <CardTitle>Day Map</CardTitle>
                  <CardDescription>View all locations for {dayDetails.day_id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 dark:bg-gray-700 h-[500px] rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Interactive map would be displayed here</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Showing all locations for {dayDetails.day_id} in {itineraryDetails.metadata.destination}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>Photos from your activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                      dayDetails.activities.map((activity) => (
                        <div
                          key={activity.activity_id}
                          className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center"
                        >
                          <Camera className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                      ))
                    }
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
