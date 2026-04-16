import type { NodeType, TreeNode } from './tipos'

export interface InsertResult {
  ok: boolean
  tree: TreeNode
  message: string
}

export function createNode(
  name: string,
  type: NodeType,
  createdBy: string,
): TreeNode {
  return {
    id: crypto.randomUUID(),
    name,
    type,
    createdBy,
    createdAt: new Date().toISOString(),
    children: [],
  }
}

export function findNodeById(node: TreeNode, nodeId: string): TreeNode | null {
  if (node.id === nodeId) {
    return node
  }

  for (const child of node.children) {
    const found = findNodeById(child, nodeId)
    if (found) {
      return found
    }
  }

  return null
}

export function collectFolderNodes(node: TreeNode): TreeNode[] {
  const folders: TreeNode[] = []

  function visit(current: TreeNode): void {
    if (current.type === 'folder') {
      folders.push(current)
      for (const child of current.children) {
        visit(child)
      }
    }
  }

  visit(node)
  return folders
}

function sortChildren(a: TreeNode, b: TreeNode): number {
  if (a.type !== b.type) {
    return a.type === 'folder' ? -1 : 1
  }

  return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
}

export function insertChildNode(
  root: TreeNode,
  parentId: string,
  child: TreeNode,
): InsertResult {
  function insert(current: TreeNode): [TreeNode, boolean, string] {
    if (current.id === parentId) {
      if (current.type !== 'folder') {
        return [current, false, 'No se puede crear dentro de un archivo.']
      }

      const updated = {
        ...current,
        children: [...current.children, child].sort(sortChildren),
      }
      return [updated, true, 'Elemento creado correctamente.']
    }

    let changed = false
    let statusMessage = 'No se encontro la carpeta padre seleccionada.'

    const nextChildren = current.children.map((node) => {
      const [updatedChild, inserted, message] = insert(node)
      if (inserted) {
        changed = true
      }
      if (message) {
        statusMessage = message
      }
      return updatedChild
    })

    if (!changed) {
      return [current, false, statusMessage]
    }

    return [{ ...current, children: nextChildren }, true, statusMessage]
  }

  const [tree, ok, message] = insert(root)
  return { ok, tree, message }
}
