import { useState } from 'react';

const CrearProyectos = () => {
  // Hooks de estado
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptionErrorMessage, setShowOptionErrorMessage] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false);

  // Maneja cambios en la seleccion y la actualiza en el estado.
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  // Maneja cambios en el input y actualiza el estado.
  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);
  };

  const handleGuardarClick = () => {
    if (!inputText) {
      // Si no hay texto en el input, muestra el mensaje de error
      setShowTitleErrorMessage(true);
    } else {
      // Si hay texto en el input, cambia al modo de edicion
      setIsEditing(false);
      setShowTitleErrorMessage(false);
    }
  };

  const handleEditarClick = () => {
    // Cambia de nuevo al modo de edicion
    setIsEditing(true);
  };

  const handleSubirProyectoClick = () => {
    if (selectedOption) {
      // Verifica si se ha ingresado un título
      if (!inputText) {
        setShowTitleErrorMessage(true);
      } else {
        if (selectedOption === 'bancoProyectos') {
          window.location.href = '/dashboard/crearproyecto_paso1';
        } else if (selectedOption === 'proyectosInnovadores') {
          window.location.href = '/dashboard/crearinnovador_paso1';
        }
      }
    } else {
      // Muestra el mensaje de error si no se ha seleccionado una opción
      setShowOptionErrorMessage(true);
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

        {showOptionErrorMessage && 
        <p className="text-sans-h5-red ms-1 ">
          Debes elegir donde quieres mostrar el proyecto antes de continuar.
        </p>
        }

        <div className="container">
          {isEditing ? (
            // Modo de edición
            <>
              <div className="d-flex flex-row justify-content-between my-3">
                <input
                  className="text-sans-h1 container-fluid ghost-input"
                  placeholder="Titulo del Proyecto"
                  value={inputText}
                  onChange={handleInputChange}
                />
                <button
                  className="btn-principal-s d-flex text-sans-h4 pb-0"
                  onClick={handleGuardarClick}
                >
                  <p className="text-sans-p-white text-decoration-underline">Guardar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">save</i>
                </button>
              </div>
              
              {showTitleErrorMessage && (
                <p className="text-sans-h5-red mt-1">Debes ingresar un título antes de continuar.</p>
              )}
            </>
          ) : (
            // Modo de visualización
            <div>
              <p>Título del Proyecto</p>
              <div className="d-flex flex-row justify-content-between my-3">
                <h1 className="text-sans-h1">{inputText || "Titulo del Proyecto"}</h1>
                <button
                  className="btn-secundario-s d-flex pb-0"
                  onClick={handleEditarClick}
                >
                  <p className=" text-decoration-underline">Editar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">edit</i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="container d-flex justify-content-end mt-5">
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