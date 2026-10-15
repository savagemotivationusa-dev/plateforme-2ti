/* Devoirs interactifs : chaque devoir regroupe des exercices ; barème = somme des points (20). */
(function (D) {
  D.devoirs.push(
    { id: "D1", titre: "Devoir de contrôle N°1", duree: "1 h", difficulte: 2, chapitres: ["m1", "m2", "m4", "m5"],
      intro: "Devoir du guide d'origine : QCM, trinôme et inéquation rationnelle, géométrie analytique.",
      exercices: [
        { titre: "QCM", niveau: 1, questions: ["D1-1-1", "D1-1-2", "D1-1-3", "D1-1-4"] },
        { titre: "Algèbre et inéquations", niveau: 2, questions: ["D1-2-1", "D1-2-2", "D1-2-3"] },
        { titre: "Géométrie analytique", niveau: 2, questions: ["D1-3-1", "D1-3-2", "D1-3-3", "D1-3-4"] }
      ] },
    { id: "D2", titre: "Devoir de synthèse N°1", duree: "2 h", difficulte: 3, chapitres: ["m0", "m1", "m2", "m4", "m5"],
      intro: "Devoir du guide d'origine : parabole, système, trigonométrie, droites et représentation paramétrique.",
      exercices: [
        { titre: "Étude de fonction parabole", niveau: 2, questions: ["D2-1-1", "D2-1-2", "D2-1-3", "D2-1-4"] },
        { titre: "Système d'équations et problème", niveau: 2, questions: ["D2-2-1", "D2-2-2"] },
        { titre: "Trigonométrie", niveau: 3, questions: ["D2-3-1", "D2-3-2", "D2-3-3"] },
        { titre: "Géométrie analytique et paramétrique", niveau: 3, questions: ["D2-4-1", "D2-4-2", "D2-4-3"] }
      ] },
    { id: "D3", titre: "Devoir de contrôle N°2", duree: "1 h", difficulte: 2, chapitres: ["m1", "m2", "m3", "m4"],
      intro: "Exercices complémentaires non officiels : QCM, trinôme et fonctions, suites, trigonométrie.",
      exercices: [
        { titre: "QCM", niveau: 1, questions: ["D3-1-1", "D3-1-2", "D3-1-3", "D3-1-4"] },
        { titre: "Trinôme et fonctions", niveau: 2, questions: ["D3-2-1", "D3-2-2", "D3-2-3", "D3-2-4"] },
        { titre: "Suites", niveau: 2, questions: ["D3-3-1", "D3-3-2", "D3-3-3", "D3-3-4"] },
        { titre: "Trigonométrie", niveau: 2, questions: ["D3-4-1", "D3-4-2", "D3-4-3", "D3-4-4"] }
      ] },
    { id: "D4", titre: "Devoir de synthèse N°2", duree: "2 h", difficulte: 3, chapitres: ["m1", "m2", "m3", "m4", "m5"],
      intro: "Exercices complémentaires non officiels : trinôme à paramètre, fonction homographique, trigonométrie, géométrie, arithmétique et suites.",
      exercices: [
        { titre: "Trinôme à paramètre", niveau: 3, questions: ["D4-1-1", "D4-1-2", "D4-1-3", "D4-1-4"] },
        { titre: "Fonction homographique", niveau: 3, questions: ["D4-2-1", "D4-2-2", "D4-2-3", "D4-2-4"] },
        { titre: "Trigonométrie", niveau: 3, questions: ["D4-3-1", "D4-3-2"] },
        { titre: "Géométrie", niveau: 2, questions: ["D4-4-1", "D4-4-2", "D4-4-3"] },
        { titre: "Arithmétique et suites", niveau: 2, questions: ["D4-5-1", "D4-5-2"] }
      ] }
  );
})(window.DATA);
