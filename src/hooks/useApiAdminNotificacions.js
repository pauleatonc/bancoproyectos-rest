import { useState, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api.js'; 

const useApiAdminNotificacions = () => {
  const [dataInnovativeProjectNotificacions, setDataInnovativeProjectNotificacions] = useState([]);
  const [loadingInnovativeProjectNotificacions, setLoadingInnovativeProjectNotificacions] = useState(true);
  const [errorInnovativeProjectNotificacions, setErrorInnovativeProjectNotificacions] = useState(null);

  const fetchInnovativeProjectNotificacions = async (endpoint = 'notifications/v1/innovative_projects_notifications/') => {
    setLoadingInnovativeProjectNotificacions(true);
    try {
      const response = await apiBancoProyecto.get(endpoint);
      setDataInnovativeProjectNotificacions(response.data);
      setErrorInnovativeProjectNotificacions(null);
    } catch (error) {
      setErrorInnovativeProjectNotificacions(
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingInnovativeProjectNotificacions(false);
    }
  };

  useEffect(() => {
    fetchInnovativeProjectNotificacions();
  }, []);

  return {
    dataInnovativeProjectNotificacions,
    loadingInnovativeProjectNotificacions,
    errorInnovativeProjectNotificacions,
  };
};

export default useApiAdminNotificacions;