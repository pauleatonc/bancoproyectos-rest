import { useState, useEffect } from 'react';
import apiFilterList from '../services/project/projectsFilter.api';

const useApiFilter = () => {
  const [dataFilter, setDataFilter] = useState(null); // Initialized with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFilterList.get('/'); // Potentially a more descriptive endpoint
        setDataFilter(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error); // Logging for easier debugging
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { dataFilter, loading, error };
}

export default useApiFilter;