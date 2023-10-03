import { useState } from "react";
import  ModalAgregarFuente  from "../../../../components/Modals/ModalAgregarFuente";
import ModalEditarFuente from "../../../../components/Modals/ModalEditarFuente";
import UploadImg from "../../../../components/Commons/UploadImg";
import UploadImgsm from "../../../../components/Commons/UploadImgsm";

const CrearProyectoInnovadorP1 = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false); // comienza en modo visualizacion
  const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false);
  const [inputDescr, setInputDescr] = useState('');
  const [isEditingDescr, setIsEditingDescr] = useState(true); // comienza en modo edicion
  const [showDescrError, setShowDescrError] = useState(false);

  // Hooks de estado para conteo de caracteres maximos en Titulo
  const [maxTitleChars] = useState(70); // Maximo de caracteres para el titulo
  const [titleCharsCount, setTitleCharsCount] = useState(0);
  const [titleCharsExceeded, setTitleCharsExceeded] = useState(false);
  //Hooks de estado para conteo de caracteres maximos en Descripcion
  const [maxDescChars] = useState(700); // Maximo de caracteres para la descripcion
  const [descCharsCount, setDescCharsCount] = useState(0);
  const [descCharsExceeded, setDescCharsExceeded] = useState(false);


  // LOGICA TITULO
  // Maneja cambios en el input Titulo y actualiza el estado.
  const handleTitleInputChange = (event) => {
    const text = event.target.value;
    if (text.length <= maxTitleChars) {
      setInputTitle(text);
      setTitleCharsCount(text.length);
      setTitleCharsExceeded(false);
    } else {
      setTitleCharsExceeded(true);
    }
  };

  const handleSaveTitleClick = () => {
    const trimmedText = inputTitle.trim();
    if (!trimmedText) {
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
    if (text.length <= maxDescChars) {
      setInputDescr(text);
      setDescCharsCount(text.length);
      setDescCharsExceeded(false);
    } else {
      setDescCharsExceeded(true);
    }
  };

  const handleSaveDescrClick = () => {
    const trimmedText = inputDescr.trim();
    if (!trimmedText) {
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
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <p className="text-sans-h5">Escribe el título del proyecto (Obligatorio)</p>
                  <input
                    className="text-sans-h3-lightgrey container ghost-input ps-0"
                    placeholder="Titulo del Proyecto"
                    value={inputTitle}
                    onChange={handleTitleInputChange}
                  />
                  <p className={`text-sans-h5 ${titleCharsExceeded ? "text-sans-h5-red" : ""}`}> {titleCharsCount} / {maxTitleChars} caracteres </p>
                </div> 

                <button
                  className="btn-principal-s d-flex text-sans-h4 pb-0 align-self-end"
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
                  className="description-input text-sans-p container ghost-input"
                  placeholder="Descripción del proyecto"
                  value={inputDescr}
                  onChange={handleDescrInputChange}
                />
                <p className={`text-sans-h5 ${descCharsExceeded ? "text-sans-h5-red" : ""}`}>{descCharsCount} / {maxDescChars} caracteres</p>
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
                <div className="description-container">
                  <p className="text-sans-p">{inputDescr || "Descripción del proyecto"} </p>
                </div>
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
        {/* if no hay fuentes ingresadas */}
        <div className="container d-flex flex-row justify-content-between my-4">
          <div className="d-flex flex-column">
            <h3 className="text-sans-h35">Fuentes </h3>
            <p className="text-sans-h5">(Opcional)</p>
          </div>
          <ModalAgregarFuente/>
        </div>

        {/* if hay fuentes ingresadas */}
        <div className="container">
          <div className="d-flex flex-column">
            <h3 className="text-sans-h35">Fuentes </h3>
            <p className="text-sans-h5">(Opcional)</p>
          </div>
          {/* Renderizar dinamicamente segun informacion de la base de datos */}
          <div>
            <div className="my-2 d-flex justify-content-between">
              <div className="d-flex flex-row">
                <p className="text-decoration-underline">Fuente Ejemplo 1</p>
                <i className="material-symbols-rounded ms-2 pt-1">open_in_new</i>
              </div>
              <ModalEditarFuente/>
            </div>
            <div className="my-2 d-flex justify-content-between">
              <div className="d-flex flex-row">
                <p className="text-decoration-underline">Fuente Ejemplo 2</p>
                <i className="material-symbols-rounded ms-2 pt-1">open_in_new</i>
              </div>
              <ModalEditarFuente/>
            </div>
          </div>
          <div className="mt-5">
            <ModalAgregarFuente/>
          </div> 
        </div> 
      </div>
      
      <div className="col-6 ms-5">
        {/* Img Portada - componente */}
        
        <div className="">
            <h3 className="text-sans-h35">Imagen de Portada</h3>
            <UploadImg/>
        </div>
        <div className="d-flex flex-row text-sans-h5-blue">
          <i className="material-symbols-rounded me-2">info</i>
          <p className="pt-1">La imagen de portada será la primera que se verá en la galería y en el sitio web.</p>
        </div>

        {/* Img Miniatura - componente */}
        <div className="mt-5">
          <UploadImgsm />
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