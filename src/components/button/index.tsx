// styles
import '../../styles/button.scss'

import { ButtonHTMLAttributes } from "react";



interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isOutlined?: boolean;
}

export default function Button({title, isOutlined = false, ...props}: IButton){
  return(
    <button className={`button ${isOutlined && 'outlined'}`} {...props}>
      {title}
    </button>
  )
}
