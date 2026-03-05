import { useEffect, useState } from "react"
import { ListaVehiculos, type Vehiculo } from "./estructuras/ListaVehiculos.tsx"
import { HistorialAlquileres } from "./estructuras/HistorialAlquileres.tsx"
import { ListaDestacados } from "./estructuras/ListaDestacados.tsx"
import { ListaInversionistas } from "./estructuras/ListaInversionistas.tsx"

import VehiculosDisponibles from "./components/VehiculosDisponibles"
import Historial from "./components/Historial"
import VehiculoDestacado from "./components/VehiculoDestacado.tsx"
import Inversionistas from "./components/Inversionistas"

const vehiculosBase: Vehiculo[] = [
  { id: 1, marca: "Toyota", modelo: "Corolla" },
  { id: 2, marca: "Mazda", modelo: "3" },
  { id: 3, marca: "Honda", modelo: "Civic" },
  { id: 4, marca: "Ford", modelo: "Focus" },
  { id: 5, marca: "Nissan", modelo: "Sentra" },
]

const listaVehiculos = new ListaVehiculos()
const historial = new HistorialAlquileres()
const destacados = new ListaDestacados()
const inversionistas = new ListaInversionistas()

listaVehiculos.agregar({ id: 1, marca: "Toyota", modelo: "Corolla" })
listaVehiculos.agregar({ id: 2, marca: "Mazda", modelo: "3" })
listaVehiculos.agregar({ id: 3, marca: "Honda", modelo: "Civic" })
listaVehiculos.agregar({ id: 4, marca: "Ford", modelo: "Focus" })
listaVehiculos.agregar({ id: 5, marca: "Nissan", modelo: "Sentra" })

destacados.agregar({ id: 1, marca: "Toyota", modelo: "Corolla" })
destacados.agregar({ id: 2, marca: "Mazda", modelo: "3" })
destacados.agregar({ id: 3, marca: "Honda", modelo: "Civic" })
destacados.agregar({ id: 4, marca: "Ford", modelo: "Focus" })
destacados.agregar({ id: 5, marca: "Nissan", modelo: "Sentra" })

inversionistas.agregar({ id: 1, nombre: "Carlos", capital: 50000 })
inversionistas.agregar({ id: 2, nombre: "Ana", capital: 80000 })
inversionistas.agregar({ id: 3, nombre: "Luis", capital: 120000 })

export default function App() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>(listaVehiculos.obtenerTodos())
  const [historialLista, setHistorial] = useState<any[]>([])
  const [listaInv] = useState(inversionistas.obtenerTodos())
  const [destacadosLista] = useState<Vehiculo[]>(vehiculosBase)
  const [indiceDestacado, setIndiceDestacado] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceDestacado((prev) => (prev + 1) % destacadosLista.length)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [])

  const alquilar = (id: number) => {
    const vehiculo = listaVehiculos.eliminar(id)

    if (vehiculo) {
      historial.agregar({ vehiculo })

      setVehiculos(listaVehiculos.obtenerTodos())
      setHistorial(historial.obtenerTodos())
    }
  }

  return (
    <div style={{padding:40}}>
      <h1>Sistema de Movilidad</h1>

      <VehiculoDestacado
        vehiculo={destacadosLista[indiceDestacado] ?? null}
      />

      <VehiculosDisponibles vehiculos={vehiculos} alquilar={alquilar} />

      <p>Estructura lista enlazada:</p>
      <p>{listaVehiculos.imprimir()}</p>

      <Historial historial={historialLista} />

      <p>Estructura lista doble:</p>
      <p>{historial.imprimir()}</p>

      <Inversionistas inversionistas={listaInv} />
    </div>
  )
}