import React, {useState} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import styles from "@/styles/plan/itinerary/day/DayDetailsStyles";

// TODO: Given the day id and itinerary id, fetch data and then populate
const DayDetails = () => {
  const [searchValue, setSearchValue] = useState("");
  const insets = useSafeAreaInsets();

  const callBackendAPI = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    alert(e.target);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.bottom + 20} // Offset for safe area
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Image Section */}
            <Image
              source={{ uri: "https://via.placeholder.com/800x400" }}
              style={[styles.image]}
            />

            {/* Description Section */}
            <View style={styles.section}>
              <Text style={styles.title}>Day 1: Exploring the Outdoors</Text>
              <Text style={styles.description}>
                Begin your journey with an adventurous day filled with scenic
                views and cultural experiences.
              </Text>
            </View>

            {/* Activities Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Activities</Text>
              {[
                "Visit the National Park and explore hiking trails.",
                "Lunch at a local cafe with scenic views.",
                "Explore the art gallery downtown.",
                "Relax at the beach in the evening.",
                "Dinner at the coastal restaurant with live music.",
              ].map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.activityText}>• {activity}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Floating Search Bar */}
          {/* TODO: Make text multiline */}
          <View style={[styles.searchBarContainer, { bottom: insets.bottom + 15}]}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search or suggest an edit..."
              placeholderTextColor="#777"
              value={searchValue}
              onChangeText={setSearchValue}
              onSubmitEditing={callBackendAPI}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DayDetails;
