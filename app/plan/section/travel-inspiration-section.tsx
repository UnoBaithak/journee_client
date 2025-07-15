import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Compass } from "lucide-react"

export default function TravelInspirationSection() {
  return (
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
  )
}