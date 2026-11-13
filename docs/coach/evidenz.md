# Evidenz-Register des Coaches

Aarons Vorgabe vom 13.11.2026: Alles, was Sport direkt betrifft, kommt aus wissenschaftlich relevanten Studien. Keine Faustregeln des Entwicklers.

## Regeln für dieses Register
- Jede sportliche Regel und jede Zahl in `coach/engine.js`, im Onboarding und in der Belastungssteuerung steht hier mit Quelle und Status.
- **Belegt:** Zahl oder Aussage steht so in der Quelle. Bevorzugt Leitlinien und Meta-Analysen, Einzelstudien nur mit Hinweis.
- **Abgeleitet:** Richtung ist belegt, die konkrete Zahl ist innerhalb des belegten Bereichs gewählt. Die Ableitung steht dabei.
- **Offen:** noch nicht gegen Quellen geprüft. Darf nicht als Coach-Aussage in der App stehen, bis geprüft.
- Neue Regeln kommen nur mit Quelle in den Code. Aussagen des Coaches in der App nennen die Quelle.
- Quellen werden vor dem Eintrag gelesen (mindestens Abstract und Resultate), nicht aus dem Gedächtnis zitiert.

## Quellen (gelesen am 13.11.2026)
- **ACSM 2026:** Currier BS, D'Souza AC, Fiatarone Singh MA, et al., Phillips SM. ACSM Position Stand. Resistance Training Prescription for Muscle Function, Hypertrophy, and Physical Performance in Healthy Adults: An Overview of Reviews. Med Sci Sports Exerc. 2026;58(4):851–872. doi:10.1249/MSS.0000000000003897. 137 systematische Reviews.
- **Schumann 2022:** Schumann M, et al. Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function. Sports Med. doi:10.1007/s40279-021-01587-7. Maximalkraft SMD −0.06 (n.s.), Hypertrophie −0.01 (n.s.), Schnellkraft −0.28 (signifikant), in derselben Einheit −0.31, mit mindestens 3 h Abstand kein Effekt. Keine Schwelle für Ausdauerumfang.
- **Petré 2021:** Petré H, et al. Sports Med. 2021;51:991–1010. doi:10.1007/s40279-021-01426-9. Beinkraft bei Trainierten ES −0.35, in derselben Einheit −0.66, mit über 2 h Abstand −0.10 (n.s.). Untrainierte kein Effekt. Die Autoren warnen: der Effekt «dieselbe Einheit» stützt sich vor allem auf eine Studie.
- **Yang 2018:** Front Physiol. 2018;9:725. doi:10.3389/fphys.2018.00725. RCT, 30 junge Männer, 12 Wochen, 3×/Woche: aufeinanderfolgende Tage (24 h) gegen nicht aufeinanderfolgende (48–72 h), kein Unterschied bei Kraft und Körperzusammensetzung. Einzelstudie, Freizeitsportler.
- **Pelland 2024:** Pelland J, et al. The Resistance Training Dose-Response. SportRxiv Preprint v2. Umfang: Dosis-Wirkung mit abnehmendem Ertrag, indirekte Sätze zählen am besten halb. Frequenz: für Hypertrophie vernachlässigbar, für Kraft positiv mit abnehmendem Ertrag. Nur Abstract gelesen, Preprint.

## Belegt
| Regel | Wo | Quelle |
|---|---|---|
| Mindestens 2 Einheiten pro Woche, alle grossen Muskelgruppen | Onboarding Häufigkeit | ACSM 2026 |
| Frequenz ohne Einfluss auf Hypertrophie bei gleichem Umfang (1 bis über 5 Tage) | Onboarding Häufigkeit | ACSM 2026, Pelland 2024 |
| Muskelaufbau: mindestens 10 Sätze pro Muskel und Woche, Dosis-Wirkung, Plateau rund 18–20 | `targetFor` [10,20] | ACSM 2026 |
| Mindestens 2 Sätze pro Übung | Mindestsätze | ACSM 2026 |
| Indirekte Sätze zählen halb | `weeklyVolume` | Pelland 2024 |
| Trainingserfahrung ändert die Empfehlungen kaum | Zielbereich nicht mehr nach Stufe | ACSM 2026 |
| Ausdauer bremst Hypertrophie und Maximalkraft im Schnitt nicht | `why` Ausdauer, Onboarding Vorrang | Schumann 2022 |
| Kraft und Ausdauer mit mindestens 3 h Abstand | `why` Ausdauer, Onboarding Vorrang | Schumann 2022, Petré 2021 |
| Jede Menge Krafttraining wirkt | Coach-Reaktion bei 1 Training | ACSM 2026 |

## Abgeleitet
| Regel | Ableitung |
|---|---|
| Zielbereich ohne Ziel Muskelaufbau: 4–10 Sätze pro Muskel und Woche | ACSM 2026: 2 Einheiten × 2–3 Sätze pro Übung = 4–6. Obergrenze 10 = Beginn des Aufbau-Bereichs. |
| Empfohlene Häufigkeit im Onboarding | Kleinste Zahl ab 2, mit der der Probeplan den Wochenumfang erreicht. Hängt von den Vorlagen der Engine ab. |
| Vorrang Sport: Beine auf Mindestumfang | Entscheidung des Nutzers, keine Notwendigkeit (Schumann 2022). Mindestumfang wie oben. |

## Am 13.11. entfernt, weil nicht belegt oder widerlegt
- Beinumfang ×0.6 ab 4 Stunden Sport pro Woche: keine Quelle nennt eine Schwelle, Schumann 2022 findet keine Interferenz.
- Warnung «4+ Trainings im ersten Jahr sind zu viel»: ACSM 2026 sieht kaum Einfluss von Erfahrung und Frequenz.
- Warnung «Erholung wird knapp neben viel Sport»: keine Quelle.
- Warnung «Ganzkörper an zwei Tagen hintereinander»: Yang 2018 findet keinen Unterschied, ACSM 2026 macht dazu keine Aussage. Betrifft auch Paket N4 (Warnung bei Folgetagen entfällt).
- Zielbereiche nach Trainingsstufe (6–10, 8–14, 10–16) und die Empfehlung «2 für Einsteiger, 3 sonst».

## Offen (Audit E1, noch zu prüfen)
Diese Zahlen und Regeln stammen aus früheren Paketen und sind noch nicht gegen Quellen geprüft:
- `levelOf`: Stufen nach Trainingsjahren (unter 1, unter 3, darüber) und was sie steuern (Übungsschwierigkeit).
- `score`: alle Gewichte der Übungswahl (Grundwert, Stufe, Technik, gedehnte Position, Ziel, Haltung, Vorlieben).
- Wiederholungsbereiche nach Ziel (z.B. Kraft 4–6). ACSM 2026: Kraft ab 80 % 1RM, Hypertrophie unabhängig von der Last (30–100 % 1RM).
- RIR-Ziele (Grundübungen 1–2, Ergänzung 1–3, erstes Mal 3–4). ACSM 2026: 2–3 RIR reichen, bis zum Versagen bringt nicht mehr, genaue RIR-Ziele nicht belegbar.
- Faktor 0.5 für Rumpf, Adduktoren, Arme. Schwerpunkt ×1.3 und +1 Satz.
- Progression 2.5–5 %, Regel «oberes Ende in allen Sätzen».
- Wiedereinstieg: 2 Sätze, 7 oder 14 Tage, Schwelle 4 Wochen Pause für «Gewicht finden».
- Tagesform: +1 RIR bei Muskelkater oder intensivem Vortag. Padel-Folgetag.
- Pausenzeiten und Zeitmodell der Einheit. ACSM 2026: Pausen unter oder über 1 min ohne Einfluss auf Kraft.
- Supersätze (Zeitersparnis, Wirkung).
- Mobility: Auswahl nach Tests, Dosierung, Aussagen zur Haltung (Quelle zur Haltung und «Nackenregel» waren schon als ungeprüft markiert).
- Beschwerden: Ausschluss nach Auslösern, Status-Stufen, Warnzeichen.
- «Gewicht finden»: Schrittweiten, Epley-Schätzung. Geplanter Krafttest N5: Genauigkeit von Wiederholungstests und RIR-Schätzungen.
- Texte in Übungserklärungen und im Changelog mit sportlichen Aussagen.
- Bereits zitierte Quellen aus früheren Paketen (Currier 2023, Singer 2024, Afonso 2021, Spiering 2021, Bosquet 2013, Robinson 2024) nochmals gegen den Volltext prüfen.
