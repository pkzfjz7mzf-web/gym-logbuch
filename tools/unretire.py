import re,sys,json
"""Aufruf: python3 unretire.py spec.json  — spec: {id:{row:'...', ex:{feld:wert} (optional, ersetzt Felder im EX-Objekt per Regex), explain:'js-text'}} und src:{key:label}"""
spec=json.load(open(sys.argv[1],encoding='utf8'))
ix=open('index.html',encoding='utf8').read(); cat=open('coach/catalog.js',encoding='utf8').read(); exp=open('coach/explain.js',encoding='utf8').read()
for k,v in spec.get('src',{}).items():
    if re.search(r"\n  "+k+r":\s*'",exp):
        exp=re.sub(r"(\n  "+k+r":\s*)'[^']*'", lambda m:m.group(1)+json.dumps(v,ensure_ascii=False).replace('"',"'"), exp,1)
    else:
        exp=exp.replace("\n  asca:","\n  "+k+": "+"'"+v+"',\n  asca:",1)
new=[]
for id,d in spec['ex'].items():
    m=re.search(r"\n  "+id+r":\s*\{[^\n]*\},?\n",ix); assert m,id
    line=m.group(0)
    line=line.replace("retired:true, ","")
    for f,val in d.get('set',{}).items():
        js="'"+val+"'" if isinstance(val,str) and not val.startswith('[') else val
        if re.search(r"\b"+f+r":",line):
            line=re.sub(r"\b"+f+r":(\[[^\]]*\]|'[^']*'|[^,}]+)", f+":"+js, line,1)
        else:
            line=line.replace("name:", f+":"+js+", name:",1)
    ix=ix[:m.start()]+line+ix[m.end():]
    if d.get('row'):
        assert not re.search(r"\n  "+id+r":\s*\[",cat),id
        cat=cat.replace("\n};\nconst PATTERNS","\n  ,"+id+": "+d['row']+"\n};\nconst PATTERNS",1)
    new.append("  "+id+": "+d['explain'])
exp=re.sub(r"\]\]\n\};\nconst api", "]],\n"+",\n".join(new)+"\n};\nconst api", exp,1)
# tidy stray comma in catalog
cat=re.sub(r"(\]|\])\n  ,", r"\1,\n  ", cat)
open('index.html','w',encoding='utf8').write(ix); open('coach/catalog.js','w',encoding='utf8').write(cat); open('coach/explain.js','w',encoding='utf8').write(exp)
print('ok',len(new))
