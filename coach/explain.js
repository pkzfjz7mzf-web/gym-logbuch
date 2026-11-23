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
    ['ace']]
};
const api = {EXPLAIN, SRC};
if(typeof module !== 'undefined' && module.exports) module.exports = api; else root.COACH_EXPLAIN = api;
})(typeof self !== 'undefined' ? self : this);
