# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 10.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.

## In Arbeit
- P3 Plan-Engine: noch nicht begonnen.

## Als Nächstes
1. P3: `coach/engine.js` als reine Funktionen (Profil + Katalog + EX → Plan in der Form von `settings.plan`, siehe konzept.md Abschnitt 4 und 5). Reihenfolge, jeweils committen:
   a) `standardPlan()`: heutiges A/B als Plan-Objekt. b) Wochenstruktur und Musterverteilung. c) Übungswahl mit Ausschlüssen und Punkten. d) Volumen und Zeitbudget. e) Begründungen (`why`).
   Tests in `tools/test_engine.js`: Aarons Profil ergibt einen Plan nahe am heutigen A/B, dazu 4–5 weitere Profile (Einsteiger zuhause, 4 Tage Muskelaufbau, Läufer mit Wettkampf, Schulter empfindlich, 30 min).
2. P4 Onboarding-UI, P5 Plan in der App (dabei `coach/*.js` in `sw.js` und `build-preview.py` einbinden).
3. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.
4. Katalog-Lücken für P6: Waden fehlen ganz, Kniestrecker und Abduktoren haben nur je 1 Übung, Mobility- und Korrekturübungen fehlen.

## Offene Fragen an Aaron
- keine. Konzept ist mit den Entscheiden vom 10.11. (konzept.md Abschnitt 8–10) freigegeben.

## Notizen
- Live ist Version 1.4 (`6687455`). Coach-Arbeit läuft auf Branch `test` als Version 1.5.
- `index.html` hat rund 200 KB. Ob Katalog und Animationen in eigene Dateien kommen, klärt P1.
