/* Cours — Chapitres 6, 7 et 8 */
(function (D) {
  const L = (o) => D.lessons.push(o);

  /* ------------------------------------------------------------------ C6 */
  L({
    id: "l6.1", chapter: "c6", title: "Choisir la bonne boucle", duree: "12 min", niveau: 1,
    concept: `Une **structure itérative** (ou **boucle**) répète un bloc d'instructions plusieurs fois sans avoir à réécrire le code. Il existe trois boucles ; le bon choix dépend de ce qu'on sait du nombre de répétitions.`,
    memorize: [
      `**Pour … Faire** : nombre de répétitions **connu** à l'avance.`,
      `**Répéter … Jusqu'à** : nombre **inconnu**, avec **contrôle de saisie** ; s'exécute **au moins une fois**.`,
      `**Tant que … Faire** : nombre **inconnu**, avec **test préalable** ; peut s'exécuter **0 fois**.`
    ],
    understand: [
      `Pour : le compteur est géré automatiquement. Répéter : la condition est testée **après** le bloc. Tant que : la condition est testée **avant** le bloc.`,
      `Python n'a pas de boucle « répéter » : on la simule avec ‹while True:› et ‹break›.`
    ],
    rule: `Nombre connu → **Pour**. Il faut redemander tant que la saisie est mauvaise → **Répéter … Jusqu'à**. Sinon, test avant d'entrer → **Tant que**.`,
    tables: [
      {
        title: "Guide de choix entre les 3 boucles",
        head: ["Structure", "Quand l'utiliser ?", "Nombre de répétitions", "Exécution au moins 1 fois ?"],
        rows: [
          ["Pour … Faire", "Nombre de répétitions CONNU à l'avance", "Fixe et déterminé", "Seulement si Vi ≤ Vf"],
          ["Répéter … Jusqu'à", "Nombre INCONNU + contrôle de saisie", "Variable", "OUI, toujours au moins 1 fois"],
          ["Tant que … Faire", "Nombre INCONNU + test préalable", "Variable", "NON (0 ou plusieurs fois)"]
        ]
      },
      {
        title: "Correspondances Algorithme / Python",
        head: ["Algorithme", "Python"],
        rows: [
          ["Pour i de Vi à Vf Faire", "for i in range(Vi, Vf + 1):"],
          ["Tant que condition Faire", "while condition:"],
          ["Répéter … Jusqu'à condition", "while True: … if condition: break"]
        ]
      }
    ],
    application: {
      enonce: `Quelle boucle choisir : (a) afficher les 10 premiers entiers ; (b) redemander un mot de passe tant qu'il est faux ; (c) diviser un nombre par 10 tant qu'il est supérieur à 0 ?`,
      solution: `(a) Pour (nombre connu : 10) ; (b) Répéter … Jusqu'à (contrôle de saisie, au moins une fois) ; (c) Tant que (nombre inconnu, test préalable).`
    },
    errors: [
      `Utiliser ‹Pour› quand on ne connaît pas le nombre de répétitions.`,
      `Croire qu'un ‹Tant que› s'exécute toujours au moins une fois.`,
      `Écrire ‹Pour i de 5 à 1› en espérant compter à l'envers (le bloc ne s'exécute pas : Vi > Vf).`
    ],
    devoir: [`« Choisir la structure itérative adaptée à chaque situation. Justifier. »`],
    express: `Nombre connu → Pour. Contrôle de saisie → Répéter…Jusqu'à (≥ 1 fois). Test préalable → Tant que (0 fois possible).`,
    express_ar: `عدد التكرارات معروف ← ‹Pour›. مراقبة الإدخال ← ‹Répéter … Jusqu'à› (مرة واحدة على الأقل). اختبار قبل الدخول ← ‹Tant que› (قد لا تُنفَّذ أبدًا).`
  });

  L({
    id: "l6.2", chapter: "c6", title: "La boucle Pour", duree: "15 min", niveau: 1,
    concept: `La boucle ‹Pour› fait varier un **compteur** automatiquement de la borne inférieure **Vi** à la borne supérieure **Vf**, en répétant le bloc pour chaque valeur.`,
    memorize: [
      `Algorithme : ‹Pour i de Vi à Vf Faire … Fin Pour›. Le compteur prend les valeurs Vi, Vi+1, …, Vf.`,
      `Nombre de répétitions : **Vf − Vi + 1** (si Vi ≤ Vf).`,
      `Python : ‹for i in range(Vi, Vf + 1):›. **La borne supérieure de ‹range› est exclue** (d'où le « + 1 »).`
    ],
    understand: [
      `On ne modifie pas le compteur à l'intérieur de la boucle : c'est la boucle qui s'en occupe.`,
      `‹range(1, 11)› produit 1, 2, …, 10 : il s'arrête avant 11.`,
      `‹range(n)› produit 0, 1, …, n − 1 : pratique pour parcourir un vecteur de n cases.`
    ],
    rule: `‹Pour i de a à b› ↔ ‹for i in range(a, b + 1)› : **b + 1**, car la borne de ‹range› est exclue.`,
    tables: [{
      title: "Trace de Pour i de 1 à 3 Faire Ecrire(7 * i)",
      head: ["Tour", "i", "7 * i", "Affichage"],
      rows: [["1", "1", "7", "7 x 1 = 7"], ["2", "2", "14", "7 x 2 = 14"], ["3", "3", "21", "7 x 3 = 21"]]
    }],
    notes: [{ kind: "bonus", title: "Compter à l'envers ou de 2 en 2 (Python)", text: `‹range(10, 0, -1)› compte de 10 à 1 ; ‹range(0, 10, 2)› donne 0, 2, 4, 6, 8. Le troisième argument est le **pas**.` }],
    examples: [{
      titre: "Table de multiplication",
      enonce: `Lire un entier n et afficher sa table de multiplication de 1 à 10.`,
      donnees: [`‹n› : un entier`],
      traitement: `Répéter 10 fois : afficher ‹n * i› pour ‹i› de 1 à 10`,
      resultat: `Les 10 lignes de la table`,
      tdo: [["n", "Entier"], ["i", "Entier"]],
      algo: `Algorithme Table
Début
  Ecrire("n = "), Lire(n)
  Pour i de 1 à 10 Faire
    Ecrire(n, " x ", i, " = ", n * i)
  Fin Pour
Fin`,
      python: `n = int(input("n = "))
for i in range(1, 11):
    print(n, "x", i, "=", n * i)`,
      explication: [
        `Le nombre de tours est connu (10) : c'est le cas typique de la boucle ‹Pour›.`,
        `‹range(1, 11)› s'arrête avant 11 : la borne supérieure est exclue en Python.`
      ],
      execution: `Entrée : n = 7\nSortie : 7 x 1 = 7 … 7 x 10 = 70 (10 lignes)`
    }],
    application: {
      enonce: `Que produit ‹range(1, 6)› ? Combien de fois s'exécute ‹Pour i de 3 à 9› ?`,
      solution: `range(1, 6) → 1, 2, 3, 4, 5. Pour i de 3 à 9 → 9 − 3 + 1 = 7 répétitions.`
    },
    errors: [
      `Écrire ‹range(1, 10)› pour aller jusqu'à 10 : on obtient seulement 1…9.`,
      `Modifier le compteur ‹i› dans la boucle.`,
      `Oublier ‹Fin Pour› ou l'indentation en Python.`
    ],
    devoir: [`« Afficher une table, une suite ou un motif avec une boucle Pour. »`, `« Traduire en Python. »`],
    express: `‹Pour i de a à b› ↔ ‹for i in range(a, b+1)›. Répétitions : b − a + 1. Borne de ‹range› exclue.`,
    express_ar: `‹Pour i de a à b› تقابل ‹for i in range(a, b+1)›. عدد التكرارات ‹b − a + 1›. الحد الأعلى في ‹range› غير مشمول.`
  });

  L({
    id: "l6.3", chapter: "c6", title: "Compteur, accumulateur et initialisation", duree: "18 min", niveau: 2,
    concept: `Dans la plupart des boucles, une variable évolue à chaque tour : un **compteur** (combien de fois ?), un **accumulateur de somme** (additionner) ou un **accumulateur de produit** (multiplier). Sa valeur de départ s'appelle l'**initialisation** et se fait **avant** la boucle.`,
    memorize: [
      `**Compteur** : ‹c ← 0› avant la boucle, puis ‹c ← c + 1› dans la boucle.`,
      `**Somme** : ‹S ← 0› avant, puis ‹S ← S + x› dans la boucle.`,
      `**Produit / factorielle** : ‹P ← 1› avant, puis ‹P ← P * i› dans la boucle.`
    ],
    understand: [
      `Pourquoi 0 pour une somme et 1 pour un produit ? Parce que ce sont les **éléments neutres** : ‹S + 0 = S› et ‹P × 1 = P›.`,
      `Initialiser **dans** la boucle est une erreur grave : la valeur serait remise à zéro à chaque tour.`
    ],
    rule: `**Initialiser avant, modifier dedans.** Somme → 0 ; produit → 1 ; compteur → 0.`,
    tables: [{
      title: "Trace de S pour n = 4 (Pour i de 1 à 4 : S ← S + i)",
      head: ["Tour", "i", "S avant", "S après"],
      rows: [["départ", "—", "—", "0"], ["1", "1", "0", "1"], ["2", "2", "1", "3"], ["3", "3", "3", "6"], ["4", "4", "6", "10"]]
    }],
    notes: [{ kind: "trap", title: "Initialisations obligatoires AVANT la boucle", text: `Compteur : ‹c ← 0›. Accumulateur de somme : ‹S ← 0›. Accumulateur de produit : ‹P ← 1›. **Initialiser la variable DANS la boucle est une erreur grave** : la valeur serait réinitialisée à chaque tour.` }],
    snippets: [{
      title: "Compter les multiples de 3 entre 1 et n",
      lang: "py",
      code: `n = int(input("n = "))
c = 0                       # compteur initialisé AVANT la boucle
for i in range(1, n + 1):
    if i % 3 == 0:
        c = c + 1           # on compte
print("Nombre de multiples de 3 :", c)`
    }],
    examples: [{
      titre: "Somme des entiers de 1 à n",
      enonce: `Lire un entier n et afficher la somme 1 + 2 + … + n.`,
      donnees: [`‹n› : un entier positif`],
      traitement: `‹S ← 0› puis, pour ‹i› de 1 à n : ‹S ← S + i›`,
      resultat: `‹S› : la somme`,
      tdo: [["n", "Entier"], ["i", "Entier"], ["S", "Entier"]],
      algo: `Algorithme SommeEntiers
Début
  Ecrire("n = "), Lire(n)
  S ← 0
  Pour i de 1 à n Faire
    S ← S + i
  Fin Pour
  Ecrire("Somme = ", S)
Fin`,
      python: `n = int(input("n = "))
S = 0
for i in range(1, n + 1):
    S = S + i
print("Somme =", S)`,
      explication: [
        `‹S ← 0› est **avant** le ‹Pour› : sinon S serait remis à zéro à chaque tour.`,
        `À chaque tour, ‹S ← S + i› ajoute le compteur à la somme accumulée.`
      ],
      execution: `Entrée : n = 4\nS : 0 → 1 → 3 → 6 → 10\nSortie : Somme = 10`
    }],
    application: {
      enonce: `Quelle est la valeur de ‹S› à la fin de ‹S ← 0› ; ‹Pour i de 1 à 5 Faire S ← S + i * i›, et que faut-il initialiser avant de calculer un produit ?`,
      solution: `S = 1 + 4 + 9 + 16 + 25 = 55. Pour un produit, on initialise à 1 (‹P ← 1›).`
    },
    errors: [
      `Initialiser l'accumulateur dans la boucle.`,
      `Initialiser un produit à 0 : tout le produit resterait 0.`,
      `Oublier d'initialiser (variable utilisée sans valeur).`,
      `Se tromper de variable : ‹S ← S + S› au lieu de ‹S ← S + i›.`
    ],
    devoir: [`« Calculer une somme, un produit ou un nombre d'occurrences à l'aide d'une boucle. »`, `« Repérer l'erreur d'initialisation. »`],
    express: `Initialiser AVANT la boucle : compteur ‹c ← 0›, somme ‹S ← 0›, produit ‹P ← 1›. Dans la boucle : ‹c ← c+1›, ‹S ← S+x›, ‹P ← P*i›.`,
    express_ar: `نُهيّئ المتغير قبل الحلقة: العداد ‹c ← 0› والمجموع ‹S ← 0› والجداء ‹P ← 1›. داخل الحلقة: ‹c ← c+1› و‹S ← S+x› و‹P ← P*i›.`
  });

  L({
    id: "l6.4", chapter: "c6", title: "La boucle Répéter … Jusqu'à (contrôle de saisie)", duree: "15 min", niveau: 2,
    concept: `La boucle ‹Répéter … Jusqu'à› exécute son bloc **au moins une fois** puis teste la condition d'arrêt. Elle sert principalement à **valider une saisie** : on redemande la donnée jusqu'à ce qu'elle soit correcte.`,
    memorize: [
      `Algorithme : ‹Répéter … Jusqu'à condition›. On s'arrête quand la condition devient **Vraie**.`,
      `La condition est celle d'une saisie **correcte**.`,
      `Python : ‹while True:› + ‹if condition: break›.`
    ],
    understand: [
      `Tant que la condition est fausse, on recommence ; dès qu'elle est vraie, on sort.`,
      `La condition est écrite **après** le bloc, et décrit ce qu'on **veut** obtenir (par exemple ‹(n ≥ 10) ET (n ≤ 99)›).`,
      `Python n'ayant pas de ‹répéter›, ‹while True› crée une boucle infinie que ‹break› interrompt.`
    ],
    rule: `**Répéter** {lire la donnée} **Jusqu'à** {la donnée est valide}.`,
    snippets: [{
      title: "Contrôle de saisie : un entier à 2 chiffres",
      lang: "algo",
      code: `# Algorithme
Répéter
  Ecrire("Saisir un entier n (10 à 99) : "), Lire(n)
Jusqu'à (n >= 10) ET (n <= 99)

# Python équivalent
while True:
    n = int(input("Saisir un entier n (10 à 99) : "))
    if 10 <= n <= 99:
        break`
    }],
    examples: [{
      titre: "Saisie d'une note valide",
      enonce: `Lire une note comprise entre 0 et 20 (bornes incluses). Tant que la saisie n'est pas valide, la redemander, puis afficher la note validée.`,
      donnees: [`‹note› : une note réelle comprise entre 0 et 20`],
      traitement: `Répéter la lecture jusqu'à ‹(note >= 0) ET (note <= 20)›`,
      resultat: `La note validée`,
      tdo: [["note", "Réel"]],
      algo: `Algorithme NoteValide
Début
  Répéter
    Ecrire("Note (0 à 20) : "), Lire(note)
  Jusqu'à (note >= 0) ET (note <= 20)
  Ecrire("Note validée : ", note)
Fin`,
      python: `while True:
    note = float(input("Note (0 à 20) : "))
    if 0 <= note <= 20:
        break
print("Note validée :", note)`,
      explication: [
        `La lecture est dans la boucle : on est sûr de la faire au moins une fois.`,
        `La condition ‹Jusqu'à› décrit une note **correcte** ; la boucle continue tant qu'elle est fausse.`
      ],
      execution: `Entrées successives : 25 → refusée ; -3 → refusée ; 14 → acceptée\nSortie : Note validée : 14.0`
    }],
    application: {
      enonce: `Écris en algorithme la boucle qui redemande un entier n tant qu'il n'est pas strictement positif.`,
      solution: `Répéter\n  Ecrire("n > 0 : "), Lire(n)\nJusqu'à n > 0`
    },
    errors: [
      `Écrire la condition de **répétition** au lieu de la condition d'**arrêt** (inverser le sens).`,
      `Oublier le ‹break› : la boucle Python ne s'arrête jamais.`,
      `Mettre la lecture avant la boucle et pas dedans.`,
      `Écrire ‹Jusqu'à 10 ≤ n ≤ 99› en algorithme au lieu de ‹(n ≥ 10) ET (n ≤ 99)›.`
    ],
    devoir: [`« Contrôler la saisie d'une donnée (intervalle, signe, nombre de chiffres). »`, `« Donner la condition d'arrêt. »`],
    express: `‹Répéter … Jusqu'à cond› : bloc exécuté ≥ 1 fois ; cond = saisie VALIDE. Python : ‹while True:› + ‹break›.`,
    express_ar: `‹Répéter … Jusqu'à cond›: يُنفَّذ الجزء مرة واحدة على الأقل، والشرط هو شرط الإدخال الصحيح. في بايثون: ‹while True:› مع ‹break›.`
  });

  L({
    id: "l6.5", chapter: "c6", title: "La boucle Tant que : le PGCD par soustractions", duree: "18 min", niveau: 3,
    concept: `La boucle ‹Tant que› teste sa condition **avant** d'entrer dans le bloc. Elle peut donc s'exécuter **0 fois**, une fois ou plusieurs. Elle convient quand on ne sait pas à l'avance combien de tours seront nécessaires.`,
    memorize: [
      `Algorithme : ‹Tant que condition Faire … Fin Tant que›. Python : ‹while condition:›.`,
      `On **continue** tant que la condition est **Vraie**.`,
      `Le bloc doit **modifier** une variable de la condition, sinon la boucle est **infinie**.`
    ],
    understand: [
      `Si la condition est fausse dès le départ, le bloc n'est jamais exécuté.`,
      `Le PGCD par soustractions : tant que les deux nombres sont différents, on soustrait le plus petit du plus grand. Quand ils sont égaux, c'est le PGCD.`,
      `Les deux nombres doivent être **strictement positifs** : avec 0, la boucle ne se terminerait jamais.`
    ],
    rule: `**Tant que** {on doit continuer} **Faire** {traitement qui rapproche de la fin}.`,
    tables: [{
      title: "Trace du PGCD pour m = 12 et n = 18",
      head: ["Étape", "m", "n", "m ≠ n ?", "Action"],
      rows: [
        ["départ", "12", "18", "Vrai", "n > m → n ← n − m"],
        ["1", "12", "6", "Vrai", "m > n → m ← m − n"],
        ["2", "6", "6", "Faux", "arrêt : PGCD = 6"]
      ]
    }],
    notes: [{ kind: "trap", title: "Boucle infinie", text: `Si le bloc ne modifie jamais ce qui est testé (par exemple on oublie ‹n ← n DIV 10›), la condition reste vraie pour toujours et le programme ne s'arrête plus.` }],
    snippets: [{
      title: "Nombre de chiffres d'un entier (Tant que)",
      lang: "algo",
      code: `# Algorithme
c ← 0
Tant que n > 0 Faire
  n ← n DIV 10
  c ← c + 1
Fin Tant que

# Python
c = 0
while n > 0:
    n = n // 10
    c = c + 1`
    }],
    examples: [{
      titre: "PGCD de deux entiers par soustractions successives",
      enonce: `Lire deux entiers strictement positifs m et n et afficher leur PGCD.`,
      donnees: [`‹m› et ‹n› : deux entiers strictement positifs`],
      traitement: `Tant que ‹m ≠ n› : soustraire le plus petit du plus grand`,
      resultat: `‹m› (égal à ‹n› à la fin) : le PGCD`,
      tdo: [["m", "Entier"], ["n", "Entier"]],
      algo: `Algorithme PGCD
Début
  Ecrire("m = "), Lire(m)
  Ecrire("n = "), Lire(n)
  Tant que m ≠ n Faire
    Si m > n alors
      m ← m - n
    Sinon
      n ← n - m
    Fin Si
  Fin Tant que
  Ecrire("PGCD = ", m)
Fin`,
      python: `m = int(input("m = "))
n = int(input("n = "))
while m != n:
    if m > n:
        m = m - n
    else:
        n = n - m
print("PGCD =", m)`,
      explication: [
        `La condition ‹m ≠ n› est testée **avant** chaque tour : si m et n sont égaux dès le départ, on n'entre jamais dans la boucle.`,
        `À chaque tour, la plus grande valeur diminue : la boucle finit forcément par s'arrêter.`,
        `L'opérateur ‹≠› s'écrit ‹!=› en Python.`
      ],
      execution: `Entrées : m = 12 ; n = 18\n(12,18) → (12,6) → (6,6) → arrêt\nSortie : PGCD = 6`
    }],
    application: {
      enonce: `Écris l'algorithme (Tant que) qui calcule le nombre de chiffres c d'un entier n > 0.`,
      solution: `c ← 0\nTant que n > 0 Faire\n  n ← n DIV 10\n  c ← c + 1\nFin Tant que`
    },
    errors: [
      `Oublier de modifier la variable de la condition → boucle infinie.`,
      `Utiliser ‹!=› dans l'algorithme au lieu de ‹≠› (ou ‹≠› en Python).`,
      `Initialiser le compteur dans la boucle.`,
      `Lancer le PGCD avec 0 ou un nombre négatif.`
    ],
    devoir: [`« Écrire un algorithme avec Tant que (nombre de chiffres, PGCD, somme des chiffres). »`, `« Faire la trace d'un Tant que. »`],
    express: `‹Tant que cond Faire … Fin Tant que› : test AVANT, 0 tour possible ; il faut modifier la condition dans le bloc. PGCD : on soustrait tant que ‹m ≠ n›.`,
    express_ar: `‹Tant que cond Faire …›: يُختبر الشرط قبل الدخول وقد لا تُنفَّذ الحلقة أبدًا، ويجب تغيير متغير الشرط داخل الحلقة وإلا صارت لا نهائية. القاسم المشترك الأكبر {PGCD}: نطرح الأصغر من الأكبر ما دام ‹m ≠ n›.`
  });

  L({
    id: "l6.6", chapter: "c6", title: "Exercice de synthèse : la factorielle avec contrôle", duree: "20 min", niveau: 3,
    concept: `Cet exercice réunit deux boucles : un ‹Répéter› pour contrôler la saisie, puis un ‹Pour› avec un **accumulateur de produit** pour calculer n! = 1 × 2 × … × n.`,
    memorize: [
      `n! = 1 × 2 × … × n (et 0! = 1 par convention).`,
      `Accumulateur de produit : ‹F ← 1› **avant** la boucle.`,
      `Contrôle : ‹Répéter … Jusqu'à (n ≥ 1) ET (n ≤ 10)›.`
    ],
    understand: [
      `On limite n à 10 pour que le résultat reste raisonnable : 10! = 3 628 800.`,
      `Python : ‹range(2, n + 1)› suffit, car multiplier par 1 ne change rien ; ‹range(1, n + 1)› marche aussi.`
    ],
    rule: `Contrôler d'abord, calculer ensuite : **Répéter / Jusqu'à** puis **Pour** avec **F ← 1**.`,
    examples: [{
      titre: "Factorielle avec contrôle de saisie",
      enonce: `Saisir un entier n compris entre 1 et 10, puis calculer et afficher sa factorielle n!.`,
      donnees: [`‹n› : un entier compris entre 1 et 10`],
      traitement: `‹F ← 1› puis, pour ‹i› de 2 à n : ‹F ← F * i›`,
      resultat: `‹F› : la factorielle de n`,
      tdo: [["n", "Entier"], ["i", "Entier"], ["F", "Entier"]],
      algo: `Algorithme Factorielle
Début
  Répéter
    Ecrire("Donner n (entre 1 et 10) : "), Lire(n)
  Jusqu'à (n >= 1) ET (n <= 10)
  F ← 1
  Pour i de 2 à n Faire
    F ← F * i
  Fin Pour
  Ecrire(n, " ! = ", F)
Fin`,
      python: `while True:
    n = int(input("Donner n (entre 1 et 10) : "))
    if 1 <= n <= 10:
        break

F = 1
for i in range(2, n + 1):
    F = F * i

print(n, "! =", F)`,
      explication: [
        `Première partie : contrôle de saisie (Répéter / ‹while True›).`,
        `Deuxième partie : accumulateur de produit initialisé à 1 avant le ‹Pour›.`,
        `Pour n = 1, ‹range(2, 2)› est vide : F reste 1, ce qui est correct (1! = 1).`
      ],
      execution: `Entrée : n = 5\nF : 1 → 2 → 6 → 24 → 120\nSortie : 5 ! = 120`
    }],
    application: {
      enonce: `Écris en Python la boucle qui calcule ‹F› = n! pour un entier ‹n› déjà lu.`,
      solution: `F = 1\nfor i in range(2, n + 1):\n    F = F * i`
    },
    errors: [
      `Initialiser ‹F› à 0 : le produit reste nul.`,
      `Écrire ‹range(2, n)› : on oublie de multiplier par n.`,
      `Calculer la factorielle sans contrôler la saisie (un n négatif donnerait un résultat absurde).`
    ],
    devoir: [`« Écrire le programme complet : contrôle de saisie puis calcul. »`, `« Donner la trace pour n = 4. »`],
    express: `Factorielle : contrôle (‹Répéter›), puis ‹F ← 1› et ‹Pour i de 2 à n : F ← F * i›. Python : ‹range(2, n + 1)›.`,
    express_ar: `المضروب {(factorielle)}: نراقب الإدخال بـ ‹Répéter› ثم ‹F ← 1› و‹Pour i de 2 à n : F ← F * i›. في بايثون: ‹range(2, n + 1)›.`
  });

  /* ------------------------------------------------------------------ C7 */
  L({
    id: "l7.1", chapter: "c7", title: "Parcourir un vecteur : remplir, somme, maximum, comptage", duree: "20 min", niveau: 3,
    concept: `Un vecteur de N cases se **parcourt** avec une boucle ‹Pour› dont le compteur est l'**indice** : ‹Pour i de 0 à N−1›. On l'utilise pour remplir, afficher, additionner, chercher un maximum ou compter des éléments.`,
    memorize: [
      `Parcours : ‹Pour i de 0 à N-1 Faire … T[i] … Fin Pour› ↔ ‹for i in range(N):›.`,
      `Somme : ‹S ← 0› avant, puis ‹S ← S + T[i]›.`,
      `Maximum : ‹maxi ← T[0]› puis on compare chaque case : ‹Si T[i] > maxi alors maxi ← T[i]›.`,
      `Comptage : ‹c ← 0› avant, puis ‹c ← c + 1› quand la case vérifie la condition.`
    ],
    understand: [
      `Le maximum est **initialisé avec la première case** (et non avec 0, qui échouerait si tous les nombres sont négatifs).`,
      `Pour N cases, ‹range(N)› produit exactement les indices 0 … N−1.`,
      `Évite de nommer une variable ‹max› ou ‹min› en Python : ce sont des fonctions existantes.`
    ],
    rule: `Parcours complet d'un vecteur de N cases : indice de **0 à N − 1** ; en Python **‹range(N)›**.`,
    tables: [{
      title: "Modèles de parcours",
      head: ["But", "Avant la boucle", "Dans la boucle"],
      rows: [
        ["Remplir", "—", "Lire(T[i])"],
        ["Somme", "S ← 0", "S ← S + T[i]"],
        ["Comptage", "c ← 0", "Si condition sur T[i] alors c ← c + 1"],
        ["Maximum", "maxi ← T[0]", "Si T[i] > maxi alors maxi ← T[i]"]
      ]
    }],
    snippets: [{
      title: "Somme des éléments d'un vecteur de 5 entiers (Python)",
      lang: "py",
      code: `S = 0
for i in range(5):
    S = S + T[i]
print("Somme =", S)`
    }],
    notes: [{ kind: "verify", title: "Place de ce chapitre dans le programme", text: `Remplir et parcourir un vecteur avec une boucle est la suite logique des chapitres 4 et 6. Selon l'organisation de l'année par ton enseignant, ces exercices peuvent arriver plus tôt ou plus tard : le contenu reste le même.` }],
    examples: [{
      titre: "Maximum d'un vecteur de 5 entiers",
      enonce: `Lire 5 entiers dans un vecteur T puis afficher le plus grand.`,
      donnees: [`‹T› : 5 entiers saisis`],
      traitement: `‹maxi ← T[0]› puis comparer chaque case suivante à ‹maxi›`,
      resultat: `‹maxi› : le plus grand élément`,
      tdo: [["T", "tableau de 5 entiers"], ["i", "Entier"], ["maxi", "Entier"]],
      algo: `Algorithme Maximum
Début
  Pour i de 0 à 4 Faire
    Ecrire("T[", i, "] = "), Lire(T[i])
  Fin Pour
  maxi ← T[0]
  Pour i de 1 à 4 Faire
    Si T[i] > maxi alors
      maxi ← T[i]
    Fin Si
  Fin Pour
  Ecrire("Le maximum est : ", maxi)
Fin`,
      python: `T = [0] * 5
for i in range(5):
    T[i] = int(input("T[" + str(i) + "] = "))

maxi = T[0]
for i in range(1, 5):
    if T[i] > maxi:
        maxi = T[i]
print("Le maximum est :", maxi)`,
      explication: [
        `Première boucle : on remplit les 5 cases (indices 0 à 4).`,
        `Deuxième boucle : elle commence à 1 car ‹T[0]› est déjà dans ‹maxi›.`,
        `Dans ‹input›, on convertit l'indice avec ‹str(i)› pour pouvoir le concaténer au texte.`
      ],
      execution: `T = [4, 9, 2, 7, 5]\nmaxi : 4 → 9 (à i = 1) → reste 9\nSortie : Le maximum est : 9`
    }],
    application: {
      enonce: `Pour ‹T = [4, 9, 2, 7, 5]›, donne la somme et le maximum.`,
      solution: `Somme = 4 + 9 + 2 + 7 + 5 = 27 ; maximum = 9.`
    },
    errors: [
      `Écrire ‹Pour i de 1 à N› : l'indice N n'existe pas et ‹T[0]› est oublié.`,
      `Initialiser le maximum à 0 (faux si toutes les valeurs sont négatives).`,
      `Initialiser la somme ou le compteur dans la boucle.`,
      `Nommer la variable ‹max› en Python (elle masque la fonction ‹max›).`
    ],
    devoir: [`« Remplir un vecteur puis calculer la somme / la moyenne / le maximum. »`, `« Compter les éléments qui vérifient une condition. »`],
    express: `Parcours : ‹Pour i de 0 à N-1› ↔ ‹range(N)›. Somme : ‹S ← 0›. Maximum : ‹maxi ← T[0]›. Comptage : ‹c ← 0›.`,
    express_ar: `نجتاز المتجه بحلقة ‹Pour i de 0 à N-1› (تقابل ‹range(N)›). المجموع: ‹S ← 0›. الأكبر: ‹maxi ← T[0]›. العدّ: ‹c ← 0›.`
  });

  /* ------------------------------------------------------------------ C8 */
  L({
    id: "l8.1", chapter: "c8", title: "Bonus : les fonctions (sous-programmes)", duree: "10 min", niveau: 3, bonus: true,
    concept: `Une **fonction** est un petit programme nommé qui reçoit des **paramètres** et **renvoie** un résultat. Elle évite de recopier du code. Ce sujet n'est pas exigé en 2ème année : il est proposé pour approfondir.`,
    memorize: [
      `Python : ‹def nom(parametres):› puis un bloc indenté qui se termine par ‹return résultat›.`,
      `Appel : ‹r = nom(valeur)›.`,
      `Les variables créées dans la fonction sont **locales** : elles n'existent pas en dehors.`
    ],
    understand: [
      `La fonction ne s'exécute que lorsqu'on l'**appelle**.`,
      `‹return› renvoie une valeur et arrête la fonction ; ‹print› se contente d'afficher.`
    ],
    rule: `**Définir une fois, appeler autant que nécessaire.**`,
    notes: [{ kind: "verify", title: "Syntaxe algorithmique des fonctions", text: `L'écriture algorithmique exacte (mots-clés, T.D.O local) varie selon les manuels. Ici on donne uniquement la forme Python, qui est la plus sûre. Demande à ton enseignant la syntaxe attendue en algorithme.` }],
    snippets: [{
      title: "Fonction carré (Python)",
      lang: "py",
      code: `def carre(x):
    return x * x

a = int(input("a = "))
print("Le carré de", a, "est", carre(a))`
    }],
    application: {
      enonce: `Écris une fonction Python ‹double(x)› qui renvoie le double de x.`,
      solution: `def double(x):\n    return 2 * x`
    },
    errors: [
      `Oublier ‹return› : la fonction renvoie ‹None›.`,
      `Confondre ‹print› et ‹return›.`,
      `Oublier les deux-points ou l'indentation après ‹def›.`
    ],
    devoir: [`Hors programme : ce sujet ne figure normalement pas dans un devoir de 2ème année.`],
    express: `‹def nom(p): return résultat›. Hors programme en 2ème année (bonus).`,
    express_ar: `‹def nom(p): return résultat›. موضوع إضافي خارج برنامج السنة الثانية.`
  });
})(window.DATA);
