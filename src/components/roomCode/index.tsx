// dependencies
import { HtmlHTMLAttributes } from 'react'

// images
import CopyImage from '../../assets/images/copy.svg'

// styles
import '../../styles/room-code.scss'

interface IRoomCode extends HtmlHTMLAttributes<HTMLButtonElement> {
  code: string;
}

export default function RoomCode({code, ...props}: IRoomCode){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return(
    <button className='room-code' {...props} onClick={copyRoomCodeToClipboard}> 
      <div>
        <img src={CopyImage} alt="copy room code" />
      </div>
      <span>Room {code}</span>
    </button>
  )
}

//TODO: separate the interface from the component