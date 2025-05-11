"use client"

import { useState} from "react"
import { useParams, useRouter } from "next/navigation"
import { Camera, Map, Hotel, Car, Clock} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useItinerary } from "@/app/itinerary/itinerary_context"
import { DayDetails } from "@/types/itinerary"
import HeroSection from "./components/hero-section"
import TimelineFragment from "./components/timeline-fragment"
import MapFragment from "../../components/map-fragment"
import PhotosFragment from "./components/photos-fragment"

export default function DayViewPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string
  const dayId = params.day_id as string
  console.log(dayId)
  const formattedDayId = `Day ${dayId}`
  const dayNumber = parseInt(dayId)
  console.log(dayNumber);
  const { itineraryDetails, setItineraryDetails } = useItinerary();

  const dayDetails = itineraryDetails?.details[dayNumber-1]
  console.log(dayDetails)

  const editDay = () => {
    router.push(`/plan/${itineraryId}/day/${dayId}`)
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
      <HeroSection 
        itineraryId={itineraryId}
        destination={itineraryDetails.metadata.destination}
        itineraryTitle={itineraryDetails.title} 
        dayDetails={dayDetails}
        editDay={editDay}
      />

      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <TimelineFragment dayDetails={dayDetails} />
            </TabsContent>

            <TabsContent value="map">
              <MapFragment travelDestination={itineraryDetails.metadata.destination} />
            </TabsContent>

            <TabsContent value="photos">
              <PhotosFragment dayDetails={dayDetails} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
