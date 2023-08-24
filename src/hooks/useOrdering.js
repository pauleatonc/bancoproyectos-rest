import { useState, useEffect } from 'react';
import apiProjects from '../services/project/projects.api';

const useOrdering = () => {
  const [order, setOrder] = useState('');  // Default order
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await apiProjects.get(`?ordering=${order}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [order]);

  return { data, loading, error, setOrder };
};

export default useOrdering;