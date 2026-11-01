"""Baut aus index.html die Testversion für das claude.ai-Artefakt.

Gleicher App-Code wie live. Ersetzt werden nur: Supabase durch eine Demo-Datenbank
(tools/preview-mock.js), lokale Schriften durch Google Fonts, Service Worker entfällt.

Aufruf: python3 tools/build-preview.py <ausgabe.html>
"""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / 'index.html').read_text(encoding='utf-8')
mock = (root / 'tools' / 'preview-mock.js').read_text(encoding='utf-8')
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

band = ('<div class="test-band" role="note"><div class="wrap"><span>Testumgebung mit Demo-Daten. '
        'Deine echte App und deine Daten bleiben unberührt. Neu starten:</span>'
        '<button type="button" onclick="window.__resetDemo&&window.__resetDemo(\'history\')">Mit Verlauf</button>'
        '<button type="button" onclick="window.__resetDemo&&window.__resetDemo(\'empty\')">Ohne Verlauf</button></div></div>\n')

page = ('<title>Gym-Logbuch Test</title>\n'
        '<meta name="claude:viewport-fit-sides" content="cover">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&display=swap">\n'
        '<script>\n' + mock + '\n</script>\n'
        '<style>\n' + css + '</style>\n' + band + body.strip() + '\n<script>' + js + '</script>\n')
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(page, encoding='utf-8')
print('Vorschau geschrieben:', out, len(page), 'Zeichen')
