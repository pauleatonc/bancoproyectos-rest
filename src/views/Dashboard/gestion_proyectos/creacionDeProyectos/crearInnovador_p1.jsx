import { useState } from "react";
import  ModalFuentes  from "../../../../components/Modals/ModalFuentes";

const CrearProyectoInnovadorP1 = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false); // comienza en modo visualizacion
  const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false);
  const [inputDescr, setInputDescr] = useState('');
  const [isEditingDescr, setIsEditingDescr] = useState(true); // comienza en modo edicion
  const [showDescrError, setShowDescrError] = useState(false);

  // LOGICA TITULO
  // Maneja cambios en el input Titulo y actualiza el estado.
  const handleTitleInputChange = (event) => {
    const text = event.target.value;
    setInputTitle(text);
  };
  const handleSaveTitleClick = () => {
    if (!inputTitle) {
      // Si no hay texto en el input, muestra el mensaje de error
      setShowTitleErrorMessage(true);
    } else {
      // Si hay texto en el input, cambia al modo de visualizacion
      setIsEditingTitle(false);
      setShowTitleErrorMessage(false);
    }
  };
  const handleEditTitleClick = () => {
    // Cambia de nuevo al modo de edicion
    setIsEditingTitle(true);
  };

  // LOGICA DESCRIPCION
  // Maneja cambios en el input Descripcion y actualiza el estado.
  const handleDescrInputChange = (event) => {
    const text = event.target.value;
    setInputDescr(text);
  };
  const handleSaveDescrClick = () => {
    if (!inputDescr) {
      // Si no hay texto en el input, muestra el mensaje de error
      setShowDescrError(true);
    } else {
      // Si hay texto en el input, cambia al modo de visualizacion
      setIsEditingDescr(false);
      setShowDescrError(false);
    }
  };
  const handleEditDescrClick = () => {
    // Cambia de nuevo al modo de edicion
    setIsEditingDescr(true);
  };

  return (
    <div className="container view-container">
      <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Proyectos Innovadores</h2>

      <div className="row">
        <div className="col-5">
          {/* Titulo */}
          <div className="container">
          {isEditingTitle ? (
            // Modo de edición
            <>
              <div className="d-flex flex-row justify-content-between my-4">
                <input
                  className="text-sans-h3 container ghost-input"
                  placeholder="Titulo del Proyecto"
                  value={inputTitle}
                  onChange={handleTitleInputChange}
                />
                <button
                  className="btn-principal-s d-flex text-sans-h4 pb-0"
                  onClick={handleSaveTitleClick}
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
              <p className="text-sans-p">Título del Proyecto</p>
              <div className="d-flex flex-row justify-content-between my-3">
                <h3 className="text-sans-h3">{inputTitle || "Titulo del Proyecto"}</h3>
                <button
                  className="btn-secundario-s d-flex pb-0 px-3"
                  onClick={handleEditTitleClick}
                >
                  <p className="text-decoration-underline">Editar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">edit</i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Descripcion */}
        <div className="container">
          {isEditingDescr ? (
            // Modo de edición
            <>
              <div className="d-flex flex-column my-4">
                <h3 className="text-sans-h3">Descripción del proyecto</h3>
                <textarea
                  className="text-sans-p container ghost-input"
                  placeholder="Descripción del proyecto"
                  value={inputDescr}
                  onChange={handleDescrInputChange}
                />
                <p className="text-sans-h5">{inputDescr.length} / 700 caracteres.</p>
                <button
                  className="btn-principal-s d-flex text-sans-h4 pb-0 px-3"
                  onClick={handleSaveDescrClick}
                >
                  <p className="text-sans-p-white text-decoration-underline">Guardar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">save</i>
                </button>
              </div>
              
              {showDescrError && (
                <p className="text-sans-h5-red mt-1">Debes ingresar la descripción del proyecto antes de continuar.</p>
              )}
            </>
          ) : (
            // Modo de visualización
            <div>
              <p className="text-sans-p">Descripción del proyecto</p>
              <div className="d-flex flex-column my-3">
                <pre> 
                  <p className="text-sans-p mb-4">{inputDescr || "Descripción del proyecto"}</p>
                </pre>
                <button
                  className="btn-secundario-s d-flex pb-0 px-3"
                  onClick={handleEditDescrClick}
                >
                  <p className="text-decoration-underline">Editar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">edit</i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fuentes */}
        <div className="d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-column">
            <h3 className="text-sans-h35">Fuentes </h3>
            <p className="text-sans-h5">(Opcional)</p>
          </div>
          <ModalFuentes/>
        </div>
      </div>

      <div className="col-6 ms-5">
        {/* Img Portada - componente */}
        <div className="">
            <h3 className="text-sans-h35">Imagen de Portada</h3>
            <div className="img-section-l my-3">
              <i className="material-symbols-rounded me-2">add_a_photo</i>
              <p className="text-sans-p">Agregar foto de portada</p>
            </div>
        </div>

        {/* Img Miniatura - componente */}
        <div className="mt-5">
            <h3 className="text-sans-h35">Imágenes para la galería</h3>
            <p className="text-sans-h5">(Máximo 10 imágenes)</p>
            <div className="img-section-s my-3">
              <i className="material-symbols-rounded me-2">add_a_photo</i>
              <p className="text-sans-p">Agregar fotos</p>
            </div>
        </div>
      </div>
    </div>

      <div className="col-10 mt-5 d-flex justify-content-end">
        <button className="btn-principal-s d-flex text-sans-h4 pb-0">
          <p className="text-decoration-underline">Enviar solicitud</p>
          <i className="material-symbols-rounded ms-2">arrow_forward_ios</i> 
        </button>
      </div>

      <div className="col-10 mt-5 d-flex justify-content-start mb-5">
        <button className="red-btn text-sans-h4 d-flex pb-0">
          <p className="text-decoration-underline">Deshechar solicitud</p>
          <i className="material-symbols-rounded ms-2">delete</i> </button>
      </div>
    </div>
  )
}

export default CrearProyectoInnovadorP1; 