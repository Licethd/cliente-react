import React, { useState } from 'react'
import { ItemService } from './services/ItemService';
const Buscador = () => {
    const [texto, setTexto] = useState('');
    const clickBuscar = () => {
        (new ItemService('http://localhost:7007')).buscarPorNombre(texto)
            .then((lista) => {
                alert('Se encontraron ' + lista.length + ' items');
                console.log(lista);
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <input placeholder='Buscar' value={texto} onChange={(e) => setTexto(e.target.value)} />
            <button onClick={clickBuscar}>Buscar</button>
        </div>
    );
}

export default Buscador;