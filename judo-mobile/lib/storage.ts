import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  bookmarks: "judo:bookmarks",
  progress: "judo:progress",
  groups: "judo:groups",
};

// --- bookmarks ----------------------------------------------------------

export async function getBookmarks(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEYS.bookmarks);
  return raw ? JSON.parse(raw) : [];
}

export async function toggleBookmark(techniqueId: string): Promise<string[]> {
  const current = await getBookmarks();
  const next = current.includes(techniqueId)
    ? current.filter((id) => id !== techniqueId)
    : [...current, techniqueId];
  await AsyncStorage.setItem(KEYS.bookmarks, JSON.stringify(next));
  return next;
}

// --- belt progression ---------------------------------------------------

export type ProgressMap = Record<string, Record<string, boolean>>; // belt -> requirementId -> done

export async function getProgress(): Promise<ProgressMap> {
  const raw = await AsyncStorage.getItem(KEYS.progress);
  return raw ? JSON.parse(raw) : {};
}

export async function setRequirementDone(
  belt: string,
  requirementId: string,
  done: boolean
): Promise<ProgressMap> {
  const current = await getProgress();
  const beltMap = { ...(current[belt] || {}) };
  if (done) beltMap[requirementId] = true;
  else delete beltMap[requirementId];
  const next = { ...current, [belt]: beltMap };
  await AsyncStorage.setItem(KEYS.progress, JSON.stringify(next));
  return next;
}

// --- custom groups ------------------------------------------------------

export type Group = { id: string; name: string; techniqueIds: string[] };

export async function getGroups(): Promise<Group[]> {
  const raw = await AsyncStorage.getItem(KEYS.groups);
  return raw ? JSON.parse(raw) : [];
}

export async function saveGroups(groups: Group[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.groups, JSON.stringify(groups));
}
