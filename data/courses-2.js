/* Cours — Chapitres 3, 4 et 5 */
(function (D) {
  const L = (o) => D.lessons.push(o);

  /* ------------------------------------------------------------------ C3 */
  L({
    id: "l3.1", chapter: "c3", title: "Chaîne de caractères : définition et indexation", duree: "12 min", niveau: 1,
    concept: `Une **chaîne de caractères** est une suite ordonnée de n caractères (n ≥ 0). Si n = 0, la chaîne est dite **vide** (‹""›). Chaque caractère occupe une position précise appelée **indice**.`,
    memorize: [
      `Les indices commencent **toujours à 0**.`,
      `Une chaîne de 12 caractères a des indices de 0 à 11 : le dernier caractère est à l'indice ‹Long(ch) - 1›.`,
      `Accès à un caractère : ‹ch[i]›. Nombre de caractères : ‹Long(ch)› (Python ‹len(ch)›).`
    ],
    understand: [
      `Le **premier** caractère est ‹ch[0]›, pas ‹ch[1]›.`,
      `L'indice ‹Long(ch)› n'existe pas : tenter d'y accéder provoque une erreur.`,
      `L'espace est un caractère comme un autre : il occupe un indice.`
    ],
    rule: `Pour une chaîne ‹ch› de longueur n : indices valides = **0 … n − 1**.`,
    tables: [{
      title: `Indexation de ch = "Tunis"`,
      head: ["Indice", "0", "1", "2", "3", "4"],
      rows: [["Caractère", "T", "u", "n", "i", "s"]]
    }],
    notes: [
      { kind: "trap", title: "Dépassement d'indice (IndexError)", text: `Tenter d'accéder à ‹ch[Long(ch)]› provoque une erreur fatale ‹IndexError› car les indices s'arrêtent à ‹Long(ch) - 1›.` },
      { kind: "bonus", title: "Indices négatifs (Python)", text: `En Python, ‹ch[-1]› désigne le dernier caractère. C'est pratique mais propre à Python : en algorithme on écrit ‹ch[Long(ch) - 1]›.` }
    ],
    snippets: [{
      title: "Accéder aux caractères",
      lang: "py",
      code: `ch = "Tunis"
print(len(ch))      # 5
print(ch[0])        # T   (premier caractère)
print(ch[4])        # s   (dernier : len(ch) - 1)
# print(ch[5])      # IndexError : l'indice 5 n'existe pas`
    }],
    application: {
      enonce: `Pour ‹ch = "Bonjour"› donne ‹Long(ch)›, ‹ch[0]› et l'indice du dernier caractère.`,
      solution: `Long(ch) = 7 ; ch[0] = "B" ; dernier indice = 6 (caractère "r").`
    },
    errors: [
      `Croire que le premier caractère est à l'indice 1.`,
      `Écrire ‹ch[Long(ch)]› pour atteindre le dernier caractère.`,
      `Oublier de compter les espaces dans la longueur.`
    ],
    devoir: [`« Donner Long(ch) et ch[i] pour une chaîne donnée. »`, `« Quel est le dernier indice valide ? »`],
    express: `Indices de 0 à ‹Long(ch) - 1›. Premier : ‹ch[0]›. Dernier : ‹ch[Long(ch) - 1]›. ‹ch[Long(ch)]› → erreur.`,
    express_ar: `ترقيم الحروف يبدأ من 0 وينتهي عند ‹Long(ch) - 1›. الحرف الأول ‹ch[0]› والأخير ‹ch[Long(ch) - 1]›، أما ‹ch[Long(ch)]› فيسبب خطأ.`
  });

  L({
    id: "l3.2", chapter: "c3", title: "Les tranches (slicing) : ch[d:f]", duree: "15 min", niveau: 2,
    concept: `Le **slicing** permet d'extraire une sous-chaîne d'une chaîne existante grâce à la notation ‹ch[d:f]›.`,
    memorize: [
      `L'indice de début **d est inclus**.`,
      `L'indice de fin **f est exclu**.`,
      `Le nombre de caractères extraits est **f − d**.`,
      `‹ch[:f]› : du début jusqu'à f exclu. ‹ch[d:]› : de d jusqu'à la fin.`
    ],
    understand: [
      `Pour extraire les caractères d'indices 3, 4, 5 et 6, on écrit ‹ch[3:7]› : on s'arrête **juste avant** 7.`,
      `Une tranche ne provoque pas d'erreur si f dépasse la longueur : elle s'arrête simplement à la fin.`,
      `On obtient toujours une **nouvelle chaîne** ; la chaîne d'origine n'est pas modifiée.`
    ],
    rule: `‹ch[d:f]› = caractères d'indices **d, d+1, …, f−1**, soit **f − d** caractères.`,
    tables: [
      {
        title: `Indices de ch = "Bonjour papa"`,
        head: ["Indice", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        rows: [["Caractère", "B", "o", "n", "j", "o", "u", "r", "␣", "p", "a", "p", "a"]]
      },
      {
        title: `Exemples de tranches avec ch = "Bonjour papa"`,
        head: ["Tranche", "Résultat", "Explication"],
        rows: [
          ["ch[:3]", `"Bon"`, "les 3 premiers caractères"],
          ["ch[3:7]", `"jour"`, "du caractère d'indice 3 à l'indice 6"],
          ["ch[8:]", `"papa"`, "de l'indice 8 jusqu'à la fin"],
          ["ch[0:Long(ch)]", `"Bonjour papa"`, "toute la chaîne"]
        ]
      }
    ],
    notes: [{ kind: "bonus", title: "Fin de chaîne (Python)", text: `‹ch[-4:]› donne les 4 derniers caractères (« papa »). En algorithme, on écrit ‹ch[Long(ch) - 4 :]›.` }],
    application: {
      enonce: `Avec ‹ch = "Informatique"›, donne ‹ch[:4]› et ‹ch[8:]›.`,
      solution: `ch[:4] = "Info" ; ch[8:] = "ique".`
    },
    errors: [
      `Croire que l'indice de fin est inclus : ‹ch[3:7]› ne contient pas ‹ch[7]›.`,
      `Se tromper dans le nombre de caractères : c'est ‹f - d›, pas ‹f - d + 1›.`,
      `Confondre ‹ch[i]› (un caractère) et ‹ch[d:f]› (une tranche).`
    ],
    devoir: [`« Donner le résultat de chaque tranche. »`, `« Extraire le jour, le mois et l'année d'une date. »`],
    express: `‹ch[d:f]› : début inclus, fin exclue, ‹f - d› caractères. ‹ch[:f]› depuis le début, ‹ch[d:]› jusqu'à la fin.`,
    express_ar: `‹ch[d:f]›: الفهرس d محسوب والفهرس f غير محسوب، وعدد الحروف المستخرجة ‹f - d›. ‹ch[:f]› من البداية و‹ch[d:]› حتى النهاية.`
  });

  L({
    id: "l3.3", chapter: "c3", title: "Les fonctions prédéfinies sur les chaînes", duree: "18 min", niveau: 2,
    concept: `L'algorithmique et Python offrent des fonctions toutes prêtes pour mesurer, chercher, convertir et transformer des chaînes.`,
    memorize: [
      `‹Long(ch)› ↔ ‹len(ch)› : nombre de caractères.`,
      `‹Pos(ch1, ch2)› ↔ ‹ch2.find(ch1)› : position de ch1 dans ch2, **-1 si absent**.`,
      `‹Convch(x)› ↔ ‹str(x)› : nombre → chaîne.`,
      `‹Estnum(ch)› ↔ ‹ch.isnumeric()› : Vrai si ch ne contient que des chiffres.`,
      `‹Valeur(ch)› ↔ ‹int(ch)› ou ‹float(ch)› : chaîne → nombre.`,
      `‹Majus(ch)› ↔ ‹ch.upper()› : conversion en majuscules.`,
      `‹ch1 + ch2› : concaténation (fusion de textes).`
    ],
    understand: [
      `**Attention à l'ordre** : ‹Pos(ch1, ch2)› cherche ch1 *dans* ch2, alors qu'en Python on écrit ‹ch2.find(ch1)› : les deux chaînes sont inversées.`,
      `On ne peut pas concaténer directement une chaîne et un nombre : ‹"age : " + 17› provoque une erreur de type. Il faut ‹"age : " + str(17)›.`,
      `‹Estnum› sert à contrôler une saisie avant de la convertir avec ‹Valeur›.`
    ],
    rule: `Chercher : ‹Pos› / ‹find› (résultat ≥ 0 si trouvé, -1 sinon). Convertir : ‹Convch› / ‹str›, ‹Valeur› / ‹int›. Fusionner : ‹+› entre **deux chaînes**.`,
    tables: [{
      title: "Fonctions prédéfinies (exemples avec ch = \"Tunis\")",
      head: ["Algorithme", "Python", "Description et effet", "Exemple"],
      rows: [
        ["Long(ch)", "len(ch)", "Nombre de caractères", `len("Tunis") → 5`],
        ["Pos(ch1, ch2)", "ch2.find(ch1)", "Position de ch1 dans ch2 (-1 si absent)", `"Tunis".find("n") → 2`],
        ["Convch(x)", "str(x)", "Convertit un nombre en chaîne", `str(2026) → "2026"`],
        ["Estnum(ch)", "ch.isnumeric()", "Vrai si ch ne contient que des chiffres", `"123".isnumeric() → Vrai`],
        ["Valeur(ch)", "int(ch) / float(ch)", "Convertit une chaîne en nombre", `int("123") → 123`],
        ["Majus(ch)", "ch.upper()", "Convertit en majuscules", `"tunis".upper() → "TUNIS"`],
        ["ch1 + ch2", "ch1 + ch2", "Concaténation (fusion de textes)", `"Bon" + "jour" → "Bonjour"`]
      ]
    }],
    notes: [
      { kind: "verify", title: "Valeur renvoyée par Pos quand le motif est absent", text: `Le manuel indique ‹-1›, ce qui correspond à Python (‹find›). Certains manuels d'algorithmique notent plutôt ‹0›. Dans tous les devoirs de ce site on suit la convention du manuel : -1.` },
      { kind: "remark", title: "isnumeric et isdigit", text: `Pour de simples chiffres, ‹isnumeric()› et ‹isdigit()› donnent le même résultat. Un nombre avec un point ou un signe (« 3.5 », « -4 ») n'est pas « numérique » au sens de ces fonctions.` }
    ],
    examples: [{
      titre: "Vérifier un code postal",
      enonce: `Lire un code postal (chaîne) et dire s'il est valide : il doit contenir exactement 4 chiffres.`,
      donnees: [`‹cp› : le code postal saisi (chaîne)`],
      traitement: `‹valide ← Estnum(cp) ET (Long(cp) = 4)›`,
      resultat: `‹valide› : un booléen (Vrai si le code est valide)`,
      tdo: [["cp", "Chaîne"], ["valide", "Booléen"]],
      algo: `Algorithme CodePostal
Début
  Ecrire("Code postal : "), Lire(cp)
  valide ← Estnum(cp) ET (Long(cp) = 4)
  Ecrire("Code valide : ", valide)
Fin`,
      python: `cp = input("Code postal : ")
valide = cp.isnumeric() and len(cp) == 4
print("Code valide :", valide)`,
      explication: [
        `Un code postal est une chaîne (règle d'or du chapitre 2) : on le lit sans ‹int()›.`,
        `Les deux conditions sont reliées par ‹ET› : il faut que les deux soient vraies.`
      ],
      execution: `Entrée : 1002\nEstnum → Vrai ; Long = 4 → Vrai\nSortie : Code valide : True`
    }],
    application: {
      enonce: `Que valent ‹"tunis".upper()› et ‹str(2026) + "!"› ?`,
      solution: `"tunis".upper() → "TUNIS" ; str(2026) + "!" → "2026!".`
    },
    errors: [
      `Concaténer une chaîne et un nombre sans ‹str()› : ‹"age : " + 17› → ‹TypeError›.`,
      `Inverser les arguments de ‹Pos› / ‹find›.`,
      `Oublier que ‹find› renvoie -1 (et non « faux ») quand le motif est absent.`,
      `Écrire ‹len(ch)› sans parenthèses ou ‹ch.len()›.`
    ],
    devoir: [`« Donner le résultat de chaque expression. »`, `« Écrire la condition qui vérifie une saisie numérique. »`],
    express: `‹Long›↔‹len› ; ‹Pos(a,b)›↔‹b.find(a)› (−1 si absent) ; ‹Convch›↔‹str› ; ‹Estnum›↔‹isnumeric› ; ‹Valeur›↔‹int/float› ; ‹Majus›↔‹upper›. ‹+› : deux chaînes seulement.`,
    express_ar: `‹Long› تقابل ‹len› و‹Pos(a,b)› تقابل ‹b.find(a)› (تعطي -1 إذا لم توجد) و‹Convch› تقابل ‹str› و‹Estnum› تقابل ‹isnumeric› و‹Valeur› تقابل ‹int/float› و‹Majus› تقابل ‹upper›. العلامة ‹+› تربط سلسلتين فقط.`
  });

  L({
    id: "l3.4", chapter: "c3", title: "Immutabilité des chaînes et recomposition", duree: "15 min", niveau: 2,
    concept: `En Python, les chaînes sont **immutables** : on ne peut pas modifier directement un de leurs caractères. Pour « modifier » une chaîne, on en **reconstruit** une nouvelle par concaténation de tranches.`,
    memorize: [
      `‹ch[0] = "X"› provoque une erreur (‹TypeError›).`,
      `Remplacer le premier caractère : ‹ch = "X" + ch[1:]›.`,
      `Découper puis recomposer avec les tranches et le ‹+›.`
    ],
    understand: [
      `‹ch[1:]› garde tout sauf le premier caractère ; on lui colle un nouveau début.`,
      `Le résultat est rangé dans la même variable (affectation) : l'ancienne chaîne est simplement remplacée par la nouvelle.`
    ],
    rule: `Pour modifier la chaîne ‹ch› : **tranche avant** + **nouveau texte** + **tranche après**.`,
    snippets: [{
      title: "Modification de chaîne",
      lang: "py",
      code: `ch = "Tunis"
# ch[0] = "X"            # TypeError : impossible
ch = "X" + ch[1:]        # "Xunis"
ch = ch[:4] + "!"        # remplace le dernier caractère : "Xuni!"`
    }],
    examples: [{
      titre: "Réorganiser une date : JJ/MM/AAAA → AAAA-MM-JJ",
      enonce: `Soit une date saisie au format JJ/MM/AAAA (par exemple « 04/10/2026 »). La réécrire au format AAAA-MM-JJ.`,
      donnees: [`‹date› : la date saisie (chaîne de 10 caractères)`],
      traitement: `‹j ← date[:2]›, ‹m ← date[3:5]›, ‹a ← date[6:]›, puis ‹date_formatted ← a + "-" + m + "-" + j›`,
      resultat: `‹date_formatted› : la date au format AAAA-MM-JJ`,
      tdo: [["date", "Chaîne"], ["j", "Chaîne"], ["m", "Chaîne"], ["a", "Chaîne"], ["date_formatted", "Chaîne"]],
      algo: `Algorithme DateFormat
Début
  Ecrire("Donner une date (JJ/MM/AAAA) : "), Lire(date)
  j ← date[:2]         # jour : indices 0 et 1
  m ← date[3:5]        # mois : indices 3 et 4
  a ← date[6:]         # année : à partir de l'indice 6
  date_formatted ← a + "-" + m + "-" + j
  Ecrire("Date au format US : ", date_formatted)
Fin`,
      python: `date = input("JJ/MM/AAAA : ")
j = date[:2]
m = date[3:5]
a = date[6:]
print(a + "-" + m + "-" + j)`,
      explication: [
        `Les « / » occupent les indices 2 et 5 : on les saute en commençant le mois à l'indice 3 et l'année à l'indice 6.`,
        `Toutes les variables sont des chaînes : on ne calcule pas avec une date.`
      ],
      execution: `Entrée : 04/10/2026\nj = "04" ; m = "10" ; a = "2026"\nSortie : 2026-10-04`
    }],
    application: {
      enonce: `Pour ‹date = "25/12/2026"›, donne ‹date[:2]›, ‹date[3:5]› et ‹date[6:]›.`,
      solution: `date[:2] = "25" ; date[3:5] = "12" ; date[6:] = "2026".`
    },
    errors: [
      `Écrire ‹ch[0] = "X"› pour modifier un caractère.`,
      `Décaler les indices d'une position (oublier les « / »).`,
      `Mélanger ‹+› entre chaîne et nombre sans conversion.`
    ],
    devoir: [`« Extraire le jour, le mois et l'année d'une date. »`, `« Modifier un caractère d'une chaîne. »`],
    express: `Chaînes immutables : ‹ch[0] = "X"› interdit ; on reconstruit : ‹ch = "X" + ch[1:]›.`,
    express_ar: `سلاسل الحروف في بايثون غير قابلة للتعديل المباشر: ‹ch[0] = "X"› غير مسموح؛ نعيد البناء بالتجميع: ‹ch = "X" + ch[1:]›.`
  });

  /* ------------------------------------------------------------------ C4 */
  L({
    id: "l4.1", chapter: "c4", title: "Le vecteur : concept et déclaration", duree: "12 min", niveau: 1,
    concept: `Un **vecteur** (tableau à une dimension) est une structure de données **homogène** qui permet de ranger un nombre **fixe** d'éléments de **même type** sous un seul nom de variable.`,
    memorize: [
      `Pourquoi ? Pour ne pas créer 30 variables distinctes (‹note1›, ‹note2›, … ‹note30›) quand on traite une série de données de même nature.`,
      `Les cases sont numérotées par un **indice** de **0 à N − 1**.`,
      `Déclaration (T.D.O) : ‹T : tableau de N type›, par exemple ‹T : tableau de 10 réels›.`,
      `Python : ‹T = [0] * N› (entiers) ou ‹T = [0.0] * N› (réels).`,
      `Accès à une case : ‹T[0]› = première case, ‹T[2]› = troisième case.`
    ],
    understand: [
      `Un vecteur est comme une rangée de casiers numérotés à partir de 0, tous destinés au même type d'objet.`,
      `Taille fixe : un vecteur de 5 cases reste un vecteur de 5 cases.`,
      `Une liste Python pourrait mélanger les types, mais le cours impose un vecteur **homogène**.`
    ],
    rule: `Vecteur de N éléments → indices valides **0 … N − 1**. Toutes les cases ont le même type.`,
    tables: [{
      title: "Vecteur T de 5 entiers (exemple)",
      head: ["Indice", "0", "1", "2", "3", "4"],
      rows: [["Valeur", "12", "7", "9", "20", "5"]]
    }],
    notes: [{ kind: "verify", title: "Premier indice : 0 ou 1 ?", text: `Ce manuel (et Python) numérotent les cases à partir de **0**. Certains anciens manuels d'algorithmique numérotent à partir de 1 (‹T[1..N]›). On suit ici la convention du manuel : 0 à N − 1. Lis toujours la déclaration d'un énoncé avant de répondre.` }],
    snippets: [{
      title: "Déclarer un vecteur et accéder aux cases",
      lang: "algo",
      code: `# T.D.O :  T | tableau de 5 entiers
T[0] ← 12
T[1] ← 7
Ecrire(T[0] + T[1])      # affiche 19

# Python
T = [0] * 5
T[0] = 12
T[1] = 7
print(T[0] + T[1])       # 19`
    }],
    application: {
      enonce: `Un vecteur ‹T› contient 8 éléments. Quels sont les indices valides ? Écris la déclaration Python pour 4 réels.`,
      solution: `Indices de 0 à 7. Pour 4 réels : ‹T = [0.0] * 4›.`
    },
    errors: [
      `Utiliser l'indice N pour la dernière case : la dernière case est ‹T[N - 1]›.`,
      `Mélanger des types dans un même vecteur.`,
      `Oublier de déclarer le vecteur (T.D.O) ou de l'initialiser en Python.`
    ],
    devoir: [`« Déclarer un vecteur de N éléments dans le T.D.O. »`, `« Donner le dernier indice valide. »`],
    express: `Vecteur = N valeurs de même type sous un nom ; indices 0 … N−1. Python : ‹T = [0] * N›.`,
    express_ar: `المتجه {(Vecteur)} بنية تضم عددًا ثابتًا من العناصر من نفس النوع تحت اسم واحد؛ الفهارس من 0 إلى N−1. في بايثون: ‹T = [0] * N›.`
  });

  L({
    id: "l4.2", chapter: "c4", title: "Manipuler un vecteur et éviter les pièges", duree: "15 min", niveau: 2,
    concept: `On lit et on écrit un vecteur **case par case**, en désignant chaque case par son indice entre crochets. Pour les calculs, une case se manipule comme une variable du même type.`,
    memorize: [
      `Lire une case : ‹Lire(T[0])›. Écrire dans une case : ‹T[1] ← 5›.`,
      `Python : ‹T[0] = int(input())›.`,
      `Piège 1 : dépassement d'indice (‹T[5]› n'existe pas dans un vecteur de 5).`,
      `Piège 2 : incompatibilité de type.`,
      `Piège 3 : permutation sans variable auxiliaire ‹z›.`
    ],
    understand: [
      `Échanger deux cases suit la même règle que pour deux variables : ‹z ← T[0]›, ‹T[0] ← T[1]›, ‹T[1] ← z›.`,
      `Une case a le type du vecteur : on ne range pas du texte dans un vecteur d'entiers.`
    ],
    rule: `Accéder à ‹T[i]› avec ‹0 ≤ i ≤ N − 1›. Hors de cet intervalle : erreur (‹IndexError›).`,
    examples: [{
      titre: "Moyenne de 3 notes rangées dans un vecteur",
      enonce: `Lire 3 notes et afficher leur moyenne, en utilisant un vecteur N.`,
      donnees: [`‹N[0]›, ‹N[1]›, ‹N[2]› : trois notes (réels)`],
      traitement: `‹M ← (N[0] + N[1] + N[2]) / 3›`,
      resultat: `‹M› : la moyenne`,
      tdo: [["N", "tableau de 3 réels"], ["M", "Réel"]],
      algo: `Algorithme MoyenneNotes
Début
  Lire(N[0]), Lire(N[1]), Lire(N[2])
  M ← (N[0] + N[1] + N[2]) / 3
  Ecrire("Moyenne = ", M)
Fin`,
      python: `N = [0.0] * 3
N[0] = float(input("Note 1 : "))
N[1] = float(input("Note 2 : "))
N[2] = float(input("Note 3 : "))
M = (N[0] + N[1] + N[2]) / 3
print("Moyenne =", M)`,
      explication: [
        `Le vecteur ‹N› a 3 cases : indices 0, 1 et 2.`,
        `Les parenthèses autour de la somme sont indispensables : sans elles, seule ‹N[2]› serait divisée par 3.`
      ],
      execution: `Entrées : 12 ; 14 ; 16\nM = (12 + 14 + 16) / 3 = 14.0\nSortie : Moyenne = 14.0`
    }],
    snippets: [{
      title: "Permuter deux cases",
      lang: "py",
      code: `z = T[0]
T[0] = T[1]
T[1] = z`
    }],
    application: {
      enonce: `Avec ‹T = [5, 8, 2]›, que vaut ‹T[1]› ? Quelle case n'existe pas ?`,
      solution: `T[1] = 8. Les indices valides sont 0, 1 et 2 : ‹T[3]› n'existe pas.`
    },
    errors: [
      `Dépassement d'indice : dans un vecteur de 5 éléments la dernière case est ‹T[4]›.`,
      `Incompatibilité de type : ranger du texte dans un vecteur d'entiers.`,
      `Permutation incorrecte : pour échanger ‹T[0]› et ‹T[1]› il faut une variable auxiliaire ‹z›.`,
      `Oublier les parenthèses dans une moyenne.`
    ],
    devoir: [`« Écrire l'algorithme qui lit N notes dans un vecteur et calcule la moyenne. »`, `« Permuter deux éléments d'un vecteur. »`],
    express: `Lire/écrire case par case ; ‹T[i]› avec 0 ≤ i ≤ N−1. Permuter deux cases : variable auxiliaire ‹z›.`,
    express_ar: `نقرأ ونكتب في المتجه خانة بخانة؛ ‹T[i]› مع 0 ≤ i ≤ N−1. لتبديل خانتين نستعمل متغيرًا مساعدًا ‹z›.`
  });

  /* ------------------------------------------------------------------ C5 */
  L({
    id: "l5.1", chapter: "c5", title: "La structure conditionnelle simple : Si … Sinon", duree: "15 min", niveau: 1,
    concept: `Jusqu'ici, nos programmes s'exécutaient **ligne après ligne**. Une **structure conditionnelle** exécute un bloc d'instructions seulement si une **condition** (expression booléenne Vrai / Faux) est vérifiée.`,
    memorize: [
      `Forme à deux branches : ‹Si condition alors … Sinon … Fin Si›.`,
      `Forme réduite : ‹Si condition alors … Fin Si› (rien ne se passe si la condition est fausse).`,
      `Python : ‹if condition:› / ‹else:› avec **deux-points** et **indentation**.`
    ],
    understand: [
      `Un seul des deux blocs est exécuté : celui du ‹alors› si la condition est Vraie, celui du ‹Sinon› si elle est Fausse.`,
      `En Python, c'est l'**indentation** (4 espaces) qui délimite les blocs ; il n'y a pas de ‹Fin Si›.`,
      `En algorithme, la condition utilise ‹=› pour comparer ; en Python on utilise ‹==›.`
    ],
    rule: `Deux branches exclusives : **Vrai → traitement 1**, **Faux → traitement 2**.`,
    snippets: [
      {
        title: "Forme alternative (Si … Sinon)",
        lang: "algo",
        code: `Si condition alors
  Traitement 1        # exécuté si Vrai
Sinon
  Traitement 2        # exécuté si Faux
Fin Si`
      },
      {
        title: "Python correspondant",
        lang: "py",
        code: `if condition:
    traitement_1
else:
    traitement_2`
      },
      {
        title: "Forme réduite : valeur absolue",
        lang: "algo",
        code: `Si x < 0 alors
  x ← -x
Fin Si`
      }
    ],
    examples: [{
      titre: "Pair ou impair ?",
      enonce: `Lire un entier n et afficher s'il est pair ou impair.`,
      donnees: [`‹n› : un entier`],
      traitement: `Tester la condition ‹n MOD 2 = 0›`,
      resultat: `Le message « pair » ou « impair »`,
      tdo: [["n", "Entier"]],
      algo: `Algorithme Parite
Début
  Ecrire("n = "), Lire(n)
  Si n MOD 2 = 0 alors
    Ecrire(n, " est pair")
  Sinon
    Ecrire(n, " est impair")
  Fin Si
Fin`,
      python: `n = int(input("n = "))
if n % 2 == 0:
    print(n, "est pair")
else:
    print(n, "est impair")`,
      explication: [
        `‹n MOD 2› vaut 0 pour un nombre pair et 1 pour un nombre impair.`,
        `Dans l'algorithme on compare avec ‹=› ; en Python on écrit ‹==›.`
      ],
      execution: `Entrée : n = 7\n7 MOD 2 = 1 → condition Fausse → branche Sinon\nSortie : 7 est impair`
    }],
    application: {
      enonce: `Écris en algorithme : lire x ; afficher « négatif » si x est négatif, « positif ou nul » sinon.`,
      solution: `Ecrire("x = "), Lire(x)\nSi x < 0 alors\n  Ecrire("négatif")\nSinon\n  Ecrire("positif ou nul")\nFin Si`
    },
    errors: [
      `Oublier les deux-points ‹:› après ‹if› ou ‹else› en Python.`,
      `Mauvaise indentation en Python (‹IndentationError›).`,
      `Écrire ‹Si n = 5 alors› avec ‹←› ou ‹if n = 5:› avec un seul ‹=› en Python.`,
      `Oublier ‹Fin Si› dans l'algorithme.`
    ],
    devoir: [`« Écrire un algorithme qui teste si un nombre est pair, positif, divisible par… »`, `« Traduire en Python avec ‹if› / ‹else›. »`],
    express: `‹Si cond alors … Sinon … Fin Si› ↔ ‹if cond: … else: …›. Python : deux-points et indentation obligatoires.`,
    express_ar: `‹Si cond alors … Sinon … Fin Si› تقابل ‹if cond: … else: …›. في بايثون النقطتان والإزاحة (indentation) إجباريتان.`
  });

  L({
    id: "l5.2", chapter: "c5", title: "La forme généralisée (conditions imbriquées)", duree: "15 min", niveau: 2,
    concept: `Quand il y a **plus de deux choix**, on utilise la forme généralisée : les conditions sont examinées **dans l'ordre**. Dès qu'une condition est vraie, son traitement est exécuté et **tout le reste est ignoré**.`,
    memorize: [
      `Algorithme : ‹Si c1 alors … Sinon Si c2 alors … Sinon … Fin Si›.`,
      `Python : ‹if c1: … elif c2: … else: …›.`,
      `Le dernier ‹Sinon› (cas par défaut) est facultatif mais recommandé.`
    ],
    understand: [
      `**L'ordre des conditions compte** : on teste d'abord la plus restrictive. Avec ‹moy >= 10› testé en premier, une moyenne de 17 recevrait « Passable ».`,
      `Une seule branche est exécutée : dès qu'une condition est vraie, on sort de la structure.`
    ],
    rule: `Tester du **cas le plus exigeant** au **moins exigeant** ; terminer par le cas par défaut.`,
    snippets: [{
      title: "Forme généralisée",
      lang: "algo",
      code: `Si condition_1 alors
  Traitement 1
Sinon Si condition_2 alors
  Traitement 2
Sinon
  Traitement par défaut
Fin Si`
    }],
    examples: [{
      titre: "Mention d'une moyenne",
      enonce: `Lire une moyenne et afficher la mention : « Très bien » (≥ 16), « Bien » (≥ 14), « Assez bien » (≥ 12), « Passable » (≥ 10), sinon « Ajourné ».`,
      donnees: [`‹moy› : la moyenne (réel)`],
      traitement: `Tester les seuils du plus grand au plus petit`,
      resultat: `‹mention› : la mention obtenue`,
      tdo: [["moy", "Réel"], ["mention", "Chaîne"]],
      algo: `Algorithme Mention
Début
  Ecrire("Moyenne : "), Lire(moy)
  Si moy >= 16 alors
    mention ← "Très bien"
  Sinon Si moy >= 14 alors
    mention ← "Bien"
  Sinon Si moy >= 12 alors
    mention ← "Assez bien"
  Sinon Si moy >= 10 alors
    mention ← "Passable"
  Sinon
    mention ← "Ajourné"
  Fin Si
  Ecrire("Mention : ", mention)
Fin`,
      python: `moy = float(input("Moyenne : "))
if moy >= 16:
    mention = "Très bien"
elif moy >= 14:
    mention = "Bien"
elif moy >= 12:
    mention = "Assez bien"
elif moy >= 10:
    mention = "Passable"
else:
    mention = "Ajourné"
print("Mention :", mention)`,
      explication: [
        `Pour 13.5 : ‹13.5 >= 16› est faux, ‹13.5 >= 14› est faux, ‹13.5 >= 12› est vrai → « Assez bien », le reste est ignoré.`,
        `Les seuils sont rangés du plus grand au plus petit : c'est ce qui rend les conditions suffisantes (pas besoin d'écrire une borne supérieure).`
      ],
      execution: `Entrée : moy = 13.5\nSortie : Mention : Assez bien`
    }],
    application: {
      enonce: `Avec le programme ci-dessus, quelle mention obtient ‹moy = 9.99› ? Et ‹moy = 16› ?`,
      solution: `9.99 → toutes les conditions sont fausses → « Ajourné ». 16 → ‹16 >= 16› est vrai → « Très bien ».`
    },
    errors: [
      `Mauvais ordre des conditions (le plus petit seuil en premier) : un mauvais résultat pour les grandes valeurs.`,
      `Écrire plusieurs ‹if› indépendants à la place de ‹elif› : plusieurs branches peuvent s'exécuter.`,
      `Oublier le cas par défaut (‹else›).`,
      `Confondre ‹elif› et ‹else if› (qui n'existe pas en Python).`
    ],
    devoir: [`« Écrire un algorithme avec plus de deux cas (mention, tarif, catégorie…). »`, `« Que affiche l'algorithme pour x = … ? »`],
    express: `Plus de 2 choix → ‹Sinon Si› ↔ ‹elif›. Les conditions sont testées dans l'ordre : on teste d'abord la plus restrictive.`,
    express_ar: `عندما تكون الاختيارات أكثر من اثنين نستعمل ‹Sinon Si› (تقابل ‹elif›). تُفحص الشروط بالترتيب، لذلك نبدأ بالشرط الأكثر تقييدًا.`
  });

  L({
    id: "l5.3", chapter: "c5", title: "Le choix multiple Selon et application : la remise", duree: "18 min", niveau: 2,
    concept: `La forme à **choix multiple** ‹Selon› est idéale quand on teste les différentes valeurs d'une **même variable discrète** (entier ou caractère). Dans cette leçon on l'étudie puis on l'applique avec un calcul de remise.`,
    memorize: [
      `Algorithme : ‹Selon variable faire valeur_1 : … valeur_2 : … Sinon : … Fin Selon›.`,
      `Python ≥ 3.10 : ‹match variable: case valeur_1: … case _: …›.`,
      `Avant Python 3.10 (ou pour des intervalles) : ‹if / elif / else›.`,
      `‹Selon› ne sert **pas** à tester des intervalles de réels : pour cela on utilise ‹Sinon Si›.`
    ],
    understand: [
      `‹case _› est le cas par défaut de ‹match›, équivalent du ‹Sinon›.`,
      `Pour une remise selon un montant (des intervalles), la forme généralisée est la bonne : ‹Selon› ne convient pas.`
    ],
    rule: `Même variable, valeurs précises → **Selon**. Intervalles ou conditions variées → **Sinon Si**.`,
    snippets: [
      {
        title: "Selon : numéro du jour",
        lang: "algo",
        code: `Selon jour faire
  1 : Ecrire("Lundi")
  2 : Ecrire("Mardi")
  3 : Ecrire("Mercredi")
  Sinon : Ecrire("Autre jour")
Fin Selon`
      },
      {
        title: "Python avec match … case",
        lang: "py",
        code: `match jour:
    case 1:
        print("Lundi")
    case 2:
        print("Mardi")
    case 3:
        print("Mercredi")
    case _:
        print("Autre jour")`
      }
    ],
    notes: [{ kind: "verify", title: "Version de Python", text: `‹match … case› n'existe qu'à partir de Python 3.10. Si ta version est plus ancienne, utilise ‹if / elif / else›, qui marche partout.` }],
    examples: [{
      titre: "Calcul de remise commerciale",
      enonce: `Un magasin accorde une remise selon le montant M d'achat : 10 % si M ≥ 500 DT, 5 % si M ≥ 200 DT, sinon pas de remise.`,
      donnees: [`‹M› : le montant d'achat (réel)`],
      traitement: `Selon M : ‹net ← M - M * 0.10› ou ‹net ← M - M * 0.05› ou ‹net ← M›`,
      resultat: `‹net› : le montant net à payer`,
      tdo: [["M", "Réel"], ["net", "Réel"]],
      algo: `Algorithme Remise
Début
  Ecrire("Montant M = "), Lire(M)
  Si M >= 500 alors
    net ← M - M * 0.10
  Sinon Si M >= 200 alors
    net ← M - M * 0.05
  Sinon
    net ← M
  Fin Si
  Ecrire("Montant Net à payer = ", net)
Fin`,
      python: `M = float(input("Montant M = "))
if M >= 500:
    net = M - M * 0.10
elif M >= 200:
    net = M - M * 0.05
else:
    net = M
print("Montant Net à payer =", net)`,
      explication: [
        `On commence par le seuil le plus élevé (500) : un montant de 600 reçoit bien 10 % et non 5 %.`,
        `Le dernier ‹Sinon› traite tous les montants inférieurs à 200 : aucune remise.`
      ],
      execution: `Entrée : M = 600 → net = 600 − 60 = 540.0\nEntrée : M = 250 → net = 250 − 12.5 = 237.5\nEntrée : M = 100 → net = 100.0`
    }],
    application: {
      enonce: `Écris en Python (avec if / elif / else) : lire un entier ‹jour› ; afficher « Lundi » pour 1, « Mardi » pour 2, « Autre » sinon.`,
      solution: `jour = int(input("jour = "))\nif jour == 1:\n    print("Lundi")\nelif jour == 2:\n    print("Mardi")\nelse:\n    print("Autre")`
    },
    errors: [
      `Utiliser ‹Selon› pour des intervalles de réels.`,
      `Oublier le cas par défaut (‹Sinon› / ‹case _›).`,
      `Appliquer le mauvais taux ou oublier de soustraire la remise du montant.`,
      `Utiliser ‹match› avec une ancienne version de Python.`
    ],
    devoir: [`« Calculer le montant net à payer. »`, `« Réécrire avec Selon (ou if / elif). »`],
    express: `‹Selon› : valeurs précises d'une même variable (Python : ‹match› ≥ 3.10 ou ‹elif›). Intervalles → ‹Sinon Si›.`,
    express_ar: `‹Selon› مناسب لقيم محددة لنفس المتغير (في بايثون ‹match› من الإصدار 3.10 أو ‹elif›). أما المجالات فنستعمل فيها ‹Sinon Si›.`
  });
})(window.DATA);
