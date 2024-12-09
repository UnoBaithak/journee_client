import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

type ExploreCardProps = {
  imagePath: string;
  placeName: string;
  rounded?: boolean; // Optional prop to decide if the image is rounded
};

const ExploreCard = ({ imagePath, placeName, rounded = false }: ExploreCardProps) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.6; // ExploreCard takes up 50% of screen width
  const cardHeight = cardWidth * 1.3; // Use a 2:3 aspect ratio (height > width)

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <Image
        source={{ uri: imagePath }}
        style={[
          styles.image,
          rounded ? styles.rounded : null,
          { width: cardWidth, height: cardHeight * 0.85 }, // Image occupies 70% of card height
        ]}
      />
      <Text style={styles.placeName}>{placeName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E", // Slightly lighter than background for contrast
    borderRadius: 12,
    padding: 0,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    resizeMode: "cover", // Ensure the image scales properly
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  rounded: {
    borderRadius: 12,
  },
  placeName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 10,
    marginTop: 8,
  },
});

export default ExploreCard;