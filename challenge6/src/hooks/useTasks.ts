import { useContext } from 'react'
import { TasksContext } from '../contexts/tasks-context.ts'

export function useTasks() {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks debe usarse dentro de TasksProvider')
  }

  return context
}
