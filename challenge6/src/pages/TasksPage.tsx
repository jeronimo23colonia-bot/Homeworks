import { useMemo, useState, type FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth.ts'
import { useTasks } from '../hooks/useTasks.ts'

type FormState = {
  title: string
  description: string
}

const initialFormState: FormState = {
  title: '',
  description: '',
}

export function TasksPage() {
  const { user, logout } = useAuth()
  const { tasks, addTask, editTask, deleteTask, toggleTaskDone } = useTasks()

  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const completedTasks = useMemo(() => tasks.filter((task) => task.done).length, [tasks])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formState.title.trim()) {
      return
    }

    if (editingTaskId) {
      editTask(editingTaskId, formState)
      setEditingTaskId(null)
    } else {
      addTask(formState)
    }

    setFormState(initialFormState)
  }

  const handleEdit = (taskId: string, title: string, description: string) => {
    setEditingTaskId(taskId)
    setFormState({
      title,
      description,
    })
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
    setFormState(initialFormState)
  }

  return (
    <main className="app-shell tasks-shell">
      <section className="tasks-panel card border-0 shadow-lg">
        <header className="card-header bg-transparent border-0 p-4 p-md-5 pb-3">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
            <div>
              <p className="eyebrow">Task app</p>
              <h1 className="display-title mb-2">Mis tareas</h1>
              <p className="text-secondary mb-0">
                {completedTasks} de {tasks.length} completadas
              </p>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <span className="badge text-bg-light p-2">{user?.email}</span>
              <button type="button" className="btn btn-outline-danger" onClick={() => void logout()}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="card-body p-4 p-md-5 pt-2">
          <form className="task-form row g-3 align-items-end" onSubmit={handleSubmit}>
            <div className="col-12 col-md-4">
              <label htmlFor="taskTitle" className="form-label">
                Titulo
              </label>
              <input
                id="taskTitle"
                type="text"
                className="form-control"
                placeholder="Ej: Estudiar React"
                value={formState.title}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    title: event.target.value,
                  }))
                }
              />
            </div>

            <div className="col-12 col-md-5">
              <label htmlFor="taskDescription" className="form-label">
                Descripcion
              </label>
              <input
                id="taskDescription"
                type="text"
                className="form-control"
                placeholder="Detalles de la tarea"
                value={formState.description}
                onChange={(event) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    description: event.target.value,
                  }))
                }
              />
            </div>

            <div className="col-12 col-md-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary flex-fill">
                {editingTaskId ? 'Guardar' : 'Crear'}
              </button>
              {editingTaskId && (
                <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <hr className="my-4" />

          {tasks.length === 0 ? (
            <div className="empty-state text-center p-4 rounded-3">
              <h2 className="h5">Aun no hay tareas</h2>
              <p className="text-secondary mb-0">Crea tu primera tarea para comenzar.</p>
            </div>
          ) : (
            <ul className="list-group list-group-flush gap-3">
              {tasks.map((task) => (
                <li key={task.id} className="list-group-item task-row rounded-3 border">
                  <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
                    <div>
                      <h2 className={`h5 mb-1 ${task.done ? 'text-decoration-line-through text-secondary' : ''}`}>
                        {task.title}
                      </h2>
                      <p className="mb-1 text-secondary">{task.description || 'Sin descripcion'}</p>
                      <small className="text-muted">
                        {new Date(task.createdAt).toLocaleString('es-ES', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </small>
                    </div>

                    <div className="d-flex gap-2 align-self-start align-self-md-center">
                      <button
                        type="button"
                        className={`btn ${task.done ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => toggleTaskDone(task.id)}
                      >
                        {task.done ? 'Marcar pendiente' : 'Completar'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(task.id, task.title, task.description)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
