/* ==========================================================================
   Résumés de l'année — texte français d'origine + traduction arabe (hors
   ligne, intégrée au site). Les termes techniques restent en français
   (conformément au vocabulaire officiel : Variable, Algorithme, T.D.O…).
   Dans les textes arabes : {terme} = terme LTR ; ‹code› = code en ligne.
   ========================================================================== */
(function (D) {
  const S = (o) => D.summaries.push(o);

  S({ chapter: "c0", cards: [
    { h: "Démarche de résolution", h_ar: "خطوات حل المشكل",
      fr: [`Analyse → Algorithme → Implémentation (Python) → Exécution → Test.`,
           `**Algorithme** : suite finie et ordonnée d'instructions, indépendante du langage.`,
           `**Programme** : algorithme traduit en Python.`],
      ar: [`التحليل ← الخوارزمية ← التنفيذ بلغة بايثون ← التشغيل ← الاختبار.`,
           `**الخوارزمية** {(Algorithme)}: سلسلة منتهية ومرتبة من التعليمات، مستقلة عن لغة البرمجة.`,
           `**البرنامج** {(Programme)}: هو الخوارزمية بعد ترجمتها إلى بايثون.`] },
    { h: "Analyse d'un problème", h_ar: "تحليل المشكل",
      fr: [`**Résultat** : ce que le programme affiche.`,
           `**Données** : ce que l'utilisateur fournit (‹Lire›).`,
           `**Traitement** : les calculs qui mènent des données au résultat.`,
           `Ordre : Résultat → Données → Traitement.`],
      ar: [`**النتيجة** {(Résultat)}: ما يعرضه البرنامج.`,
           `**المعطيات** {(Données)}: ما يُدخله المستعمل (بواسطة ‹Lire›).`,
           `**المعالجة** {(Traitement)}: الحسابات التي توصل من المعطيات إلى النتيجة.`,
           `الترتيب: النتيجة ثم المعطيات ثم المعالجة.`] },
    { h: "Structure d'un algorithme et T.D.O", h_ar: "هيكل الخوارزمية وجدول T.D.O",
      fr: [`Algorithme Nom → T.D.O → Début → instructions → Fin.`,
           `Le T.D.O liste **tous** les objets utilisés (variables et constantes) avec leur type.`,
           `Types : Entier, Réel, Booléen, Caractère, Chaîne, tableau.`],
      ar: [`اسم الخوارزمية ← جدول تعريف الكائنات {T.D.O} ← {Début} ← التعليمات ← {Fin}.`,
           `جدول {T.D.O} يسرد **كل** الكائنات المستعملة (متغيرات وثوابت) مع نوع كل منها.`,
           `الأنواع: {Entier, Réel, Booléen, Caractère, Chaîne} والجدول {(tableau)}.`] }
  ]});

  S({ chapter: "c1", cards: [
    { h: "La variable", h_ar: "المتغير",
      fr: [`**Variable** : case de la mémoire, identifiée par un nom, dont la valeur peut changer.`,
           `**Identificateur** : commence par une lettre, puis lettres, chiffres ou ‹_› ; ni espace ni accent.`,
           `Une nouvelle valeur **efface** l'ancienne.`,
           `Choisir des noms évocateurs (‹prix_ttc›, ‹Surface›).`],
      ar: [`**المتغير** {(Variable)}: خانة في الذاكرة لها اسم، وقيمتها قابلة للتغيير.`,
           `**اسم المتغير** {(Identificateur)}: يبدأ بحرف ثم حروف أو أرقام أو ‹_›؛ بدون فراغ وبدون حروف بعلامات.`,
           `القيمة الجديدة **تمحو** القيمة القديمة.`,
           `اختر أسماء معبّرة مثل ‹prix_ttc› و‹Surface›.`] },
    { h: "Lire et Ecrire", h_ar: "الإدخال والإخراج",
      fr: [`‹Lire(n)› ↔ ‹n = int(input())› ; ‹Ecrire(n)› ↔ ‹print(n)›.`,
           `‹input()› renvoie **toujours une chaîne** : convertir avec ‹int()› ou ‹float()›.`,
           `Toujours un message d'invitation avant ‹Lire›.`,
           `Avec guillemets : texte affiché tel quel. Sans guillemets : valeur de la variable.`],
      ar: [`‹Lire(n)› تقابل ‹n = int(input())› و‹Ecrire(n)› تقابل ‹print(n)›.`,
           `‹input()› تُرجع **دائمًا نصًّا**: حوّله بـ ‹int()› أو ‹float()›.`,
           `اكتب دائمًا رسالة توضيحية قبل ‹Lire›.`,
           `ما بين علامتي التنصيص يُعرض كما هو؛ وبدونهما تُعرض قيمة المتغير.`] },
    { h: "L'affectation ←", h_ar: "الإسناد ←",
      fr: [`‹Variable ← Expression› : on calcule à droite, on range à gauche.`,
           `‹x ← x + 1› est valide.`,
           `Algorithme : ‹←› pour affecter, ‹=› pour comparer. Python : ‹=› pour affecter, ‹==› pour comparer.`],
      ar: [`‹Variable ← Expression›: يُحسب الطرف الأيمن ثم تُخزَّن النتيجة في المتغير الأيسر.`,
           `التعليمة ‹x ← x + 1› صحيحة.`,
           `في الخوارزمية: ‹←› للإسناد و‹=› للمقارنة. في بايثون: ‹=› للإسناد و‹==› للمقارنة.`] },
    { h: "Trace d'exécution et permutation", h_ar: "جدول التتبع والتبديل",
      fr: [`Trace : une colonne par variable, une ligne par instruction.`,
           `Permutation : ‹z ← a›, ‹a ← b›, ‹b ← z›.`,
           `Sans variable auxiliaire, la valeur de a est perdue.`],
      ar: [`جدول التتبع: عمود لكل متغير وسطر لكل تعليمة.`,
           `التبديل: ‹z ← a› ثم ‹a ← b› ثم ‹b ← z›.`,
           `بدون متغير مساعد تضيع قيمة a.`] }
  ]});

  S({ chapter: "c2", cards: [
    { h: "Constante, variable et types", h_ar: "الثابت والمتغير والأنواع",
      fr: [`**Constante** : valeur fixe. **Variable** : valeur modifiable.`,
           `Entier (‹int›), Réel (‹float›), Booléen (‹bool›), Caractère, Chaîne (‹str›).`,
           `Un nombre qui ne sert pas à calculer (téléphone, CIN, code postal) est une **Chaîne**.`],
      ar: [`**الثابت** {(Constante)} قيمته لا تتغير، و**المتغير** قيمته قابلة للتغيير.`,
           `الأنواع: {Entier} (‹int›) و{Réel} (‹float›) و{Booléen} (‹bool›) و{Caractère} و{Chaîne} (‹str›).`,
           `العدد الذي لا يدخل في عمليات حسابية (الهاتف، بطاقة التعريف، الرمز البريدي) نعتبره **{Chaîne}**.`] },
    { h: "DIV et MOD", h_ar: "DIV و MOD",
      fr: [`‹DIV› = quotient (‹//›) ; ‹MOD› = reste (‹%›). ‹17 DIV 5 = 3›, ‹17 MOD 5 = 2›.`,
           `Dernier chiffre : ‹n MOD 10›. Retirer le dernier chiffre : ‹n DIV 10›.`,
           `Pair si ‹n MOD 2 = 0›.`],
      ar: [`‹DIV› خارج القسمة (يقابله ‹//›) و‹MOD› باقي القسمة (يقابله ‹%›): ‹17 DIV 5 = 3› و‹17 MOD 5 = 2›.`,
           `آخر رقم: ‹n MOD 10›. حذف آخر رقم: ‹n DIV 10›.`,
           `العدد زوجي إذا كان ‹n MOD 2 = 0›.`] },
    { h: "Fonctions mathématiques", h_ar: "الدوال الرياضية",
      fr: [`‹Ent› ↔ ‹int›, ‹Arrondi› ↔ ‹round›, ‹Abs› ↔ ‹abs›, ‹RacineCarré› ↔ ‹sqrt›, ‹Aléa› ↔ ‹randint›.`,
           `Imports : ‹from math import sqrt› ; ‹from random import randint›.`,
           `‹randint(a, b)› : les deux bornes sont incluses.`],
      ar: [`‹Ent› تقابل ‹int› و‹Arrondi› تقابل ‹round› و‹Abs› تقابل ‹abs› و‹RacineCarré› تقابل ‹sqrt› و‹Aléa› تقابل ‹randint›.`,
           `الاستيراد: ‹from math import sqrt› و‹from random import randint›.`,
           `في ‹randint(a, b)› الحدّان a وb مشمولان.`] },
    { h: "Booléens et opérateurs logiques", h_ar: "المنطقي والعوامل المنطقية",
      fr: [`Booléen : ‹Vrai› / ‹Faux› (‹True› / ‹False›).`,
           `‹A ET B› : vrai si les deux sont vrais. ‹A OU B› : vrai si au moins un est vrai. ‹NON A› : l'inverse.`,
           `Intervalle : ‹(x ≥ a) ET (x ≤ b)›. De Morgan : ‹NON(A ET B) = NON A OU NON B›.`],
      ar: [`المنطقي {(Booléen)}: {Vrai} أو {Faux} (في بايثون ‹True› و‹False›).`,
           `‹A ET B› صحيح إذا كان الاثنان صحيحين؛ ‹A OU B› صحيح إذا كان أحدهما على الأقل صحيحًا؛ ‹NON A› يعكس القيمة.`,
           `المجال: ‹(x ≥ a) ET (x ≤ b)›. قانون دي مورغان: ‹NON(A ET B) = NON A OU NON B›.`] },
    { h: "Caractère et code ASCII", h_ar: "الحرف ورمز ASCII",
      fr: [`A–Z : 65–90 ; a–z : 97–122 (écart +32) ; 0–9 : 48–57.`,
           `‹ORD(c)› : caractère → code. ‹CHR(n)› : code → caractère.`,
           `Majuscule → minuscule : ‹CHR(ORD(c) + 32)›.`],
      ar: [`الحروف الكبيرة 65–90 والصغيرة 97–122 (الفرق 32) والأرقام 48–57.`,
           `‹ORD(c)› تعطي رمز الحرف و‹CHR(n)› تعطي الحرف المقابل للرمز.`,
           `من حرف كبير إلى صغير: ‹CHR(ORD(c) + 32)›.`] }
  ]});

  S({ chapter: "c3", cards: [
    { h: "Indexation", h_ar: "ترقيم الحروف",
      fr: [`Les indices commencent à **0**.`,
           `Chaîne de n caractères : indices de 0 à ‹n − 1›. Dernier : ‹ch[Long(ch) - 1]›.`,
           `‹ch[Long(ch)]› provoque une erreur (IndexError).`],
      ar: [`يبدأ الترقيم من **0**.`,
           `سلسلة من n حرفًا: الفهارس من 0 إلى ‹n − 1›. الحرف الأخير: ‹ch[Long(ch) - 1]›.`,
           `‹ch[Long(ch)]› يسبب خطأ {(IndexError)}.`] },
    { h: "Tranches (slicing)", h_ar: "الاقتطاع (slicing)",
      fr: [`‹ch[d:f]› : début **inclus**, fin **exclue**, ‹f − d› caractères.`,
           `‹ch[:f]› : depuis le début. ‹ch[d:]› : jusqu'à la fin.`,
           `‹"Bonjour papa"[3:7]› → ‹"jour"›.`],
      ar: [`‹ch[d:f]›: الفهرس d مشمول والفهرس f غير مشمول، وعدد الحروف ‹f − d›.`,
           `‹ch[:f]› من البداية و‹ch[d:]› حتى النهاية.`,
           `مثال: ‹"Bonjour papa"[3:7]› تعطي ‹"jour"›.`] },
    { h: "Fonctions prédéfinies", h_ar: "الدوال الجاهزة",
      fr: [`‹Long› ↔ ‹len› ; ‹Pos(a, b)› ↔ ‹b.find(a)› (−1 si absent) ; ‹Convch› ↔ ‹str› ; ‹Estnum› ↔ ‹isnumeric› ; ‹Valeur› ↔ ‹int / float› ; ‹Majus› ↔ ‹upper›.`,
           `‹+› concatène **deux chaînes** : ‹"age " + str(17)›.`,
           `Attention à l'ordre des arguments de ‹Pos› / ‹find›.`],
      ar: [`‹Long› تقابل ‹len› و‹Pos(a, b)› تقابل ‹b.find(a)› (تعطي −1 إذا لم توجد) و‹Convch› تقابل ‹str› و‹Estnum› تقابل ‹isnumeric› و‹Valeur› تقابل ‹int / float› و‹Majus› تقابل ‹upper›.`,
           `العلامة ‹+› تربط **سلسلتين**: ‹"age " + str(17)›.`,
           `انتبه إلى ترتيب الوسيطين في ‹Pos› و‹find›: هو معكوس.`] },
    { h: "Immutabilité", h_ar: "عدم قابلية التعديل",
      fr: [`Les chaînes Python sont **immutables** : ‹ch[0] = "X"› est interdit.`,
           `On reconstruit : ‹ch = "X" + ch[1:]›.`],
      ar: [`سلاسل بايثون **غير قابلة للتعديل** مباشرة: ‹ch[0] = "X"› ممنوع.`,
           `نعيد البناء: ‹ch = "X" + ch[1:]›.`] }
  ]});

  S({ chapter: "c4", cards: [
    { h: "Le vecteur", h_ar: "المتجه (الجدول ذو البعد الواحد)",
      fr: [`**Vecteur** : N éléments de **même type** sous un seul nom ; indices de 0 à N − 1.`,
           `T.D.O : ‹T : tableau de N type›. Python : ‹T = [0] * N›.`,
           `Accès : ‹T[i]› avec ‹0 ≤ i ≤ N − 1›.`],
      ar: [`**المتجه** {(Vecteur)}: N عنصرًا من **نفس النوع** تحت اسم واحد؛ الفهارس من 0 إلى N − 1.`,
           `التصريح: ‹T : tableau de N type›. في بايثون: ‹T = [0] * N›.`,
           `الوصول إلى خانة: ‹T[i]› مع ‹0 ≤ i ≤ N − 1›.`] },
    { h: "Pièges classiques", h_ar: "أخطاء شائعة",
      fr: [`Dépassement d'indice : ‹T[N]› n'existe pas.`,
           `Mélanger les types dans un vecteur.`,
           `Permuter deux cases sans variable auxiliaire.`],
      ar: [`تجاوز الفهرس: ‹T[N]› غير موجودة.`,
           `خلط الأنواع داخل المتجه.`,
           `تبديل خانتين دون متغير مساعد.`] }
  ]});

  S({ chapter: "c5", cards: [
    { h: "Les trois formes", h_ar: "الأشكال الثلاثة",
      fr: [`**Simple** : ‹Si … alors … Sinon … Fin Si› ↔ ‹if / else›.`,
           `**Généralisée** : ‹Sinon Si› ↔ ‹elif› : conditions testées dans l'ordre.`,
           `**Choix multiple** : ‹Selon› ↔ ‹match › (Python ≥ 3.10) ou ‹elif›.`],
      ar: [`**البسيط**: ‹Si … alors … Sinon … Fin Si› يقابل ‹if / else›.`,
           `**المعمّم**: ‹Sinon Si› يقابل ‹elif›، وتُفحص الشروط بالترتيب.`,
           `**الاختيار المتعدد**: ‹Selon› يقابل ‹match› (بايثون من 3.10) أو ‹elif›.`] },
    { h: "Règles à retenir", h_ar: "قواعد يجب حفظها",
      fr: [`Un seul bloc est exécuté.`,
           `Tester d'abord la condition la plus restrictive.`,
           `Python : deux-points ‹:› et indentation obligatoires ; comparaison avec ‹==›.`,
           `‹Selon› : valeurs précises d'une même variable ; intervalles → ‹Sinon Si›.`],
      ar: [`تُنفَّذ كتلة واحدة فقط.`,
           `ابدأ بالشرط الأكثر تقييدًا.`,
           `في بايثون: النقطتان ‹:› والإزاحة {(indentation)} إجباريتان، والمقارنة بـ ‹==›.`,
           `‹Selon› لقيم محددة لنفس المتغير؛ أما المجالات فنستعمل ‹Sinon Si›.`] }
  ]});

  S({ chapter: "c6", cards: [
    { h: "Choisir la boucle", h_ar: "اختيار الحلقة المناسبة",
      fr: [`Nombre connu → **Pour** ↔ ‹for i in range(a, b + 1)›.`,
           `Contrôle de saisie → **Répéter … Jusqu'à** (≥ 1 fois) ↔ ‹while True: … break›.`,
           `Test préalable, nombre inconnu → **Tant que** (0 fois possible) ↔ ‹while›.`],
      ar: [`عدد التكرارات معروف ← **{Pour}** وتقابل ‹for i in range(a, b + 1)›.`,
           `مراقبة الإدخال ← **{Répéter … Jusqu'à}** (مرة واحدة على الأقل) وتقابل ‹while True: … break›.`,
           `اختبار قبل الدخول وعدد غير معروف ← **{Tant que}** (قد لا تُنفَّذ) وتقابل ‹while›.`] },
    { h: "Compteur et accumulateurs", h_ar: "العداد والمجمّعات",
      fr: [`Compteur : ‹c ← 0› avant, ‹c ← c + 1› dedans.`,
           `Somme : ‹S ← 0› avant, ‹S ← S + x› dedans.`,
           `Produit : ‹P ← 1› avant, ‹P ← P * i› dedans.`,
           `Initialiser **dans** la boucle est une erreur grave.`],
      ar: [`العداد: ‹c ← 0› قبل الحلقة و‹c ← c + 1› داخلها.`,
           `المجموع: ‹S ← 0› قبل الحلقة و‹S ← S + x› داخلها.`,
           `الجداء: ‹P ← 1› قبل الحلقة و‹P ← P * i› داخلها.`,
           `التهيئة **داخل** الحلقة خطأ فادح.`] },
    { h: "Pièges des boucles", h_ar: "أخطاء الحلقات",
      fr: [`La borne supérieure de ‹range› est **exclue**.`,
           `Boucle infinie : on oublie de modifier la variable de la condition.`,
           `PGCD par soustractions : ‹Tant que m ≠ n› (entiers strictement positifs).`,
           `Factorielle : ‹F ← 1›, puis ‹Pour i de 2 à n : F ← F * i›.`],
      ar: [`الحد الأعلى في ‹range› **غير مشمول**.`,
           `حلقة لا نهائية: ننسى تغيير متغير الشرط.`,
           `القاسم المشترك الأكبر {(PGCD)} بالطرح: ‹Tant que m ≠ n› (عددان صحيحان موجبان تمامًا).`,
           `المضروب: ‹F ← 1› ثم ‹Pour i de 2 à n : F ← F * i›.`] }
  ]});

  S({ chapter: "c7", cards: [
    { h: "Parcours d'un vecteur", h_ar: "اجتياز المتجه",
      fr: [`Parcours complet : ‹Pour i de 0 à N-1› ↔ ‹for i in range(N)›.`,
           `Somme : ‹S ← 0› avant, ‹S ← S + T[i]› dedans.`,
           `Maximum : ‹maxi ← T[0]› puis ‹Si T[i] > maxi alors maxi ← T[i]›.`,
           `Comptage : ‹c ← 0› avant, ‹c ← c + 1› si la condition est vérifiée.`],
      ar: [`الاجتياز الكامل: ‹Pour i de 0 à N-1› يقابل ‹for i in range(N)›.`,
           `المجموع: ‹S ← 0› قبل الحلقة و‹S ← S + T[i]› داخلها.`,
           `الأكبر: ‹maxi ← T[0]› ثم ‹Si T[i] > maxi alors maxi ← T[i]›.`,
           `العدّ: ‹c ← 0› قبل الحلقة و‹c ← c + 1› عند تحقق الشرط.`] }
  ]});

  S({ chapter: "c8", cards: [
    { h: "Fonctions (bonus)", h_ar: "الدوال (إضافي)",
      fr: [`‹def nom(parametres): … return résultat›.`,
           `Appel : ‹r = nom(valeur)›. Hors programme en 2ème année.`],
      ar: [`‹def nom(parametres): … return résultat›.`,
           `الاستدعاء: ‹r = nom(valeur)›. موضوع خارج برنامج السنة الثانية.`] }
  ]});

  /* ------------------------ Comparaisons (« à ne pas confondre ») ------------------------ */
  D.compare = [
    { title: "/ , DIV et MOD", title_ar: "الفرق بين / و DIV و MOD",
      head: ["Opération", "Algorithme", "Python", "17 et 5"],
      rows: [["Division réelle", "17 / 5", "17 / 5", "3.4"], ["Quotient entier", "17 DIV 5", "17 // 5", "3"], ["Reste", "17 MOD 5", "17 % 5", "2"]] },
    { title: "←, = et ==", title_ar: "الفرق بين ← و = و ==",
      head: ["Symbole", "Algorithme", "Python"],
      rows: [["←", "Affectation", "—"], ["=", "Comparaison", "Affectation"], ["==", "—", "Comparaison"]] },
    { title: "Caractère, Chaîne et Entier", title_ar: "الفرق بين Caractère و Chaîne و Entier",
      head: ["Valeur", "Type", "Pourquoi ?"],
      rows: [["'A'", "Caractère", "un seul signe"], ["\"Tunis\"", "Chaîne", "plusieurs signes"], ["\"0021\"", "Chaîne", "code : pas de calcul, zéros conservés"], ["21", "Entier", "on peut calculer"]] },
    { title: "Pour, Répéter et Tant que", title_ar: "الفرق بين Pour و Répéter و Tant que",
      head: ["Boucle", "Test", "Au moins 1 tour ?", "Usage"],
      rows: [["Pour", "compteur automatique", "si Vi ≤ Vf", "nombre connu"], ["Répéter … Jusqu'à", "après le bloc", "oui", "contrôle de saisie"], ["Tant que", "avant le bloc", "non", "nombre inconnu"]] },
    { title: "ch[i] et ch[d:f]", title_ar: "الفرق بين ch[i] و ch[d:f]",
      head: ["Écriture", "Résultat", "Erreur possible"],
      rows: [["ch[i]", "un caractère", "IndexError si i ≥ Long(ch)"], ["ch[d:f]", "une sous-chaîne (f − d caractères)", "pas d'erreur si f dépasse"]] },
    { title: "range(a, b) : les bornes", title_ar: "حدود ‹range›",
      head: ["Python", "Valeurs de i", "Algorithme"],
      rows: [["range(1, 6)", "1, 2, 3, 4, 5", "Pour i de 1 à 5"], ["range(5)", "0, 1, 2, 3, 4", "Pour i de 0 à 4"], ["range(1, n + 1)", "1 … n", "Pour i de 1 à n"]] }
  ];

  /* ------------------------ Fiche express : à mémoriser avant le devoir ------------------------ */
  D.memo = [
    { fr: `Analyse : Résultat → Données → Traitement.`, ar: `التحليل: النتيجة ← المعطيات ← المعالجة.` },
    { fr: `Toujours un ‹Ecrire› avant un ‹Lire›. On ne lit jamais une variable calculée.`, ar: `اكتب ‹Ecrire› قبل كل ‹Lire›. لا نقرأ أبدًا متغيرًا يُحسب.` },
    { fr: `‹←› pour affecter (algorithme) ; ‹=› pour affecter (Python) ; ‹==› pour comparer (Python).`, ar: `‹←› للإسناد في الخوارزمية و‹=› للإسناد في بايثون و‹==› للمقارنة في بايثون.` },
    { fr: `Permuter : ‹z ← a›, ‹a ← b›, ‹b ← z›.`, ar: `للتبديل: ‹z ← a› ثم ‹a ← b› ثم ‹b ← z›.` },
    { fr: `‹input()› renvoie une chaîne : ‹int()› / ‹float()›.`, ar: `‹input()› تُرجع نصًّا: استعمل ‹int()› أو ‹float()›.` },
    { fr: `Pas de calcul (CIN, téléphone, code postal) → Chaîne.`, ar: `لا حساب (بطاقة التعريف، الهاتف، الرمز البريدي) ← {Chaîne}.` },
    { fr: `Dernier chiffre : ‹n MOD 10› ; sans le dernier : ‹n DIV 10› ; pair : ‹n MOD 2 = 0›.`, ar: `آخر رقم: ‹n MOD 10›؛ حذف آخر رقم: ‹n DIV 10›؛ زوجي: ‹n MOD 2 = 0›.` },
    { fr: `Indices d'une chaîne ou d'un vecteur : 0 … N − 1.`, ar: `فهارس السلسلة أو المتجه: من 0 إلى N − 1.` },
    { fr: `‹ch[d:f]› : début inclus, fin exclue.`, ar: `‹ch[d:f]›: البداية مشمولة والنهاية غير مشمولة.` },
    { fr: `Conditions : du plus restrictif au moins restrictif ; Python : ‹:› et indentation.`, ar: `الشروط: من الأكثر تقييدًا إلى الأقل؛ بايثون: ‹:› والإزاحة.` },
    { fr: `Initialiser AVANT la boucle : compteur 0, somme 0, produit 1.`, ar: `التهيئة قبل الحلقة: العداد 0 والمجموع 0 والجداء 1.` },
    { fr: `‹Pour i de a à b› ↔ ‹range(a, b + 1)› (borne exclue).`, ar: `‹Pour i de a à b› تقابل ‹range(a, b + 1)› (الحد الأعلى غير مشمول).` }
  ];
})(window.DATA);

/* Titres de chapitres et libellés d'interface en arabe (bouton de traduction) */
window.DATA.chapterAR = {
  c0: "منهجية: حل مشكل",
  c1: "هياكل التحكم البسيطة: الإدخال والإسناد والإخراج",
  c2: "الثوابت والمتغيرات وأنواع المعطيات",
  c3: "سلاسل الحروف",
  c4: "الجدول ذو البعد الواحد (المتجه)",
  c5: "الهياكل الشرطية",
  c6: "الهياكل التكرارية (الحلقات)",
  c7: "المتجهات والحلقات: الاجتياز",
  c8: "للتوسّع: الدوال"
};
window.DATA.uiAR = {
  title: "ملخصات السنة الدراسية",
  intro: "ملخصات كاملة لكل الدروس، مع بقاء المصطلحات التقنية بالفرنسية كما تُدرَّس في تونس.",
  express: "ملخصات سريعة لكل درس",
  compare: "للتمييز بين المفاهيم المتشابهة",
  memo: "بطاقة المراجعة السريعة: ما يجب حفظه قبل الفرض",
  lesson: "الدرس",
  openLesson: "فتح الدرس",
  toFr: "Afficher en français",
  toAr: "ترجمة إلى العربية"
};
