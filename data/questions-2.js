/* Banque de questions — chapitres 4 à 8 */
(function (D) {
  const Q = (o) => {
    o.chapter = o.chapter || "c" + o.lesson.slice(1).split(".")[0];
    o.relatedLesson = o.relatedLesson || o.lesson;
    o.difficulty = o.difficulty || 1;
    if (o.bank === undefined) o.bank = true;
    D.questions.push(o);
  };

  /* ---------------------------- l4.1 ---------------------------- */
  Q({ id: "q4.1a", lesson: "l4.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Un vecteur T contient 8 éléments. Quels sont les indices valides ?`,
    choices: ["1 à 8", "0 à 8", "0 à 7", "1 à 7"], correctAnswer: 2,
    explanation: `Pour N éléments, les indices vont de 0 à N − 1, donc de 0 à 7.`, correction: `0 à 7.` });
  Q({ id: "q4.1b", lesson: "l4.1", difficulty: 1, type: "text", points: 1,
    statement: `Écris la déclaration Python d'un vecteur ‹T› de 4 réels initialisés à 0.0.`,
    accept: [/^(\w+\s*=\s*)?\[\s*0\.0\s*\]\s*\*\s*4$/, /^(\w+\s*=\s*)?4\s*\*\s*\[\s*0\.0\s*\]$/], correctAnswer: "T = [0.0] * 4",
    feedback: [{ re: /\[\s*0\s*\]/, msg: "Pour des réels on initialise avec 0.0 (et non 0).", cat: "type" }],
    explanation: `La liste Python ‹[0.0] * N› crée N cases réelles initialisées à 0.0.`, correction: `T = [0.0] * 4` });
  Q({ id: "q4.1c", lesson: "l4.1", difficulty: 2, type: "vf", points: 1, errCat: "type",
    statement: `Un vecteur peut contenir à la fois des entiers et des chaînes de caractères.`, correctAnswer: false,
    explanation: `Un vecteur est une structure homogène : toutes ses cases ont le même type.`, correction: `Faux : même type pour toutes les cases.` });

  /* ---------------------------- l4.2 ---------------------------- */
  Q({ id: "q4.2a", lesson: "l4.2", difficulty: 2, type: "text", points: 1,
    statement: `Soit ‹T = [5, 8, 2]›. Que vaut ‹T[1]› ?`, accept: ["8"],
    feedback: [{ re: /^5$/, msg: "5 est T[0]. Les indices commencent à 0 : T[1] est la deuxième case.", cat: "resultat" }],
    explanation: `T[0] = 5, T[1] = 8, T[2] = 2.`, correction: `8` });
  Q({ id: "q4.2b", lesson: "l4.2", difficulty: 2, type: "qcm", points: 1,
    statement: `Dans un vecteur T de 5 éléments, quelle écriture provoque une erreur ?`,
    choices: ["T[0]", "T[4]", "T[5]", "T[2]"], correctAnswer: 2,
    explanation: `Les indices valides sont 0 à 4 : ‹T[5]› n'existe pas (IndexError).`, correction: `T[5]` });
  Q({ id: "q4.2c", lesson: "l4.2", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Écris en Python les instructions qui permutent les cases ‹T[0]› et ‹T[2]› d'un vecteur, avec une variable auxiliaire.`,
    checks: [
      { label: "Sauvegarde : aux = T[0]", re: /^\w+\s*=\s*t\[0\]\s*$/m, msg: "Il faut d'abord sauvegarder T[0] dans une variable auxiliaire.", cat: "logique" },
      { label: "T[0] = T[2]", re: /^\w+\s*=\s*t\[0\]\s*$[^]*^t\[0\]\s*=\s*t\[2\]\s*$/m, msg: "Puis T[0] reçoit T[2].", cat: "logique" },
      { label: "T[2] = aux", re: /^(\w+)\s*=\s*t\[0\]\s*$[^]*^t\[0\]\s*=\s*t\[2\]\s*$[^]*^t\[2\]\s*=\s*\1\s*$/m, msg: "Enfin T[2] reçoit la valeur sauvegardée.", cat: "logique" }
    ],
    solution: `z = T[0]\nT[0] = T[2]\nT[2] = z`,
    explanation: `Sans sauvegarde, T[0] serait écrasé avant d'être copié dans T[2].`, correction: `z = T[0] ; T[0] = T[2] ; T[2] = z` });

  /* ---------------------------- l5.1 ---------------------------- */
  Q({ id: "q5.1a", lesson: "l5.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Quel mot-clé Python introduit la branche « Sinon » ?`,
    choices: ["otherwise", "else", "elif", "then"], correctAnswer: 1,
    explanation: `‹else:› est la branche exécutée quand la condition est fausse. ‹elif› est un « sinon si ».`, correction: `else` });
  Q({ id: "q5.1b", lesson: "l5.1", difficulty: 2, type: "code", mode: "algo", points: 3,
    statement: `Écris l'algorithme (corps, sans T.D.O) : lire un réel ‹x› ; afficher « négatif » si x < 0, sinon « positif ou nul ».`,
    checks: [
      { label: "Lire(x)", re: /lire\s*\(\s*x\s*\)/, msg: "Il faut lire x.", cat: "syntaxe" },
      { label: "Condition sur le signe de x", re: /si\s+\(?\s*(x\s*<\s*0|0\s*>\s*x|x\s*>=\s*0|0\s*<=\s*x)\s*\)?\s*alors/, msg: "La condition doit tester le signe de x : Si x < 0 alors …", cat: "condition" },
      { label: "Structure Si … Sinon … Fin Si", re: /\bsinon\b[^]*\bfin si\b/, msg: "La structure doit se terminer par Sinon … Fin Si.", cat: "syntaxe" }
    ],
    solution: `Ecrire("x = "), Lire(x)\nSi x < 0 alors\n  Ecrire("négatif")\nSinon\n  Ecrire("positif ou nul")\nFin Si`,
    explanation: `Deux cas exclusifs : x négatif ou non.`, correction: `Si x < 0 alors Ecrire("négatif") Sinon Ecrire("positif ou nul") Fin Si` });
  Q({ id: "q5.1c", lesson: "l5.1", difficulty: 2, type: "vf", points: 1, errCat: "syntaxe",
    statement: `En Python, l'indentation n'a aucune importance.`, correctAnswer: false,
    explanation: `En Python, l'indentation délimite les blocs : sans elle, ‹IndentationError›.`, correction: `Faux : indentation obligatoire.` });
  Q({ id: "q5.1d", lesson: "l5.1", difficulty: 2, type: "text", points: 1,
    statement: `Que affiche : ‹Si n MOD 2 = 0 alors Ecrire("pair") Sinon Ecrire("impair") Fin Si› pour n = 7 ?`, accept: ["impair"],
    explanation: `7 MOD 2 = 1, la condition est fausse : on exécute la branche Sinon.`, correction: `impair` });

  /* ---------------------------- l5.2 ---------------------------- */
  Q({ id: "q5.2a", lesson: "l5.2", difficulty: 2, type: "qcm", points: 1,
    statement: `Quelle structure choisir quand il y a **plus de deux** cas possibles ?`,
    choices: ["Si … Sinon simple", "La forme généralisée (Sinon Si / elif)", "Pour", "Répéter … Jusqu'à"], correctAnswer: 1,
    explanation: `Plusieurs conditions testées dans l'ordre : forme généralisée.`, correction: `Forme généralisée.` });
  Q({ id: "q5.2b", lesson: "l5.2", difficulty: 2, type: "text", points: 1,
    statement: `Avec l'algorithme des mentions (≥ 16 « Très bien », ≥ 14 « Bien », ≥ 12 « Assez bien », ≥ 10 « Passable », sinon « Ajourné »), quelle mention obtient ‹moy = 13› ?`,
    accept: ["assez bien"], feedback: [{ re: /^bien$/, msg: "13 n'atteint pas 14 : la mention « Bien » est exclue.", cat: "resultat" }],
    explanation: `13 < 14 mais 13 ≥ 12 : « Assez bien ».`, correction: `Assez bien.` });
  Q({ id: "q5.2c", lesson: "l5.2", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Une note réelle est lue dans ‹note›. Écris en Python (if / elif / else) : afficher « A » si note ≥ 15, « B » si note ≥ 10, « C » sinon.`,
    checks: [
      { label: "if note >= 15:", re: /if\s+note\s*>=\s*15\s*:/, msg: "Le premier test est if note >= 15: (avec deux-points).", cat: "condition" },
      { label: "elif note >= 10:", re: /elif\s+note\s*>=\s*10\s*:/, msg: "Le deuxième test est elif note >= 10:.", cat: "condition" },
      { label: "else:", re: /else\s*:/, msg: "Le cas par défaut est else:.", cat: "syntaxe" }
    ],
    solution: `if note >= 15:\n    print("A")\nelif note >= 10:\n    print("B")\nelse:\n    print("C")`,
    explanation: `On teste du seuil le plus élevé au plus faible.`, correction: `if note >= 15: … elif note >= 10: … else: …` });
  Q({ id: "q5.2d", lesson: "l5.2", difficulty: 3, type: "qcm", points: 1, errCat: "logique",
    statement: `Dans l'algorithme des mentions, que se passe-t-il pour moy = 17 si on teste **d'abord** ‹moy >= 10› ?`,
    choices: ["« Très bien » est affiché", "« Passable » est affiché (les autres tests sont ignorés)", "Une erreur de syntaxe", "Rien n'est affiché"], correctAnswer: 1,
    explanation: `17 ≥ 10 est vrai : le premier bloc est exécuté et le reste est ignoré. L'ordre des conditions est donc essentiel.`, correction: `On teste du plus grand seuil au plus petit.` });

  /* ---------------------------- l5.3 ---------------------------- */
  Q({ id: "q5.3a", lesson: "l5.3", difficulty: 2, type: "fields", points: 3,
    statement: `Avec l'algorithme de remise (10 % si M ≥ 500, 5 % si M ≥ 200, sinon rien), calcule le montant net :`,
    fields: [
      { label: "M = 600", accept: ["540"], explain: "600 − 10 % de 600 = 540." },
      { label: "M = 250", accept: ["237.5"], explain: "250 − 5 % de 250 = 250 − 12.5 = 237.5." },
      { label: "M = 100", accept: ["100"], explain: "100 < 200 : pas de remise." }
    ],
    explanation: `On repère le seuil atteint puis on retire la remise correspondante.`, correction: `540 ; 237.5 ; 100.` });
  Q({ id: "q5.3b", lesson: "l5.3", difficulty: 2, type: "qcm", points: 1,
    statement: `Dans quel cas la structure ‹Selon› est-elle adaptée ?`,
    choices: ["Tester des intervalles de réels", "Tester plusieurs valeurs précises d'une même variable discrète", "Répéter un bloc", "Lire un vecteur"], correctAnswer: 1,
    explanation: `‹Selon› compare une même variable (entier ou caractère) à plusieurs valeurs précises.`, correction: `Valeurs précises d'une même variable.` });
  Q({ id: "q5.3c", lesson: "l5.3", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Un entier ‹jour› est lu. Écris en Python (if / elif / else) : afficher « Lundi » pour 1, « Mardi » pour 2, « Mercredi » pour 3, « Autre » sinon.`,
    checks: [
      { label: "if jour == 1:", re: /(if\s+jour\s*==\s*1\s*:)|(case\s+1\s*:)/, msg: "Premier cas : if jour == 1: (avec ==).", cat: "operateur" },
      { label: "elif pour 2 et 3", re: /(elif\s+jour\s*==\s*2\s*:[^]*elif\s+jour\s*==\s*3\s*:)|(case\s+2\s*:[^]*case\s+3\s*:)/, msg: "Les cas suivants utilisent elif jour == 2: puis elif jour == 3:.", cat: "syntaxe" },
      { label: "else:", re: /else\s*:|case\s+_\s*:/, msg: "Le cas par défaut est else:.", cat: "syntaxe" }
    ],
    forbid: [{ re: /(if|elif)\s+jour\s*=\s*\d/, pen: 0.25, cat: "operateur", msg: "Pour comparer en Python on écrit « == » ; « = » est l'affectation." }],
    solution: `if jour == 1:\n    print("Lundi")\nelif jour == 2:\n    print("Mardi")\nelif jour == 3:\n    print("Mercredi")\nelse:\n    print("Autre")`,
    explanation: `Même variable testée avec plusieurs valeurs : if / elif / else (ou match).`, correction: `if jour == 1: … elif jour == 2: … elif jour == 3: … else: …` });
  Q({ id: "q5.3d", lesson: "l5.3", difficulty: 2, type: "vf", points: 1,
    statement: `L'instruction ‹match … case› n'est disponible qu'à partir de Python 3.10.`, correctAnswer: true,
    explanation: `Avant Python 3.10, il faut utiliser if / elif / else.`, correction: `Vrai.` });

  /* ---------------------------- l6.1 ---------------------------- */
  Q({ id: "q6.1a", lesson: "l6.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Afficher les 10 premiers entiers : quelle boucle choisir ?`,
    choices: ["Pour", "Tant que", "Répéter … Jusqu'à", "Aucune boucle"], correctAnswer: 0,
    explanation: `Le nombre de répétitions (10) est connu à l'avance : Pour.`, correction: `Pour.` });
  Q({ id: "q6.1b", lesson: "l6.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle boucle s'exécute **toujours au moins une fois** ?`,
    choices: ["Pour", "Tant que", "Répéter … Jusqu'à", "Aucune"], correctAnswer: 2,
    explanation: `La condition de ‹Répéter … Jusqu'à› est testée après le bloc.`, correction: `Répéter … Jusqu'à.` });
  Q({ id: "q6.1c", lesson: "l6.1", difficulty: 2, type: "qcm", points: 1,
    statement: `On additionne des nombres lus tant que l'utilisateur ne tape pas 0. Le nombre de répétitions est inconnu et peut être **nul** (test avant d'entrer). Quelle boucle ?`,
    choices: ["Pour", "Tant que", "Selon", "Aucune"], correctAnswer: 1,
    explanation: `Test préalable + nombre inconnu + 0 répétition possible : Tant que.`, correction: `Tant que.` });
  Q({ id: "q6.1d", lesson: "l6.1", difficulty: 2, type: "vf", points: 1,
    statement: `Une boucle ‹Tant que› peut ne jamais s'exécuter.`, correctAnswer: true,
    explanation: `Si la condition est fausse dès le départ, le bloc n'est jamais exécuté.`, correction: `Vrai.` });

  /* ---------------------------- l6.2 ---------------------------- */
  Q({ id: "q6.2a", lesson: "l6.2", difficulty: 1, type: "text", points: 1,
    statement: `Quelles valeurs prend ‹i› dans ‹for i in range(1, 6)› ?`,
    accept: [/^1[\s,;-]*2[\s,;-]*3[\s,;-]*4[\s,;-]*5$/], correctAnswer: "1, 2, 3, 4, 5",
    feedback: [{ re: /6/, msg: "La borne supérieure de range est exclue : 6 n'est pas atteint.", cat: "resultat" }],
    explanation: `La borne supérieure de ‹range› est exclue.`, correction: `1, 2, 3, 4, 5` });
  Q({ id: "q6.2b", lesson: "l6.2", difficulty: 1, type: "qcm", points: 1,
    statement: `Quel est l'équivalent Python de ‹Pour i de 1 à 10 Faire› ?`,
    choices: ["for i in range(1, 10):", "for i in range(1, 11):", "for i in range(10):", "for i = 1 to 10:"], correctAnswer: 1,
    explanation: `‹range(1, 11)› : 11 est exclu, donc i va de 1 à 10.`, correction: `for i in range(1, 11):` });
  Q({ id: "q6.2c", lesson: "l6.2", difficulty: 2, type: "code", mode: "python", points: 3,
    statement: `Écris en Python le programme qui affiche la table de multiplication de 5, de 5 × 1 à 5 × 10.`,
    checks: [
      { label: "Boucle for … in range(1, 11)", re: /for\s+\w+\s+in\s+range\s*\(\s*1\s*,\s*11\s*\)\s*:/, msg: "Pour aller jusqu'à 10 il faut range(1, 11) : la borne supérieure est exclue.", cat: "logique" },
      { label: "Produit de 5 par le compteur", re: /5\s*\*\s*\w+|\w+\s*\*\s*5/, msg: "Il faut calculer 5 * i.", cat: "logique" },
      { label: "Affichage avec print", re: /print\s*\(/, msg: "Il faut afficher chaque ligne avec print.", cat: "syntaxe" }
    ],
    solution: `for i in range(1, 11):\n    print("5 x", i, "=", 5 * i)`,
    explanation: `Nombre de répétitions connu : boucle for.`, correction: `for i in range(1, 11): print("5 x", i, "=", 5 * i)` });
  Q({ id: "q6.2d", lesson: "l6.2", difficulty: 2, type: "text", points: 1,
    statement: `Combien de fois s'exécute ‹Pour i de 3 à 9 Faire› ?`, accept: ["7"],
    feedback: [{ re: /^6$/, msg: "Le nombre de tours est Vf − Vi + 1 = 9 − 3 + 1 = 7 (les deux bornes comptent).", cat: "resultat" }],
    explanation: `Vf − Vi + 1 = 7.`, correction: `7` });

  /* ---------------------------- l6.3 ---------------------------- */
  Q({ id: "q6.3a", lesson: "l6.3", difficulty: 1, type: "fields", points: 2,
    statement: `Par quelle valeur initialise-t-on avant la boucle :`,
    fields: [
      { label: "une somme S", accept: ["0", "s ← 0", "s = 0"], show: "0", explain: "0 est l'élément neutre de l'addition." },
      { label: "un produit P", accept: ["1", "p ← 1", "p = 1"], show: "1", explain: "1 est l'élément neutre de la multiplication (avec 0 le produit resterait nul)." }
    ],
    explanation: `Éléments neutres : 0 pour +, 1 pour ×.`, correction: `S ← 0 ; P ← 1.` });
  Q({ id: "q6.3b", lesson: "l6.3", difficulty: 2, type: "vf", points: 1, errCat: "logique",
    statement: `Écrire ‹S ← 0› à l'intérieur de la boucle ‹Pour› est correct.`, correctAnswer: false,
    explanation: `L'accumulateur serait remis à zéro à chaque tour : on perdrait la somme déjà calculée.`, correction: `Faux : on initialise avant la boucle.` });
  Q({ id: "q6.3c", lesson: "l6.3", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Un entier ‹n› est lu. Écris en Python le code qui compte, dans ‹c›, combien d'entiers de 1 à n sont divisibles par 3, puis affiche c.`,
    checks: [
      { label: "c = 0 avant la boucle", re: /^c\s*=\s*0\s*$[^]*^for\b/m, msg: "Le compteur doit être initialisé à 0 AVANT la boucle for.", cat: "logique" },
      { label: "Test de divisibilité (% 3 == 0)", re: /%\s*3\s*==\s*0/, msg: "Un nombre est divisible par 3 si son reste par 3 vaut 0 : i % 3 == 0.", cat: "condition" },
      { label: "Incrémentation du compteur", re: /c\s*=\s*c\s*\+\s*1|c\s*\+=\s*1/, msg: "Il faut incrémenter le compteur : c = c + 1.", cat: "logique" }
    ],
    solution: `c = 0\nfor i in range(1, n + 1):\n    if i % 3 == 0:\n        c = c + 1\nprint(c)`,
    explanation: `Compteur : initialisation à 0 avant, incrément à l'intérieur sous condition.`, correction: `c = 0 ; for i in range(1, n + 1): if i % 3 == 0: c = c + 1` });
  Q({ id: "q6.3d", lesson: "l6.3", difficulty: 2, type: "text", points: 1,
    statement: `Quelle est la valeur de ‹S› à la fin de : ‹S ← 0› ; ‹Pour i de 1 à 4 Faire S ← S + i› ?`, accept: ["10"],
    explanation: `1 + 2 + 3 + 4 = 10.`, correction: `10` });

  /* ---------------------------- l6.4 ---------------------------- */
  Q({ id: "q6.4a", lesson: "l6.4", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle boucle est la plus adaptée au **contrôle d'une saisie** ?`,
    choices: ["Pour", "Répéter … Jusqu'à", "Selon", "Aucune"], correctAnswer: 1,
    explanation: `On doit lire au moins une fois puis recommencer tant que la saisie est incorrecte.`, correction: `Répéter … Jusqu'à.` });
  Q({ id: "q6.4b", lesson: "l6.4", difficulty: 2, type: "code", mode: "algo", points: 3,
    statement: `Écris la boucle algorithmique qui redemande l'entier ‹n› tant qu'il n'est pas strictement positif.`,
    checks: [
      { label: "Répéter", re: /\brepeter\b/, msg: "La boucle commence par Répéter.", cat: "syntaxe" },
      { label: "Lire(n) dans la boucle", re: /\brepeter\b[^]*lire\s*\(\s*n\s*\)/, msg: "La lecture de n doit être à l'intérieur de la boucle.", cat: "logique" },
      { label: "Jusqu'à n > 0", re: /jusqu'a\s+\(?\s*(n\s*>\s*0|0\s*<\s*n|n\s*>=\s*1)\s*\)?/, msg: "La condition d'arrêt est celle d'une saisie correcte : Jusqu'à n > 0.", cat: "condition" }
    ],
    forbid: [{ re: /jusqu'a\s+\(?\s*n\s*(<=|<)\s*0/, pen: 0.25, cat: "condition", msg: "Après « Jusqu'à » on met la condition d'ARRÊT (saisie correcte), pas la condition d'erreur." }],
    solution: `Répéter\n  Ecrire("n > 0 : "), Lire(n)\nJusqu'à n > 0`,
    explanation: `Jusqu'à décrit ce que l'on veut obtenir : un n strictement positif.`, correction: `Répéter … Lire(n) … Jusqu'à n > 0` });
  Q({ id: "q6.4c", lesson: "l6.4", difficulty: 2, type: "qcm", points: 1,
    statement: `Quel est l'équivalent Python de ‹Répéter … Jusqu'à condition› ?`,
    choices: ["for … in range()", "while True: … puis if condition: break", "if … else", "Python possède une boucle repeat"], correctAnswer: 1,
    explanation: `Python n'a pas de boucle « répéter » : on utilise while True et break.`, correction: `while True: … if condition: break` });
  Q({ id: "q6.4d", lesson: "l6.4", difficulty: 3, type: "code", points: 2,
    statement: `Écris la condition d'arrêt (après ‹Jusqu'à›) pour obtenir un entier ‹n› à **trois chiffres** (100 à 999).`,
    checks: [
      { label: "n ≥ 100", re: /n\s*>=\s*100|100\s*<=\s*n|n\s*>\s*99\b/, msg: "La borne basse est n >= 100.", cat: "condition" },
      { label: "n ≤ 999", re: /n\s*<=\s*999|999\s*>=\s*n|n\s*<\s*1000/, msg: "La borne haute est n <= 999.", cat: "condition" }
    ],
    forbid: [{ re: /\bou\b|\bor\b/, pen: 0.5, cat: "operateur", msg: "Il faut ET : les deux bornes doivent être respectées en même temps." }],
    solution: `(n >= 100) ET (n <= 999)`,
    explanation: `Intervalle = deux comparaisons reliées par ET.`, correction: `(n ≥ 100) ET (n ≤ 999)` });

  /* ---------------------------- l6.5 ---------------------------- */
  Q({ id: "q6.5a", lesson: "l6.5", difficulty: 2, type: "text", points: 1,
    statement: `Quel est le PGCD de m = 12 et n = 18 calculé par soustractions successives ?`, accept: ["6"],
    explanation: `(12,18) → (12,6) → (6,6) : le PGCD vaut 6.`, correction: `6` });
  Q({ id: "q6.5b", lesson: "l6.5", difficulty: 2, type: "qcm", points: 1,
    statement: `Que se passe-t-il si la condition d'un ‹Tant que› est fausse dès le départ ?`,
    choices: ["Le bloc s'exécute une fois", "Le bloc ne s'exécute jamais", "Une erreur est signalée", "La boucle est infinie"], correctAnswer: 1,
    explanation: `La condition est testée avant d'entrer dans le bloc.`, correction: `Le bloc ne s'exécute jamais.` });
  Q({ id: "q6.5c", lesson: "l6.5", difficulty: 3, type: "code", mode: "algo", points: 4,
    statement: `Écris l'algorithme (avec Tant que) qui calcule, dans ‹c›, le nombre de chiffres d'un entier ‹n› > 0 déjà lu.`,
    checks: [
      { label: "c ← 0 avant la boucle", re: /c\s*←\s*0[^]*tant que/, msg: "Le compteur c doit être initialisé à 0 avant la boucle.", cat: "logique" },
      { label: "Tant que n > 0", re: /tant que\s+\(?\s*(n\s*>\s*0|0\s*<\s*n|n\s*!=\s*0)\s*\)?\s*faire/, msg: "La condition de poursuite est n > 0.", cat: "condition" },
      { label: "n ← n DIV 10", re: /n\s*←\s*n\s+div\s+10/, msg: "On retire le dernier chiffre avec n ← n DIV 10.", cat: "operateur" },
      { label: "c ← c + 1", re: /c\s*←\s*c\s*\+\s*1/, msg: "On compte un chiffre à chaque tour : c ← c + 1.", cat: "logique" }
    ],
    solution: `c ← 0\nTant que n > 0 Faire\n  n ← n DIV 10\n  c ← c + 1\nFin Tant que`,
    explanation: `Chaque tour retire un chiffre ; on compte les tours.`, correction: `c ← 0 ; Tant que n > 0 Faire n ← n DIV 10 ; c ← c + 1 ; Fin Tant que` });
  Q({ id: "q6.5d", lesson: "l6.5", difficulty: 2, type: "vf", points: 1,
    statement: `Si le bloc d'un ‹Tant que› ne modifie jamais la variable testée dans la condition, la boucle peut ne jamais s'arrêter.`, correctAnswer: true,
    explanation: `La condition reste vraie à chaque test : c'est une boucle infinie.`, correction: `Vrai.` });

  /* ---------------------------- l6.6 ---------------------------- */
  Q({ id: "q6.6a", lesson: "l6.6", difficulty: 1, type: "text", points: 1,
    statement: `Que vaut 5! (factorielle de 5) ?`, accept: ["120"],
    explanation: `5! = 1 × 2 × 3 × 4 × 5 = 120.`, correction: `120` });
  Q({ id: "q6.6b", lesson: "l6.6", difficulty: 2, type: "qcm", points: 1,
    statement: `À quelle valeur initialise-t-on ‹F› avant de calculer une factorielle ?`,
    choices: ["0", "1", "n", "Aucune initialisation"], correctAnswer: 1,
    explanation: `1 est l'élément neutre de la multiplication ; avec 0 le produit resterait 0.`, correction: `F ← 1` });
  Q({ id: "q6.6c", lesson: "l6.6", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Un entier ‹n› est déjà lu. Écris en Python la boucle ‹for› qui calcule ‹F› = n!.`,
    checks: [
      { label: "F = 1 avant la boucle", re: /^f\s*=\s*1\s*$[^]*^for\b/m, msg: "F doit être initialisé à 1 avant la boucle.", cat: "logique" },
      { label: "range(…, n + 1)", re: /for\s+\w+\s+in\s+range\s*\(\s*[12]\s*,\s*n\s*\+\s*1\s*\)\s*:/, msg: "Pour inclure n il faut range(2, n + 1) (ou range(1, n + 1)).", cat: "logique" },
      { label: "F = F * i", re: /f\s*=\s*f\s*\*\s*\w+|f\s*\*=\s*\w+/, msg: "À chaque tour : F = F * i.", cat: "logique" }
    ],
    solution: `F = 1\nfor i in range(2, n + 1):\n    F = F * i`,
    explanation: `Accumulateur de produit : initialisation à 1, multiplication à chaque tour.`, correction: `F = 1 ; for i in range(2, n + 1): F = F * i` });
  Q({ id: "q6.6d", lesson: "l6.6", difficulty: 3, type: "text", points: 1,
    statement: `Pour n = 5, combien de tours exécute ‹for i in range(2, n + 1)› ?`, accept: ["4"],
    explanation: `i prend les valeurs 2, 3, 4, 5 : 4 tours.`, correction: `4` });

  /* ---------------------------- l7.1 ---------------------------- */
  Q({ id: "q7.1a", lesson: "l7.1", difficulty: 1, type: "qcm", points: 1,
    statement: `Quelle boucle parcourt **toutes** les cases d'un vecteur de N éléments (indices 0 à N−1) ?`,
    choices: ["Pour i de 1 à N", "Pour i de 0 à N", "Pour i de 0 à N-1", "Pour i de 1 à N-1"], correctAnswer: 2,
    explanation: `Les indices valides vont de 0 à N − 1.`, correction: `Pour i de 0 à N-1 (Python : range(N)).` });
  Q({ id: "q7.1b", lesson: "l7.1", difficulty: 2, type: "fields", points: 2,
    statement: `Pour ‹T = [4, 9, 2, 7, 5]›, donne :`,
    fields: [
      { label: "le maximum", accept: ["9"], explain: "9 est le plus grand élément." },
      { label: "la somme", accept: ["27"], explain: "4 + 9 + 2 + 7 + 5 = 27." }
    ],
    explanation: `On parcourt le vecteur : maximum = 9 ; somme = 27.`, correction: `9 et 27.` });
  Q({ id: "q7.1c", lesson: "l7.1", difficulty: 3, type: "code", mode: "python", points: 3,
    statement: `Un vecteur ‹T› de 5 entiers est déjà rempli. Écris en Python le code qui calcule dans ‹S› la somme de ses éléments puis l'affiche.`,
    checks: [
      { label: "S = 0 avant la boucle", re: /^s\s*=\s*0\s*$[^]*^for\b/m, msg: "S doit être initialisé à 0 avant la boucle.", cat: "logique" },
      { label: "Parcours du vecteur", any: [/for\s+\w+\s+in\s+range\s*\(\s*(5|len\s*\(\s*t\s*\))\s*\)\s*:/, /for\s+\w+\s+in\s+t\s*:/], msg: "Il faut parcourir les 5 cases : for i in range(5):.", cat: "logique" },
      { label: "S = S + T[i]", re: /s\s*=\s*s\s*\+\s*(t\s*\[\s*\w+\s*\]|\w+)|s\s*\+=\s*(t\s*\[\s*\w+\s*\]|\w+)/, msg: "À chaque tour on ajoute la case : S = S + T[i].", cat: "logique" }
    ],
    solution: `S = 0\nfor i in range(5):\n    S = S + T[i]\nprint(S)`,
    explanation: `Accumulateur de somme + parcours complet.`, correction: `S = 0 ; for i in range(5): S = S + T[i]` });
  Q({ id: "q7.1d", lesson: "l7.1", difficulty: 3, type: "code", mode: "python", points: 4,
    statement: `Un vecteur ‹T› de ‹N› entiers est déjà rempli. Écris en Python le code qui compte dans ‹c› le nombre d'éléments **supérieurs à 10**, puis affiche c.`,
    checks: [
      { label: "c = 0 avant la boucle", re: /^c\s*=\s*0\s*$[^]*^for\b/m, msg: "Le compteur c doit être initialisé à 0 avant la boucle.", cat: "logique" },
      { label: "Parcours de N cases", any: [/for\s+\w+\s+in\s+range\s*\(\s*(n|len\s*\(\s*t\s*\))\s*\)\s*:/, /for\s+\w+\s+in\s+t\s*:/], msg: "Il faut parcourir les N cases : for i in range(N):.", cat: "logique" },
      { label: "Test T[i] > 10", re: /if\s+(t\s*\[\s*\w+\s*\]|\w+)\s*>\s*10\s*:/, msg: "La condition est if T[i] > 10: (strictement supérieur).", cat: "condition" },
      { label: "c = c + 1", re: /c\s*=\s*c\s*\+\s*1|c\s*\+=\s*1/, msg: "On incrémente le compteur : c = c + 1.", cat: "logique" }
    ],
    solution: `c = 0\nfor i in range(N):\n    if T[i] > 10:\n        c = c + 1\nprint(c)`,
    explanation: `Compteur + parcours + condition sur chaque case.`, correction: `c = 0 ; for i in range(N): if T[i] > 10: c = c + 1` });

  /* ---------------------------- l8.1 (bonus) ---------------------------- */
  Q({ id: "q8.1a", lesson: "l8.1", difficulty: 2, type: "qcm", points: 1,
    statement: `**Bonus.** Quel mot-clé Python définit une fonction ?`,
    choices: ["function", "def", "fun", "define"], correctAnswer: 1,
    explanation: `Une fonction Python commence par ‹def nom(parametres):›.`, correction: `def` });
  Q({ id: "q8.1b", lesson: "l8.1", difficulty: 2, type: "vf", points: 1,
    statement: `**Bonus.** Dans une fonction Python, ‹return› renvoie une valeur à l'appelant.`, correctAnswer: true,
    explanation: `‹return› renvoie le résultat et termine la fonction.`, correction: `Vrai.` });
})(window.DATA);
