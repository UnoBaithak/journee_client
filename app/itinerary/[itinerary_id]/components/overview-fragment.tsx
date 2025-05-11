import React from 'react'

import { DayDetails, Itinerary } from '@/types/itinerary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { formatTime, getCategoryColor } from '@/utils/itinerary-utils'

function DayCard({day, itineraryId}: {day: DayDetails, itineraryId: string}) {
  return (
    <div key={day.day_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{day.day_id}</h2>
          <Button asChild variant="outline">
            <Link href={`/itinerary/${itineraryId}/day/${day.day_id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <ul className="space-y-6">
          {day.activities.map((activity) => (
            <li key={activity.activity_id} className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatTime(activity.time)}
                </span>
                <span className="font-medium">
                  {activity.duration} {activity.duration === 1 ? "hour" : "hours"}
                </span>
                <Badge className={`mt-2 self-start ${getCategoryColor(activity.category)}`}>
                  {activity.category}
                </Badge>
              </div>
              <div className="md:w-3/4">
                <h3 className="font-bold text-lg">{activity.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{activity.description}</p>

                {activity.pois.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activity.pois.map((poi) => (
                      <Badge key={poi.name} variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {poi.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function OverviewFragment({ dayDetails, itineraryId }: { dayDetails: DayDetails[], itineraryId: string }) {
  return (
    <div className="space-y-8">
      {dayDetails.map((day) => (
        <DayCard itineraryId={itineraryId} day={day} />
      ))}
    </div>
  )
}

export default OverviewFragment