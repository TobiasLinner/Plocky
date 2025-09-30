import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Image
        source={require("../assets/images/freepik__upload__25000.png")}
        style={styles.pluckyImage}
        contentFit="cover"
      />
      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Välkommen till Plocky</Text>
          <Text style={styles.subtitle}>Stöd lokal mat nära dig</Text>
          <Pressable
            style={styles.exploreButton}
            onPress={() => router.push("/localshops")}
          >
            <Text style={styles.exploreText}>Utforska</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  pluckyImage: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    marginHorizontal: 40,
  },
  titleWrapper: {
    // backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },
  exploreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.66)",
    borderRadius: 5,
  },
  exploreText: {
    color: "#ffffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
