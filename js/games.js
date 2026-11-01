/* Small, syllabus-linked games. This first game models ideal projectile motion on level ground. */
var PROJECTILE_G = 9.81;
var PROJECTILE_HOLE_TOLERANCE = 0.25;
var projectileGame = {
  mode: "angle",
  challenge: null,
  value: "",
  result: null,
  scored: false,
  animating: false,
  animFrame: null
};

function projectileReadStats(){
  var data={};
  try{data=JSON.parse(localStorage.getItem("ial-games")||"{}");}catch(e){data={};}
  var s=data.projectile||{};
  return {
    rounds:Number(s.rounds)||0,
    shots:Number(s.shots)||0,
    hits:Number(s.hits)||0,
    streak:Number(s.streak)||0,
    bestStreak:Number(s.bestStreak)||0
  };
}
function projectileSaveStats(stats){
  var data={};
  try{data=JSON.parse(localStorage.getItem("ial-games")||"{}");}catch(e){data={};}
  data.projectile=stats;
  try{localStorage.setItem("ial-games",JSON.stringify(data));}catch(e){}
}
function projectileRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function projectileRound(value,places){var p=Math.pow(10,places||0);return Math.round(value*p)/p;}
function projectileRange(speed,angle){return speed*speed*Math.sin(2*angle*Math.PI/180)/PROJECTILE_G;}
function projectileAngleSolutions(speed,distance){
  var s=PROJECTILE_G*distance/(speed*speed);
  if(s>1.000001||s<0)return [];
  s=Math.max(0,Math.min(1,s));
  var a=Math.asin(s)*180/Math.PI/2;
  var b=90-a;
  return Math.abs(b-a)<0.05?[45]:[a,b];
}
function projectileExpectedSpeed(angle,distance){
  var s=Math.sin(2*angle*Math.PI/180);
  return s>0?Math.sqrt(PROJECTILE_G*distance/s):Infinity;
}
function projectileEnsureChallenge(){if(!projectileGame.challenge)projectileNewChallenge();}
function projectileNewChallenge(){
  if(projectileGame.animFrame!=null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(projectileGame.animFrame);
  projectileGame.animFrame=null;projectileGame.animating=false;
  if(projectileGame.challenge&&!projectileGame.scored){var prior=projectileReadStats();prior.streak=0;projectileSaveStats(prior);}
  var mass=projectileRound(projectileRandomInt(1,13)/2,1),challenge;
  if(projectileGame.mode==="angle"){
    var speed=projectileRandomInt(14,23),seedAngle=projectileRandomInt(22,36);
    var distance=projectileRound(projectileRange(speed,seedAngle),1);
    challenge={mode:"angle",mass:mass,speed:speed,angle:null,target:distance};
    projectileGame.value="";
  }else{
    var fixedAngle=projectileRandomInt(25,65),answerSpeed=projectileRandomInt(10,21);
    var target=projectileRound(projectileRange(answerSpeed,fixedAngle),1);
    challenge={mode:"speed",mass:mass,speed:null,angle:fixedAngle,target:target};
    projectileGame.value="";
  }
  projectileGame.challenge=challenge;projectileGame.result=null;projectileGame.scored=false;
  var stats=projectileReadStats();stats.rounds++;projectileSaveStats(stats);
}
function setProjectileMode(mode){
  if(mode!=="angle"&&mode!=="speed")return;
  projectileGame.mode=mode;projectileNewChallenge();
  if(document.getElementById("app")&&location.hash==="#/games")render();
}
function newProjectileChallenge(){
  projectileNewChallenge();
  if(document.getElementById("app")&&location.hash==="#/games")render();
}
function projectileSyncUI(){
  var answerField=document.getElementById("projectileGuess"),unit=document.getElementById("projectileGuessUnit");
  if(answerField){answerField.value=projectileGame.value==null?"":projectileGame.value;answerField.disabled=projectileGame.animating||projectileGame.scored;}
  if(unit)unit.textContent=projectileGame.mode==="angle"?"°":"m/s";
  var launch=document.getElementById("projectileLaunch");if(launch)launch.disabled=projectileGame.animating||projectileGame.scored;
  var outcome=document.getElementById("projectileOutcome");if(outcome)outcome.innerHTML=projectileResultMarkup();
  drawProjectileGame(projectileGame.result?1:null);
}
function afterGames(){projectileEnsureChallenge();projectileSyncUI();}
function projectileGuessChanged(value){
  if(value===""||value==null){projectileGame.value="";drawProjectileGame(null);return;}
  var num=Number(value);if(!isFinite(num))return;
  projectileGame.value=num;
  drawProjectileGame(null);
}
function projectileResultMarkup(){
  var r=projectileGame.result;
  if(!r)return "<div class='game-outcome idle' role='status'><span class='game-outcome-icon'>✎</span><div><b>Work it out before you fire</b><p>Use pen and paper to calculate your answer. The trajectory stays hidden until after your shot.</p></div></div>";
  var message=r.hit?"A hole in one! The ball lands inside the target.":(r.difference>0?"Long shot — it overshot the hole by "+Math.abs(r.difference).toFixed(1)+" m.":"Short shot — it fell "+Math.abs(r.difference).toFixed(1)+" m before the hole.");
  var answer,working;
  if(r.mode==="angle"){
    answer=""+r.solutions[0].toFixed(1)+"° or "+r.solutions[1].toFixed(1)+"°";
    working="sin(2θ) = gR / v² = "+(PROJECTILE_G*r.target/(r.speed*r.speed)).toFixed(3)+", so the two launch angles are "+answer+". Complementary angles have the same range.";
  }else{
    answer=r.expected.toFixed(1)+" m/s";
    working="v = √(gR / sin(2θ)) = √("+PROJECTILE_G.toFixed(2)+" × "+r.target.toFixed(1)+" / sin("+(2*r.angle).toFixed(1)+"°)) = "+answer+".";
  }
  return "<div class='game-outcome "+(r.hit?"success":"miss")+"' role='status' aria-live='polite'><span class='game-outcome-icon'>"+(r.hit?"🎯":"🪁")+"</span><div class='game-outcome-copy'><b>"+message+"</b><p>Last shot: "+(r.mode==="angle"?r.guess.toFixed(1)+"°":""+r.guess.toFixed(1)+" m/s")+" · landed at "+r.range.toFixed(1)+" m (target "+r.target.toFixed(1)+" m).</p>"+
    "<details class='game-solution'><summary>Check the physics</summary><p><b>Answer:</b> "+answer+"</p><p>"+working+"</p><p>Flight time: "+r.time.toFixed(2)+" s · maximum height: "+r.height.toFixed(1)+" m. Mass is "+r.mass.toFixed(1)+" kg, but it cancels from the ideal-motion equations.</p></details>"+
    (r.hit?"<div class='game-xp-note'>+10 XP added to your study progress. Ready for another target?</div>":"<div class='game-retry-note'>Change your setting and try again, or use the worked solution to refine your next shot.</div>")+"</div></div>";
}
function launchProjectile(){
  projectileEnsureChallenge();
  if(projectileGame.animating||projectileGame.scored)return;
  var c=projectileGame.challenge,field=document.getElementById("projectileGuess");
  if(!field||field.value===""){if(typeof toast==="function")toast("Calculate your answer on paper, then enter it here.");if(field&&field.focus)field.focus();return;}
  var guess=Number(field.value),min=5,max=c.mode==="angle"?85:28;
  if(!isFinite(guess)||guess<min||guess>max){if(typeof toast==="function")toast("Enter a value between "+min+" and "+max+".");if(field.focus)field.focus();return;}
  projectileGame.value=guess;
  var angle=c.mode==="angle"?guess:c.angle,speed=c.mode==="speed"?guess:c.speed;
  if(!isFinite(angle)||!isFinite(speed)||angle<=0||angle>=90||speed<=0)return;
  var range=projectileRange(speed,angle),difference=range-c.target,hit=Math.abs(difference)<=PROJECTILE_HOLE_TOLERANCE;
  var time=2*speed*Math.sin(angle*Math.PI/180)/PROJECTILE_G;
  var height=Math.pow(speed*Math.sin(angle*Math.PI/180),2)/(2*PROJECTILE_G);
  var solutions=projectileAngleSolutions(c.speed||speed,c.target);
  var expected=c.mode==="speed"?projectileExpectedSpeed(c.angle,c.target):speed;
  projectileGame.result={mode:c.mode,guess:guess,angle:angle,speed:speed,range:range,difference:difference,hit:hit,target:c.target,time:time,height:height,mass:c.mass,solutions:solutions,expected:expected};
  projectileGame.animating=true;
  var stats=projectileReadStats();stats.shots++;projectileSaveStats(stats);
  var outcome=document.getElementById("projectileOutcome");if(outcome)outcome.innerHTML="<div class='game-outcome idle' role='status' aria-live='polite'><span class='game-outcome-icon'>⚾</span><div><b>Ball in flight…</b><p>Follow the path to see where it lands.</p></div></div>";
  var launch=document.getElementById("projectileLaunch");if(launch)launch.disabled=true;field.disabled=true;
  var start=Date.now(),duration=1050;
  function finish(){
    projectileGame.animating=false;projectileGame.animFrame=null;
    if(hit&&!projectileGame.scored){var saved=projectileReadStats();saved.hits++;saved.streak++;saved.bestStreak=Math.max(saved.bestStreak,saved.streak);projectileSaveStats(saved);projectileGame.scored=true;if(typeof addXP==="function")addXP(10);if(typeof toast==="function")toast("Hole in one! +10 XP 🎯");}
    projectileSyncUI();
  }
  function step(){
    var progress=Math.min(1,(Date.now()-start)/duration);drawProjectileGame(progress);
    if(progress<1&&typeof requestAnimationFrame==="function")projectileGame.animFrame=requestAnimationFrame(step);else finish();
  }
  if(typeof requestAnimationFrame==="function")projectileGame.animFrame=requestAnimationFrame(step);else{drawProjectileGame(1);finish();}
}
function stopProjectileGameAnimation(){
  if(projectileGame.animFrame!=null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(projectileGame.animFrame);
  projectileGame.animFrame=null;projectileGame.animating=false;
}
function projectileCss(name,fallback){
  try{var value=getComputedStyle(document.documentElement).getPropertyValue(name).trim();return value||fallback;}catch(e){return fallback;}
}
function drawProjectileGame(progress){
  var canvas=document.getElementById("projectileCanvas"),c=projectileGame.challenge;
  if(!canvas||!c||typeof canvas.getContext!=="function")return;
  var rect=canvas.getBoundingClientRect?canvas.getBoundingClientRect():{width:800};
  var width=Math.max(280,rect.width||canvas.clientWidth||800),height=300,dpr=Math.min(window.devicePixelRatio||1,2);
  var pixelWidth=Math.round(width*dpr),pixelHeight=Math.round(height*dpr);
  if(canvas.width!==pixelWidth)canvas.width=pixelWidth;
  if(canvas.height!==pixelHeight)canvas.height=pixelHeight;
  var ctx=canvas.getContext("2d");if(!ctx)return;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  var paper=projectileCss("--book-paper","#fffdf7"),ink=projectileCss("--book-ink","#26372d"),muted=projectileCss("--book-ink-soft","#5f6b60"),sage=projectileCss("--book-sage","#788f72"),warm=projectileCss("--book-warm","#b58e59"),border=projectileCss("--book-border","#ddd7c9");
  var angle=c.mode==="angle"?Number(projectileGame.value):c.angle,speed=c.mode==="speed"?Number(projectileGame.value):c.speed;
  var radians=angle*Math.PI/180,flight=2*speed*Math.sin(radians)/PROJECTILE_G,range=projectileRange(speed,angle),peak=Math.pow(speed*Math.sin(radians),2)/(2*PROJECTILE_G);
  var maxDistance=progress==null?Math.max(c.target*1.36,12):Math.max(c.target*1.36,range*1.18,12),left=42,right=20,baseline=height-42,top=25;
  var xScale=(width-left-right)/maxDistance,yScale=(baseline-top)/Math.max(2.5,peak*1.25);
  function xAt(x){return left+x*xScale;}
  function yAt(y){return baseline-y*yScale;}
  ctx.clearRect(0,0,width,height);ctx.fillStyle=paper;ctx.fillRect(0,0,width,height);
  ctx.fillRect(0,baseline,width,height-baseline);
  // Quiet range grid and scale.
  var step=maxDistance>75?20:maxDistance>38?10:5;
  ctx.font="10px 'DM Mono',monospace";ctx.textAlign="center";ctx.textBaseline="top";
  for(var grid=0;grid<=maxDistance;grid+=step){var gx=xAt(grid);ctx.strokeStyle=border;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx,top);ctx.lineTo(gx,baseline);ctx.stroke();ctx.fillStyle=muted;ctx.fillText(grid+" m",gx,baseline+14);}
  ctx.strokeStyle=sage;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(left,baseline);ctx.lineTo(width-right,baseline);ctx.stroke();
  // Target hole, drawn at the same level as the launch point.
  var targetX=xAt(c.target),holeRadius=Math.max(7,Math.min(22,PROJECTILE_HOLE_TOLERANCE*xScale));
  ctx.fillStyle=warm;ctx.beginPath();ctx.ellipse(targetX,baseline,holeRadius,5,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=ink;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(targetX,baseline-6);ctx.lineTo(targetX,baseline-31);ctx.stroke();
  ctx.fillStyle=ink;ctx.textAlign="center";ctx.textBaseline="bottom";ctx.font="600 10px 'DM Mono',monospace";ctx.fillText("HOLE · "+c.target.toFixed(1)+" m",targetX,baseline-34);
  // Keep the course diagram neutral until an answer is fired. During the shot, reveal only the ball's trail so far.
  ctx.fillStyle=ink;ctx.beginPath();ctx.arc(xAt(0),baseline-4,5,0,Math.PI*2);ctx.fill();
  if(progress!=null){
    var shown=Math.max(1,Math.floor(70*Math.max(0,Math.min(1,progress))));
    ctx.beginPath();
    for(var i=0;i<=shown;i++){var t=flight*i/70,px=speed*Math.cos(radians)*t,py=speed*Math.sin(radians)*t-0.5*PROJECTILE_G*t*t;if(i===0)ctx.moveTo(xAt(px),yAt(py));else ctx.lineTo(xAt(px),yAt(py));}
    ctx.strokeStyle=sage;ctx.lineWidth=2.5;ctx.stroke();
    var elapsed=flight*Math.max(0,Math.min(1,progress)),bx=speed*Math.cos(radians)*elapsed,by=speed*Math.sin(radians)*elapsed-0.5*PROJECTILE_G*elapsed*elapsed;
    ctx.fillStyle="#b86d46";ctx.beginPath();ctx.arc(xAt(bx),yAt(Math.max(0,by)),7,0,Math.PI*2);ctx.fill();ctx.strokeStyle=paper;ctx.lineWidth=2;ctx.stroke();
    if(progress>=1){ctx.strokeStyle=warm;ctx.lineWidth=1.5;ctx.setLineDash([3,4]);ctx.beginPath();ctx.moveTo(xAt(range),baseline-1);ctx.lineTo(xAt(range),baseline-24);ctx.stroke();ctx.setLineDash([]);}
  }
  ctx.textAlign="left";ctx.textBaseline="top";ctx.fillStyle=muted;ctx.font="10px 'DM Mono',monospace";ctx.fillText(progress==null?"COURSE MAP · PATH HIDDEN UNTIL LAUNCH":"SHOT PATH · IDEAL PROJECTILE MODEL",left,7);
}
function vGames(){
  projectileEnsureChallenge();
  var c=projectileGame.challenge,stats=projectileReadStats(),angleMode=projectileGame.mode==="angle";
  var modeLabel=angleMode?"Find the angle":"Find the launch speed";
  var given=angleMode?"The launch speed is fixed at <b>"+c.speed.toFixed(1)+" m/s</b>. Choose an angle.":"The launch angle is fixed at <b>"+c.angle+"°</b>. Choose a speed.";
  var min=5,max=angleMode?85:28,step=0.1;
  var fixedLabel=angleMode?"Launch speed":"Fixed angle",fixedValue=angleMode?c.speed.toFixed(1)+" m/s":c.angle+"°";
  var activeButton=projectileGame.animating||projectileGame.scored?" disabled":"";
  var solution=projectileResultMarkup();
  return "<section class='games-hub'><header class='games-heading'><div><button class='games-back-link' onclick=\"go('home')\">← Bookshelf</button><div class='book-eyebrow'>IAL MASTERY · PHYSICS MINI-GAME</div><h1>🎯 Land it in the hole</h1><p>Use projectile motion to choose a launch angle or speed that drops the ball into the target.</p></div><div class='games-record' aria-label='Game record'><div><b>"+stats.hits+"</b><span>HOLES HIT</span></div><div><b>"+stats.streak+"</b><span>CURRENT STREAK</span></div><div><b>"+stats.bestStreak+"</b><span>BEST STREAK</span></div></div></header>"+
  "<div class='game-mode-switch' role='group' aria-label='Projectile challenge mode'><button class='game-mode-button"+(angleMode?" active":"")+"' onclick=\"setProjectileMode('angle')\" aria-pressed='"+angleMode+"'>⌖ Find the angle</button><button class='game-mode-button"+(!angleMode?" active":"")+"' onclick=\"setProjectileMode('speed')\" aria-pressed='"+(!angleMode)+"'>↗ Find the speed</button><button class='game-new-round' onclick='newProjectileChallenge()'>↻ New challenge</button></div>"+
  "<div class='projectile-game-layout'><section class='projectile-control-card'><div class='game-round-label'>CHALLENGE "+String(stats.rounds).padStart(2,"0")+" · "+(angleMode?"ANGLE MODE":"SPEED MODE")+"</div><h2>"+modeLabel+"</h2><p class='game-instruction'>"+given+" Land within <b>±0.25 m</b> of the hole center.</p>"+
  "<div class='game-givens'><div><span>BALL MASS</span><b>"+c.mass.toFixed(1)+" kg</b></div><div><span>"+fixedLabel.toUpperCase()+"</span><b>"+fixedValue+"</b></div><div><span>TARGET DISTANCE</span><b>"+c.target.toFixed(1)+" m</b></div></div>"+
  "<div class='game-answer-wrap'><div class='game-answer-heading'><label for='projectileGuess'>Enter your calculated "+(angleMode?"launch angle":"launch speed")+"</label></div><div class='game-number-field'><input id='projectileGuess' type='number' min='"+min+"' max='"+max+"' step='"+step+"' value='"+(projectileGame.value==null?"":projectileGame.value)+"' placeholder='Calculate then enter' inputmode='decimal' oninput='projectileGuessChanged(this.value)' aria-label='Enter "+(angleMode?"your calculated launch angle in degrees":"your calculated launch speed in metres per second")+"' aria-describedby='projectilePaperPrompt'><span id='projectileGuessUnit'>"+(angleMode?"°":"m/s")+"</span></div><p class='game-paper-prompt' id='projectilePaperPrompt'>✎ Work it out on paper first; enter your answer to 0.1 "+(angleMode?"degree":"m/s")+".</p></div>"+
  "<div class='game-equation-hint'><span>HINT</span><p>"+(angleMode?"For same-height landing: <b>R = v² sin(2θ) / g</b>. A range can have two valid angles.":"Rearrange the range equation: <b>v = √(gR / sin(2θ))</b>.")+"</p></div>"+
  "<div class='game-control-actions'><button id='projectileLaunch' class='btn btn-p' onclick='launchProjectile()'"+activeButton+">⚾ Fire calculated answer</button><span>g = 9.81 m/s²</span></div></section>"+
  "<section class='projectile-visual-card'><div class='projectile-visual-heading'><div><span>COURSE MAP</span><b>The flight path stays hidden until you fire</b></div><span class='projectile-live-tag'><i></i> CALCULATION MODE</span></div><div class='projectile-canvas-frame'><canvas id='projectileCanvas' width='800' height='300' role='img' aria-label='Course map showing the launch point and target hole; no trajectory is shown before a shot'>Course map showing the launch point, ground scale and target hole. The flight path is hidden until after you fire.</canvas></div><div class='projectile-caption'><span><i class='legend-launch'></i> launch point</span><span><i class='legend-target'></i> target hole</span><span>Work out the path on paper</span></div></section></div>"+
  "<div id='projectileOutcome' class='projectile-outcome-wrap'>"+solution+"</div>"+
  "<details class='projectile-learning'><summary>Why does the ball’s mass not change the answer?</summary><div><p>This first level assumes no air resistance and a level landing. Gravity pulls down with force <b>F = mg</b>; using <b>F = ma</b> gives <b>a = g</b>, so the mass cancels. Horizontal and vertical motion are independent.</p><p>For a launch and landing at the same height, time in the air is <b>t = 2v sin(θ) / g</b>. Horizontal range is <b>R = v cos(θ) · t = v² sin(2θ) / g</b>. With air resistance, mass and ball shape can matter.</p></div></details></section>";
}
