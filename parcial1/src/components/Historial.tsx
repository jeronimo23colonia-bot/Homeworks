import type { Alquiler } from "../estructuras/HistorialAlquileres"

interface Props {
  historial: Alquiler[]
}

export default function Historial({ historial }: Props) {
  return (
    <div>
      <h2>Historial de alquileres (Lista doble)</h2>

      {historial.map((h, i) => (
        <div key={i}>
          {h.vehiculo.marca} {h.vehiculo.modelo}
        </div>
      ))}
    </div>
  )
}