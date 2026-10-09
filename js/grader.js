/* ==========================================================================
   Moteur de correction (100 % local, aucune API externe).
   Types de questions gérés :
     qcm    : choix unique ou multiple (multi:true, correctAnswer = tableau d'indices)
     vf     : vrai / faux
     text   : réponse courte (accept = liste de réponses acceptées, "re:" pour une regex)
     fields : plusieurs champs à remplir (fields:[{label, accept}])
     code   : algorithme ou Python, noté par critères (checks) + détection d'erreurs
   ========================================================================== */
(function (root) {
  "use strict";

  const CATS = {
    syntaxe: "erreur de syntaxe",
    type: "erreur de type",
    logique: "erreur logique",
    variable: "mauvaise variable",
    operateur: "mauvais opérateur",
    condition: "mauvaise condition",
    resultat: "mauvais résultat",
    concept: "erreur de concept",
    vide: "pas de réponse"
  };

  /* ---------- Normalisation ---------- */
  function stripAccents(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  // Texte court : minuscules, sans accents, espaces réduits, guillemets retirés.
  function normText(s) {
    s = String(s == null ? "" : s);
    s = stripAccents(s).toLowerCase();
    s = s.replace(/[’‘`´]/g, "'").replace(/[“”«»]/g, '"');
    s = s.replace(/\s+/g, " ").trim();
    s = s.replace(/^["']+|["']+$/g, "").trim();
    s = s.replace(/[.;]+$/, "").trim();
    return s;
  }

  // Variante sensible à la casse (ex. « T » ≠ « t »).
  function normTextCS(s) {
    s = String(s == null ? "" : s);
    s = s.normalize("NFC").replace(/[’‘`´]/g, "'").replace(/[“”«»]/g, '"');
    s = s.replace(/\s+/g, " ").trim();
    s = s.replace(/^["']+|["']+$/g, "").trim();
    s = s.replace(/[.;]+$/, "").trim();
    return s;
  }

  function toNumber(s) {
    const t = String(s).trim().replace(",", ".");
    if (t === "" || !/^[-+]?\d+(\.\d+)?$/.test(t)) return null;
    return parseFloat(t);
  }

  // Code : normalisation tolérante (algorithme ou Python).
  function normCode(s) {
    s = String(s == null ? "" : s);
    s = stripAccents(s).toLowerCase();
    s = s.replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"');
    s = s.replace(/<-|<—|<–|→/g, "←");
    s = s.replace(/≥/g, ">=").replace(/≤/g, "<=").replace(/≠|<>/g, "!=");
    s = s.replace(/×/g, "*").replace(/÷/g, "/");
    return s
      .split(/\r?\n/)
      .map((l) => l.replace(/#.*$/, "").replace(/[ \t ]+/g, " ").trim())
      .filter((l) => l.length)
      .join("\n");
  }

  /* ---------- Utilitaires ---------- */
  const round4 = (x) => Math.round(x * 4) / 4;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  function matchAccept(student, accept, cs) {
    const nf = cs ? normTextCS : normText;
    const ns = nf(student);
    if (ns === "") return false;
    const nsNum = toNumber(ns);
    for (const a of accept) {
      if (a instanceof RegExp) { if (a.test(ns)) return true; continue; }
      const na = nf(a);
      if (na === ns) return true;
      const aNum = toNumber(na);
      if (aNum !== null && nsNum !== null && Math.abs(aNum - nsNum) < 1e-9) return true;
    }
    return false;
  }

  function firstAccept(a) {
    const f = a.find((x) => !(x instanceof RegExp));
    return f !== undefined ? String(f) : "";
  }

  function statusOf(earned, points) {
    if (earned >= points - 1e-9) return "correct";
    if (earned <= 1e-9) return "incorrect";
    return "partial";
  }

  /* ---------- Détection du mélange Algorithme / Python ---------- */
  function mixCheck(q, code) {
    const out = [];
    const mode = q.mode;
    if (mode === "algo") {
      if (/\b(print|input)\s*\(/.test(code) || /^\s*(for|while|if|elif|else)\b.*:\s*$/m.test(code) || /\bdef\s+\w+\s*\(/.test(code)) {
        out.push({ cat: "syntaxe", msg: "Tu as écrit du Python (print, input, if/for/while avec « : »…) alors que la question demande un algorithme. Les deux syntaxes ne se mélangent pas : en algorithme on utilise Lire, Ecrire, Si … alors, Pour … Faire.", pen: 0.5 });
      }
      if (!q.allowEq) {
        const lines = code.split("\n");
        const bad = lines.some((l) => {
          if (/^(si|sinon si|tant que|jusqu'a|selon|pour|repeter|algorithme|t\.d\.o|tdo)\b/.test(l)) return false;
          if (/constante|const\b/.test(l)) return false;
          return /^[a-z_][a-z_0-9]*(\[[^\]]*\])?\s*=\s*[^=]/.test(l) && !/←/.test(l);
        });
        if (bad) out.push({ cat: "syntaxe", msg: "Tu as utilisé « = » pour une affectation. En algorithmique, l'affectation s'écrit avec la flèche « ← » (le signe « = » sert à comparer). En Python, on utilise « = ».", pen: 0.25 });
      }
    } else if (mode === "python") {
      if (/\b(lire|ecrire|ecrire_nl)\s*\(/.test(code) || /←/.test(code) || /\bfin (si|pour|tant que|selon)\b/.test(code) || /\b(alors|faire)\b\s*$/m.test(code) || /^\s*(debut|fin)\s*$/m.test(code)) {
        out.push({ cat: "syntaxe", msg: "Tu as écrit de l'algorithme (Lire, Ecrire, ←, Fin Si…) alors que la question demande du Python. En Python : input(), print(), « = », ‹if cond:›, ‹for … in range(…):›.", pen: 0.5 });
      }
    }
    return out;
  }

  /* ---------- Correction par type ---------- */
  function gradeQcm(q, ans) {
    const choices = q.choices;
    const multi = Array.isArray(q.correctAnswer);
    const correct = multi ? q.correctAnswer.slice().sort() : [q.correctAnswer];
    const sel = multi ? (Array.isArray(ans) ? ans.slice().sort() : []) : (ans === undefined || ans === null || ans === "" ? [] : [Number(ans)]);
    const res = { detail: [], cause: [] };
    res.correctDisplay = correct.map((i) => choices[i]).join("  +  ");
    res.studentDisplay = sel.length ? sel.map((i) => choices[i]).join("  +  ") : "";
    if (!sel.length) { res.earned = 0; res.empty = true; return res; }
    const right = sel.filter((i) => correct.includes(i)).length;
    const wrong = sel.length - right;
    const ratio = clamp((right - wrong) / correct.length, 0, 1);
    res.earned = round4(ratio * q.points);
    sel.forEach((i) => {
      res.detail.push({ ok: correct.includes(i), label: choices[i] });
    });
    if (res.earned < q.points) res.cause.push({ cat: q.errCat || "concept", msg: multi ? "Il fallait cocher exactement les bonnes propositions (une mauvaise case retire des points)." : "Ce n'est pas la bonne proposition." });
    return res;
  }

  function gradeVf(q, ans) {
    const res = { detail: [], cause: [] };
    res.correctDisplay = q.correctAnswer ? "Vrai" : "Faux";
    if (ans === undefined || ans === null || ans === "") { res.earned = 0; res.empty = true; res.studentDisplay = ""; return res; }
    const v = ans === true || ans === "true" || ans === "Vrai";
    res.studentDisplay = v ? "Vrai" : "Faux";
    res.earned = v === q.correctAnswer ? q.points : 0;
    if (res.earned === 0) res.cause.push({ cat: q.errCat || "concept", msg: "Cette affirmation est " + (q.correctAnswer ? "vraie" : "fausse") + "." });
    return res;
  }

  function gradeText(q, ans) {
    const res = { detail: [], cause: [] };
    const accept = q.accept;
    res.correctDisplay = q.correctAnswer !== undefined ? String(q.correctAnswer) : firstAccept(accept);
    res.studentDisplay = ans == null ? "" : String(ans);
    if (normText(res.studentDisplay) === "") { res.earned = 0; res.empty = true; return res; }
    if (matchAccept(ans, accept, q.cs)) { res.earned = q.points; return res; }
    res.earned = 0;
    const ns = normText(ans);
    let fb = null;
    (q.feedback || []).some((f) => { if (f.re.test(ns)) { fb = f; return true; } return false; });
    res.cause.push(fb ? { cat: fb.cat || q.errCat || "resultat", msg: fb.msg } : { cat: q.errCat || "resultat", msg: "La réponse donnée ne correspond pas au résultat attendu." });
    return res;
  }

  function gradeFields(q, ans) {
    const res = { detail: [], cause: [] };
    const n = q.fields.length;
    const arr = Array.isArray(ans) ? ans : [];
    const totalW = q.fields.reduce((s, f) => s + (f.w || 1), 0);
    let earned = 0;
    let anyAns = false;
    q.fields.forEach((f, i) => {
      const val = arr[i] == null ? "" : String(arr[i]);
      if (normText(val) !== "") anyAns = true;
      const ok = matchAccept(val, f.accept, f.cs || q.cs);
      const w = ((f.w || 1) / totalW) * q.points;
      if (ok) earned += w;
      res.detail.push({ ok, label: f.label, student: val, expected: f.show || firstAccept(f.accept), explain: f.explain });
      if (!ok && normText(val) !== "") res.cause.push({ cat: f.cat || q.errCat || "resultat", msg: (f.label ? f.label + " : " : "") + (f.explain || "valeur incorrecte.") });
    });
    res.earned = anyAns ? round4(earned) : 0;
    if (!anyAns) res.empty = true;
    res.studentDisplay = res.detail.map((d) => d.label + " → " + (d.student || "—")).join(" ; ");
    res.correctDisplay = res.detail.map((d) => d.label + " → " + d.expected).join(" ; ");
    return res;
  }

  function gradeCode(q, ans) {
    const res = { detail: [], cause: [] };
    const raw = ans == null ? "" : String(ans);
    res.studentDisplay = raw;
    res.correctDisplay = q.solution || "";
    const code = normCode(raw);
    if (code.replace(/\s/g, "").length < 2) { res.earned = 0; res.empty = true; return res; }
    const totalW = q.checks.reduce((s, c) => s + (c.w || 1), 0);
    let ratio = 0;
    q.checks.forEach((c) => {
      let ok;
      if (c.any) ok = c.any.some((r) => r.test(code));
      else if (c.all) ok = c.all.every((r) => r.test(code));
      else ok = c.re.test(code);
      if (c.not && c.not.test(code)) ok = false;
      if (ok) ratio += (c.w || 1) / totalW;
      res.detail.push({ ok, label: c.label, msg: c.msg });
      if (!ok) res.cause.push({ cat: c.cat || "logique", msg: c.msg || ("Point manquant : " + c.label) });
    });
    let earned = ratio * q.points;
    mixCheck(q, code).forEach((m) => {
      earned -= m.pen * q.points;
      res.cause.unshift({ cat: m.cat, msg: m.msg });
      res.detail.push({ ok: false, label: "Syntaxe cohérente avec la consigne", msg: m.msg });
    });
    (q.forbid || []).forEach((f) => {
      if (f.re.test(code)) {
        earned -= (f.pen == null ? 0.25 : f.pen) * q.points;
        res.cause.unshift({ cat: f.cat || "logique", msg: f.msg });
        res.detail.push({ ok: false, label: f.label || "Erreur détectée", msg: f.msg });
      }
    });
    res.earned = clamp(round4(earned), 0, q.points);
    return res;
  }

  /* ---------- API ---------- */
  function grade(q, ans) {
    let r;
    switch (q.type) {
      case "qcm": r = gradeQcm(q, ans); break;
      case "vf": r = gradeVf(q, ans); break;
      case "text": r = gradeText(q, ans); break;
      case "fields": r = gradeFields(q, ans); break;
      case "code": r = gradeCode(q, ans); break;
      default: r = { earned: 0, detail: [], cause: [], studentDisplay: "", correctDisplay: "" };
    }
    r.points = q.points;
    r.status = statusOf(r.earned, q.points);
    if (r.empty) r.cause = [{ cat: "vide", msg: "Aucune réponse n'a été donnée." }];
    r.qid = q.id;
    r.lesson = q.relatedLesson || q.lesson;
    r.chapter = q.chapter;
    return r;
  }

  // Valeur de départ d'une réponse attendue (pour les auto-tests).
  function solutionFor(q) {
    switch (q.type) {
      case "qcm": return q.correctAnswer;
      case "vf": return q.correctAnswer;
      case "text": return firstAccept(q.accept) || q.correctAnswer;
      case "fields": return q.fields.map((f) => f.show || firstAccept(f.accept));
      case "code": return q.solution;
    }
    return null;
  }

  root.Grader = { grade, normText, normCode, solutionFor, CATS };
  if (typeof module !== "undefined" && module.exports) module.exports = root.Grader;
})(typeof window !== "undefined" ? window : globalThis);
