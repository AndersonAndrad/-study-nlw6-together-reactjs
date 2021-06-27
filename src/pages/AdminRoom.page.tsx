// dependencies
import { useHistory, useParams } from 'react-router-dom'

// services
import { database } from '../services/firebase'

// hooks
import { useRoom } from '../hooks/useRoom'

// images
import Logo from '../assets/images/logo.svg'

// shared components
import Button from '../components/button'
import RoomCode from '../components/roomCode'
import Question from '../components/questions'

// images
import DeleteImage from '../assets/images/delete.svg'
import CheckImage from '../assets/images/check.svg'
import AnsweredImage from '../assets/images/answer.svg'

// styles
import '../styles/room.scss'

interface IParams {
  id: string;
}

export function AdminRoom (){
  const { id } = useParams<IParams>()
  const { questions, title } = useRoom( id )
  const history = useHistory()

  async function handleDeleteQuestion(questionId: string){
    if(window.confirm('Are you sure you want to remove this questions ?')){
      await database.ref(`rooms/${id}/questions/${questionId}`).remove()
    }
  }

  async function handleHighlightQuestion(questionId: string){
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  async function handleCheckAsAnsweredQuestion(questionId: string){
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true
    })
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
                key={ question.id }
                author={ question.author } 
                content={ question.content }
                isAnswered={ question.isAnswered }
                isHighlighted={ question.isHighlighted }
                >
                  {!question.isAnswered && (
                    <>
                      <button onClick={() => handleHighlightQuestion(question.id)}>
                        <img src={CheckImage} alt="Highlight" />
                      </button>
                      <button onClick={() => handleCheckAsAnsweredQuestion(question.id)}>
                        <img src={AnsweredImage} alt="Mark as answered" />
                      </button>
                    </>
                  )}
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