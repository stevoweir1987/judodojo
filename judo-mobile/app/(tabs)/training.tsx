import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const C = {
  bg: "#0f172a",
  surface: "#1e293b",
  accent2: "#60a5fa",
  muted: "#94a3b8",
  white: "#f8fafc",
};

const PROGRAMS = [
  {
    title: "Beginner — White → Orange Belt",
    description: "Build the fundamentals: ukemi, basic throws, kesa-gatame.",
    week: [
      { day: "Mon", focus: "Ukemi drills + warm-up", minutes: 25 },
      { day: "Wed", focus: "Tachi-waza basics (O-soto, O-goshi)", minutes: 35 },
      { day: "Fri", focus: "Ne-waza fundamentals (Kesa-gatame)", minutes: 30 },
      { day: "Sat", focus: "Movement drills + uchikomi", minutes: 30 },
    ],
  },
  {
    title: "Intermediate — Green → Brown Belt",
    description: "Combinations, counters, transitions to ne-waza.",
    week: [
      { day: "Mon", focus: "Combinations (Renraku-waza)", minutes: 45 },
      { day: "Tue", focus: "Counters (Kaeshi-waza)", minutes: 40 },
      { day: "Thu", focus: "Ne-waza transitions", minutes: 45 },
      { day: "Sat", focus: "Randori conditioning", minutes: 60 },
    ],
  },
];

export default function TrainingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.h1}>Daily Training</Text>
        <Text style={styles.intro}>
          Structured home programs you can do solo or with a partner.
        </Text>
        {PROGRAMS.map((p) => (
          <View key={p.title} style={styles.card}>
            <Text style={styles.cardTitle}>{p.title}</Text>
            <Text style={styles.cardDesc}>{p.description}</Text>
            {p.week.map((d) => (
              <View key={d.day} style={styles.dayRow}>
                <Text style={styles.day}>{d.day}</Text>
                <Text style={styles.focus}>{d.focus}</Text>
                <Text style={styles.min}>{d.minutes} min</Text>
              </View>
            ))}
          </View>
        ))}
        <Text style={styles.tip}>
          Always warm up. Listen to your body. Train smart.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: { color: C.white, fontSize: 22, fontWeight: "700", marginBottom: 4 },
  intro: { color: C.muted, fontSize: 13, marginBottom: 18 },
  card: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { color: C.white, fontSize: 16, fontWeight: "600" },
  cardDesc: { color: C.muted, fontSize: 13, marginTop: 4, marginBottom: 10 },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopColor: C.bg,
    borderTopWidth: 1,
  },
  day: { color: C.accent2, width: 48, fontWeight: "600" },
  focus: { color: C.white, flex: 1 },
  min: { color: C.muted, fontSize: 11 },
  tip: {
    color: C.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});
