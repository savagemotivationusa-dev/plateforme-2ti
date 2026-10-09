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
