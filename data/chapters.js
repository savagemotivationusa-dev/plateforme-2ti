/* ==========================================================================
   Données générales : méta-informations et liste des chapitres.
   Convention de texte (voir js/app.js → fmt) :
     ‹code›   → code en ligne        **gras**  → gras
     {terme}  → terme LTR (utilisé dans les textes arabes uniquement)
   ========================================================================== */
window.DATA = {
  meta: {
    site: "Plateforme 2TI — Informatique",
    niveau: "2ème année secondaire",
    section: "Section Informatique — 2TI (Technologies de l'Information)",
    matiere: "Informatique : résolution de problèmes et logique algorithmique",
    pays: "Tunisie"
  },
  chapters: [
    { id: "c0", num: 0, badge: "Complément", title: "Méthode : résoudre un problème", short: "Analyse & T.D.O",
      desc: "La démarche à suivre avant d'écrire la moindre ligne : Résultat, Données, Traitement, puis Algorithme et T.D.O." },
    { id: "c1", num: 1, badge: "Programme", title: "Les structures de contrôle simples", short: "Lire, Ecrire, ←",
      desc: "Entrées, affectations et sorties : les trois opérations de base de tout programme. Variables et trace d'exécution." },
    { id: "c2", num: 2, badge: "Programme", title: "Constantes, variables et types de données", short: "Types, DIV, MOD, ASCII",
      desc: "Entier, Réel, Booléen, Caractère : choisir le bon type, utiliser DIV et MOD, les fonctions mathématiques et le code ASCII." },
    { id: "c3", num: 3, badge: "Programme", title: "Les chaînes de caractères", short: "Indices & slicing",
      desc: "Indexation, tranches ‹ch[d:f]›, fonctions prédéfinies et immutabilité des chaînes en Python." },
    { id: "c4", num: 4, badge: "Programme", title: "Le tableau à une dimension (vecteur)", short: "Vecteurs",
      desc: "Ranger plusieurs valeurs de même type sous un seul nom : déclaration, indices et pièges classiques." },
    { id: "c5", num: 5, badge: "Programme", title: "Les structures conditionnelles", short: "Si / Selon",
      desc: "Forme simple, forme généralisée et choix multiple : faire dépendre le traitement d'une condition." },
    { id: "c6", num: 6, badge: "Programme", title: "Les structures itératives (boucles)", short: "Pour, Tant que, Répéter",
      desc: "Choisir et écrire la bonne boucle ; compteurs, accumulateurs, contrôle de saisie, PGCD et factorielle." },
    { id: "c7", num: 7, badge: "Complément", title: "Vecteurs et boucles : le parcours", short: "Parcours de vecteur",
      desc: "Remplir, afficher et parcourir un vecteur avec une boucle Pour : somme, maximum, comptage." },
    { id: "c8", num: 8, badge: "Bonus / Hors programme", title: "Pour aller plus loin : les fonctions", short: "Bonus",
      desc: "Aperçu des sous-programmes (fonctions Python). Ce chapitre n'est pas exigé en 2ème année." }
  ],
  lessons: [],
  questions: [],
  summaries: [],
  devoirs: [],
  refs: {}
};
