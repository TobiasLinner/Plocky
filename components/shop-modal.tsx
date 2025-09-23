import type { LocalShop } from "@/data/localshops";
import React from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";

type Props = {
  shop?: LocalShop | null;
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
          {shop ? (
            <View>
              <Text style={styles.modalTitle}>{shop.name}</Text>
              <Text style={styles.modalCategory}>{shop.category}</Text>
              <Text style={styles.modalText}>
                {shop.address}
                {shop.city ? `, ${shop.city}` : ""}
              </Text>
              {shop.phone ? (
                <Text style={styles.modalText}>{shop.phone}</Text>
              ) : null}
              {shop.description ? (
                <Text style={styles.modalDescription}>{shop.description}</Text>
              ) : null}
              <View style={styles.buttons}>
                <Button title="Visa på karta" onPress={onShowOnMap} />
                <View style={{ width: 12 }} />
                <Button title="Stäng" onPress={onClose} />
              </View>
            </View>
          ) : (
            <Text>Butiken hittades inte.</Text>
          )}
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
