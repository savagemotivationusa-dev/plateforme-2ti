/* Questions corrigées automatiquement — chapitres 5 et 6. */
(function (D) {
  const M = (m, o) => Object.assign({ math: m }, o || {});
  const Q = (o) => { o.chapter = o.chapter || o.lesson.split(".")[0]; o.relatedLesson = o.relatedLesson || o.lesson; o.difficulty = o.difficulty || 1; if (o.bank === undefined) o.bank = true; D.questions.push(o); };
  const PT = "Écris un couple sous la forme (x ; y).";

  /* ---------------- m5.1 ---------------- */
  Q({ id: "q5.1a", lesson: "m5.1", type: "fields", points: 2, statement: "A(2 ; −3) et B(−1 ; 1).",
    fields: [{ label: "Composantes de AB⃗", accept: [M("(−3;4)")], show: "(−3 ; 4)", explain: "AB⃗ (x_B − x_A ; y_B − y_A) : arrivée moins départ." }, { label: "Norme AB", accept: [M("5")], explain: "AB = √(9 + 16) = 5." }],
    hint: PT, explanation: "AB⃗ = (−1 − 2 ; 1 − (−3)) = (−3 ; 4) et AB = √((−3)² + 4²) = 5.", correction: "AB⃗ (−3 ; 4) ; AB = 5." });
  Q({ id: "q5.1b", lesson: "m5.1", difficulty: 2, type: "text", points: 2, statement: "B(1 ; 4) et C(4 ; −1) : coordonnées du milieu de [BC].", hint: PT, accept: [M("(5/2;3/2)")], correctAnswer: "(5/2 ; 3/2)",
    explanation: "Milieu = moyennes des coordonnées : ((1 + 4)/2 ; (4 − 1)/2).", correction: "(5/2 ; 3/2)." });
  Q({ id: "q5.1c", lesson: "m5.1", difficulty: 3, type: "text", points: 3, statement: "A(−3 ; 1), B(1 ; 3), D(−4 ; −2). Trouve C pour que ABCD soit un parallélogramme.", hint: PT, accept: [M("(0;0)")], correctAnswer: "(0 ; 0)",
    explanation: "AB⃗ = DC⃗ : (4 ; 2) = (x + 4 ; y + 2), donc x = 0 et y = 0.", correction: "C(0 ; 0)." });
  Q({ id: "q5.1d", lesson: "m5.1", difficulty: 2, type: "text", points: 2, statement: "A(−2 ; 1) et B(1 ; 4) : calcule la distance AB (valeur exacte).", accept: [M("3√2")], correctAnswer: "3√2",
    explanation: "AB² = 3² + 3² = 18, donc AB = √18 = 3√2.", correction: "AB = 3√2." });

  /* ---------------- m5.2 ---------------- */
  Q({ id: "q5.2a", lesson: "m5.2", type: "text", points: 1, statement: "Les vecteurs u⃗(2 ; 5) et v⃗(4 ; 10) sont-ils colinéaires ? (oui / non)", accept: [/^oui$/], correctAnswer: "oui",
    explanation: "det = 2 × 10 − 4 × 5 = 0 (et v⃗ = 2u⃗).", correction: "Oui." });
  Q({ id: "q5.2b", lesson: "m5.2", difficulty: 2, type: "text", points: 2, statement: "A(1 ; 2), B(3 ; 6), C(x ; 10) sont alignés. Trouve x.", accept: [M("5")], correctAnswer: "5",
    explanation: "AB⃗ (2 ; 4), AC⃗ (x − 1 ; 8) : det = 16 − 4(x − 1) = 20 − 4x = 0.", correction: "x = 5." });
  Q({ id: "q5.2c", lesson: "m5.2", difficulty: 3, type: "text", points: 2, statement: "A(1 ; 1), B(4 ; 2). Trouve l'abscisse m de D(m ; 0) pour que AD⃗ ⊥ AB⃗.", accept: [M("4/3")], correctAnswer: "4/3",
    explanation: "AD⃗ (m − 1 ; −1), AB⃗ (3 ; 1) : produit scalaire 3(m − 1) − 1 = 3m − 4 = 0.", correction: "m = 4/3." });
  Q({ id: "q5.2d", lesson: "m5.2", type: "qcm", points: 1, statement: "Deux vecteurs (x ; y) et (x' ; y') sont orthogonaux si et seulement si :", choices: ["xy' − x'y = 0", "xx' + yy' = 0", "xx' − yy' = 0", "x + y = x' + y'"], correctAnswer: 1, errCat: "concept",
    explanation: "xy' − x'y = 0 caractérise la colinéarité ; xx' + yy' = 0 l'orthogonalité.", correction: "xx' + yy' = 0." });
  Q({ id: "q5.2e", lesson: "m5.2", type: "vf", points: 1, statement: "det(u⃗, v⃗) = 0 signifie que u⃗ et v⃗ sont orthogonaux.", correctAnswer: false, errCat: "concept",
    explanation: "det = 0 signifie colinéaires.", correction: "Faux." });

  /* ---------------- m5.3 ---------------- */
  Q({ id: "q5.3a", lesson: "m5.3", type: "fields", points: 2, statement: "Droite d'équation 4x + 3y − 5 = 0.",
    fields: [{ label: "Équation réduite", accept: [M("y=−4/3x+5/3")], show: "y = −(4/3)x + 5/3" }, { label: "Un vecteur directeur", accept: [M("(−3;4)", { parallel: true })], show: "(−3 ; 4)", explain: "u⃗(−b ; a)." }],
    hint: "Écris l'équation réduite sous la forme y = mx + p.", explanation: "y = −(4/3)x + 5/3 ; u⃗(−b ; a) = (−3 ; 4).", correction: "y = −(4/3)x + 5/3 ; u⃗(−3 ; 4)." });
  Q({ id: "q5.3b", lesson: "m5.3", difficulty: 2, type: "text", points: 2, statement: "Équation cartésienne de la droite (AB) pour A(−1 ; 2) et B(3 ; −2).", hint: "Forme ax + by + c = 0 (un multiple de l'équation est accepté).", accept: [M("x+y−1=0")], correctAnswer: "x + y − 1 = 0",
    explanation: "AB⃗ (4 ; −4), det(AM⃗, AB⃗) = −4x − 4y + 4 = 0. Contrôle : A et B vérifient x + y − 1 = 0.", correction: "x + y − 1 = 0." });
  Q({ id: "q5.3c", lesson: "m5.3", difficulty: 3, type: "fields", points: 3, statement: "Droite passant par A(2 ; −1) de pente 3, puis droite perpendiculaire en A.",
    fields: [{ label: "Droite de pente 3", accept: [M("3x−y−7=0")], show: "3x − y − 7 = 0" }, { label: "Perpendiculaire en A", accept: [M("x+3y+1=0")], show: "x + 3y + 1 = 0", explain: "Pente −1/3 : aa' + bb' = 3 × 1 + (−1) × 3 = 0." }],
    hint: "Forme ax + by + c = 0.", explanation: "y + 1 = 3(x − 2) ; perpendiculaire : y + 1 = −(1/3)(x − 2).", correction: "3x − y − 7 = 0 ; x + 3y + 1 = 0." });
  Q({ id: "q5.3d", lesson: "m5.3", type: "qcm", points: 1, statement: "Un vecteur directeur de la droite ax + by + c = 0 est :", choices: ["(a ; b)", "(−b ; a)", "(b ; a)", "(a ; −b)"], correctAnswer: 1,
    explanation: "(a ; b) est un vecteur normal ; (−b ; a) est un vecteur directeur.", correction: "(−b ; a)." });

  /* ---------------- m5.4 ---------------- */
  Q({ id: "q5.4a", lesson: "m5.4", type: "text", points: 2, statement: "Position relative de 2x − y + 3 = 0 et 4x − 2y + 1 = 0 ? (sécantes, strictement parallèles ou confondues)", accept: [/strictement.*parall/], correctAnswer: "strictement parallèles",
    explanation: "ab' − a'b = 0 : parallèles ; le point (0 ; 3) de la première ne vérifie pas la seconde (−5 ≠ 0).", correction: "Strictement parallèles." });
  Q({ id: "q5.4b", lesson: "m5.4", difficulty: 3, type: "text", points: 3, statement: "Point d'intersection de 3x − 2y + 1 = 0 et x + 4y − 9 = 0.", hint: PT, accept: [M("(1;2)")], correctAnswer: "(1 ; 2)",
    explanation: "ab' − a'b = 14 ≠ 0 : sécantes. 2D + D' : 7x − 7 = 0, x = 1, puis y = 2.", correction: "K(1 ; 2)." });
  Q({ id: "q5.4c", lesson: "m5.4", type: "qcm", points: 1, statement: "Si ab' − a'b ≠ 0, les droites ax + by + c = 0 et a'x + b'y + c' = 0 sont :", choices: ["parallèles", "sécantes", "confondues", "toujours perpendiculaires"], correctAnswer: 1,
    explanation: "Les vecteurs directeurs ne sont pas colinéaires : un seul point commun.", correction: "Sécantes." });
  Q({ id: "q5.4d", lesson: "m5.4", type: "vf", points: 1, statement: "Deux droites parallèles qui ont un point commun sont confondues.", correctAnswer: true,
    explanation: "Si deux droites parallèles se coupent, elles ont la même direction et un point commun : elles sont égales.", correction: "Vrai." });

  /* ---------------- m6.1 ---------------- */
  Q({ id: "q6.1a", lesson: "m6.1", type: "fields", points: 2, statement: "Effectifs 5, 10 et 15.",
    fields: [{ label: "Effectif total N", accept: [M("30")] }, { label: "Fréquence (en %) de la valeur d'effectif 15", accept: [M("50", { pct: true })], explain: "15/30 = 0,5 = 50 %." }],
    explanation: "N = 5 + 10 + 15 = 30 ; fréquence = effectif / N.", correction: "N = 30 ; 50 %." });
  Q({ id: "q6.1b", lesson: "m6.1", type: "text", points: 1, statement: "18 élèves sur 60 pratiquent le football : fréquence en % ?", accept: [M("30", { pct: true })], correctAnswer: "30 %",
    explanation: "18/60 = 0,30 = 30 %.", correction: "30 %." });
  Q({ id: "q6.1c", lesson: "m6.1", difficulty: 3, type: "text", points: 2, statement: "La valeur 5 a pour fréquence 25 % et pour effectif 12. Trouve l'effectif total N.", accept: [M("48")], correctAnswer: "48",
    explanation: "12/N = 0,25 donc N = 12/0,25 = 48.", correction: "N = 48." });
  Q({ id: "q6.1d", lesson: "m6.1", type: "qcm", points: 1, statement: "La fréquence d'une valeur d'effectif nᵢ dans une série d'effectif total N est :", choices: ["nᵢ × N", "nᵢ / N", "N / nᵢ", "nᵢ − N"], correctAnswer: 1,
    explanation: "fᵢ = nᵢ/N.", correction: "nᵢ / N." });

  /* ---------------- m6.2 ---------------- */
  Q({ id: "q6.2a", lesson: "m6.2", type: "fields", points: 4, statement: "Série : 6, 6, 7, 9, 12.",
    fields: [{ label: "Moyenne", accept: [M("8")], explain: "(6 + 6 + 7 + 9 + 12)/5 = 40/5." }, { label: "Médiane", accept: [M("7")], explain: "3ᵉ valeur de la série ordonnée." }, { label: "Mode", accept: [M("6")], explain: "6 apparaît deux fois." }, { label: "Étendue", accept: [M("6")], explain: "12 − 6." }],
    explanation: "Moyenne = somme / effectif ; médiane = valeur centrale ; mode = valeur la plus fréquente ; étendue = max − min.", correction: "Moyenne 8, médiane 7, mode 6, étendue 6." });
  Q({ id: "q6.2b", lesson: "m6.2", difficulty: 2, type: "text", points: 2, statement: "Maths coef 3 : 12 ; informatique coef 4 : 15 ; français coef 2 : 10. Moyenne pondérée (arrondie au centième) ?", accept: [M("116/9", { tol: 0.006 })], correctAnswer: "116/9 ≈ 12,89",
    explanation: "(3×12 + 4×15 + 2×10)/9 = 116/9.", correction: "≈ 12,89." });
  Q({ id: "q6.2c", lesson: "m6.2", difficulty: 3, type: "text", points: 2, statement: "10 élèves ont une moyenne de 12. Un 11ᵉ élève obtient 23. Quelle est la nouvelle moyenne ?", accept: [M("13")], correctAnswer: "13",
    explanation: "Somme = 120 ; (120 + 23)/11 = 143/11 = 13.", correction: "13." });
  Q({ id: "q6.2d", lesson: "m6.2", type: "vf", points: 1, statement: "La médiane d'une série est toujours égale à sa moyenne.", correctAnswer: false,
    explanation: "Par exemple pour 6, 6, 7, 9, 12 : médiane 7 et moyenne 8.", correction: "Faux." });

  /* ---------------- m6.3 ---------------- */
  Q({ id: "q6.3a", lesson: "m6.3", type: "text", points: 1, statement: "Dans le cube, quelle est la position des droites (AE) et (CG) ? (parallèles, sécantes ou non coplanaires)", accept: [/parall/], correctAnswer: "parallèles",
    explanation: "Deux arêtes verticales du cube sont parallèles (elles sont dans le plan (ACG)).", correction: "(AE) ∥ (CG)." });
  Q({ id: "q6.3b", lesson: "m6.3", difficulty: 2, type: "text", points: 1, statement: "Dans le cube, les droites (BC) et (EH) sont-elles coplanaires ? (oui / non)", accept: [/^oui$/], correctAnswer: "oui",
    explanation: "(BC) ∥ (AD) ∥ (EH) : droites parallèles, donc coplanaires.", correction: "Oui." });
  Q({ id: "q6.3c", lesson: "m6.3", difficulty: 3, type: "text", points: 2, statement: "Quelle est l'intersection des plans (ABF) et (BCG) ? (donne une droite)", accept: [/^(la droite )?\(?bf\)?$/], correctAnswer: "(BF)",
    explanation: "Les faces ABFE et BCGF ont en commun l'arête [BF].", correction: "La droite (BF)." });
  Q({ id: "q6.3d", lesson: "m6.3", type: "vf", points: 1, statement: "Deux droites de l'espace peuvent n'être ni parallèles ni sécantes.", correctAnswer: true,
    explanation: "Ce sont alors des droites non coplanaires.", correction: "Vrai." });

  /* ---------------- m6.4 ---------------- */
  Q({ id: "q6.4a", lesson: "m6.4", type: "text", points: 1, statement: "Volume d'un parallélépipède rectangle de dimensions 5, 3 et 2.", accept: [M("30")], correctAnswer: "30",
    explanation: "V = longueur × largeur × hauteur = 5 × 3 × 2.", correction: "30." });
  Q({ id: "q6.4b", lesson: "m6.4", difficulty: 3, type: "text", points: 2, statement: "Longueur de la diagonale d'un cube d'arête a.", accept: [M("a√3")], correctAnswer: "a√3",
    explanation: "AG² = AC² + CG² = 2a² + a² = 3a².", correction: "a√3." });
  Q({ id: "q6.4c", lesson: "m6.4", type: "qcm", points: 1, statement: "Pour prouver qu'une droite D est perpendiculaire à un plan P, il suffit que D soit orthogonale à :", choices: ["une droite de P", "deux droites sécantes de P", "deux droites parallèles de P", "toute droite parallèle à P"], correctAnswer: 1,
    explanation: "Critère du cours : deux droites sécantes du plan.", correction: "Deux droites sécantes de P." });
  Q({ id: "q6.4d", lesson: "m6.4", difficulty: 2, type: "vf", points: 1, statement: "Dans un cube ABCDEFGH, la droite (BF) est perpendiculaire au plan (ABC).", correctAnswer: true,
    explanation: "(BF) ⊥ (BA) et (BF) ⊥ (BC), droites sécantes en B du plan (ABC).", correction: "Vrai." });
})(window.DATA);
