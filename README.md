# Gym-Logbuch

Persönliches Trainingslogbuch für Einheit A/B: Progressionsvorschläge, Pausen-Timer, RIR, Verlauf und Fortschritt. Läuft als Web-App auf dem iPhone-Home-Bildschirm und funktioniert auch ohne Empfang.

- **App:** `index.html` (alles in einer Datei), `sw.js` für den Offline-Start, `manifest.webmanifest` für Icon und Vollbild.
- **Daten:** Supabase (Postgres). Einrichtung mit `supabase-setup.sql`. Nur das eigene Konto kann lesen und schreiben (Row Level Security).
- **Verbindung:** `config.js` enthält die Project URL und den Publishable key. Beide sind öffentlich gedacht.
- **Wach halten:** `.github/workflows/keepalive.yml` pingt Supabase täglich, damit das Gratis-Projekt nicht pausiert.

Auswertungen in Supabase: `v_einheiten` (eine Zeile pro Einheit) und `v_saetze` (eine Zeile pro Satz).
