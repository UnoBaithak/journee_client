"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "./components/header"
import ChatBar from "./components/chatbar"
import ResultBlock from "./components/result-block"
import { Itinerary } from "@/types/itinerary"
import { useConversation } from "../../../context/conversation-context"

export default function ItineraryPlanPage() {
    const params = useParams()
    const router = useRouter()
    const itineraryId = params.itinerary_id as string

    const [itinerary, setItinerary] = useState<Itinerary | null>(null)
    const { conversationDetails, setConversationDetails } = useConversation();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/itinerary/${itineraryId}`)
                const data = await response.json()

                if (data["canEdit"] != true) {
                    router.push(`/itinerary/${itineraryId}`)
                    setLoading(false)
                    return
                }

                setItinerary(data["itinerary"])
                if (conversationDetails?.itinerary_id) {
                    setConversationDetails({ 
                        itinerary_id: conversationDetails?.itinerary_id, 
                        itineraryDetails: data["itinerary"]
                    })
                }
                setLoading(false)
            } catch (error) {
                console.error("Error fetching itinerary:", error)
                setLoading(false)
            }
        }

        fetchItinerary()
    }, [itineraryId, conversationDetails?.itinerary_id])

    const saveItinerary = () => {
        router.push(`/itinerary/${itineraryId}`)
    }

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
                <div className="relative h-[30vh] w-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-pulse"
                        style={{
                            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center p-8">
                        <div className="text-white max-w-4xl mx-auto w-full">
                            <div className="h-8 w-3/4 bg-white/30 dark:bg-white/20 rounded-md animate-pulse mb-4"></div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
                                <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
                                <div className="h-6 w-32 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 flex justify-between items-center">
                            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                            <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                        </div>

                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse border-l-4 border-l-gray-300 dark:border-l-gray-600"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Input bar at bottom */}
                <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-2">
                            <div className="h-10 flex-grow bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
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
            <Header imageUrl="" itineraryTitle={itinerary.title} itineraryMetadata={itinerary.metadata} />
            <ResultBlock itinerary={itinerary} itineraryId={itineraryId} />
            <ChatBar />
        </main>
    )
}
