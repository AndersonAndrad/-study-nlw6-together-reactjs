// dependencies
import { useEffect, useState } from "react"

// services
import { database } from "../services/firebase"
import { UserAuth } from "./UseAuth";

type Questions = Record<string, IFireBaseQuestions>

interface IFireBaseQuestions {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}

interface IQuestions {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  hasLiked: boolean;
}

interface IUserRoom {
  room: {
    id: string
  }
}

export function UserRoom({ room: { id } }: IUserRoom) {
  const { user } = UserAuth()
  const [ questions, setQuestions ] = useState<IQuestions[]>([])
  const [ title, setTitle ] = useState('')
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on('value', room=> {
      const databaseRoom = room.val()
      const questions: Questions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(questions).map(([ key, { author, content, isAnswered, isHighlighted, likes} ] )=> {
        return {
          id: key,
          content,
          author,
          isAnswered,
          isHighlighted,
          likeCount: Object.values(likes ?? {}).length,
          hasLiked: Object.values(likes ?? {}).some(like => like.authorId === user?.id)
        }
      })
  
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
        roomRef.off('value')
    }
  }, [id, user?.id])

  return({ questions, title })
}