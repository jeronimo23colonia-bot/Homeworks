import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './estilosGlobales.css'
import Aplicacion from './Aplicacion.tsx'
import { AuthProvider } from './ContextoAutenticacion.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Aplicacion />
    </AuthProvider>
  </StrictMode>,
)
