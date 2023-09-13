import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { apiBancoProyecto } from '../services/bancoproyecto.api.js';

export const useProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Referencia para el setTimeout
  const debounceTimeoutRef = useRef(null);

  const listProjects = useCallback(async (searchTerm, filterParams, sortOrder) => {
    setLoading(true);
    setError(null);
    const source = axios.CancelToken.source();

    // Construye la URL completa
    const apiUrl = '/projects/v1/';
    const queryParams = {
      search: searchTerm,
      ...filterParams,
      ordering: sortOrder,
    };
    const fullUrl = `${apiUrl}?${new URLSearchParams(queryParams)}`;

    console.log("URL de la solicitud:", fullUrl);

    try {
      const response = await apiBancoProyecto.get(fullUrl, {
        cancelToken: source.token,
      });
      setProjects(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error('Error al cargar proyectos:', err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      source.cancel();
    };
  }, []);

  // Función debounced
  const debouncedListProjects = useCallback((...args) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      listProjects(...args);
    }, 500); 
  }, [listProjects]);

  return { projects, loading, error, listProjects: debouncedListProjects }; 
};
