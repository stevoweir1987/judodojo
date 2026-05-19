import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Dumbbell, Play, ChevronRight, ChevronDown, Menu, X, FileText, ExternalLink, Bookmark, Check, Plus, Edit, Trash2, Move } from 'lucide-react';
import InddViewer from './components/InddViewer';
import VideoPlayer from './components/VideoPlayer';
import ProgressTracker from './components/ProgressTracker';
import judoTechniques from './data/combined_judo_techniques.json';
import { processTechniquesData, findTechniqueVideos, convertToEmbedUrl, extractVideoId } from './utils/youtubeUtils';

const JudoTrainingApp = () => {
  const [activeTab, setActiveTab] = useState('techniques');
  const [expandedTechnique, setExpandedTechnique] = useState(null);
  const [expandedBelt, setExpandedBelt] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customTechniques, setCustomTechniques] = useState([]);
  const [techniqueGroups, setTechniqueGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [expandedGroups, setExpandedGroups] = useState({});

 // Load custom techniques and groups from localStorage on component mount
  useEffect(() => {
    const savedCustomTechniques = localStorage.getItem('judoCustomTechniques');
    if (savedCustomTechniques) {
      setCustomTechniques(JSON.parse(savedCustomTechniques));
    }

    const savedTechniqueGroups = localStorage.getItem('judoTechniqueGroups');
    if (savedTechniqueGroups) {
      setTechniqueGroups(JSON.parse(savedTechniqueGroups));
    }

    // Load expanded groups state
    const savedExpandedGroups = localStorage.getItem('judoExpandedGroups');
    if (savedExpandedGroups) {
      setExpandedGroups(JSON.parse(savedExpandedGroups));
    }
  }, []);

  // Save custom techniques to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('judoCustomTechniques', JSON.stringify(customTechniques));
  }, [customTechniques]);

  // Save technique groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('judoTechniqueGroups', JSON.stringify(techniqueGroups));
  }, [techniqueGroups]);

  // Save expanded groups state to localStorage
  useEffect(() => {
    localStorage.setItem('judoExpandedGroups', JSON.stringify(expandedGroups));
  }, [expandedGroups]);

  // Process the CSV data to categorize techniques properly
  const processedTechniques = processTechniquesData(judoTechniques);

   // Create a mapping function to find technique videos from CSV data
  const findTechniqueVideo = (techniqueName) => {
    // First try to find videos using the direct mapping
    const videos = findTechniqueVideos(techniqueName, processedTechniques);

    // If we found videos, use the first one
    if (videos && videos.length > 0) {
      const videoUrl = videos[0];
      const embedUrl = convertToEmbedUrl(videoUrl);
      const videoId = extractVideoId(videoUrl);

      // Use the technique name as is for display
      return {
        embedUrl: embedUrl,
        videoId: videoId,
        name: techniqueName,
        hasVideo: true
      };
    }

    // If no direct mapping, fall back to the original CSV matching
    // Look for the technique in the processed CSV data
    // First, try exact match on the technique name without parentheses content
    const cleanTechniqueName = techniqueName.replace(/\s*\(.*?\)\s*/g, '').trim();

    // Look for exact or close matches in the technique name or English translation
    const technique = processedTechniques.find(t => {
      // Check for exact name match (case-insensitive)
      if (t.Name.toLowerCase() === cleanTechniqueName.toLowerCase()) return true;

      // Check if the technique name contains the clean name as a whole word
      if (t.Name.toLowerCase().includes(cleanTechniqueName.toLowerCase())) {
        // Ensure it's a meaningful match (not just a partial match)
        const nameWords = t.Name.toLowerCase().split(/[\s-]/);
        const searchWords = cleanTechniqueName.toLowerCase().split(/[\s-]/);
        if (searchWords.some(word => nameWords.includes(word))) return true;
      }

      // Check English translation match
      if (t["English Translation"] && t["English Translation"].toLowerCase().includes(cleanTechniqueName.toLowerCase())) return true;

      // Check if the search term matches the English translation more closely
      if (t["English Translation"] && cleanTechniqueName.toLowerCase().includes(t["English Translation"].toLowerCase())) return true;

      // Default: return false if no condition is met
      return false;
    });

    if (technique && technique.embedUrl) {
      // Use the technique's actual name and translation for display
      const displayName = technique["English Translation"] ?
        `${technique.Name} (${technique["English Translation"]})` :
        technique.Name;
      return {
        embedUrl: technique.embedUrl,
        videoId: technique.videoId,
        name: displayName,
        hasVideo: true
      };
    }

    // If no video found, return the original technique name
    return {
      embedUrl: null,
      videoId: null,
      name: techniqueName,
      hasVideo: false
    };
  };


  // Categorize techniques by type with more detailed information
  const techniques = {
    throws: processedTechniques
      .filter(technique => technique.Category === "Nage-waza")
      .map(technique => ({
        name: technique.Name + " (" + technique["English Translation"] + ")",
        category: technique["Sub-category"] + " (Throws)",
        embedUrl: technique.embedUrl,
        videoId: technique.videoId,
        description: technique["English Translation"] ? `Technique: ${technique["English Translation"]}` : "Throwing technique from the official Kodokan syllabus.",
        execution: ["Step-by-step execution details would be added here based on the specific technique."],
        keyPoints: ["Key technique points would be detailed here."],
        officialKodokan: technique["Official Kodokan"] === "Yes"
      })),
    holds: processedTechniques
      .filter(technique => technique.Category === "Katame-waza" || technique["Sub-category"] === "Osaekomi-waza")
      .map(technique => ({
        name: technique.Name + " (" + technique["English Translation"] + ")",
        category: technique["Sub-category"] + " (Holds)",
        embedUrl: technique.embedUrl,
        videoId: technique.videoId,
        description: technique["English Translation"] ? `Holding technique: ${technique["English Translation"]}` : "Holding technique from the official Kodokan syllabus.",
        execution: ["Step-by-step execution details would be added here based on the specific technique."],
        keyPoints: ["Key technique points would be detailed here."],
        officialKodokan: technique["Official Kodokan"] === "Yes"
      })),
    strangles: processedTechniques
      .filter(technique => technique["Sub-category"] === "Shime-waza")
      .map(technique => ({
        name: technique.Name + " (" + technique["English Translation"] + ")",
        category: technique["Sub-category"] + " (Strangles)",
        embedUrl: technique.embedUrl,
        videoId: technique.videoId,
        description: technique["English Translation"] ? `Strangle technique: ${technique["English Translation"]}` : "Strangle technique from the official Kodokan syllabus.",
        execution: ["Step-by-step execution details would be added here based on the specific technique."],
        keyPoints: ["Key technique points would be detailed here."],
        officialKodokan: technique["Official Kodokan"] === "Yes"
      }))
  };

  // Additional techniques that might be categorized differently in the CSV
  const additionalThrows = processedTechniques.filter(technique =>
    technique["Sub-category"] === "Te-waza" ||
    technique["Sub-category"] === "Koshi-waza" ||
    technique["Sub-category"] === "Ashi-waza" ||
    technique["Sub-category"] === "Ma-sutemi-waza" ||
    technique["Sub-category"] === "Yoko-sutemi-waza"
  ).map(technique => ({
    name: technique.Name + " (" + technique["English Translation"] + ")",
    category: technique["Sub-category"] + " (Throws)",
    embedUrl: technique.embedUrl,
    videoId: technique.videoId,
    description: technique["English Translation"] ? `Throwing technique: ${technique["English Translation"]}` : "Throwing technique from the official Kodokan syllabus.",
    execution: ["Step-by-step execution details would be added here based on the specific technique."],
    keyPoints: ["Key technique points would be detailed here."],
    officialKodokan: technique["Official Kodokan"] === "Yes"
  }));

 // Combine throws to ensure all throwing techniques are included
  techniques.throws = [...techniques.throws, ...additionalThrows];

  const beltProgression = {
    toYellow: {
      name: "6th Kyu (Red) to 5th Kyu (Yellow)",
      duration: "Typically 3-6 months depending on training frequency",
      requirements: {
        fundamentalSkills: {
          ukemi: ["Mae Ukemi (Front Breakfall)"],
          tachiWaza: [
            "Tai-otoshi (Body Drop Throw)",
            "Ippon-seoi-nage (One Arm Shoulder Throw)",
            "Ouchi-gari (Major Inner Reaping Throw)"
          ],
          osaekomiWaza: [
            "Yoko-shiho-gatame (Side Four Quarters Hold)",
            "Tate-shiho-gatame (Lengthwise Four Quarters Hold)",
            "Kami-shiho-gatame (Upper Four Quarters Hold)"
          ]
        },
        performanceSkills: {
          transitionTechniques: [
            "Tai-otoshi into Yoko-shiho-gatame",
            "Ippon-seoi-nage into Kami-shiho-gatame",
            "Ouchi-gari into Tate-shiho-gatame"
          ],
          neWaza: [
            "Escape from Kami-shiho-gatame using 'action and re-action'",
            "Escape from Tate-shiho-gatame using a 'clamp and roll' action",
            "Escape from Yoko-shiho-gatame using 'trap, bridge and roll' action",
            "Turnover into Kesa-gatame (Uke in 'all fours' position)",
            "Turnover into Mune-gatame (Uke in 'all fours' position)",
            "Turnover into Yoko-shiho-gatame (Uke in face-down prone position)"
          ],
          kumikata: [
            "Demonstrate the right and left standard grips",
            "Demonstrate right against left grips, double lapel, and high collar grips"
          ],
          nagekomiRandori: [
            "Demonstration of Nage-komi in light randori with a cooperative partner (approximately 2 minutes)",
            "Alternating throws with partner, demonstrating proficiency on both right and left sides"
          ]
        },
        personalChoice: [
          "Demonstrate two additional techniques: one tachi-waza and one ne-waza",
          "Techniques can be chosen and demonstrated to the left or right using any suitable grip"
        ],
        supplementaryKnowledge: {
          terminology: [
            { japanese: "Ippon-seoi-nage", english: "One Arm Shoulder Throw", description: "Throw where uke is pulled onto tori's back and flipped over the shoulder using one arm." },
            { japanese: "Kami-shiho-gatame", english: "Upper Four Quarters Hold", description: "Hold uke from the head end, controlling both arms and shoulders." },
            { japanese: "Kumi-kata", english: "Engagement Position", description: "The grip and stance taken before attacking in judo." },
            { japanese: "Mae-ukemi", english: "Front Breakfall", description: "Falling forward safely, protecting head and arms." },
            { japanese: "Mune-gatame", english: "Chest Hold", description: "Hold uke by pinning their upper body to the mat using tori's chest." },
            { japanese: "Nage-komi", english: "Repetitive Throwing", description: "Practicing throws continuously to improve form and timing." },
            { japanese: "O-uchi-gari", english: "Major Inner Reaping Throw", description: "Sweep uke's inner leg from the inside while breaking balance backwards." },
            { japanese: "Randori", english: "Free Practice", description: "Sparring practice with resistance, but not full competition." },
            { japanese: "Tai-otoshi", english: "Body Drop Throw", description: "Block uke's leg while dropping your body to throw them over your hip/side." },
            { japanese: "Tate-shiho-gatame", english: "Lengthwise Four Quarters Hold", description: "Pin uke chest-to-chest along their body, controlling both arms." },
            { japanese: "Yoko-shiho-gatame", english: "Side Four Quarters Hold", description: "Pin uke from the side, controlling head, arm, and hip." }
          ],
          contestRules: ["Give two examples of actions against the contest rules"],
          moralCode: [
            { value: "Courtesy", explanation: "Be polite and respectful to others at all times — bowing, helping your partner up, thanking them for practice." },
            { value: "Courage", explanation: "Face challenges without fear — whether that's trying a new throw or stepping up to fight someone stronger." },
            { value: "Honesty", explanation: "Be truthful with yourself and others — admit mistakes, don't cheat in training or competition." },
            { value: "Honour", explanation: "Always do what's right — represent yourself, your club, and judo with integrity." },
            { value: "Modesty", explanation: "Don't boast — let your judo speak for itself. Win or lose, stay humble." },
            { value: "Respect", explanation: "Treat others how you'd like to be treated — bow to your opponent, listen to your coach, care for the dojo." },
            { value: "Self-control", explanation: "Keep your emotions in check — no anger, no reckless moves, keep calm under pressure." },
            { value: "Friendship", explanation: "Build mutual trust — many strong friendships are made through shared training and respect." }
          ]
        }
      }
    },
    toOrange: {
      name: "5th Kyu (Yellow) to 4th Kyu (Orange)",
      duration: "Typically 6-12 months depending on training frequency",
      requirements: {
        fundamentalSkills: {
          tachiWaza: [
            "Tsuri-komi-goshi (Drawing Hip Throw)",
            "O-goshi (Major Hip Throw)",
            "Seoi-otoshi (Shoulder Drop Throw)",
            "Morote-seoi-nage (Two-Handed Shoulder Throw)",
            "Kouchi-gari (Minor Inner Reaping Throw)",
            "Kosoto-gake (Minor Outer Hook Throw)",
            "Kosoto-gari (Minor Outer Reaping Throw)",
            "Osoto-gari (Major Outer Reaping Throw)"
          ]
        },
        performanceSkills: {
          combinationTechniques: [
            "Ouchi-gari into Kouchi-gari",
            "Kouchi-gari into Osoto-gari or Osoto-gake",
            "Kouchi-gari into Morote-seoi-nage",
            "Ippon-seoi-nage into Kouchi-gari",
            "Any technique as a combination with Seoi-otoshi or Kouchi-gari"
          ],
          counterTechniques: [
            "Ouchi-gari countered by Tsuri-komi-goshi",
            "Tai-otoshi countered by Kosoto-gari or Kosoto-gake"
          ],
          neWaza: [
            "Escape from Kesa-gatame using a 'bridge and roll'",
            "Move into Kesa-gatame from between Uke's legs",
            "Move into Yoko-shiho-gatame from between Uke's legs",
            "Arm roll with Uke approaching from the front",
            "Arm roll with Uke approaching from behind",
            "Turnover from underneath Uke into Tate-shiho-gatame"
          ],
          randori: [
            "Randori demonstration with a cooperative partner (approximately 3 minutes)",
            "Demonstrate a variety of techniques and kumi-kata",
            "Throws to both the right and left sides when possible"
          ]
        },
        personalChoice: [
          "Demonstrate two tachi-waza and one ne-waza technique",
          "Techniques must be demonstrated in an appropriate practical situation, including attacking opportunity, best grip, and appropriate movement",
          "Demonstrate them as a combination, a counter, and a transition into Ne-waza"
        ],
        supplementaryKnowledge: {
          terminology: [
            { japanese: "Kosoto-gake", english: "Minor Outer Hook Throw" },
            { japanese: "Kosoto-gari", english: "Minor Outer Reaping Throw" },
            { japanese: "Kouchi-gari", english: "Minor Inner Reaping Throw" },
            { japanese: "Morote-seoi-nage", english: "Two-Handed Shoulder Throw" },
            { japanese: "Ogoshi", english: "Major Hip Throw" },
            { japanese: "Osoto-gari", english: "Major Outer Reaping Throw" },
            { japanese: "Seoi-otoshi", english: "Shoulder Drop Throw" },
            { japanese: "Tai-otoshi", english: "Body Drop Throw" },
            { japanese: "Tsuri-komi-goshi", english: "Drawing Hip Throw" },
            { japanese: "Yoko-shiho-gatame", english: "Side four quarters hold" },
            { japanese: "Shido", english: "Official warning in competition" },
            { japanese: "Hansoku-make", english: "Serious penalty resulting in loss of the match" }
          ],
          moralCode: ["Name three items from the judo moral code"],
          contestRules: [
            "Give two examples of actions (not grips) against the contest rules for negative or safety reasons",
            "Explain the meaning of the Japanese words: Shido, Hansoku-make"
          ],
          matProcedures: ["Demonstrate the proper procedures for entering and leaving the mat for a contest"],
          refereeSignals: ["Demonstrate the Referee's signals for: Mate, Osaekomi, Toketa, Adjusting the judogi"]
        }
      }
    },
    toGreen: {
      name: "4th Kyu (Orange) to 3rd Kyu (Green)",
      duration: "Typically 12-18 months depending on training frequency",
      requirements: {
        fundamentalSkills: {
          tachiWaza: [
            "Kata-guruma (Shoulder Wheel)",
            "Sumi-otoshi (Corner Drop)",
            "Uki-otoshi (Floating Drop)",
            "Kibisu-gaeshi (Heel Trip)",
            "Sukui-nage (Scooping Throw)"
          ],
          neWaza: [
            "Kesa-gatame (Scarf Hold)",
            "Yoko-tate-shiho-gatame (Side Lengthwise Four Quarters Hold)",
            "Kata-gatame (Shoulder Hold)"
          ]
        },
        performanceSkills: {
          combinationTechniques: [
            "O-goshi into Kesa-gatame",
            "Tai-otoshi into Kesa-gatame",
            "Kosoto-gari into Yoko-shiho-gatame"
          ],
          counterTechniques: [
            "Kouchi-gari countered by Hane-goshi",
            "Ouchi-gari countered by Uchi-mata"
          ],
          neWaza: [
            "Escape from Kesa-gatame using 'shifting weight' technique",
            "Escape from Kata-gatame using 'bridge and roll' action",
            "Sweep from Kesa-gatame to Uke's back position"
          ],
          randori: [
            "Randori demonstration with a cooperative partner (approximately 4 minutes)",
            "Demonstrate a variety of techniques from both standing and ground positions",
            "Show awareness of scoring opportunities (ippon, waza-ari, yuko)"
          ]
        },
        personalChoice: [
          "Demonstrate two additional techniques: one tachi-waza and one ne-waza",
          "Techniques must be shown in appropriate contest situations with proper timing"
        ],
        supplementaryKnowledge: {
          terminology: [
            { japanese: "Kata-guruma", english: "Shoulder Wheel" },
            { japanese: "Sumi-otoshi", english: "Corner Drop" },
            { japanese: "Uki-otoshi", english: "Floating Drop" },
            { japanese: "Kesa-gatame", english: "Scarf Hold" },
            { japanese: "Kata-gatame", english: "Shoulder Hold" },
            { japanese: "Yoko-tate-shiho-gatame", english: "Side Lengthwise Four Quarters Hold" },
            { japanese: "Ippon", english: "Full point" },
            { japanese: "Waza-ari", english: "Half point" },
            { japanese: "Yuko", english: "Minor point" },
            { japanese: "Koka", english: "Minor point (obsolete)" },
            { japanese: "Osaekomi", english: "Holding technique" },
            { japanese: "Newaza", english: "Grappling techniques" }
          ],
          moralCode: [
            "Explain the meaning of: Jita Kyoei (Mutual Welfare and Benefit)",
            "Explain the meaning of: Seiryoku Zenyo (Maximum Efficiency)"
          ],
          contestRules: [
            "Explain the scoring system: Ippon, Waza-ari, Yuko",
            "Describe the conditions for Shido penalties",
            "Explain the meaning of Hansoku-make and its consequences"
          ],
          matProcedures: [
            "Demonstrate proper etiquette when entering and leaving the tatami",
            "Show correct behavior during randori and Shiai"
          ],
          refereeSignals: [
            "Demonstrate the Referee's signals for: Ippon, Waza-ari, Yuko, Shido",
            "Demonstrate the Referee's signals for: Mate, Hajime, Sono-mama, Toketa"
          ]
        }
      }
    },
    toBlue: {
      name: "3rd Kyu (Green) to 2nd Kyu (Blue)",
      duration: "Typically 18-24 months depending on training frequency",
      requirements: {
        fundamentalSkills: {
          tachiWaza: [
            "Uchi-mata (Inner Thigh Throw)",
            "Harai-goshi (Sweeping Hip Throw)",
            "Hane-goshi (Spring Hip Throw)",
            "Ushiro-goshi (Rear Hip Throw)",
            "O-soto-guruma (Major Outer Wheel)",
            "Ashi-guruma (Leg Wheel)"
          ],
          neWaza: [
            "Okami-gatame (Straddle Hold)",
            "Yoshi-gatame (Riding Hold)",
            "Held down for 25 seconds in any hold"
          ]
        },
        performanceSkills: {
          combinationTechniques: [
            "Uchi-mata into O-goshi",
            "O-goshi into Kesa-gatame",
            "Kosoto-gari into Uchi-mata"
          ],
          counterTechniques: [
            "Uchi-mata countered by Sode-tsurikomi-goshi",
            "Ouchi-gari countered by Uki-goshi"
          ],
          neWaza: [
            "Transition from Kesa-gatame to Kata-gatame",
            "Sweep from guard position to Uke's back",
            "Apply Shime-waza (strangulation) from back control"
          ],
          randori: [
            "Randori demonstration with a cooperative partner (approximately 5 minutes)",
            "Demonstrate at least one scoring technique during randori",
            "Show control and tactical awareness during randori"
          ]
        },
        personalChoice: [
          "Demonstrate three techniques: two tachi-waza and one ne-waza",
          "Show techniques in realistic contest situations"
        ],
        supplementaryKnowledge: {
          terminology: [
            { japanese: "Uchi-mata", english: "Inner Thigh Throw" },
            { japanese: "Harai-goshi", english: "Sweeping Hip Throw" },
            { japanese: "Hane-goshi", english: "Spring Hip Throw" },
            { japanese: "Ushiro-goshi", english: "Rear Hip Throw" },
            { japanese: "O-soto-guruma", english: "Major Outer Wheel" },
            { japanese: "Ashi-guruma", english: "Leg Wheel" },
            { japanese: "Okami-gatame", english: "Straddle Hold" },
            { japanese: "Yoshi-gatame", english: "Riding Hold" },
            { japanese: "Shime-waza", english: "Strangulation technique" },
            { japanese: "Kansetsu-waza", english: "Joint locking technique" },
            { japanese: "Tori", english: "The person executing the technique" },
            { japanese: "Uke", english: "The person receiving the technique" }
          ],
          moralCode: [
            "Describe the principles of Judo as a way of life",
            "Explain the importance of respect in Judo practice"
          ],
          contestRules: [
            "Explain the concept of Golden Score (Overtime)",
            "Describe the prohibited acts in competition",
            "Explain the role of the referee and judges"
          ],
          matProcedures: [
            "Demonstrate proper etiquette between Tori and Uke",
            "Show correct behavior during referee's instructions"
          ],
          refereeSignals: [
            "Demonstrate the Referee's signals for: Golden Score, Hiki-wake (Draw)",
            "Demonstrate the Referee's signals for: Hantei (Judgment), Son-ma (Hold on)"
          ]
        }
      }
    },
    toBrown: {
      name: "2nd Kyu (Blue) to 1st Kyu (Brown)",
      duration: "Typically 24-36 months depending on training frequency",
      requirements: {
        fundamentalSkills: {
          tachiWaza: [
            "Tani-otoshi (Valley Drop)",
            "Yoko-gake (Side Hook)",
            "Yoko-guruma (Side Wheel)",
            "Tomoe-nage (Circle Throw)",
            "Ura-nage (Back Throw)",
            "Sumi-gaeshi (Corner Counter)"
          ],
          neWaza: [
            "Apply Kansetsu-waza (arm lock) safely and effectively",
            "Demonstrate multiple transitions between different holds",
            "Hold Uke for 30 seconds in any newaza technique"
          ]
        },
        performanceSkills: {
          combinationTechniques: [
            "Tai-otoshi into Uchi-mata",
            "O-goshi into Ura-nage",
            "Ouchi-gari into Tani-otoshi"
          ],
          counterTechniques: [
            "Tai-otoshi countered by Harai-goshi",
            "O-goshi countered by Sukui-nage"
          ],
          neWaza: [
            "Perform a complete ne-waza sequence from both sides",
            "Demonstrate transition from pin to strangulation",
            "Apply joint lock from various positions"
          ],
          randori: [
            "Randori demonstration with a cooperative partner (approximately 6 minutes)",
            "Demonstrate multiple scoring opportunities during randori",
            "Show advanced tactical awareness and strategy"
          ]
        },
        personalChoice: [
          "Demonstrate four techniques: three tachi-waza and one ne-waza",
          "Show mastery of techniques in various randori situations"
        ],
        supplementaryKnowledge: {
          terminology: [
            { japanese: "Tani-otoshi", english: "Valley Drop" },
            { japanese: "Yoko-gake", english: "Side Hook" },
            { japanese: "Yoko-guruma", english: "Side Wheel" },
            { japanese: "Tomoe-nage", english: "Circle Throw" },
            { japanese: "Ura-nage", english: "Back Throw" },
            { japanese: "Sumi-gaeshi", english: "Corner Counter" },
            { japanese: "Kansetsu-waza", english: "Joint locking technique" },
            { japanese: "Juji-jime", english: "Cross strangulation" },
            { japanese: "Gyaku-jime", english: "Reversed strangulation" },
            { japanese: "Ude-gatame", english: "Arm entrapment" },
            { japanese: "Kata-juji-gatame", english: "Shoulder cross hold" },
            { japanese: "Kesa-gatame", english: "Head and arm hold" }
          ],
          moralCode: [
            "Explain the philosophical principles underlying Judo",
            "Describe how Judo principles apply to daily life"
          ],
          contestRules: [
            "Explain the concept of Ne-waza no Kakari (Ground technique attack)",
            "Describe the rules for dangerous techniques",
            "Explain the process for appealing a referee's decision"
          ],
          matProcedures: [
            "Demonstrate proper behavior during medal ceremonies",
            "Show understanding of tournament procedures"
          ],
          refereeSignals: [
            "Demonstrate all referee signals for various competition scenarios",
            "Explain the meaning of time-related signals"
          ]
        }
      }
    }
  };

  const trainingPrograms = {
    beginner: {
      name: "Beginner Home Training (White to Orange Belt)",
      weeks: [
        {
          day: "Monday",
          exercises: [
            "Warm-up: 10 min jogging or jumping jacks",
            "Ukemi practice: 20 forward rolls, 20 backward rolls (10 each side)",
            "Uchi-komi (entry practice) with band: 30 reps O Goshi, 30 reps Seoi Nage",
            "Core work: 3 sets of 20 sit-ups, 20 bicycle crunches",
            "Stretching: 15 minutes flexibility work"
          ]
        },
        {
          day: "Tuesday",
          exercises: [
            "Rest or light cardio: 30 min walk or bike",
            "Visualization: 20 min watching technique videos and mentally practicing",
            "Stretching: 20 minutes yoga or flexibility"
          ]
        },
        {
          day: "Wednesday",
          exercises: [
            "Warm-up: 10 min jump rope",
            "Strength: 3 sets of 10 push-ups, 3 sets of 15 squats, 3 sets of 10 pull-ups (assisted if needed)",
            "Uchi-komi with band: 20 reps each - Tai Otoshi, Osoto Gari, Uchi Mata",
            "Shadow randori: 15 minutes practicing movement and entries",
            "Cool down: 10 min stretching"
          ]
        },
        {
          day: "Thursday",
          exercises: [
            "Dojo Training Day - Focus on live practice",
            "Evening: Light stretching and recovery"
          ]
        },
        {
          day: "Friday",
          exercises: [
            "Warm-up: 10 min cardio",
            "Breakfall practice: 15 each side, forward and backward",
            "Grip strength training: Gi pull-ups or towel hangs - 3 sets",
            "Core circuit: 3 rounds of 30 sec plank, 15 leg raises, 20 Russian twists",
            "Stretching: 15 minutes"
          ]
        },
        {
          day: "Saturday",
          exercises: [
            "Dojo Training Day - Randori focus",
            "Post-training: Ice bath or contrast shower for recovery"
          ]
        },
        {
          day: "Sunday",
          exercises: [
            "Active recovery: Light swimming, walking, or yoga",
            "Study: Watch competition footage, read judo materials",
            "Meal prep for the week"
          ]
        }
      ],
      equipment: [
        "Resistance band or bungee cord for uchi-komi",
        "Pull-up bar or sturdy bar",
        "Exercise mat",
        "Jump rope",
        "Timer/stopwatch"
      ],
      tips: [
        "Always warm up properly before training",
        "Focus on perfect technique, not speed initially",
        "Practice breakfalls on appropriate surfaces only",
        "Stay hydrated throughout training",
        "Get 8+ hours of sleep for recovery",
        "Maintain a balanced diet with adequate protein"
      ]
    },
    intermediate: {
      name: "Intermediate Home Training (Green to Brown Belt)",
      weeks: [
        {
          day: "Monday",
          exercises: [
            "Warm-up: 15 min running with interval sprints",
            "Uchi-komi intensive: 50 reps each of your 3 tokui-waza with band",
            "Strength circuit: 4 sets - 15 push-ups, 20 squats, 12 pull-ups, 30 sec plank",
            "Shadow randori: 20 minutes with intensity",
            "Core finisher: 4 sets of 25 sit-ups, 20 leg raises, 30 Russian twists",
            "Stretching: 20 minutes"
          ]
        },
        {
          day: "Tuesday",
          exercises: [
            "Cardio: 45 min run or 30 min HIIT training",
            "Grip strength: Gi pull-ups 4 sets to failure",
            "Towel hangs: 3 sets of max time",
            "Visualization and video study: 30 minutes",
            "Yoga or mobility work: 30 minutes"
          ]
        },
        {
          day: "Wednesday",
          exercises: [
            "Warm-up: 10 min jump rope",
            "Explosive training: Box jumps 4x10, Burpees 4x15",
            "Uchi-komi with resistance: 40 reps each of 5 different throws",
            "Ne-waza drilling solo: 20 minutes transitions and escapes",
            "Strength: Deadlifts or weighted squats 4 sets of 8",
            "Cool down: 15 min stretching"
          ]
        },
        {
          day: "Thursday",
          exercises: [
            "Dojo Training Day - Technical drilling",
            "Evening: Recovery work, foam rolling, stretching"
          ]
        },
        {
          day: "Friday",
          exercises: [
            "Warm-up: 15 min cardio",
            "Power training: Medicine ball throws, resistance band work",
            "Competition simulation: 5 rounds of 4 min shadow randori",
            "Core circuit: 5 rounds maximum effort",
            "Grip endurance: Farmer's carries, plate pinches",
            "Stretching: 20 minutes"
          ]
        },
        {
          day: "Saturday",
          exercises: [
            "Dojo Training Day - Randori intensive",
            "Post-training: Proper cool down and recovery protocol"
          ]
        },
        {
          day: "Sunday",
          exercises: [
            "Active recovery: Swimming, cycling, or hiking",
            "Competition footage analysis: 1 hour",
            "Meal prep and nutrition planning",
            "Mental training: Visualization and meditation"
          ]
        }
      ],
      equipment: [
        "Heavy resistance bands",
        "Pull-up bar with gi attached",
        "Exercise mat",
        "Jump rope",
        "Medicine ball",
        "Weight plates or dumbbells",
        "Foam roller",
        "Timer/stopwatch"
      ],
      tips: [
        "Train with purpose - every session should have specific goals",
        "Track your progress in a training journal",
        "Increase intensity gradually to avoid injury",
        "Prioritize recovery - it's when you actually improve",
        "Work with partners when possible for realistic drilling",
        "Study elite competitors in your weight class",
        "Focus on your tokui-waza until they're unstoppable"
      ]
    }
  };

  const TechniqueCard = ({ technique, type }) => {
    const isExpanded = expandedTechnique === technique.name;
    const isBookmarked = customTechniques.some(t => t.name === technique.name);

    const toggleBookmark = (e) => {
      e.stopPropagation(); // Prevent the toggle from expanding the card
      if (isBookmarked) {
        // Remove from custom techniques
        setCustomTechniques(prev => prev.filter(t => t.name !== technique.name));
      } else {
        // Add to custom techniques
        setCustomTechniques(prev => [...prev, technique]);
      }
    };

    return (
      <div className="border border-gray-700 rounded-lg mb-4 bg-gray-800 relative">
        <button
          onClick={() => setExpandedTechnique(isExpanded ? null : technique.name)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-750 transition-colors"
        >
          <div className="text-left">
            <h3 className="font-bold text-white text-lg">{technique.name}</h3>
            <p className="text-sm text-gray-400">{technique.category}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleBookmark}
              className="p-1 rounded-full hover:bg-gray-600 transition-colors"
              aria-label={isBookmarked ? "Remove from custom list" : "Add to custom list"}
            >
              {isBookmarked ? (
                <Check size={20} className="text-yellow-400" />
              ) : (
                <Bookmark size={20} className="text-gray-400 hover:text-yellow-400" />
              )}
            </button>
            {isExpanded ? <ChevronDown className="text-blue-400" /> : <ChevronRight className="text-blue-400" />}
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-gray-700 space-y-4">
            <p className="text-gray-300">{technique.description}</p>

            <div>
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <BookOpen size={16} className="mr-2 text-blue-400" />
                Step-by-Step Execution
              </h4>
              <ol className="space-y-2">
                {technique.execution.map((step, idx) => (
                  <li key={idx} className="text-gray-300 ml-4">
                    <span className="font-semibold text-blue-400">{idx + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Key Points to Remember</h4>
              <div className="flex flex-wrap gap-2">
                {technique.keyPoints.map((point, idx) => (
                  <span key={idx} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {technique.warning && (
              <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded p-3">
                <p className="text-red-30 text-sm font-semibold">⚠️ Safety Warning: {technique.warning}</p>
              </div>
            )}

            {technique.embedUrl && (
              <div>
                <h4 className="font-semibold text-white mb-2 flex items-center">
                  <Play size={16} className="mr-2 text-red-500" />
                  Video Demonstration
                </h4>
                <VideoPlayer embedUrl={technique.embedUrl} title={technique.name} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const BeltProgressionCard = ({ beltData, beltKey }) => {
    const isExpanded = expandedBelt === beltKey;
    const [expandedTechniqueInBelt, setExpandedTechniqueInBelt] = useState(null);

    // Function to render technique with video link if available
    const renderTechniqueWithVideo = (techniqueName, index) => {
      const videoInfo = findTechniqueVideo(techniqueName);
      const isTechniqueExpanded = expandedTechniqueInBelt === `${beltKey}-${index}`;

      return (
        <div key={`technique-${beltKey}-${index}`} className="py-1 border border-gray-700 rounded mt-2 bg-gray-750">
          <button
            onClick={() => setExpandedTechniqueInBelt(isTechniqueExpanded ? null : `${beltKey}-${index}`)}
            className="w-full text-left flex justify-between items-center p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-gray-300 flex-1">{videoInfo.name}</span>
            {videoInfo.hasVideo ? (
              <div className="ml-4 flex items-center">
                <Play size={16} className="text-red-500 mr-1" />
                <span className="text-green-40 text-sm">Video</span>
              </div>
            ) : (
              <div className="ml-4 flex items-center text-yellow-400 text-sm" title="Video not available yet">
                <span className="text-yellow-500 mr-1">⚠️</span>
                <span>No Video</span>
              </div>
            )}
            {isTechniqueExpanded ? <ChevronDown className="text-blue-400 ml-2" /> : <ChevronRight className="text-blue-400 ml-2" />}
          </button>

          {isTechniqueExpanded && videoInfo.hasVideo && (
            <div className="p-3 mt-2 border-t border-gray-60">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <Play size={16} className="mr-2 text-red-500" />
                Video Demonstration
              </h4>
              <VideoPlayer embedUrl={videoInfo.embedUrl} title={videoInfo.name} />
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="border border-gray-700 rounded-lg mb-4 bg-gray-80">
        <button
          onClick={() => setExpandedBelt(isExpanded ? null : beltKey)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-750 transition-colors"
        >
          <div className="text-left">
            <h3 className="font-bold text-white text-lg">{beltData.name}</h3>
            <p className="text-sm text-gray-400">{beltData.duration}</p>
          </div>
          {isExpanded ? <ChevronDown className="text-blue-400" /> : <ChevronRight className="text-blue-400" />}
        </button>

        {isExpanded && (
          <div className="p-4 border-t border-gray-700 space-y-6">
            {/* Fundamental Skills Section */}
            {beltData.requirements.fundamentalSkills && (
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-400 text-lg border-b border-yellow-400 pb-1">Fundamental Skills</h4>

                {beltData.requirements.fundamentalSkills.ukemi && (
                  <div>
                    <h5 className="font-semibold text-yellow-300 mb-2">Ukemi (Breakfalls)</h5>
                    <ul className="space-y-1">
                      {beltData.requirements.fundamentalSkills.ukemi.map((item, idx) => (
                        <li key={idx} className="text-gray-300 ml-4 flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.fundamentalSkills.tachiWaza && (
                  <div>
                    <h5 className="font-semibold text-yellow-300 mb-2">Tachi-waza (Standing Techniques)</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.fundamentalSkills.tachiWaza.map((item, idx) => (
                        <div key={`tachiwaza-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.fundamentalSkills.osaekomiWaza && (
                  <div>
                    <h5 className="font-semibold text-yellow-300 mb-2">Osaekomi-waza (Holding Techniques)</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.fundamentalSkills.osaekomiWaza.map((item, idx) => (
                        <div key={`osaekomi-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Performance Skills Section */}
            {beltData.requirements.performanceSkills && (
              <div className="space-y-4">
                <h4 className="font-semibold text-green-40 text-lg border-b border-green-400 pb-1">Performance Skills</h4>

                {beltData.requirements.performanceSkills.transitionTechniques && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Transition Techniques</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.performanceSkills.transitionTechniques.map((item, idx) => (
                        <div key={`transition-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.performanceSkills.neWaza && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Ne-waza (Ground Techniques)</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.performanceSkills.neWaza.map((item, idx) => (
                        <div key={`newaza-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.performanceSkills.kumikata && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Kumi-kata (Gripping Techniques)</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.performanceSkills.kumikata.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.performanceSkills.nagekomiRandori && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Nage-komi / Randori</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.performanceSkills.nagekomiRandori.map((item, idx) => (
                        <li key={`nagekomi-${beltKey}-${idx}`} className="text-gray-300 flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {renderTechniqueWithVideo(item, idx)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.performanceSkills.combinationTechniques && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Combination Techniques</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.performanceSkills.combinationTechniques.map((item, idx) => (
                        <div key={`combination-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.performanceSkills.counterTechniques && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Counter Techniques</h5>
                    <div className="space-y-2 ml-4">
                      {beltData.requirements.performanceSkills.counterTechniques.map((item, idx) => (
                        <div key={`counter-${beltKey}-${idx}`}>
                          {renderTechniqueWithVideo(item, idx)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.performanceSkills.randori && (
                  <div>
                    <h5 className="font-semibold text-green-300 mb-2">Randori</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.performanceSkills.randori.map((item, idx) => (
                        <li key={`randori-${beltKey}-${idx}`} className="text-gray-300 flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {renderTechniqueWithVideo(item, idx)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Personal Choice Section */}
                {beltData.requirements.personalChoice && (
                  <div>
                    <h4 className="font-semibold text-blue-400 text-lg border-b border-blue-400 pb-1">Personal Choice</h4>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.personalChoice.map((item, idx) => (
                        <li key={`personalchoice-${beltKey}-${idx}`} className="text-gray-300 flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

            {/* Supplementary Knowledge Section */}
            {beltData.requirements.supplementaryKnowledge && (
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400 text-lg border-b border-purple-400 pb-1">Supplementary Judo Knowledge</h4>

                {beltData.requirements.supplementaryKnowledge.terminology && (
                  <div>
                    <h5 className="font-semibold text-purple-30 mb-2">Japanese Terminology</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {beltData.requirements.supplementaryKnowledge.terminology.map((term, idx) => (
                        <div key={`terminology-${beltKey}-${idx}`} className="bg-gray-700 p-2 rounded text-sm">
                          <span className="font-semibold text-purple-20">{term.japanese}</span> - {term.english}
                          {term.description && (
                            <div className="text-xs text-gray-400 mt-1">{term.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {beltData.requirements.supplementaryKnowledge.contestRules && (
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">Contest Rules</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.supplementaryKnowledge.contestRules.map((item, idx) => (
                        <li key={`contestRules-${beltKey}-${idx}`} className="text-gray-300 flex items-start">
                          <span className="text-purple-40 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.supplementaryKnowledge.moralCode && (
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">Judo Moral Code</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.supplementaryKnowledge.moralCode.map((item, idx) => (
                        <li key={`moralCode-${beltKey}-${idx}`} className="text-gray-300 flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {typeof item === 'string' ? item : `${item.value}: ${item.explanation}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.supplementaryKnowledge.matProcedures && (
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">Mat Procedures</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.supplementaryKnowledge.matProcedures.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="text-purple-40 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {beltData.requirements.supplementaryKnowledge.refereeSignals && (
                  <div>
                    <h5 className="font-semibold text-purple-300 mb-2">Referee Signals</h5>
                    <ul className="space-y-1 ml-4">
                      {beltData.requirements.supplementaryKnowledge.refereeSignals.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'techniques', label: 'Techniques', icon: BookOpen },
    { id: 'myTechniques', label: 'My Techniques', icon: Bookmark },
    { id: 'progression', label: 'Belt Progression', icon: Award },
    { id: 'syllabus', label: 'Official Syllabus', icon: FileText },
    { id: 'indd', label: 'Interactive Documents', icon: ExternalLink },
    { id: 'training', label: 'Daily Training', icon: Dumbbell }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <img src="/logo.png" alt="Judo Hub" className="h-16 md:h-20 w-auto" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-blue-800"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`bg-blue-900 border-b border-blue-800 ${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <Icon size={20} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Techniques Tab */}
        {activeTab === 'techniques' && (
          <div>
            {/* Hero Banner */}
            <div className="mb-8 rounded-2xl overflow-hidden bg-white shadow-xl flex flex-col md:flex-row items-center justify-between px-8 py-6">
              <div>
                <img src="/logo.png" alt="Judo Hub" className="h-24 md:h-32 w-auto" />
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-right">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-1">Techniques Library</h2>
                <p className="text-gray-500 text-sm md:text-base">Video demonstrations · Step-by-step guides · Key points</p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center">
                  <span className="bg-yellow-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">T</span>
                  Throws (Nage-waza)
                </h3>
                {techniques.throws.map((technique) => (
                  <TechniqueCard key={technique.name} technique={technique} type="throw" />
                ))}
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-green-400 flex items-center">
                  <span className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">H</span>
                  Holds (Osaekomi-waza)
                </h3>
                {techniques.holds.map((technique) => (
                  <TechniqueCard key={technique.name} technique={technique} type="hold" />
                ))}
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-red-400 flex items-center">
                  <span className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">S</span>
                  Strangles (Shime-waza)
                </h3>
                <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-4 mb-4">
                  <p className="text-red-300 font-semibold">⚠️ Important Safety Notice</p>
                  <p className="text-red-200 text-sm mt-2">
                    Strangulation techniques must only be practiced under qualified supervision. Always tap immediately when pressure is felt, and release immediately when your partner taps. Never practice these techniques without proper instruction.
                  </p>
                </div>
                {techniques.strangles.map((technique) => (
                  <TechniqueCard key={technique.name} technique={technique} type="strangle" />
                ))}
              </section>
            </div>
          </div>
        )}

        {/* Belt Progression Tab */}
        {activeTab === 'progression' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-400">Belt Progression Path</h2>
              <p className="text-gray-300">Requirements and expectations for each rank advancement</p>
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-300 mb-2">About Belt Rankings</h3>
              <p className="text-gray-300 text-sm">
                Judo uses a kyu/dan system. Students progress through kyu grades (colored belts) from white to brown, then earn dan grades (black belt degrees). Requirements may vary by organization and country. These are general guidelines based on traditional Kodokan standards.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <BeltProgressionCard beltData={beltProgression.toYellow} beltKey="toYellow" />
                <BeltProgressionCard beltData={beltProgression.toOrange} beltKey="toOrange" />
                <BeltProgressionCard beltData={beltProgression.toGreen} beltKey="toGreen" />
                <BeltProgressionCard beltData={beltProgression.toBlue} beltKey="toBlue" />
                <BeltProgressionCard beltData={beltProgression.toBrown} beltKey="toBrown" />
              </div>
              <div>
                <ProgressTracker beltProgression={beltProgression} />
              </div>
            </div>

            <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">General Training Timeline</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong className="text-blue-400">White to Orange:</strong> 3-6 months of consistent training</p>
                <p><strong className="text-green-400">Orange to Green:</strong> 6 additional months</p>
                <p><strong className="text-cyan-400">Green to Blue:</strong> 6-12 additional months</p>
                <p><strong className="text-yellow-400">Blue to Brown:</strong> 1-2 additional years</p>
                <p><strong className="text-purple-400">Brown to Black:</strong> 1-3 additional years minimum</p>
                <p><strong className="text-red-400">Black Belt Ranks:</strong> Minimum 1 year between each Dan rank (1st Dan to 2nd Dan, etc.)</p>
                <p className="mt-4 pt-4 border-t border-gray-700 text-sm">
                  <strong>Total time to Black Belt:</strong> Typically 4-7 years of dedicated training, though this varies greatly based on training frequency, natural aptitude, and organization standards.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-400">Daily Training Programs</h2>
              <p className="text-gray-300">Structured home training plans to supplement your dojo practice</p>
            </div>

            <div className="space-y-8">
              {/* Beginner Program */}
              <section className="bg-gray-800 rounded-lg border border-gray-70 p-6">
                <h3 className="text-2xl font-bold mb-4 text-green-400">{trainingPrograms.beginner.name}</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Weekly Training Schedule</h4>
                  <div className="space-y-4">
                    {trainingPrograms.beginner.weeks.map((day, idx) => (
                      <div key={idx} className="bg-gray-900 rounded p-4">
                        <h5 className="font-bold text-blue-400 mb-2">{day.day}</h5>
                        <ul className="space-y-1">
                          {day.exercises.map((exercise, exIdx) => (
                            <li key={exIdx} className="text-gray-300 text-sm ml-4 flex items-start">
                              <span className="text-blue-40 mr-2">•</span>
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Required Equipment</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainingPrograms.beginner.equipment.map((item, idx) => (
                      <span key={idx} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Training Tips</h4>
                  <ul className="space-y-2">
                    {trainingPrograms.beginner.tips.map((tip, idx) => (
                      <li key={idx} className="text-gray-300 text-sm ml-4 flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Intermediate/Advanced Program */}
              <section className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">{trainingPrograms.intermediate.name}</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Weekly Training Schedule</h4>
                  <div className="space-y-4">
                    {trainingPrograms.intermediate.weeks.map((day, idx) => (
                      <div key={idx} className="bg-gray-900 rounded p-4">
                        <h5 className="font-bold text-yellow-400 mb-2">{day.day}</h5>
                        <ul className="space-y-1">
                          {day.exercises.map((exercise, exIdx) => (
                            <li key={exIdx} className="text-gray-300 text-sm ml-4 flex items-start">
                              <span className="text-yellow-400 mr-2">•</span>
                              {exercise}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Required Equipment</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainingPrograms.intermediate.equipment.map((item, idx) => (
                      <span key={idx} className="bg-yellow-900 text-yellow-200 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Training Tips</h4>
                  <ul className="space-y-2">
                    {trainingPrograms.intermediate.tips.map((tip, idx) => (
                      <li key={idx} className="text-gray-300 text-sm ml-4 flex items-start">
                        <span className="text-yellow-400 mr-2">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* General Training Principles */}
              <section className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg border border-blue-700 p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Universal Training Principles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black bg-opacity-30 rounded p-4">
                    <h4 className="font-bold text-blue-300 mb-2">Physical Conditioning</h4>
                    <p className="text-gray-300 text-sm">Judo requires explosive power, endurance, and flexibility. Focus on compound movements, cardiovascular fitness, and daily stretching.</p>
                  </div>
                  <div className="bg-black bg-opacity-30 rounded p-4">
                    <h4 className="font-bold text-green-300 mb-2">Technical Practice</h4>
                    <p className="text-gray-300 text-sm">Uchi-komi (repetitive entry practice) is essential. Aim for 1000+ reps per week of your tokui-waza (favorite techniques).</p>
                  </div>
                  <div className="bg-black bg-opacity-30 rounded p-4">
                    <h4 className="font-bold text-yellow-300 mb-2">Recovery & Nutrition</h4>
                    <p className="text-gray-30 text-sm">Adequate sleep, proper nutrition, and active recovery are crucial. Train hard, but recover harder.</p>
                  </div>
                  <div className="bg-black bg-opacity-30 rounded p-4">
                    <h4 className="font-bold text-purple-300 mb-2">Mental Training</h4>
                    <p className="text-gray-30 text-sm">Visualization, studying competition footage, and meditation improve performance. The mental game is half the battle.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Syllabus Tab */}
        {activeTab === 'syllabus' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-400">Official BJA Syllabus</h2>
              <p className="text-gray-300">Interactive access to official British Judo Association grading requirements</p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">6th Kyu to 5th Kyu Syllabus</h3>
                <p className="text-gray-300 mb-4">Requirements for advancement from white to yellow belt</p>
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <div className="flex justify-center">
                    <iframe
                      src={`${process.env.PUBLIC_URL}/6th-Kyu-5th-Kyu.pdf`}
                      className="w-full h-96 border-gray-600 rounded"
                      title="6th Kyu to 5th Kyu Syllabus"
                      type="application/pdf"
                    >
                      <p>Your browser doesn't support PDF viewing. <a href={`${process.env.PUBLIC_URL}/6th-Kyu-5th-Kyu.pdf`} className="text-blue-400 hover:underline">Download the PDF</a> instead.</p>
                    </iframe>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-green-400">5th Kyu to 4th Kyu Syllabus</h3>
                <p className="text-gray-30 mb-4">Requirements for advancement from yellow to orange belt</p>
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <div className="flex justify-center">
                    <iframe
                      src={`${process.env.PUBLIC_URL}/5th-Kyu-4th-Kyu.pdf`}
                      className="w-full h-96 border-gray-600 rounded"
                      title="5th Kyu to 4th Kyu Syllabus"
                      type="application/pdf"
                    >
                      <p>Your browser doesn't support PDF viewing. <a href={`${process.env.PUBLIC_URL}/5th-Kyu-4th-Kyu.pdf`} className="text-blue-400 hover:underline">Download the PDF</a> instead.</p>
                    </iframe>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Complete Kyu Syllabus</h3>
                <p className="text-gray-300 mb-4">Full syllabus from 6th Kyu to 4th Kyu</p>
                <div className="bg-gray-800 rounded-lg border-gray-70 p-6">
                  <div className="flex justify-center">
                    <iframe
                      src={`${process.env.PUBLIC_URL}/02-Kyu-Syllabus-6th-Kyu-5th-Kyu.pdf`}
                      className="w-full h-96 border-gray-60 rounded"
                      title="Complete 6th Kyu to 5th Kyu Syllabus"
                      type="application/pdf"
                    >
                      <p>Your browser doesn't support PDF viewing. <a href={`${process.env.PUBLIC_URL}/02-Kyu-Syllabus-6th-Kyu-5th-Kyu.pdf`} className="text-blue-400 hover:underline">Download the PDF</a> instead.</p>
                    </iframe>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Advanced Kyu Syllabus</h3>
                <p className="text-gray-300 mb-4">5th Kyu to 4th Kyu detailed requirements</p>
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <div className="flex justify-center">
                    <iframe
                      src={`${process.env.PUBLIC_URL}/03-Kyu-Syllabus-5th-Kyu-4th-Kyu.pdf`}
                      className="w-full h-96 border border-gray-60 rounded"
                      title="Complete 5th Kyu to 4th Kyu Syllabus"
                      type="application/pdf"
                    >
                      <p>Your browser doesn't support PDF viewing. <a href={`${process.env.PUBLIC_URL}/03-Kyu-Syllabus-5th-Kyu-4th-Kyu.pdf`} className="text-blue-400 hover:underline">Download the PDF</a> instead.</p>
                    </iframe>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* My Techniques Tab */}
        {activeTab === 'myTechniques' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-400 flex items-center">
                <Bookmark size={28} className="mr-3 text-yellow-400" />
                My Techniques
              </h2>
              <p className="text-gray-30">Your personalized collection of techniques organized in groups</p>
            </div>

            {customTechniques.length === 0 ? (
              <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                <Bookmark size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Techniques Added Yet</h3>
                <p className="text-gray-400 mb-4">Browse the Techniques tab and click the bookmark icon to add techniques to your personal list.</p>
                <button
                  onClick={() => setActiveTab('techniques')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Browse Techniques
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Group Creation Form */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Create New Group</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Enter group name"
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        if (newGroupName.trim()) {
                          const newGroup = {
                            id: Date.now(),
                            name: newGroupName.trim(),
                            techniques: [],
                            isCollapsed: false
                          };
                          setTechniqueGroups(prev => [...prev, newGroup]);
                          setNewGroupName('');
                        }
                      }}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                    >
                      <Plus size={16} className="inline mr-1" />
                      Create Group
                    </button>
                  </div>
                </div>

                {/* Ungrouped Techniques */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">Ungrouped Techniques ({customTechniques.length})</h3>
                    <button
                      onClick={() => setCustomTechniques([])}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {customTechniques.map((technique, index) => (
                      <div key={`${technique.name}-${index}`} className="border border-gray-600 rounded p-3 bg-gray-750">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-white">{technique.name}</h4>
                            <p className="text-sm text-gray-400">{technique.category}</p>
                          </div>
                          <button
                            onClick={() => setCustomTechniques(prev => prev.filter(t => t.name !== technique.name))}
                            className="p-1 rounded-full hover:bg-gray-600 transition-colors"
                            aria-label="Remove from list"
                          >
                            <Check size={16} className="text-yellow-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technique Groups */}
                <div className="space-y-4">
                  {techniqueGroups.map((group) => (
                    <div key={group.id} className="border border-gray-700 rounded-lg bg-gray-800">
                      {/* Group Header */}
                      <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        {editingGroupId === group.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={editingGroupName}
                              onChange={(e) => setEditingGroupName(e.target.value)}
                              className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                if (editingGroupName.trim()) {
                                  setTechniqueGroups(prev =>
                                    prev.map(g =>
                                      g.id === group.id
                                        ? {...g, name: editingGroupName.trim()}
                                        : g
                                    )
                                  );
                                }
                                setEditingGroupId(null);
                                setEditingGroupName('');
                              }}
                              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingGroupId(null);
                                setEditingGroupName('');
                              }}
                              className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3 className="font-semibold text-white text-lg">{group.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">({group.techniques.length} techniques)</span>
                              <button
                                onClick={() => {
                                  setEditingGroupId(group.id);
                                  setEditingGroupName(group.name);
                                }}
                                className="p-1 rounded hover:bg-gray-700 transition-colors"
                                aria-label="Edit group name"
                              >
                                <Edit size={16} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => {
                                  setTechniqueGroups(prev =>
                                    prev.map(g =>
                                      g.id === group.id
                                        ? {...g, isCollapsed: !g.isCollapsed}
                                        : g
                                    )
                                  );
                                }}
                                className="p-1 rounded hover:bg-gray-700 transition-colors"
                                aria-label={group.isCollapsed ? "Expand group" : "Collapse group"}
                              >
                                {group.isCollapsed ?
                                  <ChevronRight size={16} className="text-blue-400" /> :
                                  <ChevronDown size={16} className="text-blue-400" />
                                }
                              </button>
                              <button
                                onClick={() => {
                                  // Move all techniques back to ungrouped
                                  setCustomTechniques(prev => [...prev, ...group.techniques]);
                                  // Remove the group
                                  setTechniqueGroups(prev => prev.filter(g => g.id !== group.id));
                                }}
                                className="p-1 rounded hover:bg-gray-700 transition-colors"
                                aria-label="Delete group"
                              >
                                <Trash2 size={16} className="text-red-400" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Group Content */}
                      {!group.isCollapsed && (
                        <div className="p-4 space-y-3">
                          {group.techniques.length === 0 ? (
                            <p className="text-gray-400 text-center py-4">No techniques in this group yet</p>
                          ) : (
                            group.techniques.map((technique, index) => (
                              <div key={`${group.id}-${technique.name}-${index}`} className="border border-gray-600 rounded p-3 bg-gray-750">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium text-white">{technique.name}</h4>
                                    <p className="text-sm text-gray-400">{technique.category}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      // Remove from group
                                      const updatedGroups = techniqueGroups.map(g => {
                                        if (g.id === group.id) {
                                          return {
                                            ...g,
                                            techniques: g.techniques.filter(t => t.name !== technique.name)
                                          };
                                        }
                                        return g;
                                      });
                                      setTechniqueGroups(updatedGroups);

                                      // Add back to ungrouped
                                      setCustomTechniques(prev => [...prev, technique]);
                                    }}
                                    className="p-1 rounded-full hover:bg-gray-600 transition-colors"
                                    aria-label="Remove from group"
                                  >
                                    <Check size={16} className="text-yellow-400" />
                                  </button>
                                </div>

                                {/* Technique Details */}
                                <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                                  <p className="text-gray-300 text-sm">{technique.description}</p>

                                  <div>
                                    <h5 className="font-medium text-white text-sm mb-1">Key Points</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {technique.keyPoints.slice(0, 3).map((point, idx) => (
                                        <span key={idx} className="bg-blue-900 text-blue-200 px-2 py-1 rounded-full text-xs">
                                          {point}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {technique.embedUrl && (
                                    <div className="mt-2">
                                      <h5 className="font-medium text-white text-sm mb-1">Video</h5>
                                      <VideoPlayer embedUrl={technique.embedUrl} title={technique.name} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          )}

                          {/* Add Technique to Group */}
                          <div className="pt-3 mt-3 border-t border-gray-700">
                            <h4 className="font-medium text-white mb-2">Add Technique to Group</h4>
                            <div className="flex flex-wrap gap-2">
                              {customTechniques.map((technique, index) => (
                                <button
                                  key={`add-${group.id}-${index}`}
                                  onClick={() => {
                                    // Add to group
                                    const updatedGroups = techniqueGroups.map(g => {
                                      if (g.id === group.id) {
                                        return {
                                          ...g,
                                          techniques: [...g.techniques, technique]
                                        };
                                      }
                                      return g;
                                    });
                                    setTechniqueGroups(updatedGroups);

                                    // Remove from ungrouped
                                    setCustomTechniques(prev => prev.filter(t => t.name !== technique.name));
                                  }}
                                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
                                >
                                  {technique.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interactive Documents Tab */}
        {activeTab === 'indd' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-blue-40">Interactive Documents</h2>
              <p className="text-gray-300">Full-screen viewers for official Adobe InDesign documents</p>
            </div>

            <div className="space-y-8">
              <InddViewer
                url="https://indd.adobe.com/view/a83f27b4-c22b-42dd-98c1-121764c103d4"
                title="BJA Grading Syllabus (6th Kyu to 5th Kyu)"
              />

              <InddViewer
                url="https://indd.adobe.com/view/a592f72d-e681-4d7b-8cda-682a62eb31df"
                title="BJA Grading Syllabus (5th Kyu to 4th Kyu)"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 border-t-4 border-orange-500 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/logo.png" alt="Judo Hub" className="h-12 w-auto mx-auto mb-3" />
          <p className="text-blue-200 text-sm mb-1">Your Path to Excellence</p>
          <p className="text-blue-300 text-xs">Always train under qualified instruction. Respect your training partners. OSU!</p>
        </div>
      </footer>
    </div>
  );
};

export default JudoTrainingApp;
