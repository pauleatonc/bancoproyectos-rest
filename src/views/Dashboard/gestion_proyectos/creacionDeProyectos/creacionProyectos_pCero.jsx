import { useState } from 'react';

const CrearProyectos = () => {
  // Hooks de estado
  const [selectedOption, setSelectedOption] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Almacena opcion seleccionada
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubirProyectoClick = () => {
    if (selectedOption) {
      // Redirige segun la opcion seleccionada
      if (selectedOption === 'bancoProyectos') {
        window.location.href = '/dashboard/crearproyecto_paso1';
      } else if (selectedOption === 'proyectosInnovadores') {
        window.location.href = '/dashboard/crearinnovador_paso1';
      }
    } else {
      // Muestra el mensaje de error si no se ha seleccionado una opcion
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="container view-container">
      <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto</h2>
      <div className="col-10 mx-5">
        <h3 className="text-sans-h3 ms-1">Elige donde quieres mostrar el proyecto:</h3>

        <div className="row my-5">
          <div className="col-5 opt-container p-3 mx-3">
            <h3 className="text-serif-h3 text-center text-decoration-underline">Banco de Proyectos</h3>
            <hr/>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Proyectos que ya han sido ejecutados en alguna comuna de Chile.</p>
            </div>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Muestran información como: año de construcción, región y comuna donde se realizó, y el código SUBDERE asociado.</p>
            </div>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Comparten documentación como presupuestos, especificaciones técnicas, entre otros.</p>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
              <button
              className="btn-secundario-s text-decoration-underline px-4"
              onClick={() => handleOptionChange('bancoProyectos')}
              value='bancoProyectos'
              >
                Seleccionar
              </button>
            </div>
          </div>

          <div className="col-5 opt-container p-3 mx-3">
            <h3 className="text-serif-h3 text-center text-decoration-underline">Proyectos Innovadores</h3>
            <hr/>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Proyectos referenciales que no necesariamente han sido ejecutados.</p>
            </div>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Debes tener fotos para mostrar.</p>
            </div>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Puedes agregar enlaces a sitios web referenciales.</p>
            </div>
            <div className="d-flex flex-row">
              <i className="material-symbols-rounded me-2">check</i>
              <p className="text-sans-h5">Proyectos novedosos que escapan de lo que normalmente se postula.</p>
            </div>
            <hr/>
            <div className="d-flex justify-content-center">
              <button
              className="btn-secundario-s text-decoration-underline px-4"
              onClick={() => handleOptionChange('proyectosInnovadores')}
              value="proyectosInnovadores"
              >
                Seleccionar
              </button>
            </div>
          </div>
        </div>

        {showErrorMessage && 
        <p className="text-sans-h5-red ms-1 ">
          Debes elegir donde quieres mostrar el proyecto antes de continuar.
        </p>
        }

        <div>
          <p className="text-sans-h5 mb-1">Escribe el título del proyecto (Obligatorio)</p>
          <div className="d-flex justify-content-between">
            <input className="text-sans-h1 container-fluid ghost-input" placeholder="Título del Proyecto"></input>
            <button className="btn-principal-s d-flex text-sans-h4 pb-0">
              <p className="text-sans-p-white text-decoration-underline">Guardar</p>
              <i className="material-symbols-rounded ms-2 pt-1">save</i>
            </button >
          </div>
          <p className="text-sans-h5 mt-1">CONTADOR DE CARACTERES 0 / 70</p>
          {/* Aparece condificonalmente */}
          <p className="text-sans-h5-red"> Mensaje de error.</p>
        </div>

        <div className="container d-flex justify-content-end">
          <button
          onClick={handleSubirProyectoClick} 
          className="btn-principal-s d-flex text-sans-h4 pb-0"
          >
            <p className="text-sans-h4-white text-decoration-underline">Subir Proyecto</p>
            <i className="material-symbols-rounded ms-2">arrow_forward_ios</i> 
          </button>
        </div>
        

        </div>
      </div>
    );
  };
  export default CrearProyectos; 