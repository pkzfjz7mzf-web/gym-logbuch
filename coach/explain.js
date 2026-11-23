/* Übungserklärungen in drei Teilen: Aufbau, Ausführung, häufige Fehler.
   Reine Beschreibung der Ausführung, keine Aussagen über Wirkung oder Verletzungsschutz
   (Evidenz-Regel, docs/coach/evidenz.md). Fehler werden als Abweichung mit Korrektur beschrieben.
   Fehlt eine Übung, zeigt die App den kurzen Hinweis aus EX (cue).
   Form: id: [Aufbau, Ausführung, [Fehler und Korrektur, …]] */
(function(root){
const EXPLAIN = {
  goblet: [
    'Eine Kurzhantel senkrecht vor der Brust halten, beide Hände unter dem oberen Gewicht. Füsse etwas breiter als schulterbreit, Fussspitzen leicht nach aussen.',
    'Einatmen, Bauch fest. Zwischen die Fersen nach unten setzen, die Ellbogen gehen innen an den Knien vorbei. So tief, wie Fersen und Rücken ruhig bleiben. Über die ganze Fusssohle nach oben drücken, oben ausatmen.',
    ['Fersen heben ab: weniger tief gehen oder die Füsse etwas breiter stellen.', 'Knie fallen nach innen: Knie in Richtung der Fussspitzen schieben.', 'Oberkörper kippt nach vorne: Hantel nah an der Brust halten, Brust hoch.']],
  frontsq: [
    'Langhantel im Rack auf Schulterhöhe. Stange vorne auf den Schultern ablegen, Ellbogen hoch, Finger locker unter der Stange. Einen Schritt zurück, Füsse schulterbreit.',
    'Einatmen, Bauch fest. Gerade nach unten setzen, Ellbogen bleiben hoch. Über die ganze Fusssohle nach oben drücken.',
    ['Ellbogen sinken ab, die Stange rollt nach vorne: Ellbogen aktiv nach oben führen, notfalls weniger Gewicht.', 'Fersen heben ab: weniger tief gehen.', 'Rücken rundet unten: nur so tief gehen, wie der Rücken gerade bleibt.']],
  legpress: [
    'Rücken und Gesäss ganz an der Lehne. Füsse hüftbreit in der Mitte der Plattform, Fussspitzen leicht nach aussen. Sicherung lösen.',
    'Plattform kontrolliert absenken, bis die Knie etwa rechtwinklig oder etwas tiefer gebeugt sind. Über die ganze Fusssohle wegdrücken, oben die Knie nicht ganz durchstrecken.',
    ['Gesäss hebt sich unten von der Lehne: weniger tief absenken.', 'Knie fallen nach innen: Knie in Richtung der Fussspitzen schieben.', 'Knie oben durchgestreckt: kurz vorher stoppen.']],
  rdl: [
    'Langhantel aus dem Rack oder vom Boden aufnehmen, schulterbreiter Griff. Füsse hüftbreit, Knie leicht gebeugt.',
    'Hüfte nach hinten schieben, die Stange gleitet an den Oberschenkeln nach unten. Rücken bleibt gerade, die Knie bleiben gleich gebeugt. Runter, bis die Rückseite der Beine deutlich zieht, meist knapp unter die Knie. Hüfte nach vorne bringen und aufrichten.',
    ['Rücken rundet: weniger tief gehen, bis er gerade bleibt.', 'Stange entfernt sich von den Beinen: Schultern zurück, Stange nah führen.', 'Knie beugen sich immer mehr, es wird eine Kniebeuge: Hüfte bewusst nach hinten, Knie fix halten.']],
  dbrdl: [
    'Je eine Kurzhantel vor den Oberschenkeln, Handflächen zum Körper. Füsse hüftbreit, Knie leicht gebeugt.',
    'Hüfte nach hinten schieben, die Hanteln gleiten nah an den Beinen nach unten. Rücken gerade, Knie gleich gebeugt. Runter, bis die Rückseite der Beine deutlich zieht. Hüfte nach vorne bringen und aufrichten.',
    ['Rücken rundet: weniger tief gehen.', 'Hanteln pendeln nach vorne: nah an den Beinen führen.', 'Bewegung kommt aus den Knien statt aus der Hüfte: Hüfte bewusst nach hinten.']],
  csrow: [
    'Schrägbank auf etwa 30–45°. Bauchlage, Brust oben am Polster, Füsse am Boden. Je eine Kurzhantel, Arme hängen senkrecht.',
    'Zuerst die Schulterblätter nach hinten-unten ziehen, dann die Ellbogen nah am Körper Richtung Hüfte führen. Oben kurz halten, kontrolliert absenken, bis die Arme wieder gestreckt sind.',
    ['Brust hebt vom Polster ab: Gewicht reduzieren, Brust bleibt liegen.', 'Schultern ziehen zu den Ohren: Schultern bewusst tief halten.', 'Nur die Arme ziehen: jede Wiederholung mit den Schulterblättern beginnen.']],
  dbrow: [
    'Eine Hand und das Knie derselben Seite auf der Bank, Rücken waagrecht. Das andere Bein steht. Kurzhantel in der freien Hand, Arm hängt senkrecht.',
    'Ellbogen nah am Körper Richtung Hüfte ziehen, bis die Hantel neben dem Rumpf ist. Kurz halten, kontrolliert absenken. Alle Wiederholungen, dann Seite wechseln.',
    ['Oberkörper dreht auf: Rumpf bleibt waagrecht, Gewicht reduzieren.', 'Ellbogen geht nach aussen: Richtung Hüfte ziehen.', 'Schwung aus den Beinen: langsamer, ganz ruhiger Rumpf.']],
  cablerow: [
    'Am Kabelzug sitzen, Füsse an den Stützen, Knie leicht gebeugt. Griff fassen, Oberkörper aufrecht, Arme gestreckt.',
    'Schulterblätter nach hinten-unten ziehen, dann die Ellbogen nah am Körper nach hinten führen, bis der Griff am Bauch ist. Kontrolliert nach vorne lassen.',
    ['Oberkörper schaukelt vor und zurück: aufrecht bleiben, Gewicht reduzieren.', 'Schultern ziehen hoch: Schultern tief.', 'Arme nicht ganz gestreckt: am Ende vorne ganz lang werden.']],
  incline: [
    'Bank auf etwa 30°. Rücken und Kopf auf der Bank, Füsse fest am Boden. Hanteln über der Brust, Schulterblätter zusammen und nach unten.',
    'Hanteln kontrolliert seitlich bis auf Brusthöhe absenken, Ellbogen etwa 45° vom Körper. Nach oben drücken, bis die Arme fast gestreckt sind.',
    ['Ellbogen ganz zur Seite (90°): Ellbogen etwas näher an den Körper.', 'Gesäss hebt von der Bank: Füsse fest, Gesäss bleibt liegen.', 'Hanteln prallen unten ab: kontrolliert absenken, kurz anhalten.']],
  dbbench: [
    'Flachbank. Rücken und Kopf auf der Bank, Füsse fest am Boden. Hanteln über der Brust, Schulterblätter zusammen und nach unten.',
    'Hanteln kontrolliert seitlich bis auf Brusthöhe absenken, Ellbogen etwa 45° vom Körper. Nach oben drücken, bis die Arme fast gestreckt sind.',
    ['Ellbogen ganz zur Seite: etwas näher an den Körper.', 'Schultern rollen nach vorne: Schulterblätter zusammen lassen.', 'Gesäss hebt ab: Gesäss bleibt auf der Bank.']],
  bss: [
    'Rücken zu einer Bank, etwa eine grosse Schrittlänge davor. Den Rist des hinteren Fusses auf die Bank legen. Kurzhanteln seitlich halten, wenn du Gewicht nimmst.',
    'Senkrecht nach unten gehen, bis das hintere Knie knapp über dem Boden ist. Über die ganze Sohle des vorderen Fusses nach oben drücken. Alle Wiederholungen, dann Seite wechseln.',
    ['Vorderes Knie fällt nach innen: Knie Richtung Fussspitze.', 'Ferse vorne hebt ab: Fuss weiter nach vorne stellen.', 'Wackeln: zuerst ohne Gewicht, Blick auf einen festen Punkt.']],
  splitsq: [
    'Ausfallschrittstellung, beide Füsse hüftbreit nebeneinander, die hintere Ferse ist angehoben. Kurzhanteln seitlich halten.',
    'Senkrecht nach unten gehen, bis das hintere Knie knapp über dem Boden ist. Über den vorderen Fuss nach oben drücken. Die Füsse bleiben stehen. Alle Wiederholungen, dann Seite wechseln.',
    ['Füsse auf einer Linie, Gleichgewicht fehlt: Füsse hüftbreit auseinander.', 'Vorderes Knie fällt nach innen: Knie Richtung Fussspitze.', 'Oberkörper kippt nach vorne: aufrecht bleiben.']],
  facepull: [
    'Kabelzug auf Kopfhöhe, Seilgriff. Daumen zeigen nach hinten, einen Schritt zurück, Arme gestreckt.',
    'Seil Richtung Stirn ziehen, dabei die Hände nach aussen auseinanderführen. Ellbogen bleiben hoch, am Ende zeigen die Fäuste nach oben. Kurz halten, kontrolliert zurück.',
    ['Ellbogen sinken ab: auf Schulterhöhe halten.', 'Oberkörper lehnt sich zurück: Gewicht reduzieren, Rumpf ruhig.', 'Schultern ziehen hoch: Schultern tief.']],
  deadbug: [
    'Rückenlage. Arme senkrecht nach oben, Hüfte und Knie rechtwinklig gebeugt, Unterschenkel waagrecht. Unteren Rücken sanft in den Boden drücken.',
    'Ausatmen und gleichzeitig einen Arm nach hinten und das gegenüberliegende Bein nach vorne strecken. Nur so weit, wie der untere Rücken am Boden bleibt. Zurück und Seite wechseln.',
    ['Unterer Rücken hebt ab: kürzer strecken.', 'Zu schnell: langsam, jede Wiederholung kontrolliert.', 'Luft anhalten: beim Strecken ausatmen.']],
  hipthrust: [
    'Oberer Rücken an einer Bank, knapp unter den Schulterblättern. Langhantel gepolstert über der Hüfte. Füsse hüftbreit, so weit vorne, dass die Unterschenkel oben senkrecht stehen.',
    'Kinn leicht zur Brust, Rippen unten. Becken nach oben drücken, bis Knie, Hüfte und Schultern eine Linie bilden. Oben kurz das Gesäss anspannen, kontrolliert absenken.',
    ['Hohlkreuz oben: Rippen unten, Becken leicht nach hinten kippen.', 'Füsse zu weit weg oder zu nah: so stellen, dass die Unterschenkel oben senkrecht sind.', 'Bewegung nur bis zur Hälfte: ganz nach oben bis zur Linie.']],
  slbridge: [
    'Rückenlage, ein Fuss nah am Gesäss, das andere Bein gestreckt in der Luft oder angewinkelt. Arme seitlich am Boden.',
    'Becken über die Ferse des aufgestellten Fusses nach oben drücken, bis Knie, Hüfte und Schulter eine Linie bilden. Becken bleibt waagrecht. Kontrolliert absenken. Alle Wiederholungen, dann Seite wechseln.',
    ['Becken kippt zur Seite: langsamer, weniger hoch.', 'Hohlkreuz oben: Rippen unten, Gesäss anspannen.', 'Krampf in der Rückseite des Beins: Fuss etwas näher ans Gesäss.']],
  pullup: [
    'An die Klimmzugstange hängen, Hände etwas breiter als schulterbreit, Handflächen nach vorne. Arme gestreckt.',
    'Zuerst die Schulterblätter nach unten ziehen, dann die Brust zur Stange ziehen, bis das Kinn darüber ist. Kontrolliert ablassen, bis die Arme wieder gestreckt sind.',
    ['Schwung aus den Beinen: Beine ruhig, Bauch fest.', 'Nur halbe Bewegung: unten ganz strecken, oben Kinn über die Stange.', 'Schultern ziehen zu den Ohren: jede Wiederholung mit den Schulterblättern beginnen.']],
  pullupA: [
    'An der Klimmzug-Maschine Hilfe einstellen, auf die Knieplatte knien. Hände etwas breiter als schulterbreit, Arme gestreckt.',
    'Schulterblätter nach unten ziehen, dann die Brust zur Stange ziehen, bis das Kinn darüber ist. Kontrolliert ablassen, bis die Arme gestreckt sind.',
    ['Zu viel Hilfe, die Sätze sind zu leicht: Hilfe schrittweise reduzieren.', 'Nur halbe Bewegung: unten ganz strecken.', 'Hohlkreuz: Bauch fest, Becken leicht nach hinten kippen.']],
  latpd: [
    'Am Latzug sitzen, Oberschenkel unter dem Polster. Stange etwas breiter als schulterbreit greifen, Arme gestreckt.',
    'Schulterblätter nach unten ziehen, dann die Stange zur oberen Brust führen, Ellbogen Richtung Hüfte. Oberkörper bleibt fast aufrecht. Kontrolliert nach oben lassen, bis die Arme gestreckt sind.',
    ['Weit nach hinten lehnen: aufrecht bleiben, Gewicht reduzieren.', 'Stange hinter den Kopf: immer vor dem Kopf zur Brust.', 'Oben nicht ganz strecken: Arme oben ganz lang werden lassen.']],
  landmine: [
    'Ende der Landmine-Stange auf Schulterhöhe in einer Hand. Halbkniend, das Knie auf der Seite der Hand am Boden. Gesäss des hinteren Beins angespannt.',
    'Rippen unten, Bauch fest. Stange schräg nach vorne-oben drücken, bis der Arm gestreckt ist. Kontrolliert zur Schulter zurück. Alle Wiederholungen, dann Seite wechseln.',
    ['Hohlkreuz beim Drücken: Gesäss hinten anspannen, Rippen unten.', 'Oberkörper dreht mit: Rumpf ruhig, Gewicht reduzieren.', 'Schulter zieht hoch: Schulter tief halten.']],
  kneelpress: [
    'Halbkniend, eine Kurzhantel auf Schulterhöhe auf der Seite des Knies am Boden. Gesäss des hinteren Beins angespannt.',
    'Rippen unten, Bauch fest. Hantel senkrecht über den Kopf drücken, bis der Arm gestreckt ist. Kontrolliert zurück zur Schulter. Alle Wiederholungen, dann Seite wechseln.',
    ['Hohlkreuz: Gesäss anspannen, Rippen unten.', 'Oberkörper weicht zur Seite aus: Gewicht reduzieren.', 'Hantel geht nach vorne: senkrecht über die Schulter drücken.']],
  nordic: [
    'Kniend auf einer weichen Unterlage, Fersen fest fixiert, zum Beispiel unter einer Sprossenwand oder von einer Person gehalten. Oberkörper aufrecht, Hüfte gestreckt.',
    'Langsam nach vorne kippen, Hüfte bleibt gestreckt, der Körper bleibt eine Linie. So lange bremsen wie möglich. Mit den Händen auffangen, mit leichtem Abstossen zurück in die Startposition.',
    ['Hüfte knickt ein: Gesäss anspannen, Körper eine Linie.', 'Schnelles Fallen nach wenigen Zentimetern: kürzere Bewegung, Hände früher zum Auffangen bereit.', 'Zurück nur mit den Beinen erzwingen: mit den Händen abstossen.']],
  hamslide: [
    'Rückenlage, Fersen auf einem Handtuch oder Socken auf glattem Boden, Knie gebeugt. Becken nach oben drücken.',
    'Becken oben halten und die Fersen langsam nach vorne gleiten lassen, bis die Beine fast gestreckt sind. Fersen wieder zum Gesäss ziehen.',
    ['Becken sinkt ab: Gesäss anspannen, oben bleiben.', 'Zu schnell nach vorne: langsam bremsen.', 'Mit einem Bein zu schwer: zuerst mit beiden Beinen.']],
  legcurl: [
    'Gerät so einstellen, dass das Kniegelenk auf Höhe der Drehachse liegt. Polster knapp über den Fersen.',
    'Fersen Richtung Gesäss ziehen, oben kurz halten, langsam zurücklassen, bis die Beine fast gestreckt sind.',
    ['Hüfte hebt vom Polster ab: Gewicht reduzieren.', 'Ruckartiges Hochziehen: gleichmässig, langsam zurück.', 'Unten nicht ganz strecken: ganzer Bewegungsweg.']],
  latlunge: [
    'Aufrecht stehen, Füsse zusammen. Mit oder ohne Kurzhantel vor der Brust.',
    'Einen grossen Schritt zur Seite machen, das Gewicht auf dieses Bein setzen und die Hüfte nach hinten schieben. Das andere Bein bleibt gestreckt. Vom Boden abdrücken und zurück. Seiten abwechseln oder alle Wiederholungen pro Seite.',
    ['Ferse hebt ab: weniger tief.', 'Knie fällt nach innen: Knie Richtung Fussspitze.', 'Oberkörper rundet: Brust hoch, Hüfte nach hinten.']],
  pallof: [
    'Kabelzug auf Brusthöhe, seitlich dazu stehen. Griff mit beiden Händen vor der Brust, einen Schritt vom Gerät weg, bis das Kabel spannt.',
    'Arme langsam nach vorne strecken. Der Rumpf hält gegen den Zug und dreht nicht mit. Kurz halten, Hände zurück zur Brust. Alle Wiederholungen, dann Seite wechseln.',
    ['Oberkörper dreht zum Gerät: weniger Gewicht oder näher ans Gerät.', 'Hüfte weicht seitlich aus: Gesäss und Bauch fest.', 'Zu schnell: langsam strecken, kurz halten.']],
  curl: [
    'Aufrecht stehen, je eine Kurzhantel, Arme hängen, Handflächen nach vorne.',
    'Hanteln Richtung Schultern beugen, die Ellbogen bleiben am Körper. Oben kurz halten, langsam ablassen, bis die Arme gestreckt sind.',
    ['Schwung aus dem Rücken: Gewicht reduzieren, Oberkörper ruhig.', 'Ellbogen wandern nach vorne: fix an der Seite halten.', 'Unten nicht ganz strecken: ganzer Bewegungsweg.']],
  pushdown: [
    'Kabelzug oben, gerade Stange oder Seil. Aufrecht stehen, Ellbogen am Körper, Unterarme waagrecht.',
    'Griff nach unten drücken, bis die Arme ganz gestreckt sind. Nur die Unterarme bewegen sich. Kontrolliert zurück, bis die Unterarme etwa waagrecht sind.',
    ['Ellbogen wandern nach vorne und hinten: fix an der Seite halten.', 'Oberkörper beugt sich mit: aufrecht bleiben, Gewicht reduzieren.', 'Unten nicht ganz strecken: ganz durchdrücken.']]
};
const api = {EXPLAIN};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_EXPLAIN = api;
})(typeof self !== 'undefined' ? self : this);
