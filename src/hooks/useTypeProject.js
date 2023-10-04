import { useState, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const useApiTypeProject = () => {
  const [ dataType, setDataType ] = useState([]);
  const [ typeLoading, setTypeLoading ] = useState(true);
  const [ typeError, setTypeError ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiBancoProyecto.get('types/v1/');
        setDataType(response.data);
        setTypeLoading(false);
      } catch (error) {
        setTypeError(error);
        setTypeLoading(false);
      }
    };
    fetchData();
  },[]);
  return { dataType, typeLoading , typeError };
};