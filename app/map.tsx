import LocalShopsMap from "@/components/local-shops-map";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

export default function Map() {
  const params = useLocalSearchParams();
  const selectedShopId = (params.shop as string) ?? null;

  return <LocalShopsMap selectedShopId={selectedShopId} />;
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  pluckyImage: {
    height: 300,
    width: "100%",
  },
});
