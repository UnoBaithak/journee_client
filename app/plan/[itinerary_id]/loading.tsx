import { Loader2 } from "lucide-react"

export default function Loading() {
  const loadingMessages = [
    "Planning your journey...",
    "Finding the best spots...",
    "Crafting your perfect itinerary...",
    "Discovering hidden gems...",
    "Mapping your adventure...",
  ]

  // Select a random message
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header with background */}
      <div className="relative h-[30vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
        </div>
        <div className="absolute inset-0 flex items-center p-8">
          <div className="text-white max-w-4xl mx-auto w-full">
            <div className="h-8 w-3/4 bg-white/30 dark:bg-white/20 rounded-md animate-pulse mb-4"></div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-6 w-32 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-12 w-12 animate-spin text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{randomMessage}</h2>
          <p className="text-gray-600 dark:text-gray-300">This will just take a moment</p>
        </div>
      </div>

      {/* Input bar at bottom */}
      <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <div className="h-10 flex-grow bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </main>
  )
}
