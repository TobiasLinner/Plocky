import type { LocalShop } from "@/data/localshops";
import React from "react";
import { Button, Linking, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  shop: LocalShop;
  visible: boolean;
  onClose: () => void;
  onShowOnMap?: () => void;
};

export default function ShopModal({
  shop,
  visible,
  onClose,
  onShowOnMap,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>{shop.name}</Text>
            <Text style={styles.modalCategory}>{shop.category}</Text>
            <Text style={styles.modalText}>
              {shop.address}
              {shop.city}
            </Text>
            <Text style={styles.modalText}>{shop.phone}</Text>
            <Text style={styles.modalDescription}>{shop.description}</Text>
            <View style={styles.buttons}>
              <Button title="Visa på karta" onPress={onShowOnMap} />
              <View style={{ width: 12 }} />
              <Button
                title="Öppna i kartor"
                onPress={() => {
                  const lat = shop.lat;
                  const lng = shop.lng;
                  let url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                  Linking.canOpenURL(url).then((supported) => {
                    if (supported) {
                      Linking.openURL(url);
                    }
                  });
                }}
              />
              <View style={{ width: 12 }} />
              <Button title="Stäng" onPress={onClose} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  modalCategory: { fontSize: 13, color: "#666", marginBottom: 8 },
  modalText: { fontSize: 14, color: "#333" },
  modalDescription: { marginTop: 8, fontSize: 13, color: "#444" },
  buttons: { flexDirection: "row", marginTop: 12, alignItems: "center" },
});
