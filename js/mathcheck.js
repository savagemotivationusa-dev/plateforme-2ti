/* ==========================================================================
   MathCheck — vérification de réponses mathématiques, 100 % locale.
   Aucun eval() : les expressions sont analysées par un petit parseur sûr.

   Réponses reconnues (selon la forme de la réponse attendue) :
     valeur / expression   8/15 · 6√3 · 5π/6 · 3+√5 · (x-3)^2-8   (équivalence par évaluation numérique)
     ensemble              {3 ; 5} · {−1/3 ; 2} · ∅ · ℝ\{2}
     intervalles           ]−∞ ; −2[ ∪ ]3 ; +∞[ · [−1/3 ; 2[
     couple / point        (2 ; 3) · K(0 ; 3)
     équation              x + y − 1 = 0 (équivalente à un multiple près) · y = −4/3x + 5/3
   Options (objet passé avec la réponse attendue) :
     alts:[…]    autres réponses acceptées
     tol         tolérance absolue (valeurs approchées)
     pct, unit   ignorer « % » ou une unité finale (ex. unit:"cm")
     must / mustNot   expressions régulières sur le texte normalisé (forme imposée)
     parallel    couple colinéaire au couple attendu (vecteur directeur au choix)
     on          « équation » : le couple doit la vérifier (point d'une droite au choix)
   ========================================================================== */
(function (root) {
  "use strict";

  const SUP = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
  const SUB = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };

  /* ---------- Normalisation du texte ---------- */
  function norm(s) {
    s = String(s == null ? "" : s).normalize("NFC");
    s = s.replace(/[\u202a\u202c\u200e\u200f\u00a0\u202f]/g, " ");
    s = s.replace(/[−–—‒]/g, "-").replace(/[×·⋅∙]/g, "*").replace(/[÷∕]/g, "/");
    s = s.replace(/(⁻?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m, neg, d) => "^(" + (neg ? "-" : "") + [...d].map((c) => SUP[c]).join("") + ")");
    s = s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (c) => SUB[c]);
    s = s.replace(/√/g, "sqrt").replace(/π/g, "pi").replace(/∞/g, "inf").replace(/ℝ/g, "R");
    s = s.replace(/≤|⩽|=</g, "<=").replace(/≥|⩾|=>/g, ">=").replace(/≠/g, "!=");
    s = s.replace(/[⟦]/g, "[").replace(/[⟧]/g, "]");
    s = s.replace(/(\d)\s+(\d{3})(?!\d)/g, "$1$2");            // 1 200 -> 1200
    s = s.replace(/(\d),(\d)/g, "$1.$2");                        // 0,5 -> 0.5
    s = s.replace(/\s+/g, "");
    return s.toLowerCase().replace(/r(?=\\)/g, "r");
  }

  /* ---------- Parseur d'expressions ---------- */
  const FUNCS = { sqrt: Math.sqrt, abs: Math.abs, cos: Math.cos, sin: Math.sin, tan: Math.tan };

  function tokenize(s) {
    const t = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      let m;
      if ((m = /^(\d+(\.\d*)?|\.\d+)/.exec(s.slice(i)))) { t.push({ k: "n", v: parseFloat(m[0]) }); i += m[0].length; continue; }
      if ((m = /^[a-z]+/.exec(s.slice(i)))) {
        let w = m[0]; i += w.length;
        while (w.length) {
          let hit = null;
          for (const f of ["sqrt", "abs", "cos", "sin", "tan", "pi", "inf"]) if (w.startsWith(f)) { hit = f; break; }
          if (hit) { t.push(hit === "pi" ? { k: "n", v: Math.PI } : hit === "inf" ? { k: "n", v: Infinity } : { k: "f", v: hit }); w = w.slice(hit.length); }
          else { t.push({ k: "v", v: w[0] }); w = w.slice(1); }
        }
        continue;
      }
      if ("+-*/^()%|".includes(c)) { t.push({ k: c }); i++; continue; }
      throw new Error("car");
    }
    return t;
  }

  function parse(s) {
    const t = tokenize(s);
    let p = 0;
    const peek = () => t[p], next = () => t[p++];
    const startsFactor = (x) => x && (x.k === "n" || x.k === "v" || x.k === "f" || x.k === "(");
    function expr() {
      let a = term();
      while (peek() && (peek().k === "+" || peek().k === "-")) { const o = next().k; const b = term(); a = { o, a, b }; }
      return a;
    }
    function term() {
      let a = unary();
      for (;;) {
        const x = peek();
        if (x && (x.k === "*" || x.k === "/")) { next(); a = { o: x.k, a, b: unary() }; }
        else if (startsFactor(x)) a = { o: "*", a, b: unary() };
        else break;
      }
      return a;
    }
    function unary() {
      const x = peek();
      if (x && (x.k === "-" || x.k === "+")) { next(); const u = unary(); return x.k === "-" ? { o: "neg", a: u } : u; }
      return power();
    }
    function power() {
      const a = atom();
      if (peek() && peek().k === "^") { next(); const e = unary(); return { o: "^", a, b: e }; }
      return a;
    }
    function atom() {
      const x = next();
      if (!x) throw new Error("fin");
      let r;
      if (x.k === "n") r = { n: x.v };
      else if (x.k === "v") r = { v: x.v };
      else if (x.k === "f") {
        const nx = peek();
        if (nx && nx.k === "(") { next(); const e = expr(); if (!next()) throw new Error("par"); r = { f: x.v, a: e }; }
        else r = { f: x.v, a: atom() };
      } else if (x.k === "(") { r = expr(); const c = next(); if (!c || c.k !== ")") throw new Error("par"); }
      else if (x.k === "|") { r = { f: "abs", a: expr() }; const c = next(); if (!c || c.k !== "|") throw new Error("abs"); }
      else throw new Error("atome");
      while (peek() && peek().k === "%") { next(); r = { o: "/", a: r, b: { n: 100 } }; }
      return r;
    }
    const tree = expr();
    if (p < t.length) throw new Error("reste");
    return tree;
  }

  function ev(n, env) {
    if (n.n !== undefined) return n.n;
    if (n.v !== undefined) { const v = env[n.v]; return v === undefined ? NaN : v; }
    if (n.f) return FUNCS[n.f](ev(n.a, env));
    switch (n.o) {
      case "+": return ev(n.a, env) + ev(n.b, env);
      case "-": return ev(n.a, env) - ev(n.b, env);
      case "*": return ev(n.a, env) * ev(n.b, env);
      case "/": return ev(n.a, env) / ev(n.b, env);
      case "neg": return -ev(n.a, env);
      case "^": return Math.pow(ev(n.a, env), ev(n.b, env));
    }
    return NaN;
  }
  function vars(n, set) {
    set = set || new Set();
    if (n.v !== undefined) set.add(n.v);
    if (n.a) vars(n.a, set);
    if (n.b) vars(n.b, set);
    return set;
  }

  const SAMPLES = [1.3, -2.1, 0.7, 3.9, -0.45, 2.6, 5.2, -3.3, 1.9, 0.25];
  const close = (a, b, tol) => Math.abs(a - b) <= (tol !== undefined ? tol : 1e-8 * (1 + Math.max(Math.abs(a), Math.abs(b))));

  function exprEq(sa, sb, tol) {
    let A, B;
    try { A = parse(sa); B = parse(sb); } catch (e) { return false; }
    const names = [...new Set([...vars(A), ...vars(B)])];
    if (!names.length) { const a = ev(A, {}), b = ev(B, {}); return isFinite(a) && isFinite(b) ? close(a, b, tol) : a === b; }
    let valid = 0;
    for (let k = 0; k < SAMPLES.length; k++) {
      const env = {};
      names.forEach((nm, j) => { env[nm] = SAMPLES[(k + 3 * j) % SAMPLES.length]; });
      const a = ev(A, env), b = ev(B, env);
      if (!isFinite(a) && !isFinite(b)) continue;
      if (!isFinite(a) || !isFinite(b)) return false;
      if (!close(a, b)) return false;
      valid++;
    }
    return valid >= 3;
  }
  const numOf = (s) => { try { const n = parse(s); if (vars(n).size) return NaN; return ev(n, {}); } catch (e) { return NaN; } };

  /* ---------- Découpage « au premier niveau » ---------- */
  function splitTop(s, seps) {
    const out = []; let depth = 0, cur = "";
    for (const c of s) {
      if ("([{".includes(c)) depth++;
      else if (")]}".includes(c)) depth--;
      if (depth === 0 && seps.includes(c)) { out.push(cur); cur = ""; } else cur += c;
    }
    out.push(cur);
    return out;
  }

  /* ---------- Ensembles ---------- */
  const EMPTY = new Set(["∅", "{}", "vide", "ensemblevide", "aucune", "aucunesolution", "pasdesolution", "empty", "s=∅", "s={}", "s=vide", "s=aucune", "s=aucunesolution", "ø"]);
  function stripName(s) { return s.replace(/^[a-z][a-z0-9_]*(\([a-z]\))?=/, ""); }

  function parseSet(s) {
    s = stripName(s);
    if (s.startsWith("{") && s.endsWith("}")) s = s.slice(1, -1);
    s = s.replace(/ou|et/g, ";");
    const parts = splitTop(s, ";").map((x) => x.trim()).filter((x) => x !== "");
    return parts.map((p) => stripName(p));
  }
  function elemEq(a, b, tol) {
    const ta = a.startsWith("(") && a.endsWith(")") && splitTop(a.slice(1, -1), ";").length > 1;
    const tb = b.startsWith("(") && b.endsWith(")") && splitTop(b.slice(1, -1), ";").length > 1;
    if (ta !== tb) return false;
    if (ta) {
      const pa = splitTop(a.slice(1, -1), ";"), pb = splitTop(b.slice(1, -1), ";");
      return pa.length === pb.length && pa.every((x, i) => exprEq(x, pb[i], tol));
    }
    return exprEq(a, b, tol);
  }
  function setEq(sa, sb, tol) {
    const A = parseSet(sa), B = parseSet(sb);
    if (A.length !== B.length) return false;
    const used = new Array(B.length).fill(false);
    return A.every((x) => { const j = B.findIndex((y, i) => !used[i] && elemEq(x, y, tol)); if (j < 0) return false; used[j] = true; return true; });
  }

  /* ---------- Intervalles ---------- */
  function parseIntervals(s) {
    s = stripName(s).replace(/\)\s*/g, "[").replace(/\(/g, "]");
    // sépare sur ∪ ou sur « u » entre crochets : ... ] u ] ...
    const parts = []; let cur = "";
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "∪" || (c === "u" && (s[i - 1] === "[" || s[i - 1] === "]") && (s[i + 1] === "[" || s[i + 1] === "]"))) { parts.push(cur); cur = ""; }
      else cur += c;
    }
    parts.push(cur);
    const res = [];
    for (const p of parts) {
      const m = /^([\[\]])(.*);(.*)([\[\]])$/.exec(p);
      if (!m) return null;
      const lo = numOf(m[2].replace(/^\+?inf$/, "inf")), hi = numOf(m[3].replace(/^\+inf$/, "inf"));
      if (isNaN(lo) || isNaN(hi)) return null;
      res.push({ lo, hi, loIn: m[1] === "[", hiIn: m[4] === "]" });
    }
    res.sort((a, b) => a.lo - b.lo || b.hi - a.hi);
    return res;
  }
  function intervalEq(sa, sb, tol) {
    const A = parseIntervals(sa), B = parseIntervals(sb);
    if (!A || !B || A.length !== B.length) return false;
    return A.every((x, i) => {
      const y = B[i];
      const same = (u, v) => (u === v) || close(u, v, tol);
      const inf = (v) => !isFinite(v);
      // un crochet côté infini n'a pas de sens : on l'ignore
      return same(x.lo, y.lo) && same(x.hi, y.hi) && (inf(x.lo) || x.loIn === y.loIn) && (inf(x.hi) || x.hiIn === y.hiIn);
    });
  }

  /* ---------- Équations : égalité à un facteur non nul près ---------- */
  function sides(s) { const i = s.indexOf("="); return i < 0 ? null : [s.slice(0, i), s.slice(i + 1)]; }
  function eqEq(sa, sb) {
    const a = sides(sa), b = sides(sb);
    if (!a || !b || sa.indexOf("=", sa.indexOf("=") + 1) >= 0 || sb.indexOf("=", sb.indexOf("=") + 1) >= 0) return false;
    let A1, A2, B1, B2;
    try { A1 = parse(a[0]); A2 = parse(a[1]); B1 = parse(b[0]); B2 = parse(b[1]); } catch (e) { return false; }
    const names = [...new Set([...vars(A1), ...vars(A2), ...vars(B1), ...vars(B2)])];
    let ratio = null, seen = 0;
    for (let k = 0; k < 9; k++) {
      const env = {};
      names.forEach((nm, j) => { env[nm] = SAMPLES[(k * 2 + 3 * j + 1) % SAMPLES.length]; });
      const f = ev(A1, env) - ev(A2, env), g = ev(B1, env) - ev(B2, env);
      if (!isFinite(f) || !isFinite(g)) return false;
      if (Math.abs(g) < 1e-9) { if (Math.abs(f) > 1e-7) return false; continue; }
      const r = f / g;
      if (Math.abs(r) < 1e-9) return false;
      if (ratio === null) ratio = r; else if (!close(r, ratio, 1e-7 * (1 + Math.abs(ratio)))) return false;
      seen++;
    }
    return seen >= 3;
  }

  /* ---------- Couples ---------- */
  function isTuple(s) { return /^[a-z]*\(.+\)$/.test(s) && splitTop(s.replace(/^[a-z]*\(/, "(").slice(1, -1), ";").length > 1; }
  function tupleParts(s) { return splitTop(s.replace(/^[a-z]*\(/, "(").slice(1, -1), ";"); }

  /* ---------- Comparaison principale ---------- */
  function equivOne(student, expected, o) {
    const s0 = norm(student);
    let e = norm(expected);
    if (s0 === "") return false;
    let s = s0;
    if (o.pct) { s = s.replace(/%/g, ""); e = e.replace(/%/g, ""); }
    if (o.unit) { const u = norm(o.unit); if (s.endsWith(u)) s = s.slice(0, -u.length); if (e.endsWith(u)) e = e.slice(0, -u.length); }
    if (o.must && !o.must.test(s0)) return false;
    if (o.mustNot && o.mustNot.test(s0)) return false;

    // ensemble vide
    if (EMPTY.has(e)) return EMPTY.has(s) || EMPTY.has(stripName(s));

    // R privé de …
    if (/^r\\/.test(e)) {
      const m = /^r\\\{?(.*?)\}?$/.exec(s);
      if (!m) return false;
      return setEq("{" + m[1] + "}", "{" + e.replace(/^r\\\{?|\}$/g, "") + "}", o.tol);
    }
    // couple / point
    if (isTuple(e) && !e.startsWith("{")) {
      if (!isTuple(s)) return false;
      const A = tupleParts(s), B = tupleParts(e);
      if (A.length !== B.length) return false;
      if (o.parallel) { const [x, y] = A.map(numOf), [u, v] = B.map(numOf); return isFinite(x) && isFinite(y) && close(x * v - y * u, 0, 1e-8) && (Math.abs(x) + Math.abs(y) > 1e-9); }
      return A.every((x, i) => exprEq(x, B[i], o.tol));
    }
    // ensemble
    if (e.startsWith("{") || /^[a-z]=\{/.test(e)) {
      const ss = /^[a-z]=\{/.test(s) ? s : s;
      return setEq(ss, e, o.tol);
    }
    // intervalles
    if (/^[\[\]]/.test(e) || e.includes("∪")) {
      return intervalEq(s, e, o.tol);
    }
    // équation
    if (e.includes("=") && !e.includes("<") && !e.includes(">")) return eqEq(s, e);
    // inéquation écrite sous forme x<…, x>=…
    if (/[<>]/.test(e)) return s.replace(/<=/g, "≤").replace(/>=/g, "≥") === e.replace(/<=/g, "≤").replace(/>=/g, "≥");
    // valeur / expression
    const s1 = (s.includes("=") && s.indexOf("=") === s.lastIndexOf("=") && !/[<>!]/.test(s)) ? stripName(s) : s;
    return exprEq(s1, e, o.tol);
  }

  function equiv(student, expected, opts) {
    const o = opts || {};
    try {
      if (o.on) {
        const s = norm(student);
        if (!isTuple(s)) return false;
        const [x, y] = tupleParts(s).map(numOf);
        const eq = sides(norm(o.on)); if (!eq || !isFinite(x) || !isFinite(y)) return false;
        const env = { x, y }; const f = ev(parse(eq[0]), env) - ev(parse(eq[1]), env);
        return Math.abs(f) < 1e-8;
      }
      if (equivOne(student, expected, o)) return true;
      return (o.alts || []).some((a) => equivOne(student, a, o));
    } catch (err) { return false; }
  }

  /* Ces fonctions sont exposées pour les tests. */
  root.MathCheck = { equiv, norm, parse, exprEq };
  if (typeof module !== "undefined" && module.exports) module.exports = root.MathCheck;
})(typeof window !== "undefined" ? window : globalThis);
