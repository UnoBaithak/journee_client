"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Check, X } from "lucide-react"

export default function CreateUsernamePage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.user_id as string

    const [username, setUsername] = useState("")
    const [isChecking, setIsChecking] = useState(false)
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
    const [error, setError] = useState("")

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setUsername(value)

        // Reset availability status when typing
        if (isAvailable !== null) {
            setIsAvailable(null)
        }

        // Basic validation
        if (value.length > 0 && !/^[a-zA-Z0-9_]+$/.test(value)) {
            setError("Username can only contain letters, numbers, and underscores")
        } else {
            setError("")
        }
    }

    const checkAvailability = () => {
        if (!username) return

        if (error) return

        setIsChecking(true)

        // Simulate API call to check username availability
        setTimeout(() => {
            // For demo purposes, let's say usernames containing "taken" are not available
            const available = !username.toLowerCase().includes("taken")
            setIsAvailable(available)
            setIsChecking(false)
        }, 1000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!username) {
            setError("Username is required")
            return
        }

        if (error) return

        if (isAvailable !== true) {
            checkAvailability()
            return
        }

        const res = await (
            await fetch(`http://localhost:8080/api/auth/create_username`, {
                method: "POST",
                body: JSON.stringify({ "username": username, "userid": userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).json()

        // Redirect to the plan page
        router.push("/plan")
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-blue-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Choose Your Username</CardTitle>
                    <CardDescription className="text-center">This will be your unique identifier on Journee</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    placeholder="e.g., traveler123"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={checkAvailability}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                {isChecking && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="h-4 w-4 border-2 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
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
                                <div className="text-sm font-medium text-red-500">This username is already taken</div>
                            )}

                            {!error && isAvailable === true && (
                                <div className="text-sm font-medium text-green-500">Username is available</div>
                            )}
                        </div>

                        <div className="space-y-1 text-sm">
                            <p>Username requirements:</p>
                            <ul className="list-disc list-inside text-gray-500">
                                <li>Only letters, numbers, and underscores</li>
                                <li>No spaces or special characters</li>
                                <li>Cannot be changed frequently</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-teal-600 hover:bg-teal-700"
                            disabled={!!error || isAvailable === false || isChecking}
                        >
                            Continue
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-xs text-center text-gray-500">
                        This will be your public username visible to other Journee users
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
