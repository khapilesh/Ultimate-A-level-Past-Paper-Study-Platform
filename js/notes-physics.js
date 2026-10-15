/* Expanded, original Physics notes mapped to the chapter outline supplied by the student. */
(function(){
  var extra = {
    U1T1:{sections:[
      {title:"Working as a physicist — quantities, units and estimates",intro:"Every calculation begins with a physical model, a sensible estimate and consistent units.",points:[
        "A physical quantity is a number multiplied by a unit. Use SI base units where possible: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd). Derived units follow from equations, for example a newton is kg m s⁻².",
        "Prefixes are powers of ten: milli = 10⁻³, micro = 10⁻⁶, nano = 10⁻⁹, kilo = 10³ and mega = 10⁶. Convert before substituting; write the conversion as a power of ten to reduce errors.",
        "An estimate checks scale, not precision. Use a known reference, such as a person's height or walking speed, and state the assumptions. If a result differs by several orders of magnitude, recheck unit conversion and powers."
      ]},
      {title:"Displacement, velocity and acceleration",intro:"Displacement is a vector change in position; velocity and acceleration describe how position and velocity change over time.",points:[
        "Average velocity = displacement ÷ time; average speed = total distance ÷ time. Speed is scalar and cannot be negative, while a signed one-dimensional velocity can be positive or negative according to the chosen direction.",
        "Acceleration is the rate of change of velocity. A change in direction is acceleration even when speed is constant; in a straight-line question, define a positive direction and keep the signs consistent.",
        "For constant acceleration, use the suvat equations only when acceleration is constant. Select an equation that contains the known quantities and the required unknown; do not mix variables from different stages of a journey."
      ]},
      {title:"Motion graphs, vectors and projectiles",intro:"Graph gradients and areas encode motion; resolving a two-dimensional motion into perpendicular components makes projectile calculations manageable.",points:[
        "On a displacement–time graph, gradient is velocity. On a velocity–time graph, gradient is acceleration and signed area is displacement; total distance is the sum of the magnitudes of areas above and below the time axis.",
        "Resolve a vector into perpendicular components using trigonometry and state the angle reference. For a projectile with negligible air resistance, horizontal acceleration is zero and vertical acceleration is −g if upwards is positive.",
        "Treat horizontal and vertical motion separately but use the same time. At the highest point, vertical velocity is zero while horizontal velocity is unchanged; the projectile's path is parabolic under constant g.",
        "A position–time model can be differentiated to obtain velocity and differentiated again for acceleration. The gradient of a tangent gives instantaneous velocity, while a secant gives an average over an interval."
      ]}
    ],reviewPrompt:"Can you choose a sign convention, resolve a launch velocity and use one shared time for horizontal and vertical projectile motion?"},
    U1T2:{sections:[
      {title:"Forces, free-body diagrams and Newton’s laws",intro:"A free-body diagram shows external forces on one chosen object; the resultant force determines its acceleration.",points:[
        "Draw the object separately and add only forces acting on it: weight mg vertically down, normal reaction perpendicular to a surface, tension along a string, friction opposing relative motion and drag opposing motion through a fluid.",
        "Newton’s first law describes equilibrium or constant velocity when resultant force is zero. The second law is ΣF = ma, applied as a vector equation; the third law pairs forces on different interacting objects, equal in magnitude and opposite in direction.",
        "Resolve forces parallel and perpendicular to an incline. Weight components are mg sin θ down the slope and mg cos θ into the slope; the normal reaction is not automatically equal to mg on a slope or accelerating surface.",
        "For connected particles joined by a light inextensible string over a smooth pulley, acceleration magnitudes are equal and tension is the same throughout the ideal string. Write a separate force equation for each particle."
      ]},
      {title:"Moments and equilibrium",intro:"A force can cause translation and rotation; taking moments about a convenient point often removes an unknown reaction.",points:[
        "The moment of a force about a pivot is force × perpendicular distance from the pivot to the line of action. Use newton metres and include a sign or clear clockwise/anticlockwise convention.",
        "For a rigid body in equilibrium, resultant force is zero and resultant moment about any point is zero. The two conditions are independent; a zero resultant force alone does not guarantee no rotation.",
        "A couple consists of equal, opposite, parallel forces with separated lines of action. It creates a turning effect but no resultant force; its moment is one force multiplied by the perpendicular separation."
      ]},
      {title:"Momentum and impulse",intro:"Momentum is conserved for a system when the net external impulse is negligible; impulse describes the effect of a force over time.",points:[
        "Momentum p = mv is a vector. Choose a positive direction and carry signs through collisions; conservation applies to the total momentum before and after, not necessarily to each object separately.",
        "Impulse equals change in momentum and equals the area under a force–time graph. A longer collision time for the same momentum change means a smaller average force, which explains cushioning and crumple zones.",
        "Momentum is conserved in elastic and inelastic collisions. Kinetic energy is conserved only in an ideal elastic collision; in an inelastic collision some kinetic energy is transferred to internal energy, sound or deformation."
      ]}
    ],reviewPrompt:"In a collision, which quantity is always conserved for an isolated system, and which extra quantity is conserved only in an elastic collision?"},
    U1T3:{sections:[
      {title:"Energy stores, transfers and conservation",intro:"Energy is conserved overall, but useful energy can be dissipated into less useful thermal energy in the surroundings.",points:[
        "Gravitational potential energy change near Earth is ΔEₚ = mgΔh. Kinetic energy is Eₖ = ½mv². These formulas apply in the stated regimes; use a consistent height reference and speed.",
        "Work done by a constant force parallel to a displacement is W = Fs; more generally W = Fs cos θ. Work is energy transferred by a force. A force perpendicular to displacement does no work.",
        "Power is the rate of energy transfer or work done: P = ΔE/Δt, and for a constant force along motion P = Fv. The watt is one joule per second.",
        "In a closed system, total energy is conserved. Mechanical energy may decrease because of friction or drag; account for the change as thermal energy, sound, deformation or work on another object rather than saying energy disappears."
      ]},
      {title:"Efficiency and energy pathways",intro:"An energy-transfer diagram identifies the source, useful output and wasted pathways.",points:[
        "Efficiency = useful energy output ÷ total energy input, or useful power output ÷ total power input. Multiply by 100 for a percentage and ensure numerator and denominator use the same type of quantity.",
        "A Sankey diagram represents energy flows using arrow widths. The useful output must be smaller than or equal to the input; the remainder is transferred to other stores or dissipated.",
        "For a falling object, gravitational potential energy can become kinetic energy. If air resistance is significant, some energy is transferred to thermal energy in the air and object, so mechanical energy is not conserved even though total energy is."
      ]}
    ],reviewPrompt:"Can you identify the energy store before and after a process, then account for every transfer including dissipation?"},
    U1T4:{sections:[
      {title:"Fluids — density, pressure and upthrust",intro:"A fluid is a liquid or gas. Pressure acts in all directions and can produce a resultant buoyant force.",points:[
        "Density ρ = mass ÷ volume. For a uniform object, use its total mass and external volume; check units, commonly kg m⁻³. An object's average density determines whether it tends to float or sink in a given fluid.",
        "Pressure p = F/A for a force normal to a surface. In a static fluid, pressure increases with depth: the pressure difference is ρgh. Absolute pressure also includes atmospheric pressure when required.",
        "Upthrust equals the weight of displaced fluid. An object floats when the upthrust balances its weight; a partially submerged object displaces enough fluid for that equality to hold.",
        "A Plimsoll line indicates safe loading limits under different water conditions. Salt water is denser than fresh water, so the same ship displaces less volume to balance its weight; loading, temperature and hull condition also matter."
      ]},
      {title:"Fluid flow, viscosity and terminal velocity",intro:"Viscosity describes resistance to flow; drag changes with speed and can eventually balance the driving force.",points:[
        "Viscosity is a measure of a fluid’s resistance to shear and flow. It depends on the fluid and temperature; for many liquids, viscosity decreases as temperature rises, while gas behaviour differs.",
        "A falling object initially accelerates because weight exceeds upthrust plus drag. As speed rises, drag increases; terminal velocity occurs when the resultant force is zero and acceleration becomes zero.",
        "For a small sphere moving slowly through a viscous fluid, Stokes’ drag is proportional to viscosity, radius and speed (F = 6πηrv) under laminar-flow assumptions. Do not apply this model automatically at high Reynolds number or for turbulent flow."
      ]},
      {title:"Solid materials — elasticity and Young modulus",intro:"Stress measures force per cross-sectional area; strain measures fractional extension or compression.",points:[
        "Hooke’s law states that extension is proportional to force while the material remains below its limit of proportionality. The spring constant k is the gradient of a force–extension graph in this linear region.",
        "Tensile stress = F/A and tensile strain = ΔL/L. Stress is measured in pascals and strain is dimensionless. Young modulus E = stress ÷ strain for the linear elastic region.",
        "A stress–strain graph can show the proportional region, elastic limit, yield behaviour and fracture. Beyond the elastic limit, the material may not return to its original dimensions when the force is removed.",
        "A material with a larger Young modulus is stiffer for a given geometry, but strength and toughness are different properties: strength concerns the stress sustained, while toughness concerns energy absorbed before fracture."
      ]}
    ],reviewPrompt:"Can you distinguish stiffness, strength and toughness from the shape and gradient of a stress–strain graph?"},
    U2T1:{sections:[
      {title:"Wave basics and types",intro:"A wave transfers energy and information; in a progressive wave, oscillations travel through space without net transfer of matter.",points:[
        "Amplitude is the maximum displacement from equilibrium, wavelength is the separation of adjacent points in phase, period is time for one cycle and frequency is cycles per second. Wave speed v = fλ.",
        "Transverse oscillations are perpendicular to propagation; longitudinal oscillations are parallel and contain compressions and rarefactions. Electromagnetic waves are transverse; sound in air is longitudinal.",
        "Phase describes position within a cycle. A phase difference of 2π radians or 360° is one complete cycle; a path difference of one wavelength produces constructive interference for coherent waves."
      ]},
      {title:"Superposition and stationary waves",intro:"When waves overlap, their instantaneous displacements add; fixed boundaries can create stationary patterns.",points:[
        "The principle of superposition states that resultant displacement equals the algebraic sum of individual displacements at that point. It applies while waves overlap in a linear medium.",
        "A stationary wave forms from two waves of the same frequency and amplitude travelling in opposite directions. Nodes have zero displacement; antinodes have maximum displacement, separated by λ/2.",
        "Adjacent nodes are separated by λ/2, and a node to its neighbouring antinode by λ/4. In a string fixed at both ends, allowed modes have L = nλ/2, where n is a positive integer.",
        "Resonance occurs when a system is driven near a natural frequency. It can produce a large amplitude; real damping limits the maximum response."
      ]}
    ],reviewPrompt:"On a stationary-wave diagram, can you use the node spacing to find wavelength and identify the harmonic?"},
    U2T2:{sections:[
      {title:"Interference, coherence and diffraction",intro:"Stable interference requires coherent sources with the same frequency and a constant phase difference.",points:[
        "Constructive interference occurs when waves arrive in phase; destructive interference occurs when they arrive in antiphase. For a path difference δ, maxima occur at δ = nλ and minima at δ = (n + ½)λ for ideal equal-amplitude waves.",
        "In Young’s double-slit arrangement, fringe spacing w = λD/s, where D is slit-to-screen distance and s is slit separation. Increase λ or D to widen fringes; increase s to narrow them.",
        "Diffraction is spreading as a wave passes an aperture or edge. It is strongest when aperture size is comparable to wavelength; a narrow single slit produces a broad central maximum.",
        "Polarisation restricts transverse oscillations to one plane and therefore supports the conclusion that light is transverse. Two polarisers transmit most light when their transmission axes are parallel and very little when crossed."
      ]},
      {title:"Refraction and total internal reflection",intro:"A wave changes direction when its speed changes at a boundary; total internal reflection can confine light inside a higher-index material.",points:[
        "Refractive index n = c/v. At a boundary, frequency stays constant while speed and wavelength change. Snell’s law is n₁ sin θ₁ = n₂ sin θ₂, with angles measured from the normal.",
        "When light travels from higher refractive index to lower refractive index, the refracted ray bends away from the normal. At the critical angle, the refracted ray travels along the boundary; above it, total internal reflection occurs.",
        "For a higher-index material to air, sin c = 1/n. Optical fibres use total internal reflection to guide light; bends, surface imperfections and absorption can still cause losses.",
        "A forensic glass comparison can use refractive index, density, colour and trace-element evidence. Similarity supports an association but does not establish when or how a fragment arrived at a scene."
      ]}
    ],reviewPrompt:"Which conditions must both be true for total internal reflection, and why does frequency remain unchanged at a boundary?"},
    U2T3:{sections:[
      {title:"Wave–particle duality and the photoelectric effect",intro:"Light behaves as a wave in interference and as photons in interactions with matter; photon energy depends on frequency.",points:[
        "Photon energy E = hf = hc/λ. Increasing frequency increases energy per photon; increasing intensity at fixed frequency increases the photon arrival rate, not the energy of each photon.",
        "In the photoelectric effect, emission occurs only when photon frequency exceeds a material-dependent threshold. Maximum electron kinetic energy is hf − φ, where φ is the work function.",
        "Below threshold frequency, increasing intensity does not cause photoemission. Above threshold, higher frequency increases maximum kinetic energy; greater intensity increases photoelectric current if other conditions are unchanged.",
        "The stopping potential Vₛ is related to maximum kinetic energy by eVₛ = Eₖ,max. A graph of stopping potential against frequency has gradient h/e and frequency-axis intercept equal to threshold frequency."
      ]},
      {title:"Matter waves, electron diffraction and energy levels",intro:"Particles also have wave properties; atomic electrons occupy quantised energy states.",points:[
        "The de Broglie wavelength is λ = h/p. For a particle accelerated through a potential difference V, its gained kinetic energy is qV when relativistic effects are negligible.",
        "Electron diffraction through a crystal or thin material demonstrates wave behaviour; the pattern depends on wavelength and the spacing of the structure. The observation does not mean electrons are classical water waves.",
        "An atom emits a photon when an electron moves to a lower energy level; photon energy equals the energy difference, ΔE = hf. Absorption requires a photon with the matching energy difference.",
        "Line spectra are discrete because allowed energy levels are discrete. A series of lines can be used to infer energy-level spacings and identify elements."
      ]},
      {title:"Photovoltaic cells and applications",intro:"A photovoltaic cell converts some incident light energy into electrical energy through charge separation in a semiconductor.",points:[
        "Photons with suitable energy can create mobile electron–hole pairs. An internal electric field separates charges and produces a potential difference; an external circuit allows current to flow.",
        "A cell’s output depends on spectrum, intensity, temperature, orientation and electrical load. Power is V I; efficiency compares useful electrical output with incident radiant power.",
        "When evaluating a large solar-energy proposal, distinguish cell efficiency from system output and include daylight variation, storage, transmission, land use, lifecycle emissions and demand profile."
      ]}
    ],reviewPrompt:"How do intensity and frequency affect photoelectric current and maximum electron kinetic energy differently?"},
    U2T4:{sections:[
      {title:"Current, charge and energy transfer",intro:"Electric current is the rate of charge flow; potential difference measures energy transferred per unit charge.",points:[
        "Current I = ΔQ/Δt. Conventional current is the direction positive charge would move; electron drift in a metal is in the opposite direction.",
        "Potential difference V = ΔE/Q, so electrical energy transferred is E = QV. Power P = IV; for an ohmic resistor this can also be written P = I²R or V²/R.",
        "In a series circuit, current is the same through each component and potential differences add. In parallel branches, potential difference is the same across each branch and currents at a junction sum to the incoming current."
      ]},
      {title:"Resistance, resistivity and semiconductors",intro:"Resistance depends on material, temperature and geometry; resistivity is a material property under stated conditions.",points:[
        "Ohm’s law V ∝ I applies to an ohmic conductor at constant temperature. A filament lamp is non-ohmic because its temperature rises and resistance increases; a diode conducts mainly in one direction.",
        "For a uniform wire, R = ρL/A. Resistivity ρ has units Ω m; a longer wire has greater resistance and a thicker wire has smaller resistance, if material and temperature are fixed.",
        "In metals, increasing temperature increases lattice vibrations and scattering, usually increasing resistance. In semiconductors, charge-carrier concentration can increase with temperature, so resistance can fall.",
        "A thermistor or light-dependent resistor can be used in a potential divider. Predict the output direction by identifying which resistance changes and how the supply voltage divides."
      ]},
      {title:"Circuit rules, emf and internal resistance",intro:"Circuit laws express conservation of charge and energy; real sources have internal resistance.",points:[
        "At a junction, total current entering equals total current leaving. Around a closed loop, the sum of emfs equals the sum of potential drops, with signs chosen consistently.",
        "Emf is energy supplied per unit charge by a source. With current I and internal resistance r, terminal voltage V = ℰ − Ir while the cell delivers current; Ir is the lost volts.",
        "For an I–V graph of a source, terminal voltage against current has intercept ℰ and gradient −r. Repeat measurements over a useful current range and avoid overheating the cell or resistor."
      ]},
      {title:"Potential dividers and parallel resistance",intro:"Circuit reduction makes it easier to calculate currents, voltages and power in mixed networks.",points:[
        "For two series resistors, the output across R₂ is Vout = Vin R₂/(R₁+R₂). The output is a fraction of the supply and changes when either resistance changes.",
        "Resistors in series add: Rtotal = R₁ + R₂. In parallel, 1/Rtotal = 1/R₁ + 1/R₂; the equivalent resistance is smaller than the smallest branch resistance.",
        "When solving a circuit, label known values, reduce clear series/parallel sections, apply junction and loop rules, then check that calculated power and current are consistent."
      ]}
    ],reviewPrompt:"Can you predict whether a divider output rises or falls when a thermistor’s resistance changes?"},
    U3T1:{sections:[
      {title:"Planning a physics investigation",intro:"A plan should state a testable relationship, measurable variables and a method that produces enough evidence.",points:[
        "Identify the independent variable, dependent variable and control variables. Give a useful range with at least five or six readings where practical, rather than taking many readings in a narrow region.",
        "Select an instrument with suitable resolution and range. Describe alignment, zeroing, timing method, repeat count and how the reading will be obtained; include safety controls relevant to the equipment.",
        "A control variable is not simply mentioned: say how it will be kept constant and why a change would affect the dependent variable. If a variable cannot be controlled, measure it and discuss its effect."
      ]},
      {title:"Uncertainty, precision and accuracy",intro:"Measurement uncertainty describes a range of plausible values; random and systematic errors affect results differently.",points:[
        "Resolution is the smallest change an instrument can display. For a digital device, estimate uncertainty from its specification or last displayed digit; for an analogue scale, state the reading convention used, often half a division.",
        "Random error causes scatter and can be reduced by repeats and averaging. Systematic error shifts readings consistently, for example a zero offset or calibration error; repeats alone do not remove it.",
        "For addition or subtraction, add absolute uncertainties. For multiplication, division or powers, add percentage uncertainties, multiplying the percentage by the power. Report the final value with a compatible number of significant figures.",
        "Precision describes agreement among repeated measurements; accuracy describes closeness to the accepted value. A measurement may be precise but systematically inaccurate."
      ]},
      {title:"Graphing, linearisation and evaluation",intro:"A good graph tests a relationship and gives a gradient or intercept with an interpretable physical meaning.",points:[
        "Plot the independent variable on the horizontal axis and dependent variable on the vertical axis; label each with units. Use a scale that occupies most of the graph and plot points accurately.",
        "Draw a best-fit line or smooth curve, not dot-to-dot. Calculate a gradient using a large triangle on the line and report units; compare the intercept with the model’s prediction.",
        "If the model predicts y = kxⁿ, an appropriate transformation can linearise the data. State what is plotted, how the gradient relates to k and what a non-zero intercept would imply.",
        "Evaluate with named sources of uncertainty, the direction or size of their effect where possible, and an improvement that directly reduces the limitation. Avoid unsupported claims that a result is simply due to human error."
      ]}
    ],reviewPrompt:"For a plotted gradient, can you show the triangle, units and how the gradient links to the physical model?"},
    U3T2:{sections:[
      {title:"Core practical method and fair testing",intro:"Practical marks reward a reproducible sequence, reliable readings and control of the quantity being tested.",points:[
        "Before collecting data, calibrate or zero equipment and assemble the apparatus securely. Record the measurement uncertainty and check that the instrument’s range covers every planned reading.",
        "Repeat readings and calculate a mean, identifying anomalies using an objective reason. Keep apparatus geometry and environmental conditions constant unless they are the independent variable.",
        "For oscillations, time many cycles and divide by the number of cycles to reduce reaction-time uncertainty. For small displacements, repeat from the same starting condition and avoid pushing the oscillator."
      ]},
      {title:"Common IAL practical relationships",intro:"Many practical questions ask students to linearise a model, obtain a constant from a graph and evaluate the assumptions.",points:[
        "For a mass–spring oscillator, T = 2π√(m/k); plotting T² against m gives gradient 4π²/k if the spring’s mass is negligible and motion is small.",
        "For a simple pendulum, T = 2π√(L/g); plotting T² against L gives gradient 4π²/g. Measure the length from the pivot to the bob’s centre and use small angular displacement.",
        "For a wire, resistance can be measured from V/I and compared with length or cross-sectional area. Ensure current is low enough to limit heating and measure diameter at several positions if the wire is not uniform.",
        "For a diffraction grating, use the known grating spacing and diffraction angle to calculate wavelength. Measure angles from the normal and use symmetric maxima to reduce alignment error."
      ]},
      {title:"From observation to conclusion",intro:"A strong practical conclusion uses the pattern, uncertainty and model together.",points:[
        "State whether the data support the predicted proportionality or trend, using the graph shape, intercept and uncertainties rather than only saying the graph is straight.",
        "Compare an experimental value with an accepted value using percentage difference or uncertainty overlap where appropriate. A close value does not prove that every assumption was valid.",
        "Suggest improvements such as a light gate instead of reaction timing, a larger measurement range, repeated trials, shielding from draughts or better alignment, and explain what each improves."
      ]}
    ],reviewPrompt:"What measurement strategy reduces reaction-time uncertainty, and why does it work?"},
    U4T1:{sections:[
      {title:"Collisions and momentum in two dimensions",intro:"Resolve momentum into perpendicular components and apply conservation separately in each direction.",points:[
        "For an isolated system, vector sum of momentum before an interaction equals vector sum after it. In two dimensions, write one conservation equation for each perpendicular component.",
        "An elastic collision conserves both momentum and total kinetic energy. In a perfectly inelastic collision, objects stick together; momentum remains conserved but kinetic energy decreases.",
        "Explosions and recoil start with the same total momentum as before separation. If the system was initially at rest, the final momenta are equal and opposite, even if the masses and speeds differ."
      ]},
      {title:"Circular motion and centripetal force",intro:"An object moving in a circle accelerates towards the centre because its velocity direction changes continuously.",points:[
        "Centripetal acceleration a = v²/r = ω²r, where ω = 2πf = 2π/T. The required resultant inward force is mv²/r; centripetal force is the name for the resultant, not an additional force.",
        "Identify the real force or component that provides the inward resultant: tension for a string, friction for a flat turn, gravity for an orbit or a component of the normal reaction on a banked track.",
        "For a vertical circle, speed and energy may vary with height. At the top, the inward direction is downwards; at the bottom, it is upwards. Draw a separate diagram at each point and apply Newton’s second law radially."
      ]},
      {title:"Gravitational fields and orbits",intro:"Newton’s law of gravitation describes the force between masses; field strength is force per unit mass.",points:[
        "Gravitational force F = Gm₁m₂/r² and field strength g = GM/r² for a spherical body outside it. Use distance from the centre of mass, not height above the surface alone.",
        "Gravitational potential energy change in a non-uniform field is ΔEₚ = GMm(1/r₁ − 1/r₂) when moving from r₁ to r₂, taking zero potential at infinity. The potential itself is negative, Vg = −GM/r.",
        "For a circular orbit, gravity supplies centripetal force, giving v = √(GM/r) and T² = 4π²r³/(GM). Geostationary satellites orbit above the equator with a 24-hour period in Earth’s rotation direction."
      ]}
    ],reviewPrompt:"For an orbit, why does gravity not disappear even when astronauts appear weightless?"},
    U4T2:{sections:[
      {title:"Electric field strength and potential",intro:"An electric field describes force on a charge; electric potential describes energy per unit charge.",points:[
        "Electric field strength E = F/Q and its direction is the force on a positive test charge. Field lines point away from positive charges and towards negative charges; they never cross.",
        "For a uniform field between parallel plates, E = V/d away from edge effects. For a point charge, E = Q/(4πε₀r²) and electric potential V = Q/(4πε₀r). Potential is a scalar; field is a vector.",
        "Coulomb’s law gives the force between point charges: F = |Q₁Q₂|/(4πε₀r²). Like charges repel and unlike charges attract; use a vector diagram to determine the direction.",
        "The force on charge q is F = qE and electric potential energy change is ΔE = qΔV. Use the sign of q to determine the force direction rather than assuming every charge moves with the field."
      ]},
      {title:"Capacitance, charging and energy",intro:"A capacitor stores separated charge and energy in an electric field between conductors.",points:[
        "Capacitance C = Q/V, measured in farads. A larger plate area, smaller plate separation or higher-permittivity dielectric increases capacitance, all else equal.",
        "For a resistor–capacitor circuit, the time constant τ = RC. During charging, charge and capacitor voltage rise exponentially towards their final values; during discharge, they fall exponentially.",
        "After one time constant, a charging capacitor reaches about 63% of its final charge and a discharging capacitor retains about 37% of its initial charge. The exact relationship uses e^(−t/RC).",
        "Energy stored is E = ½QV = ½CV² = Q²/(2C). Check which quantities are held fixed when comparing energy stored by different capacitors."
      ]},
      {title:"Capacitor calculations and applications",intro:"Equivalent capacitance depends on circuit arrangement, and real uses involve trade-offs between storage, rate and voltage.",points:[
        "Capacitors in parallel have the same voltage and add capacitances: Ctotal = C₁ + C₂. In series, each stores equal magnitude of charge and reciprocals add: 1/Ctotal = 1/C₁ + 1/C₂.",
        "A graph of charge against voltage has gradient C. A current–time graph during charging gives charge from its area; a voltage–time graph can be used to estimate the time constant.",
        "Ultracapacitors can deliver and accept high power over many cycles, but typically store less energy per unit mass than batteries. Consider power, energy density, voltage range, leakage and lifetime when comparing technologies."
      ]}
    ],reviewPrompt:"What fraction of the final charging voltage is reached after one RC time constant, and how does the discharge value compare?"},
    U4T3:{sections:[
      {title:"Magnetic fields and forces",intro:"Magnetic fields exert forces on moving charges and current-carrying conductors; force direction follows a consistent hand rule.",points:[
        "Magnetic field lines leave a north pole and enter a south pole outside a magnet. The field direction at a point is the direction of force on a north test pole.",
        "A charge moving perpendicular to a magnetic field experiences F = BQv; a straight conductor of length L carrying current I perpendicular to the field experiences F = BIL. For other angles include sin θ.",
        "The force is perpendicular to both current/velocity and magnetic field, so it changes direction of motion rather than doing work on an ideal point charge. Use Fleming’s left-hand rule with clearly defined conventional current."
      ]},
      {title:"Motors and electromagnetic induction",intro:"Motors use force on a current; generators use changing magnetic flux to induce an emf.",points:[
        "A current-carrying coil in a magnetic field experiences a couple. A split-ring commutator reverses current every half-turn so the turning moment continues in the same rotational direction.",
        "Magnetic flux Φ = BA cos θ for a uniform field through a flat area. Faraday’s law states induced emf is proportional to the rate of change of flux linkage; more turns or faster flux change produces a larger emf.",
        "Lenz’s law gives the direction: induced current produces a magnetic effect that opposes the change in flux that caused it. This is consistent with conservation of energy; external work is required to keep moving a magnet or conductor.",
        "An alternating generator changes flux linkage periodically, producing an alternating emf. A transformer changes alternating voltage through mutual induction; it does not operate from steady direct current after the initial transient."
      ]},
      {title:"Applications and detection",intro:"Magnetic effects are used in sensing, motors, generators and non-invasive measurements.",points:[
        "A metal detector uses an alternating magnetic field to induce currents in conductive objects; those currents create a secondary magnetic field detected by the instrument.",
        "Signal strength depends on object size, orientation, conductivity, distance and detector settings. A positive response is evidence of a conductive object, not proof of its identity or composition.",
        "For a motor or generator question, identify the energy transfer, the changing or applied field, and the direction of force or induced current before substituting into a formula."
      ]}
    ],reviewPrompt:"How does Lenz’s law identify the direction of an induced current, and what does that imply about energy transfer?"},
    U4T4:{sections:[
      {title:"Nuclear atoms and radiation",intro:"Nuclear notation records proton and nucleon number; radioactive decay changes the nucleus and is random for individual nuclei.",points:[
        "The proton number Z identifies the element; nucleon number A = protons + neutrons. Isotopes have the same proton number but different neutron numbers.",
        "Alpha decay emits a helium-4 nucleus, reducing A by 4 and Z by 2. Beta-minus decay converts a neutron to a proton, increasing Z by 1 while A is unchanged; gamma emission changes neither number.",
        "Ionising radiation can damage cells and DNA. Penetration, ionisation density, exposure time, distance and shielding affect risk; use appropriate monitoring and follow safety procedures."
      ]},
      {title:"Particle accelerators and detectors",intro:"Accelerators use electric fields to increase particle energy and magnetic fields to steer or focus charged particles.",points:[
        "A charged particle gains energy qV crossing a potential difference V. Repeated acceleration in a circular accelerator can produce high energies; magnets bend the path, and radio-frequency cavities provide timed acceleration.",
        "Detectors infer particle properties from tracks, energy deposits, curvature in magnetic fields and decay products. A curved track can reveal charge sign and momentum when field strength and track radius are known.",
        "The Large Hadron Collider collides high-energy protons or ions. Detectors record collision products; statistical analyses compare observations with predicted backgrounds to test physical models."
      ]},
      {title:"The particle zoo and fundamental interactions",intro:"The Standard Model classifies known elementary particles and describes electromagnetic, weak and strong interactions, but not gravity.",points:[
        "Quarks combine to form hadrons. Protons contain uud and neutrons udd; mesons contain a quark and antiquark. Leptons include electrons and neutrinos and do not experience the strong interaction.",
        "Each force has an associated exchange boson in the Standard Model: photons for electromagnetism, gluons for the strong interaction and W/Z bosons for the weak interaction. Conservation laws constrain allowed particle reactions.",
        "In a particle equation, check conservation of charge, baryon number and lepton number as required by the syllabus. Antiparticles have equal mass and opposite relevant additive quantum numbers; annihilation converts rest energy to other particles or radiation."
      ]}
    ],reviewPrompt:"Can you balance a particle reaction using charge and particle-number conservation, not just count the symbols?"},
    U5T1:{sections:[
      {title:"Heat, temperature and internal energy",intro:"Temperature relates to average particle kinetic energy; internal energy includes microscopic kinetic and potential energy.",points:[
        "Thermal energy flows from higher to lower temperature until thermal equilibrium. Temperature is measured in kelvin in gas equations; a temperature difference in kelvin equals the same difference in degrees Celsius.",
        "Heating can raise temperature, change state or do both. During a phase change, energy changes intermolecular potential energy while temperature remains approximately constant for a pure substance at fixed pressure.",
        "Specific heat capacity c is energy required per unit mass per kelvin: ΔE = mcΔT. Specific latent heat L is energy per unit mass for a state change: E = mL."
      ]},
      {title:"Heat transfer and ideal gases",intro:"Conduction, convection and radiation transfer energy by different mechanisms; gas laws link macroscopic variables to particle behaviour.",points:[
        "Conduction transfers energy through particle collisions and, in metals, mobile electrons. Convection transfers energy through bulk fluid motion. Thermal radiation is electromagnetic and can travel through a vacuum.",
        "For an ideal gas, pV = nRT = NkT. Use absolute temperature and convert volume to cubic metres when using SI units; distinguish number of moles n from particle number N.",
        "At constant temperature, pV is constant for a fixed amount of gas; at constant pressure, V/T is constant; at constant volume, p/T is constant. These proportionalities require the specified quantity to remain fixed.",
        "The kinetic model assumes particles are in random motion, their own volume is negligible compared with container volume, collisions are elastic and intermolecular forces are negligible except during collisions."
      ]},
      {title:"Thermal applications and evaluation",intro:"Thermal systems are judged by useful transfer, losses, time scale and the model assumptions.",points:[
        "A thermal conductivity experiment compares energy flow through materials while controlling area, thickness, temperature difference and contact. Insulation reduces transfer by conduction, convection or radiation depending on its design.",
        "Use a particle explanation to link a measured macroscopic change to energy transfer: heating increases average kinetic energy; melting changes the arrangement and potential energy of particles.",
        "When evaluating a thermal model, consider heat loss to surroundings, non-uniform temperature, sensor response time and whether the material’s properties remain constant over the range."
      ]}
    ],reviewPrompt:"Why must temperature be converted to kelvin in the ideal-gas equation, but not when calculating a temperature difference?"},
    U5T2:{sections:[
      {title:"Radioactive decay and activity",intro:"Radioactive decay is spontaneous and random for one nucleus, but large samples follow a predictable exponential pattern.",points:[
        "Activity A is the rate of decay, measured in becquerels (1 Bq = 1 decay s⁻¹). The number of undecayed nuclei follows N = N₀e^(−λt); activity follows the same exponential form because A = λN.",
        "Half-life is the time for the number of undecayed nuclei or activity to fall to half its value. It is constant for a particular isotope and is not the time for every nucleus to decay.",
        "A background count should be measured and subtracted from sample counts. Use longer counting times or repeated measurements when counts are low; decay statistics are subject to random variation."
      ]},
      {title:"Fission, fusion and energy",intro:"Nuclear reactions can release energy because the products have greater total binding energy than the original nuclei.",points:[
        "In fission, a heavy nucleus absorbs a neutron and splits into smaller nuclei, neutrons and energy. Released neutrons can trigger further fissions; a chain reaction is controlled in a reactor by managing neutron population.",
        "In fusion, light nuclei combine. Electrostatic repulsion makes the reaction require extremely high temperature and pressure so nuclei can approach closely enough for the strong interaction to bind them.",
        "Mass defect is the difference between separated nucleon masses and the nucleus’s mass. Binding energy E = Δmc²; binding energy per nucleon indicates stability, with fusion of light nuclei and fission of very heavy nuclei potentially releasing energy.",
        "A reactor uses a moderator to slow neutrons, control rods to absorb neutrons and a coolant to transfer thermal energy. Shielding reduces radiation exposure; spent fuel and accident risk require long-term management."
      ]},
      {title:"Medical tracers and radiation safety",intro:"Radioisotopes can be useful in diagnosis when their radiation, half-life and chemical behaviour are suitable.",points:[
        "A tracer should have a half-life long enough for the procedure but short enough to limit dose, emit radiation that can be detected outside the body and be incorporated into a molecule that reaches the target.",
        "The absorbed dose depends on activity, time, radiation type, energy deposited and tissue. A short half-life does not alone guarantee safety; use the lowest activity consistent with a useful image and follow clinical controls.",
        "Compare external and internal exposure: alpha particles are strongly ionising but have short range; gamma rays are penetrating. Internal contamination and external irradiation present different hazards."
      ]}
    ],reviewPrompt:"What does half-life describe, and why does it not mean every nucleus survives for that exact time?"},
    U5T3:{sections:[
      {title:"Simple harmonic motion",intro:"In SHM, acceleration is proportional to displacement from equilibrium and directed towards it.",points:[
        "The defining relationship is a = −ω²x. The negative sign indicates acceleration is opposite to displacement; displacement, velocity and acceleration vary sinusoidally with time.",
        "Period T = 2π/ω and frequency f = 1/T. For a mass–spring oscillator, ω = √(k/m); for a simple pendulum at small angle, ω = √(g/L).",
        "At equilibrium, displacement is zero and speed is maximum. At the endpoints, speed is zero and acceleration magnitude is maximum. The maximum speed is ωA and maximum acceleration is ω²A.",
        "A motion sensor or displacement–time graph can reveal period and amplitude. Ensure timing spans multiple cycles and distinguish phase from a simple horizontal displacement on the graph."
      ]},
      {title:"SHM energy, damping and resonance",intro:"Energy transfers between kinetic and potential stores during SHM; damping and driving determine the observed amplitude.",points:[
        "For an ideal spring oscillator, total energy is ½kA². At equilibrium, energy is mainly kinetic; at maximum displacement, it is elastic potential energy. The total remains constant if there is no damping.",
        "Damping transfers mechanical energy to the surroundings, reducing amplitude. Light damping gives a gradual decrease; heavy damping returns the system to equilibrium without oscillating; critical damping gives the fastest return without overshoot.",
        "A periodic driving force produces resonance when driving frequency is near the natural frequency. The amplitude is largest near resonance and depends on damping; the system does not gain unlimited amplitude in practice.",
        "Buildings, bridges and instruments can be designed to shift natural frequencies or add damping. A tuned mass damper, such as in a tall tower, reduces movement by transferring energy into a controlled secondary oscillator."
      ]}
    ],reviewPrompt:"Where are speed and acceleration greatest in one SHM cycle, and how does damping change total mechanical energy?"},
    U5T4:{sections:[
      {title:"Gravitational fields and satellites",intro:"A gravitational field describes force per unit mass; satellite motion is free fall in a curved path.",points:[
        "Gravitational potential Vg = −GM/r when zero is defined at infinity. Gravitational field strength g is the negative potential gradient in a radial direction; for a spherical body g = GM/r².",
        "A satellite remains in orbit because its tangential speed and inward gravitational acceleration continually change the direction of its velocity. It is not outside Earth’s gravitational field.",
        "Orbital period T² = 4π²r³/(GM) for a circular orbit. Include the planet radius when converting altitude to orbital radius, and use SI units throughout."
      ]},
      {title:"Stars, spectra and classification",intro:"Stellar properties are inferred from light: colour and spectra reveal temperature, composition and motion.",points:[
        "A star’s surface temperature is related to its colour and peak wavelength by Wien’s law λmax T = constant. Hotter stars peak at shorter wavelengths and appear bluer; cooler stars peak at longer wavelengths and appear redder.",
        "A star’s luminosity is total power emitted. Apparent brightness depends on luminosity and distance; the inverse-square law gives b = L/(4πd²) for isotropic emission.",
        "Absorption and emission lines identify elements and can reveal radial motion through Doppler shift. A Hertzsprung–Russell diagram plots luminosity or absolute magnitude against temperature, with temperature conventionally decreasing to the right.",
        "A star’s position and evolutionary path depend mainly on mass and composition. Main-sequence stars fuse hydrogen; later stages and remnants differ for low- and high-mass stars."
      ]},
      {title:"Distances, the universe and cosmology",intro:"Astronomical distance methods cover different scales; the expansion history constrains the age and future of the universe.",points:[
        "Stellar parallax uses the apparent annual shift of a nearby star against distant background stars. For parallax angle p in arcseconds, distance in parsecs is approximately 1/p.",
        "Standard candles such as Cepheid variables and Type Ia supernovae extend the distance ladder. Each method must be calibrated and has a finite range and uncertainty.",
        "Redshift z = (λobserved − λemitted)/λemitted. At small redshift, recessional speed is approximately cz; Hubble’s law v = H₀d supports expansion, but local motion and uncertainty affect individual measurements.",
        "The age and fate of the universe depend on expansion rate, matter density and dark energy. Dark energy is a model term used to explain accelerated expansion; its physical nature remains unresolved. Compare cosmological models with multiple observations rather than treating one measurement as decisive."
      ]}
    ],reviewPrompt:"How does parallax provide distance, and why is a separate distance method needed for far-away galaxies?"},
    U6T1:{sections:[
      {title:"A2 practical design and measurement",intro:"At A2, practical questions often combine several measurements with a physical model and uncertainty analysis.",points:[
        "Draw or describe apparatus clearly and specify the measurement geometry, reference point, range and repeat strategy. Identify the independent and dependent variables and control the variables that affect the model.",
        "Use a suitable instrument and resolution. Zero the instrument, avoid parallax, align components and record raw readings with units before calculating derived quantities.",
        "For oscillating, heating or slowly changing systems, allow equilibration where needed, record time series at suitable intervals and avoid changing more than one independent variable at a time."
      ]},
      {title:"Uncertainty, graphs and model testing",intro:"Use the uncertainty model to decide whether the data support the predicted relationship.",points:[
        "For repeated readings, calculate a mean and an appropriate uncertainty or spread. For a derived result, propagate absolute or percentage uncertainties according to the operations in the equation.",
        "Plot transformed variables only when the theory predicts the transformation. Calculate gradient and intercept from a large triangle and state the physical constants they represent.",
        "Compare the experimental value with a reference value using percentage difference, uncertainty range or overlap where appropriate. Discuss whether dominant uncertainty is random or systematic."
      ]},
      {title:"Safety, evaluation and communication",intro:"The final account should be safe, concise and specific about what the evidence can establish.",points:[
        "State hazards and controls: secure stands, protect eyes from lasers, avoid hot surfaces, limit current, use low-voltage supplies and handle radioactive sources only under approved supervision.",
        "Evaluate named limitations such as heat loss, finite instrument resolution, reaction time, alignment, friction or uncontrolled environmental conditions. Match each suggested improvement to the limitation.",
        "Use consistent units, sensible significant figures and a conclusion tied to the measured range. Do not claim a model is proved; explain whether the evidence is consistent with its predictions."
      ]}
    ],reviewPrompt:"Can you connect the gradient of your graph to the physical constant and include its uncertainty and units?"}
  };
  SUBJECT_PHYSICS.units.forEach(function(u){u.topics.forEach(function(t){if(extra[t.id]){t.notes.sections=extra[t.id].sections;t.notes.reviewPrompt=extra[t.id].reviewPrompt;}});});
})();
