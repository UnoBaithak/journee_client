import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { formatTime, getCategoryColor } from '@/utils/itinerary-utils'
import { Link, ArrowLeft, Calendar, Clock, MapPin, Edit, Trash2, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DayDetails } from '@/types/itinerary'

function PlanRouteDayDetailsHeroSection({ itineraryId, destination, dayDetails }: { itineraryId: string, destination: string, dayDetails: DayDetails }) {
    return (
        <div className="flex-grow p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        className="mb-4 pl-0 hover:bg-transparent hover:text-teal-600 dark:hover:text-teal-400"
                        asChild
                    >
                        <Link href={`/plan/${itineraryId}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Itinerary
                        </Link>
                    </Button>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{dayDetails.day_id}</h1>
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {destination}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-6">
                    {dayDetails.activities.map((activity) => (
                        <Card
                            key={activity.activity_id}
                            className="overflow-hidden border-l-4 border-l-teal-500 dark:border-l-teal-400"
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{activity.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Clock className="h-3 w-3" />
                                            {formatTime(activity.time)} • {activity.duration} {activity.duration === 1 ? "hour" : "hours"}
                                        </CardDescription>
                                    </div>
                                    <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>

                                {activity.pois.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-medium mb-2">Points of Interest:</h4>
                                        <ul className="space-y-3">
                                            {activity.pois.map((poi) => (
                                                <li key={poi.name} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                                                    <div className="flex justify-between items-start">
                                                        <h5 className="font-medium">{poi.name}</h5>
                                                        <Badge variant="outline" className="flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" />
                                                            View on Map
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{poi.description}</p>
                                                    {poi.website && (
                                                        <a
                                                            href={`https://${poi.website}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-teal-600 hover:underline dark:text-teal-400 mt-1 inline-block"
                                                        >
                                                            Visit Website
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 pt-0">
                                <Button variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
                                    <Edit className="h-3 w-3 mr-1" />
                                    Edit
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500 dark:text-red-400">
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Remove
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}

                    <Button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
                        <PlusCircle className="h-4 w-4" />
                        Add Activity
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PlanRouteDayDetailsHeroSection