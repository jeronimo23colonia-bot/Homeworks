export class MonticuloMax<T> {
  private elementos: T[]
  private comparar: (a: T, b: T) => number

  constructor(elementos: T[] = [], comparar: (a: T, b: T) => number) {
    this.elementos = [...elementos]
    this.comparar = comparar
    this.construirMonticulo()
  }

  private construirMonticulo() {
    for (let i = Math.floor(this.elementos.length / 2); i >= 0; i -= 1) {
      this.hundir(i)
    }
  }

  private intercambiar(i: number, j: number) {
    const temp = this.elementos[i]
    this.elementos[i] = this.elementos[j]
    this.elementos[j] = temp
  }

  private hundir(indice: number) {
    let mayor = indice
    const izquierda = 2 * indice + 1
    const derecha = 2 * indice + 2
    if (
      izquierda < this.elementos.length &&
      this.comparar(this.elementos[izquierda], this.elementos[mayor]) > 0
    ) {
      mayor = izquierda
    }
    if (
      derecha < this.elementos.length &&
      this.comparar(this.elementos[derecha], this.elementos[mayor]) > 0
    ) {
      mayor = derecha
    }
    if (mayor !== indice) {
      this.intercambiar(indice, mayor)
      this.hundir(mayor)
    }
  }

  insertar(elemento: T) {
    this.elementos.push(elemento)
    let indice = this.elementos.length - 1
    while (indice > 0) {
      const padre = Math.floor((indice - 1) / 2)
      if (this.comparar(this.elementos[indice], this.elementos[padre]) <= 0) {
        break
      }
      this.intercambiar(indice, padre)
      indice = padre
    }
  }

  extraer() {
    if (this.elementos.length === 0) {
      return undefined
    }
    this.intercambiar(0, this.elementos.length - 1)
    const extraido = this.elementos.pop()
    this.hundir(0)
    return extraido
  }

  static topN<T>(elementos: T[], n: number, comparar: (a: T, b: T) => number) {
    const monticulo = new MonticuloMax([...elementos], comparar)
    const resultado: T[] = []
    for (let i = 0; i < n; i += 1) {
      const valor = monticulo.extraer()
      if (!valor) break
      resultado.push(valor)
    }
    return resultado
  }
}
