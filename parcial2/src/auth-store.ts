import { createContext, useContext } from 'react'

interface LoginResult {
  ok: boolean
  message: string
}

export interface AuthContextValue {
  userEmail: string | null
  isRegistered: boolean
  registeredEmails: string[]
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }

  return context
}
