import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { MapProvider } from "@/context/map-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <MapProvider>
          <Drawer
            screenOptions={{
              drawerActiveTintColor: "#e91e63",
              drawerHideStatusBarOnOpen: true,
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "Startsida",
                title: "Plock",
                headerShown: false,
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="localshops"
              options={{
                drawerLabel: "Hitta lokala butiker",
                title: "Lokala butiker",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="storefront" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="mymap"
              options={{
                drawerLabel: "Karta",
                title: "Karta",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="map" color={color} size={size} />
                ),
              }}
            />
            <Drawer.Screen
              name="add-shop"
              options={{
                drawerLabel: "Lägg till butik",
                title: "Lägg till butik",
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="add-circle" color={color} size={size} />
                ),
              }}
            />
          </Drawer>
        </MapProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
