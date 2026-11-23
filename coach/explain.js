/* Übungserklärungen in drei Teilen: Aufbau, Ausführung, häufige Fehler, dazu die Quellen.
   Evidenz-Pflicht (docs/coach/evidenz.md): Nur was in den gelesenen Quellen steht. Technikquellen sind
   Fachverbände (NSCA, NASM, ACE) und Technikartikel. Aussagen über Verletzungsrisiko aus diesen Seiten
   werden nicht übernommen, weil sie dort ohne Beleg stehen. Fehler stehen als Abweichung mit Korrektur.
   Fehlt eine Übung, zeigt die App den kurzen Hinweis aus EX (cue).
   Form: id: [Aufbau, Ausführung, [Fehler und Korrektur, …], [Quellen]] */
(function(root){
const SRC = {
  nsca: 'NSCA, Exercise Technique Manual for Resistance Training, 3. Aufl. (Auszug Kinetic Select)',
  nasm: 'NASM Exercise Library',
  ace: 'ACE Exercise Library'
};
const EXPLAIN = {
  goblet: [
    'Füsse etwa hüft- bis schulterbreit. Eine Kurzhantel senkrecht vor der Brust halten, beide Hände oben am Gewicht. Ellbogen nah an den Rippen.',
    'Bauch anspannen, Oberkörper aufrecht. Hüfte und Knie beugen und kontrolliert nach unten gehen, Brust bleibt oben, die Hantel bleibt an der Brust. Mindestens bis die Oberschenkel etwa waagrecht sind, tiefer, wenn es die Beweglichkeit zulässt. Beide Füsse in den Boden drücken und aufrichten.',
    ['Knie fallen nach innen: Knie in Richtung der Fussspitzen führen.', 'Oberkörper kippt stark nach vorne oder die Hantel wandert weg: Brust hoch, Hantel an der Brust halten.', 'Zu wenig tief: bis mindestens waagrechte Oberschenkel.', 'Ruckartig: gleichmässig und kontrolliert.'],
    ['nasm','ace']],
  rdl: [
    'Langhantel im geschlossenen Obergriff, etwas breiter als schulterbreit. Füsse hüftbreit, die Stange liegt an den Oberschenkeln. Knie leicht gebeugt, Rücken neutral, Arme gestreckt und locker.',
    'Langsam absenken: Hüfte nach hinten schieben, die Knie bleiben gleich leicht gebeugt. Die Schultern bleiben über oder vor der Stange, die Stange so nah wie möglich am Körper. Runter bis knapp unter die Knie oder bis zur Mitte des Schienbeins, aber nur so weit, wie der Rücken neutral bleibt. Hüfte nach vorne bringen und aufrichten, die Stange bleibt nah.',
    ['Rücken rundet: weniger tief gehen, bis er neutral bleibt, notfalls weniger Gewicht.', 'Knie beugen sich immer mehr, es wird eine Kniebeuge: Knie fix lassen, Hüfte nach hinten.', 'Stange entfernt sich vom Körper: nah an den Beinen führen.', 'Ruckartig oder mit Schwung: langsam und kontrolliert.'],
    ['nsca','nasm']],
  incline: [
    'Schrägbank auf höchstens 45°. Rücken an der Lehne, beide Füsse flach am Boden, etwas breiter als die Schultern. Hanteln auf Brusthöhe, Ellbogen etwa 45° vom Körper.',
    'Bauch fest, Schulterblätter nach hinten, Rücken neutral. Hanteln kontrolliert nach oben und leicht nach vorne drücken, die Ellbogen oben nicht ganz durchstrecken. Kontrolliert zurück auf Brusthöhe, knapp bevor die Hanteln die Brust berühren.',
    ['Bank steiler als 45°: flacher stellen.', 'Ellbogen zu weit vom Körper oder ganz angelegt: etwa 45°.', 'Hanteln fallen schnell nach unten oder federn ab: kontrolliert absenken.', 'Starkes Hohlkreuz, um mehr zu schaffen: Gewicht reduzieren.', 'Ellbogen oben durchgestreckt: kurz vorher stoppen.'],
    ['nasm']],
  bss: [
    'Mit dem Rücken zu einer Bank oder Box etwa auf Kniehöhe stehen. Den Rist des hinteren Fusses auf die Bank legen. Das Gewicht liegt auf dem vorderen Fuss. Mit einer Kurzhantel senkrecht vor der Brust oder ohne Gewicht.',
    'Rücken gerade, Brust oben. Vorderes Knie und Hüfte beugen und nach unten gehen, bis der vordere Oberschenkel etwa waagrecht ist und das hintere Knie kurz vor dem Boden. Über den vorderen Fuss nach oben drücken. Alle Wiederholungen auf einer Seite, dann wechseln.',
    ['Vorderes Knie fällt nach innen: Knie in Richtung der Fussspitze.', 'Oberkörper kippt stark nach vorne: Brust hoch, Gewicht auf dem vorderen Bein.', 'Zu wenig tief: bis der vordere Oberschenkel etwa waagrecht ist.', 'Gleichgewicht geht verloren: weniger oder kein Gewicht.'],
    ['nasm','ace']]
};
const api = {EXPLAIN, SRC};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_EXPLAIN = api;
})(typeof self !== 'undefined' ? self : this);
