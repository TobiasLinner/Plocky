import { GoogleMaps } from "expo-maps";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import localshops from "../data/localshops";

export default function LocalShopsMap({
  onMarkerPress,
  selectedShopId,
}: {
  onMarkerPress?: (id: string) => void;
  selectedShopId?: string | null;
}) {
  const mapRef = useRef<any>(null);

  const camera = {
    coordinates: {
      latitude: localshops[0].lat ?? 57.49639217523064,
      longitude: localshops[0].lng ?? 13.066515081818025,
    },
    zoom: 11,
  };

  const markers = localshops.map((shop) => ({
    id: shop.id,
    coordinates: { latitude: shop.lat, longitude: shop.lng },
    title: shop.name,
    snippet: shop.category,
    showCallout: true,
  }));

  const [mapReady, setMapReady] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [cameraOverride, setCameraOverride] = useState<any | null>(null);

  useEffect(() => {
    if (!selectedShopId) return;
    const shop = localshops.find((s) => s.id === selectedShopId);
    if (!shop) return;

    if (
      mapReady &&
      mapRef.current &&
      typeof mapRef.current.setCameraPosition === "function"
    ) {
      mapRef.current.setCameraPosition({
        coordinates: { latitude: shop.lat, longitude: shop.lng },
        zoom: 13,
        duration: 500,
      });
      setCameraOverride({
        coordinates: { latitude: shop.lat, longitude: shop.lng },
        zoom: 13,
      });
      return;
    }

    setCameraOverride({
      coordinates: { latitude: shop.lat, longitude: shop.lng },
      zoom: 13,
    });
    setMapKey((k) => k + 1);
  }, [selectedShopId, mapReady]);

  return (
    <GoogleMaps.View
      key={mapKey}
      ref={mapRef}
      style={{ flex: 1 }}
      cameraPosition={cameraOverride ?? camera}
      markers={markers}
      onMapLoaded={() => setMapReady(true)}
      onMarkerClick={(e: any) => {
        const id = e.id;
        if (id) onMarkerPress?.(id);
      }}
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
