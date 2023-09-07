import { useState, useEffect } from 'react';
import apiInnovativeProjects from '../services/innovativeProjects/innovative_projects.api';

const useApiInnovativeProjectDetail = (projectId) => {
  const [dataInnovativeProject, setDataInnovativeProject] = useState({});
  const [loadingInnovativeProject, setLoadingInnovativeProject] = useState(true);
  const [errorInnovativeProject, setErrorInnovativeProject] = useState(null);

  useEffect(() => {
    const fetchInnovativeProjectDetail = async () => {
      setLoadingInnovativeProject(true);
      try {
        const response = await apiInnovativeProjects.get(`innovative_projects/v1/${projectId}`);
        setDataInnovativeProject(response.data);
        setErrorInnovativeProject(null);
        setLoadingInnovativeProject(false);
      } catch (error) {
        setErrorInnovativeProject(
          error.response ? error.response.data : error.message
        );
        setLoadingInnovativeProject(false);
      }
    };

    // Llama a la función para obtener los detalles del proyecto cuando el ID cambie
    fetchInnovativeProjectDetail();
  }, [projectId]); // El hook se ejecutará nuevamente cuando projectId cambie

  return { dataInnovativeProject, loadingInnovativeProject, errorInnovativeProject };
};

export default useApiInnovativeProjectDetail;