import type { LocalShop } from "@/data/localshops";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  shop: LocalShop;
  onPress?: (e: GestureResponderEvent) => void;
};

export default function LocalShopCard({ shop, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={shop.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{shop.name}</Text>
        <Text style={styles.category}>{shop.category}</Text>
        <Text style={styles.address}>
          {shop.address}, {shop.city}
        </Text>
        {<Text style={styles.phone}>{shop.phone}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
    elevation: 2,

  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  address: {
    fontSize: 13,
    color: "#333",
  },
  phone: {
    marginTop: 6,
    fontSize: 12,
    color: "#007AFF",
  },
});
