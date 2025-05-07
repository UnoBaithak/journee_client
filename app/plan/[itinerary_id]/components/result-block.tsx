"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plane, ChevronRight, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Itinerary } from '@/types/itinerary'
import DayDetailsCard from './day-details-card'

interface ResultBlockProps {
    itineraryId: string,
    itinerary: Itinerary
}

function ResultBlock({ itineraryId, itinerary }: ResultBlockProps) {
    const router = useRouter();

    const saveItinerary = async () => {
        console.log("Save itinerary")
        router.push(`/itinerary/${itineraryId}`)
    }

    return (
        <div className="flex-grow p-4 md:p-8 h-[65vh] overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Planning Your Trip</h2>
                    <Button
                        onClick={saveItinerary}
                        className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                    >
                        <Plane className="mr-2 h-4 w-4" />
                        Save Itinerary
                    </Button>
                </div>

                <div className="space-y-6">
                    {itinerary.details.map((day) => (
                        <DayDetailsCard itineraryId={itineraryId} day={day} key={day.day_id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ResultBlock