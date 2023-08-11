import { useState, useEffect } from 'react';
import apiProjectsDetail from '../services/project/projectsDetail.api';

const useApiProjectsDetail = (slug) => {
  const [dataProject, setDataProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [errorProject, setErrorProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiProjectsDetail.get(`/${slug}`);
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