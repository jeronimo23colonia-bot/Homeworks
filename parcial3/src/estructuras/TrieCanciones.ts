export class NodoTrie {
  hijos = new Map<string, NodoTrie>()
  esFinal = false
  titulos: string[] = []
}

export class TrieCanciones {
  private raiz = new NodoTrie()

  insertar(titulo: string) {
    const texto = titulo.toLowerCase()
    let actual = this.raiz
    for (const caracter of texto) {
      if (!actual.hijos.has(caracter)) {
        actual.hijos.set(caracter, new NodoTrie())
      }
      actual = actual.hijos.get(caracter)!
    }
    actual.esFinal = true
    if (!actual.titulos.includes(titulo)) {
      actual.titulos.push(titulo)
    }
  }

  buscar(titulo: string) {
    let actual = this.raiz
    for (const caracter of titulo.toLowerCase()) {
      if (!actual.hijos.has(caracter)) {
        return false
      }
      actual = actual.hijos.get(caracter)!
    }
    return actual.esFinal
  }

  sugerencias(prefijo: string) {
    let actual = this.raiz
    for (const caracter of prefijo.toLowerCase()) {
      if (!actual.hijos.has(caracter)) {
        return []
      }
      actual = actual.hijos.get(caracter)!
    }
    return this.recogerSugerencias(actual).slice(0, 6)
  }

  private recogerSugerencias(nodo: NodoTrie) {
    const sugerencias: string[] = []
    const recorrer = (actual: NodoTrie) => {
      if (actual.esFinal) {
        for (const titulo of actual.titulos) {
          sugerencias.push(titulo)
        }
      }
      for (const hijo of actual.hijos.values()) {
        recorrer(hijo)
      }
    }
    recorrer(nodo)
    return Array.from(new Set(sugerencias))
  }
}
