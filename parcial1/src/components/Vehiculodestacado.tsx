import { useEffect, useState } from "react"
import { ListaDestacados } from "../estructuras/Listadestacados"
import type { Vehiculo } from "../estructuras/Listavehiculos"

interface Props {
  lista: ListaDestacados
}

export default function VehiculoDestacado({ lista }: Props) {
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(lista.obtenerActual())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setVehiculo(lista.siguiente())
    }, 5000)

    return () => clearInterval(intervalo)
  }, [])

  if (!vehiculo) return null

  return (
    <div>
      <h2>Vehículo destacado (lista circular)</h2>
      <p>{vehiculo.marca} {vehiculo.modelo}</p>
    </div>
  )
}