"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useItinerary } from "@/context/itinerary-context"
import ItineraryHeroSection from "./components/itinerary-hero-section"
import OverviewFragment from "./components/overview-fragment"
import DocumentsFragment from "./components/documents-fragment"
import MapFragment from "./components/map-fragment"
import NotesFragment from "./components/notes-fragment"


export default function ItineraryViewPage() {
  const params = useParams()
  const router = useRouter()
  const itineraryId = params.itinerary_id as string

  const { itineraryDetails, setItineraryDetails } = useItinerary();
  const [canEdit, setCanEdit] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        // Simulating API call delay
        const response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/itinerary/${itineraryId}`)).json();
        setItineraryDetails(response["itinerary"])
        setCanEdit(response["canEdit"])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setLoading(false)
      }
    }

    fetchItinerary()
  }, [itineraryId])

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
      <ItineraryHeroSection canEdit={canEdit} itineraryDetails={itineraryDetails} itineraryId={itineraryId} />

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
              <OverviewFragment dayDetails={itineraryDetails.details} itineraryId={itineraryId} />
            </TabsContent>

            <TabsContent value="map">
              <MapFragment travelDestination={itineraryDetails.metadata.destination} />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsFragment />
            </TabsContent>

            <TabsContent value="notes">
              <NotesFragment />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
