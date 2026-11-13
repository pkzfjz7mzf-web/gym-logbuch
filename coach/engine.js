/* Coach-Engine: reine Funktionen, kein DOM, kein Speicher. Gleiches Profil ergibt den gleichen Plan.
   Konzept: docs/coach/konzept.md (Abschnitt 4 Planlogik, 5 Datenmodell). Tests: node tools/test_engine.js
   buildPlan(profile, EX, CATALOG) -> Plan in der Form von settings.plan
   standardPlan(PLANS, WARMUP)     -> heutiges A/B als Plan */
(function(root){
'use strict';

/* ---------- Vorlagen: Muster pro Tag. m = Grundübung, p = Priorität (1 bleibt, 3 fällt zuerst weg) ---------- */
const S = (pattern, m, p) => ({pattern, main:!!m, prio:p});
const DAYS = {
  ONE:  {name:'Ganzkörper', type:'fb', slots:[S('squat',1,1),S('hinge',1,1),S('hpush',0,1),S('hpull',0,1),S('vpull',0,2),S('antiext',0,2)]},
  FB_A: {name:'Ganzkörper', type:'fb', slots:[S('squat',1,1),S('hinge',1,1),S('hpull',0,1),S('hpush',0,1),S('single',0,2),S('rear',0,2),S('antiext',0,2)]},
  FB_B: {name:'Ganzkörper', type:'fb', slots:[S('glute',1,1),S('vpull',1,1),S('vpush',0,1),S('kneeflex',0,2),S('hpull',0,1),S('lateral',0,2),S('antirot',0,2)]},
  FB_C: {name:'Ganzkörper', type:'fb', slots:[S('single',1,1),S('hpush',1,1),S('vpull',0,1),S('hinge',0,1),S('deltiso',0,3),S('coreflex',0,2)]},
  U1:   {name:'Oberkörper', type:'upper', slots:[S('hpush',1,1),S('hpull',1,1),S('vpush',0,1),S('vpull',0,1),S('rear',0,2),S('triceps',0,3),S('biceps',0,3)]},
  U2:   {name:'Oberkörper', type:'upper', slots:[S('vpull',1,1),S('vpush',1,1),S('hpull',0,1),S('hpush',0,1),S('deltiso',0,2),S('rear',0,2),S('biceps',0,3),S('triceps',0,3)]},
  L1:   {name:'Unterkörper', type:'lower', slots:[S('squat',1,1),S('hinge',1,1),S('single',0,1),S('kneeflex',0,2),S('antiext',0,2),S('lateral',0,3)]},
  L2:   {name:'Unterkörper', type:'lower', slots:[S('glute',1,1),S('squat',0,1),S('kneeflex',0,1),S('kneeext',0,2),S('lateral',0,2),S('antirot',0,2)]},
  PUSH1:{name:'Drücken', type:'push', slots:[S('hpush',1,1),S('vpush',0,1),S('chestiso',0,2),S('deltiso',0,2),S('triceps',0,2)]},
  PUSH2:{name:'Drücken', type:'push', slots:[S('vpush',1,1),S('hpush',0,1),S('deltiso',0,2),S('chestiso',0,3),S('triceps',0,2)]},
  PULL1:{name:'Ziehen', type:'pull', slots:[S('vpull',1,1),S('hpull',0,1),S('rear',0,2),S('latiso',0,3),S('biceps',0,2)]},
  PULL2:{name:'Ziehen', type:'pull', slots:[S('hpull',1,1),S('vpull',0,1),S('rear',0,2),S('biceps',0,2),S('antirot',0,3)]}
};
const SPLITS = {1:['ONE'], 2:['FB_A','FB_B'], 3:['FB_A','FB_B','FB_C'], 4:['U1','L1','U2','L2'], 5:['U1','L1','PUSH1','PULL1','L2'], 6:['PUSH1','PULL1','L1','PUSH2','PULL2','L2']};
const SPLIT_WHY = {1:'1 Tag pro Woche: eine Ganzkörper-Einheit mit allen Grundmustern.', 2:'2 Tage pro Woche: zwei Ganzkörper-Einheiten, so wird jeder Muskel 2× pro Woche trainiert.',
  3:'3 Tage pro Woche: Ganzkörper mit wechselnden Schwerpunkten.', 4:'4 Tage pro Woche: je 2× Oberkörper und Unterkörper.',
  5:'5 Tage pro Woche: Oberkörper, Unterkörper, dann Drücken, Ziehen und Beine.', 6:'6 Tage pro Woche: 2× Drücken, Ziehen, Beine.'};
/* Ergänzungsmuster, mit denen ein Muskel unter Ziel aufgefüllt wird. */
const FILL = {chest:['chestiso','hpush'], shoulders:['deltiso','vpush'], lats:['latiso','vpull'], upback:['rear','hpull'], quads:['kneeext','single'], hams:['kneeflex'], glutes:['glute','abduct'], arms:['biceps','triceps']};
const LEG = ['squat','hinge','single','glute','kneeflex','kneeext','lateral','abduct'];
const UPPER_OK = {rear:['fb','upper','pull'], deltiso:['fb','upper','push'], chestiso:['fb','upper','push'], latiso:['fb','upper','pull'], biceps:['fb','upper','pull'], triceps:['fb','upper','push']};
const CORE = ['antiext','antirot','coreflex'];
const ISO = ['rear','deltiso','chestiso','latiso','biceps','triceps','kneeext','abduct'];
/* Muster -> Tauschgruppe der App (GROUPS in index.html). Fehlende Gruppen ergänzt P5. */
const GROUP = {squat:'squat', hinge:'hinge', hpull:'hrow', hpush:'incline', single:'single', rear:'rear', antiext:'antiext', glute:'glute', vpull:'vpull', vpush:'press', kneeflex:'eccHam', lateral:'lateral', antirot:'antirot', biceps:'curl', triceps:'tri'};
const LABEL = {squat:'Kniebeuge', hinge:'Hüftbeuge', single:'Einbeinig', hpush:'Drücken horizontal', vpush:'Drücken nach oben', hpull:'Rudern', vpull:'Ziehen von oben', glute:'Gesäss', kneeflex:'Beinbeuger', kneeext:'Beinstrecker', lateral:'Seitlich, Adduktoren', abduct:'Abduktoren', rear:'Hintere Schulter', latiso:'Latissimus', chestiso:'Brust isoliert', deltiso:'Schulter seitlich', biceps:'Bizeps', triceps:'Trizeps', antiext:'Rumpf gegen Hohlkreuz', antirot:'Rumpf gegen Drehung', coreflex:'Bauch'};

/* Grundwert pro Übung: wie gut sie sich als Standardwahl eignet (3 = erste Wahl). Nicht genannte = 1. */
const BASE = {goblet:3, frontsq:2, rdl:3, dbrdl:2, csrow:3, dbrow:2, cablerow:2, incline:3, dbbench:2, bbbench:2, bss:3, revlunge:2, splitsq:2,
  facepull:3, revfly:2, deadbug:3, birddog:2, hipthrust:3, bbbridge:2, pullup:3, chinup:2, latpd:2, pullupA:2, landmine:3, seatedpress:2, ohp:2,
  nordic:3, seatcurl:2, legcurl:2, latlunge:3, adductor:2, pallof:3, chop:2, curl:2, inclinecurl:2, pushdown:2, ohext:2, latraise:2, cablelat:2,
  cablefly:2, pecdeck:2, straightarm:2, legext:2, legpress:2, hacksquat:2, cablecrunch:2, kneeraise:2, abduction:2,
  tspineroll:4, openbook:3, threadneedle:2, wallslide:3, pecstretch:2, latstretch:2, chintuck:3, hipflexstretch:3, couchstretch:2, hip9090:2, lungerot:3,
  squathold:3, adductorrock:2, figure4:2, kneetowall:3, calfstretch:2, legswing:3, hamfloss:2, inchworm:2};
/* Zusätzliches Material neben dem Gerätetyp. gym hat alles. */
const NEEDS = {pullup:['bar'], chinup:['bar'], kneeraise:['bar'], invrow:['bar'], dips:['gym'], incline:['bench'], dbbench:['bench'], csrow:['bench'], bbbench:['bench'],
  skull:['bench'], inclinecurl:['bench'], dbfly:['bench'], dbpullover:['bench'], hipthrust:['bench'], seatedpress:['bench'], slhipthrust:['bench'], bss:['bench'], stepup:['bench'],
  backext:['gym'], rollout:['gym'], ballcurl:['gym'], tspineroll:['gym'], latstretch:['bench'], pullapart:['bands'], landmine:['gym'], frontsq:['rack'], goodmorning:['rack'], ohp:['rack']};
const REPS = {nordic:[3,5], deadbug:[8,8], birddog:[8,8], pallof:[10,10], copenhagen:[6,10], hamslide:[6,10], rollout:[6,10], latlunge:[8,8], cossack:[6,8]};
const TEST_NAME = {squat:'tiefe Hocke', overhead:'Arme über Kopf', toes:'Finger zum Boden', hipflex:'Hüftbeuger', wall:'Wand-Engel'};
const TRIG_NAME = {deepknee:'tiefes Kniebeugen', overhead:'Überkopf-Bewegungen', rotation:'Drehung', bend:'Vorbeugen unter Last', axial:'Last auf der Wirbelsäule', pull:'Hängen und Zug', pushdeep:'tiefe Schulterstreckung', kneel:'Knien', wrist:'Stütz auf dem Handgelenk'};
const REGION_NAME = {knee:'Knie', hip:'Hüfte', lowback:'unterer Rücken', shoulder:'Schulter', elbow:'Ellbogen', wrist:'Handgelenk', hams:'Hamstrings', adductors:'Adduktoren'};

/* ---------- Mobility: Bedarf aus Selbsttests, Haltung und Alltag ---------- */
const MOB = ['mob_tspine','mob_hipflex','mob_hip','mob_shoulder','mob_ankle','mob_chain','mob_neck'];
const MOB_LABEL = {mob_tspine:'Brustwirbelsäule', mob_shoulder:'Schulter', mob_neck:'Nacken', mob_hipflex:'Hüftbeuger', mob_hip:'Hüfte', mob_ankle:'Sprunggelenk', mob_chain:'hintere Kette'};
function mobNeeds(p){
  const n = {}, why = {}; MOB.forEach(k => { n[k] = 0; why[k] = []; });
  const add = (k, v, w) => { if(v>0){ n[k] += v; if(w && !why[k].includes(w)) why[k].push(w); } };
  const d = t => 2 - mob(p, t), tested = t => (p.mobility||{})[t] != null;
  const T = (t, k, f) => add(k, d(t)*f, tested(t) ? 'Test «'+TEST_NAME[t]+'»' : null);
  T('squat','mob_ankle',1); T('squat','mob_hip',1); T('overhead','mob_shoulder',1); T('overhead','mob_tspine',1);
  T('toes','mob_chain',1); T('hipflex','mob_hipflex',1); T('wall','mob_tspine',1); T('wall','mob_shoulder',0.5);
  const po = p.posture||[];
  if(po.includes('head')){ add('mob_neck',2,'Kopf nach vorne'); add('mob_tspine',1,'Kopf nach vorne'); }
  return {n, why};
}
function pickMob(pattern, p, EX, CAT, gear, used, preferHold, week){
  const trig = [].concat(...(p.issues||[]).map(i => i.triggers||[])), c = [];
  for(const id in CAT){
    const k = CAT[id], ex = EX[id];
    if(!ex || k.pattern!==pattern || used[id] || (p.avoid||[]).includes(id) || !available(id, ex, gear)) continue;
    if(k.triggers.some(t => trig.includes(t))) continue;
    c.push({id, score:(BASE[id]||1) + (ex.hold ? (preferHold ? 2 : -1) : 0) - (k.level>1 ? 1 : 0) - (week && week[id] ? 2 : 0)});
  }
  c.sort((a,b) => b.score-a.score || (a.id<b.id?-1:1));
  return c[0] ? c[0].id : null;
}
function mobBlock(prefix, order, need, count, sets, p, EX, CAT, gear, preferHold, week){
  const used = {}, items = [];
  for(const k of order){
    if(items.length>=count) break;
    const id = pickMob(k, p, EX, CAT, gear, used, preferHold, week); if(!id) continue;
    used[id] = true; if(week) week[id] = true;
    items.push({key:prefix+'.mob'+(items.length+1), group:k, pattern:k, ex:id, sets:typeof sets==='function' ? sets(k) : sets, reps:(EX[id].reps||[8,10]).slice(), mob:true, alts:[]});
  }
  return items.length ? {rest:'short', mob:true, name:'Mobility', items} : null;
}

/* Stufe = Technikstand aus den Antworten zu den Grundbewegungen (0–2), nicht Trainingsjahre:
   Laut ACSM 2026 ändert Trainingserfahrung die Empfehlungen kaum. Die Stufe steuert nur, wie anspruchsvoll die Übungsvarianten sind. */
function levelOf(p){ const v=Object.values(p.skill||{}).filter(x=>x!=null); if(!v.length) return 2; return 1+Math.round(v.reduce((a,b)=>a+b,0)/v.length); }
function gearOf(p){
  if(p.equip==='gym' || !p.equip) return null;                       // null = alles vorhanden
  const g = new Set(p.equip==='bw' ? [] : (p.gear||[])); if(g.has('bb')) g.add('rack'); return g;
}
function available(id, ex, gear){
  if(!gear) return true;
  const e = ex.equip, ok = e==='none' || e==='bw' || (e==='db' && gear.has('db')) || ((e==='bb'||e==='lm') && gear.has('bb')) || (e==='cable' && gear.has('cable'));
  return ok && (NEEDS[id]||[]).every(n => gear.has(n));
}
function mob(p, t){ const v = (p.mobility||{})[t]; return v==null ? 1 : v; }   // übersprungen = vorsichtig «knapp»

/* Ausschluss oder Vorsicht wegen Beweglichkeit und Beschwerden. Rückgabe: {out:'Grund'} | {caution:'Grund'} | {} */
function screen(id, c, p){
  for(const t in c.req) if(mob(p,t) < c.req[t]) return {out:'Test «'+TEST_NAME[t]+'» reicht dafür noch nicht'};
  let caution = null;
  for(const is of (p.issues||[])){
    if(!c.regions.includes(is.region)) continue;
    if(is.status==='acute') return {out:REGION_NAME[is.region]+' ist akut verletzt'};
    const hit = (is.triggers||[]).find(t => c.triggers.includes(t));
    if(hit) return {out:REGION_NAME[is.region]+': '+TRIG_NAME[hit]+' löst Beschwerden aus'};
    caution = REGION_NAME[is.region]+' empfindlich: vorsichtig einsteigen';
  }
  return caution ? {caution} : {};
}

/* Gewicht eines Ziels: Hauptziel 1, weitere Ziele 0.5, sonst 0. Alte Profile kennen nur p.goal. */
function gw(p, g){ const G = p.goals && p.goals.length ? p.goals : [p.goal]; const i = G.indexOf(g); return i<0 ? 0 : i===0 ? 1 : 0.5; }
function score(id, ex, c, slot, p, ctx){
  let s = BASE[id]||1; const lvl = ctx.level;
  if(c.level > lvl) s -= 4*(c.level-lvl);
  if(lvl===1 && c.level===1) s += 2;
  const sk = {squat:'squat', single:'squat', hinge:'hinge', hpush:'push', vpush:'push', hpull:'pull', vpull:'pull'}[c.pattern];
  if(sk && (p.skill||{})[sk]!=null && p.skill[sk]<2 && c.level>=2) s -= 3;
  if(slot.main && (ex.equip==='bb') && lvl>=2) s += 3*gw(p,'strength');
  if((p.like||[]).includes(id)) s += 3;
  if(ctx.usedWeek[id] && !(slot.main && p.goal==='strength')) s -= 3;
  return s;
}

function pick(slot, p, EX, CAT, ctx, dayUsed){
  const cands = [], rejected = [];
  for(const id in CAT){
    const c = CAT[id], ex = EX[id];
    if(!ex || c.pattern!==slot.pattern || dayUsed[id] || (p.avoid||[]).includes(id)) continue;
    if(!available(id, ex, ctx.gear)) continue;
    if(c.level - ctx.level >= 2) continue;
    const sc = screen(id, c, p);
    if(sc.out){ rejected.push({id, why:sc.out}); continue; }
    cands.push({id, caution:sc.caution||null, score:score(id, ex, c, slot, p, ctx) - (sc.caution?1:0)});
  }
  cands.sort((a,b) => b.score-a.score || (a.id<b.id?-1:1));
  return {best:cands[0]||null, alts:cands.slice(1,3).map(x=>x.id), rejected};
}

function repsFor(slot, id, p){
  if(REPS[id]) return REPS[id].slice();
  const pat = slot.pattern;
  if(slot.main) return p.goal==='strength' ? [4,6] : (pat==='glute'||pat==='vpull'||p.goal==='muscle') ? [6,10] : [6,8];
  if(pat==='rear') return [12,15];
  if(ISO.includes(pat) || pat==='kneeflex') return [10,15];
  if(pat==='single') return [8,10];
  return [8,12];
}

/* ---------- Zeit und Volumen ---------- */
let REST = {main:90, acc:90};
function slotSeconds(it, EX, paired){
  if(it.mob){ const e = EX[it.ex]; return it.sets*(e.side?2:1)*(e.hold ? it.reps[0]+10 : 40); }
  /* Pausen: die eingestellten Zeiten des Nutzers, sonst 90 s (Singer 2024: über 60 s kleiner Vorteil für Muskelaufbau, über 90 s kein nachweisbarer Zusatznutzen). */
  const side = EX[it.ex].side ? 70 : 40, rest = it.main ? REST.main : REST.acc;
  return it.sets*(side + (paired ? 45 : rest));
}
function dayMinutes(day, EX){
  let s = (day.blocks.some(b => b.mob) ? 4 : 8)*60;   // allgemeines Aufwärmen, mit Mobility-Block kürzer
  day.blocks.forEach(b => b.items.forEach(it => { s += slotSeconds(it, EX, b.ss); }));
  return Math.round(s/60);
}
function weeklyVolume(days, EX){
  const v = {};
  days.forEach(d => d.blocks.forEach(b => b.items.forEach(it => { const m = EX[it.ex].m||{}; for(const k in m) v[k] = (v[k]||0) + it.sets*(m[k]>=1 ? 1 : 0.5); })));
  return v;
}
/* Wochenumfang pro Muskel (Sätze, indirekte zählen halb). Quelle: ACSM 2026 (Currier et al.):
   Muskelaufbau ab 10 Sätzen pro Woche mit Dosis-Wirkung, Plateau bei rund 18–20. Für Kraft und Funktion
   mindestens 2 Einheiten pro Woche mit 2–3 Sätzen pro Übung, also 4–6 Sätze. Trainingserfahrung ändert daran wenig,
   darum hängt der Zielbereich nicht mehr von der Stufe ab. legMin = Beine nur auf Mindestumfang (Vorrang Sport). */
function targetFor(muscle, p, level, legMin){
  const LEGM = ['quads','glutes','hams','adductors'];
  /* Rumpf und Adduktoren: kein Aufbauziel, darum Mindestumfang. Schwerpunkt: obere Hälfte des belegten Bereichs (15–20). */
  if((p.focus||[]).includes(muscle)) return [15,20];
  const base = (gw(p,'muscle') && !(legMin && LEGM.includes(muscle)) && !['core','adductors'].includes(muscle)) ? [10,20] : [4,10];
  let f = 1;
  if((p.focus||[]).includes(muscle)) f *= 1.3;
  return [Math.round(base[0]*f), Math.round(base[1]*f)];
}

function primary(it, EX){ const m = EX[it.ex].m||{}; return Object.keys(m).filter(k => m[k]>=1); }
function canPair(a, b, EX){ return !a.main && !b.main && !primary(a,EX).some(m => primary(b,EX).includes(m)); }

/* ---------- Plan bauen ---------- */
function buildPlan(profile, EX, CAT){
  const p = profile||{}, why = [], level = levelOf(p), gear = gearOf(p);
  const nDays = Math.max(1, Math.min(6, p.days||2)), minutes = p.minutes||60;
  REST = {main:(p.rest && +p.rest.main) || 90, acc:(p.rest && +p.rest.acc) || 90};
  const sports = p.sports||[], hours = sports.reduce((a,s)=>a+(s.hours||0),0);
  const kinds = sports.map(s=>s.kind);
  const enduranceFirst = p.priority==='endurance';
  const legFactor = enduranceFirst;
  why.push({topic:'split', text:SPLIT_WHY[nDays]});

  // 1) Tage aus Vorlagen
  const count = {};
  const days = SPLITS[nDays].map((k,i) => { const t = DAYS[k]; count[t.name] = (count[t.name]||0)+1;
    return {id:'P'+(i+1), kind:'gym', type:t.type, name:t.name, n:count[t.name], slots:t.slots.map(s => Object.assign({}, s))}; });
  days.forEach(d => { d.name = count[d.name]>1 ? d.name+' '+d.n : d.name; delete d.n; });

  // 2) Profilabhängige Plätze
  const ensure = (pattern, minDays, prio, text) => {
    const okType = d => LEG.includes(pattern) ? (d.type==='fb'||d.type==='lower') : UPPER_OK[pattern] ? UPPER_OK[pattern].includes(d.type) : CORE.includes(pattern) ? true : true;
    let have = days.filter(d => d.slots.some(s => s.pattern===pattern)).length, added = false;
    const pool = days.filter(d => okType(d) && !d.slots.some(s => s.pattern===pattern)).sort((a,b) => a.slots.length-b.slots.length);
    while(have < Math.min(minDays, days.filter(okType).length) && pool.length){ pool.shift().slots.push(S(pattern,0,prio)); have++; added = true; }
    days.forEach(d => d.slots.forEach(s => { if(s.pattern===pattern && s.prio>prio) s.prio = prio; }));
    if(text && (added || have)) why.push({topic:'profil', text});
  };
  const posture = p.posture||[];
  if(posture.includes('kyphosis')) ensure('rear', 2, 2, 'Rundrücken: Kräftigung des oberen Rückens verkleinert den Winkel der Brustwirbelsäule deutlich (González-Gálvez 2019). Darum ein fester Platz an zwei Tagen.');
  if(posture.includes('head')){ ensure('rear', 2, 2); why.push({topic:'haltung', text:'Kopf nach vorne: Übungsprogramme verbessern die Kopfhaltung um rund 3–4 Grad (Xing 2026, Sheikhhoseini 2018). In den Studien waren das 3–5 Einheiten pro Woche über mindestens 3–8 Wochen, meist kombiniert aus Nackenstabilisation, Schulterblatt-Kräftigung und Dehnen. Der Plan liefert Nackenübung und oberen Rücken an den Trainingstagen. Auf die Häufigkeit aus den Studien kommst du nur mit der Routine an freien Tagen.'}); }
  if(posture.includes('lordosis')) why.push({topic:'haltung', text:'Hohlkreuz: Für Übungsprogramme ist keine gesicherte Wirkung auf die Lendenlordose belegt (González-Gálvez 2019). Der Plan enthält deshalb keine Sonderregeln dafür.'});
  if(gw(p,'posture')){ ensure('rear', 2, 2, 'Ziel Haltung: hintere Schulter und oberer Rücken an zwei Tagen.'); ensure('antiext', 2, 2, 'Ziel Haltung: Rumpfkontrolle an zwei Tagen.'); }
  if(gw(p,'athletic')){ ensure('single', 1, 2, 'Ziel Athletik: einbeinige Kraft und Rumpf gegen Drehung sind fix dabei.'); ensure('antirot', 1, 2); }
  if(kinds.some(k => ['court','padel','tennis','football','team'].includes(k))){ ensure('lateral', 1, 2, 'Spielsport: seitliche Bewegungen und Rumpf gegen Drehung für Richtungswechsel.'); ensure('antirot', 1, 2); }
  if(kinds.includes('run')) ensure('kneeflex', 1, 2, 'Laufen: Beinbeuger für die Hamstrings. Wadenübungen folgen mit der Katalog-Erweiterung.');
  const FOCUS = {chest:'chestiso', shoulders:'deltiso', lats:'latiso', quads:'kneeext', hams:'kneeflex', glutes:'glute', upback:'rear'};
  (p.focus||[]).forEach(m => { if(m==='arms'){ ensure('biceps',2,2); ensure('triceps',2,2,'Schwerpunkt Arme: Bizeps und Trizeps an zwei Tagen.'); } else if(FOCUS[m]) ensure(FOCUS[m], 2, 2, 'Schwerpunkt '+m+': zusätzlicher Platz an zwei Tagen.'); });

  // 3) Übungen wählen
  const ctx = {level, gear, usedWeek:{}}, missing = [];
  /* ACSM 2026: mindestens 2 Sätze pro Übung, für Kraft 2–3. Start bei 3 (Grundübung) und 2, der Rest kommt über den Wochenumfang. */
  const baseSets = slot => slot.main ? 3 : 2;
  days.forEach(d => {
    const used = {}; d.items = [];
    d.slots.forEach(slot => {
      const r = pick(slot, p, EX, CAT, ctx, used);
      if(!r.best){ missing.push({day:d.name, pattern:slot.pattern, rejected:r.rejected}); return; }
      used[r.best.id] = ctx.usedWeek[r.best.id] = true;
      let sets = baseSets(slot); if(LEG.includes(slot.pattern) && enduranceFirst) sets = Math.max(2, sets-1);
      const n = d.items.filter(x => x.pattern===slot.pattern).length;
      const it = {key:d.id+'.'+slot.pattern+(n?n+1:''), group:GROUP[slot.pattern]||slot.pattern, pattern:slot.pattern, ex:r.best.id, sets, reps:repsFor(slot, r.best.id, p), main:slot.main, prio:slot.prio, alts:r.alts};
      if(primary(it, EX).some(m => (p.focus||[]).includes(m))){ it.sets = Math.min(4, it.sets+1); it.prio = Math.min(it.prio, 2); }
      if(r.best.caution){ it.caution = r.best.caution; why.push({topic:'vorsicht', text:EX[it.ex].name+': '+r.best.caution+'.'}); }
      const first = r.rejected.find(x => (BASE[x.id]||1) > (BASE[it.ex]||1));
      if(first) why.push({topic:'ersatz', text:EX[it.ex].name+' statt '+EX[first.id].name+': '+first.why+'.'});
      d.items.push(it);
    });
    delete d.slots;
  });
  missing.forEach(m => why.push({topic:'luecke', text:m.day+': für «'+LABEL[m.pattern]+'» gibt es mit deinem Material und deinen Angaben keine passende Übung.'}));

  // 4) Blöcke, Zeitbudget: erst paaren, dann streichen, dann Sätze kürzen
  const allowSS = p.supersets!==false, mn = mobNeeds(p), mobWeek = {}; let trimmed = false, paired = false;
  days.forEach(d => {
    d.blocks = d.items.map(it => ({rest:it.ex==='nordic' ? 'nordic' : it.main ? 'main' : 'acc', items:[it]}));
    { // Mobility-Block: Bedarf plus Bezug zum Tagesinhalt
      const legs = d.items.some(x => LEG.includes(x.pattern)), upper = d.items.some(x => ['hpush','vpush','hpull','vpull'].includes(x.pattern));
      const rel = k => (legs && ['mob_hipflex','mob_hip','mob_ankle','mob_chain'].includes(k) ? 2 : 0) + (upper && ['mob_tspine','mob_shoulder'].includes(k) ? 2 : 0);
      const sc = MOB.map(k => ({k, s:mn.n[k] + rel(k)})).filter(x => x.s>0 && (x.k!=='mob_neck' || mn.n.mob_neck>0)).sort((a,b) => b.s-a.s);
      const cap = minutes<=30 ? 2 : minutes<=45 ? 3 : 4, count = Math.max(2, Math.min(cap, sc.filter(x => x.s>=2).length));
      const mb = mobBlock(d.id, sc.map(x => x.k), mn.n, count, k => mn.n[k]>=2 ? 2 : 1, p, EX, CAT, gear, false, mobWeek);
      if(mb) d.blocks.unshift(mb);
    }
    const over = () => dayMinutes(d, EX) > minutes;
    if(allowSS){
      for(let i=0; i<d.blocks.length-1 && over(); i++){
        const a = d.blocks[i], b = d.blocks[i+1];
        if(!a.mob && !b.mob && a.items.length===1 && b.items.length===1 && canPair(a.items[0], b.items[0], EX)){ d.blocks.splice(i, 2, {rest:'ss', ss:true, items:[a.items[0], b.items[0]]}); paired = true; }
      }
    }
    for(let pr=3; pr>=2 && over(); pr--){
      for(let i=d.blocks.length-1; i>=0 && over(); i--){
        const b = d.blocks[i], k = b.items.map(x=>x.prio).lastIndexOf(pr);
        if(k<0) continue;
        b.items.splice(k,1); trimmed = true;
        if(!b.items.length) d.blocks.splice(i,1); else if(b.ss){ delete b.ss; b.rest = b.items[0].main ? 'main' : 'acc'; }
      }
    }
    for(let guard=0; guard<12 && over(); guard++){
      const its = [].concat(...d.blocks.map(b=>b.items)).filter(x => x.sets>2 && !x.mob).sort((a,b) => b.prio-a.prio || b.sets-a.sets);
      if(!its.length) break; its[0].sets--; trimmed = true;
    }
    // Letzter Ausweg bei sehr kurzen Einheiten: Ergänzungen von hinten streichen, mindestens 3 Übungen bleiben
    for(let i=d.blocks.length-1; i>=0 && over(); i--){
      const b = d.blocks[i]; if(b.mob || b.items.some(x=>x.main)) continue;
      if([].concat(...d.blocks.map(x=>x.items)).length - b.items.length < 3) break;
      d.blocks.splice(i,1); trimmed = true;
    }
    delete d.items;
  });
  if(paired) why.push({topic:'zeit', text:'Damit die Einheit in '+minutes+' Minuten passt, sind Übungen für verschiedene Muskeln als Supersatz gepaart.'});
  if(trimmed) why.push({topic:'zeit', text:'Zeitbudget '+minutes+' Minuten: Ergänzungen wurden gekürzt, die Grundmuster bleiben.'});

  // 5) Volumen auffüllen, wo Zeit bleibt und ein Muskel unter dem Ziel liegt
  const muscles = ['quads','glutes','hams','upback','lats','chest','shoulders','core','adductors','arms'];
  for(let guard=0; guard<80; guard++){
    const v = weeklyVolume(days, EX);
    const lack = muscles.map(m => ({m, d:targetFor(m,p,level,legFactor)[0]-(v[m]||0)})).filter(x => x.d>0).sort((a,b) => b.d-a.d);
    let done = false;
    for(const l of lack){
      const opts = [];
      days.forEach(d => d.blocks.forEach(b => b.items.forEach(it => { if(it.sets<4 && !it.mob && !EX[it.ex].noRir && primary(it,EX).includes(l.m) && !(enduranceFirst && LEG.includes(it.pattern))){
        it.sets++; const fits = dayMinutes(d,EX) <= minutes; it.sets--; if(fits) opts.push({it, mins:dayMinutes(d,EX)}); } })));
      if(opts.length){ opts.sort((a,b) => a.it.sets-b.it.sets || a.mins-b.mins); opts[0].it.sets++; done = true; break; }
      /* Kein Satz mehr möglich (alle Übungen dieses Muskels stehen bei 4 Sätzen): eine Ergänzungsübung an dem Tag mit der meisten freien Zeit. */
      if(l.d < 1 || (enduranceFirst && ['quads','glutes','hams','adductors'].includes(l.m))) continue;
      const pats = FILL[l.m]||[]; let added = false;
      for(const d of days.slice().sort((a,b) => dayMinutes(a,EX)-dayMinutes(b,EX))){
        const used = {}; d.blocks.forEach(b => b.items.forEach(it => { used[it.ex] = true; }));
        for(const pat of pats){
          if(d.blocks.some(b => b.items.some(it => it.pattern===pat))) continue;
          const slot = {pattern:pat, main:false, prio:3}, r = pick(slot, p, EX, CAT, ctx, used);
          if(!r.best || CAT[r.best.id].level > ctx.level || r.best.caution || !(EX[r.best.id].m||{})[l.m] || EX[r.best.id].m[l.m] < 1) continue;
          const it = {key:d.id+'.'+pat+'x', group:GROUP[pat]||pat, pattern:pat, ex:r.best.id, sets:2, reps:repsFor(slot, r.best.id, p), main:false, prio:3, alts:r.alts};
          d.blocks.push({rest:'acc', items:[it]});
          if(dayMinutes(d,EX) <= minutes){ ctx.usedWeek[r.best.id] = true; added = true; break; }
          d.blocks.pop();
        }
        if(added) break;
      }
      if(added){ done = true; break; }
    }
    if(!done) break;
  }
  const vol = weeklyVolume(days, EX), volume = {};
  muscles.forEach(m => { const t = targetFor(m,p,level,legFactor); volume[m] = {sets:vol[m]||0, target:t}; });
  const low = muscles.filter(m => Math.round(volume[m].sets) < volume[m].target[0] && !['core','adductors','arms'].includes(m));
  if(low.length) why.push({topic:'volumen', text:'Mit '+nDays+' × '+minutes+' Minuten liegen einige Muskeln unter dem empfohlenen Wochenumfang (ACSM 2026). Mehr Tage oder längere Einheiten würden das ändern.', muscles:low});

  // 6) Ausdauer
  if(sports.length){
    why.push({topic:'ausdauer', text: enduranceFirst
      ? 'Dein Sport hat Vorrang: Die Beine bekommen den Mindestumfang für Kraft (2–3 Sätze pro Übung), nicht den Umfang für Muskelaufbau. Das ist deine Priorität, keine Notwendigkeit: Ausdauer bremst Muskelaufbau und Maximalkraft im Schnitt nicht (Schumann 2022).'
      : 'Ausdauer bremst Muskelaufbau und Maximalkraft im Schnitt nicht (Schumann 2022). Halte zwischen Ausdauer und Krafttraining mindestens 3 Stunden Abstand: Direkt hintereinander leidet die Schnellkraft, bei Trainierten auch die Beinkraft (Petré 2021).'});
  }

  // 7) Aufwärmen
  days.forEach(d => { d.warmup = warmupFor(d, p); d.focus = [].concat(...d.blocks.map(b=>b.items)).filter(x=>x.main).map(x=>LABEL[x.pattern]).join(', '); d.minutes = dayMinutes(d, EX);
    d.blocks.forEach(b => b.items.forEach(it => { delete it.prio; if(!it.main) delete it.main; if(!it.alts.length) delete it.alts; })); delete d.type; });
  // 8) Mobility: Begründung und Routine für freie Tage
  const top = MOB.filter(k => mn.n[k]>=2).sort((a,b) => mn.n[b]-mn.n[a]);
  if(top.length){ const reasons = [...new Set([].concat(...top.map(k => mn.why[k])))];
    why.push({topic:'mobility', text:'Mobility-Block mit Schwerpunkt '+top.slice(0,3).map(k => MOB_LABEL[k]).join(', ')+(reasons.length?' ('+reasons.join(', ')+')':'')+'. Kräftigen und Mobilisieren verbessern Beweglichkeit und Kraft in diesen Positionen. Haltung verändert sich dadurch nur langsam und mässig.'}); }
  else why.push({topic:'mobility', text:'Mobility-Block passend zum Tagesinhalt als Vorbereitung.'});
  const order = MOB.slice().sort((a,b) => mn.n[b]-mn.n[a]).filter(k => k!=='mob_neck' || mn.n.mob_neck>0);
  const rb = mobBlock('M', order, mn.n, Math.max(4, Math.min(6, order.filter(k => mn.n[k]>=1).length)), 2, p, EX, CAT, new Set(), true);   // Routine für zuhause: ohne Geräte
  const routine = rb ? {id:'M', kind:'mobility', name:'Mobility für freie Tage', blocks:[rb]} : null;
  if(routine) routine.minutes = Math.round(rb.items.reduce((a,it) => a+slotSeconds(it, EX), 0)/60);
  /* Dehn-Dosis (Ingram 2024): grösster Effekt bei rund 10 Minuten statischem Dehnen pro Woche und Muskelgruppe, höchstens 4 Minuten pro Einheit zählen. */
  if(routine){
    const st = rb.items.filter(it => EX[it.ex].hold);
    if(st.length){
      const per = st.map(it => it.sets*it.reps[1]*(EX[it.ex].side?2:1)/60), avg = per.reduce((a,b)=>a+b,0)/per.length, n = Math.min(7, Math.ceil(10/Math.min(4,avg)));
      routine.dose = {minPerRegion:Math.round(avg*10)/10, perWeek:n};
      why.push({topic:'mobility', text:'Dehnen wirkt am stärksten bei rund 10 Minuten pro Woche und Muskelgruppe, mehr bringt nicht mehr (Ingram 2024). Die Routine für freie Tage dehnt jede eingeschränkte Region rund '+String(routine.dose.minPerRegion).replace('.',',')+' Minuten pro Durchgang: Mit '+n+' Durchgängen pro Woche schöpfst du das aus. Weniger wirkt auch, nur schwächer. Krafttraining über den vollen Bewegungsweg verbessert die Beweglichkeit ebenfalls (Afonso 2021).'});
    }
  }
  return {v:1, source:'coach', level, days, routine, volume, why};
}

function warmupFor(d, p){
  return [['4 min locker auf Rudergerät, Velo oder Crosstrainer',''], ['Aufwärmsätze der ersten Übung','2 leichte Sätze mit steigendem Gewicht']];
}

/* Heutiges A/B als Plan. Die Tages-IDs bleiben «A» und «B», damit alte Einheiten und Auswertungen passen. */
function standardPlan(PLANS, WARMUP){
  const days = ['A','B'].filter(k => PLANS[k]).map(k => ({id:k, kind:'gym', name:PLANS[k].name, warmup:(WARMUP||[]).map(x=>x.slice()), blocks:JSON.parse(JSON.stringify(PLANS[k].blocks))}));
  return {v:1, source:'standard', name:'Ganzkörper A/B', days, why:[{topic:'split', text:'Dein bisheriger Plan: zwei Ganzkörper-Einheiten im Wechsel.'}]};
}

const api = {buildPlan, standardPlan, dayMinutes, weeklyVolume, mobNeeds, LABEL, MOB_LABEL, GROUP};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_ENGINE = api;
})(typeof self !== 'undefined' ? self : this);
