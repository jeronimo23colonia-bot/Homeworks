import type { Inversionista } from "../estructuras/ListaInversionistas.tsx"

interface Props {
  inversionistas: Inversionista[]
}

export default function Inversionistas({ inversionistas }: Props) {
  return (
    <div>
      <h2>Inversionistas activos (Lista circular doble)</h2>

      {inversionistas.map(i => (
        <div key={i.id}>
          {i.nombre} - Capital: {i.capital}
        </div>
      ))}
    </div>
  )
}