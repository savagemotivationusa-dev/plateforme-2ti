/* Auto-test des données Mathématiques : node tests/selftest-maths.js
   - chaque solution obtient la note maximale ; une réponse vide ou absurde obtient 0
   - chaque devoir totalise 20 points ; références (leçons, chapitres, devoirs) cohérentes
   - les 33 leçons du document sont présentes, avec leurs étapes ; annexes A à G présentes */
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ctx = { console }; ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
const files = ["maths/data/chapters.js", ...[0,1,2,3,4,5,6].map(i => "maths/data/course-m" + i + ".js"), "maths/data/annexes.js",
  "maths/data/questions-m0-m2.js", "maths/data/questions-m3-m4.js", "maths/data/questions-m5-m6.js", "maths/data/questions-devoirs.js", "maths/data/devoirs.js",
  "js/mathcheck.js", "js/grader.js"];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
const D = ctx.DATA, G = ctx.Grader;
let errors = 0; const bad = (m) => { errors++; console.log("✘ " + m); };

// --- structure du cours
const EXPECT = { m0: 4, m1: 6, m2: 6, m3: 4, m4: 5, m5: 4, m6: 4 };
for (const [c, n] of Object.entries(EXPECT)) { const k = D.lessons.filter(l => l.chapter === c).length; if (k !== n) bad(c + " : " + k + " leçons au lieu de " + n); }
if (D.chapters.length !== 7) bad("chapitres : " + D.chapters.length);
for (const l of D.lessons) {
  const titles = l.steps.map(s => s.title);
  for (const must of ["Définition mathématique", "Exemples résolus de difficulté croissante", "Exercices d'application", "Résumé final"]) if (!titles.includes(must)) bad(l.id + " étape manquante : " + must);
  if (l.steps.some(s => !s.html || s.html.length < 20)) bad(l.id + " étape vide");
  if (!l.express) bad(l.id + " résumé vide");
  if ((l.text.match(/Exemple \d+\.\d+/g) || []).length < 3) bad(l.id + " moins de 3 exemples");
  if ((l.steps.find(s => /^Exercices/.test(s.title)).html.match(/class="exo"/g) || []).length < 3) bad(l.id + " moins de 3 exercices");
  if (!/Voir la correction/.test(l.steps.find(s => /^Exercices/.test(s.title)).html)) bad(l.id + " corrections absentes");
}
for (const c of D.chapters.filter(c => c.num >= 1)) { const ct = D.content[c.id]; if (!ct.synth || !ct.fiche || !ct.intro) bad(c.id + " intro/synthèse/fiche manquante"); }
if (!D.content.m0.intro) bad("m0 intro");
for (const k of "ABCDEFG") if (!D.annexes[k] || !D.annexes[k].html) bad("annexe " + k + " absente");
if (D.annexes.D.rows.length < 40) bad("glossaire trop court");
if (D.annexes.E.rows.length < 100) bad("index trop court");
if (Object.keys(D.devoirDocs).length !== 4) bad("devoirs du document : " + Object.keys(D.devoirDocs).length);
for (const d of Object.values(D.devoirDocs)) if (!d.enonce || !d.corrige) bad(d.titre + " énoncé/corrigé vide");
if (/NaN|undefined|\[object/.test(JSON.stringify(D.lessons))) bad("valeurs invalides dans les leçons");

// --- questions
const lessonIds = new Set(D.lessons.map(l => l.id)), chapIds = new Set(D.chapters.map(c => c.id));
const qids = new Set(); let nSol = 0;
for (const q of D.questions) {
  if (qids.has(q.id)) bad("id dupliqué " + q.id); qids.add(q.id);
  if (!lessonIds.has(q.lesson)) bad(q.id + " leçon inconnue " + q.lesson);
  if (!chapIds.has(q.chapter)) bad(q.id + " chapitre inconnu");
  const sol = G.solutionFor(q), r = G.grade(q, sol);
  if (Math.abs(r.earned - q.points) > 1e-9) bad(q.id + " solution = " + r.earned + "/" + q.points + " " + JSON.stringify(sol));
  nSol++;
  const e = G.grade(q, q.type === "fields" ? q.fields.map(() => "") : q.type === "qcm" ? undefined : "");
  if (e.earned !== 0) bad(q.id + " vide ≠ 0");
  // réponse absurde
  let wrong;
  if (q.type === "qcm") wrong = (q.correctAnswer + 1) % q.choices.length;
  else if (q.type === "vf") wrong = !q.correctAnswer;
  else if (q.type === "fields") wrong = q.fields.map(() => "zzz 12345 (");
  else wrong = "zzz 12345 (";
  const w = G.grade(q, wrong);
  if (w.earned !== 0) bad(q.id + " réponse absurde acceptée (" + w.earned + ")");
  if (!q.explanation || !q.correction) bad(q.id + " explication/correction manquante");
}
const per = {}; D.questions.forEach(q => per[q.lesson] = (per[q.lesson] || 0) + 1);
D.lessons.forEach(l => { if ((per[l.id] || 0) < 3) bad(l.id + " : moins de 3 questions"); });
for (const d of D.devoirs) {
  let total = 0;
  for (const ex of d.exercices) for (const id of ex.questions) { const q = D.questions.find(x => x.id === id); if (!q) bad(d.id + " question inconnue " + id); else total += q.points; }
  if (Math.abs(total - 20) > 1e-9) bad(d.id + " total = " + total);
  if (!D.devoirDocs[d.id]) bad(d.id + " sans document");
  d.chapitres.forEach(c => { if (!chapIds.has(c)) bad(d.id + " chapitre " + c); });
  console.log(d.id + " : " + total + " points");
}
console.log(D.lessons.length + " leçons, " + D.questions.length + " questions, " + D.devoirs.length + " devoirs, " + nSol + " solutions vérifiées");
console.log(errors ? errors + " erreur(s)" : "TOUT EST OK");
process.exit(errors ? 1 : 0);
