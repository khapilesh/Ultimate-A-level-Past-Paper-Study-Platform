/* Projectile-motion mini-game. Motion components and trajectories use syllabus SUVAT equations. */
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
  return {rounds:Number(s.rounds)||0,shots:Number(s.shots)||0,hits:Number(s.hits)||0,streak:Number(s.streak)||0,bestStreak:Number(s.bestStreak)||0};
}
function projectileSaveStats(stats){
  var data={};
  try{data=JSON.parse(localStorage.getItem("ial-games")||"{}");}catch(e){data={};}
  data.projectile=stats;
  try{localStorage.setItem("ial-games",JSON.stringify(data));}catch(e){}
}
function projectileRandomInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function projectileRound(value,places){var p=Math.pow(10,places||0);return Math.round(value*p)/p;}
function projectileComponents(speed,angle){
  var radians=angle*Math.PI/180;
  return {ux:speed*Math.cos(radians),uy:speed*Math.sin(radians)};
}
function projectileSUVATDisplacement(u,a,time){return u*time+0.5*a*time*time;}
function projectileFlightTime(uy){return uy>0?2*uy/PROJECTILE_G:0;}
function projectileSolveFromAxes(horizontalDisplacement,time){
  if(!(time>0))return {ux:0,uy:0,angle:0,speed:0,height:0};
  var sy=0,ay=-PROJECTILE_G,ax=0;
  var uy=(sy-0.5*ay*time*time)/time;
  var ux=(horizontalDisplacement-0.5*ax*time*time)/time;
  var height=(0-uy*uy)/(2*ay);
  return {ux:ux,uy:uy,angle:Math.atan2(uy,ux)*180/Math.PI,speed:Math.sqrt(ux*ux+uy*uy),height:height};
}
function projectileScenario(speed,angle){
  var initial=projectileComponents(speed,angle),time=projectileRound(projectileFlightTime(initial.uy),3);
  var target=projectileRound(projectileSUVATDisplacement(initial.ux,0,time),2);
  return {time:time,target:target,solution:projectileSolveFromAxes(target,time)};
}
function projectileEnsureChallenge(){if(!projectileGame.challenge)projectileNewChallenge();}
function projectileNewChallenge(){
  if(projectileGame.animFrame!=null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(projectileGame.animFrame);
  projectileGame.animFrame=null;projectileGame.animating=false;
  if(projectileGame.challenge&&!projectileGame.scored){var prior=projectileReadStats();prior.streak=0;projectileSaveStats(prior);}
  var mass=projectileRound(projectileRandomInt(1,13)/2,1),challenge;
  if(projectileGame.mode==="angle"){
    var seedSpeed=projectileRandomInt(14,23),seedAngle=projectileRandomInt(22,36),angleScenario=projectileScenario(seedSpeed,seedAngle);
    challenge={mode:"angle",mass:mass,speed:angleScenario.solution.speed,angle:null,target:angleScenario.target,time:angleScenario.time};
  }else{
    var seedFixedAngle=projectileRandomInt(25,65),seedSpeedForMode=projectileRandomInt(10,21),speedScenario=projectileScenario(seedSpeedForMode,seedFixedAngle);
    challenge={mode:"speed",mass:mass,speed:null,angle:speedScenario.solution.angle,target:speedScenario.target,time:speedScenario.time};
  }
  projectileGame.challenge=challenge;projectileGame.value="";projectileGame.result=null;projectileGame.scored=false;
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
  projectileGame.value=num;drawProjectileGame(null);
}
function projectileResultMarkup(){
  var r=projectileGame.result;
  if(!r)return "<div class='game-outcome idle' role='status'><span class='game-outcome-icon'>✎</span><div><b>Work it out before you fire</b><p>Use the three vertical and horizontal SUVAT values on paper. The trajectory stays hidden until after your shot.</p></div></div>";
  var message=r.hit?"A hole in one! The ball lands inside the target.":(r.difference>0?"Long shot — it overshot the hole by "+Math.abs(r.difference).toFixed(1)+" m.":"Short shot — it fell "+Math.abs(r.difference).toFixed(1)+" m before the hole.");
  var answer,working;
  var solved=projectileSolveFromAxes(r.target,r.givenTime),t=r.givenTime.toFixed(3),sx=r.target.toFixed(2);
  var vertical="Vertical SUVAT: 0 = uᵧ × "+t+" + ½(−9.81) × "+t+"², so uᵧ = "+solved.uy.toFixed(3)+" m/s.";
  var horizontal="Horizontal SUVAT: "+sx+" = uₓ × "+t+" + ½(0) × "+t+"², so uₓ = "+solved.ux.toFixed(3)+" m/s.";
  if(r.mode==="angle"){
    answer=solved.angle.toFixed(1)+"°";
    working=vertical+" "+horizontal+" Then θ = tan⁻¹(uᵧ/uₓ) = "+answer+".";
  }else{
    answer=solved.speed.toFixed(1)+" m/s";
    working=vertical+" "+horizontal+" Then u = √(uₓ² + uᵧ²) = "+answer+".";
  }
  return "<div class='game-outcome "+(r.hit?"success":"miss")+"' role='status' aria-live='polite'><span class='game-outcome-icon'>"+(r.hit?"🎯":"🪁")+"</span><div class='game-outcome-copy'><b>"+message+"</b><p>Last shot: "+(r.mode==="angle"?r.guess.toFixed(1)+"°":""+r.guess.toFixed(1)+" m/s")+" · landed at "+r.range.toFixed(2)+" m (target "+r.target.toFixed(2)+" m).</p>"+
    "<details class='game-solution'><summary>Check the SUVAT working</summary><p><b>Answer:</b> "+answer+"</p><p>"+working+"</p><p>Flight time: "+r.flightTime.toFixed(2)+" s · maximum height: "+r.height.toFixed(2)+" m. The height follows from vᵧ² = uᵧ² + 2aᵧsᵧ, with vᵧ = 0 at the peak.</p><p>Ball mass: "+r.mass.toFixed(1)+" kg. In this no-drag model, the downward force gives aᵧ = −mg/m = −g.</p></details>"+
    (r.hit?"<div class='game-xp-note'>+10 XP added to your study progress. Ready for another target?</div>":"<div class='game-retry-note'>Change your answer and try again; the worked SUVAT solution stays hidden until you open it.</div>")+"</div></div>";
}
function launchProjectile(){
  projectileEnsureChallenge();
  if(projectileGame.animating||projectileGame.scored)return;
  var c=projectileGame.challenge,field=document.getElementById("projectileGuess");
  if(!field||field.value===""){if(typeof toast==="function")toast("Calculate your answer with SUVAT, then enter it here.");if(field&&field.focus)field.focus();return;}
  var guess=Number(field.value),min=5,max=c.mode==="angle"?85:28;
  if(!isFinite(guess)||guess<min||guess>max){if(typeof toast==="function")toast("Enter a value between "+min+" and "+max+".");if(field.focus)field.focus();return;}
  projectileGame.value=guess;
  var angle=c.mode==="angle"?guess:c.angle,speed=c.mode==="speed"?guess:c.speed;
  if(!isFinite(angle)||!isFinite(speed)||angle<=0||angle>=90||speed<=0)return;
  var initial=projectileComponents(speed,angle),flightTime=projectileFlightTime(initial.uy);
  var range=projectileSUVATDisplacement(initial.ux,0,flightTime),difference=range-c.target,hit=Math.abs(difference)<=PROJECTILE_HOLE_TOLERANCE;
  var height=(0-initial.uy*initial.uy)/(2*(-PROJECTILE_G));
  projectileGame.result={mode:c.mode,guess:guess,angle:angle,speed:speed,range:range,difference:difference,hit:hit,target:c.target,givenTime:c.time,flightTime:flightTime,height:height,mass:c.mass};
  projectileGame.animating=true;
  var stats=projectileReadStats();stats.shots++;projectileSaveStats(stats);
  var outcome=document.getElementById("projectileOutcome");if(outcome)outcome.innerHTML="<div class='game-outcome idle' role='status' aria-live='polite'><span class='game-outcome-icon'>⚾</span><div><b>Ball in flight…</b><p>Follow the shot path to see where it lands.</p></div></div>";
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
  var active=progress!=null,angle=active?(c.mode==="angle"?Number(projectileGame.value):c.angle):(c.mode==="angle"?45:c.angle),speed=active?(c.mode==="speed"?Number(projectileGame.value):c.speed):(c.mode==="angle"?c.speed:15);
  var initial=projectileComponents(speed,angle),flight=projectileFlightTime(initial.uy),range=projectileSUVATDisplacement(initial.ux,0,flight),peak=(0-initial.uy*initial.uy)/(2*(-PROJECTILE_G));
  var maxDistance=active?Math.max(c.target*1.36,range*1.18,12):Math.max(c.target*1.36,12),left=42,right=20,baseline=height-42,top=25;
  var xScale=(width-left-right)/maxDistance,yScale=(baseline-top)/Math.max(2.5,peak*1.25);
  function xAt(x){return left+x*xScale;}
  function yAt(y){return baseline-y*yScale;}
  ctx.clearRect(0,0,width,height);ctx.fillStyle=paper;ctx.fillRect(0,0,width,height);ctx.fillRect(0,baseline,width,height-baseline);
  var tick=maxDistance>75?20:maxDistance>38?10:5;
  ctx.font="10px 'DM Mono',monospace";ctx.textAlign="center";ctx.textBaseline="top";
  for(var grid=0;grid<=maxDistance;grid+=tick){var gx=xAt(grid);ctx.strokeStyle=border;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx,top);ctx.lineTo(gx,baseline);ctx.stroke();ctx.fillStyle=muted;ctx.fillText(grid+" m",gx,baseline+14);}
  ctx.strokeStyle=sage;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(left,baseline);ctx.lineTo(width-right,baseline);ctx.stroke();
  var targetX=xAt(c.target),holeRadius=Math.max(7,Math.min(22,PROJECTILE_HOLE_TOLERANCE*xScale));
  ctx.fillStyle=warm;ctx.beginPath();ctx.ellipse(targetX,baseline,holeRadius,5,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle=ink;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(targetX,baseline-6);ctx.lineTo(targetX,baseline-31);ctx.stroke();
  ctx.fillStyle=ink;ctx.textAlign="center";ctx.textBaseline="bottom";ctx.font="600 10px 'DM Mono',monospace";ctx.fillText("HOLE · "+c.target.toFixed(2)+" m",targetX,baseline-34);
  ctx.fillStyle=ink;ctx.beginPath();ctx.arc(xAt(0),baseline-4,5,0,Math.PI*2);ctx.fill();
  if(active){
    var shown=Math.max(1,Math.floor(70*Math.max(0,Math.min(1,progress))));ctx.beginPath();
    for(var i=0;i<=shown;i++){var t=flight*i/70,px=projectileSUVATDisplacement(initial.ux,0,t),py=projectileSUVATDisplacement(initial.uy,-PROJECTILE_G,t);if(i===0)ctx.moveTo(xAt(px),yAt(py));else ctx.lineTo(xAt(px),yAt(py));}
    ctx.strokeStyle=sage;ctx.lineWidth=2.5;ctx.stroke();
    var elapsed=flight*Math.max(0,Math.min(1,progress)),bx=projectileSUVATDisplacement(initial.ux,0,elapsed),by=projectileSUVATDisplacement(initial.uy,-PROJECTILE_G,elapsed);
    ctx.fillStyle="#b86d46";ctx.beginPath();ctx.arc(xAt(bx),yAt(Math.max(0,by)),7,0,Math.PI*2);ctx.fill();ctx.strokeStyle=paper;ctx.lineWidth=2;ctx.stroke();
    if(progress>=1){ctx.strokeStyle=warm;ctx.lineWidth=1.5;ctx.setLineDash([3,4]);ctx.beginPath();ctx.moveTo(xAt(range),baseline-1);ctx.lineTo(xAt(range),baseline-24);ctx.stroke();ctx.setLineDash([]);}
  }
  ctx.textAlign="left";ctx.textBaseline="top";ctx.fillStyle=muted;ctx.font="10px 'DM Mono',monospace";ctx.fillText(active?"SHOT PATH · SUVAT MODEL":"COURSE MAP · PATH HIDDEN UNTIL LAUNCH",left,7);
}
function projectileSuvatAxisCard(title,sLabel,sValue,aLabel,aValue,timeValue){
  return "<section class='suvat-axis-card'><div class='suvat-axis-heading'><b>"+title+"</b><span>3 known values</span></div><div class='suvat-axis-values'><div><span>"+sLabel+"</span><b>"+sValue+"</b></div><div><span>"+aLabel+"</span><b>"+aValue+"</b></div><div><span>t</span><b>"+timeValue.toFixed(3)+" s</b></div></div></section>";
}
function vGames(){
  projectileEnsureChallenge();
  var c=projectileGame.challenge,stats=projectileReadStats(),angleMode=projectileGame.mode==="angle";
  var modeLabel=angleMode?"Find the angle":"Find the launch speed";
  var given=angleMode?"The launch speed is fixed at <b>"+c.speed.toFixed(2)+" m/s</b>. Use both sets of SUVAT values to find the angle.":"The launch angle is fixed at <b>"+c.angle.toFixed(2)+"°</b>. Use both sets of SUVAT values to find the speed.";
  var min=5,max=angleMode?85:28,step=0.1;
  var fixedLabel=angleMode?"Fixed launch speed":"Fixed angle",fixedValue=angleMode?c.speed.toFixed(2)+" m/s":c.angle.toFixed(2)+"°";
  var activeButton=projectileGame.animating||projectileGame.scored?" disabled":"";
  var motionData="<div class='suvat-data-heading'><span>GIVEN MOTION VALUES</span><b>Three known values per direction · flight time is shared</b></div><div class='suvat-data-grid'>"+
    projectileSuvatAxisCard("Vertical motion (y)","sᵧ","0.00 m","aᵧ","−9.81 m/s²",c.time)+
    projectileSuvatAxisCard("Horizontal motion (x)","sₓ",c.target.toFixed(2)+" m","aₓ","0.00 m/s²",c.time)+"</div>";
  var hint=angleMode?"Use s = ut + ½at² in each direction to find uᵧ and uₓ, then θ = tan⁻¹(uᵧ/uₓ).":"Use s = ut + ½at² to find uᵧ and uₓ, then combine the perpendicular components: u = √(uₓ² + uᵧ²).";
  var solution=projectileResultMarkup();
  return "<section class='games-hub'><header class='games-heading'><div><button class='games-back-link' onclick=\"go('home')\">← Bookshelf</button><div class='book-eyebrow'>IAL MASTERY · PHYSICS MINI-GAME</div><h1>🎯 Land it in the hole</h1><p>Calculate the launch setting from vertical and horizontal SUVAT data; the flight path stays hidden until your shot.</p></div><div class='games-record' aria-label='Game record'><div><b>"+stats.hits+"</b><span>HOLES HIT</span></div><div><b>"+stats.streak+"</b><span>CURRENT STREAK</span></div><div><b>"+stats.bestStreak+"</b><span>BEST STREAK</span></div></div></header>"+
  "<div class='game-mode-switch' role='group' aria-label='Projectile challenge mode'><button class='game-mode-button"+(angleMode?" active":"")+"' onclick=\"setProjectileMode('angle')\" aria-pressed='"+angleMode+"'>⌖ Find the angle</button><button class='game-mode-button"+(!angleMode?" active":"")+"' onclick=\"setProjectileMode('speed')\" aria-pressed='"+(!angleMode)+"'>↗ Find the speed</button><button class='game-new-round' onclick='newProjectileChallenge()'>↻ New challenge</button></div>"+
  "<div class='projectile-game-layout'><section class='projectile-control-card'><div class='game-round-label'>CHALLENGE "+String(stats.rounds).padStart(2,"0")+" · "+(angleMode?"ANGLE MODE":"SPEED MODE")+"</div><h2>"+modeLabel+"</h2><p class='game-instruction'>"+given+" Land within <b>±0.25 m</b> of the hole center.</p>"+
  "<div class='game-givens'><div><span>BALL MASS</span><b>"+c.mass.toFixed(1)+" kg</b></div><div><span>"+fixedLabel.toUpperCase()+"</span><b>"+fixedValue+"</b></div></div>"+motionData+
  "<div class='game-answer-wrap'><div class='game-answer-heading'><label for='projectileGuess'>Enter your calculated "+(angleMode?"launch angle":"launch speed")+"</label></div><div class='game-number-field'><input id='projectileGuess' type='number' min='"+min+"' max='"+max+"' step='"+step+"' value='"+(projectileGame.value==null?"":projectileGame.value)+"' placeholder='Calculate then enter' inputmode='decimal' oninput='projectileGuessChanged(this.value)' aria-label='Enter "+(angleMode?"your calculated launch angle in degrees":"your calculated launch speed in metres per second")+"' aria-describedby='projectilePaperPrompt'><span id='projectileGuessUnit'>"+(angleMode?"°":"m/s")+"</span></div><p class='game-paper-prompt' id='projectilePaperPrompt'>✎ Work it out on paper first; enter your answer to 0.1 "+(angleMode?"degree":"m/s")+".</p></div>"+
  "<div class='game-equation-hint'><span>SUVAT</span><p>"+hint+"</p></div>"+
  "<div class='game-control-actions'><button id='projectileLaunch' class='btn btn-p' onclick='launchProjectile()'"+activeButton+">⚾ Fire calculated answer</button><span>g = 9.81 m/s²</span></div></section>"+
  "<section class='projectile-visual-card'><div class='projectile-visual-heading'><div><span>COURSE MAP</span><b>The flight path stays hidden until you fire</b></div><span class='projectile-live-tag'><i></i> CALCULATION MODE</span></div><div class='projectile-canvas-frame'><canvas id='projectileCanvas' width='800' height='300' role='img' aria-label='Course map showing the launch point and target hole; no trajectory is shown before a shot'>Course map showing the launch point, ground scale and target hole. The flight path is hidden until after you fire.</canvas></div><div class='projectile-caption'><span><i class='legend-launch'></i> launch point</span><span><i class='legend-target'></i> target hole</span><span>Work out the path on paper</span></div></section></div>"+
  "<div id='projectileOutcome' class='projectile-outcome-wrap'>"+solution+"</div>"+
  "<details class='projectile-learning'><summary>Why does the ball’s mass not change the answer?</summary><div><p>This level assumes no air resistance and a level landing. Gravity pulls down with force <b>F = mg</b>; using <b>F = ma</b> gives <b>aᵧ = −g</b>, so mass cancels.</p><p>Use only the syllabus motion equations: <b>sᵧ = uᵧt + ½aᵧt²</b> vertically and <b>sₓ = uₓt + ½aₓt²</b> horizontally. Here <b>sᵧ = 0</b>, <b>aᵧ = −g</b> and <b>aₓ = 0</b>; solve the initial components, then use them to find angle or speed.</p><p>At maximum height, <b>vᵧ = 0</b>; use <b>vᵧ² = uᵧ² + 2aᵧsᵧ</b> to find the height.</p></div></details></section>";
}
