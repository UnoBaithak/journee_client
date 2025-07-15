"use client"

import type React from "react"

import { useState } from "react"

import Loading from "./loading"
import TravelInspirationSection from "./section/travel-inspiration-section"
import PopularDestinationsSection from "./section/popular-destinations-section"
import HeroSection from "./section/hero-section"

export default function PlanPage() {

  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero section with background */}
      <HeroSection setLoading={setLoading} />

      {/* Popular destinations */}
      <PopularDestinationsSection />

      {/* Travel inspiration */}
      <TravelInspirationSection />

    </main>
  )
}
