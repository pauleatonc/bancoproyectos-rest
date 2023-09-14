import { useState } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ rut, password }) => {
        try {
            const response = await apiBancoProyecto.post('login/', {
                username: rut,
                password: password
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else {
                // Otros errores (e.g., problemas de red, solicitud cancelada, etc.)
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, login };
};