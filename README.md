# Plateforme 2TI — Informatique (2ème année secondaire, Tunisie)

Site éducatif 100 % statique (HTML / CSS / JS), sans serveur ni API externe. Tout le contenu est en français ; la section **Résumés** propose un bouton de traduction FR → AR (hors ligne).

## Lancer en local
Ouvrir `index.html` dans un navigateur, ou : `python3 -m http.server 8000` puis http://localhost:8000.

## Déployer sur GitHub Pages
1. Créer un dépôt GitHub et y pousser le contenu de ce dossier (`index.html` à la racine).
2. Settings → Pages → Source : *Deploy from a branch* → branche `main`, dossier `/ (root)` → Save.
3. Le site est publié sur `https://<utilisateur>.github.io/<dépôt>/`.

## Structure
- `data/` : cours, questions (banque séparée de l'interface), devoirs, résumés FR/AR, références Python.
- `js/grader.js` : correction locale (points partiels, ✅/❌/⚠️, catégories d'erreurs).
- `js/` : `store.js` (localStorage), `ui.js`, `views-*.js`, `app.js` (routeur).
- `tests/selftest.js` : `node tests/selftest.js` vérifie que chaque corrigé obtient la note maximale et que chaque devoir vaut 20.

## Ajouter une question
Ajouter un objet dans `data/questions-*.js` (types : `qcm`, `vf`, `text`, `fields`, `code`) ; aucun changement d'interface n'est nécessaire.

Les points non vérifiables du programme officiel sont listés dans la page **Notes de contenu** (« À vérifier »).


---

## Matière Mathématiques (ajoutée)

Le document Word fourni (*Mathématiques 2TI — Document de référence corrigé*) concerne les **mathématiques**, alors que le site existant était l'**informatique**. Décision documentée : le site Informatique est conservé tel quel et la matière **Mathématiques** est ajoutée dans `maths/` (même moteur, même design). Un sélecteur « Informatique | Mathématiques » figure en haut de la barre latérale.

- **Contenu** : 7 chapitres (0 à 6), 33 leçons au plan en 14 étapes, 4 devoirs avec corrigés, annexes A à G, 5 figures. Tout est converti automatiquement du document par `tools/build_maths.py` (aucune réécriture).
  Régénérer : `python3 tools/build_maths.py tools/source/Mathematiques-2TI-Document-de-reference-corrige.docx` (nécessite `python-docx`).
- **Questions corrigées automatiquement** (`maths/data/questions-*.js`) : 195 questions écrites pour la plateforme à partir des corrigés du document, dont 4 devoirs de 20 points. La correction passe par `js/mathcheck.js` (fractions, √, π, ensembles, intervalles, couples, équations de droites, équivalence algébrique), sans `eval`.
- **Points à vérifier** : voir la page « Notes de contenu » du site (provenance, incohérence signalée dans le devoir de synthèse N°1, ex. 2).

### Tests
```
node tests/selftest.js            # Informatique
node tests/selftest-maths.js      # Mathématiques (structure, 195 solutions, barèmes à 20)
node tests/mathcheck.test.js      # vérificateur de réponses
```

### Déploiement sur GitHub Pages
1. Crée un dépôt, copie **tout le contenu** du dossier (y compris `maths/`, `css/`, `js/`, `assets/`, `.nojekyll`).
2. `git add . && git commit -m "Plateforme 2TI" && git push`
3. Dépôt → Settings → Pages → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
4. Le site est servi sur `https://<utilisateur>.github.io/<dépôt>/` (Informatique) et `…/maths/` (Mathématiques). Tous les chemins sont relatifs : le sous-dossier du dépôt est géré.
