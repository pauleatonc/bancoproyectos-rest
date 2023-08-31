
import { useState, useEffect } from 'react';
import apiProjects from '../services/project/projects.api';

const useApiProjectsList = () => {
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);

  const fetchProjects = async (endpoint = '/') => {
    setLoadingProject(true);
    try {
      const response = await apiProjects.get(endpoint);
      setDataProject(response.data);
      setErrorProject(null);

    } catch (error) {
      setErrorProject(error.response ? error.response.data : error.message);
    } finally {
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { dataProject, loadingProject, errorProject, fetchProjects};
}

export default useApiProjectsList;