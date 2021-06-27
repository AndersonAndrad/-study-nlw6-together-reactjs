// dependencies
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

// services
import { database } from '../services/firebase'

// hooks
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

// images
import Logo from '../assets/images/logo.svg'

// shared components
import Button from '../components/button'
import RoomCode from '../components/roomCode'
import Question from '../components/questions'

// images
import DeleteImage from '../assets/images/delete.svg'

// styles
import '../styles/room.scss'

interface IParams {
  id: string;
}

export function AdminRoom (){
  const { id } = useParams<IParams>()
  const { user } = useAuth()
  const [ newQuestion, setNewQuestion ] = useState('')
  const { questions, title } = useRoom( id )
  const history = useHistory()

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Are you sure you want to remove this questions ?')){
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      closedAt: new Date()
    })

    history.push('/')
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={ Logo } alt="" />
          <div>
            <RoomCode code={ id } />
            <Button onClick={ handleEndRoom } title='Finish room' isOutlined/>
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
                }>
                  <button onClick={() => handleDeleteQuestion(question.id)}>
                    <img src={DeleteImage} alt="Remove question" />
                  </button>
                </Question>
              )
            })}
          </div>
        </main>
    </div>
  )
}

// TODO: separate the interface from the component