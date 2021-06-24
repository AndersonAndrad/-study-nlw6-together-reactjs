import { AuthContext } from './../contexts/AuthContext';
import { useContext } from 'react'

export function UserAuth(){
  return useContext(AuthContext)
}