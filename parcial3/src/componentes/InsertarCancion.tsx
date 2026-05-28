import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Cancion } from '../tipos'

interface InsertarCancionProps {
  onInsertar: (cancion: Omit<Cancion, 'id'>) => void
}

export default function InsertarCancion({ onInsertar }: InsertarCancionProps) {
  const [titulo, setTitulo] = useState('')
  const [artista, setArtista] = useState('')
  const [genero, setGenero] = useState('')

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (!titulo.trim() || !artista.trim() || !genero.trim()) {
      return
    }

    onInsertar({
      titulo: titulo.trim(),
      artista: artista.trim(),
      genero: genero.trim(),
      reproducciones: 0,
      similares: [],
    })

    setTitulo('')
    setArtista('')
    setGenero('')
  }

  return (
    <section className="insertar-cancion seccion">
      <h2>Spotify: insertar nueva canción</h2>
      <form className="insertar-cancion__formulario" onSubmit={manejarEnvio}>
        <label htmlFor="titulo-cancion">Título</label>
        <input
          id="titulo-cancion"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Título de la canción"
          required
        />

        <label htmlFor="artista-cancion">Artista</label>
        <input
          id="artista-cancion"
          type="text"
          value={artista}
          onChange={(evento) => setArtista(evento.target.value)}
          placeholder="Nombre del artista"
          required
        />

        <label htmlFor="genero-cancion">Género</label>
        <input
          id="genero-cancion"
          type="text"
          value={genero}
          onChange={(evento) => setGenero(evento.target.value)}
          placeholder="Ej. Pop, Indie, Electrónica"
          required
        />

        <button type="submit">Insertar canción</button>
      </form>
      <p className="insertar-cancion__nota">
        Se relaciona automáticamente por género o artista, sin usar IDs de canciones similares.
      </p>
    </section>
  )
}
