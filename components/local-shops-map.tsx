import React from "react";
import { StyleSheet } from "react-native";
import localshops from "../data/localshops";

type Props = {
  focusedLocation?: {
    latitude: number;
    longitude: number;
  } | null;
};

export default function LocalShopsMap({ focusedLocation }: Props) {
  // The default camera position when viewing all shops
  const initialCamera = {
    coordinates: {
      latitude: 57.49639217523064,
      longitude: 13.066515081818025,
    },
    zoom: 11,
  };

  // Determine which shops to display. This logic now runs on every render.
  let shopsToDisplay: LocalShop[];

  if (focusedLocation) {
    // If a specific location is provided, find only that shop.
    const selectedShop = localshops.find(
      (shop) =>
        shop.lat === focusedLocation.latitude &&
        shop.lng === focusedLocation.longitude
    );
    // If a matching shop is found, the array will contain just that one shop.
    // Otherwise, it will be an empty array to show no markers.
    shopsToDisplay = selectedShop ? [selectedShop] : [];
  } else {
    // If no location is provided, display all shops.
    shopsToDisplay = localshops;
  }

  // Convert the shops into map markers.
  const markers = shopsToDisplay.map((shop) => ({
    id: shop.id,
    coordinates: { latitude: shop.lat, longitude: shop.lng },
    title: shop.name,
    snippet: shop.category,
    showCallout: true,
  }));

  return (
    <Map
      initialCamera={initialCamera}
      markers={markers}
      focusedLocation={focusedLocation}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
});
