import { useState, useEffect } from 'react';
import apiInnovativeProjects from '../services/innovativeProjects/innovative_projects.api';

const useApiInnovativeProjects = () => {
  const [dataInnovativeProjects, setDataInnovativeProjects] = useState([]);
  const [loadingInnovativeProjects, setLoadingInnovativeProjects] = useState(true);
  const [errorInnovativeProjects, setErrorInnovativeProjects] = useState(null);

  const fetchInnovativeProjects = async (endpoint = 'innovative_projects/v1/') => {
    setLoadingInnovativeProjects(true);
    try {
      const response = await apiInnovativeProjects.get(endpoint);
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

  useEffect(() => {
    fetchInnovativeProjects();
  }, []);

  return {
    dataInnovativeProjects,
    loadingInnovativeProjects,
    errorInnovativeProjects,
    fetchInnovativeProjects,
  };
};

export default useApiInnovativeProjects;