// Prüft coach/catalog.js gegen die Übungen in index.html. Aufruf: node tools/check_catalog.js
const {grab} = require('./extract.js');
const {CATALOG, PATTERNS, TESTS, TRIGGERS, REGIONS} = require('../coach/catalog.js');
const EX = grab('EX'); const err = [];
for(const id in EX) if(!CATALOG[id]) err.push('fehlt im Katalog: '+id);
for(const id in CATALOG){
  const c = CATALOG[id];
  if(!EX[id]) err.push('nicht in EX: '+id);
  if(!PATTERNS.includes(c.pattern)) err.push(id+': Muster '+c.pattern);
  if(![1,2,3].includes(c.level)) err.push(id+': Niveau '+c.level);
  for(const t in c.req){ if(!TESTS.includes(t) || ![1,2].includes(c.req[t])) err.push(id+': Beweglichkeit '+t+c.req[t]); }
  c.triggers.forEach(t => { if(!TRIGGERS.includes(t)) err.push(id+': Auslöser '+t); });
  c.regions.forEach(t => { if(!REGIONS.includes(t)) err.push(id+': Region '+t); });
}
const per = {}; for(const id in CATALOG){ per[CATALOG[id].pattern] = (per[CATALOG[id].pattern]||0)+1; }
PATTERNS.forEach(p => { if(!per[p]) err.push('kein Eintrag für Muster '+p); });
console.log(Object.keys(CATALOG).length+' Übungen · '+PATTERNS.map(p => p+' '+(per[p]||0)).join(', '));
if(err.length){ console.log('FEHLER:\n'+err.join('\n')); process.exit(1); }
console.log('Katalog OK');
