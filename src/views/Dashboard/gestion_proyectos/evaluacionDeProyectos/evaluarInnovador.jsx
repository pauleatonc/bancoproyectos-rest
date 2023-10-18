import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";
import { useAuth } from '../../../../context/AuthContext';
import Carrusel from '../../../../components/Commons/carrusel';
import Dropdown from "../../../../components/Bancodeproyectos/DropdowSelect";


const EvaluarProyectoInnovador = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const [dataProject, setDataProject] = useState(null);  // <-- Nuevo estado
  const [loadingProject, setLoadingProject] = useState(true);  // <-- Nuevo estado
  const [errorProject, setErrorProject] = useState(null);  // <-- Nuevo estado

  const { getInnovativeProjectById, updateInnovativeProject, deleteInnovativeProject, evaluateInnovativeProject } = useApiInnovativeProjects();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProject(true);
      try {
        const result = await getInnovativeProjectById(id);
        setDataProject(result);  // <-- Actualizar el estado
        setErrorProject(null);
      } catch (error) {
        setErrorProject(error);
      } finally {
        setLoadingProject(false);
      }
    };
    fetchData();
  }, [id]);


  // Maneja boton de volver atras
  const history = useNavigate();
  const handleBackButtonClick = () => {
    history(-1); 
  };

  const handleSendRequestClick = async () => {
    if (dataProject.id) {
      const result = await updateInnovativeProject(dataProject.id, { evaluated: true });
      console.log("Update result:", result);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito.
    } else {
      console.log("Project ID is not set.");
    }
  };

  const handleDeleteProjectClick = async () => {
    if (dataProject.id) {
      const confirmDeletion = window.confirm("¿Estás seguro de que quieres eliminar este proyecto?");
      if (confirmDeletion) {
        await deleteInnovativeProject(dataProject.id);
        console.log("Proyecto eliminado");
        // Aquí puedes redirigir al usuario o actualizar la lista de proyectos
      }
    } else {
      console.log("ID del proyecto no definido");
    }
  };  


  // Acceso solo a isEditorOrSuperuser
  const { userData } = useAuth();
  const isEditorOrSuperuser = ['Superusuario', 'Editor General', 'Editor Programa'].includes(userData.tipo_de_usuario);

  if (loadingProject)
  {
    return <div>CARGANDO DATOS...</div>
  }
  if (errorProject)
  {
    return <div>Error de conexión: {errorProject}</div>
  }

  return (
    <div className="container col-10 view-container">
      <h2 className="text-sans-h2 mt-4 mb-4">Evaluar Proyecto: Proyectos Innovadores</h2>

      <button className="btn-secundario-s d-flex mb-4" onClick={handleBackButtonClick}>
        <i className="material-symbols-rounded me-2">arrow_back_ios</i>
        <p className="mb-0 text-decoration-underline">Volver atrás</p>
      </button>

      <div className="row">
        <div className="col-5">
          {/* Titulo */}
          <div className="container">
          
            <div>
              <div className="d-flex flex-row justify-content-between my-3">
                <h3 className="text-sans-h3">{dataProject.title}</h3>
              </div>
            </div>
        </div>

        {/* Descripcion */}
        <div className="container">
            <div>
              <div className="d-flex flex-column my-3">
                <div className="description-container">
                  <p className="text-sans-p">{dataProject.description} </p>
                </div>
              </div>
            </div>
        </div>

        {/* Fuentes */}
        { (dataProject && dataProject.web_sources && dataProject.web_sources.length === 0) ? (
            // Si no hay fuentes ingresadas
            <div className="container d-flex flex-row justify-content-between my-4">
              <div className="d-flex flex-column">
                <h3 className="text-sans-h35">Fuentes </h3>
              </div>
            </div>
          ) : (
            // Si hay fuentes ingresadas
            <div className="container">
              <div className="d-flex flex-column">
                <h3 className="text-sans-h35">Fuentes </h3>
              </div>
              <div>
                {dataProject.web_sources.map((source, index) => (
                  <div key={index} className="my-2 d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <p className="text-decoration-underline">{source.url}</p>
                      <i className="material-symbols-rounded ms-2 pt-1">open_in_new</i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
      <div className="carrusel-container container col-xl-7 float-md-end m-4">
          <Carrusel
              imgPortada={dataProject.portada}
              imgGeneral={dataProject.innovative_gallery_images}
              context="proyectosInnovadores"
            />
      </div>

      <div className='my-4'>
        <h3 className="text-sans-p px-1 ">¿Qué años de construcción quieres ver?</h3>
        <Dropdown
          items={years}
          selectedItems={selectedYears}
          singleItemName="años"
          onItemChange={handleYearChange}
        />
      </div>

    </div>

      <div className="col-10 mt-5 d-flex justify-content-end">
        <button className="btn-principal-s d-flex text-sans-h4 pb-0" onClick={handleSendRequestClick}>
          <p className="text-decoration-underline">Evaluar solicitud</p>
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

export default EvaluarProyectoInnovador; 