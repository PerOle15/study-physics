import MassSketch from '../sketches/MassSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'
import L from '../components/PageLink'

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
            nicht dasselbe wie das Gewicht eines Körpers. Während die
            Gewichtskraft ein Phänomen ist, das auftritt, wenn ein Körper im
            Einfluss von Gravitation ist, ist die Masse eine grundlegende
            Eigenschaft des Körpers.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Die Masse eines Körpers wird auch als "Trägheit" bezeichnet. Stell
            dir einen Stein vor, der im All herumschwebt, ohne jeglichen
            Einfluss von Gravitation. Wenn du nun den Stein anschubst, wirst du
            bemerken, dass du den Stein mit einer gewissen Kraft anstossen
            musst, damit dieser sich bewegt. Je grösser der Stein, desto grösser
            ist die Kraft, die du aufwenden musst, um ihn auf die gleiche
            Geschwindigkeit zu beschleunigen. Die Masse gibt also an, wie viel
            Kraft man braucht, um einen Körper zu beschleunigen.
            <br />
            Wegen der Gravitation übt jeder massereiche Körper eine Kraft - die
            Gewichtskraft <M>{force}</M> - aus. Daher kommt auch die Formel{' '}
            <M>{forceFormula}</M>. Das <M>g</M> steht für den Ortsfaktor
            (Einheit: N/kg = m/s<sup>2</sup>), also die Stärke der Gravitation
            an dem jeweiligen Ort, an dem sich der Körper befindet. Je grösser
            der Ortsfaktor und je grösser die Masse, desto grösser die
            Gewichtskraft. Der Ortsfaktor gibt sowohl an, wie stark die
            Gewichtskraft eines Körpers ist, als auch, wie schnell dieser Körper
            unter dem Einfluss der Gravitation{' '}
            <L to='acceleration'>beschleunigt</L> wird. Auf der Erde beträgt der
            Ortsfaktor ungefähr <M>9.81m/s^2</M>. Dies bedeutet, dass die
            Geschwindigkeit eines Körper (unter Vernachlässigung von
            Luftwiderstand) im freien Fall jede Sekunde um <M>9.81m/s</M>{' '}
            zunimmt.
            <br />
            Die Zahl, die eine Waage anzeigt, wenn man einen Apfel auf sie legt,
            gibt an, welche Masse dieser Körper besitzt. Das ist jedoch nicht
            das Messergebnis der Messung, welche von der Waage durchgeführt
            wird. Die Waage misst die Gewichtskraft und rechnet diese um in die
            Masse. Die Masse ist gleich der Gewichtkraft <M>{force}</M> geteilt
            durch den Ortsfaktor <M>g</M>. Wenn man also im leeren Raum, weit
            weg von allem Einfluss von Gravitation, eine Waage benutzen würde,
            würde diese immer 0kg anzeigen. Ohne Gravitation kann auch keine
            Gewichtskraft auf die Waage wirken und die Waage kann keine Masse
            feststellen.
            <br />
            Jede Waage muss kalibriert werden auf die Stärke der Gravitation,
            welche an dem Ort herrscht, an dem sie verwendet werden soll. Dies
            spielt vor allem bei Präzisionswaagen eine Rolle. Bei sehr exakten
            Messungen kann bereits eine kleine Abweichung bei der Gravitation
            einen grossen Einfluss auf das Messergebnis haben.
          </p>
        </div>
      </section>
    </div>
  )
}

export default MassPage
