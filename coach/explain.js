/* Übungserklärungen in drei Teilen: Aufbau, Ausführung, häufige Fehler, dazu die Quellen.
   Evidenz-Pflicht (docs/coach/evidenz.md): Nur was in den gelesenen Quellen steht. Technikquellen sind
   Fachverbände (NSCA, NASM, ACE) und Technikartikel. Aussagen über Verletzungsrisiko aus diesen Seiten
   werden nicht übernommen, weil sie dort ohne Beleg stehen. Fehler stehen als Abweichung mit Korrektur.
   Fehlt eine Übung, zeigt die App den kurzen Hinweis aus EX (cue).
   Form: id: [Aufbau, Ausführung, [Fehler und Korrektur, …], [Quellen]] */
(function(root){
const SRC = {
  nsca: 'NSCA, Exercise Technique Manual for Resistance Training, 3. Aufl. (Auszug Kinetic Select)',
  nsca4: 'NSCA, Exercise Technique Manual for Resistance Training, 4. Aufl. (Auszug Human Kinetics)',
  nscab: 'NSCA, Basics of Strength and Conditioning Manual (Sands, Wurth, Hewit 2012)',
  nasm: 'NASM (Exercise Library und Fachblog)',
  ace: 'ACE (Exercise Library und Fachartikel)',
  hkbrown: 'Brown, Lower Body Training, Human Kinetics (Auszug)',
  harvard: 'Harvard Health Publishing (Solan, 2025, fachlich geprüft durch Physiotherapie)',
  acekovar: 'Kovar, Top Exercises to Gain Thoracic Mobility, ACE Fachartikel',
  asca: 'Snarr, Esco (2013): Exercise Technique: Inverted Row. Journal of Australian Strength and Conditioning 21(4)',
  nscaptq: 'Lincoln, Ill, Ibrahim (2023): Progressive Strategies for Teaching Fundamental Resistance Training Movement Patterns. NSCA Personal Training Quarterly 10(2)'
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
    ['nscab','nasm']],
  bss: [
    'Mit dem Rücken zu einer Bank oder Box etwa auf Kniehöhe stehen. Den Rist des hinteren Fusses auf die Bank legen. Das Gewicht liegt auf dem vorderen Fuss. Mit einer Kurzhantel senkrecht vor der Brust oder ohne Gewicht.',
    'Rücken gerade, Brust oben. Vorderes Knie und Hüfte beugen und nach unten gehen, bis der vordere Oberschenkel etwa waagrecht ist und das hintere Knie kurz vor dem Boden. Über den vorderen Fuss nach oben drücken. Alle Wiederholungen auf einer Seite, dann wechseln.',
    ['Vorderes Knie fällt nach innen: Knie in Richtung der Fussspitze.', 'Oberkörper kippt stark nach vorne: Brust hoch, Gewicht auf dem vorderen Bein.', 'Zu wenig tief: bis der vordere Oberschenkel etwa waagrecht ist.', 'Gleichgewicht geht verloren: weniger oder kein Gewicht.'],
    ['nasm','ace']],
  facepull: [
    'Seilgriff am Kabelzug etwa auf Augenhöhe. Seil im Obergriff fassen und zurücktreten, bis das Kabel gespannt ist. Arme gestreckt vor dem Gesicht, Ellbogen zeigen nach aussen. Füsse parallel etwa schulterbreit, Knie leicht gebeugt, Oberkörper aufrecht, Kopf in Linie mit der Wirbelsäule.',
    'Bauch fest, Schultern nach hinten-unten. Zuerst die Schulterblätter zusammenziehen, die Arme bleiben noch gestreckt. Dann das Seil zum Gesicht ziehen, die Ellbogen gehen nach hinten-aussen. Sind die Oberarme seitlich auf Schulterhöhe, die Arme nach aussen drehen, bis die Mitte des Seils nahe am Gesicht ist. Kontrolliert in umgekehrter Reihenfolge zurück, der Körper bleibt ruhig.',
    ['Zu viel Gewicht, die Bewegung wird kürzer: weniger Gewicht, volle Bewegung.', 'Ziehen nur aus den Armen: mit den Schulterblättern beginnen.', 'Schultern ziehen hoch: Schultern unten lassen.', 'Ruckartig: gleichmässig und kontrolliert.'],
    ['nsca','nasm']],
  pullup: [
    'Stange im Obergriff, etwas breiter als schulterbreit. Ganz hängen: Ellbogen und Hüfte gestreckt, Knie leicht gebeugt, Füsse gekreuzt. Bauch anspannen, damit kein Hohlkreuz entsteht.',
    'Schulterblätter nach hinten-unten ziehen und die Ellbogen nach unten führen. Hochziehen, bis das Kinn über der Stange ist. Kontrolliert zurück in den ganzen Hang.',
    ['Schwung oder Kipping: Körper und Beine ruhig halten.', 'Ziehen nur aus den Armen: zuerst die Schulterblätter nach unten.', 'Nicht ganz hoch oder nicht ganz runter: Kinn über die Stange, unten die Arme ganz strecken.'],
    ['nscab','nasm']],
  latpd: [
    'Oberschenkelpolster so einstellen, dass es die Beine fest am Sitz hält. Stange im Obergriff, etwas breiter als schulterbreit, Arme gestreckt. Brust hoch, Rücken flach, Bauch fest, Kopf in Linie mit der Wirbelsäule. Leicht nach hinten lehnen ist in Ordnung, höchstens etwa 30°.',
    'Zuerst die Schulterblätter nach unten-hinten ziehen, dann die Ellbogen gerade nach unten Richtung Rippen führen und die Stange zur oberen Brust ziehen. Stoppen, wenn die Stange die Brust fast berührt oder die Ellbogen nicht mehr nach unten, sondern nach hinten gehen. Langsam zurück, bis die Arme gestreckt sind.',
    ['Mit Zurücklehnen starten oder schwingen: Oberkörper ruhig, die Neigung bleibt gleich.', 'Schultern hochgezogen: zuerst die Schulterblätter nach unten.', 'Ziehen nur aus den Armen: Ellbogen nach unten führen.', 'Kopf schiebt bei Ermüdung nach vorne: Kopf in Linie lassen.', 'Stange hinter den Nacken: vor dem Körper zur Brust ziehen.'],
    ['nscab','ace','nasm']],
  latraise: [
    'Aufrecht stehen, in jeder Hand eine Kurzhantel, Arme hängen seitlich. Füsse hüftbreit, Knie leicht gebeugt, Schulterblätter nach hinten-unten, Bauch fest.',
    'Die Hanteln seitlich bis auf Schulterhöhe heben, die Handflächen zeigen zum Boden. Langsam absenken. Kopf, Körper und Arme bleiben während der ganzen Bewegung gleich.',
    ['Hohlkreuz, um die Hanteln hochzubringen: Bauch fest, weniger Gewicht.', 'Schaukeln mit dem Oberkörper: Körper ruhig halten.'],
    ['nscab']],
  revfly: [
    'Füsse hüftbreit, Bauch fest. Hüfte nach hinten schieben, bis der Rücken etwa waagrecht ist, das Gewicht liegt eher auf den Fersen. Die Hanteln hängen mit gestreckten Armen vor dem Körper, Handflächen zueinander, Schulterblätter nach hinten-unten.',
    'Rücken flach und waagrecht halten. Beide Hanteln seitlich aus der Schulter bis auf Schulterhöhe heben. Langsam und kontrolliert absenken.',
    ['Rücken richtet sich auf oder rundet: flach und waagrecht halten.', 'Schwung: langsam heben und senken.'],
    ['nscab']],
  plank: [
    'Bauchlage auf den Unterarmen, Ellbogen direkt unter den Schultern, Füsse etwa hüftbreit, Kopf neutral.',
    'Bauch anspannen und den Körper anheben, Kopf bis Fersen eine gerade Linie, Wirbelsäule neutral. Halten und normal weiteratmen. Nach der Zeit ablegen.',
    ['Hüfte sackt durch: Bauch fest, Linie halten.', 'Hohlkreuz: Becken neutral halten.', 'Ellbogen vor oder hinter den Schultern: direkt darunter.', 'Luft anhalten: normal atmen.', 'Zu schnell länger halten: erst steigern, wenn die Haltung sauber bleibt.'],
    ['nscab','nasm']],
  frontsq: [
    'Langhantel vorne auf den Schultern, im Umsetzgriff oder mit gekreuzten Armen. Aus dem Ständer heben und zurücktreten. Füsse schulterbreit oder leicht breiter, Fussspitzen leicht nach aussen. Brust hoch, Bauch fest.',
    'Hüfte nach hinten und unten, die Knie gehen kontrolliert nach vorne, Rücken flach, Oberkörper leicht vorgeneigt. Runter, bis die Oberschenkel waagrecht oder fast waagrecht sind, früher stoppen, wenn die Fersen abheben oder der Rücken rund wird. Über die ganzen Füsse nach oben drücken, Hüfte und Oberkörper steigen gemeinsam.',
    ['Federn unten: kontrolliert umkehren.', 'Knie fallen nach innen oder aussen: Knie über der zweiten Zehe.', 'Fersen heben ab oder Rücken rundet: weniger tief.', 'Blick wandert: einen Punkt fixieren.'],
    ['nscab','ace']],
  walklunge: [
    'Eine Kurzhantel in jeder Hand seitlich am Körper, Schultern nach hinten-unten, Füsse hüftbreit.',
    'Einen grossen Schritt nach vorne und absenken, bis der vordere Oberschenkel waagrecht ist. Über das Bein abdrücken und direkt in den nächsten Schritt gehen.',
    ['Hüfte und Schultern drehen sich: gerade nach vorne ausrichten.', 'Vorderes Knie schiebt weit über die Zehen: Schritt länger machen.', 'Zwischenschritt: direkt durchsteigen.'],
    ['nscab']],
  bbbench: [
    'Rückenlage auf der Flachbank: Kopf, Schultern und Gesäss auf der Bank, beide Füsse flach am Boden, etwas breiter als die Schultern. Augen unter der Stange. Geschlossener Obergriff, etwas breiter als schulterbreit. Schulterblätter nach hinten, Bauch fest, Rücken neutral.',
    'Stange aus der Ablage heben. Kontrolliert bis knapp an die Brust absenken, die Handgelenke bleiben über den Ellbogen. Kräftig nach oben drücken und gegen Ende ausatmen, die Ellbogen oben nicht ganz durchstrecken.',
    ['Starkes Hohlkreuz für mehr Gewicht: Gesäss bleibt auf der Bank, Gewicht reduzieren.', 'Stange federt von der Brust: kontrolliert absenken.', 'Ellbogen ganz weit oder ganz eng: dazwischen.', 'Zu viel Gewicht: nur so viel, wie die Technik sauber bleibt.'],
    ['nscab','nasm']],
  dbbench: [
    'Rückenlage auf der Flachbank: Kopf, Schultern und Gesäss auf der Bank, beide Füsse flach am Boden. Schulterblätter nach hinten-unten in die Bank ziehen. Die Kurzhanteln im geschlossenen Griff über der Brust, Arme gestreckt, Handgelenke gerade.',
    'Einatmen und die Hanteln langsam bis auf Brusthöhe absenken, leicht nach aussen Richtung Achseln. Die Unterarme bleiben senkrecht, die Handgelenke über den Ellbogen. Ausatmen und wieder nach oben drücken, der Körper bleibt auf der Bank.',
    ['Unterarme kippen schräg oder Handgelenke knicken: Handgelenke gerade und über den Ellbogen.', 'Hohlkreuz, unterer Rücken hebt ab: Rücken bleibt auf der Bank.', 'Hanteln federn unten: langsam absenken.'],
    ['nscab','ace']],
  pushdown: [
    'Am oberen Kabelzug. Stange im Obergriff, Hände etwa 15 cm auseinander. Füsse hüftbreit, Bauch fest. Ellbogen seitlich am Körper und etwa rechtwinklig gebeugt.',
    'Die Ellbogen bleiben am Körper. Die Stange nach unten drücken, bis die Arme gestreckt sind. Kontrolliert zurück bis etwa zum rechten Winkel.',
    ['Schultern rollen nach vorne: Schultern hinten lassen.', 'Schwung aus dem Körper: ruhig stehen, kontrolliert.'],
    ['nscab']],
  hipthrust: [
    'Auf dem Boden sitzen, die Längsseite einer normal hohen Bank im Rücken. Den oberen Rücken auf die Bank legen, Füsse etwa hüftbreit, Knie etwa rechtwinklig. Die Langhantel mit einem Polster oder gefalteten Tuch auf die Hüfte legen.',
    'Über die Fersen drücken und die Hüfte mit dem Gesäss nach oben bringen, bis der Oberkörper etwa waagrecht ist. Oben Kinn leicht zur Brust und das Gesäss anspannen. Absenken, bis die Hüfte wenige Zentimeter über dem Boden ist.',
    ['Bewegung abkürzen, um mehr Gewicht zu schaffen: volle Bewegung, notfalls weniger Gewicht.', 'Stange drückt unangenehm auf die Hüfte: Polster verwenden.'],
    ['hkbrown','ace']],
  legpress: [
    'Rücken, Kreuzbein und Kopf liegen an der Lehne. Füsse etwa hüftbreit auf der Platte, Zehen nach vorne, Fersen flach. Sitz so einstellen, dass die Knie etwa rechtwinklig gebeugt sind. Griffe locker halten, Bauch fest.',
    'Sicherung lösen. Ausatmen und die Platte über die ganzen Füsse wegdrücken, der Oberkörper bleibt ruhig und die Fersen auf der Platte. Strecken, ohne die Knie durchzudrücken. Langsam zurück, bis die Knie wieder etwa rechtwinklig sind.',
    ['Knie fallen nach innen: Knie in Richtung der Fussspitzen.', 'Knie oben durchgedrückt: kurz vorher stoppen.', 'Gesäss hebt ab oder der untere Rücken rundet: nur so tief, wie das Becken an der Lehne bleibt.', 'Platte fällt oder federt: kontrolliert absenken.', 'Zu viel Gewicht: nur so viel, wie die Technik sauber bleibt.'],
    ['nasm','ace']],
  birddog: [
    'Vierfüsslerstand: Hände direkt unter den Schultern, Knie unter der Hüfte, Knie und Füsse hüftbreit.',
    'Bauch anspannen, Wirbelsäule neutral, der Rücken sackt nicht durch. Ein Bein nach hinten strecken und gleichzeitig den gegenüberliegenden Arm nach vorne, beide etwa bis zur Waagrechten. Hüfte und Schultern bleiben gerade, der Kopf in Linie mit der Wirbelsäule. Nur so weit, wie der untere Rücken ruhig bleibt. Langsam zurück und Seite wechseln.',
    ['Hüfte dreht auf oder Schultern kippen: weniger weit strecken, Becken gerade halten.', 'Rücken sackt durch: Arm und Bein tiefer halten.', 'Ruckartig oder zu schnell: langsam strecken und zurück.', 'Luft anhalten: normal atmen.'],
    ['ace','nasm']],
  sideplank: [
    'Seitenlage, der Körper von Kopf bis Fuss in einer Linie. Unterarm am Boden, der Ellbogen direkt unter der Schulter. Füsse übereinander oder für mehr Stabilität versetzt.',
    'Bauch anspannen und die Hüfte anheben, bis der Körper eine gerade Linie bildet. Halten, Schultern stabil. Nach der Zeit ablegen und die Seite wechseln.',
    ['Hüfte sackt ab: Hüfte hoch, Linie halten.', 'Oberkörper dreht nach vorne oder hinten: Schultern und Becken übereinander.', 'Ellbogen nicht unter der Schulter: direkt darunter.', 'Luft anhalten: normal atmen.', 'Zu schnell länger halten: erst steigern, wenn die Haltung sauber bleibt.'],
    ['nasm','nscab']],
  bbrow: [
    'Langhantel im Obergriff, Handgelenke, Ellbogen und Schultern in einer Linie. Die Stange aus dem Ständer oder vom Boden über die Knie heben und aufrichten.',
    'Aus der Hüfte nach vorne beugen, Knie leicht gebeugt, Rücken flach, der Oberkörper etwa waagrecht. Die Arme hängen gestreckt. Die Schulterblätter zusammenziehen und die Stange Richtung Bauchnabel ziehen, der Rücken bleibt flach. Langsam zurück in die Ausgangslage.',
    ['Rücken rundet: Rücken flach halten, notfalls weniger Gewicht.', 'Schwung aus dem Oberkörper: Oberkörperwinkel bleibt gleich.'],
    ['ace','nscab']],
  curl: [
    'Stehend mit hüftbreiten Füssen oder sitzend mit dem Rücken an der Lehne. In jeder Hand eine Kurzhantel, Arme gestreckt, Handflächen nach vorne. Schulterblätter nach hinten-unten, Bauch fest, Handgelenke gerade.',
    'Ausatmen und beide Ellbogen beugen, die Hanteln Richtung Schultern führen. Die Ellbogen bleiben seitlich am Körper, die Brust bleibt ruhig, nur die Arme arbeiten. Einatmen und langsam zurück, bis die Arme gestreckt sind.',
    ['Schwung aus dem Oberkörper oder Hohlkreuz: ruhig stehen oder sitzen, weniger Gewicht.', 'Ellbogen wandern nach vorne: seitlich am Körper lassen.', 'Schultern rollen nach vorne oder ziehen hoch: Schultern hinten-unten.', 'Handgelenke knicken: gerade halten.'],
    ['ace','nscab']],
  pushup: [
    'Liegestützposition: Hände etwas breiter als schulterbreit unter den Schultern, Füsse zusammen oder hüftbreit. Kopf, Rumpf und Fersen in einer Linie, Wirbelsäule neutral.',
    'Bauch fest. Die Ellbogen beugen, sie zeigen etwa 45° vom Körper weg, und absenken, bis die Brust fast den Boden berührt. Der Körper bleibt starr wie ein Brett. Wieder hochdrücken, die Ellbogen oben nicht ganz durchstrecken.',
    ['Hüfte sackt durch: Bauch fest, Linie halten.', 'Ellbogen weit nach aussen: etwa 45° vom Körper.', 'Nur halbe Bewegung: bis die Brust fast am Boden ist.', 'Ruckartig: gleichmässig.', 'Zu schwer: Hände erhöht abstützen, zum Beispiel auf einer Bank.'],
    ['nasm','nscaptq']],
  seatedpress: [
    'Auf einer Bank mit Rückenlehne sitzen, Gesäss und Rücken an der Lehne, Füsse flach am Boden. In jeder Hand eine Kurzhantel auf Schulterhöhe, Handflächen nach vorne, Handgelenke gerade, Unterarme senkrecht. Bauch fest, Schulterblätter nach hinten-unten.',
    'Ausatmen und die Hanteln senkrecht nach oben drücken, bis die Arme gestreckt sind. Der Körper bleibt an der Lehne. Einatmen und die Hanteln langsam und kontrolliert zurück auf Schulterhöhe führen.',
    ['Hohlkreuz beim Drücken: Bauch fest, Rücken an der Lehne.', 'Hanteln fallen nach unten: aktiv und langsam absenken.', 'Unterarme schräg: senkrecht unter den Hanteln.'],
    ['ace','nscaptq']],
  machpress: [
    'Rücken an der Lehne. Sitz so einstellen, dass die Griffe auf oder knapp über Schulterhöhe sind. Griffe fest fassen, Handgelenke gerade, Füsse flach am Boden oder auf den Fussstützen. Bauch fest, Schulterblätter nach hinten-unten.',
    'Ausatmen und die Griffe kontrolliert nach oben drücken, der Kopf bleibt in Linie mit der Wirbelsäule. Arme strecken, ohne die Ellbogen durchzudrücken. Kurz halten, dann kontrolliert zurück in die Ausgangslage.',
    ['Hohlkreuz beim Drücken: Bauch fest.', 'Ellbogen oben durchgedrückt: kurz vorher stoppen.', 'Griffe fallen zurück: kontrolliert absenken.'],
    ['ace']],
  dbrow: [
    'Eine Kurzhantel in einer Hand. Vorbeugen und das gegenüberliegende Knie und die Hand auf einer Bank abstützen. Rücken flach, Kopf in Linie mit der Wirbelsäule. Schulterblätter nach hinten-unten, ohne ins Hohlkreuz zu gehen. Der Arm mit der Hantel hängt gestreckt zum Boden, der Oberkörper dreht nicht und die Schulter sinkt nicht ab.',
    'Ausatmen und die Hantel langsam hochziehen, der Ellbogen beugt sich und der Oberarm geht nach hinten, nah am Körper. So hoch, wie es ohne Aufdrehen des Oberkörpers geht. Einatmen und zurück in die Ausgangslage, Rücken bleibt flach.',
    ['Oberkörper dreht auf: nur so hoch ziehen, wie der Oberkörper ruhig bleibt.', 'Rücken rundet oder Hohlkreuz: Rücken flach halten.', 'Arm weit vom Körper: Ellbogen nah am Körper führen.'],
    ['ace']],
  nordic: [
    'Auf einer weichen Unterlage knien, Zehen aufgestellt. Ein Partner oder ein fixes Gerät hält Knöchel und Unterschenkel fest. Oberkörper aufrecht, Hüfte gestreckt, Gesäss angespannt: Ohr, Hüfte und Knie in einer Linie. Schultern zurück, Arme seitlich oder auf den Oberschenkeln.',
    'Bauch fest. Die Knie strecken sich und der Körper fällt langsam nach vorne, die Hamstrings bremsen den Fall. Die Linie Ohr–Hüfte–Knie bleibt. Kurz vor dem Boden mit den Händen abfangen wie unten bei einem Liegestütz und etwa 5 cm über dem Boden stoppen. Mit den Händen zurückdrücken und gleichzeitig mit den Hamstrings den Oberkörper zurück in die Ausgangslage ziehen.',
    ['Hüfte knickt ein: Gesäss anspannen, Linie Ohr–Hüfte–Knie halten.', 'Schnell nach vorne fallen: so langsam wie möglich bremsen.'],
    ['nsca4']],
  dbrdl: [
    'Füsse hüftbreit, in jeder Hand eine Kurzhantel, Arme gestreckt seitlich oder vor den Oberschenkeln. Bauch fest, Schultern nach hinten-unten, Wirbelsäule neutral, Knie leicht gebeugt.',
    'Hüfte nach hinten schieben, der Rücken bleibt neutral und die Knie gleich leicht gebeugt. Absenken, bis die Hamstrings deutlich dehnen, meist etwa auf Höhe der Mitte des Schienbeins oder etwas darüber. Hüfte nach vorne bringen und aufrichten, die Wirbelsäule bleibt neutral.',
    ['Unterer Rücken rundet: weniger tief, notfalls weniger Gewicht.', 'Knie beugen sich immer mehr, es wird eine Kniebeuge: Knie fix lassen, Hüfte nach hinten.', 'Ruckartig oder mit Schwung: gleichmässig.', 'Zu schwere Hanteln: nur so viel, wie der Rücken neutral bleibt.'],
    ['nasm']],
  ballcurl: [
    'Rückenlage, Unterschenkel und Fersen auf dem Ball, Füsse etwa hüftbreit, Zehen zeigen nach oben. Bauch leicht anspannen, Arme seitlich am Boden, Handflächen nach unten.',
    'Ausatmen, Gesäss anspannen und die Hüfte anheben, bis Oberkörper und Beine eine gerade Linie bilden. Nicht höher, sonst entsteht ein Hohlkreuz. Dann mit den Hamstrings den Ball langsam zur Hüfte ziehen, die Hüfte bleibt oben. Einatmen und langsam zurückrollen.',
    ['Hohlkreuz beim Anheben: Hüfte nur bis zur geraden Linie, Bauch fest.', 'Hüfte sinkt beim Ziehen ab: Gesäss anspannen, Hüfte oben lassen.'],
    ['ace']],
  latlunge: [
    'Füsse hüftbreit, ohne Gewicht oder mit einer Kurzhantel in jeder Hand, Handflächen zueinander.',
    'Einen grossen Schritt direkt zur Seite. Der Fuss setzt parallel zum anderen auf. Die Hüfte auf dieser Seite nach hinten schieben und mit beiden Händen links und rechts am Bein Richtung Fuss greifen. Zum Aufstehen den Fuss in den Boden drücken und den Körper mit der Innenseite des anderen Beins zurück zur Mitte ziehen.',
    ['Fuss dreht beim Aufsetzen nach aussen: parallel zum anderen Fuss aufsetzen.', 'Oberkörper fällt nach vorne statt Hüfte nach hinten: Hüfte nach hinten schieben.'],
    ['ace']],
  legcurl: [
    'Bauchlage auf der Maschine, Beine gestreckt. Die Mitte des Kniegelenks liegt auf Höhe der Drehachse der Maschine. Das Polster liegt hinten am Unterschenkel knapp über der Ferse. Griffe locker halten, Bauch fest, die Hüfte bleibt die ganze Zeit auf dem Polster.',
    'Ausatmen und mit den Hamstrings die Knie beugen, die Fersen gleichmässig Richtung Gesäss ziehen. Kein Hohlkreuz. Bis die Knie mehr als rechtwinklig gebeugt sind oder das Polster fast das Gesäss berührt. Kurz halten, langsam absenken und kurz vor dem ganzen Strecken stoppen.',
    ['Zu viel Gewicht, die Bewegung wird ruckartig: weniger Gewicht, gleichmässig.', 'Nur halbe Bewegung: so weit beugen, wie es geht.', 'Absenken zu schnell: hoch und runter gleich kontrolliert.', 'Hüfte hebt ab oder dreht: Hüfte auf dem Polster lassen, Bauch fest.'],
    ['nasm','ace']],
  seatcurl: [
    'Sitzen, der Rücken fest an der Lehne. Den Sitz so einstellen, dass das Polster knapp über den Knöcheln liegt. Beide Beine unter dem Polster, die Knie etwa rechtwinklig. Bauch fest, Hände an den Griffen.',
    'Mit den Hamstrings das Polster nach unten ziehen, die Fersen Richtung Gesäss. Kontrolliert zurück und kurz vor dem ganzen Strecken stoppen.',
    ['Zu viel Gewicht, die Bewegung wird ruckartig: weniger Gewicht, gleichmässig.', 'Nur halbe Bewegung: ganz beugen.', 'Zurück zu schnell: hin und zurück gleich kontrolliert.', 'Hüfte rutscht oder dreht: Rücken an der Lehne lassen.'],
    ['nasm']],
  cableadd: [
    'Kabelzug ganz unten, eine Fussmanschette knapp über dem Knöchel befestigen. Drei bis vier Schritte vom Gerät weg, sodass das Bein mit der Manschette zum Gerät zeigt und vom Kabel nach aussen gezogen wird. Rücken gerade, das Standbein leicht gebeugt.',
    'Den Fuss mit der Manschette zur Körpermitte führen, bis er direkt vor dem Standbein ist. Eine Sekunde halten. Langsam zurück, das Kabel zieht das Bein wieder nach aussen. Danach Seite wechseln.',
    ['Oberkörper kippt zur Seite: Rücken gerade halten.', 'Bein schnellt zurück: langsam nachgeben.'],
    ['ace']],
  goodmorning: [
    'Füsse etwa hüftbreit. Die Langhantel liegt auf dem oberen Rücken und den Schultern, Griff etwas breiter als schulterbreit, die Stange liegt sicher. Wirbelsäule neutral, Bauch fest.',
    'Die Hüfte nach hinten schieben und den Oberkörper nach vorne neigen, die Knie bleiben nur leicht gebeugt und der Rücken neutral. Absenken, bis die Hamstrings deutlich dehnen. Die Hüfte nach vorne bringen und aufrichten, kurz vor dem ganzen Strecken der Hüfte stoppen.',
    ['Unterer Rücken rundet: weniger tief, notfalls weniger Gewicht.', 'Knie beugen sich immer mehr, es wird eine Kniebeuge: Knie nur leicht gebeugt lassen.', 'Ruckartig: gleichmässig.', 'Zu viel Gewicht: nur so viel, wie der Rücken neutral bleibt.'],
    ['nasm']],
  slrdl: [
    'Auf einem Bein stehen, eine Kurzhantel in der Hand auf der Gegenseite.',
    'Aus der Hüfte nach vorne neigen, das Standknie leicht gebeugt, der Rücken gerade. Das freie Bein geht gestreckt nach hinten, die Zehen zeigen nach unten, das hilft beim Gleichgewicht. Der Arm bleibt gestreckt, die Hantel hängt direkt vor dem Standbein. Über den Standfuss drücken, das Knie nach hinten ziehen und aufrichten. Kurz im Gleichgewicht stehen, dann die nächste Wiederholung.',
    ['Rücken rundet: Rücken gerade halten, weniger tief.', 'Hantel schwingt vom Bein weg: direkt vor dem Standbein hängen lassen.'],
    ['ace']],
  stepup: [
    'Vor einer Box oder Stufe stehen, Füsse etwa hüftbreit, in jeder Hand eine Kurzhantel, Handflächen zueinander. Schultern nach hinten-unten, nicht hochziehen.',
    'Einen Fuss ganz auf die Box setzen und fest nach unten drücken. Oberkörper aufrecht, das Knie über der zweiten Zehe. Hochsteigen und das andere Bein daneben stellen. Oberkörper und Schienbein gehen leicht nach vorne, aber nicht stark vorlehnen. Zum Abstieg das Gewicht auf das obere Bein, mit dem anderen Fuss zurück zum Boden, dann den ersten Fuss nachziehen.',
    ['Knie, Fussgelenk oder Fuss knicken nach innen oder aussen: Knie über der zweiten Zehe.', 'Starkes Vorlehnen: Oberkörper aufrecht.', 'Schultern hochgezogen: Schultern unten lassen.'],
    ['ace']],
  revlunge: [
    'Füsse etwa hüftbreit, in jeder Hand eine Kurzhantel seitlich am Körper. Schultern nach hinten-unten.',
    'Mit einem Bein langsam einen Schritt nach hinten. Sobald der Fuss am Boden ist, die Hüfte des vorderen Beins nach hinten schieben und das hintere Knie langsam Richtung Boden senken, die Brust bleibt oben. Über den vorderen Fuss drücken, das vordere Knie gedanklich nach hinten ziehen und das hintere Bein nach vorne zurück in den Stand bringen.',
    ['Brust fällt nach vorne: Brust oben halten.', 'Schnelles Absinken: langsam und kontrolliert.', 'Hüfte und Schultern drehen sich: gerade nach vorne ausrichten.'],
    ['ace','nscab']],
  cablefly: [
    'Zwei Kabelzüge mit Handgriffen etwa auf Brust- bis knapp über Schulterhöhe. Mit dem Rücken zum Gerät je einen Griff fassen und nach vorne treten, die Arme sind seitlich ausgestreckt, Handflächen nach vorne. Bauch fest, Schulterblätter nach hinten-unten.',
    'Die Ellbogen bleiben leicht gebeugt. Die Hände langsam in einem Bogen vor dem Körper zusammenführen, bis sie sich berühren. Eine Sekunde halten, dann langsam zurück, so weit, wie es kontrolliert geht.',
    ['Hohlkreuz oder Rundrücken: Bauch fest, Rücken gerade.', 'Kinn schiebt nach vorne: Kopf in Linie lassen.', 'Schultern ziehen hoch: Schultern unten lassen.'],
    ['ace','nasm']],
  calfraise: [
    'Aufrecht stehen, Füsse hüftbreit, Zehen nach vorne. Bei Last auf den Schultern: Brust hoch und Schulterblätter zusammen, damit der Rücken gerade bleibt. Knie leicht gebeugt.',
    'Die Zehen in den Boden drücken und die Fersen heben. Oben kurz halten, die Fersen langsam senken, unten kurz halten. Die Füsse drehen nicht.',
    ['Füsse drehen nach innen oder aussen: Füsse gerade halten.', 'Schnell und wippend: oben und unten kurz halten.'],
    ['ace']],
  slcalf: [
    'Etwa 15 bis 30 cm vor einer Wand stehen, Handflächen auf Brust- oder Schulterhöhe an der Wand. Ein Knie beugen, sodass dieser Fuss den Boden nicht mehr berührt.',
    'Ausatmen und die Ferse des Standbeins langsam heben, das Knie bleibt gestreckt und der Fuss dreht nicht. Die Hände stützen nur. Oben kurz halten, einatmen und die Ferse langsam senken. Danach Seite wechseln.',
    ['Fuss dreht: gerade halten.', 'Hände drücken mit: Hände nur zur Stütze.'],
    ['ace']],
  deadbug: [
    'Rückenlage. Hüfte und Knie je etwa rechtwinklig gebeugt, die Unterschenkel in der Luft. Die Arme senkrecht zur Decke gestreckt.',
    'Den Bauch anspannen, ohne die Luft anzuhalten. Der untere Rücken bleibt am Boden und die Wirbelsäule neutral. Einen Arm nach hinten über den Kopf führen und gleichzeitig das gegenüberliegende Bein strecken, bis knapp über dem Boden. Kurz halten, zurück und Seite wechseln.',
    ['Unterer Rücken hebt vom Boden ab: weniger weit strecken.', 'Ruckartig oder zu schnell: langsam strecken und zurück.', 'Arm und Bein bis ganz an den Boden: knapp darüber stoppen.', 'Luft anhalten: normal atmen.', 'Zu schwer: Füsse am Boden lassen und nur die Arme abwechselnd bewegen.'],
    ['nasm','harvard']],
  rollout: [
    'Vor dem Ab-Roller oder einer Langhantel am Boden knien. Die Hände etwa schulterbreit auf die Griffe oder die Stange legen.',
    'Die Hüfte nach vorne gedrückt und den Rücken gerade halten, dabei den Roller oder die Stange vom Körper wegrollen lassen. Die Rumpfposition bleibt gleich. Mit den Armen nach unten ziehen und zurück in die Ausgangslage rollen.',
    ['Hüfte knickt ein oder Hohlkreuz: Hüfte nach vorne, Rücken gerade, weniger weit rollen.'],
    ['ace']],
  chop: [
    'Kabelzug ganz oben, Seilgriff. Beide Enden des Seils fassen, die Daumen zeigen zur Decke. Seitlich zum Gerät knien: das Knie auf der Seite weg vom Gerät am Boden, der andere Fuss am Boden.',
    'Rücken gerade. Das Seil zur Brust ziehen, dann vor der Brust vorbei nach unten zur gegenüberliegenden Hüfte drücken, die Hände drehen dabei auseinander. Der Oberkörper bleibt ruhig. Unten eine Sekunde halten, langsam zurück. Danach Seite wechseln.',
    ['Oberkörper dreht oder neigt mit: Oberkörper ruhig, Bauch fest.', 'Gewicht schnellt zurück: langsam nachgeben.'],
    ['ace']],
  machrow: [
    'Sitzen, der Rücken fest an der Lehne bzw. die Brust am Polster. Den Sitz so einstellen, dass die Griffe auf Höhe der mittleren Brust sind. Füsse auf der Plattform. Griffe mit neutralem oder leichtem Obergriff fassen, Bauch fest, Schultern nach hinten-unten.',
    'Die Griffe zum Oberkörper ziehen: die Schulterblätter zusammenziehen und die Ellbogen nach hinten führen. Kontrolliert zurück und kurz vor dem ganzen Strecken der Arme stoppen.',
    ['Zu viel Gewicht, ruckartig: weniger Gewicht, gleichmässig.', 'Ziehen nur aus den Armen: mit den Schulterblättern beginnen.', 'Nur halbe Bewegung: ganz nach hinten ziehen.', 'Schultern runden oder starkes Vorlehnen: aufrecht bleiben.', 'Schwung: kontrolliert ziehen und zurück.'],
    ['nasm']],
  invrow: [
    'Eine Stange im Rack oder in der Smith-Maschine etwa auf Hüfthöhe, tiefer ist schwerer. Unter die Stange legen, die Brust direkt darunter. Obergriff etwas breiter als schulterbreit, Daumen um die Stange, Arme gestreckt. Gesäss und Bauch anspannen, der Rumpf ist gerade und fest. Beine gestreckt, Füsse zusammen, Fersen am Boden, Kopf neutral.',
    'Die Ellbogen beugen und den Körper zur Stange ziehen, bis die Mitte der Brust auf Höhe der Hände ist. Dabei ausatmen, etwa 2 bis 3 Sekunden. Kontrolliert absenken, bis die Arme wieder gestreckt sind, ebenfalls etwa 2 bis 3 Sekunden.',
    ['Hüfte sackt durch: Gesäss und Bauch anspannen, Körper bleibt ein Brett.', 'Beine bewegen sich oder Fersen heben ab: Fersen am Boden lassen.', 'Kopf fällt nach hinten oder schiebt nach vorne: Kopf neutral halten.'],
    ['asca','nscaptq']],
  chinup: [
    'Auf einer Bank oder Box unter der Stange stehen und die Stange im Untergriff fassen, die Handflächen zeigen zu dir. Wirbelsäule lang, Brust hoch, Bauch fest.',
    'Den Körper hochziehen, die Ellbogen nach unten an den Rippen vorbei führen, die Brust Richtung Stange. Oben kurz halten, dann langsam absenken statt fallen lassen.',
    ['Schwung: Bauch fest, Körper steif, Beine zusammen, Knöchel gekreuzt.', 'Zur Stange springen oder nur halb runter: volle Bewegung, kontrolliert.'],
    ['ace']],
  pullupA: [
    'Wie beim Klimmzug: Stange im Obergriff, etwas breiter als schulterbreit, Bauch fest. Die Unterstützung kommt von einer Klimmzugmaschine, einem dicken Band über der Stange (Knie oder Füsse in der Schlaufe) oder einem Partner.',
    'Schulterblätter nach hinten-unten ziehen, die Ellbogen nach unten führen und den Körper hochziehen, bis das Kinn über der Stange ist. Langsam zurück in den ganzen Hang.',
    ['Schwung: Körper ruhig halten.', 'Nur halbe Bewegung: oben Kinn über die Stange, unten Arme ganz strecken.'],
    ['nscaptq','ace','nscab']],
  straightarm: [
    'Kabelzug ganz oben, gerade Stange oder Seil. Füsse hüftbreit, Hüfte gestreckt, Rücken aufrecht, Knie leicht gebeugt.',
    'Die Arme bleiben gestreckt. Die Hände nach unten vor die Taille führen. Langsam zurück in die Ausgangslage.',
    ['Ellbogen beugen sich, es wird ein Trizepsdrücken: Arme gestreckt lassen.', 'Oberkörper beugt sich mit nach vorne: aufrecht stehen bleiben.'],
    ['ace']],
  cablerow: [
    'Am tiefen Kabelzug mit schmalem Griff sitzen. Füsse auf der Plattform oder am Boden, Knie gebeugt, Rücken gerade.',
    'Den Griff fassen, die Brust heben und die Ellbogen langsam nach hinten Richtung Rippen ziehen, bis der Griff den Bauch berührt. Etwa eine Sekunde halten, dann die Arme langsam strecken, bis das Gewicht wieder unten ist.',
    ['Rücken rundet: Brust hoch, Rücken gerade.', 'Ellbogen weit vom Körper: nah an den Rippen nach hinten ziehen.'],
    ['ace']],
  chestpress: [
    'Rücken ganz an der Lehne. Sitz so einstellen, dass die Griffe auf Höhe der mittleren Brust sind. Griffe fest mit dem Daumen umfassen, Handgelenke gerade, Füsse fest am Boden. Bauch fest, ohne den unteren Rücken ins Polster zu drücken, Schulterblätter nach hinten-unten.',
    'Ausatmen und die Griffe langsam nach vorne drücken, Handgelenke gerade, Kopf in Linie mit der Wirbelsäule. Drücken, bis die Ellbogen fast gestreckt, aber nicht durchgedrückt sind. Die Schulterblätter bleiben an der Lehne. Kurz halten, dann langsam zurück.',
    ['Schulterblätter lösen sich von der Lehne, Schultern runden nach vorne: Schulterblätter flach an der Lehne lassen.', 'Ellbogen durchgedrückt: kurz vorher stoppen.', 'Handgelenke knicken: gerade halten.'],
    ['ace']],
  dbfly: [
    'Rückenlage auf der Flachbank, Füsse am Boden, Wirbelsäule neutral. In jeder Hand eine Kurzhantel. Schulterblätter nach hinten-unten, die Hanteln über der Brust, Ellbogen leicht gebeugt, Handgelenke gerade, Handflächen zueinander.',
    'Einatmen und die Hanteln in einem weiten Bogen seitlich absenken, bis etwa auf Schulter- oder Brusthöhe. Ausatmen und auf demselben Bogen zurück. Ellbogen und Handgelenke bleiben gleich.',
    ['Ellbogen beugen und strecken sich, es wird ein Drücken: Ellbogenwinkel gleich lassen.', 'Zu tief: nur bis etwa Schulter- oder Brusthöhe.'],
    ['ace']],
  catcow: [
    'Vierfüsslerstand: Hände direkt unter den Schultern, schulterbreit, Finger nach vorne. Knie unter der Hüfte, Knie und Füsse hüftbreit. Bauch leicht anspannen, Wirbelsäule neutral.',
    'Katze: ausatmen, den Bauch anspannen und den Rücken nach oben zur Decke rund machen, der Kopf sinkt Richtung Brust und bleibt in Linie mit der Wirbelsäule. Kuh: locker lassen, der Bauch sinkt Richtung Boden, das Hohlkreuz wird grösser und die Schulterblätter gehen zur Wirbelsäule. Dann zurück in die neutrale Ausgangslage.',
    ['Hände oder Knie nicht unter Schultern bzw. Hüfte: Ausgangslage anpassen.'],
    ['ace']],
  hipflexstretch: [
    'Halber Kniestand: ein Knie direkt unter der Hüfte am Boden, der andere Fuss vorne, das vordere Knie über dem Knöchel und die vordere Hüfte etwa rechtwinklig. Beide Hände auf dem vorderen Oberschenkel, Wirbelsäule lang. Bei Druck am Knie eine Matte unterlegen.',
    'Schultern nach hinten-unten, ohne ins Hohlkreuz zu gehen. Bauch fest, das Becken bleibt gerade und ruhig. In die vordere Hüfte lehnen, das hintere Knie bleibt am Boden. Das Gesäss des hinteren Beins anspannen, das verstärkt die Dehnung. Etwa 30 bis 45 Sekunden halten, mit jeder Wiederholung etwas tiefer. Erst alle Wiederholungen auf einer Seite.',
    ['Becken kippt nach vorne, Hohlkreuz: Bauch fest, Gesäss des hinteren Beins anspannen.'],
    ['ace']],
  inchworm: [
    'Füsse zusammen oder leicht auseinander. Bauch anspannen.',
    'Ausatmen und aus der Hüfte vorbeugen, die Knie gestreckt, aber nicht durchgedrückt, bis die Finger oder Hände vor dir den Boden berühren. Ein flacher Rücken mit leicht gebeugten Knien ist in Ordnung. Mit den Händen in kleinen Schritten nach vorne gehen, die Füsse bleiben stehen, bis zum Liegestütz mit Rücken, Hüfte und Kopf in einer Linie. Einen Liegestütz machen. Dann mit den Füssen in kleinen Schritten zu den Händen gehen, die Hände bleiben stehen.',
    ['Unterer Rücken rundet: Rücken flach halten, Knie etwas beugen.', 'Im Stütz sackt der Rücken durch oder die Hüfte geht hoch: Rumpf fest, Linie halten.'],
    ['ace']],
  calfstretch: [
    'Etwa eine Armlänge vor der Wand, Füsse hüftbreit, Handflächen etwas über Schulterhöhe an der Wand. Bauch fest, Schultern nach hinten-unten. Ein Bein in Schrittstellung nach hinten, beide Füsse flach, Zehen nach vorne, Kopf in Linie mit der Wirbelsäule.',
    'Zur Wand lehnen, Hüfte gerade, Wirbelsäule in Linie. Das vordere Knie stärker beugen, das hintere Bein bleibt gestreckt und die Ferse drückt in den Boden. 15 bis 30 Sekunden halten, mit jeder Wiederholung etwas tiefer. Für die tiefere Wadenmuskulatur das hintere Knie leicht beugen, die Ferse bleibt am Boden.',
    ['Hintere Ferse hebt ab: Ferse in den Boden drücken, weniger weit lehnen.', 'Fuss dreht nach aussen: Zehen gerade nach vorne.'],
    ['ace']],
  lungerot: [
    'Tiefer Ausfallschritt: ein Bein weit nach hinten, der vordere Knöchel unter dem Knie, je eine Hand links und rechts neben dem vorderen Fuss. Einfacher: das hintere Knie am Boden absetzen.',
    'Den Arm auf der Seite des vorderen Beins zur Decke strecken und den Oberkörper zur Innenseite des vorderen Oberschenkels drehen. Zurück zur Mitte, die Wiederholungen machen, dann Seite wechseln.',
    ['Vorderes Knie schiebt vor den Knöchel: Knöchel unter dem Knie.'],
    ['acekovar']]
};
const api = {EXPLAIN, SRC};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_EXPLAIN = api;
})(typeof self !== 'undefined' ? self : this);
