import type { LocalShop } from "@/data/localshops";
import { useShopsStore } from "@/stores/shops-store";
import { GoogleMaps } from "expo-maps";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  focusedLocation?: {
    latitude: number;
    longitude: number;
  } | null;
};

export default function LocalShopsMap({ focusedLocation }: Props) {
  const shops = useShopsStore((s) => s.shops);

  const categories: string[] = [];
  for (const s of shops) {
    if (s.category && categories.indexOf(s.category) === -1) {
      categories.push(s.category);
    }
  }
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const shopsToDisplay: LocalShop[] =
    selectedCategories.length > 0
      ? shops.filter((s) => selectedCategories.includes(s.category))
      : shops;

  const initialCamera = {
    coordinates: { latitude: 57.49639217523064, longitude: 13.066515081818025 },
    zoom: 6,
  };

  const markers = shopsToDisplay.map((shop) => ({
    id: shop.id,
    coordinates: { latitude: shop.lat, longitude: shop.lng },
    title: shop.name,
    snippet: shop.category,
  }));

  const cameraCoordinates = focusedLocation
    ? {
        latitude: focusedLocation.latitude,
        longitude: focusedLocation.longitude,
      }
    : {
        latitude: initialCamera.coordinates.latitude,
        longitude: initialCamera.coordinates.longitude,
      };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <View style={styles.filterBar}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable
            onPress={() => setDropdownOpen((yes) => !yes)}
            style={[styles.tag, styles.filterToggle]}
          >
            <Text style={styles.tagText}>
              {`Filter${
                selectedCategories.length > 0
                  ? ` (${selectedCategories.length})`
                  : ""
              }`}
            </Text>
            <Text style={[styles.tagText, { marginLeft: 8 }]}>▼</Text>
          </Pressable>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            <Pressable
              onPress={() => setSelectedCategories([])}
              style={[
                styles.tag,
                selectedCategories.length === 0 && styles.tagActive,
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedCategories.length === 0 && styles.tagTextActive,
                ]}
              >
                Alla
              </Text>
            </Pressable>
          </ScrollView>
        </View>
        {dropdownOpen ? (
          <View style={styles.filterDropdown}>
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat);
              return (
                <Pressable
                  key={cat}
                  onPress={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat)
                        ? prev.filter((c) => c !== cat)
                        : [...prev, cat]
                    );
                  }}
                  style={styles.filterItem}
                >
                  <Text style={{ marginRight: 8 }}>
                    {checked ? "✅" : "⬜"}
                  </Text>
                  <Text style={styles.tagText}>{cat}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={{
          coordinates: cameraCoordinates,
          zoom: focusedLocation ? 8 : initialCamera.zoom,
        }}
        markers={markers}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  filterRow: {
    alignItems: "center",
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  tagActive: {
    backgroundColor: "#1e90ff",
  },
  filterToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagSelected: {
    backgroundColor: "#1e90ff",
  },
  filterDropdown: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tagText: {
    color: "#333",
    fontSize: 14,
  },
  tagTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
