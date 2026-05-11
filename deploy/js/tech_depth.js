// ── TECHNIQUE DEPTH DATA ──────────────────────────────────────────────────────
// grips: key grip & loading note
// mistakes: array of common errors (2-3)
// combos: array of combination strings
// counters: array of counter options
// comp: competition context tip

const TECH_DEPTH = {

  'O-soto-gari': {
    grips: 'Standard sleeve-lapel. Drive the sleeve arm forward and upward as you lean chest-to-chest — this loads your bodyweight onto uke before the reap.',
    mistakes: [
      'Reaping before kuzushi — the leg does nothing if uke is still balanced',
      'Standing upright during entry — lean in and press your chest onto theirs',
      'Half-hearted reap — drive the leg all the way through, not just a tap',
    ],
    combos: [
      'Ko-uchi-gari → O-soto-gari (minor reap draws uke\'s foot forward, major reap scores)',
      'Ouchi-gari → O-soto-gari (attack inside leg first, switch outside when they resist)',
    ],
    counters: [
      'O-soto-gaeshi — step past the reap and throw back over the same leg',
      'O-uchi-gari — as tori commits their weight, attack the inner leg',
    ],
    comp: 'One of the most scored throws at every level. Most effective against opponents with an upright stance or who push forward. Attack when uke\'s right foot is planted and weighted.',
  },

  'Ouchi-gari': {
    grips: 'Standard grip. Drive the lapel hand backwards and down to break uke\'s balance rearward. Your reaping leg sweeps between their legs, hooking the far heel.',
    mistakes: [
      'Reaching with the foot instead of driving with the hip — the whole body must commit',
      'Breaking your own posture forward — stay upright or slightly back as you reap',
      'Reaping the wrong leg — attack the leg that\'s bearing weight',
    ],
    combos: [
      'Ouchi-gari → Morote-seoi-nage (reap draws them forward, shoulder throw scores)',
      'Ko-uchi-gari → Ouchi-gari (minor reap shifts weight, switch to major inner reap)',
    ],
    counters: [
      'Ouchi-gaeshi — post your foot and throw them back the other way',
      'Ko-uchi-gari — as they lean forward into the reap',
    ],
    comp: 'Works especially well against opponents who lean forward. Attack when uke steps with the leg you intend to reap. Very effective in combination with Ko-uchi-gari as a two-attack sequence.',
  },

  'Ko-uchi-gari': {
    grips: 'Standard. Pull the sleeve arm down and across your body. Trap the heel with the sole of your foot — this is a hook, not a kick.',
    mistakes: [
      'Kicking instead of hooking the heel — you must catch and hold the ankle momentarily',
      'Not breaking balance forward first — pull uke onto their toes before the reap',
      'Attacking the wrong ankle — reap the foot that\'s bearing weight',
    ],
    combos: [
      'Ko-uchi-gari → Morote-seoi-nage (classic: reap draws reaction, enter for shoulder throw)',
      'Ko-uchi-gari → O-soto-gari (pressure inside, score outside)',
    ],
    counters: [
      'Ko-uchi-gaeshi — redirect tori\'s momentum and throw back',
      'Ouchi-gari — as tori lifts their foot for the reap',
    ],
    comp: 'The most important entry attack in judo. Even if it doesn\'t score, it draws a reaction that sets up the second attack. Drive hard — a committed Ko-uchi-gari scores on its own.',
  },

  'Ko-soto-gari': {
    grips: 'Standard. Pull the sleeve forward and up, push with the lapel hand across uke\'s body. Hook the near ankle from the outside.',
    mistakes: [
      'Sweeping too wide — the hook must be tight against the ankle, not out to the side',
      'Not pushing uke\'s upper body toward the reaping direction before hooking',
      'Attacking when uke\'s weight is on both feet — wait for the step',
    ],
    combos: [
      'Ouchi-gari → Ko-soto-gari (attack inside, switch to outside when they resist)',
      'Ko-uchi-gari → Ko-soto-gari (shift from inner to outer ankle attack)',
    ],
    counters: [
      'Tai-otoshi as tori reaches in low for the ankle',
      'Ouchi-gari — step across and attack their inner leg',
    ],
    comp: 'Fast, low-risk throw. Excellent setup technique. Most effective against opponents who resist with a wide stance — attack the near foot as they plant it.',
  },

  'O-goshi': {
    grips: 'Wrap your arm fully around uke\'s waist (or grip the belt). Sleeve hand drives uke\'s elbow down to hip level. Load uke onto your hip — their feet should almost leave the ground.',
    mistakes: [
      'Bending forward at the waist — your back must stay straight, hips do the work',
      'Not pulling uke close enough — gap between bodies means the throw fails',
      'Feet too wide — narrower stance lets you pivot fully',
    ],
    combos: [
      'Deashi-harai → O-goshi (sweep misses, immediately load onto hip)',
      'O-goshi → Kesa-gatame (natural landing position — go straight to the hold)',
    ],
    counters: [
      'Ushiro-goshi — lift from behind as tori loads their hip',
      'Utsuri-goshi — shift hips to the side and counter-throw',
    ],
    comp: 'The foundation hip throw. Essential for understanding all hip throws. At competition level, transitions to Uki-goshi or Tsurikomi-goshi — but O-goshi scores too.',
  },

  'Ippon-seoi-nage': {
    grips: 'Drop under and place the sleeve elbow on your shoulder (or into your elbow pit for the one-arm version). Drive with your legs — the throw comes from the legs and hips, not the back.',
    mistakes: [
      'Bending at the waist during the throw — spinal alignment must stay neutral',
      'Hips too high — get below uke\'s centre of gravity before throwing',
      'Feet too wide on entry — narrow stance enables a full pivot',
    ],
    combos: [
      'Ko-uchi-gari → Ippon-seoi-nage (reap creates the forward reaction, enter fast)',
      'Deashi-harai feint → Ippon-seoi-nage (fake sweep, drop under as they adjust)',
    ],
    counters: [
      'Sumi-otoshi — as tori drops under, pull back and push to the corner',
      'Ushiro-goshi — if tori stands up mid-throw, lift from behind',
    ],
    comp: 'One of the highest-scoring throws in world competition. Very effective from a sleeve-only or broken grip. Master the drop seoi entry — it\'s harder to telegraph. Works at any belt level.',
  },

  'Morote-seoi-nage': {
    grips: 'Both arms slide under uke\'s arms, driving elbows into the armpit region. The lapel grip arm controls direction; both elbows press down to load uke on your back.',
    mistakes: [
      'Not turning in fully — hips must cross the centreline and be below uke\'s hips',
      'Standing up during the throw instead of driving forward and down',
      'Slow entry — the turn must be explosive, not gradual',
    ],
    combos: [
      'Ko-uchi-gari → Morote-seoi-nage (the classic youth judo combination)',
      'Ouchi-gari → Morote-seoi-nage (attack backwards, counter-attack forwards)',
    ],
    counters: [
      'Sumi-otoshi — redirect tori\'s forward momentum to the corner',
      'Tani-otoshi — sit behind tori as they turn in',
    ],
    comp: 'Extremely common at all levels, especially youth competition. The double-lapel grip variant is very popular for its control. Drop seoi is dangerous — hard to read and very fast.',
  },

  'Tai-otoshi': {
    grips: 'Standard sleeve-lapel. Your blocking leg is a post — it doesn\'t reap. The throw comes from pulling the sleeve across and rotating uke over the block.',
    mistakes: [
      'Reaping the leg — Tai-otoshi is a block, not a reap; your leg just stops their forward movement',
      'Turning past 90 degrees — find the throw at 90° and pull through from there',
      'Not pulling the sleeve arm across and down simultaneously with the block',
    ],
    combos: [
      'Ko-uchi-gari → Tai-otoshi (reap draws step, block and rotate as they plant)',
      'Ouchi-gari → Tai-otoshi (inner reap forces a step, block the next one)',
    ],
    counters: [
      'Tai-otoshi-gaeshi — pull back as tori extends and throw over the same leg',
      'Uchi-mata — as tori turns in, drive between their legs',
    ],
    comp: 'High-level competitive throw. Works brilliantly off broken grips and fast footwork. The key is to attack from movement — static Tai-otoshi is easy to defend.',
  },

  'Tsurikomi-goshi': {
    grips: 'Lapel hand lifts to shoulder height (tsuri = lift). Sleeve hand pulls forward and across (komi = pull). Both actions together load uke onto your hip.',
    mistakes: [
      'Pulling down with the lapel hand instead of lifting — it must go up to break balance',
      'Poor hip position — your hip must be in front of uke\'s hip centre, not beside it',
      'Too much distance between bodies — pull uke tight before turning',
    ],
    combos: [
      'Ko-uchi-gari → Tsurikomi-goshi (reap creates forward break, load the hip)',
      'Deashi-harai → Tsurikomi-goshi (sweep misses, immediately hip throw)',
    ],
    counters: [
      'Utsuri-goshi — shift hips as tori loads and throw them off',
      'Ushiro-goshi — step behind and lift as they turn in',
    ],
    comp: 'A core belt requirement throw that also scores at competition level. The lifting lapel action makes it effective against opponents with a strong downward grip. Often overlooked — very effective with good kuzushi.',
  },

  'Harai-goshi': {
    grips: 'Standard. The sweeping leg drives through the back of uke\'s thighs — not the calves, not the knees. Load the hip fully first, then sweep.',
    mistakes: [
      'Sweeping before the hip is loaded — kuzushi and tsukuri must come first',
      'Bending forward at the waist during the sweep',
      'Sweeping at the calf or knee level — the thigh is the target',
    ],
    combos: [
      'Ouchi-gari → Harai-goshi (attack backwards first, force the step forward)',
      'Ko-uchi-gari → Harai-goshi (minor reap sets up the hip loading)',
    ],
    counters: [
      'Harai-goshi-gaeshi — catch the sweeping leg and throw back',
      'Tani-otoshi — sit behind tori as they load and sweep',
    ],
    comp: 'One of the most powerful throws in competition. Elite players score ippon with it regularly. Works especially well when uke is pulled strongly off-balance forward. High risk/reward.',
  },

  'Hane-goshi': {
    grips: 'Standard. The throwing leg bends and springs (hane = spring) against uke\'s inner thigh. Unlike Harai-goshi, the leg is active — it bounces, not sweeps.',
    mistakes: [
      'Using a static block rather than an active spring — the leg must push upward',
      'Poor hip loading — hips must come across and under uke\'s centre first',
      'Throwing while standing too upright',
    ],
    combos: [
      'Ouchi-gari → Hane-goshi (set up forward kuzushi then spring the hip)',
      'Ko-uchi-gari → Hane-goshi (minor reap disrupts balance, enter for hip spring)',
    ],
    counters: [
      'Hane-goshi-gaeshi — catch tori\'s throwing leg and redirect',
      'Tani-otoshi — sit straight down as they turn in',
    ],
    comp: 'Powerful but technically demanding. Works very well on opponents with a lower stance. The springing action makes it harder to counter than Harai-goshi.',
  },

  'Uchi-mata': {
    grips: 'Standard. Drive your throwing leg up between uke\'s legs, sweeping the inner thigh. Your upper body pulls forward and to the throwing side simultaneously.',
    mistakes: [
      'Driving into the knee — the leg must sweep the inner thigh, not block the knee',
      'Bending forward — upper body rotation must pull uke around, not push them down',
      'Not loading the hip first — hip must cross before the leg sweeps',
    ],
    combos: [
      'Ouchi-gari → Uchi-mata (classic combination — inside, inside, different direction)',
      'Ko-uchi-gari → Uchi-mata (set up with minor reap, score with inner thigh)',
    ],
    counters: [
      'Uchi-mata-gaeshi — catch the sweeping leg and throw',
      'Ko-uchi-gari — as tori lifts their attacking leg, hook the supporting foot',
      'Tani-otoshi — sit behind tori\'s supporting leg',
    ],
    comp: 'The most scored throw in elite judo. Infinite variation — left-side, right-side, drop entries, combinations. Master this throw and combinations off it. Every top player has it.',
  },

  'Deashi-harai': {
    grips: 'Standard. The sweep is all timing — catch the advancing foot as weight transfers OFF it, not onto it. A sweep, not a kick.',
    mistakes: [
      'Sweeping too early or late — the timing window is half a second as uke steps',
      'Sweeping with force instead of timing — a perfectly timed sweep needs no power',
      'Sweeping the planted foot — only sweep the advancing (unweighted) foot',
    ],
    combos: [
      'Deashi-harai → Tsurikomi-goshi (sweep disrupts rhythm, immediately hip throw)',
      'Deashi-harai → Ippon-seoi-nage (sweep draws a defensive step, drop under)',
    ],
    counters: [
      'Ko-uchi-gari — as tori reaches low for the sweep',
      'Ouchi-gari — step through and attack as tori over-commits to the sweep',
    ],
    comp: 'Pure timing throw. Devastating when drilled. Scores against anyone when the timing is right. Practise with a moving partner — never from a static position. Works in all directions of movement.',
  },

  'Okuri-ashi-harai': {
    grips: 'Standard. As uke shuffles sideways, both feet are swept simultaneously — first the lead foot, immediately followed by the trailing foot. Never split the sweep.',
    mistakes: [
      'Sweeping one foot at a time — both feet must be caught in the same motion',
      'Wrong timing — sweep as the feet come together at the end of the shuffle, not mid-step',
      'Breaking your own posture sideways to reach for the feet',
    ],
    combos: [
      'Use as a counter to uke\'s sideways grip-fighting movement',
      'Combine with O-soto-gari approach — feint with O-soto, switch to Okuri as they step sideways',
    ],
    counters: [
      'O-soto-gari — if tori over-commits their body sideways',
      'Uchi-mata — step across and attack as tori extends for the sweep',
    ],
    comp: 'Works specifically on opponents who shuffle sideways. Practice by creating movement patterns. Often a surprise score — opponents don\'t see it coming because they\'re focused on the forward-backward game.',
  },

  'Sasae-tsurikomi-ashi': {
    grips: 'Standard. Place the sole of your foot against uke\'s ankle (not shin) as you lift with the lapel hand. The lifting and blocking happen simultaneously.',
    mistakes: [
      'Placing the foot too high on the shin instead of the ankle',
      'Blocking first, then lifting — both must happen at the same moment',
      'Not pulling uke forward first — they must be committed forward before the block',
    ],
    combos: [
      'O-soto-gari approach → Sasae-tsurikomi-ashi (feint outside, block ankle as they step)',
      'Deashi-harai feint → Sasae-tsurikomi-ashi (suggest the sweep, then prop)',
    ],
    counters: [
      'O-soto-gari — step around the block and attack from behind',
      'Simply lifting the blocked foot and stepping through',
    ],
    comp: 'Works well against opponents who move forward aggressively. The simultaneous lift-and-block is the key — practise the coordination. Less common at high level but scores when clean.',
  },

  'Hiza-guruma': {
    grips: 'Standard. Place the sole of your foot on uke\'s kneecap. Pull uke forward and rotate them around the fixed knee point — like a wheel turning.',
    mistakes: [
      'Blocking the shin instead of the knee — must be on the kneecap specifically',
      'Pushing through the block instead of rotating around it',
      'Not creating forward kuzushi first — uke must be off balance toward the blocked knee',
    ],
    combos: [
      'Deashi-harai → Hiza-guruma (sweep misses low, block the knee on the next step)',
      'Hiza-guruma → Ouchi-gari (wheel creates reaction, follow with inner reap)',
    ],
    counters: [
      'Ko-uchi-gari — as tori lifts their blocking foot',
      'Stepping through and turning to avoid the rotation',
    ],
    comp: 'A timing-based technique that works well from circular movement. Less common at elite level but effective as a combination setup. The rotation mechanic is different from all other throws — master it separately.',
  },

  'Kesa-gatame': {
    grips: 'Arm tight around uke\'s neck (close to the head, not wide). Other hand traps uke\'s near arm, pulled up into your armpit. Sit with legs wide, weight down on uke\'s chest.',
    mistakes: [
      'Sitting upright — drop all your weight down, not up',
      'Leaving your head raised — press into uke to prevent the bridge counter',
      'Arm too wide around the neck — must be tight to prevent neck escape',
    ],
    combos: [
      'O-soto-gari → Kesa-gatame (natural landing position after the reap)',
      'Seoi-nage → Kesa-gatame (roll and pin as uke lands)',
    ],
    counters: [
      'Uke bridges into tori — tori must keep weight low and hip-in',
      'Uke rolls away — switch to Kuzure-kesa-gatame to follow',
    ],
    comp: 'Most basic pinning position. 20 seconds = Ippon. Must control the trapped arm — if the elbow escapes, uke rolls out. Keep hips heavy and legs wide for stability.',
  },

  'Kuzure-kesa-gatame': {
    grips: 'Arm under uke\'s armpit (not around neck). Same side hand grabs uke\'s collar or belt. Other arm controls uke\'s near arm. Sit with hip close to uke\'s shoulder.',
    mistakes: [
      'Losing the armpit control — keep elbow deep under the shoulder',
      'Sitting too far from uke\'s body — must be hip-to-shoulder',
      'Allowing uke to create bridge space with their hips',
    ],
    combos: [
      'Seoi-nage landing → Kuzure-kesa-gatame (very natural transition)',
      'Any throw that lands uke on their side — go straight to this hold',
    ],
    counters: [
      'Bridge and roll is harder than basic Kesa — uke must bridge away from tori',
      'Hip escape toward tori\'s back if tori sits high',
    ],
    comp: 'Preferred by many over basic Kesa-gatame — the armpit grip makes the bridge counter harder. Excellent hold-down when uke is on their side after a throw.',
  },

  'Yoko-shiho-gatame': {
    grips: 'Chest on uke\'s chest (perpendicular — 90°). One arm under uke\'s neck, other arm between their legs grabbing the belt. Head presses down on the chest.',
    mistakes: [
      'Lying parallel to uke instead of perpendicular — must be at 90°',
      'Head too high — keep face toward uke\'s stomach to resist the neck arm',
      'Hips too high — post both knees for a wide, low base',
    ],
    combos: [
      'Tai-otoshi landing → Yoko-shiho-gatame (uke lands face-up, go straight to this)',
      'Any forward throw where uke lands flat on their back',
    ],
    counters: [
      'Uke bridges — keep chest pressure down, shift weight to resist',
      'Uke rolls toward tori — transition to Kami-shiho-gatame to follow the roll',
    ],
    comp: 'Most stable pinning position when executed correctly. 20 seconds = Ippon. Post knees wide, keep chest pressure constant. Extremely hard to escape from chest-to-chest.',
  },

  'Kami-shiho-gatame': {
    grips: 'Both arms reach through uke\'s armpits and grip the belt (or trouser leg). Head presses down on the chest/stomach. Spread your weight across uke\'s entire upper body.',
    mistakes: [
      'Head too far up — uke can triangle your neck; keep head low on their chest',
      'Arms reaching too far forward — lose the armpit control',
      'Hips too high — lower your bodyweight, spread it across uke',
    ],
    combos: [
      'Harai-goshi → Kami-shiho-gatame (uke lands face-up, walk around to the top)',
      'O-soto-gari landing — step over uke\'s head to the position',
    ],
    counters: [
      'Uke hip-escapes sideways — follow and transition to Yoko-shiho-gatame',
      'Uke rolls to one side — chase and maintain chest-to-chest contact',
    ],
    comp: 'Best for very flexible opponents who escape side holds. Applies pressure directly down the long axis of the body. Difficult to bridge out of because there\'s no side leverage.',
  },

};
