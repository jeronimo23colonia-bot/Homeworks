import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Book } from '../types/book'

type BookFormProps = {
  onAddBook: (book: Book) => void
}

const initialForm: Book = {
  name: '',
  isbn: '',
  author: '',
  editorial: '',
}

export function BookForm({ onAddBook }: BookFormProps) {
  const [form, setForm] = useState<Book>(initialForm)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name || !form.isbn || !form.author || !form.editorial) {
      return
    }

    onAddBook(form)
    setForm(initialForm)
  }

  return (
    <section className="panel">
      <h2>Nuevo libro</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
        </label>

        <label>
          ISBN
          <input
            type="text"
            value={form.isbn}
            onChange={(event) => setForm({ ...form, isbn: event.target.value })}
            required
          />
        </label>

        <label>
          Autor
          <input
            type="text"
            value={form.author}
            onChange={(event) => setForm({ ...form, author: event.target.value })}
            required
          />
        </label>

        <label>
          Editorial
          <input
            type="text"
            value={form.editorial}
            onChange={(event) => setForm({ ...form, editorial: event.target.value })}
            required
          />
        </label>

        <button type="submit">Agregar al stack</button>
      </form>
    </section>
  )
}
