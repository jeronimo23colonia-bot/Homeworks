import type { Book } from '../types/book'

type BookStackProps = {
  books: Book[]
  onPop: () => void
}

export function BookStack({ books, onPop }: BookStackProps) {
  const topBook = books[books.length - 1]

  return (
    <section className="panel">
      <h2>Libros en el stack</h2>
      <p className="top-book">
        Top: {topBook ? `${topBook.name} (${topBook.isbn})` : 'Stack vacío'}
      </p>

      <button type="button" onClick={onPop} disabled={books.length === 0}>
        Quitar libro del top (pop)
      </button>

      <ul className="stack-list">
        {[...books].reverse().map((book, index) => (
          <li key={`${book.isbn}-${index}`}>
            <strong>{book.name}</strong>
            <span>ISBN: {book.isbn}</span>
            <span>Autor: {book.author}</span>
            <span>Editorial: {book.editorial}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
