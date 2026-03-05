export interface Vehiculo {
  id: number
  marca: string
  modelo: string
}

class NodoVehiculo {
  vehiculo: Vehiculo
  siguiente: NodoVehiculo | null = null

  constructor(vehiculo: Vehiculo) {
    this.vehiculo = vehiculo
  }
}

export class ListaVehiculos {
  cabeza: NodoVehiculo | null = null

  agregar(vehiculo: Vehiculo) {
    const nuevo = new NodoVehiculo(vehiculo)

    if (!this.cabeza) {
      this.cabeza = nuevo
      return
    }

    let actual = this.cabeza

    while (actual.siguiente) {
      actual = actual.siguiente
    }

    actual.siguiente = nuevo
  }

  eliminar(id: number): Vehiculo | null {
    if (!this.cabeza) return null

    if (this.cabeza.vehiculo.id === id) {
      const eliminado = this.cabeza.vehiculo
      this.cabeza = this.cabeza.siguiente
      return eliminado
    }

    let actual = this.cabeza

    while (actual.siguiente) {
      if (actual.siguiente.vehiculo.id === id) {
        const eliminado = actual.siguiente.vehiculo
        actual.siguiente = actual.siguiente.siguiente
        return eliminado
      }
      actual = actual.siguiente
    }

    return null
  }

  obtenerTodos(): Vehiculo[] {
    const lista: Vehiculo[] = []
    let actual = this.cabeza

    while (actual) {
      lista.push(actual.vehiculo)
      actual = actual.siguiente
    }

    return lista
  }
}