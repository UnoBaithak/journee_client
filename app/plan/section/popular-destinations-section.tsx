import React from "react"
import { Compass, MapPin, Plane } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PopularDestinationsSection() {

  // Popular destinations with images
  // ideally you fetch this from some link / api call
  const popularDestinations = [
    { name: "Paris", country: "France", image: "/placeholder.svg?height=300&width=300" },
    { name: "Tokyo", country: "Japan", image: "/placeholder.svg?height=300&width=300" },
    { name: "New York", country: "USA", image: "/placeholder.svg?height=300&width=300" },
    { name: "Bali", country: "Indonesia", image: "/placeholder.svg?height=300&width=300" },
  ]

  return (
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
  )
}