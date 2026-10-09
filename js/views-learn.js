/* Vues « apprendre » : accueil, cours, leçons, résumés, algorithmes, Python, notes. */
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
  const chapLabel = (c) => (c.num === 8 ? "Bonus" : "Chapitre " + c.num);
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

  /* ====================================================================== ACCUEIL */
  App.views.home = function () {
    App.setTitle("Accueil");
    const read = readCount(), total = L.length;
    const devAtt = S.attempts.filter((a) => a.kind === "devoir");
    const done = new Set(devAtt.map((a) => a.devoirId));
    const best = devAtt.length ? Math.max(...devAtt.map((a) => a.note)) : null;
    const mastery = masteryOf();
    const next = L.find((l) => !S.read[l.id] && !l.bonus);
    const root_ = h("div");

    root_.append(h("section", { class: "hero" },
      h("div", { class: "chips" }, U.badge(D.meta.niveau, "accent"), U.badge(D.meta.section), U.badge("Tunisie")),
      h("h1", { text: "Plateforme d'étude — Informatique" }),
      h("p", { text: D.meta.matiere + ". Cours, résumés bilingues, exercices, devoirs avec barème et correction interactive qui t'explique tes erreurs." }),
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

    const recent = S.recent.map((id) => lessonById[id]).filter(Boolean).slice(0, 3);
    const lessons = recent.length ? recent : L.filter((l) => !l.bonus).slice(0, 3);
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: recent.length ? "Dernières leçons ouvertes" : "Pour commencer" })));
    lessons.forEach((l) => root_.append(lessonRow(l)));

    root_.append(h("div", { class: "sec-title" }, h("h2", { text: devAtt.length ? "Derniers devoirs" : "Devoirs à faire" }), U.btn("Tous les devoirs", { href: "#/devoirs", cls: "sm ghost" })));
    if (devAtt.length) {
      devAtt.slice(0, 3).forEach((a) => root_.append(h("a", { class: "lesson-row", href: "#/correction/" + a.id },
        h("span", { class: "title", text: a.title }), h("span", { class: "muted", text: U.fmtDate(a.date) }), U.badge(U.fmtNum(a.note) + " / 20", a.note >= 10 ? "ok" : "err"))));
    } else {
      D.devoirs.slice(0, 3).forEach((d) => root_.append(h("a", { class: "lesson-row", href: "#/devoir/" + d.id },
        h("span", { class: "title", text: d.titre }), h("span", { class: "muted", text: d.duree }), U.badge(U.levelText(d.difficulte)))));
    }

    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Explorer" })));
    const tiles = [
      ["book", "Cours", "Toutes les leçons du programme, pas à pas.", "#/cours"],
      ["list", "Résumés", "Fiches de révision FR avec traduction arabe.", "#/resumes"],
      ["flow", "Algorithmes", "Tous les exemples : analyse, T.D.O, algorithme.", "#/algorithmes"],
      ["code", "Python", "Correspondances Algorithme / Python et erreurs.", "#/python"],
      ["pencil", "Exercices", "Génère des exercices selon tes leçons et ton niveau.", "#/exercices"],
      ["refresh", "Révision", "Ce qu'il faut revoir d'après tes résultats.", "#/revision"]
    ];
    root_.append(h("div", { class: "grid" }, tiles.map(([ic, t, d, href]) =>
      h("a", { class: "card link tile", href }, h("span", { class: "ico" }, icon(ic)), h("div", null, h("h3", { text: t }), h("p", { text: d }))))));
    root_.append(h("p", { class: "footer-note" }, "Les corrections et compléments apportés au manuel d'origine sont listés dans ", h("a", { href: "#/notes", text: "Notes de contenu" }), "."));
    return root_;
  };

  function lessonRow(l) {
    const c = chapById[l.chapter];
    return h("a", { class: "lesson-row", href: lessonHref(l.id) },
      h("span", { class: "num", text: lnum(l) }),
      h("span", { class: "title", text: l.title }),
      l.bonus ? U.badge("Bonus", "star") : null,
      h("span", { class: "muted", text: l.duree }),
      h("span", { class: "muted", text: U.stars(l.niveau) }),
      S.read[l.id] ? h("span", { class: "tick", title: "Lue" }, icon("check")) : null);
  }

  /* ====================================================================== COURS */
  function chapterBlock(c, lessons, opts) {
    opts = opts || {};
    const all = lessonsOf(c.id), rd = all.filter((l) => S.read[l.id]).length;
    const box = h("div", { class: "card", id: "chap-" + c.id },
      h("div", { class: "row between wrap" },
        h("div", null,
          h("div", { class: "chips", style: "margin:0 0 4px" }, U.badge(chapLabel(c), "accent"), U.badge(c.badge, c.badge === "Programme" ? "" : "star")),
          opts.h1 ? h("h1", { text: c.title }) : h("h2", null, h("a", { href: "#/cours/" + c.id, style: "color:inherit", text: c.title }))),
        h("div", { style: "min-width:140px" }, h("div", { class: "muted", style: "font-size:.82rem", text: rd + " / " + all.length + " leçons lues" }), U.bar(all.length ? (rd / all.length) * 100 : 0, "ok"))),
      h("p", { class: "muted", html: fmt(c.desc) }));
    lessons.forEach((l) => box.append(lessonRow(l)));
    box.append(h("div", { class: "btn-row" },
      U.btn("Résumé du chapitre", { href: "#/resumes?c=" + c.id, cls: "sm", icon: "list" }),
      U.btn("S'entraîner", { href: "#/exercices?chap=" + c.id, cls: "sm", icon: "pencil" })));
    return box;
  }

  App.views.cours = function (ctx) {
    const id = ctx.parts[1];
    if (id) {
      const c = chapById[id];
      if (!c) return notFound("Chapitre inconnu.");
      App.setTitle(chapLabel(c) + " — " + c.title);
      return h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Cours", href: "#/cours" }, { label: chapLabel(c) }]), chapterBlock(c, lessonsOf(c.id), { h1: true }));
    }
    App.setTitle("Cours");
    const state = { niv: 0, unread: false, badge: "all" };
    const list = h("div");
    const paint = () => {
      list.replaceChildren();
      let n = 0;
      C.forEach((c) => {
        if (state.badge !== "all" && !c.badge.startsWith(state.badge)) return;
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
      h("div", { class: "page-head" }, h("h1", { text: "Cours" }), h("p", { text: "Le programme de l'année, chapitre par chapitre. Chaque leçon suit le même plan : concept, à retenir, à comprendre, règle, exemple, application, erreurs courantes, devoir et résumé express." })),
      chipGroup("Type de chapitre", [["all", "Tout"], ["Programme", "Programme"], ["Complément", "Compléments"], ["Bonus", "Bonus"]], "badge"),
      h("div", { class: "chips" }, chipGroup("Niveau", [[0, "Tous niveaux"], [1, "⭐ Facile"], [2, "⭐⭐ Moyen"], [3, "⭐⭐⭐ Difficile"]], "niv"), unread),
      list);
    paint();
    return root_;
  };

  /* ====================================================================== LEÇON */
  function tdoInline(tdo) {
    const consts = tdo.filter(([, t]) => /^constante/i.test(t)).map(([o, t]) => o + " = " + t.replace(/^constante\s*=?\s*/i, "") + " (Constante)");
    const groups = [];
    tdo.filter(([, t]) => !/^constante/i.test(t)).forEach(([o, t]) => {
      const g = groups.find((x) => x.t === t);
      if (g) g.o.push(o); else groups.push({ t, o: [o] });
    });
    return consts.concat(groups.map((g) => g.o.join(", ") + " : " + g.t)).join(" ; ");
  }

  function renderExample(ex, opts) {
    opts = opts || {};
    const lines = ex.algo.split("\n");
    const algoFull = lines[0] + "\nT.D.O : " + tdoInline(ex.tdo) + "\n" + lines.slice(1).join("\n");
    const vars = ex.tdo.filter(([, t]) => !/^constante/i.test(t));
    const box = h("div", { class: "example" });
    if (!opts.noTitle) box.append(h("h3", { text: "Exemple : " + ex.titre }));
    box.append(ht("div", "enonce", "<strong>Énoncé.</strong> " + fmt(ex.enonce)));
    box.append(U.tabs([
      { label: "Analyse", content: h("div", { class: "dtr" },
        h("div", null, h("h4", { text: "Données" }), h("ul", null, ex.donnees.map((d) => ht("li", "", fmt(d))))),
        h("div", null, h("h4", { text: "Traitement" }), ht("p", "", fmt(ex.traitement))),
        h("div", null, h("h4", { text: "Résultat" }), ht("p", "", fmt(ex.resultat)))) },
      { label: "Types & T.D.O", content: h("div", null,
        h("h4", { text: "Types des variables" }),
        h("div", { class: "type-chips" }, ex.tdo.map(([o, t]) => h("span", { class: /^constante/i.test(t) ? "const" : "", text: o + " : " + t }))),
        h("h4", { text: "T.D.O (Tableau de Déclaration des Objets)" }),
        U.table(["Objet", "Type / Nature"], ex.tdo.map(([o, t]) => [o, t])),
        vars.length ? null : null) },
      { label: "Algorithme", content: U.codeBlock(algoFull, { title: "Algorithme" }) },
      { label: "Python", content: U.codeBlock(ex.python, { title: "Python" }) },
      { label: "Algo ↔ Python", content: h("div", { class: "split" }, U.codeBlock(algoFull, { title: "Algorithme" }), U.codeBlock(ex.python, { title: "Python" })) },
      { label: "Explication", content: h("ul", { class: "checklist" }, ex.explication.map((e) => ht("li", "", fmt(e)))) },
      { label: "Exécution", content: U.codeBlock(ex.execution, { title: "Exemple d'exécution" }) }
    ], { start: opts.start || 0 }));
    return box;
  }
  App.renderExample = renderExample;

  const listSec = (title, ic, items, cls, listCls) => h("section", { class: "sec " + (cls || "") },
    h("h2", null, icon(ic), title), h("ul", { class: listCls || "checklist" }, items.map((t) => ht("li", "", fmt(t)))));

  App.views.lecon = function (ctx) {
    const l = lessonById[ctx.parts[1]];
    if (!l) return notFound("Leçon inconnue.");
    const c = chapById[l.chapter];
    const idx = L.indexOf(l);
    App.setTitle("Leçon " + lnum(l) + " — " + l.title);
    S.recent = [l.id].concat(S.recent.filter((x) => x !== l.id)).slice(0, 8);
    S.last = { hash: "#/lecon/" + l.id, label: "Leçon " + lnum(l) + " — " + l.title };
    save();

    const root_ = h("article");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Cours", href: "#/cours" }, { label: chapLabel(c), href: "#/cours/" + c.id }, { label: "Leçon " + lnum(l) }]));
    const readBadge = h("span");
    const paintRead = () => { readBadge.replaceChildren(S.read[l.id] ? U.badge("✔ Lue", "ok") : U.badge("Non lue")); };
    paintRead();
    root_.append(h("header", { class: "lesson-head" },
      h("h1", { text: lnum(l) + "  " + l.title }),
      h("div", { class: "meta" }, U.badge(chapLabel(c) + " — " + c.short, "accent"), U.badge("⏱ " + l.duree), U.badge(U.levelText(l.niveau)), l.bonus ? U.badge("Bonus / Hors programme", "star") : null, readBadge)));

    root_.append(h("section", { class: "sec" }, h("h2", null, icon("book"), "Concept de la leçon"), ht("p", "", fmt(l.concept))));
    root_.append(listSec("Ce qu'il faut retenir (à mémoriser)", "star", l.memorize));
    root_.append(listSec("Ce qu'il faut comprendre", "bulb", l.understand));
    root_.append(h("section", { class: "sec rule" }, h("h2", null, icon("check"), "La règle"), ht("p", "", fmt(l.rule))));
    (l.notes || []).forEach((n) => root_.append(U.callout(n.kind, n.title, n.text)));
    (l.tables || []).forEach((t) => root_.append(U.table(t.head, t.rows, { caption: t.title })));
    (l.snippets || []).forEach((s) => root_.append(U.codeBlock(s.code, { title: s.title })));
    if (l.examples && l.examples.length) {
      root_.append(h("div", { class: "sec-title" }, icon("flow"), h("h2", { text: l.examples.length > 1 ? "Exemples résolus pas à pas" : "Exemple résolu pas à pas" })));
      l.examples.forEach((ex) => root_.append(renderExample(ex)));
    }

    const ap = l.application;
    const solText = ap.solution;
    root_.append(h("section", { class: "sec" }, h("h2", null, icon("pencil"), "Application"),
      ht("p", "", fmt(ap.enonce)),
      h("details", { class: "acc" }, h("summary", { text: "Voir la solution" }),
        h("div", { class: "acc-body" }, /\n/.test(solText) || /←|=/.test(solText) && solText.length > 60 ? U.codeBlock(solText, { title: "Solution" }) : ht("p", "", fmt(solText)))),
      h("div", { class: "btn-row" }, U.btn("S'entraîner sur cette leçon", { href: "#/exercices?lesson=" + l.id, cls: "primary", icon: "pencil" }))));

    root_.append(listSec("Erreurs courantes", "warn", l.errors, "errors", "checklist warn"));
    root_.append(listSec("Dans le devoir : ce qui peut tomber", "file", l.devoir));

    const exBody = h("div");
    let lang = "fr";
    const trBtn = h("button", { class: "btn sm lang-toggle", type: "button", "aria-pressed": "false" });
    const paintEx = () => {
      const ar = lang === "ar";
      exBody.className = ar ? "ar" : "";
      exBody.setAttribute("dir", ar ? "rtl" : "ltr");
      exBody.setAttribute("lang", ar ? "ar" : "fr");
      exBody.innerHTML = fmt(ar ? l.express_ar : l.express, ar);
      trBtn.replaceChildren(icon("globe"), h("span", { text: ar ? "Afficher en français" : "Traduire en arabe (FR → AR)" }));
      trBtn.classList.toggle("is-ar", ar);
      trBtn.setAttribute("aria-pressed", ar);
    };
    trBtn.addEventListener("click", () => { lang = lang === "fr" ? "ar" : "fr"; paintEx(); });
    paintEx();
    root_.append(h("section", { class: "sec express" }, h("div", { class: "row between wrap" }, h("h2", null, icon("list"), "Résumé express"), trBtn), exBody,
      h("p", null, h("a", { href: "#/resumes?c=" + c.id, text: "Voir tout le résumé du chapitre →" }))));

    const readBtn = h("button", { class: "btn", type: "button", onclick: () => {
      if (S.read[l.id]) delete S.read[l.id]; else S.read[l.id] = Date.now();
      save(); paintRead(); readBtn.lastChild.textContent = S.read[l.id] ? "Marquer comme non lue" : "Marquer comme lue";
    } }, icon("check"), h("span", { text: S.read[l.id] ? "Marquer comme non lue" : "Marquer comme lue" }));
    const prev = L[idx - 1], next = L[idx + 1];
    root_.append(h("div", { class: "nav-bottom" },
      prev ? U.btn("Précédent : " + lnum(prev), { href: lessonHref(prev.id), icon: "left" }) : h("span"),
      readBtn,
      next ? U.btn("Suivant : " + lnum(next), { href: lessonHref(next.id), cls: "primary", icon: "right" }) : U.btn("Faire un devoir", { href: "#/devoirs", cls: "primary", icon: "file" })));

    // Marque automatiquement la leçon comme lue quand on atteint la fin.
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

  /* ====================================================================== RÉSUMÉS (FR / AR) */
  const AR = D.uiAR;
  App.views.resumes = function (ctx) {
    App.setTitle("Résumés");
    const root_ = h("div");
    const langOf = (cid) => S.langCh[cid] || S.lang;
    const head = h("div", { class: "page-head" });
    const globalBtn = h("button", { class: "btn lang-toggle", type: "button", id: "translateBtn" });
    const sections = {};
    let filter = ctx.q.c || "all";

    function paintHead() {
      const ar = S.lang === "ar";
      head.replaceChildren(
        h("h1", { text: ar ? AR.title : "Résumés de l'année", class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr", lang: ar ? "ar" : "fr" }),
        h("p", { text: ar ? AR.intro : "Tout pour réviser vite : définitions, règles, correspondances Algorithme / Python et pièges. Utilise le bouton de traduction pour lire chaque résumé en arabe (les termes techniques restent en français, comme en classe).", class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr" }),
        globalBtn);
      globalBtn.replaceChildren(icon("globe"), h("span", { text: ar ? AR.toFr : "Traduire en arabe (FR → AR)" }));
      globalBtn.classList.toggle("is-ar", ar);
      globalBtn.setAttribute("aria-pressed", ar);
      globalBtn.setAttribute("title", ar ? "Revenir au texte français d'origine" : "Traduire tous les résumés du français vers l'arabe");
    }
    globalBtn.addEventListener("click", () => {
      S.lang = S.lang === "fr" ? "ar" : "fr"; S.langCh = {}; save();
      paintHead(); C.forEach(paintSection); paintExtras();
    });

    function paintSection(c) {
      const sum = D.summaries.find((s) => s.chapter === c.id);
      const ar = langOf(c.id) === "ar";
      const box = sections[c.id];
      box.replaceChildren();
      const toggle = h("button", { class: "btn sm lang-toggle" + (ar ? " is-ar" : ""), type: "button", "aria-pressed": ar,
        title: ar ? "Revenir au français" : "Traduire ce chapitre en arabe",
        onclick: () => { S.langCh[c.id] = ar ? "fr" : "ar"; save(); paintSection(c); } },
        icon("globe"), h("span", { text: ar ? "Afficher en français" : "Traduire en arabe" }));
      const inner = h("div", { class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr", lang: ar ? "ar" : "fr" });
      inner.append(h("div", { class: "row between wrap" },
        h("h2", { text: ar ? "الفصل " + c.num + " — " + D.chapterAR[c.id] : chapLabel(c) + " — " + c.title }), toggle));
      if (sum) {
        inner.append(h("div", { class: "sum-grid" }, sum.cards.map((cd) => h("div", { class: "sum-card" },
          h("h3", { text: ar ? cd.h_ar : cd.h }),
          h("ul", null, (ar ? cd.ar : cd.fr).map((t) => ht("li", "", fmt(t, ar))))))));
      }
      const exp = h("details", { class: "acc", open: true },
        h("summary", { text: ar ? AR.express : "Résumés express par leçon" }),
        h("div", { class: "acc-body" }, h("ul", { class: "express-list" }, lessonsOf(c.id).map((l) =>
          h("li", null, h("a", { href: lessonHref(l.id), dir: "ltr", class: "ltr", text: lnum(l) + " " + l.title }), ar ? h("br") : " — ", ht("span", "", fmt(ar ? l.express_ar : l.express, ar)))))));
      inner.append(exp);
      box.append(inner);
    }

    const extras = h("div");
    function paintExtras() {
      const ar = S.lang === "ar";
      extras.replaceChildren();
      extras.append(h("div", { class: "sec-title" }, h("h2", { text: ar ? AR.compare : "À ne pas confondre", class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr" })));
      extras.append(h("div", { class: "grid", style: "grid-template-columns:repeat(auto-fill,minmax(340px,1fr))" }, D.compare.map((cmp) =>
        h("div", { class: "card" }, h("h3", { text: ar ? cmp.title_ar : cmp.title, class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr" }), U.table(cmp.head, cmp.rows)))));
      extras.append(h("div", { class: "sec-title" }, h("h2", { text: ar ? AR.memo : "Fiche express : à mémoriser avant le devoir", class: ar ? "ar" : "", dir: ar ? "rtl" : "ltr" })));
      extras.append(h("div", { class: "card" + (ar ? " ar" : ""), dir: ar ? "rtl" : "ltr" }, h("ol", { class: "express-list" }, D.memo.map((m) => ht("li", "", fmt(ar ? m.ar : m.fr, ar))))));
    }

    paintHead();
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Résumés" }]), head);
    const chips = h("div", { class: "chips", role: "group", "aria-label": "Chapitre" });
    const applyFilter = () => {
      chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === filter));
      C.forEach((c) => { sections[c.id].hidden = filter !== "all" && filter !== c.id; });
      extras.hidden = filter !== "all";
    };
    [["all", "Tous les chapitres"]].concat(C.map((c) => [c.id, c.num === 8 ? "Bonus" : "Ch. " + c.num])).forEach(([f, t]) =>
      chips.append(h("button", { class: "chip", type: "button", "data-f": f, "aria-pressed": f === filter, onclick: () => { filter = f; applyFilter(); } }, t)));
    root_.append(chips);
    C.forEach((c) => { sections[c.id] = h("section", { class: "sum-chapter", id: "sum-" + c.id }); root_.append(sections[c.id]); paintSection(c); });
    paintExtras();
    root_.append(extras);
    applyFilter();
    if (ctx.q.c && sections[ctx.q.c]) setTimeout(() => sections[ctx.q.c].scrollIntoView({ block: "start" }), 50);
    return root_;
  };

  /* ====================================================================== ALGORITHMES */
  const TEMPLATES = `Algorithme Nom
T.D.O : n, s : Entier ; x : Réel ; ch : Chaîne
Début
  Ecrire("Donner n : "), Lire(n)          # entrée
  s ← n * 2                              # affectation
  Ecrire("Résultat : ", s)               # sortie
Fin

# Condition (3 formes)
Si condition alors … Sinon … Fin Si
Si c1 alors … Sinon Si c2 alors … Sinon … Fin Si
Selon variable faire valeur_1 : … Sinon : … Fin Selon

# Boucles (3 formes)
Pour i de 1 à n Faire … Fin Pour
Répéter … Jusqu'à condition
Tant que condition Faire … Fin Tant que`;

  function allExamples() {
    return L.flatMap((l) => (l.examples || []).map((ex) => ({ l, ex })));
  }

  App.views.algorithmes = function () {
    App.setTitle("Algorithmes");
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Algorithmes" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Algorithmes" }), h("p", { text: "Tous les problèmes résolus du cours avec la démarche complète : énoncé, données, traitement, résultat, types, T.D.O, algorithme, Python, explication et exemple d'exécution." })));
    root_.append(h("details", { class: "acc" }, h("summary", { text: "Modèles de structures à connaître (syntaxe algorithmique)" }), h("div", { class: "acc-body" }, U.codeBlock(TEMPLATES, { title: "Syntaxe algorithmique" }))));
    const state = { chap: "all", text: "" };
    const list = h("div");
    const paint = () => {
      list.replaceChildren();
      const t = U.normSearch(state.text);
      const items = allExamples().filter(({ l, ex }) => (state.chap === "all" || l.chapter === state.chap) && (!t || U.normSearch(ex.titre + " " + ex.enonce + " " + ex.algo).includes(t)));
      if (!items.length) { list.append(U.empty("Aucun exemple", "Essaie un autre filtre.")); return; }
      items.forEach(({ l, ex }, i) => list.append(h("details", { class: "acc", open: i === 0 && !t && state.chap === "all" },
        h("summary", null, h("span", { text: ex.titre }), h("span", { class: "badge", style: "margin-left:auto", text: "Leçon " + lnum(l) })),
        h("div", { class: "acc-body" }, renderExample(ex, { noTitle: true }), h("p", null, h("a", { href: lessonHref(l.id), text: "Ouvrir la leçon " + lnum(l) + " →" }))))));
    };
    const chips = h("div", { class: "chips" });
    [["all", "Tous"]].concat(C.filter((c) => allExamples().some((x) => x.l.chapter === c.id)).map((c) => [c.id, c.num === 8 ? "Bonus" : "Ch. " + c.num])).forEach(([f, t]) =>
      chips.append(h("button", { class: "chip", type: "button", "aria-pressed": f === "all", onclick: (e) => { state.chap = f; chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); paint(); } }, t)));
    root_.append(chips, h("input", { type: "text", placeholder: "Filtrer les exemples (ex. : boucle, PGCD, tableau…)", "aria-label": "Filtrer les exemples", oninput: (e) => { state.text = e.target.value; paint(); }, style: "margin-bottom:12px" }), list);
    paint();
    return root_;
  };

  /* ====================================================================== PYTHON */
  App.views.python = function () {
    App.setTitle("Python");
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Python" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Python" }), h("p", { text: "Passer d'un algorithme à un programme Python sans mélanger les deux syntaxes." })));
    const corr = h("div");
    D.refs.python.forEach((t, i) => corr.append(h("details", { class: "acc", open: i === 0 }, h("summary", { text: t.title }), h("div", { class: "acc-body" }, U.table(t.head, t.rows)))));
    const ex = h("div");
    allExamples().forEach(({ l, ex: e }) => ex.append(h("div", { class: "card" }, h("div", { class: "row between wrap" }, h("h3", { text: e.titre }), U.badge("Leçon " + lnum(l))),
      U.codeBlock(e.python, { title: "Python" }), h("p", null, h("a", { href: lessonHref(l.id), text: "Voir l'algorithme et l'explication →" })))));
    const errs = U.table(["Erreur", "Cause", "Exemple", "Correction"], D.refs.pyErrors.map((e) => [e.name, e.cause, "‹" + e.example.split("\n")[0] + "›", "‹" + e.fix + "›"]), { rowHead: true });
    root_.append(U.tabs([
      { label: "Correspondances", content: corr },
      { label: "Exemples Python", content: ex },
      { label: "Erreurs fréquentes", content: errs }
    ]));
    return root_;
  };

  /* ====================================================================== NOTES */
  App.views.notes = function () {
    App.setTitle("Notes de contenu");
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Notes de contenu" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Notes de contenu" }), h("p", { text: "Ce que le fichier Word d'origine contenait, ce qui a été corrigé ou complété, et les points qu'il vaut mieux vérifier avec ton enseignant." })));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Corrections et compléments apportés au manuel" })));
    D.refs.fixes.forEach((f) => root_.append(U.callout("remark", f.titre, f.detail)));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "À vérifier" })));
    D.refs.toVerify.forEach((f) => root_.append(U.callout("verify", f.titre, f.detail)));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Comment la correction fonctionne" })));
    root_.append(h("div", { class: "card" }, h("p", { text: "La correction se fait entièrement dans ton navigateur : aucune donnée n'est envoyée. Pour les algorithmes et le code Python, chaque question est notée par critères (initialisation, condition, opérateur, structure…) selon le barème : tu obtiens des points partiels et l'explication de chaque erreur." }),
      h("p", { text: "Ton avancement (leçons lues, résultats, dernier emplacement) est enregistré dans ce navigateur uniquement." })));
    return root_;
  };
})(window);
