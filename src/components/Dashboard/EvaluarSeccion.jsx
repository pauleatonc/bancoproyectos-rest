import { useState } from 'react';

const EvaluarSeccion = () => {
  const [mostrarRazones, setMostrarRazones] = useState(false);
  const [respuesta, setRespuesta] = useState(null);

  const handleSiClick = () => {
    setRespuesta('Si');
    setMostrarRazones(false);
  };

  const handleNoClick = () => {
    setRespuesta('No');
    setMostrarRazones(true);
  };

  return (
    <div className="blue-sky-container p-3">
      <p className="text-sans-p fw-bolder">¿El contenido de esta sección es correcto?</p>
      <div className="d-flex">
        <button 
        className={`d-flex ${respuesta === 'No' ? 'alert-btn' : 'btn-secundario-s'}`}
        onClick={handleNoClick}
        >
          <p className="text-decoration-underline mb-0">No</p>
          {respuesta === 'No' && (
            <i className="material-symbols-rounded ms-2">close</i>
          )}
        </button>
        <button 
        className={`d-flex ms-2 ${respuesta === 'Si' ? 'success-btn' : 'btn-secundario-s'}`}
        onClick={handleSiClick}
        >
          <p className="text-decoration-underline mb-0">Si</p>
          {respuesta === 'Si' && (
            <i className="material-symbols-rounded ms-2">check</i>
          )}
        </button>
      </div>
      {mostrarRazones && (
        <div>
          <p className="text-sans-p fw-bolder my-3">Justifica</p>
          <div>DROPDOWN DE CHECKBOXES - SE GENERAN DE MANERA DINAMICA</div>
        </div>
      )}

    </div>
  )
};

export default EvaluarSeccion;