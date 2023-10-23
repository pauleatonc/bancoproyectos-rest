import { useState } from 'react';

const EvaluarSeccion = ({ opciones, onCheckboxSelect, onReject }) => {
  const [mostrarRazones, setMostrarRazones] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);

  const handleSiClick = () => {
    console.log("Clic en 'Sí'");
    setRespuesta('Si');
    setMostrarRazones(false);
    setOpcionesSeleccionadas([]);
    onCheckboxSelect([]);
  };

  const handleNoClick = () => {
    setRespuesta('No');
    setMostrarRazones(true);
    onReject();
  };

  const handleOpcionSeleccionada = (event, value) => {
    const seleccionada = event.target.checked;
    const nuevasOpcionesSeleccionadas = seleccionada
      ? [...opcionesSeleccionadas, value]
      : opcionesSeleccionadas.filter((opcion) => opcion !== value);
  
    setOpcionesSeleccionadas(nuevasOpcionesSeleccionadas);
    onCheckboxSelect(nuevasOpcionesSeleccionadas);
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
          <div className="dropdown">
            <button className="dropdown-btn dropdown-toggle p-2 px-4 text-sans-p-lightgrey text-decoration-underline" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              {opcionesSeleccionadas.length > 0 ? `${opcionesSeleccionadas.length} Razones seleccionadas` : 'Elige una o más razones'}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {opciones.map((opcion) => (
                <li key={opcion.value}>
                  <label className="form-check-label d-flex">
                    <input 
                    type="checkbox" 
                    className="form-check-input" 
                    value={opcion.value}
                    onChange={(e) => handleOpcionSeleccionada(e, opcion.value)} 
                    /> 
                    <p className="ms-2">{opcion.label}</p>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
};

export default EvaluarSeccion;