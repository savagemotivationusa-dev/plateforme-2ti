#!/usr/bin/env python3
"""Convertit le document Word de référence (Mathématiques 2TI) en données JS pour la plateforme.

Usage : python3 tools/build_maths.py chemin/vers/Mathematiques-2TI-Document-de-reference-corrige.docx
Sortie : maths/data/*.js  et  maths/assets/fig-*.png
Aucune information n'est inventée : le texte provient du fichier Word ; seul le balisage HTML est ajouté.
"""
import sys, os, re, json, html, hashlib, shutil, zipfile
import docx
from docx.oxml.ns import qn
from docx.text.paragraph import Paragraph

SRC = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(ROOT, "maths", "data")
ASSETS = os.path.join(ROOT, "maths", "assets")
os.makedirs(OUT, exist_ok=True); os.makedirs(ASSETS, exist_ok=True)

doc = docx.Document(SRC)
body = doc.element.body
rels = doc.part.rels

E = html.escape
FILL = {"EAF2F8": "def", "E9F7EF": "prop", "FDEDEC": "err", "FEF5E7": "method",
        "FCF8E3": "dialect", "E8F6F8": "info", "F2F4F4": "note"}

def fill_of_p(p):
    ppr = p.find(qn("w:pPr"))
    if ppr is None: return None
    sh = ppr.find(qn("w:shd"))
    return sh.get(qn("w:fill")) if sh is not None else None

def ind_of_p(p):
    ppr = p.find(qn("w:pPr"))
    if ppr is None: return 0
    i = ppr.find(qn("w:ind"))
    return int(i.get(qn("w:left")) or 0) if i is not None else 0

def jc_of_p(p):
    ppr = p.find(qn("w:pPr"))
    if ppr is None: return None
    j = ppr.find(qn("w:jc"))
    return j.get(qn("w:val")) if j is not None else None

def style_of_p(p):
    ppr = p.find(qn("w:pPr"))
    if ppr is None: return "Normal"
    s = ppr.find(qn("w:pStyle"))
    return s.get(qn("w:val")) if s is not None else "Normal"

def has_rtl(p):
    return any(True for _ in p.iter(qn("w:rtl"))) or (p.find(qn("w:pPr")) is not None and p.find(qn("w:pPr")).find(qn("w:bidi")) is not None)

ALT = {
    "fig-1.png": "Signe de ax² + bx + c lorsque a > 0 : trois paraboles. Δ > 0 : deux racines, signe + à l'extérieur des racines et signe − entre elles ; Δ = 0 : racine double ; Δ < 0 : pas de racine, la parabole reste au-dessus de l'axe des abscisses.",
    "fig-2.png": "Parabole (P) : f(x) = 2x² − 8x + 6, avec son axe de symétrie x = 2, son sommet S(2 ; −2) et ses points d'intersection E(1 ; 0) et F(3 ; 0) avec l'axe des abscisses.",
    "fig-3.png": "Hyperbole de la fonction f(x) = (2x + 1)/(x − 1), avec les asymptotes x = 1 et y = 2 et son centre de symétrie I(1 ; 2).",
    "fig-4.png": "Cercle trigonométrique de rayon 1 avec les angles π/6, π/4, π/3, π/2, 2π/3, π et 3π/2 ; pour π/3, le cosinus est lu sur l'axe horizontal et le sinus sur l'axe vertical.",
    "fig-5.png": "Repère orthonormé avec les points A(−1 ; 3), B(2 ; −1), C(5 ; −5), la droite (AB) d'équation 4x + 3y − 5 = 0 et la droite (D) d'équation x − 2y + 7 = 0, qui se coupent au point K = A.",
}
images = {}      # rId -> filename
fig_counter = [0]
def image_of_p(p):
    out = []
    for blip in p.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}blip"):
        rid = blip.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
        if rid: out.append(rid)
    return out

def runs_html(p):
    para = Paragraph(p, None)
    parts = []
    for r in para.runs:
        t = r.text
        if not t: continue
        t = E(t, quote=False).replace("\u202a", "").replace("\u202c", "")
        if r.bold and r.italic: t = "<strong><em>%s</em></strong>" % t
        elif r.bold: t = "<strong>%s</strong>" % t
        elif r.italic: t = "<em>%s</em>" % t
        parts.append(t)
    s = "".join(parts)
    s = re.sub(r"</strong>(\s*)<strong>", r"\1", s)
    s = re.sub(r"</em>(\s*)<em>", r"\1", s)
    return s.strip()

def plain(p):
    return "".join(t.text or "" for t in p.iter(qn("w:t"))).replace("\u202a", "").replace("\u202c", "").strip()

def all_bold(p):
    runs = [r for r in Paragraph(p, None).runs if r.text.strip()]
    return bool(runs) and all(r.bold for r in runs)

def all_italic(p):
    runs = [r for r in Paragraph(p, None).runs if r.text.strip()]
    return bool(runs) and all(r.italic for r in runs)

STEP_RE = re.compile(r"^(\d{1,2})(?: À (\d{1,2}))?\.\s+(.+)$")

def p_html(p, ctx="body"):
    """Paragraphe -> HTML (ou '' si vide)."""
    imgs = image_of_p(p)
    if imgs:
        out = ""
        for rid in imgs:
            part = rels[rid].target_part
            fn = images.get(rid)
            if not fn:
                fig_counter[0] += 1
                fn = "fig-%d.png" % fig_counter[0]
                with open(os.path.join(ASSETS, fn), "wb") as f: f.write(part.blob)
                images[rid] = fn
            alt = ALT.get(fn, "Figure du cours")
            out += '<img class="fig" src="assets/%s" alt="%s" loading="lazy">' % (fn, E(alt))
        t = runs_html(p)
        return '<figure class="figure">%s%s</figure>' % (out, ("<figcaption>%s</figcaption>" % t) if t else "")
    t = runs_html(p)
    if not t: return ""
    jc = jc_of_p(p)
    cls = []
    if ind_of_p(p) >= 300 and ctx == "body": cls.append("calc")
    if jc == "center": cls.append("ctr")
    if has_rtl(p): cls.append("rtl")
    attrs = (' class="%s"' % " ".join(cls)) if cls else ""
    if has_rtl(p): attrs += ' dir="rtl" lang="ar"'
    return "<p%s>%s</p>" % (attrs, t)

def cell_html(tc, boxkind=None):
    out = []
    for p in tc.findall(qn("w:p")):
        h = p_html(p, ctx="cell")
        if h: out.append(h)
    return "".join(out)

def table_html(tbl):
    rows = tbl.findall(qn("w:tr"))
    out = ['<div class="table-wrap"><table class="tbl doc-tbl">']
    for ri, tr in enumerate(rows):
        cells = tr.findall(qn("w:tc"))
        hdr = False
        if cells:
            tcpr = cells[0].find(qn("w:tcPr"))
            sh = tcpr.find(qn("w:shd")) if tcpr is not None else None
            hdr = sh is not None and sh.get(qn("w:fill")) == "1F4E79"
        tag = "th" if hdr else "td"
        out.append("<tr>")
        for tc in cells:
            ps = tc.findall(qn("w:p"))
            txt = cell_html(tc)
            align = ""
            if ps and jc_of_p(ps[0]) == "center": align = ' class="c"'
            # contenu de cellule : retirer les <p> pour un rendu compact
            inner = re.sub(r"</p><p[^>]*>", "<br>", txt)
            inner = re.sub(r"^<p[^>]*>|</p>$", "", inner)
            out.append("<%s%s>%s</%s>" % (tag, align, inner, tag))
        out.append("</tr>")
    out.append("</table></div>")
    html_ = "".join(out)
    # première ligne d'en-tête -> thead
    return html_

def box_html(tbl):
    tc = tbl.find(qn("w:tr")).find(qn("w:tc"))
    tcpr = tc.find(qn("w:tcPr"))
    sh = tcpr.find(qn("w:shd")) if tcpr is not None else None
    fill = sh.get(qn("w:fill")) if sh is not None else None
    kind = FILL.get(fill, "note")
    paras = tc.findall(qn("w:p"))
    title_txt = plain(paras[0]) if paras else ""
    if kind == "prop" and title_txt.startswith("À retenir"): kind = "sum"
    if kind == "def" and not re.match(r"^(Définition|Définitions|Théorème|Vocabulaire)", title_txt): kind = "def"
    inner = cell_html(tc)
    # le premier paragraphe (titre en gras) devient un titre de boîte
    m = re.match(r"^<p[^>]*>(<strong>.*?</strong>)</p>(.*)$", inner, re.S)
    if m and all_bold(paras[0]):
        head = re.sub(r"</?strong>", "", m.group(1))
        inner = '<div class="box-title">%s</div>%s' % (head, m.group(2))
    return kind, '<aside class="box b-%s">%s</aside>' % (kind, inner), title_txt

# ---------------------------------------------------------------- parcours
items = []   # (type, element)
for el in body.iterchildren():
    if el.tag == qn("w:p"): items.append(("p", el))
    elif el.tag == qn("w:tbl"): items.append(("t", el))

def is_box(el):
    rows = el.findall(qn("w:tr"))
    return len(rows) == 1 and len(rows[0].findall(qn("w:tc"))) == 1

class Builder:
    """Transforme une séquence d'éléments en HTML structuré (exemples, exercices, encadrés)."""
    def __init__(self):
        self.out = []
        self.stack = None   # conteneur ouvert : ("ex"|"exo"|"corr", [html])
        self.mode = None
    def flush(self):
        if self.mode is None: return
        if self.mode == "ex":
            self.out.append('<div class="ex-block">%s</div>' % "".join(self.buf))
        elif self.mode == "exo":
            stmt = "".join(self.buf)
            corr = "".join(self.corr)
            h = '<div class="exo"><div class="exo-body">%s</div>' % stmt
            if corr: h += '<details class="corr"><summary>Voir la correction détaillée</summary><div class="corr-body">%s</div></details>' % corr
            h += "</div>"
            self.out.append(h)
        self.mode = None; self.buf = []; self.corr = []
    def add(self, kind, element):
        if kind == "p":
            f = fill_of_p(element)
            t = plain(element)
            if not t and not image_of_p(element): return
            if f == "F5EEF8":
                self.flush(); self.mode = "ex"; self.buf = ['<h4 class="ex-title">%s</h4>' % runs_html(element)]; self.corr = []; return
            if f == "EEF2F6":
                self.flush(); self.mode = "exo"; self.buf = ['<h4 class="exo-title">%s</h4>' % runs_html(element)]; self.corr = []; self.in_corr = False; return
            if all_bold(element) and re.match(r"^(Correction détaillée|CORRECTION DÉTAILLÉE)", t) and self.mode == "exo":
                self.in_corr = True; return
            if all_bold(element) and re.match(r"^Résolution détaillée", t) and self.mode == "ex":
                self.buf.append('<h5 class="resol">Résolution détaillée</h5>'); return
            h = p_html(element)
            if self.mode == "exo" and getattr(self, "in_corr", False): self.corr.append(h)
            elif self.mode in ("ex", "exo"): self.buf.append(h)
            else: self.out.append(h)
        else:
            if is_box(element):
                self.flush()
                kind_, h, _ = box_html(element)
                self.out.append(h)
            else:
                h = table_html(element)
                if self.mode == "exo" and getattr(self, "in_corr", False): self.corr.append(h)
                elif self.mode in ("ex", "exo"): self.buf.append(h)
                else: self.out.append(h)
    def result(self):
        self.flush(); return "".join(self.out)

def words(h): return len(re.sub(r"<[^>]+>", " ", h).split())
def strip_tags(h): return re.sub(r"\s+", " ", html.unescape(re.sub(r"<(br|/p|/div|/li|/tr)[^>]*>", " ", re.sub(r"<[^>]+>", "", re.sub(r"<(br|/p|/div|/tr)[^>]*>", " ", h))))).strip()

# Sections
chapters = []; cur_ch = None; cur_les = None; cur_step = None
annexes = {}; devoirs = []; presentation = []
state = "front"   # front | pres | chap | devoirs | annex
cur_dev = None; cur_annex = None
step_builder = None

def start_lesson(num, title):
    global cur_les, step_builder
    cur_les = {"id": "m" + num, "chapter": cur_ch["id"], "num": num, "title": title, "provenance": "", "steps": []}
    cur_ch["lessons"].append(cur_les); step_builder = None

def close_step():
    global step_builder, cur_step
    if cur_step is not None and step_builder is not None:
        cur_step["html"] = step_builder.result()
    cur_step = None; step_builder = None

def close_les():
    global cur_les
    close_step(); cur_les = None

def finish_chapter():
    global cur_ch
    if cur_ch is not None and cur_ch["_mode"] == "synth":
        cur_ch["synth"] = cur_ch["_b"].result(); cur_ch["_mode"] = "done"

def finish_dev():
    global cur_dev
    if cur_dev is not None:
        if cur_dev["_part"] == "corr": cur_dev["corrige"] = cur_dev["_b"].result()
        cur_dev["_part"] = "done"
    cur_dev = None

devoirs_intro = []
for kind, el in items:
    if kind == "p":
        st = style_of_p(el); txt = plain(el)
        if st == "Heading1":
            close_les(); finish_chapter(); finish_dev()
            if txt.startswith("Sommaire"): state = "front"; continue
            if txt.startswith("Présentation"): state = "pres"; continue
            m = re.match(r"^Chapitre (\d+) : (.+)$", txt)
            if m:
                state = "chap"
                cur_ch = {"id": "m" + m.group(1), "num": int(m.group(1)), "title": m.group(2), "intro": "", "lessons": [], "synth": "", "fiche": "", "_b": Builder(), "_mode": "intro"}
                chapters.append(cur_ch); continue
            if txt.startswith("Devoirs types"): state = "devoirs"; cur_dev = None; cur_annex = {"intro": []}; continue
            m = re.match(r"^Annexe ([A-G]) : (.+)$", txt)
            if m:
                state = "annex"; cur_annex = {"id": m.group(1), "title": m.group(2), "b": Builder(), "rows": []}
                annexes[m.group(1)] = cur_annex; continue
            continue
        if st == "Heading2":
            if state == "chap":
                close_les()
                if cur_ch["_mode"] == "intro": cur_ch["intro"] = cur_ch["_b"].result(); cur_ch["_b"] = Builder()
                m = re.match(r"^(\d+\.\d+)\s+(.+)$", txt)
                if m:
                    cur_ch["_mode"] = "lesson"; start_lesson(m.group(1), m.group(2)); continue
                if txt.startswith("Exercices de synthèse"):
                    cur_ch["_mode"] = "synth"; cur_ch["_b"] = Builder(); continue
            elif state == "devoirs":
                close_les(); finish_dev()
                m = re.match(r"^(Devoir de (contrôle|synthèse)) N°(\d) \(durée : (.+?) — barème sur 20\)$", txt)
                if m:
                    cur_dev = {"id": "D%d" % (len(devoirs) + 1), "titre": "%s N°%s" % (m.group(1), m.group(3)), "type": m.group(2), "duree": m.group(4),
                               "source": "", "enonce": "", "corrige": "", "_b": Builder(), "_part": "head"}
                    devoirs.append(cur_dev)
                continue
            continue
        # paragraphe normal
        if state == "pres": presentation.append(("p", el)); continue
        if state == "chap":
            if cur_ch["_mode"] == "lesson" and cur_les is not None:
                # provenance
                if not cur_les["steps"] and not cur_les["provenance"] and all_italic(el) and txt.startswith("Provenance"):
                    cur_les["provenance"] = re.sub(r"^Provenance\s*:\s*", "", txt); continue
                if all_bold(el):
                    m = STEP_RE.match(txt)
                    if m and re.sub(r"[^A-Za-zÀ-ÿ]", "", m.group(3)).isupper():
                        close_step()
                        cur_step = {"n": m.group(1) + (("–" + m.group(2)) if m.group(2) else ""), "title": m.group(3).strip().capitalize(), "html": ""}
                        cur_les["steps"].append(cur_step); step_builder = Builder(); continue
                if step_builder is None:
                    cur_step = {"n": "", "title": "Introduction", "html": ""}; cur_les["steps"].append(cur_step); step_builder = Builder()
                step_builder.add("p", el)
            else:
                cur_ch["_b"].add("p", el)
            continue
        if state == "devoirs":
            if cur_dev is None:
                devoirs_intro.append(("p", el)); continue
            if all_bold(el) and txt.startswith("CORRECTION DÉTAILLÉE"):
                cur_dev["enonce_done"] = True
                cur_dev["_part"] = "corr"; cur_dev["_b"] = Builder(); continue
            if all_italic(el) and not cur_dev["source"]:
                cur_dev["source"] = txt; continue
            cur_dev["_b"].add("p", el); continue
        if state == "annex":
            cur_annex["b"].add("p", el); continue
    else:  # table
        if state == "pres": presentation.append(("t", el)); continue
        if state == "chap":
            if cur_ch["_mode"] == "lesson" and cur_les is not None:
                if step_builder is None:
                    cur_step = {"n": "", "title": "Introduction", "html": ""}; cur_les["steps"].append(cur_step); step_builder = Builder()
                step_builder.add("t", el)
            else:
                if cur_ch["_mode"] in ("synth",) and is_box(el):
                    k, h, t = box_html(el)
                    if t.startswith("Fiche de révision"): cur_ch["fiche"] = h; continue
                cur_ch["_b"].add("t", el)
            continue
        if state == "devoirs":
            if cur_dev is None:
                devoirs_intro.append(("t", el)); continue
            if is_box(el) and cur_dev["_part"] == "head":
                k, h, t = box_html(el)
                if t.startswith("Énoncé"):
                    cur_dev["enonce"] = h; continue
                cur_dev["_b"].add("t", el); continue
            if is_box(el) and not cur_dev.get("enonce") and cur_dev["_part"] == "head":
                pass
            cur_dev["_b"].add("t", el); continue
        if state == "annex":
            if not is_box(el):
                rows = []
                for tr in el.findall(qn("w:tr")):
                    rows.append([plain(tc) if False else " ".join(plain(p) for p in tc.findall(qn("w:p"))).strip() for tc in tr.findall(qn("w:tc"))])
                cur_annex["rows"].extend(rows)
            cur_annex["b"].add("t", el); continue


close_les(); finish_chapter(); finish_dev()

# ------------------------------------------------------------------ métadonnées
SHORT = {0: "Rappels", 1: "Trinôme du 2nd degré", 2: "Fonctions", 3: "Arithmétique, polynômes, suites", 4: "Trigonométrie", 5: "Vecteurs et droites", 6: "Statistique et espace"}
BADGE = {0: "Rappels", 1: "Guide", 2: "Guide", 3: "Guide", 4: "Guide", 5: "Guide", 6: "Guide"}
NIVEAU = {"m0": 1, "m6.1": 1, "m6.2": 1, "m3.1": 2, "m3.2": 2, "m5.1": 1}
# descriptions : tableau « Chapitre / Objectifs principaux » de la présentation
desc = {}
for k, el in presentation:
    if k == "t" and not is_box(el):
        for tr in el.findall(qn("w:tr"))[1:]:
            cells = [plain(c) for c in tr.findall(qn("w:tc"))]
            m = re.match(r"^Chapitre (\d+)", cells[0])
            if m: desc[int(m.group(1))] = cells[1]

pres_b = Builder()
for k, el in presentation: pres_b.add(k, el)
presentation_html = pres_b.result()
di_b = Builder()
for k, el in devoirs_intro: di_b.add(k, el)
devoirs_intro_html = di_b.result()

def js(o): return json.dumps(o, ensure_ascii=False, separators=(",", ":"))

# ------------------------------------------------------------------ écriture
header = "/* GÉNÉRÉ par tools/build_maths.py à partir du document Word de référence — ne pas modifier à la main. */\n"
all_lessons = []
for ch in chapters:
    for l in ch["lessons"]:
        w = sum(words(s_["html"]) for s_ in l["steps"])
        l["duree"] = "%d min" % max(15, int(round(w / 45 / 5.0) * 5))
        l["niveau"] = NIVEAU.get(l["id"], NIVEAU.get(ch["id"], 2))
        last = l["steps"][-1]["html"] if l["steps"] else ""
        m = re.search(r'<aside class="box b-sum">(.*?)</aside>', last, re.S)
        l["express"] = strip_tags(re.sub(r'<div class="box-title">.*?</div>', "", m.group(1))) if m else ""
        l["text"] = strip_tags(" ".join(s_["html"] for s_ in l["steps"]))
        all_lessons.append(l)

with open(os.path.join(OUT, "chapters.js"), "w", encoding="utf8") as f:
    f.write(header)
    meta = {"site": "Plateforme 2TI — Mathématiques", "niveau": "2ème année secondaire", "section": "Section Technologie de l'informatique (2TI)",
            "matiere": "Mathématiques", "pays": "Tunisie"}
    chs = [{"id": c["id"], "num": c["num"], "badge": BADGE[c["num"]], "title": c["title"], "short": SHORT[c["num"]], "desc": desc.get(c["num"], "")} for c in chapters]
    f.write("window.DATA = { meta: %s, chapters: %s, lessons: [], questions: [], devoirs: [], content: {} };\n" % (js(meta), js(chs)))

for ch in chapters:
    with open(os.path.join(OUT, "course-%s.js" % ch["id"]), "w", encoding="utf8") as f:
        f.write(header + "(function (D) {\n")
        f.write("  D.content[%s] = %s;\n" % (js(ch["id"]), js({"intro": ch["intro"], "synth": ch["synth"], "fiche": ch["fiche"]})))
        for l in ch["lessons"]:
            f.write("  D.lessons.push(%s);\n" % js(l))
        f.write("})(window.DATA);\n")

def ann(i): return annexes[i]
with open(os.path.join(OUT, "annexes.js"), "w", encoding="utf8") as f:
    f.write(header + "(function (D) {\n")
    f.write("  D.presentation = %s;\n" % js(presentation_html))
    f.write("  D.devoirsIntro = %s;\n" % js(devoirs_intro_html))
    f.write("  D.annexes = %s;\n" % js({k: {"title": v["title"], "html": v["b"].result(), "rows": v["rows"]} for k, v in annexes.items()}))
    f.write("  D.devoirDocs = %s;\n" % js({d["id"]: {"titre": d["titre"], "type": d["type"], "duree": d["duree"], "source": d["source"], "enonce": d["enonce"], "corrige": d["corrige"]} for d in devoirs}))
    f.write("})(window.DATA);\n")

# rapport
print("chapitres :", len(chapters))
for ch in chapters:
    print(" ", ch["id"], ch["title"][:60], "| leçons:", len(ch["lessons"]), "| synth:", len(ch["synth"]), "| fiche:", len(ch["fiche"]), "| intro:", len(ch["intro"]))
    for l in ch["lessons"]:
        print("     ", l["id"], l["title"][:55], "| étapes:", [s_["n"] for s_ in l["steps"]], "|", l["duree"], "| mots:", len(l["text"].split()))
print("devoirs :", [(d["id"], d["titre"], len(d["enonce"]), len(d["corrige"])) for d in devoirs])
print("annexes :", {k: (len(v["rows"]), len(v["b"].result())) for k, v in annexes.items()})
print("images :", fig_counter[0])
