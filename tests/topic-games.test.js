const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const storage = Object.create(null);
const elements = Object.create(null);
function classList(){ return { add(){}, remove(){}, toggle(){}, contains(){ return false; } }; }
function element(id){
  if(!elements[id]) elements[id] = {id,innerHTML:"",textContent:"",value:"",disabled:false,style:{},classList:classList(),focus(){},getBoundingClientRect(){return {width:900,height:300};}};
  return elements[id];
}
const lineDashCalls = [];
const canvasContext = {setTransform(){},clearRect(){},fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fillText(){},ellipse(){},fill(){},setLineDash(segments){lineDashCalls.push(segments);},arc(){}};
element("projectileCanvas").getContext = () => canvasContext;
element("projectileCanvas").getBoundingClientRect = () => ({width:900,height:300});
const navButtons = ["home","physics","chemistry","biology","maths","games","guide","progress"].map(nav=>({dataset:{nav},classList:classList()}));
const document = {
  documentElement:{dataset:{theme:"light"}},activeElement:null,getElementById:element,
  querySelectorAll(selector){return selector==="#navLinks button"?navButtons:[];},
  addEventListener(){},createElement(){return element("created");}
};
let location = {hash:"#/games"};
const localStorage = {
  getItem(key){return Object.prototype.hasOwnProperty.call(storage,key)?storage[key]:null;},
  setItem(key,value){storage[key]=String(value);},removeItem(key){delete storage[key];}
};
const window = {devicePixelRatio:1,scrollTo(){},addEventListener(){},cancelAnimationFrame(){}};
const sandbox = {
  document,window,location,localStorage,console,Math,Date,JSON,isFinite,
  requestAnimationFrame(){return 1;},cancelAnimationFrame(){},setTimeout(){return 1;},clearTimeout(){},
  getComputedStyle(){return {getPropertyValue(){return "";}};}
};
vm.createContext(sandbox);
const html = fs.readFileSync("index.html","utf8");
const scripts = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(match=>match[1].split("?")[0]);
for(const filename of scripts) vm.runInContext(fs.readFileSync(filename,"utf8"),sandbox,{filename});

assert.match(element("app").innerHTML,/Science Study Arcade/);
assert.match(element("app").innerHTML,/58 \/ 58 topic challenges/);
assert.match(element("app").innerHTML,/Land it in the hole/);

const expected = {physics:19,chemistry:22,biology:17};
let total = 0;
for(const sid of Object.keys(expected)){
  const rows = sandbox.topicArcadeTopics(sid);
  assert.equal(rows.length,expected[sid],`${sid} topic count`);
  for(const row of rows){
    const game = row.game;
    assert.ok(game,`missing game mapping for ${sid}/${row.uid}/${row.topic.id}`);
    assert.ok(Array.isArray(game.solution),`missing worked solution for ${sid}/${row.topic.id}`);
    const rendered = sandbox.vTopicArcadeGame(sid,row.uid,row.topic.id);
    assert.match(rendered,/topic-game-shell/,`route did not render for ${sid}/${row.topic.id}`);
    assert.doesNotMatch(rendered,/undefined|null/);
    if(game.kind==="calculate") assert.match(rendered,/type='number'/);
    if(game.kind==="think") assert.match(rendered,/topic-game-option/);
    if(game.kind==="sequence") assert.match(rendered,/topic-game-order-list/);
    assert.doesNotMatch(rendered,/Open the worked solution/,"solution must be hidden until an attempt");
    total++;
  }
}
assert.equal(total,58);
const independentlyCalculated = {
  "physics:U1T1":14+0.5*(-9.81),
  "physics:U1T2":(1.5*4)/(1.5+2.5),
  "physics:U1T3":850*9.81*12/20/1000,
  "physics:U1T4":90*2/(1.5e-6*0.0008)/1e11,
  "physics:U2T1":120*(2*1.5/3),
  "physics:U2T2":600e-9*1.8/0.0003*1000,
  "physics:U2T3":6.63e-34*3e8/500e-9/1e-19,
  "physics:U2T4":12/(1/(1/6+1/3)),
  "physics:U3T1":0.5/24*100,
  "physics:U3T2":(22-4)/(8-2),
  "physics:U4T1":0.8*6**2/2,
  "physics:U4T2":0.5*220e-6*12**2*1000,
  "physics:U5T1":0.02*8.31*300/100000*1000,
  "physics:U5T2":18/Math.log2(600/75),
  "physics:U5T3":2*Math.PI*Math.sqrt(0.5/200),
  "physics:U5T4":0.002*3e5,
  "chemistry:U1T1":0.4/24.3*(24.3+2*35.45),
  "chemistry:U1T2":0.75*35+0.25*37,
  "chemistry:U2T6":-(100*4.18*3.4)/(0.05*0.5)/1000,
  "chemistry:U4T11":2**2*2,
  "chemistry:U4T12":45000/160,
  "chemistry:U4T13":1.2**2/(0.4*0.4),
  "chemistry:U4T14":-Math.log10(Math.sqrt(1.8e-5*0.1)),
  "chemistry:U5T16":0.34-(-0.76),
  "chemistry:U5T20":4.2/7,
  "biology:U1T2":72/1.8**2,
  "biology:U1T4":0.20*(2*1200),
  "biology:U2T1":48/24000*1000,
  "biology:U2T4":1-((20/40)**2+(10/40)**2+(10/40)**2),
  "biology:U4T1":900/12000*100,
  "biology:U4T2":50/(0.10*1e-4)/1e6,
  "biology:U5T1":0.72/0.90
};
for(const [key,expectedAnswer] of Object.entries(independentlyCalculated)){
  const [sid,tid]=key.split(":");
  assert.ok(Math.abs(sandbox.TOPIC_GAME_CATALOG[sid][tid].answer-expectedAnswer)<0.02,`${key} answer disagrees with an independent calculation`);
}

location.hash="#/games/physics/U1/U1T1";
sandbox.render();
sandbox.topicArcadeInput("9.095","physics","U1T1");
sandbox.topicArcadeCheck("physics","U1","U1T1");
assert.match(element("app").innerHTML,/Correct — first clear earns \+10 XP/);
assert.match(element("app").innerHTML,/Open the worked solution/);
assert.equal(JSON.parse(storage["ial-games"]).topicArcade.completed["physics:U1T1"],true);
assert.equal(JSON.parse(storage["ial-progress"]).xp,10);

location.hash="#/games/chemistry/U1/U1T3";
sandbox.render();
sandbox.topicArcadeChoose(1,"chemistry","U1T3");
sandbox.topicArcadeCheck("chemistry","U1","U1T3");
assert.match(element("app").innerHTML,/Not quite yet/);
assert.doesNotMatch(element("app").innerHTML,/<details class='topic-game-solution' open/);
sandbox.topicArcadeChoose(0,"chemistry","U1T3");
sandbox.topicArcadeCheck("chemistry","U1","U1T3");
assert.match(element("app").innerHTML,/Challenge cleared/);

location.hash="#/games/biology/U4/U4T3";
sandbox.render();
let order = sandbox.topicGameSessions["biology:U4T3"].order;
for(let target=0;target<order.length;target++){
  let position=order.indexOf(target);
  while(position>target){sandbox.topicArcadeMove(position,-1,"biology","U4T3");position--;}
  order=sandbox.topicGameSessions["biology:U4T3"].order;
}
sandbox.topicArcadeCheck("biology","U4","U4T3");
assert.match(element("app").innerHTML,/Challenge cleared/);
assert.equal(Object.keys(JSON.parse(storage["ial-games"]).topicArcade.completed).length,3);

location.hash="#/subject/chemistry/U1";
sandbox.render();
assert.match(element("app").innerHTML,/Try topic challenge/);
assert.match(element("app").innerHTML,/topicArcadeStart\('chemistry','U1','U1T1'\)/);
sandbox.topicArcadeStart("chemistry","U1","U1T1");
assert.equal(location.hash,"#/games/chemistry/U1/U1T1");
sandbox.render();
assert.match(element("app").innerHTML,/From magnesium to product/);

location.hash="#/games/projectile";
sandbox.render();
assert.match(element("app").innerHTML,/Land it in the hole/);
assert.match(element("app").innerHTML,/Three known values per direction/);
assert.equal(element("projectileGuess").value,"");
sandbox.setProjectileMode("speed");
assert.match(element("app").innerHTML,/SPEED MODE/);
assert.equal(element("projectileGuess").value,"");
sandbox.projectileGame.value=15;
sandbox.drawProjectileGame(1);
assert.equal(lineDashCalls.length,0,"Physics never draws a dotted landing guide, even after a shot");
console.log("TOPIC_ARCADE_TESTS_OK",JSON.stringify({topics:total,bySubject:expected,formats:{calculation:32,reasoning:22,ordering:4},endToEnd:"numeric, choice, sequence, XP, collapsed solutions, preserved projectile modes"}));
