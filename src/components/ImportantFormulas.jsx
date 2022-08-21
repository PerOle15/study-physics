import Latex from 'react-latex'
import uuid from 'react-uuid'

function ImportantFormulas({ content }) {
  const formulas = content.map((segment) => (
    <p key={uuid()}>
      <span className='bolder'>{segment.title}</span>:
      <br />
      <Latex>{segment.formula}</Latex>
    </p>
  ))
  return (
    <div className='important-formulas highlight-box'>
      <p className='small-heading'>Die wichtigsten Formeln auf einen Blick:</p>
      {formulas}
    </div>
  )
}

export default ImportantFormulas
