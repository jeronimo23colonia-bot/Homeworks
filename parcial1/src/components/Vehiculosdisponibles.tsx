import type { Vehiculo } from "../estructuras/Listavehiculos.tsx"

interface Props {
  vehiculos: Vehiculo[]
  alquilar: (id: number) => void
}

export default function VehiculosDisponibles({ vehiculos, alquilar }: Props) {
  return (
    <div>
      <h2>Vehículos disponibles</h2>

      {vehiculos.map((v) => (
        <div key={v.id}>
          {v.marca} {v.modelo}
          <button onClick={() => alquilar(v.id)}>Alquilar</button>
        </div>
      ))}
    </div>
  )
}