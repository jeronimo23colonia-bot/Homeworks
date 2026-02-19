import { useState } from "react"
import Navbar from "./Components/Navbar"
import LinkedPage from "./Datastructure/linked.tsx"
import DoublyLinkedPage from "./Datastructure/doublelinkedlist.tsx"

function App() {
  const [page, setPage] = useState<string>("linked")

  return (
    <div style={{ padding: "20px" }}>
      <Navbar setPage={setPage} />

      {page === "linked" && <LinkedPage />}
      {page === "doubly" && <DoublyLinkedPage />}
    </div>
  )
}

export default App
