const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const storage = Object.create(null);
const elements = Object.create(null);
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
assert.match(element("app").innerHTML, /58 \/ 58 topic challenges/);

location.hash = "#/games/lab/physics";
sandbox.render();
assert.match(element("app").innerHTML, /Trajectory Tuner/);
assert.match(element("app").innerHTML, /id='labPhysicsCanvas'/);
assert.match(element("app").innerHTML, /type='range'/);
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
sandbox.scienceLabPhysicsFinish();
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
    labs: ["physics", "chemistry", "biology"],
    controls:
      "live angle/speed, temperature/concentration/catalyst, mission/route/molecule selection",
    visuals:
      "canvas trajectory, particle collisions/products, animated membrane transport",
    projectileChallenge: "preserved",
  }),
);
