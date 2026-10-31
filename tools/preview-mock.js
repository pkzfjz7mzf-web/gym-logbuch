/* Testumgebung: ersetzt Supabase durch eine Demo-Datenbank im Browser.
   Wird nur in die Vorschau (claude.ai-Artefakt) eingebaut, nie in die echte App. */
window.GYM_CONFIG = { supabaseUrl: 'https://demo.invalid', supabaseKey: 'demo' };
(function(){
  var DB_KEY = 'gymlog.preview.db';
  var mem = {};
  function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return mem[k]==null?null:mem[k]; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){ mem[k]=v; } }
  function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} delete mem[k]; }

  function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function ago(n){ var d=new Date(); d.setHours(18,5,0,0); d.setDate(d.getDate()-n); return d; }
  function S(w,r,rir){ return {w:w, r:r, rir:rir, done:true}; }
  function E(ex,key,group,reps,rir,sets){ return {ex:ex, key:key, group:group, plan:{sets:sets.length, reps:reps}, target:{sets:sets.length, reps:reps, rir:rir, w:sets[0].w, perSet:[], action:'hold', reason:'', notes:[]}, sets:sets, skipped:false}; }
  function sess(id, type, n, reentry, blocks, feel, fun, note){
    var st=ago(n);
    return {id:id, v:1, type:type, status:'done', date:ymd(st), startedAt:st.getTime(), endedAt:st.getTime()+(reentry?48:57)*60000,
      reentry:reentry, short:false, check:{energy:2, hams:0, intense:false}, warmup:[true,true,true,true,true], blocks:blocks, feel:feel, fun:fun, note:note||''};
  }
  function A(n, re, w){
    var R=re?[3,4]:[1,2], c=re?2:3;
    function rep(k,f){ var a=[]; for(var i=0;i<k;i++) a.push(f(i)); return a; }
    return [
      {ss:false, rest:'main', items:[E('goblet','A.squat','squat',[6,8],R, rep(c,function(){ return S(w.sq,8,re?3:2); }))]},
      {ss:false, rest:'main', items:[E('rdl','A.hinge','hinge',[6,8],R, rep(c,function(i){ return S(w.rdl,i===2?7:8,re?4:2); }))]},
      {ss:true, rest:'ss', items:[E('csrow','A.row','hrow',[8,12],re?[3,4]:[1,3], rep(c,function(){ return S(w.row,12,2); })), E('incline','A.press','incline',[8,12],re?[3,4]:[1,3], rep(c,function(i){ return S(w.inc,i?9:10,re?3:1); }))]},
      {ss:false, rest:'acc', items:[E('bss','A.single','single',[8,10],re?[3,4]:[1,3], rep(2,function(){ return S(w.bss,10,2); }))]},
      {ss:true, rest:'ss', items:[E('facepull','A.rear','rear',[12,15],re?[3,4]:[1,3], rep(2,function(){ return S(w.fp,15,3); })), E('deadbug','A.core','antiext',[8,8],null, rep(re?2:3,function(){ return {w:null, r:8, rir:null, done:true}; }))]},
      {ss:false, rest:'nordic', opt:'nordicA', items:[E('nordic','X.ecc','eccHam',[3,5],null, rep(2,function(){ return {w:null, r:w.nor, rir:null, done:true}; }))]}
    ];
  }
  function B(n, re, w){
    var R=re?[3,4]:[1,2], c=re?2:3;
    function rep(k,f){ var a=[]; for(var i=0;i<k;i++) a.push(f(i)); return a; }
    return [
      {ss:false, rest:'main', items:[E('hipthrust','B.glute','glute',[6,10],R, rep(c,function(){ return S(w.ht,10,re?3:2); }))]},
      {ss:false, rest:'main', items:[E('pullup','B.pull','vpull',[6,10],R, rep(c,function(i){ return S(0,i?6:7,re?3:1); }))]},
      {ss:true, rest:'ss', items:[E('landmine','B.press','press',[8,10],re?[3,4]:[1,3], rep(c,function(){ return S(w.lm,10,2); })), E('nordic','X.ecc','eccHam',[4,6],null, rep(c,function(){ return {w:null, r:w.nor, rir:null, done:true}; }))]},
      {ss:false, rest:'acc', items:[E('dbrow','B.row','hrow',[10,12],re?[3,4]:[1,3], rep(c,function(){ return S(w.dbr,12,2); }))]},
      {ss:true, rest:'ss', items:[E('latlunge','B.lat','lateral',[8,8],re?[3,4]:[1,3], rep(2,function(){ return S(w.ll,8,3); })), E('pallof','B.rot','antirot',[10,10],[2,3], rep(2,function(){ return S(w.pal,10,3); }))]}
    ];
  }
  function seed(){
    var sessions={};
    var list=[
      sess('demo-a1','A',19,true, A(19,true,{sq:16,rdl:40,row:14,inc:14,bss:8,fp:15,nor:3}),3,4,'Erstes Training nach dem Marathon, alles noch etwas steif.'),
      sess('demo-b1','B',15,true, B(15,true,{ht:50,lm:15,dbr:18,ll:0,pal:10,nor:3}),4,4,''),
      sess('demo-a2','A',8,false, A(8,false,{sq:18,rdl:45,row:16,inc:16,bss:10,fp:17.5,nor:4}),4,5,''),
      sess('demo-b2','B',4,false, B(4,false,{ht:60,lm:17.5,dbr:20,ll:6,pal:12.5,nor:4}),4,4,'Nordics gaben ordentlich Muskelkater.')
    ];
    list.forEach(function(s){ sessions[s.id]=s; });
    return {sessions:sessions, settings:{v:1, swaps:{}, nordicA:true, arms:false, reentry:true, reentryStart:ymd(ago(19)), reentryDays:14, prev:{},
      barKg:20, incBB:2.5, incDB:2, incCable:2.5, incAssist:5, bodyweight:null, rest:{main:150, acc:90, ss:90, nordic:120, short:45}, sound:true}};
  }

  var store;
  try{ store = JSON.parse(lsGet(DB_KEY) || 'null'); }catch(e){ store=null; }
  if(!store){ store = seed(); lsSet(DB_KEY, JSON.stringify(store)); }
  function save(){ lsSet(DB_KEY, JSON.stringify(store)); }
  var session = {user:{id:'demo-user', email:'demo@testumgebung'}};

  window.__resetDemo = function(){
    ['gymlog.preview.db','gymlog.pwa.v1','gymlog.ui','gymlog.auth'].forEach(lsDel);
    try{ sessionStorage.removeItem('gymlog.timer'); }catch(e){}
    location.reload();
  };

  function from(t){
    var q={ _op:'select',
      select:function(){ this._op='select'; return this; }, maybeSingle:function(){ return this; },
      eq:function(c,v){ this._eq=v; return this; }, delete:function(){ this._op='delete'; return this; },
      upsert:function(row){ this._op='upsert'; this._row=row; return this; },
      then:function(a,b){ var self=this; return new Promise(function(r){ setTimeout(function(){ r(self._exec()); }, 60); }).then(a,b); },
      _exec:function(){
        if(t==='sessions'){
          if(this._op==='select') return {data:Object.keys(store.sessions).map(function(id){ return {id:id, data:store.sessions[id]}; }), error:null};
          if(this._op==='upsert'){ store.sessions[this._row.id]=this._row.data; save(); return {data:null, error:null}; }
          if(this._op==='delete'){ delete store.sessions[this._eq]; save(); return {data:null, error:null}; }
        }
        if(t==='settings'){
          if(this._op==='select') return {data: store.settings ? {data:store.settings} : null, error:null};
          if(this._op==='upsert'){ store.settings=this._row.data; save(); return {data:null, error:null}; }
        }
        return {data:null, error:null};
      } };
    return q;
  }
  window.supabase = { createClient: function(){ return { from: from, auth: {
    getSession: async function(){ return {data:{session:session}, error:null}; },
    signInWithPassword: async function(){ return {data:{user:session.user, session:session}, error:null}; },
    signOut: async function(){ return {error:null}; },
    refreshSession: async function(){ return {data:{session:session}, error:null}; }
  } }; } };
})();
