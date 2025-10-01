import LocalShopCard from "@/components/local-shop-card";
import { useLocation } from "@/context/location-context";
import { useMap } from "@/context/map-context";
import { useShopsStore } from "@/stores/shops-store";
import { calculateDistance } from "@/utils/distance";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalShopsScreen() {
  const shops = useShopsStore((s) => s.shops);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const router = useRouter();
  const { setFocusedLocation } = useMap();
  const { userLocation, hasPermission, requestLocation, loading, error } = useLocation();

  useEffect(() => {
    if (!hasPermission && !userLocation) {
      requestLocation();
    }
  }, [hasPermission, userLocation, requestLocation]);

  const shop = shops.find((s) => s.id === selectedShopId) ?? null;

  const handleShowOnMap = () => {
    if (!shop) return;

    setSelectedShopId(null);
    setFocusedLocation({ latitude: shop.lat, longitude: shop.lng });
    router.push("/mymap");
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <View>
        {!userLocation && !loading && !error && (
          <View style={styles.locationBar}>
            <Text style={styles.locationText}>
              Tryck för att aktivera platsbaserat avstånd
            </Text>
            <Pressable onPress={requestLocation} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>Aktivera</Text>
            </Pressable>
          </View>
        )}

        {loading && (
          <View style={styles.locationBar}>
            <Text style={styles.locationText}>Hämtar din plats...</Text>
          </View>
        )}

        {error && (
          <View style={styles.locationBar}>
            <Text style={[styles.locationText, { color: 'red' }]}>{error}</Text>
            <Pressable onPress={requestLocation} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>Försök igen</Text>
            </Pressable>
          </View>
        )}

        <ScrollView>
          {shops.sort((a, b) => {
            if (!userLocation) return 0;
            const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.lat, a.lng);
            const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.lat, b.lng);
            return distanceA - distanceB;
          }).map((s) => (
            <LocalShopCard
              key={s.id}
              shop={s}
              onPress={() => setSelectedShopId(s.id)}
              isExpanded={selectedShopId === s.id}
              onShowOnMap={() => {
                setSelectedShopId(null);
                setFocusedLocation({ latitude: s.lat, longitude: s.lng });
                router.push("/mymap");
              }}
            />
          ))}
        </ScrollView>

        <View style={{ position: "absolute", right: 16, bottom: 16 }}>
          <View
            style={{
              backgroundColor: "#e91e63",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 12,
              elevation: 3,
            }}
          >
            <Ionicons
              name="add"
              color="#fff"
              size={20}
              onPress={() => router.push({ pathname: "/add-shop" } as any)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {},
  shopcontainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
    padding: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  locationButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  locationButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
