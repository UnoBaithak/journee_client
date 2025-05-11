export interface POI {
    name: string
    lat: number
    lon: number
    category: string | null
    description: string
    website: string
}

export interface Activity {
    activity_id: string
    pois: POI[]
    title: string
    time: string
    duration: number
    category: string
    description: string
}

export interface DayDetails {
    day_id: number
    activities: Activity[]
}

export interface Itinerary {
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