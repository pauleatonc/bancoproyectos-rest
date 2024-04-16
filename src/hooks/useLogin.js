import { useState, useContext } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';
// Importación de configuraciones necesarias para construir la URL de redirección.
import { generateCodeVerifier, generateCodeChallenge, calculateHash, encrypt, decryptCodeVerifier } from '../config/authUtils';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


export const useLogin = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login: globalLogin, userData } = useContext(AuthContext);


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

            // Setiar el tipo de login
            localStorage.setItem('authMethod', 'conventional');


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



    const loginWithKeycloak = async () => {
        setLoading(true);
        try {
            // Generar code_verifier y code_challenge aquí
            const codeVerifier = generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            const codeVerifierHash = calculateHash(codeVerifier);
            const encryptedCodeVerifier = encrypt(codeVerifier); 
                    

            // Guardar el codeVerifier en algún lugar para su uso posterior
            localStorage.setItem('codeVerifier', codeVerifier);
            console.log("Se guarda el code Verifier: ", codeVerifier);

            // Construir la URL de redirección manualmente con los parámetros necesarios
            const redirectUri = 'http://qabanco2.subdere.gob.cl/';
            const clientId = 'bancoproyectos-back'; // Reemplazar por tu client_id de Keycloak
            const keycloakAuthUrl = 'https://oid.subdere.gob.cl/realms/app-qa/protocol/openid-connect/auth'; // Modificar con tu URL de Keycloak


            const state = encodeURIComponent(encryptedCodeVerifier); // Codificar el hash para la URL
            console.log("Se encripta el code Verifier: ", encryptedCodeVerifier);

            const authUrl = `${keycloakAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${state}`;
            console.log("URL de autenticación: ", authUrl);


            // Redirigir al usuario a Keycloak para el login
            window.location.href = authUrl;

            localStorage.setItem('isKeycloak', 'true');

        } catch (initError) {
            setError(`Error initializing login process: ${initError}`);
            console.error('Error during login initialization:', initError);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthentication = async (code, state) => {
        setLoading(true);
        try {
            console.log("code :", code);
            console.log("state :", state);
            const codeVerifier = decryptCodeVerifier(state);
            console.log("codeVerifier :", codeVerifier);
   
            // Intercambiar el código por un token utilizando el codeVerifier
            const response = await apiBancoProyecto.post('/callback/', {
                code,
                codeVerifier  // Enviar el codeVerifier recibido de Keycloak
            });

            console.log("se envía el code :", code, " y el state: ", codeVerifier)
    
            if (response.data && response.data.access_token && response.data.refresh_token) {
                // Guardar los tokens en el localStorage
                localStorage.setItem('userToken', response.data.access_token);
                localStorage.setItem('refreshToken', response.data.refresh_token);
    
                // Calcular y guardar el momento de expiración del token de acceso
                const expiresAt = new Date().getTime() + (response.data.expires_in * 1000);
                localStorage.setItem('tokenExpiry', expiresAt.toString());
    
                // Setear el tipo de login
                localStorage.setItem('authMethod', 'keycloak');
    
                // Actualizar el estado con los datos de la respuesta
                setData(response.data);
                globalLogin(response.data.access_token, response.data.refresh_token, response.data.user);
            } else {
                console.error("La respuesta del servidor no incluye los tokens necesarios.");
                setError("Error de autenticación: los tokens no se recibieron correctamente.");
            }
        } catch (error) {
            if (error.response) {
                console.error('Error durante el proceso de autenticación:', error.response.data);
                setError(`Error durante el proceso de autenticación: ${error.response.data.error || 'Unknown error'}`);
            } else {
                // Esto maneja casos donde la respuesta no está disponible o el error es de red
                console.error('Error:', error.message);
                setError(`Error durante el proceso de autenticación: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };


    // Función para refrescar el token si está próximo a expirar

    const isTokenExpired = () => {
        const expiry = localStorage.getItem('tokenExpiry');
        if (!expiry) return true;
        return Date.now() > parseInt(expiry);
    };

    const refreshAccessToken = async () => {
        setLoading(true);
        try {
            console.log("Refresh Access Token")
            if (isTokenExpired()) {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    console.error("Refresh token not found.");
                    // Opcionalmente, redirigir al usuario al login
                    setError("Login required.");
                    setLoading(false);
                    return;
                }

                const response = await axios.post('/refresh-token/', { refresh_token: refreshToken });

                if (response.data && response.data.access_token) {
                    // Actualizar el contexto y el almacenamiento local con el nuevo token de acceso y refresco
                    const { access_token, refresh_token, expires_in } = response.data;
                    localStorage.setItem('userToken', access_token);
                    localStorage.setItem('tokenExpiry', Date.now() + expires_in * 1000); // Almacenar la nueva caducidad del token
                    if (refresh_token) {
                        localStorage.setItem('refreshToken', refresh_token); // Si se devuelve un nuevo refresh token
                    }

                    console.log("refresh acces token", access_token)
                    console.log("refresh refresh token", access_token)
                    console.log("refresh Expiry token", access_token)

                    globalLogin(access_token, refresh_token, userData); // Asegúrate de que userData esté definido correctamente
                } else {
                    console.error('Failed to refresh access token.');
                    setError('Failed to refresh access token.');
                }
            }
        } catch (error) {
            console.error('Error refreshing access token:', error);
            setError('Error refreshing access token.');
        } finally {
            setLoading(false);
        }
    };

    const esFlujoKeycloak = () => {
        return localStorage.getItem('isKeycloak') === 'true';
    };

    return { data, loading, error, login, loginWithKeycloak, handleAuthentication, refreshAccessToken, esFlujoKeycloak };
};
