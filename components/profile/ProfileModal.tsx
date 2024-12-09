import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { ProfileModalStyles as styles } from "@/components/profile/ProfileStyles"

interface ProfileModalProps {
    profileModal: boolean,
    setProfileModalVisible: (visible: boolean) => void
}

export default function ProfileModal( {profileModal, setProfileModalVisible}: ProfileModalProps ) {

    return (
        <Modal
        animationType="slide"
        transparent={false}
        visible={profileModal}
        onRequestClose={() => setProfileModalVisible(false)}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Login</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setProfileModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}