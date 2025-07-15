// app/itinerary/layout.tsx
import { ItineraryProvider } from '@/context/itinerary-context';

export default function ItineraryLayout({ children }: { children: React.ReactNode }) {
    return (
        <ItineraryProvider>
            {children}
        </ItineraryProvider>
    );
}