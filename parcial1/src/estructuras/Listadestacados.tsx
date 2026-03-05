import type { Vehiculo } from "./ListaVehiculos.tsx"

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
    if (!this.actual || !this.actual.siguiente) return null
    this.actual = this.actual.siguiente
    return this.actual.vehiculo
  }

  obtenerActual(): Vehiculo | null {
    return this.actual?.vehiculo || null
  }

  obtenerTodos(): Vehiculo[] {
    const lista: Vehiculo[] = []

    if (!this.cabeza) return lista

    let temp = this.cabeza

    do {
      lista.push(temp.vehiculo)
      temp = temp.siguiente!
    } while (temp !== this.cabeza)

    return lista
  }
  
  imprimir(): void {
    if (!this.cabeza) {
      console.log("Lista vacía")
      return
    }
    let temp = this.cabeza
    const vehiculos = []
    do {
      vehiculos.push(`${temp.vehiculo.marca} ${temp.vehiculo.modelo}`)
      temp = temp.siguiente!
    } while (temp !== this.cabeza)
    console.log("Lista circular:", vehiculos.join(" → "), "→ [vuelve al inicio]")
    console.log("Actual:", this.actual?.vehiculo.marca, this.actual?.vehiculo.modelo)
  }
}