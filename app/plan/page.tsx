"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Plane, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useConversation } from "./conversation_context"
import { useRouter } from "next/navigation"

export default function PlanPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { conversationDetails, setConversationDetails } = useConversation()
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault()
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/itinerary/generate`, {
          method: "POST",
          body: JSON.stringify({"user_input": searchQuery}),
          headers: {
              "Content-Type": "application/json"
            }
        })
        
        let {conversation_id, itinerary_id} = await res.json();
        setConversationDetails({conversation_id, itinerary_id})
        router.push(`/plan/${itinerary_id}`)
  }

  // Popular destinations with images
  const popularDestinations = [
    { name: "Paris", country: "France", image: "/placeholder.svg?height=200&width=300" },
    { name: "Tokyo", country: "Japan", image: "/placeholder.svg?height=200&width=300" },
    { name: "New York", country: "USA", image: "/placeholder.svg?height=200&width=300" },
    { name: "Bali", country: "Indonesia", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with background */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Start Your Journey</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Discover new destinations and create unforgettable memories
            </p>
            <Card className="w-full max-w-lg shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardContent className="pt-6 pb-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Where would you like to go?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-6 text-lg bg-white dark:bg-gray-800"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                  >
                    Plan My Trip
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular destinations */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <Compass className="mr-2 h-6 w-6 text-teal-600 dark:text-teal-400" />
            Popular Destinations
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Trending places to explore this season</p>
        </div>

        <div className="space-y-4">
          {popularDestinations.map((destination, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  ></div>
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between bg-white dark:bg-gray-800">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {destination.country}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Discover the magic of {destination.name} with our curated travel experiences.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600">
                      <Plane className="mr-2 h-4 w-4" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel inspiration */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Travel Inspiration</h2>
            <p className="text-gray-600 dark:text-gray-300">Ideas to spark your next adventure</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["Adventure", "Relaxation", "Cultural", "Food & Drink"].map((category, index) => (
              <Card
                key={index}
                className="w-full md:w-64 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                      <Compass className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{category}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Discover {category.toLowerCase()} experiences tailored just for you
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
