import { useState, useEffct } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const useApiTypeProject = () =>
{
  const [ dataType, setDataType ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffct(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await apiBancoProyecto.get('types/v1/');
        setDataType(response.dataType);
        setLoading(false);
      } catch (error)
      {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  },[]);

  return { dataType, loading , error }
};