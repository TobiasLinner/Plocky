import type { LocalShop } from "@/data/localshops";
import React from "react";
import {
  Button,
  GestureResponderEvent,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  shop: LocalShop;
  onPress?: (e: GestureResponderEvent) => void;
  isExpanded?: boolean;
  onShowOnMap?: () => void;
};

export default function LocalShopCard({
  shop,
  onPress,
  isExpanded,
  onShowOnMap,
}: Props) {
  const openMaps = () => {
    const lat = shop.lat;
    const lng = shop.lng;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  return (
    <View style={styles.card}>
      <Image source={shop.image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          style={styles.headerTouchable}
        >
          <Text style={styles.title}>{shop.name}</Text>
          <Text style={styles.category}>{shop.category}</Text>
          <Text style={styles.address}>
            {shop.address}, {shop.city}
          </Text>
          {<Text style={styles.phone}>{shop.phone}</Text>}
        </TouchableOpacity>

        {isExpanded ? (
          <View>
            {shop.description ? (
              <Text style={styles.description}>{shop.description}</Text>
            ) : null}
            <View style={styles.buttons}>
              <View style={styles.buttonWrapper}>
                <Button title="Plockykarta" onPress={onShowOnMap} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Vägbeskrivning" onPress={openMaps} />
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </View>
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
    paddingRight: 14,
  },

  headerTouchable: {
    flexShrink: 1,
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    color: "#444",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    alignItems: "center",
    gap: 8,
  },
  buttonWrapper: {
    flexShrink: 1,
    minWidth: 120,
  },
  image: {
    width: 150,
    height: "100%",
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
