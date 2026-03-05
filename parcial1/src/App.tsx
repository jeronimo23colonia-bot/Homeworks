import { useState } from "react"
import { ListaVehiculos, type Vehiculo } from "./estructuras/Listavehiculos"
import { HistorialAlquileres } from "./estructuras/Historialalquileres"

import VehiculosDisponibles from "./components/VehiculosDisponibles"
import Historial from "./components/Historial"

const listaVehiculos = new ListaVehiculos()
const historial = new HistorialAlquileres()

listaVehiculos.agregar({ id: 1, marca: "Toyota", modelo: "Corolla" })
listaVehiculos.agregar({ id: 2, marca: "Mazda", modelo: "3" })

export default function App() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(listaVehiculos.obtenerTodos())
  const [historialLista, setHistorial] = useState<any[]>([])

  const alquilar = (id: number) => {
    const vehiculo = listaVehiculos.eliminar(id)

    if (vehiculo) {
      historial.agregar({ vehiculo })

      setVehiculos(listaVehiculos.obtenerTodos())
      setHistorial(historial.obtenerTodos())
    }
  }

  return (
    <div>
      <h1>Sistema de Movilidad</h1>

      <VehiculosDisponibles vehiculos={vehiculos} alquilar={alquilar} />

      <Historial historial={historialLista} />
    </div>
  )
}