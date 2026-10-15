/* Questions des quatre devoirs types (barème : chaque devoir totalise 20 points).
   Les énoncés et le barème suivent le document de référence ; les QCM ont leurs propositions
   dans un ordre différent. Devoir de synthèse N°1, ex. 2 q. 2 : voir la mention dans la question. */
(function (D) {
  const M = (m, o) => Object.assign({ math: m }, o || {});
  const Q = (o) => { o.chapter = o.chapter || o.lesson.split(".")[0]; o.relatedLesson = o.relatedLesson || o.lesson; o.difficulty = o.difficulty || 1; if (o.bank === undefined) o.bank = true; D.questions.push(o); };
  const SET = "Écris les solutions entre accolades : {1 ; 3}.";
  const INT = "Écris avec des crochets, par exemple ]−∞ ; 2[ ∪ [5 ; +∞[.";
  const PT = "Écris un couple sous la forme (x ; y).";

  /* =============================== D1 — Contrôle N°1 =============================== */
  Q({ id: "D1-1-1", lesson: "m1.2", type: "qcm", points: 1, statement: "Le discriminant du trinôme −x² + 4x − 4 est égal à :", choices: ["16", "0", "−16"], correctAnswer: 1, errCat: "signe",
    explanation: "a = −1, b = 4, c = −4 : Δ = 4² − 4×(−1)×(−4) = 16 − 16 = 0.", correction: "0" });
  Q({ id: "D1-1-2", lesson: "m5.2", type: "qcm", points: 1, statement: "Si u⃗(3 ; −2) et v⃗(x ; 4) sont colinéaires, alors x vaut :", choices: ["−6", "6", "−8/3"], correctAnswer: 0,
    explanation: "det(u⃗, v⃗) = 3×4 − x×(−2) = 12 + 2x = 0 ⇔ x = −6.", correction: "−6" });
  Q({ id: "D1-1-3", lesson: "m2.2", type: "qcm", points: 1, statement: "Le domaine de f(x) = √(x + 3)/(x − 1) est :", choices: ["[−3 ; +∞[", "]−3 ; 1[ ∪ ]1 ; +∞[", "[−3 ; 1[ ∪ ]1 ; +∞["], correctAnswer: 2, errCat: "domaine",
    explanation: "Racine : x + 3 ≥ 0 donc x ≥ −3 (−3 inclus) ; dénominateur : x ≠ 1.", correction: "[−3 ; 1[ ∪ ]1 ; +∞[" });
  Q({ id: "D1-1-4", lesson: "m4.4", type: "vf", points: 1, statement: "L'expression A = cos(π − x) + sin(π/2 − x) s'annule pour tout réel x.", correctAnswer: true,
    explanation: "cos(π − x) = −cos x et sin(π/2 − x) = cos x, donc A = 0.", correction: "Vrai." });
  Q({ id: "D1-2-1", lesson: "m1.2", difficulty: 2, type: "text", points: 2.5, statement: "Résoudre dans ℝ : 3x² − 5x − 2 = 0.", hint: SET, accept: [M("{−1/3;2}")], correctAnswer: "{−1/3 ; 2}",
    explanation: "Δ = 25 + 24 = 49, √Δ = 7 ; x = (5 − 7)/6 = −1/3 et x = (5 + 7)/6 = 2.", correction: "S = {−1/3 ; 2}" });
  Q({ id: "D1-2-2", lesson: "m1.4", difficulty: 2, type: "fields", points: 2.5, statement: "Étudier le signe de P(x) = 3x² − 5x − 2.", hint: INT,
    fields: [{ label: "P(x) > 0 sur", accept: [M("]−∞;−1/3[∪]2;+∞[")], show: "]−∞ ; −1/3[ ∪ ]2 ; +∞[", explain: "a = 3 > 0 : positif à l'extérieur des racines." }, { label: "P(x) < 0 sur", accept: [M("]−1/3;2[")], show: "]−1/3 ; 2[", explain: "Négatif entre les racines." }, { label: "P(x) = 0 pour x ∈", accept: [M("{−1/3;2}")], show: "{−1/3 ; 2}", w: 0.5 }],
    explanation: "Règle : signe de a à l'extérieur des racines, signe opposé entre elles.", correction: "+ sur ]−∞ ; −1/3[, 0 en −1/3, − sur ]−1/3 ; 2[, 0 en 2, + sur ]2 ; +∞[." });
  Q({ id: "D1-2-3", lesson: "m1.5", difficulty: 3, type: "text", points: 3, statement: "En déduire les solutions de (3x² − 5x − 2)/(2 − x) ≤ 0.", hint: INT, accept: [M("[−1/3;2[∪]2;+∞[")], correctAnswer: "[−1/3 ; 2[ ∪ ]2 ; +∞[", errCat: "domaine",
    explanation: "Pour x ≠ 2, le quotient vaut −(3x + 1) ; il est ≤ 0 pour x ≥ −1/3 ; la valeur interdite 2 est exclue.", correction: "S = [−1/3 ; 2[ ∪ ]2 ; +∞[" });
  Q({ id: "D1-3-1", lesson: "m5.1", type: "fields", points: 2, statement: "On donne A(−2 ; 1), B(1 ; 4) et C(4 ; −1). Calculer les composantes de AB⃗ et AC⃗.", hint: PT,
    fields: [{ label: "AB⃗", accept: [M("(3;3)")], show: "(3 ; 3)", explain: "(1 − (−2) ; 4 − 1)." }, { label: "AC⃗", accept: [M("(6;−2)")], show: "(6 ; −2)", explain: "(4 − (−2) ; −1 − 1)." }],
    explanation: "AB⃗ = (x_B − x_A ; y_B − y_A).", correction: "AB⃗ (3 ; 3) ; AC⃗ (6 ; −2)" });
  Q({ id: "D1-3-2", lesson: "m5.2", difficulty: 2, type: "fields", points: 2, statement: "Calculer det(AB⃗, AC⃗). Que conclut-on pour A, B, C ?",
    fields: [{ label: "det(AB⃗, AC⃗)", accept: [M("−24")], explain: "3×(−2) − 3×6 = −24." }, { label: "A, B, C sont-ils alignés ? (oui / non)", accept: [/^non$/], show: "non", explain: "det ≠ 0 : les vecteurs ne sont pas colinéaires." }],
    explanation: "det ≠ 0 ⇒ non colinéaires ⇒ A, B, C forment un vrai triangle.", correction: "det = −24 ≠ 0 : non alignés." });
  Q({ id: "D1-3-3", lesson: "m5.3", difficulty: 2, type: "text", points: 2, statement: "Déterminer l'équation cartésienne de la droite (AB).", hint: "Forme ax + by + c = 0 (un multiple est accepté).", accept: [M("x−y+3=0")], correctAnswer: "x − y + 3 = 0",
    explanation: "det(AM⃗, AB⃗) = 3(x + 2) − 3(y − 1) = 3x − 3y + 9 = 0. Contrôle : A et B vérifient x − y + 3 = 0.", correction: "x − y + 3 = 0" });
  Q({ id: "D1-3-4", lesson: "m5.4", difficulty: 2, type: "text", points: 2, statement: "(D) : 2x + y − 3 = 0. Montrer que (D) et (AB) sont sécantes et trouver leur point d'intersection K.", hint: PT, accept: [M("(0;3)")], correctAnswer: "K(0 ; 3)",
    explanation: "ab' − a'b = 1×1 − 2×(−1) = 3 ≠ 0 : sécantes. En additionnant : 3x = 0, donc x = 0 et y = 3.", correction: "K(0 ; 3)" });

  /* =============================== D2 — Synthèse N°1 =============================== */
  Q({ id: "D2-1-1", lesson: "m1.1", difficulty: 2, type: "text", points: 1.5, statement: "Soit f(x) = 2x² − 8x + 6. Donner la forme canonique de f(x).", hint: "Attendu : a(x − α)² + β.", accept: [M("2(x−2)²−2", { must: /\(x-2\)/ })], correctAnswer: "2(x − 2)² − 2",
    explanation: "f(x) = 2(x² − 4x) + 6 = 2[(x − 2)² − 4] + 6 = 2(x − 2)² − 2.", correction: "2(x − 2)² − 2" });
  Q({ id: "D2-1-2", lesson: "m2.4", type: "fields", points: 1, statement: "Préciser la nature de la courbe (P) de f, son sommet S et son axe de symétrie.",
    fields: [{ label: "Nature de la courbe", accept: [/parabole/], show: "parabole" }, { label: "Sommet S", accept: [M("(2;−2)")], show: "(2 ; −2)" }, { label: "Axe de symétrie", accept: [M("x=2")], show: "x = 2" }],
    explanation: "a = 2 > 0 : parabole tournée vers le haut ; sommet S(2 ; −2) ; axe x = 2.", correction: "Parabole ; S(2 ; −2) ; x = 2" });
  Q({ id: "D2-1-3", lesson: "m1.2", difficulty: 2, type: "text", points: 1.25, statement: "Déterminer les abscisses des points d'intersection de (P) avec l'axe des abscisses.", hint: SET, accept: [M("{1;3}")], correctAnswer: "{1 ; 3}",
    explanation: "f(x) = 0 ⇔ (x − 2)² = 1 ⇔ x = 1 ou x = 3 : points E(1 ; 0) et F(3 ; 0).", correction: "x = 1 et x = 3" });
  Q({ id: "D2-1-4", lesson: "m2.4", difficulty: 2, type: "fields", points: 1.25, statement: "Dresser le tableau de variation de f sur ℝ (réponds « croissante » ou « décroissante »).",
    fields: [{ label: "Sur ]−∞ ; 2]", accept: [/^(est )?(strictement )?decroissante$/], show: "décroissante" }, { label: "Sur [2 ; +∞[", accept: [/^(est )?(strictement )?croissante$/], show: "croissante" }, { label: "Minimum de f", accept: [M("−2")], show: "−2", explain: "Atteint en x = 2." }],
    explanation: "a > 0 : décroissante puis croissante, minimum f(2) = −2.", correction: "Décroissante sur ]−∞ ; 2], croissante sur [2 ; +∞[, minimum −2." });
  Q({ id: "D2-2-1", lesson: "m0.3", difficulty: 2, type: "text", points: 3, statement: "Résoudre dans ℝ² le système { 3x + 2y = 12 ; 2x − 5y = −11 }.", hint: "Écris S = {(x ; y)}.", accept: [M("{(2;3)}")], correctAnswer: "S = {(2 ; 3)}",
    explanation: "L₁×5 + L₂×2 : 19x = 38, donc x = 2, puis 3×2 + 2y = 12, y = 3. Contrôle : 2×2 − 5×3 = −11.", correction: "S = {(2 ; 3)}" });
  Q({ id: "D2-2-2", lesson: "m0.3", difficulty: 3, type: "fields", points: 2,
    statement: "Un centre informatique achète 3 écrans et 2 claviers pour 1 200 DT. Une autre commande de 2 écrans et 5 claviers coûte **1 900 DT**.\n⚠️ L'énoncé du guide d'origine indique 1 100 DT, ce qui est incohérent avec son corrigé ; le document propose de corriger en 1 900 DT (voir « Notes de contenu »). Trouver le prix d'un écran et d'un clavier.",
    fields: [{ label: "Prix d'un écran (DT)", accept: [M("200")], explain: "x = (1200×5 − 1900×2)/11 = 200." }, { label: "Prix d'un clavier (DT)", accept: [M("300")], explain: "y = (3×1900 − 2×1200)/11 = 300." }],
    explanation: "Système { 3x + 2y = 1200 ; 2x + 5y = 1900 }, D = 11.", correction: "Écran 200 DT ; clavier 300 DT." });
  Q({ id: "D2-3-1", lesson: "m4.2", type: "qcm", points: 1, statement: "Pour démontrer que (cos x + sin x)² + (cos x − sin x)² = 2, quelle égalité utilise-t-on après développement ?", choices: ["cos x + sin x = 1", "cos²x + sin²x = 1", "cos²x − sin²x = 1"], correctAnswer: 1,
    explanation: "Les doubles produits s'annulent : il reste 2cos²x + 2sin²x = 2(cos²x + sin²x).", correction: "cos²x + sin²x = 1" });
  Q({ id: "D2-3-2", lesson: "m4.2", type: "text", points: 1, statement: "Après développement, (cos x + sin x)² + (cos x − sin x)² = 2(cos²x + sin²x). Quelle est la valeur de cette expression ?", accept: [M("2")], correctAnswer: "2",
    explanation: "2 × 1 = 2, pour tout réel x.", correction: "2" });
  Q({ id: "D2-3-3", lesson: "m4.5", difficulty: 3, type: "text", points: 3, statement: "Résoudre dans [0 ; π] : 4sin²x − 3 = 0.", hint: SET, accept: [M("{π/3;2π/3}")], correctAnswer: "{π/3 ; 2π/3}",
    explanation: "sin²x = 3/4 ; sur [0 ; π], sin x ≥ 0 donc sin x = √3/2 = sin(π/3) : x = π/3 ou π − π/3 = 2π/3.", correction: "S = {π/3 ; 2π/3}" });
  Q({ id: "D2-4-1", lesson: "m5.3", type: "fields", points: 1.5, statement: "A(−1 ; 2), B(3 ; −2) et la droite (D) : { x = 1 + 2k ; y = −1 − 2k } (k ∈ ℝ). Donner un point C et un vecteur directeur v⃗ de (D).", hint: PT,
    fields: [{ label: "Un point C de (D)", accept: [M("(1;−1)", { on: "x+y=0" })], show: "(1 ; −1)", explain: "Pour k = 0 : C(1 ; −1)." }, { label: "Un vecteur directeur v⃗", accept: [M("(2;−2)", { parallel: true })], show: "(2 ; −2)", explain: "Les coefficients de k : (2 ; −2)." }],
    explanation: "Dans une représentation paramétrique, les coefficients de k forment un vecteur directeur.", correction: "C(1 ; −1) ; v⃗(2 ; −2)" });
  Q({ id: "D2-4-2", lesson: "m5.3", difficulty: 2, type: "text", points: 1.5, statement: "Déterminer l'équation cartésienne de (AB).", hint: "Forme ax + by + c = 0 (un multiple est accepté).", accept: [M("x+y−1=0")], correctAnswer: "x + y − 1 = 0",
    explanation: "AB⃗ (4 ; −4) ; det(AM⃗, AB⃗) = −4x − 4y + 4 = 0 ⇒ x + y − 1 = 0.", correction: "x + y − 1 = 0" });
  Q({ id: "D2-4-3", lesson: "m5.4", difficulty: 3, type: "fields", points: 2, statement: "Montrer que (AB) et (D) sont strictement parallèles.",
    fields: [{ label: "det(AB⃗, v⃗)", accept: [M("0")], explain: "4×(−2) − (−4)×2 = 0 : parallèles." }, { label: "Position des deux droites (une fois C ∉ (AB) vérifié)", accept: [/strictement.*parall/], show: "strictement parallèles", explain: "C(1 ; −1) ∈ (D) mais 1 − 1 − 1 = −1 ≠ 0 : C ∉ (AB)." }],
    explanation: "Parallèles (det = 0) et non confondues (un point de (D) n'est pas sur (AB)).", correction: "Strictement parallèles." });

  /* =============================== D3 — Contrôle N°2 =============================== */
  Q({ id: "D3-1-1", lesson: "m1.3", type: "qcm", points: 1, statement: "Les solutions de x² − 4x + 3 = 0 sont :", choices: ["{−1 ; −3}", "{2}", "{1 ; 3}"], correctAnswer: 2,
    explanation: "a + b + c = 1 − 4 + 3 = 0 : racines 1 et c/a = 3.", correction: "{1 ; 3}" });
  Q({ id: "D3-1-2", lesson: "m4.3", type: "qcm", points: 1, statement: "cos(π/3) + sin(π/6) vaut :", choices: ["1/2", "1", "√3"], correctAnswer: 1,
    explanation: "1/2 + 1/2 = 1.", correction: "1" });
  Q({ id: "D3-1-3", lesson: "m3.4", type: "qcm", points: 1, statement: "(uₙ) est arithmétique avec u₁ = 2 et r = 5. Alors u₄ vaut :", choices: ["12", "22", "17"], correctAnswer: 2,
    explanation: "u₄ = 2 + 3 × 5 = 17.", correction: "17" });
  Q({ id: "D3-1-4", lesson: "m2.3", type: "qcm", points: 1, statement: "f(x) = x² − 1 est :", choices: ["impaire", "paire", "ni paire ni impaire"], correctAnswer: 1,
    explanation: "f(−x) = (−x)² − 1 = x² − 1 = f(x).", correction: "paire" });
  Q({ id: "D3-2-1", lesson: "m1.2", type: "text", points: 1.5, statement: "Résoudre x² − x − 6 = 0.", hint: SET, accept: [M("{−2;3}")], correctAnswer: "{−2 ; 3}",
    explanation: "Δ = 1 + 24 = 25 ; x = (1 ± 5)/2 : 3 ou −2.", correction: "S = {−2 ; 3}" });
  Q({ id: "D3-2-2", lesson: "m1.4", type: "fields", points: 1.5, statement: "Étudier le signe de x² − x − 6.", hint: INT,
    fields: [{ label: "x² − x − 6 > 0 sur", accept: [M("]−∞;−2[∪]3;+∞[")], show: "]−∞ ; −2[ ∪ ]3 ; +∞[" }, { label: "x² − x − 6 < 0 sur", accept: [M("]−2;3[")], show: "]−2 ; 3[" }],
    explanation: "a = 1 > 0 : positif à l'extérieur des racines −2 et 3, négatif entre elles.", correction: "+ à l'extérieur, − sur ]−2 ; 3[." });
  Q({ id: "D3-2-3", lesson: "m2.2", difficulty: 2, type: "text", points: 2, statement: "Déterminer le domaine de f(x) = √(x² − x − 6)/(x − 4).", hint: INT, accept: [M("]−∞;−2]∪[3;4[∪]4;+∞[")], correctAnswer: "]−∞ ; −2] ∪ [3 ; 4[ ∪ ]4 ; +∞[", errCat: "domaine",
    explanation: "x² − x − 6 ≥ 0 donne ]−∞ ; −2] ∪ [3 ; +∞[ ; on retire la valeur interdite 4.", correction: "D_f = ]−∞ ; −2] ∪ [3 ; 4[ ∪ ]4 ; +∞[" });
  Q({ id: "D3-2-4", lesson: "m2.3", type: "text", points: 1, statement: "Étudier la parité de g(x) = x²/(x² + 1) (paire, impaire ou ni l'une ni l'autre).", accept: [/^(est )?paire$/], correctAnswer: "paire",
    explanation: "D_g = ℝ est symétrique et g(−x) = x²/(x² + 1) = g(x).", correction: "g est paire." });
  Q({ id: "D3-3-1", lesson: "m3.4", type: "text", points: 1, statement: "(uₙ) est géométrique de premier terme u₁ = 3 et de raison q = 2. Calculer u₅.", accept: [M("48")], correctAnswer: "48",
    explanation: "u₅ = 3 × 2⁴ = 48.", correction: "48" });
  Q({ id: "D3-3-2", lesson: "m3.4", type: "text", points: 1.5, statement: "Calculer S₅ = u₁ + … + u₅.", accept: [M("93")], correctAnswer: "93",
    explanation: "S₅ = 3 × (2⁵ − 1)/(2 − 1) = 93. Contrôle : 3 + 6 + 12 + 24 + 48.", correction: "93" });
  Q({ id: "D3-3-3", lesson: "m3.4", difficulty: 2, type: "text", points: 2, statement: "Trouver le plus petit entier n tel que uₙ > 1 000.", accept: [M("10")], correctAnswer: "10",
    explanation: "uₙ = 3 × 2ⁿ⁻¹ > 1000 ⇔ 2ⁿ⁻¹ > 333,3 ; 2⁸ = 256 < 333,3 < 512 = 2⁹ donc n − 1 ≥ 9.", correction: "n = 10" });
  Q({ id: "D3-3-4", lesson: "m3.4", type: "text", points: 0.5, statement: "La suite vₙ = 2n + 1 est-elle arithmétique ? (oui / non)", accept: [/^oui/], correctAnswer: "oui (raison 2)",
    explanation: "vₙ₊₁ − vₙ = 2 est constant.", correction: "Oui, de raison 2." });
  Q({ id: "D3-4-1", lesson: "m4.2", type: "text", points: 1.5, statement: "x ∈ [π/2 ; π] et cos x = −12/13. Calculer sin x.", accept: [M("5/13")], correctAnswer: "5/13", errCat: "signe",
    explanation: "sin²x = 1 − 144/169 = 25/169 ; sin x ≥ 0 sur [π/2 ; π].", correction: "sin x = 5/13" });
  Q({ id: "D3-4-2", lesson: "m4.2", type: "text", points: 1, statement: "Calculer tan x (mêmes données).", accept: [M("−5/12")], correctAnswer: "−5/12",
    explanation: "tan x = sin x / cos x = (5/13)/(−12/13).", correction: "−5/12" });
  Q({ id: "D3-4-3", lesson: "m4.4", type: "text", points: 1, statement: "Calculer cos(π − x) (mêmes données).", accept: [M("12/13")], correctAnswer: "12/13",
    explanation: "cos(π − x) = −cos x = 12/13.", correction: "12/13" });
  Q({ id: "D3-4-4", lesson: "m4.5", type: "text", points: 1.5, statement: "Résoudre dans [0 ; 2π[ : 2cos x − 1 = 0.", hint: SET, accept: [M("{π/3;5π/3}")], correctAnswer: "{π/3 ; 5π/3}",
    explanation: "cos x = 1/2 = cos(π/3) ⇒ x = ±π/3 + 2kπ ; dans [0 ; 2π[ : π/3 et 5π/3.", correction: "S = {π/3 ; 5π/3}" });

  /* =============================== D4 — Synthèse N°2 =============================== */
  Q({ id: "D4-1-1", lesson: "m1.2", difficulty: 2, type: "text", points: 0.75, statement: "(E_m) : x² − 2(m − 1)x + m² − 3 = 0. Calculer le discriminant réduit Δ' en fonction de m.", accept: [M("4−2m")], correctAnswer: "4 − 2m",
    explanation: "b' = −(m − 1) : Δ' = (m − 1)² − (m² − 3) = 4 − 2m.", correction: "Δ' = 4 − 2m" });
  Q({ id: "D4-1-2", lesson: "m1.2", difficulty: 2, type: "fields", points: 0.75, statement: "Nombre de solutions de (E_m) selon m :",
    fields: [{ label: "si m < 2", accept: [M("2"), /^deux/], show: "2" }, { label: "si m = 2", accept: [M("1"), /^(une|1)/], show: "1" }, { label: "si m > 2", accept: [M("0"), /^(aucune|0)/], show: "0" }],
    explanation: "Δ' > 0 si m < 2, Δ' = 0 si m = 2, Δ' < 0 si m > 2.", correction: "2 ; 1 ; 0" });
  Q({ id: "D4-1-3", lesson: "m1.2", type: "text", points: 1.5, statement: "Résoudre (E₀) : x² + 2x − 3 = 0.", hint: SET, accept: [M("{−3;1}")], correctAnswer: "{−3 ; 1}",
    explanation: "Δ' = 4 ; x = −1 ± 2 : 1 ou −3.", correction: "S = {−3 ; 1}" });
  Q({ id: "D4-1-4", lesson: "m1.3", difficulty: 2, type: "fields", points: 1, statement: "Pour m = 2, l'équation devient x² − 2x + 1 = 0.",
    fields: [{ label: "Racine double x₀", accept: [M("1")] }, { label: "Factorisation de x² − 2x + 1", accept: [M("(x−1)²", { must: /\(x-1\)/ })], show: "(x − 1)²" }],
    explanation: "Δ' = 0 : x² − 2x + 1 = (x − 1)².", correction: "x₀ = 1 ; (x − 1)²" });
  Q({ id: "D4-2-1", lesson: "m2.2", type: "text", points: 0.5, statement: "Soit g(x) = (3x − 1)/(x + 2). Domaine de g.", accept: [M("ℝ\\{−2}")], correctAnswer: "ℝ \\ {−2}", errCat: "domaine",
    explanation: "x + 2 ≠ 0.", correction: "D_g = ℝ \\ {−2}" });
  Q({ id: "D4-2-2", lesson: "m2.5", difficulty: 2, type: "fields", points: 1, statement: "Écrire g(x) = α + k/(x + 2).",
    fields: [{ label: "α", accept: [M("3")] }, { label: "k", accept: [M("−7")], explain: "3x − 1 = 3(x + 2) − 7." }],
    explanation: "3x − 1 = 3(x + 2) − 7 ⇒ g(x) = 3 − 7/(x + 2).", correction: "g(x) = 3 − 7/(x + 2)" });
  Q({ id: "D4-2-3", lesson: "m2.3", difficulty: 3, type: "fields", points: 1.5, statement: "Montrer que I(−2 ; 3) est centre de symétrie : exprimer en fonction de h (h ≠ 0).",
    fields: [{ label: "g(−2 + h)", accept: [M("3−7/h")], w: 1 }, { label: "g(−2 − h)", accept: [M("3+7/h")], w: 1 }],
    explanation: "La somme vaut 6 = 2 × 3 : I(−2 ; 3) est centre de symétrie.", correction: "3 − 7/h et 3 + 7/h" });
  Q({ id: "D4-2-4", lesson: "m2.5", difficulty: 2, type: "text", points: 1, statement: "Variations de g sur chaque intervalle de son domaine (croissante ou décroissante) ?", accept: [/^(est )?(strictement )?croissante$/], correctAnswer: "croissante",
    explanation: "k = −7 < 0 : g est croissante sur ]−∞ ; −2[ et sur ]−2 ; +∞[.", correction: "Croissante." });
  Q({ id: "D4-3-1", lesson: "m4.5", difficulty: 2, type: "text", points: 1.5, statement: "2cos²x + cos x − 1 = 0 : en posant X = cos x ∈ [−1 ; 1], résoudre 2X² + X − 1 = 0.", hint: SET, accept: [M("{−1;1/2}")], correctAnswer: "{−1 ; 1/2}",
    explanation: "a − b + c = 0 : X = −1 ou X = −c/a = 1/2, tous deux dans [−1 ; 1].", correction: "X = −1 ou X = 1/2" });
  Q({ id: "D4-3-2", lesson: "m4.5", difficulty: 3, type: "text", points: 2.5, statement: "En déduire les solutions x dans ]−π ; π].", hint: SET, accept: [M("{−π/3;π/3;π}")], correctAnswer: "{−π/3 ; π/3 ; π}",
    explanation: "cos x = −1 ⇒ x = π ; cos x = 1/2 ⇒ x = ±π/3.", correction: "S = {−π/3 ; π/3 ; π}" });
  Q({ id: "D4-4-1", lesson: "m5.2", type: "fields", points: 1.5, statement: "A(1 ; 1), B(5 ; 3), C(2 ; 5).", hint: PT,
    fields: [{ label: "AB⃗", accept: [M("(4;2)")], show: "(4 ; 2)" }, { label: "AC⃗", accept: [M("(1;4)")], show: "(1 ; 4)" }, { label: "det(AB⃗, AC⃗)", accept: [M("14")] }, { label: "A, B, C alignés ? (oui / non)", accept: [/^non$/], show: "non" }],
    explanation: "det = 4×4 − 1×2 = 14 ≠ 0 : triangle.", correction: "AB⃗ (4 ; 2) ; AC⃗ (1 ; 4) ; det = 14 ; non alignés." });
  Q({ id: "D4-4-2", lesson: "m5.1", difficulty: 2, type: "text", points: 1, statement: "Déterminer D tel que ABCD soit un parallélogramme.", hint: PT, accept: [M("(−2;3)")], correctAnswer: "D(−2 ; 3)",
    explanation: "AB⃗ = DC⃗ : (4 ; 2) = (2 − x ; 5 − y) ⇒ x = −2, y = 3.", correction: "D(−2 ; 3)" });
  Q({ id: "D4-4-3", lesson: "m5.3", difficulty: 2, type: "text", points: 1.5, statement: "Équation cartésienne de (BC).", hint: "Forme ax + by + c = 0 (un multiple est accepté).", accept: [M("2x+3y−19=0")], correctAnswer: "2x + 3y − 19 = 0",
    explanation: "BC⃗ (−3 ; 2) ; det(BM⃗, BC⃗) = 2x + 3y − 19 = 0. Contrôle : B et C la vérifient.", correction: "2x + 3y − 19 = 0" });
  Q({ id: "D4-5-1", lesson: "m3.2", type: "fields", points: 2, statement: "PGCD et PPCM de 150 et 90.",
    fields: [{ label: "PGCD", accept: [M("30")], explain: "150 = 2×3×5², 90 = 2×3²×5." }, { label: "PPCM", accept: [M("450")], explain: "2×3²×5² = 450." }],
    explanation: "Contrôle : 30 × 450 = 13 500 = 150 × 90.", correction: "PGCD 30 ; PPCM 450" });
  Q({ id: "D4-5-2", lesson: "m3.4", difficulty: 2, type: "fields", points: 2, statement: "(uₙ) est arithmétique avec u₂ = 7 et u₆ = 19.",
    fields: [{ label: "Raison r", accept: [M("3")], explain: "u₆ = u₂ + 4r ⇒ 19 = 7 + 4r." }, { label: "u₁", accept: [M("4")] }, { label: "u₁₀", accept: [M("31")] }, { label: "S₁₀", accept: [M("175")], explain: "S₁₀ = 10 × (4 + 31)/2." }],
    explanation: "uₙ = u₁ + (n − 1)r et Sₙ = n(u₁ + uₙ)/2.", correction: "r = 3 ; u₁ = 4 ; u₁₀ = 31 ; S₁₀ = 175." });
})(window.DATA);
