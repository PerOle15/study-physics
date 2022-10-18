import PotentialEnergySketch from '../sketches/PotentialEnergySketch'
import ImportantFormulas from '../components/ImportantFormulas'

function DensityPage() {
  document.title = 'Fysihka - Energie'

  const formulas = []
  const potFormula = '$$E_{pot}=m\\cdot g\\cdot h$$'
  const kinFormula = '$$E_{kin}=\\frac{1}{2}\\cdot m \\cdot v^2$$'
  const totalEnergy = '$$E_{ges}=E_{pot}+E_{kin}+E_{wärme}$$'
  const unit = '$$[E]=J=\\frac{kg\\cdot m^2}{s^2}=N\\cdot m=W\\cdot s$$'
  formulas.push({ title: 'Potentielle Energie', formula: potFormula })
  formulas.push({ title: 'Kinetische Energie Energie', formula: kinFormula })
  formulas.push({ title: 'Gesamtenergie', formula: totalEnergy })
  formulas.push({ title: 'Einheit', formula: unit })

  return (
    <div className='container'>
      <p className='page-heading'>Energie</p>
      <PotentialEnergySketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Energie ist einer der abstraktesten Begriffe überhaupt und doch
            wissen wir alle intuitiv, worum es sich bei Energie handelt. Energie
            ist der Antrieb für alles im Universum. Sie ist ein grundlegender
            Baustein in unserem Universum. Ohne sie würde sich nichts bewegen,
            und Leben gäbe es ganz bestimmt nicht.
            <br />
            Potentielle Energie ist uns allen bekannt, wenn auch nur unbewussst.
            Es ist die Energie, die ein Körper besitzt, wenn er hoch oben liegt.
            Wird der Körper fallen gelassen, wandelt sich diese Energie in
            Bewegungsenergie oder Wärmeenergie (durch den Aufprall oder Reibung)
            um.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Energie gibt es in verschiedenen Formen. Die hier gezeigten
            Energieformen sind potentielle Energie (auch Lageenergie genannt),
            kinetische Energie und Wärmenergie. Andere Formen von Energie sind
            elektrische Energie, wie wir sie verwenden, um Küchengeräte
            anzutreiben, oder chemische Energie, die in chemischen Bindungen
            gespeichert wird.
            <br /> <br />
            Jeder Körper, der unter Einfluss von Gravitation steht, besitzt
            Lageenergie. Diese Energie wird frei, wenn der Körper näher zum
            Gravitationszentrum gelangt. Dies Kann beispielsweise geschehen,
            wenn ein Ball einen Hügel hinunterrollt oder wenn ein Butterbrot vom
            Tisch auf den Boden fällt. Wie viel Lageenergie ein Körper besitzt
            ist abhängig von der dessen Masse, der Gravitationsstärke und der
            Höhe, die der Körper fallen kann.Dies ist logisch relativ einfach
            nachzuvollziehen. Wenn man einen Stein ins Wasser wirft, spritzt
            Wasser auf. Wenn der Stein eine grössere Masse besitzt ("schwerer
            ist"), spritzt es stärker, wenn der Stein aufs Wasser trifft.
            Dasselbe gilt für die Fallhöhe. Je höher das Sprungbrett liegt, von
            dem jemand springt, desto höher wird auch das Wasser spritzen. Auch
            die Gravitation hat einen ähnlichen Effekt. Angenommen man steht auf
            einer Plattform auf dem Mond und wirft einen Stein runter. Der Stein
            wird weniger beschleunigen als er es auf der Erde tun würde, somit
            hat er auch weniger kinetische Energie. Wenn man ein Ei auf der Erde
            von 1m Höhe fallen lässt, wird es sehr wahrscheinlich kaputt gehen.
            Auf dem Mond hat es von der selben Höhe weniger potentielle Energie,
            beschleunigt somit auch weniger und bleibt hoffentlich ganz.
            <br />
            Das Prinzip der potentiellen Energie, auch Lageenergie genannt, wird
            sehr oft zur Energiegewinnung oder -speicherung genutzt zum Beispiel
            in Wasserkraftwerken. In der Schweiz wird ungefähr 55-60% des
            gesamten Stroms über Wasserkraftwerke gewonnen. Dabei wird die
            Lageenergie des Wassers ausgenutzt, das Wasser wird aufgestaut und
            durch Turbinen gelassen, die dann wiederum Generatoren antreiben. Um
            Überschüssige Energie zu speichern, kann Wasser aus niedrigeren
            Regionen in einen Stausee gepumpt werden, sodass diese Energie zu
            einem späteren Zeitpunkt wieder verfügbar ist.
            <br />
            Kinetische Energie ist die Bewegungsenergie, die ein Körper besitzt.
            Je grösser dessen Geschwindigkeit und dessen Masse, desto grösser
            ist dessen Energie. Ein Autounfall wird viel weniger schlimm
            ausgehen, wenn die beteiligten Autos langsam unterwegs gewesen sind,
            als wenn sie schnell gefahren wären. Fährt ein Auto schneller, hat
            es mehr Energie und somit nimmt auch der Schaden, den es anrichten
            kann zu.
            <br />
            Wärmeenergie entsteht beispielsweise durch Reibung oder Verformung.
            Im Winter reibt man sich die kalten Hände, um sie wärmer zu kriegen.
            Meteoren verglühen in der Atmosphäre, da eine grosse Menge
            Wärmeenergie durch die Reibung mit der Luft entsteht.
            <br />
            <br />
            Eine wichtige Tatsache darf man bei Energie nicht vergessen! Energie
            kann weder erschaffen nocht vernichtet werden. Dies sagt der
            Energieerhaltungssatz aus. Energieformen können zwar beliebig
            ineinander umgewandelt werden, jedoch bleibt die Gesamtmenge an
            Energie immer dieselbe. Dies scheint auf den ersten Blick etwas
            verwirrend. Schliesslich redet man im Alltag oft von Energieverlust.
            Ausserdem bleiben Autos ja auf geraden Strecken auch stehen, wenn
            man nicht mehr aufs Gaspedal drückt. Wenn Energie "verloren" geht,
            ist sie nicht wirklich verschwunden, sondern sie ist nur in andere
            Energieformen umgewandelt worden. Meist ist die "verschwundene"
            Energie jetzt als Wärme vorhanden. Ein Auto bremst beispielsweise
            ab, weil durch Reibung die kinetische Energie in Wärmeenergie
            umgewandelt wird.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
