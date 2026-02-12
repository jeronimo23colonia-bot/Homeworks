import React from 'react';

function Contador() {
    
    const [contador, setContador] = React.useState(0);      
    return (
    <>
        <p>Contador: {contador} </p>
            <button onClick={() => setContador(contador + 1)}>
            Incrementar
            </button>
       
    </>
    );
}

export default Contador;