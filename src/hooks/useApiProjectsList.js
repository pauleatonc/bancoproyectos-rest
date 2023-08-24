import { useState, useEffect } from 'react';
import apiProjects from '../services/project/projects.api';

const useApiProjectsList = () => {
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);

  const fetchProjects = async (endpoint = 'v1/') => {
    try {
      setLoadingProject(true);
      const response = await apiProjects.get(endpoint);
      setDataProject(response.data);
      setLoadingProject(false);
    } catch (error) {
      setErrorProject(error);
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { dataProject, loadingProject, errorProject, fetchProjects };
}

export default useApiProjectsList;