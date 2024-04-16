import axios from  'axios'
import { useAuth } from '../context/AuthContext';


export const apiBancoProyecto = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

// Agregar un interceptor para añadir el token a las cabeceras de las solicitudes
apiBancoProyecto.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Check if the cookie string begins with the name we want
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const authMethod = localStorage.getItem('authMethod'); // Indicador del método de autenticación utilizado

  console.log(" Inicia refreshAccesToken")

  // Determinar el endpoint correcto para el refresco de token basado en el método de autenticación
  let refreshUrl = '';
  if (authMethod === 'keycloak') {
    refreshUrl = 'refresh-token/'; // Endpoint para refrescar tokens de Keycloak
    console.log(" Inicia con keycloak")
  } else if (authMethod === 'conventional') {
    refreshUrl = 'api/token/refresh/'; // Endpoint para el sistema de autenticación convencional
  } else {
    console.error('Método de autenticación desconocido. No se puede refrescar el token.');
    return null; // Terminar la ejecución si no se conoce el método de autenticación
  }

  try {
    // Ajustar los parámetros enviados según el endpoint esperado
    const body = authMethod === 'keycloak' ? { refresh_token: refreshToken } : { refresh: refreshToken };
    console.log(" Segundo paso: ")
    const csrfToken = getCookie('csrftoken'); // Obtener el token CSRF de las cookies

    console.log(" Get cookie ")

    const response = await axios.post(`${apiBancoProyecto.defaults.baseURL}${refreshUrl}`, body, {
      headers: {
        'X-CSRFToken': csrfToken // Incluir el token CSRF en la solicitud
      }
    });

    console.log(" 1 ")

    if (response.data.access_token) {
      // Almacenar el nuevo access token y actualizar el refresh token si se recibe uno nuevo
      localStorage.setItem('userToken', response.data.access_token);
      console.log(" 2 ")

      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
        console.log(" 3 ")
      }
      // Opcional: actualizar el tiempo de expiración si se proporciona
      if (response.data.expires_in) {
        const expiresAt = new Date().getTime() + response.data.expires_in * 1000;
        localStorage.setItem('tokenExpiry', expiresAt.toString());
        console.log(" 4 ")
      }
      console.log(response.data.access_token)
      return response.data.access_token;
    } else {
      throw new Error('La respuesta del servidor no incluye el access token necesario.');
    }
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error; // Re-lanzar el error para manejarlo en el interceptor de respuesta
  }
}


// Interceptor para manejar la expiración del token
apiBancoProyecto.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Marcar el intento de reenvío para evitar bucles infinitos
      console.log(" se activa el interceptor")

      try {
        console.log(" Interceptor gatilla el refreshAccesToken")
        const newAccessToken = await refreshAccessToken();        
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        return apiBancoProyecto(originalRequest); // Reintentar la solicitud original con el nuevo token
      } catch (refreshError) {
        console.error('Error al refrescar el token durante la solicitud:', refreshError);
        return Promise.reject(refreshError); // Propagar el error para manejarlo posteriormente
      }
    }
    return Promise.reject(error); // Para todos los demás errores de respuesta
  }
);
