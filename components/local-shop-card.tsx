import { useLocation } from "@/context/location-context";
import type { LocalShop } from "@/data/localshops";
import { calculateDistance, formatDistance } from "@/utils/distance";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type Props = {
  shop: LocalShop;
  onPress?: () => void;
  isExpanded?: boolean;
  onShowOnMap?: () => void;
};

export default function LocalShopCard({
  shop,
  onPress,
  isExpanded,
  onShowOnMap,
}: Props) {
  const { userLocation } = useLocation();

  const openMaps = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`);
  };

  const distance = userLocation
    ? calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      shop.lat,
      shop.lng
    )
    : null;

  return (
    <View style={styles.card}>
      <Image source={shop.image} style={styles.image} contentFit="cover" />
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
          {distance !== null && (
            <Text style={styles.distance}>{formatDistance(distance)}</Text>
          )}
          <Text style={styles.hours}>{shop.hours}</Text>
        </TouchableOpacity>

        {shop.phone ? (
          <Pressable
            onPress={() => {
              Linking.openURL(`tel:${shop.phone}`);
            }}
            style={({ pressed }) => [
              styles.phoneWrapper,
              pressed && styles.phonePressed,
            ]}
          >
            <FontAwesome
              name="phone"
              size={14}
              color="#007AFF"
              style={styles.phoneIcon}
            />
            <Text style={styles.phone}>{shop.phone}</Text>
          </Pressable>
        ) : null}

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
  distance: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
    marginTop: 2,
  },
  phone: {
    fontSize: 12,
    color: "#007AFF",
  },
  phoneWrapper: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  phoneIcon: {
    marginRight: 5,
  },
  phonePressed: {
    opacity: 0.6,
  },
  hours: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});
