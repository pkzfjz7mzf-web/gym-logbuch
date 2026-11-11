# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 11.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.
- P4 Onboarding (App 1.5 Test 3): `coach/*.js` werden geladen (Script-Tags, `sw.js` v3, `build-preview.py` bettet ein). Einstellungen → Coach → «Neuen Plan erstellen»: 9 Schritte (`sheetOb`, `obAction`, Entwurf in `state.ob`), Plan-Vorschau mit «Warum dieser Plan?», speichert `settings.profile` und `settings.planProposal`. `test_app.py` 31 OK.
- P3c Mobility: 21 Mobility- und Korrekturübungen in `EX` (`mob:true`, `hold:true` = Sekunden) und Katalog (Muster `mob_*`). Engine: `mobNeeds()` aus Selbsttests, Haltung, Alltag. Jeder Tag hat als ersten Block `{mob:true, rest:'short'}` mit 2–4 Übungen, dazu `plan.routine` (Tag `M`, `kind:'mobility'`, ohne Geräte). `test_engine.js` 32 OK.
- P3b Gewichtsschritte pro Übung (App 1.5 Test 1): `settings.steps`, `gridOf`, `snapW`, Sheet «Schritte». `test_app.py` 29 OK.
- P3 Plan-Engine: `coach/engine.js` (`buildPlan`, `standardPlan`). `node tools/test_engine.js`: 25 Tests OK mit 11 Profilen. Aarons Profil ergibt einen Plan mit allen Übungen aus A/B.

## In Arbeit
- P5 Plan in der App: noch nicht begonnen.

## Als Nächstes
1. P5 Plan in der App, in dieser Reihenfolge (jeweils committen):
   a) Aktiver Plan: `activePlan()` liefert `settings.plan` oder `COACH.standardPlan(PLANS, WARMUP)`. Alle Zugriffe auf `PLANS[type]`, `typeName`, Start-Buttons, Wochenansicht, «Stattdessen Einheit B», `planItemAny`, Einstellungen «Übungen in Einheit A/B» auf den aktiven Plan umstellen. `session.type` = Tages-ID (`A`/`B` oder `P1`…).
   b) Onboarding-Ergebnis: Knopf «Plan übernehmen» statt «Speichern» (heute speichert er nur `settings.profile` und `settings.planProposal`). Alter Plan nach `settings.planHistory`. In den Einstellungen unter «Coach»: aktiver Plan mit Ansicht, «Warum dieser Plan?», zurück zu A/B.
   c) Mobility in der Einheit: Block `mob:true` als abhakbare Liste, `hold:true` als Sekunden. Mobility aus Fortschritt und Volumen heraushalten. Routine `M` von der Startseite startbar.
   d) Fehlende Tauschgruppen in `GROUPS` (kneeext, abduct, latiso, chestiso, deltiso, coreflex, alle `mob_*`).
2. P5b Coach reagiert (konzept.md Abschnitt 9 und 10), P6 Katalog erweitern (Waden, Körpergewicht), P7 Erklärungen, P8 Animation Prototyp.
3. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.
4. Für das Release 1.5: SQL für die 21 Mobility-Übungen in `supabase-setup.sql` und an Aaron. `sw.js` CACHE ist bereits v3.

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
