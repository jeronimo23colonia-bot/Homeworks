import type { Cancion } from '../tipos'

interface RankingPopularesProps {
  canciones: Cancion[]
}

export default function RankingPopulares({ canciones }: RankingPopularesProps) {
  return (
    <section className="ranking">
      <h2>Ranking de canciones populares</h2>
      <ol>
        {canciones.map((cancion) => (
          <li key={cancion.id}>
            <h3>{cancion.titulo}</h3>
            <p>{cancion.artista} — <span className="genero">{cancion.genero}</span></p>
            <span>{cancion.reproducciones.toLocaleString()} reproducciones</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
