import type { Vehiculo } from "./Listavehiculos"

export interface Alquiler {
  vehiculo: Vehiculo
}

class NodoAlquiler {
  alquiler: Alquiler
  siguiente: NodoAlquiler | null = null
  anterior: NodoAlquiler | null = null

  constructor(alquiler: Alquiler) {
    this.alquiler = alquiler
  }
}

export class HistorialAlquileres {
  cabeza: NodoAlquiler | null = null

  agregar(alquiler: Alquiler) {
    const nuevo = new NodoAlquiler(alquiler)

    if (!this.cabeza) {
      this.cabeza = nuevo
      return
    }

    let actual = this.cabeza

    while (actual.siguiente) {
      actual = actual.siguiente
    }

    actual.siguiente = nuevo
    nuevo.anterior = actual
  }

  obtenerTodos(): Alquiler[] {
    const lista: Alquiler[] = []
    let actual = this.cabeza

    while (actual) {
      lista.push(actual.alquiler)
      actual = actual.siguiente
    }

    return lista
  }
}