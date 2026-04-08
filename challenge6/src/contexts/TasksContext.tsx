import { useEffect, useState, type ReactNode } from 'react'
import type { Task } from '../types/task.ts'
import { TasksContext, type TasksContextValue } from './tasks-context.ts'

const STORAGE_KEY = 'challenge6_tasks'

type TasksProviderProps = {
  children: ReactNode
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return []
    }

    try {
      return JSON.parse(saved) as Task[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask: TasksContextValue['addTask'] = ({ title, description }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    }

    setTasks((prevTasks) => [newTask, ...prevTasks])
  }

  const editTask: TasksContextValue['editTask'] = (taskId, { title, description }) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
            }
          : task,
      ),
    )
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskDone = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              done: !task.done,
            }
          : task,
      ),
    )
  }

  const value = {
    tasks,
    addTask,
    editTask,
    deleteTask,
    toggleTaskDone,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
