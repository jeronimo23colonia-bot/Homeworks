import { useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../firebase/config.ts'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth.ts'
import { AuthContext } from './auth-context.ts'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  const { login: firebaseLogin, register: firebaseRegister, logout: firebaseLogout } = useFirebaseAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email: string, password: string) => {
    setAuthError('')
    try {
      await firebaseLogin(email, password)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo iniciar sesion.'
      setAuthError(errorMessage)
      throw error
    }
  }

  const register = async (email: string, password: string) => {
    setAuthError('')
    try {
      await firebaseRegister(email, password)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo crear la cuenta.'
      setAuthError(errorMessage)
      throw error
    }
  }

  const logout = async () => {
    setAuthError('')
    try {
      await firebaseLogout()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo cerrar sesion.'
      setAuthError(errorMessage)
      throw error
    }
  }

  const value = {
    user,
    loading,
    authError,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
