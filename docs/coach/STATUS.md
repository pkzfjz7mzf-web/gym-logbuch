# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 11.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.
- P3b Gewichtsschritte pro Übung (App 1.5 Test 1): `settings.steps`, `gridOf`, `snapW`, Sheet «Schritte». `test_app.py` 29 OK.
- P3 Plan-Engine: `coach/engine.js` (`buildPlan`, `standardPlan`). `node tools/test_engine.js`: 25 Tests OK mit 11 Profilen. Aarons Profil ergibt einen Plan mit allen Übungen aus A/B.

## In Arbeit
- P3c Mobility: noch nicht begonnen. Schritte: (a) Muster `mob_tspine`, `mob_shoulder`, `mob_hipflex`, `mob_hip`, `mob_ankle`, `mob_chain` und Übungen dazu in `EX` (index.html, `load:'reps'` oder Haltezeit, `noRir`) und `coach/catalog.js`, (b) Engine: Mobility-Block pro Tag als erster Block statt nur `warmup`-Text, Auswahl aus Tests, Haltung, Tagesinhalt, (c) Routine für freie Tage als eigener Plan-Tag `kind:'mobility'`, (d) Tests.
- Danach P4 Onboarding-UI.

## Als Nächstes
1. P4 Onboarding-UI in `index.html` (Sheet-Strecke mit 9 Schritten nach konzept.md Abschnitt 2, speichert `settings.profile`). `APP_VERSION` ist bereits 1.5, neue Punkte in den bestehenden CHANGELOG-Eintrag schreiben.
2. P5 Plan in der App: `coach/*.js` laden (Script-Tags in `index.html`, network-first in `sw.js`, einbetten in `build-preview.py` und Testserver in `test_app.py`). `settings.plan` als aktiver Plan, ohne Plan gilt `standardPlan()`. Start-Buttons, Wochenansicht und `PLANS[type]`-Zugriffe auf den aktiven Plan umstellen. Plan-Vorschau nach dem Onboarding mit «Warum dieser Plan?». Fehlende Tauschgruppen in `GROUPS` ergänzen (kneeext, abduct, latiso, chestiso, deltiso, coreflex).
3. P5b Coach reagiert, P6 Katalog erweitern.
4. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.

## Bekannte Schwächen der Engine (für P6 oder später)
- Nur Körpergewicht: Der Katalog hat zu wenig Übungen ohne Gerät (keine Kniebeuge, kein Ziehen ohne Stange). Der Plan zeigt die Lücken ehrlich an. Lösung: Katalog erweitern.
- Waden fehlen ganz, Mobility- und Korrekturübungen ebenfalls.
- «arms» fasst Bizeps und Trizeps zusammen, das Ziel dafür ist zu tief angesetzt. Beim Erweitern trennen.
- Wochentage: Die Engine legt nur die Reihenfolge fest. Die Verteilung auf Wochentage rund um harte Ausdauer ist erst ein Hinweistext.
- Dauer pro Tag ist eine Schätzung (40 s pro Satz, 70 s bei Seitenübungen, Pausen 150/90/45 s, 8 min Aufwärmen).

## Offene Fragen an Aaron
- keine. Konzept ist mit den Entscheiden vom 10.11. (konzept.md Abschnitt 8–10) freigegeben.

## Notizen
- Live ist Version 1.4 (`6687455`). Coach-Arbeit läuft auf Branch `test` als Version 1.5.
- `index.html` hat rund 200 KB. Ob Katalog und Animationen in eigene Dateien kommen, klärt P1.
