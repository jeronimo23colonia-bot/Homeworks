import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { cancionesIniciales } from './datos/canciones'
import type { Cancion } from './tipos'
import { TrieCanciones } from './estructuras/TrieCanciones'
import { MonticuloMax } from './estructuras/MonticuloMax'
import { GrafoCanciones } from './estructuras/GrafoCanciones'
import BuscadorCanciones from './componentes/BuscadorCanciones'
import InsertarCancion from './componentes/InsertarCancion'
import RankingPopulares from './componentes/RankingPopulares'
import RecomendacionesRelacionadas from './componentes/RecomendacionesRelacionadas'
import PanelVisual from './componentes/PanelVisual'
import './App.scss'

function App() {
  const [canciones, setCanciones] = useState<Cancion[]>(cancionesIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [mensajeBusqueda, setMensajeBusqueda] = useState('Escribe un título para buscar una canción')
  const [sugerencias, setSugerencias] = useState<string[]>([])
  const [recomendaciones, setRecomendaciones] = useState<Cancion[]>([])

  const trieCanciones = useMemo(() => {
    const trie = new TrieCanciones()
    canciones.forEach((cancion) => trie.insertar(cancion.titulo))
    return trie
  }, [canciones])

  const grafoCanciones = useMemo(() => new GrafoCanciones(canciones), [canciones])

  const topCanciones = useMemo(
    () => MonticuloMax.topN(canciones, 5, (a, b) => a.reproducciones - b.reproducciones),
    [canciones],
  )

  const totalReproducciones = useMemo(
    () => canciones.reduce((total, cancion) => total + cancion.reproducciones, 0),
    [canciones],
  )

  const actualizarBusqueda = (texto: string) => {
    setBusqueda(texto)
    if (texto.trim() === '') {
      setSugerencias([])
      setMensajeBusqueda('Escribe un título para buscar una canción')
      return
    }

    const sugerenciasNuevas = trieCanciones.sugerencias(texto)
    setSugerencias(sugerenciasNuevas)
  }

  const buscarPorTitulo = (titulo: string) => {
    const cancion = canciones.find((item) => item.titulo.toLowerCase() === titulo.toLowerCase())
    if (!cancion) {
      setMensajeBusqueda(`La canción "${titulo}" existe pero no se encontró en los datos.`)
      setRecomendaciones([])
      return
    }

    const recomendacionesCercanas = grafoCanciones.obtenerRecomendaciones(cancion.id)
    setMensajeBusqueda(`La canción "${titulo}" existe y se recomiendan canciones similares.`)
    setRecomendaciones(recomendacionesCercanas)
  }

  const buscarCancion = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const titulo = busqueda.trim()
    if (titulo === '') {
      setMensajeBusqueda('Escribe el título de una canción para buscarla')
      setRecomendaciones([])
      return
    }

    if (!trieCanciones.buscar(titulo)) {
      setMensajeBusqueda(`La canción "${titulo}" no existe en la plataforma.`)
      setRecomendaciones([])
      return
    }

    buscarPorTitulo(titulo)
  }

  const seleccionarSugerencia = (texto: string) => {
    setBusqueda(texto)
    setSugerencias([])
    if (trieCanciones.buscar(texto)) {
      buscarPorTitulo(texto)
    }
  }

  const insertarCancion = (cancion: Omit<Cancion, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setCanciones((actual) => [...actual, { id, ...cancion }])
    setMensajeBusqueda(`Canción "${cancion.titulo}" insertada correctamente.`)
    setRecomendaciones([])
  }

  return (
    <main className="app">
      <header className="app__cabecera">
        <h1>Spotify Educativo</h1>                
      </header>

      <section className="app__contenido">
        <InsertarCancion onInsertar={insertarCancion} />

        <BuscadorCanciones
          texto={busqueda}
          sugerencias={sugerencias}
          resultado={mensajeBusqueda}
          onTexto={actualizarBusqueda}
          onBuscar={buscarCancion}
          onSeleccionar={seleccionarSugerencia}
        />

        <PanelVisual totalCanciones={canciones.length} totalReproducciones={totalReproducciones} />

        <RankingPopulares canciones={topCanciones} />

        <RecomendacionesRelacionadas recomendaciones={recomendaciones} />
      </section>
    </main>
  )
}

export default App
