import { Text, View } from "react-native";

// Minimal hello-world screen for diagnostics.
export default function TechniquesScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24, fontWeight: "600" }}>
        Hello Judo
      </Text>
      <Text style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>
        If you can read this, the app is running.
      </Text>
    </View>
  );
}
