const contacto = [
  { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", telefono: "123-456-7890" },
  { id: 2, nombre: "María López", email: "maria.lopez@example.com", telefono: "098-765-4321" },
  { id: 3, nombre: "Carlos García", email: "carlos.garcia@example.com", telefono: "555-123-4567" },
];
function Contactos() {
  return <>
  {
  contacto.map((contacto) => { 
     return <p key={contacto.id}>{contacto.nombre} - {contacto.email} - {contacto.telefono}</p>
    })

  }
  </>
}
export default Contactos;