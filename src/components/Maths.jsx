import Latex from 'react-latex'
function Maths({ children }) {
  const value = `$$${children}$$`
  return <Latex>{value}</Latex>
}

export default Maths
