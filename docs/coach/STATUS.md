# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 10.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.

## In Arbeit
- P2 Katalog-Schema: noch nicht begonnen.

## Als Nächstes
1. P2: `coach/catalog.js` anlegen. Ansatz mit wenig Risiko: Die Übungen bleiben vorerst in `index.html` (`EX`), der Katalog ergänzt pro Übungs-ID die Coach-Attribute (Muster, Niveau, verlangte Beweglichkeit, Auslöser, unter Dehnung). Prüfskript `tools/check_catalog.js`: jede ID in `EX` hat Attribute und umgekehrt.
2. P3 Plan-Engine in `coach/engine.js` mit `tools/test_engine.js`. Erster Test: Aarons Profil muss einen Plan nahe am heutigen A/B ergeben.
3. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.

## Offene Fragen an Aaron
- keine. Konzept ist mit den Entscheiden vom 10.11. (konzept.md Abschnitt 8–10) freigegeben.

## Notizen
- Live ist Version 1.4 (`6687455`). Coach-Arbeit läuft auf Branch `test` als Version 1.5.
- `index.html` hat rund 200 KB. Ob Katalog und Animationen in eigene Dateien kommen, klärt P1.
