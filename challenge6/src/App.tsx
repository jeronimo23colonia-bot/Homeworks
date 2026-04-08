import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.ts'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegisterPage } from './pages/RegisterPage.tsx'
import { TasksPage } from './pages/TasksPage.tsx'

function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/tasks' : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to="/tasks" replace /> : <LoginPage />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/tasks" replace /> : <RegisterPage />}
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
