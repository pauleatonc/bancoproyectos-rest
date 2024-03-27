import { useState, useContext } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';
// Importar la configuración de Keycloak
import keycloak from '../config/keycloakConfig';
import { AuthContext } from '../context/AuthContext'; 


export const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Utiliza useContext aquí para acceder directamente a las funciones de AuthContext
    // Esto es útil si necesitas llamar a `login` desde `handleAuthentication`
    const { login: globalLogin } = useContext(AuthContext);

     // Configuración de Keycloak
     const loginWithKeycloak = async () => {
        console.log('00');
        setLoading(true);
        try {
            console.log('000');
            await keycloak.init({
                onLoad: 'login-required',
                scope: 'claveUnica'
            });
            // En este punto, la autenticación de Keycloak ya se ha iniciado.
            // La lógica específica de manejo de redirección y código se moverá a un useEffect en el componente.
        } catch (initError) {
            setError(`Keycloak initialization failed: ${initError}`);
            console.error('Error during Keycloak login:', initError);
        } finally {
            setLoading(false);
        }
    };

    // Nueva función para manejar el código de autorización después de la redirección
    const handleAuthentication = async (code) => {
        console.log('1');
        setLoading(true);
        try {
            const response = await apiBancoProyecto.get(`/keycloak/callback/?code=${code}`);
            setData(response.data);
            console.log('2');
            globalLogin(response.data.token, response.data['refresh-token'], response.data.user);
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('refreshToken', response.data['refresh-token']);
            localStorage.setItem('userData', JSON.stringify(response.data.user));
        } catch (error) {
            setError('Error exchanging code for token');
            console.error('Error during code exchange:', error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, loginWithKeycloak, handleAuthentication };
};