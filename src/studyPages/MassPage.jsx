import MassSketch from '../sketches/MassSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function MassPage() {
  document.title = 'Fysihka - Masse und Gewichtskraft'

  const formulas = []
  const force = 'F_{G}'
  const forceFormula = 'F_{G}=m\\cdot g'
  formulas.push({ title: 'Gewichtskraft', formula: `$$${forceFormula}$$` })

  return (
    <div className='container'>
      <p className='page-heading'>Masse und Gewichtskraft</p>
      <MassSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Jeder Körper besitzt eine Eigenschaft, die Masse. Aus dem Alltag
            kennen wir jedoch vor allem den Begriff "Gewicht". Die Masse ist
            nicht das selbe wie das Gewicht eines Körpers. Während die
            Gewichtskraft ein Phänomen ist, das auftritt, wenn ein Massereicher
            Körper im Einfluss von Gravitation ist, ist die Masse eine
            grundlegende Eigenschaft des Körpers.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Die Masse eines Körpers wird auch als "Trägheit" bezeichnet. Stell
            dir einen Stein vor, der im All herumschwebt, ohne jeglichen
            Einfluss von Gravitation. Wenn du nun den Körper anschubst, wirst du
            bemerken, dass du den Stein mit einer gewissen Kraft anstossen
            musst, damit dieser sich bewegt. Je grösser der Stein, desto grösser
            ist die Kraft, die du aufwenden musst, um ihn auf die gleiche
            Geschwindigkeit zu beschleunigen. Die Masse gibt also an, wie viel
            Kraft man braucht, um einen Körper zu beschleunigen.
            <br />
            Wegen der Gravitation übt jeder massereiche Körper eine Kraft, die
            Gewichtskraft <M>{force}</M>, aus. Daher kommt auch die Formel{' '}
            <M>{forceFormula}</M>. Das <M>g</M> steht für den Ortsfaktor
            (Einheit: N/kg = m/s<sup>2</sup>), also die Stärke der Gravitation
            an dem jeweiligen Ort, an dem sich der Körper befindet. Je grösser
            der Ortsfaktor und je grösser dei Masse, desto grösser die
            Gewichtskraft.
            <br />
            Die Zahl, die eine Waage anzeigt, wenn man einen Apfel auf sie legt,
            gibt an, welche Masse dieser Körper besitzt. Das ist jedoch nicht
            direkt die Messung, die von der Waage durchgeführt wird. Die Waage
            misst die Gewichtskraft und rechnet diese um in die Masse. Die Masse
            ist gleich der Gewichtkraft <M>{force}</M> geteilt durch den
            Ortsfaktor <M>g</M>.
          </p>
        </div>
      </section>
    </div>
  )
}

export default MassPage
