import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Button } from '@/components/ui/button'

function NotesFragment() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Travel Notes</CardTitle>
                <CardDescription>Your personal notes for this trip</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">No notes have been added yet.</p>
                    <Button>Add Note</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default NotesFragment