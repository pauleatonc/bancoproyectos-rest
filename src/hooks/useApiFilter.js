import { useState, useEffect } from 'react';
import apiFilterList from '../services/project/projectsFilter.api';

const useApiFilterList = () => {
  const [ dataFilter, setDataFilter ] = useState([]);
  const [ loadingProject, setLoadingProject ] = useState(true);
  const [ errorProject, setErrorProject ] = useState(null);

  useEffect( ()=>{
    const fetchData = async () => {
      try {
        const response = await apiFilterList.get('/');
        setDataFilter(response.data);
        setLoadingProject(false);
      } catch (error) {
        setErrorProject(error);
        setLoadingProject(false);
      }
    };
    fetchData();
  }, []);

  return { dataFilter, loadingProject, errorProject};
}

export default useApiFilterList;