/* Expanded, original Mathematics notes mapped to the chapter outline supplied by the student. */
(function(){
  var extra = {
    P1T1:{sections:[
      {title:"Algebraic expressions, indices and surds",intro:"Algebraic fluency makes later equations, calculus and modelling more reliable.",points:[
        "Index laws require a common base: aᵐaⁿ = aᵐ⁺ⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ and (aᵐ)ⁿ = aᵐⁿ. For non-zero a, a⁰ = 1 and a⁻ⁿ = 1/aⁿ; fractional indices represent roots.",
        "Expand brackets by multiplying every term, then collect like terms. Factorise by taking out a common factor, using identities such as a² − b² = (a−b)(a+b), or splitting a quadratic into suitable factors.",
        "Simplify surds by extracting square factors, for example √72 = 6√2. Rationalise a denominator by multiplying by the needed surd or by a conjugate; retain exact form unless a decimal is requested."
      ]},
      {title:"Quadratics and the discriminant",intro:"A quadratic can be solved by factorising, completing the square or using the quadratic formula.",points:[
        "For ax²+bx+c=0, the quadratic formula gives x = [−b ± √(b²−4ac)]/(2a). The discriminant Δ = b²−4ac determines the number of real roots: positive gives two, zero gives one repeated root, negative gives none.",
        "Completing the square rewrites ax²+bx+c as a(x−h)²+k. This reveals the turning point, minimum or maximum and range of the corresponding graph.",
        "A quadratic inequality is solved by finding roots, sketching or reasoning about the sign between and outside them, and checking whether the inequality is strict at each boundary."
      ]},
      {title:"Inequalities, regions and proof checks",intro:"Inequalities describe intervals or regions; boundary treatment depends on the symbol.",points:[
        "When multiplying or dividing an inequality by a negative number, reverse the inequality sign. For quadratic inequalities, use the roots and the parabola’s opening direction.",
        "A solid boundary line represents an included equality; a dashed boundary represents a strict inequality. Test a point in each candidate region to determine the correct side.",
        "Check algebraic solutions in the original equation when squaring or clearing denominators, because these operations can introduce invalid values."
      ]}
    ],reviewPrompt:"Can you use the discriminant to determine the number of real roots without solving the quadratic?"},
    P1T2:{sections:[
      {title:"Functions, domain and range",intro:"A function assigns exactly one output to each input in its domain.",points:[
        "The domain is the permitted set of inputs; the range is the set of outputs. Denominators cannot be zero, and real square roots require a non-negative radicand unless complex values are allowed.",
        "A function can be described by a formula, mapping diagram or graph. Read f(a) as the output when the input is a; do not confuse f(x) with multiplication f × x.",
        "A quadratic f(x)=a(x−h)²+k has turning point (h,k), axis of symmetry x=h and an opening determined by the sign of a. Intercepts and turning point help sketch its graph."
      ]},
      {title:"Graph transformations",intro:"Changes to f(x) alter a graph’s position, scale or orientation in predictable ways.",points:[
        "y=f(x)+a translates vertically by a; y=f(x−a) translates horizontally right by a. The expression inside the function acts in the opposite direction to its sign.",
        "y=af(x) stretches vertically by scale factor |a|, with reflection in the x-axis if a<0. y=f(ax) compresses horizontally by factor 1/|a|, with reflection in the y-axis if a<0.",
        "For a transformed graph, identify a corresponding point before and after the transformation. This prevents common sign errors and helps state the new domain and range."
      ]},
      {title:"Intersections and modelling",intro:"Graphs solve equations visually and can represent relationships between measurable quantities.",points:[
        "Points of intersection satisfy both equations. Set the functions equal, solve for x, then substitute to find y; check whether all solutions lie in the stated domain.",
        "A graph may show roots, stationary points or where one quantity exceeds another. A model should be used only over a range where its assumptions remain plausible.",
        "When estimating from a graph, read the scale carefully, state units and distinguish an exact algebraic result from a graphical approximation."
      ]}
    ],reviewPrompt:"For y=f(x−3)+2, which way does the graph move and how can you check the direction using a point?"},
    P1T3:{sections:[
      {title:"Straight lines and coordinate geometry",intro:"A line is determined by a point and gradient, or by two points with distinct x-coordinates.",points:[
        "Gradient m = (y₂−y₁)/(x₂−x₁). The equation y=mx+c uses y-intercept c; point–gradient form y−y₁=m(x−x₁) is often fastest when a point and slope are known.",
        "Parallel lines have equal gradients. Perpendicular non-vertical lines have gradients whose product is −1; vertical and horizontal lines are perpendicular special cases.",
        "The midpoint of a segment is the average of endpoint coordinates. Distance uses Pythagoras: √((x₂−x₁)²+(y₂−y₁)²)."
      ]},
      {title:"Length, area and geometric interpretation",intro:"Coordinate methods translate geometric conditions into algebraic equations.",points:[
        "The area of a triangle is ½ × base × perpendicular height. A coordinate-based area can also be found with a determinant or by subtracting areas of simple shapes.",
        "A perpendicular bisector is the locus of points equidistant from two endpoints: it passes through the midpoint and has gradient negative reciprocal to the segment, where defined.",
        "Sketch the points and line before using algebra. A diagram helps identify whether a gradient, distance or intersection should be positive and whether a result is geometrically possible."
      ]}
    ],reviewPrompt:"Can you find a line through a point that is parallel or perpendicular to a given line and justify its gradient?"},
    P1T4:{sections:[
      {title:"Right-angled trigonometry and exact values",intro:"Sine, cosine and tangent relate angles to side ratios; use degrees or radians consistently with the question.",points:[
        "For an acute angle in a right triangle, sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse and tan θ = opposite/adjacent. Label the sides relative to the angle chosen.",
        "Use the sine rule for a known opposite side–angle pair and the cosine rule when two sides and the included angle, or three sides, are known. The sine rule can produce an ambiguous second triangle.",
        "Triangle area = ½ab sin C for two sides and their included angle. Exact values for 30°, 45° and 60° follow from special triangles; do not replace them with rounded decimals unless asked."
      ]},
      {title:"Trigonometric graphs and equations",intro:"Sine, cosine and tangent repeat periodically; their graphs encode amplitude, period and phase.",points:[
        "sin x and cos x have period 2π radians (360°) and range [−1,1]. tan x has period π (180°) and vertical asymptotes where cos x=0.",
        "Solve a trigonometric equation over the specified interval by finding all angles in the correct quadrants. Use CAST or unit-circle reasoning and check endpoint inclusion.",
        "For y=a sin(bx)+c, amplitude is |a|, period is 2π/|b| (or 360°/|b|) and the graph is shifted vertically by c."
      ]},
      {title:"Choosing a triangle method",intro:"A clear diagram and a named rule reduce formula-selection errors.",points:[
        "Use the cosine rule when the included angle is between the two known sides, or when all three sides are known and an angle is required.",
        "Use the sine rule when an opposite side–angle pair is known. If the information is SSA, test whether a second valid angle is possible.",
        "Carry exact values through the working and round only at the final step to avoid accumulated rounding error."
      ]}
    ],reviewPrompt:"Can you identify an SSA sine-rule question where a second triangle may satisfy the same measurements?"},
    P1T5:{sections:[
      {title:"Differentiation from gradients",intro:"The derivative gives the gradient of a curve at a point and describes instantaneous rate of change.",points:[
        "For a function y=f(x), f′(x) is the gradient function. The derivative can be understood as the limit of the gradient of a secant as the interval tends to zero.",
        "For a power term, d(xⁿ)/dx = nxⁿ⁻¹. Differentiate each term separately, multiply by the original coefficient and reduce the power by one.",
        "The gradient of a tangent at x=a is f′(a). A normal is perpendicular to the tangent, so its gradient is the negative reciprocal when the tangent is neither horizontal nor vertical."
      ]},
      {title:"Stationary points and optimisation",intro:"A stationary point occurs where the gradient is zero; its type is determined by the nearby behaviour of the function.",points:[
        "Solve f′(x)=0 to find stationary x-values, then substitute into f(x) to obtain coordinates. A sign-change test on f′ distinguishes a local maximum, local minimum or stationary point of inflection.",
        "The second derivative gives the gradient of the gradient function. At a stationary point, f″(x)>0 indicates a local minimum and f″(x)<0 a local maximum, subject to the usual non-degenerate case.",
        "For an optimisation problem, define the quantity to maximise or minimise in one variable, state the valid domain, differentiate, find critical points and compare with endpoints when the domain is closed."
      ]}
    ],reviewPrompt:"Why is f′(x)=0 necessary for an interior stationary point, and why should you still check the original domain?"},
    P1T6:{sections:[
      {title:"Integration as the reverse of differentiation",intro:"An indefinite integral represents a family of antiderivatives and therefore includes an arbitrary constant.",points:[
        "For n≠−1, ∫xⁿ dx = xⁿ⁺¹/(n+1)+C. Integrate each term separately and increase the power by one; the constant C is required because derivatives remove constants.",
        "The special case ∫1/x dx = ln|x|+C. The absolute value keeps the expression defined on either side of zero; the domain cannot cross a discontinuity at x=0.",
        "Check an antiderivative by differentiating it. This catches sign, coefficient and power errors quickly."
      ]},
      {title:"Definite integrals and area",intro:"The definite integral measures signed accumulation; geometric area may require splitting the interval.",points:[
        "For a continuous function, ∫ₐᵇ f(x)dx = F(b)−F(a) for an antiderivative F. Substitute the upper limit first and subtract the lower-limit value using brackets.",
        "Area above the x-axis is positive and area below is negative in a signed integral. For total geometric area, split at roots and add magnitudes.",
        "The units of an area-under-curve result are y-units multiplied by x-units. If the graph represents a rate against time, the area may represent a total change."
      ]}
    ],reviewPrompt:"When does a definite integral equal geometric area, and when must you split the interval at a root?"},
    P2T1:{sections:[
      {title:"Algebraic fractions and polynomial division",intro:"Algebraic fractions can be simplified by factoring, while polynomial division separates a polynomial into quotient and remainder.",points:[
        "Factorise numerator and denominator before cancelling common factors. A cancelled factor still restricts the original domain, so state excluded values when relevant.",
        "For polynomial division, write dividend = divisor × quotient + remainder, where the remainder has lower degree than the divisor. Synthetic division is a shortcut only for a linear divisor of the form x−a.",
        "The factor theorem states that (x−a) is a factor of f(x) if and only if f(a)=0. The remainder theorem says division by x−a leaves remainder f(a)."
      ]},
      {title:"Mathematical proof and binomial expansion",intro:"A proof is a logically connected argument that establishes a statement for every permitted value.",points:[
        "A direct proof begins with assumptions and applies valid algebraic or logical steps. A counterexample disproves a universal claim; examples alone cannot prove it true for all values.",
        "For positive integer n, (1+x)ⁿ has coefficients from Pascal’s triangle or binomial coefficients nCr. The general term is nCr xʳ for r=0,…,n.",
        "In a binomial expansion, organise powers systematically and check the first and last terms. For an approximation, state the range of x for which the omitted higher-order terms are small."
      ]},
      {title:"Proof checks and common structure",intro:"The form of the expression often suggests the proof method.",points:[
        "To prove divisibility, express a quantity as an integer multiple of the required divisor. To prove an identity, transform one side into the other without assuming the result.",
        "For an even integer, write n=2k; for an odd integer, write n=2k+1, where k is an integer. Use these definitions explicitly in parity proofs.",
        "When a result depends on a domain restriction, show it before cancelling or dividing by an expression that could be zero."
      ]}
    ],reviewPrompt:"How does the factor theorem turn a possible root into an exact divisibility statement?"},
    P2T2:{sections:[
      {title:"Arithmetic sequences and series",intro:"An arithmetic sequence has a constant difference between consecutive terms.",points:[
        "The nth term is uₙ = a+(n−1)d, where a is the first term and d is the common difference. Check indexing: the first term corresponds to n=1.",
        "The sum of the first n terms is Sₙ = n/2[2a+(n−1)d] = n(a+l)/2, where l is the last term. Use the second form only when the last term is known.",
        "A word problem often asks for the number of terms or total accumulated quantity. Translate the condition into an equation and verify that n is a positive integer."
      ]},
      {title:"Geometric sequences and convergence",intro:"A geometric sequence has a constant ratio between consecutive terms.",points:[
        "The nth term is uₙ = arⁿ⁻¹. The first n terms sum to Sₙ = a(1−rⁿ)/(1−r) for r≠1; equivalent forms may be used if signs are handled consistently.",
        "An infinite geometric series converges only when |r|<1; its sum is a/(1−r). If |r|≥1, the terms do not approach zero and the series has no finite sum.",
        "A recurrence relation defines each term from earlier values. Generate several terms to inspect behaviour, but use algebra or a proof to establish a general pattern."
      ]},
      {title:"Sigma notation and modelling",intro:"Series notation and models make repeated additions concise and testable.",points:[
        "Σ notation specifies the term, starting index and ending index. Substitute the index limits carefully; common errors come from using n terms but stopping at n−1.",
        "A geometric model can represent repeated percentage change, depreciation, compound interest or rebound height. State the common ratio and interpret whether it is a multiplier or a percentage.",
        "Check a model against the context: quantities may be discrete, non-negative or bounded, and an infinite-series result can be a theoretical limit rather than a physically attained value."
      ]}
    ],reviewPrompt:"What condition on the common ratio is required for an infinite geometric sum to exist?"},
    P2T3:{sections:[
      {title:"Exponential functions and logarithms",intro:"Logarithms are inverses of exponentials and turn multiplicative relationships into additive ones.",points:[
        "If aˣ=N, then logₐN=x. The argument N must be positive and the base a must be positive and not equal to 1 in the real-valued setting.",
        "Log laws: logₐ(MN)=logₐM+logₐN, logₐ(M/N)=logₐM−logₐN and logₐ(Mᵏ)=klogₐM. Do not split a logarithm across addition: log(M+N) is not log M + log N.",
        "Natural logarithm ln x has base e. The change-of-base formula is logₐx = ln x/ln a."
      ]},
      {title:"Solving exponential and logarithmic equations",intro:"Choose a method that isolates the exponential or combines logarithms while preserving the domain.",points:[
        "For equations with the same exponential base, equate exponents after confirming both sides are positive. For a quadratic in eˣ, substitute u=eˣ and retain only roots with u>0.",
        "Take logarithms when the unknown appears in an exponent: aˣ=b gives x=ln b/ln a for positive a≠1 and b>0.",
        "After solving a logarithmic equation, check every candidate in the original equation because algebraic manipulation may allow an argument that is zero or negative."
      ]},
      {title:"Exponential modelling",intro:"Exponential models describe constant proportional growth or decay over equal time intervals.",points:[
        "A discrete model N=N₀(1+r)ᵗ uses a fixed fractional change r per time step. A continuous model N=N₀eᵏᵗ uses a constant proportional rate k.",
        "The sign of k determines growth or decay, and the initial value is N₀ at t=0. Estimate constants from data and state the time unit attached to the rate.",
        "Models become unreliable when assumptions fail, such as unlimited resources, changing rates or measurement outside the observed range. State whether a prediction is interpolation or extrapolation."
      ]}
    ],reviewPrompt:"When solving eˣ-based quadratics, why must a substituted root u=eˣ be positive?"},
    P2T4:{sections:[
      {title:"Radians and arc geometry",intro:"Radians link angle to arc length and simplify calculus and periodic formulae.",points:[
        "One radian is the angle subtended at a circle’s centre by an arc equal in length to the radius. A full turn is 2π radians and a right angle is π/2.",
        "Arc length s=rθ and sector area A=½r²θ require θ in radians. For degrees, convert using θ radians = θ degrees × π/180.",
        "For a segment, subtract the triangle area from the sector area for a minor segment; sketch the geometry to identify the correct sector and triangle."
      ]},
      {title:"Identities and exact trigonometry",intro:"Identities hold for every value in their domain; equations hold only for selected solutions.",points:[
        "The core identity sin²x+cos²x=1 leads to 1+tan²x=sec²x and 1+cot²x=cosec²x where the functions are defined.",
        "To prove an identity, start with one side and use a known identity or common denominator to reach the other. Avoid circular reasoning and state restrictions where a denominator can vanish.",
        "Exact trigonometric values can be obtained using reference triangles and quadrant signs. Do not round intermediate values when an exact answer is possible."
      ]},
      {title:"Solving trigonometric equations",intro:"Periodic solutions must be listed over the full interval requested.",points:[
        "Use a unit-circle or CAST approach to find every angle in the stated interval. The principal calculator value is only one solution for sine or cosine in a full cycle.",
        "If an equation involves a multiple angle such as 2x, first solve for the multiple angle over its expanded range, then divide the solutions by 2.",
        "When an identity converts an equation into a quadratic in sin x or cos x, solve for the trig value first, reject values outside [−1,1], then find all angles."
      ]}
    ],reviewPrompt:"Why does solving for 2x require a wider interval than the one given for x?"},
    P2T5:{sections:[
      {title:"Differentiation and stationary points",intro:"Differentiation connects an algebraic function to its gradient, rates of change and turning behaviour.",points:[
        "Apply the power rule term by term and use the product or chain rule only when the expression requires it. Factorise the derivative before solving f′(x)=0.",
        "At a stationary point, the tangent is horizontal. Classify using the sign change of f′ or the second derivative, and calculate the coordinate by substituting the x-value into the original function.",
        "For a connected rate problem, identify which variables depend on time and differentiate the relation with respect to time, using the chain rule for quantities such as x²."
      ]},
      {title:"Integration, areas and the trapezium rule",intro:"Integration accumulates a changing quantity and can estimate areas when an antiderivative is unavailable.",points:[
        "Integrate powers using the reverse power rule and include +C for indefinite integrals. For a definite integral, evaluate the antiderivative at upper and lower limits.",
        "Area between a curve and a line is found by integrating top function minus bottom function over the intersection interval. Split where the curves cross or where the region changes orientation.",
        "The trapezium rule with equal width h is area ≈ h/2[y₀+yₙ+2(y₁+…+yₙ₋₁)]. A smaller step width usually improves the estimate for a smooth curve but requires more values.",
        "A signed integral below the x-axis is negative; geometric area is positive. Sketch the graph and mark roots before calculating."
      ]}
    ],reviewPrompt:"How do you determine which curve is on top before integrating the area between two graphs?"},
    P2T6:{sections:[
      {title:"Circle equations and geometry",intro:"A circle is the locus of points at a fixed distance from its centre.",points:[
        "Centre (a,b), radius r: (x−a)²+(y−b)²=r². Expanded form x²+y²+2gx+2fy+c=0 has centre (−g,−f) and radius √(g²+f²−c).",
        "Complete the square separately in x and y to convert a general equation to centre–radius form. Check the radicand is non-negative for a real circle.",
        "The radius to a tangent is perpendicular to the tangent at the point of contact. The perpendicular from the centre to a chord bisects the chord."
      ]},
      {title:"Lines, tangents and intersections",intro:"Substitution converts a line–circle intersection into a quadratic whose discriminant describes the geometry.",points:[
        "Substitute the line equation into the circle equation. A positive discriminant gives two intersections, zero gives a tangent and negative gives no real intersection.",
        "For a tangent at a known point, find the radius gradient and take its negative reciprocal for the tangent gradient, then use point–gradient form.",
        "For a circle through three non-collinear points, substitute each point into the general equation and solve for its coefficients, or use perpendicular bisectors to find the centre."
      ]},
      {title:"Geometric checks",intro:"A diagram and a distance check prevent algebra from being mistaken for a proof of tangency.",points:[
        "A line claimed to be tangent must have exactly one repeated intersection; verify the discriminant is zero or show the radius is perpendicular at the contact point.",
        "The distance between circle centres compared with the sum and difference of radii indicates whether circles are separate, touching or intersecting.",
        "Use exact values through the calculation and verify any proposed point satisfies both the line and circle equations."
      ]}
    ],reviewPrompt:"How can the discriminant distinguish a secant, a tangent and a line that misses a circle?"},
    P3T1:{sections:[
      {title:"Functions, composition and inverses",intro:"Function notation makes domain restrictions and composition order explicit.",points:[
        "For fg(x)=f(g(x)), apply g first and then f. The domain requires x to be in g’s domain and g(x) to lie in f’s domain.",
        "An inverse exists as a function only when the original is one-to-one over its domain. Find it by writing y=f(x), swapping x and y, then solving for y; the inverse’s domain is the original range.",
        "The graphs of f and f⁻¹ reflect in y=x. Check the result by composing in either direction on the correct domain."
      ]},
      {title:"Modulus graphs and equations",intro:"Modulus represents distance from zero and can be handled piecewise or geometrically.",points:[
        "|f(x)| reflects portions of y=f(x) below the x-axis upward. f(|x|) keeps the right-hand part and reflects it in the y-axis; these are different transformations.",
        "Solve |f(x)|=k for k≥0 by considering f(x)=k or f(x)=−k, then check each solution in the original equation and domain.",
        "For inequalities with modulus, sketch both sides or split into intervals based on where the expression inside the modulus changes sign."
      ]},
      {title:"Partial fractions",intro:"Partial fractions decompose a rational expression into simpler terms that are easier to integrate or manipulate.",points:[
        "If the numerator degree is at least the denominator degree, use polynomial division first. Factor the denominator and assign one fraction per distinct linear factor.",
        "A repeated factor (x−a)² needs terms A/(x−a)+B/(x−a)². An irreducible quadratic needs a linear numerator Ax+B.",
        "Multiply through by the common denominator, then find constants by substituting convenient values or comparing coefficients. Check by recombining the fractions."
      ]}
    ],reviewPrompt:"What numerator form is required over an irreducible quadratic factor, and why is a constant numerator insufficient?"},
    P3T2:{sections:[
      {title:"Reciprocal trigonometric functions",intro:"Secant, cosecant and cotangent are reciprocals of cosine, sine and tangent where defined.",points:[
        "sec x=1/cos x, cosec x=1/sin x and cot x=cos x/sin x. Their domains exclude points where the denominator is zero, creating vertical asymptotes in their graphs.",
        "Use identities 1+tan²x=sec²x and 1+cot²x=cosec²x to rewrite expressions. Check that every transformed expression is defined on the original domain.",
        "Sketch reciprocal graphs from the corresponding sine or cosine graph, marking zeros of the denominator as asymptotes and checking signs between asymptotes."
      ]},
      {title:"Compound angles and double angles",intro:"Addition formulae expand or combine angles; double-angle identities are useful for exact values and integration.",points:[
        "sin(A±B)=sin A cos B ± cos A sin B; cos(A±B)=cos A cos B ∓ sin A sin B. The sign pattern differs, so memorise or derive it carefully.",
        "sin 2A=2sin A cos A and cos 2A can be written as cos²A−sin²A, 2cos²A−1 or 1−2sin²A. Select the form that eliminates the unwanted function.",
        "The R-formula rewrites a sin x+b cos x as R sin(x+α) or R cos(x−α), with R=√(a²+b²). Determine α using the coefficient ratios and check its quadrant from both signs."
      ]},
      {title:"Solving equations and proving identities",intro:"Angle ranges and domains are crucial when reciprocal or multiple-angle functions are involved.",points:[
        "Solve reciprocal-function equations by converting to sine and cosine where possible, while excluding values that make the original denominator zero.",
        "If x is restricted to an interval, transform that interval when solving for 2x or 3x; list all solutions, then return to x and check the original range.",
        "For an identity, work from the more complicated side, use a common denominator or a Pythagorean identity, and stop when the other side is reached. Do not divide by an expression that could be zero without noting the restriction."
      ]}
    ],reviewPrompt:"How can the coefficients and signs determine the correct phase angle in an R-formula?"},
    P3T3:{sections:[
      {title:"Exponential and logarithmic models",intro:"Exponential functions describe a constant proportional rate of change, while logarithms linearise the model.",points:[
        "A continuous model y=Aeᵏᵗ has initial value A and proportional growth rate k. Positive k gives growth; negative k gives decay. The doubling or half-life time can be derived from the model if conditions remain constant.",
        "Take natural logarithms: ln y = ln A + kt. A plot of ln y against t should be linear, with gradient k and intercept ln A, if the exponential model is appropriate.",
        "A model based on two data points can be solved for A and k. Use units consistently and avoid extrapolating beyond the period where the process plausibly maintains a constant proportional rate."
      ]},
      {title:"Logarithmic equations and checks",intro:"Logarithms simplify exponents but impose strict positivity conditions.",points:[
        "Use log laws to combine terms before solving. For an equation involving eˣ and e²ˣ, set u=eˣ, solve the polynomial and retain only u>0 before taking ln.",
        "For equations such as ln f(x)=c, exponentiate to obtain f(x)=eᶜ, then check f(x)>0 and any original domain restrictions.",
        "A linearised plot can make a model easier to assess but changes the error structure; a straight-looking transformed graph alone is not proof that the original model is correct."
      ]},
      {title:"Interpreting model limits",intro:"A mathematical fit is only useful when its assumptions and uncertainties are understood.",points:[
        "Identify whether data are measurements, estimates or predictions. Include units, significant figures and uncertainty where supplied.",
        "Exponential growth can become unrealistic when resources, space or regulation limit the process. Describe the range where the model is supported and what mechanism may cause it to fail.",
        "Compare alternative models by residual pattern and context, not only by which curve passes closest to a small number of points."
      ]}
    ],reviewPrompt:"What do the gradient and intercept of a graph of ln y against time represent for y=Aeᵏᵗ?"},
    P3T4:{sections:[
      {title:"Chain rule and composite functions",intro:"The chain rule differentiates a function of a function by multiplying the outer and inner derivatives.",points:[
        "If y=f(g(x)), dy/dx=f′(g(x))g′(x). Differentiate the outside expression while retaining the inside, then multiply by the derivative of the inside.",
        "For a power of a function, d[g(x)]ⁿ/dx = n[g(x)]ⁿ⁻¹g′(x). For eᵍ, derivative is eᵍg′; for ln g, it is g′/g where g>0.",
        "Use clear brackets to show the inner function and check the derivative dimension or behaviour at simple values."
      ]},
      {title:"Product and quotient rules",intro:"Products and quotients require rules because both factors may vary with x.",points:[
        "Product rule: d(uv)/dx=u′v+uv′. Differentiate one factor at a time; writing u′v′ is a common error.",
        "Quotient rule: d(u/v)/dx=(u′v−uv′)/v². The order of terms in the numerator matters; an alternative is rewrite as uv⁻¹ and use product plus chain rules.",
        "After differentiating, factorise and simplify before solving for stationary points. Retain excluded values where the original denominator is zero."
      ]},
      {title:"Applications to tangents and optimisation",intro:"The derivative can describe geometric gradients and rates of change in applied problems.",points:[
        "At x=a, the tangent has gradient f′(a), and the normal has negative reciprocal gradient if f′(a)≠0. Use point–gradient form and verify that the line passes through the specified point.",
        "Stationary points satisfy f′(x)=0. Use the second derivative or sign changes to classify them; a zero second derivative alone is inconclusive.",
        "For optimisation, define the objective and constraints, reduce to one variable, state its domain, solve critical points and compare valid endpoints. Interpret the answer with units and context."
      ]}
    ],reviewPrompt:"Can you identify the inner function before applying the chain rule, and state where a logarithmic derivative is defined?"},
    P3T5:{sections:[
      {title:"Standard integrals and reverse chain rule",intro:"Recognising a derivative inside an integrand often turns a difficult-looking integral into a direct substitution.",points:[
        "Standard forms include ∫eˣdx=eˣ+C, ∫1/x dx=ln|x|+C, ∫cos x dx=sin x+C and ∫sin x dx=−cos x+C. Trigonometric calculus uses radians.",
        "For ∫f′(x)/f(x) dx, the result is ln|f(x)|+C. More generally, if an inner function’s derivative is present, substitute u=g(x) or use the reverse chain rule.",
        "With a linear inner function, account for its gradient: ∫eᵃˣ dx=eᵃˣ/a+C for a≠0. Verify by differentiating the proposed antiderivative."
      ]},
      {title:"Trigonometric integration",intro:"Identities rewrite powers of sine and cosine into integrable forms.",points:[
        "Use sin²x=(1−cos 2x)/2 and cos²x=(1+cos 2x)/2. Integrating these forms yields x/2∓sin 2x/4+C, with sign depending on the function.",
        "Use tan²x=sec²x−1 to integrate tan²x as tan x−x+C. Check standard identities before expanding powers.",
        "For definite integrals, substitute exact limits after finding an antiderivative and retain exact values such as π or radicals until the final step."
      ]},
      {title:"Definite integrals and area",intro:"Area questions require a diagram, a correct upper-minus-lower order and careful treatment of axis crossings.",points:[
        "Area between y=f(x) and y=g(x) from a to b is ∫ₐᵇ(top−bottom) dx. Find intersections first and split the integral if the curves exchange order.",
        "An integral below the x-axis is negative as signed accumulation; geometric area is positive. For a region crossing the axis, split at roots and add absolute areas.",
        "State the units for area and check that the result has the expected sign and approximate scale from a sketch."
      ]}
    ],reviewPrompt:"What identity makes sin²x integrable, and how can you check the sign in its antiderivative?"},
    P3T6:{sections:[
      {title:"Locating roots and sign changes",intro:"Numerical methods approximate roots when an exact algebraic solution is difficult or unavailable.",points:[
        "A sign change between f(a) and f(b) suggests a root in (a,b) for a continuous function, but it can miss a root where the graph touches the axis without changing sign.",
        "Bisection repeatedly halves an interval with opposite endpoint signs. It is reliable but relatively slow; after n steps, interval width is the initial width divided by 2ⁿ.",
        "A numerical root should be reported to the requested accuracy and checked by substitution into the original function. Do not imply more precision than the interval or calculation supports."
      ]},
      {title:"Fixed-point iteration",intro:"The iteration xₙ₊₁=g(xₙ) seeks a fixed point satisfying x=g(x), which is a root of the transformed equation.",points:[
        "Rearrange f(x)=0 into x=g(x), choose a starting value and iterate using adequate precision. Different rearrangements can converge or diverge even when they have the same roots.",
        "Local convergence is favoured when |g′(x)|<1 near the fixed point. If the iterates move away, oscillate or settle to a different point, the chosen rearrangement or starting value may be unsuitable.",
        "Show a table of iterates when asked and stop when successive values agree to the required number of decimal places or the change is below a stated tolerance."
      ]},
      {title:"Numerical reliability",intro:"A numerical answer is an approximation whose method and tolerance should be transparent.",points:[
        "Retain guard digits during iteration and round only the final answer. Premature rounding can alter later iterates and produce false convergence.",
        "A calculator root finder may return one root, so use a graph, interval or algebraic argument to check whether other roots exist in the required range.",
        "State the root’s interval or method when the question asks for evidence; a decimal by itself may not show that the correct solution was found."
      ]}
    ],reviewPrompt:"Why can two algebraically equivalent fixed-point rearrangements have different convergence behaviour?"},
    P4T1:{sections:[
      {title:"Proof by contradiction and mathematical structure",intro:"Proof by contradiction assumes the negation of the desired conclusion and derives an impossibility.",points:[
        "To prove a statement P, assume not-P while retaining the original hypotheses. Derive a contradiction with a known fact, then conclude P must hold.",
        "For irrationality proofs, suppose a reduced fraction exists and show numerator and denominator must share a factor, contradicting that the fraction is in simplest form.",
        "For divisibility or parity, use precise integer representations. A contradiction is not simply an unexpected numerical example; it must follow logically from the assumption."
      ]},
      {title:"General binomial expansion",intro:"The binomial series for non-integer powers is an infinite expansion with a restricted range of convergence.",points:[
        "For real n, (1+x)ⁿ = 1+nx+n(n−1)x²/2!+… for |x|<1. For a finite positive integer n, the expansion terminates; for non-integer n it generally does not.",
        "To expand (a+bx)ⁿ, factor out aⁿ and set the remaining term in the form (1+u)ⁿ. Identify the first few coefficients and powers carefully.",
        "A truncated series gives an approximation when |x| is small. State the range and compare the size of omitted terms if accuracy is important."
      ]},
      {title:"Combining binomial expansion and algebra",intro:"Partial fractions and algebraic rearrangement can make a complicated expression suitable for a binomial series.",points:[
        "If the expression is not directly of the form (1+u)ⁿ, factor constants or decompose into simpler fractions before expanding.",
        "Keep terms only to the required power of x and write the order term when requested. Check the constant and linear terms by substituting a small value or differentiating at zero.",
        "The validity interval follows from the condition |u|<1 for each binomial series used; it is not automatically |x|<1."
      ]}
    ],reviewPrompt:"How do you determine the valid interval for a binomial series after rewriting the expression as (1+u)ⁿ?"},
    P4T2:{sections:[
      {title:"Implicit differentiation",intro:"Implicit differentiation finds dy/dx when x and y are related without y being isolated explicitly.",points:[
        "Differentiate both sides with respect to x. Treat y as a function of x, so d(yⁿ)/dx = nyⁿ⁻¹ dy/dx by the chain rule.",
        "Collect dy/dx terms and solve. For a tangent, substitute the point only after differentiating; check that the point satisfies the original curve.",
        "A vertical tangent may correspond to an undefined or infinite gradient; inspect the differentiated relation rather than forcing a finite dy/dx."
      ]},
      {title:"Parametric differentiation",intro:"Parametric equations describe x and y through a third variable, often time or an angle.",points:[
        "If x=x(t) and y=y(t), then dy/dx=(dy/dt)/(dx/dt), provided dx/dt≠0. A second derivative is d²y/dx² = d/dt(dy/dx) ÷ (dx/dt), not simply d²y/dt² divided by d²x/dt².",
        "For a tangent at parameter t₀, calculate x(t₀), y(t₀) and the gradient at t₀, then use point–gradient form.",
        "The parameter may need to be eliminated to identify the curve or check a domain, but keeping parametric form can simplify differentiation and integration."
      ]},
      {title:"Rates of change and modelling",intro:"Related rates connect changing quantities through a geometric or physical relationship.",points:[
        "Differentiate the relationship with respect to time, applying the chain rule to each quantity that changes. Substitute numerical values only after differentiating unless the quantity is constant.",
        "Include units: dx/dt may be m s⁻¹ while dA/dt may be m² s⁻¹. A negative rate indicates a decrease under the chosen positive convention.",
        "Check whether the geometry or model remains valid throughout the interval and state any assumptions, such as constant speed or an inextensible string."
      ]}
    ],reviewPrompt:"Why is d²y/dx² in parametric form not equal in general to (d²y/dt²)/(d²x/dt²)?"},
    P4T3:{sections:[
      {title:"Integration by substitution and parts",intro:"Substitution reverses the chain rule; integration by parts reverses the product rule.",points:[
        "For substitution, choose u=g(x), calculate du=g′(x)dx and change all limits if the integral is definite. Substitute back only for an indefinite integral when presenting the final answer in x.",
        "Integration by parts: ∫u dv = uv−∫v du. Choose u so differentiating it simplifies the expression; choose dv so it can be integrated.",
        "For repeated integration by parts, keep signs and constants organised. A cyclic result may require collecting the original integral on one side."
      ]},
      {title:"Volumes of revolution and partial fractions",intro:"Rotating a region creates a solid whose cross-sectional area can be integrated along the axis.",points:[
        "When a region under y=f(x) is revolved about the x-axis, volume V=π∫ₐᵇ[f(x)]²dx, assuming the curve and interval define the solid. Sketch to identify the radius and limits.",
        "For rotation about a different axis, use the distance from that axis as the radius; an offset such as y−c may be required. Units are cubic units.",
        "Partial fractions can turn a rational integrand into logarithmic or inverse-tangent forms. Divide first if the fraction is improper and use a suitable numerator over each factor."
      ]},
      {title:"Differential equations and models",intro:"A differential equation relates a function to its derivatives and requires an initial condition to determine a particular solution.",points:[
        "Separate variables when dy/dx=f(x)g(y): move y terms with dy and x terms with dx, integrate both sides and include a constant.",
        "Use an initial condition to find the integration constant. Check the solution by differentiating and substituting into the original equation.",
        "For a model such as dy/dt=ky, solution y=Aeᵏᵗ describes proportional change. Interpret the sign and units of k and state the assumptions behind the model."
      ]}
    ],reviewPrompt:"In a volume-of-revolution problem, how do you identify the radius and limits before integrating?"},
    P4T4:{sections:[
      {title:"Vectors in two and three dimensions",intro:"A vector has magnitude and direction; components make geometric and mechanical calculations systematic.",points:[
        "In i, j, k notation, vector components are signed coordinates. Magnitude |a|=√(a·a); a unit vector has magnitude one and points in the same direction.",
        "Position vectors locate points relative to an origin. The vector from A to B is OB−OA; a line through point a with direction d is r=a+λd.",
        "Two vectors are parallel if one is a scalar multiple of the other. In three dimensions, a line’s symmetric or parametric equations describe the same direction and point."
      ]},
      {title:"Lines, intersections and geometry",intro:"Vector equations provide concise tests for collinearity, coplanarity and intersection.",points:[
        "To find a line intersection, equate coordinate components and solve for the parameters. A valid intersection requires a consistent solution in all coordinates; skew lines in 3D do not meet.",
        "For a triangle or polygon, express sides as vectors from common vertices. Use position vectors carefully and verify that the proposed point lies on each required line.",
        "A direction vector gives the orientation but not a unique line; a point is also required. Different direction vectors that are scalar multiples represent the same direction."
      ]},
      {title:"Scalar product and angles",intro:"The scalar product connects vector components to angles and perpendicularity.",points:[
        "a·b = a₁b₁+a₂b₂+a₃b₃ = |a||b|cos θ. If a·b=0 and neither vector is zero, the vectors are perpendicular.",
        "Find the angle using cos θ=(a·b)/(|a||b|), then choose the geometrically appropriate angle range. A calculator’s inverse cosine returns a principal value.",
        "The scalar product can find a projection or test orthogonality; it is not a vector and has no direction."
      ]}
    ],reviewPrompt:"How can the scalar product determine whether two non-zero vectors are perpendicular?"},
    S1T1:{sections:[
      {title:"Types of data and sampling",intro:"Data type determines which summaries and diagrams are appropriate.",points:[
        "Categorical data describe groups; discrete numerical data count separate values; continuous data can take any value in an interval. Identify whether measurements are grouped and whether class boundaries are continuous.",
        "A population is the full group of interest; a sample is the observed subset. Random sampling reduces selection bias, while stratified sampling preserves representation of important subgroups.",
        "Outliers can be genuine observations or errors. Investigate their source before deciding whether to retain them; a rule such as 1.5×IQR identifies potential outliers, not automatic deletion."
      ]},
      {title:"Location, spread and representation",intro:"A useful summary describes both typical value and variability, with units and context.",points:[
        "Mean uses all values but is sensitive to extremes; median is resistant to outliers; mode identifies a most frequent value. Quartiles and interquartile range describe the middle half of ordered data.",
        "Variance is an average squared deviation and standard deviation is its square root, so standard deviation has the original units. Distinguish population and sample formula conventions as specified by the course.",
        "Histograms use frequency density = frequency ÷ class width so area represents frequency. Box plots show median, quartiles and potential outliers; compare medians, spread and skew using values."
      ]},
      {title:"Grouped data and coding",intro:"Grouped summaries are estimates because individual observations are not known.",points:[
        "For grouped data, estimate the mean using class midpoints weighted by frequencies. Cumulative frequency graphs can estimate median and quartiles by interpolation.",
        "Coding x=a+by can simplify a calculation. Transform the mean and standard deviation back using the scale and shift; a shift changes mean but not standard deviation, while a scale changes spread by its magnitude.",
        "Skew describes tail direction: positive skew has a longer right tail and often mean greater than median; negative skew has a longer left tail. Use the actual distribution rather than relying only on this heuristic."
      ]}
    ],reviewPrompt:"Why does a histogram need frequency density when class widths are unequal?"},
    S1T2:{sections:[
      {title:"Probability rules and event language",intro:"Probability measures uncertainty on a scale from zero to one; event relationships determine which rule is appropriate.",points:[
        "The complement rule is P(A′)=1−P(A). The addition rule is P(A∪B)=P(A)+P(B)−P(A∩B), avoiding double-counting the overlap.",
        "Mutually exclusive events cannot occur together, so their intersection has probability zero. Independent events do not affect each other’s probability; independence is not the same as mutual exclusivity.",
        "Use set notation consistently: ∩ means both events, ∪ means at least one, and a prime means the complement. Translate phrases such as exactly, at least and neither into events before calculating."
      ]},
      {title:"Venn diagrams, trees and conditional probability",intro:"Diagrams organise multi-step events and make conditional denominators visible.",points:[
        "In a Venn diagram, fill the intersection first, then the non-overlapping parts and finally the outside region. Check that all mutually exclusive regions sum to one when the diagram covers the sample space.",
        "In a tree diagram, multiply probabilities along a path and add probabilities for disjoint paths. Without replacement, update the totals and probabilities after each draw.",
        "Conditional probability P(A|B)=P(A∩B)/P(B). The condition B becomes the new sample space; draw or label the relevant branch to avoid using the original denominator."
      ]},
      {title:"Independence and modelling assumptions",intro:"Probability calculations are only as reliable as the model’s assumptions.",points:[
        "A and B are independent when P(A∩B)=P(A)P(B), equivalently when P(A|B)=P(A) for non-zero P(B). Test the condition from the supplied data rather than assuming it.",
        "With replacement, probabilities may remain constant and successive draws can be independent. Without replacement, probabilities usually change because the population composition changes.",
        "State any assumption about random selection, equal likelihood or independence. An answer can be arithmetically correct but inappropriate if the model does not match the context."
      ]}
    ],reviewPrompt:"How does the denominator change in P(A|B), and why does without-replacement sampling alter later probabilities?"},
    S1T3:{sections:[
      {title:"Scatter diagrams and correlation",intro:"A scatter diagram shows association between two quantitative variables but cannot by itself establish causation.",points:[
        "Plot the explanatory variable on the horizontal axis and response variable on the vertical axis. Describe direction, strength, form and any outliers.",
        "The product-moment correlation coefficient r lies between −1 and 1 and measures linear association. A value near zero does not rule out a strong non-linear relationship.",
        "An outlier can strongly influence r and the regression line. Investigate data collection and context before excluding it."
      ]},
      {title:"Regression line and prediction",intro:"The least-squares regression line predicts one variable from another and minimises squared vertical residuals.",points:[
        "The regression line of y on x is y−ȳ=b(x−x̄), where b=Sxy/Sxx. It passes through (x̄,ȳ); use it to predict y when x is known.",
        "A residual is observed y minus predicted y. A residual plot with structure suggests a linear model may be unsuitable; random scatter around zero supports the model more strongly.",
        "Interpolation within the observed x-range is generally safer than extrapolation beyond it. State whether the prediction is within range and consider whether the association is causal or merely predictive."
      ]},
      {title:"Interpretation and limitations",intro:"Statistical evidence should be translated into the problem context and kept within its limits.",points:[
        "Correlation may result from a causal link, a lurking variable or coincidence. A controlled experiment or additional evidence is needed to argue causation.",
        "The regression line of x on y is not generally the algebraic inverse of the regression line of y on x. Choose the line matching the variable to be predicted.",
        "If variables are coded using positive linear transformations, correlation is unchanged, but regression coefficients and intercepts transform with the coding."
      ]}
    ],reviewPrompt:"Why is a regression prediction outside the observed x-range an extrapolation, and what risk does it carry?"},
    S1T4:{sections:[
      {title:"Discrete random variables and expectation",intro:"A discrete random variable assigns numerical outcomes to a random experiment and has a probability distribution.",points:[
        "A valid probability distribution has probabilities between zero and one and total probability one. The expected value E(X)=ΣxP(X=x) is a long-run mean, not necessarily a possible single outcome.",
        "Variance Var(X)=E(X²)−[E(X)]² measures spread in squared units; standard deviation is its square root. For aX+b, expectation is aE(X)+b and variance is a²Var(X).",
        "For a function g(X), calculate E[g(X)] = Σg(x)P(X=x). In general, E[g(X)] is not equal to g(E(X))."
      ]},
      {title:"Binomial models and distributions",intro:"A binomial model counts successes in a fixed number of independent trials with the same success probability.",points:[
        "Use X~B(n,p) when there are a fixed n trials, two outcomes per trial, independent trials and constant probability p. Then P(X=r)=nCr pʳ(1−p)ⁿ⁻ʳ.",
        "The binomial mean is np and variance np(1−p). Use cumulative tables or a calculator carefully: P(X≥r)=1−P(X≤r−1), not 1−P(X≤r).",
        "Translate at least, more than, at most and fewer than into inclusive or exclusive ranges before evaluating a cumulative probability."
      ]},
      {title:"Using a probability model",intro:"A model is a simplified description; check that the experiment’s assumptions match it.",points:[
        "Write the random variable definition and distribution before substituting. A clear notation line helps distinguish the number of trials from the success probability.",
        "For a goodness-of-fit or tail-probability question, state the relevant probability and interpret the result in context. Do not confuse an expected count with a guaranteed observed count.",
        "If the course or exam specification uses additional distributions, check their stated conditions and formulae; do not apply a model solely because its calculation is convenient."
      ]}
    ],reviewPrompt:"For P(X≥4) with a discrete variable, which cumulative probability must be subtracted from one?"},
    S1T5:{sections:[
      {title:"The normal distribution and standardisation",intro:"A normal model is continuous, symmetric and described by its mean and variance.",points:[
        "If X~N(μ,σ²), μ is the centre and σ is the standard deviation. The notation contains variance σ², so take a square root to obtain σ before standardising.",
        "Standardise with Z=(X−μ)/σ, giving Z~N(0,1). A z-score measures how many standard deviations an observation lies from the mean.",
        "The total area under the density curve is one. Symmetry gives P(Z<−a)=P(Z>a); sketch and shade the required tail or interval before using a table."
      ]},
      {title:"Finding probabilities and percentiles",intro:"Normal tables usually report a cumulative area, so translate the event into the table’s convention.",points:[
        "For an upper tail, use 1−Φ(z); for an interval, subtract cumulative probabilities. Check whether the supplied table gives left-tail area, upper-tail area or area between zero and z.",
        "For a percentile, find the z-value with the required cumulative area, then reverse-standardise x=μ+zσ. A top 10% value corresponds to a left-tail probability of 0.90.",
        "If two percentile conditions are given, form two equations in μ and σ and solve simultaneously; verify that σ is positive."
      ]},
      {title:"Assessing whether a normal model is suitable",intro:"A normal distribution is an approximation that should be judged against the variable and context.",points:[
        "A normal model is plausible for a continuous variable with a roughly symmetric, unimodal distribution; it can be unsuitable for strongly skewed or bounded data.",
        "A continuous normal model assigns probability to any interval, not to a single exact value. In discrete settings, a continuity correction may be needed if the course permits the approximation.",
        "State the model and parameter values, show standardisation and interpret the probability or percentile with units and context."
      ]}
    ],reviewPrompt:"If X~N(μ,σ²), what quantity belongs in the denominator when standardising, and why?"},
    M1T1:{sections:[
      {title:"Modelling assumptions and quantities",intro:"A mechanics model simplifies the real situation; assumptions determine which forces and equations are valid.",points:[
        "A particle has mass but negligible size and rotation; a light string has negligible mass; an inextensible string has fixed length; a smooth surface has no friction. State assumptions that affect the conclusion.",
        "Scalars have magnitude only; vectors have magnitude and direction. Distance and speed are scalars, while displacement, velocity, acceleration, force and momentum are vectors.",
        "Use a consistent sign convention and units. In M1, take gravitational acceleration as 9.8 m s⁻² unless the question specifies another value."
      ]},
      {title:"Vectors and kinematics foundations",intro:"Vectors describe position and motion in components, while differentiation connects position to velocity and acceleration.",points:[
        "Write a vector in i and j components and find its magnitude with Pythagoras. The direction angle should be measured from a stated axis and placed in the correct quadrant.",
        "If r(t) is position, v=dr/dt and a=dv/dt. Integrating acceleration gives velocity plus a constant vector determined by initial conditions.",
        "Speed is the magnitude of velocity, √(vₓ²+vᵧ²); it is non-negative even when a component is negative."
      ]},
      {title:"Building and checking a model",intro:"Translate the physical story into a diagram, equations and explicit limitations.",points:[
        "Choose axes to simplify components, draw a free-body diagram and label known quantities. A diagram should represent the object or system named in the equation.",
        "Check dimensions: acceleration has units m s⁻², force N and momentum kg m s⁻¹. Dimensional consistency is necessary but does not prove an equation is correct.",
        "Interpret the result in context and ask whether the assumptions, direction and magnitude are plausible."
      ]}
    ],reviewPrompt:"Which assumptions remove friction or string extension, and how would relaxing them change the model?"},
    M1T2:{sections:[
      {title:"Constant acceleration and suvat",intro:"The suvat equations apply only when acceleration is constant over the interval considered.",points:[
        "Use v=u+at, s=ut+½at², v²=u²+2as and s=½(u+v)t. Define each symbol and keep signs consistent with the chosen positive direction.",
        "Choose an equation that excludes the unknown you do not need. If acceleration varies, split the motion into constant-acceleration stages or use calculus/graphs where appropriate.",
        "For vertical motion, acceleration is always downward near Earth. If upwards is positive, a=−g; at the top of a projectile’s path, vertical velocity is zero but acceleration remains −g."
      ]},
      {title:"Displacement, velocity and acceleration graphs",intro:"Gradients and areas connect motion graphs to kinematic quantities.",points:[
        "Gradient of a displacement–time graph is velocity; gradient of a velocity–time graph is acceleration; area under a velocity–time graph is displacement.",
        "If velocity is negative, the signed area gives negative displacement. Total distance is the sum of the absolute areas over intervals of constant direction.",
        "A curved displacement–time graph has a changing gradient and therefore changing velocity. A horizontal section means the particle is momentarily at rest throughout that interval."
      ]},
      {title:"Multi-stage motion and projectiles",intro:"Break a journey into intervals where the acceleration model is simple and connect them through shared boundary values.",points:[
        "At the boundary between stages, the final velocity of one stage is the initial velocity of the next, unless an impulse or collision changes it.",
        "For a projectile, solve vertical motion to find the time at a specified height, then use horizontal motion with the same time. Check for two possible times when the object passes a height on the way up and down.",
        "A maximum height occurs when vertical velocity is zero. A same-height return has equal speed to launch only when air resistance is neglected and the launch and landing heights are equal."
      ]}
    ],reviewPrompt:"When finding projectile range, why must horizontal and vertical equations use the same flight time?"},
    M1T3:{sections:[
      {title:"Newton’s laws and force diagrams",intro:"Dynamics applies the resultant force to one object at a time.",points:[
        "Draw weight vertically down, reaction perpendicular to a surface, tension along a string and friction opposing actual or impending relative motion. Do not include a force the object exerts on something else.",
        "Resolve ΣF=ma along a chosen direction. If acceleration is zero, the forces balance; if the object moves at constant velocity, resultant force is also zero.",
        "Newton’s third-law pair acts on different bodies, so the two forces never cancel on a single object’s free-body diagram."
      ]},
      {title:"Connected particles, strings and pulleys",intro:"Ideal constraints connect the motion of two or more particles through shared acceleration magnitudes.",points:[
        "An inextensible string imposes a fixed total length, so connected particles have equal acceleration magnitude along the string. Their directions may be opposite depending on the chosen positive axes.",
        "A light string over a smooth pulley has equal tension on both sides in the ideal model. Write one Newton’s second-law equation for each particle and solve simultaneously.",
        "For a particle on an incline, resolve weight into mg sin θ parallel and mg cos θ perpendicular to the plane. Include friction only if the surface is rough and determine its direction from the motion or impending motion."
      ]},
      {title:"Apparent weight and lift problems",intro:"The normal reaction measured by a scale changes when a person accelerates vertically.",points:[
        "For a mass accelerating upward at a, R−mg=ma, so R=m(g+a). For downward acceleration, R=m(g−a), assuming the object remains in contact with the scale.",
        "At constant velocity or rest, R=mg. Apparent weight is the normal reaction, not a change in gravitational force.",
        "Check limiting cases: free fall gives R=0; if a formula predicts a negative contact reaction, the assumed contact has failed."
      ]}
    ],reviewPrompt:"Why must you write separate F=ma equations for each connected particle even though their acceleration magnitudes match?"},
    M1T4:{sections:[
      {title:"Equilibrium and resolving forces",intro:"A particle is in equilibrium when the vector sum of forces is zero.",points:[
        "Resolve forces along two perpendicular directions, often parallel and perpendicular to a plane. Each component equation equals zero for equilibrium.",
        "A smooth contact exerts only a normal reaction. A rough contact can also exert friction parallel to the surface; the resultant contact force is the vector combination of these components.",
        "For a body with three non-parallel forces in equilibrium, their lines of action are concurrent or parallel. This can simplify geometry but does not replace resolving forces when magnitudes are required."
      ]},
      {title:"Friction and limiting equilibrium",intro:"Static friction adjusts to the required value up to a maximum; it is not always equal to μR.",points:[
        "Friction satisfies F≤μR. At the point of slipping or limiting equilibrium, F=μR; before that, friction may be smaller.",
        "On a rough slope at rest, compare mg sin θ with the available maximum μmg cos θ. At limiting equilibrium tan θ=μ, provided the only relevant forces are weight, normal reaction and friction.",
        "Friction acts opposite the actual or impending relative motion, not necessarily opposite the direction the object is travelling in an absolute frame."
      ]},
      {title:"Two-dimensional static systems",intro:"Draw contact forces and string tensions before resolving a multi-force equilibrium problem.",points:[
        "At a knot or particle, the vector sum of all tensions and applied forces is zero. Resolve horizontally and vertically, using angle references from the diagram.",
        "A particle on the point of moving up a slope has friction down the slope; on the point of moving down, friction acts up the slope. State the assumed impending direction.",
        "Check that calculated reactions are physically possible and that the limiting friction condition is used only when the question states impending motion or limiting equilibrium."
      ]}
    ],reviewPrompt:"Why is F=μR used only at limiting equilibrium, rather than for every stationary object?"},
    M1T5:{sections:[
      {title:"Moments and rigid-body equilibrium",intro:"A rigid body is in equilibrium only when both resultant force and resultant moment are zero.",points:[
        "Moment about a point = force × perpendicular distance from the point to the force’s line of action. The distance is not generally the length of the object or the distance to where the force is applied.",
        "Take moments about a pivot or unknown reaction point to eliminate its moment. Once other unknowns are found, use horizontal and vertical force balance.",
        "A uniform rod’s weight acts at its midpoint. For a non-uniform body, use the stated centre of mass or find it from moments."
      ]},
      {title:"Centre of mass, couples and tilting",intro:"The centre of mass is the effective point of action of weight for gravitational moments in a uniform field.",points:[
        "For discrete particles on a line, x̄=Σmᵢxᵢ/Σmᵢ. In two dimensions, calculate x and y coordinates separately; use signed positions relative to a chosen origin.",
        "A couple creates a pure turning effect: its moment is one force multiplied by the perpendicular distance between its lines of action. The moment is independent of the chosen origin.",
        "A body topples when the vertical line through its centre of mass falls outside its base of support. During tipping about an edge, the reaction at the opposite edge becomes zero."
      ]},
      {title:"Supports, rods and ladders",intro:"Forces at contacts and the choice of moment point determine the cleanest equilibrium equations.",points:[
        "For a beam on supports, draw reactions at each contact and apply vertical force balance and moments. A support cannot provide a tensile reaction unless it is physically attached.",
        "For a ladder against a smooth wall and rough floor, the wall reaction is horizontal and the floor supplies vertical reaction plus friction. Take moments about the foot to remove floor forces.",
        "Check whether a reaction becomes zero at the point of tipping and whether the computed friction stays within its limiting value."
      ]}
    ],reviewPrompt:"Which point would you take moments about to eliminate an unknown reaction, and why?"},
    M1T6:{sections:[
      {title:"Momentum and conservation",intro:"Momentum is a vector quantity; conservation applies to a defined system with negligible external impulse.",points:[
        "Momentum p=mv. In one dimension, choose a positive direction and give velocities signed values; mass is always positive.",
        "For a collision, total momentum before equals total momentum after if external impulse is negligible. If particles coalesce, they share a common final velocity.",
        "In an explosion from rest, final momenta sum to zero. A lighter object must move faster than a heavier one to have equal momentum magnitude."
      ]},
      {title:"Impulse and force–time graphs",intro:"Impulse links a force acting over time to the change in momentum.",points:[
        "Impulse J=FΔt for a constant force and J=Δp. Units N s and kg m s⁻¹ are equivalent.",
        "For a variable force, impulse is the signed area under the force–time graph. Split a composite graph into triangles, rectangles or trapezia and account for areas below the axis.",
        "Newton’s third law means interaction impulses on two bodies are equal in magnitude and opposite in direction, even when their accelerations differ because their masses differ."
      ]},
      {title:"Collision models and practical meaning",intro:"Momentum conservation and energy changes answer different questions about a collision.",points:[
        "Momentum is conserved for an isolated system in elastic, inelastic and perfectly inelastic collisions. Kinetic energy is conserved only in an elastic collision.",
        "The coefficient of restitution e is the relative speed of separation divided by the relative speed of approach along the line of impact; e=1 is elastic and e=0 is perfectly inelastic in the ideal one-dimensional case.",
        "Safety design increases collision time for a given momentum change, reducing average force. Crumple zones also absorb energy through deformation, so the passenger compartment decelerates less abruptly."
      ]}
    ],reviewPrompt:"How does increasing the collision time reduce average force when the momentum change is fixed?"}
  };
  // Extra worked-through explanations bring the shortest lessons up to the same
  // depth as the rest of the course. Keep each addition specific to its topic.
  var extended={
    P1T3:[
      {title:"Build a line equation from coordinates",intro:"Coordinate questions become easier when each geometric condition is translated into an algebraic statement.",points:[
        "Given two points, calculate the gradient from the change in y divided by the change in x, then substitute either point into y=mx+c. Check both points in the resulting equation; this is a quick way to catch a sign error.",
        "A vertical line has equation x=a and no finite gradient, so do not force it into y=mx+c form. A horizontal line has equation y=b and gradient zero. These are the limiting cases that the negative-reciprocal rule for perpendicular gradients does not express directly.",
        "To find where two lines meet, solve their equations simultaneously. Substitute the candidate coordinates into both original equations; if the lines are parallel, the equations will have no unique intersection unless they are the same line."
      ]},
      {title:"Connect circle geometry to line methods",intro:"The same gradient, distance and simultaneous-equation tools describe tangents and chords.",points:[
        "For a circle, the radius from the centre to a point of contact is perpendicular to the tangent. Find the radius gradient first, then choose the tangent gradient and use the known contact point in point–gradient form.",
        "If the tangent point is not supplied, substitute the line into the circle equation. A quadratic with one repeated solution indicates tangency; two distinct real solutions indicate a chord crossing the circle.",
        "After solving, check the point lies on the circle and line, and confirm the radius and tangent directions are perpendicular. These independent checks make a coordinate-geometry argument complete."
      ]}
    ],
    P1T6:[
      {title:"Interpret an integral before calculating",intro:"A definite integral combines the height of a function with the width of an interval to measure accumulated signed change.",points:[
        "Sketch the curve and mark the limits before evaluating. If the graph stays above the axis, the definite integral is the geometric area; if it crosses below, the signed integral subtracts that portion.",
        "For total geometric area, find the roots inside the interval, split the integral at each crossing, and make each contribution positive. Do not take the absolute value only after adding signed areas, because cancellation would already have occurred.",
        "An area under a rate graph can represent a net change: integrating velocity gives displacement, while distance requires adding the magnitudes of intervals where velocity has a constant sign. Always state which interpretation the question requests."
      ]},
      {title:"Choose limits and report the result carefully",intro:"Correct bounds and units are part of the integration method, not finishing details.",points:[
        "When an area is bounded by a curve and the x-axis, solve for their intersections to obtain the relevant limits. If two curves enclose a region, identify which is on top throughout the interval and integrate upper minus lower.",
        "Evaluate an antiderivative as F(b)−F(a), keeping brackets around the complete lower-limit substitution. A negative answer may be valid signed area, but it is a warning to reconsider the diagram if ordinary area was requested.",
        "The integral has units equal to the vertical units multiplied by the horizontal units. In an application, translate the calculated accumulation back into the named quantity and include appropriate units and rounding."
      ]}
    ],
    P1T2:[
      {title:"Determine a function's domain and range",intro:"Domain restrictions come from the input expression; the range depends on the outputs the permitted inputs can produce.",points:[
        "For a rational function, exclude any input that makes a denominator zero. For a real square root, require the expression beneath the root to be non-negative; for a logarithm, its argument must be positive. Combine all restrictions rather than checking only the most obvious one.",
        "To find a range, ask which y-values are actually attained. Completing the square can reveal the minimum or maximum of a quadratic; a graph can show whether an endpoint is included, approached asymptotically, or excluded by a missing input.",
        "For a composition f(g(x)), x must first be allowed in g and the output g(x) must then be allowed as an input to f. This second condition is easy to miss, so write down both domains before simplifying the composite expression."
      ]},
      {title:"Compose and invert functions without losing restrictions",intro:"Composition follows the order of operations, while an inverse reverses inputs and outputs.",points:[
        "To calculate fg(x), substitute the entire expression g(x) wherever the input of f appears. In general fg and gf are different; use a simple input value or expand both expressions to check the order.",
        "For an inverse, write y=f(x), swap x and y, then solve for y. State the inverse domain as the range of the original function and its range as the original domain.",
        "A function needs to be one-to-one on its domain to have an inverse that is itself a function. For example, x squared is not one-to-one over all real x, but restricting to x greater than or equal to zero gives a valid inverse branch."
      ]},
      {title:"Map points and features through transformations",intro:"Point mapping gives a reliable way to determine the direction and scale of a graph transformation.",points:[
        "If (u,v) lies on y=f(x), then y=f(x−a)+b contains the mapped point (u+a,v+b). Check the mapping by substituting the new x-coordinate: the input to f returns to u, and the output is raised by b.",
        "A multiplier outside f changes y-values, while a multiplier inside changes x-values by the reciprocal scale. A negative outside multiplier reflects in the x-axis; a negative inside multiplier reflects in the y-axis.",
        "When sketching a transformed graph, carry over roots, intercepts, turning points and asymptotes where possible. Then check the transformed domain and range, and solve intersections by equating the functions rather than reading an imprecise crossing from a drawing."
      ]}
    ],
    P1T5:[
      {title:"Differentiate powers accurately",intro:"The power rule applies to positive, fractional and negative powers once the expression is written in index form.",points:[
        "Rewrite a root as a fractional power and a reciprocal as a negative power before differentiating. For example, the derivative of the square root of x is one half x to the power negative one half; the derivative of x to the power negative two is negative two x to the power negative three.",
        "For a polynomial, differentiate each term separately, keep its coefficient, multiply by the old exponent and reduce that exponent by one. A constant differentiates to zero, so it contributes no gradient.",
        "Substitute a specified x-value into the derivative only after differentiating and simplifying. Keep exact fractions during the working, because a rounded gradient can alter a tangent or normal equation."
      ]},
      {title:"Construct and interpret tangent and normal lines",intro:"A derivative gives a gradient, but a line equation also needs a point on the curve.",points:[
        "For a tangent at x=a, calculate the point (a,f(a)) and gradient f′(a), then use y−f(a)=f′(a)(x−a). Substituting the point into the final line should reproduce the same coordinates.",
        "The normal passes through that same point and is perpendicular to the tangent. If the tangent gradient is non-zero, the normal gradient is its negative reciprocal; a horizontal tangent has a vertical normal, which should be written as x=a.",
        "A question may ask for the tangent or normal at a named coordinate. First verify the coordinate satisfies the curve equation; an incorrect or irrelevant point cannot be repaired by correct differentiation."
      ]},
      {title:"Classify stationary points and solve optimisation problems",intro:"A stationary point is a candidate for an extremum, not automatically a maximum or minimum.",points:[
        "Solve f′(x)=0, find the corresponding y-values from the original function and classify each point. A sign change in f′ from positive to negative indicates a local maximum; a change from negative to positive indicates a local minimum.",
        "The second derivative provides a quick local test when it is non-zero: positive curvature gives a minimum and negative curvature a maximum. If the second derivative is zero, use a sign test or inspect the curve rather than claiming the test is decisive.",
        "For an optimisation model, define the quantity and its valid domain before differentiating. Find interior stationary candidates, check any permitted endpoints, and state the final value in context with units; a mathematically stationary answer outside the model's domain is not acceptable."
      ]}
    ],
    P2T5:[
      {title:"Select the differentiation rule from the structure",intro:"Before differentiating a complicated expression, identify whether its operations form a sum, product, quotient or composition.",points:[
        "For a product uv, differentiate one factor at a time: u′v+uv′. Do not differentiate both factors together or multiply their derivatives; keep the undifferentiated partner in each term.",
        "For a quotient u/v, use (u′v−uv′)/v squared. The order in the numerator matters, and the denominator is squared. If factorising or simplifying first makes the expression shorter, do that only while preserving its domain.",
        "For a composite F(g(x)), differentiate the outer function at the inner expression and multiply by g′(x). Brackets make the chain-rule factor visible and prevent it being omitted.",
        "After applying a rule, check the result with a simple numerical value or an algebraic rearrangement. Keep intermediate expressions exact and avoid cancelling factors that might be zero without noting the restriction."
      ]},
      {title:"Connect differentiation and integration across a model",intro:"Derivatives describe local rates, while integrals recover accumulated change over an interval.",points:[
        "For a velocity function v(t), acceleration is dv/dt and displacement between two times is the definite integral of v. If velocity changes sign, split the interval to find total distance rather than net displacement.",
        "A quantity that grows or shrinks at a rate depending on its current value may be expressed as a differential relationship. Separate the variables when the equation permits, integrate both sides, then use an initial condition to determine the constant.",
        "When an antiderivative is difficult, a numerical area estimate such as the trapezium rule can provide an approximation. Use the requested number of strips, calculate ordinates consistently and interpret whether the estimate is an over- or underestimate from the curve's shape.",
        "Differentiate a proposed antiderivative to check it, and differentiate an integrated motion expression to return to the stated rate. These reverse checks help detect missing constants, signs and chain-rule factors."
      ]}
    ],
    M1T1:[
      {title:"Resolve a launch into horizontal and vertical motion",intro:"A two-dimensional motion problem can be separated into perpendicular one-dimensional models that share time.",points:[
        "For a launch speed u at angle θ above the horizontal, resolve the initial velocity into u cos θ horizontally and u sin θ vertically. Use the angle from the diagram and label the direction of each component.",
        "When air resistance is neglected, horizontal acceleration is zero and vertical acceleration is downward with magnitude g. The horizontal velocity therefore stays constant, while the vertical velocity changes according to the chosen sign convention.",
        "Use the same time variable in both component equations because the particle follows one continuous motion. Solve the vertical equation for the event time, then substitute that time into the horizontal equation to find the horizontal displacement.",
        "Combine the horizontal and vertical velocity components with Pythagoras to find speed; use their signs to determine direction. State the modelling assumption and check that the calculated time and landing position make physical sense."
      ]},
      {title:"Choose axes to simplify vector calculations",intro:"A useful coordinate system reduces algebra while preserving the physical meaning of each component.",points:[
        "For motion on a slope, axes parallel and perpendicular to the plane often separate the component of weight that drives motion from the normal reaction. Resolve forces using the angle in the diagram, not an assumed angle from the horizontal.",
        "Keep vectors signed along the chosen axes and distinguish a negative component from a negative speed. The sign gives direction; speed is the non-negative magnitude of the full velocity vector.",
        "When combining stages, carry the velocity at the end of one interval into the next as its initial velocity. Recheck the direction of each component at a turning point or after a change of axis."
      ]}
    ],
    P2T1:[
      {title:"Choose a proof method and make every step explicit",intro:"The wording of a claim tells you whether to prove a universal statement, establish a conditional result or disprove it.",points:[
        "A universal claim must be justified for every permitted case. Proof by exhaustion works only when the cases are finite and all are checked; testing several examples can suggest a pattern but does not establish it for infinitely many values.",
        "One valid counterexample is enough to disprove a universal statement. Choose a value that directly violates the conclusion and show the calculation, rather than merely saying the claim is false.",
        "For parity arguments, write an even integer as 2k and an odd integer as 2k+1, with k an integer. Substitute this form into the expression and simplify until its parity or divisibility is explicit.",
        "A complete proof states the assumption, gives a reason for each algebraic transition, and ends by linking the result back to the original claim. Do not treat an unexplained contradiction or an example as a finished argument."
      ]},
      {title:"Use polynomial theorems to locate and verify roots",intro:"Substitution, division and factorisation form a cycle: each can turn a suspected root into a simpler equation.",points:[
        "For a proposed factor x−a, calculate f(a). A zero confirms the factor; a non-zero value is the remainder. For a linear expression ax−b, the associated input is b/a, not b.",
        "After finding one factor, divide the polynomial and continue with the quotient. A cubic may reduce to a quadratic; factorise or solve that quadratic and list every root, including repeated roots.",
        "The multiplicity of a root is visible from repeated factors. A squared factor represents a repeated root and normally touches the x-axis rather than crossing it; verify the factorisation by expanding it back to the original polynomial.",
        "Coefficient comparison is useful when the factor or quotient is not already known. Expand the proposed product, match coefficients of equal powers, and solve the resulting simultaneous equations without skipping the constant term."
      ]},
      {title:"Extract the requested term from a binomial expansion",intro:"The general term keeps the coefficient and both changing powers connected to one index.",points:[
        "For (a+b) to the power n, the term with index r is nCr times a to the power n−r times b to the power r. Write this general term before substituting expressions involving x; it is safer than trying to list terms mentally.",
        "To find the coefficient of x to a specified power, collect the powers of x in the general term and solve the resulting equation for r. Check that r is an integer between zero and n before using the coefficient.",
        "When b contains a negative sign, its r-th power controls the sign of the term. Keep the sign inside the bracket until the power has been applied, then simplify the coefficient and powers separately.",
        "For a numerical approximation, identify the small quantity and retain only the requested powers. Check that the discarded terms are of higher order and that the approximation is being used in the range stated by the question."
      ]}
    ],
    P2T2:[
      {title:"Identify the sequence before selecting a formula",intro:"Differences and ratios diagnose whether an arithmetic or geometric model fits the terms.",points:[
        "Subtract consecutive terms to test for a constant difference. If it is constant, the sequence is arithmetic and each step adds the same amount; if the ratios of consecutive non-zero terms are constant, it is geometric and each step multiplies by the same factor.",
        "For an arithmetic sequence, u_n=a+(n−1)d because there are n−1 jumps from the first term to the nth. This reasoning helps prevent the common off-by-one error and makes the roles of a and d clear.",
        "For a geometric sequence, u_n=ar to the power n−1 for the same indexing reason. Use two known terms to form simultaneous relationships, divide them to eliminate a when useful, then substitute back to recover the first term."
      ]},
      {title:"Build a finite sum and solve for the number of terms",intro:"A series is the sum of sequence terms; the last term and the term count must agree with the indexing.",points:[
        "The arithmetic sum pairs the first and last terms, the second and second-last, and so on. Each pair has the same total, which gives S_n=n(a+l)/2 and, after substituting l=a+(n−1)d, the equivalent formula in a and d.",
        "The finite geometric formula follows by subtracting r times the sum from the original sum, causing the middle terms to cancel. The result is a(1−r^n)/(1−r) when r is not one; if r equals one, every term is a and the sum is na.",
        "If a word problem gives a target total, set the appropriate sum formula equal to that target and solve for n or another unknown. Check that n is a whole number of terms and that the final term really matches the described sequence."
      ]},
      {title:"Interpret convergence, sigma notation and models",intro:"An infinite sum is a limit and is valid only when its partial sums approach a finite value.",points:[
        "For a geometric series, the terms must approach zero, which requires the absolute value of r to be less than one. Then r to the power n tends to zero and the finite-sum formula approaches a/(1−r); otherwise there is no finite sum to infinity.",
        "A negative common ratio can still converge when its absolute value is below one: the terms alternate in sign while shrinking. Evaluate the formula with its signed ratio, not its magnitude, because the sign affects the limiting total.",
        "Sigma notation names the general term and the starting and ending indices. Substitute the first and last indices to confirm how many terms are included before simplifying or applying a summation formula.",
        "In a model, a fixed addition suggests an arithmetic sequence and a fixed percentage change suggests a geometric one. State the initial amount and multiplier, keep units attached to time periods, and note that a mathematical limit may be an idealisation rather than an attainable real-world value."
      ]}
    ],
    P3T6:[
      {title:"Bracket a root before refining its value",intro:"A root is a value where f(x)=0; a sign-changing interval can provide evidence that a continuous curve crosses the axis.",points:[
        "Calculate f at both endpoints and record the signs. If one value is positive and the other negative, continuity guarantees at least one root between them, although it does not guarantee that the interval contains only one root.",
        "Bisection takes the midpoint and checks its sign against the endpoints. Keep the half-interval that still has opposite signs; after each step the interval width is halved, giving a transparent bound on the root's location.",
        "A sign-change test can miss a repeated root where a curve touches the axis and turns back. Use a sketch, factorisation or another interval to check for additional roots in the required range."
      ]},
      {title:"Understand fixed-point iteration and convergence",intro:"A rearrangement x=g(x) generates approximations by repeatedly feeding each result into the next calculation.",points:[
        "Start with the specified x_0 and calculate x_1=g(x_0), then x_2=g(x_1), continuing with unrounded values. A fixed point satisfies g(x)=x and therefore solves the rearranged equation, but different rearrangements can lead to different numerical behaviour.",
        "Near a fixed point, an iteration is generally locally convergent when the magnitude of g′ there is less than one. If it exceeds one, small errors may grow; a negative derivative can produce alternating iterates even when their distance from the fixed point shrinks.",
        "A table should show the formula, starting value and enough iterates to justify the requested accuracy. Agreement after rounding is useful evidence, but report the requested number of decimal places and retain extra precision during the calculations."
      ]},
      {title:"Use Newton–Raphson and assess numerical accuracy",intro:"Newton–Raphson improves a root estimate by using the tangent to the curve at the current approximation.",points:[
        "The update is x_(n+1)=x_n−f(x_n)/f′(x_n). It comes from setting the tangent's value to zero, so the derivative must exist and must not be zero at the current iterate.",
        "For f(x)=x squared−2, starting at 1.5 gives a next estimate of 1.5−(1.5 squared−2)/(2×1.5), approximately 1.4167. Repeating the step rapidly approaches the positive square root of two.",
        "A starting value far from the desired root can jump to another root or fail to converge; a nearly horizontal tangent can create a very large step. Check the final value in the original function and use an interval or graph to identify which root was found.",
        "For bisection, the final bracket provides a direct error bound; for iteration or Newton–Raphson, compare successive values and the residual f(x). Give no more decimal places than the method supports and distinguish an approximation from an exact solution."
      ]}
    ],
    P4T1:[
      {title:"Write a contradiction proof as a controlled chain",intro:"The strongest contradiction proofs make the negated claim precise before starting any algebra.",points:[
        "To prove a statement, assume its negation while retaining the original conditions. If the claim concerns every integer in a class, preserve that domain; if it concerns divisibility, translate the negation into an exact integer statement.",
        "For the irrationality of the square root of two, assume it equals a fraction a/b in lowest terms. Squaring gives a squared equals 2b squared, so a squared is even and therefore a is even; write a=2k and substitute back to show b is even too.",
        "Both a and b then share a factor of two, contradicting the assumption that the fraction was in lowest terms. The conclusion is that no such rational fraction exists. State this final link explicitly rather than ending at the word contradiction.",
        "Check the direction of each implication: an integer with an even square is itself even, and explain why rather than silently reversing a statement. Keep the assumption of lowest terms visible, because without it the shared factor would not create the contradiction."
      ]},
      {title:"Construct general binomial terms and validity intervals",intro:"The general binomial series extends finite integer expansions but must be used within its convergence range.",points:[
        "The coefficient of the r-th term in (1+u) to the power n is n(n−1)…(n−r+1)/r!, multiplied by u to the power r. For a non-negative integer n the terms eventually stop; for a non-integer or negative n the series continues.",
        "If the expression is (a+bx) to the power n, factor out a to the power n and use u=bx/a. The condition is that the absolute value of bx/a is less than one, so translate it into a range for x rather than copying the standard condition unchanged.",
        "For example, (1+2x) to the power negative one half has a series valid when the absolute value of 2x is less than one, so the interval is the absolute value of x less than one half. This rescaling is a frequent source of lost validity marks.",
        "When a question asks for a coefficient, write enough general terms to identify the required power. Keep the index and sign attached to each factor, and check that no later term can contribute to the same power."
      ]},
      {title:"Use a truncated series as a justified approximation",intro:"A finite polynomial is an approximation to an infinite series, so its accuracy depends on the omitted terms.",points:[
        "Expand only to the power requested, but retain all lower powers as well. The order of a term describes its size as x becomes small; omitting an x-squared term is not justified when the question asks for an approximation through x-squared.",
        "After substituting into an expression, collect like powers of x. Multiplying two truncated expansions may create cross-terms, so list those products before discarding terms above the required order.",
        "For an estimate, check that the substituted quantity lies inside the validity interval and is sufficiently small for the neglected terms to have little effect. If a bound or accuracy is requested, explain what first omitted term controls the likely error.",
        "A useful final check is to substitute a small permitted value numerically into both the original expression and the truncated polynomial. Close agreement supports the approximation, while it does not replace the algebraic validity argument."
      ]}
    ],
    S1T4:[
      {title:"Build a probability distribution and calculate its moments",intro:"A discrete distribution pairs each possible value of X with its probability, so the table is both a model and a calculation plan.",points:[
        "List every possible value once and place P(X=x) beside the matching value. Check each probability is between zero and one and that the full column sums to one; if it does not, either an outcome or a probability has been omitted.",
        "Expectation is the probability-weighted mean: multiply each value by its probability and add. It need not be one of the possible outcomes, and it describes the long-run average over many repetitions rather than predicting a single trial.",
        "To find variance efficiently, add x squared times each probability to obtain E(X squared), then subtract the square of E(X). Standard deviation is the positive square root of variance and is in the same units as X.",
        "For a small table, show the columns x, p, xp and x squared p. This makes arithmetic transparent and helps catch a probability paired with the wrong outcome."
      ]},
      {title:"Transform random variables without rebuilding the distribution",intro:"Linear transformations have predictable effects on the centre and spread of a random variable.",points:[
        "If Y=aX+b, then E(Y)=aE(X)+b. Multiplication by a scales every possible value, while adding b shifts every value; the expectation follows the same two operations.",
        "Variance measures squared deviations from the mean, so adding b changes nothing and multiplying by a multiplies the variance by a squared. Thus Var(aX+b)=a squared Var(X), and the standard deviation is multiplied by the absolute value of a.",
        "For example, converting a measurement from one unit to another may multiply every outcome by a conversion factor. Apply that factor to the mean and its square to the variance; do not add the offset to variance.",
        "Use these rules to check a calculation made from a transformed probability table. If a constant shift appears in the variance, or a negative variance results, revisit the algebra."
      ]},
      {title:"Select and apply binomial or Poisson models",intro:"A distribution formula is appropriate only after the scenario has been matched to its assumptions.",points:[
        "Use a binomial model for a fixed number n of independent trials, each with the same probability p of the defined success. State what success means, verify that p stays constant, and use the complement probability for failure.",
        "The binomial probability of exactly r successes is nCr times p to the power r times (1−p) to the power n−r. For a range such as at most r, add the required outcomes or use a cumulative probability; translate less than and less than or equal carefully because X is discrete.",
        "A Poisson model describes counts in a fixed interval when events occur at a steady average rate independently. Its parameter λ is the expected count for that interval: scale the rate when the time or region changes, and remember that its mean and variance both equal λ.",
        "For a Poisson tail, use the complement when it is shorter; for example, at least one event is one minus the probability of zero. State the model and interval in context, and distinguish the expected count from the probability of a particular count."
      ]}
    ]
  };
  SUBJECT_MATHS.units.forEach(function(u){u.topics.forEach(function(t){if(extra[t.id]){t.notes.sections=extra[t.id].sections.concat(extended[t.id]||[]);t.notes.reviewPrompt=extra[t.id].reviewPrompt;}});});
})();
