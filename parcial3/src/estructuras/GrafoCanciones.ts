import type { Cancion } from '../tipos'

export class GrafoCanciones {
  private nodos = new Map<string, Set<string>>()
  private canciones = new Map<string, Cancion>()

  constructor(canciones: Cancion[]) {
    for (const cancion of canciones) {
      this.canciones.set(cancion.id, cancion)
      this.nodos.set(cancion.id, new Set())
    }

    for (const source of canciones) {
      for (const target of canciones) {
        if (source.id === target.id) {
          continue
        }
        if (source.artista === target.artista || source.genero === target.genero) {
          this.agregarArista(source.id, target.id)
        }
      }
    }
  }

  private agregarArista(origen: string, destino: string) {
    if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
      return
    }
    this.nodos.get(origen)!.add(destino)
    this.nodos.get(destino)!.add(origen)
  }

  obtenerRecomendaciones(id: string) {
    const vecinos = this.nodos.get(id)
    if (!vecinos) {
      return []
    }
    return Array.from(vecinos)
      .map((idRecomendado) => this.canciones.get(idRecomendado)!)
      .filter(Boolean)
  }
}
