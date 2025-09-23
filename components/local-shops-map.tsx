import { GoogleMaps } from "expo-maps";
import React from "react";
import { StyleSheet } from "react-native";
import localshops, { LocalShop } from "../data/localshops";

type Props = {
  focusedLocation?: {
    latitude: number;
    longitude: number;
  } | null;
};

export default function LocalShopsMap({ focusedLocation }: Props) {
  const initialCamera = {
    coordinates: {
      latitude: 57.49639217523064,
      longitude: 13.066515081818025,
    },
    zoom: 11,
  };
  const shopsToDisplay: LocalShop[] = localshops;

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
    <GoogleMaps.View
      style={{ flex: 1 }}
      cameraPosition={{
        coordinates: cameraCoordinates,
        zoom: initialCamera.zoom,
      }}
      markers={markers}
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
