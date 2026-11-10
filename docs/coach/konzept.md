# Coach: Konzept (Entwurf 1, 10.11.2026)

Status: Entwurf zur Freigabe durch Aaron.

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

## 4. Planlogik: vom Profil zum Plan

Die Plan-Erstellung ist eine reine Funktion `Profil + Katalog → Plan`. Gleiches Profil ergibt immer den
gleichen Plan. Das macht sie testbar und nachvollziehbar.

**Schritt 1: Struktur der Woche**

| Tage pro Woche | Aufteilung |
|---|---|
| 1 | 1× Ganzkörper |
| 2 | 2× Ganzkörper (wie heute A/B) |
| 3 | 3× Ganzkörper mit wechselnden Schwerpunkten |
| 4 | 2× Oberkörper, 2× Unterkörper |
| 5 | Oberkörper, Unterkörper, dann Drücken, Ziehen, Beine |
| 6 | 2× Drücken, Ziehen, Beine |

Mit Ausdauersport: Beintage liegen nicht auf Tagen mit harter Ausdauer und nicht am Tag davor. Geht das
nicht auf, kommt Kraft vor Ausdauer in den Tag, mit Hinweis.

**Schritt 2: Volumen**
- Wochensätze pro Muskel nach Erfahrung und Ziel (Abschnitt 3), Schwerpunkt-Muskeln plus 30 %.
- Beine minus 30–50 %, wenn Ausdauer Vorrang hat oder über 4 Stunden pro Woche läuft. In den letzten zwei
  Wochen vor einem Wettkampf nur Erhalt.
- Zeitbudget: Aufwärmen 8 min, Grundübung mit 3 Sätzen rund 9 min, Ergänzung rund 6 min, Supersatz-Paar
  rund 8 min. Reicht die Zeit nicht, wird zuerst gepaart, dann Ergänzungen gekürzt, zuletzt Sätze reduziert.
  Grundmuster fallen nie weg.

**Schritt 3: Bewegungsmuster verteilen**
Jede Woche deckt ab: Kniebeuge, Hüftbeuge, horizontales und vertikales Drücken, horizontales und vertikales
Ziehen, einbeinig, Rumpf. Dazu je nach Profil: hintere Schulter und oberer Rücken (Rundrücken, sitzende
Arbeit), Gesäss und Rumpf gegen Überstreckung (Hohlkreuz), seitlich und Rotation (Spielsport),
Waden und exzentrische Hamstrings (Laufen).

**Schritt 4: Übung pro Platz wählen**
Jede Übung im Katalog bekommt Punkte. Die höchste Punktzahl gewinnt, die nächsten zwei sind die
vorgeschlagenen Alternativen beim Tauschen.
1. Ausschluss: fehlendes Gerät, von der Verletzung ausgelöste Bewegung, verlangte Beweglichkeit fehlt
   (z.B. Überkopf-Test «geht nicht» schliesst Schulterdrücken stehend aus).
2. Punkte: passt zum Ziel, passt zum Niveau (Einsteiger: stabile, leicht lernbare Varianten), trainiert den
   Muskel unter Dehnung, Vorliebe des Nutzers, keine Dopplung in derselben Einheit.
3. Bei «ausgeheilt, aber empfindlich»: Übung bleibt, startet aber mit RIR 3–4 und ohne Sprung beim Gewicht.

**Schritt 5: Aufwärmen**
Allgemein (5 min) plus höchstens drei gezielte Mobility-Übungen aus den Selbsttests und dem Tagesinhalt.

**Schritt 6: Begründung**
Der Plan speichert zu jeder Entscheidung einen Satz: «3 Tage → Ganzkörper», «Schulterdrücken ersetzt durch
Landmine Press, weil der Überkopf-Test knapp war». Diese Sätze zeigt die App unter «Warum dieser Plan?».

## 5. Datenmodell (abwärtskompatibel)

Alles liegt im bestehenden `settings`-Dokument, es braucht keine neue Tabelle.

    settings.profile = { v:1, done:'2026-11-12', goal:'muscle', goal2:null, focus:['glutes'],
      years:3, pauseWeeks:40, skill:{squat:2, hinge:2, push:2, pull:1},
      days:3, minutes:60, weekdays:[1,3,6], equip:'gym', gear:[],
      sports:[{kind:'run', perWeek:2, hours:2, hard:0, race:'2027-04-11'}], priority:'both',
      issues:[{region:'hams', status:'healed', triggers:['sprint']}],
      mobility:{squat:2, overhead:1, toes:2, hipflex:1, wall:1}, work:'sit', posture:['kyphosis','lordosis'],
      like:[], avoid:[], supersets:true }

    settings.plan = { v:1, created:'2026-11-12', source:'coach',
      days:[ { id:'P1', name:'Ganzkörper 1', focus:'Beine, Ziehen',
               warmup:[['5 min locker',''], ...],
               blocks:[ {rest:'main', items:[{key:'P1.squat', group:'squat', ex:'goblet', sets:3, reps:[6,8]}]}, ... ] } ],
      why:[ {topic:'split', text:'3 Tage pro Woche: Ganzkörper mit wechselndem Schwerpunkt.'}, ... ] }

- Die Tage haben dieselbe Form wie die heutigen `PLANS.A` und `PLANS.B`. Der bestehende Code für Einheit,
  Progression, Tauschen und Gewicht finden läuft damit unverändert.
- `session.type` enthält neu die Tages-ID (`P1`, `P2` …). Alte Einheiten mit `A`, `B`, `H` bleiben gültig.
  Die Auswertungs-Views lesen `type` als Text und brauchen keine Änderung.
- Ohne `settings.plan` gilt der Standardplan A/B. Ein Rollback auf 1.4 ignoriert die neuen Felder.
- Planwechsel: Der alte Plan wandert nach `settings.planHistory` (max. 5), der Verlauf pro Übung bleibt,
  weil er an der Übung hängt und nicht am Plan.

## 6. Architektur

- **Katalog und Engine in eigene Dateien.** `index.html` hat heute 200 KB mit 83 Übungen. Mit 200+ Übungen,
  langen Erklärungen und Animationen wird eine Datei unhandlich. Neu:
  - `coach/catalog.js`: Übungsdaten (Attribute, Erklärung, Animationsdaten).
  - `coach/engine.js`: Planlogik als reine Funktionen, in Node testbar (`tools/test_engine.js`).
  - `index.html`: Oberfläche und Logging wie bisher.
- Der Service Worker lädt beide Dateien network-first wie `index.html`, damit Updates ohne Cache-Zähler ankommen.
  Die Vorschau (`build-preview.py`) bettet sie ein.
- **Katalog-Attribute pro Übung:** Muster, Muskeln mit Anteil, Gerät, Niveau (1–3), Stabilität, verlangte
  Beweglichkeit, belastete Regionen und Auslöser (für Ausschlüsse), unter Dehnung ja/nein, Erklärung in drei
  Teilen (Aufbau, Ausführung, häufige Fehler).
- **Animation:** Strichfigur mit Gelenken als SVG. Pro Übung 2–3 Schlüsselposen als Gelenkwinkel, ein kleiner
  Renderer blendet dazwischen. Vorteil: Winkel und Bewegungsbahn sind Daten, die ich gegen die
  Technikbeschreibung prüfen kann. Wenige KB pro Übung, funktioniert offline. Die Qualität entscheidet Aaron
  am Prototyp (P8).

## 7. Grenzen

- Kein Ersatz für Physio oder Arzt. Die App schliesst aus und ersetzt, sie behandelt nicht.
- Die Selbsttests sind grob. Sie steuern die Übungswahl, sie messen nichts.
- Die Zahlen für Volumen und Zeit sind begründete Startwerte. Die spätere Anpassung (P10) korrigiert sie
  anhand der geloggten Daten.
- Ausdauer wird berücksichtigt, aber nicht geplant: Die App erstellt keinen Lauf- oder Radplan.

## 8. Entscheide von Aaron (10.11., 16:54)

- **Aktiver Plan:** Das heutige A/B wird als Trainingsplan geführt und ist der aktive Plan. Das Onboarding
  startet erst, wenn Aaron einen neuen Plan erstellen will. Technisch: A/B wird beim Start als
  `settings.plan` mit `source:'standard'` dargestellt, es gibt nur noch einen Codepfad «aktiver Plan».
- **Ausdauer:** Berücksichtigen reicht vorerst. Ein eigener Lauf- oder Radplan soll später kommen. Das
  Datenmodell hält dafür Platz frei: `plan.days` bekommen ein Feld `kind` (`gym` heute, später `run`, `ride`),
  `profile.sports` speichert schon Umfang, harte Einheiten und Wettkampf.
- **Eigene Dateien** für Katalog und Engine: kein Einwand.
- Onboarding-Umfang: keine Einwände genannt, gilt als angenommen.

## 9. Gewicht finden mit Coach (neu verlangt)

Heute startet «Gewicht finden» bei unbekannten Übungen mit einem festen Startwert. Neu schätzt der Coach
den Start, damit weniger Probesätze nötig sind:
1. **Aus verwandten Übungen:** Gibt es Verlauf in einer Übung desselben Musters (z.B. Goblet Squat bekannt,
   Front Squat neu), wird über die geschätzte Maximalkraft (Epley inkl. RIR, wie heute) und ein
   Übungsverhältnis umgerechnet. Die Verhältnisse sind Erfahrungswerte, keine Studienwerte. Darum startet
   die App 10–15 % darunter und lässt den Probesatz entscheiden.
2. **Aus dem Profil:** Ohne Verlauf ein Startwert nach Erfahrung und Körpergewicht (falls angegeben), bewusst tief.
3. **Nach Pause:** bis 4 Wochen gleiches Gewicht (Kraft bleibt etwa 4 Wochen erhalten, Bosquet et al. 2013,
   bereits in der App), 4–12 Wochen minus 15 %, danach neu finden. Bleibt wie heute.
Sicherheit: Epley und RIR-Umrechnung mittel, Übungsverhältnisse Praxis. Die App sagt das so.

## 10. Der Coach reagiert auf das Leben (neu verlangt)

Ein Plan ist eine Reihenfolge von Einheiten, kein Kalender mit Pflichtterminen. Darauf bauen alle Regeln:

| Situation | Reaktion des Coachs | Grundlage |
|---|---|---|
| Einheit verpasst | Nichts nachholen. Die nächste Einheit ist die verpasste, die Reihenfolge läuft weiter. Bei 2+ verpassten in Folge prüft der Coach, ob weniger Tage pro Woche realistischer sind. | Wochenvolumen zählt, nicht der Wochentag (Abschnitt 3) |
| Einheit verschieben | Frei verschiebbar. Warnung nur, wenn zwei Einheiten mit denselben Muskeln unter 48 h liegen oder ein Beintag auf harte Ausdauer fällt. | Praxis, Schumann 2022 |
| Wenig Zeit heute | Kurzversion: Grundübungen bleiben, Ergänzungen fallen weg oder werden gepaart (gibt es heute schon). | Erhaltungsdosis, Spiering 2021 |
| Ferien oder Reise | Modus «Unterwegs» mit Datum: Erhaltungsplan mit 1–2 kurzen Einheiten pro Woche für das verfügbare Gerät (Hotel-Gym, Körpergewicht) oder bewusst Pause. Danach Rückkehr nach Dauer. | Spiering 2021: Kraft hält mit rund einem Drittel des Volumens, wenn die Intensität bleibt |
| Krank | Fieber oder Symptome unterhalb des Halses (Husten in der Brust, Gliederschmerzen, Magen-Darm): Pause. Nur leichter Schnupfen: lockere Einheit möglich. Rückkehr gestuft: erste Einheit 2 Sätze und RIR 3–4, dann normal. | «Nackenregel», sportmedizinischer Konsens, **Quelle noch zu prüfen** |
| Pause egal aus welchem Grund | bis 2 Wochen: weiter wie vorher. 2–4 Wochen: erste Einheit mit mehr Reserve. Über 4 Wochen: Wiedereinstieg wie heute. | Bosquet 2013, Wiedereinstieg bereits in der App |
| Schlecht geschlafen, Stress, Muskelkater, Schmerz | Check vor der Einheit (gibt es heute): mehr Reserve, Übung ersetzen oder weglassen. | bereits in der App |
| Stagnation oder zu viel | Fortschritts-Check alle 4–6 Wochen: Volumen, Übungswahl oder Entlastungswoche anpassen. | Paket «Anpassung» |

Umsetzung: ein Knopf «Etwas ist dazwischengekommen» auf der Startseite mit diesen Situationen. Jede Reaktion
zeigt ihre Begründung und ändert nie still den Plan.

Quellen:
- Remmert, Pelland, Robinson, Hinson, Zourdos 2025, Per-Session Volume, SportRxiv: https://sportrxiv.org/index.php/server/preprint/download/537/1148/1071
- Currier et al. 2023, Br J Sports Med 57(18):1211: https://bjsm.bmj.com/content/bjsports/57/18/1211.full.pdf
- Schumann et al. 2022, Sports Med: https://link.springer.com/doi/10.1007/s40279-021-01587-7
- Singer et al. 2024, Front Sports Act Living: https://www.frontiersin.org/journals/sports-and-active-living/articles/10.3389/fspor.2024.1429789
- Afonso et al. 2021, Healthcare: https://estudogeral.uc.pt/handle/10316/104612
- Spiering et al. 2021: https://pubmed.ncbi.nlm.nih.gov/33629972/
- Haltung, noch zu prüfen: https://sportsmedicine-open.springeropen.com/counter/pdf/10.1186/s40798-024-00733-5.pdf
