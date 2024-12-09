import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { HeaderLoginStyles as styles } from "@/components/profile/ProfileStyles";

interface HeaderLoginProps {
    onPress: () => void
}


export default function HeaderLogin({ onPress }: { onPress: () => void }) {
    return (
        <View >
            <Ionicons
                name="person-circle-outline"
                size={24}
                color={"white"}
                style={styles.icon}
                onPress={onPress} />
        </View>
    )
}



