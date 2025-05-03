"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, PlusCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface Itinerary {
  id: string
  title: string
  destination: string
  days: number
  startDate: string
  status: "upcoming" | "past" | "draft"
  image: string
}

export default function UserItinerariesPage() {
  const params = useParams()
  const username = params.username as string

  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch the user's itineraries from an API
    const fetchItineraries = async () => {
      try {
        // Simulating API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // This would be an actual fetch in a real app
        // const response = await fetch(`/api/users/${username}/itineraries`)
        // const data = await response.json()

        // Using sample data
        const sampleData: Itinerary[] = [
          {
            id: "680e99f9372c01bc1191c1b4",
            title: "7-Day Canadian Adventure Itinerary",
            destination: "Canada",
            days: 7,
            startDate: "2024-10-20",
            status: "upcoming",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "680e99f9372c01bc1191c1b5",
            title: "Weekend in Paris",
            destination: "France",
            days: 3,
            startDate: "2024-11-15",
            status: "upcoming",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "680e99f9372c01bc1191c1b6",
            title: "Tokyo Explorer",
            destination: "Japan",
            days: 10,
            startDate: "2024-09-05",
            status: "past",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "680e99f9372c01bc1191c1b7",
            title: "Italian Getaway",
            destination: "Italy",
            days: 5,
            startDate: "2024-12-10",
            status: "draft",
            image: "/placeholder.svg?height=200&width=300",
          },
        ]

        setItineraries(sampleData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching itineraries:", error)
        setLoading(false)
      }
    }

    fetchItineraries()
  }, [username])

  // Filter itineraries by status
  const upcomingItineraries = itineraries.filter((item) => item.status === "upcoming")
  const pastItineraries = itineraries.filter((item) => item.status === "past")
  const draftItineraries = itineraries.filter((item) => item.status === "draft")

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-64 mb-8" />

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </TabsList>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 rounded-lg" />
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Itineraries</h1>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
            <Link href="/plan">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingItineraries.length > 0 ? (
              <div className="space-y-4">
                {upcomingItineraries.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">No upcoming itineraries found.</p>
                <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
                  <Link href="/plan">Plan a Trip</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastItineraries.length > 0 ? (
              <div className="space-y-4">
                {pastItineraries.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">No past itineraries found.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="drafts">
            {draftItineraries.length > 0 ? (
              <div className="space-y-4">
                {draftItineraries.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-gray-500 dark:text-gray-400">No draft itineraries found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <Link href={`/itinerary/${itinerary.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col md:flex-row">
          <div
            className="md:w-1/3 h-48 md:h-auto bg-cover bg-center"
            style={{ backgroundImage: `url(${itinerary.image})` }}
          >
            <div className="h-full w-full bg-black bg-opacity-20 flex items-start justify-end p-4">
              <Badge
                className={`
                ${
                  itinerary.status === "upcoming"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : itinerary.status === "past"
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                }
              `}
              >
                {itinerary.status === "upcoming" ? "Upcoming" : itinerary.status === "past" ? "Past" : "Draft"}
              </Badge>
            </div>
          </div>

          <div className="md:w-2/3">
            <CardHeader>
              <CardTitle>{itinerary.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>{itinerary.destination}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>{formatDate(itinerary.startDate)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>
                  {itinerary.days} {itinerary.days === 1 ? "day" : "days"}
                </span>
              </div>
            </CardContent>

            <CardFooter className="text-sm text-teal-600 dark:text-teal-400">View details →</CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  )
}
