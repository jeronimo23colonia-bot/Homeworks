import type { AppUser, TreeNode } from './tipos'

const TREE_KEY = 'parcial2.tree.v1'
const USERS_KEY = 'parcial2.users.v1'

const defaultUsers: AppUser[] = [
  { email: 'ana@correo.com', registeredAt: '2026-04-01T10:00:00.000Z' },
  { email: 'luis@correo.com', registeredAt: '2026-04-01T10:00:00.000Z' },
  { email: 'soporte@empresa.com', registeredAt: '2026-04-01T10:00:00.000Z' },
]

export function loadRegisteredUsers(): AppUser[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return defaultUsers
  }

  try {
    const parsed = JSON.parse(raw) as AppUser[]
    return parsed
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    return defaultUsers
  }
}

export function isRegisteredUser(email: string): boolean {
  const users = loadRegisteredUsers()
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function saveTree(tree: TreeNode): void {
  localStorage.setItem(TREE_KEY, JSON.stringify(tree))
}

export function loadTree(): TreeNode | null {
  const raw = localStorage.getItem(TREE_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as TreeNode
  } catch {
    return null
  }
}
