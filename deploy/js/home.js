// ── DAILY THEMES (index = day of week, 0=Sun) ──────
const DAILY_THEMES = [
  { name: 'Recovery',      tag: 'recovery',     emoji: '🧘', color: '#27ae60' },
  { name: 'Throws',        tag: 'throws',       emoji: '🥋', color: '#e8c84a' },
  { name: 'Grip Fighting', tag: 'grips',        emoji: '✊', color: '#e67e22' },
  { name: 'Ne-waza',       tag: 'newaza',       emoji: '🤼', color: '#2980b9' },
  { name: 'Conditioning',  tag: 'conditioning', emoji: '💪', color: '#c0392b' },
  { name: 'Combinations',  tag: 'combos',       emoji: '🔗', color: '#8e44ad' },
  { name: 'Belt Prep',     tag: 'beltprep',     emoji: '🏅', color: '#c9952f' },
];

// ── JUDO IQ CARDS ──────────────────────────────────
const IQ_CARDS = [
  { q: 'What is Kuzushi?', a: 'Breaking your opponent\'s balance before the throw. Without it, throws become strength battles and counters happen.' },
  { q: 'What does O-soto-gari mean?', a: 'Major outer reap. O = major, soto = outer, gari = reap. Attack the far leg.' },
  { q: 'What is the difference between Shido and Hansoku-make?', a: 'Shido is a minor penalty (warning). Hansoku-make is disqualification — for serious infractions or accumulating too many Shido.' },
  { q: 'What is Tsurikomi-goshi?', a: 'Lifting pulling hip throw. Tsuri = lift, komi = pull, goshi = hip. Lift the sleeve and pull the lapel as you enter.' },
  { q: 'What is Uke?', a: 'The person receiving the technique. Tori is the person executing it.' },
  { q: 'What is the standard gripping position?', a: 'Right hand on left lapel, left hand on right sleeve (for right-handed judoka). Sleeve grip controls direction, lapel controls distance.' },
  { q: 'What is Randori?', a: 'Free practice — both partners attack and defend. The foundation of judo development.' },
  { q: 'What does Hajime mean?', a: 'Begin — the referee\'s command to start or resume the contest.' },
  { q: 'What is Mate?', a: 'Stop — the referee\'s command to temporarily halt the contest.' },
  { q: 'What is Osaekomi?', a: 'Holding — called when a pin is established. 10+ seconds = Waza-ari, 20+ seconds = Ippon.' },
  { q: 'What is Kumi-kata?', a: 'Gripping technique. How you grip determines how you attack — grip first, then throw.' },
  { q: 'Name a Ko-uchi-gari combination.', a: 'Ko-uchi-gari → Morote-seoi-nage. Drive the minor reap, then enter for the shoulder throw as they step back.' },
  { q: 'What is Toketa?', a: 'The hold is broken — referee calls this when a pin is escaped.' },
  { q: 'What is Seiryoku Zenyo?', a: 'Maximum efficiency with minimum effort — one of Judo\'s founding principles by Jigoro Kano.' },
  { q: 'What is Jita Kyoei?', a: 'Mutual welfare and benefit — the idea that training together improves both partners.' },
  { q: 'What is Waza-ari?', a: 'Half point. Two Waza-ari equal Ippon. Scored when a throw is partially successful or a pin held 10–19 seconds.' },
  { q: 'What does Ko-soto-gari mean?', a: 'Minor outer reap. Ko = minor, soto = outer, gari = reap. Attack the near ankle from the outside.' },
  { q: 'What is the grip order principle?', a: 'Establish sleeve grip first, then lapel. Losing your grip mid-throw loses the throw.' },
  { q: 'What is Tsukuri?', a: 'Fitting in — the entry phase where you position your body to execute the throw.' },
  { q: 'What is Kake?', a: 'Execution — the actual throwing action, after kuzushi and tsukuri.' },
  { q: 'What are the Moral Code values?', a: 'Courtesy, Courage, Honesty, Honour, Modesty, Respect, Self-control, Friendship.' },
  { q: 'What is a counter (gaeshi)?', a: 'Turning your opponent\'s attack into your own scoring technique. Requires reading their commitment and timing.' },
  { q: 'What is Tachi-waza?', a: 'Standing techniques — throws and takedowns performed from a standing position.' },
  { q: 'What is the purpose of shadow uchikomi?', a: 'Building muscle memory for entry movements without a partner. Perfect reps build the reflex.' },
  { q: 'What does Seoi mean?', a: 'Carrying on the back/shoulder. Seoi-nage = shoulder throw, the family of techniques that load uke onto your back.' },
];

// ── TECHNIQUE OF THE DAY ────────────────────────────
const ORANGE_BELT_TECHS = [
  'Tsurikomi-goshi','O-goshi','Seoi-otoshi','Morote-seoi-nage',
  'Ko-uchi-gari','Ko-soto-gake','Ko-soto-gari','O-soto-gari',
  'Tai-otoshi','Ippon-seoi-nage','Ouchi-gari',
];

function getTOTD() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const name = ORANGE_BELT_TECHS[dayOfYear % ORANGE_BELT_TECHS.length];
  return TECHNIQUES.find(t => t.name === name) || TECHNIQUES[0];
}

function getTodayIQ() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return IQ_CARDS[dayOfYear % IQ_CARDS.length];
}

// ── MODULE-LEVEL HELPERS ───────────────────────────
const BLOCK_COLORS = {
  warmup: '#e8c84a', technique: '#2980b9', strength: '#c0392b',
  conditioning: '#8e44ad', iq: '#27ae60', recovery: '#27ae60', custom: '#e8c84a',
};

function fmtTime(secs) {
  if (!secs) return '0s';
  if (secs < 60) return secs + 's';
  const m = Math.floor(secs / 60), r = secs % 60;
  return m + ' min' + (r ? ' ' + r + 's' : '');
}

// ── XP ─────────────────────────────────────────────
function getXP()       { return parseInt(localStorage.getItem('judo_xp') || '0'); }
function addXP(amount) {
  const xp = getXP() + amount;
  localStorage.setItem('judo_xp', String(xp));
  return xp;
}
function calcSessionXP(session) {
  const base  = Math.max(1, Math.round(session.totalDuration / 60));
  const bonus = getStreak() > 1 ? 5 : 0;
  return base + bonus;
}

// ── STREAK ─────────────────────────────────────────
function getSessionLog()        { return JSON.parse(localStorage.getItem('judo_session_log') || '[]'); }
function saveSessionLog(log)    { localStorage.setItem('judo_session_log', JSON.stringify(log)); }

// Normalise entry — handles old string entries and new object entries
function _sessionDate(s) { return typeof s === 'string' ? s : (s.date || '').slice(0, 10); }

function getStreak() {
  const log  = getSessionLog();
  if (!log.length) return 0;
  const today = todayStr(), yesterday = dateStr(-1);
  const hasDay = d => log.some(s => _sessionDate(s) === d);
  if (!hasDay(today) && !hasDay(yesterday)) return 0;
  let streak = 0, d = hasDay(today) ? 0 : -1;
  while (hasDay(dateStr(d))) { streak++; d--; }
  return streak;
}

function getSessionsThisWeek() {
  const log = getSessionLog();
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return log.filter(s => new Date(_sessionDate(s)) >= monday).length;
}

function logSessionComplete() {
  const log   = getSessionLog();
  const today = todayStr();
  if (log.some(s => _sessionDate(s) === today)) return; // already logged today
  const xp = calcSessionXP(currentSession);
  log.push({
    id:         's' + Date.now(),
    date:       today,
    title:      currentSession.title || 'Training Session',
    themeEmoji: currentSession.themeEmoji || '🥋',
    minutes:    currentSession.minutes || Math.round((currentSession.totalDuration || 0) / 60),
    xp,
    notes:      '',
    techniques: (currentSession.blocks || []).flatMap(b => b.items || []).map(i => i.name).filter(Boolean),
  });
  saveSessionLog(log);
}

function todayStr()          { return new Date().toISOString().slice(0, 10); }
function dateStr(offset)     { return new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10); }

// ── SESSION CONTENT ────────────────────────────────
const WARMUP_MOVES = ['Arm circles', 'Hip rotations', 'Light footwork', 'Shadow grips', 'Neck rolls'];

const THEME_CONTENT = {
  throws: {
    focus: 'O-soto-gari',
    cue: 'Pull sleeve before blocking leg',
    mistake: 'Rushing the entry — feet first, then the throw',
    phases: [
      'Slow reps — perfect posture, sleeve pull, hip turn',
      'Movement entries — attack from motion, not standing still',
      'Explosive attacks — fast, clean, fully committed',
    ],
  },
  grips: {
    focus: 'Kumi-kata drilling',
    cue: 'Establish sleeve before lapel',
    mistake: 'Passive grip — fight for your grip from the first second',
    phases: [
      'Standard grip — right lapel, left sleeve — feel the control',
      'Breaking opponent grips — snap and re-grip',
      'Grip fighting in motion — attack when grip is established',
    ],
  },
  newaza: {
    focus: 'Kesa-gatame escape',
    cue: 'Bridge and roll — timing beats strength',
    mistake: 'Pushing straight up — angle the bridge before you roll',
    phases: [
      'Slow escape drill — feel the weight shift and timing',
      'Add resistance — partner holds tighter, find the moment',
      'Transition straight to counterpin',
    ],
  },
  conditioning: {
    focus: 'Judo fitness circuit',
    cue: 'Short hard efforts transfer best to randori',
    mistake: 'Going too fast early — pace the first two intervals',
    phases: [
      'Explosive squats — judo stance width',
      'Shadow uchikomi × 20 — full speed entries',
      'Sprawl and recover — drop fast, hips low',
    ],
  },
  combos: {
    focus: 'Ko-uchi-gari → O-soto-gari',
    cue: 'First attack creates the reaction — second attack scores',
    mistake: 'Pausing between attacks — it must be one fluid motion',
    phases: [
      'Drill each throw individually — feel the mechanics',
      'Link slowly — feel the transition moment',
      'Full speed — trust the combination',
    ],
  },
  beltprep: {
    focus: 'Orange belt requirements',
    cue: 'Show control, not just technique — examiners watch attitude',
    mistake: 'Forgetting transitions — every throw should flow to ne-waza',
    phases: [
      'Required throws run-through — Tsurikomi-goshi, O-goshi, O-soto-gari',
      'Combinations — Ko-uchi-gari into Morote-seoi-nage',
      'Counter practice — Ouchi-gari countered by Tsurikomi-goshi',
    ],
  },
  recovery: {
    focus: 'Mobility and movement',
    cue: 'Active recovery beats lying on the sofa',
    mistake: 'Skipping it — recovery days are where adaptation happens',
    phases: [
      'Hip circles and deep squats — open the hips',
      'Shoulder rotation and posture work',
      'Light shadow movement — stay connected to judo',
    ],
  },
};

const STRENGTH_EXERCISES = [
  { name: 'Judo squats',            note: 'Shoulder-width, judo stance' },
  { name: 'Explosive pushups',      note: 'Fast off the floor' },
  { name: 'Band rows / Towel rows', note: 'Drive with elbow, grip tight' },
  { name: 'Isometric grip hold',    note: 'Hold belt or towel — squeeze hard for 30s' },
];

const CONDITIONING_EXERCISES = [
  { name: 'Sprawls',               note: 'Drop fast, hips low' },
  { name: 'Fast footwork',         note: 'Light, quick, stay on toes' },
  { name: 'Burpee + shadow throw', note: 'Explosive — full commitment' },
  { name: 'Shadow uchikomi',       note: 'Full speed entries, both sides' },
];

// ── SESSION GENERATOR ──────────────────────────────
function generateSession(minutes, location, themeTag) {
  const theme = DAILY_THEMES.find(t => t.tag === themeTag) || DAILY_THEMES[1];
  const scale = minutes / 10;
  const blocks = [];

  // ── BELT PREP: dynamically use the user's actual grading requirements ──
  if (themeTag === 'beltprep') {
    const activeBelt  = (typeof getActiveBeltForGrading === 'function') ? getActiveBeltForGrading() : null;
    const beltId      = activeBelt ? activeBelt.id : 'toOrange';
    const beltLabel   = activeBelt ? activeBelt.title : 'Next Grading';

    // All technique names for this belt — filter out combos, escapes, grip notes
    const NE_WAZA_NAMES = new Set([
      'Kesa-gatame','Kuzure-kesa-gatame','Mune-gatame','Yoko-shiho-gatame',
      'Kami-shiho-gatame','Tate-shiho-gatame','Kata-gatame',
      'Hadaka-jime','Okuri-eri-jime','Kata-ha-jime','Sankaku-jime',
      'Juji-gatame','Ude-garami','Ude-hishigi-ude-gatame','Ude-hishigi-hiza-gatame',
      'Nami-juji-jime','Gyaku-juji-jime','Kata-juji-jime','Sode-guruma-jime',
    ]);
    const allNames  = (typeof BELT_TECHNIQUES !== 'undefined' ? (BELT_TECHNIQUES[beltId] || []) : [])
      .filter(n => !n.includes('→') && !n.includes('Escape') && !n.includes('Turnover')
                && !n.toLowerCase().includes('grip') && !n.toLowerCase().includes('randori')
                && !n.toLowerCase().includes('ukemi'));
    const combos    = (typeof BELT_PREP_COMBOS !== 'undefined' ? (BELT_PREP_COMBOS[beltId] || []) : []);
    const throws    = allNames.filter(n => !NE_WAZA_NAMES.has(n));
    const neWaza    = allNames.filter(n =>  NE_WAZA_NAMES.has(n));

    // Scale how many items to include based on session length
    const maxThrows = minutes <= 5 ? 3 : minutes <= 10 ? 5 : throws.length;
    const maxNe     = minutes <= 5 ? 0 : minutes <= 10 ? 3 : neWaza.length;
    const maxCombos = minutes <= 7 ? 0 : minutes <= 15 ? 2 : combos.length;

    const selectedThrows = throws.slice(0, maxThrows);
    const selectedNe     = neWaza.slice(0, maxNe);
    const selectedCombos = combos.slice(0, maxCombos);

    // Time budget: split available time proportionally
    const warmupSecs = Math.round(Math.max(30, 60 * Math.min(scale, 2)));
    const moveCount  = minutes <= 5 ? 3 : 5;
    const iqSecs     = Math.round(Math.max(30, 60 * Math.min(1, scale)));
    const remaining  = Math.max(60, minutes * 60 - warmupSecs - iqSecs);

    const totalItems = selectedThrows.length + selectedNe.length + selectedCombos.length;
    const perItem    = totalItems > 0 ? Math.round(remaining / totalItems) : 60;

    // WARMUP
    blocks.push({
      type: 'warmup', name: 'Warmup', duration: warmupSecs,
      note: 'No static stretching — wake the nervous system up',
      items: WARMUP_MOVES.slice(0, moveCount).map(m => ({
        name: m, duration: Math.round(warmupSecs / moveCount),
      })),
    });

    // THROWS — each item is a real technique name → watch buttons work
    if (selectedThrows.length) {
      const throwDur = Math.round(remaining * (selectedThrows.length / Math.max(totalItems, 1)));
      blocks.push({
        type: 'technique',
        name: beltLabel + ' — Throws',
        duration: throwDur,
        cue: 'Show control, not just power — examiners watch attitude',
        mistake: 'Rushing entries — kuzushi first, every time',
        items: selectedThrows.map(n => ({ name: n, duration: Math.round(throwDur / selectedThrows.length) })),
      });
    }

    // COMBINATIONS
    if (selectedCombos.length) {
      const comboDur = Math.round(remaining * (selectedCombos.length / Math.max(totalItems, 1)));
      blocks.push({
        type: 'technique',
        name: 'Combinations',
        duration: comboDur,
        cue: 'Commit to the first attack — make uke react',
        mistake: 'Stopping after the first technique',
        items: selectedCombos.map(n => ({ name: n, duration: Math.round(comboDur / selectedCombos.length) })),
      });
    }

    // NE-WAZA / HOLDS
    if (selectedNe.length) {
      const neDur = Math.round(remaining * (selectedNe.length / Math.max(totalItems, 1)));
      blocks.push({
        type: 'technique',
        name: 'Ne-waza / Holds',
        duration: neDur,
        cue: 'Weight on far shoulder — stay on your side, not flat',
        mistake: 'Lying flat — you lose the control point',
        items: selectedNe.map(n => ({ name: n, duration: Math.round(neDur / selectedNe.length) })),
      });
    }

    // JUDO IQ
    const iqCard = getTodayIQ();
    blocks.push({
      type: 'iq', name: 'Judo IQ', duration: iqSecs, card: iqCard,
      items: [{ name: iqCard.q, duration: iqSecs }],
    });

    return {
      title: beltLabel + ' Prep',
      themeTag, themeName: 'Belt Prep', themeEmoji: '🏅', themeColor: '#c9952f',
      minutes, location, blocks,
      totalDuration: blocks.reduce((s, b) => s + b.duration, 0),
    };
  }

  // ── ALL OTHER THEMES ──────────────────────────────────────────────
  const content = THEME_CONTENT[themeTag] || THEME_CONTENT.throws;

  // WARMUP
  const warmupSecs = Math.round(Math.max(30, 60 * Math.min(scale, 2)));
  const moveCount  = minutes <= 5 ? 3 : 5;
  blocks.push({
    type: 'warmup', name: 'Warmup', duration: warmupSecs,
    note: 'No static stretching — wake the nervous system up',
    items: WARMUP_MOVES.slice(0, moveCount).map(m => ({
      name: m, duration: Math.round(warmupSecs / moveCount),
    })),
  });

  // TECHNIQUE
  const techSecs   = Math.round(Math.max(60, 180 * Math.min(scale, 3)));
  const phaseCount = minutes >= 10 ? 3 : 2;
  const phaseSecs  = Math.round(techSecs / phaseCount);
  blocks.push({
    type: 'technique', name: content.focus, duration: techSecs,
    cue: content.cue, mistake: content.mistake,
    items: content.phases.slice(0, phaseCount).map(p => ({ name: p, duration: phaseSecs })),
  });

  // STRENGTH (skip for recovery)
  if (themeTag !== 'recovery' && minutes >= 5) {
    const strSecs = Math.round(Math.max(60, 180 * Math.min(scale, 2.5)));
    const rounds  = minutes >= 20 ? 3 : 2;
    const exSecs  = Math.round(strSecs / (rounds * STRENGTH_EXERCISES.length));
    const items   = [];
    for (let r = 0; r < rounds; r++) {
      STRENGTH_EXERCISES.forEach(ex => items.push({ name: ex.name, note: ex.note, duration: exSecs }));
    }
    blocks.push({ type: 'strength', name: 'Strength Block', duration: strSecs, rounds, items });
  }

  // CONDITIONING
  if (minutes >= 7) {
    const condSecs = Math.round(Math.max(60, 120 * Math.min(scale, 2)));
    const exCount  = Math.min(4, Math.max(2, Math.round(condSecs / 30)));
    const itemSecs = Math.round(condSecs / exCount);
    blocks.push({
      type: 'conditioning', name: 'Conditioning', duration: condSecs,
      note: '20 sec ON / 10 sec OFF',
      items: CONDITIONING_EXERCISES.slice(0, exCount).map(ex => ({
        name: ex.name, note: ex.note, duration: itemSecs,
      })),
    });
  }

  // JUDO IQ
  const iqSecs = Math.round(Math.max(30, 60 * Math.min(1, scale)));
  const iqCard = getTodayIQ();
  blocks.push({
    type: 'iq', name: 'Judo IQ', duration: iqSecs, card: iqCard,
    items: [{ name: iqCard.q, duration: iqSecs }],
  });

  return {
    title: theme.name + ' Session',
    themeTag, themeName: theme.name, themeEmoji: theme.emoji, themeColor: theme.color,
    minutes, location, blocks,
    totalDuration: blocks.reduce((s, b) => s + b.duration, 0),
  };
}

// ── HOME STATE ─────────────────────────────────────
let selectedMinutes  = 10;
let selectedLocation = 'solo';
let currentSession   = null;

// ── TODAY'S BUILDER PLAN DETECTION ─────────────────
function getTodayBuilderPlan() {
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today    = dayNames[new Date().getDay()];
  const key      = weekKey(0); // always current week
  const plan     = weekPlans[key];
  if (!plan || !plan[today] || !plan[today].length) return null;
  return { day: today, items: plan[today] };
}

function loadBuilderPlanAsSession(day, items) {
  const secsEach = 120;
  const total    = items.length * secsEach;
  const dateStr  = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  currentSession = {
    title:         day + ' · ' + dateStr,
    themeTag:      'custom',
    themeName:     'Planned Session',
    themeEmoji:    '📅',
    themeColor:    '#2563eb',
    minutes:       Math.max(1, Math.round(total / 60)),
    location:      selectedLocation,
    blocks: [{
      type:     'custom',
      name:     'Your Plan — ' + day,
      duration: total,
      cue:      'Work through each item with focus',
      items:    items.map(i => ({ name: i.text, duration: secsEach })),
    }],
    totalDuration: total,
    fromBuilder:   true,
    plannedDay:    day,
  };
  renderHome();
}

// ── BELT PROGRESS HELPER ──────────────────────────
function getActiveBeltInfo() {
  if (typeof BELT_DATA === 'undefined') return null;
  // Use the explicitly set personal target belt
  const b = (typeof getCurrentTargetBelt === 'function') ? getCurrentTargetBelt() : null;
  if (!b) return null;
  const total = b.groups.reduce((s, g) => s + g.items.length, 0);
  const done  = b.groups.reduce((s, g) =>
    s + g.items.filter(item => beltProgress[b.id + '_' + item]).length, 0);
  const pct = total ? Math.round(done / total * 100) : 0;
  const nextItems = [];
  for (const g of b.groups) {
    for (const item of g.items) {
      if (!beltProgress[b.id + '_' + item]) {
        nextItems.push(item);
        if (nextItems.length >= 3) break;
      }
    }
    if (nextItems.length >= 3) break;
  }
  return { belt: b, done, total, pct, nextItems };
}

// ── HOME RENDER ────────────────────────────────────
function renderHome() {
  const now    = new Date();
  const dayIdx = now.getDay();
  const theme  = DAILY_THEMES[dayIdx];
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  if (!currentSession) {
    currentSession = generateSession(selectedMinutes, selectedLocation, theme.tag);
  }

  const todayPlan  = getTodayBuilderPlan();
  const streak     = getStreak();
  const week       = getSessionsThisWeek();
  const xp         = getXP();
  const totd       = getTOTD();
  const iq         = getTodayIQ();
  const activeBelt = getActiveBeltInfo();

  document.getElementById('home-body').innerHTML = `

    <!-- HEADER -->
    <div class="home-header">
      <div>
        <div class="home-day">${days[dayIdx]}</div>
        <div class="home-theme-pill" style="background:${theme.color}22;border-color:${theme.color}55;color:${theme.color}">
          ${theme.emoji} ${theme.name} day
        </div>
      </div>
      <div class="home-stats">
        <div class="home-stat">
          <span class="home-stat-val">${streak || '–'}</span>
          <span class="home-stat-lbl">🔥 streak</span>
        </div>
        <div class="home-stat">
          <span class="home-stat-val">${week}</span>
          <span class="home-stat-lbl">this week</span>
        </div>
        <div class="home-stat">
          <span class="home-stat-val">${xp}</span>
          <span class="home-stat-lbl">⚡ XP</span>
        </div>
      </div>
    </div>

    ${todayPlan && !currentSession.fromBuilder ? `
    <div class="home-plan-banner">
      <div class="home-plan-banner-left">
        <span class="home-plan-banner-icon">📅</span>
        <div>
          <div class="home-plan-banner-title">You have a plan for today</div>
          <div class="home-plan-banner-sub">${todayPlan.items.length} item${todayPlan.items.length !== 1 ? 's' : ''} in Training Builder · ${todayPlan.items.map(i => i.text).slice(0,3).join(', ')}${todayPlan.items.length > 3 ? '…' : ''}</div>
        </div>
      </div>
      <button class="home-plan-banner-btn" onclick="loadBuilderPlanAsSession('${todayPlan.day}', ${JSON.stringify(todayPlan.items).replace(/"/g,'&quot;')})">Use this plan</button>
    </div>` : ''}

    <!-- SESSION CARD -->
    <div class="home-card home-hero-card">
      <div class="home-card-label">Today's session</div>
      <div class="home-session-title" style="color:${currentSession.themeColor}">
        ${currentSession.themeEmoji} ${currentSession.title}
      </div>
      <div class="home-session-meta">${fmtTime(currentSession.totalDuration)} · ${currentSession.location}</div>

      <div class="home-session-blocks">
        ${currentSession.blocks.map(b => `
          <div class="home-session-block-row">
            <div class="home-block-dot" style="background:${BLOCK_COLORS[b.type]||'#888'}"></div>
            <span class="home-block-name">${b.name}</span>
            <span class="home-block-time">${fmtTime(b.duration)}</span>
          </div>
        `).join('')}
      </div>

      <button class="home-start-now-btn" onclick="startSession()">▶ Start now</button>
      <div class="home-just-start" onclick="onJustStart()">Not feeling it? → Just 60 seconds</div>

      <div class="home-pickers">
        <div class="home-pill-row" id="time-pills">
          ${[5,10,20,45].map(m => `
            <button class="home-pill${m === selectedMinutes ? ' active' : ''}" onclick="selectTime(${m})">${m} min</button>
          `).join('')}
        </div>
        <div class="home-pill-row" id="location-pills">
          ${[['solo','Solo'],['home','Home'],['dojo','Dojo']].map(([v,l]) => `
            <button class="home-pill${v === selectedLocation ? ' active' : ''}" onclick="selectLocation('${v}')">${l}</button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="home-quick-row">
      <div class="home-quick-card" onclick="startBeforeClassSession()">
        <span class="home-quick-icon">🥊</span>
        <div class="home-quick-body">
          <div class="home-quick-title">Class Prep</div>
          <div class="home-quick-sub">2-min warm-up</div>
        </div>
        <span class="home-quick-arr">→</span>
      </div>
      <div class="home-quick-card" onclick="openCapture()">
        <span class="home-quick-icon">📝</span>
        <div class="home-quick-body">
          <div class="home-quick-title">Log Training</div>
          <div class="home-quick-sub">After class notes</div>
        </div>
        <span class="home-quick-arr">→</span>
      </div>
    </div>

    <!-- BELT PROGRESS -->
    ${activeBelt ? `
    <div class="home-card">
      <div class="home-card-label">Belt progress</div>
      <div class="home-belt-prog-row">
        <div class="belt-dot ${activeBelt.belt.fromColor}"></div>
        <span style="color:var(--text-muted);font-size:15px;margin:0 4px">→</span>
        <div class="belt-dot ${activeBelt.belt.toColor}"></div>
        <span class="home-belt-prog-label">${activeBelt.belt.label}</span>
        <div style="flex:1"></div>
        <span class="home-belt-prog-pct">${activeBelt.pct}%</span>
      </div>
      <div class="progress-bar" style="margin:8px 0 10px"><div class="progress-fill" style="width:${activeBelt.pct}%"></div></div>
      <div class="home-belt-next">
        ${activeBelt.nextItems.map(i => `<div class="home-belt-next-item">◦ ${i}</div>`).join('')}
      </div>
      <div class="home-belt-actions">
        <button class="home-belt-view-btn" onclick="showView('belt')">Checklist &#8594;</button>
        <button class="home-belt-readiness-btn" onclick="openGradingReadiness()">&#127885; Readiness</button>
        <button class="home-belt-pass-btn" onclick="openGradingPassModal('${activeBelt.belt.id}')">&#127881; I Passed!</button>
      </div>
    </div>` : `
    <div class="home-card" style="display:flex;align-items:center;gap:12px">
      <div style="flex:1">
        <div class="home-card-label">Belt progression</div>
        <div style="font-size:13px;color:var(--text-muted)">All grading requirements complete 🏆</div>
      </div>
      <button class="home-belt-view-btn" onclick="showView('belt')">Belt System →</button>
    </div>`}

    <!-- TECHNIQUE OF DAY + JUDO IQ -->
    <div class="home-two-col">
      <div class="home-card">
        <div class="home-card-label">Technique of the day</div>
        <div class="totd-name">${totd.name}</div>
        ${totd.en ? `<div class="totd-en">${totd.en}</div>` : ''}
        ${getVideoId(totd.url) ? `<button class="watch-btn" style="margin-top:10px" onclick="openModal('${esc(totd.name)}')">▶ Watch</button>` : ''}
      </div>
      <div class="home-card home-iq-card">
        <div class="home-card-label">🧠 Judo IQ</div>
        <div class="iq-question">${iq.q}</div>
        <div class="iq-answer" id="iq-answer" style="display:none">${iq.a}</div>
        <button class="iq-reveal-btn" id="iq-btn" onclick="revealIQ()">Reveal answer</button>
      </div>
    </div>

  `;
}

function selectTime(m) {
  selectedMinutes = m;
  const theme = DAILY_THEMES[new Date().getDay()];
  currentSession = generateSession(selectedMinutes, selectedLocation, theme.tag);
  renderHome();
}

function selectLocation(v) {
  selectedLocation = v;
  const theme = DAILY_THEMES[new Date().getDay()];
  currentSession = generateSession(selectedMinutes, selectedLocation, theme.tag);
  renderHome();
}

function revealIQ() {
  document.getElementById('iq-answer').style.display = 'block';
  document.getElementById('iq-btn').style.display = 'none';
}

function onJustStart() {
  const tag = DAILY_THEMES[new Date().getDay()].tag;
  currentSession = {
    title: 'Just 60 Seconds',
    themeTag: tag, themeName: 'Quick', themeEmoji: '⚡', themeColor: '#e8c84a',
    minutes: 1, location: selectedLocation,
    blocks: [{
      type: 'technique',
      name: THEME_CONTENT[tag] ? THEME_CONTENT[tag].focus : 'Shadow Uchikomi',
      duration: 60,
      cue: THEME_CONTENT[tag] ? THEME_CONTENT[tag].cue : 'Just move.',
      mistake: '',
      items: [{ name: 'Just move. Shadow uchikomi. Anything. Go.', duration: 60 }],
    }],
    totalDuration: 60,
  };
  startSession();
}

// ── BEFORE CLASS ───────────────────────────────────
function generateBeforeClassSession() {
  const totd = getTOTD();
  return {
    title: 'Class Prep',
    themeTag: 'beltprep', themeName: 'Class Prep', themeEmoji: '🥊', themeColor: '#27ae60',
    minutes: 2, location: 'solo',
    blocks: [{
      type: 'warmup',
      name: '2-min Class Prep',
      duration: 120,
      cue: 'Wake the body up — don\'t exhaust it',
      items: [
        { name: 'Hip circles — big and slow, both ways',              duration: 20 },
        { name: 'Shoulder rolls and arm swings',                      duration: 20 },
        { name: 'Shadow uchikomi — your best throw × 10',            duration: 30 },
        { name: 'Grip reminder: sleeve first, then lapel',            duration: 15 },
        { name: totd.name + ' — 3 slow entries, feel the mechanics', duration: 25 },
        { name: 'Mindset: attack first, stay relaxed',                duration: 10 },
      ],
    }],
    totalDuration: 120,
  };
}

function startBeforeClassSession() {
  currentSession = generateBeforeClassSession();
  startSession();
}

// ── AFTER CLASS CAPTURE ────────────────────────────
let captureSelectedTechs = [];

function openCapture() {
  captureSelectedTechs = [];
  renderCapture();
  document.getElementById('capture-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCapture() {
  document.getElementById('capture-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleCaptureTech(name) {
  const idx = captureSelectedTechs.indexOf(name);
  if (idx > -1) captureSelectedTechs.splice(idx, 1);
  else captureSelectedTechs.push(name);
  // Re-render just the chips
  document.querySelectorAll('.capture-chip').forEach(b => {
    b.classList.toggle('active', captureSelectedTechs.includes(b.dataset.name));
  });
}

function renderCapture() {
  // Show orange belt techs + a handful of ground techs as quick-tap chips
  const quickTechs = [
    ...ORANGE_BELT_TECHS,
    'Kesa-gatame','Kuzure-kesa-gatame','Yoko-shiho-gatame','Kami-shiho-gatame',
  ];

  document.getElementById('capture-inner').innerHTML = `
    <div class="capture-header">
      <h3>📝 Log your training</h3>
      <button class="capture-close" onclick="closeCapture()">✕</button>
    </div>

    <div class="capture-section-label">Techniques drilled today</div>
    <div class="capture-chips">
      ${quickTechs.map(name => `
        <button class="capture-chip" data-name="${name}" onclick="toggleCaptureTech('${esc(name)}')">${name}</button>
      `).join('')}
    </div>

    <div class="capture-section-label">What clicked? 💡</div>
    <textarea class="capture-ta" id="capture-win" placeholder="Something that worked…"></textarea>

    <div class="capture-section-label">What to fix next time? 🔧</div>
    <textarea class="capture-ta" id="capture-fix" placeholder="Something to drill harder…"></textarea>

    <div class="capture-actions">
      <button class="capture-skip-btn" onclick="closeCapture()">Skip</button>
      <button class="capture-save-btn" onclick="saveCapture()">Save log</button>
    </div>
  `;
}

function saveCapture() {
  const win = (document.getElementById('capture-win').value || '').trim();
  const fix = (document.getElementById('capture-fix').value || '').trim();
  const log = JSON.parse(localStorage.getItem('judo_capture_log') || '[]');
  log.push({ date: todayStr(), techniques: [...captureSelectedTechs], win, fix, ts: Date.now() });
  localStorage.setItem('judo_capture_log', JSON.stringify(log));
  showToast('Training logged! 💪');
  closeCapture();
  renderHome(); // refresh streak/XP
}

// ── SESSION TIMER ──────────────────────────────────
let timerInterval = null;
let timerPaused   = false;
let timerBlockIdx = 0;
let timerItemIdx  = 0;
let timerSecsLeft = 0;
let timerMode     = 'item'; // 'item' | 'rest'
const BLOCK_REST_SECS = 12;

function getTotalItemCount() {
  return (currentSession && currentSession.blocks ? currentSession.blocks : []).reduce((s, b) => s + b.items.length, 0);
}
function getCurrentItemNum() {
  let n = 0;
  for (let b = 0; b < timerBlockIdx; b++) n += currentSession.blocks[b].items.length;
  return n + timerItemIdx + 1;
}

function startSession() {
  if (!currentSession || !currentSession.blocks.length) return;
  timerBlockIdx = 0;
  timerItemIdx  = 0;
  timerPaused   = false;
  timerMode     = 'item';
  timerSecsLeft = currentSession.blocks[0].items[0].duration;
  document.getElementById('session-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  paintTimer();
  timerInterval = setInterval(timerTick, 1000);
}

function timerTick() {
  if (timerPaused) return;
  timerSecsLeft--;
  if (timerSecsLeft <= 0) advanceTimer();
  else paintTimer();
}

function advanceTimer() {
  if (!currentSession || !currentSession.blocks) return;
  if (timerBlockIdx >= currentSession.blocks.length) { finishSession(); return; }
  if (timerMode === 'rest') {
    timerMode = 'item';
    const restBlock = currentSession.blocks[timerBlockIdx];
    if (!restBlock || !restBlock.items || !restBlock.items[timerItemIdx]) { finishSession(); return; }
    timerSecsLeft = restBlock.items[timerItemIdx].duration;
    paintTimer();
    return;
  }
  const session = currentSession;
  const block   = session.blocks[timerBlockIdx];
  if (!block || !block.items) { finishSession(); return; }
  timerItemIdx++;
  if (timerItemIdx >= block.items.length) {
    timerBlockIdx++;
    timerItemIdx = 0;
    if (timerBlockIdx >= session.blocks.length) { finishSession(); return; }
    timerMode     = 'rest';
    timerSecsLeft = BLOCK_REST_SECS;
    paintTimer();
    return;
  }
  timerSecsLeft = session.blocks[timerBlockIdx].items[timerItemIdx].duration;
  paintTimer();
}

function paintTimer() {
  if (!currentSession || !currentSession.blocks) return;
  if (timerMode === 'rest') { paintRestScreen(); return; }
  if (timerBlockIdx >= currentSession.blocks.length) return;
  const session = currentSession;
  const block   = session.blocks[timerBlockIdx];
  if (!block || !block.items || !block.items[timerItemIdx]) return;
  const item    = block.items[timerItemIdx];
  const col     = BLOCK_COLORS[block.type] || '#e8c84a';

  const circumference = 2 * Math.PI * 54;
  const progress      = Math.max(0, timerSecsLeft / item.duration);
  const dashOffset    = circumference * (1 - progress);

  const mins    = Math.floor(timerSecsLeft / 60);
  const secs    = timerSecsLeft % 60;
  const timeStr = mins > 0 ? mins + ':' + String(secs).padStart(2, '0') : secs + 's';

  const currentNum = getCurrentItemNum();
  const totalItems = getTotalItemCount();

  let nextLabel = '';
  if (timerItemIdx + 1 < block.items.length) {
    nextLabel = block.items[timerItemIdx + 1].name;
  } else if (timerBlockIdx + 1 < session.blocks.length) {
    nextLabel = session.blocks[timerBlockIdx + 1].name + ' →';
  }

  let cueLine = '';
  if (block.cue)     cueLine  = `<div class="timer-cue">💡 ${block.cue}</div>`;
  if (block.mistake) cueLine += `<div class="timer-mistake">⚠️ Avoid: ${block.mistake}</div>`;
  if (block.type === 'iq') cueLine = `<div class="timer-cue">🧠 ${block.card.q}<br><br><strong>${block.card.a}</strong></div>`;

  const techMatch = TECHNIQUES.find(t => t.name === item.name);
  const watchBtn  = (techMatch && getVideoId(techMatch.url))
    ? `<button class="timer-watch-btn" onclick="openModal('${esc(item.name)}')">&#9654; Watch ${item.name}</button>`
    : '';

  const dots = session.blocks.map((b, i) =>
    `<div class="timer-dot${i === timerBlockIdx ? ' active' : i < timerBlockIdx ? ' done' : ''}"` +
    ` style="${i === timerBlockIdx ? 'background:' + col : ''}"></div>`
  ).join('');

  document.getElementById('session-overlay-inner').innerHTML = `
    <div class="timer-header">
      <button class="timer-close-btn" onclick="closeSession()">&#10005; End</button>
      <div class="timer-progress-label">${currentNum} / ${totalItems}</div>
      <div class="timer-dots">${dots}</div>
    </div>
    <div class="timer-block-name" style="color:${col}">${block.name}</div>
    <div class="timer-exercise">${item.name}</div>
    ${item.note ? `<div class="timer-item-note">${item.note}</div>` : ''}
    <div class="timer-ring-wrap">
      <svg class="timer-ring" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8"/>
        <circle cx="60" cy="60" r="54" fill="none" stroke="${col}" stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="${circumference.toFixed(2)}"
          stroke-dashoffset="${dashOffset.toFixed(2)}"
          transform="rotate(-90 60 60)"/>
      </svg>
      <div class="timer-countdown-inner" style="color:${col}">${timeStr}</div>
    </div>
    ${cueLine}
    ${watchBtn}
    ${nextLabel ? `<div class="timer-next">Up next: ${nextLabel}</div>` : ''}
    <div class="timer-controls">
      <button class="timer-btn" onclick="timerSkip()">Skip &#8594;</button>
      <button class="timer-btn timer-btn-primary" onclick="timerTogglePause()">
        ${timerPaused ? '&#9654; Resume' : '&#9646;&#9646; Pause'}
      </button>
    </div>
  `;
}

function paintRestScreen() {
  const session   = currentSession;
  const nextBlock = session.blocks[timerBlockIdx];
  const col       = BLOCK_COLORS[nextBlock.type] || '#e8c84a';
  const circumference = 2 * Math.PI * 54;
  const dashOffset    = (circumference * (1 - timerSecsLeft / BLOCK_REST_SECS)).toFixed(2);

  document.getElementById('session-overlay-inner').innerHTML = `
    <div class="timer-header">
      <button class="timer-close-btn" onclick="closeSession()">&#10005; End</button>
    </div>
    <div class="timer-rest-label">REST</div>
    <div class="timer-ring-wrap">
      <svg class="timer-ring" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8"/>
        <circle cx="60" cy="60" r="54" fill="none" stroke="#27ae60" stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="${circumference.toFixed(2)}"
          stroke-dashoffset="${dashOffset}"
          transform="rotate(-90 60 60)"/>
      </svg>
      <div class="timer-countdown-inner" style="color:#27ae60">${timerSecsLeft}s</div>
    </div>
    <div class="timer-rest-next">Next: <strong style="color:${col}">${nextBlock.name}</strong></div>
    <div class="timer-rest-items">
      ${nextBlock.items.slice(0, 4).map(i => `<div class="timer-rest-item">&middot; ${i.name}</div>`).join('')}
    </div>
    <button class="timer-btn timer-btn-primary" style="margin-top:20px" onclick="timerSkipRest()">Ready &#8594;</button>
  `;
}

function timerTogglePause() { timerPaused = !timerPaused; paintTimer(); }
function timerSkip()        { timerSecsLeft = 0; advanceTimer(); }
function timerSkipRest()    { timerSecsLeft = 0; advanceTimer(); }

// ── FINISH SESSION ─────────────────────────────────
function finishSession() {
  clearInterval(timerInterval);
  timerInterval = null;
  if (!currentSession) return;
  logSessionComplete();

  const xpEarned    = calcSessionXP(currentSession);
  const totalXP     = addXP(xpEarned);
  const streakCount = getStreak();
  const itemCount   = getTotalItemCount();

  document.getElementById('session-overlay-inner').innerHTML = `
    <div class="timer-finish">
      <div class="timer-finish-emoji">&#129355;</div>
      <div class="timer-finish-title">Session complete!</div>
      <div class="timer-finish-xp">+${xpEarned} XP</div>
      <div class="timer-finish-total">${totalXP} total XP</div>
      <div class="timer-finish-sub">
        ${currentSession.minutes} min &middot; ${itemCount} exercises &middot; ${(currentSession.themeName||currentSession.title||'training').toLowerCase()}
        ${streakCount > 1 ? '<br>&#128293; ' + streakCount + '-day streak!' : ''}
      </div>
      <button class="home-start-btn" onclick="closeSessionAndCapture()">&#128221; Log training</button>
      <button class="timer-finish-skip" onclick="closeSession()">Skip</button>
    </div>
  `;
}

function closeSession() {
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('session-overlay').classList.remove('open');
  document.body.style.overflow = '';
  renderHome();
}

function closeSessionAndCapture() {
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('session-overlay').classList.remove('open');
  document.body.style.overflow = '';
  renderHome();
  setTimeout(() => openCapture(), 80);
}


document.addEventListener('keydown', e => {
  const modal = document.getElementById('video-modal');
  if (modal && modal.classList.contains('open')) {
    if (e.key === 'Escape')                              { closeVideoModal(); return; }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { flushModalNotes(); modalNav(1);  }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { flushModalNotes(); modalNav(-1); }
  }
  if (e.key === 'Escape') {
    const cap = document.getElementById('capture-overlay');
    if (cap && cap.classList.contains('open')) closeCapture();
  }
});
