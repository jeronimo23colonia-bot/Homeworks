import { Vehiculo } from "./ListaVehiculos"

class NodoDestacado {
  vehiculo: Vehiculo
  siguiente: NodoDestacado | null = null

  constructor(vehiculo: Vehiculo) {
    this.vehiculo = vehiculo
  }
}

export class ListaDestacados {
  cabeza: NodoDestacado | null = null
  actual: NodoDestacado | null = null

  agregar(vehiculo: Vehiculo) {
    const nuevo = new NodoDestacado(vehiculo)

    if (!this.cabeza) {
      this.cabeza = nuevo
      nuevo.siguiente = nuevo
      this.actual = nuevo
      return
    }

    let temp = this.cabeza

    while (temp.siguiente !== this.cabeza) {
      temp = temp.siguiente!
    }

    temp.siguiente = nuevo
    nuevo.siguiente = this.cabeza
  }

  siguiente(): Vehiculo | null {
    if (!this.actual) return null
    this.actual = this.actual.siguiente
    return this.actual?.vehiculo || null
  }

  obtenerActual(): Vehiculo | null {
    return this.actual?.vehiculo || null
  }
}