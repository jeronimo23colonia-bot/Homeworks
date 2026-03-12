import { useState } from 'react'
import './App.css'
import { BookForm } from './components/BookForm'
import { BookStack } from './components/BookStack'
import { mockBooks } from './constants/books'
import type { Book } from './types/book'

function App() {
  const [bookStack, setBookStack] = useState<Book[]>(mockBooks)

  const handleAddBook = (book: Book) => {
    setBookStack((previousStack) => [...previousStack, book])
  }

  const handlePop = () => {
    setBookStack((previousStack) => previousStack.slice(0, -1))
  }

  return (
    <main className="books-page">
      <h1>Stack de Libros (LIFO)</h1>

      <BookForm onAddBook={handleAddBook} />
      <BookStack books={bookStack} onPop={handlePop} />
    </main>
  )
}

export default App
