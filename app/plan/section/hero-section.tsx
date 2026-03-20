import React, { useState } from "react";
import { useConversation } from "@/context/conversation-context";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSection({ setLoading }:
    { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [searchQuery, setSearchQuery] = useState("")
    const { conversationDetails, setConversationDetails } = useConversation()
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/plan`, {
            method: "POST",
            body: JSON.stringify({ "user_input": searchQuery }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let { itinerary_id } = await res.json();
        setConversationDetails({ itinerary_id, itineraryDetails: null })
        router.push(`/plan/${itinerary_id}`)
        setLoading(false)
    }

    return (
        <div className="w-full">
            <div className="absolute inset-0 flex items-center justify-center p-4 m-auto">
                <div className="text-center p-1 w-1/2">
                    <h1 className="text-4xl md:text-3xl mb-8 text-teal-700  ">Where would you like to go?</h1>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Plan anything"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 py-6 text-lg bg rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}