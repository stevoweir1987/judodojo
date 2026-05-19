import rawTechniques from "../assets/data/techniques.json";
import { extractVideoId } from "./youtube";

export type RawTechnique = {
  Name: string;
  "English Translation": string;
  Category: string;
  "Sub-category": string;
  "Official Kodokan": string;
  "Video URL": string;
};

export type Technique = {
  id: string;             // slugified name, stable across runs
  name: string;
  english: string;
  category: string;       // Nage-waza, Katame-waza, ...
  subCategory: string;    // Te-waza, Koshi-waza, ...
  kodokan: boolean;
  videoUrl: string;
  videoId: string | null; // extracted YouTube id
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

let cache: Technique[] | null = null;

export function getAllTechniques(): Technique[] {
  if (cache) return cache;
  const list = (rawTechniques as RawTechnique[]).map((t) => ({
    id: slugify(t.Name),
    name: t.Name,
    english: t["English Translation"],
    category: t.Category,
    subCategory: t["Sub-category"],
    kodokan: (t["Official Kodokan"] || "").toLowerCase() === "yes",
    videoUrl: t["Video URL"],
    videoId: extractVideoId(t["Video URL"]),
  }));
  cache = list;
  return list;
}

export function getTechniqueById(id: string): Technique | undefined {
  return getAllTechniques().find((t) => t.id === id);
}

export function getCategories(): { category: string; subCategories: string[] }[] {
  const map = new Map<string, Set<string>>();
  for (const t of getAllTechniques()) {
    if (!map.has(t.category)) map.set(t.category, new Set());
    map.get(t.category)!.add(t.subCategory);
  }
  return Array.from(map.entries()).map(([category, subs]) => ({
    category,
    subCategories: Array.from(subs).sort(),
  }));
}
