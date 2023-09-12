import { useState, useEffect } from 'react';
import apiInnovativeProjects from '../services/innovativeProjects/innovative_projects.api';

const useApiInnovativeProjectsList = () => {
  const [dataInnovativeProjects, setDataInnovativeProjects] = useState([]);
  const [loadingInnovativeProjects, setLoadingInnovativeProjects] = useState(true);
  const [errorInnovativeProjects, setErrorInnovativeProjects] = useState(null);

  const fetchInnovativeProjectsList = async () => {
    setLoadingInnovativeProjects(true);
    try {
      const response = await apiInnovativeProjects.get('innovative_projects/v1/');
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
    fetchInnovativeProjectsList();
  }, []);

  return { dataInnovativeProjects, loadingInnovativeProjects, errorInnovativeProjects };
};

export default useApiInnovativeProjectsList;