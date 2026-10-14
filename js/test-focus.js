const TEST_FOCUS = {
  /* =====================================================================
   * TEST FOCUS — Edexcel IAL Biology WBI11, TOPIC 1:
   *   1A The Chemistry of Life  (water, carbohydrates, lipids, proteins)
   *   1B Mammalian Transport    (blood, vessels, heart)
   *   1C Cardiovascular Disease (causes, risk, management)
   *
   * PROVENANCE — past-paper questions verified 2026-10-14 against the
   * published QP + RMS for THREE full WBI11 papers (plus original exam-
   * style "topic test bank" items, clearly labelled):
   *   • June 2023  WBI11/01  — Q2, Q3, Q5, Q6, Q8
   *   • Jan 2023   WBI11/01  — Q1, Q2, Q4, Q5, Q7
   *   • Jan 2024   WBI11/01  — Q1, Q4, Q5, Q8
   * Every question carries its paper + question number in `source`, and its
   * mark scheme is the OFFICIAL one (mark-by-mark, incl. ACCEPT/DO NOT
   * ACCEPT notes). `official:false` = the public PDFs garbled this exact
   * mark scheme and it was reconstructed from the question + exam
   * structure (labelled "indicative" in the UI): J23-8b and J23-8c1/8c2/8c3.
   * The U1–U5 "topic test bank" questions are original exam-style items
   * modelled on real past-paper questions (no official MS exists for
   * them).
   *
   * NOTES — one detailed page per subtopic of the student book's Topic 1:
   * 1A.1–1A.5, 1B.1–1B.4, 1C.1–1C.7 + "Using the Evidence" (1C.6 skill)
   * + heart-failure extension + exam skills.
   *
   * The page is fully driven by this object: change `id`/`title`/`notes`/
   * `questions` to swap it to another topic or paper.
   * ===================================================================== */
  id: "wbi11-topic1", subj: "Biology", unit: "1", title: "WBI11 • Topic 1: Molecules, Transport and Health",
  subtitle: "1A The Chemistry of Life • 1B Mammalian Transport • 1C CVD — every subtopic of the student book's Topic 1",
  spec: "Edexcel IAS Biology (WBI11/01)",
  timePerMark: 1.2,

  notes: [

  {
    id: "n1a1", topic: "1A", icon: "💧", title: "1A.1 — The Chemistry of Life",
    html: "<h4>Elements of life</h4><ul>" +
      "<li>The main elements in biomolecules are <b>C, H, O and N</b>; <b>P</b> (DNA, ATP, phospholipids), <b>S</b> (some amino acids) and <b>mineral ions</b> (Ca²⁺, Fe²⁺, Na⁺, K⁺, Cl⁻, HCO₃⁻, PO₄³⁻) are also essential.</li></ul>" +
      "<h4>Water: structure → properties</h4><ul>" +
      "<li><b>Structure:</b> one O covalently bonded to two H — a bent molecule. Oxygen is more electronegative, so it pulls the shared electrons towards itself: the O is slightly <b>δ⁻</b> and each H slightly <b>δ⁺</b>. That separation of small charges is the <b>dipole</b>.</li>" +
      "<li><b>Hydrogen bonds</b> form between the δ⁻ O of one water molecule and a δ⁺ H of a neighbouring one. Almost all of water's useful properties come from these H-bonds:</li>" +
      "<ul><li><b>Cohesion</b> — water molecules stick to each other (surface tension; transport in xylem).</li>" +
      "<li><b>High specific heat capacity</b> — hard to heat up, so it buffers temperature changes in organisms and seas.</li>" +
      "<li><b>High latent heat of vaporisation</b> — evaporative cooling (sweating, transpiration) removes a lot of heat.</li>" +
      "<li><b>Excellent solvent for polar molecules and ions</b> — water surrounds dissolved ions (the δ⁻ oxygens face Na⁺, the δ⁺ hydrogens face Cl⁻) and separates them, so they can react and be transported.</li>" +
      "<li><b>Medium for metabolic reactions</b> — most cellular reactions happen in aqueous solution; water also participates directly in <b>hydrolysis</b> (breaking bonds) and <b>condensation</b> (making bonds, releasing water).</li></ul></ul>" +
      "<h4>Mineral ions (examples)</h4><table class='mini'><tr><th>Ion</th><th>Role</th></tr>" +
      "<tr><td>Na⁺ / K⁺</td><td>Nerve impulses; water potential (osmoregulation)</td></tr>" +
      "<tr><td>Ca²⁺</td><td>Bone and teeth; muscle contraction</td></tr>" +
      "<tr><td>Fe²⁺</td><td>In the haem group of haemoglobin (O₂ transport)</td></tr>" +
      "<tr><td>Cl⁻</td><td>Hydrochloric acid in the stomach</td></tr>" +
      "<tr><td>HCO₃⁻</td><td>pH buffer in blood</td></tr>" +
      "<tr><td>PO₄³⁻</td><td>DNA, ATP, phospholipids</td></tr></table>"
  },

  {
    id: "n1a2", topic: "1A", icon: "🍬", title: "1A.2 — Carbohydrates 1: Monosaccharides & Disaccharides",
    html: "<h4>Monosaccharides</h4><ul>" +
      "<li><b>Glucose, fructose, galactose</b> — all <b>C₆H₁₂O₆</b>; general formula for monosaccharides <b>CnH2nOn</b>. Small, water-soluble → they have a <b>large effect on water potential</b> (many particles per gram).</li>" +
      "<li><b>Reducing sugars</b> (glucose, fructose, galactose) have a free carbonyl group that can reduce Cu²⁺ in <b>Benedict's solution</b>: blue → green/yellow/<b>red precipitate of Cu₂O</b> on warming. <b>Sucrose is non-reducing</b> — to test it, hydrolyse first (HCl, heat), neutralise (NaOH), then add Benedict's.</li></ul>" +
      "<h4>Disaccharides</h4><table class='mini'><tr><th>Disaccharide</th><th>Made from</th><th>Bond</th><th>Where found</th></tr>" +
      "<tr><td>Maltose</td><td>glucose + glucose</td><td>1–4 glycosidic</td><td>germinating seeds</td></tr>" +
      "<tr><td>Lactose</td><td>glucose + galactose</td><td>1–4 glycosidic</td><td>milk</td></tr>" +
      "<tr><td>Sucrose</td><td>glucose + fructose</td><td><b>1–2 glycosidic</b></td><td>sugar cane/beet, transport in plants</td></tr></table>" +
      "<ul><li>Made by a <b>condensation reaction</b> (a molecule of water is released); split by <b>hydrolysis</b> (a molecule of water added). Equation: <b>C₆H₁₂O₆ + C₆H₁₂O₆ → C₁₂H₂₂O₁₁ + H₂O</b> (glucose + fructose → sucrose + water).</li>" +
      "<li>The glycosidic bond joins a specific carbon on each monosaccharide (e.g. C1 of glucose to C2 of fructose in sucrose; C1–C4 in maltose).</li></ul>"
  },

  {
    id: "n1a3", topic: "1A", icon: "🌾", title: "1A.3 — Carbohydrates 2: Polysaccharides",
    html: "<h4>Starch (plant storage)</h4><ul>" +
      "<li><b>Amylose:</b> unbranched chain of <b>α-glucose</b> joined by <b>1–4 glycosidic bonds</b> — coils into a <b>helix</b> (compact, no H-bonding between chains → soluble in hot water).</li>" +
      "<li><b>Amylopectin:</b> branched α-glucose — <b>1–4 bonds in the chains plus 1–6 bonds at the branches</b>; more compact, and the many branch ends allow fast glucose release.</li>" +
      "<li>Starch is <b>insoluble</b> (large) so it has <b>little effect on water potential</b> — ideal for storage without drawing in water osmotically.</li></ul>" +
      "<h4>Glycogen (animal storage)</h4><ul>" +
      "<li>Also α-glucose, but <b>more highly branched than amylopectin</b> → even more compact AND more non-reduced ends → glucose can be released <b>quickly</b> when energy is needed (liver: blood-glucose control; muscle: rapid ATP for contraction).</li></ul>" +
      "<h4>Why storage polysaccharides work</h4><ol>" +
      "<li><b>Insoluble</b> → osmotically inactive (won't pull water into cells/tissues).</li>" +
      "<li>Many C–H bonds → <b>energy-dense</b> when hydrolysed and respired.</li>" +
      "<li>Quickly reversible — <b>hydrolysed to glucose</b> on demand.</li></ol>" +
      "<p><i>Beyond IAS (A-level):</i> cellulose is the structural polysaccharide of plant cell walls — β-glucose, straight chains, H-bonded into microfibrils.</p>"
  },

  {
    id: "n1a4", topic: "1A", icon: "🧈", title: "1A.4 — Lipids",
    html: "<h4>Triglycerides</h4><ul>" +
      "<li><b>Glycerol + 3 fatty acids</b>, joined by <b>3 ester bonds</b> via condensation (3 H₂O released); split by hydrolysis. A fatty acid = long hydrocarbon chain + carboxyl (–COOH) group.</li>" +
      "<li><b>Saturated</b> = no C=C (straight, pack tightly, solid at room temp, animal fats). <b>Unsaturated</b> = one or more C=C (kinked, liquid at room temp, plant oils) — a C=C means <b>fewer H for the same number of C → higher C:H ratio</b>.</li>" +
      "<li>Properties: <b>hydrophobic / water-insoluble</b> → little effect on water potential; <b>more energy per gram</b> than carbohydrates (more reduced); don't freeze easily.</li></ul>" +
      "<h4>Functions</h4><ul>" +
      "<li><b>Energy storage</b> (adipose tissue). <b>Insulation</b> (subcutaneous fat). <b>Protection</b> (cushions organs). <b>Waterproofing</b> (waxes on leaves/hair).</li>" +
      "<li><b>Phospholipids:</b> glycerol + 2 fatty acids + phosphate group → <b>hydrophilic head, hydrophobic tails</b> → form the bilayer of membranes (Topic 2A).</li>" +
      "<li><b>Cholesterol:</b> steroid found in membranes (regulates fluidity); precursor of steroid hormones.</li></ul>"
  },

  {
    id: "n1a5", topic: "1A", icon: "🧬", title: "1A.5 — Proteins",
    html: "<h4>Amino acids & peptide bonds</h4><ul>" +
      "<li>Every amino acid has a central C bonded to: <b>–NH₂ (amino group), –COOH (carboxyl group), –H and a variable R group</b>. (So proteins contain C, H, O <b>and</b> N — “only C/H/N” is false.)</li>" +
      "<li>A <b>peptide bond</b> forms by <b>condensation</b> between the –COOH of one amino acid and the –NH₂ of another (H₂O released); <b>hydrolysis</b> breaks it. <b>Proteases</b> (e.g. those digesting elastin) do this by their active site fitting the substrate, <b>lowering the activation energy</b>, so <b>peptide bonds are broken by hydrolysis</b>.</li></ul>" +
      "<h4>Levels of structure</h4><table class='mini'><tr><th>Level</th><th>What it is</th><th>Held by</th></tr>" +
      "<tr><td>Primary</td><td>Sequence of amino acids</td><td>peptide bonds</td></tr>" +
      "<tr><td>Secondary</td><td>α-helix / β-pleated sheet</td><td>H-bonds between chains/segments</td></tr>" +
      "<tr><td>Tertiary</td><td>3D folding of the chain</td><td>ionic bonds, disulphide bridges, H-bonds, hydrophobic interactions</td></tr>" +
      "<tr><td>Quaternary</td><td>Two or more polypeptide chains</td><td>same as tertiary (e.g. haemoglobin = 2α + 2β)</td></tr></table>" +
      "<h4>Fibrous vs globular</h4><ul>" +
      "<li><b>Fibrous</b> — long, strong, insoluble: <b>collagen</b> (tendons, ligaments, bone: <b>three polypeptide chains in a triple helix, H-bonded between the chains, every third amino acid is glycine</b>, rich in proline/hydroxyproline) and keratin (hair, nails).</li>" +
      "<li><b>Globular</b> — compact, usually soluble, specific function: <b>haemoglobin</b> (quaternary, each chain carries a <b>haem group with Fe²⁺</b>; Hb + 4O₂ ⇌ Hb(O₂)₄), enzymes, antibodies.</li>" +
      "<li><b>Denaturation:</b> heat, pH change, heavy metals etc. break the weak bonds holding the shape → active site/shape destroyed → function lost (usually irreversible).</li></ul>"
  },

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
    id: "n1c6e", topic: "1C", icon: "📊", title: "1C.6 — Using the Evidence",
    html: "<h4>Describing data properly</h4><ul>" +
      "<li>State <b>means, ranges and error bars</b> (±1 SD or 95% confidence interval). Overlapping error bars = the true means may overlap; non-overlapping (with stats) = difference likely <b>significant</b>.</li>" +
      "<li>“Describe” = <b>what</b> (increase / decrease / no change, magnitudes, units, comparisons). “Explain/comment” adds the <b>why</b> and an <b>evaluation</b>.</li>" +
      "<li>Useful CVD calculations: <b>% change</b> = (change ÷ original) × 100; <b>percentage difference</b> = |a − b| ÷ mean(a, b) × 100; <b>mean rate</b> = Δvalue ÷ Δtime; ratios as <b>x : 1</b>; “how many times more” = value ÷ value.</li></ul>" +
      "<h4>Reliability vs validity vs significance</h4><ul>" +
      "<li><b>Reliable</b> = repeatable/consistent results. <b>Valid</b> = actually measures what it claims to (controlled variables, no confounders). <b>Significant</b> = unlikely due to chance (p &lt; 0.05).</li></ul>" +
      "<h4>Evaluating CVD investigations</h4><ul>" +
      "<li>Check: <b>sample size</b> (large, representative), <b>controlled variables</b> (age, sex, other diet/lifestyle factors = confounders), <b>controls</b> (placebo, untreated group), <b>random allocation</b>, <b>blinding</b>, <b>duration</b> (CVD takes decades), <b>repeats/error bars</b>, <b>stats tests</b>.</li>" +
      "<li>Study types: <b>cohort</b> (follow people forward in time), <b>case–control</b> (compare sick vs well), <b>randomised controlled trial</b> (intervention + placebo). Observational studies show <b>correlation, not causation</b>.</li></ul>" +
      "<h4>Structure for “comment on” questions (exam recipe)</h4><ol>" +
      "<li><b>Describe</b> each graph/table (values, trends, ranges).</li>" +
      "<li><b>Compare</b> (X is higher/larger than Y; changes with Z).</li>" +
      "<li><b>Explain</b> with biology (what the change means mechanistically).</li>" +
      "<li><b>Evaluate</b> (error bars, no stats, single time point, small sample).</li>" +
      "<li><b>Conclude</b> (what the evidence supports / doesn't support).</li></ol>" +
      "<p>Model exam questions: June 2023 Q6(e)(iii) and Jan 2024 *Q8(b)(iv) — both included in the practice set below.</p>"
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

  questions: [
  /* ============ 1A — THE CHEMISTRY OF LIFE: June 2023 ============ */

  {
    id: "J23-6a", topic: "1A", source: "WBI11 • June 2023 • Q6(a)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>Insects and other invertebrates are a good source of protein, unsaturated fatty acids, iron and other nutrients. <b>How many of the following statements are true for proteins?</b></p>" +
       "<ul><li>Proteins contain only the elements carbon, hydrogen and nitrogen.</li>" +
       "<li>Proteins can be made of more than one polypeptide chain.</li>" +
       "<li>Proteins contain hydrogen bonds.</li></ul>" +
       "<p>A 0&nbsp;&nbsp;&nbsp;B 1&nbsp;&nbsp;&nbsp;C 2&nbsp;&nbsp;&nbsp;D 3</p>",
    ms: [
      {text: "C — 2 (statement 1 is FALSE: proteins also contain OXYGEN; statements 2 and 3 are true)", marks: 1,
       hint: "Statement 1 is rejected because proteins contain oxygen (in the carboxyl group of every amino acid); statement 2 is true (quaternary structure) and statement 3 is true (H-bonds in secondary/tertiary structure)"}
    ],
    answer: "C — 2. Statement 1 is false because proteins also contain <b>oxygen</b> (the –COOH of every amino acid); statement 2 is true — proteins can be quaternary (e.g. haemoglobin); statement 3 is true — hydrogen bonds stabilise secondary and tertiary structure.",
    pitfalls: [
      {t: "“Only C, H and N” is the trap — every amino acid’s carboxyl group adds oxygen.", s: "Mark scheme"}
    ]
  },

  {
    id: "J23-6b", topic: "1A", source: "WBI11 • June 2023 • Q6(b)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p><b>Which row of the table is correct for an unsaturated fatty acid?</b></p>" +
       "<table class='mini'><tr><th></th><th>Contains carbon–carbon double bonds</th><th>C : H ratio compared with a saturated fatty acid is</th></tr>" +
       "<tr><td>A</td><td>no</td><td>lower</td></tr><tr><td>B</td><td>no</td><td>higher</td></tr>" +
       "<tr><td>C</td><td>yes</td><td>lower</td></tr><tr><td>D</td><td>yes</td><td>higher</td></tr></table>",
    ms: [
      {text: "D — yes, contains C=C; C:H ratio is HIGHER (same number of C, fewer H)", marks: 1,
       hint: "Unsaturated = one or more C=C double bonds, so for the same number of carbons there are fewer hydrogens → a higher carbon:hydrogen ratio"}
    ],
    answer: "D. An unsaturated fatty acid has one or more C=C double bonds, so for the same number of carbons it has fewer hydrogens — the <b>carbon : hydrogen ratio is higher</b> than in a saturated fatty acid.",
    pitfalls: [
      {t: "“Higher C:H ratio” means FEWER hydrogens — the ratio is C divided by H, so losing H raises it.", s: "Topic tip"}
    ]
  },

  {
    id: "J23-6c", topic: "1A", source: "WBI11 • June 2023 • Q6(c)", official: true, marks: 1, time: 1, kind: "text",
    q: "<p><b>Name one organic molecule that contains iron.</b></p>",
    ms: [
      {text: "Haemoglobin (ACCEPT myoglobin, leghaemoglobin, transferrin, ferritin, ferredoxin, cytochrome, catalase, peroxidase — IGNORE “Hb” alone or “haem group”)", marks: 1,
       hint: "Any protein containing an iron (haem) group; the bare abbreviation “Hb” is not credited"}
    ],
    answer: "<b>Haemoglobin</b> — each of its four haem groups contains an Fe²⁺ ion (myoglobin and the other listed iron proteins would also be credited).",
    pitfalls: []
  },

  {
    id: "J23-3a1", topic: "1A", source: "WBI11 • June 2023 • Q3(a)(i)", official: true, marks: 1, time: 2, kind: "diagram",
    q: "<p>Sucrose is a disaccharide made from glucose and fructose — glucose is joined to fructose by a <b>1–2 glycosidic bond</b>.</p>" +
       "<p>(i) The diagram shows a molecule of glucose and a molecule of fructose; carbon 1 on the glucose and carbon 2 on the fructose are numbered. <b>Complete the diagram to show a glycosidic bond between the glucose molecule and the fructose molecule.</b> (1)</p>",
    ms: [
      {text: "An O joined by a covalent bond to C1 of the glucose and C2 of the fructose (bond does not have to touch the carbon atoms as long as the position is clear; solid or dotted lines)", marks: 1,
       hint: "The oxygen bridge must connect C1 (glucose) to C2 (fructose) — the 1–2 glycosidic bond; both O–C bonds drawn"}
    ],
    answer: "Draw an oxygen bridge between the two sugars: <b>C1 of glucose – O – C2 of fructose</b>, with both O–C lines drawn as covalent bonds (a solid or dotted line, not necessarily touching the carbon atoms, as long as the position is clear). No other groups may be added to C1 or C2.",
    pitfalls: [
      {t: "Bond to the WRONG carbon (e.g. C1–C1, as in maltose) loses the mark — sucrose is specifically a 1–2 bond.", s: "Mark scheme"}
    ]
  },

  {
    id: "J23-3a2", topic: "1A", source: "WBI11 • June 2023 • Q3(a)(ii)", official: true, marks: 2, time: 2, kind: "formula",
    q: "<p>(ii) <b>Complete the formula equation for the reaction that makes sucrose from glucose and fructose.</b> (2)</p>" +
       "<p>C₆H₁₂O₆ + C₆H₁₂O₆ → ....................</p>",
    ms: [
      {text: "C12H22O11 (the formula for sucrose)", marks: 1, hint: "Subscripts not required; the equation is not required to be balanced"},
      {text: "H2O (water released by condensation)", marks: 1, hint: "The water product is the other mark — condensation releases H2O"}
    ],
    answer: "<b>C₆H₁₂O₆ + C₆H₁₂O₆ → C₁₂H₂₂O₁₁ + H₂O</b> — sucrose (C₁₂H₂₂O₁₁, mark 1) and a molecule of water (H₂O, mark 1) released by the condensation reaction. (Numbers don’t need to be subscripts.)",
    pitfalls: [
      {t: "Forgetting the H₂O was one of the commonest errors — even candidates who wrote the correct sucrose formula lost the mark for it (June 2023 ER).", s: "Examiner report"}
    ]
  },

  {
    id: "J23-3b1", topic: "1A", source: "WBI11 • June 2023 • Q3(b)(i)", official: true, marks: 1, time: 2, kind: "explain",
    q: "<p>A test for sucrose concentration: <b>①</b> break sucrose down into glucose and fructose using an enzyme → <b>②</b> add a chemical that binds to fructose and changes colour → <b>③</b> measure the colour intensity. The colour intensity is directly proportional to the concentration of sucrose.</p>" +
       "<p>(i) <b>Give a reason why the colour intensity is directly proportional to the concentration of sucrose.</b> (1)</p>",
    ms: [
      {text: "Sucrose contains {the same number of / one} fructose (ACCEPT the ratio of sucrose to fructose is 1:1)", marks: 1,
       hint: "Each sucrose molecule contains exactly one fructose → fructose measured is proportional to sucrose present"}
    ],
    answer: "Each sucrose molecule contains <b>exactly one fructose</b>, so when the enzyme breaks sucrose down the amount of fructose produced is in a fixed 1:1 ratio with the sucrose. Since the colour intensity tracks the fructose, it is directly proportional to the sucrose concentration.",
    pitfalls: [
      {t: "Use the information given: the enzyme makes the sucrose:fructose ratio 1:1 — don’t wander off into glucose (no mark for it).", s: "Mark scheme"}
    ]
  },

  {
    id: "J23-3b2", topic: "1A", source: "WBI11 • June 2023 • Q3(b)(ii)", official: true, marks: 1, time: 2, kind: "suggest",
    q: "<p>The graph of colour intensity against sucrose concentration (0.0–0.40 a.u. for 0–2000 µg dm⁻³) <b>does not start at the origin</b> of the graph.</p>" +
       "<p>(ii) <b>Suggest why the line does not start at the origin of the graph.</b> (1)</p>",
    ms: [
      {text: "The test is not sensitive enough / the colour intensity is too low (ACCEPT a certain concentration of {fructose/sucrose} is needed before {the colour is visible / the colour change})", marks: 1,
       hint: "It is a HIGH-ORDER question: the answer concerns the SENSITIVITY of the test, not the chemistry of sucrose"}
    ],
    answer: "The test is <b>not sensitive enough</b> at very low concentrations — a certain concentration of {sucrose/fructose} is needed before any visible colour change occurs, so the line only begins above the origin.",
    pitfalls: [
      {t: "Examiners flagged this as a high-order question — the expected answer is about the LIMIT OF DETECTION of the test, not about sucrose itself (June 2023 ER).", s: "Examiner report"}
    ]
  },

  {
    id: "J23-3b3", topic: "1A", source: "WBI11 • June 2023 • Q3(b)(iii)", official: true, marks: 1, time: 2, kind: "state",
    q: "<p>(iii) <b>State why the concentration of maltose and lactose cannot be measured using this test.</b> (1)</p>",
    ms: [
      {text: "The chemical (only) binds to fructose — there is no fructose in either maltose or lactose", marks: 1,
       hint: "The colour-changing chemical is fructose-specific; maltose = glucose+glucose, lactose = glucose+galactose"}
    ],
    answer: "The colour-changing chemical <b>only binds to fructose</b>, and neither maltose (glucose + glucose) nor lactose (glucose + galactose) contains fructose — so no colour change occurs and their concentrations cannot be measured.",
    pitfalls: [
      {t: "Work out the theme from the earlier parts: the test is fructose-specific. “It only works on sucrose” is not the point — it’s the fructose.", s: "Examiner report"}
    ]
  },
  /* ============ 1A — Jan 2023 (Q1 water/carbs, Q2 collagen/protease) ============ */

  {
    id: "Ja23-1a", topic: "1A", source: "WBI11 • Jan 2023 • Q1(a)", official: true, marks: 2, time: 3, kind: "diagram",
    q: "<p>Water and carbohydrates are molecules found in all living organisms.</p>" +
       "<p>(a) <b>Draw a diagram of a water molecule to show its dipole nature.</b> (2)</p>",
    ms: [
      {text: "Two hydrogens joined to an oxygen by covalent bonds", marks: 1, hint: "Bent H–O–H shape with both covalent O–H bonds shown"},
      {text: "Charge distribution shown with delta signs OR some indication that the charges are small", marks: 1, hint: "δ⁻ on the O, δ⁺ on each H — the charges must be shown as PARTIAL (δ / small)"}
    ],
    answer: "Draw O with two covalent O–H bonds to the two hydrogens (mark 1), and show the partial charges — <b>δ⁻ on the oxygen and δ⁺ on each hydrogen</b> (mark 2). The δ signs (or some other indication that the charges are small) are essential: oxygen is more electronegative so it pulls the shared electrons towards itself.",
    pitfalls: [
      {t: "A plain H–O–H with no charge indication only earns the first mark — the dipole IS the charge separation.", s: "Mark scheme"}
    ]
  },

  {
    id: "Ja23-1b", topic: "1A", source: "WBI11 • Jan 2023 • Q1(b)", official: true, marks: 3, time: 3, kind: "table",
    q: "<p>(b) The table gives some statements about carbohydrates. <b>For each statement, put one cross in the appropriate box to match the statement to the correct carbohydrates.</b> (3)</p>" +
       "<table class='mini'><tr><th>Statement</th><th>Monosaccharides and polysaccharides</th><th>Monosaccharides only</th><th>Polysaccharides only</th><th>Neither</th></tr>" +
       "<tr><td>Has the general formula CnH2nOn</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>" +
       "<tr><td>Has glycosidic bonds</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr>" +
       "<tr><td>Has a small effect on water potential</td><td>☐</td><td>☐</td><td>☐</td><td>☐</td></tr></table>",
    ms: [
      {text: "Has the general formula CnH2nOn → MONOSACCHARIDES only (e.g. glucose C6H12O6; polysaccharides are (C6H10O5)n-type)", marks: 1, hint: "CnH2nOn fits monosaccharides; polysaccharides lose water units when the glycosidic bonds form"},
      {text: "Has glycosidic bonds → POLYSACCHARIDES only", marks: 1, hint: "Glycosidic bonds join monosaccharides together — monosaccharides themselves have none"},
      {text: "Has a small effect on water potential → POLYSACCHARIDES only (very large Mr → few particles per gram → small lowering of water potential)", marks: 1, hint: "Per gram a polymer makes far fewer solute particles than the same mass of monosaccharide"}
    ],
    answer: "Row 1 (CnH2nOn): <b>monosaccharides only</b> — glucose is C₆H₁₂O₆, but polysaccharide repeat units are of the form (C₆H₁₀O₅)ₙ. Row 2 (glycosidic bonds): <b>polysaccharides only</b> — the bonds exist between monosaccharides. Row 3 (small effect on water potential): <b>polysaccharides only</b> — their very large molecules mean far fewer solute particles per gram, so they lower water potential much less than the same mass of monosaccharide.",
    pitfalls: [
      {t: "The water-potential row is the trap: BOTH are solutes, but per gram a polymer makes far fewer particles — so the “small effect” belongs to the polymer.", s: "Topic tip"},
      {t: "Row-by-row answers follow the official MS answer table (the cross-mark cells don’t render in the public PDF).", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-2a", topic: "1A", source: "WBI11 • Jan 2023 • Q2(a)", official: true, marks: 3, time: 4, kind: "describe",
    q: "<p>Elastin and collagen are proteins found in connective tissue.</p>" +
       "<p>(a) <b>Describe the structure of collagen.</b> (3)</p>",
    ms: [
      {text: "Fibrous (protein)", marks: 1, hint: "State the protein class"},
      {text: "Composed of {three (polypeptide) chains in a helix / three chains in a helix / three-stranded helix / triple helix}", marks: 1, hint: "Three polypeptide chains wound into a triple helix"},
      {text: "Held by hydrogen bonds between the chains", marks: 1, hint: "The H-bonds run BETWEEN the three chains"},
      {text: "Credit any detail of the chains — e.g. every 3rd amino acid is glycine / repeating sequences / high % of {glycine/proline/hydroxyproline}", marks: 1, hint: "ANY 3 of these 4 points score"}
    ],
    answer: "Collagen is a <b>fibrous protein</b> made of <b>three polypeptide chains wound into a triple helix</b>, <b>held together by hydrogen bonds between the chains</b>; every third amino acid in each chain is <b>glycine</b> (small R group) and the chains are rich in proline/hydroxyproline. (Any 3 of the 4 points score.)",
    pitfalls: [
      {t: "“Triple helix” + “H-bonds BETWEEN the chains” + “fibrous” are the core three — writing only “it is a protein with amino acids” scores nothing.", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-2b1", topic: "1A", source: "WBI11 • Jan 2023 • Q2(b)(i)", official: true, marks: 2, time: 3, kind: "calc",
    q: "<p>A protease solution was added to a sample of elastin. The graph shows the effect of the protease on the concentration of the breakdown product (0 min = 0, 20 min = 130, 30 min = 162, 40 min = 182 nmol dm⁻³).</p>" +
       "<p>(i) <b>Calculate the rate of reaction at 30 minutes. Draw a tangent to help with your calculation.</b> (2)</p>",
    ms: [
      {text: "A tangent is drawn correctly at 30 minutes", marks: 1, hint: "Tangent (not secant) touching the curve at 30 min, with two points marked for the gradient"},
      {text: "Rate given: 2–3.158 nmol dm⁻³ min⁻¹ (up to 3 decimal places)", marks: 1, hint: "Accept any value 2–3.158; a bald answer with too many decimal places earns 1 only"}
    ],
    answer: "Draw a <b>tangent at 30 min</b> (mark 1), then rate = gradient of the tangent ≈ (182 − 130) ÷ (40 − 20) = 52 ÷ 20 ≈ <b>2.6 nmol dm⁻³ min⁻¹</b> (mark 2 — the MS accepts any value 2–3.158, up to 3 decimal places).",
    pitfalls: [
      {t: "A bald answer with too many decimal places earns only 1 mark — draw the tangent, use two clean points, and give 2–3 significant figures.", s: "Mark scheme"}
    ]
  },

  {
    id: "Ja23-2b2", topic: "1A", source: "WBI11 • Jan 2023 • Q2(b)(ii)", official: true, marks: 3, time: 4, kind: "explain",
    q: "<p>(ii) <b>Explain how a protease breaks down elastin.</b> (3)</p>",
    ms: [
      {text: "Active site (of the protease) {binds to / fits} {elastin / substrate}", marks: 1, hint: "ACCEPT an ES (enzyme–substrate) complex"},
      {text: "Activation energy is lowered (by the protease)", marks: 1, hint: "The enzyme lowers the activation energy of the reaction"},
      {text: "Peptide bonds are broken", marks: 1, hint: "DO NOT ACCEPT other named bonds (e.g. glycosidic) or “dipeptide/polypeptide bonds”"},
      {text: "By hydrolysis", marks: 1, hint: "Water is added to break the peptide bonds"}
    ],
    answer: "The <b>active site</b> of the protease fits the elastin (an enzyme–substrate complex forms), which <b>lowers the activation energy</b>, so the <b>peptide bonds</b> between the amino acids are broken <b>by hydrolysis</b>. (Any 3 of the 4 points score.)",
    pitfalls: [
      {t: "“Other named bonds” (e.g. glycosidic) are NOT accepted — elastin is a protein, so it is peptide bonds that are hydrolysed.", s: "Mark scheme"}
    ]
  },
  /* ============ 1A — Jan 2024 (Q4 water) ============ */

  {
    id: "J24-4a1", topic: "1A", source: "WBI11 • Jan 2024 • Q4(a)(i)", official: true, marks: 2, time: 3, kind: "explain",
    q: "<p>Water is an important molecule in living organisms. Water is a dipolar molecule that forms hydrogen bonds with other water molecules.</p>" +
       "<p>(i) <b>Explain the dipole nature of water.</b> (2)</p>",
    ms: [
      {text: "Oxygen (atom) is slightly negative and the hydrogens are slightly positive", marks: 1, hint: "State which atom is δ⁻ / δ⁺"},
      {text: "{Uneven charge distribution across the molecule} / uneven distribution of electrons / the oxygen pulls the electrons towards it", marks: 1, hint: "State WHY — unequal sharing of the bonding electrons"}
    ],
    answer: "Oxygen is more electronegative than hydrogen, so it <b>pulls the shared electrons in the O–H bonds towards itself</b> — an <b>uneven (unbalanced) distribution of charge</b>. The oxygen is therefore slightly negative (δ⁻) and each hydrogen slightly positive (δ⁺); that separation of small charges is the dipole.",
    pitfalls: [
      {t: "Two separate marks: (1) which atom is δ⁻/δ⁺, and (2) why — the unequal electron sharing. Stating the result without the reason caps you at 1.", s: "Topic tip"}
    ]
  },

  {
    id: "J24-4a2", topic: "1A", source: "WBI11 • Jan 2024 • Q4(a)(ii)", official: true, marks: 1, time: 2, kind: "diagram",
    q: "<p>(ii) The diagram shows three water molecules. <b>Complete the diagram to show a hydrogen bond between two water molecules.</b> (1)</p>",
    ms: [
      {text: "A line drawn between an O of one molecule and an H of another molecule (if more than one H-bond is drawn, ALL must be correct and use different atoms on both molecules)", marks: 1, hint: "From the δ⁻ O of one molecule to a δ⁺ H of a neighbouring molecule"}
    ],
    answer: "Draw a (dotted) hydrogen bond from the <b>δ⁻ oxygen of one water molecule to a δ⁺ hydrogen of a neighbouring water molecule</b>. (If you draw more than one H-bond, every one must be correct — O to H on different molecules, using different atoms on both molecules.)",
    pitfalls: [
      {t: "It is O→H, not O→O or H→H — a hydrogen bond is between the δ⁻ O of one molecule and a δ⁺ H of another.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-4b", topic: "1A", source: "WBI11 • Jan 2024 • Q4(b)", official: true, marks: 1, time: 2, kind: "diagram",
    q: "<p>Water plays a role as a solvent. Sodium chloride dissolves in water. The diagram shows a sodium ion (Na⁺).</p>" +
       "<p><b>Complete the diagram to show the arrangement of two water molecules around a sodium ion when it is dissolved.</b> (1)</p>",
    ms: [
      {text: "Water molecules clustered around the Na⁺ with the O facing the Na⁺ and the H's facing away (any number of water molecules, but ALL must be correct; charges, if shown, must be correct)", marks: 1, hint: "Opposites attract: δ⁻ O faces the positive ion"}
    ],
    answer: "Draw the two water molecules with their <b>δ⁻ oxygen atoms facing the Na⁺ ion</b> and the <b>δ⁺ hydrogens pointing away</b>. (Overlapping circles or lines touching the ion are acceptable; any charges shown must be correct — δ⁻ on O, δ⁺ on H.)",
    pitfalls: [
      {t: "Opposite charges attract — the δ⁻ oxygens face the positive ion. Getting the orientation backwards loses the mark.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-4c", topic: "1A", source: "WBI11 • Jan 2024 • Q4(c)", official: true, marks: 4, time: 5, kind: "describe",
    q: "<p>Temperature affects the solubility of chemicals in water. The graph shows the effect of temperature on the solubility of four chemicals, A, B, C and D (A: roughly linear rise from about 7 to about 85 g per 100 g of water; B: steep rise to a maximum at 32 °C, then falls from about 37 to about 43 g; C: essentially flat at about 36 g; D: falls from about 17 to about 1 g).</p>" +
       "<p><b>Describe the effects of temperature on the solubility of these chemicals.</b> (4)</p>",
    ms: [
      {text: "(A) (an increase in temperature) (linearly) increases the solubility", marks: 1, hint: "Describe A's trend"},
      {text: "(B) (an increase in temperature up to 32 °C) (exponentially) increases the solubility and then decreases it", marks: 1, hint: "Describe B's rise-then-fall, with the 32 °C peak"},
      {text: "(C) (an increase in temperature can have) a slight increase on the solubility", marks: 1, hint: "Describe C's near-flat trend"},
      {text: "(D) (an increase in temperature) decreases the solubility", marks: 1, hint: "Describe D's fall"},
      {text: "Statement that different chemicals have different solubilities at different temperatures", marks: 1, hint: "ANY 4 of these 5 points score"}
    ],
    answer: "For <b>A</b>, increasing temperature (roughly) <b>linearly increases</b> solubility (from about 7 to about 85 g per 100 g of water). For <b>B</b>, solubility <b>increases steeply up to 32 °C and then decreases</b>. For <b>C</b> there is only a <b>slight increase</b> (staying near 36 g). For <b>D</b>, solubility <b>decreases</b> as temperature rises. Overall, <b>different chemicals have different solubilities at different temperatures</b>. (Any 4 of the 5 points score.)",
    pitfalls: [
      {t: "“Describe” = for EACH chemical: what happens to its solubility as temperature rises (increases / decreases / little change), with values. Don’t add causes — there are no marks for them.", s: "Topic tip"}
    ]
  },
  /* ============ 1B — MAMMALIAN TRANSPORT: topic test bank ============ */

  {
    id: "U1", topic: "1B", source: "Topic test bank • Atherosclerosis", title: "Atherosclerosis → myocardial infarction", marks: 6, official: false,
    q: "Explain how atherosclerosis can lead to a myocardial infarction (heart attack). (6)",
    ms: [
      "Endothelium of an artery is damaged (endothelial dysfunction)",
      "White blood cells / macrophages move into the wall and accumulate (inflammatory response)",
      "Cholesterol / LDLs accumulate to form an atheroma",
      "Calcium salts + fibrous tissue harden it into a plaque",
      "Lumen narrows AND the wall loses elasticity",
      "Plaque ruptures → collagen exposed → thromboplastin released (clotting cascade)",
      "A thrombus forms in a coronary artery",
      "Blood flow blocked → heart muscle starved of oxygen / glucose",
      "Cardiac muscle cells cannot carry out aerobic respiration and die"
    ],
    answer: "<p><b>1.</b> Atherosclerosis begins when the <b>endothelium of an artery is damaged</b> (by high blood pressure, smoking or high cholesterol). <b>2.</b> This triggers an <b>inflammatory response</b> — <b>white blood cells / macrophages move into the wall and accumulate</b> there. <b>3.</b> They accumulate <b>cholesterol and LDLs, forming an atheroma</b>. <b>4.</b> <b>Calcium salts and fibrous tissue</b> then harden it into a <b>plaque</b>. <b>5.</b> The plaque <b>narrows the lumen</b> and the <b>wall loses elasticity</b>. <b>6.</b> If the plaque <b>ruptures</b>, collagen is exposed and <b>thromboplastin is released</b>, starting the clotting cascade. <b>7.</b> A <b>thrombus forms in a coronary artery</b>, blocking the flow. <b>8.</b> Heart muscle is then <b>starved of oxygen and glucose</b>, so <b>9.</b> its cells <b>cannot carry out aerobic respiration</b> and die — a <b>myocardial infarction</b>.</p>",
    pitfalls: [
      { t: "Always name the CORONARY ARTERY — “a vessel is blocked” is too vague.", s: "Dataset" },
      { t: "Finish the chain at aerobic respiration failing — “the heart stops working” is not precise enough.", s: "Dataset" },
      { t: "Keep atherosclerosis (slow plaque build-up) separate from thrombosis (sudden clot after rupture).", s: "Dataset" }
    ]
  },

  {
    id: "U2", topic: "1B", source: "Topic test bank • Vessels", title: "Artery vs capillary", marks: 4, official: false,
    q: "Compare the structural adaptations of an artery and a capillary in relation to their functions. (4)",
    ms: [
      "Artery: thick wall (smooth muscle + collagen + elastic) WHEREAS capillary: wall one cell thick (single layer of endothelium)",
      "Artery: elastic fibres stretch and recoil to maintain pressure WHEREAS capillary: none",
      "Artery: narrow lumen maintains high pressure WHEREAS capillary: ~7–8 µm lumen — RBCs pass in single file, slowing flow for exchange",
      "Capillary: pores in the wall let plasma out to form tissue fluid WHEREAS artery: no pores"
    ],
    answer: "<p>An <b>artery has a thick wall of smooth muscle, collagen and elastic fibres</b>, <b>whereas a capillary wall is a single layer — one cell thick — of endothelium</b>, a very short diffusion distance. The artery's <b>elastic fibres stretch during systole and recoil in diastole to maintain pressure</b>, <b>whereas capillaries have none</b>. The artery's <b>narrow lumen maintains high pressure</b>, <b>whereas the capillary's ~7–8 µm lumen forces red cells into single file, slowing the flow</b> to maximise contact time for exchange. Capillaries also have <b>pores that let plasma leak out to form tissue fluid</b>, which <b>arteries lack</b>.</p>",
    pitfalls: [
      { t: "Compare properly — link artery AND capillary in the same sentences with whereas / in contrast; two separate descriptions score poorly (June 2023 ER).", s: "Examiner report" },
      { t: "Capillary walls are ONE CELL THICK — never “cell walls” (that's plant tissue).", s: "Dataset" }
    ]
  },

  {
    id: "U3", topic: "1B", source: "Topic test bank • Haemoglobin", title: "The Bohr effect in exercise", marks: 4, official: false,
    q: "Explain the significance of the Bohr effect during intense physical exercise. (4)",
    ms: [
      "Exercise → more (aerobic) respiration → more CO2 produced in the muscles",
      "CO2 forms carbonic acid → lower pH / more H+ ions",
      "H+ binds to haemoglobin, changing its tertiary structure",
      "Hb's affinity for O2 FALLS — the curve shifts down and to the RIGHT",
      "More O2 unloaded at the respiring muscles → aerobic respiration continues (less lactic acid / less fatigue)"
    ],
    answer: "<p>During intense exercise <b>respiration in the muscles increases, so more CO<sub>2</sub> is produced</b>. <b>The CO<sub>2</sub> forms carbonic acid, which lowers the pH (more H<sup>+</sup> ions)</b>. <b>H<sup>+</sup> ions bind to haemoglobin, changing its tertiary structure</b>, so <b>its affinity for oxygen falls — the dissociation curve shifts down and to the right (the Bohr effect)</b> — and <b>more oxygen is unloaded to the respiring muscles, so aerobic respiration continues</b> and fatigue is delayed.</p>",
    pitfalls: [
      { t: "High CO2 shifts the curve RIGHT (lower affinity) — the most common direction error.", s: "Dataset" },
      { t: "Say “affinity decreases” — “holds on tighter / looser” is imprecise.", s: "Dataset" }
    ]
  },
  /* ============ 1B — June 2023 (Q2 heart cycle, Q5 stents/bont tick) ============ */

  {
    id: "J23-2", topic: "1B", source: "WBI11 • June 2023 • Q2(b)–(c)", title: "Cardiac cycle: pressure & volume data", marks: 4, official: true,
    q: "The graphs show how the pressure and volume of blood in the left ventricle change during the cardiac cycle." +
      "<table class='mini'><tr><th>Time (s)</th><th>Pressure in left ventricle (kPa)</th><th>Volume of blood in left ventricle (cm³)</th></tr>" +
      "<tr><td>0.0</td><td>0.6</td><td>10</td></tr><tr><td>0.1</td><td>1.8</td><td>122</td></tr><tr><td>0.2</td><td>8.5</td><td>125</td></tr>" +
      "<tr><td>0.3</td><td>15.2</td><td>76</td></tr><tr><td>0.4</td><td>14.0</td><td>55</td></tr><tr><td>0.5</td><td>0.2</td><td>65</td></tr>" +
      "<tr><td>0.6</td><td>0.2</td><td>99</td></tr><tr><td>0.7</td><td>0.2</td><td>104</td></tr><tr><td>0.8</td><td>1.2</td><td>115</td></tr>" +
      "<tr><td>0.9</td><td>0.3</td><td>123</td></tr><tr><td>1.0</td><td>14.0</td><td>95</td></tr><tr><td>1.1</td><td>14.0</td><td>57</td></tr>" +
      "<tr><td>1.2</td><td>0.2</td><td>51</td></tr><tr><td>1.3</td><td>—</td><td>95</td></tr></table><br>" +
      "(b) Calculate the time for one cardiac cycle. (1) (c) The volume of blood in the left ventricle changes during the cardiac cycle. Explain these changes. (3)",
    ms: [
      "(b) 0.7–0.76 s — any value up to 3 decimal places in this range (no other values)",
      "(c) Volume INCREASES during atrial systole — the (left) atrium contracts, squeezing its blood into the ventricle",
      "(c) Volume DECREASES during ventricular systole — the ventricles contract and blood is pumped out (into the aorta)",
      "(c) Volume INCREASES (again) during diastole — the ventricle relaxes and starts to fill"
    ],
    answer: "<p><b>(b)</b> The pressure and volume pattern repeats every <b>0.7 s</b> (e.g. from the 15.2 kPa systolic peak at 0.3 s to the next peak at 1.0 s), so one cardiac cycle = <b>0.7 s</b> — any value <b>0.7–0.76 s to at most 3 decimal places</b> is accepted, nothing else. <b>(c)</b> Volume <b>increases during atrial systole</b> — the contracting atrium <b>squeezes its blood into the ventricle</b>. Volume then <b>decreases during ventricular systole</b> — the ventricles <b>contract and pump blood out into the aorta</b>. Finally volume <b>increases again during diastole</b> as the relaxing ventricle <b>starts to fill</b>.</p>",
    pitfalls: [
      { t: "(b): a common error was giving too many decimal places — 0.7 s, not 0.72333 s (June 2023 ER).", s: "Examiner report" },
      { t: "(c): mark point 3 (refilling during diastole) was the least awarded — don't forget it (June 2023 ER).", s: "Examiner report" },
      { t: "(c): many lost marks by just describing the graphs or narrating blood's journey — EXPLAIN the change with the stage of the cycle (June 2023 ER).", s: "Examiner report" },
      { t: "“Changes” → always write increase / decrease / no change (June 2023 ER tip).", s: "Examiner report" }
    ]
  },

  {
    id: "J23-2a", topic: "1B", source: "WBI11 • June 2023 • Q2(a)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>The graphs show how the pressure and volume of blood in the left ventricle change during the cardiac cycle; four points on the graphs are labelled P, Q, R and S.</p>" +
       "<p>(a) <b>Which letter indicates when the atrioventricular (mitral) valves close?</b></p>" +
       "<p>A P&nbsp;&nbsp;&nbsp;B Q&nbsp;&nbsp;&nbsp;C R&nbsp;&nbsp;&nbsp;D S</p>",
    ms: [
      {text: "C — R (the AV valves close at the start of ventricular systole, when ventricular pressure begins to rise above atrial pressure — just before the pressure spike)", marks: 1, hint: "Valve closure marks the onset of ventricular systole"}
    ],
    answer: "<b>C — R.</b> The atrioventricular (mitral) valves close at the <b>start of ventricular systole</b>, when the ventricles begin to contract and ventricular pressure begins to exceed atrial pressure — the moment just before the large pressure rise.",
    pitfalls: [
      {t: "AV valves close when ventricular pressure starts to exceed atrial pressure — at the onset of systole, not at the end of filling.", s: "Topic tip"}
    ]
  },

  {
    id: "J23-5a", topic: "1B", source: "WBI11 • June 2023 • Q5(a)", title: "Stents: damage → thrombin", marks: 2, official: true,
    q: "Stents widen a diseased coronary artery but can damage endothelial cells and trigger clotting. (a) Explain how damage to the endothelial cells results in the formation of thrombin. (2)",
    ms: [
      "Platelets {contain / release} thromboplastin",
      "Thromboplastin results in the formation of thrombin from prothrombin"
    ],
    answer: "<p>Platelets <b>contain — and release — thromboplastin</b> in response to the damage. Thromboplastin then <b>results in the formation of thrombin from prothrombin</b>. (Those are the two marks — describing plaque formation first, or the endothelium itself, is not credited.)</p>",
    pitfalls: [
      { t: "You MUST say the thromboplastin comes FROM (is contained in / released by) PLATELETS — mark 1 was frequently lost without it (June 2023 ER).", s: "Examiner report" },
      { t: "A high number of candidates wrote everything they knew about clotting — it doesn't cost marks but wastes time (June 2023 ER).", s: "Examiner report" }
    ]
  },

  {
    id: "J23-5c2", topic: "1B", source: "WBI11 • June 2023 • Q5(c)(ii)", title: "Variegin vs thrombin", marks: 2, official: true,
    q: "Variegin (a tick peptide) binds to the active site of thrombin and prevents blood clotting. (ii) Explain how variegin prevents blood clotting. (2)",
    ms: [
      "(If the active site is blocked) thrombin will NOT be able to convert fibrinogen into fibrin",
      "Without fibrin {the mesh won't form / less mesh forms} — platelets / blood cells are NOT trapped, so no clot"
    ],
    answer: "<p><b>If the active site is blocked, thrombin will not be able to convert fibrinogen into fibrin</b>. <b>Without fibrin the mesh won't form, so platelets and blood cells will not get trapped</b> — no clot. (Both marks need the NEGATIVE idea — what will NOT happen.)</p>",
    pitfalls: [
      { t: "Tell the NEGATIVE story: telling the positive story (fibrin IS formed, mesh IS formed) caps you at 1 mark — the MS needs “what will not happen” for both (June 2023 ER).", s: "Examiner report" },
      { t: "Repeating the stem (“therefore a clot would not form”) after the first point can leave you on 1 mark (June 2023 ER).", s: "Examiner report" }
    ]
  },
  /* ============ 1B — Jan 2023 (Q4 heart/drugs, Q7 yak) ============ */

  {
    id: "Ja23-4a", topic: "1B", source: "WBI11 • Jan 2023 • Q4(a)(ii)", title: "What makes Q an artery?", marks: 1, official: true,
    q: "(ii) Why is blood vessel Q classified as an artery?<br>A — it carries deoxygenated blood&nbsp;&nbsp;B — it carries oxygenated blood&nbsp;&nbsp;C — it carries blood away from the heart&nbsp;&nbsp;D — it carries blood back to the heart (1)",
    ms: [
      "C — an artery is a vessel that carries blood AWAY from the heart (oxygen content is irrelevant)"
    ],
    answer: "<p><b>C</b> — an artery is defined by <b>direction of flow: it carries blood away from the heart</b>. Oxygen content is irrelevant — the <b>pulmonary artery</b> is an artery even though it carries <b>deoxygenated</b> blood, which is the trap in A and B.</p>",
    pitfalls: [
      { t: "Direction of flow — not oxygenation — defines arteries vs veins.", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-4ai", topic: "1B", source: "WBI11 • Jan 2023 • Q4(a)(i)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>The diagram shows the internal structure of a mammalian heart, with blood vessels P, Q, R and S (P enters the right side, Q leaves the right side, R leaves the left side, S enters the left side) and valve T.</p>" +
       "<p>(i) <b>How many of the following are correct for blood vessel P?</b></p>" +
       "<ul><li>carries blood to the heart</li><li>has valves along its length</li><li>has an endothelial lining</li></ul>" +
       "<p>A 0&nbsp;&nbsp;&nbsp;B 1&nbsp;&nbsp;&nbsp;C 2&nbsp;&nbsp;&nbsp;D 3</p>",
    ms: [
      {text: "D — 3 (P is a vena cava: it carries blood to the heart, has valves along its length, and has an endothelial lining)", marks: 1,
       hint: "P = vena cava: to the heart ✓, valves along its length ✓, endothelial lining ✓ — all three true"}
    ],
    answer: "<b>D — 3.</b> P is a <b>vena cava</b>: it carries blood <b>to</b> the heart, it has <b>valves along its length</b> to stop backflow, and like all vessels it has an <b>endothelial lining</b> — so all three statements are correct.",
    pitfalls: [
      {t: "P = vena cava (into the right atrium): veins have valves, a wide lumen, thin walls — and an endothelial lining like every vessel.", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-4aiii", topic: "1B", source: "WBI11 • Jan 2023 • Q4(a)(iii)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>(iii) <b>Which blood vessel does the coronary artery branch from?</b></p>" +
       "<p>A P&nbsp;&nbsp;&nbsp;B Q&nbsp;&nbsp;&nbsp;C R&nbsp;&nbsp;&nbsp;D S</p>",
    ms: [
      {text: "C — R (the coronary artery branches from the AORTA; P is the vena cava, Q the pulmonary artery, S the pulmonary vein)", marks: 1, hint: "Coronary arteries arise from the aorta, just above the aortic valve"}
    ],
    answer: "<b>C — R, the aorta.</b> The coronary arteries branch from the aorta just above the aortic valve and supply the heart muscle itself.",
    pitfalls: []
  },

  {
    id: "Ja23-4aiv", topic: "1B", source: "WBI11 • Jan 2023 • Q4(a)(iv)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>(iv) <b>When in the cardiac cycle is valve T open?</b> (T is the bicuspid (mitral) valve)</p>" +
       "<p>A atrial systole and cardiac diastole&nbsp;&nbsp;&nbsp;B atrial systole only&nbsp;&nbsp;&nbsp;C cardiac diastole and ventricular systole&nbsp;&nbsp;&nbsp;D ventricular systole only</p>",
    ms: [
      {text: "A — the bicuspid (AV) valve is open during atrial systole AND during (cardiac) diastole; it is closed only during ventricular systole", marks: 1,
       hint: "AV valves are open whenever the ventricle is filling"}
    ],
    answer: "<b>A — atrial systole and cardiac diastole.</b> The bicuspid (mitral) AV valve is open during atrial systole (when the atrium squeezes blood into the ventricle) and stays open through diastole while the ventricle fills; it is <b>closed only during ventricular systole</b>, to stop backflow into the atrium.",
    pitfalls: [
      {t: "AV valves = open whenever the ventricle is filling (atrial systole + diastole); closed only in ventricular systole. Semilunar valves are the opposite.", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-4b", topic: "1B", source: "WBI11 • Jan 2023 • Q4(b)(ii)", title: "Cardiac cycle length", marks: 1, official: true,
    q: "Group 2, day 4: mean heart rate = 111 beats min⁻¹. (ii) Calculate the mean length of the cardiac cycle. (1)",
    ms: [
      "60 ÷ 111 = 0.54 s (accept 0.5 / 0.54 / 0.541)"
    ],
    answer: "<p>Cycle length = 60 ÷ heart rate = <b>60 ÷ 111 = 0.54 s</b> (0.5, 0.54 or 0.541 all accepted).</p>",
    pitfalls: [
      { t: "Learn it: cycle length (s) = 60 ÷ HR. Give a sensible number of figures — not 0.540540…", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-4bi", topic: "1B", source: "WBI11 • Jan 2023 • Q4(b)(i)", official: true, marks: 1, time: 1, kind: "calc",
    q: "<p>In an investigation on healthy volunteers, group 2 were given <b>atropine for 4 days followed by propranolol for 4 days</b>. Their mean heart rates were: no drug = 61.5, after 8 days = 97.5 beats min⁻¹.</p>" +
       "<p>(i) <b>Calculate the change in mean heart rate for group 2 after 8 days.</b> (1)</p>",
    ms: [
      {text: "97.5 − 61.5 = 32 beats min⁻¹", marks: 1, hint: "Change = final − initial, from the graph values"}
    ],
    answer: "<b>97.5 − 61.5 = 32 beats min⁻¹.</b>",
    pitfalls: [
      {t: "Change = final minus initial, using the graph values (61.5 → 97.5 for group 2). Include the unit.", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-4biii", topic: "1B", source: "WBI11 • Jan 2023 • Q4(b)(iii)", official: true, marks: 3, time: 5, kind: "comment",
    q: "<p>Group 1 were given propranolol for 4 days followed by atropine for 4 days; group 2 the reverse (mean heart rates, beats min⁻¹: group 1 ≈ 59.5 → ≈ 50.5 → ≈ 95; group 2 ≈ 61.5 → ≈ 111 → ≈ 97.5; error bars shown on the graph).</p>" +
       "<p>(iii) <b>Comment on the conclusions that can be drawn from this investigation.</b> (3)</p>",
    ms: [
      {text: "Atropine increases heart rate and propranolol decreases heart rate", marks: 1, hint: "Identify the effect of each drug"},
      {text: "Atropine increases heart rate whether given first or second (OR propranolol decreases heart rate whether given first or second)", marks: 1, hint: "The order of the drugs doesn't change each drug's effect"},
      {text: "Either regimen results in {the same / similar} (overall) heart rate", marks: 1, hint: "Both groups end at ≈ 95–97 beats min⁻¹"},
      {text: "Credit a suitable comment about the error bars (e.g. bars are close together so the drugs have similar effects / bars do not overlap on the last two days so the results are significant)", marks: 1, hint: "ANY 3 of these 4 points score"}
    ],
    answer: "Atropine <b>increases</b> heart rate and propranolol <b>decreases</b> it, and the effect of each drug is the <b>same whether it was given first or second</b>. Both regimens finish with a <b>similar overall heart rate</b> (≈ 95–97 beats min⁻¹), so the order of the drugs makes little difference to the end point. The error bars are close together (and don't overlap on the last two days), so the effects are similar/significant. (Any 3 of the 4 points score.)",
    pitfalls: [
      {t: "“Comment on the conclusions” = compare both groups + the order effect + the end point + the error bars — pick any three solid, evidence-based points.", s: "Topic tip"}
    ]
  },

  {
    id: "Ja23-7b", topic: "1B", source: "WBI11 • Jan 2023 • Q7(b)", title: "Yak lungs & heart", marks: 3, official: true,
    q: "Yaks live at high altitude (thin, low-oxygen air) and have large lungs and a large heart. (b) Explain why these adaptations help yaks survive at high altitudes. (3)",
    ms: [
      "Because large lungs would have a large volume of air (in the alveoli / taken in)",
      "Because there would be more alveoli / a larger surface area for gas exchange",
      "Because the large heart could pump more blood (at higher pressure)",
      "Therefore supplying cells with sufficient oxygen (for aerobic respiration)"
    ],
    answer: "<p>Because <b>large lungs hold a large volume of air in the alveoli</b>, and because <b>there would be more alveoli — a larger surface area for gas exchange</b>. <b>The large heart could pump more blood (at higher pressure)</b>, <b>therefore supplying the cells with sufficient oxygen</b> for aerobic respiration despite the thin air (any three of the four points score).</p>",
    pitfalls: [
      { t: "Link EVERY adaptation FORWARD to oxygen delivery — “large lungs” or “big heart” on their own are descriptions, not explanations.", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-7c3", topic: "1B", source: "WBI11 • Jan 2023 • Q7*(c)(iii)", title: "★ Yak blood at altitude", marks: 6, official: true,
    q: "Yak blood vs human blood (from the paper's table): yaks have 1.0×10<sup>13</sup> RBCs per dm<sup>3</sup> (humans 4.0–6.0×10<sup>6</sup>), smaller RBCs (43 fl vs 90 fl), more haemoglobin (136 g dm<sup>−3</sup> vs 12–18 as printed), and keep fetal haemoglobin for life. *(iii) Discuss why the blood of yaks enables these animals to live at high altitudes. Use all the information in this question. (6) — ★ question: structure logically (QWC).",
    ms: [
      "HIGH RBC CONCENTRATION → they carry high levels of oxygen",
      "…to the tissues for (aerobic) respiration, so the oxygen demands of the yaks can be met",
      "SMALL RBCs → surface area to volume ratio is high → oxygen can diffuse into the cells faster",
      "Each RBC probably carries less oxygen, BUT this is compensated by the large number of cells — smaller cells pack closer together / more cells in a small volume of blood",
      "HIGH Hb CONCENTRATION → high levels of oxygen can be carried, as each RBC can carry more oxygen (each Hb molecule can bind 4 oxygen molecules)",
      "FETAL Hb has a higher affinity for oxygen → can bind oxygen even at low partial pressures → carry more oxygen / higher % saturation of Hb with oxygen"
    ],
    answer: "<p><b>High red-cell concentration:</b> yaks' very high RBC concentration <b>carries high levels of oxygen to the tissues for aerobic respiration, so the oxygen demands of the yaks can be met</b> at altitude. <b>Small red cells:</b> the small size means the <b>surface area to volume ratio is high, so oxygen can diffuse into the cells faster</b> — each cell probably carries less oxygen, <b>but this is compensated by the huge number of cells, which pack closer together than larger ones</b>. <b>High haemoglobin concentration:</b> <b>high levels of oxygen can be carried because each red cell carries more oxygen — each haemoglobin molecule binds four oxygen molecules</b>. <b>Fetal haemoglobin:</b> it <b>has a higher affinity for oxygen, so it can bind oxygen even at the low partial pressures of high altitude — carrying more oxygen and keeping the percentage saturation of haemoglobin high</b>.</p>",
    levels: "Level 1 (1–2): simple links made between characteristics of blood and altitude — 1 mark = one comment about one characteristic; 2 marks = one comment about two characteristics. Level 2 (3–4): extended links — 3 marks = one comment about three characteristics; 4 marks = extended comments about one characteristic + a comment about one other characteristic. Level 3 (5–6): clear discussion on all aspects of blood and altitude — 5 marks = extended comments about two characteristics + a comment on the other two; 6 marks = extended comments about three aspects + a comment on the other characteristic.",
    pitfalls: [
      { t: "“Use ALL the information” — cover RBC concentration, RBC size, Hb concentration AND fetal Hb for Level 3 (mark scheme).", s: "Mark scheme" },
      { t: "The fetal-Hb point needs ALL THREE: higher affinity + low partial pressure + higher saturation (mark scheme).", s: "Mark scheme" },
      { t: "Don't skip the small-cell “but” — “each cell carries less oxygen but the numbers compensate” is itself a marking point.", s: "Mark scheme" }
    ]
  },
  /* ============ 1B — Jan 2024 (Q1 oxygen transport) ============ */

  {
    id: "J24-1", topic: "1B", source: "WBI11 • Jan 2024 • Q1", title: "Oxygen transport: complete the description", marks: 5, official: true,
    q: "Red blood cells transport oxygen to the cells of the body. Read through the following description of how oxygen is transported from the lungs to respiring cells, and complete it with the most appropriate word or words.<br><br>" +
      "Oxygen binds to ____________________ inside red blood cells.<br>" +
      "Oxygen binds to this molecule in the lungs where the partial pressure of oxygen is ____________________ compared with elsewhere in the body.<br>" +
      "The oxygenated blood returns to the heart in the blood vessel called the ____________________ and is pumped to the body by the part of the heart called the ____________________.<br>" +
      "In the tissues, the ability of this molecule to bind oxygen is affected by the higher concentration of carbon dioxide. This is called the ____________________ effect. (5)",
    ms: [
      "Blank 1: haemoglobin (ACCEPT haem / Hb / iron ion / Fe²⁺)",
      "Blank 2: HIGH (ACCEPT higher / above / greater / more)",
      "Blank 3: pulmonary vein (DO NOT ACCEPT artery / vena cava)",
      "Blank 4: left ventricle (ACCEPT left ventricle wall / muscle)",
      "Blank 5: Bohr (shift) (ACCEPT phonetic spellings — Boar, Bore, Bor, Boh)"
    ],
    answer: "<p>Blank 1 — <b>haemoglobin</b> (haem / Hb / iron ion / Fe²⁺ also accepted). Blank 2 — <b>high</b>: in the lungs the partial pressure of oxygen is high, so it binds there. Blank 3 — the <b>pulmonary vein</b> carries the oxygenated blood back to the heart (NOT an artery, NOT the vena cava). Blank 4 — the <b>left ventricle</b> (or its wall/muscle) pumps it out to the body. Blank 5 — the <b>Bohr</b> effect: higher CO<sub>2</sub> in the tissues lowers haemoglobin's affinity, so oxygen is released where it is needed.</p>",
    pitfalls: [
      { t: "“Artery” or “vena cava” for blank 3 is NOT accepted — the pulmonary VEIN is the oxygenated return (mark scheme).", s: "Mark scheme" },
      { t: "Say the lungs have a HIGH pO₂ — that gradient is what drives loading.", s: "Topic tip" }
    ]
  },
  /* ============ 1C — CARDIOVASCULAR DISEASE: topic test bank ============ */

  {
    id: "U4", topic: "1C", source: "Topic test bank • Antioxidants", title: "Observational studies vs supplement trials", marks: 4, official: false,
    q: "Explain why observational studies suggested vitamin C reduces CVD risk, but clinical trials with vitamin C supplements showed no significant reduction. (4)",
    ms: [
      "Observational studies show only a correlation — correlation is not causation",
      "High-vitamin-C eaters also eat more fruit/veg and live healthier lives (exercise, less smoking)",
      "Confounding variables (fibre, other antioxidants, lower saturated fat) explain the lower risk",
      "Supplements lack the whole-food matrix / synergy — isolated vitamin C behaves differently"
    ],
    answer: "<p>Observational studies show only a <b>correlation</b> between dietary vitamin C and lower CVD — <b>correlation is not causation</b>. People who eat a lot of vitamin C also <b>eat more whole fruit and vegetables and tend to exercise and smoke less</b>, so <b>confounding variables such as fibre, other antioxidants and lower saturated-fat intake</b> probably explain the lower risk. Supplement trials give <b>isolated synthetic vitamin C without the whole-food matrix or synergy</b>, so no significant effect is seen.</p>",
    pitfalls: [
      { t: "Never write that observational studies PROVE prevention.", s: "Dataset" },
      { t: "Name at least one confounding variable explicitly.", s: "Dataset" }
    ]
  },

  {
    id: "U5", topic: "1C", source: "Topic test bank • Drugs", title: "Statins vs antihypertensives", marks: 4, official: false,
    q: "Compare the mechanism of action, benefits and risks of statins and antihypertensives in treating CVD. (4)",
    ms: [
      "Statins block a liver enzyme in cholesterol synthesis WHEREAS antihypertensives dilate blood vessels / lower heart rate to reduce BP",
      "Statins lower blood LDL and plaque build-up WHEREAS antihypertensives reduce stress on the endothelium",
      "Both reduce the risk of atherosclerosis, thrombosis and MI",
      "Statins: muscle pain (myopathy) / liver damage WHEREAS antihypertensives: dizziness / fainting / dangerous low BP (hypotension)"
    ],
    answer: "<p><b>Statins inhibit a liver enzyme in cholesterol synthesis</b>, lowering blood LDL, <b>whereas antihypertensives dilate blood vessels or reduce heart rate to lower blood pressure</b>. <b>Statins therefore cut LDL and plaque build-up</b>, <b>whereas antihypertensives cut the stress on the artery lining (endothelium)</b>. <b>Both reduce the risk of atherosclerosis, thrombosis and MI</b> — but <b>statins can cause muscle pain (myopathy) and liver damage</b>, <b>whereas antihypertensives can cause dizziness, fainting and dangerously low blood pressure</b>.</p>",
    pitfalls: [
      { t: "Don't swap the mechanisms: statins ≠ BP drugs, antihypertensives ≠ cholesterol drugs.", s: "Dataset" },
      { t: "Name specific side effects (myopathy, hypotension) — “feeling unwell” scores nothing.", s: "Dataset" }
    ]
  },
  /* ============ 1C — June 2023 (Q5 bont tick, Q6 antioxidants, Q8 CVD) ============ */

  {
    id: "J23-5b", topic: "1C", source: "WBI11 • June 2023 • Q5(b)", title: "Risk of anticoagulants", marks: 1, official: true,
    q: "Patients with a stent are given anticoagulants. (b) Give one risk of treating patients with anticoagulants. (1)",
    ms: [
      "Person bleeds {too easily / uncontrollably / internally / excessively} — accepted: (severe/frequent) bruising, (prolonged/frequent) nosebleeds, heavy periods (in women), liver damage, kidney damage"
    ],
    answer: "<p>The patient may <b>bleed excessively, uncontrollably or internally</b> — e.g. severe or frequent bruising, prolonged nosebleeds, heavy periods (liver or kidney damage also accepted), because clotting is impaired.</p>",
    pitfalls: [
      { t: "A RISK (bleeding) ≠ a SIDE EFFECT (fainting) — side effects/symptoms cannot gain this mark (June 2023 ER).", s: "Examiner report" }
    ]
  },

  {
    id: "J23-6d", topic: "1C", source: "WBI11 • June 2023 • Q6(d)", title: "Why antioxidants matter", marks: 4, official: true,
    q: "Explain why dietary antioxidants are important. (4)",
    ms: [
      "Antioxidants reduce / neutralise free radicals (ACCEPT donate electrons to / break down / stabilise)",
      "Therefore {cell damage / damage to the lining of blood vessels / oxidative stress} is {reduced / prevented}",
      "Therefore {plaque / atheroma} formation is {reduced / prevented}",
      "Therefore {cardiovascular disease / CVD / heart disease / heart attack / atherosclerosis / stroke} is reduced"
    ],
    answer: "<p><b>Mark 1:</b> antioxidants <b>reduce / neutralise free radicals</b> (donating electrons to them). <b>Mark 2:</b> so <b>cell damage, damage to the lining of blood vessels and oxidative stress are reduced or prevented</b>. <b>Mark 3:</b> so <b>plaque / atheroma formation is reduced</b>. <b>Mark 4:</b> so <b>cardiovascular disease / heart disease / atherosclerosis / stroke is reduced</b>. (You can equally tell marks 2–4 the other way — what the free radicals WOULD do — and still score.)</p>",
    pitfalls: [
      { t: "Build the full chain: radicals → vessel damage → plaque → CVD. Stopping at “neutralises free radicals” leaves 3 marks behind.", s: "Topic tip" },
      { t: "The mark scheme ACCEPTS the converse (describing what free radicals do) for the last three marks — use whichever direction you're more confident in (mark scheme).", s: "Mark scheme" }
    ]
  },

  {
    id: "J23-6e1", topic: "1C", source: "WBI11 • June 2023 • Q6(e)(i)", official: true, marks: 1, time: 2, kind: "calc",
    q: "<p>The graph shows the mean antioxidant activity of extracts from insects and arachnids (a.u. per 100 g: black tarantulas 0.05, black scorpions 0.10, giant water bugs 0.27, silkworms 1.00, crickets 1.90, African caterpillars 1.95, grasshoppers 2.30).</p>" +
       "<p>(i) The antioxidant activity of orange juice is 0.80 a.u. per 100 g. <b>Calculate how many times more antioxidant activity there is in 100 g of grasshopper extract. Give your answer to two significant figures.</b> (1)</p>",
    ms: [
      {text: "2.30 ÷ 0.80 = 2.9 (ACCEPT × 2.9 / 2.9× / 2.9 times — DO NOT ACCEPT 2.90 or any other value)", marks: 1, hint: "2 s.f. means 2.9 — “2.90” is 3 s.f. and is rejected"}
    ],
    answer: "<b>2.30 ÷ 0.80 = 2.875 → 2.9</b> (to two significant figures). So grasshopper extract has 2.9 × the antioxidant activity of orange juice. (Writing “2.90” loses the mark — that is three significant figures.)",
    pitfalls: [
      {t: "“Two significant figures” — the answer must be 2.9, NOT 2.90 (June 2023 MS rejects 2.90).", s: "Mark scheme"}
    ]
  },

  {
    id: "J23-6e2", topic: "1C", source: "WBI11 • June 2023 • Q6(e)(ii)", official: true, marks: 1, time: 2, kind: "calc",
    q: "<p>(ii) <b>Calculate the percentage difference between the antioxidant activity in black scorpions (0.10 a.u. per 100 g) and crickets (1.90 a.u. per 100 g).</b> (1)</p>",
    ms: [
      {text: "180 / 1800 / 95 / 94.7 / 94.74 (%)", marks: 1,
       hint: "Standard % difference = |1.90−0.10| ÷ mean(1.90, 0.10) × 100 = 1.80 ÷ 1.00 × 100 = 180%; the MS also credits the one-sided versions"}
    ],
    answer: "<b>|1.90 − 0.10| ÷ ((1.90 + 0.10) ÷ 2) × 100 = 1.80 ÷ 1.00 × 100 = 180%</b>. (The MS also accepts 1800% — difference ÷ the scorpion value — and 95 / 94.7 / 94.74% — difference ÷ the cricket value.)",
    pitfalls: [
      {t: "Percentage difference is normally difference ÷ the MEAN of the two values (180%) — but this MS credits the one-sided versions too (1800%, 94.7%).", s: "Mark scheme"}
    ]
  },

  {
    id: "J23-6e3", topic: "1C", source: "WBI11 • June 2023 • Q6(e)(iii)", official: true, marks: 3, time: 5, kind: "comment",
    q: "<p>The organisms: black tarantulas (arachnid, eat animals, 0.05), black scorpions (arachnid, eat animals, 0.10), giant water bugs (insect, eat animals, 0.27), silkworms (insect, eat plants, 1.00), crickets (insect, eat plants, 1.90), African caterpillars (insect, eat plants, 1.95), grasshoppers (insect, eat plants, 2.30) — values are mean antioxidant activity, a.u. per 100 g.</p>" +
       "<p>(iii) <b>Comment on the results of this investigation. Use the information in the table and the graph to support your answer.</b> (3)</p>",
    ms: [
      {text: "Different organisms contain different levels of antioxidant activity", marks: 1, hint: "Overall statement of variation"},
      {text: "(Overall) plant-eating organisms have more antioxidant activity (than animal-eating organisms)", marks: 1, hint: "Plant-eaters 1.00–2.30 vs animal-eaters 0.05–0.27"},
      {text: "(Overall) insects have more antioxidant activity (than arachnids)", marks: 1, hint: "Insects 0.27–2.30 vs arachnids 0.05–0.10"},
      {text: "There is more variation in the antioxidant activity in plant-eating organisms (than animal-eating organisms)", marks: 1, hint: "ANY 3 of these 4 points score"}
    ],
    answer: "<b>Different organisms contain different levels of antioxidant activity.</b> Overall, <b>plant-eating organisms (1.00–2.30) have more</b> antioxidant activity <b>than animal-eating ones (0.05–0.27)</b>, and overall <b>insects (0.27–2.30) have more than arachnids (0.05–0.10)</b>. There is also <b>more variation among the plant-eating organisms</b> than the animal-eating ones. (Any 3 of the 4 points score.)",
    pitfalls: [
      {t: "Use BOTH the table (diet/organism type) and the graph (values): “plant-eaters > animal-eaters” and “insects > arachnids” need the actual numbers behind them.", s: "Topic tip"}
    ]
  },

  {
    id: "J23-8a", topic: "1C", source: "WBI11 • June 2023 • Q8(a)", title: "Which risks ignore lifestyle?", marks: 1, official: true,
    q: "CVD risk calculators use: age, blood pressure, smoking, total cholesterol, HDL cholesterol. (a) How many of these risk factors are NOT influenced by lifestyle?<br>A — 1&nbsp;&nbsp;B — 2&nbsp;&nbsp;C — 3&nbsp;&nbsp;D — 4 (1)",
    ms: [
      "A — 1 (age only; blood pressure, smoking and both cholesterol measures respond to lifestyle)"
    ],
    answer: "<p><b>A — 1.</b> Only <b>age</b> is not influenced by lifestyle. <b>B, C and D are incorrect because age is not influenced by lifestyle</b> — and blood pressure, smoking and cholesterol can all be modified by diet, exercise and stopping smoking.</p>",
    pitfalls: [
      { t: "BP and cholesterol feel “medical”, but both respond to diet, exercise, smoking and alcohol — so they ARE lifestyle-modifiable.", s: "Topic tip" }
    ]
  },

  {
    id: "J23-8b", topic: "1C", source: "WBI11 • June 2023 • Q8*(b)", title: "★ Are the risk calculators any good?", marks: 6, official: false,
    q: "Two calculators (RAC-1, RAC-2) estimate 10-year CVD risk. RAC-1 asks for age, BP, smoking, total cholesterol. RAC-2 asks for age, BP, total cholesterol and HDL (but not smoking)." +
      "<table class='mini'><tr><th>Information</th><th>RAC-1</th><th>RAC-2</th></tr>" +
      "<tr><td>Age</td><td>✓</td><td>✓</td></tr><tr><td>Blood pressure</td><td>✓</td><td>✓</td></tr>" +
      "<tr><td>Smoking</td><td>✓</td><td>✗</td></tr><tr><td>Total cholesterol</td><td>✓</td><td>✓</td></tr>" +
      "<tr><td>HDL cholesterol</td><td>✗</td><td>✓</td></tr></table><br>" +
      "*(b) Explain the effectiveness of these two calculators in assessing risk, and whether other factors should be considered. (6) — ★ question: structure your answer logically (QWC).",
    ms: [
      "Both calculators use genuine risk factors — age, blood pressure, total cholesterol (plus smoking or HDL)",
      "Risk increases with age (more time for damage to accumulate; arteries stiffen)",
      "High blood pressure damages the artery wall / endothelium → atheroma formation",
      "Smoking is a major modifiable risk factor (raises BP, damages endothelium)",
      "More blood cholesterol → more plaque; HDL lets you estimate the HDL:LDL ratio, which affects risk",
      "Each calculator misses one of the other's factors — RAC-1 has no HDL, RAC-2 has no smoking",
      "Other factors NOT asked about: salt, alcohol, diabetes, obesity/BMI, inactivity, genetics / family history, stress",
      "Because key factors are missing, the estimates can be inaccurate / underestimate true risk",
      "Effectiveness depends on the person giving accurate, honest answers (BP / cholesterol / HDL are often guessed)"
    ],
    answer: "<p><b>Factors the calculators use:</b> both include genuine risk factors — risk <b>increases with age</b>; <b>high blood pressure damages the artery wall</b>, promoting atheroma; <b>smoking</b> is a major modifiable risk factor; <b>more blood cholesterol means more plaque</b>; and <b>HDL</b> allows the <b>HDL:LDL ratio</b> to be estimated. <b>What both miss:</b> neither asks about <b>salt, alcohol, diabetes, obesity, inactivity or family history</b>, so with key factors absent the calculators can <b>underestimate the true risk</b> — and they only work if the person <b>reports their values honestly and accurately</b>, when in fact BP and cholesterol are often guessed. <b>RAC-1 vs RAC-2:</b> RAC-1 has no HDL data while RAC-2 has no smoking data; since smoking is a very large risk factor, <b>RAC-1 is arguably the more effective calculator</b>, though neither is fully effective on its own.</p>",
    levels: "Indicative (official grid not recoverable from the public PDF): Level 3 (5–6) = sustained, logically linked discussion of ALL THREE aspects — the factors each calculator uses, the factors both miss, and the RAC-1 vs RAC-2 comparison. Level 2 (3–4) = two or more aspects with some linkage. Level 1 (1–2) = isolated facts / description.",
    pitfalls: [
      { t: "The official mark scheme and level grid for this question are NOT readable in the public PDF — the points above are INDICATIVE, compiled from the question's own data and standard marking conventions.", s: "Topic tip" },
      { t: "It's a ★ (QWC) question: order the discussion logically — factors used → factors missing → RAC-1 vs RAC-2 — and link ideas with specialist vocabulary.", s: "Topic tip" }
    ]
  },

  {
    id: "J23-8c1", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(i)", title: "Why risk gets underestimated", marks: 2, official: false,
    q: "(c)(i) Explain why the information entered by a person may lead to an underestimate of their 10-year risk of developing CVD. (2)",
    ms: [
      "The person may not know their BP / cholesterol / HDL and guesses — or under-reports smoking, drinking and diet",
      "Risk factors the calculators ignore (e.g. diabetes, family history, inactivity) mean the true risk is higher"
    ],
    answer: "<p>A person may <b>guess values they don't actually know</b> — blood pressure, cholesterol, HDL — or <b>under-report smoking, alcohol and diet</b>, giving falsely reassuring inputs. On top of that, <b>factors the calculators ignore (diabetes, family history, inactivity)</b> mean the <b>true risk is higher</b> than the calculated one.</p>",
    pitfalls: [
      { t: "Points here are indicative — the official MS for this question is not readable in the public PDF (compiled from the Q8 mark-scheme themes).", s: "Topic tip" }
    ]
  },

  {
    id: "J23-8c2", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(ii)", title: "Not suitable for everybody?", marks: 2, official: false,
    q: "(c)(ii) Suggest why these two risk calculators may not be suitable for everybody to use. (2)",
    ms: [
      "Validated only for certain groups / age ranges / populations — risk differs outside these",
      "Not suitable for people already diagnosed with CVD or diabetes, or on medication — different risk profile"
    ],
    answer: "<p>The calculators are <b>validated only for particular populations and age ranges</b>, so they may mislead children, the very elderly or unrepresented groups. They are also <b>unsuitable for people who already have CVD or diabetes (or take related medication)</b>, whose risk follows a different pattern.</p>",
    pitfalls: [
      { t: "Points here are indicative — the official MS for this question is not readable in the public PDF (compiled from the Q8 mark-scheme themes).", s: "Topic tip" }
    ]
  },

  {
    id: "J23-8c3", topic: "1C", source: "WBI11 • June 2023 • Q8(c)(iii)", title: "Why a 10-year window?", marks: 1, official: false,
    q: "(c)(iii) Suggest why these risk calculators estimate the 10-year risk of developing CVD. (1)",
    ms: [
      "CVD develops slowly over many years — a fixed 10-year window is a meaningful timeframe (and risk changes with age / lifestyle over time)"
    ],
    answer: "<p><b>CVD develops slowly over many years</b>, so expressing the risk over a <b>fixed 10-year window</b> is meaningful — and a person's risk <b>changes with age and lifestyle</b> over that time.</p>",
    pitfalls: [
      { t: "Point is indicative — the official MS for this question is not readable in the public PDF.", s: "Topic tip" }
    ]
  },
  /* ============ 1C — Jan 2023 (Q5 diet & CVD risk) ============ */

  {
    id: "Ja23-5a1", topic: "1C", source: "WBI11 • Jan 2023 • Q5(a)(i)", title: "Portfolio diet profile", marks: 1, official: true,
    q: "The Portfolio diet lowers LDLs and other CVD risk factors. (i) Which row describes its cholesterol and antioxidant content?<br>A — high / high&nbsp;&nbsp;B — high / low&nbsp;&nbsp;C — low / high&nbsp;&nbsp;D — low / low (1)",
    ms: [
      "C — low cholesterol, high antioxidant"
    ],
    answer: "<p><b>C</b> — a diet that lowers CVD risk must be <b>low in cholesterol and high in antioxidants</b>. A and B are wrong because <b>high cholesterol would increase the risk</b>; D is wrong because <b>high antioxidants help reduce the risk</b>.</p>",
    pitfalls: [
      { t: "Use the elimination logic in the mark scheme: high cholesterol = bad, high antioxidants = good.", s: "Mark scheme" }
    ]
  },

  {
    id: "Ja23-5a2", topic: "1C", source: "WBI11 • Jan 2023 • Q5(a)(ii)", title: "Name two dietary risk factors", marks: 1, official: true,
    q: "(ii) Name two other dietary risk factors that could be changed in this diet. (1)",
    ms: [
      "Any TWO of: salt • fibre • energy (content) • saturated fats • alcohol — BOTH correct answers needed for the 1 mark"
    ],
    answer: "<p>Any two from: <b>salt, fibre, energy content, saturated fats, alcohol</b> (e.g. less salt and less saturated fat). <b>Both</b> names must be correct for the single mark.</p>",
    pitfalls: [
      { t: "“Name two” for 1 mark = BOTH must be right — one correct answer scores zero (mark scheme).", s: "Mark scheme" }
    ]
  },

  {
    id: "Ja23-5b1", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(i)", title: "Why remove these women?", marks: 1, official: true,
    q: "Women with missing lifestyle information were removed from the study. (i) Suggest why. (1)",
    ms: [
      "The investigation may not be valid — lifestyle can affect the risk of CVD"
    ],
    answer: "<p>Because <b>lifestyle can affect the risk of CVD</b>, keeping women with missing lifestyle data would mean the <b>investigation may not be valid</b>.</p>",
    pitfalls: [
      { t: "Tie every exclusion to VALIDITY — that's the mark.", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-5b2", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(ii)", title: "Unrealistic energy estimates", marks: 2, official: true,
    q: "Some women gave unrealistic estimates of daily energy intake. (ii) Give two reasons why. (2)",
    ms: [
      "They did not want to admit to how much energy they consumed (ACCEPT embarrassed; knew they consumed too little/much)",
      "They had not kept a record of the food that they had eaten (ACCEPT did not know how much food they had eaten / information not available)",
      "They did not know the energy content of the different foods (ACCEPT did not know how to do it; they guessed — only if the other two are missing)"
    ],
    answer: "<p>They may have <b>not wanted to admit — been embarrassed about — how much energy they consumed</b>, or <b>had not kept a record of the food they had eaten</b>, so their estimates were guesses because <b>they did not know the energy content of the different foods</b> (any two of the three reasons score).</p>",
    pitfalls: [
      { t: "Self-reported diet data is unreliable: embarrassment + no records + not knowing food energy values. “They lied” alone is not one of the mark points.", s: "Mark scheme" }
    ]
  },

  {
    id: "Ja23-5b3", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(iii)", title: "Why exclude women with CVD?", marks: 2, official: true,
    q: "Women showing signs of CVD were removed from the study. (iii) Explain why. (2)",
    ms: [
      "Because the investigation was looking at the effect of this diet on the DEVELOPMENT of CVD",
      "These women were already developing the disease",
      "Therefore the investigation / data / conclusion would not be valid"
    ],
    answer: "<p>Because the investigation was <b>looking at the effect of this diet on the DEVELOPMENT of CVD</b>, and <b>these women were already developing the disease</b>, so the <b>data / conclusions would not be valid</b> (any two of the three points score).</p>",
    pitfalls: [
      { t: "Always tie exclusions back to the validity of the CONCLUSION, not just “it would be unfair”.", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-5b4", topic: "1C", source: "WBI11 • Jan 2023 • Q5(b)(iv)", title: "Percentage removed", marks: 1, official: true,
    q: "161,808 women started; 5,884 + 32,594 were removed. (iv) Calculate the percentage of all the women removed. (1)",
    ms: [
      "(5,884 + 32,594) ÷ 161,808 × 100 = 23.8% (accept 24 / 23.8 / 23.78 / 23.780)"
    ],
    answer: "<p><b>(5,884 + 32,594) ÷ 161,808 × 100 = 38,478 ÷ 161,808 × 100 = 23.8%</b> (24, 23.8, 23.78 or 23.780 all accepted).</p>",
    pitfalls: [
      { t: "Divide by the ORIGINAL 161,808 — not the intermediate group — and multiply by 100 for a percentage.", s: "Topic tip" }
    ]
  },

  {
    id: "Ja23-5c", topic: "1C", source: "WBI11 • Jan 2023 • Q5(c)", title: "Low saturated fat → less CVD", marks: 3, official: true,
    q: "(c) Explain why a diet that is low in saturated fat is likely to reduce the risk of CVD. (3)",
    ms: [
      "Because this results in less cholesterol (in the diet / in the blood) — ACCEPT less LDL / lower LDL: HDL",
      "Therefore less / no plaque, atheroma or blood clot",
      "So less likely to block / narrow the coronary artery",
      "Therefore blood will be able to continue flowing to the heart (cardiac) cells / tissue / muscle"
    ],
    answer: "<p>Because a low-saturated-fat diet <b>results in less cholesterol in the blood</b> (less LDL / lower LDL:HDL). <b>Therefore less plaque, atheroma or blood clot forms</b>. <b>So the coronary arteries are less likely to be blocked or narrowed</b>. <b>Therefore blood can continue flowing to the heart muscle</b>, with its oxygen and glucose, and CVD risk is reduced (any three of the four points score).</p>",
    pitfalls: [
      { t: "Name the CORONARY ARTERY and finish the chain at blood flow to the heart muscle — stopping at “less plaque” leaves marks behind.", s: "Topic tip" }
    ]
  },
  /* ============ 1C — Jan 2024 (Q5 CVD management, Q8 primates/lipids) ============ */

  {
    id: "J24-5a2", topic: "1C", source: "WBI11 • Jan 2024 • Q5(a)(ii)", title: "BMI from mass and height", marks: 1, official: true,
    q: "The BMI of a person can be calculated using the formula: BMI = mass in kg ÷ (height in m)². Which of the following is the BMI of a person who has a mass of 65 kg and a height of 165 cm?<br>A — 23&nbsp;&nbsp;B — 24&nbsp;&nbsp;C — 39&nbsp;&nbsp;D — 40 (1)",
    ms: [
      "B — 24 (65 ÷ 1.65² = 23.9 ≈ 24; convert cm → m BEFORE squaring)"
    ],
    answer: "<p><b>B.</b> 65 ÷ 1.65² = 65 ÷ 2.7225 = 23.9 ≈ <b>24</b>. A (23) is <b>this value rounded down</b>; C (39) comes from <b>dividing by the height (65 ÷ 1.65) instead of the height²</b>.</p>",
    pitfalls: [
      { t: "Convert 165 cm → 1.65 m BEFORE squaring — the unit slip is the whole trap.", s: "Topic tip" }
    ]
  },

  {
    id: "J24-5ai", topic: "1C", source: "WBI11 • Jan 2024 • Q5(a)(i)", official: true, marks: 1, time: 1, kind: "state",
    q: "<p>Obesity is one risk factor associated with CVD.</p>" +
       "<p>(i) <b>Name one other obesity indicator.</b> (1)</p>",
    ms: [
      {text: "Waist to hip ratio / skin fold thickness / waist (circumference) — IGNORE BMI (body mass index) / pinch test / mass / weight", marks: 1,
       hint: "BMI is the indicator already mentioned in the question, so it is ignored"}
    ],
    answer: "<b>Waist-to-hip ratio</b> (or skinfold thickness, or waist circumference) — not BMI, which is the indicator already given in the question.",
    pitfalls: [
      {t: "BMI is IGNORED here — the question asks for a DIFFERENT indicator, and BMI is the one already mentioned.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-5aiii", topic: "1C", source: "WBI11 • Jan 2024 • Q5(a)(iii)", official: true, marks: 1, time: 1, kind: "mcq",
    q: "<p>A person's BMI is used to put them into a weight category. A person with a BMI of 25 or higher, but less than 30, is considered overweight but not obese.</p>" +
       "<p>(iii) <b>Which describes the body mass of a person who is obese?</b></p>" +
       "<p>A BMI &gt; 30&nbsp;&nbsp;&nbsp;B BMI ≥ 30&nbsp;&nbsp;&nbsp;C BMI &lt; 30&nbsp;&nbsp;&nbsp;D BMI ≤ 30</p>",
    ms: [
      {text: "B — BMI ≥ 30 (A is incorrect because a person is obese at BMI 30; C is incorrect because an obese person's BMI is not below 30; D is incorrect because an obese person's BMI is not at or below 30)", marks: 1, hint: "30 itself is included in the obese category"}
    ],
    answer: "<b>B — BMI ≥ 30.</b> The overweight band is “25 or higher but less than 30”, so obesity starts at 30 <b>inclusive</b> — which is why A (strictly greater than 30) is wrong, and C and D are the opposite of the obesity category.",
    pitfalls: [
      {t: "“25 or higher but less than 30 = overweight” → obese = 30 or more. The boundary value 30 belongs to obesity.", s: "Topic tip"}
    ]
  },

  {
    id: "J24-5b", topic: "1C", source: "WBI11 • Jan 2024 • Q5(b)", title: "Two ways to lose weight", marks: 1, official: true,
    q: "People who are overweight or obese are encouraged to lose weight. State two ways in which a person could lose weight. (1)",
    ms: [
      "Decrease {calorie / energy / fat / sugar / carbohydrate} intake AND increase {exercise / activity} — i.e. use more energy than is consumed (calorie deficit)"
    ],
    answer: "<p><b>Reduce calorie / energy intake</b> (e.g. less fat, sugar or carbohydrate) <b>AND increase exercise / activity</b> — so the person <b>uses more energy than is consumed</b> (a calorie deficit). (Weight-reducing medication or a gastric band are also accepted.)</p>",
    pitfalls: [
      { t: "The answer must be in the form of a CHANGE — “eat less and exercise more”, not just “diet” or “exercise” (mark scheme NB).", s: "Mark scheme" },
      { t: "“Regular / daily exercise” on its own is IGNORED — pair the intake reduction with the activity increase.", s: "Mark scheme" }
    ]
  },

  {
    id: "J24-5cii", topic: "1C", source: "WBI11 • Jan 2024 • Q5(c)(ii)", official: true, marks: 2, time: 3, kind: "suggest",
    q: "<p>The amylase in saliva breaks down amylose into maltose. People with low levels of amylase in their saliva were found to lose weight more easily.</p>" +
       "<p>(ii) <b>Suggest why these people lost weight more easily.</b> (2)</p>",
    ms: [
      {text: "Because {starch / amylose} were not broken down as well", marks: 1, hint: "Less salivary amylase → less starch digestion in the mouth; DO NOT ACCEPT starch being absorbed"},
      {text: "Less {glucose / sugar} {to convert to fat / so fat broken down}", marks: 1, hint: "ACCEPT less sugar is absorbed / some starch lost in faeces"}
    ],
    answer: "With less salivary amylase, less <b>starch/amylose is broken down</b> into maltose/glucose, so <b>less glucose is available to be converted to fat</b> (and stored fat may be broken down instead) — so they lose weight more easily. (Accepted variants: less sugar is absorbed; some of the starch is lost in the faeces. DO NOT ACCEPT “starch is absorbed”.)",
    pitfalls: [
      {t: "The chain is: starch not broken down → less glucose → less conversion to fat. “Less food is absorbed” is too vague for the second mark.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-5di", topic: "1C", source: "WBI11 • Jan 2024 • Q5(d)(i)", official: true, marks: 2, time: 3, kind: "explain",
    q: "<p>An investigation found that people who lost a greater amount of weight had bacteria with increased rates of replication.</p>" +
       "<p>(i) <b>Explain why this finding can be described as a positive correlation.</b> (2)</p>",
    ms: [
      {text: "(Correlation) because a change in one variable is reflected by a change in another variable", marks: 1, hint: "Define what a correlation is"},
      {text: "(Positive) because as one factor increased, so did the other", marks: 1, hint: "Both variables increased together; references to “causes” are penalised"}
    ],
    answer: "It is a <b>correlation</b> because a change in one variable (the rate of bacterial replication) is reflected by a change in another (the amount of weight lost). It is <b>positive</b> because as the rate of replication <b>increased</b>, the weight loss also <b>increased</b> — both changes are increases. (Saying one variable “causes” the other is penalised — correlation is not causation.)",
    pitfalls: [
      {t: "Mark 1 = what a correlation IS (one variable changes with the other); mark 2 = why it is POSITIVE (both increase). Don't say one “causes” the other.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-5d2", topic: "1C", source: "WBI11 • Jan 2024 • Q5(d)(ii)", title: "Gut bacteria & weight loss", marks: 2, official: true,
    q: "The investigation found that people with greater weight loss had bacteria with increased rates of replication. (ii) Suggest why the rate of replication of the bacteria could affect weight loss. (2)",
    ms: [
      "{Replication / the bacteria} uses {energy / glucose / sugar} (in the digestive system)",
      "Therefore less energy is available {for absorption / to store as fat}"
    ],
    answer: "<p><b>Faster bacterial replication uses up energy (glucose / sugar) in the digestive system</b>. <b>Therefore less of the person's food energy is available for absorption or to be stored as fat</b> — so they lose more weight.</p>",
    pitfalls: [
      { t: "The mark is on ENERGY being used by the bacteria — “food” or “nutrients” are IGNORED (mark scheme).", s: "Mark scheme" }
    ]
  },

  {
    id: "J24-8a", topic: "1C", source: "WBI11 • Jan 2024 • Q8(a)", title: "Unsat fatty acid side chain", marks: 2, official: true,
    q: "Tropical sprue is a disorder that limits the absorption of nutrients into the blood. Consumption of unsaturated lipids has been proposed as a cause of tropical sprue. The diagram shows part of an unsaturated lipid — a glycerol backbone joined via ester groups to a C=O group and a five-carbon chain (the fatty-acid side chain). Complete the structure to show one possible structure of a fatty acid side chain of an unsaturated lipid. (2)",
    ms: [
      "At least one carbon–carbon DOUBLE bond (C=C) drawn in the side chain",
      "Rest of the diagram correct — remaining C–C single bonds and all H atoms added (Lewis structure)"
    ],
    answer: "<p><b>Mark 1:</b> draw <b>at least one C=C double bond</b> somewhere along the five-carbon chain — e.g. –CH₂–CH=CH–CH₂–CH₃-type chain attached to the C=O. <b>Mark 2:</b> keep the <b>rest of the diagram correct</b> — all other C–C bonds single and <b>every carbon completed with its H atoms</b>. (A double bond between C1 and C2, next to the C=O, is NOT accepted.)</p>",
    pitfalls: [
      { t: "A C=C between the first two carbons (adjacent to C=O) is rejected — put the double bond along the chain (mark scheme).", s: "Mark scheme" },
      { t: "“Rest of diagram correct” includes the H ATOMS — a bare carbon skeleton loses mark 2 (mark scheme).", s: "Mark scheme" }
    ]
  },

  {
    id: "J24-8b1", topic: "1C", source: "WBI11 • Jan 2024 • Q8(b)(i)", title: "Mean rate of lesion increase", marks: 1, official: true,
    q: "Primates fed cholesterol + saturated or unsaturated fatty acids were monitored for 60 months. Graph 1 — % of artery surface covered in lesions — saturated lipids: 16 months = 2%, 32 months = 18%, 60 months = 52%. (i) Calculate the mean rate of increase in the surface of arteries covered in lesions from 16 to 60 months in the primates given saturated lipids (graph 1). Answer ........ percentage per month. (1)",
    ms: [
      "(52 − 2) ÷ (60 − 16) = 50 ÷ 44 = 1.1 % per month (accept 1.1 / 1.14 / 1.136)"
    ],
    answer: "<p><b>(52 − 2) ÷ (60 − 16) = 50 ÷ 44 = 1.136 ≈ 1.1 % per month</b> (1.1, 1.14 or 1.136 all accepted).</p>",
    pitfalls: [
      { t: "Rate = CHANGE in value ÷ CHANGE in time — use 16→60 months (Δ44), not 0→60 (a bare 50÷60 loses the mark).", s: "Topic tip" }
    ]
  },

  {
    id: "J24-8b2", topic: "1C", source: "WBI11 • Jan 2024 • Q8(b)(ii)", title: "Ratio: sat vs unsat at 32 months", marks: 1, official: true,
    q: "Graph 2 — % of primates with atherosclerosis — saturated lipids: 16 months = 18%, 32 months = 32%, 60 months = 56%; unsaturated lipids: 16 months = 12%, 32 months = 22%, 60 months = 20%. (ii) Calculate the ratio of primates with atherosclerosis given saturated lipids to those given unsaturated lipids, at 32 months (graph 2). (1)",
    ms: [
      "32 : 22 = 1.5 : 1 (accept 1.45 : 1)"
    ],
    answer: "<p>At 32 months: <b>32 : 22 = 1.45 : 1</b> (accepted as <b>1.5 : 1</b> or <b>1.45 : 1</b>).</p>",
    pitfalls: [
      { t: "Ratios must be expressed as “x : 1” — a single value like 1.45 alone can lose the mark (June 2023 ER, same rule).", s: "Examiner report" }
    ]
  },

  {
    id: "J24-8b3", topic: "1C", source: "WBI11 • Jan 2024 • Q8(b)(iii)", title: "Atheroma area: mm² → µm²", marks: 2, official: true,
    q: "Graph 3 — mean area of atheroma at 60 months (mm²) — primates given saturated fats: males = 0.026, females = 0.004. (iii) Calculate the difference in the area of the atheromas in males compared with females, in primates given saturated fats (graph 3). Give your answer in µm². (2)",
    ms: [
      "0.026 − 0.004 = 0.022 mm²",
      "0.022 mm² × 10⁶ = 22,000 µm² (accept 2.2 × 10⁴ µm²)"
    ],
    answer: "<p><b>Mark 1:</b> 0.026 − 0.004 = <b>0.022 mm²</b>. <b>Mark 2:</b> since 1 mm = 1,000 µm, 1 mm² = 10⁶ µm², so 0.022 × 10⁶ = <b>22,000 µm²</b> (2.2 × 10⁴ µm²).</p>",
    pitfalls: [
      { t: "mm² → µm² is ×10⁶ (not ×100). A bald 22,000 still scores 2; “22 of any magnitude” or wrong standard-form format scores 1 (mark scheme).", s: "Mark scheme" }
    ]
  },

  {
    id: "J24-8biv", topic: "1C", source: "WBI11 • Jan 2024 • *Q8(b)(iv)", official: true, marks: 6, time: 8, kind: "level",
    q: "<p>Primates fed diets high in saturated or unsaturated lipids were studied over 60 months.</p>" +
       "<p><b>Graph 1 — % of artery surface covered in lesions vs age:</b> saturated: 16 months = 2, 32 = 18, 60 = 52; unsaturated: 4, 16, 38.</p>" +
       "<p><b>Graph 2 — % of primates with atherosclerosis:</b> saturated: 18, 32, 56; unsaturated: 12, 22, 20.</p>" +
       "<p><b>Graph 3 — mean atheroma area at 60 months (mm², error bars shown):</b> saturated: males 0.026, females 0.004; unsaturated: males 0.007, females 0.0.</p>" +
       "<p>* (iv) <b>Use the graphs to comment on the effects of these two diets on the development of lesions in the coronary arteries, atherosclerosis and atheromas.</b> (6) — ★ QWC (quality of written communication) question.</p>",
    ms: [
      {text: "GRAPH 1: arteries have lesions with BOTH lipids; the % of surface covered increases with time for both, but the increase is GREATER over time with saturated lipids (52% vs 38% at 60 months) — the type of lipid in the diet influences lesion coverage", marks: 1,
       hint: "Description + conclusion for graph 1"},
      {text: "GRAPH 2: atherosclerosis occurs with both lipids; it is HIGHER with saturated lipids at all three ages (56% vs 20% at 60 months); the % increases with age for saturated lipids but age has a less clear effect with unsaturated lipids", marks: 1,
       hint: "Description + conclusion for graph 2"},
      {text: "GRAPH 3: atheromas are LARGER with saturated than unsaturated lipids in BOTH males and females (0.026 vs 0.007 mm²); males have atheromas of GREATER area than females whichever lipid — sex influences area too", marks: 1,
       hint: "Description + conclusion for graph 3"},
      {text: "The data are likely to be significant because the error bars do not overlap; the male data are more variable", marks: 1,
       hint: "Use the error bars; credit variability comment"},
      {text: "Data limitations: no error bars on graphs 1–2 / no statistical test → the data may not be {valid (no experimental detail) / repeatable (only done once) / significant}", marks: 1,
       hint: "Credit an evaluation of reliability/validity/significance of the data"},
      {text: "Level credit — see the level grid below: L1 = description of 1–2 graphs; L2 = description of 3 graphs / conclusion for 1 graph; L3 = conclusions for 2–3 graphs", marks: 1,
       hint: "Level 3 answers comment (conclude) on the effect of the dietary supplements using all three graphs"}
    ],
    levels: "Level 1 (1–2): simple description of data — 1 mark = description of data in one graph; 2 marks = description of data in two graphs. Level 2 (3–4): 3 marks = description of data in three graphs; 4 marks = conclusion for one graph. Level 3 (5–6): understanding of the graphs used to comment on the effect of the dietary supplements — 5 marks = conclusions for two graphs; 6 marks = conclusions for three graphs.",
    answer: "GRAPH 1 — lesions develop with <b>both</b> diets, but the percentage of artery surface covered increases far more with <b>saturated</b> lipids (2% → 52%) than with unsaturated (4% → 38%): the type of lipid in the diet influences lesion development. GRAPH 2 — atherosclerosis occurs with both lipids but is consistently <b>higher with saturated lipids at all three ages</b> (18→32→56% vs 12→22→20%): the percentage rises with age on saturated lipids, while age has a less clear effect on unsaturated lipids. GRAPH 3 — atheromas are <b>larger with saturated lipids in both sexes</b> (males 0.026 vs 0.007 mm²; females 0.004 vs 0.0) AND <b>larger in males than females</b> for both lipids — so sex also affects atheroma size; the male/female separation is likely significant because the error bars do not overlap, though the male data are more variable. <b>Conclusion:</b> a diet high in saturated lipids increases lesion coverage, the incidence of atherosclerosis and atheroma size compared with unsaturated lipids — though graphs 1–2 lack error bars and a statistical test, so those differences may not be proven significant.",
    pitfalls: [
      {t: "Level 3 = a CONCLUSION for each of the three graphs — 6 marks requires conclusions for all three, not just careful descriptions.", s: "Mark scheme"},
      {t: "Graphs 1–2 have no error bars and no statistical test — saying the data “may not be repeatable/significant” is itself a mark-scheme point.", s: "Mark scheme"}
    ]
  },

  {
    id: "J24-8bv", topic: "1C", source: "WBI11 • Jan 2024 • Q8(b)(v)", official: true, marks: 3, time: 5, kind: "discuss",
    q: "<p>(v) <b>Discuss the ethical issues relating to the use of primates and other animals in investigations such as this one.</b> (3)</p>",
    ms: [
      {text: "UNETHICAL: may cause {pain / harm / discomfort} / it is cruel", marks: 1, hint: "ACCEPT may cause health issues"},
      {text: "UNETHICAL: animals may die", marks: 1, hint: ""},
      {text: "UNETHICAL: animals should not be kept in captivity / being kept in captivity caused stress", marks: 1, hint: ""},
      {text: "UNETHICAL: animals unable to consent", marks: 1, hint: "ACCEPT against their will / they have no say / have not given permission / animals have their own rights"},
      {text: "ETHICAL: it is more ethical than experimenting on humans", marks: 1, hint: "ACCEPT humans are more important / should not harm or kill humans"},
      {text: "ETHICAL: primates are (more) similar to humans (than other animals)", marks: 1, hint: "So the results transfer better to humans"},
      {text: "ETHICAL: might improve {human / animal} health (in the future)", marks: 1, hint: "ANY 3 of these 7 points score"}
    ],
    answer: "<b>Unethical arguments:</b> the primates may experience pain, harm or stress (it is cruel); some may die from the diet or the disease; keeping animals in captivity for years is against their interests; and the animals cannot consent. <b>Ethical arguments:</b> using primates is more ethical than experimenting on humans; primates are closely similar to humans, so the results transfer better; and the research might improve human (or animal) health in the future. (Any 3 of the 7 points score — a “discuss” needs both sides.)",
    pitfalls: [
      {t: "“Discuss” = give points from BOTH sides — three one-sided points risk missing what the examiner is looking for.", s: "Topic tip"}
    ]
  }
  ]
};
/* non-browser contexts (headless tests) */
if (typeof globalThis !== "undefined") globalThis.TEST_FOCUS = TEST_FOCUS;
