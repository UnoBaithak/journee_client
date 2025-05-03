// app/itinerary/layout.tsx
import { ItineraryProvider } from '@/app/itinerary/itinerary_context';

export default function ItineraryLayout({ children }: { children: React.ReactNode }) {
    return (
        <ItineraryProvider>
            {children}
        </ItineraryProvider>
    );
}