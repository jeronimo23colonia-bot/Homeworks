import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.ts'

export function RegisterPage() {
  const { register, authError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')

    if (!email.trim() || !password.trim()) {
      setLocalError('Completa email y password para continuar.')
      return
    }

    if (password.length < 6) {
      setLocalError('La password debe tener al menos 6 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Las passwords no coinciden.')
      return
    }

    setIsSubmitting(true)
    try {
      await register(email, password)
      navigate('/tasks')
    } catch {
      // El mensaje ya se expone desde el contexto.
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="auth-card card shadow-lg border-0">
        <div className="card-body p-4 p-md-5">
          <p className="eyebrow">Challenge 05</p>
          <h1 className="display-title">Crea tu cuenta</h1>
          <p className="text-secondary mb-4">Registro conectado a Firebase Auth.</p>

          {(localError || authError) && (
            <div className="alert alert-danger" role="alert">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimo 6 caracteres"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Repite tu password"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-4 mb-0 text-secondary">
            Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
