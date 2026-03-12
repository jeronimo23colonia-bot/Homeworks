import './App.css'

import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

type Person = {
  id: number
  name: string
  withdrawalAmount: number
  arrivalDate: Date
}

class Queue<T> {
  private items: T[] = []

  enqueue(item: T) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  toArray() {
    return [...this.items]
  }

  size() {
    return this.items.length
  }
}

const randomArrivalDate = () => {
  const now = Date.now()
  const threeDays = 3 * 24 * 60 * 60 * 1000
  const randomOffset = Math.floor(Math.random() * threeDays)
  return new Date(now - randomOffset)
}

const createMockQueue = () => {
  const queue = new Queue<Person>()
  const mockPeople = [
    { name: 'Ana', withdrawalAmount: 120 },
    { name: 'Luis', withdrawalAmount: 300 },
    { name: 'María', withdrawalAmount: 80 },
    { name: 'Carlos', withdrawalAmount: 450 },
  ]

  mockPeople.forEach((person, index) => {
    queue.enqueue({
      id: index + 1,
      name: person.name,
      withdrawalAmount: person.withdrawalAmount,
      arrivalDate: randomArrivalDate(),
    })
  })

  return queue.toArray()
}

function App() {
  const [name, setName] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [queue, setQueue] = useState<Person[]>(createMockQueue)

  const queueByArrival = useMemo(
    () =>
      [...queue].sort(
        (personA, personB) =>
          personA.arrivalDate.getTime() - personB.arrivalDate.getTime(),
      ),
    [queue],
  )

  const queueSize = useMemo(() => {
    const queueModel = new Queue<Person>()
    queue.forEach((person) => queueModel.enqueue(person))
    return queueModel.size()
  }, [queue])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const amountNumber = Number(withdrawalAmount)

    if (!name.trim() || Number.isNaN(amountNumber) || amountNumber <= 0) {
      return
    }

    setQueue((currentQueue) => {
      const queueModel = new Queue<Person>()
      currentQueue.forEach((person) => queueModel.enqueue(person))

      queueModel.enqueue({
        id: Date.now(),
        name: name.trim(),
        withdrawalAmount: amountNumber,
        arrivalDate: randomArrivalDate(),
      })

      return queueModel.toArray()
    })

    setName('')
    setWithdrawalAmount('')
  }

  return (
    <main className="app">
      <h1>ATM Queue</h1>

      <section className="card">
        <h2>Agregar persona</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Nombre
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Pedro"
            />
          </label>

          <label>
            Monto a retirar
            <input
              type="number"
              min="1"
              value={withdrawalAmount}
              onChange={(event) => setWithdrawalAmount(event.target.value)}
              placeholder="Ej: 250"
            />
          </label>

          <button type="submit">Encolar persona</button>
        </form>
      </section>

      <section className="card">
        <h2>Cola del ATM (ordenada por llegada)</h2>
        <p>Total en cola: {queueSize}</p>

        <ul className="queue-list">
          {queueByArrival.map((person, index) => (
            <li key={person.id}>
              <strong>{index + 1}. {person.name}</strong>
              <span>Retiro: ${person.withdrawalAmount}</span>
              <span>Llegada: {person.arrivalDate.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
