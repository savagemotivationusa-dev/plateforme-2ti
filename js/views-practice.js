/* Vues « pratiquer » : exercices, devoirs, correction, progression, révision, recherche. */
(function (root) {
  "use strict";
  const App = root.App, U = App.ui, D = root.DATA, S = root.Store.data, save = root.Store.save, G = root.Grader;
  const { h, ht, fmt, icon } = U;
  const { lessonById, chapById, qById, lessonsOf, lnum, chapLabel } = App.data;
  const L = D.lessons, C = D.chapters;

  /* ====================================================================== FORMULAIRES DE QUESTIONS */
  let uid = 0;
  function questionForm(q, label) {
    const el = h("section", { class: "question", id: "q-" + q.id });
    const les = lessonById[q.relatedLesson];
    el.append(h("div", { class: "q-head" },
      h("strong", { text: label }),
      U.badge(U.pts(q.points), "accent"), U.badge(U.stars(q.difficulty), ""),
      les ? h("a", { class: "badge", href: "#/lecon/" + les.id, target: "_blank", rel: "noopener", title: les.title, text: "Leçon " + lnum(les) }) : null));
    el.append(ht("div", "q-statement", fmt(q.statement)));
    if (q.code) el.append(U.codeBlock(q.code.text, { title: q.code.lang === "py" ? "Python" : "Algorithme" }));
    const name = "in" + ++uid;
    let get;
    if (q.type === "qcm") {
      const multi = Array.isArray(q.correctAnswer);
      const opts = h("div", { class: "options", role: multi ? "group" : "radiogroup" });
      q.choices.forEach((c, i) => opts.append(h("label", { class: "opt" }, h("input", { type: multi ? "checkbox" : "radio", name, value: i }), h("span", { html: fmt(c) }))));
      if (multi) el.append(h("div", { class: "muted", style: "font-size:.85rem", text: "Plusieurs réponses possibles." }));
      el.append(opts);
      get = () => {
        const sel = [...opts.querySelectorAll("input:checked")].map((i) => Number(i.value));
        return multi ? sel : (sel.length ? sel[0] : null);
      };
    } else if (q.type === "vf") {
      const opts = h("div", { class: "options", role: "radiogroup", style: "grid-template-columns:repeat(auto-fit,minmax(130px,1fr))" });
      [["true", "Vrai"], ["false", "Faux"]].forEach(([v, t]) => opts.append(h("label", { class: "opt" }, h("input", { type: "radio", name, value: v }), h("span", { text: t }))));
      el.append(opts);
      get = () => { const c = opts.querySelector("input:checked"); return c ? c.value === "true" : null; };
    } else if (q.type === "text") {
      const inp = h("input", { type: "text", "aria-label": "Ta réponse", placeholder: "Ta réponse", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
      el.append(inp);
      get = () => inp.value;
    } else if (q.type === "fields") {
      const grid = h("div", { class: "field-grid" });
      const inps = q.fields.map((f) => {
        const inp = h("input", { type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": f.label });
        grid.append(h("label", null, h("span", { html: fmt(f.label) }), inp));
        return inp;
      });
      el.append(grid);
      get = () => inps.map((i) => i.value);
    } else {
      const ta = h("textarea", { class: "code-in", rows: 7, spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": "Ta réponse (code)",
        placeholder: q.mode === "python" ? "Écris ton code Python ici…" : q.mode === "algo" ? "Écris ton algorithme ici… (utilise « ← » pour l'affectation)" : "Écris ta réponse ici…" });
      let leaveNext = false;
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { leaveNext = true; return; }
        if (e.key === "Tab" && !leaveNext && !e.shiftKey) {
          e.preventDefault();
          const s = ta.selectionStart, en = ta.selectionEnd;
          ta.setRangeText("    ", s, en, "end");
        } else if (e.key !== "Tab" && e.key !== "Shift") leaveNext = false;
      });
      const ins = (t) => { ta.focus(); ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, "end"); };
      const sym = h("div", { class: "sym-bar" }, h("span", { text: "Symboles :" }),
        ["←", "≠", "≥", "≤"].map((s) => h("button", { type: "button", title: "Insérer " + s, "aria-label": "Insérer " + s, onclick: () => ins(s) }, s)),
        h("span", { text: "Tab = indentation (Échap puis Tab pour quitter la zone)" }));
      el.append(q.mode === "python" ? h("div", { class: "sym-bar" }, h("span", { text: "Tab = indentation de 4 espaces (Échap puis Tab pour quitter la zone)" })) : sym, ta);
      get = () => ta.value;
    }
    return { el, q, get };
  }

  const isAnswered = (q, a) => {
    if (a === null || a === undefined) return false;
    if (Array.isArray(a)) return q.type === "fields" ? a.some((x) => String(x).trim()) : a.length > 0;
    return String(a).trim() !== "";
  };

  /* ====================================================================== CORRECTION : calcul */
  function analyze(qids, answers) {
    const qs = qids.map((id) => qById[id]).filter(Boolean);
    const results = qs.map((q) => G.grade(q, answers[q.id]));
    const sumE = results.reduce((s, r) => s + r.earned, 0), sumP = results.reduce((s, r) => s + r.points, 0);
    const byChap = {}, lost = {}, cats = {};
    results.forEach((r) => {
      const c = (byChap[r.chapter] = byChap[r.chapter] || { e: 0, p: 0 });
      c.e += r.earned; c.p += r.points;
      if (r.status !== "correct") {
        lost[r.lesson] = (lost[r.lesson] || 0) + (r.points - r.earned);
        const cat = r.cause[0] ? r.cause[0].cat : "resultat";
        cats[cat] = (cats[cat] || 0) + 1;
      }
    });
    return {
      qs, results, sumE, sumP, note: sumP ? U.round4((sumE / sumP) * 20) : 0, pct: sumP ? Math.round((sumE / sumP) * 100) : 0,
      counts: { ok: results.filter((r) => r.status === "correct").length, partial: results.filter((r) => r.status === "partial").length, ko: results.filter((r) => r.status === "incorrect").length },
      byChap, lost: Object.entries(lost).sort((a, b) => b[1] - a[1]), cats: Object.entries(cats).sort((a, b) => b[1] - a[1])
    };
  }

  function submitAttempt(opts) {
    const an = analyze(opts.qids, opts.answers);
    const attempt = {
      id: "a" + Date.now().toString(36), kind: opts.kind, title: opts.title, devoirId: opts.devoirId || null,
      qids: opts.qids, answers: opts.answers, date: Date.now(), note: an.note, pct: an.pct
    };
    an.results.forEach((r) => {
      S.qstats[r.qid] = { earned: r.earned, points: r.points, status: r.status, lesson: r.lesson, cat: r.cause[0] ? r.cause[0].cat : null, t: attempt.date };
    });
    S.attempts.unshift(attempt);
    S.attempts = S.attempts.slice(0, 40);
    save();
    return attempt;
  }

  /* ====================================================================== CORRECTION : affichage */
  const STATUS = { correct: ["✅ Correct", "ok"], incorrect: ["❌ Incorrect", "err"], partial: ["⚠️ Partiellement correct", "warn"] };

  function feedbackNode(q, res) {
    const box = h("div", { class: "feedback " + res.status, role: "status" });
    box.append(h("div", { class: "fb-head" }, h("span", { text: STATUS[res.status][0] }), h("span", { class: "fb-score", text: U.fmtNum(res.earned) + " / " + U.fmtNum(res.points) })));
    const block = (title, node) => h("div", { class: "fb-block" }, h("h4", { text: title }), node);
    const mine = res.studentDisplay && String(res.studentDisplay).trim() ? res.studentDisplay : "";
    box.append(block("Ta réponse", q.type === "code" && mine ? U.codeBlock(mine, { title: "Ta réponse" }) : h("div", { class: "answer-box", text: mine || "(aucune réponse)" })));
    if (res.status !== "correct") {
      box.append(block("Réponse correcte", q.type === "code" ? U.codeBlock(q.solution, { title: "Solution proposée" }) : h("div", { class: "answer-box", text: res.correctDisplay })));
    }
    if (res.detail && res.detail.length && q.type !== "qcm") {
      box.append(block(q.type === "code" ? "Barème détaillé" : "Détail", h("ul", { class: "checks" }, res.detail.map((d) => {
        let text = d.label;
        if (q.type === "fields") text = d.label + " : " + (d.student || "—") + (d.ok ? "" : "  →  attendu : " + d.expected);
        return h("li", null, h("span", { class: d.ok ? "y" : "n", text: d.ok ? "✓" : "✗" }), h("span", null, h("span", { html: fmt(text) }), !d.ok && (d.msg || d.explain) && q.type !== "fields" ? h("span", { class: "muted", html: " — " + fmt(d.msg) }) : null,
          !d.ok && d.explain ? h("span", { class: "muted", html: " (" + fmt(d.explain) + ")" }) : null));
      }))));
    }
    if (res.status !== "correct") {
      const why = h("div");
      res.cause.forEach((c) => why.append(h("p", { style: "margin:.2em 0" }, h("span", { class: "cat", text: G.CATS[c.cat] || c.cat }), h("span", { html: fmt(c.msg) }))));
      if (q.explanation) why.append(ht("p", "", "<strong>Explication.</strong> " + fmt(q.explanation)));
      box.append(block("Pourquoi ?", why));
      if (q.correction) box.append(block("Ce qu'il fallait faire", ht("div", "", fmt(q.correction))));
      const les = lessonById[q.relatedLesson];
      if (les) box.append(h("div", { class: "fb-block" }, h("a", { class: "btn sm", href: "#/lecon/" + les.id }, icon("book"), h("span", { text: "Revoir la leçon " + lnum(les) + " — " + les.title }))));
    } else if (q.explanation) {
      box.append(h("details", { class: "fb-block" }, h("summary", { text: "Voir l'explication", style: "cursor:pointer" }), ht("p", "", fmt(q.explanation))));
    }
    return box;
  }

  function dashboard(an, attempt) {
    const verdict = an.note >= 16 ? "Très bien" : an.note >= 14 ? "Bien" : an.note >= 12 ? "Assez bien" : an.note >= 10 ? "Passable" : "À améliorer";
    const tone = an.note >= 14 ? "good" : an.note >= 10 ? "mid" : "low";
    const root_ = h("div");
    root_.append(h("div", { class: "dash" },
      h("div", { class: "score-card " + tone },
        h("div", { class: "muted", text: "Note" }),
        h("div", { class: "note" }, U.fmtNum(an.note), h("small", { text: " / 20" })),
        h("div", { class: "verdict", text: verdict + " — " + an.pct + " % de réussite" }),
        U.bar(an.pct, tone === "good" ? "ok" : tone === "mid" ? "warn" : "err")),
      h("div", { class: "kpis" },
        h("div", { class: "kpi ok" }, h("div", { class: "num", text: an.counts.ok }), h("div", { class: "lbl", text: "Questions réussies" })),
        h("div", { class: "kpi warn" }, h("div", { class: "num", text: an.counts.partial }), h("div", { class: "lbl", text: "Partiellement correctes" })),
        h("div", { class: "kpi err" }, h("div", { class: "num", text: an.counts.ko }), h("div", { class: "lbl", text: "Questions ratées" })),
        h("div", { class: "kpi" }, h("div", { class: "num", text: U.fmtNum(an.sumP - an.sumE) }), h("div", { class: "lbl", text: "Points perdus (sur " + U.fmtNum(an.sumP) + ")" })))));

    // Chapitres
    const chapEntries = Object.entries(an.byChap);
    const strong = chapEntries.filter(([, v]) => v.e / v.p >= 0.75), weak = chapEntries.filter(([, v]) => v.e / v.p < 0.5);
    const chapCard = h("div", { class: "card" }, h("h2", { text: "Chapitres" }));
    chapEntries.forEach(([cid, v]) => {
      const pct = Math.round((v.e / v.p) * 100);
      const c = chapById[cid];
      chapCard.append(h("div", { class: "chap-row" }, h("span", { text: chapLabel(c) + " — " + c.title }), U.bar(pct, pct >= 75 ? "ok" : pct >= 50 ? "warn" : "err"),
        U.badge(pct >= 75 ? "Maîtrisé · " + pct + " %" : pct >= 50 ? "À consolider · " + pct + " %" : "Faible · " + pct + " %", pct >= 75 ? "ok" : pct >= 50 ? "warn" : "err")));
    });
    chapCard.append(h("p", { class: "muted", style: "margin-top:10px", text: "Chapitres maîtrisés : " + (strong.length ? strong.map(([c]) => chapLabel(chapById[c])).join(", ") : "aucun pour l'instant") + "  ·  Chapitres faibles : " + (weak.length ? weak.map(([c]) => chapLabel(chapById[c])).join(", ") : "aucun") }));
    root_.append(chapCard);

    // Erreurs fréquentes
    if (an.cats.length) {
      const max = an.cats[0][1];
      const card = h("div", { class: "card" }, h("h2", { text: "Erreurs fréquentes" }));
      an.cats.forEach(([cat, n]) => card.append(h("div", { class: "chap-row" }, h("span", null, h("span", { class: "cat", text: G.CATS[cat] || cat })), U.bar((n / max) * 100, "err"), h("span", { class: "muted", text: n + " question" + (n > 1 ? "s" : "") }))));
      root_.append(card);
    }

    // À revoir
    const review = h("div", { class: "card" }, h("h2", { text: "À revoir" }));
    if (an.lost.length) {
      const ol = h("ol", { class: "review-list" });
      an.lost.slice(0, 6).forEach(([lid, pts]) => {
        const l = lessonById[lid];
        ol.append(h("li", null, h("div", { class: "grow" }, h("strong", { text: lnum(l) + "  " + l.title }), h("div", { class: "muted", style: "font-size:.85rem", text: U.fmtNum(pts) + " pt(s) perdu(s)" })),
          U.btn("Revoir", { href: "#/lecon/" + l.id, cls: "sm" })));
      });
      review.append(ol, h("div", { class: "btn-row" },
        U.btn("Réviser mes erreurs", { href: "#/lecon/" + an.lost[0][0], cls: "primary", icon: "refresh" }),
        U.btn("Refaire les questions ratées", { href: "#/exercices/run?kind=revision&ids=" + an.results.filter((r) => r.status !== "correct").map((r) => r.qid).join(","), icon: "pencil" })));
    } else review.append(U.callout("ok", "", "Aucune erreur : tout est correct. Bravo ! Passe au devoir suivant ou entraîne-toi sur d'autres leçons."));
    root_.append(review);
    return root_;
  }

  function resultDetails(an, attempt) {
    const root_ = h("div");
    const dev = attempt.devoirId ? D.devoirs.find((d) => d.id === attempt.devoirId) : null;
    const byId = Object.fromEntries(an.results.map((r) => [r.qid, r]));
    let onlyBad = false;
    const wrap = h("div");
    const paint = () => {
      wrap.replaceChildren();
      const groups = dev ? dev.exercices.map((ex, i) => ({ title: "Exercice " + (i + 1) + " — " + ex.titre, ids: ex.questions })) : [{ title: null, ids: attempt.qids }];
      let n = 0;
      groups.forEach((g) => {
        const rs = g.ids.map((id) => byId[id]).filter(Boolean);
        if (g.title) {
          const e = rs.reduce((s, r) => s + r.earned, 0), p = rs.reduce((s, r) => s + r.points, 0);
          wrap.append(h("div", { class: "exercise-head" }, h("h2", { text: g.title }), U.badge(U.fmtNum(e) + " / " + U.fmtNum(p) + " pts", e >= p ? "ok" : e > 0 ? "warn" : "err")));
        }
        g.ids.forEach((id, k) => {
          const q = qById[id], r = byId[id]; if (!q || !r) return;
          n++;
          if (onlyBad && r.status === "correct") return;
          const el = h("section", { class: "question" });
          el.append(h("div", { class: "q-head" }, h("strong", { text: "Question " + (dev ? k + 1 : n) + " — " + U.fmtNum(r.earned) + " / " + U.fmtNum(r.points) }), U.badge(U.stars(q.difficulty))));
          el.append(ht("div", "q-statement", fmt(q.statement)));
          if (q.code) el.append(U.codeBlock(q.code.text, { title: q.code.lang === "py" ? "Python" : "Algorithme" }));
          el.append(feedbackNode(q, r));
          wrap.append(el);
        });
      });
    };
    const chips = h("div", { class: "chips" },
      h("button", { class: "chip", type: "button", "aria-pressed": "true", onclick: (e) => { onlyBad = false; chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); paint(); } }, "Toutes les questions"),
      h("button", { class: "chip", type: "button", "aria-pressed": "false", onclick: (e) => { onlyBad = true; chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); paint(); } }, "Seulement mes erreurs"));
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Correction détaillée" })), chips, wrap);
    paint();

    // Tableau récapitulatif du barème
    const rows = [];
    if (dev) dev.exercices.forEach((ex, i) => {
      const rs = ex.questions.map((id) => byId[id]);
      rows.push(["**Exercice " + (i + 1) + " — " + ex.titre + "**", "**" + U.fmtNum(rs.reduce((s, r) => s + r.earned, 0)) + " / " + U.fmtNum(rs.reduce((s, r) => s + r.points, 0)) + "**"]);
      rs.forEach((r, k) => rows.push(["Question " + (k + 1), U.fmtNum(r.earned) + " / " + U.fmtNum(r.points) + "  " + (r.status === "correct" ? "✅" : r.status === "partial" ? "⚠️" : "❌")]));
    });
    else an.results.forEach((r, k) => rows.push(["Question " + (k + 1), U.fmtNum(r.earned) + " / " + U.fmtNum(r.points) + "  " + (r.status === "correct" ? "✅" : r.status === "partial" ? "⚠️" : "❌")]));
    root_.prepend(h("details", { class: "acc" }, h("summary", { text: "Barème et points obtenus" }), h("div", { class: "acc-body" }, U.table(["Question", "Points"], rows, { cls: "bareme" }))));
    return root_;
  }

  App.views.correction = function (ctx) {
    const id = ctx.parts[1];
    if (!id) {
      App.setTitle("Correction");
      const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Correction" }]),
        h("div", { class: "page-head" }, h("h1", { text: "Correction" }), h("p", { text: "Retrouve ici tous tes devoirs et exercices corrigés, avec la note, le barème et l'explication de chaque erreur." })));
      if (!S.attempts.length) {
        root_.append(U.empty("Rien à corriger pour l'instant", "Fais un devoir ou un exercice, puis clique sur « Corriger ».", h("div", { class: "btn-row", style: "justify-content:center" }, U.btn("Voir les devoirs", { href: "#/devoirs", cls: "primary" }), U.btn("Générer un exercice", { href: "#/exercices" }))));
        return root_;
      }
      S.attempts.forEach((a) => root_.append(h("a", { class: "lesson-row", href: "#/correction/" + a.id },
        h("span", { class: "title", text: a.title }), h("span", { class: "muted", text: U.fmtDate(a.date) }), U.badge(a.kind === "devoir" ? "Devoir" : a.kind === "revision" ? "Révision" : "Exercice"), U.badge(U.fmtNum(a.note) + " / 20", a.note >= 10 ? "ok" : "err"))));
      return root_;
    }
    const attempt = S.attempts.find((a) => a.id === id);
    if (!attempt) return App.notFound("Ce résultat n'existe plus (il a peut-être été effacé).");
    App.setTitle("Correction — " + attempt.title);
    const an = analyze(attempt.qids, attempt.answers);
    const redo = attempt.devoirId ? "#/devoir/" + attempt.devoirId : "#/exercices/run?kind=" + attempt.kind + "&ids=" + attempt.qids.join(",");
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Correction", href: "#/correction" }, { label: attempt.title }]),
      h("div", { class: "page-head" }, h("h1", { text: "Correction : " + attempt.title }), h("p", { text: "Corrigé le " + U.fmtDate(attempt.date) + ". Chaque réponse est notée selon le barème ; les erreurs sont expliquées." })),
      dashboard(an, attempt),
      h("div", { class: "btn-row" }, U.btn(attempt.devoirId ? "Refaire ce devoir" : "Refaire cet exercice", { href: redo, icon: "refresh" }), U.btn("Tous mes résultats", { href: "#/correction", cls: "ghost" })),
      resultDetails(an, attempt));
    return root_;
  };

  /* ====================================================================== EXERCICES (générateur) */
  function pickQuestions(pool, n) {
    const groups = {};
    pool.forEach((q) => (groups[q.lesson] = groups[q.lesson] || []).push(q));
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const lists = shuffle(Object.values(groups)).map(shuffle);
    const out = [];
    while (out.length < n && lists.some((l) => l.length)) lists.forEach((l) => { if (l.length && out.length < n) out.push(l.shift()); });
    return out.sort((a, b) => a.difficulty - b.difficulty);
  }

  App.views.exercices = function (ctx) {
    if (ctx.parts[1] === "run") return runView(ctx);
    App.setTitle("Exercices");
    const st = { chaps: new Set(), lessons: new Set(), levels: new Set([1, 2, 3]), n: 6 };
    if (ctx.q.chap && chapById[ctx.q.chap]) st.chaps.add(ctx.q.chap);
    if (ctx.q.lesson && lessonById[ctx.q.lesson]) st.lessons.add(ctx.q.lesson);
    const pool = () => D.questions.filter((q) => q.bank !== false && st.levels.has(q.difficulty) &&
      ((!st.chaps.size && !st.lessons.size) ? q.chapter !== "c8" : (st.chaps.has(q.chapter) || st.lessons.has(q.relatedLesson))));
    const info = h("p", { class: "muted" });
    const refresh = () => { info.textContent = pool().length + " question(s) disponible(s) avec ces critères."; };
    const toggleChip = (set, val, label, extra) => {
      const b = h("button", { class: "chip", type: "button", "aria-pressed": set.has(val), onclick: () => { set.has(val) ? set.delete(val) : set.add(val); b.setAttribute("aria-pressed", set.has(val)); if (extra) extra(); refresh(); } }, label);
      return b;
    };
    const lessonBoxes = [];
    const lessonsPanel = h("div");
    C.forEach((c) => {
      const grid = h("div", { class: "gen-lessons" }, lessonsOf(c.id).map((l) => {
        const cb = h("input", { type: "checkbox", checked: st.lessons.has(l.id), onchange: () => { cb.checked ? st.lessons.add(l.id) : st.lessons.delete(l.id); refresh(); } });
        lessonBoxes.push([l.id, cb]);
        return h("label", null, cb, h("span", { text: lnum(l) + " " + l.title }));
      }));
      lessonsPanel.append(h("h4", { style: "margin:12px 0 4px", text: chapLabel(c) + " — " + c.title }), grid);
    });
    const count = h("input", { type: "number", min: 3, max: 20, value: st.n, "aria-label": "Nombre de questions", style: "max-width:110px", oninput: (e) => { st.n = Math.max(1, Math.min(20, Number(e.target.value) || 6)); } });
    const generate = () => {
      const p = pool();
      if (!p.length) { U.toast("Aucune question avec ces critères."); return; }
      const picked = pickQuestions(p, st.n);
      location.hash = "#/exercices/run?ids=" + picked.map((q) => q.id).join(",");
    };
    const root_ = h("div", null,
      U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Exercices" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Générateur d'exercices" }), h("p", { text: "Choisis les chapitres ou les leçons, le niveau et le nombre de questions. Chaque question est liée à une leçon précise et corrigée avec explications." })),
      h("div", { class: "card" },
        h("h3", { text: "1. Chapitres" }),
        h("div", { class: "chips" }, C.map((c) => toggleChip(st.chaps, c.id, (c.num === 8 ? "Bonus" : "Ch. " + c.num) + " · " + c.short))),
        h("details", { class: "acc", open: st.lessons.size > 0 }, h("summary", { text: "2. Leçons précises (optionnel)" }), h("div", { class: "acc-body" }, lessonsPanel)),
        h("h3", { style: "margin-top:16px", text: "3. Niveau" }),
        h("div", { class: "chips" }, [1, 2, 3].map((n) => toggleChip(st.levels, n, U.levelText(n)))),
        h("h3", { style: "margin-top:16px", text: "4. Nombre de questions" }), count, info,
        h("div", { class: "btn-row" }, U.btn("Générer l'exercice", { cls: "primary lg", icon: "pencil", onclick: generate }),
          U.btn("Tout réinitialiser", { cls: "ghost", onclick: () => { location.hash = "#/exercices?x=" + Date.now(); } }))));
    refresh();
    if (ctx.q.lesson && lessonById[ctx.q.lesson] && !ctx.q.x) setTimeout(() => { st.n = Math.min(5, pool().length) || 5; generate(); }, 0);
    return root_;
  };

  function runView(ctx) {
    const ids = (ctx.q.ids || "").split(",").filter((id) => qById[id]);
    if (!ids.length) return App.notFound("Aucune question à afficher.");
    const kind = ctx.q.kind === "revision" ? "revision" : "exercice";
    const title = kind === "revision" ? "Révision de mes erreurs (" + ids.length + " questions)" : "Exercice personnalisé (" + ids.length + " questions)";
    App.setTitle(title);
    const forms = ids.map((id, i) => questionForm(qById[id], "Question " + (i + 1)));
    const total = ids.reduce((s, id) => s + qById[id].points, 0);
    const counter = h("span", { class: "muted" });
    const upd = () => { counter.textContent = forms.filter((f) => isAnswered(f.q, f.get())).length + " / " + forms.length + " questions répondues"; };
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Exercices", href: "#/exercices" }, { label: "Exercice" }]),
      h("div", { class: "page-head" }, h("h1", { text: title }), h("p", { text: "Barème : " + U.fmtNum(total) + " points au total, ramenés sur 20 à la correction. Les points de chaque question sont indiqués." })));
    forms.forEach((f) => root_.append(f.el));
    root_.addEventListener("input", upd); root_.addEventListener("change", upd);
    const submit = () => {
      const answered = forms.filter((f) => isAnswered(f.q, f.get())).length;
      if (answered < forms.length && !confirm("Il reste " + (forms.length - answered) + " question(s) sans réponse (0 point). Corriger quand même ?")) return;
      const answers = {}; forms.forEach((f) => (answers[f.q.id] = f.get()));
      const a = submitAttempt({ kind, title, qids: ids, answers });
      location.hash = "#/correction/" + a.id;
    };
    root_.append(h("div", { class: "sticky-submit" }, counter, h("div", { class: "btn-row", style: "margin:0" }, U.btn("Un autre exercice", { href: "#/exercices", cls: "ghost" }), U.btn("Corriger", { cls: "primary lg", icon: "check", onclick: submit }))));
    upd();
    return root_;
  }

  /* ====================================================================== DEVOIRS */
  const devoirPoints = (d) => d.exercices.reduce((s, ex) => s + ex.questions.reduce((t, id) => t + qById[id].points, 0), 0);
  const devoirQids = (d) => d.exercices.flatMap((ex) => ex.questions);

  App.views.devoirs = function () {
    App.setTitle("Devoirs");
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Devoirs" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Devoirs" }), h("p", { text: "Des devoirs complets comme à l'école : chaque devoir a une durée, une difficulté, un barème détaillé sur 20 et une correction interactive qui explique chaque erreur." })));
    D.devoirs.forEach((d) => {
      const att = S.attempts.filter((a) => a.devoirId === d.id);
      const best = att.length ? Math.max(...att.map((a) => a.note)) : null;
      root_.append(h("div", { class: "card" },
        h("div", { class: "row between wrap" }, h("h2", { style: "margin:0", text: d.titre }), best !== null ? U.badge("Meilleure note : " + U.fmtNum(best) + " / 20", best >= 10 ? "ok" : "err") : U.badge("Pas encore fait")),
        h("div", { class: "chips" }, U.badge("⏱ Durée : " + d.duree), U.badge(U.levelText(d.difficulte), d.difficulte === 3 ? "err" : d.difficulte === 2 ? "warn" : "ok"), U.badge(U.fmtNum(devoirPoints(d)) + " points"), U.badge(devoirQids(d).length + " questions"), U.badge(d.exercices.length + " exercices")),
        h("p", { class: "muted", text: d.intro }),
        h("div", { class: "chips" }, d.chapitres.map((c) => h("a", { class: "badge accent", href: "#/cours/" + c, text: chapLabel(chapById[c]) }))),
        h("div", { class: "btn-row" }, U.btn(att.length ? "Refaire le devoir" : "Commencer le devoir", { href: "#/devoir/" + d.id, cls: "primary", icon: "file" }),
          att.length ? U.btn("Voir ma dernière correction", { href: "#/correction/" + att[0].id }) : null)));
    });
    return root_;
  };

  App.views.devoir = function (ctx) {
    const d = D.devoirs.find((x) => x.id === ctx.parts[1]);
    if (!d) return App.notFound("Devoir inconnu.");
    App.setTitle(d.titre);
    S.last = { hash: "#/devoir/" + d.id, label: d.titre }; save();
    const total = devoirPoints(d);
    const root_ = h("div");
    root_.append(U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Devoirs", href: "#/devoirs" }, { label: d.titre }]),
      h("div", { class: "page-head" }, h("h1", { text: d.titre }), h("p", { text: d.intro })),
      h("div", { class: "chips" }, U.badge("⏱ Durée : " + d.duree), U.badge(U.levelText(d.difficulte)), U.badge("Chapitres : " + d.chapitres.map((c) => chapById[c].num).join(", ")), U.badge(U.fmtNum(total) + " points", "accent")));

    const rows = [];
    d.exercices.forEach((ex, i) => {
      const p = ex.questions.reduce((s, id) => s + qById[id].points, 0);
      rows.push(["**Exercice " + (i + 1) + " — " + U.pts(p) + "**", ""]);
      ex.questions.forEach((id, k) => rows.push(["Question " + (k + 1), U.pts(qById[id].points)]));
    });
    rows.push(["**Total**", "**" + U.fmtNum(total) + " points**"]);
    root_.append(h("details", { class: "acc", open: true }, h("summary", { text: "Barème détaillé" }), h("div", { class: "acc-body" }, U.table(["Question", "Points"], rows, { cls: "bareme" }),
      h("p", { class: "muted", text: "À la correction, chaque question est notée selon ce barème : points partiels possibles pour les réponses incomplètes." }))));

    const forms = [];
    d.exercices.forEach((ex, i) => {
      const p = ex.questions.reduce((s, id) => s + qById[id].points, 0);
      root_.append(h("div", { class: "exercise-head" }, h("h2", { text: "Exercice " + (i + 1) + " — " + ex.titre }), U.badge(U.levelText(ex.niveau)), U.badge(U.pts(p), "accent")));
      ex.questions.forEach((id, k) => { const f = questionForm(qById[id], "Question " + (k + 1)); forms.push(f); root_.append(f.el); });
    });
    const counter = h("span", { class: "muted" });
    const upd = () => { counter.textContent = forms.filter((f) => isAnswered(f.q, f.get())).length + " / " + forms.length + " questions répondues"; };
    root_.addEventListener("input", upd); root_.addEventListener("change", upd);
    const submit = () => {
      const answered = forms.filter((f) => isAnswered(f.q, f.get())).length;
      if (answered < forms.length && !confirm("Il reste " + (forms.length - answered) + " question(s) sans réponse (0 point). Corriger quand même ?")) return;
      const answers = {}; forms.forEach((f) => (answers[f.q.id] = f.get()));
      const a = submitAttempt({ kind: "devoir", title: d.titre, devoirId: d.id, qids: devoirQids(d), answers });
      location.hash = "#/correction/" + a.id;
    };
    root_.append(h("div", { class: "sticky-submit" }, counter, h("div", { class: "btn-row", style: "margin:0" },
      U.btn("Recommencer", { cls: "ghost", onclick: () => { if (confirm("Effacer toutes tes réponses ?")) App.render(); } }),
      U.btn("Corriger mon devoir", { cls: "primary lg", icon: "check", onclick: submit }))));
    upd();
    return root_;
  };

  /* ====================================================================== PROGRESSION */
  App.views.progression = function () {
    App.setTitle("Progression");
    const read = App.progress.readCount(), total = L.length;
    const devAtt = S.attempts.filter((a) => a.kind === "devoir");
    const mastery = App.progress.masteryOf();
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Progression" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Progression" }), h("p", { text: "Ton avancement dans le cours et ta maîtrise des questions, chapitre par chapitre. Tout est enregistré dans ce navigateur." })));
    root_.append(h("div", { class: "grid" },
      h("div", { class: "card stat" }, h("div", { class: "num", text: Math.round((read / total) * 100) + " %" }), h("div", { class: "lbl", text: read + " / " + total + " leçons lues" }), U.bar((read / total) * 100)),
      h("div", { class: "card stat" }, h("div", { class: "num", text: devAtt.length }), h("div", { class: "lbl", text: "devoirs corrigés" })),
      h("div", { class: "card stat" }, h("div", { class: "num", text: Object.keys(S.qstats).length }), h("div", { class: "lbl", text: "questions travaillées (sur " + D.questions.length + ")" })),
      h("div", { class: "card stat" }, h("div", { class: "num", text: mastery === null ? "—" : mastery + " %" }), h("div", { class: "lbl", text: "maîtrise globale" }), mastery === null ? null : U.bar(mastery, mastery >= 70 ? "ok" : "warn"))));
    const card = h("div", { class: "card", style: "margin-top:16px" }, h("h2", { text: "Par chapitre" }));
    C.forEach((c) => {
      const ls = lessonsOf(c.id), rd = ls.filter((l) => S.read[l.id]).length;
      const m = App.progress.masteryOf((q) => q.chapter === c.id);
      card.append(h("div", { class: "chap-row", style: "grid-template-columns:minmax(150px,1.2fr) 1fr 1fr" },
        h("a", { href: "#/cours/" + c.id, text: chapLabel(c) + " — " + c.short }),
        h("div", null, h("div", { class: "muted", style: "font-size:.78rem", text: "Lecture : " + rd + " / " + ls.length }), U.bar(ls.length ? (rd / ls.length) * 100 : 0)),
        h("div", null, h("div", { class: "muted", style: "font-size:.78rem", text: "Maîtrise : " + (m === null ? "—" : m + " %") }), U.bar(m || 0, m === null ? "" : m >= 70 ? "ok" : m >= 50 ? "warn" : "err"))));
    });
    root_.append(card);
    const dv = h("div", { class: "card" }, h("h2", { text: "Devoirs" }));
    D.devoirs.forEach((d) => {
      const att = devAtt.filter((a) => a.devoirId === d.id);
      const best = att.length ? Math.max(...att.map((a) => a.note)) : null;
      dv.append(h("div", { class: "chap-row" }, h("a", { href: "#/devoir/" + d.id, text: d.titre }), U.bar(best === null ? 0 : (best / 20) * 100, best === null ? "" : best >= 10 ? "ok" : "err"),
        h("span", { class: "muted", text: best === null ? "pas encore fait" : U.fmtNum(best) + " / 20 · " + att.length + " essai(s)" })));
    });
    root_.append(dv);
    if (S.attempts.length) {
      const hist = h("div", { class: "card" }, h("h2", { text: "Derniers résultats" }));
      S.attempts.slice(0, 8).forEach((a) => hist.append(h("a", { class: "lesson-row", href: "#/correction/" + a.id }, h("span", { class: "title", text: a.title }), h("span", { class: "muted", text: U.fmtDate(a.date) }), U.badge(U.fmtNum(a.note) + " / 20", a.note >= 10 ? "ok" : "err"))));
      root_.append(hist);
    }
    root_.append(h("div", { class: "btn-row" }, U.btn("Effacer ma progression", { cls: "ghost sm", onclick: () => { if (confirm("Effacer toute ta progression (leçons lues, résultats) ? Cette action est définitive.")) { root.Store.reset(); App.render(); U.toast("Progression effacée"); } } })));
    return root_;
  };

  /* ====================================================================== RÉVISION */
  App.views.revision = function () {
    App.setTitle("Révision");
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Révision" }]),
      h("div", { class: "page-head" }, h("h1", { text: "Révision" }), h("p", { text: "Les leçons à revoir en priorité, d'après tes derniers résultats." })));
    const byLesson = {};
    Object.entries(S.qstats).forEach(([id, st]) => { const q = qById[id]; if (!q) return; const l = byLesson[q.relatedLesson] = byLesson[q.relatedLesson] || { e: 0, p: 0 }; l.e += st.earned; l.p += st.points; });
    const weak = Object.entries(byLesson).map(([lid, v]) => [lid, Math.round((v.e / v.p) * 100)]).filter(([, pct]) => pct < 70).sort((a, b) => a[1] - b[1]);
    const wrongIds = Object.entries(S.qstats).filter(([, st]) => st.status !== "correct").map(([id]) => id);

    if (!Object.keys(S.qstats).length) root_.append(U.empty("Pas encore de résultats", "Fais un devoir ou un exercice : tes points faibles apparaîtront ici.", h("div", { class: "btn-row", style: "justify-content:center" }, U.btn("Faire un devoir", { href: "#/devoirs", cls: "primary" }), U.btn("Générer un exercice", { href: "#/exercices" }))));
    else {
      root_.append(h("div", { class: "sec-title" }, h("h2", { text: "À revoir en priorité" })));
      if (weak.length) {
        const ol = h("ol", { class: "review-list" });
        weak.slice(0, 10).forEach(([lid, pct]) => { const l = lessonById[lid]; ol.append(h("li", null,
          h("div", { class: "grow" }, h("strong", { text: lnum(l) + "  " + l.title }), h("div", { class: "muted", style: "font-size:.85rem", text: "Réussite : " + pct + " %" })),
          U.btn("Revoir", { href: "#/lecon/" + lid, cls: "sm" }), U.btn("S'entraîner", { href: "#/exercices?lesson=" + lid, cls: "sm" }))); });
        root_.append(ol);
      } else root_.append(U.callout("ok", "", "Toutes les leçons travaillées sont à plus de 70 % de réussite. Continue !"));
      if (wrongIds.length) root_.append(h("div", { class: "btn-row" }, U.btn("Refaire mes " + Math.min(wrongIds.length, 12) + " questions ratées", { href: "#/exercices/run?kind=revision&ids=" + wrongIds.slice(0, 12).join(","), cls: "primary", icon: "refresh" })));
      const cats = {};
      Object.values(S.qstats).forEach((st) => { if (st.status !== "correct" && st.cat) cats[st.cat] = (cats[st.cat] || 0) + 1; });
      const ce = Object.entries(cats).sort((a, b) => b[1] - a[1]);
      if (ce.length) {
        const card = h("div", { class: "card" }, h("h2", { text: "Tes erreurs les plus fréquentes" }));
        ce.forEach(([cat, n]) => card.append(h("div", { class: "chap-row" }, h("span", null, h("span", { class: "cat", text: G.CATS[cat] || cat })), U.bar((n / ce[0][1]) * 100, "err"), h("span", { class: "muted", text: n }))));
        root_.append(card);
      }
    }
    const unread = L.filter((l) => !S.read[l.id] && !l.bonus);
    root_.append(h("div", { class: "sec-title" }, h("h2", { text: "Leçons pas encore lues (" + unread.length + ")" })));
    if (unread.length) unread.slice(0, 8).forEach((l) => root_.append(h("a", { class: "lesson-row", href: "#/lecon/" + l.id }, h("span", { class: "num", text: lnum(l) }), h("span", { class: "title", text: l.title }), h("span", { class: "muted", text: l.duree }))));
    else root_.append(U.callout("ok", "", "Tu as lu toutes les leçons du programme."));
    return root_;
  };

  /* ====================================================================== RECHERCHE */
  let INDEX = null;
  const strip = (s) => String(s || "").replace(/[‹›]/g, "").replace(/\*\*/g, "");
  function buildIndex() {
    const idx = [];
    const add = (type, title, text, href) => idx.push({ type, title, text: strip(text), norm: U.normSearch(title + " " + strip(text)), tnorm: U.normSearch(title), href });
    L.forEach((l) => {
      const parts = [l.concept, l.rule, ...(l.memorize || []), ...(l.understand || []), ...(l.errors || []), ...(l.devoir || []), l.express,
        ...(l.notes || []).map((n) => n.title + " " + n.text), ...(l.snippets || []).map((s) => s.title + " " + s.code),
        ...(l.tables || []).flatMap((t) => [t.title, ...t.rows.map((r) => r.join(" "))]),
        ...(l.examples || []).flatMap((e) => [e.titre, e.enonce, e.traitement, e.algo, e.python, ...e.explication]), l.application.enonce];
      add("Cours", lnum(l) + " " + l.title, parts.join(" "), "#/lecon/" + l.id);
    });
    D.summaries.forEach((s) => s.cards.forEach((c) => add("Résumé", chapById[s.chapter].title + " — " + c.h, c.fr.join(" "), "#/resumes?c=" + s.chapter)));
    D.compare.forEach((c) => add("Résumé", "À ne pas confondre : " + c.title, c.rows.map((r) => r.join(" ")).join(" "), "#/resumes"));
    D.memo.forEach((m) => add("Résumé", "Fiche express", m.fr, "#/resumes"));
    D.devoirs.forEach((d) => add("Devoir", d.titre, d.intro, "#/devoir/" + d.id));
    D.questions.forEach((q) => {
      const dv = /^D\d/.test(q.id) ? q.id.split("-")[0] : null;
      add(dv ? "Devoir" : "Exercice", (dv ? dv + " · " : "") + strip(q.statement).slice(0, 90), strip(q.statement) + " " + (q.code ? q.code.text : "") + " " + (q.explanation || ""), dv ? "#/devoir/" + dv : "#/exercices/run?ids=" + q.id);
    });
    return idx;
  }
  App.search = function (query, limit) {
    if (!INDEX) INDEX = buildIndex();
    const toks = U.normSearch(query).split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    const out = [];
    for (const it of INDEX) {
      if (!toks.every((t) => it.norm.includes(t))) continue;
      let score = it.type === "Cours" ? 3 : it.type === "Résumé" ? 2 : 0;
      toks.forEach((t) => { if (it.tnorm.includes(t)) score += 8; score += Math.min(6, it.norm.split(t).length - 1); });
      out.push({ it, score });
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, limit || 40).map((x) => x.it);
  };
  function snippet(it, toks) {
    const raw = it.text, n = U.normSearch(raw.replace(/t\.d\.o/gi, "tdo")).length === raw.length ? U.normSearch(raw) : raw.toLowerCase();
    let pos = -1;
    for (const t of toks) { pos = n.indexOf(t); if (pos >= 0) break; }
    if (pos < 0) return U.esc(raw.slice(0, 140));
    const from = Math.max(0, pos - 50), to = Math.min(raw.length, pos + 110);
    let s = U.esc(raw.slice(from, to));
    toks.forEach((t) => { if (t.length > 1) s = s.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>"); });
    return (from ? "…" : "") + s + (to < raw.length ? "…" : "");
  }
  App.views.recherche = function (ctx) {
    const q = ctx.q.q || "";
    App.setTitle("Recherche : " + q);
    const state = { type: "Tous" };
    const list = h("div");
    const toks = U.normSearch(q).split(/\s+/).filter(Boolean);
    const all = App.search(q, 80);
    const paint = () => {
      list.replaceChildren();
      const res = all.filter((r) => state.type === "Tous" || r.type === state.type);
      if (!q) { list.append(U.empty("Tape un mot-clé", "Exemples : variable, chaîne, boucle, TDO, DIV, Python…")); return; }
      if (!res.length) { list.append(U.empty("Aucun résultat", "Essaie un autre mot (sans accent, ou plus court).")); return; }
      res.forEach((r) => list.append(h("a", { class: "result-item", href: r.href },
        h("div", { class: "row wrap" }, U.badge(r.type, r.type === "Cours" ? "accent" : r.type === "Devoir" ? "warn" : ""), h("strong", { text: r.title })),
        h("p", { html: snippet(r, toks) }))));
    };
    const chips = h("div", { class: "chips" });
    ["Tous", "Cours", "Résumé", "Exercice", "Devoir"].forEach((t) => {
      const n = t === "Tous" ? all.length : all.filter((r) => r.type === t).length;
      chips.append(h("button", { class: "chip", type: "button", "aria-pressed": t === "Tous", onclick: (e) => { state.type = t; chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false")); e.currentTarget.setAttribute("aria-pressed", "true"); paint(); } }, t + " (" + n + ")"));
    });
    const root_ = h("div", null, U.crumbs([{ label: "Accueil", href: "#/accueil" }, { label: "Recherche" }]),
      h("div", { class: "page-head" }, h("h1", { text: q ? "Résultats pour « " + q + " »" : "Recherche" }), h("p", { text: "La recherche porte sur les cours, les résumés, les exercices et les devoirs." })), chips, list);
    paint();
    return root_;
  };
})(window);
