// app/page.js or app/page.tsx

import React from 'react';

import { Card } from '@/components/ui/card';

// This is where we will fetch data directly in a server-side environment.
async function fetchData(itinerary_id: string) {
    const res = await fetch('http://localhost:8080/api/itinerary/' + itinerary_id); // Update with actual endpoint
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const ItineraryPage = async ({
    params,
  }: {
    params: { itinerary_id: string };
  }) => {
    const data = await fetchData(params.itinerary_id);

    return (
        <div>
            <h1>Your Itinerary</h1>
            <div>
                {data.details.map((day, index) => (
                    <div key={index}>
                        <h2>{day.day_id}</h2>
                        {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex}>
                                <h3>{activity.title}</h3>
                                <p>{activity.description}</p>
                                <p>{activity.time}</p>
                                {/* Map POIs here */}
                                {activity.pois?.map((poi, poiIndex) => (
                                    <div key={poiIndex}>
                                        <p>{poi.name}</p>
                                        <a href={poi.website}>More info</a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItineraryPage;