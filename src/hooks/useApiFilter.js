import { useState, useEffect } from 'react';
import apiProject from '../services/project/projects.api';

const useApiFilter = () => {
  const [dataFilter, setDataFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [hasResults, setHasResults] = useState(true);

  const handleFilter = (projects) => {
    setFilteredProjects(projects);
    setHasResults(projects.length > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiProject.get('v1/filter_options/');
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

  return { dataFilter, loading, error, filteredProjects, hasResults, handleFilter };
}

export default useApiFilter;
