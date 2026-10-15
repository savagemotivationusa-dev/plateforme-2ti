/* Vues « apprendre » de la matière Mathématiques : accueil, cours, leçons, fiches,
   formulaire, méthodes, glossaire / index, notes. Le contenu des leçons provient du
   document Word de référence (voir tools/build_maths.py). */
(function (root) {
  "use strict";
  const App = root.App, U = App.ui, D = root.DATA, S = root.Store.data, save = root.Store.save;
  const { h, ht, fmt, icon } = U;

  /* ---------- Accès aux données ---------- */
  const L = D.lessons, C = D.chapters;
  const lessonById = Object.fromEntries(L.map((l) => [l.id, l]));
  const chapById = Object.fromEntries(C.map((c) => [c.id, c]));
  const qById = Object.fromEntries(D.questions.map((q) => [q.id, q]));
  const lessonsOf = (cid) => L.filter((l) => l.chapter === cid);
  const lnum = (l) => l.id.slice(1);
  const chapLabel = (c) => "Chapitre " + c.num;
  App.data = { lessonById, chapById, qById, lessonsOf, lnum, chapLabel };

  const lessonHref = (id) => "#/lecon/" + id;
  const readCount = () => L.filter((l) => S.read[l.id]).length;
  function masteryOf(filter) {
    let e = 0, p = 0;
    for (const [id, st] of Object.entries(S.qstats)) {
      const q = qById[id];
      if (!q || (filter && !filter(q))) continue;
      e += st.earned; p += st.points;
    }
    return p ? Math.round((e / p) * 100) : null;
  }
  App.progress = { readCount, masteryOf };

  function notFound(msg) {
    return h("div", null, U.empty("Page introuvable", msg || "Ce contenu n'existe pas.", U.btn("Retour à l'accueil", { href: "#/accueil", cls: "primary" })));
  }
  App.notFound = notFound;

  /* Recherche : texte indexé pour chaque leçon + glossaire, formulaire, méthodes. */
  App.lessonSearchText = (l) => l.text;
  App.extraSearch = function (add) {
    const A = D.annexes || {};
    if (A.D) A.D.rows.slice(1).forEach((r) => add("Résumé", "Glossaire : " + r[0], r[1], "#/glossaire?q=" + encodeURIComponent(r[0].split(" / ")[0])));
    if (A.C) A.C.rows.slice(1).forEach((r) => add("Résumé", "Formulaire : " + r[0], r.join(" "), "#/formulaire?q=" + encodeURIComponent(r[0].split(" ")[0])));
    if (A.A) A.A.rows.slice(1).forEach((r) => add("Résumé", "Méthode : " + r[0], r[1], "#/methodes"));
    if (A.E) A.E.rows.slice(1).forEach((r) => add("Résumé", "Index : " + r[0], "Voir sections " + r[1], "#/glossaire?tab=index&q=" + encodeURIComponent(r[0])));
  };

  const html = (cls, s) => ht("div", cls, s);
  const sectionLinks = (txt) => {
    // « 1.2, 1.3 » ou « 0.2, 3.1 et 3.3 » -> liens vers les leçons
    const out = [];
    const re = /\d\.\d/g; let m, last = 0;
    while ((m = re.exec(txt))) {
      if (m.index > last) out.push(txt.slice(last, m.index));
      const id = "m" + m[0];
      out.push(lessonById[id] ? h("a", { href: lessonHref(id), title: lessonById[id].title, text: m[0] }) : m[0]);
      last = m.index + m[0].length;
    }
    if (last < txt.length) out.push(txt.slice(last));
    return out;
  };

  function lessonRow(l) {
    return h("a", { class: "lesson-row", href: lessonHref(l.id) },
      h("span", { class: "num", text: lnum(l) }),
      h("span", { class: "title", text: l.title }),
      h("span", { class: "muted", text: "≈ " + l.duree }),
      h("span", { class: "muted", text: U.stars(l.niveau) }),
      S.read[l.id] ? h("span", { class: "tick", title: "Lue" }, icon("check")) : null);
  }

  /* ====================================================================== ACCUEIL */
  App.views.home = function () {
    App.setTitle("Accueil");
    const read = readCount(), total = L.length;
    const devAtt = S.attempts.filter((a) => a.kind === "devoir");
    const done = new Set(devAtt.map((a) => a.devoirId));
    const best = devAtt.length ? Math.max(...devAtt.map((a) => a.note)) : null;
    const mastery = masteryOf();
    const next = L.find((l) => !S.read[l.id]);
    const root_ = h("div");

    root_.append(h("section", { class: "hero" },
      h("div", { class: "chips" }, U.badge(D.meta.niveau, "accent"), U.badge(D.meta.section), U.badge("Tunisie")),
      h("h1", { text: "Plateforme d'étude — Mathématiques" }),
      h("p", { text: "Cours détaillé en 7 chapitres, méthodes, exemples résolus, exercices corrigés, quatre devoirs types avec barème sur 20 et correction automatique qui t'explique tes erreurs." }),
      h("div", { class: "btn-row" },
        next ? U.btn(read ? "Continuer le cours" : "Commencer le cours", { href: lessonHref(next.id), cls: "primary lg", icon: "book" }) : U.btn("Revoir le cours", { href: "#/cours", cls: "primary lg", icon: "book" }),
        U.btn("Faire un devoir", { href: "#/devoirs", cls: "lg", icon: "file" }),
        U.btn("S'entraîner", { href: "#/exercices", cls: "lg", icon: "pencil" }))));

    root_.append(h("div", { class: "grid" },
      h("div", { class: "card stat" }, h("div", { class: "num", text: read + " / " + total }), h("div", { class: "lbl", text: "leçons lues" }), U.bar((read / total) * 100)),
      h("div", { class: "card stat" }, h("div", { class: "num", text: done.size + " / " + D.devoirs.length }), h("div", { class: "lbl", text: "devoirs réalisés" }), U.bar((done.size / D.devoirs.length) * 100, "ok")),
      h("div", { class: "card stat" }, h("div", { class: "num", text: best === null ? "—" : U.fmtNum(best) + " / 20" }), h("div", { class: "lbl", text: "meilleure note en devoir" })),
      h("div", { class: "card stat" }, h("div", { class: "num", text: mastery === null ? "—" : mastery + " %" }), h("div", { class: "lbl", text: "maîtrise (questions réussies)" }), mastery === null ? null : U.bar(mastery, mastery >= 70 ? "ok" : "warn"))));

    if (S.last && S.last.hash) {
      root_.append(h("div", { class: "card row between wrap", style: "margin-top:16px" },
        h("div", null, h("strong", { text: "Reprendre où tu t'étais arrêté" }), h("div", { class: "muted", text: S.last.label })),
        U.btn("Reprendre", { href: S.last.hash, cls: "primary", icon: "right" })));
    }

    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Les 7 chapitres" }), U.btn("Tout le cours", { href: "#/cours", cls: "sm ghost" })));
    root_.append(h("div", { class: "grid chap-grid" }, C.map((c) => {
      const ls = lessonsOf(c.id), rd = ls.filter((l) => S.read[l.id]).length;
      return h("a", { class: "card link tile", href: "#/cours/" + c.id },
        h("span", { class: "ico num-ico", text: String(c.num) }),
        h("div", null, h("h3", { text: c.title }), h("p", { text: c.desc }),
          h("div", { class: "muted", style: "font-size:.8rem", text: rd + " / " + ls.length + " leçons lues" }), U.bar(ls.length ? (rd / ls.length) * 100 : 0, "ok")));
    })));

    root_.append(h("div", { class: "sec-title" }, h("h2", { text: devAtt.length ? "Derniers devoirs" : "Devoirs à faire" }), U.btn("Tous les devoirs", { href: "#/devoirs", cls: "sm ghost" })));
    if (devAtt.length) {
      devAtt.slice(0, 3).forEach((a) => root_.append(h("a", { class: "lesson-row", href: "#/correction/" + a.id },
        h("span", { class: "title", text: a.title }), h("span", { class: "muted", text: U.fmtDate(a.date) }), U.badge(U.fmtNum(a.note) + " / 20", a.note >= 10 ? "ok" : "err"))));
    } else {
      D.devoirs.forEach((d) => root_.append(h("a", { class: "lesson-row", href: "#/devoir/" + d.id },
        h("span", { class: "title", text: d.titre }), h("span", { class: "muted", text: d.duree }), U.badge(U.levelText(d.difficulte)))));
    }

    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Outils de révision" })));
    const tiles = [
      ["list", "Fiches de révision", "La fiche de chaque chapitre et les « à retenir » de toutes les leçons.", "#/fiches"],
      ["flow", "Formulaire", "Toutes les formules et propriétés dans un seul tableau (annexe C).", "#/formulaire"],
      ["check", "Méthodes et erreurs", "Quelle méthode pour quel type de problème, et les erreurs les plus fréquentes.", "#/methodes"],
      ["book", "Glossaire et index", "Définition de chaque terme et renvoi vers les leçons.", "#/glossaire"],
      ["pencil", "Générateur d'exercices", "Choisis chapitres, niveaux et nombre de questions.", "#/exercices"],
      ["refresh", "Réviser mes erreurs", "Ce qu'il faut revoir d'après tes résultats.", "#/revision"]
    ];
    root_.append(h("div", { class: "grid" }, tiles.map(([ic, t, d, href]) =>
      h("a", { class: "card link tile", href }, h("span", { class: "ico" }, icon(ic)), h("div", null, h("h3", { text: t }), h("p", { text: d }))))));

    root_.append(h("details", { class: "acc", style: "margin-top:18px" }, h("summary", { text: "Comment lire ce cours (plan en 14 étapes et code couleur)" }),
      h("div", { class: "acc-body lesson-html", html: D.presentation })));
    root_.append(h("p", { class: "footer-note" }, "Ce qui provient du guide d'origine, ce qui a été ajouté et les points à vérifier avec ton enseignant sont détaillés dans ", h("a", { href: "#/notes", text: "Notes de contenu" }), "."));
    return root_;
  };

  /* ====================================================================== COURS */
  function chapterBlock(c, lessons, opts) {
    opts = opts || {};
    const all = lessonsOf(c.id), rd = all.filter((l) => S.read[l.id]).length;
    const box = h("div", { class: "card", id: "chap-" + c.id },
      h("div", { class: "row between wrap" },
        h("div", null,
          h("div", { class: "chips", style: "margin:0 0 4px" }, U.badge(chapLabel(c), "accent"), U.badge(c.badge, c.badge === "Rappels" ? "star" : "")),
          opts.h1 ? h("h1", { text: c.title }) : h("h2", null, h("a", { href: "#/cours/" + c.id, style: "color:inherit", text: c.title }))),
        h("div", { style: "min-width:140px" }, h("div", { class: "muted", style: "font-size:.82rem", text: rd + " / " + all.length + " leçons lues" }), U.bar(all.length ? (rd / all.length) * 100 : 0, "ok"))),
      h("p", { class: "muted", text: c.desc }));
    lessons.forEach((l) => box.append(lessonRow(l)));
    box.append(h("div", { class: "btn-row" },
      U.btn("S'entraîner", { href: "#/exercices?chap=" + c.id, cls: "sm", icon: "pencil" }),
      U.btn("Fiche de révision", { href: "#/fiches?c=" + c.id, cls: "sm", icon: "list" })));
    return box;
  }

  App.views.cours = function (ctx) {
    const id = ctx.parts[1];
    if (id) {
      const c = chapById[id];
      if (!c) return notFound("Chapitre inconnu.");
      App.setTitle(chapLabel(c) + " — " + c.title);
      const ct = D.content[c.id] || {};
      const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Cours", href: "#/cours" }, { label: chapLabel(c) }]));
      root_.append(chapterBlock(c, lessonsOf(c.id), { h1: true }));
      if (ct.intro) root_.append(h("div", { class: "lesson-html chap-intro", html: ct.intro }));
      if (ct.synth) root_.append(h("details", { class: "acc" }, h("summary", { text: "Exercices de synthèse du chapitre (type devoir) — avec corrections" }), h("div", { class: "acc-body lesson-html", html: ct.synth })));
      if (ct.fiche) root_.append(h("div", { class: "lesson-html", html: ct.fiche }));
      const i = C.indexOf(c);
      root_.append(h("div", { class: "nav-bottom" },
        C[i - 1] ? U.btn(chapLabel(C[i - 1]), { href: "#/cours/" + C[i - 1].id, icon: "left" }) : h("span"), h("span"),
        C[i + 1] ? U.btn(chapLabel(C[i + 1]), { href: "#/cours/" + C[i + 1].id, cls: "primary", icon: "right" }) : U.btn("Faire un devoir", { href: "#/devoirs", cls: "primary", icon: "file" })));
      return root_;
    }
    App.setTitle("Cours");
    const state = { niv: 0, unread: false };
    const list = h("div");
    const paint = () => {
      list.replaceChildren();
      let n = 0;
      C.forEach((c) => {
        const ls = lessonsOf(c.id).filter((l) => (!state.niv || l.niveau === state.niv) && (!state.unread || !S.read[l.id]));
        if (!ls.length) return;
        n++; list.append(chapterBlock(c, ls));
      });
      if (!n) list.append(U.empty("Aucune leçon ne correspond", "Modifie les filtres pour voir plus de leçons."));
    };
    const chipGroup = (label, items, key) => h("div", { class: "chips", role: "group", "aria-label": label },
      items.map(([val, text]) => h("button", { class: "chip", type: "button", "aria-pressed": state[key] === val, onclick: (e) => {
        state[key] = val; e.currentTarget.parentElement.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); paint();
      } }, text)));
    const unread = h("button", { class: "chip", type: "button", "aria-pressed": "false", onclick: (e) => { state.unread = !state.unread; e.currentTarget.setAttribute("aria-pressed", state.unread); paint(); } }, "Non lues seulement");
    const root_ = h("div", null,
      U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Cours" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Cours de mathématiques" }), h("p", { text: "Les " + L.length + " leçons du document de référence, chapitre par chapitre. Chaque leçon suit le même plan : prérequis, idée de base, définition, explication, propriétés, démonstration, trois exemples de difficulté croissante, erreurs fréquentes, méthode, exercices corrigés et résumé." })),
      h("div", { class: "chips" }, chipGroup("Niveau", [[0, "Tous niveaux"], [1, "⭐ Facile"], [2, "⭐⭐ Moyen"], [3, "⭐⭐⭐ Difficile"]], "niv"), unread),
      list);
    paint();
    return root_;
  };

  /* ====================================================================== LEÇON */
  App.views.lecon = function (ctx) {
    const l = lessonById[ctx.parts[1]];
    if (!l) return notFound("Leçon inconnue.");
    const c = chapById[l.chapter];
    const idx = L.indexOf(l);
    App.setTitle("Leçon " + lnum(l) + " — " + l.title);
    S.recent = [l.id].concat(S.recent.filter((x) => x !== l.id)).slice(0, 8);
    S.last = { hash: lessonHref(l.id), label: "Leçon " + lnum(l) + " — " + l.title };
    save();

    const root_ = h("article");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Cours", href: "#/cours" }, { label: chapLabel(c), href: "#/cours/" + c.id }, { label: "Leçon " + lnum(l) }]));
    const readBadge = h("span");
    const paintRead = () => { readBadge.replaceChildren(S.read[l.id] ? U.badge("✔ Lue", "ok") : U.badge("Non lue")); };
    paintRead();
    const nq = D.questions.filter((q) => q.relatedLesson === l.id && q.bank !== false).length;
    root_.append(h("header", { class: "lesson-head" },
      h("h1", { text: lnum(l) + "  " + l.title }),
      h("div", { class: "meta" }, U.badge(chapLabel(c) + " — " + c.short, "accent"), U.badge("⏱ ≈ " + l.duree), U.badge(U.levelText(l.niveau)), nq ? U.badge(nq + " questions corrigées") : null, readBadge),
      l.provenance ? h("p", { class: "provenance muted", text: "Provenance : " + l.provenance }) : null));

    // plan de la leçon
    const secs = [];
    const plan = h("nav", { class: "lesson-plan", "aria-label": "Plan de la leçon" }, h("strong", { text: "Plan : " }),
      l.steps.map((s, i) => h("button", { type: "button", class: "chip sm", onclick: () => secs[i].scrollIntoView({ behavior: "smooth", block: "start" }) }, (s.n ? s.n + ". " : "") + s.title)));
    root_.append(plan);

    l.steps.forEach((s, i) => {
      const sec = h("section", { class: "sec step step-" + (s.n || "i").replace(/[^0-9]/g, "") });
      sec.append(h("h2", null, s.n ? h("span", { class: "step-n", text: s.n }) : icon("book"), s.title));
      sec.append(h("div", { class: "lesson-html", html: s.html }));
      if (/^Exercices/.test(s.title)) {
        sec.append(h("div", { class: "btn-row" }, U.btn("Quiz corrigé automatiquement sur cette leçon", { href: "#/exercices?lesson=" + l.id, cls: "primary", icon: "pencil" })));
      }
      secs.push(sec); root_.append(sec);
    });

    const readBtn = h("button", { class: "btn", type: "button", onclick: () => {
      if (S.read[l.id]) delete S.read[l.id]; else S.read[l.id] = Date.now();
      save(); paintRead(); readBtn.lastChild.textContent = S.read[l.id] ? "Marquer comme non lue" : "Marquer comme lue";
    } }, icon("check"), h("span", { text: S.read[l.id] ? "Marquer comme non lue" : "Marquer comme lue" }));
    const prev = L[idx - 1], next = L[idx + 1];
    root_.append(h("div", { class: "nav-bottom" },
      prev ? U.btn("Précédent : " + lnum(prev), { href: lessonHref(prev.id), icon: "left" }) : h("span"),
      readBtn,
      next ? U.btn("Suivant : " + lnum(next), { href: lessonHref(next.id), cls: "primary", icon: "right" }) : U.btn("Faire un devoir", { href: "#/devoirs", cls: "primary", icon: "file" })));

    // Marque la leçon comme lue quand on atteint la fin.
    const sentinel = h("div", { style: "height:1px" });
    root_.append(sentinel);
    if ("IntersectionObserver" in root) {
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting) && !S.read[l.id]) {
          S.read[l.id] = Date.now(); save(); paintRead(); readBtn.lastChild.textContent = "Marquer comme non lue"; U.toast("Leçon " + lnum(l) + " marquée comme lue");
          io.disconnect();
        }
      }, { threshold: 1 });
      setTimeout(() => io.observe(sentinel), 600);
      App.onLeave = () => io.disconnect();
    }
    return root_;
  };

  /* ====================================================================== FICHES */
  App.views.fiches = function (ctx) {
    App.setTitle("Fiches de révision");
    let filter = ctx.q.c || "all";
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Fiches de révision" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Fiches de révision" }), h("p", { text: "La fiche de synthèse de chaque chapitre, suivie du « à retenir » de chacune de ses leçons." })));
    const chips = h("div", { class: "chips", role: "group", "aria-label": "Chapitre" });
    const wrap = h("div");
    const paint = () => {
      chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === filter));
      wrap.replaceChildren();
      C.filter((c) => filter === "all" || filter === c.id).forEach((c) => {
        const ct = D.content[c.id] || {};
        const sec = h("section", { class: "card" }, h("h2", null, h("a", { href: "#/cours/" + c.id, text: chapLabel(c) + " — " + c.title })));
        if (ct.fiche) sec.append(h("div", { class: "lesson-html", html: ct.fiche }));
        sec.append(h("ul", { class: "express-list" }, lessonsOf(c.id).map((l) => h("li", null, h("a", { href: lessonHref(l.id), text: lnum(l) + " " + l.title }), " — ", h("span", { text: l.express })))));
        wrap.append(sec);
      });
    };
    [["all", "Tous les chapitres"]].concat(C.map((c) => [c.id, "Ch. " + c.num])).forEach(([f, t]) =>
      chips.append(h("button", { class: "chip", type: "button", "data-f": f, "aria-pressed": f === filter, onclick: () => { filter = f; paint(); } }, t)));
    root_.append(chips, wrap); paint();
    return root_;
  };

  /* ====================================================================== FORMULAIRE */
  function filterTable(rows, head, opts) {
    const state = { t: (opts && opts.q) || "" };
    const box = h("div");
    const paint = () => {
      box.replaceChildren();
      const t = U.normSearch(state.t);
      const rs = rows.filter((r) => !t || U.normSearch(r.join(" ")).includes(t));
      if (!rs.length) { box.append(U.empty("Aucun résultat", "Essaie un autre mot-clé.")); return; }
      box.append(h("div", { class: "table-wrap" }, h("table", { class: "tbl doc-tbl" },
        h("thead", null, h("tr", null, head.map((x) => h("th", { scope: "col", text: x })))),
        h("tbody", null, rs.map((r) => h("tr", null, r.map((c, i) => h("td", null, opts && opts.cell ? opts.cell(c, i, r) : c))))))));
    };
    const input = h("input", { type: "search", placeholder: (opts && opts.placeholder) || "Filtrer…", "aria-label": "Filtrer le tableau", value: state.t, oninput: (e) => { state.t = e.target.value; paint(); }, style: "margin-bottom:10px" });
    paint();
    return h("div", null, input, box);
  }

  App.views.formulaire = function (ctx) {
    App.setTitle("Formulaire");
    const A = D.annexes.C;
    return h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Formulaire" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Formulaire" }), h("p", { text: "Tableau récapitulatif des formules et propriétés (annexe C du document) avec leurs conditions de validité." })),
      filterTable(A.rows.slice(1), A.rows[0], { q: ctx.q.q, placeholder: "Filtrer : discriminant, suite, droite, trigonométrie…" }));
  };

  /* ====================================================================== MÉTHODES */
  App.views.methodes = function () {
    App.setTitle("Méthodes et erreurs");
    const A = D.annexes.A, B = D.annexes.B;
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Méthodes et erreurs" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Méthodes et erreurs fréquentes" }), h("p", { text: "À chaque type de problème sa méthode générale, avec la leçon où elle est détaillée (annexe A), puis les erreurs à éviter, les conseils et la liste de contrôle avant le devoir (annexe B)." })));
    root_.append(U.tabs([
      { label: "Méthode par type de problème", content: filterTable(A.rows.slice(1), A.rows[0], { placeholder: "Filtrer : équation, suite, droite, domaine…", cell: (c, i) => (i === 2 ? sectionLinks(c) : c) }) },
      { label: "Erreurs, conseils et liste de contrôle", content: h("div", { class: "lesson-html", html: B.html }) }
    ]));
    return root_;
  };

  /* ====================================================================== GLOSSAIRE / INDEX */
  App.views.glossaire = function (ctx) {
    App.setTitle("Glossaire et index");
    const Dg = D.annexes.D, E = D.annexes.E;
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Glossaire et index" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Glossaire et index" }), h("p", { text: "Le sens de chaque terme (annexe D) et l'index des notions avec les leçons où elles sont traitées (annexe E)." })));
    root_.append(U.tabs([
      { label: "Glossaire (" + (Dg.rows.length - 1) + " termes)", content: filterTable(Dg.rows.slice(1), Dg.rows[0], { q: ctx.q.tab === "index" ? "" : ctx.q.q, placeholder: "Chercher un terme…", cell: (c, i) => (i === 0 ? h("strong", { text: c }) : c) }) },
      { label: "Index (" + (E.rows.length - 1) + " notions)", content: filterTable(E.rows.slice(1), E.rows[0], { q: ctx.q.tab === "index" ? ctx.q.q : "", placeholder: "Chercher une notion…", cell: (c, i) => (i === 1 ? sectionLinks(c) : c) }) }
    ], { start: ctx.q.tab === "index" ? 1 : 0 }));
    return root_;
  };

  /* ====================================================================== NOTES */
  App.views.notes = function () {
    App.setTitle("Notes de contenu");
    const A = D.annexes;
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Notes de contenu" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Notes de contenu" }), h("p", { text: "D'où vient chaque élément du site, ce qui a été ajouté et les points à vérifier avec ton enseignant ou le programme officiel." })));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Comment ce site a été construit" })));
    root_.append(U.callout("remark", "Source unique", "Les leçons, exemples, exercices et devoirs corrigés, le formulaire, le glossaire et l'index proviennent **du document Word « Mathématiques 2TI — Document de référence »**. Le texte a été converti automatiquement (aucune réécriture), ce qui garantit qu'aucun chapitre n'est omis."));
    root_.append(U.callout("remark", "Questions corrigées automatiquement", "Les questions des quiz et des devoirs interactifs ont été **écrites pour cette plateforme** à partir des exemples, exercices et corrigés du document. Les résultats attendus sont ceux du document ; elles ne sont pas des sujets officiels."));
    root_.append(U.callout("verify", "Incohérence signalée dans le document", "Devoir de synthèse N°1, exercice 2, question 2 : l'énoncé du guide d'origine (2 écrans et 5 claviers pour 1 100 DT) ne donne pas les prix du corrigé (200 DT et 300 DT). Le document propose de corriger l'énoncé en **1 900 DT**. La question interactive utilise cette version corrigée et le dit clairement ; le corrigé complet reste consultable."));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Provenance et points à vérifier (annexe G)" })));
    root_.append(h("div", { class: "lesson-html", html: A.G.html }));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Inventaire du guide source (annexe F)" })));
    root_.append(U.table(A.F.rows[0], A.F.rows.slice(1)));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Comment la correction fonctionne" })));
    root_.append(h("div", { class: "card" },
      h("p", { text: "La correction se fait entièrement dans ton navigateur : aucune donnée n'est envoyée. Les réponses mathématiques sont vérifiées par équivalence : 1/2, 0,5 et 2/4 sont acceptés ; l'ordre des solutions d'un ensemble n'a pas d'importance ; une expression développée ou factorisée est comparée en la calculant en plusieurs points (une forme précise, par exemple la forme canonique, peut être exigée)." }),
      h("p", { text: "Écris les ensembles avec des points-virgules ({1 ; 3}), les intervalles avec des crochets (]−∞ ; 2[ ∪ [5 ; +∞[) et les couples entre parenthèses ((2 ; 3)). Une barre de symboles (√, π, ≤, ∞, ∪, ∅…) est proposée sous chaque champ." }),
      h("p", { text: "Ton avancement (leçons lues, résultats, dernier emplacement) est enregistré dans ce navigateur uniquement." })));
    return root_;
  };
})(window);
