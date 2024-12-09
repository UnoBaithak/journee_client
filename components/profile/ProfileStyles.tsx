import { StyleSheet } from "react-native";

const HeaderLoginStyles = StyleSheet.create({
    icon: {
        alignSelf: "center"
    }
})

const ProfileModalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#121212",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
    },
})

export { HeaderLoginStyles, ProfileModalStyles };