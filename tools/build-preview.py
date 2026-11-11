"""Baut aus index.html die Testversion für das claude.ai-Artefakt.

Gleicher App-Code wie live. Ersetzt werden nur: Supabase durch eine Demo-Datenbank
(tools/preview-mock.js), lokale Schriften durch Google Fonts, Service Worker entfällt.

Versionskennzeichnung: Weicht index.html vom Live-Stand (origin/main) ab, heisst die Vorschau
«<APP_VERSION> Test n». n zählt bei jeder Änderung an index.html um 1 hoch und beginnt bei einer neuen
APP_VERSION wieder bei 1 (Zähler in tools/test-build.json). Gleicher Stand wie live: «wie live».
Abbruch, wenn index.html von live abweicht, APP_VERSION aber noch der Live-Nummer entspricht.

Aufruf: python3 tools/build-preview.py <ausgabe.html>
"""
import hashlib, json, pathlib, re, subprocess, sys
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'index.html').read_text(encoding='utf-8')

def app_version(html):
    m = re.search(r"const APP_VERSION = '([^']+)'", html)
    return m.group(1) if m else None

ver = app_version(src)
try:
    live = subprocess.run(['git', '-C', str(root), 'show', 'origin/main:index.html'],
                          capture_output=True, text=True, check=True).stdout
except Exception:
    live = None
if live is not None and live == src:
    test_build = None
    band_ver = 'Stand wie live, Version ' + ver
else:
    if live is not None and app_version(live) == ver:
        sys.exit('Abbruch: index.html weicht vom Live-Stand ab, APP_VERSION ist aber noch ' + ver + '. '
                 'Zuerst APP_VERSION auf die nächste Version setzen und oben in CHANGELOG einen Eintrag mit date: null anlegen.')
    state_p = root / 'tools' / 'test-build.json'
    st = json.loads(state_p.read_text(encoding='utf-8')) if state_p.exists() else {}
    sha = hashlib.sha256((src + ''.join((root / 'coach' / f).read_text(encoding='utf-8') for f in ('catalog.js', 'engine.js'))).encode('utf-8')).hexdigest()[:16]
    if st.get('version') != ver:
        build = 1
    elif st.get('sha') != sha:
        build = int(st.get('build', 0)) + 1
    else:
        build = int(st.get('build', 1))
    state_p.write_text(json.dumps({'version': ver, 'build': build, 'sha': sha}, indent=2) + '\n', encoding='utf-8')
    test_build = 'Test ' + str(build)
    band_ver = 'Version ' + ver + ' ' + test_build
mock = (root / 'tools' / 'preview-mock.js').read_text(encoding='utf-8')
coach = ''.join((root / 'coach' / f).read_text(encoding='utf-8') + '\n' for f in ('catalog.js', 'engine.js'))
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else root / 'tools' / 'out' / 'preview.html')

css = src[src.index('<style>') + 7:src.index('</style>')]
css = re.sub(r'@font-face\{[^}]*\}\n', '', css)
css = css.replace('body{margin:0;min-height:100%;padding-top:env(safe-area-inset-top,0px)}', 'body{margin:0;min-height:100%}')
css += """
/* Nur Testumgebung */
.test-band{background:var(--warn-soft);color:var(--warn)}
.test-band .wrap{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;padding-block:8px;font-size:13px;font-weight:600;line-height:1.3}
.test-band span{flex:1 1 220px;min-width:0}
.test-band button{flex:none;min-height:34px;padding:0 12px;border-radius:9px;background:var(--surface);color:var(--fg);font-size:13px;font-weight:600}
"""
body = src[src.index('<div id="app">'):src.rindex('<script>')]
js = src[src.rindex('<script>') + 8:src.rindex('</script>')]
sw = "if('serviceWorker' in navigator){ window.addEventListener('load', ()=>{ navigator.serviceWorker.register('./sw.js').catch(()=>{}); }); }"
assert js.count(sw) == 1, 'Service-Worker-Zeile nicht gefunden'
js = js.replace(sw, '')

band = ('<div class="test-band" role="note"><div class="wrap"><span>Testumgebung · ' + band_ver + '. Demo-Daten, '
        'deine echte App und deine Daten bleiben unberührt. Neu starten:</span>'
        '<button type="button" onclick="window.__resetDemo&&window.__resetDemo(\'history\')">Mit Verlauf</button>'
        '<button type="button" onclick="window.__resetDemo&&window.__resetDemo(\'empty\')">Ohne Verlauf</button></div></div>\n')

page = ('<title>Gym-Logbuch Test</title>\n'
        '<meta name="claude:viewport-fit-sides" content="cover">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap">\n'
        '<script>\n' + ('window.__TEST_BUILD = ' + json.dumps(test_build) + ';\n' if test_build else '') + mock + '\n' + coach + '</script>\n'
        '<style>\n' + css + '</style>\n' + band + body.strip() + '\n<script>' + js + '</script>\n')
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(page, encoding='utf-8')
print('Vorschau geschrieben:', out, len(page), 'Zeichen ·', band_ver)
