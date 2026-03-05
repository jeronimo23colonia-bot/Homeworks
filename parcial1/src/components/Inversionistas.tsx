import type { Inversionista } from "../estructuras/Listainversionistas"

interface Props {
  inversionistas: Inversionista[]
}

export default function Inversionistas({ inversionistas }: Props) {
  return (
    <div>
      <h2>Inversionistas activos (lista circular doble)</h2>

      {inversionistas.map((i) => (
        <div key={i.id}>
          {i.nombre} - Capital: {i.capital}
        </div>
      ))}
    </div>
  )
}