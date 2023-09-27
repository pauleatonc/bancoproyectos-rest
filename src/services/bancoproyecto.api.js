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

// Interceptor para manejar la expiración del token
apiBancoProyecto.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const response = await axios.post('api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('userToken', response.data.access);

        // Actualizar el token en la solicitud y repetirla
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

        return apiBancoProyecto(originalRequest);

      } catch (e) {
        try {
          await apiBancoProyecto.post('logout/', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Error en el cierre de sesión:', error);
        }
      
        // Limpia el estado y el localStorage, como ya lo estabas haciendo
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUserData(null);
      }
    }

    return Promise.reject(error);
  }
);