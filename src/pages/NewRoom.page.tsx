// dependencies
import { useState } from 'react'
import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'

// images
import IllustrationImage from '../assets/images/illustration.svg'
import LogoImage from '../assets/images/logo.svg'

// hooks
import { useAuth } from '../hooks/useAuth'

// services
import { database } from '../services/firebase'

// shared components
import Button from '../components/button'

// styles
import '../styles/auth.scss'

export function NewRoom(){
  const [ newRoom, setNewRoom ] = useState('')

  const { user } = useAuth()
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    if(newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      tittle: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder='Room name' onChange={ event => setNewRoom(event.target.value) } value={ newRoom } />
            <Button type='submit' title='Create'/>
          </form>
          <p>Do you want to join an existing room ? <Link to='/'>Click here</Link> </p>
        </div>
      </main>
    </div>
  )
}