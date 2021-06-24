import { ReactNode, useEffect, useState } from "react"
import { createContext } from "react"

// services
import { auth, firebase } from "../services/firebase"

interface IAuthContext {
  user: IUser | undefined;
  singInWithGoogle: () => Promise<void>;
}

interface IUser {
  id: string;
  name: string;
  photo: string;
}

interface IAuthContextProps {
  children: ReactNode
} 

export const AuthContext = createContext({} as IAuthContext)

export function AuthContextProvider(props: IAuthContextProps){
const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user
      
        if(!displayName || !photoURL){
          throw new Error('Missing information from google account.')
        }

        setUser({ 
          id: uid, 
          name: displayName, 
          photo: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function singInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

      if(result.user) {
        const { displayName, photoURL, uid } = result.user
      
        if(!displayName || !photoURL){
          throw new Error('Missing information from google account.')
        }

        setUser({ 
          id: uid, 
          name: displayName, 
          photo: photoURL
        })
      }
  }

  return(
    <AuthContext.Provider value={{user, singInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}