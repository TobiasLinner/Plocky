import LocalShopsMap from "@/components/local-shops-map";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function MyMap() {
  const params = useLocalSearchParams();

  const focusedLocation = {
    latitude: Number(params.lat),
    longitude: Number(params.lng),
  };

  return <LocalShopsMap focusedLocation={focusedLocation} />;
}
