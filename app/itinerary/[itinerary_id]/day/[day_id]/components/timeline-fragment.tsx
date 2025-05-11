import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { formatTime, getCategoryColor } from '@/utils/itinerary-utils'
import { Camera, Car, Clock, Hotel, MapPin, Map } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { DayDetails } from '@/types/itinerary'

interface TimelineFragmentProps {
    dayDetails: DayDetails
}

function TimelineFragment({dayDetails}: TimelineFragmentProps) {

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

    return (
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
    )
}

export default TimelineFragment