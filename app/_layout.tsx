import { useState } from "react";
import { Stack } from "expo-router";
import HeaderLogin from "@/components/profile/HeaderProfileIcon";
import { Modal, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import ProfileModal from "@/components/profile/ProfileModal";

export default function RootLayout() {
  const [profileModal, setProfileModalVisible] = useState(false);

  return (
    <>
      <Stack screenOptions={{
            headerStyle: {
              backgroundColor: "#121212",
            },
            headerTitle: '',
            headerShadowVisible: false,
            headerRight: () => <HeaderLogin onPress={() => setProfileModalVisible(true)} />,
            contentStyle: {
              backgroundColor: "#121212",
              padding: 10
            },
            headerTintColor: "#fff"
          }}
        >
        <Stack.Screen
          name="(tabs)"
          options={{
            contentStyle: {
              padding: 0
            }
          }}
        />
      </Stack>

      <ProfileModal setProfileModalVisible={setProfileModalVisible} profileModal={profileModal} />
    </>
  );
}