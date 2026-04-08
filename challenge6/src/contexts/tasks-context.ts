import { createContext } from 'react'
import type { Task } from '../types/task.ts'

type TaskInput = {
  title: string
  description: string
}

export type TasksContextValue = {
  tasks: Task[]
  addTask: (input: TaskInput) => void
  editTask: (taskId: string, input: TaskInput) => void
  deleteTask: (taskId: string) => void
  toggleTaskDone: (taskId: string) => void
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined)
