import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Loader from './loader.tsx'
import Contactos from './contactos.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Loader />
    <Contactos />
  </StrictMode>,
)
