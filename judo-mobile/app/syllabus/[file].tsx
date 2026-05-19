import { Redirect } from "expo-router";

// PDF viewing now happens via the OS share-sheet from the Syllabus tab,
// so this dynamic route is no longer used. It's kept as a redirect so
// any stale link or deep-link safely lands on the Syllabus list.
export default function SyllabusViewerRedirect() {
  return <Redirect href="/syllabus" />;
}
