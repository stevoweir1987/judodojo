import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BELTS } from "../../lib/beltRequirements";
import {
  getProgress,
  setRequirementDone,
  type ProgressMap,
} from "../../lib/storage";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  accent2: "#60a5fa",
  muted: "#94a3b8",
  white: "#f8fafc",
  emerald: "#22c55e",
  border: "#475569",
};

export default function ProgressionScreen() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [openBelt, setOpenBelt] = useState<string | null>(BELTS[0].id);

  useFocusEffect(
    useCallback(() => {
      getProgress().then(setProgress);
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={{
            color: C.white,
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 12,
          }}
        >
          Belt Progression
        </Text>
        {BELTS.map((belt) => {
          const open = openBelt === belt.id;
          const total = belt.sections.reduce((n, s) => n + s.items.length, 0);
          const done = Object.keys(progress[belt.id] || {}).length;
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);
          return (
            <View key={belt.id} style={styles.card}>
              <Pressable
                onPress={() => setOpenBelt(open ? null : belt.id)}
                style={styles.row}
              >
                <View style={styles.rowLeft}>
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: belt.color,
                    }}
                  />
                  <Text style={styles.beltTitle}>
                    {belt.from} → {belt.to}
                  </Text>
                </View>
                <Text style={{ color: C.muted, fontSize: 13 }}>{pct}%</Text>
              </Pressable>

              <View style={styles.bar}>
                <View
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    backgroundColor: belt.color,
                  }}
                />
              </View>

              {open && (
                <View style={{ marginTop: 12 }}>
                  {belt.sections.map((section) => (
                    <View key={section.title} style={{ marginBottom: 12 }}>
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {section.items.map((req) => {
                        const isDone = !!progress[belt.id]?.[req.id];
                        return (
                          <Pressable
                            key={req.id}
                            onPress={async () => {
                              const next = await setRequirementDone(
                                belt.id,
                                req.id,
                                !isDone
                              );
                              setProgress(next);
                            }}
                            style={styles.reqRow}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 4,
                                borderWidth: 2,
                                borderColor: isDone ? C.emerald : C.border,
                                backgroundColor: isDone ? C.emerald : C.bg,
                                marginRight: 10,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isDone && (
                                <Text style={{ color: C.white, fontSize: 12 }}>
                                  ✓
                                </Text>
                              )}
                            </View>
                            <Text
                              style={{
                                flex: 1,
                                color: isDone ? C.muted : C.white,
                                textDecorationLine: isDone
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {req.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  beltTitle: { color: C.white, fontSize: 15, fontWeight: "600", flex: 1 },
  bar: {
    height: 8,
    backgroundColor: C.bg,
    borderRadius: 999,
    marginTop: 12,
    overflow: "hidden",
  },
  sectionTitle: {
    color: C.accent2,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  reqRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
});
