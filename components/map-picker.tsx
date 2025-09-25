import { GoogleMaps } from "expo-maps";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Coord = { latitude: number; longitude: number };

type Props = {
  initial?: Coord;
  onSelect?: (coord: Coord) => void;
  height?: number | undefined;
};

export default function MapPicker({ initial, onSelect, height }: Props) {
  const [selected, setSelected] = useState<Coord | undefined>(initial);

  const initialCamera = {
    coordinates: initial ?? {
      latitude: 57.49639217523064,
      longitude: 13.066515081818025,
    },
    zoom: 11,
  };

  const markers = selected
    ? [
        {
          id: "selected",
          coordinates: {
            latitude: selected.latitude,
            longitude: selected.longitude,
          },
          title: "Vald plats",
        },
      ]
    : [];

  const handleMapClick = (event: any) => {
    const coords = event?.coordinates;
    if (!coords) return;
    const c = { latitude: coords.latitude, longitude: coords.longitude };
    setSelected(c);
    onSelect?.(c);
  };

  const containerStyle = height ? { height } : { flex: 1 };

  return (
    <View style={containerStyle}>
      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={{
          coordinates: initialCamera.coordinates,
          zoom: initialCamera.zoom,
        }}
        markers={markers}
        onMapClick={handleMapClick}
        onMapLongClick={handleMapClick}
      />
      <View style={styles.hintRow}>
        <Text style={styles.hint}>Tryck på kartan för att placera en nål</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { alignItems: "center", justifyContent: "center", padding: 12 },
  hintRow: { padding: 8, alignItems: "center", backgroundColor: "transparent" },
  hint: { fontSize: 12, color: "#333" },
});
