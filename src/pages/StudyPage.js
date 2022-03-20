import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import { GiWeight, GiStrikingBalls, GiSpring } from 'react-icons/gi'
import { AiOutlineArrowsAlt, AiOutlineDotChart } from 'react-icons/ai'

function StudyPage() {
  return (
    <div className='container study-container'>
      <h2 className='topic-title'>Grundlagen</h2>
      <div className='card-grid'>
        <Link to='density' className='card'>
          <div className='card-icon'>
            <AiOutlineDotChart />
          </div>
          <h4 className='card-title'>Dichte</h4>
        </Link>
        <Link to='mass-and-weight-force' className='card'>
          <div className='card-icon'>
            <GiWeight />
          </div>
          <h4 className='card-title'>Masse und Gewichtskraft</h4>
        </Link>
      </div>
      <h2 className='topic-title'>Kräfte und Energie</h2>
      <div className='card-grid'>
        <Link to='forces' className='card'>
          <div className='card-icon'>
            <AiOutlineArrowsAlt />
          </div>
          <h4 className='card-title'>Kräfte</h4>
        </Link>
        <Link to='potential-energy' className='card'>
          <div className='card-icon'>
            <GiStrikingBalls />
          </div>
          <h4 className='card-title'>Potentielle Energie</h4>
        </Link>
        <Link to='federn' className='card'>
          <div className='card-icon'>
            <GiSpring />
          </div>
          <h4 className='card-title'>Federn</h4>
        </Link>
      </div>
    </div>
  )
}

export default StudyPage
