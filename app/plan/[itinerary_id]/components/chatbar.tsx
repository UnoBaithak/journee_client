"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { useConversation } from '../../conversation_context'

function ChatBar() {
    const [userInput, setUserInput] = React.useState("")

    const {conversationDetails, setConversationDetails} = useConversation()

    const handleSubmit = async (e: React.FormEvent) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/`)
    }
    return (
        <div className="py-2 px-4 rounded-xl shadow-slate-500 drop-shadow-lg border-t bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg absolute bottom-3 left-[1/4] lg:left-1/2 lg:-translate-x-1/2 w-1/2 lg:w-[2/5]">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <div className="flex-grow relative">
                        <Input
                            placeholder="Ask anything about your itinerary..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-800"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                            <Avatar className="h-5 w-5">
                                <AvatarFallback className="bg-teal-100 text-teal-600 text-xs dark:bg-teal-900 dark:text-teal-300">
                                    AI
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        size="icon"
                        className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ChatBar