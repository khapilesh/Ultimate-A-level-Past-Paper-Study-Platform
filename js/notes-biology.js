/* Expanded, original Biology notes mapped to the chapter outline supplied by the student.
   This supplements the concise revision points without replacing the question/test view. */
(function(){
  var extra = {
    U1T1:{sections:[
      {title:"Chemistry of life and water",intro:"Biological molecules are built from a small set of elements and assembled into structures whose shape and chemical properties determine their function.",points:[
        "Most biological molecules contain carbon, hydrogen and oxygen; proteins also contain nitrogen, and some amino acids contain sulfur. Phosphate groups add phosphorus to nucleotides, ATP and phospholipids.",
        "A monomer is a small subunit; a polymer contains many linked subunits. Condensation joins molecules and releases water; hydrolysis adds water to split a bond. These reactions are enzyme-controlled in cells.",
        "Water is polar: oxygen has a partial negative charge and the hydrogens partial positive charges. Hydrogen bonds between water molecules explain cohesion, surface tension and its unusually high specific heat capacity.",
        "As a solvent, water lets ions and polar molecules dissolve and move in cytoplasm, blood and xylem. Its high latent heat of vaporisation makes evaporation an effective cooling mechanism; ice is less dense than liquid water and floats, insulating aquatic habitats."
      ]},
      {title:"Carbohydrates 1 — monosaccharides and disaccharides",intro:"Monosaccharides are small, soluble sugars used in respiration and as the building blocks of larger carbohydrates.",points:[
        "Glucose has six carbons and occurs as α- and β-glucose; the two forms differ in the orientation of the hydroxyl group on carbon 1. Fructose and galactose are other hexose isomers; ribose is a pentose in RNA and ATP.",
        "A glycosidic bond forms by condensation between hydroxyl groups. The carbons that are joined determine the bond type: maltose is α-1,4 glucose–glucose; lactose is β-1,4 glucose–galactose; sucrose links glucose and fructose.",
        "Reducing sugars can donate electrons to Benedict’s reagent, reducing blue Cu²⁺ ions to an orange/brick-red copper(I) oxide precipitate when heated. Sucrose is non-reducing because its anomeric carbons are involved in the bond; hydrolyse with dilute acid, neutralise, then repeat the test."
      ]},
      {title:"Carbohydrates 2 — polysaccharides",intro:"Polysaccharides are long chains of monosaccharides. Their bonding and branching explain how they store energy or provide mechanical support.",points:[
        "Amylose is an unbranched α-glucose polymer with α-1,4 bonds; its chain coils into a compact helix. Amylopectin also has α-1,6 branch points, so enzymes can reach many chain ends and release glucose rapidly.",
        "Glycogen has α-1,4 chains and frequent α-1,6 branches. It is compact and insoluble, so it has little effect on water potential; its many ends permit rapid hydrolysis when animals need glucose.",
        "Cellulose is made of β-glucose joined by β-1,4 bonds. Alternate monomers are inverted, producing straight chains that hydrogen-bond side-by-side into microfibrils. The microfibrils resist stretching and help prevent plant cells bursting under turgor pressure.",
        "Iodine–potassium iodide is yellow-brown; a blue-black colour indicates starch. Cellulose is not identified by this iodine test."
      ]},
      {title:"Lipids and proteins",intro:"These molecules are not carbohydrate polymers, but their varied structures provide energy storage, membranes, catalysis and tissue structure.",points:[
        "A triglyceride forms when glycerol’s three hydroxyl groups react with three fatty-acid carboxyl groups, creating three ester bonds and releasing three water molecules. Hydrolysis reverses this reaction.",
        "Saturated fatty-acid chains contain no carbon–carbon double bonds and pack closely; cis-unsaturated chains have one or more kinks and pack less tightly. Phospholipids have two hydrophobic tails and a hydrophilic phosphate-containing head, making them amphipathic membrane molecules.",
        "Amino acids share an amino group, carboxyl group and central carbon but differ in their R group. Condensation between amino and carboxyl groups forms a peptide bond. The amino-acid sequence determines folding and the protein’s final shape.",
        "Biuret reagent changes from blue to lilac/purple when peptide bonds are present. In the emulsion test, dissolve the sample in ethanol, add water and look for a milky emulsion; ethanol is flammable, so keep it away from naked flames."
      ]},
      {title:"Thinking bigger — trehalose and biological protection",intro:"Trehalose is a useful example of how a familiar class of molecule can have a specialised biological role.",points:[
        "Trehalose is a non-reducing disaccharide made from two glucose units joined through their anomeric carbons by an α,α-1,1 glycosidic bond. Because neither anomeric carbon is free, it does not give a positive Benedict’s test without hydrolysis.",
        "It occurs in fungi, yeast and many invertebrates. In some organisms it helps stabilise proteins and membranes during drying, freezing or other stresses; it is not a substitute for glucose as the main fuel in every tissue.",
        "When interpreting a food-test result, separate the observation from the inference: report the colour/precipitate first, then state which molecular class the result supports and any limitation of the test."
      ]}
    ],reviewPrompt:"Can you compare starch, glycogen and cellulose by monomer, bond, branching and biological role?"},
    U1T2:{sections:[
      {title:"Principles of circulation and the heart",intro:"A closed, double circulatory system keeps blood moving in one direction and allows pressure to be maintained separately in pulmonary and systemic circuits.",points:[
        "The right side sends deoxygenated blood to the lungs; the left side sends oxygenated blood to the body. A septum separates the sides, preventing mixing and preserving an efficient oxygen supply.",
        "During atrial systole, atria contract and blood passes through open atrioventricular valves. During ventricular systole, rising ventricular pressure closes the AV valves (first heart sound) and opens the semilunar valves; during diastole, pressure falls and semilunar valves close (second sound).",
        "The sinoatrial node starts a wave of excitation. Non-conducting tissue delays spread to the ventricles; the atrioventricular node then conducts the impulse down the bundle of His and Purkyne fibres so ventricular contraction begins near the apex and pushes blood upwards.",
        "The left ventricle has a thicker muscular wall because it must generate higher pressure to drive blood around the systemic circulation. The pulmonary circuit is shorter and operates at lower pressure, reducing damage to delicate lung capillaries."
      ]},
      {title:"Blood vessels and exchange",intro:"Vessel structure is adapted to its pressure and function, from bulk transport to exchange with tissues.",points:[
        "Arteries carry blood away from the heart under high, pulsatile pressure. Thick collagen and elastic tissue resist pressure; smooth muscle adjusts lumen diameter; elastic recoil helps maintain flow between heartbeats.",
        "Arterioles control tissue perfusion by vasoconstriction and vasodilation. Capillaries have a one-cell-thick endothelium, narrow lumen and extensive branching, giving a short diffusion distance and large total exchange area.",
        "Veins return blood at lower pressure. Their wide lumen reduces resistance, and valves prevent backflow; skeletal-muscle contractions and breathing movements help propel blood towards the heart.",
        "At the arteriole end of a capillary, hydrostatic pressure drives water and small solutes out to form tissue fluid. Blood cells and most plasma proteins remain in the capillary. Lower hydrostatic pressure at the venule end, together with the water-potential effect of retained proteins, draws much of the fluid back; excess drains into lymph vessels."
      ]},
      {title:"Atherosclerosis, CVD risk and evidence",intro:"Cardiovascular disease is multifactorial. A risk factor changes probability; it does not prove that one individual will develop disease.",points:[
        "Damage or dysfunction of the arterial endothelium can allow LDL-containing particles to enter the wall. Inflammatory cells take up lipid, and a fibrous cap forms over the developing atheroma. The lumen narrows and the artery becomes less compliant.",
        "A plaque may rupture, exposing material that promotes platelet activation and clotting. A thrombus in a coronary artery can reduce oxygen delivery to cardiac muscle, causing ischaemia and possibly myocardial infarction; a clot or ruptured vessel in the brain can cause stroke.",
        "Age, family history, smoking, raised blood pressure, dyslipidaemia, diabetes, inactivity and diet can contribute. Correlation alone is not causation: consider confounders, sample size, duration, dose–response, plausible mechanism and whether intervention evidence supports the link.",
        "A population study estimates relative or absolute risk, not certainty. Relative risk compares probabilities between groups; absolute risk communicates the underlying event rate and is often more useful for judging the size of a benefit."
      ]},
      {title:"Diet, antioxidants and treatment trade-offs",intro:"Public-health recommendations should be based on the strength of the evidence and the size of both benefits and harms.",points:[
        "A balanced diet supplies energy and essential nutrients while avoiding persistent energy excess. Replacing some saturated fat with unsaturated fat can improve blood-lipid profiles; fibre-rich foods, fruit and vegetables support overall health. No single food prevents CVD on its own.",
        "Antioxidants can react with oxidising species in laboratory systems, but a biochemical mechanism does not by itself prove that antioxidant supplements prevent heart attacks. Observational dietary associations may reflect other lifestyle differences; randomised trials and clinically meaningful outcomes are stronger tests.",
        "Statins reduce hepatic cholesterol synthesis and lower LDL; antihypertensives lower blood pressure; antiplatelet drugs reduce clot risk in selected patients. Stents reopen narrowed arteries and bypass grafts route blood around blockages. Each option has contraindications and possible adverse effects.",
        "Heart failure means the heart cannot pump enough blood to meet tissue needs. It may follow myocardial damage or long-term pressure overload; breathlessness, fatigue and fluid retention are common. Management can reduce symptoms and risk, but treatment choice depends on cause, severity and patient factors."
      ]}
    ],reviewPrompt:"For a CVD claim, can you distinguish a plausible mechanism, correlation and evidence that treatment changes outcomes?"},
    U1T3:{sections:[
      {title:"Blood components and oxygen transport",intro:"Blood is a connective tissue whose cells and plasma transport materials, defend the body and limit blood loss.",points:[
        "Erythrocytes are biconcave, flexible and lack a nucleus when mature, leaving room for haemoglobin. Their shape increases surface area relative to volume and keeps diffusion distances short.",
        "Each haemoglobin molecule has four polypeptide subunits and four haem groups, each capable of binding oxygen reversibly. Oxygen binding is cooperative: binding the first oxygen changes the protein’s shape and increases affinity at the remaining sites, producing a sigmoid dissociation curve.",
        "In actively respiring tissue, carbon dioxide enters red cells and is converted by carbonic anhydrase to hydrogencarbonate and hydrogen ions. Increased CO₂ and lower pH reduce haemoglobin’s oxygen affinity, shifting the curve right and promoting unloading (the Bohr effect).",
        "Haemoglobin transports most oxygen; plasma carries most carbon dioxide mainly as hydrogencarbonate. Carbon monoxide binds haemoglobin strongly and competes with oxygen, reducing oxygen transport even when the lungs are functioning."
      ]},
      {title:"Tissue fluid and lymph",intro:"Fluid exchange supplies cells while maintaining a circulating blood volume.",points:[
        "The blood’s hydrostatic pressure is greatest near the arteriole end, so water and small dissolved substances are filtered through the capillary wall. Large proteins and blood cells usually remain in the blood.",
        "As blood moves along the capillary, hydrostatic pressure falls. Retained plasma proteins make blood water potential relatively low, so water moves back by osmosis near the venule end; not all filtered fluid returns directly.",
        "The lymphatic system collects excess tissue fluid and returns it to the circulation. Obstruction, inflammation or low plasma-protein concentration can upset the balance and cause oedema."
      ]},
      {title:"Plant transport — xylem and transpiration",intro:"Xylem transports water and mineral ions from roots to leaves; transpiration supplies the pulling force in the cohesion–tension model.",points:[
        "Root hair cells provide a large surface area. Mineral ions may be absorbed actively; water then moves down a water-potential gradient through the cortex and across the endodermis into the xylem.",
        "Xylem vessels are dead, hollow tubes with lignified walls. Evaporation from mesophyll cell walls lowers water potential in the leaf; water is pulled upwards as a continuous column because water molecules cohere and adhere to vessel walls.",
        "Stomata allow carbon dioxide to enter but also provide a route for water vapour to leave. Higher temperature, light intensity or air movement, and lower humidity generally increase transpiration, provided stomata remain open.",
        "A potometer measures water uptake by a cut shoot, not transpiration directly: some absorbed water is used in photosynthesis or maintains turgor. Cut shoots under water, seal joints, allow equilibration and control the other environmental variables."
      ]},
      {title:"Phloem transport — translocation",intro:"Phloem moves assimilates such as sucrose from sources to sinks; direction can differ between sieve tubes and can change with demand.",points:[
        "A source releases assimilate, for example a photosynthesising leaf or a storage organ during mobilisation. A sink uses or stores it, such as a growing root, fruit or developing seed.",
        "Companion cells load sucrose into sieve elements using membrane transport proteins. Lower water potential draws water from nearby xylem into the sieve tube, raising hydrostatic pressure at the source.",
        "Mass flow carries phloem sap towards a lower-pressure sink, where sucrose is unloaded and used or stored. Water may return to xylem. Evidence from ringing experiments and tracer studies supports phloem transport; active loading and bulk flow are complementary steps."
      ]}
    ],reviewPrompt:"Can you explain which substances move in blood, xylem and phloem, and what drives each movement?"},
    U1T4:{sections:[
      {title:"Cell membranes and transport",intro:"The fluid-mosaic membrane is selectively permeable: its phospholipid bilayer and embedded proteins determine which substances cross and how.",points:[
        "Small non-polar molecules such as oxygen can diffuse through the bilayer. Ions and most large polar molecules need channel or carrier proteins; a channel creates a hydrophilic pathway, while a carrier changes shape as it transports a specific solute.",
        "Diffusion is net movement down a concentration gradient. Facilitated diffusion still moves down the gradient and does not require ATP. Active transport moves a solute against its electrochemical gradient using energy and a specific carrier protein.",
        "Osmosis is the net movement of water through a partially permeable membrane from higher water potential to lower water potential. Water potential is affected by solute concentration and pressure; avoid defining osmosis only as water moving from dilute to concentrated if pressure differs.",
        "Endocytosis and exocytosis move bulk material in membrane-bound vesicles. Their use requires energy and is distinct from movement through channels or carriers."
      ]},
      {title:"Enzymes and protein structure",intro:"Enzymes are biological catalysts. Their three-dimensional structure creates an active site that binds a substrate and lowers activation energy.",points:[
        "The induced-fit model describes the active site changing shape slightly as the substrate binds. Temporary interactions position reactants, stabilise the transition state and make product formation more likely; products then leave and the enzyme can be reused.",
        "Higher temperature initially increases kinetic energy and successful collision frequency. Above an enzyme’s optimum, bonds maintaining tertiary structure are disrupted; the active site changes shape and activity falls. Extreme pH can also disrupt ionic and hydrogen bonding.",
        "Competitive inhibitors occupy the active site; increasing substrate concentration can reduce their effect. Non-competitive inhibitors bind elsewhere and alter active-site shape, so adding extra substrate does not fully restore activity.",
        "Enzyme rate can be limited by substrate concentration, enzyme concentration, temperature, pH or inhibitor concentration. When comparing rates, keep other variables controlled and use initial rate where product accumulation could change conditions."
      ]},
      {title:"DNA, RNA and protein synthesis",intro:"DNA stores hereditary information in a nucleotide sequence; gene expression uses that sequence to assemble a polypeptide.",points:[
        "A DNA nucleotide contains deoxyribose, phosphate and one base. Two antiparallel strands form a double helix with sugar–phosphate backbones outside and complementary bases inside: A pairs with T, and C with G.",
        "During semi-conservative replication, the strands separate and each acts as a template. DNA polymerase adds complementary nucleotides to the new strand; each daughter DNA molecule contains one original and one newly synthesised strand.",
        "During transcription, RNA polymerase builds a complementary mRNA strand using one DNA strand as template. In eukaryotes, the transcript is processed and leaves the nucleus through a pore; RNA uses uracil instead of thymine.",
        "At a ribosome, each mRNA codon specifies an amino acid or a start/stop signal. A tRNA anticodon pairs with the codon and carries its amino acid; peptide bonds join amino acids in the order dictated by the mRNA. The genetic code is triplet, degenerate and nearly universal."
      ]},
      {title:"Gene mutation, inheritance and genetic disease",intro:"An allele is a version of a gene. Genotype, dominance and the pattern of inheritance determine how alleles are passed through a family.",points:[
        "A base substitution may be silent, change one amino acid (missense) or create a stop codon (nonsense). Insertions or deletions can shift the reading frame, changing every downstream codon unless the number inserted or deleted is a multiple of three.",
        "For a monohybrid cross, define symbols, state parental genotypes, derive gametes, complete a Punnett square and give genotype and phenotype probabilities. A dominant phenotype can conceal a recessive allele; a test cross with a homozygous recessive individual can reveal an unknown genotype.",
        "For sex linkage, state which sex chromosome carries the allele and write alleles with the chromosome notation. X-linked recessive conditions are more common in XY individuals because they have only one X chromosome; fathers do not pass an X-linked allele to sons.",
        "Cystic fibrosis is commonly inherited as an autosomal recessive condition caused by CFTR variants that disrupt chloride transport. Genetic screening estimates risk or detects a variant; it does not by itself predict every feature or dictate a reproductive decision."
      ]},
      {title:"Gas exchange and the mammalian lung",intro:"Effective gas exchange surfaces combine a large area, a short diffusion path and gradients maintained by ventilation and blood flow.",points:[
        "Alveoli provide a very large, moist surface. Their thin epithelium and capillary endothelium shorten diffusion distance; elastic fibres aid recoil and surfactant reduces surface tension, helping prevent alveolar collapse.",
        "Ventilation continually refreshes alveolar air, while blood flow removes absorbed oxygen and brings carbon dioxide. Oxygen diffuses into blood and binds haemoglobin; carbon dioxide diffuses into alveoli to be exhaled.",
        "During inhalation, external intercostals and the diaphragm contract, thoracic volume rises and lung pressure falls below atmospheric pressure. Quiet exhalation is mainly elastic recoil; forced breathing recruits additional muscles.",
        "Asthma narrows inflamed airways through smooth-muscle contraction, mucosal swelling and mucus. Air pollution can irritate airways and worsen symptoms; association studies must account for smoking, occupation, housing and other confounders."
      ]}
    ],reviewPrompt:"Can you trace information from a DNA base sequence through mRNA codons to a polypeptide, and explain one mutation consequence?"},
    U2T1:{sections:[
      {title:"Observing cells and microscopy",intro:"Microscopes magnify images, but resolution determines whether two close structures can be distinguished.",points:[
        "Magnification = image size ÷ actual size. Convert units before calculating: 1 mm = 1000 µm and 1 µm = 1000 nm. A scale bar can be used even when the image has been resized, unlike the printed magnification alone.",
        "Light microscopes can view living cells and stained specimens but resolve less detail than electron microscopes. TEM shows internal ultrastructure in thin sections; SEM shows surface detail with a three-dimensional appearance. Electron microscopy requires preparation and non-living specimens.",
        "A graticule has arbitrary divisions until calibrated against a stage micrometer. Calibrate separately for each objective lens because magnification changes the graticule scale."
      ]},
      {title:"Eukaryotic cells and protein transport",intro:"Organelles divide cellular work into compartments and create routes for making, processing and exporting proteins.",points:[
        "Ribosomes translate mRNA. Proteins for secretion or membranes are synthesised on ribosomes attached to rough endoplasmic reticulum, enter its lumen, and travel in vesicles to the Golgi apparatus for modification and sorting.",
        "The Golgi packages products into vesicles that can fuse with the plasma membrane during exocytosis. Mitochondria generate ATP by aerobic respiration; lysosomes contain hydrolytic enzymes; plant cells also have chloroplasts, a cellulose wall and a large vacuole.",
        "Cell fractionation uses cold conditions to slow enzyme activity, an isotonic solution to reduce osmotic damage and a buffer to maintain pH. Filtration removes large debris; differential centrifugation separates organelles according to size and density."
      ]},
      {title:"Prokaryotes and organisation",intro:"Prokaryotic cells lack a membrane-bound nucleus and organelles; multicellular eukaryotes organise specialised cells into tissues and organs.",points:[
        "A typical bacterium has a plasma membrane, cytoplasm, 70S ribosomes and a circular DNA molecule in a nucleoid. Many have plasmids; some have a capsule, flagellum or pili. The bacterial wall contains peptidoglycan (murein), not cellulose.",
        "Eukaryotic cells are generally larger and contain a nucleus and membrane-bound organelles; their cytoplasmic ribosomes are 80S. Mitochondria and chloroplasts have features consistent with an endosymbiotic origin, including circular DNA and 70S ribosomes.",
        "In multicellular organisms, cells form tissues, tissues form organs and organs work in systems. Differentiation produces specialised structures; division of labour supports the organism but creates interdependence between cells."
      ]}
    ],reviewPrompt:"When a micrograph is resized, which measurement remains reliable: a printed magnification or a scale bar, and why?"},
    U2T2:{sections:[
      {title:"The cell cycle and mitosis",intro:"The cell cycle coordinates DNA copying with division so daughter cells receive a complete genome.",points:[
        "In interphase, cells grow and synthesise proteins (G1), replicate DNA and centrosomes (S), then prepare for division (G2). Checkpoints can delay progression if DNA is damaged or replication is incomplete.",
        "In prophase, chromosomes condense and the spindle forms; the nuclear envelope breaks down. At metaphase, chromosomes align at the equator. During anaphase, sister chromatids separate; in telophase, nuclei reform, followed by cytokinesis.",
        "Mitosis produces two daughter cells with the same chromosome number and, barring mutation, the same alleles as the parent. It supports growth, tissue repair and asexual reproduction. Uncontrolled cell-cycle regulation can contribute to cancer.",
        "Mitotic index = cells visibly in mitosis ÷ total cells counted. State whether the result is a fraction or percentage and use the same sampling area and counting criteria between treatments."
      ]},
      {title:"Meiosis, variation and reproduction",intro:"Meiosis halves chromosome number and generates genetically varied haploid cells for sexual reproduction.",points:[
        "DNA replicates once before two divisions. In meiosis I, homologous chromosomes pair, may exchange sections by crossing over, and separate into different cells; in meiosis II, sister chromatids separate.",
        "Crossing over creates new allele combinations on chromatids. Independent assortment results from random orientation of homologous pairs at metaphase I. Random fertilisation adds further combinations; mutation creates new alleles.",
        "A sperm has an acrosome with enzymes, a haploid nucleus and a flagellum; an egg contains nutrient-rich cytoplasm and a haploid nucleus. Fusion restores diploidy. In mammals, cortical changes after fertilisation reduce the chance of polyspermy.",
        "In flowering plants, a pollen grain germinates and a pollen tube grows to an ovule. Double fertilisation forms a diploid zygote and a triploid endosperm nucleus. In humans, sperm production and delivery, ovulation and implantation each have distinct steps that can be affected in infertility.",
        "Male infertility can involve low sperm concentration, reduced motility, abnormal morphology, blocked ducts or hormonal factors. Semen analysis measures different sperm characteristics; one result alone does not always identify the underlying cause.",
        "Treatments such as IVF or intracytoplasmic sperm injection may help in selected cases, but suitability, success rates, risks and ethical considerations depend on the cause and the individuals involved."
      ]},
      {title:"Comparing cell division",intro:"A comparison question should link the number and timing of divisions to chromosome number and genetic similarity.",points:[
        "Mitosis has one division and normally produces two genetically similar diploid cells; meiosis has two divisions and normally produces four genetically different haploid products.",
        "Homologous chromosomes separate at meiosis I; sister chromatids separate in mitosis and meiosis II. DNA replication occurs before the first meiotic division, not between meiosis I and II.",
        "State the biological purpose as well as the chromosome change: mitosis supports growth and repair; meiosis makes gametes or spores and contributes to variation."
      ]}
    ],reviewPrompt:"Can you identify which division separates homologous chromosomes and explain two sources of meiotic variation?"},
    U2T3:{sections:[
      {title:"Differentiation, genes and environment",intro:"Most somatic cells contain the same genome, but different cell types express different subsets of genes.",points:[
        "Transcription factors bind to promoters or other regulatory DNA and influence whether RNA polymerase transcribes a gene. A change in transcription changes the mRNA and can change the proteins a cell makes.",
        "Environmental factors such as temperature, nutrition, hormones and chemical exposure can alter gene expression. Epigenetic marks, including DNA methylation and histone modification, can make chromatin more or less accessible without changing the base sequence.",
        "Cell differentiation is the development of a specialised structure and function through regulated gene expression. For example, a red blood cell expresses globin genes, while a pancreatic β cell expresses insulin-related genes."
      ]},
      {title:"Stem cells and medical use",intro:"Stem cells self-renew and can differentiate. Their developmental potential depends on their source and conditions.",points:[
        "Totipotent cells can form all embryonic and extra-embryonic tissues; pluripotent embryonic stem cells can form nearly all body cell types; multipotent adult stem cells form a narrower range. Induced pluripotent stem cells are adult cells reprogrammed to a pluripotent-like state.",
        "A proposed therapy must show reliable differentiation, survival, integration and function. Risks include immune rejection, infection, uncontrolled proliferation or tumours, and differentiation into the wrong cell type.",
        "Clinical evidence should be judged by controlled trials, meaningful outcomes and long-term follow-up. A treatment that works in a dish or animal model is not automatically proven safe or effective in people."
      ]},
      {title:"Microbiota and development",intro:"The host and its resident microorganisms interact with diet, immunity and development; effects are context-dependent.",points:[
        "The microbiota is the community of microorganisms living in and on a host. Gut microbes can digest substrates the host cannot, produce metabolites and interact with immune development.",
        "Diet, medicines, age and environment influence microbiota composition. A correlation between a microbiome pattern and a disease can reflect cause, consequence or a shared third factor; intervention studies are needed to test causality.",
        "In development, chemical signals and cell-to-cell interactions can alter which genes are active. Do not confuse gene regulation (which changes expression) with mutation (which changes DNA sequence)."
      ]}
    ],reviewPrompt:"How can two cells with the same DNA become different, and how is epigenetic regulation different from mutation?"},
    U2T4:{sections:[
      {title:"Plant structure, water and useful materials",intro:"Plant cells and tissues are adapted to photosynthesis, support, transport and storage.",points:[
        "Cellulose microfibrils give the wall tensile strength; middle lamella pectins help neighbouring cells adhere. The vacuole helps maintain turgor, while chloroplasts contain thylakoid membranes for light-dependent reactions.",
        "Xylem conducts water and mineral ions and provides support; phloem distributes assimilates. Stems contain vascular bundles whose arrangement differs between many monocot and dicot plants; cambium in woody dicots can produce secondary xylem and phloem.",
        "Plants store carbohydrate as starch, a compact insoluble polymer, and produce fibres such as cellulose that can be used in paper, textiles and composites. Mineral deficiencies can disrupt chlorophyll production, enzyme activity or growth; symptoms should be linked to the mineral’s role.",
        "Plant-derived chemicals can be leads for medicines, but a natural origin does not prove safety. Drug development requires isolation, dose testing, toxicology, controlled clinical trials and monitoring for side effects."
      ]},
      {title:"Classification, species and phylogeny",intro:"Classification organises biodiversity and communicates hypothesised evolutionary relationships.",points:[
        "A species is commonly defined as a group of organisms able to interbreed and produce fertile offspring, but this biological species concept is difficult to apply to fossils, asexual organisms and geographically separated populations.",
        "Modern classification uses shared derived characteristics and molecular evidence to infer evolutionary relationships. A phylogenetic tree represents hypotheses about common ancestry; branch order matters more than the left-to-right order of the tips.",
        "The three-domain system groups organisms as Bacteria, Archaea and Eukarya using molecular and cellular evidence. Kingdom schemes are useful teaching categories but are revised as evidence and methods change.",
        "The quagga illustrates how preserved specimens, DNA and historical records can be used to investigate relatedness and variation. It is extinct; a close relative is not genetically identical and cannot restore the original population’s full diversity."
      ]},
      {title:"Biodiversity, niches and speciation",intro:"Biodiversity occurs at genetic, species and ecosystem levels; preserving one level does not automatically preserve the others.",points:[
        "Species richness is the number of species; evenness describes how evenly individuals are distributed. A diversity index combines these ideas, so compare samples taken with the same effort and method.",
        "A niche includes an organism’s resource use, environmental tolerances and interactions. Adaptations improve performance in a particular context, but may involve trade-offs and do not imply that an organism consciously changed to meet a need.",
        "A gene pool contains all alleles in a population. Genetic diversity provides variation on which selection can act; small isolated populations may lose alleles through genetic drift and inbreeding.",
        "Speciation can occur when populations become reproductively isolated. Geographic separation, divergent selection or changes in behaviour can reduce gene flow; over generations, genetic differences may accumulate until viable fertile offspring are no longer produced."
      ]},
      {title:"Conservation and evidence",intro:"Conservation decisions combine biological evidence with ethical, social and economic considerations.",points:[
        "Habitat protection, wildlife corridors, captive breeding, reintroduction, seed banks and legal controls can address different threats. The best method depends on the species’ ecology and the cause of decline.",
        "Orang-utan conservation must consider habitat loss and fragmentation, hunting and human–wildlife conflict. Protecting connected forest and working with local communities can support populations more sustainably than isolated rescue alone.",
        "Monitor success using repeatable indicators such as population size, breeding success, habitat area and genetic diversity. Use matched sampling sites and account for seasonal variation; a short-term increase does not necessarily show long-term recovery."
      ]}
    ],reviewPrompt:"Can you separate species richness, evenness and genetic diversity, and name a measurement for each?"},
    U3T1:{sections:[
      {title:"Planning a valid biological investigation",intro:"A strong plan makes the biological question measurable and controls alternative explanations.",points:[
        "State the hypothesis in terms of the independent and dependent variables. Define how each variable will be manipulated or measured, including units, range, intervals and the method used to obtain a reading.",
        "Identify control variables and explain how each is kept constant. Include a suitable control group when possible, and use random allocation or random sampling where it reduces bias.",
        "Use replicates at each condition, calculate a mean and identify anomalies transparently. The sample size should be large enough to estimate natural variation; independent biological replicates are stronger than repeated measurements of the same specimen."
      ]},
      {title:"Sampling, measurement and safety",intro:"The method should be repeatable, ethical and safe, with an appropriate instrument and a clear recording plan.",points:[
        "For fieldwork, use quadrats to estimate abundance or percentage cover and transects to investigate change along an environmental gradient. Random coordinates reduce selection bias; systematic spacing helps map a directional gradient.",
        "For microscopy, calibrate the eyepiece graticule for the chosen magnification. For mass or volume, use suitable balance or volumetric equipment and record uncertainty or instrument resolution where relevant.",
        "Identify hazards, who may be harmed and controls that reduce risk. Follow local rules for biological material, sharps, stains, allergens and disposal; do not assume that a low biological risk means no practical risk."
      ]},
      {title:"Processing and evaluating results",intro:"Good analysis makes the pattern visible and separates biological variability from measurement limitations.",points:[
        "Choose a graph appropriate to the data: scatter graph for two continuous variables, bar chart for categories and histogram for a continuous frequency distribution. Label axes with quantity and unit.",
        "Use descriptive statistics and a statistical test only when its assumptions and data type are appropriate. State the null hypothesis, critical value or p-value, decision and conclusion in the context of the question.",
        "Evaluate a method specifically: discuss resolution, calibration, sample size, uncontrolled variables and possible bias, then propose a change that addresses the named limitation."
      ]}
    ],reviewPrompt:"Can another student repeat your method exactly from the variables, measurements and controls you have written?"},
    U4T1:{sections:[
      {title:"ATP and photosynthesis",intro:"ATP transfers energy in cells. Photosynthesis converts light energy into chemical energy stored in organic molecules.",points:[
        "ATP hydrolysis to ADP and inorganic phosphate releases usable free energy for cellular processes such as active transport, biosynthesis and muscle contraction. ATP is rapidly regenerated and is not a long-term energy store.",
        "Chlorophyll in thylakoid membranes absorbs light. Light-dependent reactions excite electrons, generate ATP by photophosphorylation and reduce NADP; water splitting supplies electrons and releases oxygen.",
        "In the Calvin cycle, carbon dioxide is fixed to RuBP by rubisco. ATP and reduced NADP support the production of triose phosphate; some leaves the cycle to form carbohydrates while the rest regenerates RuBP.",
        "Light intensity, carbon dioxide concentration and temperature can limit photosynthesis. Increasing one factor raises rate only until another factor becomes limiting; high temperature can reduce enzyme activity through denaturation."
      ]},
      {title:"Ecosystems, niches and measuring populations",intro:"An ecosystem contains interacting organisms and their physical environment; energy flows through it while matter is recycled.",points:[
        "Abiotic factors include temperature, water, pH, light and mineral availability. Biotic factors include competition, predation, disease and food supply; changes in one can alter distribution and abundance.",
        "Use random quadrats to estimate abundance, frequency or percentage cover. Belt transects and line transects reveal spatial change; keep quadrat size, placement method, time and observer criteria consistent.",
        "A mark–release–recapture estimate can be made with N ≈ (first sample × second sample) ÷ marked recaptures, but depends on a closed population, mixing, mark retention and equal catchability. State limitations when the assumptions are unlikely.",
        "Mean, range, standard deviation and an appropriate inferential test describe different features of data. A statistically significant difference is not automatically large or biologically important."
      ]},
      {title:"Energy flow, productivity and carbon",intro:"Energy becomes less available at each trophic transfer; carbon atoms cycle between organisms, the atmosphere, water and geological stores.",points:[
        "Energy enters most ecosystems through photosynthesis and is transferred in biomass. At each trophic level, energy is lost in respiration, movement, waste and uneaten material, so food chains are usually short.",
        "Gross primary productivity is the total rate at which producers fix energy; net primary productivity is GPP minus respiratory loss by producers. NPP is the energy available for growth and consumption by the next trophic level.",
        "Carbon moves through photosynthesis, feeding, respiration, decomposition, combustion and ocean exchange. Fossil-fuel combustion and land-use change add carbon dioxide to the atmosphere faster than some natural sinks can remove it.",
        "Greenhouse gases absorb and re-emit outgoing infrared radiation. A stronger greenhouse effect changes Earth’s energy balance; the size and timing of impacts vary by region and depend on feedbacks."
      ]},
      {title:"Climate evidence, impacts and responses",intro:"Climate claims should be evaluated using multiple independent data sets, physical mechanisms and explicit uncertainty.",points:[
        "Instrumental records, ice cores, tree rings and other proxies provide evidence over different timescales. Check calibration, dating, spatial coverage and uncertainty before comparing records.",
        "Correlation between greenhouse-gas concentration and temperature is not the only evidence for causation: physical radiation mechanisms, atmospheric fingerprints, ocean heat and model tests also matter. Natural variability affects short-term trends but does not erase long-term evidence.",
        "Climate models represent processes at finite resolution and use scenarios for future emissions. They are not precise weather forecasts; compare ranges, assumptions, model agreement and observed performance.",
        "Climate change can shift species ranges, seasonal timing and selection pressures. Mitigation reduces emissions or increases removals; adaptation reduces harm from impacts already occurring or expected."
      ]}
    ],reviewPrompt:"Can you calculate NPP from GPP and respiration, then explain why it is less than GPP?"},
    U4T2:{sections:[
      {title:"Bacteria, viruses and microbial growth",intro:"Microorganisms differ in structure and reproduction, which affects treatment, transmission and laboratory methods.",points:[
        "Bacteria are prokaryotic cells that reproduce by binary fission under favourable conditions. A virus contains genetic material in a protein coat, sometimes with an envelope, and can replicate only inside a suitable host cell.",
        "During a lytic viral cycle, the virus attaches, enters or injects its genome, directs synthesis of viral components, assembles new particles and releases them. Latent or lysogenic stages can delay production of new virions.",
        "A bacterial growth curve includes lag, exponential, stationary and death phases. Nutrient depletion, toxic waste, space, temperature and pH influence growth; exponential doubling can be estimated from a logarithmic plot.",
        "Aseptic technique reduces contamination: disinfect benches, use sterile instruments, minimise exposure of culture vessels and secure plates. Incubate school cultures at a safe, locally approved temperature and dispose of them according to institutional guidance."
      ]},
      {title:"Disease case studies and infection",intro:"Transmission route, target cells, symptoms and prevention differ between pathogens; antibiotics work on bacteria, not viruses.",points:[
        "Tuberculosis is caused by Mycobacterium tuberculosis and is spread mainly through airborne droplets. It can infect the lungs and may remain latent; diagnosis, combination antibiotics, adherence and public-health contact tracing all matter.",
        "HIV targets cells bearing CD4 receptors, especially helper T cells. Viral reverse transcriptase makes DNA from RNA, and integration allows persistence; untreated loss of immune coordination increases susceptibility to opportunistic infections.",
        "Culture techniques require suitable sterile media and controlled incubation. A clear zone around an antibiotic disc indicates reduced bacterial growth under that test condition; it does not alone determine the best treatment in a patient.",
        "A plaque assay estimates infectious virus by counting clear zones formed in a susceptible cell layer. Dilution series and replicate plates help bring counts into a measurable range."
      ]},
      {title:"Decomposition, time of death and DNA forensics",intro:"Decomposition and forensic measurements provide estimates, not exact timestamps; environmental context is essential.",points:[
        "Bacteria, fungi and invertebrates break down tissues. Temperature, oxygen, moisture, access by scavengers, body size and burial conditions change the rate and sequence of decay.",
        "Forensic entomology can use insect species and developmental stage to estimate a minimum post-mortem interval, but temperature history and insect access must be considered. Rigor, livor and algor mortis also change with time and environment.",
        "PCR uses repeated cycles of denaturation, primer annealing and extension by a thermostable DNA polymerase to amplify a target. Primers define the region; contamination controls and a no-template control help detect false results.",
        "DNA profiling compares selected variable regions, commonly short tandem repeats. The strength of a match depends on the number of loci, population allele frequencies, sample quality and the possibility of mixture or contamination; a match is not automatically proof of guilt."
      ]}
    ],reviewPrompt:"Why can forensic evidence estimate a time interval or match likelihood but rarely prove a single exact answer on its own?"},
    U4T3:{sections:[
      {title:"Non-specific and specific immunity",intro:"Innate defences act rapidly and broadly; adaptive responses use antigen-specific lymphocytes and create immunological memory.",points:[
        "The skin, mucus, cilia, stomach acid and antimicrobial chemicals form barriers. Inflammation increases blood flow and vascular permeability; phagocytes engulf pathogens and digest them in lysosomes.",
        "An antigen is a molecule recognised by an immune receptor. A helper T cell with a complementary receptor can be activated by antigen presentation and cytokines, then stimulates B cells and cytotoxic T cells.",
        "B cells selected by antigen undergo clonal expansion. Plasma cells secrete specific antibodies; memory B and T cells persist and respond more rapidly after a later exposure.",
        "Antibodies can neutralise toxins or viruses, agglutinate pathogens and mark targets for destruction. Cell-mediated responses are important for infected cells that display foreign antigens."
      ]},
      {title:"Immunisation, antibiotics and resistance",intro:"Vaccines prepare adaptive immunity; antibiotics act on susceptible bacteria, and resistance evolves by selection.",points:[
        "A vaccine presents an antigen or genetic instructions so memory cells form without the full disease. On later exposure, the secondary response is faster and larger; vaccine effectiveness and duration vary by pathogen and individual.",
        "Antibiotics may inhibit bacterial cell-wall synthesis, protein synthesis or other processes. They do not treat viral infection. Prescribe and use them appropriately; incomplete or unnecessary exposure can favour resistant bacteria.",
        "Resistance arises through random mutation or acquisition of genes, for example on plasmids. Antibiotic exposure selects resistant variants; the drug does not cause a bacterium to develop a useful mutation because it needs one.",
        "Reduce resistance through infection prevention, diagnostics, appropriate prescribing, completing treatment as directed and surveillance. In healthcare settings, hand hygiene and isolation can limit spread of resistant strains."
      ]},
      {title:"Developing immunity and evaluating treatments",intro:"Protection can be active or passive, natural or artificial; clinical evidence must separate immune response from patient benefit.",points:[
        "Active immunity follows exposure to antigen and involves the person’s own lymphocytes and memory cells; it is usually longer-lasting. Passive immunity transfers ready-made antibodies and acts quickly but wanes as antibodies are broken down.",
        "Maternal antibodies can pass across the placenta or in colostrum. Antibody preparations can give short-term protection after exposure, but do not usually create memory cells.",
        "To evaluate a vaccine or treatment, consider randomisation, control groups, blinding where possible, sample size, follow-up, adverse events and absolute as well as relative risk reduction."
      ]}
    ],reviewPrompt:"What is the difference between active and passive immunity, and which one produces memory cells?"},
    U5T1:{sections:[
      {title:"Cellular respiration and ATP",intro:"Respiration transfers energy from organic molecules to ATP through enzyme-controlled pathways.",points:[
        "Glycolysis occurs in the cytoplasm: glucose is phosphorylated and split into two three-carbon molecules, producing a small net yield of ATP and reduced NAD. It does not require oxygen directly.",
        "With oxygen, pyruvate is converted to acetyl coenzyme A and enters the Krebs cycle in the mitochondrial matrix. Carbon dioxide is released and reduced NAD and FAD carry electrons to the inner mitochondrial membrane.",
        "In oxidative phosphorylation, electrons pass along carriers and release energy to pump protons across the inner membrane. Protons flow through ATP synthase; oxygen accepts electrons at the end and combines with protons to form water.",
        "Without sufficient oxygen, fermentation regenerates NAD so glycolysis can continue. In mammals lactate forms; in yeast and plants ethanol and carbon dioxide form. Anaerobic respiration yields far less ATP per glucose than aerobic respiration."
      ]},
      {title:"Muscle structure and contraction",intro:"Skeletal muscle converts chemical energy into force through interactions between actin and myosin filaments.",points:[
        "A muscle contains bundles of fibres; each fibre contains myofibrils made from sarcomeres. Thin actin filaments and thick myosin filaments overlap in a regular arrangement.",
        "Calcium ions bind to troponin, moving tropomyosin away from actin-binding sites. Myosin heads form cross-bridges, pivot using energy from ATP hydrolysis, detach when a new ATP binds and re-cock after ATP hydrolysis.",
        "During contraction, actin slides past myosin and sarcomeres shorten; the filaments themselves do not shorten. Calcium is pumped back into the sarcoplasmic reticulum for relaxation.",
        "Slow oxidative fibres have many mitochondria, capillaries and myoglobin and resist fatigue. Fast fibres contract rapidly and may rely more on glycolysis; fibre proportions vary between muscles and individuals."
      ]},
      {title:"Cardiac muscle, circulation and exercise",intro:"Cardiac muscle is myogenic and coordinated; exercise increases oxygen delivery and carbon-dioxide removal.",points:[
        "Cardiac muscle cells branch and connect through intercalated discs, allowing electrical and mechanical coordination. The SAN initiates the heartbeat; autonomic nerves and hormones adjust rate but do not create each beat.",
        "At the start of exercise, sympathetic activity and adrenaline increase heart rate and stroke volume. Cardiac output = heart rate × stroke volume; blood is redistributed towards active muscle and skin as needed.",
        "Ventilation rises through changes in breathing rate and tidal volume. Chemoreceptors respond especially to carbon dioxide and pH; oxygen delivery rises as blood flow and gas exchange increase.",
        "After exercise, oxygen consumption can remain elevated while phosphocreatine is restored, lactate is processed and temperature and hormone levels return towards resting values. Avoid describing all post-exercise oxygen use as simply removing a fixed oxygen debt."
      ]}
    ],reviewPrompt:"Can you trace glucose through glycolysis, the link reaction, Krebs cycle and oxidative phosphorylation, naming where each occurs?"},
    U5T2:{sections:[
      {title:"Homeostasis and hormonal control",intro:"Homeostasis maintains internal conditions within ranges that support cell function; negative feedback opposes a change from a set point or normal range.",points:[
        "A control system includes receptors that detect a change, a coordinating centre that compares information with the target range and effectors that produce a response.",
        "Hormones travel in blood and affect target cells with complementary receptors. Endocrine signalling is often slower but longer-lasting than nervous signalling; hormone concentration can be regulated by negative feedback.",
        "Blood glucose is regulated mainly by insulin and glucagon. Insulin promotes glucose uptake and glycogen synthesis when glucose is high; glucagon promotes glycogen breakdown and glucose release when it is low."
      ]},
      {title:"Kidney structure and osmoregulation",intro:"The kidney filters blood, selectively reabsorbs useful substances and adjusts water balance through the nephron.",points:[
        "Ultrafiltration occurs at the glomerulus: high hydrostatic pressure forces water and small solutes into Bowman’s capsule, while cells and most plasma proteins remain in the blood.",
        "Selective reabsorption returns all glucose in a healthy person, required ions and much water to the blood. The proximal convoluted tubule uses co-transport and active transport; the loop of Henle establishes a medullary water-potential gradient.",
        "When blood water potential falls, hypothalamic osmoreceptors stimulate the posterior pituitary to release more ADH. ADH increases aquaporin insertion in collecting-duct membranes, raising water reabsorption and producing a smaller volume of more concentrated urine.",
        "When blood water potential rises, less ADH is released; collecting ducts become less permeable, so more water leaves in dilute urine. The direction of each change should be stated explicitly in exam answers."
      ]},
      {title:"Liver, thermoregulation and exercise",intro:"The liver processes absorbed substances and contributes to homeostasis; skin and circulation help control body temperature.",points:[
        "The liver deaminates excess amino acids and converts the nitrogen-containing product to urea; hepatocytes also regulate blood glucose, process toxins and produce plasma proteins. Urea travels in blood to the kidneys for excretion.",
        "When body temperature rises, vasodilation of skin arterioles and sweating increase heat loss. When temperature falls, vasoconstriction reduces skin blood flow and shivering generates heat by muscle activity.",
        "During exercise, heat production rises. Sweating cools only when sweat evaporates, so high humidity can reduce cooling; dehydration also reduces plasma volume and can impair thermoregulation."
      ]}
    ],reviewPrompt:"If blood water potential falls, what happens to ADH release, collecting-duct permeability and urine concentration?"},
    U5T3:{sections:[
      {title:"Neurones, action potentials and synapses",intro:"The nervous system uses electrical impulses along neurones and chemical transmission at most synapses.",points:[
        "A resting neurone has a voltage across its membrane maintained by ion gradients and selective permeability. A sufficient stimulus opens voltage-gated sodium channels, causing depolarisation; potassium-channel opening then repolarises the membrane.",
        "The action potential is all-or-nothing. A refractory period prevents immediate re-excitation and helps ensure one-way propagation; myelin and nodes of Ranvier allow rapid saltatory conduction.",
        "At a chemical synapse, an action potential opens calcium channels. Calcium triggers vesicle fusion and neurotransmitter release; neurotransmitter diffuses across the cleft and binds receptors on the postsynaptic membrane.",
        "Synaptic transmission is unidirectional because transmitter release machinery is presynaptic and receptors are postsynaptic. Enzymatic breakdown or reuptake terminates the signal; drugs can alter release, receptors, reuptake or breakdown."
      ]},
      {title:"CNS, sensory systems and the brain",intro:"Receptors transduce stimuli into signals that the central nervous system integrates and uses to coordinate responses.",points:[
        "The central nervous system comprises the brain and spinal cord; sensory, relay and motor neurones form pathways between receptors and effectors. Reflex arcs create rapid, stereotyped responses that protect the body.",
        "The retina contains rods, which are sensitive in dim light, and cones, which support colour vision and high acuity. The fovea has a high cone density; rods are more common in peripheral retina.",
        "Accommodation changes lens shape: ciliary muscles contract and suspensory ligaments slacken for near vision; the lens becomes more convex. For distant vision, the reverse adjustment flattens it.",
        "The brain’s chemical signalling depends on neurotransmitters, receptors and neural circuits. Drugs can alter release, receptor binding, reuptake or breakdown; effects depend on the circuit and dose, not on a simple universal chemical-balance switch.",
        "Habituation is a reduced response in neural processing to a repeated, harmless stimulus and is distinct from sensory receptor fatigue, where a receptor becomes less responsive during prolonged stimulation."
      ]},
      {title:"Plant coordination, phytochrome and flowering",intro:"Plants coordinate growth using hormones and environmental receptors rather than a nervous system.",points:[
        "Auxin can promote cell elongation in shoots and is redistributed after directional light or gravity stimuli, producing differential growth. Plant hormone effects depend on concentration, tissue and developmental stage.",
        "Phytochrome interconverts between Pr and Pfr forms with different light absorption. The proportion of each form gives information about light quality and can influence seed germination, shade responses and flowering.",
        "In photoperiodic flowering, plants measure the length of uninterrupted darkness, often through leaves. A flowering signal can move to the shoot apex; day-length categories should be interpreted by the critical night length, not just daylight duration.",
        "The phytochrome state can influence transcription of light-responsive genes, linking red/far-red light detection to growth and flowering responses. Gene-expression effects depend on plant species, developmental stage and interacting environmental signals."
      ]}
    ],reviewPrompt:"How does a chemical synapse ensure one-way transmission, and how is that different from conduction along an axon?"},
    U5T4:{sections:[
      {title:"Gene expression and recombinant DNA",intro:"Gene technology combines molecular tools with a clear target sequence and a way to identify successful products.",points:[
        "Restriction endonucleases recognise particular DNA sequences and cut DNA; sticky ends can base-pair with complementary ends. DNA ligase seals the sugar–phosphate backbone to form recombinant DNA.",
        "A plasmid vector can carry an inserted gene into bacteria. A promoter must work in the host, and selectable markers or reporter genes help identify cells that took up the vector; not every transformed cell expresses the insert.",
        "To make a eukaryotic protein in bacteria, intron-free cDNA may be prepared from mature mRNA using reverse transcriptase. Codon differences, folding and post-translational modifications can affect whether the product is functional."
      ]},
      {title:"GM organisms, medicines and biosafety",intro:"Genetic modification changes DNA using methods that can be assessed for intended benefits, unintended effects and governance.",points:[
        "Genetically modified crops may be engineered for pest resistance, herbicide tolerance, nutritional changes or stress tolerance. Benefits depend on the crop, trait, farming system and local conditions.",
        "Potential risks include gene flow to wild relatives, effects on non-target organisms, changes in pesticide use, resistant pests and unequal access to seed. Risk assessment should be trait- and context-specific rather than treating every GMO as identical.",
        "Genetically engineered microbes can manufacture medicines such as insulin or enzymes. Purification, quality control, sterility and consistent dosing remain essential even when production is successful."
      ]},
      {title:"Microarrays, bioinformatics and evidence",intro:"Large molecular data sets can reveal patterns, but interpretation requires controls and biological validation.",points:[
        "A microarray contains many DNA probes fixed at known positions. Fluorescently labelled sample nucleic acid binds complementary probes; signal intensity estimates relative expression under the tested conditions.",
        "Normalisation, biological replicates and appropriate controls help distinguish real expression changes from technical variation. A changed transcript level does not automatically mean a changed protein level or phenotype.",
        "Bioinformatics compares sequences, predicts genes and identifies similarities. Database matches support hypotheses about function but should be tested experimentally, especially when sequence similarity is partial."
      ]}
    ],reviewPrompt:"What evidence would you need to show that a genetically modified organism produces the intended trait without an unacceptable ecological effect?"},
    U6T1:{sections:[
      {title:"Advanced practical planning",intro:"A2 practical questions reward precise methods, controlled comparisons and justified analysis choices.",points:[
        "Translate the question into measurable independent and dependent variables, define a suitable range and plan enough repeats. Use a control or comparison group that differs only in the factor being tested.",
        "Specify the organism or material, equipment, measurement interval, incubation or equilibration time and how contamination or observer bias will be reduced. Include ethical and safety controls.",
        "When a biological process changes over time, sample at intervals that resolve the trend and stop before conditions become limiting or unsafe. A pilot can identify an appropriate range and method."
      ]},
      {title:"Data, statistics and evaluation",intro:"Analysis should match the design and produce a conclusion that is limited to the evidence collected.",points:[
        "Choose a statistical test based on the question, data type, sample structure and distribution. State H₀ and H₁, calculate or obtain the test statistic, compare with the correct critical value or p-value, then conclude in context.",
        "Report means with a measure of spread where appropriate, graph raw or transformed data clearly and include units. Identify anomalies using a stated rule rather than deleting inconvenient values.",
        "Evaluate precision, validity, reliability and generalisability separately. Suggest a specific improvement and explain which source of error or limitation it addresses."
      ]},
      {title:"Writing a high-quality practical answer",intro:"A reproducible method is detailed enough that another student could follow it without guessing.",points:[
        "Use numbered steps, name the instrument and state exactly what is measured. Avoid vague instructions such as use a small amount, keep conditions the same or repeat several times.",
        "Record raw data with headings and units, calculate derived quantities transparently and use sensible significant figures. Draw graph axes to use most of the available area.",
        "Separate results from interpretation: first report the pattern and uncertainty, then explain the biological mechanism and state how strongly the data support the hypothesis."
      ]}
    ],reviewPrompt:"Could a different student reproduce the method and make the same analysis choices from your plan?"}
  };
  SUBJECT_BIOLOGY.units.forEach(function(u){u.topics.forEach(function(t){if(extra[t.id]){t.notes.sections=extra[t.id].sections;t.notes.reviewPrompt=extra[t.id].reviewPrompt;}});});
})();
