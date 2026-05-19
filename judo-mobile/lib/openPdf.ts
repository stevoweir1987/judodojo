import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { Alert, Platform } from "react-native";

/**
 * Static asset map. Dynamic require() doesn't work in React Native, so each
 * bundled PDF must be referenced explicitly so Metro can include it.
 */
const PDFS: Record<string, { module: number; title: string }> = {
  "6th-Kyu-5th-Kyu": {
    module: require("../assets/pdfs/6th-Kyu-5th-Kyu.pdf"),
    title: "6th Kyu → 5th Kyu",
  },
  "5th-Kyu-4th-Kyu": {
    module: require("../assets/pdfs/5th-Kyu-4th-Kyu.pdf"),
    title: "5th Kyu → 4th Kyu",
  },
  "02-Kyu-Syllabus-6th-Kyu-5th-Kyu": {
    module: require("../assets/pdfs/02-Kyu-Syllabus-6th-Kyu-5th-Kyu.pdf"),
    title: "Mon Grade Syllabus (6→5)",
  },
  "03-Kyu-Syllabus-5th-Kyu-4th-Kyu": {
    module: require("../assets/pdfs/03-Kyu-Syllabus-5th-Kyu-4th-Kyu.pdf"),
    title: "Mon Grade Syllabus (5→4)",
  },
};

export function listPdfs() {
  return Object.entries(PDFS).map(([id, p]) => ({ id, title: p.title }));
}

/**
 * Open a bundled PDF in the device's system PDF viewer.
 *
 * Works in Expo Go on iOS + Android. The PDF is bundled with the app, so this
 * works fully offline — we copy the asset to the cache directory and pass the
 * path to the OS share sheet, which routes to whatever PDF viewer the user has
 * (Files / Books on iOS; Drive / Adobe / Chrome on Android).
 */
export async function openPdf(id: string): Promise<void> {
  const entry = PDFS[id];
  if (!entry) {
    Alert.alert("Not found", "That PDF isn't bundled with the app.");
    return;
  }

  try {
    const asset = Asset.fromModule(entry.module);
    await asset.downloadAsync();

    // Asset URIs in Expo Go aren't always shareable directly — copy to cache.
    const localUri = asset.localUri ?? asset.uri;
    const fileName = `${id}.pdf`;
    const dest = `${FileSystem.cacheDirectory}${fileName}`;

    const info = await FileSystem.getInfoAsync(dest);
    if (!info.exists) {
      await FileSystem.copyAsync({ from: localUri, to: dest });
    }

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(
        "Can't open PDF",
        Platform.OS === "android"
          ? "Install a PDF viewer (e.g. Google Drive, Adobe Acrobat) and try again."
          : "Sharing isn't available on this device."
      );
      return;
    }

    await Sharing.shareAsync(dest, {
      mimeType: "application/pdf",
      dialogTitle: entry.title,
      UTI: "com.adobe.pdf",
    });
  } catch (err) {
    console.warn("openPdf failed", err);
    Alert.alert("Error", "Couldn't open that PDF.");
  }
}
