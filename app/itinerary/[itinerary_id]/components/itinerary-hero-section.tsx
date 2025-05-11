import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Share2, Edit, Download, Bookmark, MapPin, Calendar } from 'lucide-react'
import { Itinerary } from '@/types/itinerary'
import { useRouter } from 'next/navigation'


function ItineraryHeroSection({ itineraryDetails, itineraryId, canEdit }: { itineraryDetails: Itinerary, itineraryId: string, canEdit: boolean }) {
    const router = useRouter();

    const editItinerary = () => {
        router.push(`/plan/${itineraryId}`)
    }

    const cloneItinerary = () => {
        alert("You chose to clone this itinerary")
    }

    return (
        <div className="relative h-[50vh] w-full overflow-hidden">
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
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
                        >
                            <MapPin className="h-3 w-3" />
                            {itineraryDetails.metadata.destination}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
                        >
                            <Calendar className="h-3 w-3" />
                            {itineraryDetails.metadata.num_days} days
                        </Badge>
                        <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                            {itineraryDetails.metadata.preferences}
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{itineraryDetails.title}</h1>
                    <div className="flex flex-wrap gap-3">

                        <Button onClick={canEdit ? editItinerary : cloneItinerary} className="bg-teal-600 hover:bg-teal-700">
                            <Edit className="mr-2 h-4 w-4" />
                            {canEdit ? "Edit with AI ": "Clone"}
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
                        >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30"
                        >
                            <Bookmark className="mr-2 h-4 w-4" />
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItineraryHeroSection