/* Routeur et coque de l'application. */
(function (root) {
  "use strict";
  const App = root.App, U = App.ui, h = U.h, S = () => root.Store.data;
  const $ = (s) => document.querySelector(s);
  const view = $("#view");

  const NAV = root.APP_NAV || [
    ["", "Apprendre"],
    ["accueil", "Accueil", "home"], ["cours", "Cours", "book"], ["resumes", "Résumés FR / AR", "list"],
    ["algorithmes", "Algorithmes", "flow"], ["python", "Python", "code"],
    ["", "S'entraîner"],
    ["exercices", "Générateur d'exercices", "pencil"], ["devoirs", "Devoirs (/20)", "file"],
    ["revision", "Réviser mes erreurs", "refresh"],
    ["", "Suivi"],
    ["progression", "Progression", "chart"], ["correction", "Dernière correction", "check"],
    ["notes", "Notes de contenu", "info"]
  ];
  const ALIAS = root.APP_ALIAS || { "": "accueil", lecon: "cours", devoir: "devoirs", recherche: "" };

  function parse() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    const [path, qs] = raw.split("?");
    const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
    const q = {};
    new URLSearchParams(qs || "").forEach((v, k) => { q[k] = v; });
    return { parts, q, name: parts[0] || "accueil" };
  }

  App.setTitle = (t) => { document.title = (t ? t + " — " : "") + "Plateforme 2TI"; };
  App.render = () => route(true);

  function sidebar(name) {
    const nav = $("#sidebar");
    nav.replaceChildren();
    const active = ALIAS[name] !== undefined ? ALIAS[name] : name;
    if (root.APP_SUBJECTS) {
      nav.append(h("div", { class: "subject-switch", role: "group", "aria-label": "Matière" }, root.APP_SUBJECTS.map((sj) =>
        h("a", { href: sj.href, class: "subj" + (sj.current ? " on" : ""), "aria-current": sj.current ? "true" : null, text: sj.label }))));
    }
    NAV.forEach((n) => {
      if (!n[0]) { nav.append(h("div", { class: "grp", text: n[1] })); return; }
      const a = h("a", { class: "nav-link", href: "#/" + n[0] }, U.icon(n[2]), h("span", { text: n[1] }));
      if (n[0] === active) a.setAttribute("aria-current", "page");
      nav.append(a);
    });
    const read = App.progress.readCount(), total = App.data.lessonById ? Object.keys(App.data.lessonById).length : 0;
    nav.append(h("div", { class: "side-progress" },
      h("div", { html: "<strong>" + read + " / " + total + "</strong> leçons lues" }),
      U.bar(total ? 100 * read / total : 0)));
  }

  function route(keep) {
    if (typeof App.onLeave === "function") { try { App.onLeave(); } catch (e) {} App.onLeave = null; }
    const ctx = parse();
    const fn = App.views[ctx.name === "accueil" ? "home" : ctx.name];
    let node;
    try { node = fn ? fn(ctx) : App.notFound("Page introuvable."); }
    catch (e) { console.error(e); node = App.notFound("Une erreur est survenue : " + e.message); }
    view.replaceChildren(node);
    sidebar(ctx.name);
    document.body.classList.remove("menu-open");
    $("#menuBtn").setAttribute("aria-expanded", "false");
    if (!keep) { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
  }

  /* Thème */
  function paintTheme() {
    const t = document.documentElement.getAttribute("data-theme");
    const b = $("#themeBtn");
    b.replaceChildren(U.icon(t === "dark" ? "sun" : "moon"));
    b.setAttribute("aria-label", t === "dark" ? "Passer au thème clair" : "Passer au thème sombre");
  }
  $("#themeBtn").addEventListener("click", () => {
    const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", t);
    S().theme = t; root.Store.save();
    try { root.localStorage.setItem("plateforme2ti:theme", t); } catch (e) { /* ignoré */ }
    paintTheme();
  });
  paintTheme();

  /* Menu mobile */
  const menuBtn = $("#menuBtn");
  menuBtn.append(U.icon("menu"));
  const toggleMenu = (open) => {
    const o = open === undefined ? !document.body.classList.contains("menu-open") : open;
    document.body.classList.toggle("menu-open", o);
    menuBtn.setAttribute("aria-expanded", String(o));
  };
  menuBtn.addEventListener("click", () => toggleMenu());
  $("#scrim").addEventListener("click", () => toggleMenu(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggleMenu(false); hide(); } });

  /* Recherche */
  const form = $("#searchForm"), input = $("#searchInput"), box = $("#suggest");
  form.prepend(U.icon("search"));
  function hide() { box.hidden = true; box.replaceChildren(); }
  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim();
      if (q.length < 2) return hide();
      const res = App.search(q, 6);
      box.replaceChildren();
      if (!res.length) return hide();
      res.forEach((r) => box.append(h("a", { href: r.href, onclick: hide }, h("span", { text: r.title }), h("small", { text: r.type }))));
      box.hidden = false;
    }, 150);
  });
  document.addEventListener("click", (e) => { if (!form.contains(e.target)) hide(); });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    hide();
    if (q) location.hash = "#/recherche?q=" + encodeURIComponent(q);
  });

  window.addEventListener("hashchange", () => route(false));
  route(false);
})(window);
