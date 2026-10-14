/* ============================================================
   TEST FOCUS — engine
   Renders the #/test page: Notes • Practice • Timed test.
   ALL content comes from TEST_FOCUS (js/test-focus.js) — swap
   that object for the next test and this file stays untouched.
   Every function is tf*-prefixed so it can't clash with app.js.
   ============================================================ */

/* ---------- state ---------- */
var TEST = {
  state: "setup",      /* setup | running | marking | results */
  sel: [],             /* selected question ids (default: all) */
  left: 0,             /* seconds remaining */
  total: 0,            /* total seconds for this attempt */
  marks: 0,            /* marks in the selection */
  intId: null,         /* timer interval id */
  paused: false,
  checks: {},          /* qid -> [bool per mark point] */
  score: 0,
  max: 0,
  pct: 0,
  band: "—",
  rows: [],            /* per-question {q, got} for results */
  auto: false          /* finished by the clock (vs manually) */
};

/* ---------- helpers ---------- */
function tfQ(id){
  for (var i=0;i<TEST_FOCUS.questions.length;i++){ if (TEST_FOCUS.questions[i].id===id) return TEST_FOCUS.questions[i]; }
  return null;
}
function tfEsc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function tfInitSel(){ if (!TEST.sel.length){ TEST.sel = TEST_FOCUS.questions.map(function(q){ return q.id; }); } }
function tfTotals(ids){
  var m=0; (ids||TEST.sel).forEach(function(id){ var q=tfQ(id); if (q) m+=q.marks; });
  return m;
}
function tfTimeSecs(marks){ return Math.ceil(marks*TEST_FOCUS.timePerMark)*60; }
function tfBand(p){ return p>=80?"A*":p>=70?"A":p>=60?"B":p>=50?"C":p>=40?"D":p>=30?"E":"U"; }
function tfBest(){ try{ return JSON.parse(localStorage.getItem("tfbest_"+TEST_FOCUS.id)||"null"); }catch(e){ return null; } }
function tfSaveBest(b){ try{ localStorage.setItem("tfbest_"+TEST_FOCUS.id, JSON.stringify(b)); }catch(e){} }
function tfClockStr(s){ s=Math.max(0,s|0); var m=Math.floor(s/60), r=s%60; return (m<10?"0":"")+m+":"+(r<10?"0":"")+r; }
function tfClockClass(s){ return s<60?"crit":(s<300?"warn":""); }
function stopTfTimer(){ if (TEST.intId){ clearInterval(TEST.intId); TEST.intId=null; } }

/* ---------- page shell ---------- */
function vTest(){
  if (!view.testTab) view.testTab="notes";
  tfInitSel();
  var QS=TEST_FOCUS.questions, N=QS.length, M=QS.reduce(function(a,q){ return a+q.marks; },0);
  var best=tfBest();
  var tabs=[["notes","📖 Notes"],["practice","📝 Practice questions"],["timed","⏱️ Timed test"]].map(function(t){
    return "<button class='tab"+(view.testTab===t[0]?" on":"")+"' style='--ac:#f59e0b' onclick=\"tfTab('"+t[0]+"')\">"+t[1]+"</button>";
  }).join("");
  var body = view.testTab==="practice"? tfPractice() : view.testTab==="timed"? tfTimed() : tfNotes();
  return "<div style='--ac:#f59e0b'>" +
    "<div class='q-toolbar'><h4 style='font-size:1.25rem'>🎯 "+tfEsc(TEST_FOCUS.title)+"</h4>" +
    "<p class='small muted'>"+tfEsc(TEST_FOCUS.spec)+" • "+tfEsc(TEST_FOCUS.subtitle) +
    " • "+N+" questions • "+M+" marks • full test ≈ "+Math.ceil(M*TEST_FOCUS.timePerMark)+" min" +
    (best?" • 🏆 best: <b>"+best.score+"/"+best.max+"</b> ("+best.pct+"% • "+tfEsc(best.band)+") on "+tfEsc(best.date):"") +
    "</p></div>" +
    "<div class='tf-tabs tabs'>"+tabs+"</div>" + body + "</div>";
}
function tfTab(t){ view.testTab=t; render(); window.scrollTo(0,0); }

/* ---------- NOTES tab ---------- */
function tfNotes(){
  return TEST_FOCUS.notes.map(function(n,i){
    return "<details class='tf-note'"+(i===0?" open":"")+"><summary><span class='tf-tag sm'>"+tfEsc(n.topic)+"</span> "+tfEsc(n.icon)+" "+tfEsc(n.title)+"</summary><div class='tf-note-body'>"+n.html+"</div></details>";
  }).join("");
}

/* ---------- practice card + reveals ---------- */
function tfPitHTML(pits){
  if (!pits||!pits.length) return "";
  var ic={"Examiner report":"🎓","Mark scheme":"📋","Dataset":"📦","Topic tip":"💡"};
  return "<b style='font-size:.85rem'>⚠️ Pitfalls</b><ul class='pit-list'>"+pits.map(function(p){
    return "<li><span class='pit-src'>"+(ic[p.s]||"•")+" "+tfEsc(p.s)+"</span>"+p.t+"</li>";
  }).join("")+"</ul>";
}
function tfQCard(q, mode){
  var head = "<div class='tf-q-head'><span class='tf-tag sm'>"+tfEsc(q.topic)+"</span><b>"+tfEsc(q.title)+"</b>" +
    "<span class='tf-marks"+(mode==="running"?" sm":"")+"'>"+q.marks+" mark"+(q.marks>1?"s":"")+"</span></div>" +
    "<div class='tiny muted'>"+tfEsc(q.source)+"</div>";
  if (mode==="practice"){
    var msTitle = q.official? "✅ Official mark scheme" : "📋 Indicative points";
    var msHTML = "<div class='tf-rev' id='tfrev-"+q.id+"-ms' style='display:none'><b>"+msTitle+"</b> <span class='tiny muted'>each bullet = 1 mark"+(q.ms.length>q.marks?"; any "+q.marks+" of them = full marks":"")+"</span><ul class='ms-list'>"+
      q.ms.map(function(m){ return "<li>"+m+"</li>"; }).join("")+"</ul>" +
      (q.levels?"<div class='qwc'><b>★ Levels:</b> "+q.levels+"</div>":"")+"</div>";
    var ansHTML = "<div class='tf-rev' id='tfrev-"+q.id+"-ans' style='display:none'><b>✍️ Model answer</b><div class='tf-stem'>"+q.answer+"</div></div>";
    var pitHTML = "<div class='tf-rev' id='tfrev-"+q.id+"-pit' style='display:none'>"+tfPitHTML(q.pitfalls)+"</div>";
    var btns = "<div class='tf-btns'>" +
      "<button class='btn btn-g btn-s' onclick=\"tfRev('"+q.id+"','ms')\">📋 "+(q.official?"Mark scheme":"Indicative points")+"</button>" +
      "<button class='btn btn-g btn-s' onclick=\"tfRev('"+q.id+"','ans')\">✍️ Model answer</button>" +
      "<button class='btn btn-g btn-s' onclick=\"tfRev('"+q.id+"','pit')\">⚠️ Pitfalls</button></div>";
    return "<div class='tf-q'>"+head+"<div class='tf-stem'>"+q.q+"</div>"+btns+msHTML+ansHTML+pitHTML+"</div>";
  }
  if (mode==="running"){
    var mins=Math.max(1,Math.ceil(q.marks*TEST_FOCUS.timePerMark));
    return "<div class='tf-q'>"+head+"<div class='tf-stem'>"+q.q+"</div><div class='tiny muted'>⏱ Suggested: ~"+mins+" min — no answers until you finish.</div></div>";
  }
  /* mode === "marking" */
  var checks = TEST.checks[q.id]||[];
  var msCheck = "<ul class='ms-list check'>"+q.ms.map(function(m,i){
    return "<li><label style='display:flex;gap:6px;cursor:pointer;align-items:flex-start'><input type='checkbox' style='margin-top:5px'"+(checks[i]?" checked":"")+" onchange=\"tfCheck('"+q.id+"',"+i+",this.checked)\"> <span>"+m+"</span></label></li>";
  }).join("")+"</ul>";
  var extra = "<details class='tf-note' style='margin-top:10px'><summary><span class='tf-tag sm'>check</span> Model answer + pitfalls</summary><div class='tf-note-body'><div class='tf-stem'>"+q.answer+"</div>"+tfPitHTML(q.pitfalls)+"</div></details>";
  return "<div class='tf-q'>"+head+"<div class='tf-stem'>"+q.q+"</div>" +
    "<div class='tf-rev' style='display:block'><b>🧮 Self-mark each point you wrote</b> <span class='tiny muted'>max "+q.marks+" awarded for this question</span>"+msCheck+(q.levels?"<div class='qwc'><b>★ Levels:</b> "+q.levels+"</div>":"")+"</div>"+extra+"</div>";
}
function tfRev(qid, which){
  var el=document.getElementById("tfrev-"+qid+"-"+which);
  if (el) el.style.display = (el.style.display==="none"||el.style.display==="") ? "block" : "none";
}

/* ---------- PRACTICE tab ---------- */
function tfPractice(){
  return "<div class='q-toolbar'><h4>📝 Practice questions</h4><p class='small muted'>No timer — answer each question first, then reveal the mark scheme, model answer and examiner pitfalls. Pitfalls: 🎓 examiner report • 📋 mark scheme • 📦 topic dataset • 💡 tip.</p></div>" +
    TEST_FOCUS.questions.map(function(q){ return tfQCard(q,"practice"); }).join("");
}

/* ---------- TIMED test ---------- */
function tfTimed(){
  if (TEST.state==="running") return tfRunning();
  if (TEST.state==="marking") return tfMarking();
  if (TEST.state==="results") return tfResults();
  return tfSetup();
}
function tfSetup(){
  tfInitSel();
  var boxes = TEST_FOCUS.questions.map(function(q){
    var on = TEST.sel.indexOf(q.id)>=0;
    return "<label class='tf-pick"+(on?" on":"")+"' id='tfpick-"+q.id+"'><input type='checkbox'"+(on?" checked":"")+" onchange=\"tfTogQ('"+q.id+"',this.checked)\"> <span class='tf-tag sm'>"+tfEsc(q.topic)+"</span> "+tfEsc(q.title)+" <span class='tf-marks sm' style='margin-left:auto'>"+q.marks+"m</span></label>";
  }).join("");
  var m=tfTotals(TEST.sel), best=tfBest();
  return "<div class='tf-setup'>" +
    "<h4>⏱️ Timed test — set it up</h4>" +
    "<p class='small muted'>Tick the questions to include. Time = "+TEST_FOCUS.timePerMark+" min per mark (≈ real-paper pace). Answers stay <b>hidden</b> until you finish — then you self-mark against the mark scheme, point by point.</p>" +
    "<div class='tf-checks'>"+boxes+"</div>" +
    "<div class='tf-setup-bar'>" +
    "<span class='tag hot' id='tfSelMarks'>"+m+" marks</span>" +
    "<span class='tag' id='tfSelTime'>⏱ "+Math.ceil(m*TEST_FOCUS.timePerMark)+" min</span>" +
    "<span class='tiny muted' id='tfSelCount'>"+TEST.sel.length+" of "+TEST_FOCUS.questions.length+" selected</span>" +
    "<button class='btn btn-g btn-xs' onclick='tfAll(true)'>Select all</button>" +
    "<button class='btn btn-g btn-xs' onclick='tfAll(false)'>Clear</button>" +
    "<button class='btn btn-p' id='tfStartBtn'"+(m?"":" disabled")+" onclick='tfStart()'>▶ Start test</button>" +
    "</div>" +
    (best?"<p class='tiny muted' style='margin-top:10px'>🏆 Your best on this test: <b>"+best.score+"/"+best.max+" ("+best.pct+"% • "+tfEsc(best.band)+")</b> — "+tfEsc(best.date)+"</p>":"") +
    "</div>";
}
function tfTogQ(id, on){
  var i=TEST.sel.indexOf(id);
  if (on && i<0) TEST.sel.push(id);
  if (!on && i>=0) TEST.sel.splice(i,1);
  var el=document.getElementById("tfpick-"+id); if (el) el.classList.toggle("on",on);
  tfTotalsLive();
}
function tfTotalsLive(){
  var m=tfTotals(TEST.sel);
  var a=document.getElementById("tfSelMarks"), b=document.getElementById("tfSelTime"), c=document.getElementById("tfSelCount"), s=document.getElementById("tfStartBtn");
  if (a) a.textContent=m+" marks";
  if (b) b.textContent="⏱ "+Math.ceil(m*TEST_FOCUS.timePerMark)+" min";
  if (c) c.textContent=TEST.sel.length+" of "+TEST_FOCUS.questions.length+" selected";
  if (s) s.disabled=!m;
}
function tfAll(on){
  TEST.sel = on? TEST_FOCUS.questions.map(function(q){ return q.id; }) : [];
  TEST_FOCUS.questions.forEach(function(q){
    var el=document.getElementById("tfpick-"+q.id);
    if (el){ var inp=el.querySelector("input"); if (inp) inp.checked=on; el.classList.toggle("on",on); }
  });
  tfTotalsLive();
}
function tfStart(){
  var m=tfTotals(TEST.sel);
  if (!m){ if (typeof toast==="function") toast("Tick at least one question!"); return; }
  TEST.marks=m; TEST.total=tfTimeSecs(m); TEST.left=TEST.total;
  TEST.checks={}; TEST.rows=[]; TEST.state="running"; TEST.paused=false; TEST.auto=false;
  stopTfTimer();
  TEST.intId=setInterval(function(){
    if (TEST.state!=="running"||TEST.paused) return;
    TEST.left--;
    if (TEST.left<=0){ TEST.left=0; tfTick(); tfFinish(true); return; }
    tfTick();
  },1000);
  view.testTab="timed"; render(); window.scrollTo(0,0);
}
/* Timer tick — updates ONLY the clock text/class and the bar width/class.
   Guards nulls: if the user navigates away the interval survives and
   the TEST state persists; finishing still works when they come back. */
function tfTick(){
  var c=document.getElementById("tfClock");
  if (c){ c.textContent=tfClockStr(TEST.left); c.className="tf-clock "+tfClockClass(TEST.left); }
  var f=document.getElementById("tfBar");
  if (f){ f.style.width=(TEST.total? 100*TEST.left/TEST.total : 0)+"%"; f.className="tf-bar-fill "+tfClockClass(TEST.left); }
}
function tfRunning(){
  var cards=TEST.sel.map(function(id){ var q=tfQ(id); return q? tfQCard(q,"running"):""; }).join("");
  return "<div class='tf-timer'>" +
    "<span class='tf-clock' id='tfClock'>"+tfClockStr(TEST.left)+"</span>" +
    "<span class='small muted'>"+TEST.sel.length+" questions • "+TEST.marks+" marks • answers hidden</span>" +
    "<div class='tf-timer-btns'>" +
    (TEST.paused? "<button class='btn btn-g btn-s' onclick='tfResume()'>▶ Resume</button>" : "<button class='btn btn-g btn-s' onclick='tfPause()'>⏸ Pause</button>") +
    "<button class='btn btn-p btn-s' onclick='tfFinish(false)'>Finish & mark 🏁</button>" +
    "<button class='btn btn-g btn-s' onclick='tfQuit()'>✕ Quit</button>" +
    "</div></div>" +
    (TEST.paused?"<div class='tf-paused'>⏸ Paused — the clock has stopped. Resume when you're ready.</div>":"") +
    "<div class='tf-bar'><div class='tf-bar-fill' id='tfBar' style='width:100%'></div></div>" +
    "<div style='background:rgba(239,68,68,.1);border:1px solid #ef4444;border-radius:10px;padding:10px;text-align:center;font-weight:700;color:#ef4444;margin-bottom:12px'>🚨 EXAM CONDITIONS — no notes, no peeking at the Practice tab. Work each question first; reveal only once you've finished the whole attempt.</div>" +
    cards;
}
function tfPause(){ if (TEST.state!=="running") return; TEST.paused=true; render(); }
function tfResume(){ if (TEST.state!=="running") return; TEST.paused=false; render(); }
function tfQuit(){
  if (TEST.state!=="running") return;
  var ok = (typeof confirm==="function")? confirm("Quit the timed test? This attempt's progress will be lost.") : true;
  if (!ok) return;
  stopTfTimer(); TEST.state="setup"; TEST.paused=false;
  render(); window.scrollTo(0,0);
}
function tfFinish(auto){
  if (TEST.state!=="running") return;
  stopTfTimer();
  TEST.state="marking"; TEST.auto=!!auto; TEST.paused=false;
  TEST.checks={};
  TEST.sel.forEach(function(id){ var q=tfQ(id); if (q) TEST.checks[id]=q.ms.map(function(){ return false; }); });
  render(); window.scrollTo(0,0);
  if (typeof toast==="function") toast(auto? "⏰ Time's up — mark yourself honestly!" : "Finished — mark yourself honestly!");
}

/* ---------- MARKING tab ---------- */
function tfCheck(qid, i, on){
  if (!TEST.checks[qid]) TEST.checks[qid]=[];
  TEST.checks[qid][i]=on;
  tfMarkLine();
}
function tfMarkLine(){
  var s=0, max=0;
  TEST.sel.forEach(function(id){
    var q=tfQ(id); if (!q) return;
    max+=q.marks;
    var n=0; (TEST.checks[id]||[]).forEach(function(c){ if (c) n++; });
    s+=Math.min(n,q.marks);
  });
  var el=document.getElementById("tfScoreLine");
  if (el) el.innerHTML="Current self-score: <b>"+s+" / "+max+"</b> ("+(max?Math.round(100*s/max):0)+"%)";
}
function tfMarking(){
  var cards=TEST.sel.map(function(id){ var q=tfQ(id); return q? tfQCard(q,"marking"):""; }).join("");
  return "<div class='q-toolbar'><h4>🧮 Mark yourself</h4><p class='small muted'>Tick every mark point you wrote in your answer — honestly. Extra points beyond a question's max don't count. Use the folded “Model answer + pitfalls” to check yourself.</p>" +
    "<div style='display:flex;gap:10px;align-items:center;flex-wrap:wrap'><span class='tag hot' id='tfScoreLine'></span>" +
    "<button class='btn btn-p' onclick='tfScore()'>🏁 Finish — show my score</button>" +
    "<button class='btn btn-g btn-s' onclick=\"tfTab('practice')\">📝 Review in practice first</button></div></div>"+cards;
}

/* ---------- scoring + results ---------- */
function tfScore(){
  var s=0, max=0;
  TEST.rows=[];
  TEST.sel.forEach(function(id){
    var q=tfQ(id); if (!q) return;
    max+=q.marks;
    var n=0; (TEST.checks[id]||[]).forEach(function(c){ if (c) n++; });
    var got=Math.min(n,q.marks); s+=got;
    TEST.rows.push({ q:q, got:got });
  });
  TEST.score=s; TEST.max=max;
  TEST.pct=max? Math.round(100*s/max):0;
  TEST.band=tfBand(TEST.pct);
  var best=tfBest();
  if (!best || TEST.pct>best.pct){
    tfSaveBest({ score:s, max:max, pct:TEST.pct, band:TEST.band, date:new Date().toLocaleDateString() });
  }
  TEST.state="results";
  render(); window.scrollTo(0,0);
}
function tfResults(){
  var msg = TEST.pct>=80? "A* territory — superb control of 1B + 1C. 🌟"
    : TEST.pct>=70? "A grade — excellent. Keep sharpening those level-3 answers. 🎉"
    : TEST.pct>=60? "B — strong base. Now chase the detail marks. 💪"
    : TEST.pct>=50? "C — you know the outline; chain your points into full explanations. 📈"
    : TEST.pct>=30? "D — the Notes tab will pay off fast. Revisit it, then retake. 🌱"
    : "U — don't panic. Read the notes, then retake half the test. 🔁";
  var best=tfBest();
  var rows=TEST.rows.map(function(r){
    var q=r.q;
    return "<tr><td><span class='tf-tag sm'>"+tfEsc(q.topic)+"</span> "+tfEsc(q.title)+"</td><td class='mono'>"+r.got+" / "+q.marks+"</td></tr>";
  }).join("");
  return "<div class='tf-result'>" +
    "<div class='tf-score-ring'><b>"+TEST.score+" / "+TEST.max+"</b><span>"+TEST.pct+"% • Band "+tfEsc(TEST.band)+"</span></div>" +
    "<h3>"+msg+"</h3>" +
    "<p class='small muted' style='margin-top:8px'>Stretch bands — real WBI11 grade boundaries are usually <b>lower</b> than these (check the session boundary document), so your true band is probably better.</p>" +
    "<p class='tiny muted' style='margin-top:6px'>"+(TEST.auto?"⏰ Auto-submitted when the timer hit zero.":"Finished by you before the timer.")+
    (best?" • 🏆 Best on record: <b>"+best.score+"/"+best.max+"</b> ("+best.pct+"% • "+tfEsc(best.band)+") — "+tfEsc(best.date):"")+"</p>" +
    "</div>" +
    "<div class='q-toolbar'><h4>📋 Breakdown by question</h4><div style='overflow:auto'><table class='mini'><tr><th>Question</th><th>Your marks</th></tr>"+rows+"</table></div></div>" +
    "<div class='tf-btns' style='margin:14px 0'>" +
    "<button class='btn btn-g' onclick=\"tfTab('practice')\">📝 Review in Practice</button>" +
    "<button class='btn btn-p' onclick='tfRetake()'>↻ Retake</button>" +
    "<button class='btn btn-g' onclick=\"tfTab('notes')\">📖 Back to notes</button>" +
    "</div>";
}
function tfRetake(){
  stopTfTimer();
  TEST.state="setup"; TEST.paused=false; TEST.auto=false;
  TEST.checks={}; TEST.rows=[]; TEST.score=0; TEST.max=0; TEST.pct=0; TEST.band="—";
  render(); window.scrollTo(0,0);
}
