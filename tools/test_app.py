"""End-to-End-Test der echten App gegen eine simulierte Supabase (tools/test-mock.js).

Prüft Login, Speichern, Offline-Start über den Service Worker, Nachreichen, Abschliessen, Abmelden.
Aufruf: python3 tools/test_app.py   (braucht Playwright mit Chromium)
"""
import threading, http.server, functools, json, time, shutil, tempfile, pathlib
from playwright.sync_api import sync_playwright
REPO=pathlib.Path(__file__).resolve().parent.parent
import re as _re
APP_VERSION = _re.search(r"const APP_VERSION = '([^']+)'", (REPO/'index.html').read_text(encoding='utf-8')).group(1)
ROOT=tempfile.mkdtemp(prefix='gymtest-')
shutil.copytree(REPO, ROOT, dirs_exist_ok=True, ignore=shutil.ignore_patterns('.git','tools'))
pathlib.Path(ROOT,'config.js').write_text("window.GYM_CONFIG = { supabaseUrl: 'https://mock.supabase.co', supabaseKey: 'sb_publishable_mock' };\n", encoding='utf-8')
shutil.copy(REPO/'tools'/'test-mock.js', pathlib.Path(ROOT,'vendor','supabase.js'))
SP=tempfile.gettempdir()+'/'
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
srv=http.server.ThreadingHTTPServer(('127.0.0.1',8765), functools.partial(Q, directory=ROOT)); threading.Thread(target=srv.serve_forever, daemon=True).start()
res=[]
def ok(name, cond): res.append(('OK  ' if cond else 'FAIL')+' '+name)
with sync_playwright() as p:
    b=p.chromium.launch()
    ctx=b.new_context(viewport={'width':390,'height':844}, device_scale_factor=2)
    pg=ctx.new_page(); errs=[]
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://127.0.0.1:8765/'); pg.wait_for_timeout(600)
    ok('Login-Ansicht beim ersten Start', pg.is_visible('#login-form'))
    pg.fill('#lg-email','aaron@example.ch'); pg.fill('#lg-pw','falsch'); pg.click('#lg-go'); pg.wait_for_timeout(300)
    ok('Falsches Passwort zeigt Fehler', 'stimmt nicht' in pg.inner_text('#lg-err'))
    pg.fill('#lg-pw','pw123'); pg.click('#lg-go'); pg.wait_for_timeout(600)
    ok('Nach Login: Startseite', pg.is_visible('[data-a="start"][data-t="A"]'))
    ok('Was ist neu erscheint nach dem Login, mit Version '+APP_VERSION, pg.is_visible('#sheet') and 'was ist neu' in pg.inner_text('#sheet').lower() and 'version '+APP_VERSION in pg.inner_text('#sheet').lower() and 'version 1.2' in pg.inner_text('#sheet').lower())
    pg.click('#sheet [data-a="sheet-close"]'); pg.wait_for_timeout(150)
    pg.click('[data-a="start"][data-t="A"]')
    ok('Check zeigt Hinweis Gewicht finden', 'Gewicht finden' in pg.inner_text('#sheet'))
    pg.click('text=Ohne Check starten'); pg.click('text=Alles erledigt')
    ok('Goblet startet mit Gewicht finden', pg.is_visible('#find-0-0'))
    # Gewicht finden durchspielen: 12 kg, 8+ -> 18 kg, 3-4 -> gefunden, zählt als Satz 1
    pg.click('#find-0-0 [data-a="fd-rate"][data-v="r8"]'); pg.wait_for_timeout(150)
    ok('Probesatz 2 mit 18 kg', pg.input_value('#in-fw-0-0-0')=='18')
    pg.click('[data-a="tmr-stop"]')
    pg.click('#find-0-0 [data-a="fd-rate"][data-v="r34"]'); pg.wait_for_timeout(200)
    ok('Gefunden: Satz 1 erledigt mit 18 kg, Satz 2 vorbefüllt', pg.input_value('#in-w-0-0-0')=='18' and pg.input_value('#in-w-0-0-1')=='18' and pg.get_attribute('[data-a="done"][data-b="0"][data-i="0"][data-s="0"]','aria-pressed')=='true')
    pg.click('[data-a="fd-undo"][data-b="0"][data-i="0"]'); pg.wait_for_timeout(150)
    ok('Zurücknehmen bringt Probesatz 2 zurück', pg.is_visible('#find-0-0') and pg.input_value('#in-fw-0-0-0')=='18')
    pg.click('#find-0-0 [data-a="fd-rate"][data-v="r34"]'); pg.wait_for_timeout(200)
    pg.click('[data-a="tmr-stop"]')
    if not pg.is_visible('#ex-0-0'): pg.click('[data-a="block-open"][data-b="0"]'); pg.wait_for_timeout(150)
    # Satz 2 als normaler Satz (Satz 1 kommt aus dem Probesatz); Index 1 statt 0 für die alten Prüfungen
    pg.fill('#in-w-0-0-1','18'); pg.keyboard.press('Enter')
    pg.wait_for_timeout(1500)
    db=json.loads(pg.evaluate("localStorage.getItem('mockdb')"))
    sid=list(db['sessions'].keys())
    e0=db['sessions'][sid[0]]['blocks'][0]['items'][0]
    ok('Einheit in Datenbank gespeichert, Probesätze separat', len(sid)==1 and e0['sets'][0]['done'] and e0['sets'][0].get('probe') and len(e0['find']['steps'])==2 and e0['find']['result']==18)
    # Zu schwer: RDL 30 kg mit 0 in Reserve -> weiterer, leichterer Probesatz statt «gefunden»
    if not pg.is_visible('#find-1-0'): pg.click('[data-a="block-open"][data-b="1"]'); pg.wait_for_timeout(150)
    pg.click('#find-1-0 [data-a="fd-rate"][data-v="r0"]'); pg.wait_for_timeout(150)
    ok('Zu schwer: nächster Probesatz mit 27.5 kg, nicht gefunden', pg.is_visible('#find-1-0') and pg.input_value('#in-fw-1-0-0')=='27.5')
    pg.click('[data-a="tmr-stop"]')
    pg.click('#find-1-0 [data-a="fd-rate"][data-v="r34"]'); pg.wait_for_timeout(200)
    ok('Danach im Ziel: gefunden, Probesatz 2 zählt als Satz 1', 'gefunden' in pg.inner_text('#ex-1-0 .sugg').lower() and pg.input_value('#in-w-1-0-0')=='27.5' and pg.get_attribute('[data-a="done"][data-b="1"][data-i="0"][data-s="0"]','aria-pressed')=='true')
    pg.click('[data-a="tmr-stop"]')
    # Weniger Wdh. als geplant zählen mit: Rudern 12 kg × 1 mit 0 in Reserve -> 8 kg statt 10 kg
    if not pg.is_visible('#find-2-0'): pg.click('[data-a="block-open"][data-b="2"]'); pg.wait_for_timeout(150)
    pg.fill('#in-fr-2-0-0','1'); pg.keyboard.press('Enter'); pg.wait_for_timeout(100)
    pg.click('#find-2-0 [data-a="fd-rate"][data-v="r0"]'); pg.wait_for_timeout(150)
    ok('Nur 1 Wdh. geschafft: nächster Probesatz 8 kg, wieder 8 Wdh. geplant', pg.input_value('#in-fw-2-0-0')=='8' and pg.input_value('#in-fr-2-0-0')=='8')
    pg.click('[data-a="tmr-stop"]'); pg.click('#find-2-0 [data-a="fd-undo"]'); pg.wait_for_timeout(150)
    ok('Einstellungen in Datenbank (Wiedereinstieg-Start)', db['settings'] is not None and db['settings'].get('reentryStart') is not None)
    ok('Kein Warnhinweis in der Einheit', pg.inner_text('#sync-mini')=='')
    # Service Worker bereit?
    pg.wait_for_timeout(800)
    sw=pg.evaluate("navigator.serviceWorker.controller ? 'ctrl' : 'none'")
    if sw=='none':
        pg.reload(); pg.wait_for_timeout(1000)
    ok('Service Worker aktiv', pg.evaluate("!!navigator.serviceWorker.controller"))
    # Offline: Seite neu laden, Satz abhaken
    pg.evaluate("localStorage.setItem('mockoffline','1')"); ctx.set_offline(True)
    pg.reload(); pg.wait_for_timeout(1200)
    ok('Offline: App startet aus dem Cache in der laufenden Einheit', pg.is_visible('#ex-0-0') or pg.is_visible('[data-a="block-open"]'))
    if not pg.is_visible('#ex-0-0'):
        pg.click('[data-a="block-open"][data-b="0"]')
    pg.click('[data-a="done"][data-b="0"][data-i="0"][data-s="1"]'); pg.wait_for_timeout(1200)
    top=pg.inner_text('#sync-mini')
    ok('Offline-Hinweis in der Einheit: '+top, 'Offline' in top and 'offen' in top)
    db=json.loads(pg.evaluate("localStorage.getItem('mockdb')"))
    ok('Offline: Datenbank noch alt', not db['sessions'][sid[0]]['blocks'][0]['items'][0]['sets'][1]['done'])
    # Wieder online
    ctx.set_offline(False); pg.evaluate("localStorage.removeItem('mockoffline'); window.dispatchEvent(new Event('online'))"); pg.wait_for_timeout(2500)
    db=json.loads(pg.evaluate("localStorage.getItem('mockdb')"))
    ok('Online: nachgereicht', db['sessions'][sid[0]]['blocks'][0]['items'][0]['sets'][1]['done'])
    ok('Hinweis wieder weg', pg.inner_text('#sync-mini')=='')
    # Abschliessen + Abmelden
    pg.click('[data-a="sess-finish"]'); pg.click('[data-a="fin-feel"][data-v="4"]'); pg.click('[data-a="fin-save"]'); pg.wait_for_timeout(1200)
    db=json.loads(pg.evaluate("localStorage.getItem('mockdb')"))
    ok('Abgeschlossen in DB', db['sessions'][sid[0]]['status']=='done' and db['sessions'][sid[0]]['feel']==4)
    pg.click('[data-a="tab"][data-v="home"]'); pg.wait_for_timeout(200)
    ok('Startseite: Status Gespeichert', 'Gespeichert' in pg.inner_text('#top'))
    pg.click('[data-a="tab"][data-v="settings"]'); pg.click('[data-a="logout"]'); pg.click('[data-a="confirm-ok"]'); pg.wait_for_timeout(400)
    ok('Abmelden: Login sichtbar, lokale Kopie leer', pg.is_visible('#login-form') and pg.evaluate("localStorage.getItem('gymlog.pwa.v1')") is None)
    # Neu anmelden: Daten kommen aus DB zurück
    pg.fill('#lg-email','aaron@example.ch'); pg.fill('#lg-pw','pw123'); pg.click('#lg-go'); pg.wait_for_timeout(800)
    ok('Was ist neu kommt nicht ein zweites Mal', not pg.is_visible('#sheet'))
    pg.click('[data-a="tab"][data-v="settings"]'); pg.click('[data-a="news-open"]'); pg.wait_for_timeout(150)
    ok('Einstellungen: alle Versionen', 'version 1.0' in pg.inner_text('#sheet').lower()); pg.click('#sheet [data-a="sheet-close"]'); pg.wait_for_timeout(150)
    pg.click('[data-a="tab"][data-v="history"]'); pg.wait_for_timeout(200)
    ok('Nach erneutem Login: Verlauf aus DB', pg.locator('[data-a="open-detail"]').count()==1)
    print('\n'.join(res)); print('Fehler:', errs or 'keine')
    b.close()
srv.shutdown()
