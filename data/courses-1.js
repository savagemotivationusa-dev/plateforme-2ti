/* Cours — Chapitres 0, 1 et 2 */
(function (D) {
  const L = (o) => D.lessons.push(o);

  /* ------------------------------------------------------------------ C0 */
  L({
    id: "l0.1", chapter: "c0", title: "Analyser un problème : Résultat, Données, Traitement", duree: "10 min", niveau: 1,
    concept: `Résoudre un problème avec un ordinateur, c'est le décomposer en étapes que la machine peut exécuter sans réfléchir. On passe par cinq étapes : l'**Analyse** du problème, l'écriture de l'**Algorithme**, l'**Implémentation** (traduction en Python), l'**Exécution** du programme et le **Test** avec des valeurs dont on connaît la réponse.`,
    memorize: [
      `**Résultat** : ce que le programme doit afficher (la réponse au problème).`,
      `**Données** : les valeurs fournies par l'utilisateur (ce que l'on doit lire).`,
      `**Traitement** : les calculs et formules qui permettent de passer des données au résultat.`,
      `**Algorithme** : suite finie et ordonnée d'instructions qui résout le problème, indépendante du langage.`,
      `**Programme** : algorithme traduit dans un langage de programmation (ici Python).`
    ],
    understand: [
      `Pourquoi commencer par le résultat ? Parce que c'est lui qui dicte quelles données sont réellement nécessaires.`,
      `Un algorithme ne dépend d'aucun langage : on peut le traduire en Python, en C ou en Java.`,
      `L'ordinateur exécute exactement ce qu'on lui écrit, dans l'ordre : il ne devine rien.`
    ],
    rule: `Ordre de l'analyse : **Résultat → Données → Traitement**. Une donnée est lue avec ‹Lire›, un résultat est affiché avec ‹Ecrire›, un résultat intermédiaire est calculé avec ‹←›.`,
    examples: [{
      titre: "Calcul du prix TTC d'un article",
      enonce: `Calculer le prix TTC d'un article à partir de son prix hors taxe. La TVA est fixée à 19 %.`,
      donnees: [`‹prix_ht› : le prix hors taxe saisi par l'utilisateur`],
      traitement: `‹prix_ttc ← prix_ht + prix_ht * TVA / 100› avec ‹TVA = 19› (constante)`,
      resultat: `‹prix_ttc› : le prix toutes taxes comprises`,
      tdo: [["TVA", "Constante = 19"], ["prix_ht", "Réel"], ["prix_ttc", "Réel"]],
      algo: `Algorithme PrixTTC
Début
  Ecrire("Prix hors taxe : "), Lire(prix_ht)
  prix_ttc ← prix_ht + prix_ht * TVA / 100
  Ecrire("Prix TTC : ", prix_ttc)
Fin`,
      python: `TVA = 19
prix_ht = float(input("Prix hors taxe : "))
prix_ttc = prix_ht + prix_ht * TVA / 100
print("Prix TTC :", prix_ttc)`,
      explication: [
        `La constante ‹TVA› est déclarée dans le T.D.O et jamais lue ni modifiée.`,
        `‹prix_ht› est une donnée : on la lit. ‹prix_ttc› est un résultat : on le calcule puis on l'affiche.`,
        `En Python, ‹float(input(...))› convertit le texte saisi en nombre réel.`
      ],
      execution: `Entrée : prix_ht = 100\nCalcul : prix_ttc = 100 + 100 * 19 / 100 = 119.0\nSortie : Prix TTC : 119.0`
    }],
    application: {
      enonce: `Donne l'analyse (Résultat, Données, Traitement) du problème : « calculer l'aire d'un rectangle de longueur L et de largeur l ».`,
      solution: `Résultat : aire (Réel)\nDonnées : L et l (Réels)\nTraitement : aire ← L * l`
    },
    errors: [
      `Écrire directement le code sans faire l'analyse.`,
      `Mettre dans les données une valeur qui se calcule (par exemple ‹Lire(aire)›).`,
      `Oublier de préciser ce que le programme affiche (le résultat).`,
      `Confondre algorithme (langage structuré) et programme Python.`
    ],
    devoir: [
      `« Donner les données, le traitement et le résultat. »`,
      `« Écrire l'algorithme correspondant et son T.D.O. »`,
      `« Traduire l'algorithme en Python. »`
    ],
    express: `Analyse = Résultat → Données → Traitement. Ensuite : Algorithme → Python → Test.`,
    express_ar: `التحليل = النتيجة {(Résultat)} ← المعطيات {(Données)} ← المعالجة {(Traitement)}. بعد ذلك: الخوارزمية ← برنامج بايثون ← الاختبار.`
  });

  L({
    id: "l0.2", chapter: "c0", title: "Structure d'un algorithme et T.D.O", duree: "10 min", niveau: 1,
    concept: `Un algorithme s'écrit toujours avec la même structure : un **nom**, un **T.D.O** (Tableau de Déclaration des Objets) qui liste tout ce que l'on utilise, puis le corps entre ‹Début› et ‹Fin›.`,
    memorize: [
      `Squelette : ‹Algorithme Nom› → ‹T.D.O› → ‹Début› → instructions → ‹Fin›.`,
      `Le T.D.O contient **tous** les objets utilisés : variables et constantes, avec leur type ou leur valeur.`,
      `Types usuels : ‹Entier›, ‹Réel›, ‹Booléen›, ‹Caractère›, ‹Chaîne›, ‹tableau de N type›.`
    ],
    understand: [
      `Le T.D.O joue le rôle d'un inventaire : si un objet n'y figure pas, l'algorithme n'est pas correct.`,
      `Le type choisi dépend de la nature de la donnée (voir chapitre 2) et de ce qu'on veut en faire.`
    ],
    rule: `Chaque objet du T.D.O s'écrit sous la forme : **Objet | Type / Nature**. Une constante s'écrit avec sa valeur : ‹PI | Constante = 3.14›.`,
    tables: [{
      title: "Le T.D.O sous forme de tableau",
      head: ["Objet", "Type / Nature"],
      rows: [["PI", "Constante = 3.14"], ["R", "Réel"], ["S", "Réel"]]
    }],
    notes: [{ kind: "remark", title: "Deux écritures du T.D.O", text: `Dans ce site on utilise la forme en tableau. Tu rencontreras aussi la forme condensée ‹T.D.O : n, d : Entier› (objets du même type regroupés) : elle est équivalente.` }],
    examples: [{
      titre: "Somme de deux entiers",
      enonce: `Lire deux entiers a et b, puis afficher leur somme.`,
      donnees: [`‹a› et ‹b› : deux entiers saisis`],
      traitement: `‹s ← a + b›`,
      resultat: `‹s› : la somme`,
      tdo: [["a", "Entier"], ["b", "Entier"], ["s", "Entier"]],
      algo: `Algorithme Somme
Début
  Ecrire("a = "), Lire(a)
  Ecrire("b = "), Lire(b)
  s ← a + b
  Ecrire("La somme est : ", s)
Fin`,
      python: `a = int(input("a = "))
b = int(input("b = "))
s = a + b
print("La somme est :", s)`,
      explication: [
        `Trois objets, trois lignes dans le T.D.O : ‹a›, ‹b› (données) et ‹s› (résultat).`,
        `Chaque ‹Lire› a son ‹Ecrire› d'invitation juste avant.`
      ],
      execution: `Entrées : a = 5 ; b = 8\nSortie : La somme est : 13`
    }],
    application: {
      enonce: `Écris le squelette complet (T.D.O compris) d'un algorithme ‹Produit› qui lit deux réels x et y et affiche leur produit p.`,
      solution: `Algorithme Produit
T.D.O : x, y, p : Réel
Début
  Ecrire("x = "), Lire(x)
  Ecrire("y = "), Lire(y)
  p ← x * y
  Ecrire("Produit = ", p)
Fin`
    },
    errors: [
      `Oublier de déclarer un objet dans le T.D.O (souvent le résultat).`,
      `Déclarer un type incompatible avec la valeur (ex. ‹Entier› pour une moyenne).`,
      `Donner à un objet un nom contenant un espace ou commençant par un chiffre.`
    ],
    devoir: [`« Écrire l'algorithme et le T.D.O correspondant. »`, `« Compléter le T.D.O de l'algorithme suivant. »`],
    express: `Algorithme Nom → T.D.O → Début … Fin. Tout objet utilisé figure dans le T.D.O.`,
    express_ar: `الخوارزمية: الاسم ← جدول تعريف الكائنات {T.D.O} ← {Début … Fin}. كل كائن مستعمل يجب أن يكون مصرّحًا به في الجدول.`
  });

  /* ------------------------------------------------------------------ C1 */
  L({
    id: "l1.1", chapter: "c1", title: "Entrée, traitement, sortie et notion de variable", duree: "10 min", niveau: 1,
    concept: `Tout programme, qu'il s'agisse d'une calculatrice, d'un jeu vidéo ou d'un moteur de recherche, réalise trois opérations en séquence : **1. l'Entrée** (saisir des données au clavier : ‹Lire›), **2. le Traitement** (calculer et ranger le résultat en mémoire : ‹←›) et **3. la Sortie** (afficher le résultat à l'écran : ‹Ecrire›). Ce sont les **structures de contrôle simples**. Pour conserver les valeurs en mémoire on utilise des **variables**.`,
    memorize: [
      `Une **variable** est une case de la mémoire vive, identifiée par un **nom unique**, qui contient une valeur pouvant **varier** pendant l'exécution.`,
      `**Principe de remplacement** : écrire une nouvelle valeur efface définitivement l'ancienne.`,
      `**Identificateur** : lettres, chiffres et souligné (_) ; il commence obligatoirement par une lettre ; ni espace ni accent.`,
      `Bonne pratique : choisir des noms évocateurs (‹prix_ttc›, ‹Surface›) plutôt que ‹p› ou ‹x›.`
    ],
    understand: [
      `Une variable ressemble à une boîte étiquetée : l'étiquette est le nom, le contenu est la valeur.`,
      `Les trois opérations s'enchaînent toujours dans cet ordre logique : on lit, on calcule, on affiche.`,
      `Un bon nom de variable rend l'algorithme lisible sans commentaire.`
    ],
    rule: `Identificateur valide = commence par une **lettre**, puis lettres / chiffres / ‹_›. Pas d'espace, pas d'accent, pas de symbole comme ‹-›.`,
    tables: [{
      title: "Identificateurs valides ou non ?",
      head: ["Nom", "Valide ?", "Raison"],
      rows: [
        ["prix_ttc", "✔ Oui", "lettres et souligné"],
        ["Surface", "✔ Oui", "commence par une lettre"],
        ["note1", "✔ Oui", "un chiffre est permis s'il n'est pas en première position"],
        ["2ab", "✘ Non", "commence par un chiffre"],
        ["mon nom", "✘ Non", "contient un espace"],
        ["prix-ttc", "✘ Non", "le tiret est l'opérateur de soustraction"],
        ["prénom", "✘ Non", "contient un accent"]
      ]
    }],
    notes: [{ kind: "remark", title: "Python et les accents", text: `Python autorise techniquement certains accents dans les noms, mais le cours impose de les éviter : on suit toujours la règle du cours.` }],
    snippets: [{
      title: "Principe de remplacement",
      lang: "algo",
      code: `x ← 5      # x contient 5
x ← 8      # 5 est effacé : x contient maintenant 8`
    }],
    application: {
      enonce: `Parmi ‹age›, ‹3notes›, ‹mon nom›, ‹Total_2›, lesquels sont des identificateurs valides ?`,
      solution: `‹age› et ‹Total_2› sont valides. ‹3notes› commence par un chiffre ; ‹mon nom› contient un espace.`
    },
    errors: [
      `Commencer un nom par un chiffre ou y mettre un espace.`,
      `Croire qu'une variable garde l'ancienne valeur après une nouvelle affectation.`,
      `Utiliser des noms d'une lettre sans signification (‹p›, ‹x›) dans un algorithme long.`
    ],
    devoir: [`« Quels sont les identificateurs valides ? Justifier. »`, `« Donner la valeur de x après les instructions suivantes. »`],
    express: `Entrée (Lire) → Traitement (←) → Sortie (Ecrire). Variable = case mémoire nommée ; nouvelle valeur = ancienne effacée.`,
    express_ar: `الإدخال {(Lire)} ← المعالجة {(←)} ← الإخراج {(Ecrire)}. المتغير = خانة في الذاكرة لها اسم؛ القيمة الجديدة تمحو القيمة القديمة.`
  });

  L({
    id: "l1.2", chapter: "c1", title: "Les opérations Lire et Ecrire", duree: "12 min", niveau: 1,
    concept: `‹Lire› suspend l'exécution et attend que l'utilisateur tape une valeur au clavier ; une fois validée avec la touche Entrée, cette valeur est rangée dans la variable indiquée. ‹Ecrire› affiche des informations à l'écran : du texte, la valeur d'une variable, ou un mélange des deux.`,
    memorize: [
      `Algorithme : ‹Lire(variable)›. Python : ‹variable = input()› (texte), ‹n = int(input())› (entier), ‹x = float(input())› (réel).`,
      `‹Ecrire("Bonjour")› affiche le texte entre guillemets ; ‹Ecrire(n)› affiche la **valeur** de n.`,
      `Affichage mixte : ‹Ecrire("La valeur de n est : ", n)›.`,
      `Avant tout ‹Lire›, il faut **toujours** un ‹Ecrire› qui explique ce qu'on attend.`
    ],
    understand: [
      `En Python, ‹input()› renvoie **toujours une chaîne** : c'est pour cela qu'on la convertit avec ‹int()› ou ‹float()› avant de calculer.`,
      `‹print()› revient automatiquement à la ligne. En algorithme, ‹Ecrire_nl› provoque un retour à la ligne.`,
      `‹print("n =", n)› ajoute un espace entre les éléments ; ‹Ecrire("n = ", n)› n'en ajoute pas, l'espace est dans les guillemets.`
    ],
    rule: `On ne **lit** que les données ; on ne lit jamais une variable qui doit être calculée.`,
    tables: [{
      title: "Correspondances Algorithme / Python",
      head: ["Opération", "Algorithme (2TI)", "Python"],
      rows: [
        ["Entrée (Entier)", "Lire(n)", `n = int(input("n = "))`],
        ["Entrée (Réel)", "Lire(x)", `x = float(input("x = "))`],
        ["Entrée (Texte)", "Lire(nom)", `nom = input("Nom : ")`],
        ["Affichage texte", `Ecrire("Message")`, `print("Message")`],
        ["Affichage variable", "Ecrire(n)", "print(n)"],
        ["Affichage mixte", `Ecrire("n = ", n)`, `print("n =", n)`]
      ]
    }],
    notes: [{ kind: "remark", title: "Message d'invitation à la saisie", text: `Sans invitation, l'utilisateur se retrouve devant un écran noir sans savoir quoi taper. Exemple : ‹Ecrire("Donner un entier n : ")› puis ‹Lire(n)›.` }],
    examples: [{
      titre: "Saluer l'utilisateur",
      enonce: `Demander le nom de l'utilisateur puis afficher « Bonjour » suivi de ce nom.`,
      donnees: [`‹nom› : le nom saisi (texte)`],
      traitement: `Aucun calcul : on se contente de lire puis d'afficher.`,
      resultat: `Le message « Bonjour nom ! »`,
      tdo: [["nom", "Chaîne"]],
      algo: `Algorithme Salutation
Début
  Ecrire("Quel est votre nom ? "), Lire(nom)
  Ecrire("Bonjour ", nom, " !")
Fin`,
      python: `nom = input("Quel est votre nom ? ")
print("Bonjour", nom, "!")`,
      explication: [
        `‹nom› est une chaîne : pas besoin de ‹int()› ni de ‹float()›.`,
        `Dans ‹print›, les virgules séparent les éléments et Python insère un espace entre eux.`
      ],
      execution: `Entrée : Sami\nSortie : Bonjour Sami !`
    }],
    application: {
      enonce: `Écris en algorithme les deux instructions qui demandent « Donner un entier n : » puis lisent n.`,
      solution: `Ecrire("Donner un entier n : "), Lire(n)`
    },
    errors: [
      `Mettre des guillemets autour d'une variable : ‹print("n")› affiche la lettre n, pas sa valeur. Il faut ‹print(n)›.`,
      `Oublier ‹int()› / ‹float()› : calculer avec le résultat brut de ‹input()› donne une erreur de type (ou un résultat faux : ‹"5" + "3"› donne ‹"53"›).`,
      `Lire une variable qui doit être calculée : ‹Lire(d)› alors que ‹d ← 2 * n›.`,
      `Oublier le message d'invitation avant ‹Lire›.`
    ],
    devoir: [`« Écrire la traduction Python de l'algorithme suivant. »`, `« Que fait l'instruction ‹print("n")› ? »`],
    express: `‹Lire(n)› ↔ ‹n = int(input())› ; ‹Ecrire(n)› ↔ ‹print(n)›. ‹input()› renvoie toujours un texte. Toujours un message avant ‹Lire›.`,
    express_ar: `‹Lire(n)› تقابل ‹n = int(input())› و ‹Ecrire(n)› تقابل ‹print(n)›. الدالة ‹input()› تُرجع دائمًا نصًّا. اكتب دائمًا رسالة توضيحية قبل ‹Lire›.`
  });

  L({
    id: "l1.3", chapter: "c1", title: "L'affectation ←", duree: "12 min", niveau: 1,
    concept: `L'affectation consiste à attribuer une valeur, ou le résultat d'un calcul, à une variable. Elle est symbolisée par une flèche orientée vers la gauche : ‹←›.`,
    memorize: [
      `Syntaxe : ‹Variable ← Expression›.`,
      `Sens : l'expression à **droite** est calculée en premier, puis le résultat est rangé dans la variable à **gauche**.`,
      `En Python : ‹Variable = Expression›.`
    ],
    understand: [
      `‹x ← x + 1› est parfaitement valide : « prendre la valeur actuelle de x, lui ajouter 1, ranger le résultat dans x ». Ce n'est pas une équation mathématique.`,
      `La variable receveuse est toujours à gauche : ‹5 ← x› n'a aucun sens.`
    ],
    rule: `**Variable ← Expression** : on calcule à droite, on range à gauche. En algorithme on écrit ‹←›, en Python ‹=›.`,
    tables: [{
      title: "Ne pas confondre",
      head: ["Symbole", "Où ?", "Signification"],
      rows: [
        ["←", "Algorithme", "Affectation (ranger une valeur)"],
        ["=", "Algorithme", "Comparaison (test d'égalité), par ex. ‹n MOD 2 = 0›"],
        ["=", "Python", "Affectation"],
        ["==", "Python", "Comparaison (test d'égalité)"]
      ]
    }],
    examples: [{
      titre: "Double d'un nombre",
      enonce: `Écrire un algorithme qui lit un entier n, calcule son double d, puis affiche le résultat.`,
      donnees: [`‹n› : l'entier saisi`],
      traitement: `‹d ← 2 * n›`,
      resultat: `‹d› : le double de n`,
      tdo: [["n", "Entier"], ["d", "Entier"]],
      algo: `Algorithme Double
Début
  Ecrire("Donner un entier n = "), Lire(n)
  d ← 2 * n
  Ecrire("Le double de n est : ", d)
Fin`,
      python: `n = int(input("Donner un entier n = "))
d = 2 * n
print("Le double de n est :", d)`,
      explication: [
        `‹d ← 2 * n› : on calcule d'abord ‹2 * n› (à droite), puis on range le résultat dans ‹d›.`,
        `‹d› n'est pas lu : c'est un résultat calculé.`
      ],
      execution: `Entrée : n = 7\nCalcul : d = 2 * 7 = 14\nSortie : Le double de n est : 14`
    }],
    application: {
      enonce: `Quelle est la valeur de ‹a› et de ‹b› après : ‹a ← 2›, ‹b ← a + 3›, ‹a ← b * 2› ?`,
      solution: `a ← 2 → a = 2 ; b ← a + 3 → b = 5 ; a ← b * 2 → a = 10. Résultat : a = 10 et b = 5.`
    },
    errors: [
      `Inverser le sens : écrire ‹5 ← x› au lieu de ‹x ← 5›.`,
      `Utiliser ‹=› à la place de ‹←› dans un algorithme.`,
      `Croire que ‹x ← x + 1› est impossible.`,
      `Utiliser dans un calcul une variable qui n'a encore reçu aucune valeur.`
    ],
    devoir: [`« Donner les valeurs des variables après exécution. »`, `« Corriger les erreurs de l'algorithme (sens de l'affectation, ‹=› au lieu de ‹←›). »`],
    express: `‹Variable ← Expression› : on calcule à droite, on range à gauche. Algorithme : ‹←› ; Python : ‹=›.`,
    express_ar: `‹Variable ← Expression›: يُحسب الطرف الأيمن أولًا ثم تُخزَّن النتيجة في المتغير الأيسر. في الخوارزمية نستعمل ‹←› وفي بايثون ‹=›.`
  });

  L({
    id: "l1.4", chapter: "c1", title: "Trace d'exécution et permutation", duree: "15 min", niveau: 2,
    concept: `La **trace d'exécution** est un tableau de suivi dans lequel on note la valeur de chaque variable après chaque ligne exécutée. C'est l'outil indispensable pour comprendre un algorithme, repérer une erreur de logique et répondre aux questions « Exécuter à la main ».`,
    memorize: [
      `Une colonne par variable, une ligne par instruction.`,
      `Une variable non encore initialisée se note ‹?›.`,
      `Pour échanger deux variables, il faut une **variable auxiliaire** ‹z›.`
    ],
    understand: [
      `Si on écrit ‹a ← b› puis ‹b ← a›, la valeur d'origine de a est écrasée dès la première ligne : b reçoit alors la valeur de b.`,
      `Il faut donc sauvegarder temporairement a dans z avant de l'écraser.`
    ],
    rule: `Permutation de a et b : ‹z ← a›, ‹a ← b›, ‹b ← z›.`,
    notes: [
      { kind: "trap", title: "Pourquoi une variable auxiliaire est obligatoire", text: `Avec ‹a ← b› puis ‹b ← a›, la valeur d'origine de ‹a› est perdue : les deux variables finissent avec la valeur de b.` },
      { kind: "bonus", title: "Permuter sans z (arithmétique)", text: `Avec ‹a ← a + b›, ‹b ← a - b›, ‹a ← a - b›, on échange sans variable auxiliaire. Exemple a = 3, b = 8 : a = 11, puis b = 11 − 8 = 3, puis a = 11 − 3 = 8. Cette astuce marche pour des nombres ; la méthode avec ‹z› reste la référence (elle marche pour tous les types). En Python seulement : ‹a, b = b, a›.` }
    ],
    tables: [{
      title: "Trace de la permutation (a = 3, b = 8)",
      head: ["Instruction", "a", "b", "z", "Commentaire"],
      rows: [
        ["Saisie initiale", "3.0", "8.0", "?", "Valeurs entrées"],
        ["z ← a", "3.0", "8.0", "3.0", "Sauvegarde de a"],
        ["a ← b", "8.0", "8.0", "3.0", "a prend la valeur de b"],
        ["b ← z", "8.0", "3.0", "3.0", "b prend l'ancienne valeur de a"]
      ]
    }],
    examples: [{
      titre: "Permutation du contenu de deux variables",
      enonce: `Échanger les valeurs de deux variables réelles a et b saisies par l'utilisateur.`,
      donnees: [`‹a› et ‹b› : deux réels`],
      traitement: `‹z ← a›, ‹a ← b›, ‹b ← z›`,
      resultat: `‹a› et ‹b› échangés`,
      tdo: [["a", "Réel"], ["b", "Réel"], ["z", "Réel"]],
      algo: `Algorithme Permutation
Début
  Ecrire("a = "), Lire(a)
  Ecrire("b = "), Lire(b)
  z ← a        # Sauvegarde de a dans z
  a ← b        # a reçoit la valeur de b
  b ← z        # b reçoit l'ancienne valeur de a
  Ecrire("Après permutation : a = ", a, " et b = ", b)
Fin`,
      python: `a = float(input("a = "))
b = float(input("b = "))
z = a
a = b
b = z
print("Après permutation : a =", a, "et b =", b)`,
      explication: [
        `‹z› garde une copie de l'ancienne valeur de ‹a› avant qu'elle ne soit écrasée.`,
        `Les trois variables ont le même type (‹Réel›) car elles se transmettent des valeurs.`
      ],
      execution: `Entrées : a = 3 ; b = 8\nSortie : Après permutation : a = 8.0 et b = 3.0`
    }],
    application: {
      enonce: `Fais la trace de : ‹x ← 4›, ‹y ← x + 1›, ‹x ← x + y›. Quelles sont les valeurs finales de x et y ?`,
      solution: `x = 4 ; y = 5 ; x = 4 + 5 = 9. Valeurs finales : x = 9 et y = 5.`
    },
    errors: [
      `Permuter avec seulement ‹a ← b› puis ‹b ← a›.`,
      `Oublier de déclarer ‹z› dans le T.D.O.`,
      `Mettre un type différent à ‹z› (il doit être du même type que ‹a› et ‹b›).`,
      `Se tromper d'ordre dans les trois instructions.`
    ],
    devoir: [`« Exécuter à la main l'algorithme et compléter le tableau de trace. »`, `« Écrire l'algorithme de permutation de deux variables. »`],
    express: `Trace = une colonne par variable, une ligne par instruction. Permutation : ‹z ← a› ; ‹a ← b› ; ‹b ← z›.`,
    express_ar: `جدول التتبع: عمود لكل متغير وسطر لكل تعليمة. التبديل: ‹z ← a› ثم ‹a ← b› ثم ‹b ← z›.`
  });

  /* ------------------------------------------------------------------ C2 */
  L({
    id: "l2.1", chapter: "c2", title: "Constante, variable et choix du type", duree: "12 min", niveau: 1,
    concept: `Un programme manipule des objets en mémoire. Une **constante** a une valeur qui ne change jamais pendant l'exécution (exemples : ‹PI = 3.14›, ‹TVA = 19›). Une **variable** a une valeur qui peut changer à tout moment (le rayon R, la surface S, le solde d'un compte). Chaque objet possède un **type** qui détermine les valeurs possibles et les opérations permises.`,
    memorize: [
      `Constante : valeur **fixe** pendant toute l'exécution. Variable : valeur **modifiable**.`,
      `5 types : **Entier**, **Réel**, **Booléen**, **Caractère**, **Chaîne de caractères**.`,
      `Règle d'or : un nombre qui ne sert **pas à calculer** (téléphone, CIN, code postal) est une **Chaîne**.`
    ],
    understand: [
      `On ne calcule jamais avec un numéro de téléphone : additionner deux numéros n'a aucun sens, donc ce n'est pas un entier.`,
      `Les zéros du début d'un code (par exemple « 0021 ») seraient perdus avec un entier, mais conservés avec une chaîne.`,
      `Python n'a pas de vraie constante : par convention on l'écrit en majuscules (‹PI = 3.14›) et on ne la modifie pas.`
    ],
    rule: `**Choisir le type** : valeur logique → Booléen ; texte, mot ou phrase → Chaîne ; un seul signe → Caractère ; nombre sans virgule qui sert à calculer → Entier ; nombre à virgule → Réel.`,
    tables: [{
      title: "Guide de choix du type",
      head: ["Donnée à stocker", "Type algorithmique", "Type Python", "Exemples de valeurs"],
      rows: [
        ["Nombre entier sans virgule", "Entier", "int", "5, -12, 0, 2026"],
        ["Nombre à virgule (décimal)", "Réel", "float", "3.14, -0.5, 14.25"],
        ["Valeur logique (Vrai / Faux)", "Booléen", "bool", "Vrai, Faux (True, False)"],
        ["Caractère unique", "Caractère", "str (taille 1)", "'A', '+', '9', ' '"],
        ["Texte / mot / phrase", "Chaîne de caractères", "str", `"Bonjour", "2TI"`]
      ]
    }],
    notes: [{ kind: "trap", title: "Règle d'or sur le choix du type", text: `Toute information écrite avec des chiffres qui **ne subit pas de calculs arithmétiques** (numéro de téléphone, numéro de CIN, code postal) doit être déclarée comme **Chaîne** et non comme Entier.` }],
    examples: [{
      titre: "Surface d'un disque",
      enonce: `Lire le rayon R d'un disque et afficher sa surface S, avec PI = 3.14.`,
      donnees: [`‹R› : le rayon (réel)`],
      traitement: `‹S ← PI * R * R›`,
      resultat: `‹S› : la surface`,
      tdo: [["PI", "Constante = 3.14"], ["R", "Réel"], ["S", "Réel"]],
      algo: `Algorithme Disque
Début
  Ecrire("Rayon R = "), Lire(R)
  S ← PI * R * R
  Ecrire("Surface = ", S)
Fin`,
      python: `PI = 3.14
R = float(input("Rayon R = "))
S = PI * R * R
print("Surface =", S)`,
      explication: [
        `‹PI› est une constante : elle est déclarée dans le T.D.O avec sa valeur et n'est jamais lue.`,
        `‹R› et ‹S› sont des variables de type ‹Réel› car le rayon et la surface peuvent avoir une partie décimale.`
      ],
      execution: `Entrée : R = 2\nCalcul : S = 3.14 * 2 * 2 = 12.56\nSortie : Surface = 12.56`
    }],
    application: {
      enonce: `Donne le type de : l'âge d'un élève ; la moyenne générale ; le numéro de CIN ; « l'élève est admis (oui/non) ».`,
      solution: `Âge : Entier ; moyenne : Réel ; numéro de CIN : Chaîne ; admis : Booléen.`
    },
    errors: [
      `Déclarer un numéro de téléphone ou de CIN en ‹Entier›.`,
      `Déclarer une moyenne en ‹Entier› (on perd les décimales).`,
      `Modifier une constante dans l'algorithme.`,
      `Confondre Caractère (un seul signe) et Chaîne (zéro, un ou plusieurs signes).`
    ],
    devoir: [`« Donner le type de chaque donnée du tableau. »`, `« Déclarer les objets de l'algorithme dans le T.D.O. »`],
    express: `Constante = fixe ; Variable = modifiable. Types : Entier, Réel, Booléen, Caractère, Chaîne. Pas de calcul → Chaîne.`,
    express_ar: `الثابت {(Constante)} قيمته لا تتغير والمتغير قيمته قابلة للتغيير. الأنواع: {Entier, Réel, Booléen, Caractère, Chaîne}. كل معلومة لا تدخل في عمليات حسابية (رقم الهاتف، رقم بطاقة التعريف) تكون {Chaîne}.`
  });

  L({
    id: "l2.2", chapter: "c2", title: "Le type Entier : DIV et MOD", duree: "15 min", niveau: 2,
    concept: `Le type **Entier** désigne l'ensemble des entiers relatifs (ℤ). Outre ‹+›, ‹-› et ‹*›, deux opérateurs sont fondamentaux : ‹DIV› (division entière : le quotient) et ‹MOD› (modulo : le reste de la division entière).`,
    memorize: [
      `‹DIV› : quotient entier (Python ‹//›). Exemple : ‹17 DIV 5 = 3›.`,
      `‹MOD› : reste de la division entière (Python ‹%›). Exemple : ‹17 MOD 5 = 2›.`,
      `Dernier chiffre de n : ‹n MOD 10›. Supprimer le dernier chiffre : ‹n DIV 10›.`,
      `Parité : si ‹n MOD 2 = 0› alors n est pair, sinon impair.`
    ],
    understand: [
      `Division euclidienne : ‹17 = 5 × 3 + 2›. Le quotient est 3 (DIV), le reste est 2 (MOD).`,
      `‹/› est la division **réelle** : ‹7 / 2 = 3.5›. En Python, ‹/› renvoie toujours un ‹float›.`,
      `DIV et MOD ne s'appliquent qu'à des entiers.`
    ],
    rule: `**a = b × (a DIV b) + (a MOD b)**, avec ‹0 ≤ a MOD b < b›.`,
    tables: [{
      title: "Opérations sur les entiers",
      head: ["Opération", "Algorithme", "Python", "Exemple"],
      rows: [
        ["Quotient entier", "17 DIV 5", "17 // 5", "3"],
        ["Reste", "17 MOD 5", "17 % 5", "2"],
        ["Division réelle", "7 / 2", "7 / 2", "3.5"],
        ["Dernier chiffre de n", "n MOD 10", "n % 10", "n = 582 → 2"],
        ["Enlever le dernier chiffre", "n DIV 10", "n // 10", "n = 582 → 58"]
      ]
    }],
    notes: [{ kind: "remark", title: "Applications incontournables de DIV et MOD", text: `1) extraire le dernier chiffre : ‹u ← n MOD 10›. 2) éliminer le dernier chiffre : ‹n ← n DIV 10›. 3) tester la parité : ‹n MOD 2 = 0›.` }],
    examples: [{
      titre: "Somme des chiffres d'un entier à deux chiffres",
      enonce: `Lire un entier n à deux chiffres et afficher la somme de ses chiffres.`,
      donnees: [`‹n› : un entier compris entre 10 et 99`],
      traitement: `‹d ← n DIV 10› (chiffre des dizaines), ‹u ← n MOD 10› (chiffre des unités), ‹s ← d + u›`,
      resultat: `‹s› : la somme des chiffres`,
      tdo: [["n", "Entier"], ["d", "Entier"], ["u", "Entier"], ["s", "Entier"]],
      algo: `Algorithme SommeChiffres
Début
  Ecrire("Donner un entier de 2 chiffres : "), Lire(n)
  d ← n DIV 10
  u ← n MOD 10
  s ← d + u
  Ecrire("La somme des chiffres de ", n, " est : ", s)
Fin`,
      python: `n = int(input("Donner un entier de 2 chiffres : "))
d = n // 10
u = n % 10
s = d + u
print("La somme des chiffres de", n, "est :", s)`,
      explication: [
        `‹n DIV 10› retire le dernier chiffre : il reste les dizaines.`,
        `‹n MOD 10› ne garde que le dernier chiffre : les unités.`,
        `Tous les objets sont des entiers : ‹DIV› et ‹MOD› l'exigent.`
      ],
      execution: `Entrée : n = 47\nd = 47 DIV 10 = 4 ; u = 47 MOD 10 = 7 ; s = 11\nSortie : La somme des chiffres de 47 est : 11`
    }],
    application: {
      enonce: `Pour n = 582, donne ‹n MOD 10› et ‹n DIV 10›.`,
      solution: `582 MOD 10 = 2 (dernier chiffre) ; 582 DIV 10 = 58 (le nombre sans son dernier chiffre).`
    },
    errors: [
      `Confondre ‹DIV› (quotient) et ‹MOD› (reste).`,
      `Utiliser ‹/› quand on veut le quotient entier : ‹17 / 5› vaut 3.4, pas 3.`,
      `Utiliser ‹MOD› ou ‹DIV› avec un réel.`,
      `Écrire ‹n MOD 2 == 0› en algorithme (‹==› appartient à Python).`
    ],
    devoir: [`« Calculer ‹a DIV b› et ‹a MOD b›. »`, `« Extraire les chiffres d'un nombre. »`, `« Tester si un nombre est pair. »`],
    express: `‹DIV› = quotient (‹//›), ‹MOD› = reste (‹%›). Dernier chiffre : ‹n MOD 10› ; enlever le dernier chiffre : ‹n DIV 10› ; pair si ‹n MOD 2 = 0›.`,
    express_ar: `‹DIV› هو خارج القسمة الصحيح (يقابله ‹//›) و‹MOD› هو باقي القسمة (يقابله ‹%›). آخر رقم في العدد: ‹n MOD 10›؛ حذف آخر رقم: ‹n DIV 10›؛ العدد زوجي إذا كان ‹n MOD 2 = 0›.`
  });

  L({
    id: "l2.3", chapter: "c2", title: "Le type Réel et les fonctions mathématiques", duree: "12 min", niveau: 2,
    concept: `Le type **Réel** désigne les nombres à virgule. L'algorithme dispose de fonctions prédéfinies pour tronquer, arrondir, calculer une valeur absolue, une racine carrée ou tirer un nombre au hasard.`,
    memorize: [
      `‹Ent(x)› ↔ ‹int(x)› : partie entière (tronque).`,
      `‹Arrondi(x)› ↔ ‹round(x)› : entier le plus proche.`,
      `‹Abs(x)› ↔ ‹abs(x)› : valeur absolue.`,
      `‹RacineCarré(x)› ↔ ‹sqrt(x)› : racine carrée (renvoie un ‹float›).`,
      `‹Aléa(a, b)› ↔ ‹randint(a, b)› : entier aléatoire entre a et b **inclus**.`
    ],
    understand: [
      `‹sqrt›, ‹randint› et ‹uniform› ne sont pas disponibles tout de suite en Python : il faut les importer au début du programme.`,
      `‹sqrt(25.0)› donne ‹5.0› (un réel) même si le résultat est « rond ».`
    ],
    rule: `En Python, avant d'utiliser ‹sqrt›, ‹randint› ou ‹uniform›, écrire : ‹from math import sqrt› et ‹from random import randint, uniform›.`,
    tables: [{
      title: "Fonctions mathématiques",
      head: ["Fonction Algo", "Équivalent Python", "Rôle", "Exemple"],
      rows: [
        ["Ent(x)", "int(x)", "Tronque la partie décimale", "int(3.8) → 3"],
        ["Arrondi(x)", "round(x)", "Arrondit à l'entier le plus proche", "round(3.6) → 4"],
        ["Abs(x)", "abs(x)", "Valeur absolue", "abs(-5) → 5"],
        ["RacineCarré(x)", "sqrt(x) (module math)", "Racine carrée (renvoie un float)", "sqrt(25.0) → 5.0"],
        ["Aléa(a, b)", "randint(a, b)", "Entier aléatoire entre a et b inclus", "randint(1, 6) → un dé"]
      ]
    }],
    snippets: [{ title: "Imports Python obligatoires", lang: "py", code: `from math import sqrt
from random import randint, uniform` }],
    notes: [
      { kind: "verify", title: "Ent(x) et nombres négatifs", text: `Pour un nombre positif, ‹Ent(x)› et ‹int(x)› donnent le même résultat. Pour un négatif, ‹int(-3.8)› donne -3 (troncature) alors que la partie entière mathématique est -4 (en Python : ‹math.floor(-3.8)›). Le cours travaille avec des nombres positifs.` },
      { kind: "verify", title: "round() en Python", text: `Python arrondit les valeurs « au milieu » vers l'entier pair : ‹round(2.5)› vaut 2 et ‹round(3.5)› vaut 4. Pour les autres valeurs (3.6 → 4, 3.4 → 3), aucune surprise.` },
      { kind: "remark", title: "Réel aléatoire", text: `‹uniform(a, b)› renvoie un **réel** aléatoire entre a et b ; ‹randint(a, b)› un **entier**.` }
    ],
    examples: [{
      titre: "Hypoténuse d'un triangle rectangle",
      enonce: `Lire les deux côtés a et b de l'angle droit et afficher l'hypoténuse c.`,
      donnees: [`‹a› et ‹b› : deux réels positifs`],
      traitement: `‹c ← RacineCarré(a * a + b * b)› (théorème de Pythagore)`,
      resultat: `‹c› : la longueur de l'hypoténuse`,
      tdo: [["a", "Réel"], ["b", "Réel"], ["c", "Réel"]],
      algo: `Algorithme Hypotenuse
Début
  Ecrire("a = "), Lire(a)
  Ecrire("b = "), Lire(b)
  c ← RacineCarré(a * a + b * b)
  Ecrire("L'hypoténuse vaut : ", c)
Fin`,
      python: `from math import sqrt

a = float(input("a = "))
b = float(input("b = "))
c = sqrt(a * a + b * b)
print("L'hypoténuse vaut :", c)`,
      explication: [
        `L'import ‹from math import sqrt› se met tout en haut du programme.`,
        `‹c› est un ‹Réel› : ‹sqrt› renvoie toujours un ‹float›.`
      ],
      execution: `Entrées : a = 3 ; b = 4\nCalcul : c = sqrt(9 + 16) = sqrt(25) = 5.0\nSortie : L'hypoténuse vaut : 5.0`
    }],
    application: {
      enonce: `Écris en Python l'instruction qui simule le lancer d'un dé (résultat entre 1 et 6) et mets la valeur dans ‹de›. N'oublie pas l'import.`,
      solution: `from random import randint\nde = randint(1, 6)`
    },
    errors: [
      `Oublier ‹from math import sqrt› : Python répond ‹NameError›.`,
      `Croire que ‹randint(1, 6)› peut renvoyer 7 : les deux bornes sont incluses, 7 est impossible.`,
      `Confondre ‹int(x)› (troncature) et ‹round(x)› (arrondi) : ‹int(3.8)› = 3 mais ‹round(3.8)› = 4.`
    ],
    devoir: [`« Donner le résultat de chaque expression. »`, `« Écrire l'instruction Python correspondante (avec l'import). »`],
    express: `‹Ent› ↔ ‹int›, ‹Arrondi› ↔ ‹round›, ‹Abs› ↔ ‹abs›, ‹RacineCarré› ↔ ‹sqrt›, ‹Aléa› ↔ ‹randint›. Imports obligatoires pour ‹sqrt› et ‹randint›.`,
    express_ar: `‹Ent› تقابل ‹int› و‹Arrondi› تقابل ‹round› و‹Abs› تقابل ‹abs› و‹RacineCarré› تقابل ‹sqrt› و‹Aléa› تقابل ‹randint›. لا بدّ من استيراد ‹sqrt› و‹randint› في بداية برنامج بايثون.`
  });

  L({
    id: "l2.4", chapter: "c2", title: "Le type Booléen et les opérateurs logiques", duree: "15 min", niveau: 2,
    concept: `Un **booléen** ne peut prendre que deux valeurs : ‹Vrai› ou ‹Faux› (‹True› / ‹False› en Python). Il est le résultat d'une comparaison et sert à exprimer les conditions des structures conditionnelles et des boucles.`,
    memorize: [
      `Comparaisons : ‹=›, ‹≠›, ‹<›, ‹≤›, ‹>›, ‹≥› (Python : ‹==›, ‹!=›, ‹<›, ‹<=›, ‹>›, ‹>=›).`,
      `Opérateurs logiques : ‹NON›, ‹ET›, ‹OU› (Python : ‹not›, ‹and›, ‹or›).`,
      `‹A ET B› est vrai seulement si A **et** B sont vrais. ‹A OU B› est faux seulement si A **et** B sont faux.`,
      `Priorité : ‹NON› d'abord, puis ‹ET›, puis ‹OU›. En cas de doute, on met des parenthèses.`
    ],
    understand: [
      `Un intervalle « n est compris entre 10 et 99 » se traduit par deux comparaisons reliées par ‹ET› : ‹(n ≥ 10) ET (n ≤ 99)›.`,
      `En Python on peut écrire de façon abrégée ‹10 <= n <= 99›. En algorithme, on écrit la forme complète avec ‹ET›.`
    ],
    rule: `Table de vérité : voir le tableau. Loi de De Morgan : ‹NON(A ET B) = NON(A) OU NON(B)› et ‹NON(A OU B) = NON(A) ET NON(B)›.`,
    tables: [{
      title: "Table de vérité",
      head: ["A", "B", "NON(A)", "A ET B", "A OU B"],
      rows: [
        ["Vrai", "Vrai", "Faux", "Vrai", "Vrai"],
        ["Vrai", "Faux", "Faux", "Faux", "Vrai"],
        ["Faux", "Vrai", "Vrai", "Faux", "Vrai"],
        ["Faux", "Faux", "Vrai", "Faux", "Faux"]
      ]
    }],
    snippets: [{
      title: "Exemples de conditions",
      lang: "algo",
      code: `# Algorithme                         # Python
(n ≥ 10) ET (n ≤ 99)                 # 10 <= n <= 99   (ou  n >= 10 and n <= 99)
(c = "o") OU (c = "O")               # c == "o" or c == "O"
NON(n MOD 2 = 0)                     # not (n % 2 == 0)   (ou  n % 2 != 0)`
    }],
    application: {
      enonce: `Écris la condition « x est compris entre 5 et 9 (bornes incluses) » en algorithme puis en Python.`,
      solution: `Algorithme : (x ≥ 5) ET (x ≤ 9)\nPython : 5 <= x <= 9   (ou x >= 5 and x <= 9)`
    },
    errors: [
      `Écrire ‹5 ≤ x ≤ 9› en algorithme : il faut ‹(x ≥ 5) ET (x ≤ 9)›.`,
      `Utiliser ‹=› (affectation) à la place de ‹==› en Python pour comparer.`,
      `Écrire ‹NON(A ET B) = NON(A) ET NON(B)› : c'est faux (De Morgan : ‹OU›).`,
      `Oublier les parenthèses autour de chaque comparaison avec ‹ET› / ‹OU›.`
    ],
    devoir: [`« Compléter la table de vérité. »`, `« Écrire la condition qui vérifie que n est un entier à 2 chiffres. »`],
    express: `Booléen = Vrai / Faux. ‹ET› : les deux vrais ; ‹OU› : au moins un vrai ; ‹NON› : l'inverse. Intervalle : ‹(x ≥ a) ET (x ≤ b)›.`,
    express_ar: `المنطقي {(Booléen)} له قيمتان فقط: {Vrai} أو {Faux}. ‹ET› يكون صحيحًا إذا تحقق الشرطان معًا؛ ‹OU› يكفي أن يتحقق أحدهما؛ ‹NON› يعكس القيمة. لتحديد مجال: ‹(x ≥ a) ET (x ≤ b)›.`
  });

  L({
    id: "l2.5", chapter: "c2", title: "Le type Caractère et le code ASCII", duree: "12 min", niveau: 2,
    concept: `Un **caractère** est un seul signe (lettre, chiffre, symbole, espace). Les caractères sont ordonnés selon leur **code ASCII** : à chaque caractère correspond un nombre.`,
    memorize: [
      `Majuscules ‹'A'› à ‹'Z'› : codes **65 à 90**.`,
      `Minuscules ‹'a'› à ‹'z'› : codes **97 à 122** (écart de **+32** avec la majuscule).`,
      `Chiffres ‹'0'› à ‹'9'› : codes **48 à 57**.`,
      `‹ORD(c)› (Python ‹ord(c)›) renvoie le code ASCII du caractère c.`,
      `‹CHR(n)› (Python ‹chr(n)›) renvoie le caractère de code n.`
    ],
    understand: [
      `‹ORD› et ‹CHR› sont des fonctions réciproques : ‹CHR(ORD('A'))› redonne ‹'A'›.`,
      `Comme ‹'0'› a pour code 48, la valeur numérique d'un chiffre-caractère c est ‹ORD(c) - 48›.`,
      `Passer d'une majuscule à la minuscule correspondante : ajouter 32 au code.`
    ],
    rule: `Majuscule → minuscule : ‹CHR(ORD(c) + 32)›. Chiffre-caractère → valeur : ‹ORD(c) - 48›.`,
    tables: [{
      title: "Repères ASCII à retenir",
      head: ["Caractère", "Code ASCII"],
      rows: [["'0'", "48"], ["'9'", "57"], ["'A'", "65"], ["'Z'", "90"], ["'a'", "97"], ["'z'", "122"]]
    }],
    examples: [{
      titre: "Conversion d'une majuscule en minuscule",
      enonce: `Lire une lettre majuscule c et afficher la lettre minuscule correspondante.`,
      donnees: [`‹c› : une lettre majuscule`],
      traitement: `‹m ← CHR(ORD(c) + 32)›`,
      resultat: `‹m› : la minuscule`,
      tdo: [["c", "Caractère"], ["m", "Caractère"]],
      algo: `Algorithme Minuscule
Début
  Ecrire("Donner une lettre majuscule : "), Lire(c)
  m ← CHR(ORD(c) + 32)
  Ecrire("Minuscule : ", m)
Fin`,
      python: `c = input("Donner une lettre majuscule : ")
m = chr(ord(c) + 32)
print("Minuscule :", m)`,
      explication: [
        `‹ORD(c)› donne le code de la majuscule, on ajoute 32, puis ‹CHR› redonne un caractère.`,
        `‹c› et ‹m› sont de type ‹Caractère› (une chaîne de longueur 1 en Python).`
      ],
      execution: `Entrée : D\nORD('D') = 68 ; 68 + 32 = 100 ; CHR(100) = 'd'\nSortie : Minuscule : d`
    }],
    application: {
      enonce: `Donne ‹ORD('0')›, ‹ORD('Z')› et ‹CHR(97)›.`,
      solution: `ORD('0') = 48 ; ORD('Z') = 90 ; CHR(97) = 'a'.`
    },
    errors: [
      `Confondre le caractère ‹'5'› et l'entier ‹5› : ‹ORD('5')› vaut 53, pas 5.`,
      `Oublier que le décalage majuscule / minuscule est de 32.`,
      `Appliquer ‹ORD› à une chaîne de plusieurs caractères : ‹ord› n'accepte qu'un seul caractère.`
    ],
    devoir: [`« Donner le code ASCII de… / le caractère de code… »`, `« Convertir une majuscule en minuscule (ou l'inverse). »`],
    express: `A–Z : 65–90 ; a–z : 97–122 (+32) ; 0–9 : 48–57. ‹ORD› : caractère → code ; ‹CHR› : code → caractère.`,
    express_ar: `الحروف الكبيرة من 65 إلى 90 والصغيرة من 97 إلى 122 (فرق 32) والأرقام من 48 إلى 57. ‹ORD› تعطي رمز الحرف و‹CHR› تعطي الحرف المقابل للرمز.`
  });

  L({
    id: "l2.6", chapter: "c2", title: "Application : conversion d'une durée", duree: "15 min", niveau: 2,
    concept: `Cette application réunit le type Entier et les opérateurs ‹DIV› et ‹MOD› : on décompose une durée exprimée en secondes en heures, minutes et secondes.`,
    memorize: [
      `1 heure = 3600 secondes ; 1 minute = 60 secondes.`,
      `Heures : ‹t DIV 3600›. Secondes restantes : ‹t MOD 3600›.`,
      `Minutes : ‹r DIV 60›. Secondes finales : ‹r MOD 60›.`
    ],
    understand: [
      `On procède par « paquets » : d'abord les plus grands (heures), puis on recommence avec le reste.`,
      `Chaque ‹DIV› / ‹MOD› travaille sur le reste de l'étape précédente, jamais sur ‹t› directement (sauf la première fois).`
    ],
    rule: `Décomposer en unités : quotient avec ‹DIV›, reste avec ‹MOD›, puis on recommence avec le reste.`,
    examples: [{
      titre: "Secondes → heures, minutes, secondes",
      enonce: `Étant donné une durée t en secondes (par exemple 4000 s), déterminer le nombre d'heures h, de minutes mn et de secondes restantes s.`,
      donnees: [`‹t› : la durée en secondes (entier positif)`],
      traitement: `‹h ← t DIV 3600›, ‹r ← t MOD 3600›, ‹mn ← r DIV 60›, ‹s ← r MOD 60›`,
      resultat: `‹h›, ‹mn› et ‹s›`,
      tdo: [["t", "Entier"], ["h", "Entier"], ["r", "Entier"], ["mn", "Entier"], ["s", "Entier"]],
      algo: `Algorithme Duree
Début
  Ecrire("Donner la durée en secondes : "), Lire(t)
  h ← t DIV 3600       # 1 heure = 3600 secondes
  r ← t MOD 3600       # reste des secondes
  mn ← r DIV 60        # 1 minute = 60 secondes
  s ← r MOD 60         # secondes finales
  Ecrire(h, " h ", mn, " mn ", s, " s")
Fin`,
      python: `t = int(input("t (secondes) = "))
h = t // 3600
r = t % 3600
mn = r // 60
s = r % 60
print(h, "h", mn, "mn", s, "s")`,
      explication: [
        `‹r› est une variable intermédiaire : elle garde les secondes qui ne forment pas une heure complète.`,
        `Tous les objets sont des entiers car on ne manipule que des quantités entières d'unités.`
      ],
      execution: `Entrée : t = 4000\nh = 4000 DIV 3600 = 1 ; r = 400 ; mn = 400 DIV 60 = 6 ; s = 400 MOD 60 = 40\nSortie : 1 h 6 mn 40 s`
    }],
    application: {
      enonce: `Écris les deux instructions qui calculent, à partir d'un nombre de minutes ‹m›, les heures ‹h› et les minutes restantes ‹mn›.`,
      solution: `h ← m DIV 60\nmn ← m MOD 60`
    },
    errors: [
      `Utiliser ‹/› au lieu de ‹DIV› : on obtiendrait un réel et non le nombre d'heures entières.`,
      `Calculer les minutes avec ‹t DIV 60› au lieu de ‹r DIV 60› : on compterait aussi les heures déjà extraites.`,
      `Oublier ‹r› et enchaîner les opérations sur ‹t› dans un mauvais ordre.`
    ],
    devoir: [`« Écrire un algorithme qui convertit des secondes en heures / minutes / secondes. »`, `« Appliquer l'algorithme à t = 3725. »`],
    express: `Décomposition d'une durée : ‹h ← t DIV 3600› ; ‹r ← t MOD 3600› ; ‹mn ← r DIV 60› ; ‹s ← r MOD 60›.`,
    express_ar: `تحويل مدة بالثواني: ‹h ← t DIV 3600› ثم ‹r ← t MOD 3600› ثم ‹mn ← r DIV 60› ثم ‹s ← r MOD 60›.`
  });
})(window.DATA);
