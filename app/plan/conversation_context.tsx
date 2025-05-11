// context/ItineraryContext.tsx
'use client';

import { Itinerary } from '@/types/itinerary';
import { createContext, useContext, useState } from 'react';

interface ConversationDetails {
    itinerary_id: string,
    itineraryDetails: Itinerary | null
}

const ConversationContext = createContext<{ conversationDetails: ConversationDetails | null, setConversationDetails: (itinerary: ConversationDetails) => void } 
                                        | null>(null);

export const ConversationContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [conversationDetails, setConversationDetails] = useState<ConversationDetails | null>(null);

    return (
        <ConversationContext.Provider value={{ conversationDetails, setConversationDetails }}>
            {children}
        </ConversationContext.Provider>
    );
};

export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error("useItinerary must be used within Itinerary Provider");
    }
    return context;
}