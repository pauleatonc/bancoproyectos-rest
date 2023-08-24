import { useState } from 'react';
import apiProjects from '../services/project/projects.api';

const useProjectSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);
  const [searchActivated, setSearchActivated] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
    setSearchActivated(true);
  };

  const searchProjects = async (query) => {
    setLoadingSearch(true);
    try {
      const endpoint = `?search=${query}`;
      const response = await apiProjects.get(endpoint);
  
      if (response.status === 200) {
        setSearchResults(response.data);
        return response.data;  // Ensure you're returning the results
      }
    } catch (error) {
      setErrorSearch(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return { searchResults, searchActivated, loadingSearch, errorSearch, searchProjects, handleSearch };
}

export default useProjectSearch;
