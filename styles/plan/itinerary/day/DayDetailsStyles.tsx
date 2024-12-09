import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.6,
    resizeMode: "cover",
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#cccccc",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  activityItem: {
    marginBottom: 8,
  },
  activityText: {
    fontSize: 16,
    color: "#aaaaaa",
  },
  searchBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 20
  },
  searchBar: {
    width: "100%",
    height: 40,
    borderRadius: 16,
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 16,
    color: "#fff",
    borderColor: "#333",
    borderWidth: 1,
  },
});

export default styles;
