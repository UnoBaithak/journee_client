import { FixedContainer } from "@/components/core/container/Container";
import { FlatList, View, StyleSheet } from "react-native";
import { ExploreCard } from "@/components/common/card";

const places = [
    {
        id: "1",
        name: "Photo 1",
        imagePath: "https://images.unsplash.com/photo-1731176497854-f9ea4dd52eb6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "2",
        name: "photo 2",
        imagePath: "https://images.unsplash.com/photo-1732058824460-d89cb7b4a38f?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: "3",
        name: "Photo 3",
        imagePath: "https://images.unsplash.com/photo-1721641843496-3c8c60eab024?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: "4",
        name: "Photo 4",
        imagePath: "https://images.unsplash.com/photo-1733218875809-78c2d54e5195?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

export default function Home() {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#121212",
            justifyContent: "center",
        },
        listContainer: {
            paddingHorizontal: 10,
        },
    });

    return (
        <FixedContainer style={styles.container}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <ExploreCard
                        imagePath={item.imagePath}
                        placeName={item.name}
                        rounded={false}
                    />
                )}
            />
        </FixedContainer>
    )
}