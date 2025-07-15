// context/ItineraryContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import { Itinerary } from '@/types/itinerary';

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