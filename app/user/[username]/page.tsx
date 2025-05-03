"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfile {
  username: string
  name: string
  email: string
  profilePicture: string
//   contactDetails: {
//     phone: string
//     address: string
//     city: string
//     country: string
//     postalCode: string
//   }
}

export default function UserProfilePage() {
  const params = useParams()
  const username = params.username as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // In a real app, fetch the user profile from an API
    const fetchUserProfile = async () => {
      try {
        const user = await(await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/${username}`)).json();

        setProfile(user);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [username])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".")
//       setEditedProfile((prev) => {
//         if (!prev) return prev
//         return {
//           ...prev,
//           [parent]: {
//             ...(prev[parent as keyof UserProfile] as Record<string, any>),
//             [child]: value,
//           },
//         }
//       })
//     } else {
//       setEditedProfile((prev) => {
//         if (!prev) return prev
//         return {
//           ...prev,
//           [name]: value,
//         }
//       })
//     }
//   }

//   const handleSaveProfile = () => {
//     // In a real app, send the updated profile to an API
//     setProfile(editedProfile)
//     setIsEditing(false)
//   }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="mt-2 text-gray-500">The user profile you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.profilePicture || "/placeholder.svg"} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-500">@{profile.username}</p>

            <div className="mt-4">
              {isEditing ? (
                <div className="space-x-2">
                  <Button onClick={(w)=>console.log(w)} className="bg-teal-600 hover:bg-teal-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profile.name}
                    onChange={(e) => console.log(e)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => console.log(e)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="contactDetails.phone"
                    value={""}
                    onChange={(e) => console.log(e)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="contactDetails.address"
                    value={""}
                    onChange={(e) => console.log(e)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="contactDetails.city"
                      value={""}
                      onChange={(e) => console.log(e)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="contactDetails.country"
                      value={""}
                      onChange={(e) => console.log(e)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="contactDetails.postalCode"
                      value={""}
                      onChange={(e) => console.log(e)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" disabled={!isEditing} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" disabled={!isEditing} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" disabled={!isEditing} />
                </div>

                {isEditing && <Button className="bg-teal-600 hover:bg-teal-700">Update Password</Button>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
