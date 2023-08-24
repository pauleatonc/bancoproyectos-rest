import { useState, useEffect } from 'react';
import apiProjects from '../services/project/projects.api';

const useApiProjectsDetail = (slug) => {
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiProjects.get(`v1/${slug}`);
        setDataProject(response.data);
        setLoadingProject(false);
      } catch (error) {
        setErrorProject(error.message);
        setLoadingProject(false);
      }
    };
    fetchData();
  }, [slug]);

  return { dataProject, loadingProject, errorProject };
}

export default useApiProjectsDetail;