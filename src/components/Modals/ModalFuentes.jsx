import { useState } from "react";
import { ModalBase } from './ModalBase';

const ModalFuentes = () => {
  const [nuevaFuente, setNuevaFuente] = useState('');
  const [fuentesIngresadas, setFuentesIngresadas] = useState([]);

  const handleSaveFuenteClick = () => {
    if (nuevaFuente) {
      setFuentesIngresadas([...fuentesIngresadas, nuevaFuente]);
      setNuevaFuente(''); // Limpia el campo de entrada
    }
  };

  return (
    <>
      <ModalBase btnName="Agregar fuentes" btnIcon="add" title="Agregar fuente (Opcional)">
      {fuentesIngresadas.length > 0 && (
        <div className="d-flex flex-column my-4">
          <p>Fuentes Ingresadas:</p>
          <ul>
            {fuentesIngresadas.map((fuente, index) => (
              <li key={index}>
                <p>{fuente}</p>
              </li>
            ))}
          </ul>  
        </div>
        )}

        <p>Enlace de la fuente referencial:</p>
        <div className="input-group-prepend d-flex">
          <span className="input-group-text">https://</span>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Ingrese la dirección web"
          value={nuevaFuente}
          onChange={(event) => setNuevaFuente(event.target.value)}
          />
        </div>

        <hr/>
        <div className="d-flex justify-content-between">
          <button className="btn-secundario-s d-flex align-items-center">
            <i className="material-symbols-rounded">chevron_left</i>
            <p className="text-decoration-underline mb-0">Volver a la solicitud</p>
          </button>
          <button className="btn-principal-s d-flex  align-items-center" onClick={handleSaveFuenteClick}>
            <i className="material-symbols-rounded">add</i>
            <p className="text-decoration-underline mb-0">Agregar Fuente</p>
          </button>
        </div> 
      </ModalBase>
    </>
  )
}

export default ModalFuentes;