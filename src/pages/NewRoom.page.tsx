// dependencies
import { Link } from 'react-router-dom'

// images
import IllustrationImage from '../assets/images/illustration.svg'
import LogoImage from '../assets/images/logo.svg'

// shared components
import Button from '../components/button'

// styles
import '../styles/auth.scss'

export function NewRoom(){
  return(
      <div id='page-auth'>
      <aside>
        <img src={IllustrationImage} alt="Illustration symbolizing questions and answers" />
        <strong>Create live rooms</strong>
        <p>ask your audience questions in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={LogoImage} alt="Let me ask" />
          <h2>Create a new room</h2>
          <form action="">
            <input type="text" placeholder='Room name' />
            <Button type='submit' title='Create'/>
          </form>
          <p>Do you want to join an existing room ? <Link to='/'>Click here</Link> </p>
        </div>
      </main>
    </div>
  )
}