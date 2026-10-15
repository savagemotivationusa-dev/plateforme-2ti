/* Sauvegarde locale (localStorage) : progression, résultats, préférences.
   Tout est protégé par try/catch : le site fonctionne même sans stockage. */
(function (root) {
  "use strict";
  const KEY = root.STORE_KEY || "plateforme2ti:v1";
  const defaults = () => ({
    read: {},        // { lessonId: timestamp }
    recent: [],      // derniers ids de leçons ouvertes
    last: null,      // { hash, label } : dernier emplacement
    attempts: [],    // historique des corrections
    qstats: {},      // dernier résultat par question
    theme: null,
    lang: "fr",      // langue d'affichage des résumés : fr | ar
    langCh: {}       // surcharge de langue par chapitre
  });
  const data = defaults();
  try {
    const raw = root.localStorage.getItem(KEY);
    if (raw) Object.assign(data, JSON.parse(raw));
  } catch (e) { /* stockage indisponible */ }

  function save() {
    try { root.localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* ignoré */ }
  }
  function reset() {
    Object.keys(data).forEach((k) => delete data[k]);
    Object.assign(data, defaults());
    save();
  }
  root.Store = { data, save, reset };
})(window);
