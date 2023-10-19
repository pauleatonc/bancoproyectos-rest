import { useState, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api.js'; 

const useApiAdminNotificacions = () => {
  const [dataInnovativeProjectNotificacions, setDataInnovativeProjectNotificacions] = useState([]);
  const [loadingInnovativeProjectNotificacions, setLoadingInnovativeProjectNotificacions] = useState(true);
  const [errorInnovativeProjectNotificacions, setErrorInnovativeProjectNotificacions] = useState(null);
  
  const [dataRecentActions, setDataRecentActions] = useState([]);
  const [loadingRecentActions, setLoadingRecentActions] = useState(true);
  const [errorRecentActions, setErrorRecentActions] = useState(null);


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

  const fetchRecentActions = async (endpoint = 'notifications/v1/recent_actions/') => {
    setLoadingRecentActions(true);
    try {
      const response = await apiBancoProyecto.get(endpoint);
      setDataRecentActions(response.data);
      setErrorRecentActions(null);
    } catch (error) {
      setErrorRecentActions(
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoadingRecentActions(false);
    }
  };

  useEffect(() => {
    fetchInnovativeProjectNotificacions();
    fetchRecentActions();
  }, []);

  return {
    dataInnovativeProjectNotificacions,
    loadingInnovativeProjectNotificacions,
    errorInnovativeProjectNotificacions,
    dataRecentActions,
    loadingRecentActions,
    errorRecentActions,
  };
};

export default useApiAdminNotificacions;