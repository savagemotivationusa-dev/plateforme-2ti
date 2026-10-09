/* ==========================================================================
   Questions des devoirs D1 à D5 (barème : la somme des points de chaque
   devoir vaut 20). Le champ `code` affiche un extrait avant la question.
   ========================================================================== */
(function (D) {
  const Q = (o) => {
    o.chapter = o.chapter || "c" + o.lesson.slice(1).split(".")[0];
    o.relatedLesson = o.relatedLesson || o.lesson;
    o.difficulty = o.difficulty || 1;
    if (o.bank === undefined) o.bank = true;
    D.questions.push(o);
  };

  /* =============================== D1 =============================== */
  Q({ id: "D1-1-1", lesson: "l1.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Quel identificateur est **valide** ?`,
    choices: ["2note", "note_1", "mon-nom", "prénom"], correctAnswer: 1,
    explanation: `‹2note› commence par un chiffre, ‹mon-nom› contient un tiret et ‹prénom› un accent. ‹note_1› respecte toutes les règles.`,
    correction: `note_1` });
  Q({ id: "D1-1-2", lesson: "l1.3", difficulty: 1, type: "vf", points: 1,
    statement: `L'instruction ‹x ← x + 1› est invalide.`, correctAnswer: false,
    explanation: `Elle est valide : on calcule x + 1 avec la valeur actuelle de x, puis on range le résultat dans x.`,
    correction: `Faux : c'est un compteur classique.` });
  Q({ id: "D1-1-3", lesson: "l1.2", difficulty: 1, type: "text", points: 1,
    statement: `Quel mot-clé algorithmique permet de saisir une valeur au clavier ?`,
    accept: ["lire", /^lire\s*\(.*\)$/], correctAnswer: "Lire",
    feedback: [{ re: /ecrire|afficher/, msg: "Ecrire sert à afficher. Pour saisir, on utilise Lire.", cat: "concept" }],
    explanation: `‹Lire(variable)› suspend le programme et range la valeur saisie dans la variable.`, correction: `Lire` });
  Q({ id: "D1-1-4", lesson: "l1.3", difficulty: 1, type: "text", points: 1, bank: true,
    statement: `Quelle est la valeur finale de x ?`,
    code: { lang: "algo", text: `x ← 5\nx ← x + 3\nx ← x * 2` }, accept: ["16"],
    feedback: [{ re: /^(8|10)$/, msg: "Il faut exécuter les trois instructions dans l'ordre : 5 → 8 → 16.", cat: "logique" }],
    explanation: `x = 5 ; puis x = 5 + 3 = 8 ; puis x = 8 × 2 = 16.`, correction: `16` });
  Q({ id: "D1-1-5", lesson: "l0.1", difficulty: 2, type: "fields", points: 3,
    statement: `Problème : « calculer le périmètre p d'un carré de côté c ». Donne le résultat, les données et le traitement.`,
    fields: [
      { label: "Résultat", accept: [/\b(p|perimetre)\b/], show: "p (le périmètre)", explain: "le résultat est le périmètre p." },
      { label: "Données", accept: [/\b(c|cote)\b/], show: "c (le côté)", explain: "la donnée à lire est le côté c." },
      { label: "Traitement", accept: [/(p|perimetre)?\s*(←|<-|=)\s*(4\s*(\*|x|×)\s*c|c\s*(\*|x|×)\s*4|c\s*\+\s*c\s*\+\s*c\s*\+\s*c)/], show: "p ← 4 * c", explain: "le périmètre d'un carré vaut 4 fois son côté.", cat: "logique" }
    ],
    explanation: `Résultat → Données → Traitement : p, c, puis la formule p = 4 × c.`, correction: `Résultat : p ; Données : c ; Traitement : p ← 4 * c.` });

  Q({ id: "D1-2-1", lesson: "l1.4", difficulty: 2, type: "fields", points: 3,
    statement: `Exécute à la main l'algorithme suivant et donne les valeurs finales.`,
    code: { lang: "algo", text: `a ← 4\nb ← 7\nz ← a\na ← b\nb ← z` },
    fields: [
      { label: "a", accept: ["7"], explain: "a ← b donne 7." },
      { label: "b", accept: ["4"], explain: "b ← z récupère l'ancienne valeur de a (4)." },
      { label: "z", accept: ["4"], explain: "z a sauvegardé la valeur de a (4)." }
    ],
    explanation: `Trace : (a, b, z) = (4, 7, ?) → (4, 7, 4) → (7, 7, 4) → (7, 4, 4).`, correction: `a = 7 ; b = 4 ; z = 4.` });
  Q({ id: "D1-2-2", lesson: "l1.4", difficulty: 1, type: "qcm", points: 1,
    statement: `Dans l'algorithme précédent, quel est le rôle de la variable ‹z› ?`,
    choices: ["Stocker temporairement l'ancienne valeur de a", "Afficher le résultat", "Lire une donnée", "Déclarer une constante"], correctAnswer: 0,
    explanation: `Sans z, la valeur de a serait écrasée dès l'instruction ‹a ← b›.`, correction: `Sauvegarder temporairement a.` });
  Q({ id: "D1-2-3", lesson: "l1.4", difficulty: 2, type: "code", mode: "algo", points: 3,
    statement: `Écris l'algorithme **complet** (nom, T.D.O, Début, Fin) qui lit deux réels ‹a› et ‹b›, permute leurs valeurs puis les affiche.`,
    checks: [
      { label: "T.D.O (a, b, z : Réel)", all: [/t\.?d\.?o/, /a\s*,\s*b\s*,\s*z|\bz\b[^\n]*reel|reel[^\n]*\bz\b/, /reel/], w: 1, msg: "Le T.D.O doit déclarer a, b et z de type Réel (z est la variable auxiliaire).", cat: "type" },
      { label: "Lecture de a et b", all: [/lire\s*\(\s*a\s*\)/, /lire\s*\(\s*b\s*\)/], w: 0.5, msg: "Il faut lire a puis b.", cat: "syntaxe" },
      { label: "Permutation z ← a ; a ← b ; b ← z (dans cet ordre)", re: /z\s*←\s*a[^]*a\s*←\s*b[^]*b\s*←\s*z/, w: 1.25, msg: "La permutation s'écrit z ← a ; a ← b ; b ← z, dans cet ordre.", cat: "logique" },
      { label: "Affichage de a et b", re: /ecrire\s*\([^)]*\ba\b[^)]*\bb\b[^)]*\)|ecrire\s*\(\s*a\s*\)[^]*ecrire\s*\(\s*b\s*\)/, w: 0.25, msg: "Il faut afficher a et b avec Ecrire.", cat: "syntaxe" }
    ],
    solution: `Algorithme Permutation\nT.D.O : a, b, z : Réel\nDébut\n  Ecrire("a = "), Lire(a)\n  Ecrire("b = "), Lire(b)\n  z ← a\n  a ← b\n  b ← z\n  Ecrire("a = ", a, " b = ", b)\nFin`,
    explanation: `Structure : Algorithme / T.D.O / Début / lecture / permutation / affichage / Fin.`, correction: `z ← a ; a ← b ; b ← z` });

  Q({ id: "D1-3-1", lesson: "l0.2", difficulty: 2, type: "code", mode: "algo", allowEq: true, points: 3,
    statement: `Écris l'algorithme **complet** qui lit le prix hors taxe ‹prix_ht› (réel), calcule le prix TTC ‹prix_ttc› avec une TVA de 19 % (constante) et l'affiche.`,
    checks: [
      { label: "T.D.O avec TVA, prix_ht et prix_ttc (Réel)", all: [/t\.?d\.?o/, /reel/, /prix_ttc/], w: 0.75, msg: "Le T.D.O doit déclarer la constante TVA et les réels prix_ht et prix_ttc.", cat: "type" },
      { label: "Lire(prix_ht)", re: /lire\s*\(\s*prix_ht\s*\)/, w: 0.75, msg: "Il faut lire prix_ht.", cat: "syntaxe" },
      { label: "Calcul du TTC", re: /prix_ttc\s*←[^\n]*prix_ht[^\n]*(19|tva|1\.19)/, not: /prix_ttc\s*←\s*prix_ht\s*\*\s*(0\.19|19|tva)\s*(\/\s*100)?\s*$/m, w: 1, msg: "Le TTC = prix_ht + prix_ht * TVA / 100 (ou prix_ht * 1.19). Attention : prix_ht * TVA / 100 donne seulement le montant de la taxe.", cat: "logique" },
      { label: "Affichage du TTC", re: /ecrire\s*\([^)]*prix_ttc/, w: 0.5, msg: "Il faut afficher prix_ttc avec Ecrire.", cat: "syntaxe" }
    ],
    solution: `Algorithme PrixTTC\nT.D.O : TVA = 19 (Constante) ; prix_ht, prix_ttc : Réel\nDébut\n  Ecrire("Prix HT : "), Lire(prix_ht)\n  prix_ttc ← prix_ht + prix_ht * TVA / 100\n  Ecrire("Prix TTC : ", prix_ttc)\nFin`,
    explanation: `Analyse : donnée prix_ht, constante TVA, résultat prix_ttc = prix_ht + prix_ht × TVA / 100.`, correction: `prix_ttc ← prix_ht + prix_ht * TVA / 100` });
  Q({ id: "D1-3-2", lesson: "l0.1", difficulty: 2, type: "code", mode: "python", points: 3,
    statement: `Traduis l'algorithme précédent en Python (la TVA vaut 19 %).`,
    checks: [
      { label: "Lecture de prix_ht avec float(input(...))", re: /prix_ht\s*=\s*float\s*\(\s*input/, w: 1, msg: "Un prix est un réel : prix_ht = float(input(...)).", cat: "type" },
      { label: "Calcul du TTC", re: /prix_ttc\s*=[^\n]*prix_ht[^\n]*(19|tva|1\.19)/, not: /prix_ttc\s*=\s*prix_ht\s*\*\s*(0\.19|19|tva)\s*(\/\s*100)?\s*$/m, w: 1.25, msg: "prix_ttc = prix_ht + prix_ht * 19 / 100 (le montant de la taxe doit être AJOUTÉ au prix HT).", cat: "logique" },
      { label: "Affichage avec print", re: /print\s*\([^)]*prix_ttc/, w: 0.75, msg: "Il faut afficher prix_ttc avec print.", cat: "syntaxe" }
    ],
    solution: `TVA = 19\nprix_ht = float(input("Prix HT : "))\nprix_ttc = prix_ht + prix_ht * TVA / 100\nprint("Prix TTC :", prix_ttc)`,
    explanation: `‹float(input())› convertit la saisie en réel ; le calcul est identique à celui de l'algorithme.`, correction: `prix_ttc = prix_ht + prix_ht * TVA / 100` });

  /* =============================== D2 =============================== */
  Q({ id: "D2-1-1", lesson: "l2.1", difficulty: 1, type: "fields", points: 2, errCat: "type",
    statement: `Donne le type algorithmique de chaque donnée.`,
    fields: [
      { label: "Nombre de pages d'un livre", accept: ["entier", "integer", "int"], show: "Entier", explain: "un nombre de pages est un entier." },
      { label: "Prix d'un article : 12.500 DT", accept: ["reel", "float", "decimal", "nombre reel"], show: "Réel", explain: "le prix a une partie décimale : Réel." },
      { label: "Code postal", accept: ["chaine", "chaine de caracteres", "string", "str"], show: "Chaîne", explain: "on ne calcule pas avec un code postal : Chaîne." },
      { label: "« Le nombre est pair » (oui / non)", accept: ["booleen", "boolean", "bool", "logique"], show: "Booléen", explain: "deux valeurs possibles : Booléen." }
    ],
    explanation: `On choisit le type d'après la nature de la donnée et l'usage qu'on en fait.`, correction: `Entier, Réel, Chaîne, Booléen.` });
  Q({ id: "D2-1-2", lesson: "l2.2", difficulty: 1, type: "fields", points: 2, errCat: "operateur",
    statement: `Calcule :`,
    fields: [
      { label: "23 DIV 5", accept: ["4"], explain: "23 = 5 × 4 + 3 : quotient 4." },
      { label: "23 MOD 5", accept: ["3"], explain: "23 = 5 × 4 + 3 : reste 3." }
    ],
    explanation: `DIV donne le quotient, MOD donne le reste.`, correction: `4 et 3.` });
  Q({ id: "D2-1-3", lesson: "l2.5", difficulty: 2, type: "vf", points: 1,
    statement: `‹ORD('a')› est inférieur à ‹ORD('A')›.`, correctAnswer: false,
    explanation: `ORD('a') = 97 et ORD('A') = 65 : les minuscules ont des codes plus grands (écart de 32).`, correction: `Faux : 97 > 65.` });
  Q({ id: "D2-1-4", lesson: "l2.2", difficulty: 1, type: "text", points: 1, errCat: "operateur",
    statement: `Écris l'expression qui donne le **dernier chiffre** d'un entier n.`,
    accept: [/^n\s*mod\s*10$/, /^n\s*%\s*10$/], correctAnswer: "n MOD 10",
    feedback: [{ re: /div|\/\//, msg: "n DIV 10 supprime le dernier chiffre ; pour l'obtenir on utilise n MOD 10.", cat: "operateur" }],
    explanation: `Le reste de la division par 10 est le chiffre des unités.`, correction: `n MOD 10 (Python : n % 10)` });

  Q({ id: "D2-2-1", lesson: "l3.1", difficulty: 1, type: "text", points: 1,
    statement: `Soit ‹ch ← "Informatique"›. Que vaut ‹Long(ch)› ?`, accept: ["12"],
    explanation: `I-n-f-o-r-m-a-t-i-q-u-e : 12 caractères.`, correction: `12` });
  Q({ id: "D2-2-2", lesson: "l3.2", difficulty: 1, type: "text", points: 1, cs: true,
    statement: `Avec ‹ch = "Informatique"›, que vaut ‹ch[:4]› ?`, accept: ["Info"],
    explanation: `Les 4 premiers caractères (indices 0 à 3).`, correction: `"Info"` });
  Q({ id: "D2-2-3", lesson: "l3.2", difficulty: 2, type: "text", points: 1, cs: true,
    statement: `Avec ‹ch = "Informatique"›, que vaut ‹ch[8:]› ?`, accept: ["ique"],
    explanation: `Indices : I0 n1 f2 o3 r4 m5 a6 t7 i8 q9 u10 e11 ; de l'indice 8 jusqu'à la fin : « ique ».`, correction: `"ique"` });
  Q({ id: "D2-2-4", lesson: "l3.1", difficulty: 2, type: "qcm", points: 1,
    statement: `Quelle écriture désigne le **dernier** caractère de ‹ch› ?`,
    choices: ["ch[Long(ch)]", "ch[Long(ch) - 1]", "ch[12]", "ch[0]"], correctAnswer: 1,
    explanation: `Les indices vont de 0 à Long(ch) − 1.`, correction: `ch[Long(ch) - 1]` });
  Q({ id: "D2-2-5", lesson: "l3.4", difficulty: 2, type: "code", mode: "python", points: 2,
    statement: `Écris l'instruction Python qui remplace le **premier** caractère de ‹ch› par « X ».`,
    checks: [
      { label: "Reconstruction : \"X\" + ch[1:]", re: /ch\s*=\s*["']x["']\s*\+\s*ch\s*\[\s*1\s*:\s*\]/, w: 2, msg: "Il faut reconstruire la chaîne : ch = \"X\" + ch[1:].", cat: "logique" }
    ],
    forbid: [{ re: /ch\s*\[\s*0\s*\]\s*=[^=]/, pen: 0.5, cat: "type", msg: "Les chaînes sont immutables : ch[0] = \"X\" provoque une TypeError." }],
    solution: `ch = "X" + ch[1:]`,
    explanation: `On ne peut pas modifier un caractère : on concatène « X » avec le reste de la chaîne.`, correction: `ch = "X" + ch[1:]` });

  Q({ id: "D2-3-1", lesson: "l2.6", difficulty: 3, type: "code", mode: "algo", points: 4,
    statement: `Écris l'algorithme (corps, sans T.D.O) qui lit une durée ‹t› en secondes puis calcule et affiche ‹h› (heures), ‹mn› (minutes) et ‹s› (secondes restantes).`,
    checks: [
      { label: "Lire(t)", re: /lire\s*\(\s*t\s*\)/, w: 0.5, msg: "Il faut lire t.", cat: "syntaxe" },
      { label: "h ← t DIV 3600", re: /h\s*←\s*t\s+div\s+3600/, w: 1, msg: "Les heures : h ← t DIV 3600.", cat: "operateur" },
      { label: "r ← t MOD 3600", re: /\w+\s*←\s*t\s+mod\s+3600/, w: 1, msg: "Il faut garder les secondes restantes : r ← t MOD 3600.", cat: "operateur" },
      { label: "mn ← r DIV 60", re: /(\w+)\s*←\s*t\s+mod\s+3600[^]*mn\s*←\s*\1\s+div\s+60/, w: 0.75, msg: "Les minutes se calculent sur le reste r : mn ← r DIV 60 (et non sur t).", cat: "variable" },
      { label: "s ← r MOD 60", re: /(\w+)\s*←\s*t\s+mod\s+3600[^]*\bs\s*←\s*\1\s+mod\s+60/, w: 0.5, msg: "Les secondes finales : s ← r MOD 60.", cat: "operateur" },
      { label: "Affichage de h, mn et s", re: /ecrire\s*\([^)]*\bh\b[^)]*\bmn\b[^)]*\bs\b[^)]*\)/, w: 0.25, msg: "Il faut afficher h, mn et s.", cat: "syntaxe" }
    ],
    solution: `Ecrire("t = "), Lire(t)\nh ← t DIV 3600\nr ← t MOD 3600\nmn ← r DIV 60\ns ← r MOD 60\nEcrire(h, " h ", mn, " mn ", s, " s")`,
    explanation: `Décomposition par paquets : heures (DIV 3600), reste (MOD 3600), minutes (DIV 60), secondes (MOD 60).`, correction: `h ← t DIV 3600 ; r ← t MOD 3600 ; mn ← r DIV 60 ; s ← r MOD 60` });
  Q({ id: "D2-3-2", lesson: "l2.6", difficulty: 2, type: "fields", points: 3,
    statement: `Applique l'algorithme à t = 4000 secondes.`,
    fields: [
      { label: "h", accept: ["1"], explain: "4000 DIV 3600 = 1." },
      { label: "mn", accept: ["6"], explain: "r = 400 ; 400 DIV 60 = 6." },
      { label: "s", accept: ["40"], explain: "400 MOD 60 = 40." }
    ],
    explanation: `4000 s = 1 h 6 mn 40 s.`, correction: `1 h 6 mn 40 s.` });
  Q({ id: "D2-3-3", lesson: "l2.5", difficulty: 2, type: "text", points: 1, cs: true,
    statement: `Que vaut ‹CHR(ORD('b') - 32)› ?`, accept: ["B"],
    feedback: [{ re: /^b$/, msg: "Retrancher 32 au code d'une minuscule donne la majuscule : 98 − 32 = 66 → « B » (majuscule).", cat: "resultat" }],
    explanation: `ORD('b') = 98 ; 98 − 32 = 66 ; CHR(66) = 'B'.`, correction: `'B'` });

  /* =============================== D3 =============================== */
  Q({ id: "D3-1-1", lesson: "l4.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Un vecteur ‹T› est déclaré : ‹T : tableau de 6 entiers›. Quels sont les indices valides ?`,
    choices: ["1 à 6", "0 à 6", "0 à 5", "1 à 5"], correctAnswer: 2,
    explanation: `Pour N = 6 cases, les indices vont de 0 à N − 1 = 5.`, correction: `0 à 5.` });
  Q({ id: "D3-1-2", lesson: "l4.2", difficulty: 1, type: "vf", points: 1,
    statement: `Dans ce vecteur de 6 entiers, ‹T[6]› est une case valide.`, correctAnswer: false,
    explanation: `La dernière case est ‹T[5]›. ‹T[6]› provoque une IndexError.`, correction: `Faux.` });
  Q({ id: "D3-1-3", lesson: "l4.1", difficulty: 1, type: "text", points: 1,
    statement: `Écris la déclaration Python d'un vecteur ‹T› de 6 entiers initialisés à 0.`,
    accept: [/^(\w+\s*=\s*)?\[\s*0\s*\]\s*\*\s*6$/, /^(\w+\s*=\s*)?6\s*\*\s*\[\s*0\s*\]$/], correctAnswer: "T = [0] * 6",
    explanation: `‹[0] * 6› crée une liste de 6 cases contenant 0.`, correction: `T = [0] * 6` });
  Q({ id: "D3-1-4", lesson: "l4.2", difficulty: 2, type: "code", mode: "python", points: 2,
    statement: `Écris en Python les instructions qui permutent ‹T[0]› et ‹T[1]› (avec une variable auxiliaire ‹z›).`,
    checks: [
      { label: "z = T[0]", re: /^z\s*=\s*t\[0\]\s*$/m, w: 0.5, msg: "On sauvegarde d'abord T[0] : z = T[0].", cat: "logique" },
      { label: "T[0] = T[1]", re: /^z\s*=\s*t\[0\]\s*$[^]*^t\[0\]\s*=\s*t\[1\]\s*$/m, w: 0.75, msg: "Puis T[0] reçoit T[1].", cat: "logique" },
      { label: "T[1] = z", re: /^t\[0\]\s*=\s*t\[1\]\s*$[^]*^t\[1\]\s*=\s*z\s*$/m, w: 0.75, msg: "Enfin T[1] reçoit la valeur sauvegardée : T[1] = z.", cat: "logique" }
    ],
    solution: `z = T[0]\nT[0] = T[1]\nT[1] = z`,
    explanation: `Même principe que la permutation de deux variables.`, correction: `z = T[0] ; T[0] = T[1] ; T[1] = z` });

  Q({ id: "D3-2-1", lesson: "l5.1", difficulty: 2, type: "fields", points: 2,
    statement: `Exécute l'algorithme pour chaque valeur de x.`,
    code: { lang: "algo", text: `Si x > 10 alors\n  y ← x - 10\nSinon\n  y ← x * 2\nFin Si` },
    fields: [
      { label: "x = 14 → y", accept: ["4"], explain: "14 > 10 est vrai : y = 14 − 10 = 4." },
      { label: "x = 7 → y", accept: ["14"], explain: "7 > 10 est faux : y = 7 × 2 = 14." }
    ],
    explanation: `On évalue la condition puis on exécute une seule des deux branches.`, correction: `y = 4 puis y = 14.` });
  Q({ id: "D3-2-2", lesson: "l5.3", difficulty: 1, type: "qcm", points: 1,
    statement: `Pour tester plusieurs valeurs précises d'une même variable entière, quelle structure est la plus adaptée ?`,
    choices: ["Pour", "Selon", "Répéter … Jusqu'à", "Tant que"], correctAnswer: 1,
    explanation: `‹Selon› compare une même variable à plusieurs valeurs.`, correction: `Selon.` });
  Q({ id: "D3-2-3", lesson: "l5.2", difficulty: 2, type: "code", mode: "python", points: 4,
    statement: `Écris en Python le programme qui lit un entier ‹n› et affiche « positif », « négatif » ou « nul ».`,
    checks: [
      { label: "Lecture avec int(input(...))", re: /n\s*=\s*int\s*\(\s*input/, w: 0.5, msg: "n est un entier : n = int(input(...)).", cat: "type" },
      { label: "if avec comparaison et deux-points", re: /if\s+n\s*(>|<|==)\s*0\s*:/, w: 1, msg: "Le premier test s'écrit if n > 0: (avec deux-points).", cat: "condition" },
      { label: "elif", re: /elif\s+n\s*(>|<|==)\s*0\s*:/, w: 1, msg: "Le deuxième cas utilise elif n < 0:.", cat: "condition" },
      { label: "else", re: /else\s*:/, w: 0.5, msg: "Le cas par défaut (nul) utilise else:.", cat: "syntaxe" },
      { label: "Trois messages positif / négatif / nul", all: [/positif/, /negatif/, /nul/], w: 1, msg: "Les trois messages positif, négatif et nul doivent apparaître.", cat: "resultat" }
    ],
    forbid: [{ re: /(if|elif)\s+n\s*=\s*0/, pen: 0.25, cat: "operateur", msg: "Pour comparer en Python on écrit « == » ; « = » est l'affectation." }],
    solution: `n = int(input("n = "))\nif n > 0:\n    print("positif")\nelif n < 0:\n    print("négatif")\nelse:\n    print("nul")`,
    explanation: `Trois cas : forme généralisée if / elif / else.`, correction: `if n > 0: … elif n < 0: … else: …` });

  Q({ id: "D3-3-1", lesson: "l5.2", difficulty: 3, type: "code", mode: "algo", points: 5,
    statement: `Un cinéma applique le tarif suivant : moins de 12 ans → 5 DT ; de 12 à 59 ans → 10 DT ; 60 ans et plus → 6 DT. Écris l'algorithme **complet** (T.D.O compris) qui lit l'âge ‹age› (entier) et affiche le ‹tarif›.`,
    checks: [
      { label: "T.D.O (age et tarif)", all: [/t\.?d\.?o/, /\bage\b[^\n]*(entier|reel)|(entier|reel)[^\n]*\bage\b/, /tarif/], w: 1, msg: "Le T.D.O doit déclarer age (Entier) et tarif.", cat: "type" },
      { label: "Lire(age)", re: /lire\s*\(\s*age\s*\)/, w: 0.5, msg: "Il faut lire age.", cat: "syntaxe" },
      { label: "Premier cas : age < 12 → 5", re: /si\s+\(?\s*age\s*<\s*12\s*\)?\s*alors[^]*tarif\s*←\s*5\b/, w: 1, msg: "Premier cas : Si age < 12 alors tarif ← 5.", cat: "condition" },
      { label: "Deuxième cas : age < 60 → 10", re: /sinon\s+si\s+\(?\s*age\s*<\s*60\s*\)?\s*alors[^]*tarif\s*←\s*10\b|sinon\s+si\s+\(?\s*age\s*>=\s*12[^\n]*age\s*<\s*60\s*\)?\s*alors[^]*tarif\s*←\s*10\b/, w: 1, msg: "Deuxième cas : Sinon Si age < 60 alors tarif ← 10 (on arrive ici seulement si age ≥ 12).", cat: "condition" },
      { label: "Cas par défaut : 60 ans et plus → 6", re: /sinon\s+tarif\s*←\s*6\b|sinon\s+si\s+age\s*>=\s*60\s*alors[^]*tarif\s*←\s*6\b/, w: 1, msg: "Cas par défaut : Sinon tarif ← 6.", cat: "logique" },
      { label: "Fin Si et affichage du tarif", all: [/fin si/, /ecrire\s*\([^)]*tarif/], w: 0.5, msg: "N'oublie pas Fin Si et l'affichage du tarif.", cat: "syntaxe" }
    ],
    solution: `Algorithme Cinema\nT.D.O : age : Entier ; tarif : Entier\nDébut\n  Ecrire("Age : "), Lire(age)\n  Si age < 12 alors\n    tarif ← 5\n  Sinon Si age < 60 alors\n    tarif ← 10\n  Sinon\n    tarif ← 6\n  Fin Si\n  Ecrire("Tarif : ", tarif, " DT")\nFin`,
    explanation: `Trois cas → forme généralisée. On teste dans l'ordre croissant des âges : le dernier Sinon traite les 60 ans et plus.`, correction: `Si age < 12 … Sinon Si age < 60 … Sinon …` });
  Q({ id: "D3-3-2", lesson: "l5.2", difficulty: 2, type: "code", mode: "python", points: 3,
    statement: `Traduis l'algorithme du cinéma en Python (lecture de ‹age›, calcul de ‹tarif› et affichage).`,
    checks: [
      { label: "Lecture de age avec int(input(...))", re: /age\s*=\s*int\s*\(\s*input/, w: 0.5, msg: "age est un entier : age = int(input(...)).", cat: "type" },
      { label: "if age < 12 → tarif = 5", re: /if\s+age\s*<\s*12\s*:[^]*tarif\s*=\s*5\b/, w: 0.75, msg: "if age < 12: puis tarif = 5.", cat: "condition" },
      { label: "elif age < 60 → tarif = 10", re: /elif\s+age\s*<\s*60\s*:[^]*tarif\s*=\s*10\b/, w: 0.75, msg: "elif age < 60: puis tarif = 10.", cat: "condition" },
      { label: "else → tarif = 6", re: /else\s*:[^]*tarif\s*=\s*6\b/, w: 0.5, msg: "else: puis tarif = 6.", cat: "logique" },
      { label: "Affichage du tarif", re: /print\s*\([^)]*tarif/, w: 0.5, msg: "Il faut afficher tarif avec print.", cat: "syntaxe" }
    ],
    solution: `age = int(input("Age : "))\nif age < 12:\n    tarif = 5\nelif age < 60:\n    tarif = 10\nelse:\n    tarif = 6\nprint("Tarif :", tarif, "DT")`,
    explanation: `Sinon Si ↔ elif ; chaque condition se termine par deux-points et le bloc est indenté.`, correction: `if / elif / else` });

  /* =============================== D4 =============================== */
  Q({ id: "D4-1-1", lesson: "l6.4", difficulty: 1, type: "qcm", points: 1,
    statement: `Pour contrôler qu'une note saisie est comprise entre 0 et 20, quelle boucle choisir ?`,
    choices: ["Pour", "Répéter … Jusqu'à", "Selon", "Aucune"], correctAnswer: 1,
    explanation: `On doit lire au moins une fois, puis redemander tant que la note est invalide.`, correction: `Répéter … Jusqu'à.` });
  Q({ id: "D4-1-2", lesson: "l6.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle boucle est adaptée quand le nombre de répétitions est **connu** à l'avance ?`,
    choices: ["Pour", "Tant que", "Répéter … Jusqu'à", "Selon"], correctAnswer: 0,
    explanation: `La boucle Pour gère elle-même le compteur entre deux bornes connues.`, correction: `Pour.` });
  Q({ id: "D4-1-3", lesson: "l6.3", difficulty: 2, type: "fields", points: 3,
    statement: `Fais la trace de l'algorithme et donne la valeur de S demandée.`,
    code: { lang: "algo", text: `S ← 0\nPour i de 1 à 5 Faire\n  S ← S + i * i\nFin Pour\nEcrire(S)` },
    fields: [
      { label: "S après le tour i = 1", accept: ["1"], explain: "0 + 1 × 1 = 1." },
      { label: "S après le tour i = 3", accept: ["14"], explain: "1 + 4 + 9 = 14." },
      { label: "S affiché à la fin", accept: ["55"], explain: "1 + 4 + 9 + 16 + 25 = 55." }
    ],
    explanation: `S cumule les carrés : 1, 5, 14, 30, 55.`, correction: `1 ; 14 ; 55.` });

  Q({ id: "D4-2-1", lesson: "l6.3", difficulty: 2, type: "code", mode: "python", points: 3,
    statement: `Écris en Python le programme complet qui lit un entier ‹n› puis affiche la somme 1 + 2 + … + n.`,
    checks: [
      { label: "Lecture de n avec int(input(...))", re: /n\s*=\s*int\s*\(\s*input/, w: 0.5, msg: "n est un entier : n = int(input(...)).", cat: "type" },
      { label: "S = 0 avant la boucle", re: /^s\s*=\s*0\s*$[^]*^for\b/m, w: 0.75, msg: "S doit être initialisé à 0 AVANT la boucle.", cat: "logique" },
      { label: "range(1, n + 1)", re: /for\s+\w+\s+in\s+range\s*\(\s*1\s*,\s*n\s*\+\s*1\s*\)\s*:/, w: 0.75, msg: "Pour aller de 1 à n inclus : range(1, n + 1).", cat: "logique" },
      { label: "S = S + i", re: /s\s*=\s*s\s*\+\s*\w+|s\s*\+=\s*\w+/, w: 0.75, msg: "À chaque tour : S = S + i.", cat: "logique" },
      { label: "Affichage de S", re: /print\s*\([^)]*\bs\b/, w: 0.25, msg: "Il faut afficher S.", cat: "syntaxe" }
    ],
    solution: `n = int(input("n = "))\nS = 0\nfor i in range(1, n + 1):\n    S = S + i\nprint("Somme =", S)`,
    explanation: `Accumulateur de somme : initialisation avant la boucle, ajout à chaque tour.`, correction: `S = 0 ; for i in range(1, n + 1): S = S + i` });
  Q({ id: "D4-2-2", lesson: "l6.5", difficulty: 3, type: "code", mode: "algo", points: 4,
    statement: `Écris l'algorithme (corps, sans T.D.O) qui lit un entier ‹n› > 0, calcule son nombre de chiffres ‹c› avec une boucle Tant que, puis affiche ‹c›.`,
    checks: [
      { label: "Lire(n)", re: /lire\s*\(\s*n\s*\)/, w: 0.5, msg: "Il faut lire n.", cat: "syntaxe" },
      { label: "c ← 0 avant la boucle", re: /c\s*←\s*0[^]*tant que/, w: 1, msg: "Le compteur c doit être initialisé à 0 AVANT la boucle.", cat: "logique" },
      { label: "Tant que n > 0 Faire", re: /tant que\s+\(?\s*(n\s*>\s*0|0\s*<\s*n|n\s*!=\s*0)\s*\)?\s*faire/, w: 1, msg: "La boucle continue tant que n > 0.", cat: "condition" },
      { label: "n ← n DIV 10", re: /n\s*←\s*n\s+div\s+10/, w: 0.75, msg: "On retire le dernier chiffre : n ← n DIV 10.", cat: "operateur" },
      { label: "c ← c + 1", re: /c\s*←\s*c\s*\+\s*1/, w: 0.5, msg: "On compte un chiffre par tour : c ← c + 1.", cat: "logique" },
      { label: "Affichage de c", re: /ecrire\s*\([^)]*\bc\b/, w: 0.25, msg: "Il faut afficher c.", cat: "syntaxe" }
    ],
    solution: `Ecrire("n = "), Lire(n)\nc ← 0\nTant que n > 0 Faire\n  n ← n DIV 10\n  c ← c + 1\nFin Tant que\nEcrire("Nombre de chiffres : ", c)`,
    explanation: `Chaque tour supprime un chiffre : le nombre de tours est le nombre de chiffres.`, correction: `c ← 0 ; Tant que n > 0 : n ← n DIV 10 ; c ← c + 1` });

  Q({ id: "D4-3-1", lesson: "l6.6", difficulty: 3, type: "code", mode: "python", points: 4,
    statement: `Écris en Python le programme qui lit un entier ‹n› compris entre 1 et 10 (en redemandant tant que la saisie est incorrecte), puis affiche ‹n!›.`,
    checks: [
      { label: "Boucle while True", re: /while\s+true\s*:/, w: 0.75, msg: "Le contrôle de saisie se fait avec while True: … break.", cat: "syntaxe" },
      { label: "Condition 1 ≤ n ≤ 10", any: [/1\s*<=\s*n\s*<=\s*10/, /n\s*>=\s*1[^\n]*n\s*<=\s*10|n\s*<=\s*10[^\n]*n\s*>=\s*1/], w: 1, msg: "La condition de saisie correcte est 1 <= n <= 10.", cat: "condition" },
      { label: "break", re: /\bbreak\b/, w: 0.5, msg: "Il faut un break quand la saisie est correcte.", cat: "logique" },
      { label: "F = 1 avant la boucle for", re: /^f\s*=\s*1\s*$[^]*^for\b/m, w: 0.5, msg: "F doit être initialisé à 1 avant la boucle for.", cat: "logique" },
      { label: "range(2, n + 1)", re: /for\s+\w+\s+in\s+range\s*\(\s*[12]\s*,\s*n\s*\+\s*1\s*\)\s*:/, w: 0.5, msg: "Pour inclure n : range(2, n + 1).", cat: "logique" },
      { label: "F = F * i", re: /f\s*=\s*f\s*\*\s*\w+|f\s*\*=\s*\w+/, w: 0.5, msg: "À chaque tour : F = F * i.", cat: "logique" },
      { label: "Affichage", re: /print\s*\(/, w: 0.25, msg: "Il faut afficher le résultat.", cat: "syntaxe" }
    ],
    solution: `while True:\n    n = int(input("n (1 à 10) : "))\n    if 1 <= n <= 10:\n        break\nF = 1\nfor i in range(2, n + 1):\n    F = F * i\nprint(n, "! =", F)`,
    explanation: `Deux parties : contrôle de saisie, puis accumulateur de produit initialisé à 1.`, correction: `while True … break ; F = 1 ; for i in range(2, n + 1): F = F * i` });
  Q({ id: "D4-3-2", lesson: "l7.1", difficulty: 3, type: "code", mode: "python", points: 4,
    statement: `Un vecteur ‹T› de 5 entiers est déjà rempli. Écris en Python le code qui affiche son plus grand élément, **sans utiliser** la fonction ‹max()›.`,
    checks: [
      { label: "Initialisation avec la première case (maxi = T[0])", re: /^\w+\s*=\s*t\[0\]\s*$/m, w: 1, msg: "Le maximum doit être initialisé avec la première case : maxi = T[0] (et non 0).", cat: "logique" },
      { label: "Parcours des cases", re: /for\s+\w+\s+in\s+range\s*\(\s*(5|[01]\s*,\s*5)\s*\)\s*:/, w: 1, msg: "Il faut parcourir les cases : for i in range(1, 5): (ou range(5)).", cat: "logique" },
      { label: "Comparaison et mise à jour du maximum", re: /if\s+t\s*\[\s*(\w+)\s*\]\s*>\s*(\w+)\s*:\s*\n\s*\2\s*=\s*t\s*\[\s*\1\s*\]/, w: 1.75, msg: "Pour chaque case : if T[i] > maxi: puis maxi = T[i].", cat: "condition" },
      { label: "Affichage", re: /print\s*\(/, w: 0.25, msg: "Il faut afficher le maximum avec print.", cat: "syntaxe" }
    ],
    forbid: [{ re: /\bmax\s*\(/, pen: 0.5, cat: "logique", msg: "L'énoncé interdit la fonction max() : il faut écrire la recherche avec une boucle." }],
    solution: `maxi = T[0]\nfor i in range(1, 5):\n    if T[i] > maxi:\n        maxi = T[i]\nprint(maxi)`,
    explanation: `On suppose que la première case est le maximum, puis on compare chaque case suivante.`, correction: `maxi = T[0] ; for i in range(1, 5): if T[i] > maxi: maxi = T[i]` });

  /* =============================== D5 =============================== */
  Q({ id: "D5-1-1", lesson: "l1.2", difficulty: 2, type: "vf", points: 1, errCat: "type",
    statement: `En Python, la fonction ‹input()› renvoie toujours une chaîne de caractères.`, correctAnswer: true,
    explanation: `Même si l'utilisateur tape 12, ‹input()› renvoie le texte « 12 » : il faut ‹int()› ou ‹float()› pour calculer.`, correction: `Vrai.` });
  Q({ id: "D5-1-2", lesson: "l2.1", difficulty: 1, type: "qcm", points: 1, errCat: "type",
    statement: `Quel type convient à un code postal ?`,
    choices: ["Entier", "Réel", "Chaîne", "Booléen"], correctAnswer: 2,
    explanation: `On ne fait aucun calcul avec un code postal : Chaîne.`, correction: `Chaîne.` });
  Q({ id: "D5-1-3", lesson: "l2.2", difficulty: 2, type: "text", points: 1, errCat: "operateur",
    statement: `Calcule ‹29 MOD 6›.`, accept: ["5"],
    feedback: [{ re: /^4$/, msg: "4 est le quotient (29 DIV 6). MOD donne le reste.", cat: "operateur" }],
    explanation: `29 = 6 × 4 + 5 : le reste est 5.`, correction: `5` });
  Q({ id: "D5-1-4", lesson: "l3.2", difficulty: 2, type: "qcm", points: 1,
    statement: `Que vaut ‹"Bonjour"[3:5]› ?`,
    choices: ["jo", "jou", "onj", "ou"], correctAnswer: 0,
    explanation: `B0 o1 n2 j3 o4 u5 r6 : de l'indice 3 à 4 (5 exclu) → « jo ».`, correction: `"jo"` });

  Q({ id: "D5-2-1", lesson: "l6.3", difficulty: 3, type: "qcm", points: 2, errCat: "logique",
    statement: `Cet algorithme doit calculer la somme 1 + 2 + … + n. Quelles sont les **deux erreurs** ?`,
    code: { lang: "algo", text: `Algorithme Somme\nDébut\n  Ecrire("n = "), Lire(n)\n  Pour i de 1 à n Faire\n    S ← 0\n    S ← S + i\n  Fin Pour\n  Ecrire(S)\nFin` },
    choices: ["S ← 0 est dans la boucle : la somme est remise à zéro à chaque tour", "Lire(n) est mal placé", "Le T.D.O est absent", "Il manque Fin Pour"], correctAnswer: [0, 2],
    explanation: `L'initialisation doit se faire AVANT la boucle, et tout objet utilisé (n, i, S) doit être déclaré dans un T.D.O.`, correction: `Erreurs : S ← 0 dans la boucle ; T.D.O manquant.` });
  Q({ id: "D5-2-2", lesson: "l1.2", difficulty: 2, type: "code", mode: "python", points: 2,
    statement: `Ce programme affiche « 55 » au lieu de 10 quand l'utilisateur tape 5. Réécris la **première ligne** pour qu'il affiche bien le double.`,
    code: { lang: "py", text: `n = input("n = ")\nprint("Le double est :", n * 2)` },
    checks: [
      { label: "Conversion en entier : n = int(input(...))", re: /n\s*=\s*int\s*\(\s*input\s*\(/, w: 2, msg: "input() renvoie une chaîne : « 5 » * 2 donne « 55 ». Il faut convertir : n = int(input(...)).", cat: "type" }
    ],
    solution: `n = int(input("n = "))`,
    explanation: `Multiplier une chaîne la répète : ‹"5" * 2› donne ‹"55"›. Après ‹int()›, ‹5 * 2› donne 10.`, correction: `n = int(input("n = "))` });

  Q({ id: "D5-3-1", lesson: "l0.1", difficulty: 2, type: "fields", points: 3,
    statement: `Problème : « lire 5 notes dans un vecteur T, calculer la moyenne moy, puis afficher Admis si moy ≥ 10, sinon Ajourné ». Fais l'analyse du problème.`,
    fields: [
      { label: "Résultat", accept: [/admis|ajourn|moy|mention/], show: "le message Admis / Ajourné (et la moyenne)", explain: "le programme affiche Admis ou Ajourné." },
      { label: "Données", accept: [/\bt\b|notes?/], show: "T : les 5 notes", explain: "les données lues sont les 5 notes rangées dans T." },
      { label: "Traitement", accept: [/somme|moyenne|moy\s*(←|<-|=)|\/\s*5/], show: "moy ← (somme des notes) / 5, puis test moy ≥ 10", explain: "on additionne les notes, on divise par 5 puis on teste la moyenne.", cat: "logique" }
    ],
    explanation: `Résultat : Admis/Ajourné ; Données : T ; Traitement : moyenne puis comparaison avec 10.`, correction: `Résultat : message ; Données : T ; Traitement : moy ← S / 5 et test moy ≥ 10.` });
  Q({ id: "D5-3-2", lesson: "l7.1", difficulty: 3, type: "code", mode: "algo", points: 6,
    statement: `Écris l'algorithme **complet** (T.D.O compris) du problème précédent. Utilise ‹S› pour la somme et ‹moy› pour la moyenne.`,
    checks: [
      { label: "T.D.O avec T : tableau de 5 réels", re: /tableau\s+de\s+5\s+reel/, w: 1, msg: "Le T.D.O doit déclarer T : tableau de 5 réels.", cat: "type" },
      { label: "Boucle de saisie Pour i de 0 à 4", re: /pour\s+\w+\s+de\s+0\s+a\s+(4|5\s*-\s*1)\s+faire/, w: 0.75, msg: "Les indices vont de 0 à 4 : Pour i de 0 à 4 Faire.", cat: "logique" },
      { label: "Lire(T[i])", re: /lire\s*\(\s*t\s*\[\s*\w+\s*\]\s*\)/, w: 0.75, msg: "On lit chaque case : Lire(T[i]).", cat: "syntaxe" },
      { label: "S ← 0 avant la boucle de somme", re: /s\s*←\s*0[^]*pour/, w: 0.75, msg: "S doit être initialisé à 0 avant la boucle de somme.", cat: "logique" },
      { label: "Accumulation S ← S + T[i]", re: /s\s*←\s*s\s*\+\s*t\s*\[\s*\w+\s*\]/, w: 1, msg: "À chaque tour : S ← S + T[i].", cat: "logique" },
      { label: "moy ← S / 5", re: /moy\s*←\s*\(?\s*s\s*\)?\s*\/\s*5/, w: 0.75, msg: "La moyenne : moy ← S / 5 (division réelle).", cat: "operateur" },
      { label: "Si moy >= 10 alors Admis Sinon Ajourné Fin Si", re: /si\s+\(?\s*moy\s*>=\s*10\s*\)?\s*alors[^]*admis[^]*sinon[^]*ajourn[^]*fin si/, w: 1, msg: "Il faut Si moy >= 10 alors Ecrire(\"Admis\") Sinon Ecrire(\"Ajourné\") Fin Si.", cat: "condition" }
    ],
    solution: `Algorithme Admission\nT.D.O : T : tableau de 5 réels ; S, moy : Réel ; i : Entier\nDébut\n  Pour i de 0 à 4 Faire\n    Ecrire("T[", i, "] = "), Lire(T[i])\n  Fin Pour\n  S ← 0\n  Pour i de 0 à 4 Faire\n    S ← S + T[i]\n  Fin Pour\n  moy ← S / 5\n  Si moy >= 10 alors\n    Ecrire("Admis")\n  Sinon\n    Ecrire("Ajourné")\n  Fin Si\nFin`,
    explanation: `On enchaîne : remplissage du vecteur, accumulation de la somme, calcul de la moyenne puis test.`, correction: `Remplissage, somme, moyenne, Si moy >= 10 …` });
  Q({ id: "D5-3-3", lesson: "l7.1", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Traduis l'algorithme en Python.`,
    checks: [
      { label: "Déclaration T = [0.0] * 5", re: /^t\s*=\s*\[\s*0(\.0)?\s*\]\s*\*\s*5\s*$/m, w: 0.5, msg: "Le vecteur se déclare T = [0.0] * 5.", cat: "syntaxe" },
      { label: "Saisie : for i in range(5) et float(input(...))", all: [/for\s+\w+\s+in\s+range\s*\(\s*5\s*\)\s*:/, /t\s*\[\s*\w+\s*\]\s*=\s*float\s*\(\s*input/], w: 0.75, msg: "Chaque case se lit avec T[i] = float(input(...)) dans for i in range(5):.", cat: "type" },
      { label: "Somme et moyenne", all: [/sum\s*\(\s*t\s*\)|s\s*=\s*s\s*\+\s*t\s*\[|s\s*\+=\s*t\s*\[/, /\/\s*5/], w: 1, msg: "Somme (boucle avec S = S + T[i], ou sum(T)) puis division par 5.", cat: "logique" },
      { label: "Test if moy >= 10 et affichage", all: [/if\s+moy\s*>=\s*10\s*:/, /print\s*\(/], w: 0.75, msg: "if moy >= 10: puis print(\"Admis\") / else: print(\"Ajourné\").", cat: "condition" }
    ],
    solution: `T = [0.0] * 5\nfor i in range(5):\n    T[i] = float(input("T[" + str(i) + "] = "))\nS = 0\nfor i in range(5):\n    S = S + T[i]\nmoy = S / 5\nif moy >= 10:\n    print("Admis")\nelse:\n    print("Ajourné")`,
    explanation: `Même structure que l'algorithme ; les entrées doivent être converties en réels avec float().`, correction: `T = [0.0] * 5 … moy = S / 5 … if moy >= 10: …` });
})(window.DATA);
