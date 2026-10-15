/* Permanent bookshelf + paged-reader layout. All original subject content remains in the existing data files. */
function openStudyBook(sid){
  if(!SUBJECTS[sid]) return;
  var S=SUBJECTS[sid];
  view.sid=sid; view.uid=S.units[0].id; view.tid=S.units[0].topics[0]&&S.units[0].topics[0].id;
  view.tab=0; view.notePage=0; view.qCursor=0; view.qtopics=view.tid?[view.tid]:[];
  view.qdiff="all"; view.qsearch=""; view.variantFor={}; view.qview="flip"; view.qmode="topical";
  view.mock=null; view.flashIdx=0; view.flashFlip=false;
  go("subject/"+sid,0);
}
function vLibraryHome(){
  var c=counts(), p=P(), ids=Object.keys(SUBJECTS);
  var books=ids.map(function(sid,i){
    var S=SUBJECTS[sid], progress=subjectProgress(sid), topics=S.units.reduce(function(a,u){return a+u.topics.length;},0);
    var colours={physics:"#668875",chemistry:"#a36d57",biology:"#788a57",maths:"#a8874c"};
    var volume=sid==="maths"?"P1–P4 · S1 · M1":S.qual+" · AS + A2";
    var units=S.units.map(function(u){return u.short;}).join(" · ");
    return "<button class='library-book' style='--book-cover:"+colours[sid]+"' onclick=\"openStudyBook('"+sid+"')\" aria-label='Open "+esc(S.name)+" book'>"+
      "<span class='library-book-inner'><span class='library-book-series'>VOLUME "+String(i+1).padStart(2,"0")+" · IAL MASTERY</span>"+
      "<span class='library-book-icon'>"+S.icon+"</span><span class='library-book-code'>"+esc(volume)+"</span><strong>"+esc(S.name)+"</strong>"+
      "<span class='library-book-desc'>"+esc(S.desc)+"</span><span class='library-book-bottom'><span>"+topics+" topics · "+progress.pct+"% read</span><b>↗</b></span></span></button>";
  }).join("");
  return "<section class='library-home'><div class='library-welcome'><div class='library-copy'><div class='book-eyebrow'>EDEXCEL INTERNATIONAL A LEVEL · YOUR STUDY LIBRARY</div>"+
    "<h1>Choose a subject.<br><em>Open a book.</em></h1><p>Browse a real contents page, settle into a topic, then turn through detailed notes or exam-style practice at your own pace.</p>"+
    "<div class='library-actions'><button class='btn btn-p' onclick=\"openStudyBook('physics')\">Open your first book <span>→</span></button><button class='btn btn-g' onclick=\"go('guide')\">Study guide &amp; resources</button></div></div>"+
    "<aside class='library-note'><span class='library-note-top'>A NOTE FOR YOUR NEXT SESSION <span>✳</span></span><p>Small chapters.<br>Clear explanations.<br>One page at a time.</p><small>YOUR DESK · "+c.topics+" CHAPTERS</small></aside></div>"+
    "<div class='shelf-heading'><h2>Your subjects</h2><span>Click a cover to open its contents</span></div><div class='library-shelf'>"+books+"</div>"+
    "<div class='library-bottom-row'><article><span>01</span><div><b>Read in chapters</b><p>Pick a topic from the contents page and move through one idea at a time.</p></div></article>"+
    "<article><span>02</span><div><b>Switch from notes to practice</b><p>Open hints, draft answers, reveal mark schemes and move between questions like pages.</p></div></article>"+
    "<article><span>03</span><div><b>Your study data stays here</b><p>"+c.questions+" practice prompts · "+c.topics+" syllabus topics · "+(p.streak||1)+"-day study streak.</p></div></article></div>"+
    "<div class='library-resource-link'><div><b>Looking for official papers, grade thresholds, FAQs or more about the platform?</b><span>All the original study information is still available in the study guide.</span></div><button class='btn btn-g btn-s' onclick=\"go('guide')\">Open the study guide →</button></div></section>";
}
function vBookSubject(){
  var S=subj(view.sid), U=unitOf(view.sid,view.uid);
  if(!S) return vLibraryHome();
  if(!U){view.uid=S.units[0].id;U=unitOf(view.sid,view.uid);}
  if(!topicOf(view.sid,view.uid,view.tid)) view.tid=U.topics[0]&&U.topics[0].id;
  if(view.tab===1&&!view.qtopics.length&&view.tid) view.qtopics=[view.tid];
  var T=topicOf(view.sid,view.uid,view.tid), p=P();
  var units=S.units.map(function(u){return "<option value='"+u.id+"'"+(u.id===U.id?" selected":"")+">"+esc(u.code)+" · "+esc(u.short)+" — "+esc(u.title)+"</option>";}).join("");
  var topics=U.topics.map(function(t,i){
    var done=p.topics[view.sid+":"+t.id], selected=t.id===view.tid, nq=countQ(view.sid,U.id,t.id);
    return "<button class='book-toc-topic"+(selected?" selected":"")+(done?" completed":"")+"' onclick=\"selectBookTopic('"+t.id+"')\" aria-current='"+(selected?"page":"false")+"'><span class='book-toc-number'>"+String(i+1).padStart(2,"0")+"</span><span class='book-toc-copy'><b>"+esc(t.name)+"</b><small>"+nq+" practice prompts"+(t.notes.sections&&t.notes.sections.length?" · "+t.notes.sections.length+" note sections":"")+"</small></span><span class='book-toc-status'>"+(done?"✓":"›")+"</span></button>";
  }).join("");
  var tabs=[[0,"▤","Study notes"],[1,"✎","Practice"],[2,"◌","AI tutor"]].map(function(row){
    return "<button class='book-tab"+(view.tab===row[0]?" active":"")+"' onclick='setTab("+row[0]+")' aria-pressed='"+(view.tab===row[0])+"'><span>"+row[1]+"</span>"+row[2]+"</button>";
  }).join("");
  var body=view.tab===0?renderBookNotes(T):view.tab===1?vPapers():vAI();
  var pageLabel=view.tab===0?"READING ROOM":view.tab===1?"PRACTICE DESK":"TUTOR'S DESK";
  return "<section class='book-room' style='--book-accent:"+S.color+"'><div class='book-room-heading'><div class='book-heading-main'>"+
    "<button class='back-to-library' onclick=\"go('home')\">← Bookshelf</button><div class='book-heading-line'><span class='book-heading-icon'>"+S.icon+"</span><div><div class='book-small-label'>"+esc(S.qual)+" · "+S.units.length+" UNITS</div><h1>"+esc(S.name)+"</h1></div></div></div>"+
    "<label class='book-unit-picker'><span>CHOOSE A UNIT</span><select onchange='setBookUnit(this.value)'>"+units+"</select></label></div>"+
    "<div class='book-tabs' role='tablist' aria-label='Study mode'>"+tabs+"<div class='book-tabs-meta'>"+esc(U.code)+" · "+esc(U.short)+"<small>"+esc(U.title)+" · "+pageLabel+"</small></div></div>"+
    "<div class='book-spread'><aside class='book-contents-page'><div class='book-page-running'><span>CONTENTS</span><span>"+esc(U.code)+"</span></div><div class='book-contents-title'><span>"+esc(U.short.toUpperCase())+" · "+esc(U.level||"IAL")+"</span><h2>"+esc(U.title)+"</h2><p>Choose a chapter to open it. Your progress is marked beside each topic.</p></div>"+
    "<div class='book-topic-count'><span>CHAPTERS</span><b>"+U.topics.length+" topics</b></div><nav class='book-topic-index' aria-label='Topics in "+esc(U.short)+"'>"+topics+"</nav>"+
    "<div class='book-contents-tip'><b>Reading path</b><p>Start with the overview, explore the deeper notes, then test yourself with a question or flashcard.</p></div><div class='book-page-folio'><span>IAL MASTERY</span><span>"+String(S.units.indexOf(U)+1).padStart(2,"0")+" · CONTENTS</span></div></aside>"+
    "<section class='book-reading-page'><div class='book-page-running'><span><b>"+esc(U.code)+"</b> · "+esc(U.short.toUpperCase())+"</span><span>"+pageLabel+"</span></div><div class='book-page-content'>"+body+"</div></section></div></section>";
}
function selectBookTopic(tid){
  var U=unitOf(view.sid,view.uid); if(!U||!U.topics.some(function(t){return t.id===tid;})) return;
  view.tid=tid; view.notePage=0; view.bookTurnDir=""; view.flashIdx=0; view.flashFlip=false;
  if(view.tab===1){view.qtopics=[tid];view.qCursor=0;view.qview="flip";view.qmode="topical";view.mock=null;}
  render();
}
function setBookUnit(uid){
  setUnit(uid); view.notePage=0; view.qCursor=0;
}
function bookNotePages(T){
  if(!T) return [];
  var n=T.notes||{}, pages=[{kind:"overview"}], points=n.points||[], sections=n.sections||[], walk=n.walkthrough||[];
  for(var i=0;i<points.length;i+=5) pages.push({kind:"points",items:points.slice(i,i+5),part:Math.floor(i/5)+1,total:Math.ceil(points.length/5)});
  for(var j=0;j<walk.length;j+=2) pages.push({kind:"walkthrough",parts:walk.slice(j,j+2),part:Math.floor(j/2)+1,total:Math.ceil(walk.length/2)});
  for(var k=0;k<sections.length;k+=2) pages.push({kind:"sections",items:sections.slice(k,k+2),part:Math.floor(k/2)+1,total:Math.ceil(sections.length/2)});
  if((n.formulas&&n.formulas.length)||(n.defs&&n.defs.length)||n.worked) pages.push({kind:"toolkit"});
  if((n.mistakes&&n.mistakes.length)||(n.tips&&n.tips.length)||n.oos||n.reviewPrompt) pages.push({kind:"exam"});
  var cards=[];(n.defs||[]).forEach(function(d){cards.push({front:d.t,back:d.d});});(n.formulas||[]).forEach(function(f){cards.push({front:f.w,back:f.e});});
  view._cards=cards;
  if(cards.length) pages.push({kind:"flashcards"});
  if(!pages.length) pages.push({kind:"overview"});
  return pages;
}
function renderBookNotes(T){
  var pages=bookNotePages(T), n=T.notes||{};
  if(view.notePage>=pages.length) view.notePage=0;
  var index=view.notePage||0, page=pages[index], done=P().topics[view.sid+":"+T.id], content=renderBookNotePage(page,T,n);
  var direction=view.bookTurnDir||"";
  var html="<div class='book-note-reader'><div class='book-note-page-head'><div><span class='book-page-kicker'>"+bookPageLabel(page,index)+"</span><h2 class='book-note-title'>"+esc(T.name)+"</h2></div><span class='book-page-folio-large'>"+String(index+1).padStart(2,"0")+"</span></div>"+
    "<article class='book-note-page "+direction+"'>"+content+"</article><div class='book-note-actions'><button class='btn "+(done?"btn-g":"btn-p")+" btn-s' onclick=\"toggleTopic('"+view.sid+"','"+T.id+"')\">"+(done?"✓ Topic complete":"Mark topic complete · +20 XP")+"</button><button class='btn btn-g btn-s' onclick=\"practiceTopic('"+T.id+"')\">✎ Practise this topic</button><button class='btn btn-g btn-s' onclick=\"askAbout('"+T.id+"')\">Ask AI about it</button></div>"+
    "<div class='book-turn-controls'><button class='book-turn-button' onclick='bookNoteTurn(-1)'"+(index===0?" disabled":"")+">← Previous page</button><div class='book-turn-status'><b>PAGE "+String(index+1).padStart(2,"0")+" OF "+String(pages.length).padStart(2,"0")+"</b><span><i style='width:"+Math.round((index+1)/pages.length*100)+"%'></i></span></div><button class='book-turn-button' onclick='bookNoteTurn(1)'"+(index===pages.length-1?" disabled":"")+">Next page →</button></div></div>";
  view.bookTurnDir="";
  return html;
}
function bookPageLabel(page,index){
  if(!page) return "CHAPTER OVERVIEW";
  if(page.kind==="overview") return "CHAPTER OVERVIEW";
  if(page.kind==="points") return "QUICK REVISION · PART "+String(page.part).padStart(2,"0")+" / "+String(page.total).padStart(2,"0");
  if(page.kind==="walkthrough") return "GUIDED EXPLANATION · PART "+String(page.part).padStart(2,"0")+" / "+String(page.total).padStart(2,"0");
  if(page.kind==="sections") return "EXPANDED NOTES · PART "+String(page.part).padStart(2,"0")+" / "+String(page.total).padStart(2,"0");
  if(page.kind==="toolkit") return "FORMULAE · DEFINITIONS · WORKED EXAMPLE";
  if(page.kind==="exam") return "EXAM CHECK · COMMON ERRORS & RECALL";
  return "FLASHCARDS · PAGE "+String(index+1).padStart(2,"0");
}
function renderBookNotePage(page,T,n){
  if(!page||page.kind==="overview"){
    var lede=n.lede||"Build this topic from its core ideas, then check the worked examples and practice questions.";
    var qCount=countQ(view.sid,view.uid,T.id);
    return "<div class='book-page-intro'><span class='book-overline'>THE CHAPTER AT A GLANCE</span><h3>"+esc(T.name)+"</h3><p class='book-page-lede'>"+esc(lede)+"</p><div class='book-topic-facts'><span>"+esc(unitOf(view.sid,view.uid).code)+"</span><span>"+(n.sections||[]).length+" detailed sections</span><span>"+qCount+" practice prompts</span></div></div>"+
      "<div class='book-page-callout'><b>HOW TO USE THIS CHAPTER</b><p>Turn through the short summary, open the expanded explanations, then use the retrieval check or try a question without looking at the answer.</p></div>"+
      "<p class='book-page-hint'>The full revision summary, guided walkthrough, formulae, worked examples, classic mistakes and exam tips are all kept in the following pages.</p>";
  }
  if(page.kind==="points"){
    return "<div class='book-section-heading'><span>QUICK REVISION SUMMARY</span><h3>Core ideas to remember</h3><p>All original summary points are retained and split across pages for easier review.</p></div><ol class='book-point-list'>"+page.items.map(function(item){return "<li>"+item+"</li>";}).join("")+"</ol>";
  }
  if(page.kind==="walkthrough"){
    return "<div class='book-section-heading'><span>GUIDED WALKTHROUGH</span><h3>Follow the reasoning</h3><p>Step-by-step explanations connect the main ideas and show why each relationship matters.</p></div>"+
      page.parts.map(function(part,i){return "<article class='book-walkthrough'><span>STEP "+String(i+1).padStart(2,"0")+"</span><h4>"+esc(part.title)+"</h4><p>"+esc(part.text)+"</p></article>";}).join("");
  }
  if(page.kind==="sections"){
    return "<div class='book-section-heading'><span>EXPANDED CHAPTER NOTES</span><h3>Explore the details</h3><p>Open each section when you are ready. Every original subheading and note point is preserved.</p></div>"+
      page.items.map(function(section,i){return "<details class='book-deep-section'"+(i===0?" open":"")+"><summary>"+esc(section.title)+"</summary>"+(section.intro?"<p class='book-section-intro'>"+esc(section.intro)+"</p>":"")+"<ul>"+(section.points||[]).map(function(point){return "<li>"+point+"</li>";}).join("")+"</ul></details>";}).join("");
  }
  if(page.kind==="toolkit"){
    return "<div class='book-section-heading'><span>REFERENCE DESK</span><h3>Relationships and worked methods</h3><p>Keep the symbols, definitions and method steps together while you revise.</p></div>"+
      ((n.formulas||[]).length?"<h4 class='book-subheading'>Formulae</h4><div class='book-formula-grid'>"+n.formulas.map(function(f){return "<div><b>"+f.e+"</b><small>"+f.w+"</small></div>";}).join("")+"</div>":"")+((n.defs||[]).length?"<h4 class='book-subheading'>Definitions</h4><div class='book-definitions'>"+n.defs.map(function(d){return "<p><b>"+d.t+"</b> — "+d.d+"</p>";}).join("")+"</div>":"")+
      (n.worked?"<article class='book-worked-example'><span>WORKED EXAMPLE</span><p class='worked-prompt'>"+n.worked.q+"</p><ol>"+(n.worked.steps||[]).map(function(step){return "<li>"+step+"</li>";}).join("")+"</ol></article>":"");
  }
  if(page.kind==="exam"){
    return "<div class='book-section-heading'><span>EXAM CHECKLIST</span><h3>Recall, apply, review</h3><p>Keep the common pitfalls and practical exam advice visible before moving on.</p></div>"+
      "<div class='book-exam-columns'><section><h4>Common mistakes</h4><ul>"+(n.mistakes||[]).map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul></section><section><h4>Exam tips</h4><ul>"+(n.tips||[]).map(function(x){return "<li>"+x+"</li>";}).join("")+"</ul></section></div>"+
      (n.oos?"<div class='book-beyond'>"+n.oos+"</div>":"")+(n.reviewPrompt?"<div class='book-retrieval'><span>RETRIEVAL CHECK · CLOSE YOUR NOTES</span><p>"+esc(n.reviewPrompt)+"</p></div>":"");
  }
  if(page.kind==="flashcards"){
    var cards=view._cards||[]; if(view.flashIdx>=cards.length)view.flashIdx=0;
    var card=cards[view.flashIdx]||{front:"No cards",back:""};
    return "<div class='book-section-heading'><span>RETRIEVAL PRACTICE</span><h3>Flashcards</h3><p>Try to recall the answer before revealing it. Use the arrows to move through the cards.</p></div>"+
      "<button class='book-flashcard' onclick='flipFlash()'><span>"+(view.flashFlip?"ANSWER":"PROMPT")+" · "+String(view.flashIdx+1).padStart(2,"0")+" / "+String(cards.length).padStart(2,"0")+"</span><b>"+(view.flashFlip?card.back:esc(card.front))+"</b><small>Click to "+(view.flashFlip?"show prompt":"reveal answer")+" ↻</small></button>"+
      "<div class='book-flash-controls'><button class='btn btn-g btn-xs' onclick='flashNav(-1)'>← Previous card</button><button class='btn btn-g btn-xs' onclick='flashShuffle()'>Shuffle cards</button><button class='btn btn-g btn-xs' onclick='flashNav(1)'>Next card →</button></div>";
  }
  return "";
}
function bookNoteTurn(delta){
  var pages=bookNotePages(topicOf(view.sid,view.uid,view.tid)),next=(view.notePage||0)+delta;
  if(next<0||next>=pages.length)return;
  view.notePage=next;view.bookTurnDir=delta>0?"book-turn-forward":"book-turn-back";render();
}
function bookQuestionTurn(delta){
  var qs=filteredQ(),next=(view.qCursor||0)+delta;
  if(next<0||next>=qs.length)return;
  view.qCursor=next;view.bookTurnDir=delta>0?"book-turn-forward":"book-turn-back";renderQList();
}
function renderBookQuestionPage(qs){
  if(!qs.length)return "";
  if(view.qCursor>=qs.length)view.qCursor=qs.length-1;
  if(view.qCursor<0)view.qCursor=0;
  var q=qs[view.qCursor],direction=view.bookTurnDir||"";
  var html="<section class='book-question-flip'><div class='book-question-progress'><span>TOPIC PRACTICE · "+esc(view.qtopics.length?"SELECTED TOPIC SET":"ALL UNIT TOPICS")+"</span><b>QUESTION "+String(view.qCursor+1).padStart(2,"0")+" / "+String(qs.length).padStart(2,"0")+"</b></div><div class='book-question-sheet "+direction+"'>"+
    "<div class='book-question-note'><b>ORIGINAL EXAM-STYLE PRACTICE</b><span>Not an official past-paper scan. Official paper hubs remain in the archive tab.</span></div>"+qCard(q)+"</div><div class='book-question-turns'><button class='book-turn-button' onclick='bookQuestionTurn(-1)'"+(view.qCursor===0?" disabled":"")+">← Previous question</button><span>Use the arrows to turn through this topic set</span><button class='book-turn-button' onclick='bookQuestionTurn(1)'"+(view.qCursor>=qs.length-1?" disabled":"")+">Next question →</button></div></section>";
  view.bookTurnDir="";
  return html;
}
function bookStudyGuide(){
  return "<section class='book-guide-top'><div class='book-eyebrow'>THE STUDY GUIDE</div><h2>Keep all the original resources within reach.</h2><p>The bookshelf changes how you move through the material, not what the platform contains.</p></section>"+vHome();
}
