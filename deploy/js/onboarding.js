// ── ONBOARDING ──────────────────────────────────────────────────
// Step flow: type → belt → goal → name → done

let obStep    = 1; // 1=type, 2=belt, 3=goal, 4=name
let obProfile = { type: null, belt: null, goal: null, name: '' };

function showOnboarding() {
  const screen = document.getElementById('onboarding-screen');
  obStep    = 1;
  obProfile = { type: null, belt: null, goal: null, name: '' };
  screen.classList.add('open');
  renderObStep();
}

function closeOnboarding() {
  document.getElementById('onboarding-screen').classList.remove('open');
}

function renderObStep() {
  const el = document.getElementById('onboarding-screen');
  switch(obStep) {
    case 1: el.innerHTML = obStepType();   break;
    case 2: el.innerHTML = obStepBelt();   break;
    case 3: el.innerHTML = obStepGoal();   break;
    case 4: el.innerHTML = obStepName();   break;
  }
}

// ── STEP 1: WHO ARE YOU ─────────────────────────────────────────
function obStepType() {
  return `
    <div class="ob-wrap">
      <div class="ob-header">
        <div class="ob-logo">🥋 JudoHub</div>
        <div class="ob-steps"><span class="ob-step active"></span><span class="ob-step"></span><span class="ob-step"></span></div>
      </div>
      <div class="ob-body">
        <h1 class="ob-title">Who's training?</h1>
        <p class="ob-sub">We'll personalise the app for you</p>
        <div class="ob-cards">
          <button class="ob-type-card" onclick="selectType('adult')">
            <div class="ob-type-icon">🧑‍🦱</div>
            <div class="ob-type-name">Adult</div>
            <div class="ob-type-desc">13 and over</div>
          </button>
          <button class="ob-type-card" onclick="selectType('junior')">
            <div class="ob-type-icon">🧒</div>
            <div class="ob-type-name">Junior</div>
            <div class="ob-type-desc">Under 13</div>
          </button>
        </div>
      </div>
    </div>`;
}

function selectType(type) {
  obProfile.type = type;
  obStep = 2;
  renderObStep();
}

// ── STEP 2: CURRENT BELT ────────────────────────────────────────
function obStepBelt() {
  const isJunior = obProfile.type === 'junior';
  const belts = isJunior
    ? [
        { key:'white',  color:'#e8e8e8', border:'#ccc',    label:'White',  sub:'Just started' },
        { key:'red',    color:'#e74c3c', border:'#c0392b', label:'Red',    sub:'Mon 1-3' },
        { key:'yellow', color:'#f1c40f', border:'#d4ac0d', label:'Yellow', sub:'Mon 4-6' },
        { key:'orange', color:'#e67e22', border:'#ca6f1e', label:'Orange', sub:'Mon 7-9' },
      ]
    : [
        { key:'white',  color:'#e8e8e8', border:'#ccc',    label:'White',  sub:'Just started' },
        { key:'red',    color:'#e74c3c', border:'#c0392b', label:'Red',    sub:'6th Kyu' },
        { key:'yellow', color:'#f1c40f', border:'#d4ac0d', label:'Yellow', sub:'5th Kyu' },
        { key:'orange', color:'#e67e22', border:'#ca6f1e', label:'Orange', sub:'4th Kyu' },
        { key:'green',  color:'#27ae60', border:'#1e8449', label:'Green',  sub:'3rd Kyu' },
        { key:'blue',   color:'#2980b9', border:'#21618c', label:'Blue',   sub:'2nd Kyu' },
        { key:'brown',  color:'#795548', border:'#4e342e', label:'Brown',  sub:'1st Kyu' },
        { key:'black',  color:'#1a1a1a', border:'#000',    label:'Black',  sub:'Dan grade' },
      ];

  return `
    <div class="ob-wrap">
      <div class="ob-header">
        <button class="ob-back" onclick="obStep=1;renderObStep()">← Back</button>
        <div class="ob-steps"><span class="ob-step done"></span><span class="ob-step active"></span><span class="ob-step"></span></div>
      </div>
      <div class="ob-body">
        <h1 class="ob-title">Current belt?</h1>
        <p class="ob-sub">Be honest — this sets your starting point</p>
        <div class="ob-belt-grid">
          ${belts.map(b => `
            <button class="ob-belt-btn" onclick="selectBelt('${b.key}')">
              <div class="ob-belt-dot" style="background:${b.color};border-color:${b.border}"></div>
              <div class="ob-belt-label">${b.label}</div>
              <div class="ob-belt-sub">${b.sub}</div>
            </button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function selectBelt(belt) {
  obProfile.belt = belt;
  obStep = 3;
  renderObStep();
}

// ── STEP 3: TRAINING GOAL ───────────────────────────────────────
function obStepGoal() {
  const isJunior = obProfile.type === 'junior';
  const goals = isJunior
    ? [
        { key:'grading',     icon:'🏅', label:'Pass my next grading',  desc:'Track belt requirements' },
        { key:'techniques',  icon:'🥋', label:'Learn new techniques',   desc:'Build my move library' },
        { key:'fun',         icon:'😄', label:'Have fun & get better',  desc:'Enjoy every session' },
        { key:'competition', icon:'🏆', label:'Compete',                desc:'Win at tournaments' },
      ]
    : [
        { key:'grading',     icon:'🏅', label:'Pass my next grading',  desc:'Track syllabus requirements' },
        { key:'techniques',  icon:'🥋', label:'Learn new techniques',   desc:'Expand my technique library' },
        { key:'competition', icon:'🏆', label:'Compete & win',          desc:'Sharpen randori & tactics' },
        { key:'fitness',     icon:'💪', label:'General fitness',        desc:'Training & conditioning' },
      ];

  return `
    <div class="ob-wrap">
      <div class="ob-header">
        <button class="ob-back" onclick="obStep=2;renderObStep()">← Back</button>
        <div class="ob-steps"><span class="ob-step done"></span><span class="ob-step done"></span><span class="ob-step active"></span></div>
      </div>
      <div class="ob-body">
        <h1 class="ob-title">Main goal?</h1>
        <p class="ob-sub">This shapes what you see on your home screen</p>
        <div class="ob-goal-list">
          ${goals.map(g => `
            <button class="ob-goal-btn" onclick="selectGoal('${g.key}')">
              <span class="ob-goal-icon">${g.icon}</span>
              <div class="ob-goal-text">
                <div class="ob-goal-name">${g.label}</div>
                <div class="ob-goal-desc">${g.desc}</div>
              </div>
              <span class="ob-goal-arrow">›</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function selectGoal(goal) {
  obProfile.goal = goal;
  obStep = 4;
  renderObStep();
}

// ── STEP 4: NAME ────────────────────────────────────────────────
function obStepName() {
  const beltColors = { white:'#555', red:'#e74c3c', yellow:'#f1c40f', orange:'#e67e22',
                       green:'#27ae60', blue:'#2980b9', brown:'#795548', black:'#1a1a1a' };
  const beltNames  = { white:'White Belt', red:'Red Belt', yellow:'Yellow Belt', orange:'Orange Belt',
                       green:'Green Belt', blue:'Blue Belt', brown:'Brown Belt', black:'Black Belt' };
  const color = beltColors[obProfile.belt] || '#555';
  const bLabel = beltNames[obProfile.belt] || '';

  return `
    <div class="ob-wrap">
      <div class="ob-header">
        <button class="ob-back" onclick="obStep=3;renderObStep()">← Back</button>
        <div class="ob-steps"><span class="ob-step done"></span><span class="ob-step done"></span><span class="ob-step done"></span></div>
      </div>
      <div class="ob-body">
        <h1 class="ob-title">Last thing —</h1>
        <p class="ob-sub">What should we call you?</p>
        <input class="ob-name-input" id="ob-name-input" type="text" placeholder="Your name or nickname" autocomplete="off"
          oninput="obProfile.name=this.value"
          onkeydown="if(event.key==='Enter')finishOnboarding()">
        <div class="ob-profile-preview" style="border-color:${color}">
          <div class="ob-preview-dot" style="background:${color}"></div>
          <div>
            <div class="ob-preview-name" id="ob-preview-name">${obProfile.type === 'junior' ? 'Junior' : 'Adult'} • ${bLabel}</div>
            <div class="ob-preview-goal" id="ob-preview-goal">Goal: ${obProfile.goal || ''}</div>
          </div>
        </div>
        <button class="ob-finish-btn" onclick="finishOnboarding()">Let's go →</button>
        <button class="ob-skip-btn" onclick="finishOnboarding()">Skip</button>
      </div>
    </div>`;
}

// ── FINISH ──────────────────────────────────────────────────────
function finishOnboarding() {
  const nameEl = document.getElementById('ob-name-input');
  if (nameEl) obProfile.name = nameEl.value || '';
  saveProfile(obProfile);
  closeOnboarding();
  renderHome(); // re-render home with new profile
  showToast('Welcome' + (obProfile.name ? ', ' + obProfile.name : '') + '! 🥋');
}
