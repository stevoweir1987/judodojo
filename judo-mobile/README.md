# Judo Training Hub — Mobile (Expo + React Native)

A native iOS + Android rebuild of the Judo Training Hub. Same content as the
old web app (techniques, belt progression, syllabus PDFs, training programs),
but built as a real mobile app with offline support and a working YouTube
player.

## What's offline, what isn't

- ✅ Techniques list, search, filtering, bookmarks, progress, syllabus PDFs,
  daily training programs — **all offline**, bundled in the app.
- 🌐 Technique demo videos stream from YouTube — **needs internet**. (YouTube's
  terms don't allow caching their videos.)

## First-time setup (Windows)

You need Node.js 18+ installed once. If you don't have it:
download from <https://nodejs.org/> (pick the LTS installer).

Then in a terminal:

```powershell
cd C:\Users\steve\OneDrive\Desktop\Judo\judo-mobile
npm install
```

That's it. Installing takes a few minutes the first time.

## Running on your phone

1. Install the **Expo Go** app on your phone (App Store / Play Store).
2. From the project folder run:

   ```powershell
   npx expo start
   ```

3. A QR code appears in the terminal. Scan it with:
   - **iPhone**: the Camera app
   - **Android**: the Expo Go app's built-in scanner
4. The app loads on your phone with hot reload — edit a file, save, see it
   update instantly.

## Project layout

```
judo-mobile/
├── app/                    # screens (file-based routing via expo-router)
│   ├── _layout.tsx         # root nav stack
│   ├── (tabs)/             # bottom tab bar
│   │   ├── _layout.tsx
│   │   ├── index.tsx       # Techniques (default tab)
│   │   ├── my-techniques.tsx
│   │   ├── progression.tsx
│   │   ├── syllabus.tsx
│   │   └── training.tsx
│   ├── technique/[id].tsx  # technique detail + video
│   └── syllabus/[file].tsx # PDF viewer
├── components/
│   ├── VideoPlayer.tsx     # native YouTube player (the fix!)
│   └── TechniqueCard.tsx
├── lib/
│   ├── data.ts             # technique loader + types
│   ├── storage.ts          # AsyncStorage (bookmarks, progress, groups)
│   ├── youtube.ts          # YouTube URL → video ID
│   └── beltRequirements.ts # belt progression data
├── assets/
│   ├── data/techniques.json
│   └── pdfs/               # bundled BJA syllabus PDFs
├── app.json                # Expo config
├── package.json
└── README.md
```

## Editing content

- **Add / edit techniques**: edit `assets/data/techniques.json` (same shape
  as the original web app — `Name`, `English Translation`, `Category`,
  `Sub-category`, `Official Kodokan`, `Video URL`).
- **Add per-technique notes**: extend the `Technique` type in `lib/data.ts`
  and the JSON data, then render them in `app/technique/[id].tsx`.
- **Belt requirements**: edit `lib/beltRequirements.ts`.
- **Training programs**: edit `app/(tabs)/training.tsx`.
- **Add another syllabus PDF**: drop the file in `assets/pdfs/`, then add it
  to the `PDF_MAP` in `app/syllabus/[file].tsx` and the `PDFS` list in
  `app/(tabs)/syllabus.tsx`.

## Shipping to the App Store / Play Store

When you're ready, use **EAS Build** (Expo's cloud build service):

```powershell
npm install -g eas-cli
eas login
eas build --platform ios       # or android, or all
```

This needs Apple Developer ($99/yr) and Google Play Console ($25 one-time)
accounts. Until then, Expo Go on your phone is plenty for development and
showing it to friends.

## Troubleshooting

- **"Project is incompatible with this version of Expo Go"**: this project
  targets Expo SDK 54. If you have an older Expo Go, update from the App
  Store / Play Store. If you have a newer Expo Go (SDK 55+), bump versions
  with `npx expo install --fix` or `npx expo install expo@latest` then
  reinstall.
- **"Cannot find module 'react-native-worklets/plugin'"**: deps are stale.
  Delete `node_modules` and `package-lock.json`, then re-run `npm install`.
- **QR code times out**: phone and laptop must be on the same Wi-Fi.
- **Video shows "couldn't load"**: check internet — videos stream from YouTube.
- **Metro bundler stuck**: stop with Ctrl+C, run `npx expo start -c` to clear cache.
- **PDFs don't open in Expo Go**: `react-native-pdf` is a native module — it
  works in Expo Go on SDK 54. If it doesn't load on a particular phone, try
  `npx expo start -c` to clear cache.
