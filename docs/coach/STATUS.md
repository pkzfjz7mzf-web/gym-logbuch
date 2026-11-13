# Coach: Stand

**Zuerst lesen. Nach jedem Paket nachführen.**

Letzte Aktualisierung: 13.11.2026

## Fertig
- E1a Evidenz-Audit Belastungssteuerung (1.5 Test 14, 13.11.): Wiederholungsbereiche, RIR-Ziele, Progression, Pausen, Supersätze, Wochenvolumen geprüft und in evidenz.md eingetragen (Zwei-Quellen-Prinzip wo möglich; Aaron: Zahlen dürfen begründet abgeleitet sein). Geändert: Standardpause Grundübungen 150 → 90 s (gespeicherte Einstellungen bleiben), Engine rechnet die Zeit mit den eingestellten Pausen (`p.rest`, über `obProfile`), «So rechnet die App» neu mit geprüften Quellen und neuem Abschnitt «Wiederholungen».
- Evidenz-Vorgabe (1.5 Test 13, 13.11.): Aaron verlangt, dass alles Sportliche aus Studien kommt, keine Setzungen. Neues Register `docs/coach/evidenz.md` (belegt / abgeleitet / entfernt / offen). N2 überarbeitet: Reaktionen nennen die Quelle (`OB_SRC`, `.ob-src`), Faustregeln entfernt. Engine: Zielbereich nach ACSM 2026 ([10,20] mit Ziel Muskelaufbau, sonst [4,10], nicht mehr nach Stufe), Beinreduktion nur noch bei Vorrang Sport (Mindestumfang statt ×0.6), keine 4-Stunden-Schwelle mehr. Onboarding fragt Dauer vor Häufigkeit; Empfehlung = kleinste Zahl ab 2, mit der der Probeplan den Wochenumfang erreicht.
- N2 Coach reagiert im Onboarding (1.5 Test 12, 13.11.): `obRecDays` markiert die empfohlene Häufigkeit mit Begründung, `obAdvice(o,id)` liefert eine Rückfrage (Callout `.ob-coach`, Knopf «Trotzdem weiter», kein automatisches Weiter) bei: 1 Training mit Ziel Aufbau/Kraft, 4+ Trainings im ersten Jahr oder neben viel Sport, Vorrang Kraft bei über 4 h Sport, Dauer zu kurz (rechnet den Plan probehalber und nennt die Muskeln unter Ziel), Wochentage weniger als Trainings oder direkt hintereinander bei Ganzkörper, Schwerpunkt in einer Region mit Beschwerden. `test_app.py` 42 OK.
- N1 Onboarding als Gespräch (1.5 Test 11, 12.11.): eine Frage pro Bildschirm (`obScreens` liefert die Liste abhängig von den Antworten, `obAnswered`, `obOpts`, `obNone`), nichts vorbelegt, «Weiter» gesperrt bis zur Antwort, Einfachauswahl geht direkt weiter. Drei Kapitel mit eigenem Fortschritt. Mehrere Ziele mit Rangfolge (`profile.goals`, `goal` = erstes; Engine `gw()`: Hauptziel 1, weitere 0.5; Haltung und Athletik bekommen feste Plätze). Erfahrung als Regler (`OB_YEARS`), «letzte 3 Monate durchgehend?» (`steady`), bei Nein setzt «Plan übernehmen» den Wiedereinstieg (7 oder 14 Tage). Wettkampfdatum gestrichen (hatte keine Wirkung). Bestehendes Profil gilt beim Bearbeiten als beantwortet (`state.ob.edit`). `test_app.py` 40 OK, `test_engine.js` OK.
- P0 Setup: Arbeitsplan, Stand-Datei, Regel in CLAUDE.md.
- P1 Konzept: `docs/coach/konzept.md`, inkl. Aarons Entscheide, Gewicht finden mit Coach, Reaktion auf Situationen.
- P2 Katalog-Schema: `coach/catalog.js` mit Attributen für alle 83 Übungen (Muster, Niveau, Beweglichkeit, Auslöser, Regionen, Dehnung). `tools/check_catalog.js` OK. `tools/extract.js` liest Konstanten aus `index.html`.
- P5b Coach reagiert (1.5 Test 6): `sheetLife`/`lifeAction`/`lifeBanner`. Verpasst, verschieben, wenig Zeit (Kurzversion), Ferien/Reise (`settings.away`, Reise-Einheit `T` aus der Engine für Kurzhanteln und Bank), krank (`settings.sick`, danach `settings.comeback='hard'`: 2 Sätze, RIR 3–4). Automatisch `comeback='soft'` (+1 RIR) bei 14–27 Tagen Pause. Mobility-Block heisst «Mobility», Kurzversion zählt ihn nicht mit. `test_app.py` 37 OK. Kommentar-Thread vom 9.11. beantwortet (1.4 live).
- P5 Plan in der App (1.5 Test 5): `syncPlans()` füllt `PLANS` aus `settings.plan` (Tage `P1`…, Routine `M`) oder dem Standard A/B. `isAux`, `planIds`, `warmupOf`, `plateTxt`, `nextType` rotiert über alle Tage. Onboarding endet mit «Plan übernehmen» (`planActivate`, alter Plan in `settings.planHistory`). Einstellungen → Coach: Plan ansehen (`sheetPlan`), zurück zu A/B. Fehlende Tauschgruppen werden aus dem Katalog erzeugt. Haltezeiten als «Sek». `test_app.py` 35 OK.
- P4 Onboarding (App 1.5 Test 3): `coach/*.js` werden geladen (Script-Tags, `sw.js` v3, `build-preview.py` bettet ein). Einstellungen → Coach → «Neuen Plan erstellen»: 9 Schritte (`sheetOb`, `obAction`, Entwurf in `state.ob`), Plan-Vorschau mit «Warum dieser Plan?», speichert `settings.profile` und `settings.planProposal`. `test_app.py` 31 OK.
- P3c Mobility: 21 Mobility- und Korrekturübungen in `EX` (`mob:true`, `hold:true` = Sekunden) und Katalog (Muster `mob_*`). Engine: `mobNeeds()` aus Selbsttests, Haltung, Alltag. Jeder Tag hat als ersten Block `{mob:true, rest:'short'}` mit 2–4 Übungen, dazu `plan.routine` (Tag `M`, `kind:'mobility'`, ohne Geräte). `test_engine.js` 32 OK.
- P3b Gewichtsschritte pro Übung (App 1.5 Test 1): `settings.steps`, `gridOf`, `snapW`, Sheet «Schritte». `test_app.py` 29 OK.
- P3 Plan-Engine: `coach/engine.js` (`buildPlan`, `standardPlan`). `node tools/test_engine.js`: 25 Tests OK mit 11 Profilen. Aarons Profil ergibt einen Plan mit allen Übungen aus A/B.

## In Arbeit
- nichts offen. Stand in der Testumgebung: 1.5 Test 9. Kommentar 11.11. (Thread e7384228): Wochenübersicht zeigte den Coach-Plan nicht. Neu: offene Einheiten als gestrichelte Vorschläge an den üblichen Trainingstagen (`planWeekdays`, Onboarding-Schritt Zeit fragt `weekdays` ab), Zähler «Gym x von n». Kommentar 11.11. (Thread 9f097e4b): Antwortoptionen bei den Grundbewegungen waren zu vage, jetzt drei beobachtbare Stufen pro Bewegung (`OB_SKILL`). Aaron erwartet generell Fragen und Antworten wie von einem echten Coach: übrige Onboarding-Schritte daraufhin prüfen.

## Als Nächstes
**Neu priorisiert am 11.11. abends, siehe konzept.md Abschnitt 12.** Aaron ist mit dem Onboarding unzufrieden («Ein Coach würde nicht vorschlagen, sondern die Bedürfnisse abfragen») und hat eine Referenz-App aufgenommen. Aaron hat am 12.11. mit «weiter» freigegeben. N1 und N2 sind fertig, weiter mit N3.
0. **E1 Evidenz-Audit zuerst (E1a erledigt; als Nächstes E1b: Epley und «Gewicht finden», Wiedereinstieg/Detraining, RIR beim ersten Mal, Nordics; dann E1c: Mobility und Haltung; E1d: Übungswahl `score`, Stufen, Beschwerden):** Liste «Offen» in evidenz.md abarbeiten (Quelle lesen, Regel belegen, ableiten oder entfernen), in kleinen Paketen. Bekannte Schwäche: Auffüllen des Umfangs nutzt freie Zeit nicht aus (2 × 90 min bleibt unter Ziel). Dann N3 Beschwerden auf Körperfigur 0–10 → N4 Wochenplanung → N5 Krafttest beim ersten Mal statt Probesätze → N6 Screening nachholbar. Erst danach die Punkte unten.
1. P5b Rest: Gewicht finden mit Schätzung aus verwandten Übungen (konzept.md Abschnitt 9). Heute startet eine neue Übung mit festem `FIND_START` oder 50 % des früheren Gewichts. Neu: Startwert aus dem e1RM einer Übung desselben Musters mal Verhältnis, minus 10–15 %. Dafür Verhältnis-Tabelle pro Muster in `coach/engine.js` und Aufruf in `findPlan()`.
2. P6 Katalog erweitern: Waden, Körpergewichtsübungen (Kniebeuge, Liegestütz-Varianten, Ziehen ohne Stange), Bizeps und Trizeps als eigene Muskeln statt `arms`. Danach Reise-Modus «ohne Geräte» ergänzen (heute nur Hotel-Gym und Pause).
3. P7 Erklärungen pro Übung in drei Teilen (Aufbau, Ausführung, häufige Fehler) statt einem `cue`. P8 Animation Prototyp mit 2–3 Übungen, Aaron entscheidet über Qualität.
4. Politur: Mobility-Übungen nicht in Statistik und Briefing-Volumen mitzählen. Phasen-Chips auf der Startseite sind auf Aarons Z10 gemünzt.
5. P1-Reste: Quellen zu Haltung und Nackenregel prüfen, Pelland 2024 direkt verlinken.
6. Für das Release 1.5: SQL für die 21 Mobility-Übungen in `supabase-setup.sql` und an Aaron. `sw.js` CACHE ist bereits v3. `type` enthält neu auch `P1`…, `M`, `T`.

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
