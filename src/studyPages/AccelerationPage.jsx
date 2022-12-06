import AccelerationSketch from '../sketches/AccelerationSketch'
import ImportantFormulas from '../components/ImportantFormulas'
import M from '../components/Maths'

function AccelerationPage() {
  document.title = 'Fysihka - Beschleunigung'
  const formulas = []
  const vel = '$$v=\\frac{\\Delta x}{\\Delta t}$$'
  const acc = '$$a=\\frac{\\Delta v}{\\Delta t}$$'
  const force = '$$F=m\\cdot a$$'
  formulas.push({ title: 'Geschwindigkeit', formula: vel })
  formulas.push({ title: 'Beschleunigung', formula: acc })
  formulas.push({ title: '2. Newtonsches Bewegungsgesetz', formula: force })

  return (
    <div className='container'>
      <p className='page-heading'>Beschleunigung</p>
      <AccelerationSketch />
      <section className='topic-description'>
        <div className='short-description'>
          <p>
            Die Beschleunigung ist die Änderungsrate der Geschwindigkeit. Sie
            ist eine Vektorgröße (d.h. sie hat eine Richtung und einen Betrag)
            und wird in Metern pro Sekunde zum Quadrat (<M>m/s^2</M>) gemessen.
            Die Beschleunigung kann durch eine Vielzahl von Kräften verursacht
            werden, z. B. durch Schwerkraft, Reibung oder sogar Luftwiderstand.
            Eine Beschleunigung tritt immer dann auf, wenn sich die
            Geschwindigkeit ändert. Diese Änderung kann in Form einer Zunahme
            der Geschwindigkeit, einer Abnahme der Geschwindigkeit oder einer
            Richtungsänderung erfolgen.
          </p>
        </div>
        <ImportantFormulas content={formulas} />
        <br />
        <div className='long-description'>
          <p>
            Es gibt verschiedene Arten der Beschleunigung: z.B. lineare,
            winkelförmige und radiale Beschleunigung. Winkelbeschleunigung ist
            die Beschleunigung in einem rotierenden Körper und
            Radialbeschleunigung die Beschleunigung auf einen zentralen Punkt zu
            oder von ihm weg.
            <br />
            In unserer Simulation seht ihr eine gleichmässige, lineare
            Beschleunigung. Kennzeichnend dafür ist die gerade Strecke, auf der
            das Objekt sich bewegt (also linear) und natürlich die konstante
            Beschleunigung (gleichmässige Beschleunigung).
            <br />
            Da <M>a</M> konstant ist, verändert sich die Geschwindigkeit{' '}
            <M>v</M>
            gleichmässig, welches ihr am blauen Graphen beobachten könnt. Die
            Sprünge des blauen Graphen sind zurückzuführen auf den
            Vorzeichenwechsel der Geschwindigkeit Beim Aufprall auf die Wand.
            Die Richtung der Geschwindigkeit wird angegeben durch das
            Vorzeichen.
            <br />
            Wenn man nun die Beschleunigung so ändert, dass sie negativ ist,
            dann wird man merken, dass das Objekt seine Fahrtrichtung kehrt
            (Beschleunigung ist eine Vektorgrösse!). Eine negative
            Beschleunigung heisst nicht zwingend, dass das betroffene Objekt
            abbremst. Es heisst nur, dass das Objekt in die entgegengesetzte
            Richtung beschleunigt wird.
            <br />
            Die Beschleunigung wird oft durch eine Kraft verursacht. Je größer
            die Kraft, desto größer ist die Beschleunigung. Auch die Masse eines
            Objekts wirkt sich auf die Beschleunigung aus. Je größer die Masse
            ist, desto geringer ist die Beschleunigung.
            <br />
            Newtons zweites Bewegungsgesetz besagt, dass die Beschleunigung
            eines Objekts proportional zu der auf das Objekt wirkenden Kraft und
            umgekehrt proportional zu seiner Masse ist. Das heißt, wenn man die
            Kraft verdoppelt, verdoppelt sich auch die Beschleunigung.
            Verdoppelt man jedoch die Masse, so halbiert sich die
            Beschleunigung.
          </p>
        </div>
      </section>
    </div>
  )
}

export default AccelerationPage
