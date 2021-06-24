// dependencies
import { useHistory } from 'react-router-dom'

// hooks
import { UserAuth } from '../hooks/UseAuth'

// images
import IllustrationImage from '../assets/images/illustration.svg'
import LogoImage from '../assets/images/logo.svg'
import GoogleIconImage from '../assets/images/google-icon.svg'

// shared components
import Button from '../components/button'

// styles
import '../styles/auth.scss'

export function Home(){
  const history = useHistory()
  const {user, singInWithGoogle} = UserAuth()
  
  async function handleCreateRoom(){
    if(!user){
      await singInWithGoogle()
    }

    history.push('/rooms/new')
  }

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
          <button className='create-room' onClick={() => handleCreateRoom()}>
            <img src={GoogleIconImage} alt="Google logo" />
            create your room with Google
          </button>
          <div className='separator'>
            or enter a room
          </div>
          <form action="">
            <input type="text" placeholder='Enter the room code' />
            <Button type='submit' title='Enter to room'/>
          </form>
        </div>
      </main>
    </div>
  )
}