import type { Vehiculo } from "../estructuras/ListaVehiculos.tsx"

interface Props {
  vehiculo: Vehiculo | null
}

export default function VehiculoDestacado({ vehiculo }: Props) {
  if (!vehiculo) return null

  return (
    <div>
      <h2>Vehículo destacado (Lista circular)</h2>
      <p>
        <strong>{vehiculo.marca} {vehiculo.modelo}</strong>
      </p>
    </div>
  )
}