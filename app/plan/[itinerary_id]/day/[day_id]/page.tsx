"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowLeft, Send, PlusCircle, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useConversation } from "@/context/conversation-context"
import { formatTime, getCategoryColor } from "@/utils/itinerary-utils"
import { DayDetails, Itinerary } from "@/types/itinerary"

export default function DayPlanPage() {
  const params = useParams()
  const itineraryId = params.itinerary_id as string
  const dayId = params.day_id as string
  const formattedDayId = `Day ${dayId}`
  const dayNumber = parseInt(dayId)

  const {conversationDetails, setConversationDetails} = useConversation();
  const itineraryDetails = conversationDetails?.itineraryDetails;
  const dayDetails = itineraryDetails?.details[dayNumber-1]
  const [userInput, setUserInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle user input
    console.log("User input:", userInput)
    setUserInput("")
  }

  if (!itineraryDetails || !dayDetails) {
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
                {itineraryDetails.metadata.destination}
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
