import { useState, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const UseApiPrograms = () =>
{
  const [ dataPrograms, setDataPrograms ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        const response = await apiBancoProyecto.get('programs/v1/');
        setDataPrograms(response.dataPrograms);
        setLoading(false);
      } catch (error)
      {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(dataPrograms)
  return { dataPrograms, loading, error }
}