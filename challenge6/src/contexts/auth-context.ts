import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextValue = {
  user: User | null
  loading: boolean
  authError: string
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
