import { useState, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api.js'; 

const useApiInnovativeProjects = () => {
  const [dataInnovativeProjects, setDataInnovativeProjects] = useState([]);
  const [loadingInnovativeProjects, setLoadingInnovativeProjects] = useState(true);
  const [errorInnovativeProjects, setErrorInnovativeProjects] = useState(null);

  const fetchInnovativeProjectsList = async () => {
    setLoadingInnovativeProjects(true);
    try {
      const response = await apiBancoProyecto.get('innovative_projects/v1/');
      setDataInnovativeProjects(response.data);
      setErrorInnovativeProjects(null);
    } catch (error) {
      setErrorInnovativeProjects(
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingInnovativeProjects(false);
    }
  };

  const InnovativeAdminProjectsList = async () => {
    setLoadingInnovativeProjects(true);
    try {
      const response = await apiBancoProyecto.get('innovative_projects/v1/list_admin/');
      setDataInnovativeProjects(response.data);
      setErrorInnovativeProjects(null);
    } catch (error) {
      setErrorInnovativeProjects(
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingInnovativeProjects(false);
    }
  };

  const createInnovativeProject = async (title) => {
    try {
      const response = await apiBancoProyecto.post('innovative_projects/v1/', {
        title: title,
        // ... (otros campos que quieras enviar)
      });
      return response.data.id;  // Devolver el ID del proyecto recién creado
    } catch (error) {
      // Manejar el error aquí, quizás devolver algo para que el componente lo maneje
      return null;
    }
  };

  const getInnovativeProjectById = async (id) => {
    try {
      const response = await apiBancoProyecto.get(`innovative_projects/v1/${id}/`);
      return response.data;
    } catch (error) {
      // manejar error
      return null;
    }
  };
  
  const updateInnovativeProject = async (id, data) => {
    try {
      const response = await apiBancoProyecto.patch(`innovative_projects/v1/${id}/`, data);
      console.log("Server response:", response.data);
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  const deleteInnovativeProject = async (id) => {
    try {
      const response = await apiBancoProyecto.delete(`innovative_projects/v1/${id}/`);
      console.log("Proyecto eliminado con éxito:", response.data);
      // Puedes optar por actualizar la lista de proyectos aquí o en el componente
      fetchInnovativeProjectsList();
    } catch (error) {
      console.log("Error al eliminar el proyecto:", error);
      // Aquí podrías manejar errores más específicos
    }
  };

  useEffect(() => {
    fetchInnovativeProjectsList();
  }, []);

  return { 
    dataInnovativeProjects, 
    loadingInnovativeProjects, 
    errorInnovativeProjects,
    createInnovativeProject,
    getInnovativeProjectById,
    updateInnovativeProject,
    InnovativeAdminProjectsList,
    deleteInnovativeProject
  };
};

export default useApiInnovativeProjects;
