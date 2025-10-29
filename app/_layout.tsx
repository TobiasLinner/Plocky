import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import "react-native-reanimated";

import { LocationProvider } from "@/context/location-context";
import { MapProvider } from "@/context/map-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const handleAnimationFinish = async () => {
    await SplashScreen.hideAsync();
    setIsSplashVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleAnimationFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.first}>Plucky</Text>
          <Text style={styles.second}>Lokal Mat Nära Dig</Text>
        </View>
        <LottieView
          style={styles.animation}
          source={require('../assets/LocationPin.json')}
          loop
          autoPlay
        />
      </View>
    );
  }

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <LocationProvider>
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
        </LocationProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  first: {
    fontSize: 42,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    color: '#1e293b',
  },
  second: {
    fontSize: 24,
    fontWeight: "300",
    textAlign: "center",
    letterSpacing: 3,
    marginTop: -5,
    color: '#64748b',
  },
  animation: {
    width: Math.min(width * 0.8, 400),
    height: Math.min(height * 0.6, 400),
  },
});
