import type { ChangeEvent, FormEvent } from 'react'

interface BuscadorCancionesProps {
  texto: string
  sugerencias: string[]
  resultado: string
  onTexto: (texto: string) => void
  onBuscar: (evento: FormEvent<HTMLFormElement>) => void
  onSeleccionar: (texto: string) => void
}

export default function BuscadorCanciones({
  texto,
  sugerencias,
  resultado,
  onTexto,
  onBuscar,
  onSeleccionar,
}: BuscadorCancionesProps) {
  return (
    <section className="buscador">
      <h2>Buscador predictivo de canciones</h2>
      <form className="buscador__formulario" onSubmit={onBuscar}>
        <label htmlFor="busqueda">Título de la canción</label>
        <input
          id="busqueda"
          type="text"
          value={texto}
          onChange={(evento: ChangeEvent<HTMLInputElement>) => onTexto(evento.target.value)}
          placeholder="Escribe un prefijo para ver sugerencias"
          autoComplete="off"
        />
        <button type="submit">Buscar canción</button>
      </form>

      {sugerencias.length > 0 && (
        <div className="buscador__sugerencias">
          <p>Sugerencias:</p>
          <ul>
            {sugerencias.map((sugerencia) => (
              <li key={sugerencia}>
                <button type="button" onClick={() => onSeleccionar(sugerencia)}>
                  {sugerencia}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="buscador__resultado">{resultado}</div>
    </section>
  )
}
