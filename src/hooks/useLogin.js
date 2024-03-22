import { useState } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';
// Importar la configuración de Keycloak
import keycloak from '../config/keycloakConfig';


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

     // Configuración de Keycloak
     const loginWithKeycloak = async () => {
        setLoading(true);
        try {
            if (!keycloak.authenticated) {
                await keycloak.init({
                    onLoad: 'login-required',
                    // Añade aquí el parámetro scope incluyendo tu scope personalizado
                    scope: 'openid profile claveUnica' // Asume 'rut' como el scope que incluye tus mappers
                }).then(async authenticated => {
                    if (authenticated) {
                        const token = keycloak.token;
                        const refreshToken = keycloak.refreshToken;
    
                        const response = await apiBancoProyecto.post('keycloak_login/', { token: token });
                        setData(response.data);
    
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('refreshToken', response.data['refresh-token']);
                        localStorage.setItem('userData', JSON.stringify(response.data.user));
                    }
                }).catch(initError => {
                    // Manejar específicamente el error de inicialización de Keycloak
                    throw new Error(`Keycloak initialization failed: ${initError}`);
                });
            } else {
                console.log('Usuario ya autenticado con Keycloak.');
            }
        } catch (error) {
            // Asegurarse de capturar y manejar cualquier error que ocurra
            setError(error.message || 'An error occurred during Keycloak login');
            console.error('Error during Keycloak login:', error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return { data, loading, error, login, loginWithKeycloak };
    
};