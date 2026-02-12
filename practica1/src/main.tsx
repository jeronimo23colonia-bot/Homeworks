import { StrictMode } from 'react'
import './index.css'
import HelloWorld from './HelloWorld.tsx'
import ReactDOM from 'react-dom/client'
import PrintMessage from './PrintMessage.tsx'
import Contador from './Contador.tsx'
import EjemploContador from './Ejemplocontador.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelloWorld />
    <PrintMessage Message="Hello from PrintMessage component!" />
    <PrintMessage Message="Hello from PrintMessage function!" />
    <Contador/> 
    <EjemploContador/>
  </StrictMode>
) 

