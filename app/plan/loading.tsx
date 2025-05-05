"use client"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const loadingMessages = [
  "Planning your journey...",
  "Finding the best spots...",
  "Discovering hidden gems...",
  "Mapping your adventure...",
]

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (messageIndex >= loadingMessages.length - 1) return

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    },  3000) // 3 seconds per message

    return () => clearInterval(interval)
  }, [messageIndex])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Loader2 className="h-12 w-12 animate-spin text-teal-600 dark:text-teal-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {loadingMessages[messageIndex]}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">This will just take a moment</p>
      </div>
    </div>
  )
}