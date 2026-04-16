import { useMemo, useState } from 'react'
import './Aplicacion.css'
import { useAuth } from './almacenAutenticacion'
import { loadTree, saveTree } from './baseDatosMock'
import { collectFolderNodes, createNode, insertChildNode } from './utilidadesArbol'
import type { NodeType, TreeNode } from './tipos'

const ROOT_ID = 'root-folder'

const initialTree: TreeNode = {
  id: ROOT_ID,
  name: 'Mi unidad',
  type: 'folder',
  createdBy: 'sistema@local.dev',
  createdAt: '2026-04-01T00:00:00.000Z',
  children: [
    {
      id: 'folder-proyectos',
      name: 'Proyectos',
      type: 'folder',
      createdBy: 'sistema@local.dev',
      createdAt: '2026-04-01T00:00:00.000Z',
      children: [
        {
          id: 'file-reporte',
          name: 'reporte.txt',
          type: 'file',
          createdBy: 'sistema@local.dev',
          createdAt: '2026-04-01T00:00:00.000Z',
          children: [],
        },
      ],
    },
  ],
}

function toReadableDate(value: string): string {
  return new Date(value).toLocaleString('es-CO')
}

interface TreeNodeItemProps {
  node: TreeNode
  level: number
  selectedFolderId: string
  onSelectFolder: (folderId: string) => void
}

function TreeNodeItem({
  node,
  level,
  selectedFolderId,
  onSelectFolder,
}: TreeNodeItemProps) {
  const isFolder = node.type === 'folder'
  const selectedClass = isFolder && node.id === selectedFolderId ? 'is-selected' : ''

  return (
    <li>
      <div className={`tree-row ${selectedClass}`} style={{ paddingLeft: `${level * 18}px` }}>
        {isFolder ? (
          <button
            className="tree-label"
            type="button"
            onClick={() => onSelectFolder(node.id)}
            title="Seleccionar carpeta como padre"
          >
            <span className="icon" aria-hidden="true">
              {isFolder ? 'D' : 'A'}
            </span>
            <span>{node.name}</span>
          </button>
        ) : (
          <div className="tree-label is-file">
            <span className="icon" aria-hidden="true">
              A
            </span>
            <span>{node.name}</span>
          </div>
        )}
        <span className="meta">{node.createdBy}</span>
        <span className="meta">{toReadableDate(node.createdAt)}</span>
      </div>

      {node.children.length > 0 && (
        <ul className="tree-list">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedFolderId={selectedFolderId}
              onSelectFolder={onSelectFolder}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function Aplicacion() {
  const persistedTree = loadTree()
  const [tree, setTree] = useState<TreeNode>(persistedTree ?? initialTree)
  const [selectedFolderId, setSelectedFolderId] = useState<string>(ROOT_ID)
  const [newItemName, setNewItemName] = useState('')
  const [newItemType, setNewItemType] = useState<NodeType>('folder')
  const [email, setEmail] = useState('ana@correo.com')
  const [password, setPassword] = useState('123456')
  const [status, setStatus] = useState('')
  const { userEmail, isRegistered, login, logout, registeredEmails } = useAuth()

  const folderOptions = useMemo(() => collectFolderNodes(tree), [tree])

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    login(email, password).then((result) => {
      setStatus(result.message)
    })
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!userEmail) {
      setStatus('Debes iniciar sesion antes de crear carpetas o archivos.')
      return
    }

    if (!isRegistered) {
      setStatus('Tu correo no esta registrado. No tienes permiso para crear elementos.')
      return
    }

    const trimmedName = newItemName.trim()
    if (!trimmedName) {
      setStatus('Ingresa un nombre para el nuevo elemento.')
      return
    }

    const node = createNode(trimmedName, newItemType, userEmail)
    const result = insertChildNode(tree, selectedFolderId, node)

    if (!result.ok) {
      setStatus(result.message)
      return
    }

    setTree(result.tree)
    saveTree(result.tree)
    setNewItemName('')
    setStatus(`${result.message} Se guardo en la base de datos mock.`)
  }

  function handleResetTree() {
    setTree(initialTree)
    setSelectedFolderId(ROOT_ID)
    saveTree(initialTree)
    setStatus('Arbol reiniciado y persistido.')
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Parcial 2</p>
        <h1>Gestor Jerarquico de Carpetas y Archivos</h1>
        <p className="subtitle">
          Arbol n-ario implementado desde cero con autenticacion y persistencia.
        </p>
      </header>

      <section className="layout-grid">
        <article className="card panel-auth">
          <h2>Autenticacion (Mock)</h2>
          <form className="stack" onSubmit={handleLogin}>
            <label>
              Correo
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="usuario@correo.com"
              />
            </label>
            <label>
              Contrasena
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Tu clave"
              />
            </label>
            <div className="actions">
              <button className="btn btn-primary" type="submit">
                Iniciar sesion
              </button>
              <button className="btn" type="button" onClick={logout}>
                Cerrar sesion
              </button>
            </div>
          </form>

          <div className="status-box">
            <p>
              <strong>Usuario actual:</strong> {userEmail ?? 'Ninguno'}
            </p>
            <p>
              <strong>Registrado para crear:</strong> {isRegistered ? 'Si' : 'No'}
            </p>
            <p className="muted">
              Usuarios registrados: {registeredEmails.join(', ')}
            </p>
          </div>
        </article>

        <article className="card panel-create">
          <h2>Crear Elemento</h2>
          <form className="stack" onSubmit={handleCreate}>
            <label>
              Nombre
              <input
                type="text"
                value={newItemName}
                onChange={(event) => setNewItemName(event.target.value)}
                placeholder="Ej: tareas.md"
              />
            </label>

            <label>
              Tipo
              <select
                value={newItemType}
                onChange={(event) => setNewItemType(event.target.value as NodeType)}
              >
                <option value="folder">Carpeta</option>
                <option value="file">Archivo</option>
              </select>
            </label>

            <label>
              Carpeta padre
              <select
                value={selectedFolderId}
                onChange={(event) => setSelectedFolderId(event.target.value)}
              >
                {folderOptions.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="actions">
              <button className="btn btn-primary" type="submit">
                Crear y guardar
              </button>
              <button className="btn" type="button" onClick={handleResetTree}>
                Reiniciar arbol
              </button>
            </div>
          </form>
          <p className="muted">
            Regla aplicada: un archivo no puede tener hijos; solo las carpetas pueden
            contener nodos.
          </p>
        </article>
      </section>

      <section className="card panel-tree">
        <div className="tree-header">
          <h2>Vista del Arbol N-ario</h2>
          <p>
            Haz clic en una carpeta para seleccionarla como destino de creacion.
          </p>
        </div>
        <ul className="tree-list">
          <TreeNodeItem
            node={tree}
            level={0}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
          />
        </ul>
      </section>

      {status && <p className="global-status">{status}</p>}
    </main>
  )
}

export default Aplicacion
