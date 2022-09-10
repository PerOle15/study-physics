import { Link } from 'react-router-dom'
import { GiWeight, GiSpring, GiWindSlap } from 'react-icons/gi'
import { AiOutlineDotChart } from 'react-icons/ai'
import pendulum from '../svg/pendulum.svg'
import wave from '../svg/wave.svg'
import inclinedPlane from '../svg/inclined-plane.svg'
import potentialEnergy from '../svg/potential-energy.svg'

function MainStudyPage() {
  return (
    <div className='container study-container'>
      <p className='page-heading'>Lernen</p>
      <div className='card-grid'>
        <Link to='density' className='card'>
          <div className='card-icon'>
            <AiOutlineDotChart />
          </div>
          <p className='card-heading secondary'>Dichte</p>
        </Link>
        <Link to='mass' className='card'>
          <div className='card-icon'>
            <GiWeight />
          </div>
          <p className='card-heading secondary'>Masse und Gewichtskraft</p>
        </Link>
        <Link to='potential-energy' className='card'>
          <div className='card-icon'>
            <img src={potentialEnergy} alt='' />
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
            <img src={inclinedPlane} alt='' />
          </div>
          <p className='card-heading secondary'>Schiefe Ebene</p>
        </Link>
        <Link to='sine-wave' className='card'>
          <div className='card-icon'>
            <img src={wave} alt='' />
          </div>
          <p className='card-heading secondary'>Sinuswellen</p>
        </Link>
        <Link to='pendulum' className='card'>
          <div className='card-icon'>
            <img src={pendulum} alt='' />
          </div>
          <p className='card-heading secondary'>Pendel</p>
        </Link>
        <Link to='acceleration' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Beschleunigung</p>
        </Link>
        <Link to='buoyancy' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Auftrieb</p>
        </Link>
        <Link to='throw' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Schiefer Wurf</p>
        </Link>
        <Link to='wave-addition' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Addition von Sinuswellen</p>
        </Link>
        <Link to='collision' className='card'>
          <div className='card-icon'>
            <GiWindSlap />
          </div>
          <p className='card-heading secondary'>Kollision</p>
        </Link>
      </div>
    </div>
  )
}

export default MainStudyPage
