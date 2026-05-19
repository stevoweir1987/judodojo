import { Slot } from "expo-router";

// Minimal root layout — diagnostic step. Once the app boots cleanly
// we can re-add Stack navigation, GestureHandlerRootView, StatusBar.
export default function RootLayout() {
  return <Slot />;
}
