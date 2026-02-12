import { useState } from 'react'

export default function EjemploContador() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Ejemplo Contador</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}