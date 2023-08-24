import { useState } from 'react';
import apiProjects from '../services/project/projects.api';

const useProjectSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  const searchProjects = async (query) => {
    setLoadingSearch(true);
    try {
      const endpoint = `v1/?search=${query}`;
      const response = await apiProjects.get(endpoint);

      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
      setErrorSearch(error);
    } finally {
      setLoadingSearch(false);
    }
  };

  return { searchResults, loadingSearch, errorSearch, searchProjects };
}

export default useProjectSearch;
