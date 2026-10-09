/* Références : correspondances Algorithme / Python, erreurs Python,
   corrections apportées au manuel d'origine et points « À vérifier ». */
(function (D) {
  D.refs = {
    python: [
      { title: "Entrées / sorties et affectation",
        head: ["Opération", "Algorithme (2TI)", "Python"],
        rows: [
          ["Lire un entier", "Lire(n)", `n = int(input("n = "))`],
          ["Lire un réel", "Lire(x)", `x = float(input("x = "))`],
          ["Lire un texte", "Lire(nom)", `nom = input("Nom : ")`],
          ["Afficher un texte", `Ecrire("Message")`, `print("Message")`],
          ["Afficher une valeur", "Ecrire(n)", "print(n)"],
          ["Affichage mixte", `Ecrire("n = ", n)`, `print("n =", n)`],
          ["Affectation", "Variable ← Valeur", "Variable = Valeur"]
        ] },
      { title: "Types et opérateurs",
        head: ["Notion", "Algorithme", "Python"],
        rows: [
          ["Entier / Réel / Booléen", "Entier / Réel / Booléen", "int / float / bool"],
          ["Caractère / Chaîne", "Caractère / Chaîne", "str / str"],
          ["Quotient entier", "a DIV b", "a // b"],
          ["Reste", "a MOD b", "a % b"],
          ["Différent de", "a ≠ b", "a != b"],
          ["Égal à (comparaison)", "a = b", "a == b"],
          ["Et / Ou / Non", "ET / OU / NON", "and / or / not"],
          ["Vrai / Faux", "Vrai / Faux", "True / False"]
        ] },
      { title: "Fonctions mathématiques et aléatoires",
        head: ["Algorithme", "Python", "Import nécessaire"],
        rows: [
          ["Ent(x)", "int(x)", "non"],
          ["Arrondi(x)", "round(x)", "non"],
          ["Abs(x)", "abs(x)", "non"],
          ["RacineCarré(x)", "sqrt(x)", "from math import sqrt"],
          ["Aléa(a, b)", "randint(a, b)", "from random import randint"]
        ] },
      { title: "Chaînes de caractères",
        head: ["Algorithme", "Python", "Exemple"],
        rows: [
          ["Long(ch)", "len(ch)", `len("Tunis") → 5`],
          ["ch[i]", "ch[i]", `"Tunis"[0] → "T"`],
          ["ch[d:f]", "ch[d:f]", `"Tunis"[1:3] → "un"`],
          ["Pos(ch1, ch2)", "ch2.find(ch1)", `"Tunis".find("n") → 2`],
          ["Convch(x)", "str(x)", `str(2026) → "2026"`],
          ["Estnum(ch)", "ch.isnumeric()", `"123".isnumeric() → True`],
          ["Valeur(ch)", "int(ch) / float(ch)", `int("123") → 123`],
          ["Majus(ch)", "ch.upper()", `"tunis".upper() → "TUNIS"`],
          ["ch1 + ch2", "ch1 + ch2", `"Bon" + "jour" → "Bonjour"`],
          ["ORD(c) / CHR(n)", "ord(c) / chr(n)", `ord("A") → 65`]
        ] },
      { title: "Structures conditionnelles et itératives",
        head: ["Algorithme", "Python"],
        rows: [
          ["Si cond alors … Sinon … Fin Si", "if cond: … else: …"],
          ["Sinon Si cond alors …", "elif cond:"],
          ["Selon v faire … Fin Selon", "match v: case … (Python ≥ 3.10)"],
          ["Pour i de a à b Faire … Fin Pour", "for i in range(a, b + 1):"],
          ["Tant que cond Faire … Fin Tant que", "while cond:"],
          ["Répéter … Jusqu'à cond", "while True: … if cond: break"]
        ] },
      { title: "Vecteurs",
        head: ["Algorithme", "Python"],
        rows: [
          ["T : tableau de N entiers", "T = [0] * N"],
          ["T : tableau de N réels", "T = [0.0] * N"],
          ["Lire(T[i])", "T[i] = int(input())"],
          ["Ecrire(T[i])", "print(T[i])"],
          ["Pour i de 0 à N-1 Faire", "for i in range(N):"]
        ] }
    ],

    pyErrors: [
      { name: "NameError", cause: "Variable ou fonction utilisée avant d'exister (oubli d'affectation, d'import, faute de frappe).", example: "print(sqrt(25))   # sans import", fix: "from math import sqrt" },
      { name: "TypeError", cause: "Opération entre types incompatibles (chaîne + entier, modification d'une chaîne…).", example: `"age : " + 17`, fix: `"age : " + str(17)` },
      { name: "ValueError", cause: "Conversion impossible.", example: `int("abc")`, fix: "Vérifier la saisie avec isnumeric() avant de convertir." },
      { name: "IndexError", cause: "Indice hors des limites d'une chaîne ou d'un vecteur.", example: "T = [0] * 5 ; T[5]", fix: "Les indices vont de 0 à len(T) - 1." },
      { name: "IndentationError", cause: "Bloc mal indenté ou indentation manquante.", example: "if n > 0:\nprint(n)", fix: "Indenter le bloc de 4 espaces." },
      { name: "SyntaxError", cause: "Deux-points oubliés, parenthèse ou guillemet non fermé…", example: "if n > 0", fix: "if n > 0:" },
      { name: "ZeroDivisionError", cause: "Division ou modulo par zéro.", example: "5 / 0", fix: "Tester le diviseur avant de diviser." }
    ],

    fixes: [
      { titre: "Faute d'orthographe dans le titre", detail: `« Exercices Corrégés » a été corrigé en « Exercices corrigés ».` },
      { titre: "input() et calculs directs", detail: `Le manuel indique que calculer sur ‹input()› « provoque une erreur de type ». C'est exact pour ‹"5" + 1› (TypeError), mais ‹"5" * 2› donne ‹"55"› sans erreur et ‹"5" + "3"› donne ‹"53"›. La leçon précise maintenant les deux cas.` },
      { titre: "Ent(x) ↔ int(x)", detail: `L'équivalence est exacte pour les nombres positifs. Pour un négatif, ‹int(-3.8)› = -3 alors que la partie entière mathématique vaut -4. Remarque ajoutée dans la leçon 2.3.` },
      { titre: "Arrondi(x) ↔ round(x)", detail: `Python arrondit les valeurs « au milieu » (2.5, 3.5…) vers l'entier pair. Remarque ajoutée.` },
      { titre: "Fonctions aléatoires", detail: `Le manuel importe ‹uniform› sans l'expliquer. Ajout : ‹uniform(a, b)› renvoie un réel, ‹randint(a, b)› un entier.` },
      { titre: "Ordre des arguments de Pos / find", detail: `‹Pos(ch1, ch2)› cherche ch1 dans ch2, mais ‹ch2.find(ch1)› inverse l'ordre. Mise en garde ajoutée (leçon 3.3).` },
      { titre: "Permutation sans variable auxiliaire", detail: `La solution arithmétique du manuel est conservée comme Bonus ; la méthode avec ‹z› reste la référence car elle marche pour tous les types. Ajout du ‹a, b = b, a› propre à Python.` },
      { titre: "PGCD par soustractions", detail: `Ajout de la précondition : m et n strictement positifs (avec 0 la boucle ne s'arrête jamais).` },
      { titre: "Factorielle : algorithme manquant", detail: `Le manuel ne donnait que le code Python. L'algorithme et le T.D.O ont été ajoutés (leçon 6.6).` },
      { titre: "Tant que, Pour, Répéter : Python manquant", detail: `Ajout de l'équivalent Python de ‹Tant que› (‹while›) et de la boucle ‹Pour› avec traces d'exécution.` },
      { titre: "Contenu complété", detail: `Ajout de la méthode d'analyse (Résultat / Données / Traitement) et du T.D.O (chapitre 0), de la table de vérité commentée avec De Morgan, des tableaux et boucles (chapitre 7) et d'un aperçu des fonctions (chapitre 8, Bonus).` }
    ],

    toVerify: [
      { titre: "Premier indice d'un vecteur", detail: `Le manuel numérote de 0 à N − 1 (comme Python). Certains manuels d'algorithmique de 2ème année notent T[1..N]. Vérifier la convention utilisée en classe.` },
      { titre: "Valeur de Pos quand le motif est absent", detail: `Le manuel indique -1 (convention Python). Certains manuels d'algorithmique renvoient 0. Le site suit le manuel.` },
      { titre: "Place du chapitre 7 (parcours de vecteur)", detail: `Il prolonge naturellement les chapitres 4 et 6, mais son ordre dans l'année peut varier selon l'enseignant.` },
      { titre: "Syntaxe algorithmique des fonctions", detail: `Non traitée au programme de 2ème année : le chapitre 8 est Bonus / Hors programme et ne donne que la forme Python.` },
      { titre: "Programme officiel", detail: `Le contenu suit le manuel fourni. Si tu disposes du programme officiel détaillé de ton niveau, compare-le avec la liste des chapitres.` }
    ]
  };
})(window.DATA);
