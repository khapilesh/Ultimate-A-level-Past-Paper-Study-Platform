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
var view = { sid:"physics", uid:null, tab:0, tid:null, qmode:"topical", qtopics:[], qdiff:"all", qsearch:"", qview:"flip", qCursor:0, notePage:0, bookTurnDir:"", variantFor:{}, attempts:{}, openPanels:{}, mock:null, timerH:null, left:0, flashIdx:0, flashFlip:false };
function go(path, tab){ if(tab!=null) view.tab=tab; if(tab===1){view.qview="flip";view.qCursor=0;} var target="#/"+path; if(location.hash===target) render(); else location.hash=target; }
window.addEventListener("hashchange", render);
document.addEventListener("click", function(e){ var sr=document.getElementById("searchResults"); if(sr&&!e.target.closest(".searchbox")) sr.style.display="none"; });
document.addEventListener("keydown", function(e){
  var tag=document.activeElement&&document.activeElement.tagName;
  if(e.key==="/"&&tag!=="INPUT"&&tag!=="TEXTAREA"&&tag!=="SELECT"){e.preventDefault();document.getElementById("globalSearch").focus();return;}
  if(tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT")return;
  var route=(location.hash||"#/home").split("#/").pop().split("/");
  if(route[0]==="subject"&&view.tab===0){if(e.key==="ArrowRight")bookNoteTurn(1);else if(e.key==="ArrowLeft")bookNoteTurn(-1);}
  else if(route[0]==="subject"&&view.tab===1&&view.qmode==="topical"&&view.qview==="flip"){if(e.key==="ArrowRight")bookQuestionTurn(1);else if(e.key==="ArrowLeft")bookQuestionTurn(-1);}
});
function toggleTheme(){ var h=document.documentElement; h.dataset.theme=(h.dataset.theme==="dark")?"light":"dark"; localStorage.setItem("ial-theme",h.dataset.theme); }
(function(){ var t=localStorage.getItem("ial-theme"); if(t) document.documentElement.dataset.theme=t; })();

function render(){
  stopTimer();
  var h=(location.hash||"#/home").replace(/^#\//,""), parts=h.split("/");
  document.querySelectorAll("#navLinks button").forEach(function(b){ b.classList.toggle("on", b.dataset.nav===parts[0]||(parts[0]==="subject"&&b.dataset.nav===parts[1])||(parts[0]==="topic"&&b.dataset.nav===parts[1])); });
  var app=document.getElementById("app");
  if(parts[0]==="subject"&&SUBJECTS[parts[1]]){
    if(view.sid!==parts[1]){view.uid=null;view.tid=null;view.qtopics=[];view.qdiff="all";view.qsearch="";view.qmode="topical";view.qCursor=0;view.notePage=0;}
    view.sid=parts[1];
    if(parts[2]&&unitOf(view.sid,parts[2])) view.uid=parts[2];
    if(!unitOf(view.sid,view.uid)) view.uid=SUBJECTS[view.sid].units[0].id;
    if(!topicInUnit()) view.tid=unitOf(view.sid,view.uid).topics[0].id;
    app.innerHTML=vBookSubject(); afterSubject();
  }
  else if(parts[0]==="topic"&&SUBJECTS[parts[1]]){
    if(view.sid!==parts[1]){view.qtopics=[];view.qCursor=0;view.qmode="topical";}
    view.sid=parts[1];view.uid=unitOf(view.sid,parts[2])?parts[2]:SUBJECTS[view.sid].units[0].id;
    view.tid=topicOf(view.sid,view.uid,parts[3])?parts[3]:unitOf(view.sid,view.uid).topics[0].id;
    view.tab=0;view.notePage=0;app.innerHTML=vBookSubject();afterSubject();window.scrollTo(0,0);
  }
  else if(parts[0]==="guide"){app.innerHTML=bookStudyGuide();window.scrollTo(0,0);}
  else if(parts[0]==="progress"){app.innerHTML=vProgress();window.scrollTo(0,0);}
  else{app.innerHTML=vLibraryHome();window.scrollTo(0,0);}
  updateXP();
}
function topicInUnit(){ if(!view.tid) return false; return !!topicOf(view.sid,view.uid,view.tid); }

/* ================= HOME ================= */
function vHome(){
  var c=counts(), p=P();
  var cards=Object.keys(SUBJECTS).map(function(sid){
    var S=SUBJECTS[sid], pr=subjectProgress(sid);
    var units=S.units.map(function(u){return u.short;}).join(" • ");
    return "<div class='subj-card' style='--ac:"+S.color+"' onclick=\"openStudyBook('"+sid+"')\">"+
      "<div class='ico'>"+S.icon+"</div><h3>"+S.name+"</h3><p>"+S.desc+"</p>"+
      "<div class='meta'><span class='tag hot'>"+S.qual+"</span><span class='tag'>"+S.units.length+" units</span><span class='tag'>"+pr.qt+" practice prompts</span></div>"+
      "<div class='pbar'><i style='width:"+pr.pct+"%'></i></div><div class='tiny muted' style='margin-top:6px'>"+pr.pct+"% complete • "+units+"</div></div>";
  }).join("");
  return ""+
  "<section class='hero'><div class='kicker'>🎓 EDEXCEL INTERNATIONAL A LEVEL • 2026</div>"+
  "<h1>Master <span class='grad'>Physics, Chemistry,<br>Biology & Maths</span> — One Platform</h1>"+
  "<p class='sub'>Topic-wise original exam-style question sets with mark-scheme points, full-credit sample answers and cited examiner-report insights; deeper guided notes for <b>every syllabus topic</b>; timed mocks and an AI tutor.</p>"+
  "<div class='hero-cta'><button class='btn btn-p' onclick=\"go('subject/physics',1)\">📝 Start exam-style practice</button><button class='btn btn-g' onclick=\"go('subject/chemistry',0)\">📖 Revise a topic</button></div>"+
  "<div class='hero-stats'><div class='hstat'><b>"+c.questions+"+</b><span>PRACTICE PROMPTS</span></div><div class='hstat'><b>"+c.topics+"</b><span>SYLLABUS TOPICS</span></div><div class='hstat'><b>24</b><span>UNITS COVERED</span></div><div class='hstat'><b>🔥 "+(p.streak||1)+"</b><span>DAY STREAK</span></div></div></section>"+
  "<h2 class='sec-title'>Choose your subject</h2><p class='sec-sub'>Each subject has <b>Revise</b> • <b>Past Paper Questions</b> • <b>Ask AI</b> tabs. Progress saves automatically.</p>"+
  "<div class='subj-grid'>"+cards+"</div>"+
  "<h2 class='sec-title'>Why this works</h2><p class='sec-sub'>Built around how A* students actually revise.</p>"+
  "<div class='feat-grid'>"+
  "<div class='feat'><div class='n'>📝</div><h4>Topic-wise exam practice</h4><p>Questions are grouped into topic sets with selectable variants — tick <b>multiple topics</b> for mixed practice.</p><ul><li>Original exam-style prompts modelled on WPH/WCH/WBI/WMA papers</li><li>Mark-scheme checkpoints, full-credit samples and examiner-report insights</li><li>Clearly labelled retry drills support spaced practice</li><li>Timed <b>Mock Builder</b> with score tracking</li></ul></div>"+
  "<div class='feat'><div class='n'>📖</div><h4>Detailed notes with guided explanations</h4><p>Each syllabus topic combines quick revision with a deeper step-by-step walkthrough.</p><ul><li>Focused sections, formulae, definitions and worked examples</li><li>Expandable explanations connect mechanisms and applications</li><li>⚠️ classic mistakes + ⭐ exam tips per topic</li><li>Flashcards, retrieval prompts and completion tracking</li></ul></div>"+
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
  "<details><summary>Are these real past-paper questions?</summary><p>The topical bank contains original exam-style questions modelled on the current specification; it is not a reproduction of official past-paper questions. Topic sets include clearly labelled repeat drills. Use the Archive tab and linked hubs to find official question papers and mark schemes.</p></details>"+
  "<details><summary>Where do examiner-report insights come from?</summary><p>Question cards link to representative Pearson Edexcel examiner reports. Notes are paraphrased and labelled topic-specific only when the report passage matches; otherwise they are clearly marked as general cross-paper advice. Topic pitfalls elsewhere are study guidance, not quotations or claims about a specific report.</p></details>"+
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
function setUnit(uid){ view.uid=uid; view.tid=null; view.qtopics=[]; view.qsearch=""; view.variantFor={}; view.mock=null; view.notePage=0; view.qCursor=0; view.qview="flip"; view.qmode="topical"; render(); }
function setTab(i){ view.tab=i; if(i===0)view.notePage=0; if(i===1){view.qview="flip";view.qCursor=0;view.qmode="topical";view.mock=null;if(!view.qtopics.length&&view.tid)view.qtopics=[view.tid];} render(); }
function afterSubject(){ if(view.tab===2) initChat(); if(view.tab===1&&view.qmode==="mockrun") startTimer(); }

/* ---------- REVISE ---------- */
function jumpToDeepNote(id){ var el=document.getElementById(id); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); }
function vDetailedNotes(t,n){
  var sections=n.sections||[];
  if(!sections.length) return "";
  var jumps=sections.map(function(s,i){
    return "<button class='deep-jump' type='button' onclick=\"jumpToDeepNote('deep-"+t.id+"-"+i+"')\"><span>"+(i+1)+"</span> "+esc(s.title)+"</button>";
  }).join("");
  var body=sections.map(function(s,i){
    var points=(s.points||[]).map(function(p){return "<li>"+p+"</li>";}).join("");
    return "<article class='deep-section' id='deep-"+t.id+"-"+i+"'><div class='deep-section-head'><span class='deep-num'>"+(i+1<10?"0":"")+(i+1)+"</span><h5>"+esc(s.title)+"</h5></div>"+
      (s.intro?"<p class='deep-intro'>"+esc(s.intro)+"</p>":"")+
      (points?"<ul>"+points+"</ul>":"")+"</article>";
  }).join("");
  var walkthrough=n.walkthrough||[];
  var walkBody=walkthrough.map(function(part){return "<article class='walkthrough-part'><h5>"+esc(part.title)+"</h5><p>"+esc(part.text)+"</p></article>";}).join("");
  var walk=walkthrough.length?"<details class='walkthrough'><summary><span>🧑‍🏫 Read the full explanatory walkthrough</span><small>"+walkthrough.length+" deeper steps • expand when ready</small></summary><div class='walkthrough-body'>"+walkBody+"</div></details>":"";
  return "<section class='nsec deep-notes'><h4>📘 Detailed topic notes <span class='pill'>"+sections.length+" focused sections</span></h4>"+
    "<p class='deep-guide'>Expanded explanations organised around the chapter headings in your book. Use the shortcuts to jump to a subtopic; open the guided walkthrough for the underlying mechanisms and connections.</p>"+
    "<nav class='deep-jumps' aria-label='Detailed notes subtopics'>"+jumps+"</nav><div class='deep-sections'>"+body+"</div>"+walk+"</section>";
}
function vRevise(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid), p=P();
  if(!view.tid) view.tid=U.topics[0].id;
  var list=U.topics.map(function(t){
    var done=p.topics[view.sid+":"+t.id];
    return "<button class='topic-item"+(t.id===view.tid?" on":"")+(done?" done":"")+"' onclick=\"setTopic('"+t.id+"')\"><span class='dot'>"+(done?"✓":"•")+"</span><span><b>"+esc(t.name)+"</b><small>"+countQ(view.sid,view.uid,t.id)+" practice Qs"+((t.notes.sections&&t.notes.sections.length)?" • "+t.notes.sections.length+" study sections":"")+((t.notes.walkthrough&&t.notes.walkthrough.length)?" • "+t.notes.walkthrough.length+" guided explanations":"")+"</small></span></button>";
  }).join("");
  var t=topicOf(view.sid,view.uid,view.tid), n=t.notes;
  var detailed=vDetailedNotes(t,n);
  var recall=n.reviewPrompt?"<div class='nsec deep-review'><h4>🧠 Retrieval check <span class='pill'>close your notes first</span></h4><p>"+esc(n.reviewPrompt)+"</p><small>Try answering from memory, then revisit the relevant section to correct any gaps.</small></div>":"";
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
  "<div class='notes'><div class='breadcrumb'>"+S.name+" / "+U.code+" / <b>"+esc(t.name)+"</b></div><h3>"+esc(t.name)+"</h3><p class='lede'>"+(n.lede||"")+"</p>"+detailed+
  "<div class='nsec'><h4>📌 Quick revision summary <span class='pill'>learn these</span></h4><ul class='tick'>"+pts+"</ul></div>"+
  (forms?"<div class='nsec'><h4>📐 Formulae <span class='pill'>memorise</span></h4><div class='formula-grid'>"+forms+"</div></div>":"")+
  (defs?"<div class='nsec'><h4>📚 Definitions <span class='pill'>word-perfect</span></h4><div class='def-grid'>"+defs+"</div></div>":"")+
  worked+mist+tcards()+tips+oos+recall+
  "<div class='done-row'><button class='btn "+(done?"btn-g":"btn-p")+"' onclick=\"toggleTopic('"+view.sid+"','"+t.id+"')\">"+(done?"✓ Completed — tap to undo":"+ Mark topic complete (+20 XP)")+"</button>"+
  "<button class='btn btn-g' onclick=\"practiceTopic('"+t.id+"')\">📝 Practise this topic</button>"+
  "<button class='btn btn-g' onclick=\"askAbout('"+t.id+"')\">🤖 Ask AI about this</button></div></div></div>";
}
function tcards(){ return ""; }
function countQ(sid,uid,tid,includeRetries){ return unitQuestions(sid,uid).filter(function(q){return (includeRetries!==false||!q.repeat)&&(q.topics||[]).indexOf(tid)>=0;}).length; }
function setTopic(tid){ view.tid=tid; view.notePage=0; view.flashIdx=0; view.flashFlip=false; if(view.tab===1){view.qtopics=[tid];view.qCursor=0;view.qview="flip";} render(); }
function flipFlash(){ view.flashFlip=!view.flashFlip; render(); }
function flashNav(d){ var n=(view._cards||[]).length; if(!n) return; view.flashIdx=(view.flashIdx+d+n)%n; view.flashFlip=false; render(); }
function flashShuffle(){ var a=view._cards||[]; for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;} view.flashIdx=0; view.flashFlip=false; render(); }
function toggleTopic(sid,tid){ var p=P(),k=sid+":"+tid; if(p.topics[k]){ delete p.topics[k]; toast("Marked as not done"); } else { p.topics[k]=Date.now(); p.xp+=20; toast("Nice! +20 XP 🎉"); } saveP(p); render(); }
function practiceTopic(tid){ view.tab=1; view.qmode="topical"; view.qtopics=[tid]; view.qview="flip"; view.qCursor=0; view.tid=tid; render(); window.scrollTo(0,0); }
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
function setQmode(m){ view.qmode=m; if(m==="topical"){view.mock=null;view.qview="flip";view.qCursor=0;} render(); }

/* topical question practice */
function vTopical(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid), qs=filteredQ();
  var chips=U.topics.map(function(t){
    var on=view.qtopics.indexOf(t.id)>=0;
    return "<button class='tchip"+(on?" on":"")+"' onclick=\"toggleQtopic('"+t.id+"')\">"+(on?"✓ ":"")+esc(t.name)+"</button>";
  }).join("");
  var list=renderQuestionCollection(qs) || "<div class='empty'>No questions match — try fewer filters.<br><br><button class='btn btn-g btn-s' onclick='clearQfilters()'>Clear filters</button></div>";
  var sel=view.qtopics.length? view.qtopics.length+" topic"+(view.qtopics.length>1?"s":"")+" selected" : "all topics in "+U.code;
  var retryCount=qs.filter(function(q){return q.repeat;}).length;
  return "<div class='q-toolbar'><h4>🎯 Filter by topic <span class='tiny muted'>(select several for mixed-topic practice)</span></h4>"+chips+
  "<p class='question-guidance'>Choose a topic set, select a variant, draft your response, then reveal the credit points and worked sample answer. Use “All prompts” to browse every entry; each topic also has a clearly labelled retry drill.</p>"+
  "<div class='qfilters'><select onchange=\"view.qdiff=this.value;render()\"><option value='all'>All difficulties</option><option value='1'"+(view.qdiff==="1"?" selected":"")+">★ Easy</option><option value='2'"+(view.qdiff==="2"?" selected":"")+">★★ Medium</option><option value='3'"+(view.qdiff==="3"?" selected":"")+">★★★ Hard</option></select>"+
  "<input type='text' placeholder='Search questions…' value=\""+esc(view.qsearch)+"\" oninput=\"view.qsearch=this.value;renderQList()\">"+
  "<div class='question-view-switch' role='group' aria-label='Question display mode'><button class='btn btn-xs "+(view.qview==="flip"?"btn-p":"btn-g")+"' onclick=\"setQuestionView('flip')\">📖 Flip pages</button><button class='btn btn-xs "+(view.qview==="sets"?"btn-p":"btn-g")+"' onclick=\"setQuestionView('sets')\">▦ Topic sets</button><button class='btn btn-xs "+(view.qview==="all"?"btn-p":"btn-g")+"' onclick=\"setQuestionView('all')\">☷ All prompts</button></div>"+
  "<span class='tiny muted' id='questionCount'>"+qs.length+" questions • "+retryCount+" retry drills • "+sel+"</span>"+
  (view.qtopics.length?"<button class='btn btn-g btn-xs' onclick='clearQfilters()'>Clear ✕</button>":"")+"</div>"+
  "<p class='report-disclaimer'>Examiner-report insights are paraphrased and linked to the cited Pearson report. Where a report note is general, it is labelled as cross-paper advice—not as commentary on this exact practice question.</p></div><div id='qlist'>"+list+"</div>";
}
function filteredQ(){
  var all=unitQuestions(view.sid,view.uid);
  return all.filter(function(q){
    if(view.qtopics.length && !(q.topics||[]).some(function(t){return view.qtopics.indexOf(t)>=0;})) return false;
    if(view.qdiff!=="all" && String(q.diff)!==String(view.qdiff)) return false;
    if(view.qsearch && (q.title+" "+q.q+" "+q.ref).toLowerCase().indexOf(view.qsearch.toLowerCase())<0) return false;
    return true;
  });
}
function setQuestionView(mode){view.qview=mode;view.qCursor=0;render();}
function questionGroupTopic(q,U){
  var topic=(U.topics||[]).find(function(t){return (q.topics||[]).indexOf(t.id)>=0;});
  return topic?topic.id:((q.topics||[])[0]||"other");
}
function renderQuestionCollection(qs){
  if(!qs.length)return "";
  if(view.qview==="flip")return renderBookQuestionPage(qs);
  if(view.qview==="all")return qs.map(function(q){return qCard(q);}).join("");
  var U=unitOf(view.sid,view.uid), groups={};
  qs.forEach(function(q){var tid=questionGroupTopic(q,U);(groups[tid]||(groups[tid]=[])).push(q);});
  return U.topics.filter(function(t){return groups[t.id]&&groups[t.id].length;}).map(function(topic){
    var variants=groups[topic.id], chosenId=view.variantFor[topic.id];
    var active=variants.find(function(q){return q.id===chosenId;})||variants[0];
    var tabs=variants.map(function(q,i){
      var status=P().q[q.id], statusIcon=status==="got"?"✓":status==="missed"?"↻":"";
      return "<button class='variant-btn"+(q.id===active.id?" on":"")+(q.repeat?" retry":"")+"' aria-pressed='"+(q.id===active.id)+"' onclick=\"setQuestionVariant('"+topic.id+"','"+q.id+"')\"><b>"+(q.repeat?"↻ Retry":"Variant "+(i+1))+"</b>"+(statusIcon?"<small>"+statusIcon+" "+(status==="got"?"mastered":"review")+"</small>":"")+(q.repeat?"<small>repeat drill</small>":"")+"</button>";
    }).join("");
    var retryN=variants.filter(function(q){return q.repeat;}).length;
    return "<section class='question-family'><div class='question-family-head'><div><span class='family-kicker'>TOPIC QUESTION SET</span><h4>"+esc(topic.name)+"</h4></div><span class='family-count'>"+variants.length+" prompt"+(variants.length===1?"":"s")+(retryN?" • "+retryN+" retry":"")+"</span></div><div class='variant-strip' role='group' aria-label='Question variants for "+esc(topic.name)+"'>"+tabs+"</div>"+qCard(active)+"</section>";
  }).join("");
}
function setQuestionVariant(tid,qid){view.variantFor[tid]=qid;renderQList();}
function renderQList(){
  var qs=filteredQ(),el=document.getElementById("qlist");
  if(view.qCursor>=qs.length)view.qCursor=Math.max(qs.length-1,0);
  if(el){var l=renderQuestionCollection(qs);el.innerHTML=l||"<div class='empty'>No matches.</div>";}
  var count=document.getElementById("questionCount");
  if(count){var retries=qs.filter(function(q){return q.repeat;}).length,unit=unitOf(view.sid,view.uid);var selected=view.qtopics.length?view.qtopics.length+" topic"+(view.qtopics.length===1?"":"s")+" selected":"all topics in "+unit.code;count.textContent=qs.length+" questions • "+retries+" retry drills • "+selected;}
}
function toggleQtopic(tid){var i=view.qtopics.indexOf(tid);if(i>=0)view.qtopics.splice(i,1);else view.qtopics.push(tid);view.qCursor=0;render();}
function clearQfilters(){view.qtopics=[];view.qdiff="all";view.qsearch="";view.qCursor=0;render();}
function setAttempt(qid,value){view.attempts=view.attempts||{};view.attempts[qid]=value;var count=document.getElementById("attempt-count-"+qid);if(count){var words=value.trim()?value.trim().split(/\s+/).length:0;count.textContent=words+" word"+(words===1?"":"s")+" drafted";}}
function clearAttempt(qid){view.attempts[qid]="";var field=document.getElementById("attempt-"+qid);if(field)field.value="";setAttempt(qid,"");}
function topicForQuestion(q){var U=unitOf(view.sid,view.uid);var tid=questionGroupTopic(q,U);return topicOf(view.sid,view.uid,tid)||findTopicAnywhere(view.sid,tid);}
function qCard(q){
  var p=P(),st=p.q[q.id],cls=st?(" "+st):"",topic=topicForQuestion(q);
  var tnames=(q.topics||[]).map(function(tid){var t=topicOf(view.sid,view.uid,tid)||findTopicAnywhere(view.sid,tid);return t?esc(t.name):esc(tid);}).join(" • ");
  var points=q.markSchemePoints||q.ans||[];
  var markPoints=points.map(function(a,i){return "<li><span class='credit-label'>Credit point "+(i+1)+"</span><span>"+a+"</span></li>";}).join("");
  var sample=q.sampleAnswer?"<p>"+q.sampleAnswer+"</p>":(q.ans||[]).map(function(a){return "<p>"+a+"</p>";}).join("");
  var mistakes=topic&&topic.notes&&topic.notes.mistakes?topic.notes.mistakes:[];
  var insight=typeof examinerInsight==="function"?examinerInsight(view.sid,topic?topic.id:(q.topics||[])[0]):null;
  var pitfallHtml="<details class='examiner-insight'><summary>⚠ Common pitfalls &amp; examiner-report insight</summary><div class='insight-grid'><section><h6>Topic pitfalls to check</h6>"+
    (mistakes.length?"<ul>"+mistakes.map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul>":"<p>No topic-specific pitfalls are recorded yet.</p>")+"</section>"+
    (insight?"<section class='report-note'><h6>"+(insight.specific?"Topic-specific report note":"Cross-paper report advice")+"</h6><p>"+esc(insight.text)+"</p><p class='report-source'><a href='"+esc(insight.url)+"' target='_blank' rel='noopener'>"+esc(insight.label)+" · "+esc(insight.code)+" ↗</a></p>"+(!insight.specific?"<small>This is general advice from the linked unit report, not a claim that the report analysed this exact topic or generated question.</small>":"<small>Paraphrased from the cited topic-relevant examiner-report passage.</small>")+"</section>":"<section><h6>Report source</h6><p>No verified report is linked to this subject yet.</p></section>")+"</div></details>";
  var draft=(view.attempts&&view.attempts[q.id])||"";
  var retryBadge=q.repeat?"<span class='repeat-badge'>↻ Repeat drill</span>":"";
  return "<div class='qcard"+cls+"' id='card-"+q.id+"'><div class='qhead'><span class='qref'>"+esc(q.ref)+"</span><span class='qmarks'>"+q.marks+" marks</span><span class='qdiff d"+q.diff+"'>"+("★".repeat(q.diff))+"</span><span class='qref'>⏱ "+esc(q.time)+"</span>"+retryBadge+(st?"<span class='qref'>"+(st==="got"?"✅ got it":"🔁 reviewing")+"</span>":"")+"</div>"+
  "<div class='qtitle'>"+esc(q.title)+"</div><div class='tiny muted' style='margin-bottom:8px'>"+tnames+"</div><div class='qbody'>"+esc(q.q)+"</div>"+
  "<details class='answer-attempt'><summary>✍️ Draft your answer before revealing marks</summary><div class='attempt-panel'><label for='attempt-"+q.id+"'>Write or outline the response</label><textarea id='attempt-"+q.id+"' rows='4' placeholder='Show your reasoning, working, units and conclusion…' oninput=\"setAttempt('"+q.id+"',this.value)\">"+esc(draft)+"</textarea><div class='attempt-footer'><span class='tiny muted' id='attempt-count-"+q.id+"'>"+(draft.trim()?draft.trim().split(/\s+/).length:0)+" words drafted</span><button class='btn btn-g btn-xs' type='button' onclick=\"clearAttempt('"+q.id+"')\">Clear draft</button></div></div></details>"+
  "<div class='hintbox"+((view.openPanels&&view.openPanels["hint-"+q.id])?" show":"")+"' id='hint-"+q.id+"'>💡 "+esc(q.hint||"")+"</div>"+
  "<div class='ansbox"+((view.openPanels&&view.openPanels["ans-"+q.id])?" show":"")+"' id='ans-"+q.id+"'><h5>✅ MARK-SCHEME CHECKPOINTS · "+q.marks+" marks available</h5><p class='answer-intro'>Compare your attempt with these credit-bearing points. Mark allocation can be dependent or combined, so the checkpoints do not imply one mark each.</p><ol class='mark-points'>"+markPoints+"</ol>"+
  "<div class='sample-answer'><h6>🧾 Full-credit sample answer</h6>"+sample+"<small>The model follows the listed scoring points in order; calculation steps, reasoning, units and context are retained where supplied.</small></div>"+pitfallHtml+
  "<div class='self-mark-row'><span class='tiny muted'>After comparing, how did you do?</span><button class='btn btn-g btn-xs' onclick=\"selfMark('"+q.id+"','got',"+q.marks+")\">✅ I earned full marks</button><button class='btn btn-g btn-xs' onclick=\"selfMark('"+q.id+"','missed',"+q.marks+")\">🔁 Add to review</button></div></div>"+
  "<div class='qactions'><button class='btn btn-g btn-s' onclick=\"toggleAns('hint-"+q.id+"')\">💡 Hint</button><button class='btn btn-p btn-s' onclick=\"toggleAns('ans-"+q.id+"')\">✅ Reveal mark scheme + sample</button><button class='btn btn-g btn-s' onclick=\"askQ('"+q.id+"')\">🤖 Explain this</button></div></div>";
}
function findTopicAnywhere(sid,tid){var f=null;subj(sid).units.forEach(function(u){u.topics.forEach(function(t){if(t.id===tid)f=t;});});return f;}
function toggleAns(id){view.openPanels=view.openPanels||{};view.openPanels[id]=!view.openPanels[id];var el=document.getElementById(id);if(el)el.classList.toggle("show",view.openPanels[id]);}
function selfMark(qid,st,marks){var p=P();var first=!p.q[qid];p.q[qid]=st;if(first)p.xp+=(st==="got"?marks*2:3);saveP(p);toast(st==="got"?"Excellent! +"+marks*2+" XP 🌟":"Added to review list (+3 XP)");var c=document.getElementById("card-"+qid);if(c){c.classList.remove("got","missed");c.classList.add(st);}render();}
function askQ(qid){var all=unitQuestions(view.sid,view.uid).concat(view.mock&&view.mock.qs?view.mock.qs:[]),q=all.find(function(x){return x.id===qid;});view.tab=2;render();setTimeout(function(){sendChat("Explain this question: "+(q?q.title+" — "+q.q.slice(0,300):qid));},300);}
function TUTORQUIZ(sid,uid,tid){view.sid=sid;view.uid=uid;view.tid=tid;view.tab=1;view.qmode="topical";view.qtopics=[tid];view.qview="flip";view.qCursor=0;location.hash="#/subject/"+sid;render();window.scrollTo(0,0);toast("Filtered to your topic — good luck! 🎯");}

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
    var c=countQ(view.sid,view.uid,t.id,false);
    return "<label style='display:flex;gap:10px;align-items:center;font-weight:600;color:var(--text);margin:8px 0'><input type='checkbox' class='mockTopic' value='"+t.id+"' "+(view.qtopics.indexOf(t.id)>=0?"checked":"")+" style='width:18px;height:18px'> "+esc(t.name)+" <span class='tiny muted'>("+c+" base Qs)</span></label>";
  }).join("");
  return "<div class='mock-setup'><h3>⏱️ Build your mock — "+U.code+"</h3><p class='small muted'>Pick any <b>combination of topics</b>, set the time, and sit it like the real thing. Answers stay hidden until you finish; mocks sample base prompts and skip the separate retry drills.</p>"+
  "<label>1️⃣ Topics (tick at least one)</label>"+boxes+
  "<div style='display:flex;gap:18px;flex-wrap:wrap'><div><label>2️⃣ Number of questions</label><select id='mockN'><option>4</option><option selected>6</option><option>8</option><option>10</option></select></div>"+
  "<div><label>3️⃣ Time allowed (minutes)</label><input type='number' id='mockT' value='30' min='5' max='120' style='width:110px'></div></div>"+
  "<div style='margin-top:20px'><button class='btn btn-p' onclick='startMock()'>▶ Start mock exam</button></div></div>";
}
function startMock(){
  var tids=[].map.call(document.querySelectorAll(".mockTopic:checked"),function(c){return c.value;});
  if(!tids.length){ toast("Tick at least one topic!"); return; }
  var pool=unitQuestions(view.sid,view.uid).filter(function(q){ return !q.repeat&&(q.topics||[]).some(function(t){return tids.indexOf(t)>=0;}); });
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
    "<div style='text-align:center;margin-top:10px'><button class='btn btn-g btn-s' onclick=\"openStudyBook('"+sid+"')\">Continue →</button></div></div>";
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
    (QBANK[sid][u.id]||[]).forEach(function(x){ if((x.title+" "+x.q).toLowerCase().indexOf(q)>=0) out.push({h:"📝 "+esc(x.title)+" <span class='tiny muted'>"+x.ref+"</span>",go:"subject/"+sid,q:1,sid:sid,uid:u.id,tid:(x.topics||[])[0]}); }); });
  });
  box.innerHTML=out.slice(0,12).map(function(r,i){ return "<a onclick=\"searchGo("+i+")\">"+r.h+"</a>"; }).join("")||"<a>No matches — try fewer letters.</a>";
  box.style.display="block"; box._res=out.slice(0,12);
}
function searchGo(i){
  var r=document.getElementById("searchResults")._res[i];
  document.getElementById("searchResults").style.display="none";document.getElementById("globalSearch").value="";
  if(r.q){view.sid=r.sid;view.uid=r.uid;view.tid=r.tid;view.tab=1;view.qmode="topical";view.qtopics=r.tid?[r.tid]:[];view.qdiff="all";view.qsearch="";view.qview="flip";view.qCursor=0;var target="#/subject/"+r.sid+"/"+r.uid;if(location.hash===target)render();else location.hash=target;}
  else go(r.go);
}

/* boot */
render();
