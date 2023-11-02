import { useState } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ rut, password }) => {
        setLoading(true);
        try {
            const response = await apiBancoProyecto.post('login/', {
                rut: rut,
                password: password
            });
            setData(response.data);
    
            // Almacenamiento del token y refresh-token
            localStorage.setItem('userToken', response.data.token);  // Usando "token"
            localStorage.setItem('refreshToken', response.data['refresh-token']);  // Usando "refresh-token"
    
            //Almacenar los datos del usuario
            localStorage.setItem('userData', JSON.stringify(response.data.user));


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
    console.log('user', data)

    return { data, loading, error, login };
};