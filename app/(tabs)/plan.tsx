import { FixedContainer } from "@/components/core/container/Container";
import { Link } from "expo-router";
import React, { useState, useRef } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Pressable,
} from "react-native";

export default function Plan() {
  const [expanded, setExpanded] = useState(false);
  const [numAdults, setNumberOfAdults] = useState<String | number>('');
  const [numChildren, setNumberOfChildren] = useState<String | number>('');
  const [destination, setDestination] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, Platform.OS === "web" ? 400 : 500],
  });

  return (
    <FixedContainer style={styles.container}>
      <Animated.View style={[styles.shadowContainer, { height: animatedHeight, backgroundColor: "#121212" }]}>
        {/* Collapsed Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Destination"
            placeholderTextColor="#ccc"
            onChangeText={dest => setDestination(dest)}
          />
          {!expanded && (
            <TouchableOpacity onPress={toggleExpand} style={styles.circleButton}>
              <Text style={styles.arrow}>{expanded ? "↓" : "→"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Expanded Content */}
        {expanded && (
          <View style={styles.expandedContent}>
            {/* Section: Dates */}
            <Text style={styles.sectionTitle}>Dates</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.dateInput}
                placeholder="From"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.dateInput}
                placeholder="To"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
              />
            </View>

            {/* Section: Number of People */}
            <Text style={styles.sectionTitle}>Number of People</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.peopleInput}
                value={numAdults.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  setNumberOfAdults(isNaN(num) || num <= 0 ? 1 : num); // Default to 1 if input is invalid
                }}
                keyboardType="numeric"
                placeholder="Adults"
                placeholderTextColor="#ccc"
              /> 
              <TextInput
                style={styles.peopleInput}
                value={numChildren.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  setNumberOfChildren(isNaN(num) || num <= 0 ? 1 : num); // Default to 1 if input is invalid
                }}
                keyboardType="numeric"
                placeholder="Children"
                placeholderTextColor="#ccc"
              /> 
            </View>


            {/* Section: Additional Notes */}
            <Text style={styles.sectionTitle}>Additional Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Enter any additional notes"
              placeholderTextColor="#ccc"
              multiline
              onChangeText={newText => setAdditionalNotes(newText)}
            />

            {/* Bottom Arrow */}
            <Link href="/plan/itinerary/3" asChild>
              <Pressable style={styles.circleButtonBottom}>
                <Text style={styles.arrow}>→</Text>
              </Pressable>
            </Link>
            
          </View>
        )}
      </Animated.View>
    </FixedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  shadowContainer: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 25,
    backgroundColor: "#121212", // Darker background for the form
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: "hidden",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 0,
    backgroundColor: "#121212"
  },
  input: {
    flex: 1,
    fontSize: 18,
    backgroundColor: "#333", // Dark background for input
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    color: "#fff", // Light text color
    borderWidth: 1,
    borderColor: "#444",
    marginRight: 10,
    fontFamily: "Roboto", // Using built-in Roboto font
  },
  circleButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: "white",
  },
  circleButtonSmall: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    width: 35,
    height: 35,
    backgroundColor: "white",
  },
  circleButtonBottom: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 30,
    width: 45,
    height: 45,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "white",
  },
  arrow: {
    fontSize: 20,
    color: "#000", // White arrow
    fontFamily: "Roboto",
  },
  expandedContent: {
    marginTop: 0,
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "#121212"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#fff", // White text
    fontFamily: "Roboto", // Using built-in Roboto font
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between", // Space between items
    gap: 10,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#333", // Dark input background
    fontSize: 16,
    color: "#fff", // White text
    fontFamily: "Roboto", // Using built-in Roboto font
  },
  peopleCount: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#fff", // White text
    fontFamily: "Roboto", // Using built-in Roboto font
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#333", // Dark input background
    fontSize: 16,
    color: "#fff", // White text
    height: 80,
    fontFamily: "Roboto", // Using built-in Roboto font
  },
  peopleInput: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: "#333", // Dark input background
    fontSize: 20,
    color: "#fff", // White text
    textAlign: "center", // Center align the text
    height: 50,
    fontFamily: "Roboto", // Using built-in Roboto font
  },
});