/* Questions corrigées automatiquement — chapitres 3 et 4. */
(function (D) {
  const M = (m, o) => Object.assign({ math: m }, o || {});
  const Q = (o) => { o.chapter = o.chapter || o.lesson.split(".")[0]; o.relatedLesson = o.relatedLesson || o.lesson; o.difficulty = o.difficulty || 1; if (o.bank === undefined) o.bank = true; D.questions.push(o); };
  const SET = "Écris les solutions entre accolades, séparées par des points-virgules : {1 ; 3}.";

  /* ---------------- m3.1 ---------------- */
  Q({ id: "q3.1a", lesson: "m3.1", type: "text", points: 2, statement: "Décompose 252 en facteurs premiers.", hint: "Écris un produit de puissances, par exemple 2^3 × 5.", accept: [M("2²×3²×7", { must: /[*^]/ })], correctAnswer: "2² × 3² × 7",
    explanation: "252 = 2 × 126 = 2² × 63 = 2² × 3 × 21 = 2² × 3² × 7.", correction: "252 = 2² × 3² × 7." });
  Q({ id: "q3.1b", lesson: "m3.1", type: "qcm", points: 1, statement: "Le nombre 91 est-il premier ?", choices: ["Oui", "Non : 91 = 7 × 13", "Non : 91 = 3 × 31", "Non : 91 = 9 × 10"], correctAnswer: 1,
    explanation: "91 n'est divisible ni par 2, 3 ni 5, mais 7 × 13 = 91.", correction: "91 = 7 × 13 : composé." });
  Q({ id: "q3.1c", lesson: "m3.1", difficulty: 3, type: "text", points: 2, statement: "Combien 180 a-t-il de diviseurs positifs ?", accept: [M("18")], correctAnswer: "18",
    explanation: "180 = 2² × 3² × 5 : (2 + 1)(2 + 1)(1 + 1) = 18 diviseurs.", correction: "18 diviseurs." });
  Q({ id: "q3.1d", lesson: "m3.1", type: "vf", points: 1, statement: "1 est un nombre premier.", correctAnswer: false,
    explanation: "Un nombre premier a exactement deux diviseurs positifs ; 1 n'en a qu'un.", correction: "Faux." });

  /* ---------------- m3.2 ---------------- */
  Q({ id: "q3.2a", lesson: "m3.2", type: "fields", points: 2, statement: "Calcule le PGCD et le PPCM de 12 et 18.",
    fields: [{ label: "PGCD(12, 18)", accept: [M("6")], explain: "12 = 2² × 3 et 18 = 2 × 3² : PGCD = 2 × 3." }, { label: "PPCM(12, 18)", accept: [M("36")], explain: "PPCM = 2² × 3² = 36." }],
    explanation: "Facteurs premiers : PGCD = plus petits exposants, PPCM = plus grands. Contrôle : 6 × 36 = 12 × 18.", correction: "PGCD 6 ; PPCM 36." });
  Q({ id: "q3.2b", lesson: "m3.2", difficulty: 2, type: "text", points: 2, statement: "Utilise l'algorithme d'Euclide pour calculer PGCD(1 071 ; 462).", accept: [M("21")], correctAnswer: "21",
    explanation: "1071 = 462×2 + 147 ; 462 = 147×3 + 21 ; 147 = 21×7 + 0. Le dernier reste non nul est 21.", correction: "PGCD = 21." });
  Q({ id: "q3.2c", lesson: "m3.2", difficulty: 3, type: "fields", points: 3, statement: "On découpe une plaque de 180 cm sur 126 cm en carrés identiques, sans perte, de côté le plus grand possible.",
    fields: [{ label: "Côté du carré (cm)", accept: [M("18", { unit: "cm" })], explain: "Côté = PGCD(180, 126) = 18." }, { label: "Nombre de carrés", accept: [M("70")], explain: "(180/18) × (126/18) = 10 × 7 = 70." }],
    explanation: "Le plus grand côté commun est le PGCD.", correction: "18 cm ; 70 carrés." });
  Q({ id: "q3.2d", lesson: "m3.2", type: "vf", points: 1, statement: "Pour deux entiers non nuls a et b, PGCD(a, b) × PPCM(a, b) = a × b.", correctAnswer: true,
    explanation: "Propriété du cours (ex. 6 × 36 = 12 × 18).", correction: "Vrai." });

  /* ---------------- m3.3 ---------------- */
  Q({ id: "q3.3a", lesson: "m3.3", type: "text", points: 1, statement: "Quel est le degré de (x² + 1)(x³ − x) ?", accept: [M("5")], correctAnswer: "5",
    explanation: "deg(PQ) = deg P + deg Q = 2 + 3.", correction: "Degré 5." });
  Q({ id: "q3.3b", lesson: "m3.3", difficulty: 2, type: "text", points: 3, statement: "Factoriser P(x) = x³ − 7x + 6 (indice : P(1) = 0).", accept: [M("(x−1)(x−2)(x+3)", { must: /\)\*?\(.*\)\*?\(/ })], correctAnswer: "(x − 1)(x − 2)(x + 3)",
    explanation: "P = (x − 1)(x² + x − 6) et x² + x − 6 = (x + 3)(x − 2).", correction: "P(x) = (x − 1)(x − 2)(x + 3)." });
  Q({ id: "q3.3c", lesson: "m3.3", difficulty: 3, type: "text", points: 3, statement: "Résoudre 2x³ − 3x² − 3x + 2 = 0 (indice : −1 est racine).", hint: SET, accept: [M("{−1;1/2;2}")], correctAnswer: "{−1 ; 1/2 ; 2}",
    explanation: "P = (x + 1)(2x² − 5x + 2) et 2x² − 5x + 2 a pour racines 2 et 1/2.", correction: "S = {−1 ; 1/2 ; 2}." });
  Q({ id: "q3.3d", lesson: "m3.3", type: "vf", points: 1, statement: "Si P(α) = 0, alors (x − α) divise P(x).", correctAnswer: true,
    explanation: "C'est le lien entre racine et factorisation d'un polynôme.", correction: "Vrai." });

  /* ---------------- m3.4 ---------------- */
  Q({ id: "q3.4a", lesson: "m3.4", type: "text", points: 1, statement: "Suite arithmétique de premier terme u₁ = 7 et de raison r = −2. Calcule u₅.", accept: [M("−1")], correctAnswer: "−1",
    explanation: "uₙ = u₁ + (n − 1)r : u₅ = 7 + 4 × (−2) = −1.", correction: "u₅ = −1." });
  Q({ id: "q3.4b", lesson: "m3.4", difficulty: 2, type: "text", points: 2, statement: "On rembourse 100 DT le premier mois, puis 20 DT de plus chaque mois. Quel total (en DT) a-t-on remboursé après 12 mois ?", accept: [M("2520", { unit: "dt" })], correctAnswer: "2 520",
    explanation: "u₁₂ = 100 + 11 × 20 = 320 et S₁₂ = 12 × (100 + 320)/2 = 2 520.", correction: "2 520 DT." });
  Q({ id: "q3.4c", lesson: "m3.4", difficulty: 3, type: "text", points: 2, statement: "Suite géométrique u₁ = 3, q = 2 : plus petit entier n tel que uₙ > 1 000.", accept: [M("10")], correctAnswer: "10",
    explanation: "uₙ = 3 × 2ⁿ⁻¹ ; u₉ = 768 < 1000 et u₁₀ = 1536 > 1000.", correction: "n = 10." });
  Q({ id: "q3.4d", lesson: "m3.4", type: "qcm", points: 1, statement: "Suite géométrique de premier terme 3 et de raison 2 : que vaut u₃ ?", choices: ["6", "9", "12", "24"], correctAnswer: 2,
    explanation: "uₙ = u₁ qⁿ⁻¹ : u₃ = 3 × 2² = 12.", correction: "u₃ = 12." });
  Q({ id: "q3.4e", lesson: "m3.4", difficulty: 2, type: "fields", points: 2, statement: "Suite géométrique u₁ = 3 et q = 2.",
    fields: [{ label: "u₅", accept: [M("48")], explain: "3 × 2⁴ = 48." }, { label: "S₅ = u₁ + … + u₅", accept: [M("93")], explain: "S₅ = 3 × (2⁵ − 1)/(2 − 1) = 93." }],
    explanation: "Sₙ = u₁(qⁿ − 1)/(q − 1). Contrôle : 3 + 6 + 12 + 24 + 48 = 93.", correction: "u₅ = 48 ; S₅ = 93." });

  /* ---------------- m4.1 ---------------- */
  Q({ id: "q4.1a", lesson: "m4.1", type: "fields", points: 2, statement: "Convertis.",
    fields: [{ label: "120° en radians", accept: [M("2π/3")], explain: "120 × π/180 = 2π/3." }, { label: "3π/4 rad en degrés", accept: [M("135", { unit: "°" })], explain: "(3/4) × 180° = 135°." }],
    explanation: "π rad = 180°.", correction: "120° = 2π/3 ; 3π/4 = 135°." });
  Q({ id: "q4.1b", lesson: "m4.1", difficulty: 2, type: "text", points: 2, statement: "Mesure principale (dans ]−π ; π]) de 11π/3.", accept: [M("−π/3")], correctAnswer: "−π/3",
    explanation: "11π/3 − 4π = −π/3, qui est dans ]−π ; π].", correction: "−π/3." });
  Q({ id: "q4.1c", lesson: "m4.1", difficulty: 3, type: "text", points: 2, statement: "L'aiguille des minutes mesure 12 cm. Quelle distance parcourt sa pointe en 20 minutes ? (valeur exacte ou arrondie au dixième de cm)", accept: [M("8π", { tol: 0.06, unit: "cm" })], correctAnswer: "8π ≈ 25,1 cm",
    explanation: "20 min = 1/3 de tour = 2π/3 rad ; l = Rθ = 12 × 2π/3 = 8π.", correction: "8π ≈ 25,1 cm." });
  Q({ id: "q4.1d", lesson: "m4.1", type: "qcm", points: 1, statement: "Un tour complet du cercle trigonométrique mesure, en radians :", choices: ["π", "2π", "π/2", "360"], correctAnswer: 1,
    explanation: "360° = 2π rad.", correction: "2π." });

  /* ---------------- m4.2 ---------------- */
  Q({ id: "q4.2a", lesson: "m4.2", type: "text", points: 1, statement: "cos x = 3/5 et x ∈ [0 ; π/2]. Calcule sin x.", accept: [M("4/5")], correctAnswer: "4/5",
    explanation: "sin²x = 1 − 9/25 = 16/25 ; sin x ≥ 0 sur [0 ; π/2].", correction: "sin x = 4/5." });
  Q({ id: "q4.2b", lesson: "m4.2", difficulty: 2, type: "fields", points: 2, statement: "tan x = 3/4 et x ∈ ]0 ; π/2[.",
    fields: [{ label: "cos x", accept: [M("4/5")], explain: "1/cos²x = 1 + tan²x = 25/16." }, { label: "sin x", accept: [M("3/5")], explain: "sin x = tan x × cos x = (3/4)(4/5)." }],
    explanation: "Vérification : 9/25 + 16/25 = 1.", correction: "cos x = 4/5 ; sin x = 3/5." });
  Q({ id: "q4.2c", lesson: "m4.2", type: "qcm", points: 1, statement: "Quelle est l'identité fondamentale ?", choices: ["cos x + sin x = 1", "cos²x + sin²x = 1", "cos x × sin x = 1", "cos²x − sin²x = 1"], correctAnswer: 1,
    explanation: "Sur le cercle trigonométrique, (cos x ; sin x) est à distance 1 de l'origine.", correction: "cos²x + sin²x = 1." });
  Q({ id: "q4.2d", lesson: "m4.2", difficulty: 2, type: "text", points: 2, statement: "cos x = −12/13 et x ∈ [π/2 ; π]. Calcule sin x.", accept: [M("5/13")], correctAnswer: "5/13", errCat: "signe",
    feedback: [{ re: /^-5\/13$/, msg: "Sur [π/2 ; π] le sinus est positif.", cat: "signe" }],
    explanation: "sin²x = 25/169 ; sin x ≥ 0 car x ∈ [π/2 ; π].", correction: "sin x = 5/13." });

  /* ---------------- m4.3 ---------------- */
  Q({ id: "q4.3a", lesson: "m4.3", type: "text", points: 1, statement: "Calculer cos(π/4) × sin(π/4).", accept: [M("1/2")], correctAnswer: "1/2",
    explanation: "(√2/2)(√2/2) = 2/4 = 1/2.", correction: "1/2." });
  Q({ id: "q4.3b", lesson: "m4.3", difficulty: 2, type: "text", points: 2, statement: "Calculer tan(π/6) + 1/tan(π/6).", accept: [M("4√3/3")], correctAnswer: "4√3/3",
    explanation: "tan(π/6) = √3/3 et 1/tan(π/6) = √3 ; somme = √3/3 + 3√3/3.", correction: "4√3/3." });
  Q({ id: "q4.3c", lesson: "m4.3", difficulty: 3, type: "text", points: 2, statement: "Calculer cos²(π/6) − sin²(π/6).", accept: [M("1/2")], correctAnswer: "1/2",
    explanation: "(√3/2)² − (1/2)² = 3/4 − 1/4 = 1/2 = cos(π/3).", correction: "1/2." });
  Q({ id: "q4.3d", lesson: "m4.3", type: "qcm", points: 1, statement: "Que vaut sin(π/3) ?", choices: ["1/2", "√2/2", "√3/2", "√3"], correctAnswer: 2,
    explanation: "Valeur remarquable : sin(π/3) = √3/2.", correction: "√3/2." });

  /* ---------------- m4.4 ---------------- */
  Q({ id: "q4.4a", lesson: "m4.4", type: "fields", points: 2, statement: "Calcule.",
    fields: [{ label: "cos(π + π/3)", accept: [M("−1/2")], explain: "cos(π + x) = −cos x." }, { label: "sin(−π/2)", accept: [M("−1")], explain: "sin(−x) = −sin x." }],
    explanation: "Angles associés.", correction: "−1/2 ; −1." });
  Q({ id: "q4.4b", lesson: "m4.4", difficulty: 3, type: "text", points: 3, statement: "Simplifier cos(π − x)·sin(π/2 + x) − sin(π − x)·cos(π/2 − x).", accept: [M("−1")], correctAnswer: "−1",
    explanation: "= (−cos x)(cos x) − (sin x)(sin x) = −(cos²x + sin²x) = −1.", correction: "−1." });
  Q({ id: "q4.4c", lesson: "m4.4", type: "qcm", points: 1, statement: "cos(π/2 − x) = ", choices: ["cos x", "−cos x", "sin x", "−sin x"], correctAnswer: 2,
    explanation: "Angles complémentaires : cos(π/2 − x) = sin x.", correction: "sin x." });
  Q({ id: "q4.4d", lesson: "m4.4", type: "vf", points: 1, statement: "sin(π − x) = −sin x pour tout réel x.", correctAnswer: false,
    explanation: "sin(π − x) = sin x ; c'est cos(π − x) qui vaut −cos x.", correction: "Faux." });

  /* ---------------- m4.5 ---------------- */
  Q({ id: "q4.5a", lesson: "m4.5", type: "text", points: 2, statement: "Résoudre sin x = −√2/2 dans ]−π ; π].", hint: SET, accept: [M("{−3π/4;−π/4}")], correctAnswer: "{−3π/4 ; −π/4}",
    explanation: "−√2/2 = sin(−π/4) : x = −π/4 ou x = 5π/4 (soit −3π/4 dans ]−π ; π]).", correction: "S = {−3π/4 ; −π/4}." });
  Q({ id: "q4.5b", lesson: "m4.5", difficulty: 2, type: "text", points: 2, statement: "Résoudre 2cos x − √2 = 0 dans [−π ; π].", hint: SET, accept: [M("{−π/4;π/4}")], correctAnswer: "{−π/4 ; π/4}",
    explanation: "cos x = √2/2 = cos(π/4) donc x = ±π/4 + 2kπ.", correction: "S = {−π/4 ; π/4}." });
  Q({ id: "q4.5c", lesson: "m4.5", difficulty: 3, type: "text", points: 3, statement: "Résoudre cos 2x = cos x dans [0 ; 2π[.", hint: SET, accept: [M("{0;2π/3;4π/3}")], correctAnswer: "{0 ; 2π/3 ; 4π/3}",
    explanation: "2x = x + 2kπ ou 2x = −x + 2kπ, soit x = 2kπ ou x = 2kπ/3.", correction: "S = {0 ; 2π/3 ; 4π/3}." });
  Q({ id: "q4.5d", lesson: "m4.5", difficulty: 2, type: "text", points: 1, statement: "Résoudre tan x = √3 dans ]−π/2 ; π/2[.", accept: [M("π/3")], correctAnswer: "π/3",
    explanation: "tan(π/3) = √3 et la tangente est injective sur ]−π/2 ; π/2[.", correction: "x = π/3." });
  Q({ id: "q4.5e", lesson: "m4.5", type: "vf", points: 1, statement: "cos x = cos a équivaut à x = a + 2kπ uniquement (k ∈ ℤ).", correctAnswer: false, errCat: "methode",
    explanation: "Il y a deux familles : x = a + 2kπ ou x = −a + 2kπ.", correction: "Faux." });
})(window.DATA);
