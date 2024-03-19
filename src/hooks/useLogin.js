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
            // Iniciar el proceso de autenticación con Keycloak
            await keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
                if (authenticated) {
                    // Opcional: Puedes enviar el token de Keycloak a tu backend para verificación y/o obtener datos adicionales del usuario
                    // Aquí asumimos que tienes una endpoint en tu backend que maneja esto
                    const token = keycloak.token;
                    const refreshToken = keycloak.refreshToken;

                    apiBancoProyecto.post('keycloak_login/', { token: token }).then(response => {
                        // Suponiendo que tu backend responda con datos del usuario y tokens propios de tu aplicación
                        setData(response.data);

                        // Almacenamiento de tokens y datos del usuario como se hace en la función de login tradicional
                        localStorage.setItem('userToken', response.data.token);
                        localStorage.setItem('refreshToken', response.data['refresh-token']);
                        localStorage.setItem('userData', JSON.stringify(response.data.user));
                    });
                }
            });
        } catch (error) {
            setError(error);
            console.error('Error during Keycloak login:', error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, login, loginWithKeycloak };
};