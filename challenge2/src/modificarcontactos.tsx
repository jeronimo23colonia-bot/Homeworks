import { useState } from "react";

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

function ModificarContactos({ contactos, setContactos }: { contactos: Contacto[]; setContactos: React.Dispatch<React.SetStateAction<Contacto[]>> }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [idEditar, setIdEditar] = useState<number | null>(null);

  const agregar = () => {
    if (nombre && telefono) {
      setContactos([...contactos, { id: Date.now(), nombre, telefono }]);
      setNombre("");
      setTelefono("");
    }
  };

  const eliminar = (id: number) => {
    setContactos(contactos.filter(c => c.id !== id));
  };

  const cargarEditar = (contacto: { id: number; nombre: string; telefono: string }) => {
    setIdEditar(contacto.id);
    setNombre(contacto.nombre);
    setTelefono(contacto.telefono);
  };

  const actualizar = () => {
    setContactos(contactos.map(c => 
      c.id === idEditar ? { ...c, nombre, telefono } : c
    ));
    setIdEditar(null);
    setNombre("");
    setTelefono("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Modificar Contactos</h1>

      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ display: "block", marginBottom: "5px" }} />
        <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ display: "block", marginBottom: "5px" }} />
        <button onClick={idEditar ? actualizar : agregar}>{idEditar ? "Actualizar" : "Agregar"}</button>
        {idEditar && <button onClick={() => { setIdEditar(null); setNombre(""); setTelefono(""); }}>Cancelar</button>}
      </div>

      <ul>
        {contactos.map(c => (
          <li key={c.id}>
            {c.nombre} - {c.telefono}
            <button onClick={() => cargarEditar(c)}>Editar</button>
            <button onClick={() => eliminar(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModificarContactos;
