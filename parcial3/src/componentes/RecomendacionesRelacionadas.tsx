import type { Cancion } from '../tipos'

interface RecomendacionesRelacionadasProps {
  recomendaciones: Cancion[]
}

export default function RecomendacionesRelacionadas({ recomendaciones }: RecomendacionesRelacionadasProps) {
  return (
    <section className="recomendaciones">
      <h2>Recomendación de canciones relacionadas</h2>
      {recomendaciones.length === 0 ? (
        <p>No se han seleccionado canciones aún. Busca una canción para ver recomendaciones.</p>
      ) : (
        <ul>
          {recomendaciones.map((cancion) => (
            <li key={cancion.id}>
              <strong>{cancion.titulo}</strong>
              <span>{cancion.artista} — <span className="genero">{cancion.genero}</span></span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
