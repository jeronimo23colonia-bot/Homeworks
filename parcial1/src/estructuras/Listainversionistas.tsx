export interface Inversionista {
  id: number
  nombre: string
  capital: number
}

class NodoInv {
  inversionista: Inversionista
  siguiente: NodoInv | null = null
  anterior: NodoInv | null = null

  constructor(i: Inversionista) {
    this.inversionista = i
  }
}

export class ListaInversionistas {
  cabeza: NodoInv | null = null

  agregar(inv: Inversionista) {
    const nuevo = new NodoInv(inv)

    if (!this.cabeza) {
      nuevo.siguiente = nuevo
      nuevo.anterior = nuevo
      this.cabeza = nuevo
      return
    }

    const ultimo = this.cabeza.anterior!

    ultimo.siguiente = nuevo
    nuevo.anterior = ultimo

    nuevo.siguiente = this.cabeza
    this.cabeza.anterior = nuevo
  }

  obtenerTodos(): Inversionista[] {
    const lista: Inversionista[] = []

    if (!this.cabeza) return lista

    let actual = this.cabeza

    do {
      lista.push(actual.inversionista)
      actual = actual.siguiente!
    } while (actual !== this.cabeza)

    return lista
  }
}