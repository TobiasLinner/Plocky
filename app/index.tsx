import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image
        source={require("../assets/images/background.png")}
        style={styles.pluckyImage}
      />
      <View></View>
    </ScrollView>
  );
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
