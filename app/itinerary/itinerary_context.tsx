// context/ItineraryContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface POI {
    name: string
    lat: number
    lon: number
    category: string | null
    description: string
    website: string
}

interface Activity {
    activity_id: string
    pois: POI[]
    title: string
    time: string
    duration: number
    category: string
    description: string
}

interface DayDetails {
    day_id: string
    activities: Activity[]
}

interface Itinerary {
    _id: string
    metadata: {
        destination: string
        num_days: number
        preferences: string
    }
    title: string
    details: DayDetails[]
    created_at: string
    updated_at: string
}

const ItineraryContext = createContext<{ itineraryDetails: Itinerary | null, setItineraryDetails: (itinerary: Itinerary) => void } 
                                        | null>(null);

export const ItineraryProvider = ({ children }: { children: React.ReactNode }) => {
    const [itineraryDetails, setItineraryDetails] = useState<Itinerary | null>(null);

    return (
        <ItineraryContext.Provider value={{ itineraryDetails, setItineraryDetails }}>
            {children}
        </ItineraryContext.Provider>
    );
};

export const useItinerary = () => {
    const context = useContext(ItineraryContext);
    if (!context) {
        throw new Error("useItinerary must be used within Itinerary Provider");
    }
    return context;
}