import React from 'react'
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card'
import { Map } from 'lucide-react'

function MapFragment({travelDestination}: {travelDestination: string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>View all locations in your itinerary</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-gray-200 dark:bg-gray-700 h-[500px] rounded-md flex items-center justify-center">
                    <div className="text-center">
                        <Map className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Interactive map would be displayed here</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Showing all locations in {travelDestination}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MapFragment