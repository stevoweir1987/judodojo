/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",       // slate-900
        surface: "#1e293b",  // slate-800
        accent: "#3b82f6",   // blue-500
        accent2: "#60a5fa",  // blue-400
        muted: "#94a3b8",    // slate-400
      },
    },
  },
  plugins: [],
};
