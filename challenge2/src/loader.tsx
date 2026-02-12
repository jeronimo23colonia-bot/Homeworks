import { useState, useEffect } from "react";
function Loader() {
    const [loading, setLoading] = useState(true);
    
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
        <div>
  
        </div>
    );
}

export default Loader;  