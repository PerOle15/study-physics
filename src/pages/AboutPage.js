import React, { Component } from 'react'

export class AboutPage extends Component {
  render() {
    document.title = 'Fysihka - Über Uns'
    return (
      <div className='container'>
        <p className='page-heading'>Über Uns</p>
        <p className='section-heading'>Wer sind wir?</p>
        <p>
          Wir sind zwei Gymnasiasten aus der Kantonsschule Zürcher Oberland.
          Schon früh waren wir beide technikbegeistert. Es macht uns Spass,
          Dinge auszuprobieren und neue Dinge zu lernen. Dinge selbst zu
          kreieren und so unsere Kreativität auszuleben ist eine unserer
          Leidenschaften. Dafür ist Programmieren die perfekte Beschäftigung.
          Mit genügend Wissen kann man unendlich viele verschiedene Dinge
          erschaffen, egal, ob man eine Website zum Physik lernen, ein
          Computerspiel oder eine riesige Plattform wie Facebook kreieren
          möchte.
        </p>
        <p className='section-heading'>Wieso gibt es diese Website?</p>
        <p>
          In unserem Umfeld haben viele Leute Probleme mit dem Physikunterricht
          am Gymnasium. Sie können sich nichts unter den Theorien vorstellen,
          können nur schwer die Zusammenhänge zwischen verschiedenen Themen
          erkennen und wissen nicht, wie bestimmte Formeln zustande kommen, was
          diese bedeuten und wie diese mit anderen Themen verknüpft werden
          können. Besonders in unserer Klasse war das Interesse an den Formeln
          und die Bereitschaft sich Themen anzueignen erniedrigend klein und
          widerspiegelte sich dann auch in der Leistung der Klasse.
          <br />
          Viele dieser Probleme wollen wir mit unserer Website ansprechen und
          damit möglichst vielen Lernenden helfen, die Physik besser zu
          verstehen und bei ihnen das Interesse an der Physik wecken. Wenn man
          die Physik nämlich einmal verstanden hat, gibt es fast kein Thema, das
          spannender sein könnte. Mithilfe der Physik kann man sämtliche
          Phänomene, sowohl in unserer direkten Umgebung als auch Milliarden von
          Lichtjahren entfernt erklären oder es bestehen zumindest Versuche
          darin, diese zu erklären. Von der klassischen Mechanik, die sehr stark
          von Isaac Newton geprägt wurde, bis hin zur Quantenmechanik, die einen
          Versuch unternimmt, die Welt der allerkleinsten Teilchen, wie Atome,
          Elektronen und Photonen zu beschreiben.
          <br />
          Die interaktiven Animationen sollen dabei helfen, ein intuitives
          Verständnis für die einzelnen Themenbereiche zu entwickeln. Die
          Animationen sind leicht zu bedienen und können sowohl von Lehrpersonen
          als auch von Schüler*innen, ohne den Aufwand für die Durchführung
          eines Experiments, genutzt werden. Wenn Schüler*innen die Dinge selbst
          ausprobieren können, ist es für sie zudem viel einfacher, zu
          verstehen, was wirklich bei einem Experiment vor sich geht.
        </p>
      </div>
    )
  }
}

export default AboutPage
