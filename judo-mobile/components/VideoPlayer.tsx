import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const C = {
  surface: "#1e293b",
  muted: "#94a3b8",
};

/**
 * Native YouTube player. Uses react-native-youtube-iframe (no plain iframe),
 * which speaks the YouTube IFrame Player API directly through a native
 * WebView. Handles autoplay/cues/fullscreen on both platforms.
 */
export default function VideoPlayer({
  videoId,
  height = 220,
}: {
  videoId: string | null;
  height?: number;
}) {
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!videoId) {
    return (
      <View style={[styles.empty, { height }]}>
        <Text style={{ color: C.muted, fontSize: 13 }}>No video available</Text>
      </View>
    );
  }

  if (errored) {
    return (
      <View style={[styles.empty, { height, paddingHorizontal: 16 }]}>
        <Text style={{ color: C.muted, fontSize: 13, textAlign: "center" }}>
          Couldn't load video — check your internet connection.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { height }]}>
      {!ready && (
        <View style={styles.loader}>
          <ActivityIndicator color="#60a5fa" />
        </View>
      )}
      <YoutubePlayer
        height={height}
        videoId={videoId}
        onReady={() => setReady(true)}
        onError={() => setErrored(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    backgroundColor: C.surface,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: { borderRadius: 12, overflow: "hidden", backgroundColor: "#000" },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
