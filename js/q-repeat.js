/* Re-issue one longer existing item per syllabus topic as a clearly labelled retry drill.
   These are intentional repeats, not additional official past-paper questions. */
(function(){
  var configs={
    physics:{subject:SUBJECT_PHYSICS,bank:QBANK_PHYSICS},
    chemistry:{subject:SUBJECT_CHEMISTRY,bank:QBANK_CHEMISTRY},
    biology:{subject:SUBJECT_BIOLOGY,bank:QBANK_BIOLOGY},
    maths:{subject:SUBJECT_MATHS,bank:QBANK_MATHS}
  };
  Object.keys(configs).forEach(function(sid){
    var config=configs[sid];
    config.subject.units.forEach(function(unit){
      var bank=config.bank[unit.id]||(config.bank[unit.id]=[]);
      unit.topics.forEach(function(topic){
        var candidates=bank.filter(function(q){return !q.repeat&&(q.topics||[]).indexOf(topic.id)>=0;});
        if(!candidates.length)return;
        var source=candidates[0];
        candidates.forEach(function(q){if((q.marks||0)>(source.marks||0))source=q;});
        var retry={};
        Object.keys(source).forEach(function(key){
          var value=source[key];
          retry[key]=Array.isArray(value)?value.slice():value;
        });
        retry.id="RPT-"+sid.toUpperCase()+"-"+topic.id;
        retry.title="Retry drill: "+source.title;
        retry.ref="Repeat practice";
        retry.repeat=true;
        retry.repeatOf=source.id;
        retry.repeatRound=1;
        bank.push(retry);
      });
    });
  });
})();
