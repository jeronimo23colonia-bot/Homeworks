export interface Inversionista {
  id: number
  nombre: string
  capital: number
}

class NodoInversionista {
  inversionista: Inversionista
  siguiente: NodoInversionista | null = null
  anterior: NodoInversionista | null = null

  constructor(inversionista: Inversionista) {
    this.inversionista = inversionista
  }
}

export class ListaInversionistas {
  cabeza: NodoInversionista | null = null

  agregar(inversionista: Inversionista) {
    const nuevo = new NodoInversionista(inversionista)

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