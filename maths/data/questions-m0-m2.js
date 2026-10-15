/* Questions corrigées automatiquement — chapitres 0 à 2.
   Écrites pour la plateforme à partir des exemples, exercices et corrigés du document de référence.
   M(attendu, options) = réponse mathématique vérifiée par équivalence (voir js/mathcheck.js). */
(function (D) {
  const M = (m, o) => Object.assign({ math: m }, o || {});
  const Q = (o) => { o.chapter = o.chapter || o.lesson.split(".")[0]; o.relatedLesson = o.relatedLesson || o.lesson; o.difficulty = o.difficulty || 1; if (o.bank === undefined) o.bank = true; D.questions.push(o); };
  const SET = "Écris les solutions entre accolades, séparées par des points-virgules : {1 ; 3}. Pour aucune solution : ∅.";
  const INT = "Écris l'ensemble solution avec des crochets, par exemple ]−∞ ; 2[ ∪ [5 ; +∞[.";

  /* ---------------- m0.1 ---------------- */
  Q({ id: "q0.1a", lesson: "m0.1", type: "qcm", points: 1, statement: "Que vaut −3² ?", choices: ["9", "−9", "6", "−6"], correctAnswer: 1, errCat: "signe",
    explanation: "−3² = −(3²) = −9, alors que (−3)² = 9 : le carré s'applique à 3 seulement.", correction: "−3² = −9." });
  Q({ id: "q0.1b", lesson: "m0.1", type: "text", points: 2, statement: "Calculer 5/6 − 3/10 (donne une fraction irréductible).", accept: [M("8/15")], correctAnswer: "8/15",
    feedback: [{ re: /^16\/30$/, msg: "C'est correct mais pas simplifié : divise par 2.", cat: "forme" }],
    explanation: "Dénominateur commun 30 : 25/30 − 9/30 = 16/30 = 8/15.", correction: "5/6 − 3/10 = 8/15." });
  Q({ id: "q0.1c", lesson: "m0.1", difficulty: 2, type: "text", points: 2, statement: "Simplifier √48 + √12 sous la forme a√3.", accept: [M("6√3")], correctAnswer: "6√3", hint: "Tu peux écrire √ avec la barre de symboles ou « sqrt ».",
    explanation: "√48 = √(16 × 3) = 4√3 et √12 = √(4 × 3) = 2√3, donc la somme vaut 6√3.", correction: "√48 + √12 = 6√3." });
  Q({ id: "q0.1d", lesson: "m0.1", difficulty: 3, type: "text", points: 2, statement: "Rationaliser le dénominateur de 4/(3 − √5).", accept: [M("3+√5")], correctAnswer: "3 + √5",
    explanation: "On multiplie par le conjugué (3 + √5) : 4(3 + √5)/(9 − 5) = 3 + √5.", correction: "4/(3 − √5) = 3 + √5." });
  Q({ id: "q0.1e", lesson: "m0.1", type: "vf", points: 1, statement: "Pour tous réels a ≥ 0 et b ≥ 0, √(a + b) = √a + √b.", correctAnswer: false, errCat: "concept",
    explanation: "Contre-exemple : √(9 + 16) = 5 alors que √9 + √16 = 7.", correction: "Faux en général." });
  Q({ id: "q0.1f", lesson: "m0.1", difficulty: 2, type: "text", points: 1, statement: "Calculer (2/3)⁻².", accept: [M("9/4")], correctAnswer: "9/4",
    explanation: "(2/3)⁻² = 1/(2/3)² = 1/(4/9) = 9/4.", correction: "(2/3)⁻² = 9/4." });

  /* ---------------- m0.2 ---------------- */
  Q({ id: "q0.2a", lesson: "m0.2", type: "text", points: 2, statement: "Développer (3x − 2)².", accept: [M("9x²−12x+4")], correctAnswer: "9x² − 12x + 4",
    feedback: [{ re: /^9x(²|\^2)\+4$/, msg: "Tu as oublié le double produit −2 × 3x × 2 = −12x.", cat: "methode" }],
    explanation: "(a − b)² = a² − 2ab + b² avec a = 3x et b = 2.", correction: "(3x − 2)² = 9x² − 12x + 4." });
  Q({ id: "q0.2b", lesson: "m0.2", type: "text", points: 2, statement: "Factoriser 25 − 4x².", accept: [M("(5−2x)(5+2x)", { must: /\)\*?\(/ })], correctAnswer: "(5 − 2x)(5 + 2x)", hint: "Donne une forme factorisée (un produit de parenthèses).",
    explanation: "25 − 4x² = 5² − (2x)², différence de deux carrés.", correction: "25 − 4x² = (5 − 2x)(5 + 2x)." });
  Q({ id: "q0.2c", lesson: "m0.2", difficulty: 2, type: "text", points: 1, statement: "Factoriser x² + 10x + 25.", accept: [M("(x+5)²", { must: /\(x\+5\)/ })], correctAnswer: "(x + 5)²",
    explanation: "x² + 2 × x × 5 + 5² = (x + 5)².", correction: "x² + 10x + 25 = (x + 5)²." });
  Q({ id: "q0.2d", lesson: "m0.2", type: "qcm", points: 1, statement: "Quelle égalité est vraie pour tous réels a et b ?", choices: ["(a + b)² = a² + b²", "(a − b)² = a² − 2ab + b²", "a² − b² = (a − b)²", "(a + b)(a − b) = a² + b²"], correctAnswer: 1, errCat: "methode",
    explanation: "Seule (a − b)² = a² − 2ab + b² est une identité remarquable correcte.", correction: "(a − b)² = a² − 2ab + b²." });
  Q({ id: "q0.2e", lesson: "m0.2", difficulty: 3, type: "text", points: 2, statement: "Factoriser x² − 6x + 9 − y².", accept: [M("(x−3−y)(x−3+y)", { must: /\)\*?\(/ })], correctAnswer: "(x − 3 − y)(x − 3 + y)",
    explanation: "x² − 6x + 9 = (x − 3)², puis (x − 3)² − y² = [(x − 3) − y][(x − 3) + y].", correction: "(x − 3 − y)(x − 3 + y)." });

  /* ---------------- m0.3 ---------------- */
  Q({ id: "q0.3a", lesson: "m0.3", type: "text", points: 1, statement: "Résoudre le système { x + y = 7 ; x − y = 1 }.", hint: "Écris le couple solution sous la forme (x ; y).", accept: [M("{(4;3)}")], correctAnswer: "S = {(4 ; 3)}",
    explanation: "On additionne : 2x = 8, donc x = 4, puis y = 7 − 4 = 3.", correction: "S = {(4 ; 3)}." });
  Q({ id: "q0.3b", lesson: "m0.3", difficulty: 2, type: "fields", points: 2, statement: "3 stylos et 2 cahiers coûtent 9 DT ; 2 stylos et 4 cahiers coûtent 10 DT. Trouve les prix.",
    fields: [{ label: "Prix d'un stylo (DT)", accept: [M("2")], explain: "Avec s + 2c = 5 et 3s + 2c = 9, on trouve s = 2." }, { label: "Prix d'un cahier (DT)", accept: [M("1.5")], explain: "c = (5 − s)/2 = 1,5." }],
    explanation: "Système { 3s + 2c = 9 ; 2s + 4c = 10 } : la seconde équation donne s + 2c = 5.", correction: "Stylo 2 DT, cahier 1,5 DT." });
  Q({ id: "q0.3c", lesson: "m0.3", difficulty: 3, type: "text", points: 2, statement: "Résoudre { 2x − y = 3 ; 4x − 2y = 7 }.", hint: SET, accept: [M("∅")], correctAnswer: "∅",
    explanation: "D = 2×(−2) − 4×(−1) = 0. En multipliant la première équation par 2 on obtient 4x − 2y = 6, ce qui contredit 4x − 2y = 7.", correction: "S = ∅ (droites strictement parallèles)." });
  Q({ id: "q0.3d", lesson: "m0.3", type: "vf", points: 1, statement: "Un système de deux équations à deux inconnues dont le déterminant D = ab' − a'b est nul admet toujours une infinité de solutions.", correctAnswer: false,
    explanation: "Si D = 0, il y a soit aucune solution (droites strictement parallèles), soit une infinité (droites confondues).", correction: "Faux : cela dépend des seconds membres." });

  /* ---------------- m0.4 ---------------- */
  Q({ id: "q0.4a", lesson: "m0.4", type: "text", points: 1, statement: "Résoudre 2x − 6 > 0.", hint: INT, accept: [M("]3;+∞[")], correctAnswer: "]3 ; +∞[",
    explanation: "2x > 6 ⇔ x > 3 (inégalité stricte : le 3 est exclu).", correction: "S = ]3 ; +∞[." });
  Q({ id: "q0.4b", lesson: "m0.4", type: "text", points: 1, statement: "Résoudre −3x + 9 ≥ 0.", hint: INT, accept: [M("]−∞;3]")], correctAnswer: "]−∞ ; 3]", errCat: "signe",
    feedback: [{ re: /^\[3;\+?(∞|inf)\[$|^\[3 ?; ?\+?(∞|inf) ?\[$/, msg: "En divisant par −3, le sens de l'inégalité change.", cat: "signe" }],
    explanation: "−3x ≥ −9 ⇔ x ≤ 3 : on divise par −3, le sens change.", correction: "S = ]−∞ ; 3]." });
  Q({ id: "q0.4c", lesson: "m0.4", difficulty: 2, type: "text", points: 2, statement: "Résoudre (x − 4)(2x + 6) < 0.", hint: INT, accept: [M("]−3;4[")], correctAnswer: "]−3 ; 4[",
    explanation: "Zéros −3 et 4 ; le produit de deux fonctions affines croissantes est négatif entre ses zéros.", correction: "S = ]−3 ; 4[." });
  Q({ id: "q0.4d", lesson: "m0.4", difficulty: 3, type: "text", points: 2, statement: "Résoudre (x − 2)/(x + 5) ≥ 0.", hint: INT, accept: [M("]−∞;−5[∪[2;+∞[")], correctAnswer: "]−∞ ; −5[ ∪ [2 ; +∞[", errCat: "domaine",
    explanation: "Valeur interdite −5 (toujours exclue) ; zéro 2 (inclus car ≥). Le quotient est positif pour x < −5 et x ≥ 2.", correction: "S = ]−∞ ; −5[ ∪ [2 ; +∞[." });
  Q({ id: "q0.4e", lesson: "m0.4", type: "qcm", points: 1, statement: "Quelle chaîne d'inclusions est correcte ?", choices: ["ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ", "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", "ℚ ⊂ ℤ ⊂ ℕ ⊂ ℝ", "ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ"], correctAnswer: 1,
    explanation: "Les entiers naturels sont des entiers relatifs, qui sont des rationnels, qui sont des réels.", correction: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ." });

  /* ---------------- m1.1 ---------------- */
  Q({ id: "q1.1a", lesson: "m1.1", type: "fields", points: 4, statement: "Pour le trinôme 3x² − 7x + 2, donne a, b, c puis Δ = b² − 4ac.",
    fields: [{ label: "a", accept: [M("3")] }, { label: "b", accept: [M("−7")], cat: "signe", explain: "b est le coefficient de x, signe compris : −7." }, { label: "c", accept: [M("2")] }, { label: "Δ", accept: [M("25")], cat: "calcul", explain: "Δ = (−7)² − 4×3×2 = 49 − 24 = 25." }],
    explanation: "Δ = b² − 4ac = 49 − 24 = 25.", correction: "a = 3, b = −7, c = 2, Δ = 25." });
  Q({ id: "q1.1b", lesson: "m1.1", difficulty: 2, type: "text", points: 2, statement: "Mettre g(x) = x² + 6x + 5 sous forme canonique.", accept: [M("(x+3)²−4", { must: /\(x\+3\)/ })], correctAnswer: "(x + 3)² − 4", hint: "Attendu : a(x − α)² + β.",
    explanation: "b/(2a) = 3 et Δ/(4a²) = 16/4 = 4. Contrôle : x² + 6x + 9 − 4 = x² + 6x + 5.", correction: "g(x) = (x + 3)² − 4." });
  Q({ id: "q1.1c", lesson: "m1.1", difficulty: 3, type: "fields", points: 3, statement: "Soit h(x) = −2x² + 12x − 10.",
    fields: [{ label: "Forme canonique de h(x)", accept: [M("−2(x−3)²+8", { must: /\(x-3\)/ })], show: "−2(x − 3)² + 8", explain: "α = −b/(2a) = 3 et h(3) = 8.", w: 2 }, { label: "Valeur maximale de h", accept: [M("8")], explain: "a < 0 et (x − 3)² ≥ 0, donc h(x) ≤ 8.", w: 1 }],
    explanation: "h(x) = −2(x − 3)² + 8 ≤ 8, avec égalité en x = 3.", correction: "h(x) = −2(x − 3)² + 8 ; maximum 8 en x = 3." });
  Q({ id: "q1.1d", lesson: "m1.1", type: "vf", points: 1, statement: "Dans un trinôme du second degré ax² + bx + c, le coefficient a peut être nul.", correctAnswer: false,
    explanation: "Si a = 0, l'expression devient bx + c : ce n'est plus un trinôme du second degré.", correction: "Faux : a ≠ 0." });

  /* ---------------- m1.2 ---------------- */
  Q({ id: "q1.2a", lesson: "m1.2", type: "text", points: 2, statement: "Résoudre dans ℝ : x² − 8x + 15 = 0.", hint: SET, accept: [M("{3;5}")], correctAnswer: "{3 ; 5}",
    explanation: "Δ = 64 − 60 = 4, √Δ = 2, x = (8 ± 2)/2 : 3 ou 5.", correction: "S = {3 ; 5}." });
  Q({ id: "q1.2b", lesson: "m1.2", type: "text", points: 2, statement: "Résoudre dans ℝ : 2x² + 3x + 5 = 0.", hint: SET, accept: [M("∅")], correctAnswer: "∅", errCat: "signe",
    explanation: "Δ = 9 − 4×2×5 = −31 < 0 : pas de racine réelle.", correction: "S = ∅." });
  Q({ id: "q1.2c", lesson: "m1.2", difficulty: 2, type: "text", points: 2, statement: "Résoudre dans ℝ : 3x² − 7x + 2 = 0.", hint: SET, accept: [M("{1/3;2}")], correctAnswer: "{1/3 ; 2}",
    explanation: "Δ = 49 − 24 = 25 ; x = (7 ± 5)/6 : 1/3 ou 2.", correction: "S = {1/3 ; 2}." });
  Q({ id: "q1.2d", lesson: "m1.2", difficulty: 2, type: "text", points: 2, statement: "Factoriser 3x² − 7x + 2.", accept: [M("(3x−1)(x−2)", { must: /\)\*?\(/ })], correctAnswer: "(3x − 1)(x − 2)",
    feedback: [{ re: /^\(x[-−]1\/3\)\(x[-−]2\)$/, msg: "Tu as oublié le coefficient a = 3 devant : a(x − x₁)(x − x₂).", cat: "methode" }],
    explanation: "3x² − 7x + 2 = 3(x − 1/3)(x − 2) = (3x − 1)(x − 2).", correction: "3x² − 7x + 2 = (3x − 1)(x − 2)." });
  Q({ id: "q1.2e", lesson: "m1.2", difficulty: 3, type: "text", points: 2, statement: "Pour quelles valeurs de m l'équation x² + mx + 4 = 0 admet-elle une racine double ?", hint: SET, accept: [M("{−4;4}")], correctAnswer: "{−4 ; 4}",
    explanation: "Δ = m² − 16 = 0 ⇔ m = 4 ou m = −4.", correction: "m ∈ {−4 ; 4}." });
  Q({ id: "q1.2f", lesson: "m1.2", type: "qcm", points: 1, statement: "Quel est le discriminant du trinôme −x² + 4x − 4 ?", choices: ["16", "0", "−16", "32"], correctAnswer: 1, errCat: "signe",
    explanation: "Δ = 4² − 4×(−1)×(−4) = 16 − 16 = 0.", correction: "Δ = 0." });

  /* ---------------- m1.3 ---------------- */
  Q({ id: "q1.3a", lesson: "m1.3", type: "text", points: 2, statement: "Résoudre 2x² + 5x + 3 = 0 en cherchant une racine évidente.", hint: SET, accept: [M("{−1;−3/2}")], correctAnswer: "{−1 ; −3/2}",
    explanation: "a − b + c = 2 − 5 + 3 = 0 : −1 est racine et l'autre vaut −c/a = −3/2.", correction: "S = {−1 ; −3/2}." });
  Q({ id: "q1.3b", lesson: "m1.3", difficulty: 2, type: "text", points: 2, statement: "Trouver deux nombres de somme 5 et de produit −14.", hint: SET, accept: [M("{−2;7}")], correctAnswer: "{−2 ; 7}",
    explanation: "Ce sont les racines de t² − 5t − 14 = 0 : Δ = 81, t = (5 ± 9)/2 = 7 ou −2.", correction: "7 et −2." });
  Q({ id: "q1.3c", lesson: "m1.3", difficulty: 3, type: "fields", points: 4, statement: "x₁ et x₂ sont les racines de 2x² − 6x + 3 = 0 (Δ = 12 > 0).",
    fields: [{ label: "S = x₁ + x₂", accept: [M("3")], explain: "S = −b/a = 6/2 = 3." }, { label: "P = x₁x₂", accept: [M("3/2")], explain: "P = c/a = 3/2." },
      { label: "x₁² + x₂²", accept: [M("6")], explain: "x₁² + x₂² = S² − 2P = 9 − 3 = 6." }, { label: "(x₁ − 1)(x₂ − 1)", accept: [M("−1/2")], explain: "P − S + 1 = 3/2 − 3 + 1 = −1/2." }],
    explanation: "On utilise S et P sans calculer les racines.", correction: "S = 3, P = 3/2, x₁² + x₂² = 6, (x₁ − 1)(x₂ − 1) = −1/2." });
  Q({ id: "q1.3d", lesson: "m1.3", type: "qcm", points: 1, statement: "Si a + b + c = 0, les racines de ax² + bx + c sont :", choices: ["−1 et c/a", "1 et c/a", "1 et −c/a", "−1 et −c/a"], correctAnswer: 1,
    explanation: "a·1² + b·1 + c = a + b + c = 0, donc 1 est racine ; le produit des racines vaut c/a.", correction: "1 et c/a." });

  /* ---------------- m1.4 ---------------- */
  Q({ id: "q1.4a", lesson: "m1.4", type: "text", points: 2, statement: "Résoudre −x² + 6x − 9 ≥ 0.", hint: SET, accept: [M("{3}")], correctAnswer: "{3}",
    explanation: "−x² + 6x − 9 = −(x − 3)² ≤ 0 pour tout x, et il vaut 0 seulement en 3.", correction: "S = {3}." });
  Q({ id: "q1.4b", lesson: "m1.4", difficulty: 2, type: "text", points: 2, statement: "Résoudre 2x² − x − 1 < 0.", hint: INT, accept: [M("]−1/2;1[")], correctAnswer: "]−1/2 ; 1[",
    explanation: "a + b + c = 0 : racines 1 et −1/2 ; a > 0, donc négatif entre les racines.", correction: "S = ]−1/2 ; 1[." });
  Q({ id: "q1.4c", lesson: "m1.4", difficulty: 3, type: "text", points: 3, statement: "Résoudre le système { x² − 4 ≤ 0 ; x² − x − 2 > 0 }.", hint: INT, accept: [M("[−2;−1[")], correctAnswer: "[−2 ; −1[",
    explanation: "[−2 ; 2] ∩ (]−∞ ; −1[ ∪ ]2 ; +∞[) = [−2 ; −1[.", correction: "S = [−2 ; −1[." });
  Q({ id: "q1.4d", lesson: "m1.4", type: "qcm", points: 1, statement: "Si Δ < 0 et a > 0, le signe de ax² + bx + c est :", choices: ["toujours négatif", "toujours positif", "il change de signe", "nul"], correctAnswer: 1,
    explanation: "Sans racine réelle, le trinôme garde le signe de a sur ℝ.", correction: "Toujours positif." });

  /* ---------------- m1.5 ---------------- */
  Q({ id: "q1.5a", lesson: "m1.5", type: "text", points: 2, statement: "Résoudre (2x − 4)/(x + 3) < 0.", hint: INT, accept: [M("]−3;2[")], correctAnswer: "]−3 ; 2[",
    explanation: "Zéro 2, valeur interdite −3 : le quotient est négatif entre −3 et 2.", correction: "S = ]−3 ; 2[." });
  Q({ id: "q1.5b", lesson: "m1.5", difficulty: 2, type: "text", points: 3, statement: "Résoudre (3x² − 5x − 2)/(2 − x) ≤ 0.", hint: INT, accept: [M("[−1/3;2[∪]2;+∞[")], correctAnswer: "[−1/3 ; 2[ ∪ ]2 ; +∞[", errCat: "domaine",
    feedback: [{ re: /^\[-1\/3;\+?(∞|inf)\[$/, msg: "Tu as inclus la valeur interdite 2 : elle doit être exclue.", cat: "domaine" }],
    explanation: "Pour x ≠ 2 le quotient vaut −(3x + 1) ; il est ≤ 0 pour x ≥ −1/3, avec 2 exclu.", correction: "S = [−1/3 ; 2[ ∪ ]2 ; +∞[." });
  Q({ id: "q1.5c", lesson: "m1.5", difficulty: 3, type: "text", points: 3, statement: "Résoudre 1/(x − 1) ≤ 1/(x + 2).", hint: INT, accept: [M("]−2;1[")], correctAnswer: "]−2 ; 1[", errCat: "methode",
    explanation: "On passe tout dans un membre : 3/[(x − 1)(x + 2)] ≤ 0, donc (x − 1)(x + 2) < 0 (strict).", correction: "S = ]−2 ; 1[." });
  Q({ id: "q1.5d", lesson: "m1.5", type: "vf", points: 1, statement: "Pour résoudre A(x)/B(x) ≥ 0, on peut multiplier les deux membres par B(x) sans changer le sens de l'inégalité.", correctAnswer: false,
    explanation: "B(x) a un signe inconnu : le sens dépend de son signe. On utilise un tableau de signes.", correction: "Faux." });

  /* ---------------- m1.6 ---------------- */
  Q({ id: "q1.6a", lesson: "m1.6", type: "text", points: 2, statement: "Résoudre x⁴ − 5x² + 4 = 0.", hint: SET, accept: [M("{−2;−1;1;2}")], correctAnswer: "{−2 ; −1 ; 1 ; 2}",
    explanation: "X = x² : X² − 5X + 4 = 0 donne X = 1 ou 4, donc x = ±1 ou ±2.", correction: "S = {−2 ; −1 ; 1 ; 2}." });
  Q({ id: "q1.6b", lesson: "m1.6", difficulty: 2, type: "text", points: 2, statement: "Résoudre x⁴ − 5x² − 36 = 0.", hint: SET, accept: [M("{−3;3}")], correctAnswer: "{−3 ; 3}",
    explanation: "X = 9 ou X = −4 ; X = −4 est rejeté (X = x² ≥ 0). Il reste x = ±3.", correction: "S = {−3 ; 3}." });
  Q({ id: "q1.6c", lesson: "m1.6", difficulty: 3, type: "text", points: 2, statement: "Résoudre x⁴ + 2x² + 5 = 0.", hint: SET, accept: [M("∅")], correctAnswer: "∅",
    explanation: "Δ = −16 < 0 pour X ; de plus x⁴ + 2x² + 5 ≥ 5 > 0.", correction: "S = ∅." });
  Q({ id: "q1.6d", lesson: "m1.6", type: "vf", points: 1, statement: "Dans une équation bicarrée, une valeur X < 0 obtenue pour X = x² donne quand même deux solutions x = ±√X.", correctAnswer: false,
    explanation: "Un carré est positif ou nul : X < 0 doit être rejeté.", correction: "Faux : on rejette X < 0." });

  /* ---------------- m2.1 ---------------- */
  Q({ id: "q2.1a", lesson: "m2.1", type: "fields", points: 3, statement: "Soit f(x) = x² − 3.",
    fields: [{ label: "f(−2)", accept: [M("1")], explain: "f(−2) = 4 − 3 = 1." }, { label: "f(0)", accept: [M("−3")] }, { label: "Antécédents de 1", accept: [M("{−2;2}")], show: "{−2 ; 2}", explain: "x² = 4 donc x = 2 ou x = −2." }],
    explanation: "f(x) = 1 ⇔ x² = 4.", correction: "f(−2) = 1 ; f(0) = −3 ; antécédents : −2 et 2." });
  Q({ id: "q2.1b", lesson: "m2.1", type: "qcm", points: 1, statement: "Pour x₁ < x₂, f(x₂) − f(x₁) > 0 signifie que f est :", choices: ["strictement décroissante", "strictement croissante", "paire", "constante"], correctAnswer: 1,
    explanation: "Une fonction strictement croissante conserve l'ordre des valeurs.", correction: "Strictement croissante." });
  Q({ id: "q2.1c", lesson: "m2.1", difficulty: 2, type: "text", points: 1, statement: "Pour f(x) = 3x − 1 et x₁ < x₂, on a f(x₂) − f(x₁) = k(x₂ − x₁). Donne k.", accept: [M("3")], correctAnswer: "3",
    explanation: "f(x₂) − f(x₁) = 3x₂ − 3x₁ = 3(x₂ − x₁) > 0 : f est strictement croissante.", correction: "k = 3." });
  Q({ id: "q2.1d", lesson: "m2.1", difficulty: 2, type: "vf", points: 1, statement: "La fonction f(x) = x² est strictement croissante sur ℝ.", correctAnswer: false,
    explanation: "Elle est décroissante sur ]−∞ ; 0] et croissante sur [0 ; +∞[.", correction: "Faux." });

  /* ---------------- m2.2 ---------------- */
  Q({ id: "q2.2a", lesson: "m2.2", type: "text", points: 2, statement: "Domaine de f(x) = (x + 1)/(x² − 9).", hint: "Écris par exemple ℝ\\{1 ; 2} (ℝ privé de…).", accept: [M("ℝ\\{−3;3}")], correctAnswer: "ℝ \\ {−3 ; 3}", errCat: "domaine",
    explanation: "x² − 9 = 0 ⇔ x = 3 ou x = −3 : ces deux valeurs sont interdites.", correction: "D_f = ℝ \\ {−3 ; 3}." });
  Q({ id: "q2.2b", lesson: "m2.2", difficulty: 2, type: "text", points: 2, statement: "Domaine de g(x) = √(x² − 5x + 4).", hint: INT, accept: [M("]−∞;1]∪[4;+∞[")], correctAnswer: "]−∞ ; 1] ∪ [4 ; +∞[", errCat: "domaine",
    explanation: "Il faut x² − 5x + 4 ≥ 0 : racines 1 et 4, positif à l'extérieur, racines incluses.", correction: "D_g = ]−∞ ; 1] ∪ [4 ; +∞[." });
  Q({ id: "q2.2c", lesson: "m2.2", difficulty: 3, type: "text", points: 2, statement: "Domaine de h(x) = 1/(√x − 2).", hint: INT, accept: [M("[0;4[∪]4;+∞[")], correctAnswer: "[0 ; 4[ ∪ ]4 ; +∞[", errCat: "domaine",
    explanation: "Conditions : x ≥ 0 (racine) et √x ≠ 2, c'est-à-dire x ≠ 4.", correction: "D_h = [0 ; 4[ ∪ ]4 ; +∞[." });
  Q({ id: "q2.2d", lesson: "m2.2", difficulty: 2, type: "text", points: 2, statement: "Domaine de f(x) = √(x + 3)/(x − 1).", hint: INT, accept: [M("[−3;1[∪]1;+∞[")], correctAnswer: "[−3 ; 1[ ∪ ]1 ; +∞[", errCat: "domaine",
    explanation: "x + 3 ≥ 0 ⇔ x ≥ −3 et x − 1 ≠ 0 ⇔ x ≠ 1.", correction: "D_f = [−3 ; 1[ ∪ ]1 ; +∞[." });

  /* ---------------- m2.3 ---------------- */
  Q({ id: "q2.3a", lesson: "m2.3", type: "fields", points: 2, statement: "Étudie la parité (réponds « paire », « impaire » ou « ni l'une ni l'autre »).",
    fields: [{ label: "f(x) = 2x⁴ − x² + 5", accept: [/^(est )?paire$/], show: "paire", explain: "f(−x) = f(x)." }, { label: "g(x) = 1/x", accept: [/^(est )?impaire$/], show: "impaire", explain: "g(−x) = −1/x = −g(x)." }],
    explanation: "On vérifie que le domaine est symétrique puis on compare f(−x) à f(x) et à −f(x).", correction: "f est paire, g est impaire." });
  Q({ id: "q2.3b", lesson: "m2.3", difficulty: 2, type: "text", points: 1, statement: "f(x) = √x est-elle paire, impaire, ou ni l'une ni l'autre ?", accept: [/ni.*ni/], correctAnswer: "ni l'une ni l'autre",
    explanation: "D_f = [0 ; +∞[ n'est pas symétrique : 1 ∈ D_f mais −1 ∉ D_f.", correction: "Ni paire ni impaire." });
  Q({ id: "q2.3c", lesson: "m2.3", difficulty: 3, type: "fields", points: 3, statement: "Soit f(x) = 3 − 7/(x + 2). Exprime en fonction de h :",
    fields: [{ label: "f(−2 + h)", accept: [M("3−7/h")], explain: "x + 2 = h." }, { label: "f(−2 − h)", accept: [M("3+7/h")], explain: "x + 2 = −h donc −7/(−h) = +7/h." }, { label: "f(−2 + h) + f(−2 − h)", accept: [M("6")], explain: "La somme vaut 6 = 2 × 3 : I(−2 ; 3) est centre de symétrie." }],
    explanation: "f(a + h) + f(a − h) = 2b prouve que I(a ; b) est centre de symétrie.", correction: "3 − 7/h ; 3 + 7/h ; 6." });
  Q({ id: "q2.3d", lesson: "m2.3", type: "vf", points: 1, statement: "La courbe d'une fonction paire est symétrique par rapport à l'axe des ordonnées.", correctAnswer: true,
    explanation: "f(−x) = f(x) : les points (x ; y) et (−x ; y) sont tous deux sur la courbe.", correction: "Vrai." });

  /* ---------------- m2.4 ---------------- */
  Q({ id: "q2.4a", lesson: "m2.4", type: "fields", points: 2, statement: "Sommet S(α ; β) de la parabole de f(x) = x² + 6x + 5.",
    fields: [{ label: "α", accept: [M("−3")], explain: "α = −b/(2a) = −6/2 = −3." }, { label: "β", accept: [M("−4")], explain: "β = f(−3) = 9 − 18 + 5 = −4." }],
    explanation: "Le sommet est S(−b/(2a) ; f(−b/(2a))).", correction: "S(−3 ; −4)." });
  Q({ id: "q2.4b", lesson: "m2.4", difficulty: 2, type: "text", points: 1, statement: "Valeur maximale de h(x) = −2x² + 12x − 10.", accept: [M("8")], correctAnswer: "8",
    explanation: "α = 3 et h(3) = 8 ; a < 0, donc 8 est un maximum.", correction: "Maximum 8, atteint en x = 3." });
  Q({ id: "q2.4c", lesson: "m2.4", difficulty: 3, type: "fields", points: 2, statement: "Un projectile suit la trajectoire y = −x² + 6x (en mètres).",
    fields: [{ label: "Hauteur maximale (m)", accept: [M("9")], explain: "α = 3 et y(3) = 9." }, { label: "Distance à laquelle il retombe (m)", accept: [M("6")], explain: "−x² + 6x = x(6 − x) = 0 donne x = 6." }],
    explanation: "Sommet pour le maximum ; y = 0 pour le point de chute.", correction: "9 m de haut ; retombe à 6 m." });
  Q({ id: "q2.4d", lesson: "m2.4", type: "qcm", points: 1, statement: "Si a < 0, le sommet de la parabole de f(x) = ax² + bx + c correspond à :", choices: ["un minimum", "un maximum", "un zéro de f", "un centre de symétrie"], correctAnswer: 1,
    explanation: "Une parabole tournée vers le bas a son point le plus haut au sommet.", correction: "Un maximum." });

  /* ---------------- m2.5 ---------------- */
  Q({ id: "q2.5a", lesson: "m2.5", type: "fields", points: 3, statement: "Soit f(x) = (3x − 1)/(x + 2). Donne le centre de symétrie et les asymptotes.",
    fields: [{ label: "Centre I", accept: [M("(−2;3)")], show: "(−2 ; 3)", explain: "I(−d/c ; a/c) = (−2 ; 3)." }, { label: "Asymptote verticale", accept: [M("x=−2")], show: "x = −2" }, { label: "Asymptote horizontale", accept: [M("y=3")], show: "y = 3" }],
    explanation: "Centre I(−d/c ; a/c) ; asymptotes x = −d/c et y = a/c.", correction: "I(−2 ; 3) ; x = −2 et y = 3." });
  Q({ id: "q2.5b", lesson: "m2.5", difficulty: 2, type: "fields", points: 3, statement: "Écris (4x + 5)/(2x + 1) sous la forme y₀ + k/(x − x₀).",
    fields: [{ label: "y₀", accept: [M("2")] }, { label: "x₀", accept: [M("−1/2")] }, { label: "k", accept: [M("3/2")], explain: "k = (bc − ad)/c² = (10 − 4)/4 = 3/2." }],
    explanation: "y₀ = a/c = 2, x₀ = −d/c = −1/2, k = (bc − ad)/c² = 3/2.", correction: "2 + (3/2)/(x + 1/2)." });
  Q({ id: "q2.5c", lesson: "m2.5", difficulty: 3, type: "text", points: 2, statement: "Résoudre (x − 1)/(x + 1) = 1/2.", hint: SET, accept: [M("{3}")], correctAnswer: "{3}",
    explanation: "2(x − 1) = x + 1 avec x ≠ −1, donc x = 3. Contrôle : f(3) = 2/4 = 1/2.", correction: "S = {3}." });
  Q({ id: "q2.5d", lesson: "m2.5", type: "qcm", points: 1, statement: "Si f(x) = y₀ + k/(x − x₀) avec k < 0, alors f est, sur chaque intervalle de son domaine :", choices: ["décroissante", "croissante", "constante", "paire"], correctAnswer: 1,
    explanation: "1/(x − x₀) est décroissante ; multiplier par k < 0 inverse l'ordre.", correction: "Croissante." });

  /* ---------------- m2.6 ---------------- */
  Q({ id: "q2.6a", lesson: "m2.6", type: "fields", points: 2, statement: "Soit f(x) = √(2x + 4).",
    fields: [{ label: "Domaine", accept: [M("[−2;+∞[")], show: "[−2 ; +∞[" }, { label: "Variations (croissante ou décroissante)", accept: [/^(est )?(strictement )?croissante$/], show: "croissante", explain: "a = 2 > 0." }],
    explanation: "2x + 4 ≥ 0 ⇔ x ≥ −2 ; a > 0 : croissante.", correction: "D_f = [−2 ; +∞[, croissante." });
  Q({ id: "q2.6b", lesson: "m2.6", difficulty: 2, type: "text", points: 2, statement: "Résoudre √(x + 2) = 3.", hint: SET, accept: [M("{7}")], correctAnswer: "{7}",
    explanation: "x ≥ −2 ; en élevant au carré, x + 2 = 9 donc x = 7. Vérification : √9 = 3.", correction: "S = {7}." });
  Q({ id: "q2.6c", lesson: "m2.6", difficulty: 3, type: "text", points: 2, statement: "Résoudre √(x + 6) = x.", hint: SET, accept: [M("{3}")], correctAnswer: "{3}", errCat: "methode",
    feedback: [{ re: /^\{?-?2;3\}?$|^\{?3;-?2\}?$/, msg: "x = −2 est à rejeter : la condition x ≥ 0 n'est pas vérifiée (√4 = 2 ≠ −2).", cat: "methode" }],
    explanation: "x ≥ 0 ; x + 6 = x² donne x = 3 ou −2. On rejette −2.", correction: "S = {3}." });
  Q({ id: "q2.6d", lesson: "m2.6", type: "vf", points: 1, statement: "L'équation √(x + 6) = x admet x = −2 comme solution.", correctAnswer: false,
    explanation: "√(−2 + 6) = 2, qui n'est pas égal à −2.", correction: "Faux." });
})(window.DATA);
