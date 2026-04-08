import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config.ts'

export function useFirebaseAuth() {
  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const register = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    return signOut(auth)
  }

  return {
    login,
    register,
    logout,
  }
}
