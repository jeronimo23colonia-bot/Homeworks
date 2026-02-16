interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

function Contactos({ contactos }: { contactos: Contacto[] }) {
  return <>
  {
  contactos.map((contacto) => { 
     return <p key={contacto.id}>{contacto.nombre} - {contacto.telefono}</p>
    })
  }
  </>
}
export default Contactos;