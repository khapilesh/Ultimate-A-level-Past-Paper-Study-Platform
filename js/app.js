/* IAL Mastery — application logic */
var SUBJECTS = { physics: SUBJECT_PHYSICS, chemistry: SUBJECT_CHEMISTRY, biology: SUBJECT_BIOLOGY, maths: SUBJECT_MATHS };
var QBANK = { physics: QBANK_PHYSICS, chemistry: QBANK_CHEMISTRY, biology: QBANK_BIOLOGY, maths: QBANK_MATHS };

/* ---------- progress store ---------- */
var store = {
  get: function(){ try{ return JSON.parse(localStorage.getItem("ial-progress")||"{}"); }catch(e){ return {}; } },
  set: function(p){ localStorage.setItem("ial-progress", JSON.stringify(p)); }
};
function P(){ var p=store.get(); p.topics=p.topics||{}; p.q=p.q||{}; p.xp=p.xp||0; p.best=p.best||{}; return p; }
function saveP(p){ store.set(p); updateXP(); }
function addXP(n){ var p=P(); p.xp+=n; saveP(p); }
function updateXP(){ var p=P(); var el=document.getElementById("xpPill"); if(el) el.textContent="⚡ "+p.xp+" XP"; }
// streak
(function(){ var p=P(), t=new Date().toDateString();
  if(p.last!==t){ var y=new Date(Date.now()-864e5).toDateString(); p.streak=(p.last===y)?(p.streak||0)+1:1; p.last=t; saveP(p); }
})();
function toast(msg){ var t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(function(){t.classList.remove("show");},2400); }
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* ---------- helpers over data ---------- */
function subj(sid){ return SUBJECTS[sid]; }
function unitOf(sid,uid){ return subj(sid).units.find(function(u){return u.id===uid;}); }
function topicOf(sid,uid,tid){ var u=unitOf(sid,uid); return u?u.topics.find(function(t){return t.id===tid;}):null; }
function unitQuestions(sid,uid){ return (QBANK[sid]&&QBANK[sid][uid])||[]; }
function counts(){ var t=0,q=0; Object.keys(SUBJECTS).forEach(function(s){ SUBJECTS[s].units.forEach(function(u){ t+=u.topics.length; q+=unitQuestions(s,u.id).length; }); }); return {topics:t,questions:q}; }
function subjectProgress(sid){
  var p=P(),S=subj(sid),done=0,total=0,qd=0,qt=0;
  S.units.forEach(function(u){ u.topics.forEach(function(t){ total++; if(p.topics[sid+":"+t.id]) done++; });
    unitQuestions(sid,u.id).forEach(function(q){ qt++; if(p.q[q.id]) qd++; }); });
  return {done:done,total:total,qd:qd,qt:qt,pct:total?Math.round(100*(done+qd)/(total+qt)):0};
}

/* ---------- router ---------- */
var view = { sid:"physics", uid:null, tab:0, tid:null, qmode:"topical", qtopics:[], qdiff:"all", qsearch:"", mock:null, timerH:null, left:0, flashIdx:0, flashFlip:false };
function go(path, tab){ if(tab!=null) view.tab=tab; location.hash="#/"+path; }
window.addEventListener("hashchange", render);
document.addEventListener("click", function(e){ var sr=document.getElementById("searchResults"); if(sr&&!e.target.closest(".searchbox")) sr.style.display="none"; });
document.addEventListener("keydown", function(e){ if(e.key==="/"&&document.activeElement.tagName!=="INPUT"){ e.preventDefault(); document.getElementById("globalSearch").focus(); } });
function toggleTheme(){ var h=document.documentElement; h.dataset.theme=(h.dataset.theme==="dark")?"light":"dark"; localStorage.setItem("ial-theme",h.dataset.theme); }
(function(){ var t=localStorage.getItem("ial-theme"); if(t) document.documentElement.dataset.theme=t; })();

function render(){
  stopTimer();
  var h=(location.hash||"#/home").replace(/^#\//,""), parts=h.split("/");
  document.querySelectorAll("#navLinks button").forEach(function(b){ b.classList.toggle("on", b.dataset.nav===parts[0]||(parts[0]==="subject"&&b.dataset.nav===parts[1])||(parts[0]==="topic"&&b.dataset.nav===parts[1])); });
  var app=document.getElementById("app");
  if(parts[0]==="subject"&&SUBJECTS[parts[1]]){ view.sid=parts[1]; if(!unitOf(view.sid,view.uid)) view.uid=SUBJECTS[view.sid].units[0].id; if(!topicInUnit()) view.tid=null; app.innerHTML=vSubject(); afterSubject(); }
  else if(parts[0]==="topic"&&SUBJECTS[parts[1]]){ view.sid=parts[1]; view.uid=parts[2]; view.tid=parts[3]; view.tab=0; app.innerHTML=vTopic(); window.scrollTo(0,0); }
  else if(parts[0]==="progress"){ app.innerHTML=vProgress(); window.scrollTo(0,0); }
  else { app.innerHTML=vHome(); window.scrollTo(0,0); }
  updateXP();
}
function topicInUnit(){ if(!view.tid) return false; return !!topicOf(view.sid,view.uid,view.tid); }

/* ================= HOME ================= */
function vHome(){
  var c=counts(), p=P();
  var cards=Object.keys(SUBJECTS).map(function(sid){
    var S=SUBJECTS[sid], pr=subjectProgress(sid);
    var units=S.units.map(function(u){return u.short;}).join(" • ");
    return "<div class='subj-card' style='--ac:"+S.color+"' onclick=\"go('subject/"+sid+"')\">"+
      "<div class='ico'>"+S.icon+"</div><h3>"+S.name+"</h3><p>"+S.desc+"</p>"+
      "<div class='meta'><span class='tag hot'>"+S.qual+"</span><span class='tag'>"+S.units.length+" units</span><span class='tag'>"+pr.qt+" topical Qs</span></div>"+
      "<div class='pbar'><i style='width:"+pr.pct+"%'></i></div><div class='tiny muted' style='margin-top:6px'>"+pr.pct+"% complete • "+units+"</div></div>";
  }).join("");
  return ""+
  "<section class='hero'><div class='kicker'>🎓 EDEXCEL INTERNATIONAL A LEVEL • 2026</div>"+
  "<h1>Master <span class='grad'>Physics, Chemistry,<br>Biology & Maths</span> — One Platform</h1>"+
  "<p class='sub'>Topic-wise past-paper questions with mark schemes, crystal-clear revision notes for <b>every syllabus topic</b>, a timed mock-exam builder, and an AI tutor — all tuned to the current Edexcel IAL specs.</p>"+
  "<div class='hero-cta'><button class='btn btn-p' onclick=\"go('subject/physics',1)\">📝 Start past-paper practice</button><button class='btn btn-g' onclick=\"go('subject/chemistry',0)\">📖 Revise a topic</button></div>"+
  "<div class='hero-stats'><div class='hstat'><b>"+c.questions+"+</b><span>TOPICAL QUESTIONS</span></div><div class='hstat'><b>"+c.topics+"</b><span>SYLLABUS TOPICS</span></div><div class='hstat'><b>24</b><span>UNITS COVERED</span></div><div class='hstat'><b>🔥 "+(p.streak||1)+"</b><span>DAY STREAK</span></div></div></section>"+
  "<h2 class='sec-title'>Choose your subject</h2><p class='sec-sub'>Each subject has <b>Revise</b> • <b>Past Paper Questions</b> • <b>Ask AI</b> tabs. Progress saves automatically.</p>"+
  "<div class='subj-grid'>"+cards+"</div>"+
  "<h2 class='sec-title'>Why this works</h2><p class='sec-sub'>Built around how A* students actually revise.</p>"+
  "<div class='feat-grid'>"+
  "<div class='feat'><div class='n'>📝</div><h4>Past papers, topic-wise (priority #1)</h4><p>Every unit's questions tagged by topic — tick <b>multiple topics</b> for mixed sets, exactly like real papers.</p><ul><li>Exam-style Qs modelled on real WPH/WCH/WBI/WMA papers</li><li>Full mark-scheme answers + hints + difficulty ratings</li><li>Timed <b>Mock Builder</b> with score tracking</li><li>Full archive index: every session 2019–2026 + official QP/MS links</li></ul></div>"+
  "<div class='feat'><div class='n'>📖</div><h4>Revision notes that respect your time</h4><p>Every syllabus topic distilled into point-form notes.</p><ul><li>Key points, formulae, definitions, worked examples</li><li>⚠️ classic mistakes + ⭐ examiner tips per topic</li><li>🔮 out-of-syllabus enrichment (clearly labelled)</li><li>Flashcards + topic checklists with progress</li></ul></div>"+
  "<div class='feat'><div class='n'>🤖</div><h4>Ask AI tutor</h4><p>Stuck? Ask in plain English — the built-in tutor explains, defines, quizzes and links you to practice.</p><ul><li>Knows the whole syllabus offline — no account needed</li><li><i>Explain… / Quiz me on… / Formula for…</i></li><li>Optional: plug in your own API key for full AI chat</li></ul></div>"+
  "</div>"+
  "<h2 class='sec-title'>Know your targets — Physics A thresholds (June 2025)</h2><p class='sec-sub'>Real unit thresholds so you can aim precisely. Thresholds vary slightly each session — check the linked hubs for your series.</p>"+
  "<div style='overflow:auto'><table class='grade'><tr><th>Unit</th><th>Paper</th><th>Max</th><th>A grade</th><th>%</th></tr>"+
  "<tr><td>U1 Mechanics & Materials</td><td>WPH11</td><td>80</td><td>59</td><td>74%</td></tr>"+
  "<tr><td>U2 Waves & Electricity</td><td>WPH12</td><td>80</td><td>58</td><td>73%</td></tr>"+
  "<tr><td>U3 Practical I</td><td>WPH13</td><td>50</td><td>36</td><td>72%</td></tr>"+
  "<tr><td>U4 Fields & Particles</td><td>WPH14</td><td>90</td><td>71</td><td>79%</td></tr>"+
  "<tr><td>U5 Thermo & Cosmology</td><td>WPH15</td><td>90</td><td>71</td><td>79%</td></tr>"+
  "<tr><td>U6 Practical II</td><td>WPH16</td><td>50</td><td>43</td><td>86%</td></tr></table></div>"+
  "<h2 class='sec-title'>Quick answers</h2><div class='faq'>"+
  "<details><summary>Which papers are covered?</summary><p>Physics WPH11–WPH16, Chemistry WCH11–WCH16, Biology WBI11–WBI16, and Maths P1–P4 (WMA11–WMA14), S1 (WST01), M1 (WME01) — current Edexcel IAL specification, in-syllabus content only (anything extra is labelled out-of-syllabus).</p></details>"+
  "<details><summary>Are these real past-paper questions?</summary><p>The topical bank contains original exam-style questions written to match real past-paper style, each labelled with the paper/question it is modelled on — with full mark-scheme answers. The Archive tab indexes every real session (2019–2026) with links to official question papers and mark schemes.</p></details>"+
  "<details><summary>Does the AI need internet or an account?</summary><p>No. The built-in tutor works fully offline from the syllabus database. Optionally, you can add your own OpenAI-compatible API key for full conversational AI — your key never leaves your browser except to your chosen provider.</p></details>"+
  "<details><summary>Is my progress saved?</summary><p>Yes — topics completed, question self-marks, XP and streaks are stored privately in your browser (localStorage). Nothing is uploaded anywhere.</p></details>"+
  "</div>";
}

/* ================= SUBJECT ================= */
function vSubject(){
  var S=subj(view.sid);
  var units=S.units.map(function(u){
    return "<button class='uchip"+(u.id===view.uid?" on":"")+"' style='--ac:"+S.color+"' onclick=\"setUnit('"+u.id+"')\"><b>"+u.code+" • "+u.short+"</b><small>"+esc(u.title)+" • "+u.time+" • "+u.marks+" marks</small></button>";
  }).join("");
  var tabs=["📖 Revise","📝 Past Paper Questions","🤖 Ask AI"].map(function(t,i){
    return "<button class='tab"+(view.tab===i?" on":"")+"' style='--ac:"+S.color+"' onclick='setTab("+i+")'>"+t+"</button>";
  }).join("");
  var body = view.tab===0? vRevise() : view.tab===1? vPapers() : vAI();
  return "<div class='subj-hero' style='--ac:"+S.color+"'><h2>"+S.icon+" "+S.name+" <span class='tag'>"+S.qual+"</span></h2><p>"+S.desc+"</p>"+
    "<div class='unit-chips'>"+units+"</div></div>"+
    "<div class='tabs' style='--ac:"+S.color+"'>"+tabs+"</div><div id='tabBody'>"+body+"</div>";
}
function setUnit(uid){ view.uid=uid; view.tid=null; view.qtopics=[]; view.qsearch=""; view.mock=null; render(); }
function setTab(i){ view.tab=i; render(); }
function afterSubject(){ if(view.tab===2) initChat(); if(view.tab===1&&view.qmode==="mockrun") startTimer(); }

/* ---------- REVISE ---------- */
function vRevise(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid), p=P();
  if(!view.tid) view.tid=U.topics[0].id;
  var list=U.topics.map(function(t){
    var done=p.topics[view.sid+":"+t.id];
    return "<button class='topic-item"+(t.id===view.tid?" on":"")+(done?" done":"")+"' onclick=\"setTopic('"+t.id+"')\"><span class='dot'>"+(done?"✓":"•")+"</span><span><b>"+esc(t.name)+"</b><small>"+countQ(view.sid,view.uid,t.id)+" practice Qs</small></span></button>";
  }).join("");
  var t=topicOf(view.sid,view.uid,view.tid), n=t.notes;
  var pts=(n.points||[]).map(function(x){return "<li>"+x+"</li>";}).join("");
  var forms=(n.formulas||[]).map(function(f){return "<div class='formula'><div class='eq'>"+f.e+"</div><div class='what'>"+f.w+"</div></div>";}).join("");
  var defs=(n.defs||[]).map(function(d){return "<div class='def'><b>"+d.t+":</b> "+d.d+"</div>";}).join("");
  var worked=n.worked? "<div class='nsec'><h4>✏️ Worked example</h4><div class='worked'><div class='wq'>Q: "+n.worked.q+"</div><ol>"+n.worked.steps.map(function(s){return "<li>"+s+"</li>";}).join("")+"</ol></div></div>":"";
  var mist=(n.mistakes||[]).length? "<div class='nsec'><h4>⚠️ Classic mistakes</h4><div class='warnbox'><ul style='margin:0'>"+n.mistakes.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul></div></div>":"";
  var tips=(n.tips||[]).length? "<div class='nsec'><h4>⭐ Examiner tips</h4><div class='tipbox'><ul style='margin:0'>"+n.tips.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul></div></div>":"";
  var oos=n.oos? "<div class='oos'>🔮 "+n.oos+"</div>":"";
  var done=p.topics[view.sid+":"+t.id];
  // flashcards
  var cards=[]; (n.defs||[]).forEach(function(d){cards.push({f:d.t,b:d.d});}); (n.formulas||[]).forEach(function(f){cards.push({f:f.w,b:"<span class='mono' style='font-size:1.3rem'>"+f.e+"</span>"});});
  view._cards=cards;
  if(view.flashIdx>=cards.length) view.flashIdx=0;
  var fc=cards.length? "<div class='nsec'><h4>🃏 Flashcards <span class='pill'>"+cards.length+" cards</span></h4><div class='flash'><div class='flash-inner' onclick='flipFlash()'>"+(view.flashFlip?cards[view.flashIdx].b:cards[view.flashIdx].f)+"<small>"+(view.flashFlip?"Answer — tap to flip back":"Tap to reveal • Card "+(view.flashIdx+1)+" of "+cards.length)+"</small></div></div><div style='display:flex;gap:8px'><button class='btn btn-g btn-s' onclick='flashNav(-1)'>← Prev</button><button class='btn btn-g btn-s' onclick='flashNav(1)'>Next →</button><button class='btn btn-g btn-s' onclick='flashShuffle()'>🔀 Shuffle</button></div></div>":"";
  return "<div class='rev-layout' style='--ac:"+S.color+"'><div class='topic-list'><div class='tiny muted' style='padding:4px 10px 10px'>"+U.code+" • "+U.topics.length+" topics • "+unitQuestions(view.sid,view.uid).length+" Qs</div>"+list+"</div>"+
  "<div class='notes'><div class='breadcrumb'>"+S.name+" / "+U.code+" / <b>"+esc(t.name)+"</b></div><h3>"+esc(t.name)+"</h3><p class='lede'>"+(n.lede||"")+"</p>"+
  "<div class='nsec'><h4>📌 Key points <span class='pill'>learn these</span></h4><ul class='tick'>"+pts+"</ul></div>"+
  (forms?"<div class='nsec'><h4>📐 Formulae <span class='pill'>memorise</span></h4><div class='formula-grid'>"+forms+"</div></div>":"")+
  (defs?"<div class='nsec'><h4>📚 Definitions <span class='pill'>word-perfect</span></h4><div class='def-grid'>"+defs+"</div></div>":"")+
  worked+mist+tcards()+tips+oos+
  "<div class='done-row'><button class='btn "+(done?"btn-g":"btn-p")+"' onclick=\"toggleTopic('"+view.sid+"','"+t.id+"')\">"+(done?"✓ Completed — tap to undo":"+ Mark topic complete (+20 XP)")+"</button>"+
  "<button class='btn btn-g' onclick=\"practiceTopic('"+t.id+"')\">📝 Practise this topic</button>"+
  "<button class='btn btn-g' onclick=\"askAbout('"+t.id+"')\">🤖 Ask AI about this</button></div></div></div>";
}
function tcards(){ return ""; }
function countQ(sid,uid,tid){ return unitQuestions(sid,uid).filter(function(q){return (q.topics||[]).indexOf(tid)>=0;}).length; }
function setTopic(tid){ view.tid=tid; view.flashIdx=0; view.flashFlip=false; render(); }
function flipFlash(){ view.flashFlip=!view.flashFlip; render(); }
function flashNav(d){ var n=(view._cards||[]).length; if(!n) return; view.flashIdx=(view.flashIdx+d+n)%n; view.flashFlip=false; render(); }
function flashShuffle(){ var a=view._cards||[]; for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;} view.flashIdx=0; view.flashFlip=false; render(); }
function toggleTopic(sid,tid){ var p=P(),k=sid+":"+tid; if(p.topics[k]){ delete p.topics[k]; toast("Marked as not done"); } else { p.topics[k]=Date.now(); p.xp+=20; toast("Nice! +20 XP 🎉"); } saveP(p); render(); }
function practiceTopic(tid){ view.tab=1; view.qmode="topical"; view.qtopics=[tid]; render(); window.scrollTo(0,0); }
function askAbout(tid){ view.tab=2; render(); var t=topicOf(view.sid,view.uid,tid); setTimeout(function(){ sendChat("Explain "+(t?t.name:"this topic")); },300); }

/* ---------- PAPERS ---------- */
function vPapers(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid);
  var modes=[["topical","📝 Topical Questions"],["archive","🗂️ Full Paper Archive"],["mock","⏱️ Mock Builder"]].map(function(m){
    return "<button class='mode-btn"+((view.qmode===m[0]||(m[0]==="mock"&&(view.qmode==="mockrun"||view.qmode==="mockreview")))?" on":"")+"' style='--ac:"+S.color+"' onclick=\"setQmode('"+m[0]+"')\">"+m[1]+"</button>";
  }).join("");
  var body = view.qmode==="archive"? vArchive() : view.qmode==="mock"? vMockSetup() : view.qmode==="mockrun"? vMockRun() : view.qmode==="mockreview"? vMockReview() : vTopical();
  return "<div style='--ac:"+S.color+"'><div class='mode-switch'>"+modes+"</div>"+body+"</div>";
}
function setQmode(m){ view.qmode=m; if(m==="topical") view.mock=null; render(); }

/* topical */
function vTopical(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid);
  var chips=U.topics.map(function(t){
    var on=view.qtopics.indexOf(t.id)>=0;
    return "<button class='tchip"+(on?" on":"")+"' onclick=\"toggleQtopic('"+t.id+"')\">"+(on?"✓ ":"")+esc(t.name)+"</button>";
  }).join("");
  var list=filteredQ().map(qCard).join("") || "<div class='empty'>No questions match — try fewer filters.<br><br><button class='btn btn-g btn-s' onclick='clearQfilters()'>Clear filters</button></div>";
  var sel=view.qtopics.length? view.qtopics.length+" topic"+(view.qtopics.length>1?"s":"")+" selected" : "all topics in "+U.code;
  return "<div class='q-toolbar'><h4>🎯 Filter by topic <span class='tiny muted'>(tick several for mixed-topic practice — like the real paper)</span></h4>"+chips+
  "<div class='qfilters'><select onchange=\"view.qdiff=this.value;render()\"><option value='all'>All difficulties</option><option value='1'"+(view.qdiff==="1"?" selected":"")+">★ Easy</option><option value='2'"+(view.qdiff==="2"?" selected":"")+">★★ Medium</option><option value='3'"+(view.qdiff==="3"?" selected":"")+">★★★ Hard</option></select>"+
  "<input type='text' placeholder='Search questions…' value=\""+esc(view.qsearch)+"\" oninput=\"view.qsearch=this.value;renderQList()\">"+
  "<span class='tiny muted'>"+filteredQ().length+" questions • "+sel+"</span>"+
  (view.qtopics.length?"<button class='btn btn-g btn-xs' onclick='clearQfilters()'>Clear ✕</button>":"")+"</div></div><div id='qlist'>"+list+"</div>";
}
function filteredQ(){
  var all=unitQuestions(view.sid,view.uid);
  return all.filter(function(q){
    if(view.qtopics.length && !q.topics.some(function(t){return view.qtopics.indexOf(t)>=0;})) return false;
    if(view.qdiff!=="all" && String(q.diff)!==String(view.qdiff)) return false;
    if(view.qsearch && (q.title+" "+q.q+" "+q.ref).toLowerCase().indexOf(view.qsearch.toLowerCase())<0) return false;
    return true;
  });
}
function renderQList(){ var el=document.getElementById("qlist"); if(el){ var l=filteredQ().map(qCard).join(""); el.innerHTML=l||"<div class='empty'>No matches.</div>"; } }
function toggleQtopic(tid){ var i=view.qtopics.indexOf(tid); if(i>=0) view.qtopics.splice(i,1); else view.qtopics.push(tid); render(); }
function clearQfilters(){ view.qtopics=[]; view.qdiff="all"; view.qsearch=""; render(); }
function qCard(q){
  var p=P(), st=p.q[q.id], cls=st?(" "+st):"";
  var tnames=(q.topics||[]).map(function(tid){ var t=topicOf(view.sid,view.uid,tid)||findTopicAnywhere(view.sid,tid); return t?esc(t.name):tid; }).join(" • ");
  return "<div class='qcard"+cls+"' id='card-"+q.id+"'><div class='qhead'><span class='qref'>"+esc(q.ref)+"</span><span class='qmarks'>"+q.marks+" marks</span><span class='qdiff d"+q.diff+"'>"+("★".repeat(q.diff))+"</span><span class='qref'>⏱ "+esc(q.time)+"</span>"+(st?"<span class='qref'>"+(st==="got"?"✅ got it":"🔁 reviewing")+"</span>":"")+"</div>"+
  "<div class='qtitle'>"+esc(q.title)+"</div><div class='tiny muted' style='margin-bottom:8px'>"+tnames+"</div><div class='qbody'>"+esc(q.q)+"</div>"+
  "<div class='hintbox' id='hint-"+q.id+"'>💡 "+esc(q.hint||"")+"</div>"+
  "<div class='ansbox' id='ans-"+q.id+"'><h5>✅ MARK SCHEME ("+q.marks+" MARKS)</h5><ol>"+q.ans.map(function(a){return "<li>"+a+"</li>";}).join("")+"</ol>"+
  "<div style='margin-top:12px;display:flex;gap:8px;flex-wrap:wrap'><span class='tiny muted'>Be honest — did you earn full marks?</span><button class='btn btn-g btn-xs' onclick=\"selfMark('"+q.id+"','got',"+q.marks+")\">✅ I got it</button><button class='btn btn-g btn-xs' onclick=\"selfMark('"+q.id+"','missed',"+q.marks+")\">🔁 Need review</button></div></div>"+
  "<div class='qactions'><button class='btn btn-g btn-s' onclick=\"toggleAns('hint-"+q.id+"')\">💡 Hint</button><button class='btn btn-g btn-s' onclick=\"toggleAns('ans-"+q.id+"')\">✅ Show mark scheme</button><button class='btn btn-g btn-s' onclick=\"askQ('"+q.id+"')\">🤖 Explain this</button></div></div>";
}
function findTopicAnywhere(sid,tid){ var f=null; subj(sid).units.forEach(function(u){ u.topics.forEach(function(t){ if(t.id===tid) f=t; }); }); return f; }
function toggleAns(id){ document.getElementById(id).classList.toggle("show"); }
function selfMark(qid,st,marks){ var p=P(); var first=!p.q[qid]; p.q[qid]=st; if(first) p.xp+= (st==="got"? marks*2 : 3); saveP(p); toast(st==="got"? "Excellent! +"+marks*2+" XP 🌟" : "Added to review list (+3 XP)"); var c=document.getElementById("card-"+qid); if(c){ c.classList.remove("got","missed"); c.classList.add(st); } render(); }
function askQ(qid){ var all=unitQuestions(view.sid,view.uid).concat(view.mock&&view.mock.qs?view.mock.qs:[]), q=all.find(function(x){return x.id===qid;}); view.tab=2; render(); setTimeout(function(){ sendChat("Explain this question: "+(q?q.title+" — "+q.q.slice(0,300):qid)); },300); }
function TUTORQUIZ(sid,uid,tid){ location.hash="#/subject/"+sid; view.sid=sid; view.uid=uid; view.tab=1; view.qmode="topical"; view.qtopics=[tid]; render(); window.scrollTo(0,0); toast("Filtered to your topic — good luck! 🎯"); }

/* archive */
var SESSIONS=[["Jan",2019],["Jun",2019],["Oct",2019],["Jan",2020],["Jun",2020],["Oct",2020],["Jan",2021],["Jun",2021],["Oct",2021],["Jan",2022],["Jun",2022],["Oct",2022],["Jan",2023],["Jun",2023],["Oct",2023],["Jan",2024],["Jun",2024],["Oct",2024],["Jan",2025],["Jun",2025],["Oct",2025],["Jan",2026],["Jun",2026]];
function vArchive(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid);
  var hubQP=S.hubs[0]?S.hubs[0].url:"", hubMS=S.hubs[1]?S.hubs[1].url:"";
  var note = view.sid==="maths"
    ? "Current-spec papers (first exams P1/S1/M1 2019). Older modular papers (C1–C4, S1, M1, 2009–2018) remain superb topical practice — find them via the hubs below."
    : "Current-spec papers (first exams 2019). Legacy "+U.code.replace(/\d/,"0")+"-series papers (2014–2018) cover nearly identical content and are excellent extra practice — find them via the hubs below.";
  var rows=SESSIONS.slice().reverse().map(function(s){
    return "<tr><td><b>"+s[0]+" "+s[1]+"</b></td><td class='mono'>"+U.code+"/01</td><td>QP + MS + Examiner Report</td>"+
    "<td><a class='btn btn-g btn-xs' href='"+hubQP+"' target='_blank' rel='noopener'>📄 QP</a> <a class='btn btn-g btn-xs' href='"+hubMS+"' target='_blank' rel='noopener'>✅ MS</a></td></tr>";
  }).join("");
  var hubs=S.hubs.map(function(h){ return "<a class='res-card' href='"+h.url+"' target='_blank' rel='noopener'><b>"+h.name+"</b><span>"+h.desc+"</span></a>"; }).join("");
  return "<div class='q-toolbar'><h4>🗂️ "+U.code+" — full paper index (current spec)</h4><p class='small muted'>"+note+"<br>QP buttons open the paper archive hub for "+S.name+"; MS buttons open Pearson's official library. Examiner reports are gold — read them after every paper.</p></div>"+
  "<div style='overflow:auto'><table class='arch-table'><tr><th>Session</th><th>Paper</th><th>Available</th><th>Download</th></tr>"+rows+"</table></div>"+
  "<h2 class='sec-title'>Official paper & revision hubs</h2><div class='res-grid'>"+hubs+"</div>";
}

/* mock builder */
function vMockSetup(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid);
  var boxes=U.topics.map(function(t){
    var c=countQ(view.sid,view.uid,t.id);
    return "<label style='display:flex;gap:10px;align-items:center;font-weight:600;color:var(--text);margin:8px 0'><input type='checkbox' class='mockTopic' value='"+t.id+"' "+(view.qtopics.indexOf(t.id)>=0?"checked":"")+" style='width:18px;height:18px'> "+esc(t.name)+" <span class='tiny muted'>("+c+" Qs)</span></label>";
  }).join("");
  return "<div class='mock-setup'><h3>⏱️ Build your mock — "+U.code+"</h3><p class='small muted'>Pick any <b>combination of topics</b>, set the time, and sit it like the real thing. Answers stay hidden until you finish.</p>"+
  "<label>1️⃣ Topics (tick at least one)</label>"+boxes+
  "<div style='display:flex;gap:18px;flex-wrap:wrap'><div><label>2️⃣ Number of questions</label><select id='mockN'><option>4</option><option selected>6</option><option>8</option><option>10</option></select></div>"+
  "<div><label>3️⃣ Time allowed (minutes)</label><input type='number' id='mockT' value='30' min='5' max='120' style='width:110px'></div></div>"+
  "<div style='margin-top:20px'><button class='btn btn-p' onclick='startMock()'>▶ Start mock exam</button></div></div>";
}
function startMock(){
  var tids=[].map.call(document.querySelectorAll(".mockTopic:checked"),function(c){return c.value;});
  if(!tids.length){ toast("Tick at least one topic!"); return; }
  var pool=unitQuestions(view.sid,view.uid).filter(function(q){ return q.topics.some(function(t){return tids.indexOf(t)>=0;}); });
  if(!pool.length){ toast("No questions for those topics"); return; }
  var n=Math.min(parseInt(document.getElementById("mockN").value)||6, pool.length);
  pool=pool.slice().sort(function(){return Math.random()-0.5;}).slice(0,n);
  var mins=Math.max(5,parseInt(document.getElementById("mockT").value)||30);
  view.mock={qs:pool,tids:tids,mins:mins,marks:pool.reduce(function(a,q){return a+q.marks;},0)};
  view.left=mins*60; view.qmode="mockrun"; render(); afterSubject(); window.scrollTo(0,0);
}
function startTimer(){
  stopTimer(); tick();
  view.timerH=setInterval(function(){ view.left--; if(view.left<=0){ view.left=0; tick(); finishMock(true); } else tick(); },1000);
}
function stopTimer(){ if(view.timerH){ clearInterval(view.timerH); view.timerH=null; } }
function tick(){ var el=document.getElementById("mockTimer"); if(!el) return; var m=Math.floor(view.left/60),s=view.left%60; el.textContent=(m<10?"0":"")+m+":"+(s<10?"0":"")+s; el.style.color=view.left<300?"var(--bad)":"var(--ac)"; }
function vMockRun(){
  var M=view.mock, cards=M.qs.map(function(q,i){
    return "<div class='qcard'><div class='qhead'><span class='qref'>Q"+(i+1)+"</span><span class='qref'>"+esc(q.ref)+"</span><span class='qmarks'>"+q.marks+" marks</span></div><div class='qtitle'>"+esc(q.title)+"</div><div class='qbody'>"+esc(q.q)+"</div></div>";
  }).join("");
  return "<div class='mock-run' style='--ac:"+subj(view.sid).color+"'><span>⏱</span><span class='timer' id='mockTimer'>--:--</span><span class='small muted'>"+M.qs.length+" questions • "+M.marks+" marks • answers hidden</span><span style='margin-left:auto'></span><button class='btn btn-p btn-s' onclick='finishMock(false)'>Finish & mark 🏁</button></div>"+cards;
}
function finishMock(auto){ if(view.qmode!=="mockrun") return; stopTimer(); view.qmode="mockreview"; render(); window.scrollTo(0,0); toast(auto?"⏰ Time's up — mark yourself honestly!":"Mock finished — mark yourself honestly!"); }
function vMockReview(){
  var M=view.mock, p=P(), got=0,marked=0;
  M.qs.forEach(function(q){ if(p.q[q.id]){ marked++; if(p.q[q.id]==="got") got+=q.marks; } });
  var pct=M.marks?Math.round(100*got/M.marks):0;
  var grade=pct>=80?"A* territory! 🌟":pct>=70?"A grade — superb! 🎉":pct>=60?"B — nearly there 💪":pct>=50?"C — keep pushing 📈":"Keep practising — every mark counts 🌱";
  var key=view.sid+":"+view.uid+":"+M.tids.sort().join("+");
  if(marked===M.qs.length && got>(p.best[key]||0)){ p.best[key]=got; saveP(p); }
  var cards=M.qs.map(function(q,i){ return qCard(q); }).join("");
  return "<div class='score-hero'><div class='tiny muted'>YOUR MOCK SCORE</div><div class='big'>"+got+" / "+M.marks+"</div><div><b>"+pct+"%</b> • "+grade+"</div><div class='tiny muted'>"+marked+" of "+M.qs.length+" self-marked • Best on this combo: "+(p.best[key]||0)+" • <button class='btn btn-g btn-xs' onclick=\"setQmode('mock')\">↻ New mock</button></div></div>"+cards;
}

/* ---------- ASK AI ---------- */
var chatHist={};
function vAI(){
  var S=subj(view.sid), cfg=TUTOR.getCfg();
  var sug=["Explain "+(unitOf(view.sid,view.uid).topics[0]?unitOf(view.sid,view.uid).topics[0].name:"this unit"),"Quiz me on "+unitOf(view.sid,view.uid).short,"Exam tips for "+unitOf(view.sid,view.uid).code,"What are past paper questions on?"];
  return "<div class='ai-layout' style='--ac:"+S.color+"'><div class='chat'><div class='chat-msgs' id='chatMsgs'></div>"+
  "<div class='chips'>"+sug.map(function(s){return "<button class='chipbtn' onclick=\"sendChat('"+s.replace(/'/g,"\\'")+"')\">"+esc(s)+"</button>";}).join("")+"</div>"+
  "<div class='chat-input'><input id='chatIn' placeholder='Ask anything about "+S.name+"… (Enter to send)' onkeydown=\"if(event.key==='Enter')sendChat()\"><button class='btn btn-p btn-s' onclick='sendChat()'>Send ➤</button></div></div>"+
  "<div class='ai-side'><h4>🤖 About this tutor</h4>Built-in brain trained on the full "+S.name+" syllabus — works <b>offline</b>, no account.<br><br><b>Try asking:</b><br>• <i>Explain…</i> any topic<br>• <i>What is…</i> any term<br>• <i>Formula for…</i><br>• <i>Quiz me on…</i><br>• <i>Exam tips for…</i><br><br><h4>⚡ Unlock full AI (optional)</h4><span class='tiny'>Paste an OpenAI-compatible API key for free-form answers. Stored only in your browser.</span>"+
  "<input id='aiKey' type='password' placeholder='sk-… (API key)' value='"+esc(cfg.key||"")+"'><input id='aiModel' placeholder='model (default gpt-4o-mini)' value='"+esc(cfg.model||"")+"'>"+
  "<button class='btn btn-g btn-s' style='width:100%;justify-content:center' onclick='saveAI()'>💾 Save key</button>"+
  (cfg.key?"<div class='tiny' style='margin-top:6px'>✅ Full-AI mode ON — answers use your provider, fallback offline.</div>":"<div class='tiny' style='margin-top:6px'>Offline mode — add a key anytime.</div>")+"</div></div>";
}
function saveAI(){ TUTOR.saveCfg({key:document.getElementById("aiKey").value.trim(),model:document.getElementById("aiModel").value.trim()||"gpt-4o-mini"}); toast("AI settings saved ✅"); render(); }
function initChat(){
  var box=document.getElementById("chatMsgs"); if(!box) return;
  var S=subj(view.sid);
  box.innerHTML="<div class='msg bot'>👋 Hey! I'm your <b>"+S.name+" tutor</b> ("+S.qual+"). Ask me to <b>explain</b> any topic, <b>define</b> a term, give a <b>formula</b>, or <b>quiz you</b>. Currently browsing <b>"+unitOf(view.sid,view.uid).code+"</b> — I'll prioritise it. What's confusing you today?</div>";
  chatHist[view.sid]=chatHist[view.sid]||[];
}
function pushMsg(who,html){ var box=document.getElementById("chatMsgs"); if(!box) return null; var d=document.createElement("div"); d.className="msg "+who; d.innerHTML=html; box.appendChild(d); box.scrollTop=box.scrollHeight; return d; }
function sendChat(preset){
  var inp=document.getElementById("chatIn"), q=preset||(inp?inp.value.trim():""); if(!q) return;
  pushMsg("user",esc(q)); if(inp) inp.value="";
  chatHist[view.sid]=chatHist[view.sid]||[]; chatHist[view.sid].push({role:"user",content:q});
  var typing=pushMsg("bot","<div class='typing'><i></i><i></i><i></i></div>");
  var finish=function(html){ if(typing) typing.innerHTML=html; var box=document.getElementById("chatMsgs"); if(box) box.scrollTop=box.scrollHeight; chatHist[view.sid].push({role:"assistant",content:String(html).replace(/<[^>]+>/g," ").slice(0,1500)}); };
  var cfg=TUTOR.getCfg();
  if(cfg.key){ TUTOR.askLLM(view.sid,chatHist[view.sid]).then(function(ai){ finish(ai||TUTOR.answer(view.sid,q)); }); }
  else { setTimeout(function(){ finish(TUTOR.answer(view.sid,q)); },450); }
}

/* ================= PROGRESS ================= */
function vProgress(){
  var p=P(), cards=Object.keys(SUBJECTS).map(function(sid){
    var S=SUBJECTS[sid], pr=subjectProgress(sid), C=2*Math.PI*44;
    return "<div class='prog-card' style='--ac:"+S.color+"'><h4>"+S.icon+" "+S.name+"</h4><div class='tiny muted'>"+S.qual+"</div>"+
    "<svg class='ring' viewBox='0 0 100 100'><circle cx='50' cy='50' r='44' fill='none' stroke='rgba(148,163,184,.15)' stroke-width='10'/><circle cx='50' cy='50' r='44' fill='none' stroke='"+S.color+"' stroke-width='10' stroke-linecap='round' stroke-dasharray='"+(C*pr.pct/100)+" "+C+"' transform='rotate(-90 50 50)'/><text x='50' y='56' text-anchor='middle' font-size='20' font-weight='800' fill='var(--text)'>"+pr.pct+"%</text></svg>"+
    "<div class='tiny muted' style='text-align:center'>📖 "+pr.done+"/"+pr.total+" topics • 📝 "+pr.qd+"/"+pr.qt+" questions</div>"+
    "<div style='text-align:center;margin-top:10px'><button class='btn btn-g btn-s' onclick=\"go('subject/"+sid+"')\">Continue →</button></div></div>";
  }).join("");
  var review=Object.keys(p.q).filter(function(k){return p.q[k]==="missed";}).length;
  return "<h2 class='sec-title'>📊 My Progress</h2><p class='sec-sub'>XP: <b>⚡ "+p.xp+"</b> • Streak: <b>🔥 "+(p.streak||1)+" day"+((p.streak||1)>1?"s":"")+"</b> • 🔁 "+review+" questions flagged for review</p>"+
  "<div class='prog-grid'>"+cards+"</div>"+
  "<div class='q-toolbar' style='margin-top:18px'><h4>🎯 Study streaks & tips</h4><p class='small muted'>Revise a little every day — spaced repetition beats cramming. Redo every 🔁 question after 3 days. Aim: all topics complete + every question self-marked ✅.</p>"+
  "<button class='btn btn-g btn-s' onclick=\"if(confirm('Reset ALL progress?')){localStorage.removeItem('ial-progress');render();}\">🗑️ Reset progress</button></div>";
}

/* ================= SEARCH ================= */
function globalSearch(q){
  var box=document.getElementById("searchResults"); q=(q||"").trim().toLowerCase();
  if(q.length<2){ box.style.display="none"; return; }
  var out=[];
  Object.keys(SUBJECTS).forEach(function(sid){ var S=SUBJECTS[sid];
    S.units.forEach(function(u){ u.topics.forEach(function(t){
      if((t.name+" "+(t.tags||"")).toLowerCase().indexOf(q)>=0) out.push({h:"📖 "+t.name+" <span class='tiny muted'>"+S.icon+" "+u.code+"</span>",go:"topic/"+sid+"/"+u.id+"/"+t.id});
    });
    (QBANK[sid][u.id]||[]).forEach(function(x){ if((x.title+" "+x.q).toLowerCase().indexOf(q)>=0) out.push({h:"📝 "+esc(x.title)+" <span class='tiny muted'>"+x.ref+"</span>",go:"subject/"+sid,q:1,uid:u.id}); }); });
  });
  box.innerHTML=out.slice(0,12).map(function(r,i){ return "<a onclick=\"searchGo("+i+")\">"+r.h+"</a>"; }).join("")||"<a>No matches — try fewer letters.</a>";
  box.style.display="block"; box._res=out.slice(0,12);
}
function searchGo(i){ var r=document.getElementById("searchResults")._res[i]; document.getElementById("searchResults").style.display="none"; document.getElementById("globalSearch").value=""; if(r.q){ view.tab=1; view.uid=r.uid; } go(r.go); }

/* boot */
render();
