import { useState , useEffect} from 'react';
import apiRegionComuna from '../services/RegionComuna/regioncomuna.api';

export const useApiRegionComuna = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await apiRegionComuna.get('region-comuna/v1/');
        setData(response.data);
        setLoading(false);
      }catch (error) {
        setError(error);
        setLoading(false);
      }
    }; 
    fetchData();
  },[]);

  return { data, loading, error };
};