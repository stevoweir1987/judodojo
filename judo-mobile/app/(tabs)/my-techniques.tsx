import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllTechniques, type Technique } from "../../lib/data";
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

export default function MyTechniquesScreen() {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [items, setItems] = useState<Technique[]>([]);

  useFocusEffect(
    useCallback(() => {
      getBookmarks().then((ids) => {
        setBookmarkIds(ids);
        setItems(getAllTechniques().filter((t) => ids.includes(t.id)));
      });
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={["top"]}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text style={{ color: C.white, fontSize: 22, fontWeight: "700" }}>
          My Techniques
        </Text>
        <Text style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>
          {items.length} bookmarked
        </Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Link href={`/technique/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.sub}>{item.english}</Text>
              </View>
              <Pressable
                onPress={async () => {
                  const next = await toggleBookmark(item.id);
                  setBookmarkIds(next);
                  setItems(
                    getAllTechniques().filter((t) => next.includes(t.id))
                  );
                }}
                hitSlop={12}
              >
                <Text style={{ fontSize: 22 }}>★</Text>
              </Pressable>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={{ color: C.muted, textAlign: "center", marginTop: 40 }}>
            Bookmark techniques from the Techniques tab to see them here.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { color: C.white, fontSize: 16, fontWeight: "600" },
  sub: { color: C.muted, fontSize: 13, marginTop: 2 },
});
