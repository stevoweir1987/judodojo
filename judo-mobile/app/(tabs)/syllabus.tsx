import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { listPdfs, openPdf } from "../../lib/openPdf";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  muted: "#94a3b8",
  white: "#f8fafc",
};

const COLORS: Record<string, string> = {
  "6th-Kyu-5th-Kyu": "#facc15",
  "5th-Kyu-4th-Kyu": "#fb923c",
  "02-Kyu-Syllabus-6th-Kyu-5th-Kyu": "#60a5fa",
  "03-Kyu-Syllabus-5th-Kyu-4th-Kyu": "#60a5fa",
};

export default function SyllabusScreen() {
  const pdfs = listPdfs();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.h1}>Official Syllabus</Text>
        <Text style={styles.intro}>
          BJA grading documents — bundled with the app, work offline. Tap any
          one to open it in your phone's PDF viewer.
        </Text>
        {pdfs.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => openPdf(p.id)}
            style={styles.row}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: COLORS[p.id] ?? "#60a5fa",
                marginRight: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "700" }}>📘</Text>
            </View>
            <Text style={{ color: C.white, flex: 1, fontSize: 15 }}>{p.title}</Text>
            <Text style={{ color: C.muted }}>›</Text>
          </Pressable>
        ))}
        <Text style={styles.note}>
          On Android you may need a PDF viewer installed (Google Drive, Adobe
          Acrobat). On iOS the system can open them directly.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: { color: C.white, fontSize: 22, fontWeight: "700", marginBottom: 4 },
  intro: { color: C.muted, fontSize: 13, marginBottom: 18 },
  row: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  note: {
    color: C.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 16,
  },
});
