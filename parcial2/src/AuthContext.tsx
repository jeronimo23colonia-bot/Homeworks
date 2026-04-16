import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isRegisteredUser, loadRegisteredUsers } from './mockDb'
import { AuthContext, type AuthContextValue } from './auth-store'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const registeredEmails = useMemo(
    () => loadRegisteredUsers().map((user) => user.email),
    [],
  )

  const login = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { ok: false, message: 'Ingresa un correo valido.' }
    }

    if (!password.trim()) {
      return { ok: false, message: 'Ingresa una contrasena.' }
    }

    setUserEmail(trimmedEmail)

    if (isRegisteredUser(trimmedEmail)) {
      return { ok: true, message: 'Sesion iniciada. Usuario registrado.' }
    }

    return {
      ok: true,
      message:
        'Sesion iniciada, pero este usuario no esta registrado para crear elementos.',
    }
  }, [])

  const logout = useCallback(() => {
    setUserEmail(null)
  }, [])

  const isRegistered = useMemo(() => {
    if (!userEmail) {
      return false
    }

    return isRegisteredUser(userEmail)
  }, [userEmail])

  const value = useMemo<AuthContextValue>(
    () => ({ userEmail, isRegistered, registeredEmails, login, logout }),
    [userEmail, isRegistered, registeredEmails, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
