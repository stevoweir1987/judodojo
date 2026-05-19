import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoPlayer from "../../components/VideoPlayer";
import { getTechniqueById } from "../../lib/data";
import { getBookmarks, toggleBookmark } from "../../lib/storage";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  surface2: "#0b1322",
  accent2: "#60a5fa",
  muted: "#94a3b8",
  white: "#f8fafc",
  emerald: "#34d399",
};

export default function TechniqueDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const technique = id ? getTechniqueById(id) : undefined;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!technique) return;
    getBookmarks().then((ids) => setBookmarked(ids.includes(technique.id)));
  }, [technique]);

  if (!technique) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: C.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: C.muted }}>Technique not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={["bottom"]}>
      <Stack.Screen options={{ title: technique.name }} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.title}>{technique.name}</Text>
            <Text style={styles.english}>{technique.english}</Text>
          </View>
          <Pressable
            onPress={async () => {
              const next = await toggleBookmark(technique.id);
              setBookmarked(next.includes(technique.id));
            }}
            hitSlop={12}
          >
            <Text style={{ fontSize: 28 }}>{bookmarked ? "★" : "☆"}</Text>
          </Pressable>
        </View>

        <View style={styles.tagRow}>
          <Tag color={C.accent2} text={technique.category} />
          <Tag color={C.muted} text={technique.subCategory} />
          {technique.kodokan && <Tag color={C.emerald} text="Kodokan" />}
        </View>

        <VideoPlayer videoId={technique.videoId} />

        <Text style={styles.section}>Key points</Text>
        <View style={styles.keyBox}>
          <Text style={{ color: C.white }}>
            • Maintain kuzushi (off-balance) before the throw.{"\n"}
            • Keep your back straight and use your legs.{"\n"}
            • Commit through the technique — half-throws fail.{"\n"}
            • Finish with strong tsukuri and follow-through.
          </Text>
          <Text style={{ color: C.muted, fontSize: 11, marginTop: 12 }}>
            (Edit lib/data.ts to attach per-technique notes.)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Tag({ color, text }: { color: string; text: string }) {
  return (
    <Text
      style={{
        color,
        fontSize: 11,
        backgroundColor: C.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { color: C.white, fontSize: 24, fontWeight: "700" },
  english: { color: C.muted, fontSize: 15, marginTop: 2 },
  tagRow: { flexDirection: "row", gap: 6, flexWrap: "wrap", marginBottom: 16 },
  section: {
    color: C.accent2,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  keyBox: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
  },
});
