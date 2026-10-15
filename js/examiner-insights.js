/* Paraphrased, traceable reminders from representative official Pearson reports.
   Topic-specific items are only attached where the report passage matches that topic;
   the broader unit note is labelled as cross-paper advice in the UI. */
var EXAMINER_REPORTS={
  physics:{
    label:"Pearson Edexcel IAL Physics WPH11, June 2024",
    code:"WPH11_01_2406_ER",
    url:"https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Physics/2018/Exam-materials/wph11-01-pef-20240815.pdf",
    general:"Pearson reported that some explanations lacked the detail needed for full credit, including naming a force without describing the resultant force. In ‘deduce’ questions, candidates sometimes calculated values but did not compare them or give a conclusion; units and precise practical measurements also mattered.",
    topics:{
      U1T1:"For motion questions, the report stresses answering the exact task and showing a value to suitable precision; in its kinematics examples some candidates worked backwards from the stated answer and lost the final mark.",
      U1T2:"The report highlights that ‘deduce’ answers need a comparison and a conclusion, with units included. For force explanations, describe the resultant force rather than listing forces without their net effect.",
      U1T3:"In energy calculations, candidates sometimes used an unsuitable equation instead of conservation of energy, converted J and MJ incorrectly, or truncated rather than rounded. Include a correct unit.",
      U1T4:"For the Young-modulus practical, the report says many methods were vague about the measurements required. Specify how length and diameter are measured, how extension is obtained, and how repeat readings improve the result."
    }
  },
  chemistry:{
    label:"Pearson Edexcel IAL Chemistry WCH11, June 2024",
    code:"WCH11_01_2406_ER",
    url:"https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Chemistry/2018/Exam-materials/wch11-01-pef-20240815.pdf",
    general:"Pearson reported that equation questions requiring correct balancing and state symbols were poorly answered, and that scientific terms were sometimes used incorrectly. Use precise chemical language, show the required state symbols and check atom and charge conservation.",
    topics:{
      U1T1:"In the report’s equation questions, errors included incorrect formulae, missing or incorrect state symbols, and incorrect ionic charges. It also reminds candidates that halogens occur as diatomic molecules.",
      U1T2:{label:"Pearson Edexcel IAL Chemistry WCH11, June 2022",code:"WCH11_01_2206_ER",url:"https://qualifications.pearson.com/content/dam/pdf/International%20Advanced%20Level/Chemistry/2018/Exam-materials/wch11-01-pef-20220818.pdf",text:"The June 2022 report notes a recurring isotope error: candidates gave the mass number instead of the number of neutrons. Keep proton number, mass number and neutron number distinct.",specific:true},
      U1T3:"The report’s bonding question illustrates the need to show the correct particles and charges in a metallic-bonding diagram; a regular ionic arrangement is not a model of delocalised electrons."
    }
  },
  biology:{
    label:"Pearson Edexcel IAL Biology WBI11, June 2024",
    code:"WBI11_01_2406_ER",
    url:"https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Biology/2018/Exam-materials/wbi11-01-pef-20240815.pdf",
    general:"Pearson noted that data answers can lose marks when they stay generic instead of using the question’s context, and that command words and requested precision matter. Quote relevant values, compare like with like, and use biological terms accurately.",
    topics:{
      U1T1:"For enzyme/protein explanations, the report notes that candidates sometimes omitted the active site or failed to say that tertiary bonds form between R groups. In diagrams, include all required atoms and bonds rather than an approximate sketch.",
      U1T3:"In oxygen-dissociation-curve questions, candidates sometimes described the graph without using values or read the biological change in an unhelpful direction. Support comparisons with data and distinguish a graph gradient from a rate unless time is on the axis.",
      U1T4:"The report highlights confusion between transcription and translation and expects mutation names from the specification, not loose substitutes such as ‘subtraction’. Name the process or mutation precisely and answer only the question asked."
    }
  },
  maths:{
    label:"Pearson Edexcel IAL Mathematics WMA11 P1, Summer 2024",
    code:"WMA11_01_2406_ER",
    url:"https://qualifications.pearson.com/content/dam/pdf/International-Advanced-Level/Mathematics/2018/Exam-materials/wma11-01-pef-20240815.pdf",
    general:"Pearson’s P1 report repeatedly stresses following instructions, showing algebraic working where required, preserving exact values and avoiding premature rounding. It also records recurring degree/radian confusion; check the requested form, interval and units before finalising an answer.",
    topics:{
      P1T1:"The report describes index-law errors, failure to rewrite powers consistently, sign slips in quadratics and missed inequalities. Show the rearrangement and check candidate roots against the original conditions.",
      P1T2:"In graph transformations, some responses had intercepts inconsistent with the stated transformation or placed turning points in the wrong quadrant. Track key points and label the required intercepts.",
      P1T3:"In coordinate geometry, the report notes reversed gradient calculations, sign slips and confusion over which line or coordinate was required. Use Δy/Δx and substitute into the original equations to check the result.",
      P1T4:"The report records errors from incorrect sector-area formulae and answers left in degrees when radians were required. Keep angle units consistent and use the correct geometric formula.",
      P1T5:"For differentiation, some candidates integrated instead, simplified expressions incorrectly or failed to substitute the specified x-value into the derivative equation. Keep the operation and target equation explicit.",
      P1T6:"The report notes mistakes with negative powers during integration and lost signs; constants of integration and exact working also matter. Differentiate the result to check it."
    }
  }
};
function examinerInsight(sid,tid){
  var report=EXAMINER_REPORTS[sid];
  if(!report)return null;
  var item=report.topics&&report.topics[tid];
  if(item&&typeof item==="object")return item;
  return {label:report.label,code:report.code,url:report.url,text:item||report.general,specific:!!item};
}
