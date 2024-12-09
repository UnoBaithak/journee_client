import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type ItineraryCardProps = {
    id: string;
    day: number;
    title: string;
    dateFrom?: string;
    dateTo?: string;
    imagePath: string;
};

const ItineraryCard = ({
    id,
    day,
    title,
    dateFrom,
    dateTo,
    imagePath,
}: ItineraryCardProps) => {
    const screenWidth = Dimensions.get("window").width;
    const cardWidth = screenWidth * 0.95; // Card width = 80% of screen width
    const cardHeight = 100; // Fixed card height
    const imageWidth = cardWidth * 0.22; // Image width = 30% of card width
    const contentWidth = cardWidth * 0.65; // Remaining width for content

    return (
        <Link href={`./day/${id}`} asChild>
            <Pressable>
                <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
                    {/* Left Image Section */}
                    <Image
                        source={{ uri: imagePath }}
                        style={[
                            styles.image,
                            { width: imageWidth, height: cardHeight - 20 }, // Slight padding inside card
                        ]}
                    />

                    {/* Right Content Section */}
                    <View style={[styles.content, { width: contentWidth }]}>
                        <Text style={styles.title}>Day {day}: {title}</Text>
                        <Text style={styles.date}>
                            {dateFrom && dateTo
                                ? `${dateFrom} - ${dateTo}`
                                : dateFrom || dateTo || "Date not provided"}
                        </Text>
                    </View>

                    {/* Arrow */}
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Ionicons
                            name="arrow-forward-circle-outline"
                            size={24}
                            color={"white"}
                        />
                    </View>
                </View>
            </Pressable>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#1E1E1E",
        borderRadius: 12,
        marginVertical: 10,
        padding: 10,
        borderColor: "#3A3A3A",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8
    },
    image: {
        borderRadius: 8,
    },
    content: {
        paddingHorizontal: 10,
        justifyContent: "flex-start",
        paddingVertical: 10,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        color: "#A9A9A9",
        fontSize: 14,
    },
});

export default ItineraryCard;
