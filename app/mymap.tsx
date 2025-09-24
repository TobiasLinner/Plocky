import LocalShopsMap from "@/components/local-shops-map";
import { useMap } from "@/context/map-context";
import React from "react";

export default function MyMap() {
  const { focusedLocation } = useMap();
  return <LocalShopsMap focusedLocation={focusedLocation} />;
}
