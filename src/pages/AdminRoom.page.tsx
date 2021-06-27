// dependencies
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// hooks
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

// images
import Logo from '../assets/images/logo.svg'

// shared components
import Button from '../components/button'
import RoomCode from '../components/roomCode'
import Question from '../components/questions'

// styles
import '../styles/room.scss'
import { database } from '../services/firebase'

interface IParams {
  id: string;
}

export function AdminRoom (){
  const { id } = useParams<IParams>()
  const { user } = useAuth()
  const [ newQuestion, setNewQuestion ] = useState('')
  const { questions, title } = useRoom( id )

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={ Logo } alt="" />
          <div>
            <RoomCode code={ id } />
            <Button title='Finish room' isOutlined/>
          </div>
        </div>
      </header>

        <main className='content'>
          <div className="room-title">
            <h1>Room {title}</h1>
            { questions.length > 0 && <span>{questions.length} questions</span> }
          </div>

          <div className="question-list">
            {questions.map(question => {
              return (
                <Question 
                key={question.id}
                author={question.author} 
                content={ 
                  question.content
                } />
              )
            })}
          </div>
        </main>
    </div>
  )
}

// TODO: separate the interface from the component