import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.ts'

export function LoginPage() {
  const { login, authError } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLocalError('')

    if (!email.trim() || !password.trim()) {
      setLocalError('Completa email y password para continuar.')
      return
    }

    setIsSubmitting(true)
    try {
      await login(email, password)
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
          <h1 className="display-title">Inicia sesion</h1>
          <p className="text-secondary mb-4">Usa tu cuenta de Firebase para entrar.</p>

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
                placeholder="********"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-4 mb-0 text-secondary">
            No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
