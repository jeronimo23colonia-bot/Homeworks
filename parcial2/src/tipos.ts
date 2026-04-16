export type NodeType = 'folder' | 'file'

export interface TreeNode {
  id: string
  name: string
  type: NodeType
  createdBy: string
  createdAt: string
  children: TreeNode[]
}

export interface AppUser {
  email: string
  registeredAt: string
}
