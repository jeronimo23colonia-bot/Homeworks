import { useEffect, useRef, useState } from "react"

const BrowserNavigation = () => {

  class DoublyNode {
    data: string
    next: DoublyNode | null = null
    prev: DoublyNode | null = null

    constructor(data: string) {
      this.data = data
    }
  }

  class DoublyLinkedList {
    head: DoublyNode | null = null
    current: DoublyNode | null = null

    visit(data: string) {
      const newNode = new DoublyNode(data)

      if (!this.head) {
        this.head = newNode
        this.current = newNode
        return
      }

      if (this.current) {
        this.current.next = newNode
        newNode.prev = this.current
      }

      this.current = newNode
    }

    back() {
      if (this.current?.prev) {
        this.current = this.current.prev
      }
    }

    forward() {
      if (this.current?.next) {
        this.current = this.current.next
      }
    }
  }

  const browserRef = useRef<DoublyLinkedList | null>(null)
  const [currentPage, setCurrentPage] = useState<string>("")

  useEffect(() => {
    const browser = new DoublyLinkedList()

    browser.visit("google.com")
    browser.visit("github.com")
    browser.visit("stackoverflow.com")

    browserRef.current = browser
    setCurrentPage(browser.current?.data || "")
  }, [])

  const goBack = () => {
    browserRef.current?.back()
    setCurrentPage(browserRef.current?.current?.data || "")
  }

  const goForward = () => {
    browserRef.current?.forward()
    setCurrentPage(browserRef.current?.current?.data || "")
  }

  return (
    <div>
      <h2>Current Page:</h2>
      <p>{currentPage}</p>

      <button onClick={goBack} disabled={!browserRef.current?.current?.prev}>
        Back
      </button>

      <button onClick={goForward} disabled={!browserRef.current?.current?.next}>
        Forward
      </button>
    </div>
  )
}

export default BrowserNavigation
