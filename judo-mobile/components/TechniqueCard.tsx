import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import type { Technique } from "../lib/data";

export default function TechniqueCard({
  technique,
  bookmarked,
  onToggleBookmark,
}: {
  technique: Technique;
  bookmarked?: boolean;
  onToggleBookmark?: () => void;
}) {
  return (
    <Link href={`/technique/${technique.id}`} asChild>
      <Pressable className="bg-surface rounded-2xl p-4 mb-3 active:opacity-80">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-white text-lg font-semibold">
              {technique.name}
            </Text>
            <Text className="text-muted text-sm mt-0.5">
              {technique.english}
            </Text>
            <View className="flex-row mt-2 gap-2 flex-wrap">
              <Text className="text-accent2 text-xs bg-bg px-2 py-1 rounded-full">
                {technique.category}
              </Text>
              <Text className="text-muted text-xs bg-bg px-2 py-1 rounded-full">
                {technique.subCategory}
              </Text>
              {technique.kodokan && (
                <Text className="text-emerald-400 text-xs bg-bg px-2 py-1 rounded-full">
                  Kodokan
                </Text>
              )}
            </View>
          </View>
          {onToggleBookmark && (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                onToggleBookmark();
              }}
              hitSlop={12}
            >
              <Text style={{ fontSize: 22 }}>{bookmarked ? "★" : "☆"}</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </Link>
  );
}
