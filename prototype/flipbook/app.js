/* Temporary standalone book-layout prototype. The main app is not modified. */
(function(){
  'use strict';

  var BOOKS = {
    physics: SUBJECT_PHYSICS,
    chemistry: SUBJECT_CHEMISTRY,
    biology: SUBJECT_BIOLOGY,
    maths: SUBJECT_MATHS
  };
  var BANKS = {
    physics: QBANK_PHYSICS,
    chemistry: QBANK_CHEMISTRY,
    biology: QBANK_BIOLOGY,
    maths: QBANK_MATHS
  };
  var COLORS = {physics:'#698b78', chemistry:'#a96e57', biology:'#778b58', maths:'#ad8b4b'};
  var state = {screen:'library', sid:null, uid:null, tid:null, mode:'notes', page:0, question:0, answerOpen:false, hintOpen:false, filter:'', turn:''};
  var app = document.getElementById('app');
  var toastTimer;

  function esc(value){
    return String(value == null ? '' : value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  function niceNumber(n){ return String(n).padStart(2,'0'); }
  function subject(sid){ return BOOKS[sid]; }
  function currentUnit(){
    var S = subject(state.sid);
    return S && S.units.find(function(u){ return u.id === state.uid; });
  }
  function currentTopic(){
    var U = currentUnit();
    return U && U.topics.find(function(t){ return t.id === state.tid; });
  }
  function questionsForTopic(){
    var U = currentUnit(), T = currentTopic();
    if(!U || !T) return [];
    return ((BANKS[state.sid] && BANKS[state.sid][U.id]) || []).filter(function(q){ return (q.topics || []).indexOf(T.id) >= 0; });
  }
  function subjectQuestionCount(sid){
    var S = subject(sid), bank = BANKS[sid] || {}, total = 0;
    S.units.forEach(function(u){ total += (bank[u.id] || []).length; });
    return total;
  }
  function totalTopics(){
    return Object.keys(BOOKS).reduce(function(sum, sid){
      return sum + BOOKS[sid].units.reduce(function(unitSum, u){ return unitSum + u.topics.length; }, 0);
    }, 0);
  }
  function openBook(sid){
    var S = subject(sid);
    if(!S) return;
    state.screen = 'book'; state.sid = sid; state.uid = S.units[0].id;
    state.tid = S.units[0].topics[0].id; state.mode = 'notes'; state.page = 0;
    state.question = 0; state.answerOpen = false; state.hintOpen = false; state.filter = '';
    renderBook();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function returnToLibrary(){
    state.screen = 'library'; state.sid = null; state.uid = null; state.tid = null;
    renderLibrary(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderLibrary(){
    var ids = Object.keys(BOOKS);
    var cards = ids.map(function(sid, index){
      var S = subject(sid), count = S.units.reduce(function(sum, u){ return sum + u.topics.length; }, 0);
      var volume = sid === 'maths' ? 'P1–P4 · S1 · M1' : S.qual + ' · AS + A2';
      return "<button class='book-card' style='--cover:"+COLORS[sid]+"' data-action='open-book' data-sid='"+sid+"' aria-label='Open the "+esc(S.name)+" book'>"+
        "<span class='book-content'><span class='book-serial'>VOLUME "+niceNumber(index+1)+" · IAL MASTERY</span>"+
        "<span class='book-symbol' aria-hidden='true'>"+S.icon+"</span><span class='book-subject'>"+esc(volume)+"</span>"+
        "<strong>"+esc(S.name)+"</strong><span class='book-description'>"+esc(S.desc)+"</span>"+
        "<span class='book-bottom'><span>"+count+" chapters · "+subjectQuestionCount(sid)+" prompts</span><b aria-hidden='true'>↗</b></span></span></button>";
    }).join('');
    app.innerHTML = "<section class='library-intro'><div><div class='eyebrow'>A quieter way to study · concept preview</div>"+
      "<h1>Choose a subject.<br><em>Open a book.</em></h1><p>Pick a volume from the shelf, choose a chapter from its contents, then <b>turn through notes or exam-style practice</b> one page at a time.</p></div>"+
      "<aside class='desk-note'><div class='desk-note-top'><span>Study note</span><span>01 / 04</span></div><p>Small chapters.<br>Clear explanations.<br>One page at a time.</p><small>THE IDEA BEHIND THIS LAYOUT</small></aside></section>"+
      "<div class='shelf-label'><h2>Your subjects</h2><span>Click any cover to open its contents</span></div>"+
      "<section class='book-shelf' aria-label='Choose a subject book'>"+cards+"</section>"+
      "<section class='library-footnote'><article class='library-feature'><span class='feature-icon'>⌑</span><div><b>A real contents page</b><p>Browse by unit, then choose the exact topic you want to study.</p></div></article>"+
      "<article class='library-feature'><span class='feature-icon'>↶</span><div><b>Pages you can turn</b><p>Move through a lesson in smaller steps instead of one long scroll.</p></div></article>"+
      "<article class='library-feature'><span class='feature-icon'>✎</span><div><b>Notes beside practice</b><p>Switch books from revision pages to original exam-style questions.</p></div></article></section>";
  }

  function renderBook(){
    var S = subject(state.sid), U = currentUnit(), T = currentTopic();
    if(!S || !U || !T){ returnToLibrary(); return; }
    var topicNumber = U.topics.findIndex(function(t){ return t.id === T.id; }) + 1;
    var unitOptions = S.units.map(function(u){
      return "<option value='"+u.id+"'"+(u.id === U.id ? ' selected' : '')+">"+esc(u.code)+" · "+esc(u.short)+" — "+esc(u.title)+"</option>";
    }).join('');
    var topicRows = U.topics.map(function(t, i){
      var active = t.id === T.id;
      var count = ((BANKS[state.sid] && BANKS[state.sid][U.id]) || []).filter(function(q){ return (q.topics || []).indexOf(t.id) >= 0; }).length;
      return "<li class='toc-row' data-topic-name='"+esc(t.name.toLowerCase())+"'><button class='toc-item"+(active ? ' active' : '')+"' data-action='topic' data-tid='"+t.id+"'><span class='toc-page'>"+niceNumber(i+1)+"</span><span class='toc-name'>"+esc(t.name)+"<small>"+count+" practice prompts</small></span></button></li>";
    }).join('');
    var isNotes = state.mode === 'notes';
    var pageData = isNotes ? buildNotePages(T) : [];
    var qs = isNotes ? [] : questionsForTopic();
    var maxPage = isNotes ? Math.max(pageData.length-1, 0) : Math.max(qs.length-1, 0);
    state.page = Math.min(state.page, maxPage);
    var pageCount = isNotes ? pageData.length : qs.length;
    var content = isNotes ? renderNotePage(pageData[state.page] || pageData[0], T, U, topicNumber) : renderQuestionPage(qs[state.question] || qs[0], qs.length, T);
    var currentIndex = isNotes ? state.page : state.question;
    var spreadLabel = isNotes ? 'READING PAGE' : 'PRACTICE CARD';
    var progress = pageCount ? Math.round(((currentIndex+1)/pageCount)*100) : 0;
    app.innerHTML = "<section class='reader' style='--accent:"+COLORS[state.sid]+"'>"+
      "<div class='reader-top'><div><button class='back-link' data-action='library'>← Back to the bookshelf</button>"+
        "<div class='book-heading'><span class='subject-seal'>"+S.icon+"</span><div><div class='subject-meta'>"+esc(S.qual)+" · "+S.units.length+" volumes</div><h1>"+esc(S.name)+"</h1></div></div></div>"+
        "<div class='unit-select-wrap'><label for='unitSelect'>Choose a unit</label><select id='unitSelect' class='unit-select' data-action='unit'>"+unitOptions+"</select></div></div>"+
      "<div class='reader-tools'><div class='mode-switch' role='tablist' aria-label='Choose reading mode'>"+
        "<button class='mode-button"+(isNotes ? ' active' : '')+"' data-action='mode' data-mode='notes' role='tab' aria-selected='"+isNotes+"'>▤ &nbsp;STUDY NOTES</button>"+
        "<button class='mode-button"+(!isNotes ? ' active' : '')+"' data-action='mode' data-mode='practice' role='tab' aria-selected='"+(!isNotes)+"'>✎ &nbsp;PRACTICE QUESTIONS</button></div>"+
        "<div class='reader-tools-note'>"+esc(U.code)+" · "+esc(U.title)+"<br>"+spreadLabel+" · "+(pageCount ? niceNumber(currentIndex+1)+' / '+niceNumber(pageCount) : 'NO PROMPTS')+"</div></div>"+
      "<div class='open-book'><aside class='paper contents-page'><div class='page-running-head'><strong>"+esc(S.name.toUpperCase())+" · CONTENTS</strong><span>VOL. "+niceNumber(S.units.indexOf(U)+1)+"</span></div>"+
        "<div class='contents-kicker'>"+esc(U.short)+" · "+esc(U.level || 'IAL')+"</div><h2 class='contents-title'>"+esc(U.title)+"</h2>"+
        "<p class='contents-desc'>Choose a topic below. The reading page updates to that chapter.</p>"+
        "<input id='topicSearch' class='contents-search' type='search' placeholder='Find a topic…' value='"+esc(state.filter)+"' aria-label='Filter chapter topics'>"+
        "<div class='toc-label'><span>CHAPTERS</span><span>"+U.topics.length+" TOPICS</span></div><ul class='toc-list'>"+topicRows+"<li class='toc-empty' hidden>No topics match this search.</li></ul>"+
        "<div class='toc-note'><b>Reading path</b><br>Start with the overview, open any deeper section, then finish with the exam checklist or a practice question.</div>"+
        "<div class='page-folio'><span>IAL MASTERY</span><span>"+niceNumber(S.units.indexOf(U)+1)+" · TOC</span></div></aside>"+
        "<section class='paper reading-page"+(state.turn ? ' '+state.turn : '')+"' id='readingPage'><div class='page-running-head'><span><strong>"+esc(U.code)+"</strong> · "+esc(U.short.toUpperCase())+"</span><span>"+spreadLabel+"</span></div>"+
        "<div class='page-body' id='pageBody'>"+content+"</div>"+
        "<div class='page-controls'><button class='page-turn' data-action='page' data-delta='-1'"+(currentIndex<=0 ? ' disabled' : '')+">← &nbsp;Previous</button>"+
        "<div class='page-index'><strong>"+(pageCount ? 'PAGE '+niceNumber(currentIndex+1)+' OF '+niceNumber(pageCount) : 'NO QUESTIONS')+"</strong><div class='page-track'><span style='width:"+progress+"%'></span></div></div>"+
        "<button class='page-turn' data-action='page' data-delta='1'"+(currentIndex>=maxPage ? ' disabled' : '')+">Next &nbsp;→</button></div></section></div>"+
      "<div class='reader-feedback'><span><b>First impression?</b> This is only a layout experiment; the main site is unchanged.</span><div class='feedback-actions'>"+
        "<button data-action='feedback' data-value='like'>I like this direction</button><button data-action='feedback' data-value='maybe'>Maybe — keep refining</button><button data-action='feedback' data-value='no'>Not for me</button></div></div></section>";
    state.turn = '';
    applyTopicFilter();
  }

  function buildNotePages(T){
    var n = T.notes || {}, pages = [];
    var points = n.points || [];
    pages.push({kind:'overview', label:'CHAPTER OVERVIEW', title:'Start with the big idea', lede:n.lede || 'Build the topic from its central idea, then work through the details.', points:points.slice(0,3)});
    var walk = n.walkthrough || [];
    if(walk.length){ pages.push({kind:'walkthrough', label:'GUIDED EXPLANATION', title:'Follow the reasoning', parts:walk}); }
    var sections = n.sections || [];
    if(sections.length){
      for(var i=0; i<sections.length; i+=2){
        pages.push({kind:'sections', label:'EXPANDED NOTES', title:i===0 ? 'Explore the chapter' : 'Continue the chapter', sections:sections.slice(i,i+2), part:i/2+1, total:Math.ceil(sections.length/2)});
      }
    } else if(points.length > 3){
      for(var p=3; p<points.length; p+=5){ pages.push({kind:'key-points', label:'KEY IDEAS', title:'Keep building the picture', points:points.slice(p,p+5), part:Math.floor((p-3)/5)+1}); }
    }
    if((n.formulas && n.formulas.length) || (n.defs && n.defs.length) || n.worked){ pages.push({kind:'toolkit', label:'FORMULAE & EXAMPLES', title:'Put the ideas to work', notes:n}); }
    if((n.mistakes && n.mistakes.length) || (n.tips && n.tips.length) || n.reviewPrompt){ pages.push({kind:'checklist', label:'EXAM CHECK', title:'What to remember under pressure', notes:n}); }
    if(pages.length === 1 && points.length > 3){ pages.push({kind:'key-points', label:'KEY IDEAS', title:'Continue the chapter', points:points.slice(3)}); }
    return pages;
  }

  function renderNotePage(page, T, U, topicNumber){
    if(!page) return "<div class='empty-practice'>This chapter does not yet have a page to show.</div>";
    if(page.kind === 'overview'){
      var pointCards = page.points.map(function(item,i){ return "<article class='key-card'><span class='key-no'>IDEA "+niceNumber(i+1)+"</span><p>"+item+"</p></article>"; }).join('');
      return "<div class='page-kicker'>"+page.label+" · "+esc(U.code)+"</div><h2 class='page-title'>"+esc(T.name)+"</h2>"+
        "<p class='page-lede'>"+esc(page.lede)+"</p><div class='topic-meta-row'><span class='meta-chip'>"+esc(U.level || 'IAL')+" TOPIC</span><span class='meta-chip'>CHAPTER "+niceNumber(topicNumber)+"</span><span class='meta-chip'>"+((T.notes && T.notes.walkthrough || []).length)+" GUIDED EXPLANATIONS</span></div>"+
        "<div class='chapter-callout'><span class='callout-label'>THE IDEA TO HOLD ONTO</span><p>"+esc((page.lede || '').split(/[.!?]/)[0])+".</p></div>"+
        (pointCards ? "<div class='key-grid'>"+pointCards+"</div>" : '')+"<div class='path-note'>NEXT: FOLLOW THE EXPLANATION → OPEN THE EXPANDED SECTIONS → TRY A QUESTION</div>";
    }
    if(page.kind === 'walkthrough'){
      var walkHtml = page.parts.map(function(part,i){ return "<article class='walkthrough-card'><span class='walk-no'>GUIDED STEP "+niceNumber(i+1)+"</span><h3>"+esc(part.title)+"</h3><p>"+esc(part.text)+"</p></article>"; }).join('');
      return "<div class='page-kicker'>"+page.label+"</div><h2 class='page-title'>"+esc(page.title)+"</h2><p class='page-lede'>A little more than a revision summary: unpack the logic, connect each step, and see why the method works.</p>"+walkHtml+
        "<div class='path-note'>READ SLOWLY · THEN EXPLAIN THE CHAIN OF REASONING IN YOUR OWN WORDS</div>";
    }
    if(page.kind === 'sections'){
      var sectionHtml = page.sections.map(function(section,i){
        var intro = section.intro ? "<p class='section-intro'>"+esc(section.intro)+"</p>" : '';
        var pts = (section.points || []).map(function(point){ return '<li>'+point+'</li>'; }).join('');
        return "<details class='deep-section-card'"+(i===0 ? ' open' : '')+"><summary>"+esc(section.title)+"</summary>"+intro+"<ul>"+pts+"</ul></details>";
      }).join('');
      return "<div class='page-kicker'>"+page.label+(page.total>1 ? ' · PART '+niceNumber(page.part)+' / '+niceNumber(page.total) : '')+"</div><h2 class='page-title'>"+esc(page.title)+"</h2>"+
        "<p class='page-lede'>Open each section when you are ready. These are the deeper chapter notes, organised into smaller explanations rather than one long page.</p><div>"+sectionHtml+"</div>"+
        "<div class='path-note'>TIP: OPEN A SECTION, READ IT, THEN CLOSE IT BEFORE MOVING ON</div>";
    }
    if(page.kind === 'key-points'){
      var allPoints = (page.points || []).map(function(point){ return '<li>'+point+'</li>'; }).join('');
      return "<div class='page-kicker'>"+page.label+(page.part ? ' · PART '+niceNumber(page.part) : '')+"</div><h2 class='page-title'>"+esc(page.title)+"</h2><p class='page-lede'>A compact set of ideas to revisit after the detailed explanations.</p><ul class='study-list'>"+allPoints+"</ul>";
    }
    if(page.kind === 'toolkit'){
      var n = page.notes, html = "<div class='page-kicker'>"+page.label+"</div><h2 class='page-title'>"+esc(page.title)+"</h2>";
      if(n.formulas && n.formulas.length){ html += "<h3 class='subheading'>Useful relationships</h3><div class='formula-grid'>"+n.formulas.map(function(f){ return "<div class='formula-card'><b>"+f.e+"</b><small>"+esc(f.w)+"</small></div>"; }).join('')+"</div>"; }
      if(n.defs && n.defs.length){ html += "<h3 class='subheading'>Precise language</h3>"+n.defs.map(function(d){ return "<div class='definition-row'><b>"+esc(d.t)+"</b> — "+esc(d.d)+"</div>"; }).join(''); }
      if(n.worked){ html += "<article class='worked-example'><span class='worked-label'>WORKED EXAMPLE</span><p class='worked-question'>"+esc(n.worked.q)+"</p><ol>"+(n.worked.steps || []).map(function(step){ return '<li>'+esc(step)+'</li>'; }).join('')+"</ol></article>"; }
      return html;
    }
    if(page.kind === 'checklist'){
      var notes = page.notes, mistakes = notes.mistakes || [], tips = notes.tips || [];
      var mistakesHtml = mistakes.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('');
      var tipsHtml = tips.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('');
      return "<div class='page-kicker'>"+page.label+"</div><h2 class='page-title'>"+esc(page.title)+"</h2><p class='page-lede'>A final pass to catch predictable errors and choose a useful exam method.</p>"+
        "<div class='check-columns'><section class='check-panel mistakes'><h3>Watch out for</h3><ul>"+mistakesHtml+"</ul></section><section class='check-panel tips'><h3>Exam moves</h3><ul>"+tipsHtml+"</ul></section></div>"+
        (notes.reviewPrompt ? "<div class='retrieval-card'><span>Close the book and recall</span><p>"+esc(notes.reviewPrompt)+"</p></div>" : '');
    }
    return '';
  }

  function renderQuestionPage(q, count, T){
    if(!q){ return "<div class='page-kicker'>PRACTICE</div><h2 class='page-title'>No question in this chapter yet</h2><div class='empty-practice'>Choose another topic, or switch back to notes.</div>"; }
    var lines = esc(q.q || '').split(/\n/).map(function(line){ return "<p class='question-line'>"+(line || '&nbsp;')+"</p>"; }).join('');
    var answers = Array.isArray(q.ans) ? q.ans : [q.ans || ''];
    var answerHtml = state.answerOpen ? "<section class='answer-box'><h3>Mark-scheme route</h3><p class='answer-label'>A model way to earn the available marks</p><ol>"+answers.map(function(ans){ return '<li>'+esc(ans)+'</li>'; }).join('')+"</ol><div class='self-mark'><span>How did your attempt go?</span><button data-action='self-mark' data-result='got'>✓ Got it</button><button data-action='self-mark' data-result='review'>↻ Review later</button></div></section>" : '';
    var hintHtml = state.hintOpen && q.hint ? "<div class='hint-box'><b>Small hint:</b> "+esc(q.hint)+"</div>" : '';
    var questionRef = q.repeat ? 'RETRY DRILL · REPEAT PRACTICE' : 'ORIGINAL EXAM-STYLE PRACTICE';
    return "<div class='page-kicker'>QUESTION "+niceNumber(state.question+1)+" / "+niceNumber(count)+" · "+questionRef+"</div>"+
      "<div class='practice-notice'><span>ⓘ</span><span><b>Study copy:</b> this is an original exam-style prompt, not a scan or transcript of an official past paper. Past-paper resource links remain in the main app.</span></div>"+
      "<article class='question-sheet'><div class='question-head'><div><div class='question-origin'>"+esc(q.ref || 'IAL Mastery practice')+"</div><h2>"+esc(q.title || T.name)+"</h2></div><div class='marks-badge'>"+(q.marks || '—')+"<br>MARKS</div></div>"+
      "<div class='question-copy'>"+lines+"</div><div class='question-buttons'><button class='action-button' data-action='answer'>"+(state.answerOpen ? 'Hide mark-scheme route' : 'Turn to mark scheme')+"</button>"+
      (q.hint ? "<button class='action-button secondary' data-action='hint'>"+(state.hintOpen ? 'Hide hint' : 'Open a hint')+"</button>" : '')+"</div>"+hintHtml+answerHtml+"</article>";
  }

  function applyTopicFilter(){
    var input = document.getElementById('topicSearch');
    var query = input ? input.value.trim().toLowerCase() : '';
    state.filter = query;
    var rows = document.querySelectorAll('.toc-row'), visible = 0;
    rows.forEach(function(row){
      var show = row.getAttribute('data-topic-name').indexOf(query) >= 0;
      row.hidden = !show;
      if(show) visible++;
    });
    var empty = document.querySelector('.toc-empty');
    if(empty) empty.hidden = visible > 0;
  }
  function turnPage(delta){
    if(state.mode === 'notes'){
      var pages = buildNotePages(currentTopic());
      var next = state.page + delta;
      if(next < 0 || next >= pages.length) return;
      state.page = next;
    } else {
      var qs = questionsForTopic(), nextQ = state.question + delta;
      if(nextQ < 0 || nextQ >= qs.length) return;
      state.question = nextQ; state.answerOpen = false; state.hintOpen = false;
    }
    state.turn = delta > 0 ? 'turn-forward' : 'turn-back';
    renderBook();
    var readingPage = document.getElementById('readingPage');
    if(readingPage) setTimeout(function(){ readingPage.classList.remove('turn-forward','turn-back'); }, 460);
  }
  function selectTopic(tid){
    if(!currentUnit().topics.some(function(t){ return t.id === tid; })) return;
    state.tid = tid; state.page = 0; state.question = 0; state.answerOpen = false; state.hintOpen = false;
    renderBook();
  }
  function selectUnit(uid){
    var S = subject(state.sid), U = S.units.find(function(unit){ return unit.id === uid; });
    if(!U) return;
    state.uid = uid; state.tid = U.topics[0] && U.topics[0].id; state.page = 0; state.question = 0;
    state.answerOpen = false; state.hintOpen = false; state.filter = '';
    renderBook();
  }
  function notify(message){
    var el = document.getElementById('toast');
    if(!el){ el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 2200);
  }

  document.addEventListener('click', function(event){
    var button = event.target.closest('[data-action]');
    if(!button) return;
    var action = button.getAttribute('data-action');
    if(action === 'library'){ returnToLibrary(); }
    if(action === 'open-book'){ openBook(button.getAttribute('data-sid')); }
    if(action === 'topic'){ selectTopic(button.getAttribute('data-tid')); }
    if(action === 'mode'){
      var nextMode = button.getAttribute('data-mode');
      if(nextMode !== state.mode){ state.mode = nextMode; state.page = 0; state.question = 0; state.answerOpen = false; state.hintOpen = false; renderBook(); }
    }
    if(action === 'page'){ turnPage(Number(button.getAttribute('data-delta'))); }
    if(action === 'answer'){ state.answerOpen = !state.answerOpen; renderBook(); }
    if(action === 'hint'){ state.hintOpen = !state.hintOpen; renderBook(); }
    if(action === 'self-mark'){
      var result = button.getAttribute('data-result');
      notify(result === 'got' ? 'Nice — self-mark noted for this preview.' : 'Good choice. Revisit this one after another chapter.');
    }
    if(action === 'feedback'){
      var value = button.getAttribute('data-value');
      document.querySelectorAll('.feedback-actions button').forEach(function(b){ b.classList.toggle('selected', b === button); });
      notify(value === 'like' ? 'Got it — this book direction is selected.' : value === 'maybe' ? 'Got it — keep refining this direction.' : 'Got it — we can try a different layout.');
    }
  });
  document.addEventListener('change', function(event){
    if(event.target.matches('[data-action="unit"]')) selectUnit(event.target.value);
  });
  document.addEventListener('input', function(event){
    if(event.target.id === 'topicSearch') applyTopicFilter();
  });
  document.addEventListener('keydown', function(event){
    if(state.screen !== 'book' || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if(event.key === 'ArrowRight') turnPage(1);
    if(event.key === 'ArrowLeft') turnPage(-1);
    if(event.key === 'Escape') returnToLibrary();
  });

  renderLibrary();
})();
