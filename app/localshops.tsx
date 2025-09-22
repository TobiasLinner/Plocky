import LocalShopCard from "@/components/local-shop-card";
import ShopModal from "@/components/shop-modal";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import localShops from "../data/localshops";

export default function LocalShopsScreen() {
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const router = useRouter();

  const shop = localShops.find((s) => s.id === selectedShopId) ?? null;

  return (
    <>
      <ScrollView contentContainerStyle={styles.root}>
        {localShops.map((s) => (
          <LocalShopCard
            key={s.id}
            shop={s}
            onPress={() => setSelectedShopId(s.id)}
          />
        ))}
      </ScrollView>

      <ShopModal
        shop={shop}
        visible={!!shop}
        onClose={() => setSelectedShopId(null)}
        onShowOnMap={(id) => {
          setSelectedShopId(null);
          router.push(`/mymap?shop=${encodeURIComponent(id)}`);
        }}
      />
    </>
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
