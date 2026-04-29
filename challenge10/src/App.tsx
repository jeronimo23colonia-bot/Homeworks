import { useRef, useEffect, useState } from 'react'
import './App.css'

interface Person {
  id: string
  name: string
  age: number
  city: string
}

interface City {
  id: string
  name: string
}

interface GraphNode {
  id: string
  name: string
  type: 'person' | 'city'
  x: number
  y: number
  vx: number
  vy: number
}

interface GraphLink {
  source: string
  target: string
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [peopleList, setPeopleList] = useState<Person[]>([
    { id: 'person1', name: 'Juan', age: 28, city: 'Madrid' },
    { id: 'person2', name: 'María', age: 32, city: 'Barcelona' },
    { id: 'person3', name: 'Carlos', age: 25, city: 'Madrid' },
    { id: 'person4', name: 'Laura', age: 30, city: 'Valencia' },
    { id: 'person5', name: 'Pedro', age: 35, city: 'Barcelona' },
  ])

  const [cities] = useState<City[]>([
    { id: 'Madrid', name: 'Madrid' },
    { id: 'Barcelona', name: 'Barcelona' },
    { id: 'Valencia', name: 'Valencia' },
  ])

  // Create graph nodes and links
  const nodes: GraphNode[] = [
    ...peopleList.map((person, idx) => ({
      id: person.id,
      name: `${person.name} (${person.age})`,
      type: 'person' as const,
      x: 100 + idx * 60,
      y: 100,
      vx: 0,
      vy: 0,
    })),
    ...cities.map((city, idx) => ({
      id: city.id,
      name: city.name,
      type: 'city' as const,
      x: 150 + idx * 100,
      y: 300,
      vx: 0,
      vy: 0,
    })),
  ]

  const links: GraphLink[] = peopleList.map((person) => ({
    source: person.id,
    target: person.city,
  }))

  // Draw force-directed graph
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    let nodesCopy = nodes.map(n => ({ ...n }))

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#f5f5f5'
      ctx.fillRect(0, 0, width, height)

      // Apply forces
      for (let i = 0; i < 10; i++) {
        // Repulsion forces
        for (let j = 0; j < nodesCopy.length; j++) {
          for (let k = j + 1; k < nodesCopy.length; k++) {
            const dx = nodesCopy[k].x - nodesCopy[j].x
            const dy = nodesCopy[k].y - nodesCopy[j].y
            const distance = Math.sqrt(dx * dx + dy * dy) || 1
            const repulsion = 5000 / (distance * distance)

            const fx = (dx / distance) * repulsion
            const fy = (dy / distance) * repulsion

            nodesCopy[j].vx -= fx * 0.1
            nodesCopy[j].vy -= fy * 0.1
            nodesCopy[k].vx += fx * 0.1
            nodesCopy[k].vy += fy * 0.1
          }
        }

        // Attraction forces along links
        links.forEach(link => {
          const source = nodesCopy.find(n => n.id === link.source)
          const target = nodesCopy.find(n => n.id === link.target)

          if (source && target) {
            const dx = target.x - source.x
            const dy = target.y - source.y
            const distance = Math.sqrt(dx * dx + dy * dy) || 1
            const attraction = (distance * distance) / 500

            const fx = (dx / distance) * attraction
            const fy = (dy / distance) * attraction

            source.vx += fx * 0.1
            source.vy += fy * 0.1
            target.vx -= fx * 0.1
            target.vy -= fy * 0.1
          }
        })
      }

      // Update positions
      nodesCopy.forEach(node => {
        node.vx *= 0.9
        node.vy *= 0.9
        node.x += node.vx
        node.y += node.vy

        // Boundary
        node.x = Math.max(40, Math.min(width - 40, node.x))
        node.y = Math.max(40, Math.min(height - 40, node.y))
      })

      // Draw links
      ctx.strokeStyle = '#ccc'
      ctx.lineWidth = 2
      links.forEach(link => {
        const source = nodesCopy.find(n => n.id === link.source)
        const target = nodesCopy.find(n => n.id === link.target)

        if (source && target) {
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        }
      })

      // Draw nodes
      nodesCopy.forEach(node => {
        const radius = node.type === 'city' ? 20 : 15

        // Draw circle
        ctx.fillStyle = node.type === 'city' ? '#4ECDC4' : '#FF6B6B'
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
        ctx.fill()

        // Draw text
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        if (node.type === 'city') {
          ctx.fillText(node.name, node.x, node.y)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [peopleList, cities])

  // Get people living in selected city
  const peopleInCity = selectedCity
    ? peopleList.filter((person) => person.city === selectedCity)
    : []

  const [newPerson, setNewPerson] = useState({
    name: '',
    age: '',
    city: cities[0]?.id || '',
  })

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.age && newPerson.city) {
      const newId = `person${Date.now()}`
      setPeopleList([
        ...peopleList,
        {
          id: newId,
          name: newPerson.name,
          age: parseInt(newPerson.age),
          city: newPerson.city,
        },
      ])
      setNewPerson({
        name: '',
        age: '',
        city: cities[0]?.id || '',
      })
    }
  }

  return (
    <div className="app-container">
      <h1>Challenge 10: Friends & Cities Graph</h1>

      <div className="main-content">
        <div className="graph-section">
          <h2>Graph Visualization</h2>
          <div className="graph-container">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>

        <div className="sidebar">
          <div className="add-person-section">
            <h3>Add New Person</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPerson.name}
              onChange={(e) =>
                setNewPerson({ ...newPerson, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Age"
              value={newPerson.age}
              onChange={(e) =>
                setNewPerson({ ...newPerson, age: e.target.value })
              }
            />
            <select
              value={newPerson.city}
              onChange={(e) =>
                setNewPerson({ ...newPerson, city: e.target.value })
              }
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddPerson}>
              Add Person
            </button>
          </div>

          <div className="cities-section">
            <h3>Cities</h3>
            <div className="city-buttons">
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  className={`city-btn ${selectedCity === city.id ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedCity(selectedCity === city.id ? '' : city.id)
                  }
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          <div className="people-list-section">
            <h3>
              {selectedCity ? `People in ${selectedCity}` : 'All People'}
            </h3>
            <ul className="people-list">
              {(selectedCity ? peopleInCity : peopleList).map((person) => (
                <li key={person.id}>
                  <div className="person-card">
                    <strong>{person.name}</strong>
                    <span>Age: {person.age}</span>
                    <span>City: {person.city}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
