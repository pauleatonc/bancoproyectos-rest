import { useState, useEffect } from 'react';
import apiGoodPractices from '../services/goodPractices/good_practices.api';

const useApiGoodPractices = () => {
  const [dataGoodPractices, setDataGoodPractices] = useState([]);
  const [loadingGoodPractices, setLoadingGoodPractices] = useState(true);
  const [errorGoodPractices, setErrorGoodPractices] = useState(null);

  const fetchGoodPractices = async (endpoint = 'good_practices/v1/') => {
    setLoadingGoodPractices(true);
    try {
      const response = await apiGoodPractices.get(endpoint);
      setDataGoodPractices(response.data);
      setErrorGoodPractices(null);
    } catch (error) {
      setErrorGoodPractices(
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingGoodPractices(false);
    }
  };

  useEffect(() => {
    fetchGoodPractices();
  }, []);

  return {
    dataGoodPractices,
    loadingGoodPractices,
    errorGoodPractices,
  };
};

export default useApiGoodPractices;