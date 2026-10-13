/* ============================================================
   TEST FOCUS — content for the CURRENT test
   WBI11 Topics 1B + 1C (Mammalian Transport Systems + CVD)
   ------------------------------------------------------------
   Swap this file (or the TEST_FOCUS object) for each new test —
   the engine (js/test.js) reads nothing else.

   PROVENANCE (verified against Pearson's official documents):
   • WBI11/01 June 2023  — QP P71934A, Mark Scheme (wbi11-01-rms-20230817),
     Examiner's Report (WBI11_01_2306_ER)
   • WBI11/01 Jan 2023   — QP P71868A, Mark Scheme (wbi11-01-rms-20230302)
   • WBI11/01 Jan 2024   — QP P75589A, Mark Scheme (wbi11-01-rms-20240307)
   Questions labelled "WBI11 • ..." are REAL past-paper questions
   (Pearson publishes all of these for free). Questions labelled
   "Topic test bank • ..." are original exam-style items written
   in the style of those papers. Mark-scheme points are condensed
   from the official mark schemes; model answers are stitched to
   the marking points; pitfalls cite the June/Jan 2023 examiner
   reports, the mark schemes, the topic dataset or general tips.
   ============================================================ */
var TEST_FOCUS = {
  id: "wbi11-1b-1c",
  title: "WBI11 • Topics 1B + 1C",
  subtitle: "Mammalian Transport Systems + Cardiovascular Health and Risk",
  spec: "Edexcel IAS Biology (WBI11/01)",
  timePerMark: 1.2,

  /* ---------------- NOTES (14) ---------------- */
  notes: [
  {
    id: "n1b1", topic: "1B", icon: "🫀", title: "1B.1 — The Principles of Circulation",
    html: "<p><b>Why organisms need a mass-transport system</b></p><ul>" +
      "<li><b>Small organisms (unicellular / simple multicellular):</b> high surface-area-to-volume ratio (SA:V), short diffusion distances and low metabolic demand — simple diffusion across the outer membrane is enough to exchange O<sub>2</sub>, CO<sub>2</sub>, nutrients and waste.</li>" +
      "<li><b>Large multicellular organisms:</b> LOW SA:V ratio, long internal diffusion distances, high metabolic rate — diffusion alone is far too slow to supply inner cells.</li>" +
      "<li><b>Mass flow:</b> bulk movement of a fluid driven by pressure gradients produced by a muscular pump (the heart) — moves materials rapidly over long distances.</li></ul>" +
      "<h4>Single vs double circulation</h4><ul>" +
      "<li><b>Single (fish):</b> heart → gills → body tissues → heart. Blood pressure drops significantly in the gill capillaries, so flow to the body is slow and under low pressure.</li>" +
      "<li><b>Double (mammals):</b> blood passes through the heart twice per complete circuit:" +
      "<ul><li><b>Pulmonary circuit:</b> heart → lungs → heart (low pressure protects the delicate alveolar capillaries).</li>" +
      "<li><b>Systemic circuit:</b> heart → rest of body → heart (high pressure delivers O<sub>2</sub> rapidly over long distances).</li></ul></li></ul>" +
      "<h4>Advantages of double circulation</h4><ol>" +
      "<li>Keeps oxygenated and deoxygenated blood completely separate — maintains a steep O<sub>2</sub> concentration gradient.</li>" +
      "<li>Systemic blood is pumped at <b>higher pressure</b> than pulmonary blood, delivering oxygen and glucose rapidly to respiring tissues.</li></ol>"
  },
  {
    id: "n1b2", topic: "1B", icon: "🩸", title: "1B.2 — Blood, Haemoglobin & Clotting",
    html: "<p><b>Components of blood & their roles</b></p><ul>" +
      "<li><b>Plasma:</b> liquid transport medium — water, dissolved glucose, amino acids, mineral ions, urea, hormones, plasma proteins (e.g. fibrinogen), heat.</li>" +
      "<li><b>Erythrocytes (RBCs):</b> biconcave discs, no nucleus, packed with <b>haemoglobin</b> for O<sub>2</sub> transport.</li>" +
      "<li><b>Leucocytes (WBCs):</b> immune defence (phagocytes, lymphocytes).</li>" +
      "<li><b>Platelets:</b> cell fragments involved in blood clotting.</li></ul>" +
      "<h4>Oxygen transport & haemoglobin</h4><ul>" +
      "<li><b>Structure:</b> conjugated globular protein with <b>quaternary structure</b> — 4 polypeptide chains (<b>2α + 2β</b>). Each chain has a non-protein <b>haem prosthetic group</b> containing an Fe<sup>2+</sup> ion; each Fe<sup>2+</sup> binds one O<sub>2</sub>: <b>Hb + 4O<sub>2</sub> ⇌ Hb(O<sub>2</sub>)<sub>4</sub></b></li>" +
      "<li><b>Cooperative binding → sigmoid curve:</b> binding of the first O<sub>2</sub> induces a conformational (shape) change that exposes the remaining haem groups — subsequent O<sub>2</sub> binds much <b>easier</b>. Produces the characteristic S-shaped oxygen dissociation curve.</li>" +
      "<li><b>The Bohr effect:</b> in respiring tissues, high CO<sub>2</sub> lowers pH (CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> ⇌ H<sup>+</sup> + HCO<sub>3</sub><sup>−</sup>). H<sup>+</sup> binds haemoglobin, altering its tertiary structure and <b>reducing its affinity for oxygen</b> — the curve shifts <b>down and to the RIGHT</b> — so O<sub>2</sub> is released more readily at actively respiring tissues.</li>" +
      "<li><b>Fetal haemoglobin (2α + 2γ):</b> has a <b>HIGHER affinity for O<sub>2</sub></b> than adult maternal haemoglobin at all partial pressures — its curve lies to the LEFT. Lets the fetus extract oxygen from maternal blood across the placenta, even at the low pO<sub>2</sub> where maternal Hb unloads.</li></ul>" +
      "<h4>The blood clotting cascade (thrombosis)</h4><ol>" +
      "<li>Damage to a blood vessel exposes sub-endothelial <b>collagen</b>.</li>" +
      "<li><b>Platelets</b> adhere to the collagen, change shape and release clotting factors including <b>thromboplastin</b>.</li>" +
      "<li>Thromboplastin (with Ca<sup>2+</sup> ions and vitamin K) catalyses the conversion of inactive plasma protein <b>prothrombin</b> → active enzyme <b>thrombin</b>.</li>" +
      "<li>Thrombin catalyses the conversion of soluble <b>fibrinogen</b> → insoluble <b>fibrin</b> mesh strands.</li>" +
      "<li>The fibrin mesh traps RBCs and platelets → a <b>clot (thrombus)</b> seals the wound.</li></ol>"
  },
  {
    id: "n1b3", topic: "1B", icon: "🫧", title: "1B.3 — Arteries, Veins & Capillaries",
    html: "<h4>1. Arteries</h4><ul>" +
      "<li><b>Tunica media:</b> thick layer of <b>smooth muscle + elastic fibres</b>. Elastic fibres <b>stretch</b> during ventricular systole and <b>recoil</b> during diastole — smoothing flow and maintaining high pressure. Smooth muscle contracts (vasoconstriction) / relaxes (vasodilation) to regulate blood flow.</li>" +
      "<li><b>Tunica externa:</b> tough outer <b>collagen</b> layer — resists high pressure and prevents bursting.</li>" +
      "<li><b>Lumen:</b> relatively narrow — maintains high pressure.</li></ul>" +
      "<h4>2. Veins</h4><ul>" +
      "<li><b>Lumen:</b> wide — minimises friction and resistance to blood flow under low pressure.</li>" +
      "<li><b>Walls:</b> thin, with little elastic or muscular tissue — pressure is low.</li>" +
      "<li><b>Valves:</b> flaps of endothelium throughout their length <b>prevent backflow</b> against gravity; skeletal-muscle contraction squeezes veins to assist venous return.</li></ul>" +
      "<h4>3. Capillaries</h4><ul>" +
      "<li><b>Wall:</b> a single layer of flattened <b>endothelial cells</b> — <b>one cell thick</b> — a very short diffusion distance.</li>" +
      "<li><b>Lumen:</b> extremely narrow (~7–8 µm) — RBCs pass in single file, slowing flow and maximising contact time for gas/nutrient exchange.</li>" +
      "<li><b>Pores:</b> gaps between the endothelial cells let plasma fluid and small solutes leak out into the tissues to form <b>tissue fluid</b>.</li></ul>"
  },
  {
    id: "n1b4", topic: "1B", icon: "💓", title: "1B.4 — The Heart & Cardiac Cycle",
    html: "<h4>Heart structure</h4><ul>" +
      "<li>Four chambers — right atrium, right ventricle, left atrium, left ventricle — separated by a muscular <b>septum</b>.</li>" +
      "<li><b>Left ventricle wall ≈ 3× thicker</b> than the right's: it must generate the higher pressure to pump blood around the whole body, whereas the right ventricle pumps at lower pressure to the lungs (protecting alveolar capillaries).</li>" +
      "<li><b>Valves:</b> AV valves (tricuspid right, bicuspid left) stop backflow from ventricle → atrium; <b>tendinous cords</b> anchor them to papillary muscles, preventing eversion under high pressure. <b>Semilunar valves</b> (aortic, pulmonary) stop backflow from arteries → ventricles.</li>" +
      "<li><b>Coronary arteries</b> branch off the aorta to supply O<sub>2</sub>ated blood to the heart muscle (myocardium) for continuous aerobic respiration.</li></ul>" +
      "<h4>The cardiac cycle</h4><ol>" +
      "<li><b>Atrial systole:</b> atria contract → atrial pressure exceeds ventricular pressure → AV valves open → blood forced into ventricles. Semilunar valves stay closed.</li>" +
      "<li><b>Ventricular systole:</b> ventricles contract from the apex upwards → ventricular pressure exceeds atrial pressure → AV valves snap shut (the <b>“lub”</b>). Ventricular pressure then exceeds arterial pressure → semilunar valves open → blood ejected into the aorta and pulmonary artery.</li>" +
      "<li><b>Diastole:</b> ventricles and atria relax → ventricular pressure falls below arterial pressure → backflow is blocked, forcing the semilunar valves shut (the <b>“dup”</b>). Atria fill with venous blood; when atrial pressure exceeds ventricular pressure the AV valves open passively.</li></ol>" +
      "<h4>Cardiac output</h4><p><b>Cardiac output (dm<sup>3</sup> min<sup>−1</sup>) = heart rate (beats min<sup>−1</sup>) × stroke volume (dm<sup>3</sup>)</b></p>"
  },
  {
    id: "n1b5", topic: "1B", icon: "🧱", title: "1B.5 — Atherosclerosis",
    html: "<h4>Sequence of events</h4><ol>" +
      "<li><b>Endothelial dysfunction:</b> damage to the arterial lining — caused by high blood pressure, nicotine/toxins from smoking, or elevated blood cholesterol.</li>" +
      "<li><b>Inflammatory response:</b> white blood cells (macrophages) move into the artery wall and accumulate cholesterol/LDLs → fatty streaks.</li>" +
      "<li><b>Atheroma → plaque:</b> smooth-muscle cells migrate over the deposit; <b>calcium salts + fibrous tissue</b> accumulate → a hardened <b>atheroma / plaque</b>.</li>" +
      "<li><b>Arterial changes:</b> the wall <b>loses elasticity</b> and the <b>lumen narrows</b> — restricting flow and further raising blood pressure.</li>" +
      "<li><b>Thrombosis:</b> a hardened plaque can <b>crack or rupture</b>, exposing collagen and triggering the clotting cascade → sudden thrombus.</li></ol>" +
      "<h4>Consequences</h4><ul>" +
      "<li><b>Coronary heart disease (CHD):</b> narrowed coronary arteries → <b>angina</b> (chest pain during exercise from anaerobic respiration in heart muscle).</li>" +
      "<li><b>Myocardial infarction (heart attack):</b> complete blockage of a <b>coronary artery</b> by a clot/starves heart muscle of O<sub>2</sub> and glucose → aerobic respiration stops → tissue death.</li>" +
      "<li><b>Stroke:</b> blockage of an artery supplying the brain.</li></ul>"
  },
  {
    id: "n1c1", topic: "1C", icon: "🎲", title: "1C.1 — Risk, Correlation & Cause",
    html: "<ul>" +
      "<li><b>Risk</b> = the probability that a particular unwanted event or outcome will occur within a specified timeframe.</li>" +
      "<li><b>Perception vs actual risk:</b> people <b>overestimate</b> risks that are involuntary, unfamiliar, unnatural, dread-inducing or heavily publicised (plane crashes, shark attacks), and <b>underestimate</b> risks that are voluntary, familiar, self-controlled or long-term lifestyle risks (CVD from smoking/poor diet).</li>" +
      "<li><b>Correlation</b> = a statistical relationship/association between two variables (e.g. ice-cream sales and drowning rates both rise in summer).</li>" +
      "<li><b>Causation</b> = a proven physiological mechanism in which changing one variable directly causes the change in the other (smoking → lung cancer via DNA-mutating carcinogens). <b>A correlation is NOT proof of causation</b> — confounding variables must be controlled.</li></ul>"
  },
  {
    id: "n1c2", topic: "1C", icon: "🔬", title: "1C.2 — Studying CVD (Epidemiology)",
    html: "<h4>Epidemiological study types</h4><ul>" +
      "<li><b>Cohort study:</b> follow a large group of healthy people over a long period; see who develops the disease and identify associated risk factors.</li>" +
      "<li><b>Case–control study:</b> compare a group WITH the disease (cases) to a similar group WITHOUT it (controls) and look for past differences in exposure to risk factors.</li></ul>" +
      "<h4>Criteria for a valid epidemiological study</h4><ol>" +
      "<li><b>Large sample size</b> — representative of the target population; reduces the effect of chance anomalies.</li>" +
      "<li><b>Controlled variables</b> — match groups for age, sex and background to avoid confounding variables.</li>" +
      "<li><b>Standardised, reliable methods</b> — precise measurement of blood pressure, blood lipids, dietary intake.</li>" +
      "<li><b>Long follow-up time</b> — CVD develops over decades.</li></ol>" +
      "<h4>Non-modifiable risk factors</h4><ul>" +
      "<li><b>Age:</b> vessel walls lose elasticity and plaque accumulates progressively over time.</li>" +
      "<li><b>Biological sex:</b> oestrogen raises HDL levels and protects pre-menopausal women; men generally have higher risk at an earlier age.</li>" +
      "<li><b>Genetics / family history:</b> inherited alleles affecting lipid metabolism (e.g. familial hypercholesterolaemia — defective LDL receptors), blood pressure or clotting tendency.</li></ul>"
  },
  {
    id: "n1c3", topic: "1C", icon: "🚬", title: "1C.3 — Modifiable Risk Factors",
    html: "<ol>" +
      "<li><b>Hypertension (high BP):</b> elevates stress on artery walls → increases the rate of endothelial damage → accelerates atherosclerosis.</li>" +
      "<li><b>Smoking:</b>" +
      "<ul><li><b>Nicotine:</b> stimulates adrenaline → raises heart rate + vasoconstriction → higher BP.</li>" +
      "<li><b>Carbon monoxide (CO):</b> binds irreversibly to haemoglobin → carboxyhaemoglobin → reduced O<sub>2</sub>-carrying capacity.</li>" +
      "<li><b>Free radicals / toxins:</b> damage endothelial cells and lower HDL cholesterol.</li></ul></li>" +
      "<li><b>Inactivity / lack of exercise:</b> raises BP, raises the LDL:HDL ratio, contributes to obesity. Regular exercise strengthens cardiac muscle and increases HDLs.</li>" +
      "<li><b>Stress:</b> raises adrenaline and cortisol → vasoconstriction and elevated blood pressure.</li></ol>"
  },
  {
    id: "n1c4", topic: "1C", icon: "🥗", title: "1C.4 — Diet: Fats, Cholesterol & Obesity",
    html: "<h4>Energy balance</h4><ul>" +
      "<li><b>Energy balance:</b> intake = expenditure → weight stable.</li>" +
      "<li><b>Positive energy balance:</b> intake &gt; expenditure → excess stored as fat → overweight/obesity.</li>" +
      "<li><b>Negative energy balance:</b> intake &lt; expenditure → weight loss.</li></ul>" +
      "<h4>Dietary fats & cholesterol</h4><ul>" +
      "<li><b>Cholesterol</b> is essential (membrane fluidity, steroid hormones, bile salts) but is water-insoluble — so it is transported in blood wrapped in protein as <b>lipoproteins</b>.</li>" +
      "<li><b>LDLs (“bad”):</b> formed from saturated fats; carry cholesterol <b>from</b> the liver <b>to</b> body tissues. Excess LDLs overload LDL receptors → high circulating blood cholesterol → deposits in artery walls → plaque.</li>" +
      "<li><b>HDLs (“good”):</b> formed from unsaturated fats; carry excess cholesterol <b>from</b> tissues <b>back to</b> the liver for breakdown/excretion → reduces plaque build-up → lowers CVD risk.</li></ul>" +
      "<h4>Obesity indicators</h4><ul>" +
      "<li><b>BMI = mass (kg) ÷ height (m)<sup>2</sup></b> — underweight &lt;18.5 • normal 18.5–24.9 • overweight 25–29.9 • obese ≥30. <i>Limitation:</i> doesn't distinguish muscle from fat (athletes can score “obese”).</li>" +
      "<li><b>Waist-to-hip ratio (WHR) = waist circumference (cm) ÷ hip circumference (cm)</b> — measures abdominal/visceral fat; WHR &gt;0.90 (men) or &gt;0.85 (women) indicates elevated CVD risk.</li></ul>"
  },
  {
    id: "n1c5", topic: "1C", icon: "🍊", title: "1C.5 — Antioxidants (incl. Core Practical 2)",
    html: "<ul>" +
      "<li><b>Free radicals</b> are highly reactive atoms/molecules with <b>unpaired electrons</b>, produced during metabolic reactions. They cause <b>oxidative stress</b> — oxidising cellular lipids and proteins, damaging arterial endothelial membranes and accelerating atheroma formation.</li>" +
      "<li><b>Antioxidants</b> (vitamins C and E, β-carotene) <b>donate electrons</b> to neutralise free radicals without becoming reactive themselves — protecting endothelial cells from oxidative damage → reduces atherosclerosis risk.</li></ul>" +
      "<h4>Core Practical 2 — vitamin C titration</h4><ul>" +
      "<li>Titrate vitamin C solutions against <b>DCPIP</b> (a blue redox indicator).</li>" +
      "<li>DCPIP changes <b>blue → colourless</b> as it is reduced by vitamin C.</li>" +
      "<li>Standardise using a known concentration of vitamin C solution to calculate unknown concentrations in fruit juices.</li></ul>" +
      "<h4>Evaluating antioxidant studies</h4><ul>" +
      "<li><b>Observational studies</b> show a strong negative correlation between fruit/vegetable-rich (antioxidant-rich) diets and CVD incidence.</li>" +
      "<li><b>Clinical supplement trials</b> with high-dose synthetic antioxidants often show no benefit — the whole-food matrix (fibre, other antioxidants, healthier lifestyle) explains the observational benefit. Correlation ≠ causation.</li></ul>"
  },
  {
    id: "n1c6", topic: "1C", icon: "📋", title: "1C.6 — Reducing CVD: Diet Rules",
    html: "<ol>" +
      "<li><b>Reduce saturated fat</b> — replace with mono-/polyunsaturated fats → lowers LDL levels and improves the HDL:LDL ratio.</li>" +
      "<li><b>Reduce salt (NaCl)</b> — high dietary sodium makes blood retain more water by osmosis → increased blood volume → raised blood pressure (hypertension).</li>" +
      "<li><b>Increase soluble dietary fibre</b> — binds cholesterol and bile acids in the digestive tract, preventing reabsorption → lowers blood LDL levels.</li>" +
      "<li><b>Moderate alcohol</b> — excess intake damages liver tissue, raises blood pressure and contributes to obesity.</li></ol>"
  },
  {
    id: "n1c7", topic: "1C", icon: "💊", title: "1C.7 — CVD Drugs: Benefits vs Risks",
    html: "<table class='mini'><tr><th>Drug</th><th>How it works</th><th>Benefit</th><th>Risk / side effect</th></tr>" +
      "<tr><td><b>Antihypertensives</b> (beta-blockers, ACE inhibitors, Ca<sup>2+</sup>-channel blockers, diuretics)</td><td>Dilate blood vessels or reduce heart rate / blood volume to lower blood pressure</td><td>Reduces endothelial damage → slows atherosclerosis development</td><td>Dizziness, fainting, headache, fatigue, dangerous drop in BP (hypotension)</td></tr>" +
      "<tr><td><b>Statins</b></td><td>Inhibit the liver enzyme (HMG-CoA reductase) that synthesises cholesterol → liver takes up more LDLs from the blood</td><td>Dramatically lowers blood LDL, reduces plaque formation, stabilises existing plaques</td><td>Muscle inflammation/pain (myopathy), liver dysfunction, joint pain, slight ↑ diabetes risk</td></tr>" +
      "<tr><td><b>Anticoagulants</b> (warfarin, heparin)</td><td>Interfere with clotting-factor synthesis (e.g. vitamin K antagonism) → delays clot formation</td><td>Reduces thrombosis risk in narrowed arteries</td><td>Uncontrolled internal bleeding from minor cuts/injuries</td></tr>" +
      "<tr><td><b>Antiplatelets</b> (aspirin, clopidogrel)</td><td>Prevent platelets sticking together and releasing thromboplastin</td><td>Prevents thrombosis following plaque rupture</td><td>Stomach-lining irritation, ulcers, gastrointestinal bleeding</td></tr></table>"
  },
  {
    id: "nXtra", topic: "1B/1C", icon: "🏥", title: "Stretch — Heart Failure & Ethics",
    html: "<ul>" +
      "<li><b>Pathophysiology:</b> heart failure occurs when cardiac muscle is weakened or damaged (chronic hypertension, heart attacks, valve disease) and can no longer pump sufficient blood to meet the body's metabolic requirements.</li>" +
      "<li><b>Interventions:</b> <b>LVADs</b> (left ventricular assist devices) — mechanical pumps implanted to assist a failing left ventricle; <b>heart transplant</b> — definitive treatment for end-stage failure.</li>" +
      "<li><b>Ethical & societal considerations:</b> severe donor-organ shortage and strict allocation criteria; high financial cost weighed against quality-of-life improvements.</li></ul>"
  },
  {
    id: "nExam", topic: "Exam", icon: "🎓", title: "Examiner Gold — Command Words & Top Traps",
    html: "<h4>Command words</h4><ul>" +
      "<li><b>Describe</b> = say WHAT (what happens / the trend / the structure). <b>Explain</b> = say WHY — give the mechanism.</li>" +
      "<li><b>Compare</b> = state similarities AND differences <b>in the same sentences</b> (whereas / both / in contrast). Two separate descriptions score poorly (June 2023 ER).</li>" +
      "<li><b>Evaluate / Discuss</b> = evidence FOR + AGAINST, comment on study validity (sample size, controlled variables, duration), then a justified conclusion.</li>" +
      "<li><b>“Changes”</b> → always write <b>increase / decrease / no change</b> (June 2023 ER).</li>" +
      "<li><b>“Explain how X prevents…”</b> → state what will <b>NOT</b> happen — the positive story alone caps you at half the marks (June 2023 ER).</li></ul>" +
      "<h4>Top traps</h4><ul>" +
      "<li>Capillary walls are <b>one cell thick</b> — never “cell walls”.</li>" +
      "<li>Respiration <b>releases/transfers</b> energy — it never “creates” it.</li>" +
      "<li>Name the <b>coronary artery</b> — “a vessel is blocked” is too vague.</li>" +
      "<li>Say <b>fetal</b> haemoglobin — the mark schemes never accept “baby's”.</li>" +
      "<li><b>LDL delivers</b> cholesterol to tissues; <b>HDL removes</b> it back to the liver — don't swap.</li>" +
      "<li>High CO<sub>2</sub> shifts the Bohr curve <b>RIGHT</b> (lower affinity, easier unloading).</li>" +
      "<li>Match your <b>decimal places</b> to the data (0.72 s, not 0.72333 s).</li>" +
      "<li>Repeating the stem earns <b>zero</b>.</li>" +
      "<li>Don't write everything you know — <b>target the question</b>.</li></ul>"
  }
  ],

  /* ---------------- QUESTIONS (32) ---------------- */
  questions: [
  /* ============ TOPIC TEST BANK (original exam-style) ============ */
  {
    id: "U1", topic: "1B", source: "Topic test bank • Atherosclerosis", title: "Atherosclerosis → myocardial infarction", marks: 6, official: true,
    q: "Explain how atherosclerosis can lead to a myocardial infarction (heart attack). (6)",
    ms: [
      "Damage to the artery endothelium (endothelial dysfunction)",
      "Inflammatory response — white blood cells / macrophages accumulate",
      "Cholesterol / LDLs accumulate, forming an atheroma",
      "Calcium salts + fibrous tissue harden it into a plaque",
      "Lumen narrows AND wall loses elasticity",
      "Plaque rupture triggers the clotting cascade (thromboplastin released)",
      "A thrombus forms in a coronary artery",
      "Blocked flow starves heart muscle of oxygen/glucose",
      "Muscle cells cannot carry out aerobic respiration and die"
    ],
    answer: "<p>Atherosclerosis begins with <b>damage to the endothelial lining</b> of an artery, triggering inflammation in which white blood cells accumulate cholesterol and LDLs to form an <b>atheroma</b>. Calcium salts and fibrous tissue then harden it into a <b>plaque</b>, narrowing the lumen and reducing elasticity. If the plaque <b>ruptures</b>, platelets release thromboplastin and a <b>thrombus</b> forms. When this blocks a <b>coronary artery</b>, heart muscle is starved of oxygen and glucose, so it cannot carry out aerobic respiration — the tissue dies: a <b>myocardial infarction</b>.</p>",
    pitfalls: [
      { t: "Always name the coronary artery — “a vessel is blocked” is too vague.", s: "Dataset" },
      { t: "Say cells lack oxygen for aerobic respiration, not “lose energy”.", s: "Dataset" },
      { t: "Keep atherosclerosis (slow plaque build-up) separate from thrombosis (sudden clot).", s: "Dataset" }
    ]
  },
  {
    id: "U2", topic: "1B", source: "Topic test bank • Vessels", title: "Artery vs capillary", marks: 4, official: true,
    q: "Compare the structural adaptations of an artery and a capillary in relation to their functions. (4)",
    ms: [
      "Artery: thick wall whereas capillary: wall one cell thick (single endothelium)",
      "Artery: elastic fibres (stretch + recoil) whereas capillary: none",
      "Artery: smooth muscle / collagen whereas capillary: none",
      "Artery: narrow lumen keeps pressure high whereas capillary: ~7 µm lumen slows RBCs for exchange",
      "Capillary: pores for tissue fluid whereas artery: none"
    ],
    answer: "<p>An artery has a thick wall of smooth muscle, collagen and elastic fibres that withstand and maintain high pressure, <b>whereas</b> a capillary wall is a single layer of endothelium with no muscle or elastic tissue, giving a short diffusion distance. The artery's narrow lumen maintains pressure, <b>whereas</b> the capillary's ~7 µm lumen forces RBCs into single file, slowing flow for exchange. Capillaries also have pores for tissue-fluid formation, which arteries lack.</p>",
    pitfalls: [
      { t: "Compare properly — use whereas / in contrast, not two separate lists (June 2023 ER).", s: "Examiner report" },
      { t: "Capillary walls are one cell thick — never “cell walls”.", s: "Dataset" }
    ]
  },
  {
    id: "U3", topic: "1B", source: "Topic test bank • Haemoglobin", title: "The Bohr effect in exercise", marks: 4, official: true,
    q: "Explain the significance of the Bohr effect during intense physical exercise. (4)",
    ms: [
      "Exercise → more respiration → more CO2 in muscles",
      "CO2 forms carbonic acid → lower pH / more H+",
      "H+ binds haemoglobin, changing its tertiary structure",
      "Hb affinity for O2 falls — curve shifts down and RIGHT",
      "More O2 unloaded at respiring muscles → aerobic respiration continues"
    ],
    answer: "<p>Intense exercise raises respiration in muscles, producing more CO<sub>2</sub>. This forms carbonic acid, lowering blood pH, and H<sup>+</sup> ions bind to haemoglobin, altering its tertiary structure. Hb's affinity for oxygen therefore falls — the dissociation curve shifts down and right (the Bohr effect) — so oxygen is unloaded readily at the muscles, sustaining aerobic respiration and delaying fatigue.</p>",
    pitfalls: [
      { t: "High CO2 shifts the curve RIGHT — the commonest direction error.", s: "Dataset" },
      { t: "Use “decreased affinity”, not “holds on tighter/looser”.", s: "Dataset" }
    ]
  },
  {
    id: "U4", topic: "1C", source: "Topic test bank • Antioxidants", title: "Observational studies vs supplement trials", marks: 4, official: true,
    q: "Explain why observational studies suggested vitamin C reduces CVD risk, but clinical trials with vitamin C supplements showed no significant reduction. (4)",
    ms: [
      "Observational studies show correlation, not causation",
      "High-vitamin-C eaters also eat more fruit/veg and live healthier lives (exercise, no smoking)",
      "Confounding variables (fibre, other antioxidants, low saturated fat) explain the lower risk",
      "Supplements lack the whole-food matrix / synergy — isolated vitamin C behaves differently"
    ],
    answer: "<p>Observational studies show only a <b>correlation</b> between dietary vitamin C and lower CVD — correlation is not causation. People eating lots of vitamin C also eat more whole fruit and vegetables and tend to exercise and avoid smoking, so <b>confounding variables</b> such as fibre and other antioxidants probably explain the benefit. Trials test isolated synthetic vitamin C without this whole-food matrix, so no effect is seen.</p>",
    pitfalls: [
      { t: "Never write that observational studies prove prevention.", s: "Dataset" },
      { t: "Always name confounding variables explicitly.", s: "Dataset" }
    ]
  },
  {
    id: "U5", topic: "1C", source: "Topic test bank • Drugs", title: "Statins vs antihypertensives", marks: 4, official: true,
    q: "Compare the mechanism of action, benefits and risks of statins and antihypertensives in treating CVD. (4)",
    ms: [
      "Statins block liver cholesterol synthesis whereas antihypertensives dilate vessels / lower BP",
      "Statins cut LDL + plaque whereas antihypertensives cut endothelial damage",
      "Both lower the risk of atherosclerosis, thrombosis and MI",
      "Statins: muscle pain (myopathy) / liver damage whereas antihypertensives: dizziness / fainting / hypotension"
    ],
    answer: "<p>Statins inhibit a liver enzyme in cholesterol synthesis, lowering blood LDL and slowing plaque build-up, <b>whereas</b> antihypertensives lower blood pressure via vasodilation or reduced heart rate, cutting stress on artery linings. Both reduce the risk of atherosclerosis, thrombosis and MI — but statins can cause muscle inflammation and liver damage, <b>whereas</b> antihypertensives can cause dizziness and fainting through hypotension.</p>",
    pitfalls: [
      { t: "Don't swap the mechanisms: statins ≠ BP drugs, antihypertensives ≠ cholesterol drugs.", s: "Dataset" },
      { t: "Name specific side effects (myopathy, hypotension) — “feeling unwell” scores nothing.", s: "Dataset" }
    ]
  },

  /* ============ JUNE 2023 WBI11/01 (real past paper) ============ */
  {
    id: "J23-2", topic: "1B", source: "WBI11 • June 2023 • Q2(b)–(c)", title: "Cardiac cycle: pressure & volume data", marks: 4, official: true,
    q: "The graphs show how the pressure and volume of blood in the left ventricle change during the cardiac cycle." +
      "<table class='mini'><tr><th>Time (s)</th><th>Pressure in left ventricle (kPa)</th><th>Volume of blood in left ventricle (cm³)</th></tr>" +
      "<tr><td>0.0</td><td>0.6</td><td>10</td></tr><tr><td>0.1</td><td>1.8</td><td>123</td></tr><tr><td>0.2</td><td>8.5</td><td>125</td></tr>" +
      "<tr><td>0.3</td><td>15.2</td><td>76</td></tr><tr><td>0.4</td><td>14.0</td><td>55</td></tr><tr><td>0.5</td><td>0.2</td><td>68</td></tr>" +
      "<tr><td>0.6</td><td>0.2</td><td>99</td></tr><tr><td>0.7</td><td>0.2</td><td>104</td></tr><tr><td>0.8</td><td>1.2</td><td>116</td></tr>" +
      "<tr><td>0.9</td><td>0.3</td><td>123</td></tr><tr><td>1.0</td><td>14.0</td><td>95</td></tr><tr><td>1.1</td><td>14.0</td><td>57</td></tr>" +
      "<tr><td>1.2</td><td>0.2</td><td>51</td></tr><tr><td>1.3</td><td>—</td><td>95</td></tr></table><br>" +
      "(b) Calculate the time for one cardiac cycle. (1) (c) The volume of blood in the left ventricle changes during the cardiac cycle. Explain these changes. (3)",
    ms: [
      "(b) 0.70–0.76 s (any value in this range)",
      "(c) Volume increases during atrial systole — the atrium contracts, squeezing blood into the ventricle",
      "(c) Volume decreases during ventricular systole — ventricles contract, blood pumped out into the aorta",
      "(c) Volume increases during (ventricular) diastole — the ventricle refills"
    ],
    answer: "<p>(b) The pressure pattern repeats after ~0.72 s (peak-to-peak), so one cardiac cycle ≈ <b>0.72 s</b> (any value 0.70–0.76 s is accepted — but not more than 3 decimal places). (c) Volume <b>rises</b> during atrial systole as the contracting atrium forces blood through the open AV valve into the ventricle. It then <b>falls</b> during ventricular systole as the ventricles contract and eject blood into the aorta. Finally it <b>rises again</b> during diastole as the relaxing ventricle refills with blood.</p>",
    pitfalls: [
      { t: "(b): too many decimal places is a classic error — 0.72 s, not 0.72333 s (June 2023 ER).", s: "Examiner report" },
      { t: "(c): EXPLAIN with pressures/stages — describing the graph or narrating blood's journey scores little (June 2023 ER).", s: "Examiner report" },
      { t: "(c): the refilling-during-diastole point was the least awarded — don't forget it (June 2023 ER).", s: "Examiner report" },
      { t: "“Changes” → always write increase / decrease / no change (June 2023 ER).", s: "Examiner report" }
    ]
  },
  {
    id: "J23-5a", topic: "1B", source: "WBI11 • June 2023 • Q5(a)", title: "Stents: damage → thrombin", marks: 2, official: true,
    q: "Stents widen a diseased coronary artery but can damage endothelial cells and trigger clotting. (a) Explain how damage to the endothelial cells results in the formation of thrombin. (2)",
    ms: [
      "Platelets contain / release thromboplastin",
      "Thromboplastin converts prothrombin into thrombin"
    ],
    answer: "<p>Damaged endothelium exposes collagen, so platelets adhere and <b>release thromboplastin</b>. Thromboplastin then catalyses the conversion of the inactive plasma protein <b>prothrombin</b> into active <b>thrombin</b>.</p>",
    pitfalls: [
      { t: "You MUST say thromboplastin comes from platelets — this mark was frequently lost (June 2023 ER).", s: "Examiner report" },
      { t: "Don't write the whole clotting story — answer what's asked and save time (June 2023 ER).", s: "Examiner report" }
    ]
  },
  {
    id: "J23-5b", topic: "1C", source: "WBI11 • June 2023 • Q5(b)", title: "Risk of anticoagulants", marks: 1, official: true,
    q: "Patients with a stent are given anticoagulants. (b) Give one risk of treating patients with anticoagulants. (1)",
    ms: [
      "Excessive / uncontrolled / internal bleeding (e.g. severe bruising, prolonged nosebleeds)"
    ],
    answer: "<p>The patient may bleed <b>excessively or uncontrollably</b> (e.g. severe bruising, prolonged nosebleeds, heavy periods), because clotting is impaired.</p>",
    pitfalls: [
      { t: "A risk (bleeding) ≠ a side effect (fainting) — side effects score zero here (June 2023 ER).", s: "Examiner report" }
    ]
  },
  {
    id: "J23-5c2", topic: "1B", source: "WBI11 • June 2023 • Q5(c)(ii)", title: "Variegin vs thrombin", marks: 2, official: true,
    q: "Variegin (a tick peptide) binds to the active site of thrombin and prevents blood clotting. (ii) Explain how variegin prevents blood clotting. (2)",
    ms: [
      "Blocked active site → thrombin cannot convert fibrinogen into fibrin",
      "Without fibrin, platelets / blood cells are not trapped — no mesh, no clot"
    ],
    answer: "<p>With its active site blocked by variegin, thrombin <b>cannot convert soluble fibrinogen into insoluble fibrin</b>. With no fibrin mesh, platelets and blood cells are not trapped, so no clot forms.</p>",
    pitfalls: [
      { t: "State what will NOT happen — the positive story alone caps you at 1 mark (June 2023 ER).", s: "Examiner report" },
      { t: "Never just repeat the stem (“prevents clotting”) — it earns zero.", s: "Topic tip" }
    ]
  },
  {
    id: "J23-6d", topic: "1C", source: "WBI11 • June 2023 • Q6(d)", title: "Why antioxidants matter", marks: 4, official: true,
    q: "Explain why dietary antioxidants are important. (4)",
    ms: [
      "Antioxidants reduce / neutralise free radicals (donate electrons to them)",
      "Less cell damage / damage to blood-vessel linings / oxidative stress",
      "Less plaque / atheroma formation",
      "Lower risk of CVD / heart disease / atherosclerosis / stroke"
    ],
    answer: "<p>Dietary antioxidants <b>neutralise free radicals</b> by donating electrons to them. This reduces damage to cells and to the linings of blood vessels (oxidative stress), so less plaque/atheroma builds up — lowering the risk of atherosclerosis, CVD and stroke.</p>",
    pitfalls: [
      { t: "Build the full chain: radicals → vessel damage → plaque → CVD. Stopping at “neutralises radicals” leaves marks behind.", s: "Topic tip" }
    ]
  },
  {
    id: "J23-8a", topic: "1C", source: "WBI11 • June 2023 • Q8(a)", title: "Which risks ignore lifestyle?", marks: 1, official: true,
    q: "CVD risk calculators use: age, blood pressure, smoking, total cholesterol, HDL cholesterol. (a) How many of these risk factors are NOT influenced by lifestyle?<br>A — 1&nbsp;&nbsp;B — 2&nbsp;&nbsp;C — 3&nbsp;&nbsp;D — 4 (1)",
    ms: [
      "A — 1 (age only)"
    ],
    answer: "<p><b>A.</b> Only <b>age</b> is uninfluenced by lifestyle — blood pressure, smoking and cholesterol can all be modified.</p>",
    pitfalls: [
      { t: "BP and cholesterol feel “medical” but both respond to diet, exercise, smoking and alcohol.", s: "Topic tip" }
    ]
  },
  {
    id: "J23-8b", topic: "1C", source: "WBI11 • June 2023 • Q8*(b)", title: "★ Are the risk calculators any good?", marks: 6, official: true,
    q: "Two calculators (RAC-1, RAC-2) estimate 10-year CVD risk. RAC-1 asks for age, BP, smoking, total cholesterol. RAC-2 asks for age, BP, total cholesterol and HDL (but not smoking)." +
      "<table class='mini'><tr><th>Information</th><th>RAC-1</th><th>RAC-2</th></tr>" +
      "<tr><td>Age</td><td>✓</td><td>✓</td></tr><tr><td>Blood pressure</td><td>✓</td><td>✓</td></tr>" +
      "<tr><td>Smoking</td><td>✓</td><td>✗</td></tr><tr><td>Total cholesterol</td><td>✓</td><td>✓</td></tr>" +
      "<tr><td>HDL cholesterol</td><td>✗</td><td>✓</td></tr></table><br>" +
      "*(b) Explain the effectiveness of these two calculators in assessing risk, and whether other factors should be considered. (6) — ★ question: structure your answer logically (QWC).",
    ms: [
      "Risk rises with age (arteries stiffen; more time for other risks to act)",
      "High BP damages the arterial endothelium → plaque formation",
      "Smoking raises blood pressure",
      "More blood cholesterol → more plaque build-up",
      "HDL level gives the HDL:LDL ratio, which affects CVD risk",
      "BUT other factors matter too: salt (↑BP), alcohol (liver/cholesterol), diabetes, obesity, genetics / family history",
      "RAC-1 lacks HDL data and RAC-2 lacks smoking data — both are important",
      "RAC-1 is possibly more effective (it includes smoking)",
      "Both miss key factors → inaccurate / underestimate of risk",
      "Effectiveness depends on honest, accurate answers — people guess BP/cholesterol/HDL"
    ],
    answer: "<p>Both calculators include genuine risk factors: risk rises with age as arteries stiffen; high BP damages the endothelium, triggering plaque; smoking raises BP; more cholesterol means more plaque; and HDL allows the HDL:LDL ratio. However, both omit important factors — <b>salt, alcohol, diabetes, obesity and family history</b> — so both will underestimate true risk. Comparing them, RAC-1 lacks HDL data while RAC-2 lacks smoking data, and since both matter, RAC-1 is arguably more effective as it captures smoking. Finally, both depend on accurate self-reporting, yet people often guess their BP or cholesterol — so neither calculator is fully effective and more factors should be considered.</p>",
    levels: "Level 3 (5–6): detailed explanation covering ALL THREE aspects — the listed factors, the missing factors, and the RAC-1 vs RAC-2 comparison. Level 2 (3–4): two aspects. Level 1 (1–2): one aspect / simple description.",
    pitfalls: [
      { t: "Level 3 needs ALL THREE aspects — listed factors, missing factors, comparison. Miss one and you're capped (mark scheme).", s: "Mark scheme" },
      { t: "It's a ★ question: link ideas logically with specialist vocabulary.", s: "Topic tip" }
    ]
  },
  {
    id: "J23-8c1", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(i)", title: "Why risk gets underestimated", marks: 2, official: false,
    q: "(c)(i) Explain why the information entered by a person may lead to an underestimate of their 10-year risk of developing CVD. (2)",
    ms: [
      "People may not know their BP / cholesterol / HDL and guess — or under-report smoking, drinking and diet",
      "Risk factors the calculators ignore (e.g. diabetes, family history, inactivity) mean the true risk is higher"
    ],
    answer: "<p>A person may guess values they don't know, such as blood pressure or cholesterol, or under-report smoking, alcohol and poor diet — giving falsely reassuring inputs. On top of that, neither calculator includes factors like diabetes, family history or inactivity, so the calculated risk understates the true risk.</p>",
    pitfalls: [
      { t: "Points here are indicative (compiled from the Q8 mark-scheme themes).", s: "Topic tip" }
    ]
  },
  {
    id: "J23-8c2", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(ii)", title: "Not suitable for everybody?", marks: 2, official: false,
    q: "(c)(ii) Suggest why these two risk calculators may not be suitable for everybody to use. (2)",
    ms: [
      "Validated only for certain groups (e.g. age ranges / populations) — risk differs outside these",
      "Not suitable for people already diagnosed with CVD or diabetes, or on medication — different risk profile"
    ],
    answer: "<p>The calculators are validated for particular populations and age ranges, so they may mislead children, the very elderly or unrepresented groups. They are also unsuitable for people who already have CVD or diabetes (or take related medication), whose risk follows a different pattern.</p>",
    pitfalls: [
      { t: "Points here are indicative (compiled from the Q8 mark-scheme themes).", s: "Topic tip" }
    ]
  },
  {
    id: "J23-8c3", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(iii)", title: "Why a 10-year window?", marks: 1, official: true,
    q: "(c)(iii) Suggest why these risk calculators estimate the 10-year risk of developing CVD. (1)",
    ms: [
      "CVD takes a long time to develop / lifestyle and age (risk) change over time"
    ],
    answer: "<p>Because CVD develops <b>slowly over many years</b>, and a person's lifestyle — and hence risk — changes with age.</p>",
    pitfalls: []
  },

  /* ============ JANUARY 2023 WBI11/01 (real past paper) ============ */
  {
    id: "Ja23-4a", topic: "1B", source: "WBI11 • Jan 2023 • Q4(a)(ii)", title: "What makes Q an artery?", marks: 1, official: true,
    q: "(ii) Why is blood vessel Q classified as an artery?<br>A — it carries deoxygenated blood&nbsp;&nbsp;B — it carries oxygenated blood&nbsp;&nbsp;C — it carries blood away from the heart&nbsp;&nbsp;D — it carries blood back to the heart (1)",
    ms: [
      "C — an artery is defined as a vessel carrying blood AWAY from the heart"
    ],
    answer: "<p><b>C.</b> Arteries carry blood <b>away from the heart</b> — oxygen content is irrelevant (the pulmonary artery carries deoxygenated blood).</p>",
    pitfalls: [
      { t: "Don't be fooled by oxygenation — direction of flow defines arteries vs veins.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-4b", topic: "1B", source: "WBI11 • Jan 2023 • Q4(b)(ii)", title: "Cardiac cycle length", marks: 1, official: true,
    q: "Group 2, day 4: mean heart rate = 111 beats min⁻¹. (ii) Calculate the mean length of the cardiac cycle. (1)",
    ms: [
      "0.54 s (accept 0.5 / 0.541) — 60 ÷ 111"
    ],
    answer: "<p>Cycle length = 60 ÷ heart rate = 60 ÷ 111 = <b>0.54 s</b>.</p>",
    pitfalls: [
      { t: "Learn it: cycle length (s) = 60 ÷ HR. Give a sensible number of figures.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-5a1", topic: "1C", source: "WBI11 • Jan 2023 • Q5(a)(i)", title: "Portfolio diet profile", marks: 1, official: true,
    q: "The Portfolio diet lowers LDLs and other CVD risk factors. (i) Which row describes its cholesterol and antioxidant content?<br>A — high / high&nbsp;&nbsp;B — high / low&nbsp;&nbsp;C — low / high&nbsp;&nbsp;D — low / low (1)",
    ms: [
      "C — low cholesterol, high antioxidant"
    ],
    answer: "<p><b>C.</b> A heart-protective diet is <b>low in cholesterol and rich in antioxidants</b> (high cholesterol would raise risk; high antioxidants help reduce it).</p>",
    pitfalls: []
  },
  {
    id: "Ja23-5a2", topic: "1C", source: "WBI11 • Jan 2023 • Q5(a)(ii)", title: "Name two dietary risk factors", marks: 1, official: true,
    q: "(ii) Name two other dietary risk factors that could be changed in this diet. (1)",
    ms: [
      "Any TWO of: salt • fibre • energy (content) • saturated fat • alcohol — BOTH needed for the mark"
    ],
    answer: "<p>Any two from: <b>salt, fibre, energy content, saturated fat, alcohol</b> (e.g. less salt and less saturated fat).</p>",
    pitfalls: [
      { t: "“Name two” for 1 mark means BOTH must be right — one correct answer scores zero (mark scheme).", s: "Mark scheme" }
    ]
  },
  {
    id: "Ja23-5b1", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(i)", title: "Why remove these women?", marks: 1, official: true,
    q: "Women with missing lifestyle information were removed from the study. (i) Suggest why. (1)",
    ms: [
      "Otherwise the investigation would not be valid — lifestyle affects CVD risk"
    ],
    answer: "<p>Because <b>lifestyle affects CVD risk</b>, incomplete lifestyle data would make the investigation invalid.</p>",
    pitfalls: []
  },
  {
    id: "Ja23-5b2", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(ii)", title: "Unrealistic energy estimates", marks: 2, official: true,
    q: "Some women gave unrealistic estimates of daily energy intake. (ii) Give two reasons why. (2)",
    ms: [
      "Didn't want to admit / were embarrassed about how much they ate",
      "Hadn't kept a record of the food eaten",
      "Didn't know the energy content of foods / guessed"
    ],
    answer: "<p>They may have been <b>embarrassed</b> about how much they ate and under-reported it; and since they <b>hadn't kept food records</b> and <b>didn't know foods' energy contents</b>, their estimates were guesses.</p>",
    pitfalls: [
      { t: "Self-reported diet data is unreliable — embarrassment + no records + no knowledge.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-5b3", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(iii)", title: "Why exclude women with CVD?", marks: 2, official: true,
    q: "Women showing signs of CVD were removed from the study. (iii) Explain why. (2)",
    ms: [
      "The study investigates the effect of diet on the DEVELOPMENT of CVD",
      "These women were already developing it → data / conclusions would be invalid"
    ],
    answer: "<p>The investigation studies how diet affects the <b>development</b> of CVD — women who already show signs of it would distort the results and make the conclusions <b>invalid</b>.</p>",
    pitfalls: [
      { t: "Always tie exclusions back to validity of the conclusion.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-5b4", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(iv)", title: "Percentage removed", marks: 1, official: true,
    q: "161,808 women started; 5,884 + 32,594 were removed. (iv) Calculate the percentage of all the women removed. (1)",
    ms: [
      "23.8% (accept 24 / 23.78)"
    ],
    answer: "<p>(5,884 + 32,594) ÷ 161,808 × 100 = 38,478 ÷ 161,808 × 100 = <b>23.8%</b>.</p>",
    pitfalls: []
  },
  {
    id: "Ja23-5c", topic: "1C", source: "WBI11 • Jan 2023 • Q5(c)", title: "Low saturated fat → less CVD", marks: 3, official: true,
    q: "(c) Explain why a diet that is low in saturated fat is likely to reduce the risk of CVD. (3)",
    ms: [
      "Less cholesterol / LDL in the blood",
      "Less plaque / atheroma / clot formation",
      "Coronary artery stays open → blood keeps flowing to the heart muscle"
    ],
    answer: "<p>Less saturated fat means <b>less cholesterol/LDL in the blood</b>, so <b>less plaque and atheroma</b> build up. The <b>coronary arteries stay open</b>, so blood — with its oxygen and glucose — keeps reaching the heart muscle, cutting CVD risk.</p>",
    pitfalls: [
      { t: "Name the coronary artery and finish the chain at blood flow to the heart.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-7b", topic: "1B", source: "WBI11 • Jan 2023 • Q7(b)", title: "Yak lungs & heart", marks: 3, official: true,
    q: "Yaks live at high altitude (thin, low-oxygen air) and have large lungs and a large heart. (b) Explain why these adaptations help yaks survive at high altitudes. (3)",
    ms: [
      "Large lungs → large air volume / more alveoli / larger surface area for gas exchange",
      "Large heart pumps more blood (at higher pressure)",
      "Cells supplied with sufficient oxygen (for aerobic respiration)"
    ],
    answer: "<p>Large lungs hold a <b>bigger air volume with more alveoli</b> — a larger surface area for oxygen diffusion. The large heart <b>pumps more blood</b> to the tissues, so cells still receive <b>enough oxygen for aerobic respiration</b> despite the thin air.</p>",
    pitfalls: [
      { t: "Link every adaptation FORWARD to oxygen delivery — structures alone don't explain survival.", s: "Topic tip" }
    ]
  },
  {
    id: "Ja23-7c3", topic: "1B", source: "WBI11 • Jan 2023 • Q7*(c)(iii)", title: "★ Yak blood at altitude", marks: 6, official: true,
    q: "Yak blood vs human blood: yaks have ~10<sup>13</sup> RBCs per dm<sup>3</sup> (humans ~5×10<sup>6</sup>), smaller RBCs (43 fl vs 90 fl), more haemoglobin (136 g dm<sup>−3</sup> vs 12–18), and keep fetal haemoglobin for life. *(iii) Discuss why the blood of yaks enables these animals to live at high altitudes. Use all the information in this question. (6) — ★ question: structure logically (QWC).",
    ms: [
      "Very high RBC concentration → they carry high levels of oxygen",
      "…to the tissues for (aerobic) respiration, meeting the oxygen demands of the yaks",
      "Small RBCs → high surface-area-to-volume ratio → oxygen diffuses into the cells faster",
      "Each cell carries less oxygen, but the huge numbers compensate (small cells pack closer together)",
      "High haemoglobin concentration → more oxygen per red cell (each Hb binds 4 O2)",
      "Fetal haemoglobin has higher affinity → binds oxygen even at low partial pressures → higher % saturation"
    ],
    answer: "<p>Yaks' enormous red-cell concentration carries <b>far more oxygen</b> to respiring tissues. Their small red cells give a <b>high surface-area-to-volume ratio</b> for rapid oxygen diffusion — each cell holds less, but sheer numbers (and tighter packing) more than compensate. Very high <b>haemoglobin concentration</b> means more oxygen per cell, since each Hb binds four O<sub>2</sub>. Finally, lifelong <b>fetal haemoglobin</b> has a higher oxygen affinity, so it still loads oxygen at the low partial pressures of high altitude, keeping saturation high.</p>",
    levels: "Level 3 (5–6): extended discussion of 2–3 blood features + comments on the rest, all linked to altitude (6 = extended on three + comment on the remaining one). Level 2 (3–4): three features simply, or one in depth + another. Level 1 (1–2): one–two isolated features.",
    pitfalls: [
      { t: "“Use ALL the information” — cover concentration, size, Hb AND fetal Hb for Level 3 (mark scheme).", s: "Mark scheme" },
      { t: "Fetal Hb point = affinity + low partial pressure + saturation. All three!", s: "Topic tip" }
    ]
  },

  /* ============ JANUARY 2024 WBI11/01 (real past paper — extra) ============ */
  {
    id: "J24-1", topic: "1B", source: "WBI11 • Jan 2024 • Q1", title: "Oxygen transport: complete the description", marks: 5, official: true,
    q: "Red blood cells transport oxygen to the cells of the body. Read through the following description of how oxygen is transported from the lungs to respiring cells, and complete it with the most appropriate word or words.<br><br>" +
      "Oxygen binds to ____________________ inside red blood cells.<br>" +
      "Oxygen binds to this molecule in the lungs where the partial pressure of oxygen is ____________________ compared with elsewhere in the body.<br>" +
      "The oxygenated blood returns to the heart in the blood vessel called the ____________________ and is pumped to the body by the part of the heart called the ____________________.<br>" +
      "In the tissues, the ability of this molecule to bind oxygen is affected by the higher concentration of carbon dioxide. This is called the ____________________ effect. (5)",
    ms: [
      "Oxygen binds to haemoglobin inside red blood cells",
      "partial pressure of oxygen is HIGH in the lungs",
      "oxygenated blood returns to the heart in the pulmonary vein",
      "blood is pumped to the body by the left ventricle",
      "the Bohr effect"
    ],
    answer: "<p>Oxygen binds to <b>haemoglobin</b> inside red blood cells. It binds where the partial pressure of oxygen is <b>high</b> — in the lungs. The oxygenated blood returns to the heart in the <b>pulmonary vein</b> and is pumped to the body by the <b>left ventricle</b>. In the tissues, the higher CO<sub>2</sub> concentration lowers haemoglobin's affinity for oxygen — the <b>Bohr</b> effect.</p>",
    pitfalls: [
      { t: "The mark scheme accepts “haem / Hb / iron ion / Fe²⁺” for blank 1 and “left ventricle wall/muscle” for blank 4 — but “artery” or “vena cava” for the vessel is not accepted.", s: "Mark scheme" },
      { t: "Say the lungs have a HIGH pO₂ — that gradient is what drives loading.", s: "Topic tip" }
    ]
  },
  {
    id: "J24-5a2", topic: "1C", source: "WBI11 • Jan 2024 • Q5(a)(ii)", title: "BMI from mass and height", marks: 1, official: true,
    q: "The BMI of a person can be calculated using the formula: BMI = mass in kg ÷ (height in m)². Which of the following is the BMI of a person who has a mass of 65 kg and a height of 165 cm?<br>A — 23&nbsp;&nbsp;B — 24&nbsp;&nbsp;C — 39&nbsp;&nbsp;D — 40 (1)",
    ms: [
      "B — 24 (65 ÷ 1.65² = 23.9 ≈ 24 — convert cm → m first)"
    ],
    answer: "<p><b>B.</b> 65 ÷ 1.65² = 65 ÷ 2.7225 = 23.9 ≈ <b>24</b>. (A, 23, is the value rounded DOWN; C/D come from dividing by height in the wrong units.)</p>",
    pitfalls: [
      { t: "Convert 165 cm → 1.65 m BEFORE squaring — the unit slip is the whole trap.", s: "Topic tip" }
    ]
  },
  {
    id: "J24-5b", topic: "1C", source: "WBI11 • Jan 2024 • Q5(b)", title: "Two ways to lose weight", marks: 1, official: true,
    q: "People who are overweight or obese are encouraged to lose weight. State two ways in which a person could lose weight. (1)",
    ms: [
      "Decrease calorie / energy / fat / sugar / carbohydrate intake AND increase exercise / activity",
      "Overall: use more energy than is consumed (calorie deficit)"
    ],
    answer: "<p><b>Reduce energy intake</b> (fewer calories/fat/sugar/carbs) <b>and increase exercise</b> — i.e. use more energy than consumed (a calorie deficit). Weight-reducing medication or a gastric band are NOT accepted.</p>",
    pitfalls: [
      { t: "The answer must be in the form of a CHANGE — “eat less and exercise more”, not just “diet”.", s: "Mark scheme" }
    ]
  },
  {
    id: "J24-8a", topic: "1C", source: "WBI11 • Jan 2024 • Q8(a)", title: "Unsat fatty acid side chain", marks: 2, official: true,
    q: "Tropical sprue is a disorder that limits the absorption of nutrients into the blood. Consumption of unsaturated lipids has been proposed as a cause of tropical sprue. The diagram shows part of an unsaturated lipid — a glycerol backbone joined via ester groups to a C=O group and a five-carbon chain (the fatty-acid side chain). Complete the structure to show one possible structure of a fatty acid side chain of an unsaturated lipid. (2)",
    ms: [
      "At least one carbon–carbon double bond (C=C) drawn in the side chain",
      "Rest of the diagram correct: C–C single bonds elsewhere + all H atoms added"
    ],
    answer: "<p>Draw one <b>C=C double bond</b> somewhere along the side chain (e.g. –CH₂–CH=CH–CH₂–CH₂– attached to the C=O), with the remaining carbons as C–C single bonds and every carbon completed with its hydrogens. A double bond between the first two carbons (next to the C=O) is NOT accepted.</p>",
    pitfalls: [
      { t: "A C=C adjacent to the C=O group is rejected — put the double bond along the chain.", s: "Mark scheme" },
      { t: "“Rest of diagram correct” includes the H atoms — a bare carbon skeleton loses mark 2.", s: "Mark scheme" }
    ]
  },
  {
    id: "J24-8b3", topic: "1C", source: "WBI11 • Jan 2024 • Q8(b)(iii)", title: "Atheroma area: mm² → µm²", marks: 2, official: true,
    q: "Primates fed a diet of cholesterol + saturated lipids developed atheromas. At 60 months the mean area of the atheromas was 0.026 mm² in males and 0.004 mm² in females. Calculate the difference in the area of the atheromas in males compared with females. Give your answer in µm². (2)",
    ms: [
      "0.026 − 0.004 = 0.022 mm²",
      "0.022 mm² × 10⁶ = 22,000 µm² (2.2 × 10⁴ µm²)"
    ],
    answer: "<p>0.026 − 0.004 = <b>0.022 mm²</b>. Since 1 mm² = 10⁶ µm², 0.022 × 10⁶ = <b>22,000 µm²</b> (2.2 × 10⁴ µm²).</p>",
    pitfalls: [
      { t: "mm² → µm² is ×10⁶ (not ×100). A bald 22,000 scores 2; “22 of any magnitude” scores 1.", s: "Mark scheme" }
    ]
  },
  {
    id: "J24-5d2", topic: "1C", source: "WBI11 • Jan 2024 • Q5(d)(ii)", title: "Gut bacteria & weight loss", marks: 2, official: true,
    q: "The investigation found that people with greater weight loss had bacteria with increased rates of replication. Suggest why the rate of replication of the bacteria could affect weight loss. (2)",
    ms: [
      "Bacterial replication uses energy / glucose / sugar (in the digestive system)",
      "Therefore less energy is available to the person for absorption / storage as fat"
    ],
    answer: "<p>Faster bacterial replication <b>uses up energy/glucose</b> in the gut, so <b>less of the person's food energy is available for absorption or storage as fat</b> — aiding weight loss.</p>",
    pitfalls: [
      { t: "Don't answer with “food” or “nutrients” — the mark is on ENERGY being used up by the bacteria.", s: "Mark scheme" }
    ]
  }
  ]
};
