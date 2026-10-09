/* ==========================================================================
   Devoirs : chaque devoir regroupe des exercices ; le barème est calculé à
   partir des points de chaque question (total = 20).
   difficulte : 1 = ⭐ Facile, 2 = ⭐⭐ Moyen, 3 = ⭐⭐⭐ Difficile
   ========================================================================== */
(function (D) {
  D.devoirs.push(
    {
      id: "D1", titre: "Devoir N°1 — Structures simples", duree: "45 min", difficulte: 1,
      chapitres: ["c0", "c1"],
      intro: "Analyse d'un problème, variables, affectation, trace d'exécution et permutation.",
      exercices: [
        { titre: "Vocabulaire et variables", niveau: 1, questions: ["D1-1-1", "D1-1-2", "D1-1-3", "D1-1-4", "D1-1-5"] },
        { titre: "Trace d'exécution et permutation", niveau: 2, questions: ["D1-2-1", "D1-2-2", "D1-2-3"] },
        { titre: "Programmer : le prix TTC", niveau: 2, questions: ["D1-3-1", "D1-3-2"] }
      ]
    },
    {
      id: "D2", titre: "Devoir N°2 — Types de données et chaînes", duree: "1 h", difficulte: 2,
      chapitres: ["c2", "c3"],
      intro: "Types, DIV et MOD, code ASCII, chaînes de caractères, indices et tranches.",
      exercices: [
        { titre: "Types et opérateurs", niveau: 1, questions: ["D2-1-1", "D2-1-2", "D2-1-3", "D2-1-4"] },
        { titre: "Chaînes de caractères", niveau: 2, questions: ["D2-2-1", "D2-2-2", "D2-2-3", "D2-2-4", "D2-2-5"] },
        { titre: "Durée et ASCII", niveau: 3, questions: ["D2-3-1", "D2-3-2", "D2-3-3"] }
      ]
    },
    {
      id: "D3", titre: "Devoir N°3 — Vecteurs et conditions", duree: "1 h", difficulte: 2,
      chapitres: ["c4", "c5"],
      intro: "Vecteurs à une dimension et structures conditionnelles (simple, généralisée, Selon).",
      exercices: [
        { titre: "Vecteurs", niveau: 1, questions: ["D3-1-1", "D3-1-2", "D3-1-3", "D3-1-4"] },
        { titre: "Conditions", niveau: 2, questions: ["D3-2-1", "D3-2-2", "D3-2-3"] },
        { titre: "Problème : le tarif du cinéma", niveau: 3, questions: ["D3-3-1", "D3-3-2"] }
      ]
    },
    {
      id: "D4", titre: "Devoir N°4 — Les boucles", duree: "1 h 30", difficulte: 3,
      chapitres: ["c6", "c7"],
      intro: "Choix de la boucle, trace, accumulateurs, Tant que, contrôle de saisie, factorielle et maximum d'un vecteur.",
      exercices: [
        { titre: "Choix et trace", niveau: 1, questions: ["D4-1-1", "D4-1-2", "D4-1-3"] },
        { titre: "Programmation", niveau: 2, questions: ["D4-2-1", "D4-2-2"] },
        { titre: "Synthèse", niveau: 3, questions: ["D4-3-1", "D4-3-2"] }
      ]
    },
    {
      id: "D5", titre: "Devoir N°5 — Devoir de synthèse", duree: "2 h", difficulte: 3,
      chapitres: ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7"],
      intro: "Toute l'année : questions rapides, correction d'erreurs, puis un problème complet (analyse, algorithme, Python).",
      exercices: [
        { titre: "Questions de cours", niveau: 1, questions: ["D5-1-1", "D5-1-2", "D5-1-3", "D5-1-4"] },
        { titre: "Corriger les erreurs", niveau: 2, questions: ["D5-2-1", "D5-2-2"] },
        { titre: "Problème : moyenne de 5 notes", niveau: 3, questions: ["D5-3-1", "D5-3-2", "D5-3-3"] }
      ]
    }
  );
})(window.DATA);
