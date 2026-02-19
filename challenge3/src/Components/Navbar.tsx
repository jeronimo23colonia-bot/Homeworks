type Props = {
  setPage: (page: string) => void
}

const Navbar = ({ setPage }: Props) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setPage("linked")}>
        Linked List
      </button>

      <button onClick={() => setPage("doubly")}>
        Doubly Linked List
      </button>
    </div>
  )
}

export default Navbar
