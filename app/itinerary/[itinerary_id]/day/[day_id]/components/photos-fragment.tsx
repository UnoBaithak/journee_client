import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DayDetails } from '@/types/itinerary'
import { Camera } from 'lucide-react'
import React from 'react'

function PhotosFragment({dayDetails}: {dayDetails: DayDetails}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Photos from your activities</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        dayDetails.activities.map((activity) => (
                            <div
                                key={activity.activity_id}
                                className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center"
                            >
                                <Camera className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                            </div>
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default PhotosFragment