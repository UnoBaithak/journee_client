"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignUpForm from "@/app/auth/components/sign-up-form"
import LoginForm from "@/app/auth/components/login-form"
import TravelImage from "@/components/travel-image"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup")

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Travel Image - 40% width on wide screens, hidden on mobile */}
      <div className="hidden md:block md:w-2/5">
        <TravelImage />
      </div>

      {/* Form Area - full width on mobile, 60% on wide screens */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Journee</h1>
            <p className="text-gray-500 mt-2">Your next adventure awaits</p>
          </div>

          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
