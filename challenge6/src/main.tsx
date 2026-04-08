import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { TasksProvider } from './contexts/TasksContext.tsx'
import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
