import { Slot } from "expo-router";

// Minimal layout — bypasses the bottom Tabs navigator (react-native-screens)
// to isolate native-module crashes. We'll re-add tabs once the app boots.
export default function TabsLayout() {
  return <Slot />;
}
