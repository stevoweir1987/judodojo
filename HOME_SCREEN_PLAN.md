# JudoHub Home Screen — Build Plan

## Current State (done ✓)
- Hero card: CURRENT GRADE (from-belt image + name), "Grading for: X Belt →" subtitle, belt image, gold progress bar with shimmer, View Syllabus button
- Floating bottom nav with blur
- Belt bug fixed (White = White, not Red)

---

## Sections to Build (top → bottom)

---

### 1. Hero Card — Minor Tweaks (existing)
**Status:** Working. Small polish pass only.
- [ ] Confirm "Grading for" secondary line looks right at every belt
- [ ] Confirm White belt shows white belt image + "Grading for: Red Belt →"
- [ ] Check safe-area padding on a real device

---

### 2. Continue Learning (grading readiness video list)

**What it is:** A scrollable list of techniques the judoka needs for their next grading — each row has a YouTube thumbnail on the left, technique name + category in the middle, and a ▶ play button on the right. Tapping opens the video modal.

**Data source:** `activeBelt.nextItems` — the incomplete techniques from the current grading syllabus.

**HTML structure per row:**
```
[ thumbnail img ]  [ O Soto Gari          ]  [ ▶ ]
                   [ Major Outer Reap      ]
                   [ ░░░░░░░░░░░░░░░░░░░░ ] ← thin progress bar (done/not)
```

**Implementation notes:**
- YouTube thumbnail URL: `https://img.youtube.com/vi/{VIDEO_ID}/mqdefault.jpg`
- Need to match technique name → video URL via `TECHNIQUES` data array
- "View all" link top-right navigates to belt syllabus view
- Max 4-5 items shown, "View all" reveals rest
- Section header: "Continue Learning" (left) + "View all →" (right)
- Card bg: white/light card on dark background (like the mockup)

**CSS classes to create:**
- `.hd-continue-section` — section wrapper
- `.hd-continue-card` — white rounded card
- `.hd-continue-item` — flex row
- `.hd-continue-thumb` — 56×56 rounded thumbnail img
- `.hd-continue-info` — middle col (name + sub)
- `.hd-continue-play` — gold circle play button

---

### 3. Quick Stats Card

**What it is:** Two stat blocks side by side in a dark card.

**Left stat — Day Streak:**
- Big number (e.g. "7")
- Fire emoji 🔥
- Label: "Day Streak"

**Right stat — Overall Progress:**
- Circular donut chart (CSS or SVG) showing % 
- e.g. "27%" 
- Label: "Overall Progress" (techniques reviewed / total across all belts)

**Data sources:**
- `getStreak()` → streak number
- `getOverallProgress()` → needs to be built — count all checked techniques across all belts / total count

**CSS classes:**
- `.hd-stats-card` — dark card, flex row
- `.hd-stat-block` — each half
- `.hd-stat-donut` — SVG circle progress (stroke-dashoffset trick)
- `.hd-stat-number` — big bold number

---

### 4. Coaching Tip Card

**What it is:** A daily tip card — small technique illustration on the right, coaching text on the left. Rotates daily (keyed to date).

**Content:** 7–14 tip objects, each with:
- `title`: e.g. "Focus on Kuzushi"
- `body`: 2–3 sentence coaching tip
- `technique`: technique name (used to pull thumbnail if available)
- `emoji`: fallback icon if no image

**Example tips to write (pre-populate array in JS):**
1. Kuzushi — "Every throw starts with balance breaking. Master kuzushi and the throw will follow."
2. Grip fighting — "Control the sleeve before the lapel. A strong grip wins half the battle."
3. Ukemi — "Good falling is good judo. Your body learns ukemi, your mind learns courage."
4. Combinations — "Set up your big throw with a smaller one. Two-attack combinations catch your opponent off guard."
5. Ne-waza — "Ground work wins contests. Even 3 seconds of osaekomi-waza can change a match."
6. Posture — "Stay upright. Bending forward gives your opponent your back."
7. Randori mindset — "In randori, experiment. In shiai, execute."

**Layout:**
```
[ lightbulb icon ]  Focus on Kuzushi
                    Every throw starts with balance...
            [ small technique thumbnail / illustration ]
```

**CSS classes:**
- `.hd-tip-card` — yellow-accent left border or gold top bar
- `.hd-tip-title` — bold, dark or gold
- `.hd-tip-body` — muted text, 2-3 lines
- `.hd-tip-img` — small 64×64 thumbnail, right-aligned

---

### 5. Quick Revision Card

**What it is:** A mini-quiz launcher. Presents 3 options to start a quick revision session.

**Options:**
- ⏱ 5 Min Session → launches a timed quiz of 5 belt-relevant questions
- ⏱ 10 Min Session → 10 questions
- ✏️ Custom Quiz → opens a picker (technique category filter)

**Quiz question types:**
- "What does [Japanese name] mean?" → multiple choice of English names
- "Which category is [technique] in?" → Te-waza / Koshi-waza / Ashi-waza / Ne-waza
- "Name a technique from [category]" → free text or pick from list
- "True/False: [technique] is in your grading syllabus" → binary

**Data source:** `TECHNIQUES` array — filter to techniques relevant to `activeBelt`

**Layout:**
```
Quick Revision
Short on time? Try a quick revision session.
[ ⏱ 5 Min Session  ]
[ ⏱ 10 Min Session ]
[ ✏️ Custom Quiz   ]
```

**CSS classes:**
- `.hd-revision-card` — light card, white bg
- `.hd-revision-btn` — full-width row button, icon left, text right, chevron far right
- `.hd-revision-title` — section title

---

## Build Order (suggested for tomorrow)

1. **Continue Learning** — highest value, uses existing data, visible impact
2. **Quick Stats** — needs `getOverallProgress()` helper function
3. **Coaching Tip** — write the tip array, build the card UI
4. **Quick Revision** — most complex (quiz engine), build launcher UI first then wire quiz logic

---

## Helper functions needed

| Function | Where | Notes |
|---|---|---|
| `getVideoIdForTechnique(name)` | home.js | Match technique name → TECHNIQUES array → extract YouTube ID |
| `getThumbnailUrl(videoId)` | home.js | Return `https://img.youtube.com/vi/${id}/mqdefault.jpg` |
| `getOverallProgress()` | home.js or belt.js | Count all checked items / total across all belts |
| `getDailyTip()` | home.js | Return tip object keyed to `new Date().getDay()` |
| `startQuickRevision(minutes)` | home.js | Launch quiz modal with time-limited question set |

---

## Files to edit

- `deploy/js/home.js` — add new section HTML in `renderHome()` scroll body, add helper functions
- `deploy/css/main.css` — add CSS for all new sections
- `deploy-lite/` — keep in sync (always `cp` both)
