/* Test-Datenbank für tools/test_app.py: simuliert Supabase inkl. Login, Offline (localStorage mockoffline=1) und falsches Passwort (richtig: pw123). */
var supabase = { createClient: function(){
  var store = JSON.parse(localStorage.getItem('mockdb')||'{"sessions":{},"settings":null}');
  function save(){ localStorage.setItem('mockdb', JSON.stringify(store)); }
  var session = JSON.parse(localStorage.getItem('gymlog.auth')||'null');
  function off(){ return localStorage.getItem('mockoffline')==='1'; }
  function netErr(){ return {name:'AuthRetryableFetchError', message:'Failed to fetch'}; }
  function from(t){
    var q={ _op:'select',
      select:function(){ this._op='select'; return this; }, maybeSingle:function(){ return this; },
      eq:function(c,v){ this._eq=v; return this; }, delete:function(){ this._op='delete'; return this; },
      upsert:function(row){ this._op='upsert'; this._row=row; return this; },
      then:function(a,b){ var self=this; return new Promise(function(r){ setTimeout(function(){ r(self._exec()); }, 30); }).then(a,b); },
      _exec:function(){
        if(off()) return {data:null, error:{message:'TypeError: Failed to fetch', code:''}};
        if(!session) return {data:null, error:{code:'PGRST301', message:'JWT expired'}};
        window.__calls=(window.__calls||0)+1;
        if(t==='sessions'){
          if(this._op==='select') return {data:Object.keys(store.sessions).map(function(id){ return {id:id, data:store.sessions[id]}; }), error:null};
          if(this._op==='upsert'){ store.sessions[this._row.id]=this._row.data; save(); return {data:null,error:null}; }
          if(this._op==='delete'){ delete store.sessions[this._eq]; save(); return {data:null,error:null}; }
        }
        if(t==='settings'){
          if(this._op==='select') return {data: store.settings?{data:store.settings}:null, error:null};
          if(this._op==='upsert'){ store.settings=this._row.data; save(); return {data:null,error:null}; }
        }
      } };
    return q;
  }
  return { from: from, auth: {
    getSession: async function(){ if(session && off()) return {data:{session:null}, error:netErr()}; return {data:{session:session}, error:null}; },
    signInWithPassword: async function(c){ if(off()) return {data:{}, error:netErr()}; if(c.password!=='pw123') return {data:{}, error:{code:'invalid_credentials', message:'Invalid login credentials'}}; session={user:{id:'u1', email:c.email}}; localStorage.setItem('gymlog.auth', JSON.stringify(session)); return {data:{user:session.user, session:session}, error:null}; },
    signOut: async function(){ session=null; localStorage.removeItem('gymlog.auth'); return {error:null}; },
    refreshSession: async function(){ return {data:{session:session}, error:null}; }
  } };
} };
