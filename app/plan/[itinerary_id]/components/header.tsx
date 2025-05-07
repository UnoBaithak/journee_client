import React from 'react'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar } from 'lucide-react'

interface HeaderProps {
    imageUrl: string,
    itineraryTitle: string,
    itineraryMetadata: {
        destination: string,
        num_days: number,
        preferences: string
    }
}

function Header({ imageUrl, itineraryTitle, itineraryMetadata}: HeaderProps) {
    return (
        <div className="relative h-[30vh] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center p-8">
                <div className="text-white max-w-4xl mx-auto w-full">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">{itineraryTitle}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
                        >
                            <MapPin className="h-3 w-3" />
                            {itineraryMetadata.destination}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/40"
                        >
                            <Calendar className="h-3 w-3" />
                            {itineraryMetadata.num_days} days
                        </Badge>
                        <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                            {itineraryMetadata.preferences}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header