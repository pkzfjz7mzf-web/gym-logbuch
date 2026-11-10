# Coach: Konzept (Entwurf 1, 10.11.2026)

Status: Entwurf zur Freigabe durch Aaron. Abschnitte 1–3 fertig, 4–7 folgen im nächsten Commit.

## 1. Leitidee

Die App bleibt ein Logbuch und bekommt davor einen Coach:

    Onboarding → Profil → Plan → Einheit starten → loggen wie heute → Fortschritt → Plan nachführen

- Das Loggen (Sätze, RIR, Timer, Gewicht finden, Check, Tauschen) bleibt unverändert.
- Neu ist, woher die Einheiten kommen: aus einem persönlichen Plan statt aus dem festen A/B.
- Das heutige A/B wird zum «Standardplan». Wer kein Onboarding macht, merkt keinen Unterschied.
- Der Coach ist ein Regelwerk. Jede Entscheidung im Plan zeigt ihre Begründung («Warum?»).

## 2. Onboarding

Ziel: in 5–8 Minuten alles erfahren, was ein guter Coach im Erstgespräch fragt. Jeder Schritt ist
überspringbar (dann gilt ein vorsichtiger Standard) und später in den Einstellungen änderbar.
Eine Änderung am Profil schlägt einen neuen Plan vor, überschreibt aber nie ungefragt.

| # | Schritt | Fragen | Wirkt auf |
|---|---|---|---|
| A | Ziel | Hauptziel: Muskelaufbau, Kraft, allgemeine Fitness, Athletik für eine Sportart, beschwerdefrei und Haltung. Optional Nebenziel und Schwerpunkt-Muskeln (max. 2). | Wiederholungsbereiche, Übungswahl, Volumenverteilung |
| B | Erfahrung | Trainingsjahre mit Gewichten, Dauer der letzten Pause, Sicherheit in den Grundmustern (Kniebeuge, Hüftbeuge, Drücken, Ziehen): sicher, unsicher, nie gemacht. | Volumen, Übungskomplexität, Wiedereinstieg |
| C | Zeit | Tage pro Woche (1–6), Minuten pro Einheit (30, 45, 60, 75, 90), optional feste Wochentage. | Split, Anzahl Übungen, Supersätze |
| D | Equipment | Voll ausgestattetes Gym, Heim-Gym (Auswahl: Kurzhanteln, Langhantel und Rack, Bank, Klimmzugstange, Bänder, Kabelzug), nur Körpergewicht. | Übungsauswahl |
| E | Ausdauer und andere Sportarten | Sportart (Laufen, Rennrad, Schwimmen, Spielsport, andere), Einheiten und Stunden pro Woche, davon harte Einheiten, Wettkampf mit Datum, was hat Vorrang: Kraft, Ausdauer oder beides gleich. | Beinvolumen, Verteilung der Tage, Reihenfolge |
| F | Verletzungen und Beschwerden | Pro Körperregion: Status (akut unter 6 Wochen, in Reha, ausgeheilt aber empfindlich, wiederkehrend), was löst es aus (tiefes Beugen, Überkopf, Drehung, Stossbelastung, Zug), ärztliche Auflagen. | Ausschlüsse, Ersatzübungen, Einstiegslast |
| G | Beweglichkeit | 5 Selbsttests mit Bild, je «geht», «knapp», «geht nicht»: tiefe Hocke mit Fersen am Boden, Arme über Kopf an der Wand, Finger zum Boden, Hüftbeuger-Test im Ausfallschritt, Wand-Engel. | Übungsvarianten, Mobility im Aufwärmen |
| H | Alltag und Haltung | Arbeit: sitzend, stehend, körperlich. Selbst beobachtet: Rundrücken, Hohlkreuz, Kopf nach vorne, nichts. | Gewichtung oberer Rücken, Rumpf, Gesäss |
| I | Vorlieben | Übungen, die du magst oder nicht willst. Supersätze ja oder nein. | Übungsauswahl, Zeitplanung |

Sicherheitsnetz in Schritt F: Bei Warnzeichen (akute Verletzung, Taubheit oder Ausstrahlen, Schmerz in Ruhe
oder nachts, ärztliches Sportverbot) plant die App die betroffene Region nicht und verweist an Physio oder
Arzt. Die App stellt keine Diagnosen.

## 3. Regeln und ihre Belege

Sicherheit: **hoch** = Meta-Analyse stützt die Regel direkt. **mittel** = Meta-Analyse stützt die Richtung,
die konkreten Zahlen sind meine praktische Übersetzung. **Praxis** = Coaching-Standard ohne starke Studienlage.

| Regel im Plan | Beleg | Sicherheit |
|---|---|---|
| Mehr Wochensätze pro Muskel bringen mehr, mit abnehmendem Zusatznutzen. Die App rechnet Sätze «fraktional»: Zielmuskel 1, mitarbeitender Muskel 0.5. | Pelland et al. 2024, Meta-Regression, zitiert in Remmert et al. 2025 | hoch (Richtung), mittel (Zahlen) |
| Zielbereich Wochensätze pro Muskel: Einsteiger 6–10, Fortgeschrittene 10–16, Schwerpunkt-Muskeln am oberen Ende. Das Zeitbudget begrenzt. | abgeleitet aus Pelland 2024 | mittel |
| Pro Einheit pro Muskel begrenzen (Richtwert max. 6–8 Sätze), Rest auf andere Tage verteilen. | Remmert et al. 2025: abnehmender Nutzen pro Einheit, stärker bei Kraft | mittel |
| Jeder Muskel möglichst 2× pro Woche. Für Muskelaufbau zählt vor allem das Volumen, für Kraft hilft häufigeres Üben der Bewegung. | Pelland 2024 (Frequenz: klein bei Hypertrophie, positiv bei Kraft). Currier et al. 2023 | hoch |
| Ziel Kraft: Grundübungen schwerer (3–6 Wdh.). Ziel Muskelaufbau: 6–15 Wdh., Last frei wählbar. Immer mehrere Sätze. | Currier et al. 2023, Netzwerk-Meta-Analyse: höhere Last für Kraft, mehrere Sätze für Hypertrophie, alle Varianten bauen Muskel auf | hoch |
| Reserve (RIR) wie heute: Grundübungen 1–2, Ergänzung 1–3, beim ersten Mal 3–4. | Robinson et al. 2024 (bereits in der App) | hoch |
| Pausen: Grundübungen 2–3 min, Ergänzungen 60–90 s. Supersätze nur mit Gegenspielern oder fremden Muskeln. | Singer et al. 2024: kleiner Vorteil ab über 60 s, kein messbarer Zusatz über 90 s | mittel |
| Ausdauer bremst Muskelaufbau und Maximalkraft nicht. Schnellkraft leidet, vor allem in derselben Einheit. Darum: harte Ausdauer und Beintraining nicht in dieselbe Einheit, wenn möglich nicht am selben Tag. | Schumann et al. 2022, Meta-Analyse | hoch |
| Bei viel Ausdauer oder nahem Wettkampf: Beinvolumen reduzieren, Kraft erhalten statt aufbauen. | Erhaltungsdosis nach Spiering et al. 2021 | mittel |
| Eingeschränkte Beweglichkeit: Krafttraining über den vollen Bewegungsweg verbessert die Beweglichkeit ähnlich wie Dehnen. Also passende Variante wählen und gezielte Mobility ins Aufwärmen. | Afonso et al. 2021, Meta-Analyse (Studien sehr unterschiedlich) | mittel |
| Haltung: gezieltes Kräftigen kann Haltungswinkel etwas verändern. Der Zusammenhang zwischen Haltung und Schmerz ist schwach. Die App formuliert darum «kräftigen und beweglich halten», nicht «Haltung reparieren». | Review in Sports Medicine Open 2024, **noch im Volltext zu prüfen** | offen |
| Vorverletzung: schmerzgeführt belasten, auslösende Bewegungen ersetzen, vorsichtiger Einstieg, dann normal steigern. | Coaching- und Reha-Standard | Praxis |

Quellen:
- Remmert, Pelland, Robinson, Hinson, Zourdos 2025, Per-Session Volume, SportRxiv: https://sportrxiv.org/index.php/server/preprint/download/537/1148/1071
- Currier et al. 2023, Br J Sports Med 57(18):1211: https://bjsm.bmj.com/content/bjsports/57/18/1211.full.pdf
- Schumann et al. 2022, Sports Med: https://link.springer.com/doi/10.1007/s40279-021-01587-7
- Singer et al. 2024, Front Sports Act Living: https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1429789
- Afonso et al. 2021, Healthcare: https://estudogeral.uc.pt/handle/10316/104612
- Spiering et al. 2021: https://pubmed.ncbi.nlm.nih.gov/33629972/
- Haltung, noch zu prüfen: https://sportsmedicine-open.springeropen.com/counter/pdf/10.1186/s40798-024-00733-5.pdf
