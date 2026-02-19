import { useEffect, useRef, useState } from "react"

const SongPlayer = () => {

  class Node {
    data: string
    next: Node | null = null

    constructor(data: string) {
      this.data = data
    }
  }

  class LinkedList {
    head: Node | null = null

    append(data: string) {
      const newNode = new Node(data)

      if (!this.head) {
        this.head = newNode
        return
      }

      let current = this.head
      while (current.next) {
        current = current.next
      }

      current.next = newNode
    }
  }

  const listRef = useRef<LinkedList | null>(null)
  const [currentNode, setCurrentNode] = useState<Node | null>(null)

  useEffect(() => {
    const list = new LinkedList()

    list.append("Shape of You")
    list.append("Blinding Lights")
    list.append("Perfect")

    listRef.current = list
    setCurrentNode(list.head)
  }, [])

  const nextSong = () => {
    if (currentNode?.next) {
      setCurrentNode(currentNode.next)
    }
  }

  return (
    <div>
      <h2>Now Playing:</h2>
      <p>{currentNode?.data}</p>

      <button onClick={nextSong} disabled={!currentNode?.next}>
        Next Song
      </button>
    </div>
  )
}

export default SongPlayer
