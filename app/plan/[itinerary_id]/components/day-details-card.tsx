"use client"

import React from 'react'
import Link from 'next/link'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { ChevronRight, Clock } from 'lucide-react'
import { Badge } from 'lucide-react'
import { DayDetails } from '@/types/itinerary'
import { formatTime, getCategoryColor } from '@/utils/itinerary-utils'

function DayDetailsCard({itineraryId, day}: {itineraryId: string, day: DayDetails}) {

  return (
    <div className="space-y-3" key={day.day_id}>
      <Link href={`/plan/${itineraryId}/day/${day.day_id.toLowerCase().replace(" ", "-")}`}>
        <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden border-l-4 border-l-teal-500 dark:border-l-teal-400 w-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>{day.day_id}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardTitle>
            <CardDescription>
              {day.activities.length} {day.activities.length === 1 ? "activity" : "activities"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {day.activities.slice(0, 2).map((activity) => (
                <li key={activity.activity_id} className="flex items-start gap-3">
                  <Badge className={`mt-1 ${getCategoryColor(activity.category)}`}>
                    {activity.category.split(" ")[0]}
                  </Badge>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(activity.time)} • {activity.duration}{" "}
                      {activity.duration === 1 ? "hour" : "hours"}
                    </p>
                  </div>
                </li>
              ))}
              {day.activities.length > 2 && (
                <li className="text-sm text-gray-500 dark:text-gray-400">
                  +{day.activities.length - 2} more activities
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default DayDetailsCard