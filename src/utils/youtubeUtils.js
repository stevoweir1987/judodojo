// Utility function to extract video ID from YouTube URL
export const extractVideoId = (url) => {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
};

// Utility function to convert YouTube URL to embed URL
export const convertToEmbedUrl = (url) => {
  if (!url) return null;
  
  const videoId = extractVideoId(url);
 if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return null;
};

// Direct mapping of specific techniques to their video URLs
// This ensures certain techniques always have the correct videos displayed
const directVideoMapping = {
  "Escape from Kami-shiho-gatame using 'action and re-action": [
    "https://www.youtube.com/watch?v=Hl0C4RRavHo",
    "https://www.youtube.com/watch?v=k8ooOlafP0E"
  ],
  "Escape from Kami-shiho-gatame using \u2018action and re-action": [
    "https://www.youtube.com/watch?v=Hl0C4RRavHo",
    "https://www.youtube.com/watch?v=k8ooOlafP0E"
  ],
  "Escape from Tate-shiho-gatame using a 'clamp and roll' action.": [
    "https://www.youtube.com/watch?v=PV_anL347rw",
    "https://www.youtube.com/watch?v=EtQybwnEcsY"
  ],
  "Escape from Tate-shiho-gatame using a \u2018clamp and roll\u2019 action.": [
    "https://www.youtube.com/watch?v=PV_anL347rw",
    "https://www.youtube.com/watch?v=EtQybwnEcsY"
  ],
  "Escape from Yoko-shiho-gatame using 'trap, bridge and roll' action.": [
    "https://www.youtube.com/watch?v=yK_GSamSPko",
    "https://www.youtube.com/watch?v=tiI01xNVJ_4"
  ],
  "Escape from Yoko-shiho-gatame using \u2018trap, bridge and roll\u2019 action.": [
    "https://www.youtube.com/watch?v=yK_GSamSPko",
    "https://www.youtube.com/watch?v=tiI01xNVJ_4"
  ],
  "Turnover into Kesa-gatame (Uke in \"all fours\" position)": [
    "https://www.youtube.com/watch?v=r-ODhj19vL0"
  ],
  "Turnover into Kesa-gatame (Uke in \u201call fours\u201d position)": [
    "https://www.youtube.com/watch?v=r-ODhj19vL0"
  ],
  "Turnover into Yoko-shiho-gatame (Uke in face-down prone position)": [
    "https://www.youtube.com/watch?v=19TTB0bdL7w"
  ],
  "Demonstrate the right and left standard grips judo": [
    "https://www.youtube.com/watch?v=T6c_FpfVZy4"
  ],
  "Demonstrate right against left grips, double lapel, and high collar grips.": [
    "https://www.youtube.com/watch?v=97djf2GY6I0"
  ],
  "Demonstration of Nage-komi in light randori with a cooperative partner.": [
    "https://www.youtube.com/watch?v=QUKkd08DT9M"
  ]
};

// Function to find video URLs for a specific technique
// First checks direct mapping, then falls back to CSV matching
export const findTechniqueVideos = (techniqueName, csvData) => {
  // First check if we have a direct mapping for this technique
  if (directVideoMapping[techniqueName]) {
    return directVideoMapping[techniqueName];
  }
  
  // Also check for common Unicode variations
  const unicodeVariations = [
    techniqueName.replace(/'/g, "\u2018"), // Replace apostrophe with left single quotation mark
    techniqueName.replace(/"/g, "\u201c"), // Replace double quote with left double quotation mark
    techniqueName.replace(/'/g, "\u2019"), // Replace apostrophe with right single quotation mark
    techniqueName.replace(/"/g, "\u201d")  // Replace double quote with right double quotation mark
  ];
  
  for (const variation of unicodeVariations) {
    if (directVideoMapping[variation]) {
      return directVideoMapping[variation];
    }
  }
  
  // If no direct mapping, fall back to CSV matching
  if (!csvData || !Array.isArray(csvData)) return [];
  
  // Look for exact or close matches in the technique name or English translation
  const technique = csvData.find(t => {
    // Check for exact name match (case-insensitive)
    if (t.Name && t.Name.toLowerCase() === techniqueName.toLowerCase()) return true;
    
    // Check if the technique name contains the clean name as a whole word
    if (t.Name) {
      // Ensure it's a meaningful match (not just a partial match)
      const nameWords = t.Name.toLowerCase().split(/[\s-]/);
      const searchWords = techniqueName.toLowerCase().split(/[\s-]/);
      if (searchWords.some(word => nameWords.includes(word))) return true;
    }
    
    // Check English translation match
    if (t["English Translation"] && t["English Translation"].toLowerCase().includes(techniqueName.toLowerCase())) return true;
    
    // Check if the search term matches the English translation more closely
    if (t["English Translation"] && techniqueName.toLowerCase().includes(t["English Translation"].toLowerCase())) return true;
    
    // Default: return false if no condition is met
    return false;
  });

  if (technique && technique["Video URL"]) {
    return [technique["Video URL"]];
  }
  
  return [];
};

// Function to process techniques data and add embed URLs
export const processTechniquesData = (techniques) => {
  return techniques.map(technique => ({
    ...technique,
    embedUrl: technique["Video URL"] ? convertToEmbedUrl(technique["Video URL"]) : null,
    videoId: technique["Video URL"] ? extractVideoId(technique["Video URL"]) : null
 }));
};
