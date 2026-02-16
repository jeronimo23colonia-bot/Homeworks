import { useState, useEffect } from "react";
import Contactos from "./contactos";
import ModificarContactos from "./modificarcontactos";  

function Loader() {
    const [loading, setLoading] = useState(true);
    const [contactos, setContactos] = useState([
      { id: 1, nombre: "Juan Pérez", telefono: "1234567890" },
      { id: 2, nombre: "María López", telefono: "0987654321" },
      { id: 3, nombre: "Carlos García", telefono: "5551234567" },
    ]);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);  

    if (loading) {
        return (
            <div>
                <p>cargando contactos...</p>
            </div>
        );
    }

    return (
        <>
            <Contactos contactos={contactos} />
            <ModificarContactos contactos={contactos} setContactos={setContactos} />
        </>
    );
}

export default Loader;