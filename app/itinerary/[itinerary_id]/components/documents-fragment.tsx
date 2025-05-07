import React from 'react'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


function DocumentsFragment() {
    return (
        <Card >
            <CardHeader>
                <CardTitle>Travel Documents</CardTitle>
                <CardDescription>Important documents for your trip</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">No documents have been added yet.</p>
                    <Button>Upload Document</Button>
                </div>
            </CardContent>
        </Card >
    )
}

export default DocumentsFragment