import { useState, useEffect } from 'react';
import apiProjectsList from '../services/project/projectsList.api';

const useApiProjectsList = () => {
  const [ dataProject , setDataProject ] = useState([]);
  const [ loadingProject , setLoadingProject ] = useState(true);
  const [ errorProject   , setErrorProject ]     = useState(null);

  useEffect( ()=>{
    const fetchData = async () =>{
      try {
        const response = await apiProjectsList.get('/');
        setDataProject(response.data);
        setLoadingProject(false);
      } catch (error) {
        setErrorProject(error);
        setLoadingProject(false);
      }
    };
    fetchData();
  }, []);

  return { dataProject, loadingProject, errorProject};
}

export default useApiProjectsList;