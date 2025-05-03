"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import BrandLogo from "@/components/brand-logo"
import GoogleSignIn from "@/components/google-sign-in"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    alert(`Subscribed with: ${email}`)
    setEmail("")
  }

  const handleGoogleSignIn = (response: any) => {
    // Handle Google Sign-In response
    console.log("Google Sign-In successful:", response)
    // You would typically send this to your backend
  }

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="flex flex-col items-center space-y-2 pt-6">
        <BrandLogo />
        <h1 className="text-2xl font-bold text-center">Subscribe to Our Newsletter</h1>
        <p className="text-center text-muted-foreground">
          Get the latest updates, tips, and exclusive content delivered straight to your inbox.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <GoogleSignIn onSuccess={handleGoogleSignIn} />

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 flex-shrink text-xs text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Subscribe Now
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
      </CardFooter>
    </Card>
  )
}
