import MapPicker from "@/components/map-picker";
import { useShopsStore } from "@/stores/shops-store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddShopScreen() {
  const router = useRouter();
  const addShop = useShopsStore((s) => s.addShop);

  const [selected, setSelected] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  type FormValues = {
    name: string;
    category: string;
    address: string;
    city: string;
    postalCode: string;
    lat: string;
    lng: string;
    phone: string;
    hours: string;
    description: string;
    imageUri?: string;
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      address: "",
      city: "",
      postalCode: "",
      lat: "57.496392",
      lng: "13.066515",
      phone: "",
      hours: "",
      description: "",
      imageUri: "",
    },
  });

  const watchedLat = watch("lat");
  const watchedLng = watch("lng");
  const watchedImage = watch("imageUri");

  const pickImage = async () => {
    let ImagePicker: any;
    try {
      ImagePicker = require("expo-image-picker");
    } catch (err) {
      console.warn("expo-image-picker native module not available", err);
      alert(
        "Image picker finns inte i den här klienten. Bygg en dev-client eller kör på en enhet där native-modulen är tillgänglig."
      );
      return;
    }

    if (
      !ImagePicker ||
      typeof ImagePicker.requestMediaLibraryPermissionsAsync !== "function" ||
      typeof ImagePicker.launchImageLibraryAsync !== "function"
    ) {
      console.warn(
        "expo-image-picker methods not available, native module missing",
        ImagePicker
      );
      alert(
        "Image picker-native-modulen är inte tillgänglig i den här klienten. Bygg en dev-client eller kör på en enhet där native-modulen är länkad."
      );
      return;
    }

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted" && status !== "limited") {
        alert("Behöver åtkomst till bilder för att välja bild.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && (result.assets?.length ?? 0) > 0) {
        const uri = result.assets[0].uri;
        setValue("imageUri", uri);
      }
    } catch (e) {
      console.warn("Image picker error", e);
    }
  };

  const takePhoto = async () => {
    let ImagePicker: any;
    try {
      ImagePicker = require("expo-image-picker");
    } catch (err) {
      console.warn("expo-image-picker native module not available", err);
      alert(
        "Kamera finns inte i den här klienten. Bygg en dev-client eller kör på en enhet där native-modulen är tillgänglig."
      );
      return;
    }

    if (
      !ImagePicker ||
      typeof ImagePicker.requestCameraPermissionsAsync !== "function" ||
      typeof ImagePicker.launchCameraAsync !== "function"
    ) {
      console.warn(
        "expo-image-picker camera methods not available, native module missing",
        ImagePicker
      );
      alert(
        "Kamera-native-modulen är inte tillgänglig i den här klienten. Bygg en dev-client eller kör på en enhet där native-modulen är länkad."
      );
      return;
    }

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted" && status !== "limited") {
        alert("Behöver åtkomst till kameran för att ta ett foto.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && (result.assets?.length ?? 0) > 0) {
        const uri = result.assets[0].uri;
        setValue("imageUri", uri);
      }
    } catch (e) {
      console.warn("Camera error", e);
    }
  };

  const canSave =
    !!watch("name") &&
    !!watch("category") &&
    !!watch("address") &&
    !!watch("city") &&
    !!watch("postalCode") &&
    !!watch("phone") &&
    !!watch("hours") &&
    !!watch("description");

  const onSave = (values: FormValues) => {
    const latNum = Number(values.lat);
    const lngNum = Number(values.lng);
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) return;
    const shop = addShop({
      name: values.name,
      category: values.category,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      lat: latNum,
      lng: lngNum,
      phone: values.phone,
      hours: values.hours,
      description: values.description,
    });
    reset();
    setSelected(null);
    setTempSelected(null);
    router.push("/mymap");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            placeholder="Namn"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text style={{ color: "red" }}>Namn krävs</Text>}

      <Controller
        control={control}
        name="category"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            placeholder="Kategori"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />
      {errors.category && <Text style={{ color: "red" }}>Kategori krävs</Text>}

      <Controller
        control={control}
        name="address"
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            placeholder="Adress"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <TextInput
            placeholder="Stad"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="postalCode"
        render={({ field }) => (
          <TextInput
            placeholder="Postnummer"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />

      {/* Image URL (optional) + preview */}
      <Controller
        control={control}
        name="imageUri"
        render={({ field }: any) => (
          <>
            <TextInput
              placeholder="Bild-URL (valfritt)"
              value={field.value}
              onChangeText={field.onChange as any}
              style={styles.input}
            />
            <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
              <Pressable
                onPress={async () => {
                  await pickImage();
                }}
                style={({ pressed }) => ({
                  backgroundColor: "#eee",
                  padding: 8,
                  borderRadius: 8,
                })}
              >
                <Text>Välj bild</Text>
              </Pressable>
              <Pressable
                onPress={async () => {
                  await takePhoto();
                }}
                style={({ pressed }) => ({
                  backgroundColor: "#eee",
                  padding: 8,
                  borderRadius: 8,
                })}
              >
                <Text>Ta bild</Text>
              </Pressable>
            </View>
          </>
        )}
      />
      {watchedImage ? (
        <Image
          source={{ uri: watchedImage }}
          style={{ width: 120, height: 80, borderRadius: 6, marginTop: 8 }}
        />
      ) : null}
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Välj plats på karta
      </Text>
      <Pressable
        onPress={() => {
          setTempSelected(
            selected ?? {
              latitude: Number(watchedLat),
              longitude: Number(watchedLng),
            }
          );
          setModalVisible(true);
        }}
        style={({ pressed }) => ({
          marginVertical: 8,
        })}
      >
        <View style={[styles.input, { justifyContent: "center" }]}>
          <Text>
            {selected
              ? `Vald: ${selected.latitude.toFixed(
                  6
                )}, ${selected.longitude.toFixed(6)}`
              : "Plats: klicka för att öppna kartan"}
          </Text>
        </View>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MapPicker
              initial={
                tempSelected ?? {
                  latitude: Number(watchedLat),
                  longitude: Number(watchedLng),
                }
              }
              onSelect={(c) => {
                setTempSelected(c);
              }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
            <Button
              title="Avbryt"
              onPress={() => {
                setModalVisible(false);
                setTempSelected(null);
              }}
            />
            <Button
              title="Bekräfta plats"
              onPress={() => {
                if (tempSelected) {
                  setSelected(tempSelected);
                  setValue("lat", String(tempSelected.latitude));
                  setValue("lng", String(tempSelected.longitude));
                }
                setModalVisible(false);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
      <Controller
        control={control}
        name="phone"
        render={({ field }: any) => (
          <TextInput
            placeholder="Telefon"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="hours"
        render={({ field }: any) => (
          <TextInput
            placeholder="Öppettider"
            value={field.value}
            onChangeText={field.onChange as any}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }: any) => (
          <TextInput
            placeholder="Beskrivning"
            value={field.value}
            onChangeText={field.onChange as any}
            style={[styles.input, styles.multiline]}
            multiline
          />
        )}
      />
      <Pressable
        onPress={handleSubmit(onSave)}
        disabled={!canSave}
        style={[
          {
            backgroundColor: canSave ? "blue" : "gray",
            borderRadius: 8,
            padding: 12,
            alignItems: "center",
            marginVertical: 8,
          },
        ]}
      >
        <Text style={{ color: "white" }}>Spara butik</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", gap: 12 },
  half: { flex: 1 },
  multiline: { minHeight: 80, textAlignVertical: "top" },
});
