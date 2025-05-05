"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Check, X } from "lucide-react"

export default function CreateEmailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.user_id as string

  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [error, setError] = useState("")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    // Reset availability status when typing
    if (isAvailable !== null) {
      setIsAvailable(null)
    }

    // Basic validation
    if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address")
    } else {
      setError("")
    }
  }

  const checkAvailability = () => {
    if (!email) return

    if (error) return

    setIsChecking(true)

    // Simulate API call to check email availability
    setTimeout(() => {
      // For demo purposes, let's say emails containing "taken" are not available
      const available = !email.toLowerCase().includes("taken")
      setIsAvailable(available)
      setIsChecking(false)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (error) return

    if (email !== confirmEmail) {
      setError("Emails do not match")
      return
    }

    if (isAvailable !== true) {
      checkAvailability()
      return
    }

    // In a real app, send the email to an API
    console.log("Updating email for user:", userId, email)

    // Redirect back to the profile page
    router.push(`/user/${userId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Update Your Email</CardTitle>
          <CardDescription className="text-center">Enter a new email address for your Journee account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">New Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={checkAvailability}
                  className="pl-10 pr-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                {isChecking && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 border-2 border-t-transparent border-teal-600 dark:border-teal-400 rounded-full animate-spin"></div>
                  </div>
                )}

                {!isChecking && isAvailable === true && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                )}

                {!isChecking && isAvailable === false && (
                  <X className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                )}
              </div>

              {error && <div className="text-sm font-medium text-red-500">{error}</div>}

              {!error && isAvailable === false && (
                <div className="text-sm font-medium text-red-500">This email is already taken</div>
              )}

              {!error && isAvailable === true && (
                <div className="text-sm font-medium text-green-500">Email is available</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmEmail">Confirm Email</Label>
              <div className="relative">
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              {email && confirmEmail && email !== confirmEmail && (
                <div className="text-sm font-medium text-red-500">Emails do not match</div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
              disabled={!!error || isAvailable === false || isChecking || email !== confirmEmail}
            >
              Update Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
