const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const storage = Object.create(null);
const elements = Object.create(null);
const lineDashCalls = [];
const rafCallbacks = new Map();
let rafId = 0;
function classList() {
  return {
    add() {},
    remove() {},
    toggle() {},
    contains() {
      return false;
    },
  };
}
const context = new Proxy(
  {
    setTransform() {},
    setLineDash(segments) {
      lineDashCalls.push(segments);
    },
    getImageData() {
      return { data: [] };
    },
  },
  {
    get(target, key) {
      if (key in target) return target[key];
      return function () {};
    },
  },
);
function element(id) {
  if (!elements[id]) {
    elements[id] = {
      id,
      innerHTML: "",
      textContent: "",
      value: "",
      checked: false,
      disabled: false,
      style: {},
      classList: classList(),
      focus() {},
      setAttribute() {},
      getBoundingClientRect() {
        return { width: 860, height: 420, left: 0, top: 0 };
      },
    };
    if (/Canvas$/.test(id)) {
      elements[id].getContext = () => context;
    }
  }
  return elements[id];
}
const navButtons = [
  "home",
  "physics",
  "chemistry",
  "biology",
  "maths",
  "games",
  "guide",
  "progress",
].map((nav) => ({ dataset: { nav }, classList: classList() }));
const document = {
  documentElement: { dataset: { theme: "light" } },
  activeElement: null,
  getElementById: element,
  querySelectorAll(selector) {
    return selector === "#navLinks button" ? navButtons : [];
  },
  addEventListener() {},
  createElement() {
    return element("created");
  },
};
let location = { hash: "#/games" };
const localStorage = {
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(storage, key)
      ? storage[key]
      : null;
  },
  setItem(key, value) {
    storage[key] = String(value);
  },
  removeItem(key) {
    delete storage[key];
  },
};
const window = {
  devicePixelRatio: 1,
  scrollTo() {},
  addEventListener() {},
  cancelAnimationFrame(id) {
    rafCallbacks.delete(id);
  },
};
const sandbox = {
  document,
  window,
  location,
  localStorage,
  console,
  Math,
  Date,
  JSON,
  isFinite,
  requestAnimationFrame(callback) {
    const id = ++rafId;
    rafCallbacks.set(id, callback);
    return id;
  },
  cancelAnimationFrame(id) {
    rafCallbacks.delete(id);
  },
  setTimeout() {
    return 1;
  },
  clearTimeout() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
};
vm.createContext(sandbox);
const html = fs.readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(
  (match) => match[1].split("?")[0],
);
for (const filename of scripts)
  vm.runInContext(fs.readFileSync(filename, "utf8"), sandbox, { filename });

assert.match(
  element("app").innerHTML,
  /Controls in your hands\. Science on screen\./,
);
assert.match(element("app").innerHTML, /Play the motion lab/);
assert.match(element("app").innerHTML, /Play the collision lab/);
assert.match(element("app").innerHTML, /Play the cell mission/);
assert.match(element("app").innerHTML, /Play Molecular Shapes/);
assert.match(element("app").innerHTML, /58 \/ 58 topic challenges/);

location.hash = "#/games/lab/physics";
lineDashCalls.length = 0;
sandbox.render();
assert.match(element("app").innerHTML, /Trajectory Tuner/);
assert.match(element("app").innerHTML, /id='labPhysicsCanvas'/);
assert.match(element("app").innerHTML, /type='range'/);
assert.match(element("app").innerHTML, /Estimate before launch/);
assert.match(element("app").innerHTML, /id='labFlightTime'>—/);
assert.doesNotMatch(
  element("app").innerHTML,
  /dotted|LIVE TRAJECTORY PREVIEW|Projected landing/,
  "the Physics lab shows no answer-revealing path or projected landing before launch",
);
assert.equal(
  lineDashCalls.length,
  0,
  "the Physics canvas draws no dotted guide lines",
);
const physics = sandbox.scienceLabStates.physics;
const oldRange = sandbox.scienceLabPhysicsRange(
  physics.angle,
  physics.speed,
).range;
sandbox.scienceLabPhysicsAdjust("angle", 25);
assert.equal(physics.angle, 25);
assert.notEqual(
  sandbox.scienceLabPhysicsRange(physics.angle, physics.speed).range,
  oldRange,
  "aim control visibly changes the predicted landing",
);
physics.angle = 45;
physics.speed = 18;
physics.target = sandbox.scienceLabPhysicsRange(
  physics.angle,
  physics.speed,
).range;
sandbox.scienceLabPhysicsLaunch();
assert.equal(physics.animating, true, "launch starts a visible ball animation");
assert.equal(
  lineDashCalls.length,
  0,
  "the launched Physics path is solid, never dotted",
);
sandbox.scienceLabPhysicsFinish();
assert.match(element("labPhysicsLive").innerHTML, /Actual landing/);
assert.notEqual(element("labFlightTime").textContent, "—");
assert.equal(
  physics.roundComplete,
  true,
  "a shot on the target clears the round",
);
assert.equal(sandbox.scienceLabReadStats().physics.wins, 1);

location.hash = "#/games/lab/chemistry";
sandbox.render();
assert.match(element("app").innerHTML, /Collision Lab/);
assert.match(element("app").innerHTML, /labChemCanvas/);
assert.match(element("app").innerHTML, /Add a catalyst/);
const chemistry = sandbox.scienceLabStates.chemistry;
sandbox.scienceLabChemAdjust("concentration", 10);
assert.equal(chemistry.concentration, 10);
assert.equal(
  chemistry.particles.length,
  20,
  "concentration control changes particle count in the beaker",
);
chemistry.catalyst = true;
chemistry.products = 0;
chemistry.collisions = 0;
chemistry.particles = [
  { kind: "A", x: 100, y: 120, vx: 50, vy: 0, r: 12 },
  { kind: "B", x: 120, y: 120, vx: -50, vy: 0, r: 12 },
];
sandbox.scienceLabChemResolveCollisions(chemistry);
assert.equal(
  chemistry.products,
  1,
  "a sufficiently energetic A-B collision makes visible AB product",
);
assert.equal(chemistry.particles.filter((p) => p.kind === "P").length, 1);
sandbox.scienceLabChemToggle();
assert.equal(chemistry.running, true);
chemistry.products = 5;
sandbox.scienceLabChemFinish();
assert.equal(chemistry.finished, true);
assert.equal(sandbox.scienceLabReadStats().chemistry.wins, 1);

const shapeXpStart = JSON.parse(storage["ial-progress"]).xp;
location.hash = "#/topic/chemistry/U1/U1T3";
sandbox.render();
assert.match(element("app").innerHTML, /Bonding &amp; Structure/);
assert.match(element("app").innerHTML, /Play Molecular Shapes Studio/);
assert.match(
  element("app").innerHTML,
  /Try topic challenge/,
  "the molecular-shapes game is added without replacing the existing topic challenge",
);
location.hash = "#/games/lab/bonding";
sandbox.render();
assert.match(element("app").innerHTML, /Molecular Shapes Studio/);
assert.match(element("app").innerHTML, /VSEPR/);
assert.match(element("app").innerHTML, /CO₂/);
assert.match(element("app").innerHTML, /vsepr-bondingDomains-plus/);
assert.match(element("app").innerHTML, /vsepr-lonePairs-plus/);
assert.match(
  element("app").innerHTML,
  /onclick='scienceLabVseprAdjust\("bondingDomains",1\)'/,
  "the count steppers call the interactive VSEPR control",
);
assert.match(element("app").innerHTML, /aria-label='Bonding domains selected'/);
assert.match(element("app").innerHTML, /aria-label='Lone pairs selected'/);
assert.doesNotMatch(
  element("app").innerHTML,
  /Sodium chloride|bonding-electron|bonding-transfer-target/,
);
assert.doesNotMatch(
  element("app").innerHTML,
  /vsepr-reveal-diagram/,
  "the 3D-style geometry stays hidden before the player predicts the shape",
);
const vsepr = sandbox.scienceLabVseprState;
assert.equal(vsepr.bondingDomains, 0);
assert.equal(vsepr.lonePairs, 0);
sandbox.scienceLabVseprAdjust("bondingDomains", 1);
sandbox.scienceLabVseprCheckDomains();
assert.equal(
  vsepr.phase,
  "domains",
  "an incorrect electron-domain inventory can be revised",
);
sandbox.scienceLabVseprAdjust("bondingDomains", 1);
sandbox.scienceLabVseprCheckDomains();
assert.equal(vsepr.phase, "shape");
assert.doesNotMatch(
  element("app").innerHTML,
  /vsepr-reveal-diagram/,
  "checking the inventory does not expose the molecular shape before the prediction",
);
sandbox.scienceLabVseprSelectAnswer(0);
sandbox.scienceLabVseprCheckAnswer();
assert.equal(
  vsepr.solved,
  false,
  "a wrong VSEPR prediction can be retried without revealing the correct shape",
);
assert.doesNotMatch(
  element("app").innerHTML,
  /vsepr-reveal-diagram|Bent molecular shape/,
);
sandbox.scienceLabVseprSelectAnswer(sandbox.scienceLabVseprChallenge().answer);
sandbox.scienceLabVseprCheckAnswer();
assert.equal(vsepr.solved, true);
assert.match(element("app").innerHTML, /Linear/);
assert.match(element("app").innerHTML, /180°/);
assert.match(element("app").innerHTML, /vsepr-reveal-diagram/);
assert.match(element("app").innerHTML, /vsepr-svg-ligand/);
assert.equal(
  (element("app").innerHTML.match(/class='vsepr-svg-bond'/g) || []).length,
  4,
  "the CO₂ reveal draws two parallel strokes for each double bond",
);
assert.equal(sandbox.scienceLabReadStats().shapes.wins, 1);
assert.equal(
  JSON.parse(storage["ial-progress"]).xp,
  shapeXpStart + 12,
  "the first cleared molecule earns its first-clear XP reward",
);

sandbox.scienceLabVseprNext();
assert.equal(vsepr.level, 1);
assert.equal(vsepr.bondingDomains, 0);
assert.equal(vsepr.lonePairs, 0);
assert.equal(sandbox.scienceLabVseprChallenge().id, "bf3");
for (let i = 0; i < 3; i++) sandbox.scienceLabVseprAdjust("bondingDomains", 1);
sandbox.scienceLabVseprAdjust("lonePairs", 1);
sandbox.scienceLabVseprCheckDomains();
assert.equal(
  vsepr.phase,
  "domains",
  "extra lone pairs are not accepted for a three-bond, no-lone-pair centre",
);
sandbox.scienceLabVseprAdjust("lonePairs", -1);
function solveCurrentVseprChallenge() {
  const challenge = sandbox.scienceLabVseprChallenge();
  while (vsepr.bondingDomains < challenge.bondingDomains)
    sandbox.scienceLabVseprAdjust("bondingDomains", 1);
  while (vsepr.bondingDomains > challenge.bondingDomains)
    sandbox.scienceLabVseprAdjust("bondingDomains", -1);
  while (vsepr.lonePairs < challenge.lonePairs)
    sandbox.scienceLabVseprAdjust("lonePairs", 1);
  while (vsepr.lonePairs > challenge.lonePairs)
    sandbox.scienceLabVseprAdjust("lonePairs", -1);
  sandbox.scienceLabVseprCheckDomains();
  assert.equal(
    vsepr.phase,
    "shape",
    challenge.id + " inventory should be accepted",
  );
  assert.doesNotMatch(
    element("app").innerHTML,
    /vsepr-reveal-diagram/,
    challenge.id + " geometry stays concealed before its answer is checked",
  );
  sandbox.scienceLabVseprSelectAnswer(challenge.answer);
  sandbox.scienceLabVseprCheckAnswer();
  assert.equal(vsepr.solved, true, challenge.id + " shape answer should clear");
  assert.match(element("app").innerHTML, /vsepr-reveal-diagram/);
  assert.match(element("app").innerHTML, new RegExp(challenge.shape));
  assert.match(element("app").innerHTML, new RegExp(challenge.angle));
}
solveCurrentVseprChallenge();
assert.match(element("app").innerHTML, /Trigonal planar/);
sandbox.scienceLabVseprNext();
assert.equal(vsepr.level, 2);
solveCurrentVseprChallenge();
assert.match(element("app").innerHTML, /Tetrahedral/);
sandbox.scienceLabVseprNext();
assert.equal(vsepr.level, 3);
solveCurrentVseprChallenge();
assert.match(element("app").innerHTML, /Trigonal pyramidal/);
assert.match(element("app").innerHTML, /vsepr-svg-lone-pair/);
assert.match(element("app").innerHTML, /vsepr-svg-bond dashed/);
assert.match(element("app").innerHTML, /vsepr-svg-wedge/);
assert.equal(
  (element("app").innerHTML.match(/class='vsepr-svg-lone-pair'/g) || []).length,
  1,
  "NH₃'s revealed model includes its single lone pair",
);
sandbox.scienceLabVseprNext();
assert.equal(vsepr.level, 4);
solveCurrentVseprChallenge();
assert.match(element("app").innerHTML, /Bent/);
assert.match(element("app").innerHTML, /vsepr-svg-lone-pair/);
assert.equal(
  (element("app").innerHTML.match(/class='vsepr-svg-lone-pair'/g) || []).length,
  2,
  "H₂O's revealed model includes both lone pairs",
);
sandbox.scienceLabVseprNext();
assert.equal(vsepr.level, 5);
solveCurrentVseprChallenge();
assert.match(element("app").innerHTML, /Octahedral/);
sandbox.scienceLabVseprAdjust("lonePairs", 1);
assert.equal(
  vsepr.lonePairs,
  0,
  "the completed round cannot change its inventory",
);
sandbox.scienceLabVseprNext();
assert.equal(vsepr.phase, "complete");
assert.match(element("app").innerHTML, /All six shape challenges solved/);
assert.equal(sandbox.scienceLabReadStats().shapes.wins, 6);
assert.equal(
  sandbox.scienceLabReadStats().shapes.attempts,
  7,
  "shape checks count the one retry plus six correct predictions",
);
assert.equal(
  JSON.parse(storage["ial-progress"]).xp,
  shapeXpStart + 72,
  "each new molecular shape awards first-clear XP",
);
sandbox.scienceLabVseprRestart();
assert.equal(vsepr.level, 0);
assert.equal(vsepr.phase, "domains");

location.hash = "#/games/lab/biology";
sandbox.render();
assert.match(element("app").innerHTML, /Membrane Mission/);
assert.match(element("app").innerHTML, /labBioCanvas/);
assert.match(element("app").innerHTML, /ATP pump/);
const biology = sandbox.scienceLabStates.biology;
sandbox.scienceLabBioSetMission("glucose");
assert.equal(biology.mission, "glucose");
sandbox.scienceLabBioChooseRoute("channel");
sandbox.scienceLabBioCanvasClick({ clientX: 96, clientY: 132 });
assert.equal(
  biology.selected,
  0,
  "a visible source particle can be selected directly",
);
sandbox.scienceLabBioSend();
assert.equal(biology.animating, true);
sandbox.scienceLabBioFinish();
assert.equal(
  biology.transferred,
  0,
  "wrong route is rejected and the molecule is not delivered",
);
assert.match(biology.message, /carrier protein/);
sandbox.scienceLabBioChooseRoute("carrier");
sandbox.scienceLabBioSend();
sandbox.scienceLabBioFinish();
assert.equal(
  biology.sourceIds.length,
  5,
  "the selected source particle disappears after a successful transfer",
);
assert.equal(biology.sourceIds.includes(0), false);
for (let i = 0; i < 2; i++) {
  sandbox.scienceLabBioSend();
  sandbox.scienceLabBioFinish();
}
assert.equal(biology.transferred, 3);
assert.equal(sandbox.scienceLabReadStats().biology.wins, 1);
assert.match(element("labBioStatus").textContent, /Mission complete/);
sandbox.scienceLabBioSetMission("water");
sandbox.scienceLabBioChooseRoute("channel");
for (let i = 0; i < 3; i++) {
  sandbox.scienceLabBioSend();
  sandbox.scienceLabBioFinish();
}
assert.equal(biology.transferred, 3);
assert.equal(
  sandbox.scienceLabReadStats().biology.wins,
  2,
  "a water-potential mission makes the channel route a meaningful win",
);
assert.ok(
  JSON.parse(storage["ial-progress"]).xp >= 39,
  "first clears award full local XP and later clears award replay XP",
);

location.hash = "#/games/projectile";
sandbox.render();
assert.match(
  element("app").innerHTML,
  /Land it in the hole/,
  "the paper-first SUVAT projectile challenge remains available",
);
console.log(
  "INTERACTIVE_LABS_TESTS_OK",
  JSON.stringify({
    labs: ["physics", "chemistry", "biology", "molecular-shapes"],
    controls:
      "hidden-before-launch angle/speed, temperature/concentration/catalyst, membrane transport, VSEPR bonding-domain and lone-pair counts, shape-and-angle predictions",
    visuals:
      "post-launch solid trajectory, particle collisions/products, animated membrane transport, labelled molecular geometry diagrams",
    projectileChallenge: "preserved",
  }),
);
