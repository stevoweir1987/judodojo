// ── PERSONAL BELT STATE ────────────────────────────
const BELT_ID_ORDER  = ['toYellow','toOrange','toGreen','toBlue','toBrown'];
const BELT_PASS_KEYS = { toYellow:'yellow', toOrange:'orange', toGreen:'green', toBlue:'blue', toBrown:'brown' };

function getCurrentTargetBeltId() {
  return localStorage.getItem('judo_current_belt_id') || null;
}
function setCurrentTargetBeltId(id) {
  if (id) localStorage.setItem('judo_current_belt_id', id);
  else    localStorage.removeItem('judo_current_belt_id');
}
function getNextBeltId(currentId) {
  const idx = BELT_ID_ORDER.indexOf(currentId);
  return (idx >= 0 && idx < BELT_ID_ORDER.length - 1) ? BELT_ID_ORDER[idx + 1] : null;
}
function getCurrentTargetBelt() {
  const id = getCurrentTargetBeltId();
  if (id) {
    const b = BELT_DATA.find(b => b.id === id);
    if (b) return b;
  }
  // Fallback: first incomplete belt
  for (const b of BELT_DATA) {
    const total = b.groups.reduce((s,g) => s + g.items.length, 0);
    const done  = b.groups.reduce((s,g) => s + g.items.filter(i => !!beltProgress[b.id+'_'+i]).length, 0);
    if (done < total) return b;
  }
  return BELT_DATA[0];
}

// ── GRADING PASS MODAL ──────────────────────────────
function openGradingPassModal(beltId) {
  const b = BELT_DATA.find(b => b.id === beltId);
  if (!b) return;
  const today = new Date().toISOString().slice(0,10);
  let el = document.getElementById('grading-pass-modal');
  if (!el) {
    el = document.createElement('div');
    el.id = 'grading-pass-modal';
    document.body.appendChild(el);
  }
  el.className = 'gp-overlay open';
  el.innerHTML = `
    <div class="gp-modal">
      <div class="gp-hero">&#127885;</div>
      <div class="gp-title">Record Grading Pass</div>
      <div class="gp-sub">Congratulations — lock it into your journey!</div>
      <div class="gp-belt-row">
        <div class="belt-dot ${b.fromColor}"></div>
        <span class="gp-arrow">&#8594;</span>
        <div class="belt-dot ${b.toColor}"></div>
        <span class="gp-belt-label">${b.label}</span>
      </div>
      <div class="gp-field">
        <label class="gp-label">Date passed</label>
        <input type="date" id="gp-date" class="gp-input" value="${today}">
      </div>
      <div class="gp-field">
        <label class="gp-label">Notes (optional)</label>
        <input type="text" id="gp-notes" class="gp-input" placeholder="e.g. Club grading, first attempt…">
      </div>
      <div class="gp-actions">
        <button class="gp-cancel" onclick="closeGradingPassModal()">Cancel</button>
        <button class="gp-confirm" onclick="confirmGradingPass('${beltId}')">&#10003; Confirm Pass</button>
      </div>
    </div>`;
  document.body.style.overflow = 'hidden';
}

function closeGradingPassModal() {
  const el = document.getElementById('grading-pass-modal');
  if (el) el.className = 'gp-overlay';
  document.body.style.overflow = '';
}

function confirmGradingPass(beltId) {
  const date  = document.getElementById('gp-date').value  || new Date().toISOString().slice(0,10);
  const notes = (document.getElementById('gp-notes').value || '').trim();
  const b     = BELT_DATA.find(b => b.id === beltId);
  if (!b) return;

  // 1. Save to belt timeline (keyed by belt colour, e.g. 'orange')
  const tlKey = BELT_PASS_KEYS[beltId] || beltId;
  const tl    = JSON.parse(localStorage.getItem('judo_belt_timeline') || '[]');
  const entry = tl.find(t => t.key === tlKey);
  if (entry) { entry.date = date; if (notes) entry.notes = notes; }
  else tl.push({ key: tlKey, date, notes });
  localStorage.setItem('judo_belt_timeline', JSON.stringify(tl));

  // 2. Advance current target belt to next
  const nextId = getNextBeltId(beltId);
  setCurrentTargetBeltId(nextId || beltId);

  closeGradingPassModal();

  const nextB = nextId ? BELT_DATA.find(b => b.id === nextId) : null;
  const msg   = nextB
    ? '&#127881; ' + b.to + ' Belt recorded! Now targeting ' + nextB.to
    : '&#127881; ' + b.to + ' Belt recorded!';
  showToast(msg);

  // 3. Refresh open views
  if (typeof renderBelt     === 'function') renderBelt();
  if (typeof renderHome     === 'function') renderHome();
  if (typeof renderProgress === 'function') renderProgress();
}

// ── BELT → TECHNIQUE MAPPING ───────────────────────
// Names must match entries in TECHNIQUES array
const BELT_TECHNIQUES = {
  toYellow: [
    // Ukemi
    'Mae-ukemi','Ushiro-ukemi','Yoko-ukemi','Mae-mawari-ukemi',
    // Tachi-waza
    'Tai-otoshi','Ippon-seoi-nage','Ouchi-gari',
    // Osaekomi-waza
    'Yoko-shiho-gatame','Tate-shiho-gatame','Kami-shiho-gatame','Kesa-gatame','Mune-gatame',
    // Combinations
    'Tai-otoshi → Yoko-shiho-gatame','Ippon-seoi-nage → Kami-shiho-gatame','Ouchi-gari → Tate-shiho-gatame',
    // Ne-waza escapes & turnovers
    'Escape from Kami-shiho-gatame (action & reaction)',
    'Escape from Tate-shiho-gatame (clamp & roll)',
    'Escape from Yoko-shiho-gatame (trap, bridge & roll)',
    'Turnover into Kesa-gatame (uke all fours)',
    'Turnover into Yoko-shiho-gatame (uke face-down)',
    // Kumi-kata & randori
    'Standard grips — right and left','Right vs left, double lapel, high collar grips',
    'Nage-komi in light randori',
  ],
  toOrange: [
    // Tachi-waza
    'Tsurikomi-goshi','O-goshi','Seoi-otoshi','Morote-seoi-nage',
    'Ko-uchi-gari','Ko-soto-gake','Ko-soto-gari','O-soto-gari',
    // Osaekomi-waza
    'Kesa-gatame','Kuzure-kesa-gatame','Yoko-shiho-gatame','Kami-shiho-gatame','Tate-shiho-gatame',
  ],
  toGreen: [
    // Tachi-waza
    'Kata-guruma','Sumi-otoshi','Uki-otoshi','Kibisu-gaeshi','Sukui-nage',
    // Ne-waza
    'Kesa-gatame','Kata-gatame','Yoko-shiho-gatame','Kuzure-kesa-gatame',
  ],
  toBlue: [
    // Tachi-waza
    'Uchi-mata','Harai-goshi','Hane-goshi','Ushiro-goshi','O-soto-guruma','Ashi-guruma',
    // Counters used in grading
    'Sode-tsurikomi-goshi','Uki-goshi',
    // Ne-waza holds & transitions
    'Kata-gatame','Kami-shiho-gatame','Yoko-shiho-gatame','Tate-shiho-gatame',
    // Shime-waza introduced at blue
    'Hadaka-jime','Okuri-eri-jime','Kata-ha-jime','Sankaku-jime',
  ],
  toBrown: [
    // Tachi-waza
    'Tani-otoshi','Yoko-gake','Yoko-guruma','Tomoe-nage','Ura-nage','Sumi-gaeshi',
    // Kansetsu-waza
    'Juji-gatame','Ude-garami','Ude-hishigi-ude-gatame','Ude-hishigi-hiza-gatame',
    // Shime-waza (full set at brown)
    'Nami-juji-jime','Gyaku-juji-jime','Kata-juji-jime',
    'Okuri-eri-jime','Kata-ha-jime','Sankaku-jime','Sode-guruma-jime',
  ],
};

const BELT_PREP_COMBOS = {
  toYellow: [
    'Tai-otoshi → Yoko-shiho-gatame',
    'Ippon-seoi-nage → Kami-shiho-gatame',
    'Ouchi-gari → Tate-shiho-gatame',
  ],
  toOrange: [
    'Ko-uchi-gari → O-soto-gari',
    'Ko-uchi-gari → Morote-seoi-nage',
    'Ouchi-gari → Ko-uchi-gari',
  ],
  toGreen: [
    'O-goshi → Kesa-gatame',
    'Tai-otoshi → Kesa-gatame',
    'Ko-soto-gari → Yoko-shiho-gatame',
  ],
  toBlue: [
    'Uchi-mata → O-goshi',
    'Ko-soto-gari → Uchi-mata',
  ],
  toBrown: [
    'Tai-otoshi → Uchi-mata',
    'Ouchi-gari → Tani-otoshi',
  ],
};

// ── RENDER ─────────────────────────────────────────
function renderBelt() {
  const b          = getCurrentTargetBelt();
  const passedDate = _getPassedDate(b.id);
  const allItems   = b.groups.flatMap(g => g.items);
  const doneCount  = allItems.filter(i => !!beltProgress[b.id + '_' + i]).length;
  const pct        = allItems.length ? Math.round(doneCount / allItems.length * 100) : 0;

  document.getElementById('belt-tab-content').innerHTML = `
    ${buildAdultHero(b, pct)}

    ${buildAdultRequirements(b, doneCount, allItems.length)}

    <div class="ab-bottom-row">
      ${passedDate
        ? `<div class="ab-passed-badge">&#10003; Passed ${passedDate} &nbsp;
           <button class="ab-edit-pass" onclick="openGradingPassModal('${b.id}')">Edit</button></div>`
        : `<button class="ab-pass-btn" onclick="openGradingPassModal('${b.id}')">&#127881; I Passed This Belt!</button>`
      }
    </div>

    <div class="ab-browse-toggle" onclick="toggleAdultBrowse()">
      <span>Browse All Grades</span>
      <span id="ab-browse-chev">&#9660;</span>
    </div>
    <div class="ab-browse-body" id="ab-browse-body">
      ${BELT_DATA.map(belt => beltSection(belt)).join('')}
    </div>
  `;
}

function _getPassedDate(beltId) {
  const tlKey = BELT_PASS_KEYS[beltId] || beltId;
  const tl    = JSON.parse(localStorage.getItem('judo_belt_timeline') || '[]');
  return (tl.find(t => t.key === tlKey) || {}).date || null;
}

function beltSection(b) {
  const total     = b.groups.reduce((s,g) => s + g.items.length, 0);
  const done      = b.groups.reduce((s,g) => s + g.items.filter(item => beltProgress[b.id+'_'+item]).length, 0);
  const pct       = total ? Math.round(done / total * 100) : 0;
  const open      = beltProgress['__open_'  + b.id];
  const reqsOpen  = beltProgress['__reqs_'  + b.id];
  const isCurrent = (b.id === getCurrentTargetBelt().id);
  const passedDate = _getPassedDate(b.id);

  const techNames = BELT_TECHNIQUES[b.id] || [];
  const techs     = techNames.map(n => TECHNIQUES.find(t => t.name === n)).filter(Boolean);

  return `
<div class="belt-section${open?' open':''}${isCurrent?' current-target':''}" id="bs-${b.id}">

  <div class="belt-header" onclick="toggleBelt('${b.id}')">
    ${isCurrent ? '<span class="belt-active-pip">YOUR GOAL</span>' : ''}
    <div class="belt-dot ${b.fromColor}"></div>
    <span style="color:var(--text-muted);font-size:18px;margin:0 2px">→</span>
    <div class="belt-dot ${b.toColor}"></div>
    <div class="belt-title"><h3>${b.label}</h3><p>${passedDate ? '✅ Passed' : b.duration}</p></div>
    <div style="display:flex;align-items:center;gap:10px">
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      <span class="progress-pct">${pct}%</span>
    </div>
    <span class="belt-chevron">⌄</span>
  </div>

  <div class="belt-body">

    <div class="belt-sub-section">
      <div class="belt-sub-heading">Required Techniques</div>
      <div class="belt-tech-grid">
        ${techs.map(t => beltTechCard(t)).join('')}
      </div>
    </div>

    <div class="belt-prep-row">
      <div class="belt-prep-info">
        <div class="belt-prep-label">&#127885; Grading Prep Session</div>
        <div class="belt-prep-desc">Every required technique + key combinations — timed drill</div>
      </div>
      <button class="belt-prep-btn" onclick="startBeltPrepSession('${b.id}')">Start &#8594;</button>
    </div>

    ${passedDate
      ? `<div class="belt-passed-row">&#10003; Passed on ${passedDate} &nbsp;<button class="belt-edit-pass-btn" onclick="event.stopPropagation();openGradingPassModal('${b.id}')">Edit</button></div>`
      : `<div class="belt-pass-row">
           <div class="belt-pass-hint">Done with this grading?</div>
           <button class="belt-pass-btn" onclick="event.stopPropagation();openGradingPassModal('${b.id}')">&#127881; I Passed This Belt</button>
         </div>`}

    <div class="belt-req-toggle" onclick="toggleBeltReqs('${b.id}')">
      <span>Full Requirements Checklist &nbsp;<span style="color:var(--accent);font-size:11px">${done}/${total} done</span></span>
      <span class="belt-req-chevron${reqsOpen?' open':''}" id="rchev-${b.id}">⌄</span>
    </div>
    <div class="belt-req-body${reqsOpen?' open':''}" id="reqs-${b.id}">
      ${b.groups.map(g => reqGroup(b.id, g)).join('')}
    </div>

  </div>
</div>`;
}

// ── TECHNIQUE CARD ─────────────────────────────────
function beltTechCard(t) {
  const vid      = getVideoId(t.url);
  const isCombo  = t.cat === 'Combination' || t.cat === 'Ne-waza';
  const subTag   = t.sub && !isCombo ? `<span class="tag sub">${t.sub}</span>` : '';
  const catTag   = t.cat && !isCombo  ? `<span class="tag cat">${t.cat}</span>` : '';
  const comboTag = isCombo ? `<span class="tag" style="background:#1a1a2e;border-color:#44448a;color:#9090e0">Combo</span>` : '';

  return `
<div class="belt-tech-card">
  <div class="belt-tc-name">${t.name}</div>
  ${t.en ? `<div class="belt-tc-en">${t.en}</div>` : ''}
  <div class="belt-tc-tags">${subTag}${catTag}${comboTag}</div>
  <div class="belt-tc-foot">
    ${vid
      ? `<button class="belt-tc-watch" onclick="event.stopPropagation();openModal('${esc(t.name)}')">▶ Watch</button>`
      : `<span class="belt-tc-novid">No video</span>`}
  </div>
</div>`;
}

// ── CHECKLIST ──────────────────────────────────────
function reqGroup(beltId, g) {
  return `<div class="req-group">
  <div class="req-group-title">${g.title}</div>
  ${g.items.map(item => reqItem(beltId, item)).join('')}
</div>`;
}

function reqItem(beltId, item) {
  const done = !!beltProgress[beltId + '_' + item];
  return `<div class="req-item${done?' done':''}" onclick="toggleReq('${beltId}','${esc(item)}')">
  <div class="req-checkbox"></div>
  <span class="req-text">${item}</span>
</div>`;
}

// ── TOGGLES ────────────────────────────────────────
function toggleBelt(id) {
  beltProgress['__open_' + id] = !beltProgress['__open_' + id];
  localStorage.setItem('judo_belt_progress', JSON.stringify(beltProgress));
  renderBelt();
}

function toggleBeltReqs(id) {
  beltProgress['__reqs_' + id] = !beltProgress['__reqs_' + id];
  localStorage.setItem('judo_belt_progress', JSON.stringify(beltProgress));
  const body = document.getElementById('reqs-' + id);
  const chev = document.getElementById('rchev-' + id);
  if (body) body.classList.toggle('open', !!beltProgress['__reqs_' + id]);
  if (chev) chev.classList.toggle('open', !!beltProgress['__reqs_' + id]);
}

function toggleReq(beltId, item) {
  const key = beltId + '_' + item;
  beltProgress[key] = !beltProgress[key];
  localStorage.setItem('judo_belt_progress', JSON.stringify(beltProgress));
  renderBelt();
}

// ── GRADING PREP SESSION ───────────────────────────
function startBeltPrepSession(beltId) {
  const b = BELT_DATA.find(b => b.id === beltId);
  if (!b) return;

  const techNames = (BELT_TECHNIQUES[beltId] || []).filter(n => !n.includes('→'));
  const combos    =  BELT_PREP_COMBOS[beltId] || [];
  const items     = [];

  items.push({ name: 'Warmup — arm circles, hip rotations, shadow movement', duration: 60 });
  techNames.forEach(name => {
    items.push({ name: name + ' — uchikomi × 10, both sides', duration: 90 });
  });
  combos.forEach(combo => {
    items.push({ name: 'Combo: ' + combo, duration: 60 });
  });
  items.push({ name: 'Mindset: attack first, stay relaxed — show the examiner your judo', duration: 30 });

  const totalSecs = items.reduce((s, i) => s + i.duration, 0);

  currentSession = {
    title: b.label + ' Prep',
    themeTag: 'beltprep',
    themeName: 'Grading Prep',
    themeEmoji: '🏅',
    themeColor: '#c9952f',
    minutes: Math.max(1, Math.round(totalSecs / 60)),
    location: 'solo',
    blocks: [{
      type: 'beltprep',
      name: b.label + ' Grading Prep',
      duration: totalSecs,
      cue: 'Show control, not just technique — examiners watch your attitude',
      items,
    }],
    totalDuration: totalSecs,
  };

  startSession();
}

// ── ADULT BELT HERO ────────────────────────────────
const BELT_HEX = {
  'belt-color-white':  '#e8e8e8',
  'belt-color-red':    '#c0392b',
  'belt-color-yellow': '#f1c40f',
  'belt-color-orange': '#e67e22',
  'belt-color-green':  '#27ae60',
  'belt-color-blue':   '#2980b9',
  'belt-color-brown':  '#795548',
};

function buildAdultHero(b, pct) {
  const pctColor  = pct >= 80 ? '#16a34a' : pct >= 50 ? '#d97706' : '#e53e3e';
  const fromHex   = BELT_HEX[b.fromColor] || '#888';
  const toHex     = BELT_HEX[b.toColor]   || '#888';
  const dotStyle  = (hex) => `style="background:${hex};width:44px;height:44px;border-radius:50%;flex-shrink:0;box-shadow:0 3px 10px rgba(0,0,0,0.25);border:3px solid rgba(255,255,255,0.35);"`;
  return `
  <div class="ab-hero">
    <div class="ab-hero-top">
      <div class="ab-belt-visual">
        <div ${dotStyle(fromHex)}></div>
        <span class="ab-arrow">&#8594;</span>
        <div ${dotStyle(toHex)}></div>
        <div class="ab-hero-labels">
          <div class="ab-hero-grade">${b.label}</div>
          <div class="ab-hero-sub">Working toward: ${b.to} Belt</div>
        </div>
      </div>
      <div class="ab-hero-pct" style="color:${pctColor}">${pct}<span class="ab-hero-pct-sym">%</span></div>
    </div>
    <div class="ab-prog-bar">
      <div class="ab-prog-fill" style="width:${pct}%;background:${pctColor}"></div>
    </div>
    <div class="ab-hero-footer">
      <span class="ab-hero-duration">&#128337; ${b.duration}</span>
      <button class="ab-readiness-btn" onclick="openGradingReadiness()">&#127919; Grading Readiness &#8594;</button>
    </div>
  </div>`;
}

// ── ADULT REQUIREMENTS CARD ────────────────────────
function buildAdultRequirements(b, doneCount, totalCount) {
  return `
  <div class="ab-reqs-card">
    <div class="ab-reqs-header">
      <div class="ab-reqs-title">&#128203; Requirements</div>
      <div class="ab-reqs-count">${doneCount} / ${totalCount} ticked</div>
    </div>

    ${b.groups.map(g => `
    <div class="ab-req-group">
      <div class="ab-req-group-title">${g.title}</div>
      ${g.items.map(item => {
        const key  = b.id + '_' + item;
        const done = !!beltProgress[key];
        const tech = (typeof TECHNIQUES !== 'undefined') ? TECHNIQUES.find(t => t.name === item) : null;
        const vid  = tech ? getVideoId(tech.url) : null;
        return `
        <div class="ab-req-row${done ? ' done' : ''}" onclick="toggleAdultReq('${b.id}','${esc(item)}',this)">
          <div class="ab-req-tick">${done ? '&#10003;' : ''}</div>
          <span class="ab-req-text">${item}</span>
          ${vid ? `<button class="ab-req-watch" onclick="event.stopPropagation();openModal('${esc(item)}')">&#9654;</button>` : ''}
        </div>`;
      }).join('')}
    </div>`).join('')}

    <div class="ab-actions-row">
      <button class="ab-prep-btn" onclick="startBeltPrepSession('${b.id}')">&#127885; Prep Session</button>
      <button class="ab-test-btn" onclick="openAdultTestMode('${b.id}')">&#129514; Test Me!</button>
    </div>
  </div>`;
}

// ── TOGGLE REQUIREMENT (focused view) ─────────────
function toggleAdultReq(beltId, item, el) {
  const key = beltId + '_' + item;
  beltProgress[key] = !beltProgress[key];
  localStorage.setItem('judo_belt_progress', JSON.stringify(beltProgress));

  const tick = el.querySelector('.ab-req-tick');
  if (tick) tick.innerHTML = beltProgress[key] ? '&#10003;' : '';
  el.classList.toggle('done', !!beltProgress[key]);

  // Live-update header count
  const b = BELT_DATA.find(b => b.id === beltId);
  if (b) {
    const all  = b.groups.flatMap(g => g.items);
    const done = all.filter(i => beltProgress[beltId + '_' + i]).length;
    const pct  = all.length ? Math.round(done / all.length * 100) : 0;
    const cnt  = document.querySelector('.ab-reqs-count');
    const bar  = document.querySelector('.ab-prog-fill');
    const pctEl = document.querySelector('.ab-hero-pct');
    if (cnt)   cnt.textContent  = done + ' / ' + all.length + ' ticked';
    if (bar)   bar.style.width  = pct + '%';
    if (pctEl) pctEl.innerHTML  = pct + '<span class="ab-hero-pct-sym">%</span>';
  }
  showToast(beltProgress[key] ? '&#10003; Ticked!' : 'Unticked');
}

// ── BROWSE TOGGLE ──────────────────────────────────
function toggleAdultBrowse() {
  const body = document.getElementById('ab-browse-body');
  const chev = document.getElementById('ab-browse-chev');
  if (!body) return;
  const open = body.classList.toggle('open');
  if (chev) chev.innerHTML = open ? '&#9650;' : '&#9660;';
}

// ── ADULT TEST MODE ────────────────────────────────
let adultTestState = null;

function openAdultTestMode(beltId) {
  const b = BELT_DATA.find(b => b.id === beltId);
  if (!b) return;

  const allItems = b.groups.flatMap(g => g.items);
  const unticked = allItems.filter(i => !beltProgress[beltId + '_' + i]);

  if (unticked.length === 0) {
    showToast('&#10003; All ticked &#8212; ready to grade!');
    return;
  }

  adultTestState = { beltId, items: unticked, idx: 0, ticked: 0 };
  renderAdultTestCard();
}

function renderAdultTestCard() {
  const { beltId, items, idx } = adultTestState;
  const item     = items[idx];
  const tech     = (typeof TECHNIQUES !== 'undefined') ? TECHNIQUES.find(t => t.name === item) : null;
  const vid      = tech ? getVideoId(tech.url) : null;
  const progPct  = Math.round(idx / items.length * 100);

  let el = document.getElementById('adult-test-overlay');
  if (!el) {
    el = document.createElement('div');
    el.id = 'adult-test-overlay';
    document.body.appendChild(el);
  }

  el.className = 'gp-overlay open';
  el.innerHTML = `
    <div class="gp-modal jg-test-card">
      <div class="jg-test-toprow">
        <div class="jg-test-prog-bar">
          <div class="jg-test-prog-fill" style="width:${progPct}%"></div>
        </div>
        <span class="jg-test-count">${idx + 1}&thinsp;/&thinsp;${items.length}</span>
      </div>
      <div class="jg-test-emoji">&#129355;</div>
      <div class="jg-test-label">Can you perform this?</div>
      <div class="jg-test-item">${item}</div>
      ${vid ? `<button class="jg-test-watch" onclick="openModal('${esc(item)}')">&#9654; Watch technique</button>` : ''}
      <div class="jg-test-actions">
        <button class="jg-test-no"  onclick="answerAdultTest(false)">&#128517; Not yet</button>
        <button class="jg-test-yes" onclick="answerAdultTest(true)">&#10003; Yes, I can!</button>
      </div>
      <button class="jg-test-stop" onclick="closeAdultTestMode()">Stop for now</button>
    </div>`;
  document.body.style.overflow = 'hidden';
}


function answerAdultTest(knew) {
  const { beltId, items, idx } = adultTestState;
  if (knew) {
    const key = beltId + '_' + items[idx];
    beltProgress[key] = true;
    localStorage.setItem('judo_belt_progress', JSON.stringify(beltProgress));
    adultTestState.ticked++;
  }
  adultTestState.idx++;
  if (adultTestState.idx >= adultTestState.items.length) {
    const ticked = adultTestState.ticked;
    const total  = adultTestState.items.length;
    closeAdultTestMode();
    showToast('&#127881; Done! Ticked ' + ticked + ' / ' + total);
    renderBelt();
  } else {
    renderAdultTestCard();
  }
}

function closeAdultTestMode() {
  const el = document.getElementById('adult-test-overlay');
  if (el) { el.className = 'gp-overlay'; el.innerHTML = ''; }
  document.body.style.overflow = '';
  renderBelt();
}
