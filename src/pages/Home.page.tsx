// dependencies
import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

// services
import { database } from '../services/firebase'

// hooks
import { useAuth } from '../hooks/useAuth'

// images
import IllustrationImage from '../assets/images/illustration.svg'
import LogoImage from '../assets/images/logo.svg'
import GoogleIconImage from '../assets/images/google-icon.svg'

// shared components
import Button from '../components/button'

// styles
import '../styles/auth.scss'

export function Home(){
  const [ roomCode, setRoomCode ] = useState('')

  const history = useHistory()
  const {user, singInWithGoogle} = useAuth()
  
  async function handleCreateRoom(){
    if(!user){
      await singInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if(roomCode.trim() === '') { 
      return 
    }

    const roomRef = await database.ref(`rooms/${ roomCode }`).get()

    if(!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    if(roomRef.val().closedAt){
      alert('Room already closed')
      return
    }

    history.push(`/rooms/${ roomCode }`)
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
          <form onSubmit={handleJoinRoom}>
            <input type="text" placeholder='Enter the room code' onChange={ event => setRoomCode(event.target.value) } value={ roomCode } />
            <Button type='submit' title='Enter to room'/>
          </form>
        </div>
      </main>
    </div>
  )
}