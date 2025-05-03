"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import GoogleSignIn from "@/components/google-sign-in"

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Login data:", formData)

    // In a real app, you would authenticate with your API
    // For now, simulate login and redirect to plan page
    router.push("/plan")
  }

  const handleGoogleSignIn = (response: any) => {
    // Handle Google Sign-In response
    console.log("Google Sign-In successful:", response)
    // You would typically send this to your backend

    // For now, simulate login and redirect to plan page
    router.push("/plan")
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <GoogleSignIn text={"signin_with"} onSuccess={handleGoogleSignIn} />

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 flex-shrink text-xs text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-sm text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
            Log In
          </Button>
        </form>
      </div>
    </Card>
  )
}
