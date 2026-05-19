/**
 * Extract a YouTube video ID from any of its URL forms:
 *   https://www.youtube.com/watch?v=VIDEOID
 *   https://youtu.be/VIDEOID
 *   https://www.youtube.com/embed/VIDEOID
 *   https://www.youtube.com/shorts/VIDEOID
 */
export function extractVideoId(url: string | undefined | null): string | null {
  if (!url) return null;
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?&#/]+)/,
    /youtube\.com\/embed\/([^?&#/]+)/,
    /youtube\.com\/shorts\/([^?&#/]+)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m && m[1]) return m[1];
  }
  return null;
}
