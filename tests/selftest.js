/* Auto-test des données : node tests/selftest.js
   - chaque solution doit obtenir la note maximale
   - une réponse vide doit obtenir 0
   - chaque devoir doit totaliser 20 points
   - les références (leçons, chapitres) doivent exister */
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ctx = { window: {}, console };
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
const files = ["data/chapters.js","data/courses-1.js","data/courses-2.js","data/courses-3.js","data/questions-1.js","data/questions-2.js","data/questions-devoirs.js","data/devoirs.js"];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
for (const f of ["data/summaries.js","data/refs.js"]) { const p = path.join(root, f); if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f }); }
vm.runInContext(fs.readFileSync(path.join(root, "js/grader.js"), "utf8"), ctx, { filename: "grader.js" });
const D = ctx.DATA, G = ctx.Grader;
let errors = 0; const bad = (m) => { errors++; console.log("✘ " + m); };
const lessonIds = new Set(D.lessons.map(l => l.id)), chapIds = new Set(D.chapters.map(c => c.id));
const qids = new Set();
for (const q of D.questions) {
  if (qids.has(q.id)) bad("id dupliqué " + q.id); qids.add(q.id);
  if (!lessonIds.has(q.lesson)) bad(q.id + " leçon inconnue " + q.lesson);
  if (!chapIds.has(q.chapter)) bad(q.id + " chapitre inconnu");
  const sol = G.solutionFor(q);
  const r = G.grade(q, sol);
  if (Math.abs(r.earned - q.points) > 1e-9) bad(q.id + " solution = " + r.earned + "/" + q.points + " " + JSON.stringify(r.cause));
  const e = G.grade(q, q.type === "fields" ? q.fields.map(() => "") : q.type === "qcm" ? (Array.isArray(q.correctAnswer) ? [] : undefined) : "");
  if (e.earned !== 0) bad(q.id + " vide ≠ 0");
}
for (const d of D.devoirs) {
  let total = 0;
  for (const ex of d.exercices) for (const id of ex.questions) { const q = D.questions.find(x => x.id === id); if (!q) bad(d.id + " question inconnue " + id); else total += q.points; }
  if (Math.abs(total - 20) > 1e-9) bad(d.id + " total = " + total);
  console.log(d.id + " : " + total + " points");
}
for (const l of D.lessons) { if (!chapIds.has(l.chapter)) bad(l.id + " chapitre"); if (!l.express_ar) bad(l.id + " express_ar manquant"); }
const per = {}; D.questions.forEach(q => per[q.lesson] = (per[q.lesson] || 0) + 1);
D.lessons.forEach(l => { if (!per[l.id]) bad("aucune question pour " + l.id); });
console.log(D.lessons.length + " leçons, " + D.questions.length + " questions, " + D.devoirs.length + " devoirs");
console.log(errors ? errors + " erreur(s)" : "TOUT EST OK");
process.exit(errors ? 1 : 0);
