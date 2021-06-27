// dependencies
import { ReactNode } from "react";

// styles
import '../../styles/question.scss'

interface IQuestion{
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode
}

export default function Question({ content, author, children }: IQuestion){
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}

// TODO: video stop in 56:17