const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const storage = Object.create(null);
const elements = Object.create(null);
const lineDashCalls = [];
const canvasTexts = [];
let canvasEllipseCalls = 0;
let canvasArcCalls = 0;
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
    fillText(text) {
      canvasTexts.push(String(text));
    },
    ellipse() {
      canvasEllipseCalls++;
    },
    arc() {
      canvasArcCalls++;
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
  atob(encoded) {
    return Buffer.from(encoded, "base64").toString("binary");
  },
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
assert.match(element("app").innerHTML, /Open 3D Bonding Sandbox \(Canvas\)/);
assert.match(element("app").innerHTML, /Run Python\/Pygame sandbox/);
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

const orbitalXpStart = JSON.parse(storage["ial-progress"]).xp;
location.hash = "#/topic/chemistry/U1/U1T3";
sandbox.render();
assert.match(element("app").innerHTML, /Bonding &amp; Structure/);
assert.match(element("app").innerHTML, /Open 3D Bonding Sandbox/);
assert.match(
  element("app").innerHTML,
  /Try topic challenge/,
  "the bonding sandbox is added without removing existing topic practice",
);
location.hash = "#/games/lab/bonding-pygame";
sandbox.render();
assert.match(element("app").innerHTML, /Python\/Pygame Bonding Sandbox/);
assert.match(element("app").innerHTML, /src='\/runtime\/pygame\/bonding-sandbox\//);
assert.match(element("app").innerHTML, /official Pygbag 0\.9\.3 CDN/);
assert.match(element("app").innerHTML, /does not yet sync its build state/);
location.hash = "#/games/lab/bonding";
sandbox.render();
assert.match(element("app").innerHTML, /3D Bonding Sandbox/);
assert.match(element("app").innerHTML, /labOrbitalCanvas/);
assert.match(element("app").innerHTML, /Hybridise orbitals/);
assert.match(element("app").innerHTML, /See VSEPR/);
assert.match(element("app").innerHTML, /Twist bond/);
assert.match(element("app").innerHTML, /Optional explanation/);
assert.match(element("app").innerHTML, /simplified educational shapes/);
assert.match(element("app").innerHTML, /Make C–C σ bond/);
assert.match(element("app").innerHTML, /Make π overlap 1/);
assert.doesNotMatch(element("app").innerHTML, /vsepr-bondingDomains-plus|Check domain count|Count the electron domains/);
const orbital = sandbox.scienceLabOrbitalState;
assert.equal(orbital.moleculeId, "ethene");
assert.equal(orbital.hybridised, false);
assert.equal(orbital.mode, "build");
assert.equal(orbital.electronDensity, false);
assert.ok(canvasEllipseCalls > 0, "the low-cost projected model draws orbital clouds to Canvas");
assert.match(element("app").innerHTML, /Show Python-simulated electron density/);
assert.match(element("app").innerHTML, /Gaussian atomic-orbital \/ LCAO approximation/);
assert.equal(Object.keys(sandbox.SCIENCE_LAB_ORBITAL_MODEL_DATA.density).length, 7);
const etheneDensityModel = sandbox.scienceLabOrbitalDensityComponents(sandbox.scienceLabOrbitalMolecule());
assert.equal(etheneDensityModel.length, 6, "unhybridised electron density includes both carbons and four hydrogens");
const densityArcStart = canvasArcCalls;
sandbox.scienceLabOrbitalToggleDensity();
assert.equal(orbital.electronDensity, true);
assert.equal(element("orbitalDensityToggle").textContent, "Hide Python-simulated electron density");
assert.ok(canvasArcCalls > densityArcStart + 200, "Python-generated 3D density samples are projected onto the Canvas");
assert.ok(canvasTexts.includes("PYTHON LCAO DENSITY · DENSER CLOUDS = HIGHER PROBABILITY"));

sandbox.scienceLabOrbitalHybridise();
const hybridDensityModel = sandbox.scienceLabOrbitalDensityComponents(sandbox.scienceLabOrbitalMolecule());
assert.equal(hybridDensityModel.filter((item) => item.kind === "orbital").length, 6);
assert.equal(hybridDensityModel.filter((item) => item.kind === "p").length, 2);
assert.equal(orbital.hybridised, true);
assert.equal(orbital.hybridization, "sp2");
assert.ok(orbital.hitRegions.some((hit) => hit.type === "sigma-site"));
assert.ok(orbital.hitRegions.some((hit) => hit.type === "pi-cloud"));
assert.ok(orbital.hitRegions.some((hit) => hit.type === "h-target"));

const orbitalCanvas = element("labOrbitalCanvas");
function pointerEventAt(point) {
  return {
    currentTarget: orbitalCanvas,
    clientX: point.x,
    clientY: point.y * 0.75,
    pointerId: 1,
    preventDefault() {},
  };
}
function dragOrbitalTo(source, target) {
  sandbox.scienceLabOrbitalPointerDown(pointerEventAt(source));
  sandbox.scienceLabOrbitalPointerUp(pointerEventAt(target));
}
let hOrbital = orbital.hitRegions.find((hit) => hit.type === "sigma-site" && hit.id === 0);
let hTarget = orbital.hitRegions.find((hit) => hit.type === "h-target" && hit.id === 0);
dragOrbitalTo(hOrbital, hTarget);
assert.deepEqual(Array.from(orbital.formedHydrogens), [0], "dragging a hybrid orbital to its atom makes a σ bond");
assert.match(orbital.message, /C–H σ bond/);
assert.match(element("app").innerHTML, /Make C–H σ bond 1 ✓/);
assert.equal(sandbox.scienceLabOrbitalDensityComponents(sandbox.scienceLabOrbitalMolecule()).filter((item) => item.kind === "sigma").length, 1, "forming a σ bond swaps the separated AOs for a bonding molecular orbital density");

let ccOrbital = orbital.hitRegions.find((hit) => hit.type === "cc-site" && hit.atom === 0);
let carbonTarget = orbital.hitRegions.find((hit) => hit.type === "central-atom" && hit.atom === 1);
dragOrbitalTo(ccOrbital, carbonTarget);
assert.equal(orbital.sigmaFormed, true, "directly joining the carbon orbital lobes makes a C–C σ bond");

sandbox.scienceLabOrbitalSetMode("rotation");
const rotationControl = { value: "30" };
sandbox.scienceLabOrbitalRotate(30, rotationControl);
assert.equal(orbital.rotationDegrees, 30, "an unbonded p pair can be visibly twisted before π overlap forms");
sandbox.scienceLabOrbitalSetMode("build");
sandbox.scienceLabOrbitalFormPi(0);
assert.equal(orbital.piFormed[0], undefined, "twisted p orbitals cannot create side-on π overlap");
assert.match(orbital.message, /twisted out of alignment/);
sandbox.scienceLabOrbitalRotate(0, rotationControl);
let pCloud = orbital.hitRegions.find((hit) => hit.type === "pi-cloud" && hit.atom === 0 && hit.direction === 0);
let pPartner = orbital.hitRegions.find((hit) => hit.type === "pi-cloud" && hit.atom === 1 && hit.direction === 0);
dragOrbitalTo(pCloud, pPartner);
assert.equal(orbital.piFormed[0], true, "dragging aligned p clouds side-on forms a π bond");
assert.match(orbital.message, /Side-on p–p overlap/);
sandbox.scienceLabOrbitalSetMode("rotation");
sandbox.scienceLabOrbitalRotate(30, rotationControl);
assert.equal(orbital.rotationDegrees, 0, "the π bond prevents rotation of the double bond");
assert.equal(orbital.attemptedRotation, 30);
assert.match(orbital.message, /Rotation blocked.*destroy the sideways overlap/);
assert.match(element("orbitalRotationStatus").textContent, /30° twist was blocked/);
assert.ok(canvasTexts.includes("π OVERLAP · ROTATION LOCKED"));
sandbox.scienceLabOrbitalSetMode("build");
sandbox.scienceLabOrbitalFormHydrogen(1);
sandbox.scienceLabOrbitalFormHydrogen(2);
sandbox.scienceLabOrbitalFormHydrogen(3);
assert.equal(orbital.complete, true, "all ethene σ and π overlaps complete the model");
assert.equal(sandbox.scienceLabReadStats().bonding.wins, 1);
assert.equal(JSON.parse(storage["ial-progress"]).xp, orbitalXpStart + 12, "first completed molecule earns its first-clear XP");

sandbox.scienceLabOrbitalSelectMolecule("ethane");
assert.equal(orbital.hybridised, false);
assert.equal(orbital.rotationDegrees, 0);
assert.match(element("app").innerHTML, /C₂H₆ · Ethane/);
sandbox.scienceLabOrbitalHybridise();
sandbox.scienceLabOrbitalFormSigma();
sandbox.scienceLabOrbitalSetMode("rotation");
sandbox.scienceLabOrbitalRotate(35, rotationControl);
assert.equal(orbital.rotationDegrees, 35, "an ethane single σ bond allows rotation");
assert.match(orbital.message, /single|head-on overlap/);

sandbox.scienceLabOrbitalSelectMolecule("water");
sandbox.scienceLabOrbitalSetMode("vsepr");
assert.match(element("app").innerHTML, /2 bonding domains · 2 lone pairs/);
assert.match(element("app").innerHTML, /Electron geometry/);
assert.match(element("app").innerHTML, /Tetrahedral/);
assert.match(element("app").innerHTML, /Bent/);
assert.match(element("app").innerHTML, /104\.5°/);
canvasTexts.length = 0;
canvasEllipseCalls = 0;
sandbox.scienceLabOrbitalDraw();
assert.equal(canvasTexts.filter((text) => text === "LP").length, 2, "water's two lone-pair domains appear as repelling clouds");
assert.ok(canvasEllipseCalls >= 4, "VSEPR view draws its bonding and lone-pair domains rather than asking for counts");

sandbox.scienceLabOrbitalSelectMolecule("ammonia");
sandbox.scienceLabOrbitalSetMode("vsepr");
assert.match(element("app").innerHTML, /3 bonding domains · 1 lone pair/);
assert.match(element("app").innerHTML, /Trigonal pyramidal/);
assert.match(element("app").innerHTML, /107°/);
assert.equal(sandbox.scienceLabOrbitalMolecule().lonePairs.length, 1);

sandbox.scienceLabOrbitalSelectMolecule("bf3");
assert.equal(sandbox.scienceLabOrbitalMolecule().hybridization, "sp2");
assert.match(sandbox.scienceLabOrbitalMolecule().vsepr.shape, /Trigonal planar/);
sandbox.scienceLabOrbitalSelectMolecule("methane");
assert.equal(sandbox.scienceLabOrbitalMolecule().hybridization, "sp3");
assert.equal(sandbox.scienceLabOrbitalMolecule().hSites.length, 4);
assert.match(sandbox.scienceLabOrbitalMolecule().vsepr.angle, /109\.5°/);
sandbox.scienceLabOrbitalSelectMolecule("ethyne");
assert.equal(sandbox.scienceLabOrbitalMolecule().hybridization, "sp");
assert.equal(sandbox.scienceLabOrbitalMolecule().piDirections.length, 2);
sandbox.scienceLabOrbitalHybridise();
sandbox.scienceLabOrbitalFormSigma();
sandbox.scienceLabOrbitalFormPi(0);
sandbox.scienceLabOrbitalFormPi(1);
sandbox.scienceLabOrbitalFormHydrogen(0);
sandbox.scienceLabOrbitalFormHydrogen(1);
assert.equal(orbital.complete, true, "the triple-bond model builds one σ plus two π overlaps");
assert.equal(sandbox.scienceLabReadStats().bonding.wins, 2);

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
    labs: ["physics", "chemistry", "biology", "3d-bonding-sandbox"],
    controls:
      "hidden-before-launch angle/speed, temperature/concentration/catalyst, membrane transport, direct orbital-drag σ/π bonding, rotation lock, visible VSEPR repulsion and Python density toggle",
    visuals:
      "post-launch solid trajectory, particle collisions/products, animated membrane transport, projected hybrid orbitals, Python-generated Gaussian-AO/LCAO electron probability clouds, σ/π overlap and VSEPR domains",
    projectileChallenge: "preserved",
  }),
);
