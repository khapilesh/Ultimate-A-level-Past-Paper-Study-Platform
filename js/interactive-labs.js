/* Three cross-subject visual labs plus the Chemistry Bonding Studio. The 58-topic practice arcade remains available alongside them. */
var SCIENCE_LAB_SUBJECTS = {
  physics: {
    label: "PHYSICS",
    title: "Trajectory Tuner",
    icon: "⚛️",
    intro:
      "Set the launch angle and power. The course stays visible, but the flight path and landing are revealed only after you launch.",
    goal: "Land the ball on the target zone.",
  },
  chemistry: {
    label: "CHEMISTRY",
    title: "Collision Lab",
    icon: "⚗️",
    intro:
      "Set the particle conditions, then run the beaker. Watch which collisions actually make products.",
    goal: "Make 5 products before the reaction timer ends.",
  },
  biology: {
    label: "BIOLOGY",
    title: "Membrane Mission",
    icon: "🧬",
    intro:
      "Choose a cell-transport mission, pick the route, then move the molecule across the membrane yourself.",
    goal: "Deliver 3 molecules using the right transport mechanism.",
  },
};
var SCIENCE_LAB_BIO_MISSIONS = {
  oxygen: {
    name: "Oxygen",
    symbol: "O₂",
    colour: "#527f8c",
    outside: "HIGH",
    inside: "LOW",
    gradient: "down its concentration gradient",
    goal: 3,
    route: "simple",
    routeLabel: "Simple diffusion",
    size: "small + non-polar",
    explain:
      "O₂ is small and non-polar, so it moves directly through the phospholipid bilayer from high to low concentration. No protein or ATP is needed.",
    wrong:
      "O₂ is small and non-polar: let it pass directly through the bilayer, down its concentration gradient.",
  },
  glucose: {
    name: "Glucose",
    symbol: "G",
    colour: "#bd7c3c",
    outside: "HIGH",
    inside: "LOW",
    gradient: "down its concentration gradient",
    goal: 3,
    route: "carrier",
    routeLabel: "Carrier protein",
    size: "large + polar",
    explain:
      "Glucose is too large and polar to pass through the hydrophobic bilayer. A carrier protein changes shape to move it down its gradient; this is facilitated diffusion, so it does not use ATP.",
    wrong:
      "Glucose is large and polar: it needs a carrier protein to cross the membrane. Moving down its gradient does not require ATP.",
  },
  potassium: {
    name: "Potassium ion",
    symbol: "K⁺",
    colour: "#72749a",
    outside: "LOW",
    inside: "HIGH",
    gradient: "against its concentration gradient",
    goal: 3,
    route: "pump",
    routeLabel: "ATP-powered pump",
    size: "charged ion",
    explain:
      "K⁺ is charged and its concentration is already higher inside the cell. Moving more K⁺ in is against the gradient, so a membrane pump uses ATP and changes shape to carry it across.",
    wrong:
      "K⁺ is charged, and the concentration is higher inside already. To move it inward against that gradient, choose an ATP-powered pump.",
  },
  water: {
    name: "Water",
    symbol: "H₂O",
    colour: "#4e8da0",
    outside: "HIGH Ψw",
    inside: "LOW Ψw",
    gradient: "down its water-potential gradient",
    goal: 3,
    route: "channel",
    routeLabel: "Aquaporin channel",
    size: "small, polar molecule",
    explain:
      "Water can move across membranes by osmosis. Aquaporin channel proteins provide a faster route for water, with net movement down the water-potential gradient; no ATP is used.",
    wrong:
      "Water moves by osmosis down its water-potential gradient. Aquaporin channel proteins provide a suitable route; this is not active transport and does not use ATP.",
  },
};
var SCIENCE_LAB_ROUTE_OPTIONS = [
  {
    id: "simple",
    name: "Bilayer",
    detail: "Small, non-polar molecules",
    icon: "↔",
  },
  {
    id: "channel",
    name: "Channel",
    detail: "Pore for suitable ions / water",
    icon: "▥",
  },
  {
    id: "carrier",
    name: "Carrier",
    detail: "Binds, then changes shape",
    icon: "⇆",
  },
  {
    id: "pump",
    name: "ATP pump",
    detail: "Against gradient · ATP",
    icon: "⚡",
  },
];
var SCIENCE_LAB_BONDING_CHALLENGES = [
  {
    id: "nacl",
    kind: "ionic",
    name: "Sodium chloride",
    formula: "NaCl",
    prompt:
      "Form the ions by transferring sodium's single outer electron to chlorine.",
    atoms: [
      { symbol: "Na", name: "Sodium", valence: 1, shells: "2, 8, 1" },
      { symbol: "Cl", name: "Chlorine", valence: 7, shells: "2, 8, 7" },
    ],
    transfers: [{ from: 0, to: 1 }],
    question:
      "Why does solid sodium chloride not conduct electricity, although molten sodium chloride does?",
    options: [
      "Electrons flow through the solid lattice but stop moving when the salt melts.",
      "The covalent molecules become polar only when the solid is heated.",
      "The ions are fixed in the solid lattice; when molten, the ions can move and carry charge.",
      "Solid sodium chloride has no charged particles; melting creates ions from neutral atoms.",
    ],
    answer: 2,
    hint: "Conductivity needs charged particles that are free to move.",
    explanation:
      "Sodium chloride is a giant ionic lattice. Its ions are fixed in the solid, but become mobile when molten (or dissolved in water), so the liquid conducts.",
  },
  {
    id: "mgo",
    kind: "ionic",
    name: "Magnesium oxide",
    formula: "MgO",
    prompt:
      "Transfer magnesium's two outer electrons to oxygen. Build Mg²⁺ and O²⁻.",
    atoms: [
      { symbol: "Mg", name: "Magnesium", valence: 2, shells: "2, 8, 2" },
      { symbol: "O", name: "Oxygen", valence: 6, shells: "2, 6" },
    ],
    transfers: [
      { from: 0, to: 1 },
      { from: 0, to: 1 },
    ],
    question:
      "Which statement best explains why magnesium oxide has a high melting point?",
    options: [
      "Weak attractions between separate MgO molecules require little energy to overcome.",
      "Strong electrostatic attractions act in all directions between Mg²⁺ and O²⁻ ions in a giant lattice.",
      "The ions are uncharged, so the solid is held together by temporary dipoles only.",
      "Each magnesium ion is joined to oxygen only by one localised covalent bond.",
    ],
    answer: 1,
    hint: "Think about the charges on the ions and how many attractions must be overcome.",
    explanation:
      "Magnesium oxide has a giant ionic lattice. Strong electrostatic attractions between oppositely charged Mg²⁺ and O²⁻ ions act throughout the lattice, so considerable energy is needed to separate them.",
  },
  {
    id: "water",
    kind: "covalent",
    name: "Water",
    formula: "H₂O",
    prompt:
      "Share one electron pair in each O–H bond. Oxygen also keeps two lone pairs.",
    atoms: [
      { symbol: "H", name: "Hydrogen 1", valence: 1, shells: "1" },
      { symbol: "O", name: "Oxygen", valence: 6, shells: "2, 6" },
      { symbol: "H", name: "Hydrogen 2", valence: 1, shells: "1" },
    ],
    bonds: [
      { a: 0, b: 1, pairs: 1 },
      { a: 1, b: 2, pairs: 1 },
    ],
    question:
      "The oxygen atom in water has two bonding pairs and two lone pairs. What shape and bond angle does this produce?",
    options: [
      "Linear, 180°; all four electron pairs repel equally and point apart.",
      "Tetrahedral, 109.5°; there are four bonding pairs around oxygen.",
      "Trigonal planar, 120°; oxygen has three bonding pairs and no lone pairs.",
      "Bent, about 104.5°; lone pairs repel more strongly than bonding pairs.",
    ],
    answer: 3,
    hint: "Count the electron pairs around oxygen, then account for the stronger repulsion from lone pairs.",
    explanation:
      "Water is bent with an H–O–H angle of about 104.5°. Its two lone pairs repel more strongly than the two bonding pairs, compressing the bond angle from the tetrahedral value.",
  },
  {
    id: "carbon-dioxide",
    kind: "covalent",
    name: "Carbon dioxide",
    formula: "CO₂",
    prompt:
      "Build a double bond between carbon and each oxygen by adding two shared pairs to each C–O link.",
    atoms: [
      { symbol: "O", name: "Oxygen 1", valence: 6, shells: "2, 6" },
      { symbol: "C", name: "Carbon", valence: 4, shells: "2, 4" },
      { symbol: "O", name: "Oxygen 2", valence: 6, shells: "2, 6" },
    ],
    bonds: [
      { a: 0, b: 1, pairs: 2 },
      { a: 1, b: 2, pairs: 2 },
    ],
    question:
      "Each C=O bond is polar. Why is the carbon dioxide molecule non-polar overall?",
    options: [
      "The C=O bonds are non-polar because carbon and oxygen have the same electronegativity.",
      "The molecule is bent, so both bond dipoles point towards the same side.",
      "It is linear and symmetrical, so the two equal bond dipoles point in opposite directions and cancel.",
      "Carbon dioxide has no covalent bonds, so it cannot have a dipole.",
    ],
    answer: 2,
    hint: "A polar bond does not guarantee a polar molecule; consider the shape and whether dipoles cancel.",
    explanation:
      "Carbon dioxide is linear and symmetrical. The two polar C=O bond dipoles are equal and opposite, so they cancel and the molecule has no overall dipole.",
  },
];
var scienceLabBondingState = {
  level: 0,
  atoms: [],
  transfers: 0,
  bondProgress: [],
  selectedElectron: null,
  selectedAnswer: -1,
  phase: "build",
  solved: false,
  message: "",
  rewarded: false,
};
var scienceLabStates = {
  physics: {
    angle: 45,
    speed: 18,
    target: 32,
    flight: null,
    progress: 0,
    animating: false,
    frameStart: null,
    frameId: null,
    result: null,
    message: "Tune the arc, then launch.",
    roundComplete: false,
    rewarded: false,
  },
  chemistry: {
    temperature: 500,
    concentration: 8,
    catalyst: false,
    particles: null,
    products: 0,
    collisions: 0,
    simTime: 0,
    running: false,
    paused: false,
    finished: false,
    lastFrame: null,
    frameId: null,
    message: "Set your conditions, then run the reaction.",
    rewarded: false,
  },
  biology: {
    mission: "oxygen",
    route: "",
    selected: 0,
    sourceCount: 6,
    sourceIds: [0, 1, 2, 3, 4, 5],
    transferred: 0,
    animating: false,
    animation: null,
    frameId: null,
    message: "Choose a route, then tap a molecule in the outside fluid.",
  },
};
function scienceLabEscape(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function scienceLabReadStats() {
  var all = {};
  try {
    all = JSON.parse(localStorage.getItem("ial-games") || "{}");
  } catch (e) {
    all = {};
  }
  var s = all.interactiveLabs || {};
  return {
    physics: s.physics || { attempts: 0, wins: 0 },
    chemistry: s.chemistry || { attempts: 0, wins: 0 },
    biology: s.biology || { attempts: 0, wins: 0 },
    bonding: s.bonding || { attempts: 0, wins: 0 },
    awarded: s.awarded || {},
  };
}
function scienceLabSaveStats(stats) {
  var all = {};
  try {
    all = JSON.parse(localStorage.getItem("ial-games") || "{}");
  } catch (e) {
    all = {};
  }
  all.interactiveLabs = stats;
  try {
    localStorage.setItem("ial-games", JSON.stringify(all));
  } catch (e) {}
}
function scienceLabTrack(id, success) {
  var s = scienceLabReadStats();
  s[id].attempts = (Number(s[id].attempts) || 0) + 1;
  if (success) s[id].wins = (Number(s[id].wins) || 0) + 1;
  scienceLabSaveStats(s);
  return s[id];
}
function scienceLabAward(id, state) {
  if (state.rewarded) return;
  state.rewarded = true;
  var s = scienceLabReadStats(),
    first = !s.awarded[id];
  s.awarded[id] = true;
  scienceLabSaveStats(s);
  if (typeof addXP === "function") addXP(first ? 12 : 3);
  if (typeof toast === "function")
    toast(
      first
        ? "Interactive lab cleared! +12 XP ⚡"
        : "Lab replay cleared! +3 XP ⚡",
    );
}
function scienceLabIsRoute() {
  return /^#\/games\/lab(?:\/|$)/.test(location.hash || "");
}
function scienceLabCurrentSubject() {
  var p = (location.hash || "#/games/lab").replace(/^#\//, "").split("/");
  return p[0] === "games" && p[1] === "lab" && SCIENCE_LAB_SUBJECTS[p[2]]
    ? p[2]
    : null;
}
function scienceLabCanvas(id, width, height) {
  var canvas = document.getElementById(id);
  if (!canvas || !canvas.getContext) return null;
  var ctx = canvas.getContext("2d");
  if (!ctx) return null;
  var dpr = Math.min((window && window.devicePixelRatio) || 1, 2);
  if (canvas.width !== Math.round(width * dpr))
    canvas.width = Math.round(width * dpr);
  if (canvas.height !== Math.round(height * dpr))
    canvas.height = Math.round(height * dpr);
  if (ctx.setTransform) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  var rect = canvas.getBoundingClientRect
    ? canvas.getBoundingClientRect()
    : null;
  return {
    canvas: canvas,
    ctx: ctx,
    w: width,
    h: height,
    scale: rect && rect.width ? rect.width / width : 1,
  };
}
function scienceLabCanvasFont(g, size, weight, family) {
  var scale = Math.max(0.28, Math.min(2.5, g.scale || 1));
  return (
    (weight ? weight + " " : "") + (size / scale).toFixed(1) + "px " + family
  );
}
function scienceLabCircle(ctx, x, y, r, fill, stroke) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}
function scienceLabSetText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text;
}
function scienceLabHeaderMarkup(id) {
  var meta = SCIENCE_LAB_SUBJECTS[id],
    tabs = ["physics", "chemistry", "biology"]
      .map(function (sid) {
        var item = SCIENCE_LAB_SUBJECTS[sid];
        return (
          "<button type='button' class='lab-subject-tab" +
          (sid === id ? " active" : "") +
          "' onclick=\"go('games/lab/" +
          sid +
          "')\" aria-pressed='" +
          (sid === id) +
          "'>" +
          item.icon +
          " <span>" +
          item.label +
          "</span></button>"
        );
      })
      .join("");
  return (
    "<div class='lab-subject-tabs' role='group' aria-label='Choose an interactive science lab'>" +
    tabs +
    "</div><header class='games-heading lab-page-heading'><div><button class='games-back-link' onclick=\"go('games')\">← All science games</button><div class='book-eyebrow'>INTERACTIVE LAB · " +
    meta.label +
    " · FIRST PLAYABLE PROTOTYPE</div><h1>" +
    meta.icon +
    " " +
    meta.title +
    "</h1><p>" +
    meta.intro +
    "</p></div><div class='lab-top-goal'><span>MISSION</span><b>" +
    meta.goal +
    "</b></div></header>"
  );
}
function scienceLabShowcase() {
  var cards = [
    "<article class='interactive-lab-card lab-card-physics'><div class='lab-card-art'><svg viewBox='0 0 360 155' aria-hidden='true'><rect width='360' height='155' fill='#dbe8df'/><circle cx='306' cy='34' r='18' fill='#e5b964'/><path d='M0 119H360V155H0Z' fill='#789579'/><circle cx='35' cy='117' r='10' fill='#263e32'/><ellipse cx='300' cy='119' rx='15' ry='6' fill='#72583c'/><path d='M300 118V75' stroke='#b7613d' stroke-width='3'/><path d='M300 75h24l-10 9h-14' fill='#d79b59'/><path d='M32 133h4m16 0h4m16 0h4m16 0h4m16 0h4' stroke='#f5f0e5' stroke-width='2'/></svg><span class='lab-art-tag'>AIM · POWER · LAUNCH</span></div><div class='lab-card-copy'><div class='lab-card-kicker'>⚛️ PHYSICS · MOTION</div><h3>Hit the landing zone</h3><p>Set angle and speed, estimate the landing point on paper, then launch to reveal the flight path and result.</p><button type='button' onclick=\"go('games/lab/physics')\">Play the motion lab <span>→</span></button></div></article>",
    "<article class='interactive-lab-card lab-card-chemistry'><div class='lab-card-art'><svg viewBox='0 0 360 155' aria-hidden='true'><rect width='360' height='155' fill='#f0e8d8'/><path d='M110 25h142M136 25v18l-36 82q-6 13 10 13h143q16 0 10-13l-36-82V25' fill='#fffdf7' stroke='#687b65' stroke-width='4' stroke-linejoin='round'/><path d='M119 102q42-15 81 0t68 0l10 24H109Z' fill='#dce9dd'/><circle cx='138' cy='81' r='12' fill='#517b8b'/><circle cx='177' cy='111' r='12' fill='#c37c3c'/><circle cx='217' cy='78' r='12' fill='#517b8b'/><circle cx='243' cy='110' r='12' fill='#c37c3c'/><text x='138' y='85' text-anchor='middle' font-size='10' font-family='sans-serif' fill='white'>A</text><text x='243' y='114' text-anchor='middle' font-size='10' font-family='sans-serif' fill='white'>B</text><path d='M160 72h44' stroke='#52634c' stroke-width='3'/><path d='m197 65 9 7-9 7' fill='none' stroke='#52634c' stroke-width='3'/><circle cx='300' cy='42' r='8' fill='#d79b59'/><circle cx='326' cy='59' r='6' fill='#71866b'/><circle cx='291' cy='75' r='5' fill='#bd7c3c'/></svg><span class='lab-art-tag'>ADJUST · RUN · OBSERVE</span></div><div class='lab-card-copy'><div class='lab-card-kicker'>⚗️ CHEMISTRY · REACTIONS</div><h3>Make the collisions count</h3><p>Change temperature, concentration or catalyst. Watch particles collide and see which ones react.</p><button type='button' onclick=\"go('games/lab/chemistry')\">Play the collision lab <span>→</span></button></div></article>",
    "<article class='interactive-lab-card lab-card-biology'><div class='lab-card-art'><svg viewBox='0 0 360 155' aria-hidden='true'><rect width='360' height='155' fill='#e1eadf'/><path d='M0 0h157v155H0Z' fill='#e9efe4'/><path d='M202 0h158v155H202Z' fill='#d4e2d2'/><path d='M161 0v155M199 0v155' stroke='#688565' stroke-width='7'/><path d='M180 0v155' stroke='#dac48d' stroke-width='5' stroke-dasharray='6 7'/><rect x='163' y='53' width='34' height='39' rx='15' fill='#365c4a'/><rect x='172' y='58' width='16' height='28' rx='8' fill='#eff2dd'/><circle cx='70' cy='51' r='10' fill='#527f8c'/><text x='70' y='55' text-anchor='middle' font-size='9' font-family='sans-serif' fill='white'>O₂</text><circle cx='118' cy='98' r='10' fill='#bd7c3c'/><text x='118' y='102' text-anchor='middle' font-size='9' font-family='sans-serif' fill='white'>G</text><path d='M85 50h67m-9-7 9 7-9 7' stroke='#45654f' stroke-width='3' fill='none'/><circle cx='243' cy='77' r='29' fill='#a9c49f'/><circle cx='243' cy='77' r='13' fill='#708f77'/><circle cx='307' cy='43' r='8' fill='#72749a'/></svg><span class='lab-art-tag'>CHOOSE · MOVE · DELIVER</span></div><div class='lab-card-copy'><div class='lab-card-kicker'>🧬 BIOLOGY · CELL TRANSPORT</div><h3>Run the membrane mission</h3><p>Pick oxygen, glucose or potassium. Choose a route and move each molecule through the membrane.</p><button type='button' onclick=\"go('games/lab/biology')\">Play the cell mission <span>→</span></button></div></article>",
  ];
  cards.push(
    "<article class='interactive-lab-card lab-card-bonding'><div class='lab-card-art'><svg viewBox='0 0 360 155' aria-hidden='true'><rect width='360' height='155' fill='#f0e8d8'/><circle cx='180' cy='78' r='50' fill='none' stroke='#839780' stroke-width='3'/><circle cx='180' cy='78' r='27' fill='#dbe7d8' stroke='#58745b' stroke-width='3'/><text x='180' y='85' text-anchor='middle' font-size='24' font-family='Georgia,serif' fill='#2e5540'>O</text><circle cx='180' cy='28' r='7' fill='#bd7c3c'/><circle cx='143' cy='113' r='7' fill='#bd7c3c'/><circle cx='217' cy='113' r='7' fill='#517b8b'/><circle cx='143' cy='43' r='7' fill='#517b8b'/><circle cx='217' cy='43' r='7' fill='#517b8b'/><path d='M72 78h45m-10-8 10 8-10 8' fill='none' stroke='#557254' stroke-width='3'/><circle cx='60' cy='78' r='15' fill='#f8f3e7' stroke='#b47d48' stroke-width='3'/><text x='60' y='83' text-anchor='middle' font-size='14' font-family='Georgia,serif' fill='#594534'>H</text><text x='287' y='70' text-anchor='middle' font-size='11' font-family='sans-serif' fill='#5f715d'>MOVE</text><text x='287' y='88' text-anchor='middle' font-size='11' font-family='sans-serif' fill='#5f715d'>OR SHARE</text></svg><span class='lab-art-tag'>MOVE · SHARE · EXPLAIN</span></div><div class='lab-card-copy'><div class='lab-card-kicker'>⚗️ CHEMISTRY · BONDING</div><h3>Build a stable structure</h3><p>Move or share outer electrons to build four bonding models, then use each structure to explain a property or molecular shape.</p><button type='button' onclick=\"go('games/lab/bonding')\">Play the bonding studio <span>→</span></button></div></article>",
  );
  return (
    "<section class='lab-showcase' aria-labelledby='lab-showcase-title'><div class='lab-showcase-heading'><div><span>THREE LABS + ONE TOPIC GAME · FIRST PROTOTYPE ROUND</span><h2 id='lab-showcase-title'>Controls in your hands. Science on screen.</h2><p>Adjust something. See what changes. Make a choice. These are the first visual game prototypes—bring a student and watch where they get stuck.</p></div><span class='lab-showcase-stamp'>PLAY<br>TEST<br>IMPROVE</span></div><div class='interactive-lab-grid'>" +
    cards.join("") +
    "</div></section>"
  );
}
function scienceLabCanvasHint(text) {
  return "<div class='lab-canvas-hint'><span>✦</span> " + text + "</div>";
}

/* PHYSICS — a live, directly controllable ideal projectile sandbox. */
function scienceLabPhysicsRange(angle, speed) {
  var rad = (angle * Math.PI) / 180,
    uy = speed * Math.sin(rad),
    ux = speed * Math.cos(rad),
    time = (2 * uy) / PROJECTILE_G;
  return {
    range: ux * time,
    time: time,
    height: (uy * uy) / (2 * PROJECTILE_G),
  };
}
function scienceLabPhysicsAdjust(kind, value) {
  var s = scienceLabStates.physics;
  if (s.roundComplete || s.animating) return;
  var n = Number(value);
  if (!isFinite(n)) return;
  if (kind === "angle") s.angle = n;
  else if (kind === "speed") s.speed = n;
  s.flight = null;
  s.result = null;
  s.message = "Controls set. Estimate the landing point, then launch to check.";
  scienceLabPhysicsSync();
  scienceLabDrawPhysics();
}
function scienceLabPhysicsReadout() {
  var s = scienceLabStates.physics;
  if (s.animating)
    return "<b>Ball in flight</b><span>The path and landing are revealed as the shot plays.</span>";
  if (!s.result)
    return "<b>Estimate before launch</b><span>Use the controls and target to make your prediction. No path or landing point is shown yet.</span>";
  var gap = s.result.range - s.target;
  return (
    "Actual landing <b>" +
    s.result.range.toFixed(1) +
    " m</b><span>Target " +
    s.target.toFixed(1) +
    " m · " +
    (gap >= 0 ? "long" : "short") +
    " by " +
    Math.abs(gap).toFixed(1) +
    " m</span>"
  );
}
function scienceLabPhysicsSync() {
  var s = scienceLabStates.physics,
    r = scienceLabPhysicsRange(s.angle, s.speed),
    stats = scienceLabReadStats().physics;
  scienceLabSetText("labAngleValue", Math.round(s.angle) + "°");
  scienceLabSetText("labSpeedValue", s.speed.toFixed(1) + " m/s");
  scienceLabSetText(
    "labFlightTime",
    s.result ? s.result.time.toFixed(2) + " s" : "—",
  );
  scienceLabSetText(
    "labFlightHeight",
    s.result ? s.result.height.toFixed(1) + " m" : "—",
  );
  var live = document.getElementById("labPhysicsLive");
  if (live) live.innerHTML = scienceLabPhysicsReadout();
  scienceLabSetText("labPhysicsStatus", s.message);
  scienceLabSetText("labPhysicsAttempts", String(stats.attempts || 0));
  scienceLabSetText("labPhysicsWins", String(stats.wins || 0));
  var launch = document.getElementById("labPhysicsLaunch");
  if (launch) launch.disabled = s.animating || s.roundComplete;
  var angle = document.getElementById("labAngleControl"),
    speed = document.getElementById("labSpeedControl");
  if (angle) angle.disabled = s.roundComplete || s.animating;
  if (speed) speed.disabled = s.roundComplete || s.animating;
  var badge = document.getElementById("labPhysicsBadge");
  if (badge)
    badge.textContent = s.roundComplete
      ? "TARGET HIT"
      : s.animating
        ? "BALL IN FLIGHT"
        : s.result
          ? "SHOT COMPLETE"
          : "READY TO LAUNCH";
  return r;
}
function scienceLabDrawPhysics() {
  var g = scienceLabCanvas("labPhysicsCanvas", 920, 400);
  if (!g) return;
  var c = g.ctx,
    w = g.w,
    h = g.h,
    s = scienceLabStates.physics;
  c.clearRect(0, 0, w, h);
  c.fillStyle = "#dce8e3";
  c.fillRect(0, 0, w, h);
  c.fillStyle = "#edf1e6";
  c.fillRect(0, 0, w, 232);
  scienceLabCircle(c, 794, 55, 21, "#e7bc68");
  c.fillStyle = "#c8d8c4";
  c.beginPath();
  c.moveTo(0, 246);
  c.lineTo(95, 192);
  c.lineTo(170, 237);
  c.lineTo(260, 185);
  c.lineTo(358, 246);
  c.lineTo(475, 197);
  c.lineTo(594, 244);
  c.lineTo(700, 202);
  c.lineTo(825, 244);
  c.lineTo(920, 208);
  c.lineTo(920, 330);
  c.lineTo(0, 330);
  c.closePath();
  c.fill();
  var ground = 326,
    left = 76,
    world = 55,
    plot = 760,
    xScale = plot / world,
    yScale = 10.7;
  c.fillStyle = "#718d6c";
  c.fillRect(0, ground, w, h - ground);
  c.fillStyle = "#8aa176";
  c.fillRect(0, ground, w, 8);
  c.strokeStyle = "#405b44";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(0, ground);
  c.lineTo(w, ground);
  c.stroke();
  c.font = scienceLabCanvasFont(g, 11, "", "'DM Mono',monospace");
  c.textAlign = "center";
  c.fillStyle = "#4d6554";
  for (var mark = 0; mark <= 50; mark += 5) {
    var mx = left + mark * xScale;
    c.strokeStyle = "rgba(45,72,52,.23)";
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(mx, ground + 8);
    c.lineTo(mx, ground + 18);
    c.stroke();
    c.fillText(mark + " m", mx, ground + 31);
  }
  var targetX = left + s.target * xScale;
  c.fillStyle = "#624c36";
  c.beginPath();
  c.ellipse(targetX, ground - 1, 15, 6, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "#f7d58e";
  c.lineWidth = 2;
  c.beginPath();
  c.ellipse(targetX, ground - 1, 15, 6, 0, 0, Math.PI * 2);
  c.stroke();
  c.strokeStyle = "#9a553b";
  c.lineWidth = 3;
  c.beginPath();
  c.moveTo(targetX + 7, ground - 4);
  c.lineTo(targetX + 7, ground - 47);
  c.stroke();
  c.fillStyle = "#c77d4c";
  c.beginPath();
  c.moveTo(targetX + 7, ground - 47);
  c.lineTo(targetX + 34, ground - 39);
  c.lineTo(targetX + 7, ground - 31);
  c.closePath();
  c.fill();
  var flight = s.flight,
    angle = flight ? flight.angle : s.angle,
    speed = flight ? flight.speed : s.speed,
    calc = flight ? scienceLabPhysicsRange(angle, speed) : null;
  if (flight) {
    var samples = 54;
    c.strokeStyle = s.result && s.result.hit ? "#2d754a" : "#9d7045";
    c.lineWidth = 3;
    c.beginPath();
    for (var i = 0; i <= samples; i++) {
      var t = (calc.time * i) / samples,
        px = left + speed * Math.cos((angle * Math.PI) / 180) * t * xScale,
        py =
          ground -
          (speed * Math.sin((angle * Math.PI) / 180) * t -
            0.5 * PROJECTILE_G * t * t) *
            yScale;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.stroke();
  }
  var ballX = left,
    ballY = ground - 11;
  if (flight) {
    var t = calc.time * (s.animating ? s.progress : 1);
    ballX = left + speed * Math.cos((angle * Math.PI) / 180) * t * xScale;
    ballY =
      ground -
      (speed * Math.sin((angle * Math.PI) / 180) * t -
        0.5 * PROJECTILE_G * t * t) *
        yScale;
    if (ballY > ground - 11) ballY = ground - 11;
  }
  c.fillStyle = "rgba(39,58,43,.22)";
  c.beginPath();
  c.ellipse(left, ground - 2, 12, 3, 0, 0, Math.PI * 2);
  c.fill();
  scienceLabCircle(c, ballX, ballY, 11, "#d77e3d", "#fff5dc");
  scienceLabCircle(c, ballX - 3, ballY - 4, 3, "#ffe5a8");
  c.textAlign = "left";
  c.font = scienceLabCanvasFont(g, 12, "700", "'DM Mono',monospace");
  c.fillStyle = "#294b3a";
  c.fillText(flight ? "LAUNCHED PATH" : "COURSE MAP · PATH HIDDEN", 24, 24);
  c.font = scienceLabCanvasFont(g, 10, "", "'DM Sans',sans-serif");
  c.fillStyle = "#475b4d";
  c.fillText(
    flight
      ? "Ideal projectile model · no air resistance"
      : "Estimate on paper, then launch to reveal the flight",
    24,
    43,
  );
}
function scienceLabPhysicsFinish() {
  var s = scienceLabStates.physics;
  if (!s.animating) return;
  s.animating = false;
  s.frameId = null;
  s.progress = 1;
  var data = s.flight || {},
    hit = !!data.hit;
  s.result = {
    hit: hit,
    range: data.range,
    time: data.time,
    height: data.height,
    target: s.target,
    gap: data.range - s.target,
  };
  scienceLabTrack("physics", hit);
  if (hit) {
    s.roundComplete = true;
    s.message =
      "Bullseye! The landing marker is inside the target. Change one control and try a new target.";
    scienceLabAward("physics", s);
  } else {
    s.message =
      (data.range > s.target ? "Long shot" : "Short shot") +
      " — adjust the live controls and fire again.";
  }
  scienceLabPhysicsSync();
  scienceLabDrawPhysics();
}
function scienceLabPhysicsFrame(now) {
  var s = scienceLabStates.physics;
  if (!s.animating) return;
  if (s.frameStart == null) s.frameStart = now || Date.now();
  var elapsed = (now || Date.now()) - s.frameStart;
  s.progress = Math.max(0, Math.min(1, elapsed / 1250));
  scienceLabDrawPhysics();
  if (s.progress >= 1) scienceLabPhysicsFinish();
  else if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabPhysicsFrame);
  else scienceLabPhysicsFinish();
}
function scienceLabPhysicsLaunch() {
  var s = scienceLabStates.physics;
  if (s.animating || s.roundComplete) return;
  var r = scienceLabPhysicsRange(s.angle, s.speed),
    hit = Math.abs(r.range - s.target) <= 1.35;
  s.flight = {
    angle: s.angle,
    speed: s.speed,
    range: r.range,
    time: r.time,
    height: r.height,
    hit: hit,
  };
  s.result = null;
  s.progress = 0;
  s.animating = true;
  s.frameStart = null;
  s.message = "Ball in flight — watch the launched path unfold.";
  scienceLabPhysicsSync();
  if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabPhysicsFrame);
  else {
    scienceLabPhysicsFinish();
  }
}
function scienceLabPhysicsNewTarget() {
  var s = scienceLabStates.physics;
  if (s.frameId != null && typeof cancelAnimationFrame === "function")
    cancelAnimationFrame(s.frameId);
  s.frameId = null;
  s.angle = 45;
  s.speed = 18;
  s.target = Math.round((24 + Math.random() * 18) * 10) / 10;
  s.flight = null;
  s.progress = 0;
  s.animating = false;
  s.frameStart = null;
  s.result = null;
  s.roundComplete = false;
  s.rewarded = false;
  s.message = "New target! Tune angle and power, then launch.";
  if (typeof render === "function") render();
}
function scienceLabPhysicsMarkup() {
  var s = scienceLabStates.physics,
    stats = scienceLabReadStats().physics,
    disabled = s.roundComplete || s.animating;
  return (
    "<section class='games-hub science-lab-page'>" +
    scienceLabHeaderMarkup("physics") +
    "<div class='lab-play-layout'><section class='lab-stage-card'><div class='lab-stage-heading'><div><span>THE FLIGHT COURSE</span><b>Estimate first, then reveal the shot</b></div><span class='lab-live-badge' id='labPhysicsBadge'>READY TO LAUNCH</span></div><div class='lab-canvas-frame physics-frame'><canvas id='labPhysicsCanvas' width='920' height='400' role='img' aria-label='Projectile course with a launch point and target. The flight path and landing point stay hidden until launch.'>Projectile course showing the launch point and target. Use the angle and speed controls to plan a shot; launch to reveal its path and landing.</canvas></div><div class='lab-live-readout' id='labPhysicsLive'>" +
    scienceLabPhysicsReadout() +
    "</div><div class='lab-status-line' id='labPhysicsStatus' role='status' aria-live='polite'>" +
    scienceLabEscape(s.message) +
    "</div>" +
    scienceLabCanvasHint(
      "Predict the landing point before you launch. The course reveals the actual path only after the shot.",
    ) +
    "</section><aside class='lab-control-panel'><div class='lab-control-title'><span>YOUR CONTROLS</span><b>" +
    scienceLabEscape(SCIENCE_LAB_SUBJECTS.physics.goal) +
    "</b></div><div class='lab-target-chip'><span>🎯 TARGET ZONE</span><b>" +
    s.target.toFixed(1) +
    " m</b></div><label class='lab-slider-control' for='labAngleControl'><span>Launch angle <output id='labAngleValue'>" +
    Math.round(s.angle) +
    "°</output></span><input id='labAngleControl' type='range' min='15' max='75' step='1' value='" +
    s.angle +
    "' oninput=\"scienceLabPhysicsAdjust('angle',this.value)\" aria-label='Change launch angle'" +
    (disabled ? " disabled" : "") +
    "><small>15° <span>Arrow keys work when focused</span> 75°</small></label><label class='lab-slider-control' for='labSpeedControl'><span>Launch speed <output id='labSpeedValue'>" +
    s.speed.toFixed(1) +
    " m/s</output></span><input id='labSpeedControl' type='range' min='10' max='22' step='0.5' value='" +
    s.speed +
    "' oninput=\"scienceLabPhysicsAdjust('speed',this.value)\" aria-label='Change launch speed'" +
    (disabled ? " disabled" : "") +
    "><small>10 m/s <span>Low power</span> 22 m/s</small></label><div class='lab-physics-readout'><span>FLIGHT TIME</span><b id='labFlightTime'>—</b><span>MAXIMUM HEIGHT</span><b id='labFlightHeight'>—</b></div><div class='lab-action-stack'><button id='labPhysicsLaunch' class='btn btn-p lab-main-button' onclick='scienceLabPhysicsLaunch()'" +
    (disabled ? " disabled" : "") +
    ">⚾ Launch ball</button><button class='btn btn-g lab-secondary-button' onclick='scienceLabPhysicsNewTarget()'>↻ New target</button></div><p class='lab-control-note'>Ideal projectile model: level landing, no air resistance, and <b>g = 9.81 m s⁻²</b>.</p><details class='lab-explain'><summary>What changes with angle and speed?</summary><p>Changing angle changes both horizontal and vertical components; changing speed changes the size of both. The launched path follows constant-acceleration motion with <b>g = 9.81 m s⁻²</b>, level launch and landing, and no air resistance. Flight measurements appear only after the shot.</p></details><div class='lab-mini-stats'><span>LAUNCHES <b id='labPhysicsAttempts'>" +
    stats.attempts +
    "</b></span><span>BULLSEYES <b id='labPhysicsWins'>" +
    stats.wins +
    "</b></span></div></aside></div></section>"
  );
}

/* CHEMISTRY — qualitative collision-theory particle simulation with real controls. */
function scienceLabChemMakeParticles() {
  var s = scienceLabStates.chemistry,
    parts = [],
    base = 59 * Math.sqrt(s.temperature / 300),
    r = 12;
  ["A", "B"].forEach(function (kind) {
    for (var i = 0; i < s.concentration; i++) {
      var x = 75 + Math.random() * 710,
        y = 95 + Math.random() * 205,
        tries = 0;
      while (
        tries < 30 &&
        parts.some(function (p) {
          var dx = p.x - x,
            dy = p.y - y;
          return dx * dx + dy * dy < (2 * r + 3) * (2 * r + 3);
        })
      ) {
        x = 75 + Math.random() * 710;
        y = 95 + Math.random() * 205;
        tries++;
      }
      var theta = Math.random() * Math.PI * 2,
        v = base * (0.55 + Math.random() * 0.9);
      parts.push({
        kind: kind,
        x: x,
        y: y,
        vx: Math.cos(theta) * v,
        vy: Math.sin(theta) * v,
        r: r,
      });
    }
  });
  s.particles = parts;
  s.products = 0;
  s.collisions = 0;
  s.simTime = 0;
  s.rewarded = false;
  s.finished = false;
  s.running = false;
  s.paused = false;
  s.lastFrame = null;
  s.message = "Conditions set. Run the reaction and watch the collisions.";
}
function scienceLabChemAdjust(kind, value) {
  var s = scienceLabStates.chemistry;
  if (s.running) return;
  if (kind === "temperature") s.temperature = Number(value);
  else if (kind === "concentration") s.concentration = Number(value);
  else if (kind === "catalyst") s.catalyst = !!value;
  scienceLabChemMakeParticles();
  scienceLabChemSync();
  scienceLabChemDraw();
}
function scienceLabChemCatalyst(value) {
  scienceLabChemAdjust("catalyst", value);
}
function scienceLabChemSync() {
  var s = scienceLabStates.chemistry;
  scienceLabSetText("labChemTemperature", Math.round(s.temperature) + " K");
  scienceLabSetText("labChemConcentration", String(s.concentration) + " each");
  scienceLabSetText("labChemProducts", s.products + " / 5");
  scienceLabSetText("labChemCollisions", String(s.collisions));
  scienceLabSetText(
    "labChemClock",
    Math.max(0, 12 - s.simTime).toFixed(1) + " s",
  );
  scienceLabSetText("labChemStatus", s.message);
  scienceLabSetText(
    "labChemBadge",
    s.finished
      ? s.products >= 5
        ? "MISSION CLEARED"
        : "RUN COMPLETE"
      : s.running
        ? "REACTION RUNNING"
        : s.paused
          ? "PAUSED"
          : "READY TO MIX",
  );
  var run = document.getElementById("labChemRun"),
    stats = scienceLabReadStats().chemistry;
  if (run) {
    run.textContent = s.running
      ? "⏸ Pause reaction"
      : s.paused
        ? "▶ Resume reaction"
        : s.finished
          ? "↻ Run it again"
          : "▶ Run reaction";
  }
  scienceLabSetText("labChemAttempts", String(stats.attempts || 0));
  scienceLabSetText("labChemWins", String(stats.wins || 0));
  ["labChemTempControl", "labChemConcControl", "labChemCatalyst"].forEach(
    function (id) {
      var el = document.getElementById(id);
      if (el) el.disabled = s.running;
    },
  );
  var temp = document.getElementById("labChemTempControl"),
    conc = document.getElementById("labChemConcControl"),
    cat = document.getElementById("labChemCatalyst");
  if (temp) temp.value = s.temperature;
  if (conc) conc.value = s.concentration;
  if (cat) cat.checked = s.catalyst;
}
function scienceLabChemResolveCollisions(s) {
  var parts = s.particles || [],
    barrier = s.catalyst ? 4200 : 11200;
  for (var i = 0; i < parts.length; i++) {
    var a = parts[i],
      consumed = false;
    if (a.kind === "P") continue;
    for (var j = i + 1; j < parts.length; j++) {
      var b = parts[j];
      if (b.kind === "P" || a.kind === b.kind) continue;
      var dx = a.x - b.x,
        dy = a.y - b.y,
        dist = Math.sqrt(dx * dx + dy * dy),
        minDist = a.r + b.r;
      if (dist >= minDist) continue;
      if (dist < 0.001) {
        dx = 0.01;
        dist = 0.01;
      }
      var nx = dx / dist,
        ny = dy / dist,
        rvx = a.vx - b.vx,
        rvy = a.vy - b.vy,
        normal = rvx * nx + rvy * ny;
      if (normal >= 0) continue;
      s.collisions++;
      var energy = rvx * rvx + rvy * rvy;
      if (energy >= barrier) {
        var midx = (a.x + b.x) / 2,
          midy = (a.y + b.y) / 2,
          p = {
            kind: "P",
            x: midx,
            y: midy,
            vx: (a.vx + b.vx) / 2,
            vy: (a.vy + b.vy) / 2,
            r: 14,
          };
        parts.splice(j, 1);
        parts.splice(i, 1);
        parts.push(p);
        s.products++;
        consumed = true;
        break;
      }
      var impulse = -normal;
      a.vx += impulse * nx;
      a.vy += impulse * ny;
      b.vx -= impulse * nx;
      b.vy -= impulse * ny;
      var overlap = minDist - dist + 0.5;
      a.x += (nx * overlap) / 2;
      a.y += (ny * overlap) / 2;
      b.x -= (nx * overlap) / 2;
      b.y -= (ny * overlap) / 2;
    }
    if (consumed) i = -1;
  }
  s.particles = parts;
}
function scienceLabChemAdvance(s, dt) {
  var parts = s.particles || [];
  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.x - p.r < 55) {
      p.x = 55 + p.r;
      p.vx = Math.abs(p.vx);
    }
    if (p.x + p.r > 805) {
      p.x = 805 - p.r;
      p.vx = -Math.abs(p.vx);
    }
    if (p.y - p.r < 82) {
      p.y = 82 + p.r;
      p.vy = Math.abs(p.vy);
    }
    if (p.y + p.r > 315) {
      p.y = 315 - p.r;
      p.vy = -Math.abs(p.vy);
    }
  }
  scienceLabChemResolveCollisions(s);
  s.simTime = Math.min(12, s.simTime + dt);
}
function scienceLabChemDraw() {
  var g = scienceLabCanvas("labChemCanvas", 860, 380);
  if (!g) return;
  var c = g.ctx,
    s = scienceLabStates.chemistry;
  c.clearRect(0, 0, g.w, g.h);
  c.fillStyle = "#f1eadb";
  c.fillRect(0, 0, g.w, g.h);
  c.fillStyle = "#fffdf7";
  c.fillRect(38, 62, 784, 275);
  c.fillStyle = "#e5eddf";
  c.fillRect(43, 83, 774, 248);
  c.strokeStyle = "#627a63";
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(37, 62);
  c.lineTo(37, 311);
  c.quadraticCurveTo(37, 339, 65, 339);
  c.lineTo(795, 339);
  c.quadraticCurveTo(823, 339, 823, 311);
  c.lineTo(823, 62);
  c.stroke();
  c.strokeStyle = "#94aa8b";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(32, 62);
  c.lineTo(828, 62);
  c.stroke();
  c.fillStyle = "#405b47";
  c.font = scienceLabCanvasFont(g, 12, "700", "'DM Mono',monospace");
  c.textAlign = "left";
  c.fillText("A + B COLLISION CHAMBER", 54, 34);
  c.font = scienceLabCanvasFont(g, 10, "", "'DM Sans',sans-serif");
  c.fillStyle = "#617062";
  c.fillText("Faster particles · successful collisions form AB", 54, 51);
  c.fillStyle = "#f5f0e5";
  c.fillRect(630, 91, 170, 55);
  c.strokeStyle = "#d7cebd";
  c.lineWidth = 1;
  c.strokeRect(630, 91, 170, 55);
  c.fillStyle = "#475c48";
  c.font = scienceLabCanvasFont(g, 9, "700", "'DM Mono',monospace");
  c.fillText("Ea BARRIER", 642, 108);
  c.fillStyle = s.catalyst ? "#698664" : "#b17a48";
  c.fillRect(642, 119, s.catalyst ? 55 : 112, 8);
  c.fillStyle = "#667263";
  c.font = scienceLabCanvasFont(g, 9, "", "'DM Sans',sans-serif");
  c.fillText(s.catalyst ? "lowered by catalyst" : "no catalyst", 642, 140);
  (s.particles || []).forEach(function (p) {
    var colour =
      p.kind === "A" ? "#4f7f8e" : p.kind === "B" ? "#bd7c3c" : "#607d56";
    if (c.save) c.save();
    c.shadowColor = colour;
    c.shadowBlur = 8;
    scienceLabCircle(c, p.x, p.y, p.r, colour, "#fff8e9");
    if (c.restore) c.restore();
    c.fillStyle = "#fff9ea";
    c.font = scienceLabCanvasFont(
      g,
      p.kind === "P" ? 9 : 10,
      "700",
      "'DM Mono',monospace",
    );
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(p.kind === "P" ? "AB" : p.kind, p.x, p.y + 0.5);
  });
  c.textBaseline = "alphabetic";
  c.textAlign = "left";
  c.fillStyle = "#465c49";
  c.font = scienceLabCanvasFont(g, 9, "", "'DM Mono',monospace");
  c.fillText("COLLISIONS " + s.collisions, 55, 365);
  c.fillText("PRODUCTS " + s.products + " / 5", 220, 365);
  c.fillText("MODEL · QUALITATIVE, NOT TO SCALE", 603, 365);
}
function scienceLabChemFinish() {
  var s = scienceLabStates.chemistry;
  if (s.finished) return;
  s.running = false;
  s.paused = false;
  s.finished = true;
  s.simTime = 12;
  var success = s.products >= 5;
  s.message = success
    ? "Five or more AB products! Compare again with one condition changed."
    : "Reaction window ended. Change one condition and run again; keep the others fixed to see what caused the difference.";
  scienceLabTrack("chemistry", success);
  if (success) scienceLabAward("chemistry", s);
  scienceLabChemSync();
  scienceLabChemDraw();
}
function scienceLabChemFrame(now) {
  var s = scienceLabStates.chemistry;
  if (!s.running) return;
  if (s.lastFrame == null) s.lastFrame = now;
  var dt = Math.max(0, Math.min(0.05, (now - s.lastFrame) / 1000)) * 2;
  s.lastFrame = now;
  if (dt > 0) scienceLabChemAdvance(s, dt);
  scienceLabChemSync();
  scienceLabChemDraw();
  if (s.simTime >= 12) {
    scienceLabChemFinish();
    return;
  }
  if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabChemFrame);
  else scienceLabChemFinish();
}
function scienceLabChemToggle() {
  var s = scienceLabStates.chemistry;
  if (s.running) {
    s.running = false;
    s.paused = true;
    s.lastFrame = null;
    s.message =
      "Reaction paused. Resume, or reset to compare a new set of conditions.";
    scienceLabChemSync();
    return;
  }
  if (s.finished) scienceLabChemMakeParticles();
  else if (!s.particles) scienceLabChemMakeParticles();
  s.running = true;
  s.paused = false;
  s.finished = false;
  s.lastFrame = null;
  s.message = "Reaction running. Watch the collision counter and AB products.";
  scienceLabChemSync();
  if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabChemFrame);
  else scienceLabChemFinish();
}
function scienceLabChemReset() {
  var s = scienceLabStates.chemistry;
  if (s.frameId != null && typeof cancelAnimationFrame === "function")
    cancelAnimationFrame(s.frameId);
  s.frameId = null;
  s.running = false;
  scienceLabChemMakeParticles();
  scienceLabChemSync();
  scienceLabChemDraw();
}
function scienceLabChemMarkup() {
  var s = scienceLabStates.chemistry,
    stats = scienceLabReadStats().chemistry;
  return (
    "<section class='games-hub science-lab-page'>" +
    scienceLabHeaderMarkup("chemistry") +
    "<div class='lab-play-layout'><section class='lab-stage-card'><div class='lab-stage-heading'><div><span>THE COLLISION CHAMBER</span><b>Follow the particles — not just the score</b></div><span class='lab-live-badge' id='labChemBadge'>READY TO MIX</span></div><div class='lab-canvas-frame chemistry-frame'><canvas id='labChemCanvas' width='860' height='380' role='img' aria-label='Animated particle chamber. Blue A and amber B particles move and collide; successful reactions form green AB products.'>Particle chamber: A and B particles move, collide, and may form AB products depending on the settings you choose.</canvas></div><div class='lab-chem-readouts'><div><span>TIME LEFT</span><b id='labChemClock'>12.0 s</b></div><div><span>COLLISIONS</span><b id='labChemCollisions'>0</b></div><div><span>PRODUCTS</span><b id='labChemProducts'>0 / 5</b></div></div><div class='lab-status-line' id='labChemStatus' role='status' aria-live='polite'>" +
    scienceLabEscape(s.message) +
    "</div>" +
    scienceLabCanvasHint(
      "A collision only reacts when particles meet with enough energy to overcome the activation barrier.",
    ) +
    "</section><aside class='lab-control-panel'><div class='lab-control-title'><span>SET THE CONDITIONS</span><b>" +
    SCIENCE_LAB_SUBJECTS.chemistry.goal +
    "</b></div><label class='lab-slider-control' for='labChemTempControl'><span>Temperature <output id='labChemTemperature'>" +
    s.temperature +
    " K</output></span><input id='labChemTempControl' type='range' min='220' max='900' step='10' value='" +
    s.temperature +
    "' oninput=\"scienceLabChemAdjust('temperature',this.value)\" aria-label='Set reaction temperature in kelvin'><small>220 K <span>Particle speed</span> 900 K</small></label><label class='lab-slider-control' for='labChemConcControl'><span>Concentration <output id='labChemConcentration'>" +
    s.concentration +
    " each</output></span><input id='labChemConcControl' type='range' min='4' max='14' step='1' value='" +
    s.concentration +
    "' oninput=\"scienceLabChemAdjust('concentration',this.value)\" aria-label='Set number of particles per species'><small>4 each <span>Particles in the same volume</span> 14 each</small></label><label class='lab-catalyst-toggle' for='labChemCatalyst'><input id='labChemCatalyst' type='checkbox' onchange='scienceLabChemCatalyst(this.checked)'" +
    (s.catalyst ? " checked" : "") +
    "><span><b>Add a catalyst</b><small>Lower the activation barrier without raising temperature</small></span></label><div class='lab-action-stack'><button id='labChemRun' class='btn btn-p lab-main-button' onclick='scienceLabChemToggle()'>▶ Run reaction</button><button class='btn btn-g lab-secondary-button' onclick='scienceLabChemReset()'>↻ Reset particles</button></div><details class='lab-explain' open><summary>What each control changes</summary><p><b>Temperature:</b> particles move faster; a greater fraction of collisions can have enough energy to react.</p><p><b>Concentration:</b> more particles share the same volume, so encounters happen more often.</p><p><b>Catalyst:</b> provides an alternative pathway with lower activation energy. It does not heat the mixture or change the equilibrium position.</p></details><div class='lab-mini-stats'><span>REACTION RUNS <b id='labChemAttempts'>" +
    stats.attempts +
    "</b></span><span>GOALS REACHED <b id='labChemWins'>" +
    stats.wins +
    "</b></span></div></aside></div></section>"
  );
}

/* BIOLOGY — choose a transport route, select a visible molecule, and move it. */
var SCIENCE_LAB_BIO_POSITIONS = [
  { x: 96, y: 132 },
  { x: 176, y: 192 },
  { x: 300, y: 122 },
  { x: 112, y: 284 },
  { x: 250, y: 278 },
  { x: 322, y: 205 },
];
var SCIENCE_LAB_BIO_INSIDE = [
  { x: 518, y: 130 },
  { x: 620, y: 176 },
  { x: 715, y: 119 },
  { x: 555, y: 287 },
  { x: 727, y: 280 },
];
function scienceLabBioMission() {
  return (
    SCIENCE_LAB_BIO_MISSIONS[scienceLabStates.biology.mission] ||
    SCIENCE_LAB_BIO_MISSIONS.oxygen
  );
}
function scienceLabBioSetMission(id) {
  if (!SCIENCE_LAB_BIO_MISSIONS[id]) return;
  var s = scienceLabStates.biology;
  if (s.frameId != null && typeof cancelAnimationFrame === "function")
    cancelAnimationFrame(s.frameId);
  s.frameId = null;
  s.mission = id;
  s.route = "";
  s.selected = 0;
  s.sourceCount = 6;
  s.sourceIds = [0, 1, 2, 3, 4, 5];
  s.transferred = 0;
  s.rewarded = false;
  s.animating = false;
  s.animation = null;
  s.message =
    "New mission: choose the right route, then select an outside molecule.";
  if (typeof render === "function") render();
}
function scienceLabBioChooseRoute(route) {
  if (
    !SCIENCE_LAB_ROUTE_OPTIONS.some(function (x) {
      return x.id === route;
    })
  )
    return;
  var s = scienceLabStates.biology;
  if (s.animating || s.transferred >= scienceLabBioMission().goal) return;
  s.route = route;
  s.message = "";
  SCIENCE_LAB_ROUTE_OPTIONS.forEach(function (x) {
    var b = document.getElementById("bioRoute-" + x.id);
    if (b) {
      if (b.classList) b.classList.toggle("selected", x.id === route);
      if (b.setAttribute)
        b.setAttribute("aria-pressed", String(x.id === route));
    }
  });
  scienceLabSetText(
    "labBioStatus",
    "Route selected: " +
      (
        SCIENCE_LAB_ROUTE_OPTIONS.find(function (x) {
          return x.id === route;
        }) || {}
      ).name +
      ". Now tap an outside molecule.",
  );
  scienceLabDrawBiology();
}
function scienceLabBioSelectNext() {
  var s = scienceLabStates.biology;
  if (s.animating || s.sourceCount <= 0) return;
  s.selected = s.selected == null ? 0 : (s.selected + 1) % s.sourceCount;
  scienceLabSetText(
    "labBioStatus",
    "Molecule " + (s.selected + 1) + " selected. Send it through the membrane.",
  );
  scienceLabDrawBiology();
}
function scienceLabBioCanvasClick(event) {
  var s = scienceLabStates.biology;
  if (s.animating || s.sourceCount <= 0) return;
  var canvas = document.getElementById("labBioCanvas"),
    rect =
      canvas && canvas.getBoundingClientRect
        ? canvas.getBoundingClientRect()
        : null;
  if (!rect || !rect.width) return;
  var x = ((event.clientX - rect.left) * 860) / rect.width,
    y = ((event.clientY - rect.top) * 420) / rect.height;
  if (x > 408) {
    scienceLabSetText(
      "labBioStatus",
      "Choose a molecule in the outside fluid on the left first.",
    );
    return;
  }
  var best = -1,
    bestDist = Infinity;
  for (var i = 0; i < s.sourceCount; i++) {
    var p = SCIENCE_LAB_BIO_POSITIONS[s.sourceIds[i]],
      dx = p.x - x,
      dy = p.y - y,
      d = dx * dx + dy * dy;
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  if (best < 0 || bestDist > 85 * 85) {
    scienceLabSetText(
      "labBioStatus",
      "Tap one of the visible molecules in the outside fluid.",
    );
    return;
  }
  s.selected = best;
  scienceLabSetText(
    "labBioStatus",
    "Molecule " + (best + 1) + " selected. Send it through the membrane.",
  );
  scienceLabDrawBiology();
}
function scienceLabBioRouteY(route) {
  return route === "simple"
    ? 93
    : route === "channel"
      ? 155
      : route === "carrier"
        ? 235
        : 316;
}
function scienceLabDrawBiology() {
  var g = scienceLabCanvas("labBioCanvas", 860, 420);
  if (!g) return;
  var c = g.ctx,
    s = scienceLabStates.biology,
    m = scienceLabBioMission(),
    mem = 414;
  c.clearRect(0, 0, g.w, g.h);
  c.fillStyle = "#e7e6d5";
  c.fillRect(0, 0, g.w, g.h);
  c.fillStyle = "#edf0e4";
  c.fillRect(0, 0, mem - 8, g.h);
  c.fillStyle = "#dce8d9";
  c.fillRect(mem + 9, 0, g.w - mem - 9, g.h);
  c.fillStyle = "#3c5543";
  c.font = scienceLabCanvasFont(g, 11, "700", "'DM Mono',monospace");
  c.textAlign = "left";
  c.fillText("OUTSIDE THE CELL · " + m.outside, 25, 27);
  c.textAlign = "right";
  c.fillText("CYTOPLASM · " + m.inside, 835, 27);
  c.textAlign = "left";
  c.fillStyle = "#788476";
  c.font = scienceLabCanvasFont(g, 9, "", "'DM Sans',sans-serif");
  c.fillText("High-volume reservoir", 25, 44);
  c.textAlign = "right";
  c.fillText("High-volume reservoir", 835, 44);
  c.fillStyle = "#b9cdb1";
  c.beginPath();
  c.ellipse(650, 218, 152, 150, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = "#9eb396";
  c.lineWidth = 2;
  c.stroke();
  c.fillStyle = "#94ad91";
  c.beginPath();
  c.ellipse(646, 224, 48, 42, 0.3, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "#617d67";
  c.font = scienceLabCanvasFont(g, 9, "", "'DM Sans',sans-serif");
  c.textAlign = "center";
  c.fillText("cell interior", 648, 229);
  c.fillStyle = "#8d9f7c";
  c.fillRect(mem - 10, 0, 20, g.h);
  c.fillStyle = "#d5c18f";
  c.fillRect(mem - 4, 0, 8, g.h);
  c.fillStyle = "#526b51";
  for (var py = 18; py < 420; py += 33) {
    scienceLabCircle(c, mem - 10, py, 7, "#789276");
    scienceLabCircle(c, mem + 10, py, 7, "#789276");
  }
  var ports = [
    { id: "channel", y: 155, color: "#4f7868" },
    { id: "carrier", y: 235, color: "#916d48" },
    { id: "pump", y: 316, color: "#586b88" },
  ];
  ports.forEach(function (p) {
    var active = s.route === p.id;
    c.fillStyle = active ? p.color : "#83927f";
    c.strokeStyle = active ? "#fff6df" : "#f4efe1";
    c.lineWidth = 2;
    c.beginPath();
    c.roundRect
      ? c.roundRect(mem - 19, p.y - 24, 38, 48, 14)
      : c.rect(mem - 19, p.y - 24, 38, 48);
    c.fill();
    c.stroke();
    c.fillStyle = "#f7f0dd";
    c.fillRect(mem - 6, p.y - 17, 12, 34);
  });
  c.strokeStyle = s.route === "simple" ? "#b9703d" : "#a58c61";
  c.lineWidth = s.route === "simple" ? 4 : 2;
  c.setLineDash(s.route === "simple" ? [] : [3, 5]);
  c.beginPath();
  c.moveTo(mem - 44, 93);
  c.lineTo(mem + 44, 93);
  c.stroke();
  c.setLineDash([]);
  c.fillStyle = "#526b51";
  c.font = scienceLabCanvasFont(g, 8, "", "'DM Mono',monospace");
  c.textAlign = "center";
  c.fillText("BILAYER", mem, 17);
  c.fillText("CHANNEL", mem, 130);
  c.fillText("CARRIER", mem, 210);
  c.fillText("ATP PUMP", mem, 291);
  var sourceLabel = m.symbol;
  for (var i = 0; i < s.sourceCount; i++) {
    var src = SCIENCE_LAB_BIO_POSITIONS[s.sourceIds[i]];
    if (s.animating && s.animation && s.animation.sourceIndex === i) continue;
    if (i === s.selected && s.sourceCount > 0) {
      c.strokeStyle = "#d4813e";
      c.lineWidth = 3;
      scienceLabCircle(c, src.x, src.y, 18, null, "#c77b42");
    }
    scienceLabCircle(c, src.x, src.y, 12, m.colour, "#fff7df");
    c.fillStyle = "#fff9ed";
    c.font = scienceLabCanvasFont(g, 8, "700", "'DM Mono',monospace");
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(sourceLabel, src.x, src.y + 0.5);
  }
  for (var j = 0; j < Math.min(5, s.transferred + 2); j++) {
    var dst = SCIENCE_LAB_BIO_INSIDE[j];
    scienceLabCircle(
      c,
      dst.x,
      dst.y,
      11,
      j < s.transferred ? m.colour : "#95a78c",
      "#f7f1df",
    );
    c.fillStyle = "#fff9ed";
    c.font = scienceLabCanvasFont(g, 8, "700", "'DM Mono',monospace");
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(j < s.transferred ? sourceLabel : "·", dst.x, dst.y + 0.5);
  }
  c.textBaseline = "alphabetic";
  c.fillStyle = "#3f5947";
  c.font = scienceLabCanvasFont(g, 10, "700", "'DM Mono',monospace");
  c.textAlign = "left";
  c.fillText("SELECT A SOURCE MOLECULE", 25, 390);
  c.textAlign = "right";
  c.fillText("DELIVERED " + s.transferred + " / " + m.goal, 835, 390);
  if (s.animating && s.animation) {
    var a = s.animation,
      p = a.progress,
      start = SCIENCE_LAB_BIO_POSITIONS[s.sourceIds[a.sourceIndex]],
      endX = a.correct ? mem + 86 : mem - 23,
      routeY = scienceLabBioRouteY(a.route),
      x,
      y;
    if (a.correct) {
      x = start.x + (endX - start.x) * p;
      y = start.y + (routeY - start.y) * Math.min(1, p * 1.7);
    } else if (p < 0.55) {
      var q = p / 0.55;
      x = start.x + (mem - 23 - start.x) * q;
      y = start.y + (routeY - start.y) * q;
    } else {
      var q2 = (p - 0.55) / 0.45;
      x = mem - 23 - (mem - 23 - start.x) * q2;
      y = routeY + (start.y - routeY) * q2;
    }
    c.strokeStyle = a.correct ? m.colour : "#b46948";
    c.lineWidth = 3;
    c.setLineDash([4, 5]);
    c.beginPath();
    c.moveTo(start.x, start.y);
    c.lineTo(x, y);
    c.stroke();
    c.setLineDash([]);
    scienceLabCircle(c, x, y, 14, m.colour, "#fff4d8");
    c.fillStyle = "#fff9ed";
    c.font = scienceLabCanvasFont(g, 8, "700", "'DM Mono',monospace");
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(sourceLabel, x, y + 0.5);
    c.textBaseline = "alphabetic";
  }
}
function scienceLabBioFinish() {
  var s = scienceLabStates.biology,
    a = s.animation;
  if (!s.animating || !a) return;
  s.animating = false;
  s.animation = null;
  s.frameId = null;
  if (a.correct) {
    s.transferred++;
    s.sourceIds.splice(a.sourceIndex, 1);
    s.sourceCount = s.sourceIds.length;
    s.selected = s.sourceCount
      ? Math.min(a.sourceIndex, s.sourceCount - 1)
      : null;
    var m = scienceLabBioMission(),
      complete = s.transferred >= m.goal;
    scienceLabTrack("biology", complete);
    if (complete) {
      s.message = "Mission complete! " + m.explain;
      scienceLabAward("biology", s);
    } else
      s.message =
        "Correct route. Molecule delivered: " +
        s.transferred +
        " of " +
        m.goal +
        ". " +
        m.explain;
    scienceLabSetText("labBioStatus", s.message);
  } else {
    scienceLabTrack("biology", false);
    s.message = scienceLabBioMission().wrong;
    scienceLabSetText("labBioStatus", s.message);
  }
  scienceLabSetText(
    "labBioAttempts",
    String(scienceLabReadStats().biology.attempts || 0),
  );
  scienceLabSetText(
    "labBioWins",
    String(scienceLabReadStats().biology.wins || 0),
  );
  scienceLabSetText(
    "labBioBadge",
    s.transferred + " / " + scienceLabBioMission().goal + " DELIVERED",
  );
  scienceLabDrawBiology();
  var send = document.getElementById("labBioSend");
  if (send) send.disabled = s.transferred >= scienceLabBioMission().goal;
}
function scienceLabBioFrame(now) {
  var s = scienceLabStates.biology;
  if (!s.animating || !s.animation) return;
  var a = s.animation;
  if (a.start == null) a.start = now || Date.now();
  a.progress = Math.max(0, Math.min(1, ((now || Date.now()) - a.start) / 880));
  scienceLabDrawBiology();
  if (a.progress >= 1) scienceLabBioFinish();
  else if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabBioFrame);
  else scienceLabBioFinish();
}
function scienceLabBioSend() {
  var s = scienceLabStates.biology,
    m = scienceLabBioMission();
  if (s.animating || s.transferred >= m.goal) return;
  if (!s.route) {
    scienceLabSetText(
      "labBioStatus",
      "Choose a transport route first, then select a molecule.",
    );
    return;
  }
  if (s.selected == null || s.selected >= s.sourceCount) {
    scienceLabSetText(
      "labBioStatus",
      "Select an outside molecule first; tap one or use the Select molecule button.",
    );
    return;
  }
  var correct = s.route === m.route,
    route = s.route,
    sourceIndex = s.selected;
  s.animating = true;
  s.message = "Transport in progress…";
  s.animation = {
    route: route,
    correct: correct,
    sourceIndex: sourceIndex,
    progress: 0,
    start: null,
  };
  scienceLabSetText(
    "labBioStatus",
    correct
      ? "The molecule is travelling through the selected route…"
      : "The molecule is testing the membrane barrier…",
  );
  var send = document.getElementById("labBioSend");
  if (send) send.disabled = true;
  if (typeof requestAnimationFrame === "function")
    s.frameId = requestAnimationFrame(scienceLabBioFrame);
  else {
    scienceLabBioFinish();
  }
}
function scienceLabBioMarkup() {
  var s = scienceLabStates.biology,
    m = scienceLabBioMission(),
    stats = scienceLabReadStats().biology,
    missions = ["oxygen", "glucose", "water", "potassium"]
      .map(function (id) {
        var data = SCIENCE_LAB_BIO_MISSIONS[id];
        return (
          "<button type='button' class='lab-mission-tab" +
          (id === s.mission ? " active" : "") +
          "' onclick=\"scienceLabBioSetMission('" +
          id +
          "')\" aria-pressed='" +
          (id === s.mission) +
          "'><b>" +
          scienceLabEscape(data.symbol) +
          "</b><span>" +
          data.name +
          "</span></button>"
        );
      })
      .join("");
  var routes = SCIENCE_LAB_ROUTE_OPTIONS.map(function (r) {
    return (
      "<button type='button' id='bioRoute-" +
      r.id +
      "' class='bio-route-option" +
      (s.route === r.id ? " selected" : "") +
      "' onclick=\"scienceLabBioChooseRoute('" +
      r.id +
      "')\" aria-pressed='" +
      (s.route === r.id) +
      "'" +
      (s.animating || s.transferred >= m.goal ? " disabled" : "") +
      "><span class='bio-route-icon'>" +
      r.icon +
      "</span><span><b>" +
      r.name +
      "</b><small>" +
      r.detail +
      "</small></span></button>"
    );
  }).join("");
  return (
    "<section class='games-hub science-lab-page'>" +
    scienceLabHeaderMarkup("biology") +
    "<div class='lab-play-layout'><section class='lab-stage-card'><div class='lab-stage-heading'><div><span>CELL MEMBRANE CROSS-SECTION</span><b>Tap a visible molecule on the left to select it</b></div><span class='lab-live-badge' id='labBioBadge'>" +
    s.transferred +
    " / " +
    m.goal +
    " DELIVERED</span></div><div class='lab-canvas-frame biology-frame'><canvas id='labBioCanvas' width='860' height='420' role='img' tabindex='0' aria-label='Interactive cell membrane. Select one of the visible " +
    scienceLabEscape(m.symbol) +
    " molecules in the outside fluid; the cell interior is on the right.' onclick='scienceLabBioCanvasClick(event)'>Interactive membrane diagram. Molecules outside the cell are on the left; the cytoplasm is on the right.</canvas></div><div class='lab-status-line' id='labBioStatus' role='status' aria-live='polite'>" +
    scienceLabEscape(s.message) +
    "</div>" +
    scienceLabCanvasHint(
      "The reservoirs keep their concentrations roughly steady while a few molecules cross.",
    ) +
    "</section><aside class='lab-control-panel'><div class='lab-control-title'><span>CHOOSE YOUR MISSION</span><b>3 deliveries</b></div><div class='lab-mission-picker' role='group' aria-label='Choose molecule mission'>" +
    missions +
    "</div><div class='lab-gradient-strip'><span>OUTSIDE <b>" +
    m.outside +
    "</b></span><i>→</i><span>INSIDE <b>" +
    m.inside +
    "</b></span></div><p class='lab-bio-molecule-note'><b>" +
    scienceLabEscape(m.name) +
    ":</b> " +
    scienceLabEscape(m.size) +
    " · moves " +
    scienceLabEscape(m.gradient) +
    ".</p><div class='bio-route-heading'><span>SELECT THE MEMBRANE ROUTE</span><small>Then select a molecule</small></div><div class='bio-route-grid'>" +
    routes +
    "</div><div class='lab-action-stack'><button class='btn btn-g lab-secondary-button' onclick='scienceLabBioSelectNext()'" +
    (s.animating || s.sourceCount <= 0 ? " disabled" : "") +
    ">☝ Select next molecule</button><button id='labBioSend' class='btn btn-p lab-main-button' onclick='scienceLabBioSend()'" +
    (s.animating || s.transferred >= m.goal ? " disabled" : "") +
    ">Move through membrane →</button></div><details class='lab-explain' open><summary>Transport clue</summary><p>" +
    scienceLabEscape(m.explain) +
    "</p></details><div class='lab-mini-stats'><span>DELIVERY ATTEMPTS <b id='labBioAttempts'>" +
    stats.attempts +
    "</b></span><span>MISSIONS CLEARED <b id='labBioWins'>" +
    stats.wins +
    "</b></span></div></aside></div></section>"
  );
}

function scienceLabBondingChallenge() {
  return SCIENCE_LAB_BONDING_CHALLENGES[scienceLabBondingState.level] || null;
}
function scienceLabBondingResetLevel() {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge();
  if (!challenge) return;
  s.atoms = challenge.atoms.map(function (atom) {
    var electrons = [];
    for (var i = 0; i < atom.valence; i++) electrons.push({ type: "dot" });
    return {
      symbol: atom.symbol,
      name: atom.name,
      valence: atom.valence,
      shells: atom.shells,
      electrons: electrons,
    };
  });
  s.transfers = 0;
  s.bondProgress = (challenge.bonds || []).map(function () {
    return 0;
  });
  s.selectedElectron = null;
  s.selectedAnswer = -1;
  s.phase = "build";
  s.solved = false;
  s.rewarded = false;
  s.message = challenge.prompt;
}
function scienceLabBondingRefresh(focusId) {
  if (typeof render === "function") render();
  var target = focusId && document.getElementById(focusId);
  if (target && typeof target.focus === "function") target.focus();
}
function scienceLabBondingFirstActionId() {
  var challenge = scienceLabBondingChallenge();
  if (!challenge) return "bonding-restart";
  return challenge.kind === "ionic"
    ? "bonding-electron-0-0"
    : "bonding-add-pair-0";
}
function scienceLabBondingSelectElectron(atomIndex, electronIndex) {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge(),
    atom = s.atoms[atomIndex],
    electron = atom && atom.electrons[electronIndex];
  if (!challenge || challenge.kind !== "ionic" || s.phase !== "build") return;
  if (!electron || electron.type !== "dot") return;
  s.selectedElectron = { atom: atomIndex, electron: electronIndex };
  s.message =
    "Electron selected from " +
    atom.name +
    ". Choose the atom it should move to.";
  var nextTransfer = challenge.transfers[s.transfers];
  scienceLabBondingRefresh(
    nextTransfer
      ? "bonding-transfer-target-" + nextTransfer.to
      : "labBondingStatus",
  );
}
function scienceLabBondingTransferTo(atomIndex) {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge();
  if (!challenge || challenge.kind !== "ionic" || s.phase !== "build") return;
  if (!s.selectedElectron) {
    s.message = "Select an outer electron first, then choose its destination.";
    scienceLabBondingRefresh("labBondingStatus");
    return;
  }
  var next = challenge.transfers[s.transfers],
    selected = s.selectedElectron;
  if (!next || selected.atom !== next.from || atomIndex !== next.to) {
    s.message =
      "Check the task: move the next electron from " +
      challenge.atoms[next ? next.from : 0].name +
      " to " +
      challenge.atoms[next ? next.to : 1].name +
      ".";
    scienceLabBondingRefresh(
      "bonding-electron-" + selected.atom + "-" + selected.electron,
    );
    return;
  }
  var source = s.atoms[selected.atom],
    destination = s.atoms[atomIndex],
    moved = source.electrons.splice(selected.electron, 1)[0];
  if (!moved) {
    s.selectedElectron = null;
    s.message = "Choose one of the visible outer electrons.";
    scienceLabBondingRefresh();
    return;
  }
  destination.electrons.push({ type: "cross", from: source.symbol });
  s.transfers++;
  s.selectedElectron = null;
  s.message =
    "Transfer complete: " +
    source.symbol +
    " has lost an electron and " +
    destination.symbol +
    " has gained one. Continue until both ions are stable.";
  if (s.transfers === challenge.transfers.length)
    s.message =
      "All required electrons are transferred. Check the ionic model.";
  var nextTransfer = challenge.transfers[s.transfers];
  scienceLabBondingRefresh(
    nextTransfer
      ? "bonding-electron-" + nextTransfer.from + "-0"
      : "bonding-check-build",
  );
}
function scienceLabBondingAddPair(bondIndex) {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge(),
    bond = challenge && challenge.bonds && challenge.bonds[bondIndex];
  if (!bond || challenge.kind !== "covalent" || s.phase !== "build") return;
  if (s.bondProgress[bondIndex] >= bond.pairs) {
    s.message = "That link already has all the shared pairs required.";
    scienceLabBondingRefresh();
    return;
  }
  s.bondProgress[bondIndex]++;
  s.message =
    "Shared pair added to " +
    s.atoms[bond.a].symbol +
    "–" +
    s.atoms[bond.b].symbol +
    ". Check the shell counts, then add any remaining pairs.";
  var nextBond = -1;
  for (var i = 0; i < challenge.bonds.length; i++)
    if (s.bondProgress[i] < challenge.bonds[i].pairs) {
      nextBond = i;
      break;
    }
  scienceLabBondingRefresh(
    nextBond >= 0 ? "bonding-add-pair-" + nextBond : "bonding-check-build",
  );
}
function scienceLabBondingCheckBuild() {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge();
  if (!challenge || s.phase !== "build") return;
  var complete =
    challenge.kind === "ionic"
      ? s.transfers === challenge.transfers.length
      : challenge.bonds.every(function (bond, index) {
          return s.bondProgress[index] === bond.pairs;
        });
  if (!complete) {
    s.message =
      challenge.kind === "ionic"
        ? "Not complete yet. Transfer the required outer electrons one at a time."
        : "Not complete yet. Add the required shared pair(s) to every bond.";
    scienceLabBondingRefresh("labBondingStatus");
    return;
  }
  s.phase = "reason";
  s.selectedAnswer = -1;
  s.message = "Electron model built. Use it to answer the structure question.";
  scienceLabBondingRefresh("bonding-option-0");
}
function scienceLabBondingSelectAnswer(index) {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge();
  if (!challenge || s.phase !== "reason" || s.solved) return;
  if (index < 0 || index >= challenge.options.length) return;
  s.selectedAnswer = index;
  scienceLabBondingRefresh("bonding-option-" + index);
}
function scienceLabBondingCheckReason() {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge();
  if (!challenge || s.phase !== "reason" || s.solved) return;
  if (s.selectedAnswer < 0) {
    s.message = "Choose an explanation before checking your answer.";
    scienceLabBondingRefresh("bonding-option-0");
    return;
  }
  var correct = s.selectedAnswer === challenge.answer;
  scienceLabTrack("bonding", correct);
  if (correct) {
    s.solved = true;
    s.message = challenge.explanation;
    scienceLabAward("bonding", s);
  } else {
    s.message =
      "Not quite. Revisit the electron model and the clue, then choose again.";
  }
  scienceLabBondingRefresh(
    s.solved ? "bonding-next" : "bonding-option-" + s.selectedAnswer,
  );
}
function scienceLabBondingNext() {
  var s = scienceLabBondingState;
  if (!s.solved) return;
  s.level++;
  if (s.level < SCIENCE_LAB_BONDING_CHALLENGES.length) {
    scienceLabBondingResetLevel();
    scienceLabBondingRefresh(scienceLabBondingFirstActionId());
  } else {
    s.atoms = [];
    s.phase = "complete";
    scienceLabBondingRefresh("bonding-restart");
  }
}
function scienceLabBondingRestart() {
  scienceLabBondingState.level = 0;
  scienceLabBondingResetLevel();
  scienceLabBondingRefresh(scienceLabBondingFirstActionId());
}
function scienceLabBondingAtomMarkup(atomIndex, challenge) {
  var s = scienceLabBondingState,
    atom = s.atoms[atomIndex],
    ionic = challenge.kind === "ionic";
  if (ionic) {
    var charge = atom.valence - atom.electrons.length,
      chargeText =
        charge > 0
          ? atom.symbol + "<sup>" + charge + "+</sup>"
          : charge < 0
            ? atom.symbol + "<sup>" + Math.abs(charge) + "−</sup>"
            : atom.symbol,
      shellParts = atom.shells.split(",");
    shellParts[shellParts.length - 1] = String(atom.electrons.length);
    if (atom.electrons.length === 0 && shellParts.length > 1) shellParts.pop();
    var electrons = atom.electrons
      .map(function (electron, index) {
        if (electron.type === "cross")
          return "<span class='bonding-electron transferred' aria-label='Transferred electron'>×</span>";
        var selected =
          s.selectedElectron &&
          s.selectedElectron.atom === atomIndex &&
          s.selectedElectron.electron === index;
        return (
          "<button type='button' id='bonding-electron-" +
          atomIndex +
          "-" +
          index +
          "' class='bonding-electron" +
          (selected ? " selected" : "") +
          "'" +
          (s.phase !== "build" ? " disabled" : "") +
          " onclick='scienceLabBondingSelectElectron(" +
          atomIndex +
          "," +
          index +
          ")' aria-label='Select outer electron " +
          (index + 1) +
          " on " +
          scienceLabEscape(atom.name) +
          "'>•</button>"
        );
      })
      .join("");
    return (
      "<article class='bonding-atom-card ionic-atom'><div class='bonding-atom-top'><span>" +
      scienceLabEscape(atom.name) +
      "</span><b class='bonding-charge'>" +
      chargeText +
      "</b></div><div class='bonding-atom-symbol'>" +
      atom.symbol +
      "</div><div class='bonding-electron-field' role='group' aria-label='Outer-shell electrons on " +
      scienceLabEscape(atom.name) +
      "'>" +
      electrons +
      "</div><div class='bonding-atom-count'>OUTER e⁻ <b>" +
      atom.electrons.length +
      "</b><span>shells " +
      scienceLabEscape(shellParts.join(", ")) +
      "</span></div><button type='button' id='bonding-transfer-target-" +
      atomIndex +
      "' class='bonding-transfer-target'" +
      (s.phase !== "build" || s.transfers >= challenge.transfers.length
        ? " disabled"
        : "") +
      " onclick='scienceLabBondingTransferTo(" +
      atomIndex +
      ")' aria-label='Transfer selected electron to " +
      scienceLabEscape(atom.name) +
      "'>Transfer selected electron here <span>→</span></button></article>"
    );
  }
  var shared = 0;
  challenge.bonds.forEach(function (bond, index) {
    if (bond.a === atomIndex || bond.b === atomIndex)
      shared += s.bondProgress[index];
  });
  var lone = atom.valence - shared,
    shellCount = lone + shared * 2,
    shellLimit = atom.symbol === "H" ? 2 : 8,
    loneDots = "";
  for (var d = 0; d < lone; d += 2)
    loneDots +=
      "<span class='bonding-lone-pair' aria-hidden='true'><i>•</i>" +
      (d + 1 < lone ? "<i>•</i>" : "") +
      "</span>";
  return (
    "<article class='bonding-atom-card covalent-atom'><div class='bonding-atom-top'><span>" +
    scienceLabEscape(atom.name) +
    "</span><b class='bonding-shell-status'>" +
    shellCount +
    "/" +
    shellLimit +
    " e⁻</b></div><div class='bonding-atom-symbol'>" +
    atom.symbol +
    "</div><div class='bonding-electron-field lone-pair-field' aria-label='" +
    lone +
    " non-bonding electrons'>" +
    loneDots +
    "</div><div class='bonding-atom-count'>LONE e⁻ <b>" +
    lone +
    "</b><span>" +
    shellCount +
    " around atom incl. shared pairs</span></div></article>"
  );
}
function scienceLabBondingLinkMarkup(bondIndex, challenge) {
  var s = scienceLabBondingState,
    bond = challenge.bonds[bondIndex],
    made = s.bondProgress[bondIndex],
    pairs = "";
  for (var i = 0; i < made; i++)
    pairs +=
      "<span class='bonding-shared-pair' aria-label='Shared electron pair'><i>•</i><i>×</i></span>";
  return (
    "<div class='bonding-link-card'><div class='bonding-link-heading'><b>" +
    s.atoms[bond.a].symbol +
    "–" +
    s.atoms[bond.b].symbol +
    "</b><span>" +
    made +
    " / " +
    bond.pairs +
    " shared pairs</span></div><div class='bonding-link-visual'><span>" +
    s.atoms[bond.a].symbol +
    "</span><i>" +
    (made ? pairs : "······") +
    "</i><span>" +
    s.atoms[bond.b].symbol +
    "</span></div><button type='button' id='bonding-add-pair-" +
    bondIndex +
    "' class='bonding-add-pair' onclick='scienceLabBondingAddPair(" +
    bondIndex +
    ")'" +
    (made >= bond.pairs || s.phase !== "build" ? " disabled" : "") +
    " aria-label='Add one shared pair to " +
    s.atoms[bond.a].symbol +
    "-" +
    s.atoms[bond.b].symbol +
    " bond'>＋ Add one shared pair</button></div>"
  );
}
function scienceLabBondingOptionsMarkup(challenge) {
  return challenge.options
    .map(function (option, index) {
      return (
        "<button type='button' id='bonding-option-" +
        index +
        "' class='bonding-answer-option" +
        (scienceLabBondingState.selectedAnswer === index ? " selected" : "") +
        "' onclick='scienceLabBondingSelectAnswer(" +
        index +
        ")' aria-pressed='" +
        (scienceLabBondingState.selectedAnswer === index) +
        "'" +
        (scienceLabBondingState.solved ? " disabled" : "") +
        "><span>" +
        String.fromCharCode(65 + index) +
        "</span><b>" +
        scienceLabEscape(option) +
        "</b></button>"
      );
    })
    .join("");
}
function scienceLabBondingGeometryMarkup(challenge) {
  if (challenge.id === "water")
    return "<div class='bonding-geometry-preview' role='img' aria-label='Water has a bent shape with a bond angle of about 104.5 degrees.'><svg viewBox='0 0 220 110' aria-hidden='true'><path d='M110 20L28 84M110 20L192 84' fill='none' stroke='#52745b' stroke-width='4'/><path d='M94 33A24 24 0 0 0 126 33' fill='none' stroke='#bd7c3c' stroke-width='2'/><circle cx='110' cy='20' r='17' fill='#dfe9db' stroke='#55745a' stroke-width='2'/><circle cx='28' cy='84' r='13' fill='#f1e4d0' stroke='#ad7848' stroke-width='2'/><circle cx='192' cy='84' r='13' fill='#f1e4d0' stroke='#ad7848' stroke-width='2'/><text x='110' y='25' text-anchor='middle' font-size='13' font-family='Georgia,serif' fill='#31543d'>O</text><text x='28' y='88' text-anchor='middle' font-size='10' font-family='Georgia,serif' fill='#715235'>H</text><text x='192' y='88' text-anchor='middle' font-size='10' font-family='Georgia,serif' fill='#715235'>H</text><text x='110' y='68' text-anchor='middle' font-size='10' font-family='sans-serif' fill='#815c3c'>104.5°</text></svg><b>Bent molecular shape</b></div>";
  if (challenge.id === "carbon-dioxide")
    return "<div class='bonding-geometry-preview' role='img' aria-label='Carbon dioxide is linear, with a bond angle of 180 degrees.'><svg viewBox='0 0 220 95' aria-hidden='true'><path d='M47 37H85M47 52H85M135 37H173M135 52H173' fill='none' stroke='#52745b' stroke-width='3'/><circle cx='32' cy='45' r='18' fill='#e6ece1' stroke='#55745a' stroke-width='2'/><circle cx='110' cy='45' r='18' fill='#f1e4d0' stroke='#ad7848' stroke-width='2'/><circle cx='188' cy='45' r='18' fill='#e6ece1' stroke='#55745a' stroke-width='2'/><text x='32' y='50' text-anchor='middle' font-size='13' font-family='Georgia,serif' fill='#31543d'>O</text><text x='110' y='50' text-anchor='middle' font-size='13' font-family='Georgia,serif' fill='#715235'>C</text><text x='188' y='50' text-anchor='middle' font-size='13' font-family='Georgia,serif' fill='#31543d'>O</text><text x='110' y='87' text-anchor='middle' font-size='10' font-family='sans-serif' fill='#815c3c'>180°</text></svg><b>Linear molecular shape</b></div>";
  return "";
}
function scienceLabBondingHeaderMarkup() {
  return "<header class='games-heading lab-page-heading bonding-page-heading'><div><button class='games-back-link' onclick=\"go('games')\">← Science Arcade</button><div class='book-eyebrow'>CHEMISTRY · UNIT 1 · BONDING &amp; STRUCTURE</div><h1>⚗️ Bonding Studio</h1><p>Move valence electrons to build ionic and covalent models, then use the model to explain a property or molecular shape.</p><div class='bonding-page-links'><button class='btn btn-g btn-s' onclick=\"go('topic/chemistry/U1/U1T3')\">← Bonding &amp; Structure notes</button><button class='btn btn-g btn-s' onclick=\"go('games/lab/chemistry')\">Open Collision Lab</button></div></div><div class='lab-top-goal'><span>FOUR BUILD-AND-EXPLAIN ROUNDS</span><b>Transfer · share · explain</b></div></header>";
}
function scienceLabBondingMarkup() {
  var s = scienceLabBondingState,
    challenge = scienceLabBondingChallenge(),
    stats = scienceLabReadStats().bonding;
  if (!challenge) {
    return (
      "<section class='games-hub science-lab-page bonding-lab-page'>" +
      scienceLabBondingHeaderMarkup() +
      "<section class='lab-stage-card bonding-complete-card'><span class='bonding-complete-icon'>✓</span><div class='book-eyebrow'>BONDING STUDIO · SET COMPLETE</div><h2>All four structures built.</h2><p>You modelled electron transfer for ionic compounds, shared pairs for covalent molecules, and used each structure to explain a syllabus idea.</p><div class='lab-mini-stats'><span>MODEL CHECKS <b>" +
      stats.attempts +
      "</b></span><span>ROUNDS CLEARED <b>" +
      stats.wins +
      "</b></span></div><div class='lab-action-stack'><button id='bonding-restart' class='btn btn-p lab-main-button' onclick='scienceLabBondingRestart()'>↻ Play the set again</button><button class='btn btn-g lab-secondary-button' onclick=\"go('games')\">Back to science games</button></div></section></section>"
    );
  }
  if (!s.atoms.length) scienceLabBondingResetLevel();
  var ionic = challenge.kind === "ionic",
    atomMarkup = s.atoms
      .map(function (_atom, index) {
        return scienceLabBondingAtomMarkup(index, challenge);
      })
      .join(""),
    bondMarkup = ionic
      ? ""
      : "<div class='bonding-link-grid'>" +
        challenge.bonds
          .map(function (_bond, index) {
            return scienceLabBondingLinkMarkup(index, challenge);
          })
          .join("") +
        "</div>",
    kindLabel = ionic ? "IONIC · ELECTRON TRANSFER" : "COVALENT · SHARED PAIRS",
    modelHint = ionic
      ? "Dot-and-cross model: <b>•</b> marks an atom’s original electron; <b>×</b> marks an electron transferred from the other atom."
      : "Each shared pair contains one electron from each atom; lone-pair dots stay on their atom.",
    layoutNote = ionic
      ? ""
      : "<p class='bonding-layout-note'>Atom cards are electron-count panels only; their row is not a molecular-shape diagram.</p>",
    roundCount = challenge.atoms ? SCIENCE_LAB_BONDING_CHALLENGES.length : 0,
    quiz =
      s.phase === "reason"
        ? "<div class='bonding-reason-panel'><span class='book-overline'>APPLY THE STRUCTURE</span><h3>" +
          scienceLabEscape(challenge.question) +
          "</h3><div class='bonding-answer-grid' role='group' aria-label='Bonding reasoning answer choices'>" +
          scienceLabBondingOptionsMarkup(challenge) +
          "</div><details class='lab-explain bonding-hint'><summary>Need a nudge?</summary><p>" +
          scienceLabEscape(challenge.hint) +
          "</p></details>" +
          (s.solved
            ? "<div class='bonding-success-note' role='status'><b>Round cleared · +12 XP first time / +3 XP replay</b><p>" +
              scienceLabEscape(challenge.explanation) +
              "</p>" +
              scienceLabBondingGeometryMarkup(challenge) +
              "</div><button type='button' id='bonding-next' class='btn btn-p lab-main-button' onclick='scienceLabBondingNext()'>" +
              (s.level + 1 === roundCount
                ? "Finish set →"
                : "Next structure →") +
              "</button>"
            : "<button type='button' id='bonding-check-reason' class='btn btn-p lab-main-button' onclick='scienceLabBondingCheckReason()'>Check my explanation</button>") +
          "</div>"
        : "<div class='bonding-build-prompt'><span class='book-overline'>BUILD TASK</span><p>" +
          scienceLabEscape(challenge.prompt) +
          "</p><p class='bonding-control-tip'>" +
          (ionic
            ? "Select one dot electron, then choose its destination atom."
            : "Add a shared pair to each link. One pair makes a single bond; two pairs make a double bond.") +
          "</p><button type='button' id='bonding-check-build' class='btn btn-p lab-main-button' onclick='scienceLabBondingCheckBuild()'>Check electron model</button><button type='button' id='bonding-restart' class='btn btn-g lab-secondary-button' onclick='scienceLabBondingRestart()'>↻ Restart set</button></div>",
    atomClass = ionic
      ? "bonding-atom-grid ionic-grid"
      : "bonding-atom-grid covalent-grid";
  return (
    "<section class='games-hub science-lab-page bonding-lab-page'>" +
    scienceLabBondingHeaderMarkup() +
    "<div class='lab-play-layout'><section class='lab-stage-card bonding-stage-card'><div class='lab-stage-heading'><div><span>STRUCTURE " +
    (s.level + 1) +
    " OF " +
    roundCount +
    "</span><b>" +
    scienceLabEscape(challenge.name) +
    " · " +
    kindLabel +
    "</b></div><span class='lab-live-badge'>" +
    (s.solved
      ? "ROUND CLEARED"
      : s.phase === "reason"
        ? "MODEL READY"
        : "BUILD THE MODEL") +
    "</span></div><div class='bonding-formula-banner'><span>STRUCTURE MODEL</span><b>" +
    scienceLabEscape(challenge.formula) +
    "</b><span>" +
    kindLabel +
    "</span></div>" +
    layoutNote +
    "<div class='" +
    atomClass +
    "' role='group' aria-label='Atoms in the " +
    scienceLabEscape(challenge.name) +
    " model'>" +
    atomMarkup +
    "</div>" +
    bondMarkup +
    "<div id='labBondingStatus' class='lab-status-line bonding-status-line' role='status' aria-live='polite' tabindex='-1'>" +
    scienceLabEscape(s.message) +
    "</div><div class='lab-canvas-hint bonding-model-note'><span>✦</span><span>" +
    modelHint +
    "</span></div></section><aside class='lab-control-panel bonding-control-panel'><div class='lab-control-title'><span>" +
    (s.phase === "reason" ? "EXPLAIN THE MODEL" : "YOUR TASK") +
    "</span><b>" +
    scienceLabEscape(challenge.name) +
    " · " +
    scienceLabEscape(challenge.formula) +
    "</b></div>" +
    quiz +
    "<div class='bonding-method-note'><b>Remember</b><p>For ionic bonding, transfer electrons to form oppositely charged ions. For covalent bonding, each shared pair contains one electron from each atom.</p></div><div class='lab-mini-stats'><span>MODEL CHECKS <b>" +
    stats.attempts +
    "</b></span><span>ROUNDS CLEARED <b>" +
    stats.wins +
    "</b></span></div></aside></div></section>"
  );
}
function scienceLabAfterRender() {
  var id = scienceLabCurrentSubject();
  if (!id) return;
  var s = scienceLabStates[id];
  if (id === "physics") {
    scienceLabPhysicsSync();
    scienceLabDrawPhysics();
  } else if (id === "chemistry") {
    if (!s.particles) scienceLabChemMakeParticles();
    scienceLabChemSync();
    scienceLabChemDraw();
  } else if (id === "biology") {
    scienceLabDrawBiology();
  }
}
function scienceLabStopAnimations(keep) {
  ["physics", "chemistry", "biology"].forEach(function (id) {
    if (id === keep) return;
    var s = scienceLabStates[id];
    if (s.frameId != null && typeof cancelAnimationFrame === "function")
      cancelAnimationFrame(s.frameId);
    s.frameId = null;
    if (id === "physics" && s.animating) {
      s.animating = false;
      s.flight = null;
      s.message =
        "Shot paused because you changed labs. Launch it again when you return.";
    }
    if (id === "chemistry" && s.running) {
      s.running = false;
      s.paused = true;
      s.lastFrame = null;
      s.message = "Reaction paused while you changed labs.";
    }
    if (id === "biology" && s.animating) {
      s.animating = false;
      s.animation = null;
      s.message = "Molecule movement stopped when you changed labs.";
    }
  });
}
function vScienceLabGame(id) {
  if (id === "bonding") return scienceLabBondingMarkup();
  if (id === "physics") return scienceLabPhysicsMarkup();
  if (id === "chemistry") return scienceLabChemMarkup();
  if (id === "biology") return scienceLabBioMarkup();
  return vTopicArcadeHub();
}
