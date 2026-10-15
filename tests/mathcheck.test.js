const M = require(require("path").join(__dirname, "..", "js", "mathcheck.js"));
let bad = 0;
const T = (ok, st, ex, o) => { const r = M.equiv(st, ex, o); if (r !== ok) { bad++; console.log("✘", JSON.stringify(st), "vs", ex, "attendu", ok, "obtenu", r); } };
// valeurs
T(true, "8/15", "8/15"); T(true, "16/30", "8/15"); T(true, "0,5333333333", "8/15", {tol:1e-6}); T(false, "7/15", "8/15");
T(true, "6√3", "6√3"); T(true, "6*sqrt(3)", "6√3"); T(true, "√108", "6√3"); T(false, "6√2", "6√3");
T(true, "3+√5", "3+√5"); T(true, "√5+3", "3+√5"); T(false, "3-√5", "3+√5");
T(true, "2π/3", "2π/3"); T(true, "2pi/3", "2π/3"); T(true, "(2/3)π", "2π/3"); T(false, "π/3", "2π/3");
T(true, "-π/3", "−π/3"); T(true, "−1/2", "-1/2"); T(true, "x = 3", "3"); T(true, "S=3", "3");
T(true, "√3/2", "√3/2"); T(true, "(√3)/2", "√3/2"); T(false, "√(3/2)", "√3/2");
T(true, "4√3/3", "4√3/3"); T(true, "1.5", "3/2"); T(true, "1,5", "3/2");
T(true, "13/3", "13/3"); T(true, "9/4", "9/4"); T(true, "−9", "−9"); T(false, "9", "−9");
// puissances
T(true, "9x²−12x+4", "9x²−12x+4"); T(true, "(3x-2)^2", "9x²−12x+4"); T(true, "(3x−2)²", "9x²−12x+4"); T(false, "9x²+4", "9x²−12x+4");
T(true, "(5-2x)(5+2x)", "(5−2x)(5+2x)"); T(true, "25-4x^2", "(5−2x)(5+2x)");
T(true, "2(x-2)^2-2", "2(x−2)²−2", {must:/\(x-2\)/}); T(false, "2x²-8x+6", "2(x−2)²−2", {must:/\(x-2\)/});
// ensembles
T(true, "{3;5}", "{3;5}"); T(true, "{5 ; 3}", "{3;5}"); T(true, "S={3;5}", "{3 ; 5}"); T(false, "{3}", "{3;5}"); T(true, "3 ou 5", "{3;5}");
T(true, "{-1/3;2}", "{−1/3 ; 2}"); T(true, "{2;-1/3}", "{−1/3 ; 2}"); T(true, "{−2;−1;1;2}", "{−2 ; −1 ; 1 ; 2}");
T(true, "{-3π/4;-π/4}", "{−3π/4 ; −π/4}"); T(true, "{(2;3)}", "{(2;3)}"); T(true, "(2;3)", "{(2;3)}"); T(false, "(3;2)", "{(2;3)}");
T(true, "∅", "∅"); T(true, "aucune", "∅"); T(true, "S=∅", "∅"); T(true, "{}", "∅"); T(false, "{1}", "∅");
T(true, "R\\{2}", "ℝ\\{2}"); T(true, "ℝ\\{−3 ; 3}", "ℝ\\{−3;3}"); T(true, "R\\{3;-3}", "ℝ\\{−3;3}"); T(false, "R\\{3}", "ℝ\\{−3;3}");
// intervalles
T(true, "]3;+∞[", "]3 ; +∞["); T(true, "]3;+inf[", "]3 ; +∞["); T(false, "[3;+∞[", "]3 ; +∞["); T(true, "]-∞;3]", "]−∞ ; 3]");
T(true, "[−1/3;2[∪]2;+∞[", "[−1/3 ; 2[ ∪ ]2 ; +∞["); T(true, "]2;+∞[U[-1/3;2[", "[−1/3 ; 2[ ∪ ]2 ; +∞["); T(false, "[−1/3;+∞[", "[−1/3 ; 2[ ∪ ]2 ; +∞[");
T(true, "]−∞;−2[∪]3;+∞[", "]−∞ ; −2[ ∪ ]3 ; +∞["); T(true, "[-2;-1[", "[−2 ; −1["); T(false, "[-2;-1]", "[−2 ; −1[");
T(true, "]−∞;−2]∪[3;4[∪]4;+∞[", "]−∞ ; −2] ∪ [3 ; 4[ ∪ ]4 ; +∞[");
// couples
T(true, "(0;3)", "(0 ; 3)"); T(true, "K(0;3)", "(0;3)"); T(false, "(3;0)", "(0;3)"); T(true, "(5/2;3/2)", "(5/2 ; 3/2)"); T(true, "(2,5;1,5)", "(5/2;3/2)", {});
T(true, "(4;-4)", "(2;-2)", {parallel:true}); T(true, "(-1;1)", "(2;-2)", {parallel:true}); T(false, "(2;2)", "(2;-2)", {parallel:true});
T(true, "(3;-3)", "", {on:"x+y=0"}); T(false, "(1;1)", "", {on:"x+y=0"});
// équations
T(true, "x+y-1=0", "x+y−1=0"); T(true, "2x+2y-2=0", "x+y−1=0"); T(true, "-x-y+1=0", "x+y−1=0"); T(true, "y=1-x", "x+y−1=0"); T(false, "x+y+1=0", "x+y−1=0");
T(true, "x-y+3=0", "x−y+3=0"); T(true, "4x+3y=5", "4x+3y−5=0"); T(true, "x=2", "x=2"); T(true, "x-2=0", "x=2"); T(false, "y=2", "x=2");
T(true, "y=-4/3x+5/3", "4x+3y−5=0"); T(true, "2x+3y-19=0", "2x+3y−19=0");
// pct / unit
T(true, "16,7 %", "16.7", {pct:true, tol:0.1}); T(true, "30%", "30", {pct:true}); T(true, "18 cm", "18", {unit:"cm"}); T(true, "25,1", "25.13", {tol:0.1}); T(false, "26", "25.13", {tol:0.1});
T(true, "3800/11", "3800/11"); T(true, "345,45", "3800/11", {tol:0.01});
// variable h
T(true, "3-7/h", "3−7/h"); T(true, "3 - 7/h", "3−7/h"); T(false, "3+7/h", "3−7/h");
T(true, "4−2m", "4−2m"); T(true, "-2m+4", "4−2m");
// divers
T(true, "2 520", "2520"); T(true, "1 200", "1200"); T(false, "", "3"); T(false, "abc(", "3"); T(true, "3^-1+3^0+3^1", "13/3");
console.log(bad ? bad + " échec(s)" : "MathCheck : tous les tests passent");
process.exit(bad ? 1 : 0);
