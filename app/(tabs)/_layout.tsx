import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs initialRouteName="plan" screenOptions={{
            headerShown: false, 
            tabBarStyle: {
                backgroundColor: "#121212",
                paddingTop: 10,
                paddingBottom: 5,
            },
        }}>
            <Tabs.Screen name="home" options={{
                headerShown: false,
                title: "Home",
                tabBarLabel: "",
                tabBarIcon: ({focused}) => {
                    return (
                        <Ionicons
                            name={focused ? "home-sharp" : "home-outline"}
                            size={focused ? 24 : 22}
                            color={"white"}
                        />
                    )
                }
            }}/>
            <Tabs.Screen name="plan" options={{
                headerShown: false,
                title: "Plan",
                tabBarLabel: "",
                tabBarIcon: ({focused}) => {
                    return (
                        <Ionicons
                            name={focused ? "airplane-sharp" : "airplane-outline"}
                            size={focused ? 24 : 22}
                            color={"white"}
                        />
                    )
                }
            }}/>
            <Tabs.Screen name="trips" options={{
                headerShown: false,
                title: "Home",
                tabBarLabel: "",
                tabBarIcon: ({focused}) => {
                    return (
                        <Ionicons
                            name={focused ? "globe-sharp" : "globe-outline"}
                            size={focused ? 24 : 22}
                            color={"white"}
                        />
                    )
                }
            }}/>
        </Tabs>
    )
};