/* ==========================================================================
   Banque de questions — chapitres 0 à 3
   Champs : id, chapter, lesson, difficulty (1-3), type, statement, choices,
            correctAnswer / accept / fields / checks, explanation, points,
            correction, relatedLesson.
   Les regex de type "code" s'appliquent au texte normalisé (minuscules, sans
   accents, « ← » unifié, « >= », « <= », « != », commentaires retirés).
   ========================================================================== */
(function (D) {
  const Q = (o) => {
    o.chapter = o.chapter || "c" + o.lesson.slice(1).split(".")[0];
    o.relatedLesson = o.relatedLesson || o.lesson;
    o.difficulty = o.difficulty || 1;
    if (o.bank === undefined) o.bank = true;
    D.questions.push(o);
  };
  const VRAI_FAUX = ["vrai", "faux"];

  /* ---------------------------- l0.1 ---------------------------- */
  Q({ id: "q0.1a", lesson: "l0.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Dans l'analyse d'un problème, par quoi commence-t-on ?`,
    choices: ["Par les données", "Par le résultat", "Par le traitement", "Par le code Python"], correctAnswer: 1,
    explanation: `Le résultat dicte les données nécessaires, puis le traitement qui permet de passer des unes à l'autre.`,
    correction: `Ordre de l'analyse : Résultat → Données → Traitement.` });
  Q({ id: "q0.1b", lesson: "l0.1", difficulty: 2, type: "fields", points: 3,
    statement: `Problème : « calculer la surface s d'un carré de côté c ». Donne le résultat, les données et le traitement.`,
    fields: [
      { label: "Résultat", accept: [/\b(s|surface|aire)\b/], show: "s (la surface)", explain: "Le résultat est la surface s : c'est ce que le programme affiche." },
      { label: "Données", accept: [/\b(c|cote)\b/], show: "c (le côté)", explain: "La seule donnée à lire est le côté c." },
      { label: "Traitement", accept: [/(s|surface|aire)?\s*(←|<-|=)\s*c\s*(\*|x|×)\s*c/, /c\s*(\^|\*\*)\s*2/, /c\s*\*\s*c/], show: "s ← c * c", explain: "La surface d'un carré est c × c.", cat: "logique" }
    ],
    explanation: `On identifie d'abord ce qu'on veut afficher (s), ce qu'on doit lire (c) et la formule qui relie les deux (s = c × c).`,
    correction: `Résultat : s ; Données : c ; Traitement : s ← c * c.` });
  Q({ id: "q0.1c", lesson: "l0.1", difficulty: 1, type: "vf", points: 1,
    statement: `Un algorithme dépend du langage de programmation utilisé.`, correctAnswer: false,
    explanation: `Un algorithme décrit les étapes de résolution indépendamment du langage ; c'est le programme qui est écrit dans un langage donné (Python, C…).`,
    correction: `Faux : l'algorithme est indépendant du langage.` });

  /* ---------------------------- l0.2 ---------------------------- */
  Q({ id: "q0.2a", lesson: "l0.2", difficulty: 1, type: "qcm", points: 1,
    statement: `Dans quelle partie d'un algorithme déclare-t-on les objets utilisés ?`,
    choices: ["Entre Début et Fin", "Dans le T.D.O", "Dans le nom de l'algorithme", "Dans les commentaires"], correctAnswer: 1,
    explanation: `Le T.D.O (Tableau de Déclaration des Objets) est l'inventaire de tous les objets utilisés.`,
    correction: `Les objets se déclarent dans le T.D.O, avant Début.` });
  Q({ id: "q0.2b", lesson: "l0.2", difficulty: 1, type: "vf", points: 1,
    statement: `Tous les objets utilisés dans l'algorithme doivent figurer dans le T.D.O.`, correctAnswer: true,
    explanation: `Si un objet n'est pas déclaré dans le T.D.O, l'algorithme est incomplet.`,
    correction: `Vrai : variables et constantes sont toutes déclarées.` });
  Q({ id: "q0.2c", lesson: "l0.2", difficulty: 2, type: "code", mode: "algo", points: 3,
    statement: `Écris le squelette complet (nom, T.D.O, Début, Fin — sans instruction) d'un algorithme nommé ‹Test› qui utilise une variable entière ‹n›.`,
    checks: [
      { label: "Nom : Algorithme Test", re: /algorithme\s+test\b/, msg: "La première ligne doit être « Algorithme Test »." , cat: "syntaxe" },
      { label: "T.D.O avec n : Entier", re: /t\.?d\.?o[^]*\bn\b[^\n]*entier|\bn\b[^\n]*entier/, msg: "Le T.D.O doit déclarer n avec le type Entier.", cat: "type" },
      { label: "Début … Fin", re: /^debut\b[^]*^fin\b/m, msg: "Il manque Début et/ou Fin.", cat: "syntaxe" }
    ],
    solution: `Algorithme Test\nT.D.O : n : Entier\nDébut\nFin`,
    explanation: `Un algorithme comporte toujours : le nom, le T.D.O, puis le bloc Début … Fin.`,
    correction: `Algorithme Test / T.D.O : n : Entier / Début / Fin` });

  /* ---------------------------- l1.1 ---------------------------- */
  Q({ id: "q1.1a", lesson: "l1.1", difficulty: 1, type: "qcm", points: 2,
    statement: `Quels identificateurs sont **invalides** ? (plusieurs réponses possibles)`,
    choices: ["prix_ttc", "3notes", "mon nom", "Surface"], correctAnswer: [1, 2],
    explanation: `‹3notes› commence par un chiffre ; ‹mon nom› contient un espace. ‹prix_ttc› et ‹Surface› respectent les règles.`,
    correction: `Invalides : 3notes (commence par un chiffre) et mon nom (espace).` });
  Q({ id: "q1.1b", lesson: "l1.1", difficulty: 1, type: "text", points: 1,
    statement: `Quelle est la valeur de ‹x› après : ‹x ← 3› puis ‹x ← x + 2› ?`, accept: ["5"],
    feedback: [{ re: /^3$/, msg: "x ← x + 2 modifie x : on prend 3, on ajoute 2 et on range 5 dans x (l'ancienne valeur est remplacée).", cat: "logique" }],
    explanation: `Principe de remplacement : l'expression à droite est calculée (3 + 2 = 5) puis rangée dans x, ce qui efface 3.`,
    correction: `x = 5.` });
  Q({ id: "q1.1c", lesson: "l1.1", difficulty: 1, type: "vf", points: 1,
    statement: `Quand on range une nouvelle valeur dans une variable, l'ancienne valeur est conservée.`, correctAnswer: false,
    explanation: `Une variable ne contient qu'une seule valeur à la fois : la nouvelle valeur remplace l'ancienne.`,
    correction: `Faux : l'ancienne valeur est définitivement effacée.` });

  /* ---------------------------- l1.2 ---------------------------- */
  Q({ id: "q1.2a", lesson: "l1.2", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle instruction Python lit un **entier** au clavier ?`,
    choices: ["n = input()", "n = int(input())", "n = print(int())", "Lire(n)"], correctAnswer: 1,
    explanation: `‹input()› renvoie une chaîne ; ‹int()› la convertit en entier.`,
    correction: `n = int(input())` });
  Q({ id: "q1.2b", lesson: "l1.2", difficulty: 1, type: "code", mode: "algo", points: 2,
    statement: `Écris en algorithme les instructions qui affichent « Donner un entier n : » puis lisent ‹n›.`,
    checks: [
      { label: "Message d'invitation avec Ecrire avant Lire", re: /ecrire\s*\(\s*["'][^"']*["']\s*\)[^]*lire\s*\(\s*n\s*\)/, msg: "Il faut un Ecrire(\"…\") avec le message, placé AVANT Lire(n).", cat: "logique" },
      { label: "Lire(n)", re: /lire\s*\(\s*n\s*\)/, msg: "La lecture s'écrit Lire(n).", cat: "syntaxe" }
    ],
    solution: `Ecrire("Donner un entier n : "), Lire(n)`,
    explanation: `On affiche toujours un message d'invitation avant de lire, sinon l'utilisateur ne sait pas quoi taper.`,
    correction: `Ecrire("Donner un entier n : "), Lire(n)` });
  Q({ id: "q1.2c", lesson: "l1.2", difficulty: 1, type: "vf", points: 1,
    statement: `L'instruction ‹print("n")› affiche la valeur contenue dans la variable n.`, correctAnswer: false,
    explanation: `Avec des guillemets, ‹"n"› est un texte : Python affiche la lettre n. Pour afficher la valeur, on écrit ‹print(n)›.`,
    correction: `Faux : il faut ‹print(n)› sans guillemets.` });
  Q({ id: "q1.2d", lesson: "l1.2", difficulty: 2, type: "qcm", points: 1,
    statement: `Si n vaut 5, que affiche ‹Ecrire("n = ", n)› ?`,
    choices: ["n = n", "n = 5", "5", "n = \"5\""], correctAnswer: 1,
    explanation: `Le texte entre guillemets est affiché tel quel, puis la valeur de n (5) est affichée.`,
    correction: `n = 5` });

  /* ---------------------------- l1.3 ---------------------------- */
  Q({ id: "q1.3a", lesson: "l1.3", difficulty: 1, type: "text", points: 1,
    statement: `Quel symbole représente l'affectation en algorithme ?`, accept: ["←", "<-", "fleche", "flèche gauche", "fleche vers la gauche"], correctAnswer: "← (flèche vers la gauche)",
    feedback: [{ re: /^=+$/, msg: "Le signe « = » sert à comparer en algorithme (et à affecter en Python).", cat: "operateur" }],
    explanation: `En algorithmique l'affectation est la flèche ←.`, correction: `←` });
  Q({ id: "q1.3b", lesson: "l1.3", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle instruction d'affectation est valide ?`,
    choices: ["5 ← x", "x ← 5", "5 = x", "x == 5"], correctAnswer: 1,
    explanation: `La variable qui reçoit la valeur doit être à gauche de la flèche.`, correctionNote: "",
    correction: `x ← 5` });
  Q({ id: "q1.3c", lesson: "l1.3", difficulty: 2, type: "fields", points: 2,
    statement: `Donne les valeurs de a et b après : ‹a ← 2› ; ‹b ← a + 3› ; ‹a ← b * 2›.`,
    fields: [
      { label: "a", accept: ["10"], explain: "a ← b * 2 avec b = 5 donne 10." },
      { label: "b", accept: ["5"], explain: "b ← a + 3 avec a = 2 donne 5 ; b n'est plus modifié ensuite." }
    ],
    explanation: `On exécute ligne par ligne : a = 2 ; b = 2 + 3 = 5 ; a = 5 × 2 = 10.`, correction: `a = 10 et b = 5.` });
  Q({ id: "q1.3d", lesson: "l1.3", difficulty: 2, type: "code", mode: "algo", points: 3,
    statement: `Écris les instructions (sans T.D.O) qui lisent un entier ‹n› et affichent son triple.`,
    checks: [
      { label: "Lire(n)", re: /lire\s*\(\s*n\s*\)/, msg: "Il faut lire n avec Lire(n).", cat: "syntaxe" },
      { label: "Calcul du triple (3 * n)", re: /3\s*\*\s*n|n\s*\*\s*3|n\s*\+\s*n\s*\+\s*n/, msg: "Le triple de n se calcule avec 3 * n.", cat: "logique" },
      { label: "Affichage du résultat", re: /(3\s*\*\s*n|n\s*\*\s*3)[^]*ecrire\s*\(|ecrire\s*\([^)]*(3\s*\*\s*n|n\s*\*\s*3)/, msg: "Il faut afficher le résultat avec Ecrire après l'avoir calculé.", cat: "logique" }
    ],
    solution: `Ecrire("n = "), Lire(n)\nt ← 3 * n\nEcrire("Le triple est : ", t)`,
    explanation: `Trois étapes : lire (donnée), calculer (affectation), afficher (résultat).`,
    correction: `Ecrire("n = "), Lire(n) ; t ← 3 * n ; Ecrire("Le triple est : ", t)` });

  /* ---------------------------- l1.4 ---------------------------- */
  Q({ id: "q1.4a", lesson: "l1.4", difficulty: 1, type: "vf", points: 1,
    statement: `Les deux instructions ‹a ← b› puis ‹b ← a› permutent les valeurs de a et b.`, correctAnswer: false,
    explanation: `Dès la première instruction, a reçoit la valeur de b et l'ancienne valeur de a est écrasée : ensuite b reçoit… la valeur de b.`,
    correction: `Faux : il faut une variable auxiliaire z.` });
  Q({ id: "q1.4b", lesson: "l1.4", difficulty: 2, type: "fields", points: 3,
    statement: `On lit a = 5 et b = 9, puis on exécute : ‹z ← a› ; ‹a ← b› ; ‹b ← z›. Donne les valeurs finales.`,
    fields: [
      { label: "a", accept: ["9"], explain: "a ← b donne 9." },
      { label: "b", accept: ["5"], explain: "b ← z récupère l'ancienne valeur de a (5)." },
      { label: "z", accept: ["5"], explain: "z a sauvegardé a (5) et ne change plus." }
    ],
    explanation: `z ← a : z = 5 ; a ← b : a = 9 ; b ← z : b = 5.`, correction: `a = 9, b = 5, z = 5.` });
  Q({ id: "q1.4c", lesson: "l1.4", difficulty: 2, type: "code", mode: "python", points: 3,
    statement: `Écris en Python les trois instructions qui permutent les variables ‹a› et ‹b› à l'aide d'une variable auxiliaire ‹z›.`,
    checks: [
      { label: "z = a (sauvegarde de a)", re: /^z\s*=\s*a\s*$/m, msg: "Il faut d'abord sauvegarder a dans z : z = a.", cat: "logique" },
      { label: "a = b (après z = a)", re: /^z\s*=\s*a\s*$[^]*^a\s*=\s*b\s*$/m, msg: "Ensuite a reçoit la valeur de b : a = b (après avoir sauvegardé a).", cat: "logique" },
      { label: "b = z (en dernier)", re: /^a\s*=\s*b\s*$[^]*^b\s*=\s*z\s*$/m, msg: "Enfin b reçoit l'ancienne valeur de a : b = z.", cat: "logique" }
    ],
    forbid: [{ re: /a\s*,\s*b\s*=\s*b\s*,\s*a/, pen: 0, msg: "L'écriture ‹a, b = b, a› est valide en Python, mais cette question demande la méthode avec la variable auxiliaire z." }],
    solution: `z = a\na = b\nb = z`,
    explanation: `Sans sauvegarde, la valeur de a serait perdue dès que a reçoit b.`, correction: `z = a ; a = b ; b = z` });
  Q({ id: "q1.4d", lesson: "l1.4", difficulty: 3, type: "qcm", points: 1,
    statement: `Avec a = 7 et b = 2, que valent a et b après : ‹a ← a + b› ; ‹b ← a - b› ; ‹a ← a - b› ?`,
    choices: ["a = 7 et b = 2", "a = 2 et b = 7", "a = 9 et b = 2", "a = 2 et b = 9"], correctAnswer: 1,
    explanation: `a = 7 + 2 = 9 ; b = 9 − 2 = 7 ; a = 9 − 7 = 2. Les valeurs sont échangées sans variable auxiliaire.`,
    correction: `a = 2 et b = 7.` });

  /* ---------------------------- l2.1 ---------------------------- */
  Q({ id: "q2.1a", lesson: "l2.1", difficulty: 1, type: "text", points: 1,
    statement: `Quel type convient pour stocker le **nom** d'un élève ?`,
    accept: ["chaine", "chaine de caracteres", "string", "str"], correctAnswer: "Chaîne de caractères",
    feedback: [{ re: /caract/, msg: "Un nom comporte plusieurs caractères : le type Caractère (un seul signe) ne suffit pas, il faut une Chaîne.", cat: "type" }],
    explanation: `Un nom est un texte de plusieurs caractères : c'est une chaîne de caractères.`, correction: `Chaîne (de caractères).`, errCat: "type" });
  Q({ id: "q2.1b", lesson: "l2.1", difficulty: 2, type: "fields", points: 2, errCat: "type",
    statement: `Donne le type algorithmique de chaque donnée.`,
    fields: [
      { label: "Nombre d'élèves d'une classe", accept: ["entier", "integer", "int"], show: "Entier", explain: "un nombre d'élèves est un nombre entier." },
      { label: "Température 36.6", accept: ["reel", "float", "decimal", "nombre reel"], show: "Réel", explain: "36.6 a une partie décimale : Réel." },
      { label: "Numéro de téléphone", accept: ["chaine", "chaine de caracteres", "string", "str"], show: "Chaîne", explain: "on ne calcule pas avec un numéro de téléphone : Chaîne." },
      { label: "Admis (oui / non)", accept: ["booleen", "boolean", "bool", "logique"], show: "Booléen", explain: "deux valeurs possibles : Booléen." }
    ],
    explanation: `Le type se choisit selon la nature de la donnée et l'usage qu'on en fait.`, correction: `Entier, Réel, Chaîne, Booléen.` });
  Q({ id: "q2.1c", lesson: "l2.1", difficulty: 2, type: "qcm", points: 1,
    statement: `Lequel de ces objets est une **constante** ?`,
    choices: ["Le rayon R lu au clavier", "La surface S calculée", "TVA = 19", "Le solde d'un compte"], correctAnswer: 2,
    explanation: `La TVA fixée à 19 ne change jamais pendant l'exécution : c'est une constante.`, correction: `TVA = 19.` });
  Q({ id: "q2.1d", lesson: "l2.1", difficulty: 2, type: "vf", points: 1, errCat: "type",
    statement: `Un numéro de CIN doit être déclaré de type Entier car il est formé de chiffres.`, correctAnswer: false,
    explanation: `On ne fait aucun calcul avec un numéro de CIN (et un zéro de début serait perdu avec un entier) : on le déclare en Chaîne.`,
    correction: `Faux : Chaîne.` });

  /* ---------------------------- l2.2 ---------------------------- */
  Q({ id: "q2.2a", lesson: "l2.2", difficulty: 1, type: "text", points: 1, errCat: "operateur",
    statement: `Calcule ‹17 DIV 5›.`, accept: ["3"],
    feedback: [{ re: /^2$/, msg: "2 est le reste (17 MOD 5). DIV donne le quotient.", cat: "operateur" }, { re: /^3[.,]4$/, msg: "3.4 est le résultat de la division réelle 17 / 5. DIV donne le quotient entier.", cat: "operateur" }],
    explanation: `17 = 5 × 3 + 2 : le quotient entier est 3.`, correction: `17 DIV 5 = 3.` });
  Q({ id: "q2.2b", lesson: "l2.2", difficulty: 1, type: "text", points: 1, errCat: "operateur",
    statement: `Calcule ‹17 MOD 5›.`, accept: ["2"],
    feedback: [{ re: /^3$/, msg: "3 est le quotient (17 DIV 5). MOD donne le reste.", cat: "operateur" }],
    explanation: `17 = 5 × 3 + 2 : le reste est 2.`, correction: `17 MOD 5 = 2.` });
  Q({ id: "q2.2c", lesson: "l2.2", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle condition teste qu'un entier n est **pair** ?`,
    choices: ["n DIV 2 = 0", "n MOD 2 = 0", "n MOD 2 = 1", "n / 2 = 0"], correctAnswer: 1,
    explanation: `Un nombre pair est divisible par 2 : le reste de la division par 2 est 0.`, correction: `n MOD 2 = 0` });
  Q({ id: "q2.2d", lesson: "l2.2", difficulty: 2, type: "fields", points: 2,
    statement: `Pour n = 582, calcule :`,
    fields: [
      { label: "n MOD 10", accept: ["2"], explain: "le reste de la division par 10 est le dernier chiffre : 2." },
      { label: "n DIV 10", accept: ["58"], explain: "le quotient par 10 enlève le dernier chiffre : 58." }
    ],
    explanation: `582 = 10 × 58 + 2.`, correction: `n MOD 10 = 2 ; n DIV 10 = 58.` });
  Q({ id: "q2.2e", lesson: "l2.2", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Un entier ‹n› à deux chiffres est lu (par exemple 47). Écris en Python les instructions qui lisent n puis affichent l'entier inversé (74).`,
    checks: [
      { label: "Chiffre des dizaines avec // 10", re: /n\s*\/\/\s*10/, msg: "Les dizaines s'obtiennent avec n // 10.", cat: "operateur" },
      { label: "Chiffre des unités avec % 10", re: /n\s*%\s*10/, msg: "Les unités s'obtiennent avec n % 10.", cat: "operateur" },
      { label: "Recomposition (unités × 10 + dizaines) et affichage", all: [/(\*\s*10|10\s*\*)/, /print\s*\(/], msg: "Pour inverser : unités × 10 + dizaines, puis print.", cat: "logique" }
    ],
    solution: `n = int(input("n = "))\nd = n // 10\nu = n % 10\nprint(u * 10 + d)`,
    explanation: `Pour 47 : d = 4, u = 7 ; l'inverse vaut 7 × 10 + 4 = 74.`, correction: `d = n // 10 ; u = n % 10 ; print(u * 10 + d)` });

  /* ---------------------------- l2.3 ---------------------------- */
  Q({ id: "q2.3a", lesson: "l2.3", difficulty: 1, type: "fields", points: 2,
    statement: `Calcule :`,
    fields: [
      { label: "Ent(3.8)", accept: ["3"], explain: "Ent tronque la partie décimale : 3." },
      { label: "Abs(-5)", accept: ["5"], explain: "la valeur absolue enlève le signe : 5." }
    ],
    explanation: `‹Ent› tronque ; ‹Abs› donne la valeur absolue.`, correction: `Ent(3.8) = 3 ; Abs(-5) = 5.` });
  Q({ id: "q2.3b", lesson: "l2.3", difficulty: 2, type: "qcm", points: 1,
    statement: `Que faut-il écrire en début de programme pour pouvoir utiliser ‹sqrt› ?`,
    choices: ["import sqrt", "from math import sqrt", "from random import sqrt", "Rien : sqrt est toujours disponible"], correctAnswer: 1,
    explanation: `‹sqrt› appartient au module ‹math›.`, correction: `from math import sqrt` });
  Q({ id: "q2.3c", lesson: "l2.3", difficulty: 2, type: "text", points: 1,
    statement: `Que renvoie ‹sqrt(25.0)› en Python ?`, accept: ["5.0", "5"],
    explanation: `‹sqrt› renvoie toujours un réel (float) : 5.0.`, correction: `5.0` });
  Q({ id: "q2.3d", lesson: "l2.3", difficulty: 2, type: "qcm", points: 1,
    statement: `Que peut renvoyer ‹randint(1, 6)› ?`,
    choices: ["Seulement 1 ou 6", "Un entier de 1 à 6 inclus", "Un réel entre 1 et 6", "Un entier de 1 à 5"], correctAnswer: 1,
    explanation: `Les deux bornes sont incluses et le résultat est un entier.`, correction: `Un entier entre 1 et 6 inclus.` });

  /* ---------------------------- l2.4 ---------------------------- */
  Q({ id: "q2.4a", lesson: "l2.4", difficulty: 1, type: "fields", points: 3,
    statement: `Donne la valeur (Vrai ou Faux) de chaque expression.`,
    fields: [
      { label: "Vrai ET Faux", accept: ["faux", "false", "f"], show: "Faux", explain: "ET est vrai seulement si les deux sont vrais." },
      { label: "Vrai OU Faux", accept: ["vrai", "true", "v"], show: "Vrai", explain: "OU est vrai dès qu'un seul est vrai." },
      { label: "NON(Faux)", accept: ["vrai", "true", "v"], show: "Vrai", explain: "NON inverse la valeur." }
    ],
    explanation: `Appliquer la table de vérité.`, correction: `Faux ; Vrai ; Vrai.` });
  Q({ id: "q2.4b", lesson: "l2.4", difficulty: 2, type: "code", points: 3,
    statement: `Écris la condition « n est un entier à **deux chiffres** » (en algorithme ou en Python).`,
    checks: [
      { label: "Borne basse (n ≥ 10)", re: /n\s*>=\s*10|10\s*<=\s*n|n\s*>\s*9\b/, msg: "La borne basse manque : n >= 10.", cat: "condition" },
      { label: "Borne haute (n ≤ 99)", re: /n\s*<=\s*99|99\s*>=\s*n|n\s*<\s*100/, msg: "La borne haute manque : n <= 99.", cat: "condition" },
      { label: "Les deux liées par ET (and) ou chaînées", any: [/\bet\b/, /\band\b/, /<=?\s*n\s*<=?/], msg: "Les deux comparaisons doivent être reliées par ET (and).", cat: "operateur" }
    ],
    forbid: [{ re: /\bou\b|\bor\b/, pen: 0.5, cat: "operateur", msg: "OU est faux ici : un seul des deux tests suffirait (50 ou -3 seraient acceptés). Il faut ET : les deux conditions à la fois." }],
    solution: `(n >= 10) ET (n <= 99)`,
    explanation: `Un intervalle se traduit par deux comparaisons reliées par ET.`, correction: `(n ≥ 10) ET (n ≤ 99)   ou, en Python, 10 <= n <= 99` });
  Q({ id: "q2.4c", lesson: "l2.4", difficulty: 2, type: "qcm", points: 1,
    statement: `Quelle écriture Python signifie « n est compris entre 5 et 9 (bornes incluses) » ?`,
    choices: ["5 <= n <= 9", "n >= 5 or n <= 9", "5 <= n and 9", "n = 5 to 9"], correctAnswer: 0,
    explanation: `Avec ‹or› la condition serait toujours vraie ; ‹5 <= n and 9› ne teste pas la borne 9 ; ‹n = 5 to 9› n'existe pas.`, correction: `5 <= n <= 9`, errCat: "condition" });
  Q({ id: "q2.4d", lesson: "l2.4", difficulty: 3, type: "vf", points: 1,
    statement: `‹NON(A ET B)› est équivalent à ‹NON(A) ET NON(B)›.`, correctAnswer: false,
    explanation: `Loi de De Morgan : ‹NON(A ET B) = NON(A) OU NON(B)›.`, correction: `Faux : c'est NON(A) OU NON(B).` });

  /* ---------------------------- l2.5 ---------------------------- */
  Q({ id: "q2.5a", lesson: "l2.5", difficulty: 1, type: "text", points: 1,
    statement: `Que vaut ‹ORD('A')› ?`, accept: ["65"],
    feedback: [{ re: /^97$/, msg: "97 est le code de la minuscule 'a'. La majuscule 'A' a le code 65.", cat: "resultat" }],
    explanation: `Les majuscules vont de 65 ('A') à 90 ('Z').`, correction: `65` });
  Q({ id: "q2.5b", lesson: "l2.5", difficulty: 1, type: "text", points: 1,
    statement: `Que vaut ‹CHR(97)› ?`, accept: ["a"], cs: true,
    explanation: `97 est le code ASCII de la minuscule 'a'.`, correction: `'a'` });
  Q({ id: "q2.5c", lesson: "l2.5", difficulty: 2, type: "fields", points: 2,
    statement: `Donne les codes ASCII :`,
    fields: [
      { label: "ORD('0')", accept: ["48"], explain: "le chiffre '0' a le code 48." },
      { label: "ORD('Z')", accept: ["90"], explain: "la dernière majuscule 'Z' a le code 90." }
    ],
    explanation: `Chiffres : 48–57 ; majuscules : 65–90.`, correction: `48 et 90.` });
  Q({ id: "q2.5d", lesson: "l2.5", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Écris en Python : lire une lettre majuscule dans ‹c›, puis afficher la lettre minuscule correspondante.`,
    checks: [
      { label: "Lecture de c avec input", re: /\bc\s*=\s*input\s*\(/, msg: "La lecture s'écrit c = input(...).", cat: "syntaxe" },
      { label: "chr(ord(c) + 32)", re: /chr\s*\(\s*ord\s*\(\s*c\s*\)\s*\+\s*32\s*\)/, msg: "La minuscule se calcule avec chr(ord(c) + 32).", cat: "logique" },
      { label: "Affichage avec print", re: /print\s*\(/, msg: "Il faut afficher le résultat avec print.", cat: "syntaxe" }
    ],
    solution: `c = input("Une majuscule : ")\nm = chr(ord(c) + 32)\nprint(m)`,
    explanation: `L'écart entre une majuscule et sa minuscule est de 32 dans la table ASCII.`, correction: `m = chr(ord(c) + 32)` });

  /* ---------------------------- l2.6 ---------------------------- */
  Q({ id: "q2.6a", lesson: "l2.6", difficulty: 2, type: "fields", points: 3,
    statement: `Pour t = 3725 secondes, donne h, mn et s (heures, minutes, secondes).`,
    fields: [
      { label: "h", accept: ["1"], explain: "3725 DIV 3600 = 1." },
      { label: "mn", accept: ["2"], explain: "r = 3725 MOD 3600 = 125 ; 125 DIV 60 = 2." },
      { label: "s", accept: ["5"], explain: "125 MOD 60 = 5." }
    ],
    explanation: `h = 1 ; r = 125 ; mn = 2 ; s = 5.`, correction: `1 h 2 mn 5 s.` });
  Q({ id: "q2.6b", lesson: "l2.6", difficulty: 2, type: "qcm", points: 1,
    statement: `Dans l'algorithme de conversion, que contient ‹r ← t MOD 3600› ?`,
    choices: ["Le nombre d'heures", "Les secondes restantes après avoir retiré les heures complètes", "Le nombre de minutes", "La durée totale"], correctAnswer: 1,
    explanation: `MOD donne le reste de la division par 3600, c'est-à-dire les secondes qui ne forment pas une heure complète.`, correction: `Les secondes restantes.` });
  Q({ id: "q2.6c", lesson: "l2.6", difficulty: 3, type: "code", mode: "algo", points: 4,
    statement: `Écris l'algorithme (corps, sans T.D.O) qui lit un nombre de minutes ‹m›, puis calcule et affiche ‹h› (heures) et ‹mn› (minutes restantes).`,
    checks: [
      { label: "Lire(m)", re: /lire\s*\(\s*m\s*\)/, msg: "Il faut lire m.", cat: "syntaxe" },
      { label: "h ← m DIV 60", re: /h\s*←\s*m\s+div\s+60/, msg: "Les heures se calculent avec m DIV 60.", cat: "operateur" },
      { label: "mn ← m MOD 60", re: /mn\s*←\s*m\s+mod\s+60/, msg: "Les minutes restantes se calculent avec m MOD 60.", cat: "operateur" },
      { label: "Affichage de h et mn", re: /ecrire\s*\([^)]*\bh\b[^)]*\bmn\b[^)]*\)/, msg: "Il faut afficher h et mn avec Ecrire.", cat: "syntaxe" }
    ],
    solution: `Ecrire("m = "), Lire(m)\nh ← m DIV 60\nmn ← m MOD 60\nEcrire(h, " h ", mn, " mn")`,
    explanation: `On procède comme pour la durée : quotient (DIV) pour les heures, reste (MOD) pour les minutes.`, correction: `h ← m DIV 60 ; mn ← m MOD 60` });

  /* ---------------------------- l3.1 ---------------------------- */
  Q({ id: "q3.1a", lesson: "l3.1", difficulty: 1, type: "text", points: 1,
    statement: `Soit ‹ch = "Tunis"›. Que vaut ‹Long(ch)› ?`, accept: ["5"],
    explanation: `T-u-n-i-s : 5 caractères.`, correction: `5` });
  Q({ id: "q3.1b", lesson: "l3.1", difficulty: 1, type: "text", points: 1,
    statement: `Soit ‹ch = "Tunis"›. Que vaut ‹ch[0]› ?`, accept: ["T"], cs: true,
    feedback: [{ re: /^u$/, msg: "‹ch[1]› est « u ». Le premier caractère est à l'indice 0.", cat: "resultat" }],
    explanation: `Les indices commencent à 0 : ch[0] est le premier caractère, « T ».`, correction: `"T"` });
  Q({ id: "q3.1c", lesson: "l3.1", difficulty: 2, type: "qcm", points: 1,
    statement: `Une chaîne contient 12 caractères. Quel est l'indice du dernier caractère ?`,
    choices: ["12", "11", "13", "0"], correctAnswer: 1,
    explanation: `Les indices vont de 0 à 11 (12 − 1).`, correction: `11` });
  Q({ id: "q3.1d", lesson: "l3.1", difficulty: 2, type: "vf", points: 1,
    statement: `‹ch[Long(ch)]› désigne le dernier caractère de ch.`, correctAnswer: false,
    explanation: `Le dernier indice est ‹Long(ch) - 1› ; ‹ch[Long(ch)]› provoque une erreur (IndexError).`, correction: `Faux : ‹ch[Long(ch) - 1]›.` });

  /* ---------------------------- l3.2 ---------------------------- */
  Q({ id: "q3.2a", lesson: "l3.2", difficulty: 1, type: "fields", points: 3,
    statement: `Soit ‹ch = "Bonjour papa"›. Donne :`,
    fields: [
      { label: "ch[:3]", accept: ["Bon"], cs: true, show: "Bon", explain: "les 3 premiers caractères : « Bon »." },
      { label: "ch[3:7]", accept: ["jour"], show: "jour", explain: "indices 3, 4, 5, 6 : « jour » (7 exclu)." },
      { label: "ch[8:]", accept: ["papa"], show: "papa", explain: "de l'indice 8 jusqu'à la fin : « papa »." }
    ],
    explanation: `Début inclus, fin exclue.`, correction: `"Bon" ; "jour" ; "papa".` });
  Q({ id: "q3.2b", lesson: "l3.2", difficulty: 2, type: "text", points: 1,
    statement: `Combien de caractères extrait la tranche ‹ch[2:9]› ?`, accept: ["7"],
    feedback: [{ re: /^8$/, msg: "Le nombre de caractères est f − d = 9 − 2 = 7 (et non f − d + 1).", cat: "resultat" }],
    explanation: `Nombre de caractères = f − d = 9 − 2.`, correction: `7` });
  Q({ id: "q3.2c", lesson: "l3.2", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Une chaîne ‹ch› est déjà lue. Écris l'instruction Python qui affiche ses **3 derniers caractères**.`,
    checks: [
      { label: "Tranche des 3 derniers caractères", re: /ch\s*\[\s*(len\s*\(\s*ch\s*\)\s*-\s*3|-\s*3)\s*:\s*\]/, w: 2, msg: "Les 3 derniers caractères : ch[len(ch) - 3:] (ou ch[-3:] en Python).", cat: "logique" },
      { label: "Affichage avec print", re: /print\s*\(/, msg: "Il faut afficher avec print.", cat: "syntaxe" }
    ],
    solution: `print(ch[len(ch) - 3:])`,
    explanation: `On part de l'indice len(ch) − 3 et on va jusqu'à la fin.`, correction: `print(ch[len(ch) - 3:])` });

  /* ---------------------------- l3.3 ---------------------------- */
  Q({ id: "q3.3a", lesson: "l3.3", difficulty: 1, type: "qcm", points: 1,
    statement: `Quel est l'équivalent Python de ‹Long(ch)› ?`,
    choices: ["ch.long()", "len(ch)", "size(ch)", "ch.length"], correctAnswer: 1,
    explanation: `‹len(ch)› renvoie le nombre de caractères.`, correction: `len(ch)` });
  Q({ id: "q3.3b", lesson: "l3.3", difficulty: 2, type: "text", points: 1,
    statement: `Que renvoie ‹"Tunis".find("n")› ?`, accept: ["2"],
    feedback: [{ re: /^3$/, msg: "Les indices commencent à 0 : T(0) u(1) n(2).", cat: "resultat" }],
    explanation: `« n » est le troisième caractère, donc à l'indice 2.`, correction: `2` });
  Q({ id: "q3.3c", lesson: "l3.3", difficulty: 2, type: "fields", points: 2,
    statement: `Donne le résultat :`,
    fields: [
      { label: `"tunis".upper()`, accept: ["TUNIS"], cs: true, show: "TUNIS", explain: "upper met tout en majuscules." },
      { label: `str(2026) + "!"`, accept: ["2026!"], show: "2026!", explain: "str(2026) donne le texte « 2026 » : on le concatène avec « ! »." }
    ],
    explanation: `‹upper› convertit en majuscules ; ‹str› convertit un nombre en chaîne pour pouvoir le concaténer.`, correction: `"TUNIS" ; "2026!"` });
  Q({ id: "q3.3d", lesson: "l3.3", difficulty: 2, type: "qcm", points: 1,
    statement: `Quelle expression Python correspond à ‹Pos("s", "Tunis")› ?`,
    choices: ['"s".find("Tunis")', '"Tunis".find("s")', 'find("s", "Tunis")', '"Tunis".pos("s")'], correctAnswer: 1,
    explanation: `En Python la chaîne dans laquelle on cherche vient en premier : ‹ch2.find(ch1)›. Les deux chaînes sont inversées par rapport à l'algorithme.`, correction: `"Tunis".find("s")` });
  Q({ id: "q3.3e", lesson: "l3.3", difficulty: 3, type: "vf", points: 1, errCat: "type",
    statement: `L'instruction ‹print("age : " + 17)› s'exécute correctement.`, correctAnswer: false,
    explanation: `On ne peut pas concaténer une chaîne et un entier : TypeError. Il faut ‹print("age : " + str(17))› ou ‹print("age :", 17)›.`, correction: `Faux : ‹str(17)› est nécessaire.` });

  /* ---------------------------- l3.4 ---------------------------- */
  Q({ id: "q3.4a", lesson: "l3.4", difficulty: 1, type: "vf", points: 1,
    statement: `En Python, l'instruction ‹ch[0] = "X"› modifie le premier caractère de ch.`, correctAnswer: false,
    explanation: `Les chaînes sont immutables : cette instruction provoque une TypeError. Il faut reconstruire la chaîne : ‹ch = "X" + ch[1:]›.`, correction: `Faux : chaîne immutable.` });
  Q({ id: "q3.4b", lesson: "l3.4", difficulty: 2, type: "code", mode: "python", points: 2,
    statement: `Écris l'instruction Python qui remplace le **dernier** caractère de la chaîne ‹ch› par « ! » (en reconstruisant la chaîne).`,
    checks: [
      { label: "Reconstruction : ch[:len(ch)-1] + \"!\"", re: /ch\s*=\s*ch\s*\[\s*:\s*(len\s*\(\s*ch\s*\)\s*-\s*1|-\s*1)\s*\]\s*\+\s*["']!["']/, w: 2, msg: "Il faut reconstruire : ch = ch[:len(ch) - 1] + \"!\".", cat: "logique" }
    ],
    forbid: [{ re: /ch\s*\[[^\]]*\]\s*=[^=]/, pen: 0.5, cat: "type", msg: "On ne peut pas modifier un caractère directement : les chaînes sont immutables." }],
    solution: `ch = ch[:len(ch) - 1] + "!"`,
    explanation: `On garde tout sauf le dernier caractère, puis on concatène « ! ».`, correction: `ch = ch[:len(ch) - 1] + "!"` });
  Q({ id: "q3.4c", lesson: "l3.4", difficulty: 2, type: "fields", points: 3,
    statement: `Soit ‹date = "25/12/2026"›. Donne :`,
    fields: [
      { label: "date[:2]", accept: ["25"], explain: "indices 0 et 1 : « 25 »." },
      { label: "date[3:5]", accept: ["12"], explain: "indices 3 et 4 : « 12 »." },
      { label: "date[6:]", accept: ["2026"], explain: "de l'indice 6 jusqu'à la fin : « 2026 »." }
    ],
    explanation: `Les « / » sont aux indices 2 et 5.`, correction: `"25" ; "12" ; "2026".` });
})(window.DATA);
