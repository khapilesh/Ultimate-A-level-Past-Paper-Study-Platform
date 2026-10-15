/* Expanded, original Chemistry notes mapped to the chapter outline supplied by the student. */
(function(){
  var extra = {
    U1T1:{sections:[
      {title:"Formulae, equations and reaction types",intro:"A chemical equation represents conservation of atoms and, for ionic equations, charge.",points:[
        "Write correct formulae before balancing. Balance by changing coefficients, never subscripts; then check every element and, in an ionic equation, total charge on both sides.",
        "A net ionic equation removes spectator ions and shows only species that undergo chemical change. Include state symbols when the physical state affects the reaction or the question requests them.",
        "For an empirical formula, convert each element’s mass or percentage to moles, divide by the smallest amount and scale to a whole-number ratio. Use the relative molecular mass to obtain the molecular formula multiplier."
      ]},
      {title:"Amount of substance and reacting masses",intro:"The mole connects particle number to a measurable mass, volume or concentration.",points:[
        "Amount n = mass m ÷ molar mass M. Number of particles N = nNₐ, where Nₐ is Avogadro’s constant. Use molar masses in g mol⁻¹ when mass is in grams.",
        "Use the balanced equation’s coefficients as mole ratios. Identify the limiting reagent by comparing available moles divided by their coefficients; the limiting reagent determines the maximum product.",
        "Percentage yield = actual yield ÷ theoretical yield × 100. Atom economy = Mr of desired product ÷ sum of Mr of all products × 100; a high atom economy does not automatically mean a safe or low-impact process."
      ]},
      {title:"Solutions, gases and concentration",intro:"Concentration calculations are reliable only when volume and amount use compatible units.",points:[
        "For a solution, c = n/V. Convert cm³ to dm³ by dividing by 1000. For titration calculations, use the balanced equation to relate the known solution moles to unknown moles before calculating concentration.",
        "For an ideal gas, pV = nRT; use pressure in pascals, volume in cubic metres and temperature in kelvin with R = 8.31 J mol⁻¹ K⁻¹. If the question supplies a molar gas volume, use its stated conditions.",
        "A mass concentration in g dm⁻³ can be converted to molar concentration by dividing by molar mass. Parts per million in dilute aqueous samples is often approximated as mg dm⁻³, but state the assumption and basis."
      ]}
    ],reviewPrompt:"Can you identify the limiting reagent before calculating the theoretical yield?"},
    U1T2:{sections:[
      {title:"Atomic structure, isotopes and relative mass",intro:"Atomic number and mass number distinguish elements and isotopes; relative masses are weighted averages of isotopic masses.",points:[
        "An atom has a tiny positive nucleus containing protons and neutrons with electrons in surrounding orbitals. The proton number defines the element; isotopes differ in neutron number but have similar chemical behaviour.",
        "Relative atomic mass Ar is the weighted mean of isotope masses relative to one-twelfth of a carbon-12 atom. Calculate it from isotopic masses and fractional abundances; percentage abundances must sum to 100%.",
        "A mass spectrum separates ions by mass-to-charge ratio m/z. The molecular ion can indicate molecular mass when present; fragment peaks provide structural clues, but a spectrum should be interpreted with other evidence."
      ]},
      {title:"Orbitals and electron configuration",intro:"Electrons occupy orbitals in energy levels; configuration explains chemical properties and periodic patterns.",points:[
        "An orbital is a region of space with a high probability of finding an electron. s orbitals are spherical and p orbitals are dumbbell-shaped; each orbital holds up to two electrons with opposite spin.",
        "Build configurations using increasing orbital energy, Pauli exclusion and Hund’s rule. For transition-metal ions, remove electrons from the 4s orbital before 3d, even though 4s fills first in neutral atoms.",
        "The periodic table is arranged by proton number. Elements in a group have related outer-shell configurations, while successive periods fill additional principal energy levels."
      ]},
      {title:"Ionisation energy and periodicity",intro:"Ionisation energy depends on nuclear attraction, shielding and distance from the nucleus.",points:[
        "First ionisation energy is the energy needed to remove one electron from each atom in one mole of gaseous atoms to form one mole of gaseous 1+ ions. Include gaseous state symbols in a definition or equation.",
        "Across a period, nuclear charge generally increases while shielding changes less, so first ionisation energy tends to rise. Small dips occur when an electron enters a higher-energy p subshell or pairs with another electron in an orbital.",
        "Down a group, increased distance and shielding usually outweigh increased nuclear charge, so outer electrons are easier to remove. Successive ionisation energies show a large jump after all electrons in an outer shell have been removed."
      ]}
    ],reviewPrompt:"Can you explain an ionisation-energy trend using nuclear charge, shielding and distance rather than just saying atoms get bigger?"},
    U1T3:{sections:[
      {title:"Ionic, covalent and metallic bonding",intro:"Bonding models explain how electrons and nuclei interact; use the model appropriate to the substance and its structure.",points:[
        "Ionic bonding is electrostatic attraction between oppositely charged ions formed by electron transfer. Ionic solids form giant lattices; high melting points reflect strong attractions throughout the lattice, not a single pairwise bond.",
        "Covalent bonding is a shared pair of electrons attracted to both nuclei. Dative covalent bonding occurs when both electrons in the shared pair are donated by one atom; once formed, the bond behaves like other covalent bonds.",
        "Metallic bonding is attraction between positive metal ions and delocalised electrons. The mobile electrons explain electrical and thermal conductivity; layers of ions can slide, explaining malleability."
      ]},
      {title:"Shapes, polarity and intermolecular forces",intro:"Electron-pair repulsion predicts molecular geometry; bond polarity and molecular symmetry determine overall polarity.",points:[
        "Electron pairs repel and arrange as far apart as possible. Lone pairs repel more strongly than bonding pairs, so they reduce bond angles; use the correct number of bonding and lone pairs around the central atom.",
        "A polar bond has unequal electron sharing due to an electronegativity difference. A molecule is polar only if its bond dipoles do not cancel by symmetry; a polar bond does not guarantee a polar molecule.",
        "Intermolecular forces include London dispersion, permanent dipole–dipole attractions and hydrogen bonding when H is bonded to N, O or F and attracted to a lone pair. Stronger intermolecular attractions generally raise boiling point, all else equal."
      ]},
      {title:"Lattices and structure–property relationships",intro:"Bulk properties depend on whether particles are ions, atoms or molecules and how they are arranged.",points:[
        "Simple molecular substances have covalent bonds within molecules and weaker intermolecular forces between them. They often have low melting points and do not conduct electricity because they lack mobile charged particles.",
        "Giant covalent structures such as diamond and silicon dioxide have many strong covalent bonds and high melting points. Graphite has layers and delocalised electrons; graphene is a single strong, conductive carbon layer.",
        "Ionic solids conduct only when ions can move, usually when molten or dissolved. Metallic solids conduct through delocalised electrons. Explain a property by linking structure, the particles present and their mobility or bonding strength."
      ]}
    ],reviewPrompt:"Can you explain why a substance conducts in one physical state but not another using the mobile charge carriers?"},
    U1T4:{sections:[
      {title:"Organic language, formulae and isomerism",intro:"Organic structures are described by carbon skeleton, functional group and homologous-series behaviour.",points:[
        "A displayed formula shows every atom and bond; a structural formula shows how atoms are connected; a skeletal formula omits carbon symbols and carbon-bound hydrogens. Interpret each representation consistently.",
        "A homologous series has the same functional group and general formula, with successive members differing by CH₂. Members show similar chemical reactions and gradual changes in physical properties.",
        "Name the longest chain containing the principal functional group, number it to give the lowest suitable locants, then identify substituents and suffix. Structural isomers have the same molecular formula but different connectivity.",
        "A curly arrow represents movement of an electron pair. Start it at a lone pair or bond and end it at an atom or bond; do not start it at a positive charge."
      ]},
      {title:"Alkanes, crude oil and fuels",intro:"Alkanes are relatively unreactive saturated hydrocarbons and are important fuels and chemical feedstocks.",points:[
        "Crude oil is a mixture separated by fractional distillation according to boiling range. Shorter-chain fractions generally have lower boiling points, lower viscosity and greater volatility than longer-chain fractions.",
        "Complete combustion in excess oxygen produces carbon dioxide and water. Incomplete combustion can produce carbon monoxide or carbon, so equation balancing and oxygen supply matter for safety and emissions.",
        "Cracking converts long-chain hydrocarbons into shorter alkanes and alkenes, helping match supply to demand and providing feedstock. Catalytic cracking and thermal cracking use different conditions and product distributions.",
        "Alkanes undergo free-radical substitution with halogens under ultraviolet light. Initiation forms radicals; propagation steps transfer the radical; termination combines radicals. Mixtures can form because substitution may occur at different positions."
      ]},
      {title:"Risks, fuels and sustainability",intro:"Comparing fuels requires more than comparing energy released per mole.",points:[
        "Evaluate a fuel by energy per unit mass or volume, availability, storage, cost, pollutants, greenhouse-gas emissions and infrastructure. Combustion of biofuels may recycle recent carbon but still has land-use and processing impacts.",
        "Hydrogen releases water at the point of use in a fuel cell, but lifecycle emissions depend on how hydrogen is produced, compressed, transported and stored.",
        "A risk assessment identifies hazard, likelihood and severity, then applies controls such as ventilation, ignition control and suitable PPE. A flammable substance is a hazard; the risk depends on exposure and conditions."
      ]}
    ],reviewPrompt:"Can you distinguish a hazard from a risk and name the mechanism and stages of free-radical substitution?"},
    U1T5:{sections:[
      {title:"Alkenes and geometric isomerism",intro:"The carbon–carbon double bond contains a σ bond and a π bond; the π bond restricts rotation and enables addition reactions.",points:[
        "Alkenes have general formula CₙH₂ₙ for an acyclic molecule with one double bond. The double-bond carbons are approximately trigonal planar, and addition converts the π bond into two new σ bonds.",
        "E/Z isomerism occurs when each carbon of a C=C bond has two different substituents. Compare priorities on each carbon using the first point of difference; higher-priority groups on the same side are Z, opposite sides are E.",
        "Cis/trans notation is a simpler special case when matching groups make the comparison clear. Do not apply E/Z to a double bond where one carbon has two identical substituents."
      ]},
      {title:"Electrophilic addition and polymerisation",intro:"Alkenes react with electrophiles because the electron-rich π bond attracts electron-deficient species.",points:[
        "In electrophilic addition, the π bond polarises a reagent and an electrophile accepts an electron pair. Show the dipole, curly arrows, intermediate and second step; follow the conditions and product stated in the question.",
        "Hydrogenation adds H₂ across the double bond, halogenation adds X₂, and hydration adds water under acidic conditions. Bromine water is decolourised by an alkene, providing a test for unsaturation.",
        "Addition polymerisation opens C=C bonds so many alkene monomers form a saturated carbon backbone. Draw the repeat unit in brackets with continuation bonds through the brackets and show the repeat number n outside.",
        "Polymer disposal involves trade-offs: mechanical recycling can be limited by contamination and mixed polymers; combustion recovers energy but emits gases; biodegradable polymers require suitable conditions and are not guaranteed to disappear in every environment."
      ]}
    ],reviewPrompt:"Can you draw an alkene repeat unit with correct continuation bonds and explain why E/Z isomerism is possible?"},
    U2T6:{sections:[
      {title:"Enthalpy change and calorimetry",intro:"Enthalpy change describes heat transfer at constant pressure; the sign records whether a reaction releases or absorbs energy.",points:[
        "An exothermic reaction releases heat to surroundings and has ΔH < 0; an endothermic reaction absorbs heat and has ΔH > 0. State the system and surroundings when explaining the sign.",
        "In a simple calorimetry experiment, q = mcΔT and ΔH = −q/n for the limiting amount reacted. The negative sign accounts for heat gained by solution when the reaction loses heat.",
        "Experimental enthalpies can be less exothermic than accepted values because of heat loss, incomplete reaction, evaporation, poor insulation or assumptions about solution density and heat capacity. Suggest improvements that address a named loss."
      ]},
      {title:"Enthalpy diagrams, Hess’s law and bond enthalpy",intro:"Hess’s law follows from enthalpy being a state function: the net change depends only on initial and final states.",points:[
        "Draw an energy-level diagram with reactants and products at the correct relative enthalpy. Activation energy is not the same as enthalpy change; a catalyst lowers activation energy without changing ΔH.",
        "Use Hess’s law to combine known equations so unwanted species cancel and the target equation remains. Reverse an equation to reverse the sign of ΔH; multiply an equation by a factor to multiply ΔH by the same factor.",
        "Mean bond enthalpy estimates ΔH from bonds broken minus bonds formed. Breaking bonds is endothermic and forming bonds is exothermic; mean gas-phase values produce estimates, especially when the molecular environment differs."
      ]},
      {title:"Standard enthalpy changes",intro:"A standard enthalpy change refers to defined standard states and a stated amount of substance.",points:[
        "Standard enthalpy of combustion is the enthalpy change when one mole of a substance is completely burned in oxygen under standard conditions with substances in their standard states.",
        "Standard enthalpy of formation is the enthalpy change when one mole of a compound forms from its elements in their standard states. The standard formation enthalpy of an element in its standard state is zero.",
        "Standard enthalpy of neutralisation is defined per mole of water formed in the reaction of acid and alkali. A strong acid–strong base value is similar because the net ionic equation is H⁺ + OH⁻ → H₂O."
      ]}
    ],reviewPrompt:"When using a Hess cycle, can you show how each equation is reversed or scaled and how the ΔH sign changes?"},
    U2T7:{sections:[
      {title:"Oxidation, reduction and oxidation numbers",intro:"Redox reactions transfer electrons; oxidation numbers provide a bookkeeping method for identifying changes.",points:[
        "Oxidation is loss of electrons and reduction is gain of electrons. Oxidising agents accept electrons and are reduced; reducing agents donate electrons and are oxidised.",
        "An element in its uncombined state has oxidation number zero; a monatomic ion has its ionic charge. The sum of oxidation numbers equals the overall charge, with standard exceptions for oxygen, hydrogen and peroxides.",
        "An increase in oxidation number indicates oxidation and a decrease indicates reduction. Identify both changes before naming the oxidising and reducing agents."
      ]},
      {title:"Half-equations and ionic equations",intro:"Half-equations make electron transfer explicit and help balance redox reactions in acidic or alkaline solution.",points:[
        "Balance atoms other than oxygen and hydrogen first. Balance oxygen with H₂O and hydrogen with H⁺ in acidic solution; balance charge with electrons. In alkaline solution, add OH⁻ to remove H⁺ and simplify water molecules.",
        "Multiply half-equations so electrons cancel, add them and cancel species appearing on both sides. Check atoms and charge in the final equation.",
        "In halogen displacement, a more reactive halogen oxidises halide ions of a less reactive halogen. The halogen is reduced to halide; write the ionic equation and state observations separately."
      ]},
      {title:"Redox naming and chemical tests",intro:"Oxidation-number notation clarifies compounds with variable oxidation states and links equations to observations.",points:[
        "Use Roman numerals in names such as iron(III) when the metal can form more than one oxidation state. The numeral gives the oxidation state, not the number of atoms.",
        "A precipitation observation, colour change or gas test can support a reaction identification, but state the reagent and positive observation accurately. For halide ions, silver nitrate tests are interpreted after suitable acidification to remove interfering carbonate ions.",
        "When writing a reaction sequence, include conditions and state symbols where they distinguish species; do not infer a redox change only from a colour change without checking oxidation states."
      ]}
    ],reviewPrompt:"Can you identify which species is oxidised and which is reduced by comparing oxidation numbers before and after?"},
    U2T8:{sections:[
      {title:"Trends in Groups 1 and 2",intro:"Group trends reflect changing atomic radius, shielding and attraction between the nucleus and valence electrons.",points:[
        "Group 1 metals lose one outer electron to form 1+ ions; Group 2 metals lose two to form 2+ ions. Reactivity generally increases down each group as outer electrons are farther from the nucleus and easier to remove.",
        "Group 2 elements are generally less reactive than Group 1 elements in the same period because they must remove two electrons and have a higher first and second ionisation-energy cost overall.",
        "Oxides and hydroxides show trends in basicity and solubility. State the observed trend and link it to bonding or lattice/hydration energetics only when the evidence supports that explanation."
      ]},
      {title:"Reactions and thermal stability",intro:"Group reactions can be predicted from electron loss, ion formation and the stability of products.",points:[
        "Group 1 metals react with water to form an alkaline hydroxide and hydrogen; the reaction becomes more vigorous down the group. Group 2 metals also form hydroxides and hydrogen, with reactivity increasing down the group.",
        "Group 2 carbonates decompose on heating to metal oxide and carbon dioxide. Thermal stability generally increases down the group because larger cations polarise the carbonate ion less strongly.",
        "Group 2 nitrates decompose on heating to oxide, nitrogen dioxide and oxygen. Balance equations and use the correct colour of nitrogen dioxide, a toxic brown gas."
      ]},
      {title:"Group 7, halides and identification",intro:"Halogen reactivity decreases down the group as the ability of the atom to gain an electron decreases.",points:[
        "Halogens exist as diatomic molecules and form 1− halide ions by gaining one electron. A more reactive halogen displaces a less reactive halide from solution.",
        "Halide ions react with concentrated sulfuric acid by acid–base and redox pathways. Fluoride and chloride mainly produce hydrogen halide; bromide and iodide can also reduce sulfuric acid, producing additional products.",
        "Flame tests arise from excited electrons emitting characteristic wavelengths as they return to lower energy levels. Clean the wire loop between samples; sodium contamination gives a strong yellow emission that can mask other colours."
      ]}
    ],reviewPrompt:"Why does the thermal stability of Group 2 carbonates generally increase down the group?"},
    U2T9:{sections:[
      {title:"Collision theory and reaction rate",intro:"A reaction occurs when particles collide with sufficient energy and a suitable orientation.",points:[
        "Rate can be measured as change in concentration, mass or volume per unit time. Use initial rates when comparing conditions before reactant concentrations change significantly.",
        "Increasing concentration or gas pressure increases collision frequency; increasing temperature raises particle kinetic energy and the fraction of collisions above activation energy.",
        "Increasing surface area exposes more particles for collision. A catalyst provides an alternative pathway with lower activation energy and is regenerated; it does not change the equilibrium position."
      ]},
      {title:"Reversible reactions and dynamic equilibrium",intro:"In a closed system at dynamic equilibrium, forward and reverse reaction rates are equal while concentrations remain constant.",points:[
        "A reversible reaction can proceed in both directions. At equilibrium, reactants and products remain present; equal rates do not mean equal concentrations or that the reaction has stopped.",
        "Changing concentration or pressure shifts the position of equilibrium in the direction that partially opposes the imposed change. A catalyst speeds both directions and helps equilibrium establish sooner without changing its composition.",
        "Temperature changes the equilibrium constant: increasing temperature favours the endothermic direction. Pressure changes can shift gaseous equilibria only when the number of gas molecules differs between the sides."
      ]},
      {title:"Rate, equilibrium and industrial choices",intro:"Industrial conditions balance rate, yield, cost, energy use and safety rather than maximising a single factor.",points:[
        "Higher temperature often increases rate but may reduce yield for an exothermic forward reaction. Higher pressure can favour the side with fewer gas molecules but costs more to maintain.",
        "A catalyst allows a lower operating temperature or faster approach to equilibrium, improving economics while leaving the equilibrium constant unchanged.",
        "When evaluating an industrial process, state the predicted equilibrium effect, the kinetic effect and at least one practical trade-off such as energy, equipment cost, safety or separation."
      ]}
    ],reviewPrompt:"Which changes alter the rate of reaching equilibrium, which change equilibrium composition, and which change K?"},
    U2T10:{sections:[
      {title:"Halogenoalkanes and hydrolysis",intro:"The polar carbon–halogen bond makes halogenoalkanes susceptible to nucleophilic substitution.",points:[
        "In hydrolysis with aqueous hydroxide, OH⁻ acts as a nucleophile and replaces the halogen, forming an alcohol and a halide ion. Draw curly arrows from the electron pair on OH⁻ to carbon and from the C–X bond to X.",
        "Hydrolysis rates depend on the C–X bond strength, bond polarity and mechanism. C–I is weaker than C–Br and C–Cl, so iodoalkanes commonly hydrolyse faster under comparable conditions.",
        "A silver nitrate test can detect halide ions released during hydrolysis by forming a silver halide precipitate. Compare times to precipitate under controlled temperature, concentrations and volumes."
      ]},
      {title:"Alcohols and oxidation",intro:"Alcohol reactions depend on functional-group structure and conditions; primary, secondary and tertiary alcohols behave differently on oxidation.",points:[
        "Primary alcohols can be oxidised to aldehydes with distillation to remove product, or to carboxylic acids under reflux with excess oxidising agent. Secondary alcohols oxidise to ketones; tertiary alcohols resist oxidation under these conditions.",
        "Acidified dichromate changes from orange to green when reduced. State whether the alcohol is distilled or refluxed, the oxidising agent and the product; conditions determine whether oxidation continues.",
        "Dehydration eliminates water to form an alkene under acidic or heated conditions. Substitution with hydrogen halides or other reagents can form different functional groups; specify conditions."
      ]},
      {title:"Organic spectra and purification",intro:"Spectra provide complementary evidence for functional groups and molecular mass; purification improves sample quality.",points:[
        "Mass spectrometry gives m/z values for ions. The molecular ion may indicate relative molecular mass, while fragment patterns can help distinguish structural isomers; isotope peaks can reveal elements such as chlorine or bromine.",
        "Infrared spectroscopy measures absorption of frequencies that change bond vibrations. A broad O–H absorption, strong C=O absorption or C–H region can support a functional-group assignment, but use the spectrum’s specified range and context.",
        "Reflux heats a mixture while vapour condenses back to the flask; distillation removes a volatile product as it forms. A separating funnel handles immiscible liquids, and drying agents remove traces of water before final distillation."
      ]}
    ],reviewPrompt:"How do the conditions of oxidation distinguish an aldehyde product from a carboxylic acid product?"},
    U3T1:{sections:[
      {title:"Making standard solutions and titrations",intro:"Quantitative practical work depends on accurate transfer, correct endpoint detection and careful recording.",points:[
        "To prepare a standard solution, accurately weigh solute, dissolve it in a beaker, transfer quantitatively to a volumetric flask, rinse transfer equipment into the flask, make up to the calibration mark and invert to mix.",
        "Rinse a burette with titrant and a pipette with the solution it will contain. Remove the funnel before reading, record initial and final burette readings to the instrument precision and add titrant while swirling.",
        "Use a rough titration to locate the endpoint, then add titrant dropwise near the endpoint. Repeat until concordant titres are obtained and use only concordant values for the mean as specified."
      ]},
      {title:"Errors, uncertainty and data quality",intro:"Accuracy and precision require different checks, and the largest uncertainty often comes from a small measured difference.",points:[
        "A systematic error shifts results consistently, for example a miscalibrated balance. Random error causes scatter and can be reduced by repeats; repeating does not remove a systematic error.",
        "Percentage uncertainty = absolute uncertainty ÷ measured value × 100. In a titre found from two burette readings, account for uncertainty in both readings; a small titre gives a larger percentage uncertainty.",
        "Accuracy is closeness to the accepted value; precision is repeatability. A good mean of concordant titres may still be inaccurate if the indicator endpoint is systematically offset."
      ]},
      {title:"Safety and practical evaluation",intro:"Laboratory controls should be proportional to chemical hazards and written as actionable steps.",points:[
        "Check reagent hazards and use eye protection, suitable gloves and a fume cupboard where required. Handle corrosive acids and alkalis carefully and dispose of heavy-metal or organic waste using local procedures.",
        "An indicator changes colour over a pH range; choose one whose transition range lies within the steep section of the titration curve. A pH probe can reduce subjective endpoint judgement if calibrated.",
        "When evaluating a titration, identify the actual source of error and its effect on titre or concentration. Improvements include rinsing correctly, reading at eye level, adding dropwise and using volumetric rather than measuring glassware."
      ]}
    ],reviewPrompt:"Why should only concordant titres be averaged, and what kind of error can repeating not remove?"},
    U4T11:{sections:[
      {title:"Rate equations, orders and rate constants",intro:"The rate equation is determined experimentally; it cannot generally be read from the balanced equation.",points:[
        "For rate = k[A]ᵐ[B]ⁿ, the order with respect to A is m, with respect to B is n and overall order is m+n. A zero-order reactant does not affect rate under the measured conditions.",
        "Compare experiments where only one reactant concentration changes. A doubling that doubles rate indicates first order; a doubling that quadruples rate indicates second order; unchanged rate suggests zero order.",
        "The units of k depend on overall order. Derive them by rearranging the rate equation so the final units give concentration per unit time; include time and concentration units consistently."
      ]},
      {title:"Mechanisms and activation energy",intro:"A proposed mechanism must reproduce the experimental rate law and conserve atoms and charge.",points:[
        "The slow step can determine the observed rate, but intermediates do not appear in the overall equation. A valid mechanism’s steps must sum to the overall reaction and be consistent with the rate equation.",
        "Activation energy is the minimum energy needed for a successful reaction pathway. A catalyst provides an alternative route with lower activation energy and is regenerated at the end.",
        "At higher temperature, the fraction of molecules with energy at least Ea increases markedly. The Arrhenius equation k = A e^(−Ea/RT) links rate constant to temperature; a plot of ln k against 1/T has gradient −Ea/R."
      ]},
      {title:"Measuring rates and interpreting data",intro:"Initial-rate and continuous-monitoring methods reveal different features of reaction progress.",points:[
        "Initial rates can be estimated from the tangent to a concentration–time curve at t = 0 or from an initial change in mass, gas volume, colour or absorbance.",
        "A clock reaction estimates the time to a fixed endpoint; under consistent conditions, rate may be proportional to 1/time. Explain why the endpoint corresponds to the same amount of reaction in each run.",
        "Use an excess of one reactant or keep other variables constant when determining an order. Replicates, temperature control and a calibrated instrument improve the reliability of the result."
      ]}
    ],reviewPrompt:"Can you derive the units of k directly from a rate equation and explain how a catalyst changes activation energy?"},
    U4T12:{sections:[
      {title:"Entropy and spontaneity",intro:"Entropy describes the dispersal of energy and matter among accessible arrangements; it is not simply disorder.",points:[
        "Entropy generally increases when a solid becomes a liquid or gas, when gas particles increase in number, or when a substance dissolves into separated particles, although hydration and ordering can affect the total change.",
        "The second law requires the total entropy change of system plus surroundings to be positive for a spontaneous process. A system’s entropy can decrease if the surroundings’ entropy increases by more.",
        "Under standard conditions, ΔG° = ΔH° − TΔS° can relate enthalpy and entropy to feasibility. A negative ΔG° indicates thermodynamic favourability in the stated standard conditions, not necessarily a fast reaction."
      ]},
      {title:"Lattice energy and Born–Haber cycles",intro:"A Born–Haber cycle applies Hess’s law to relate lattice energy to measurable or tabulated enthalpy changes.",points:[
        "Lattice enthalpy has sign conventions: formation from gaseous ions is exothermic, while separation of a solid ionic lattice into gaseous ions is endothermic. State which convention is being used before calculating.",
        "A Born–Haber cycle includes atomisation, bond dissociation, ionisation energies, electron affinities and lattice enthalpy. The sum around the cycle is zero; reverse a step by reversing its sign.",
        "Theoretical lattice energy assumes ions are spherical point charges. Differences from experimental values can indicate covalent character or limitations of the ionic model; compare magnitudes using a consistent sign convention."
      ]},
      {title:"Enthalpy of solution and hydration",intro:"Dissolving an ionic solid involves separating ions and hydrating them; the balance determines whether dissolution is endothermic or exothermic.",points:[
        "Enthalpy of solution can be related to lattice dissociation enthalpy and hydration enthalpies of the gaseous ions. Separating the lattice costs energy; hydration releases energy.",
        "Smaller and more highly charged ions often have more exothermic hydration enthalpies because their charge density is greater, but compare both cation and anion contributions.",
        "A salt can dissolve spontaneously even if dissolution is endothermic when the entropy change is sufficiently favourable. Thermodynamic feasibility does not specify the rate of dissolution."
      ]}
    ],reviewPrompt:"Before using a Born–Haber cycle, can you define the lattice-energy sign convention and orient every arrow?"},
    U4T13:{sections:[
      {title:"Equilibrium constants Kc and Kp",intro:"An equilibrium constant quantifies the composition of a system at equilibrium at a specified temperature.",points:[
        "For aA + bB ⇌ cC + dD, Kc = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ using equilibrium concentrations. Pure solids and pure liquids are omitted because their activities are effectively constant.",
        "For gaseous equilibria, Kp uses partial pressures raised to their stoichiometric powers. Use consistent pressure units and the exact expression requested.",
        "A large K indicates products are favoured at equilibrium; a small K indicates reactants are favoured. K does not describe how quickly equilibrium is reached."
      ]},
      {title:"Changing conditions and equilibrium composition",intro:"Le Chatelier’s principle predicts a shift that partially opposes a disturbance, while the equilibrium constant has a specific dependency.",points:[
        "Changing concentration or pressure changes the reaction quotient and composition as the system re-equilibrates, but does not change K at constant temperature.",
        "Changing temperature changes K: heating favours the endothermic direction and cooling favours the exothermic direction. A catalyst speeds both directions and does not alter K or the final equilibrium composition.",
        "Changing pressure affects a gas equilibrium when the total number of gaseous moles differs between the sides; it has no shift effect when those numbers are equal. Inert gas effects depend on whether volume or pressure is held constant."
      ]},
      {title:"Equilibrium calculations and industrial processes",intro:"Use an ICE-style table to organise initial, change and equilibrium amounts, then substitute into the equilibrium expression.",points:[
        "Write the balanced equation and K expression first. Convert supplied moles to concentrations or partial pressures, represent changes using stoichiometric coefficients, and solve the resulting equation with physically valid roots.",
        "For industrial synthesis, compromise among equilibrium yield, reaction rate, operating temperature, pressure, catalyst, separation and safety. Removing product can shift equilibrium and raise conversion.",
        "The relationship ΔG° = −RT ln K links standard Gibbs energy and K for a specified temperature. It does not mean a reaction with large K must be fast."
      ]}
    ],reviewPrompt:"Which changes alter K, and which only change the equilibrium mixture or the time needed to reach it?"},
    U4T14:{sections:[
      {title:"Acid–base theory, pH and Ka",intro:"Brønsted–Lowry acids donate protons and bases accept protons; strength describes extent of ionisation, not concentration.",points:[
        "A conjugate acid–base pair differs by one proton. A strong acid ionises almost completely in water; a weak acid establishes an equilibrium and ionises only partially at a given concentration.",
        "pH = −log₁₀[H⁺] and [H⁺] = 10⁻ᵖᴴ. For a weak acid HA, Ka = [H⁺][A⁻]/[HA] at equilibrium; a larger Ka means greater dissociation under comparable conditions.",
        "Kw = [H⁺][OH⁻] and changes with temperature. At 25 °C, pH + pOH = 14 approximately; state temperature where required and avoid assuming neutral pH is always exactly 7."
      ]},
      {title:"Titrations, pH curves and indicators",intro:"A titration curve shows how pH changes as titrant is added; the equivalence point is defined by stoichiometry, not indicator colour alone.",points:[
        "For a strong acid–strong base titration, the equivalence-point pH is about 7 at 25 °C. Weak-acid/strong-base and strong-acid/weak-base titrations have different equivalence pH values and buffer regions.",
        "Choose an indicator whose colour-change interval lies within the steep vertical section of the curve. A pH meter provides a continuous curve when calibrated with appropriate buffers.",
        "At half-neutralisation of a weak acid by strong base, [HA] = [A⁻], so pH = pKa. This relationship is useful for reading pKa from a titration curve."
      ]},
      {title:"Buffer solutions and calculations",intro:"A buffer resists pH change because it contains a weak acid/base and its conjugate partner.",points:[
        "An acidic buffer contains HA and A⁻. Added H⁺ is removed by A⁻; added OH⁻ is neutralised by HA. The buffer has finite capacity, so a sufficiently large addition changes pH substantially.",
        "The Henderson–Hasselbalch form pH = pKa + log₁₀([A⁻]/[HA]) is useful when both components are present. Use mole ratios after mixing if volumes are common, and account for any neutralisation before applying the expression.",
        "A buffer is most effective when the acid and conjugate base concentrations are comparable. Dilution reduces capacity even if the ratio, and therefore approximate pH, remains similar."
      ]}
    ],reviewPrompt:"Why does a buffer resist added acid and base, and why does dilution reduce its capacity?"},
    U4T15:{sections:[
      {title:"Chirality and optical activity",intro:"A chiral molecule and its mirror image are non-superimposable; the pair are enantiomers.",points:[
        "A tetrahedral carbon attached to four different groups is a chiral centre. Enantiomers have the same connectivity and most physical properties in an achiral environment but rotate plane-polarised light in opposite directions.",
        "A racemic mixture contains equal amounts of both enantiomers and shows no net optical rotation because the rotations cancel. A polarimeter measures rotation; it does not by itself identify a molecule’s full structure.",
        "A reaction that creates a chiral centre can form a racemic mixture if attack occurs equally from either face of a planar intermediate. Chiral reagents, catalysts or environments can favour one enantiomer."
      ]},
      {title:"Carbonyl compounds and reactions",intro:"A carbonyl bond is polar, with an electrophilic carbon that can be attacked by nucleophiles.",points:[
        "Aldehydes have a terminal carbonyl group and ketones an internal carbonyl. Their intermolecular forces include permanent dipole attractions; they cannot hydrogen-bond to themselves as donors unless another suitable group is present.",
        "Aldehydes can be oxidised to carboxylic acids; ketones resist oxidation under mild conditions. Reduction of aldehydes gives primary alcohols and reduction of ketones gives secondary alcohols.",
        "In nucleophilic addition, a nucleophile donates an electron pair to the carbonyl carbon and the C=O π pair moves to oxygen. Subsequent protonation can form an alcohol; show charge and curly-arrow movement clearly.",
        "Tests such as 2,4-DNPH can indicate a carbonyl compound by forming an orange precipitate; Tollens’ or Fehling’s reagent can distinguish many aldehydes from ketones under specified conditions."
      ]},
      {title:"Carboxylic acids and derivatives",intro:"Carboxylic acids are weak acids; acyl derivatives undergo nucleophilic addition–elimination at the carbonyl carbon.",points:[
        "Carboxylic acids form hydrogen-bonded dimers and have relatively high boiling points. They react with bases to form salts, with carbonates to release carbon dioxide and with alcohols under acid catalysis to form esters.",
        "Acyl chlorides are highly reactive because chloride is a good leaving group and the carbonyl carbon is strongly electrophilic. They react readily with water, alcohols and amines; describe the by-products and use suitable safety precautions.",
        "Esters can be hydrolysed under acidic or alkaline conditions. Condensation polymerisation between suitable monomers forms polyesters or polyamides and releases a small molecule such as water or HCl, depending on the monomers."
      ]}
    ],reviewPrompt:"How does a nucleophilic addition mechanism differ from nucleophilic addition–elimination?"},
    U5T16:{sections:[
      {title:"Standard electrode potentials and feasibility",intro:"Electrode potentials compare reduction tendencies under defined standard conditions; values are measured relative to a reference electrode.",points:[
        "A standard electrode potential is measured relative to the standard hydrogen electrode under specified standard conditions, with all species in standard states and stated concentrations or pressures.",
        "A more positive reduction potential indicates a greater tendency for the reduction half-equation to occur. When combining half-equations, reverse one if required and reverse the sign of its potential only when using ΔE°cell = E°cathode − E°anode.",
        "A positive standard cell potential indicates thermodynamic feasibility in standard conditions for the reaction as written. It does not predict the reaction rate, and non-standard concentrations can change the cell voltage."
      ]},
      {title:"Electrochemical cells and fuel cells",intro:"A galvanic cell converts chemical energy to electrical energy through separated oxidation and reduction half-reactions.",points:[
        "Oxidation occurs at the anode and reduction at the cathode in a galvanic cell. Electrons travel through the external circuit from anode to cathode; ions move through the salt bridge to maintain charge balance.",
        "A salt bridge completes the circuit and prevents direct mixing of the half-cell solutions. Cell notation records phases and the boundary between half-cells; use an inert electrode when no conducting solid reactant is present.",
        "A hydrogen–oxygen fuel cell combines reactants continuously while operating. Its theoretical product is water, but practical performance depends on catalyst, membrane, temperature, reactant supply and how the hydrogen was produced."
      ]},
      {title:"Redox titrations and cells in practice",intro:"Quantitative redox analysis uses electron stoichiometry and a visible or instrumental endpoint.",points:[
        "Balance the redox equation using half-equations, then convert titre volume and concentration to moles and apply the coefficients. Check the reaction conditions, such as acidic solution, before balancing.",
        "A redox indicator changes colour near the equivalence point because its oxidised and reduced forms differ in colour. If the titrant is strongly coloured, it may act as its own indicator.",
        "Measured cell voltages differ from standard values when concentrations, gas pressures or temperature differ from standard conditions; electrode condition and liquid-junction potentials can also affect readings."
      ]}
    ],reviewPrompt:"Can you identify electron direction, anode/cathode and the sign of E°cell for a proposed spontaneous reaction?"},
    U5T17:{sections:[
      {title:"Transition-metal configurations and complexes",intro:"Transition metals form ions and complexes with partially filled d orbitals and coordinate bonds to ligands.",points:[
        "A transition element forms at least one stable ion with an incomplete d subshell. When forming cations, remove 4s electrons before 3d electrons; check the configuration of the ion, not just the neutral atom.",
        "A ligand donates a lone pair to a metal ion to form a coordinate bond. Monodentate ligands attach through one atom; multidentate ligands attach at several sites and can form chelate rings.",
        "Complex shape depends on ligand number and repulsion: common geometries include octahedral, tetrahedral and square planar. State coordination number and ligand identity when naming a complex."
      ]},
      {title:"Colour, reactions and catalysis",intro:"Ligand fields split d-orbital energy levels; absorption and electron transfer can create characteristic colours.",points:[
        "In a complex, d orbitals experience different ligand environments and split in energy. Absorption of a photon can promote an electron between levels; the transmitted or reflected complementary light determines observed colour.",
        "Changing the metal oxidation state, ligand or geometry can change the splitting and hence the observed colour. Some d⁰ or d¹⁰ complexes are colourless because d–d transitions are unavailable, though other transitions can still give colour.",
        "Transition-metal ions can catalyse reactions by changing oxidation state or forming intermediates. A catalyst offers a pathway with lower activation energy and is regenerated overall; demonstrate the cycle if asked for a mechanism.",
        "Ligand substitution changes coordination around a metal ion. Use the correct ligand charge, complex charge and oxidation state when balancing the equation."
      ]},
      {title:"Complex stability and applications",intro:"Coordination chemistry explains pigments, analytical tests and industrial catalytic processes.",points:[
        "Chelating ligands can produce more stable complexes than comparable monodentate ligands because several donor atoms bind one metal ion; this is the chelate effect.",
        "Colour changes can be used in qualitative analysis or as indicators of oxidation state, but colour alone rarely identifies an unknown conclusively. Use confirmatory tests or instrumental evidence.",
        "Homogeneous catalysts share a phase with reactants; heterogeneous catalysts are in a different phase and react at a surface. Surface area, adsorption and desorption affect heterogeneous catalytic rates."
      ]}
    ],reviewPrompt:"How can changing a ligand alter a complex’s colour, and why can transition metals show variable oxidation states?"},
    U5T18:{sections:[
      {title:"Benzene structure and stability",intro:"Benzene’s delocalised π system explains why it is more stable than a model with three localised double bonds.",points:[
        "Benzene is a planar hexagon with six delocalised π electrons above and below the ring. All C–C bonds have equal length, intermediate between typical single and double bonds.",
        "The delocalised model explains equal bond lengths and an enthalpy of hydrogenation less exothermic than predicted for three isolated C=C bonds. This extra stability favours substitution over addition in many reactions.",
        "The circle in a benzene representation denotes delocalisation; it does not mean electrons are static or that the ring has no local electron density."
      ]},
      {title:"Electrophilic substitution and mechanisms",intro:"An electrophile replaces a hydrogen on the aromatic ring while the delocalised system is restored at the end.",points:[
        "The π-electron cloud attracts an electrophile and forms a temporary sigma complex. A base removes H⁺ from the carbon bearing the new substituent, restoring aromatic delocalisation.",
        "Nitration uses a nitronium ion generated from concentrated nitric and sulfuric acids. Halogenation requires a Lewis-acid catalyst such as FeBr₃ or AlCl₃ to polarise the halogen molecule.",
        "Friedel–Crafts alkylation and acylation introduce carbon-containing groups under Lewis-acid catalysis. Alkylation may produce rearrangement or multiple substitution; acylation generally gives better control of substitution."
      ]},
      {title:"Phenol and aromatic substitution",intro:"The hydroxyl group activates the ring and can donate a proton, so phenol has distinctive chemistry.",points:[
        "Phenol is a weak acid: it reacts with sodium and sodium hydroxide but is less acidic than a carboxylic acid. Phenoxide ion is stabilised by delocalisation, though the negative charge is mainly on oxygen.",
        "The –OH group activates the ring and directs electrophilic substitution mainly to the ortho and para positions. Phenol reacts with bromine water under mild conditions to form a tribrominated product and a white precipitate.",
        "When predicting aromatic products, state the reagent, catalyst, conditions and directing effect. Avoid drawing a substitution product without showing that aromaticity is restored."
      ]}
    ],reviewPrompt:"Why does benzene usually undergo substitution rather than addition, and how is aromaticity restored in the mechanism?"},
    U5T19:{sections:[
      {title:"Amines, amides and amino acids",intro:"Nitrogen functional groups vary in basicity and reactivity according to the availability of the nitrogen lone pair.",points:[
        "Amines are weak bases because the nitrogen lone pair can accept a proton. Alkyl groups can increase electron density at nitrogen; an aromatic ring can delocalise the lone pair and reduce basicity.",
        "Amines react with acids to form ammonium salts. Their naming and structure should distinguish primary, secondary and tertiary amines by the number of carbon groups attached to nitrogen.",
        "Amides contain a carbonyl attached to nitrogen; the nitrogen lone pair is delocalised into the carbonyl, so amides are much less basic than amines. Amide links join amino acids in proteins.",
        "Amino acids contain amino and carboxyl groups and can exist as zwitterions with both positive and negative charges. Their side chains determine polarity, charge and interactions during protein folding."
      ]},
      {title:"Peptides, proteins and polymers",intro:"Peptide bonds form by condensation and protein function depends on sequence and three-dimensional structure.",points:[
        "Two amino acids form a dipeptide by eliminating water between the carboxyl group of one and the amino group of another. Peptide direction is written from the N-terminus to the C-terminus.",
        "Primary structure is amino-acid sequence; secondary structure includes α-helices and β-sheets; tertiary structure reflects interactions among side chains; some proteins have quaternary structure from multiple polypeptide chains.",
        "Hydrogen bonds, ionic attractions, disulfide bridges and hydrophobic interactions stabilise folded proteins. Changes in pH or temperature can disrupt these interactions and alter function.",
        "Polyamides form from monomers with amino and carboxyl-derived groups. Draw the repeating amide link correctly and show the small molecule eliminated during condensation."
      ]},
      {title:"Biological and material applications",intro:"The same functional-group chemistry appears in enzymes, medicines, fibres and food proteins.",points:[
        "Protein enzymes are specific catalysts, while structural proteins provide mechanical strength. A change in amino-acid sequence can alter folding and active-site shape, but the effect depends on the position and chemical properties of the substitution.",
        "Synthetic polyamides such as nylon have strong intermolecular interactions and useful tensile properties. Their performance depends on chain length, orientation, crystallinity and processing.",
        "When comparing a natural protein with a synthetic polymer, distinguish monomer composition, type of linkage, three-dimensional structure, biodegradability and performance conditions."
      ]}
    ],reviewPrompt:"Why is an amide nitrogen less basic than an amine nitrogen, and how does peptide sequence affect protein function?"},
    U5T20:{sections:[
      {title:"Organic analysis and mass spectrometry",intro:"Structural identification combines formula, molecular mass, fragmentation and functional-group evidence.",points:[
        "The molecular ion peak can provide Mr when the ion retains the molecule and has charge +1. The base peak is the most abundant fragment, not necessarily the molecular ion.",
        "Chlorine gives characteristic M and M+2 peaks in an approximate 3:1 ratio; bromine gives an approximate 1:1 pair because of natural isotope abundance. Use isotope patterns as evidence, not as the only structural proof.",
        "Fragment ions form when bonds break; stable cations are often abundant. Propose fragments that conserve atoms and charge and are consistent with the parent molecular formula."
      ]},
      {title:"IR, NMR and chromatography",intro:"Spectroscopic methods reveal different parts of the structure; chromatography separates mixtures before or during analysis.",points:[
        "IR spectroscopy detects bond vibrations. Use characteristic absorptions such as O–H, N–H, C=O and C–O ranges given in the course data; a broad or strong shape can be as informative as the exact position.",
        "In proton NMR, chemical shift indicates a proton’s chemical environment, integration estimates relative proton count and splitting reflects neighbouring nonequivalent protons. Equivalent protons usually give one signal; exchangeable OH/NH signals can be variable.",
        "In carbon-13 NMR, the number of signals indicates the number of distinct carbon environments. Combine signal count and chemical shift with molecular symmetry and the molecular formula.",
        "In thin-layer chromatography, Rf = distance travelled by spot ÷ distance travelled by solvent front. HPLC and GC separate by different interactions; retention time alone is not definitive without a standard or detector data."
      ]},
      {title:"Synthesis, purification and route planning",intro:"A synthesis route is a sequence of functional-group transformations with a yield and risk at every step.",points:[
        "Work backwards from the target structure: identify the functional group to make, choose a suitable precursor and list reagents, conditions and intermediates. Check that each step preserves or creates the required carbon skeleton.",
        "A multi-step route has a lower overall yield than any individual step when yields are below 100%; multiply fractional yields to estimate the overall yield. Consider atom economy and available starting materials as well as yield.",
        "Recrystallisation purifies a solid by dissolving it in hot solvent and forming crystals on cooling; filtration and washing remove soluble impurities. Distillation separates liquids using boiling-point differences; drying agents remove traces of water.",
        "A complete practical route includes hazards, control measures, product isolation, purification, evidence of purity and waste disposal. Do not claim a product is pure from a single colour or melting-point observation alone."
      ]}
    ],reviewPrompt:"How do integration, chemical shift and splitting provide different information in a proton NMR spectrum?"},
    U6T1:{sections:[
      {title:"Quantitative and organic practical techniques",intro:"Advanced chemistry practicals combine careful measurement with purification, identification and a transparent uncertainty evaluation.",points:[
        "Prepare reagents using suitable volumetric apparatus and label concentrations and hazards. For a titration, rinse the burette and pipette correctly, approach the endpoint dropwise and obtain concordant results.",
        "Reflux is used when a reaction needs prolonged heating without losing volatile reactants; distillation removes a volatile product. A separating funnel isolates immiscible layers, and a drying agent removes residual water.",
        "Recrystallisation uses a minimum volume of hot solvent, hot filtration if necessary, slow cooling, vacuum filtration and drying. Choose a solvent in which the product is soluble hot and sparingly soluble cold."
      ]},
      {title:"Evidence for identity and purity",intro:"Use more than one independent measurement when confirming an organic product.",points:[
        "A narrow melting-point range close to a reference supports purity; impurities commonly broaden and depress the melting range. A boiling point depends on pressure and thermometer placement.",
        "Use IR to support functional-group identity, NMR to count environments and deduce connectivity, mass spectrometry to infer Mr and fragments, and chromatography to assess mixture composition.",
        "Record raw observations before interpretation. State sample mass, volume, temperature and instrument resolution; repeat and explain any anomalous reading rather than silently omitting it."
      ]},
      {title:"Safety, uncertainty and evaluation",intro:"A reliable method anticipates both chemical hazards and sources of measurement bias.",points:[
        "Identify corrosive, flammable, toxic or volatile reagents and apply suitable controls: eye protection, fume cupboard, ignition-source control and correct waste streams.",
        "A balance, burette, pipette and thermometer have finite resolution. Calculate percentage uncertainty for small measured values and combine uncertainties consistently for derived quantities.",
        "Evaluate the method by naming a limitation, explaining how it affects the product or calculated result and proposing a practical improvement that reduces that specific effect."
      ]}
    ],reviewPrompt:"Which purification method would you choose for a volatile liquid, and what evidence would you use to check its purity?"}
  };
  SUBJECT_CHEMISTRY.units.forEach(function(u){u.topics.forEach(function(t){if(extra[t.id]){t.notes.sections=extra[t.id].sections;t.notes.reviewPrompt=extra[t.id].reviewPrompt;}});});
})();
