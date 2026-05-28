interface PanelVisualProps {
  totalCanciones: number
  totalReproducciones: number
}

export default function PanelVisual({ totalCanciones, totalReproducciones }: PanelVisualProps) {
  return (
    <section className="panel-visual">
      <h2>Panel visual de rankings</h2>
      <div className="panel-visual__grid">
        <article>
          <h3>{totalCanciones}</h3>
          <p>Canciones en la plataforma</p>
        </article>
        <article>
          <h3>{totalReproducciones.toLocaleString()}</h3>
          <p>Reproducciones totales</p>
        </article>
      </div>
      <p className="panel-visual__nota">
      </p>
    </section>
  )
}
