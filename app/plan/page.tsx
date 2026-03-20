"use client";

import { useState } from "react";

import Loading from "./loading";
import HeroSection from "./section/hero-section";
import { Header } from "@/components/header";

export default function PlanPage() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      {/* Hero section with background */}
      <HeroSection setLoading={setLoading} />
      {/* Popular destinations */}
      {/* <PopularDestinationsSection /> */}
      {/* Travel inspiration */}
      {/* <TravelInspirationSection /> */}
    </main>
  );
}
