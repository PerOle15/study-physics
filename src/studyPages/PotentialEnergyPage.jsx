import PotentialEnergySketch from '../sketches/PotentialEnergySketch'
import ImportantFormulas from '../components/ImportantFormulas'

function DensityPage() {
  document.title = 'Fysihka - Potentielle Energie'

  const formulas = []
  const potFormula = '$$E_{pot}=m\\cdot g\\cdot h$$'
  formulas.push({ title: 'Gewichtskraft', formula: potFormula })

  return (
    <div className='container'>
      <p className='page-heading'>Potentielle Energie</p>
      <PotentialEnergySketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
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
            Jeder Körper, der unter Einfluss von Gravitation steht, besitzt eine
            solche potentielle Energie. Diese Energie wird frei, wenn der Körper
            näher zum Gravitationszentrum gelangt. Dies Kann beispielsweise ein
            Ball sein, der einen Hügel runterrollt oder auch das Butterbrot, das
            vom Tisch auf den Boden fällt.
            <br />
            Die Energiemenge, die freigesetzt wird, hängt mit der Masse des
            Körpers, der Fallhöhe und der Gravitation zusammen. Dies ist logisch
            relativ einfach nachzuvollziehen. Wenn man einen Stein ins Wasser
            wirft, spritzt Wasser auf. Wenn der Stein eine grössere Masse
            besitzt ("schwerer ist"), spritzt es stärker, wenn der Stein aufs
            Wasser trifft. Dasselbe gilt für die Fallhöhe. Je höher das
            Sprungbrett liegt, von dem jemand springt, desto höher wird auch das
            Wasser spritzen. Auch die Gravitation hat einen ähnlichen Effekt.
            Angenommen man steht auf einer Plattform auf dem Mond und wirft
            einen Stein runter. Der Stein wird weniger beschleunigen als er es
            auf der Erde tun würde, somit hat er auch weniger kinetische
            Energie. Wenn man ein Ei auf der Erde von 1m Höhe fallen lässt, wird
            es sehr wahrscheinlich kaputt gehen. Auf dem Mond hat es von der
            selben Höhe weniger potentielle Energie, beschleunigt somit auch
            weniger und bleibt hoffentlich ganz.
            <br />
            Das Prinzip der potentiellen Energie, auch Lageenergie genannt, wird
            sehr oft zur Stromproduktion oder Energiespeicherung genutzt. Dies
            passiert in Wasserkraftwerken. In der Schweiz wird ungefähr 55-60%
            des gesamten Stroms durch Wasserkraftwerke produziert. Dabei wird
            die Lageenergie des Wassers ausgenutzt, das Wasser wird aufgestaut
            und durch Turbinen gelassen, die dann wiederum Generatoren
            antreiben. Um Überschüssige Energie zu speichern, kann Wasser aus
            niedrigeren Regionen in einen Stausee gepumpt werden, sodass diese
            Energie zu einem späteren Zeitpunkt wieder verfügbar ist.
          </p>
        </div>
      </section>
    </div>
  )
}

export default DensityPage
