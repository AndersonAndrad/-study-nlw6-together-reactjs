// styles
import '../../styles/button.scss'

import { ButtonHTMLAttributes } from "react";



interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({title, ...props}: IButton){
  return(
    <button className="button" {...props}>
      {title}
    </button>
  )
}
