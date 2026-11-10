// Tests für coach/engine.js. Aufruf: node tools/test_engine.js
const {grab} = require('./extract.js');
const {CATALOG} = require('../coach/catalog.js');
const E = require('../coach/engine.js');
const EX = grab('EX'), PLANS = grab('PLANS'), WARMUP = grab('WARMUP');
let fail = 0; const ok = (name, cond, info) => { console.log((cond?'OK   ':'FEHLER ')+name+(cond||!info?'':' → '+info)); if(!cond) fail++; };
const items = pl => [].concat(...pl.days.map(d => [].concat(...d.blocks.map(b => b.items.map(it => Object.assign({day:d.name}, it))))));
const ids = pl => items(pl).map(i => i.ex);
const full = {squat:2, overhead:2, toes:2, hipflex:2, wall:2}, sure = {squat:2, hinge:2, push:2, pull:2};

const P = {
  aaron:   {goal:'fitness', years:4, days:2, minutes:60, equip:'gym', sports:[{kind:'run',perWeek:2,hours:1.5},{kind:'padel',perWeek:1,hours:1.5}], priority:'both', work:'sit', posture:['kyphosis','lordosis'], mobility:full, skill:sure},
  starter: {goal:'fitness', years:0, days:2, minutes:45, equip:'home', gear:['db','bench'], mobility:{squat:1, overhead:1, toes:1, hipflex:1, wall:1}, skill:{squat:0, hinge:0, push:1, pull:0}},
  bw:      {goal:'fitness', years:0, days:3, minutes:30, equip:'bw'},
  muscle4: {goal:'muscle', years:3, days:4, minutes:75, equip:'gym', focus:['chest','arms'], mobility:full, skill:sure},
  strength:{goal:'strength', years:5, days:3, minutes:90, equip:'gym', mobility:full, skill:sure},
  runner:  {goal:'fitness', years:2, days:2, minutes:45, equip:'gym', sports:[{kind:'run',perWeek:5,hours:6,hard:2,race:'2027-04-11'}], priority:'endurance', mobility:full, skill:sure},
  shoulder:{goal:'muscle', years:3, days:3, minutes:60, equip:'gym', issues:[{region:'shoulder', status:'sensitive', triggers:['overhead','pushdeep']}], mobility:{squat:2, overhead:0, toes:2, hipflex:2, wall:1}, skill:sure},
  kneeAcute:{goal:'fitness', years:2, days:2, minutes:60, equip:'gym', issues:[{region:'knee', status:'acute', triggers:[]}], mobility:full, skill:sure},
  six:     {goal:'muscle', years:6, days:6, minutes:60, equip:'gym', mobility:full, skill:sure},
  short:   {goal:'fitness', years:3, days:2, minutes:30, equip:'gym', mobility:full, skill:sure},
  empty:   {}
};

// Allgemeine Regeln für jedes Profil
for(const name in P){
  const p = P[name], pl = E.buildPlan(p, EX, CATALOG), its = items(pl);
  const again = JSON.stringify(E.buildPlan(p, EX, CATALOG)) === JSON.stringify(pl);
  const dupes = pl.days.some(d => { const a = [].concat(...d.blocks.map(b => b.items.map(i => i.ex))); return new Set(a).size !== a.length; });
  const over = pl.days.filter(d => d.minutes > (p.minutes||60));
  const keys = its.map(i => i.key);
  const bad = its.filter(i => !EX[i.ex] || !CATALOG[i.ex] || i.sets<2 || i.sets>4 || !(i.reps[0]<=i.reps[1]));
  ok(name+': '+pl.days.length+' Tage, '+its.length+' Übungen, '+pl.days.map(d=>d.minutes).join('/')+' min',
     again && !dupes && !over.length && !bad.length && new Set(keys).size===keys.length && pl.days.length===Math.max(1,Math.min(6,p.days||2)) && (name==='bw' ? pl.why.some(w => w.topic==='luecke') : pl.days.every(d => d.blocks.length>=3)),   // bw: Katalog hat noch zu wenig Körpergewichtsübungen (P6)
     JSON.stringify({again, dupes, over:over.map(d=>d.name+' '+d.minutes), bad:bad.map(i=>i.ex)}));
}

// Aaron: nahe am heutigen A/B
{ const got = ids(E.buildPlan(P.aaron, EX, CATALOG));
  const want = ['goblet','rdl','csrow','incline','bss','facepull','deadbug','hipthrust','pullup','landmine','nordic','latlunge','pallof'];
  const miss = want.filter(x => !got.includes(x));
  ok('Aaron: Plan enthält die Übungen aus A/B', miss.length===0, 'fehlen: '+miss.join(', ')); }

// Material
{ const g = ids(E.buildPlan(P.starter, EX, CATALOG)), wrong = g.filter(id => !['db','none','bw'].includes(EX[id].equip));
  ok('Einsteiger zuhause: nur Kurzhanteln, Bank, Körpergewicht', wrong.length===0, wrong.join(', '));
  ok('Einsteiger: keine anspruchsvollen Übungen', g.every(id => CATALOG[id].level<=2) && g.filter(id => CATALOG[id].level===2).length<=2, g.filter(id=>CATALOG[id].level>1).join(', '));
  const b = ids(E.buildPlan(P.bw, EX, CATALOG)), wb = b.filter(id => !['none','bw'].includes(EX[id].equip) || ['pullup','chinup','kneeraise','invrow','dips'].includes(id));
  ok('Nur Körpergewicht: keine Geräte nötig', wb.length===0, wb.join(', ')); }

// Beschwerden und Beweglichkeit
{ const pl = E.buildPlan(P.shoulder, EX, CATALOG), g = ids(pl);
  const bad = g.filter(id => CATALOG[id].triggers.includes('overhead') || CATALOG[id].triggers.includes('pushdeep') || CATALOG[id].req.overhead);
  ok('Schulter empfindlich und Überkopf-Test «geht nicht»: keine Überkopf-Übungen', bad.length===0, bad.join(', '));
  ok('Schulter: Vorsicht-Hinweis bei Schulterübungen', items(pl).some(i => i.caution));
  ok('Schulter: Begründung für Ersatz vorhanden', pl.why.some(w => w.topic==='ersatz' || w.topic==='luecke'));
  const k = E.buildPlan(P.kneeAcute, EX, CATALOG), kb = ids(k).filter(id => CATALOG[id].regions.includes('knee'));
  ok('Knie akut: keine Übung belastet das Knie', kb.length===0, kb.join(', '));
  ok('Knie akut: Lücken werden begründet', k.why.some(w => w.topic==='luecke')); }

// Ziel und Ausdauer
{ const s = E.buildPlan(P.strength, EX, CATALOG), mains = items(s).filter(i => i.main);
  ok('Kraft: Grundübungen mit 4–6 Wdh. und Langhantel', mains.every(i => i.reps[0]===4) && mains.filter(i => EX[i.ex].equip==='bb').length>=3, mains.map(i=>i.ex+' '+i.reps).join(' | '));
  const r = E.buildPlan(P.runner, EX, CATALOG), a = E.buildPlan(Object.assign({}, P.runner, {sports:[], priority:'both'}), EX, CATALOG);
  ok('Läufer mit Vorrang Ausdauer: weniger Beinvolumen', r.volume.quads.sets < a.volume.quads.sets && r.why.some(w => w.topic==='ausdauer'), r.volume.quads.sets+' vs '+a.volume.quads.sets);
  const m = E.buildPlan(P.muscle4, EX, CATALOG), base = E.buildPlan(Object.assign({}, P.muscle4, {focus:[]}), EX, CATALOG);
  ok('Schwerpunkt Brust und Arme: mehr Volumen dort', m.volume.chest.sets > base.volume.chest.sets && m.volume.arms.sets > base.volume.arms.sets, JSON.stringify([m.volume.chest.sets, base.volume.chest.sets, m.volume.arms.sets, base.volume.arms.sets]));
  const sh = E.buildPlan(P.short, EX, CATALOG);
  ok('30 Minuten: Grundübungen bleiben, Hinweis auf Zeit', sh.days.every(d => d.blocks.some(b => b.items.some(i => i.main))) && sh.why.some(w => w.topic==='zeit')); }

// Standardplan
{ const st = E.standardPlan(PLANS, WARMUP);
  ok('Standardplan: A und B unverändert', st.days.length===2 && st.days[0].id==='A' && st.days[1].id==='B' && JSON.stringify(st.days[0].blocks)===JSON.stringify(PLANS.A.blocks) && st.source==='standard'); }

console.log(fail ? fail+' Fehler' : 'Alle Engine-Tests OK'); process.exit(fail?1:0);
