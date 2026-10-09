/* Composants d'interface réutilisables (aucune dépendance externe). */
(function (root) {
  "use strict";
  const App = (root.App = root.App || { views: {} });

  /* ---------- Texte formaté : ‹code›, **gras**, {terme LTR} (arabe) ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function fmt(s, ar) {
    let t = esc(s);
    t = t.replace(/‹([^›]+)›/g, '<code dir="ltr">$1</code>');
    t = t.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
    if (ar) t = t.replace(/\{([^}]+)\}/g, '<span class="ltr" dir="ltr">$1</span>');
    return t.replace(/\n/g, "<br>");
  }

  /* ---------- Création de nœuds ---------- */
  function append(el, kids) {
    for (const k of kids.flat(Infinity)) {
      if (k == null || k === false) continue;
      el.append(k.nodeType ? k : document.createTextNode(String(k)));
    }
  }
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") el.className = v;
        else if (k === "html") el.innerHTML = v;
        else if (k === "text") el.textContent = v;
        else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
        else el.setAttribute(k, v === true ? "" : v);
      }
    }
    append(el, kids);
    return el;
  }
  // Raccourci : élément avec du HTML déjà formaté.
  const ht = (tag, cls, html, extra) => h(tag, Object.assign({ class: cls, html }, extra || {}));

  /* ---------- Icônes ---------- */
  const ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
    book: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h10"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    flow: '<rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v4h11v4"/>',
    code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
    file: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    warn: '<path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18v.5"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>'
  };
  function icon(name, cls) {
    return h("span", { class: "icon" + (cls ? " " + cls : ""), "aria-hidden": "true",
      html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + "</svg>" });
  }

  /* ---------- Coloration syntaxique (algorithme + Python) ---------- */
  const ALGO_KW = new Set(["algorithme", "debut", "début", "fin", "si", "alors", "sinon", "pour", "faire", "repeter", "répéter",
    "jusqu'à", "jusqu'a", "selon", "lire", "ecrire", "écrire", "ecrire_nl", "div", "mod", "et", "ou", "non", "vrai", "faux", "retourner", "fonction"]);
  const ALGO_TYPES = new Set(["entier", "réel", "reel", "booléen", "booleen", "caractère", "caractere", "chaîne", "chaine", "tableau", "constante"]);
  const PY_KW = new Set(["def", "if", "elif", "else", "for", "while", "in", "import", "from", "match", "case", "break", "return", "and", "or", "not", "True", "False", "None", "continue"]);
  const PY_FN = new Set(["print", "input", "int", "float", "str", "len", "range", "abs", "round", "sqrt", "randint", "uniform", "ord", "chr", "max", "min", "sum"]);
  const TOKEN = new RegExp([
    "(#.*$)",                                                     // 1 commentaire
    "(\"[^\"\\n]*\"|'[^'\\n]')",                                   // 2 chaîne / caractère
    "(\\d+(?:\\.\\d+)?)(?![\\p{L}_])",                              // 3 nombre
    "(Fin\\s+Si|Fin\\s+Pour|Fin\\s+Tant\\s+que|Fin\\s+Selon|Tant\\s+que|Sinon\\s+Si)(?![\\p{L}])", // 4 mots-clés composés
    "(T\\.D\\.O)",                                                // 5 T.D.O
    "([\\p{L}_][\\p{L}\\p{N}_]*(?:'[\\p{L}]+)?)",                   // 6 mot
    "(←|≠|≥|≤)"                                                   // 7 symboles
  ].join("|"), "giu");

  function hlLine(line) {
    const isPour = /^\s*pour\s/i.test(line);
    let out = "", last = 0, m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(line))) {
      out += esc(line.slice(last, m.index));
      last = m.index + m[0].length;
      const t = m[0];
      if (m[1]) out += '<span class="tk-com">' + esc(t) + "</span>";
      else if (m[2]) out += '<span class="tk-str">' + esc(t) + "</span>";
      else if (m[3]) out += '<span class="tk-num">' + esc(t) + "</span>";
      else if (m[4] || m[5]) out += '<span class="tk-kw">' + esc(t) + "</span>";
      else if (m[7]) out += '<span class="tk-op">' + esc(t) + "</span>";
      else {
        const low = t.toLowerCase();
        if (ALGO_KW.has(low) || PY_KW.has(t) || (isPour && ["de", "à", "a", "pas"].includes(low))) out += '<span class="tk-kw">' + esc(t) + "</span>";
        else if (ALGO_TYPES.has(low)) out += '<span class="tk-type">' + esc(t) + "</span>";
        else if (PY_FN.has(t)) out += '<span class="tk-fn">' + esc(t) + "</span>";
        else out += esc(t);
      }
    }
    return out + esc(line.slice(last));
  }
  const highlight = (code) => String(code).split("\n").map(hlLine).join("\n");

  /* ---------- Copier ---------- */
  function copyText(text, btn) {
    const done = () => {
      if (!btn) return;
      const old = btn.getAttribute("data-label");
      btn.classList.add("ok");
      btn.lastChild.textContent = "Copié";
      setTimeout(() => { btn.classList.remove("ok"); btn.lastChild.textContent = old; }, 1400);
    };
    const fallback = () => {
      const ta = h("textarea", { style: "position:fixed;opacity:0" });
      ta.value = text; document.body.append(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignoré */ }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  }

  function codeBlock(code, opts) {
    opts = opts || {};
    const btn = h("button", { class: "copy-btn", type: "button", "data-label": "Copier", "aria-label": "Copier le code",
      onclick: () => copyText(code, btn) }, icon("copy"), h("span", null, "Copier"));
    return h("figure", { class: "codeblock" + (opts.cls ? " " + opts.cls : "") },
      h("figcaption", null, h("span", { class: "cb-title", text: opts.title || "" }), btn),
      h("pre", { tabindex: "0" }, h("code", { html: highlight(code) })));
  }

  /* ---------- Tableaux, onglets, encadrés, barres ---------- */
  function table(head, rows, opts) {
    opts = opts || {};
    return h("div", { class: "table-wrap" },
      h("table", { class: "tbl" + (opts.cls ? " " + opts.cls : "") },
        opts.caption ? h("caption", { html: fmt(opts.caption) }) : null,
        head ? h("thead", null, h("tr", null, head.map((c) => h("th", { scope: "col", html: fmt(c) })))) : null,
        h("tbody", null, rows.map((r) => h("tr", null, r.map((c, i) => h(i === 0 && opts.rowHead ? "th" : "td", { html: fmt(c) })))))));
  }

  let tabUid = 0;
  function tabs(items, opts) {
    const id = "tabs" + ++tabUid;
    const list = h("div", { class: "tablist", role: "tablist" });
    const panels = [];
    const btns = [];
    const select = (i, focus) => {
      btns.forEach((b, j) => { const on = i === j; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; panels[j].hidden = !on; });
      if (focus) btns[i].focus();
    };
    items.forEach((it, i) => {
      const b = h("button", { class: "tab", role: "tab", type: "button", id: id + "-t" + i, "aria-controls": id + "-p" + i,
        onclick: () => select(i),
        onkeydown: (e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % items.length, true); }
          if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + items.length) % items.length, true); }
        } }, it.label);
      btns.push(b); list.append(b);
      panels.push(h("div", { class: "tabpanel", role: "tabpanel", id: id + "-p" + i, "aria-labelledby": id + "-t" + i, tabindex: "0" }, it.content));
    });
    select((opts && opts.start) || 0);
    return h("div", { class: "tabs" }, list, panels);
  }

  const CALLOUT = {
    def: ["Définition", "info"], remark: ["Remarque", "info"], trap: ["Piège courant", "warn"],
    bonus: ["Bonus / Hors programme", "star"], verify: ["À vérifier", "bulb"], ok: ["Bien joué", "check"], tip: ["Astuce", "bulb"]
  };
  function callout(kind, title, html) {
    const meta = CALLOUT[kind] || CALLOUT.remark;
    return h("aside", { class: "callout c-" + kind },
      h("div", { class: "callout-head" }, icon(meta[1]), h("strong", { text: meta[0] }), title ? h("span", { class: "callout-title", html: fmt(title) }) : null),
      h("div", { class: "callout-body", html: fmt(html) }));
  }

  function bar(pct, cls) {
    pct = Math.max(0, Math.min(100, pct || 0));
    return h("div", { class: "bar " + (cls || ""), role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(pct) },
      h("span", { style: "width:" + pct + "%" }));
  }

  /* ---------- Divers ---------- */
  const round4 = (x) => Math.round(x * 4) / 4;
  const fmtNum = (n) => { const r = Math.round(n * 100) / 100; return String(r).replace(".", ","); };
  const stars = (n) => "⭐".repeat(n);
  const LEVEL = { 1: "Facile", 2: "Moyen", 3: "Difficile" };
  const levelText = (n) => stars(n) + " " + LEVEL[n];
  const fmtDate = (t) => new Date(t).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  const normSearch = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/t\.d\.o/g, "tdo");
  const pts = (n) => fmtNum(n) + (n > 1 ? " pts" : " pt");

  function crumbs(items) {
    return h("nav", { class: "crumbs", "aria-label": "Fil d'Ariane" },
      items.map((it, i) => [i ? h("span", { class: "sep", "aria-hidden": "true", text: "›" }) : null,
        it.href ? h("a", { href: it.href, text: it.label }) : h("span", { "aria-current": "page", text: it.label })]));
  }

  function badge(text, cls) { return h("span", { class: "badge " + (cls || ""), text }); }
  function btn(label, opts) {
    opts = opts || {};
    const tag = opts.href ? "a" : "button";
    return h(tag, { class: "btn " + (opts.cls || ""), href: opts.href, type: opts.href ? null : "button", onclick: opts.onclick, id: opts.id, "aria-pressed": opts.pressed },
      opts.icon ? icon(opts.icon) : null, h("span", { text: label }));
  }
  function empty(title, text, action) {
    return h("div", { class: "empty" }, h("strong", { text: title }), h("p", { text }), action || null);
  }
  function toast(msg) {
    const t = h("div", { class: "toast", role: "status", text: msg });
    document.body.append(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2600);
  }

  App.ui = { esc, fmt, h, ht, icon, highlight, codeBlock, table, tabs, callout, bar, round4, fmtNum, stars, LEVEL, levelText, fmtDate, normSearch, pts, crumbs, badge, btn, empty, toast, copyText };
})(window);
