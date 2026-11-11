# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 11.11.2026

## Fertig
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.
- P5 Plan in der App (1.5 Test 5): `syncPlans()` füllt `PLANS` aus `settings.plan` (Tage `P1`…, Routine `M`) oder dem Standard A/B. `isAux`, `planIds`, `warmupOf`, `plateTxt`, `nextType` rotiert über alle Tage. Onboarding endet mit «Plan übernehmen» (`planActivate`, alter Plan in `settings.planHistory`). Einstellungen → Coach: Plan ansehen (`sheetPlan`), zurück zu A/B. Fehlende Tauschgruppen werden aus dem Katalog erzeugt. Haltezeiten als «Sek». `test_app.py` 35 OK.
- P4 Onboarding (App 1.5 Test 3): `coach/*.js` werden geladen (Script-Tags, `sw.js` v3, `build-preview.py` bettet ein). Einstellungen → Coach → «Neuen Plan erstellen»: 9 Schritte (`sheetOb`, `obAction`, Entwurf in `state.ob`), Plan-Vorschau mit «Warum dieser Plan?», speichert `settings.profile` und `settings.planProposal`. `test_app.py` 31 OK.
- P3c Mobility: 21 Mobility- und Korrekturübungen in `EX` (`mob:true`, `hold:true` = Sekunden) und Katalog (Muster `mob_*`). Engine: `mobNeeds()` aus Selbsttests, Haltung, Alltag. Jeder Tag hat als ersten Block `{mob:true, rest:'short'}` mit 2–4 Übungen, dazu `plan.routine` (Tag `M`, `kind:'mobility'`, ohne Geräte). `test_engine.js` 32 OK.
- P3b Gewichtsschritte pro Übung (App 1.5 Test 1): `settings.steps`, `gridOf`, `snapW`, Sheet «Schritte». `test_app.py` 29 OK.
- P3 Plan-Engine: `coach/engine.js` (`buildPlan`, `standardPlan`). `node tools/test_engine.js`: 25 Tests OK mit 11 Profilen. Aarons Profil ergibt einen Plan mit allen Übungen aus A/B.

## In Arbeit
- nichts offen. P5 ist in der Testumgebung (1.5 Test 5), wartet auf Aarons Rückmeldung.

## Als Nächstes
1. Aarons Rückmeldung zu Onboarding und Coach-Plan einarbeiten (Kommentare im Test-Artefakt mit ArtifactComments lesen).
2. Politur P5: Mobility-Block in der Einheit heisst noch «1+2+3+4» statt «Mobility» und zählt in der Nummerierung mit. Mobility-Übungen aus Fortschritts-Auswahl (`ORDER`) und Statistik heraushalten. Kurzversion (`opts.short`: erste drei Blöcke) passt nicht zu Coach-Plänen mit Mobility-Block. Phasen-Text auf der Startseite («Baseline 1× pro Woche») ist auf Aarons A/B gemünzt.
3. P5b Coach reagiert (konzept.md Abschnitt 9 und 10): Knopf «Etwas ist dazwischengekommen», Gewicht finden mit Schätzung aus verwandten Übungen.
4. P6 Katalog erweitern (Waden, Körpergewicht, Bizeps/Trizeps trennen), P7 Erklärungen (Aufbau, Ausführung, Fehler), P8 Animation Prototyp mit 2–3 Übungen.
5. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.
6. Für das Release 1.5: SQL für die 21 Mobility-Übungen in `supabase-setup.sql` und an Aaron. `sw.js` CACHE ist bereits v3. Auswertungs-View `v_einheiten`: `type` enthält neu auch `P1`…, `M`.

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
