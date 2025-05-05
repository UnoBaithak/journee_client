import { Loader2 } from "lucide-react"

export default function Loading() {
  const loadingMessages = [
    "Loading your adventure...",
    "Preparing your itinerary...",
    "Getting everything ready...",
    "Gathering travel details...",
    "Almost there...",
  ]

  // Select a random message
  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with background */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="max-w-6xl mx-auto w-full text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-6 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-6 w-32 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
            </div>
            <div className="h-10 w-3/4 bg-white/30 dark:bg-white/20 rounded-md animate-pulse mb-4"></div>
            <div className="flex flex-wrap gap-3">
              <div className="h-10 w-32 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-10 w-24 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
              <div className="h-10 w-28 bg-white/30 dark:bg-white/20 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <Loader2 className="h-12 w-12 animate-spin text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{randomMessage}</h2>
          <p className="text-gray-600 dark:text-gray-300">This will just take a moment</p>
        </div>
      </div>
    </main>
  )
}
