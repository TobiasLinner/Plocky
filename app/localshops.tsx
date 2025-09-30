import LocalShopCard from "@/components/local-shop-card";
import { useMap } from "@/context/map-context";
import { useShopsStore } from "@/stores/shops-store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalShopsScreen() {
  const shops = useShopsStore((s) => s.shops);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const router = useRouter();
  const { setFocusedLocation } = useMap();

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
        <ScrollView>
          {shops.map((s) => (
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
});
