/* Coach-Engine: reine Funktionen, kein DOM, kein Speicher. Gleiches Profil ergibt den gleichen Plan.
   Konzept: docs/coach/konzept.md (Abschnitt 4 Planlogik, 5 Datenmodell). Tests: node tools/test_engine.js
   buildPlan(profile, EX, CATALOG) -> Plan in der Form von settings.plan
   standardPlan(PLANS, WARMUP)     -> heutiges A/B als Plan */
(function(root){
'use strict';

/* ---------- Vorlagen: Muster pro Tag. m = Grundübung, p = Priorität (1 bleibt, 3 fällt zuerst weg) ---------- */
const S = (pattern, m, p) => ({pattern, main:!!m, prio:p});
const DAYS = {
  ONE:  {name:'Ganzkörper', type:'fb', slots:[S('squat',1,1),S('hinge',1,1),S('hpush',0,1),S('vpull',0,1),S('hpull',0,2),S('antiext',0,2)]},
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
  cablefly:2, pecdeck:2, straightarm:2, legext:2, legpress:2, hacksquat:2, cablecrunch:2, kneeraise:2, abduction:2};
/* Zusätzliches Material neben dem Gerätetyp. gym hat alles. */
const NEEDS = {pullup:['bar'], chinup:['bar'], kneeraise:['bar'], invrow:['bar'], dips:['gym'], incline:['bench'], dbbench:['bench'], csrow:['bench'], bbbench:['bench'],
  skull:['bench'], inclinecurl:['bench'], dbfly:['bench'], dbpullover:['bench'], hipthrust:['bench'], seatedpress:['bench'], slhipthrust:['bench'], bss:['bench'], stepup:['bench'],
  backext:['gym'], rollout:['gym'], ballcurl:['gym'], pullapart:['bands'], landmine:['gym'], frontsq:['rack'], goodmorning:['rack'], ohp:['rack']};
const REPS = {nordic:[3,5], deadbug:[8,8], birddog:[8,8], pallof:[10,10], copenhagen:[6,10], hamslide:[6,10], rollout:[6,10], latlunge:[8,8], cossack:[6,8]};
const TEST_NAME = {squat:'tiefe Hocke', overhead:'Arme über Kopf', toes:'Finger zum Boden', hipflex:'Hüftbeuger', wall:'Wand-Engel'};
const TRIG_NAME = {deepknee:'tiefes Kniebeugen', overhead:'Überkopf-Bewegungen', rotation:'Drehung', bend:'Vorbeugen unter Last', axial:'Last auf der Wirbelsäule', pull:'Hängen und Zug', pushdeep:'tiefe Schulterstreckung', kneel:'Knien', wrist:'Stütz auf dem Handgelenk'};
const REGION_NAME = {knee:'Knie', hip:'Hüfte', lowback:'unterer Rücken', shoulder:'Schulter', elbow:'Ellbogen', wrist:'Handgelenk', hams:'Hamstrings', adductors:'Adduktoren'};

function levelOf(p){ const y=p.years||0; return y<1 ? 1 : y<3 ? 2 : 3; }
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

function score(id, ex, c, slot, p, ctx){
  let s = BASE[id]||1; const lvl = ctx.level;
  if(c.level > lvl) s -= 4*(c.level-lvl);
  if(lvl===1 && c.level===1) s += 2;
  const sk = {squat:'squat', single:'squat', hinge:'hinge', hpush:'push', vpush:'push', hpull:'pull', vpull:'pull'}[c.pattern];
  if(sk && (p.skill||{})[sk]!=null && p.skill[sk]<2 && c.level>=2) s -= 3;
  if(c.lengthened) s += p.goal==='muscle' ? 2 : 1;
  if(p.goal==='strength' && slot.main && (ex.equip==='bb') && lvl>=2) s += 3;
  if(p.goal==='muscle' && !slot.main && (ex.equip==='machine' || ex.equip==='cable')) s += 1;
  if((p.posture||[]).includes('lordosis') && c.triggers.includes('axial')) s -= 2;
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
function slotSeconds(it, EX, paired){
  const side = EX[it.ex].side ? 70 : 40, rest = it.main ? 150 : 90;
  return it.sets*(side + (paired ? 45 : rest));
}
function dayMinutes(day, EX){
  let s = 8*60;
  day.blocks.forEach(b => b.items.forEach(it => { s += slotSeconds(it, EX, b.ss); }));
  return Math.round(s/60);
}
function weeklyVolume(days, EX){
  const v = {};
  days.forEach(d => d.blocks.forEach(b => b.items.forEach(it => { const m = EX[it.ex].m||{}; for(const k in m) v[k] = (v[k]||0) + it.sets*(m[k]>=1 ? 1 : 0.5); })));
  return v;
}
function targetFor(muscle, p, level, legFactor){
  const base = {1:[6,10], 2:[8,14], 3:[10,16]}[level];
  let f = ['core','adductors','arms'].includes(muscle) ? 0.5 : 1;
  if(['quads','glutes','hams','adductors'].includes(muscle)) f *= legFactor;
  if((p.focus||[]).includes(muscle)) f *= 1.3;
  return [Math.round(base[0]*f), Math.round(base[1]*f)];
}

function primary(it, EX){ const m = EX[it.ex].m||{}; return Object.keys(m).filter(k => m[k]>=1); }
function canPair(a, b, EX){ return !a.main && !b.main && !primary(a,EX).some(m => primary(b,EX).includes(m)); }

/* ---------- Plan bauen ---------- */
function buildPlan(profile, EX, CAT){
  const p = profile||{}, why = [], level = levelOf(p), gear = gearOf(p);
  const nDays = Math.max(1, Math.min(6, p.days||2)), minutes = p.minutes||60;
  const sports = p.sports||[], hours = sports.reduce((a,s)=>a+(s.hours||0),0);
  const kinds = sports.map(s=>s.kind);
  const enduranceFirst = p.priority==='endurance' || hours>4;
  const legFactor = enduranceFirst ? 0.6 : 1;
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
  if(posture.includes('kyphosis') || p.work==='sit') ensure('rear', 2, 2, 'Sitzende Arbeit oder Rundrücken: hintere Schulter und oberer Rücken bekommen einen festen Platz.');
  if(posture.includes('lordosis')){ ensure('antiext', 2, 2, 'Hohlkreuz: Rumpfübungen gegen das Überstrecken und Gesässarbeit sind fix dabei.'); ensure('glute', 1, 2); }
  if(kinds.some(k => ['court','padel','tennis','football','team'].includes(k))){ ensure('lateral', 1, 2, 'Spielsport: seitliche Bewegungen und Rumpf gegen Drehung für Richtungswechsel.'); ensure('antirot', 1, 2); }
  if(kinds.includes('run')) ensure('kneeflex', 1, 2, 'Laufen: Beinbeuger für die Hamstrings. Wadenübungen folgen mit der Katalog-Erweiterung.');
  const FOCUS = {chest:'chestiso', shoulders:'deltiso', lats:'latiso', quads:'kneeext', hams:'kneeflex', glutes:'glute', upback:'rear'};
  (p.focus||[]).forEach(m => { if(m==='arms'){ ensure('biceps',2,2); ensure('triceps',2,2,'Schwerpunkt Arme: Bizeps und Trizeps an zwei Tagen.'); } else if(FOCUS[m]) ensure(FOCUS[m], 2, 2, 'Schwerpunkt '+m+': zusätzlicher Platz an zwei Tagen.'); });

  // 3) Übungen wählen
  const ctx = {level, gear, usedWeek:{}}, missing = [];
  const baseSets = slot => slot.main ? 3 : (ISO.includes(slot.pattern)||CORE.includes(slot.pattern)) ? 2 : (level===1 ? 2 : 3);
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
  const allowSS = p.supersets!==false; let trimmed = false, paired = false;
  days.forEach(d => {
    d.blocks = d.items.map(it => ({rest:it.ex==='nordic' ? 'nordic' : it.main ? 'main' : 'acc', items:[it]}));
    const over = () => dayMinutes(d, EX) > minutes;
    if(allowSS){
      for(let i=0; i<d.blocks.length-1 && over(); i++){
        const a = d.blocks[i], b = d.blocks[i+1];
        if(a.items.length===1 && b.items.length===1 && canPair(a.items[0], b.items[0], EX)){ d.blocks.splice(i, 2, {rest:'ss', ss:true, items:[a.items[0], b.items[0]]}); paired = true; }
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
      const its = [].concat(...d.blocks.map(b=>b.items)).filter(x => x.sets>2).sort((a,b) => b.prio-a.prio || b.sets-a.sets);
      if(!its.length) break; its[0].sets--; trimmed = true;
    }
    // Letzter Ausweg bei sehr kurzen Einheiten: Ergänzungen von hinten streichen, mindestens 3 Übungen bleiben
    for(let i=d.blocks.length-1; i>=0 && over(); i--){
      const b = d.blocks[i]; if(b.items.some(x=>x.main)) continue;
      if([].concat(...d.blocks.map(x=>x.items)).length - b.items.length < 3) break;
      d.blocks.splice(i,1); trimmed = true;
    }
    delete d.items;
  });
  if(paired) why.push({topic:'zeit', text:'Damit die Einheit in '+minutes+' Minuten passt, sind Übungen für verschiedene Muskeln als Supersatz gepaart.'});
  if(trimmed) why.push({topic:'zeit', text:'Zeitbudget '+minutes+' Minuten: Ergänzungen wurden gekürzt, die Grundmuster bleiben.'});

  // 5) Volumen auffüllen, wo Zeit bleibt und ein Muskel unter dem Ziel liegt
  const muscles = ['quads','glutes','hams','upback','lats','chest','shoulders','core','adductors','arms'];
  for(let guard=0; guard<40; guard++){
    const v = weeklyVolume(days, EX);
    const lack = muscles.map(m => ({m, d:targetFor(m,p,level,legFactor)[0]-(v[m]||0)})).filter(x => x.d>0).sort((a,b) => b.d-a.d);
    let done = false;
    for(const l of lack){
      const opts = [];
      days.forEach(d => d.blocks.forEach(b => b.items.forEach(it => { if(it.sets<4 && !EX[it.ex].noRir && primary(it,EX).includes(l.m) && !(enduranceFirst && LEG.includes(it.pattern))){
        it.sets++; const fits = dayMinutes(d,EX) <= minutes; it.sets--; if(fits) opts.push({it, mins:dayMinutes(d,EX)}); } })));
      if(opts.length){ opts.sort((a,b) => a.it.sets-b.it.sets || a.mins-b.mins); opts[0].it.sets++; done = true; break; }
    }
    if(!done) break;
  }
  const vol = weeklyVolume(days, EX), volume = {};
  muscles.forEach(m => { const t = targetFor(m,p,level,legFactor); volume[m] = {sets:vol[m]||0, target:t}; });
  const low = muscles.filter(m => volume[m].sets < volume[m].target[0] && !['core','adductors','arms'].includes(m));
  if(low.length) why.push({topic:'volumen', text:'Mit '+nDays+' × '+minutes+' Minuten liegen einige Muskeln unter dem Zielbereich. Mehr Tage oder längere Einheiten würden das ändern.', muscles:low});

  // 6) Ausdauer
  if(sports.length){
    why.push({topic:'ausdauer', text: enduranceFirst
      ? 'Ausdauer hat Vorrang oder läuft über 4 Stunden pro Woche: Die Beine bekommen weniger Sätze, Ziel ist Erhalt.'
      : 'Ausdauer bremst Muskelaufbau und Maximalkraft nicht. Lege harte Ausdauereinheiten trotzdem nicht auf denselben Tag wie das Beintraining.'});
  }

  // 7) Aufwärmen
  days.forEach(d => { d.warmup = warmupFor(d, p); d.focus = [].concat(...d.blocks.map(b=>b.items)).filter(x=>x.main).map(x=>LABEL[x.pattern]).join(', '); d.minutes = dayMinutes(d, EX);
    d.blocks.forEach(b => b.items.forEach(it => { delete it.prio; if(!it.main) delete it.main; if(!it.alts.length) delete it.alts; })); delete d.type; });
  return {v:1, source:'coach', level, days, volume, why};
}

function warmupFor(d, p){
  const w = [['5 min locker auf Rudergerät, Velo oder Crosstrainer','']], pats = [].concat(...d.blocks.map(b=>b.items)).map(x=>x.pattern), posture = p.posture||[];
  const legs = pats.some(x => LEG.includes(x)), upper = pats.some(x => ['hpush','vpush','hpull','vpull'].includes(x)), add = (a,b) => { if(w.length<4) w.push([a,b]); };
  if(legs && (mob(p,'hipflex')<2 || posture.includes('lordosis') || p.work==='sit')) add('Kniende Hüftbeuger-Dehnung','2 × 30 s pro Seite, Becken aufgerichtet, Gesäss angespannt');
  if(legs && mob(p,'squat')<2) add('Tiefe Hocke halten, an einem Pfosten festhalten','2 × 30 s, Fersen am Boden, Knie nach vorne schieben');
  if(upper && (mob(p,'overhead')<2 || mob(p,'wall')<2 || posture.includes('kyphosis'))) add('Brustwirbelsäule über Foam Roller strecken','1 × 10');
  if(upper && (posture.includes('kyphosis') || p.work==='sit')) add('Open Books','1 × 8 pro Seite');
  if(legs && mob(p,'toes')<2) add('Beinpendel vor und zurück','1 × 10 pro Seite');
  add('Aufwärmsätze der ersten Übung','2 leichte Sätze mit steigendem Gewicht');
  return w;
}

/* Heutiges A/B als Plan. Die Tages-IDs bleiben «A» und «B», damit alte Einheiten und Auswertungen passen. */
function standardPlan(PLANS, WARMUP){
  const days = ['A','B'].filter(k => PLANS[k]).map(k => ({id:k, kind:'gym', name:PLANS[k].name, warmup:(WARMUP||[]).map(x=>x.slice()), blocks:JSON.parse(JSON.stringify(PLANS[k].blocks))}));
  return {v:1, source:'standard', name:'Ganzkörper A/B', days, why:[{topic:'split', text:'Dein bisheriger Plan: zwei Ganzkörper-Einheiten im Wechsel.'}]};
}

const api = {buildPlan, standardPlan, dayMinutes, weeklyVolume, LABEL};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_ENGINE = api;
})(typeof self !== 'undefined' ? self : this);
