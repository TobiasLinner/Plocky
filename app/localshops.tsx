import LocalShopCard from "@/components/local-shop-card";
import ShopModal from "@/components/shop-modal";
import { useMap } from "@/context/map-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import localShops from "../data/localshops";

export default function LocalShopsScreen() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const router = useRouter();
  const { setFocusedLocation } = useMap();

  const shop = localShops.find((s) => s.id === selectedShopId) ?? null;

  const handleShowOnMap = () => {
    if (!shop) return;

    setSelectedShopId(null);
    setFocusedLocation({ latitude: shop.lat, longitude: shop.lng });
    router.push("/mymap");
  };

  return (
    <View>
      <ScrollView>
        {localShops.map((s) => (
          <LocalShopCard
            key={s.id}
            shop={s}
            onPress={() => setSelectedShopId(s.id)}
          />
        ))}
      </ScrollView>

      {shop && (
        <ShopModal
          shop={shop}
          visible={true}
          onClose={() => setSelectedShopId(null)}
          onShowOnMap={handleShowOnMap}
        />
      )}
    </View>
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
