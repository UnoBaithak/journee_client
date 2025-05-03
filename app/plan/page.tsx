"use client"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

import { useState } from "react";

export default function PlanPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // trigger itinerary creation
        console.log("Plan for " + query);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
                <Input
                    type="search"
                    value={query}
                    placeholder="Where do you want to go ?"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button className="default" type="submit">Plan</Button>
            </form>
        </div>
    )
}