/* Coach-Katalog: Attribute pro Übung für die Planlogik.
   Die Übungen selbst (Name, Gerät, Muskeln, Kurz-Hinweis) stehen vorerst in index.html (EX). Hier steht nur,
   was der Coach zusätzlich wissen muss. Prüfen: node tools/check_catalog.js

   Zeile: id: [Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung]
   - Muster: squat, hinge, single, hpush, vpush, hpull, vpull, glute, kneeflex, kneeext, lateral, abduct,
     rear, latiso, chestiso, deltiso, biceps, triceps, antiext, antirot, coreflex,
     Mobility: mob_tspine, mob_shoulder, mob_neck, mob_hipflex, mob_hip, mob_ankle, mob_chain
   - Niveau: 1 leicht lernbar und stabil · 2 mittlere Technik · 3 anspruchsvoll (Technik, Kraft oder Balance)
   - Beweglichkeit: verlangter Selbsttest und Mindestresultat (1 = «knapp» reicht, 2 = muss «gehen»).
     Tests: squat (tiefe Hocke), overhead (Arme über Kopf), toes (Finger zum Boden), hipflex, wall (Wand-Engel)
   - Auslöser: Bewegungen, die bei Beschwerden oft stören: deepknee (tiefes Kniebeugen), overhead, rotation,
     bend (Vorbeugen unter Last), axial (Last auf der Wirbelsäule), pull (Hängen, Zug an der Schulter),
     pushdeep (Schulter tief gestreckt unter Last), kneel (Knien), wrist (Stütz auf dem Handgelenk)
   - Regionen: was die Übung spürbar belastet: knee, hip, lowback, shoulder, elbow, wrist, hams, adductors
   - Dehnung: 1 = Zielmuskel arbeitet unter Dehnung */
(function(root){
const ROWS = {
  goblet:     ['squat',1,'squat1','deepknee','knee hip',1],
  frontsq:    ['squat',3,'squat2 wall1','deepknee axial','knee hip lowback wrist',1],
  legpress:   ['squat',1,'','deepknee','knee hip',1],
  hacksquat:  ['squat',1,'squat1','deepknee','knee hip',1],
  rdl:        ['hinge',2,'toes1','bend','lowback hams',1],
  dbrdl:      ['hinge',1,'toes1','bend','lowback hams',1],
  slrdl:      ['hinge',3,'toes1','bend','lowback hams',1],
  goodmorning:['hinge',3,'toes1','bend axial','lowback hams',1],
  backext:    ['hinge',1,'','bend','lowback hams',1],
  bss:        ['single',2,'hipflex1','deepknee','knee hip',1],
  revlunge:   ['single',1,'','deepknee','knee hip',1],
  stepup:     ['single',1,'','','knee hip',0],
  splitsq:    ['single',1,'','deepknee','knee hip',1],
  walklunge:  ['single',2,'','deepknee','knee hip',1],
  incline:    ['hpush',1,'','','shoulder elbow',1],
  dbbench:    ['hpush',1,'','','shoulder elbow',1],
  chestpress: ['hpush',1,'','','shoulder elbow',0],
  pushup:     ['hpush',1,'','wrist','shoulder elbow wrist',0],
  bbbench:    ['hpush',2,'','','shoulder elbow wrist',1],
  dips:       ['hpush',3,'','pushdeep','shoulder elbow',1],
  landmine:   ['vpush',1,'','kneel','shoulder elbow',0],
  kneelpress: ['vpush',2,'overhead2','overhead kneel','shoulder elbow',0],
  seatedpress:['vpush',1,'overhead2','overhead','shoulder elbow',0],
  ohp:        ['vpush',3,'overhead2','overhead axial','shoulder elbow lowback',0],
  machpress:  ['vpush',1,'overhead1','overhead','shoulder elbow',0],
  csrow:      ['hpull',1,'','','shoulder elbow',0],
  dbrow:      ['hpull',1,'','','shoulder elbow lowback',0],
  cablerow:   ['hpull',1,'','','shoulder elbow lowback',0],
  machrow:    ['hpull',1,'','','shoulder elbow',0],
  bbrow:      ['hpull',3,'toes1','bend','lowback shoulder elbow',0],
  invrow:     ['hpull',1,'','','shoulder elbow',0],
  pullup:     ['vpull',3,'overhead1','overhead pull','shoulder elbow',1],
  pullupA:    ['vpull',1,'overhead1','overhead pull','shoulder elbow',1],
  chinup:     ['vpull',3,'overhead1','overhead pull','shoulder elbow',1],
  latpd:      ['vpull',1,'overhead1','overhead','shoulder elbow',1],
  latpdn:     ['vpull',1,'overhead1','overhead','shoulder elbow',1],
  hipthrust:  ['glute',2,'','','hip lowback',0],
  bbbridge:   ['glute',1,'','','hip lowback',0],
  slhipthrust:['glute',2,'','','hip',0],
  slbridge:   ['glute',1,'','','hip',0],
  pullthrough:['glute',1,'toes1','bend','hip lowback',1],
  cablekick:  ['glute',1,'','','hip lowback',0],
  nordic:     ['kneeflex',3,'','kneel','hams knee',1],
  legcurl:    ['kneeflex',1,'','','hams knee',0],
  seatcurl:   ['kneeflex',1,'','','hams knee',1],
  hamslide:   ['kneeflex',2,'','','hams knee',0],
  ballcurl:   ['kneeflex',2,'','','hams knee',0],
  legext:     ['kneeext',1,'','','knee',0],
  latlunge:   ['lateral',2,'squat1','deepknee','knee hip adductors',1],
  cossack:    ['lateral',3,'squat2','deepknee','knee hip adductors',1],
  adductor:   ['lateral',1,'','','adductors hip',1],
  copenhagen: ['lateral',3,'','','adductors knee shoulder',0],
  cableadd:   ['lateral',1,'','','adductors hip',0],
  sumosq:     ['lateral',1,'squat1','deepknee','knee hip adductors',1],
  abduction:  ['abduct',1,'','','hip',0],
  facepull:   ['rear',1,'','','shoulder',0],
  revfly:     ['rear',1,'','','shoulder',0],
  pullapart:  ['rear',1,'','','shoulder',0],
  revpec:     ['rear',1,'','','shoulder',0],
  straightarm:['latiso',1,'overhead1','overhead','shoulder',1],
  dbpullover: ['latiso',2,'overhead2','overhead','shoulder',1],
  cablefly:   ['chestiso',1,'','','shoulder',1],
  pecdeck:    ['chestiso',1,'','','shoulder',1],
  dbfly:      ['chestiso',2,'','pushdeep','shoulder',1],
  latraise:   ['deltiso',1,'','','shoulder',0],
  cablelat:   ['deltiso',1,'','','shoulder',1],
  curl:       ['biceps',1,'','','elbow',0],
  hammercurl: ['biceps',1,'','','elbow',0],
  cablecurl:  ['biceps',1,'','','elbow',0],
  inclinecurl:['biceps',1,'','','elbow shoulder',1],
  preacher:   ['biceps',1,'','','elbow',1],
  pushdown:   ['triceps',1,'','','elbow',0],
  ohext:      ['triceps',1,'overhead1','overhead','elbow shoulder',1],
  skull:      ['triceps',1,'','','elbow',1],
  kickback:   ['triceps',1,'','','elbow',0],
  cgbench:    ['triceps',2,'','','shoulder elbow wrist',0],
  deadbug:    ['antiext',1,'','','',0],
  birddog:    ['antiext',1,'','kneel wrist','wrist',0],
  rollout:    ['antiext',3,'overhead1','kneel overhead','lowback shoulder',1],
  pallof:     ['antirot',1,'','','',0],
  chop:       ['antirot',2,'','rotation','lowback',0],
  kneeraise:  ['coreflex',2,'overhead1','pull','shoulder hip',0],
  cablecrunch:['coreflex',1,'','kneel','lowback',0],
  /* Mobility und Korrektur */
  tspineroll: ['mob_tspine',1,'','','',0],
  openbook:   ['mob_tspine',1,'','','',0],
  threadneedle:['mob_tspine',1,'','kneel wrist','',0],
  catcow:     ['mob_tspine',1,'','kneel wrist','',0],
  wallslide:  ['mob_shoulder',1,'','','',0],
  latstretch: ['mob_shoulder',1,'','kneel overhead','',0],
  pecstretch: ['mob_shoulder',1,'','','',0],
  shouldercar:['mob_shoulder',1,'','','',0],
  chintuck:   ['mob_neck',1,'','','',0],
  hipflexstretch:['mob_hipflex',1,'','kneel','',0],
  couchstretch:['mob_hipflex',2,'','kneel deepknee','',0],
  hip9090:    ['mob_hip',1,'','rotation','',0],
  lungerot:   ['mob_hip',1,'','wrist','',0],
  squathold:  ['mob_hip',1,'','deepknee','',0],
  adductorrock:['mob_hip',1,'','kneel wrist','',0],
  figure4:    ['mob_hip',1,'','','',0],
  kneetowall: ['mob_ankle',1,'','','',0],
  calfstretch:['mob_ankle',1,'','','',0],
  legswing:   ['mob_chain',1,'','','',0],
  hamfloss:   ['mob_chain',1,'','','',0],
  inchworm:   ['mob_chain',1,'','wrist bend','',0]
};
const PATTERNS = ['squat','hinge','single','hpush','vpush','hpull','vpull','glute','kneeflex','kneeext','lateral','abduct','rear','latiso','chestiso','deltiso','biceps','triceps','antiext','antirot','coreflex','mob_tspine','mob_shoulder','mob_neck','mob_hipflex','mob_hip','mob_ankle','mob_chain'];
const TESTS = ['squat','overhead','toes','hipflex','wall'];
const TRIGGERS = ['deepknee','overhead','rotation','bend','axial','pull','pushdeep','kneel','wrist'];
const REGIONS = ['knee','hip','lowback','shoulder','elbow','wrist','hams','adductors'];
const words = s => s ? s.split(' ') : [];
const CATALOG = {};
for(const id in ROWS){
  const r = ROWS[id], req = {};
  words(r[2]).forEach(w => { req[w.slice(0,-1)] = +w.slice(-1); });
  CATALOG[id] = {pattern:r[0], level:r[1], req, triggers:words(r[3]), regions:words(r[4]), lengthened:!!r[5]};
}
const api = {CATALOG, PATTERNS, TESTS, TRIGGERS, REGIONS};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_CATALOG = api;
})(typeof self !== 'undefined' ? self : this);
