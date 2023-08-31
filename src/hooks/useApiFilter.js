import { useState, useEffect } from 'react';
import apiProject from '../services/project/projects.api';

const useApiFilter = () => {
  const [dataFilter, setDataFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleFilter = (projects) => {
    setFilteredProjects(projects);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiProject.get('filter_options/');
        setDataFilter(response.data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error); 
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { dataFilter, loading, error, filteredProjects, handleFilter };
}

export default useApiFilter;
