import { useState, useEffect } from "react";
import Contactos from "./contactos";  

function Loader() {
    const [loading, setLoading] = useState(true);
    const [contactos, setContactos] = useState([
        { id: 1, nombre: "Juan Pérez", telefono: "123-456-7890" },
        { id: 2, nombre: "María López", telefono: "098-765-4321" },
        { id: 3, nombre: "Carlos García", telefono: "555-123-4567" },
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
            <Contactos contactos={contactos} setContactos={setContactos} />
        </>
    );
}

export default Loader;