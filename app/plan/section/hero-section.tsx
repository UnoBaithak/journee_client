import React, {useState} from "react";
import { useConversation } from "@/context/conversation-context";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="relative h-[40vh] w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-blue-500/30 dark:from-teal-900/50 dark:to-blue-900/50"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-4 m-auto">
                <div className="text-center text-white p-1 mt-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Start Your Journey</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                        Discover new destinations and create unforgettable memories
                    </p>
                    <Card className="w-full border shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm m-auto">
                        <CardContent className="pt-6 pb-6">
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Where would you like to go?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 py-6 text-lg bg-white dark:bg-gray-800"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                                >
                                    Plan My Trip
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}