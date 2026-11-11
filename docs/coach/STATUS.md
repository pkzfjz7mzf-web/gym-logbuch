# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 11.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.
- P3c Mobility: 21 Mobility- und Korrekturübungen in `EX` (`mob:true`, `hold:true` = Sekunden) und Katalog (Muster `mob_*`). Engine: `mobNeeds()` aus Selbsttests, Haltung, Alltag. Jeder Tag hat als ersten Block `{mob:true, rest:'short'}` mit 2–4 Übungen, dazu `plan.routine` (Tag `M`, `kind:'mobility'`, ohne Geräte). `test_engine.js` 32 OK.
- P3b Gewichtsschritte pro Übung (App 1.5 Test 1): `settings.steps`, `gridOf`, `snapW`, Sheet «Schritte». `test_app.py` 29 OK.
- P3 Plan-Engine: `coach/engine.js` (`buildPlan`, `standardPlan`). `node tools/test_engine.js`: 25 Tests OK mit 11 Profilen. Aarons Profil ergibt einen Plan mit allen Übungen aus A/B.

## In Arbeit
- P4 Onboarding-UI: noch nicht begonnen.

## Als Nächstes
1. P4 Onboarding-UI in `index.html` (Sheet-Strecke mit 9 Schritten nach konzept.md Abschnitt 2, speichert `settings.profile`). `APP_VERSION` ist bereits 1.5, neue Punkte in den bestehenden CHANGELOG-Eintrag schreiben.
2. P5 Plan in der App: `coach/*.js` laden (Script-Tags in `index.html`, network-first in `sw.js`, einbetten in `build-preview.py` und Testserver in `test_app.py`). `settings.plan` als aktiver Plan, ohne Plan gilt `standardPlan()`. Start-Buttons, Wochenansicht und `PLANS[type]`-Zugriffe auf den aktiven Plan umstellen. Plan-Vorschau nach dem Onboarding mit «Warum dieser Plan?». Fehlende Tauschgruppen in `GROUPS` ergänzen (kneeext, abduct, latiso, chestiso, deltiso, coreflex, alle `mob_*`). Mobility in der App: Block mit `mob:true` als abhakbare Liste darstellen, `hold:true` als Sekunden statt Wdh. anzeigen, Mobility-Übungen aus Fortschritts-Auswahl und Volumen heraushalten, Routine `M` von der Startseite aus startbar. Posture-Wert `head` (Kopf nach vorne) im Onboarding anbieten.
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
