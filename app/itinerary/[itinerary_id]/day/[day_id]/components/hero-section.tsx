import { Link, ArrowLeft, Calendar, MapPin, Edit } from 'lucide-react'
import React, { MouseEventHandler } from 'react'
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DayDetails } from '@/types/itinerary';

interface HeroSectionProps {
    itineraryId: string,
    dayDetails: DayDetails,
    destination: string,
    itineraryTitle: string,
    editDay: MouseEventHandler<HTMLButtonElement>
}

function HeroSection({itineraryId, dayDetails, destination, itineraryTitle, editDay}: HeroSectionProps) {
    return (
        <div className="relative h-[30vh] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="max-w-6xl mx-auto w-full text-white">
                    <Button
                        variant="ghost"
                        className="mb-4 pl-0 hover:bg-transparent hover:text-white/80 text-white"
                        asChild
                    >
                        <Link href={`/itinerary/${itineraryId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Itinerary
                        </Link>
                    </Button>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40">
                            <Calendar className="h-3 w-3" />
                            {dayDetails.day_id}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40">
                            <MapPin className="h-3 w-3" />
                            {destination}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-end">
                        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-md">{dayDetails.day_id} of {itineraryTitle}</h1>
                        <Button onClick={editDay} className="bg-teal-600 hover:bg-teal-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit with AI
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection