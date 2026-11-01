# Gym-Logbuch: Arbeitsweise

Aarons persönliche Trainings-Web-App (Einheit A/B, Progressionsvorschläge, RIR, Pausen-Timer). Texte auf Deutsch, Schweizer Schreibweise (ss statt ß).

## Wo was liegt
- **Live:** https://pkzfjz7mzf-web.github.io/gym-logbuch/ (GitHub Pages aus `main`, Root). Aaron nutzt sie als Home-Bildschirm-App auf dem iPhone.
- **App:** alles in `index.html`. `sw.js` (Offline-Start), `manifest.webmanifest`, `config.js` (Supabase-URL und Publishable key, öffentlich gedacht).
- **Daten:** Supabase-Projekt `acrascmdypdhriuoqobr`. Tabellen `sessions` und `settings` speichern JSON-Dokumente in derselben Form wie die App. Auswertungen: Views `v_einheiten`, `v_saetze`, Tabelle `exercises`. Schema in `supabase-setup.sql` (mehrfach ausführbar). Zugriff nur fürs eigene Konto (RLS).
- **Datenstruktur nur abwärtskompatibel ändern.** Neue Übungen in der App auch in `exercises` nachtragen: SQL an Aaron geben, er führt es im SQL Editor aus.

## Ablauf für Änderungen (so von Aaron gewünscht)
1. Änderung in `index.html` machen.
2. Testversion bauen und ins Test-Artefakt publizieren:
   `python3 tools/build-preview.py <scratchpad>/gym-logbuch-test.html`, dann Artifact publish mit `url` https://claude.ai/artifact/X3JDphg1sVRjPn6FRPhGoV. Gleicher Code wie live, nur mit Demo-Datenbank (`tools/preview-mock.js`).
3. Aaron kommentiert im Artefakt. Kommentare mit ArtifactComments lesen und umsetzen, neu publizieren.
4. **Erst nach Aarons Freigabe live:** `python3 tools/test_app.py` muss komplett OK sein, dann `test` per Fast-Forward in `main` übernehmen und pushen. Pages veröffentlicht in 1–2 Minuten. Prüfen über die Actions-Runs (`pages build and deployment` auf dem neuen Commit).
5. Unfertige Arbeit zwischendurch auf Branch `test` pushen. Der Container ist flüchtig.

## Versionen und Rollback
- Jede Live-Version bekommt eine Nummer: `APP_VERSION` in `index.html` erhöhen und oben in `CHANGELOG` die Änderungen in Aarons Worten ergänzen (kurz, aus Nutzersicht). Die App zeigt sie einmal pro Gerät als «Was ist neu», alle Versionen unter Einstellungen. Den Test in `tools/test_app.py` auf die neue Nummer anpassen.
- Versionen bisher: 1.0 = `713505e`, 1.1 = `7e04ebe`, 1.2 = `b67c662`. Neue Versionen hier nachtragen. Tags lassen sich aus der Session nicht pushen (403).
- Rollback: alten Stand der App-Dateien holen (`git checkout <commit> -- index.html sw.js manifest.webmanifest icons`), als neuen Commit «Rollback auf Version x» in `main` pushen. Kein Force-Push. Weil die Datenstruktur nur abwärtskompatibel wächst, kann die ältere Version die Daten weiter lesen.
- Datenbank: Der Gratis-Tarif von Supabase hat keine automatischen Backups. Sicherung über den CSV-Export in der App.

## Technische Hinweise
- Service Worker: `index.html` und `config.js` network-first, `fonts/`, `icons/`, `vendor/` cache-first. Bei Änderungen an diesen Dateien `CACHE` in `sw.js` hochzählen.
- `.github/workflows/keepalive.yml` pingt Supabase täglich (verhindert Pausieren im Gratis-Tarif) und prüft, dass ohne Login nichts lesbar ist. Manuell starten: `POST /repos/pkzfjz7mzf-web/gym-logbuch/actions/workflows/keepalive.yml/dispatches` mit `Content-Type: application/json` und `{"ref":"main"}`.
- Aus der Claude-Session nicht erreichbar: supabase.co und github.io. Pages-Einstellungen per API gesperrt.
- In der Testumgebung nicht prüfbar: echtes Supabase, Offline-Betrieb, CSV-Export, Home-Bildschirm. Dafür `tools/test_app.py`.
- Commits mit Autor `Claude <noreply@anthropic.com>`.
