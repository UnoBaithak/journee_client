import { useGlobalSearchParams, Link } from "expo-router";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ItineraryCard } from "@/components/common/card";

export default function Itinerary() {
    const { itineraryId } = useGlobalSearchParams();

    const itineraryData = [
        {
            id: "day1",
            day: 1,
            title: "Exploring Paris",
            dateFrom: "2024-01-01",
            dateTo: "2024-01-03",
            imagePath: "https://via.placeholder.com/150",
        },
        {
            id: "day2",
            day: 2,
            title: "A Day at the Louvre",
            dateFrom: "2024-01-04",
            imagePath: "https://via.placeholder.com/150",
        },
        {
            id: "day3",
            day: 3,
            title: "Montmartre Adventure",
            dateFrom: "2024-01-05",
            dateTo: "2024-01-05",
            imagePath: "https://via.placeholder.com/150",
        },
    ];

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#121212",
            paddingVertical: 20,
            alignItems: "center",
        },
    });


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {itineraryData.map((itinerary) => (
                <ItineraryCard
                    key={itinerary.id}
                    id={itinerary.id}
                    day={itinerary.day}
                    title={itinerary.title}
                    dateFrom={itinerary.dateFrom}
                    dateTo={itinerary.dateTo}
                    imagePath={itinerary.imagePath}
                />
            ))}
        </ScrollView>
    )
}