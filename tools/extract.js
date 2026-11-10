// Liest Konstanten (EX, GROUPS, FAMILIES, PLANS ...) aus index.html, ohne die App zu starten.
const fs=require('fs'), path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const js=html.slice(html.lastIndexOf('<script>')+8, html.lastIndexOf('</script>'));
exports.grab=function(name){
  const i=js.indexOf('const '+name+' = '); if(i<0) throw new Error(name+' nicht gefunden');
  const open=js[js.indexOf('=',i)+2], close=open==='{'?'}':']';
  let d=0, j=js.indexOf(open,i);
  for(let k=j;k<js.length;k++){ if(js[k]===open) d++; else if(js[k]===close){ d--; if(!d) return eval('('+js.slice(j,k+1)+')'); } }
};
