import pandas as pd
from yt_dlp import YoutubeDL
from rapidfuzz import fuzz
import re

# ==========================================
# CONFIG
# ==========================================
INPUT_FILE = "C:/Users/steve/Downloads/updated_judo_techniques.csv"
OUTPUT_FILE_CSV = "updated_judo_techniques_with_videos.csv"
OUTPUT_FILE_EXCEL = "updated_judo_techniques_with_videos.xlsx"
CHANNEL_URL = "https://www.youtube.com/@KODOKANJUDO/videos"

# ==========================================
# CLEANING FUNCTION
# ==========================================
def clean_name(name):
    name = str(name).lower()
    name = name.replace('_', '-')
    name = re.sub(r'[^a-z0-9\- ]', '', name)
    return name.strip()

# ==========================================
# LOAD SPREADSHEET
# ==========================================
df = pd.read_csv(INPUT_FILE)

if 'Video URL' not in df.columns:
    df['Video URL'] = ''

# ==========================================
# DOWNLOAD VIDEO METADATA FROM KODOKAN CHANNEL
# ==========================================
print("Fetching KODOKAN YouTube video list...")

ydl_opts = {
    'quiet': True,
    'extract_flat': True,
    'skip_download': True,
}

with YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(CHANNEL_URL, download=False)

videos = []

for entry in info['entries']:
    title = entry.get('title', '')
    video_id = entry.get('id', '')

    if video_id:
        url = f"https://www.youtube.com/watch?v={video_id}"
        videos.append({
            'title': title,
            'clean_title': clean_name(title),
            'url': url
        })

print(f"Found {len(videos)} videos")

# ==========================================
# MATCH TECHNIQUES TO VIDEOS
# ==========================================
for idx, row in df.iterrows():
    technique = str(row['Name'])
    clean_technique = clean_name(technique)

    best_match = None
    best_score = 0

    for video in videos:
        score = fuzz.partial_ratio(clean_technique, video['clean_title'])

        if score > best_score:
            best_score = score
            best_match = video

    if best_match and best_score >= 80:
        df.at[idx, 'Video URL'] = best_match['url']
        print(f"MATCHED: {technique} -> {best_match['title']} ({best_score})")
    else:
        print(f"NO MATCH: {technique}")

# ==========================================
# SAVE UPDATED FILE
# ==========================================
df.to_csv(OUTPUT_FILE_CSV, index=False)
print(f"\nSaved: {OUTPUT_FILE_CSV}")

# Also save as Excel
df.to_excel(OUTPUT_FILE_EXCEL, index=False)
print(f"Saved: {OUTPUT_FILE_EXCEL}")

print("\nDONE!")