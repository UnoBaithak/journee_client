

// Function to format time from the API format
export const formatTime = (timeString: string) => {
    try {
        const date = new Date(timeString)
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch (e) {
        return "Time not available"
    }
}

// Function to get category color
export const getCategoryColor = (category: string) => {
    switch (category) {
        case "Nature & Sightseeing":
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
        case "Adventure":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        case "Relaxation":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
        case "Travel":
            return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
}