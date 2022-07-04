import { Link } from 'react-router-dom'
import { GiWeight, GiStrikingBalls, GiSpring, GiWindSlap } from 'react-icons/gi'
import { AiOutlineArrowsAlt, AiOutlineDotChart } from 'react-icons/ai'

function MainStudyPage() {
  return (
    <div className='container study-container'>
      <p className='section-heading'>Grundlagen</p>
      <div className='card-grid'>
        <Link to='density' className='card'>
          <div className='card-icon'>
            <AiOutlineDotChart />
          </div>
          <p className='card-heading secondary'>Dichte</p>
        </Link>
        <Link to='mass-and-weight-force' className='card'>
          <div className='card-icon'>
            <GiWeight />
          </div>
          <p className='card-heading secondary'>Masse und Gewichtskraft</p>
        </Link>
      </div>
      <p className='section-heading'>Kräfte und Energie</p>
      <div className='card-grid'>
        <Link to='forces' className='card'>
          <div className='card-icon'>
            <AiOutlineArrowsAlt />
          </div>
          <p className='card-heading secondary'>Kräfte</p>
        </Link>
        <Link to='potential-energy' className='card'>
          <div className='card-icon'>
            <GiStrikingBalls />
          </div>
          <p className='card-heading secondary'>Potentielle Energie</p>
        </Link>
        <Link to='springs' className='card'>
          <div className='card-icon'>
            <GiSpring />
          </div>
          <p className='card-heading secondary'>Federn</p>
        </Link>
        <Link to='inclined-plane' className='card'>
          <div className='card-icon'>
            <GiSpring />
          </div>
          <p className='card-heading secondary'>Schiefe Ebene</p>
        </Link>
        <Link to='sine-wave' className='card'>
          <div className='card-icon'>
            <GiSpring />
          </div>
          <p className='card-heading secondary'>Sinuswellen</p>
        </Link>
        <Link to='pendulum' className='card'>
          <div className='card-icon'>
            <GiSpring />
          </div>
          <p className='card-heading secondary'>Pendel</p>
        </Link>
        <Link to='acceleration' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Beschleunigung</p>
        </Link>
      </div>
    </div>
  )
}

export default MainStudyPage
