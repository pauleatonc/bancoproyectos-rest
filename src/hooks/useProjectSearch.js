import { useState } from 'react';
import apiProjectsList from '../services/project/projectsList.api';

const useProjectSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  const searchProjects = async (query) => {
    setLoadingSearch(true);
    try {
      const endpoint = `/?search=${query}`;
      const response = await apiProjectsList.get(endpoint);

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
