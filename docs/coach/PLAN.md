# Coach: Arbeitsplan

Ziel bis 16.11.2026: Aus dem Gym-Logbuch wird ein Coach. Das Loggen der Einheiten bleibt wie heute erhalten.
Auftrag von Aaron (10.11.): Onboarding, personalisierter Trainingsplan nach Studienlage, grosser Übungskatalog
mit präziser Erklärung und Visualisierung, Berücksichtigung von Vorverletzungen, Haltung, Beweglichkeit und
Ausdauersport, später laufende Anpassung.

## Entscheidungen (von Aaron bestätigt, 10.11.)
- Nutzer: vorerst nur Aaron, evtl. später Freunde. Kein Produkt, keine Konten-Verwaltung nötig.
- Coach ist ein Regelwerk in der App (gratis, offline, nachvollziehbar). Keine KI in der App.
- Priorität bei Zeitnot: 1. personalisierter Plan, 2. Übungskatalog mit Visualisierung. Laufende Anpassung danach.
- Visualisierung: schematische animierte Figuren. Zuerst Prototyp mit 2–3 Übungen, Aaron entscheidet über Qualität.
- Verletzungen: abfragen, Übungen ausschliessen/ersetzen, Korrekturübungen einplanen. Keine Diagnosen,
  bei Warnzeichen Verweis an Physio/Arzt.
- Umfang ist für 6 Tage gross: Was nicht fertig wird, bleibt hier dokumentiert.

## Arbeitsweise (limit-sicher)
- Kleine, abgeschlossene Pakete. Nach jedem Paket: committen, auf `test` pushen, `STATUS.md` nachführen.
- Jede Session liest zuerst `docs/coach/STATUS.md` und macht dort weiter.
- Grosse Dateien stückweise schreiben und zwischendurch committen, nie ein Paket nur im Kopf halten.
- Fable für Konzept, Planlogik, Regeln, Katalog. Routinearbeit kann das normale Modell machen.
- Sonst gilt CLAUDE.md: Test-Artefakt, Freigabe durch Aaron, dann live. Versionen nur pro Release.

## Pakete
| # | Paket | Ergebnis | Abnahme |
|---|---|---|---|
| P0 | Setup | PLAN.md, STATUS.md, Regel in CLAUDE.md | erledigt, wenn gepusht |
| P1 | Konzept | `konzept.md`: Onboarding-Fragen, Datenmodell, Planlogik mit Quellen, Architektur | Aaron liest und gibt frei |
| P2 | Katalog-Schema | Attribute pro Übung (Muster, Muskeln, Gerät, Niveau, Anforderungen, Ausschlüsse), bestehende 83 Übungen nachgeführt | Prüfskript OK |
| P3 | Plan-Engine | reine Funktion Profil → Plan, mit Node-Tests für typische Profile | Tests OK |
| P4 | Onboarding-UI | Fragenstrecke in der Testumgebung, speichert Profil | Aaron testet |
| P5 | Plan in der App | Plan-Ansicht, Einheiten aus dem Plan starten und loggen, bestehendes A/B bleibt als Standardplan | Aaron testet, test_app OK |
| P6 | Katalog erweitern | weitere Übungen inkl. Korrektur- und Mobility-Übungen | Prüfskript OK |
| P7 | Übungserklärungen | pro Übung: Aufbau, Ausführung, häufige Fehler | Stichprobe durch Aaron |
| P8 | Visualisierung Prototyp | 2–3 animierte Übungen | Aaron entscheidet über Qualität |
| P9 | Visualisierung Rollout | Animationen für den Katalog, nach Priorität | laufend |
| P10 | Anpassung | Fortschritts-Check, Plan nachführen | nach 16.11. möglich |

Ausdauersport (Laufen, Rennrad) ist kein eigenes Paket: Er fliesst in P1 (Fragen, Regeln) und P3 (Planung) ein.
