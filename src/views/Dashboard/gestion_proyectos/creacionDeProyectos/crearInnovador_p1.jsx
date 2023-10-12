import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  ModalAgregarFuente  from "../../../../components/Modals/ModalAgregarFuente";
import ModalEditarFuente from "../../../../components/Modals/ModalEditarFuente";
import UploadImg from "../../../../components/Commons/UploadImg";
import UploadImgsm from "../../../../components/Commons/UploadImgsm";
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";

const CrearProyectoInnovadorP1 = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false); // comienza en modo visualizacion
  const [showTitleErrorMessage, setShowTitleErrorMessage] = useState(false);
  const [inputDescr, setInputDescr] = useState('');
  const [isEditingDescr, setIsEditingDescr] = useState(false); // comienza en modo visualizacion
  const [showDescrError, setShowDescrError] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [webSources, setWebSources] = useState([]);
  const { getInnovativeProjectById, updateInnovativeProject, deleteInnovativeProject } = useApiInnovativeProjects();

  // Hooks de estado para conteo de caracteres maximos en Titulo
  const [maxTitleChars] = useState(70); // Maximo de caracteres para el titulo
  const [titleCharsCount, setTitleCharsCount] = useState(0);
  const [titleCharsExceeded, setTitleCharsExceeded] = useState(false);
  //Hooks de estado para conteo de caracteres maximos en Descripcion
  const [maxDescChars] = useState(700); // Maximo de caracteres para la descripcion
  const [descCharsCount, setDescCharsCount] = useState(0);
  const [descCharsExceeded, setDescCharsExceeded] = useState(false);

  // Maneja boton de volver atras
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate('/dashboard/crearproyectos')
  };

  // Obtiene el ID del paso anterior y lo guarda en projectId. También muestra los datos guardados del proyecto.
  useEffect(() => {
    const fetchProject = async () => {
      const projectId = new URLSearchParams(window.location.search).get('id');
      setProjectId(projectId);  // <-- Aquí guardamos el projectId
      const project = await getInnovativeProjectById(projectId);
      if (project) {
        setInputTitle(project.title);
        setInputDescr(project.description);
        setWebSources(project.web_sources);
      }
    };
    
    fetchProject();
  }, [getInnovativeProjectById]);


  // LOGICA TITULO
  // Maneja cambios en el input Titulo y actualiza el estado.
  const handleInputChange = (event, setInput, setCount, setExceeded, maxChars) => {
    const text = event.target.value;
    if (text.length <= maxChars) {
      setInput(text);
      setCount(text.length);
      setExceeded(false);
    } else {
      setExceeded(true);
    }
  };
  
  const handleSaveClick = async (input, setEditing, setShowError, updateFunction, field, projectId) => {
    const trimmedText = input.trim();
    if (trimmedText) {
      await updateFunction(projectId, { [field]: trimmedText });
      setEditing(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleEditClick = (setState) => {
    // Cambia de nuevo al modo de edicion
    setState(true);
  };

  const handleSendRequestClick = async () => {
    if (projectId) {
      const result = await updateInnovativeProject(projectId, { request_sent: true });
      console.log("Update result:", result);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito.
    } else {
      console.log("Project ID is not set.");
    }
  };

  const handleDeleteProjectClick = async () => {
    if (projectId) {
      const confirmDeletion = window.confirm("¿Estás seguro de que quieres eliminar este proyecto?");
      if (confirmDeletion) {
        await deleteInnovativeProject(projectId);
        console.log("Proyecto eliminado");
        // Aquí puedes redirigir al usuario o actualizar la lista de proyectos
      }
    } else {
      console.log("ID del proyecto no definido");
    }
  };  

  const handleTitleInputChange = (event) => handleInputChange(event, setInputTitle, setTitleCharsCount, setTitleCharsExceeded, maxTitleChars);
  const handleSaveTitleClick = () => handleSaveClick(inputTitle, setIsEditingTitle, setShowTitleErrorMessage, updateInnovativeProject, 'title', projectId);

  const handleDescrInputChange = (event) => handleInputChange(event, setInputDescr, setDescCharsCount, setDescCharsExceeded, maxDescChars);
  const handleSaveDescrClick = () => handleSaveClick(inputDescr, setIsEditingDescr, setShowDescrError, updateInnovativeProject, 'description', projectId);


  return (
    <div className="container col-10 view-container">
      <h2 className="text-sans-h2 mt-4 mb-4">Subir Proyecto: Proyectos Innovadores</h2>

      <button className="btn-secundario-s d-flex mb-4" onClick={handleBackButtonClick}>
        <i className="material-symbols-rounded me-2">arrow_back_ios</i>
        <p className="mb-0 text-decoration-underline">Volver atrás</p>
      </button>

      <div className="container mb-4">
        <p className="text-sans-p">Este proyecto corresponde al programa:</p>
        <select className="custom-selector p-3">
          <option className="custom-option p-5 ms-4">Programa Mejoramiento Urbano (PMU)</option>
          <option className="custom-option">Programa Mejoramiento de Barrios (PMB)</option>
        </select>
      </div>

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
                  onClick={() => handleEditClick(setIsEditingTitle)}
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
                  onClick={() => handleEditClick(setIsEditingDescr)}
                >
                  <p className="text-decoration-underline">Editar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">edit</i>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fuentes */}
        { webSources.length === 0 ? (
            // Si no hay fuentes ingresadas
            <div className="container d-flex flex-row justify-content-between my-4">
              <div className="d-flex flex-column">
                <h3 className="text-sans-h35">Fuentes </h3>
                <p className="text-sans-h5">(Opcional)</p>
              </div>
              <ModalAgregarFuente projectId={projectId}/>
            </div>
          ) : (
            // Si hay fuentes ingresadas
            <div className="container">
              <div className="d-flex flex-column">
                <h3 className="text-sans-h35">Fuentes </h3>
                <p className="text-sans-h5">(Opcional)</p>
              </div>
              <div>
                {webSources.map((source, index) => (
                  <div key={index} className="my-2 d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <p className="text-decoration-underline">{source.url}</p>
                      <i className="material-symbols-rounded ms-2 pt-1">open_in_new</i>
                    </div>
                    <ModalEditarFuente projectId={projectId}/>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <ModalAgregarFuente projectId={projectId}/>
              </div> 
            </div>
          )} 
      </div>
      
      <div className="col-6 ms-5">
        {/* Img Portada - componente */}
        <h3 className="text-sans-h35">Imagen de Portada</h3>
        <div className="img-l-container">  
          <UploadImg/>
        </div>
        <div className="d-flex flex-row text-sans-h5-blue mt-2">
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
        <button className="btn-principal-s d-flex text-sans-h4 pb-0" onClick={handleSendRequestClick}>
          <p className="text-decoration-underline">Enviar solicitud</p>
          <i className="material-symbols-rounded ms-2">arrow_forward_ios</i> 
        </button>
      </div>

      <div className="col-10 mt-5 d-flex justify-content-start mb-5">
        <button className="red-btn text-sans-h4 d-flex pb-0" onClick={handleDeleteProjectClick}>
          <p className="text-decoration-underline">Desechar solicitud</p>
          <i className="material-symbols-rounded ms-2">delete</i> </button>
      </div>
    </div>
  )
}

export default CrearProyectoInnovadorP1; 