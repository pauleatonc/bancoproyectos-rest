import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userDataFromLocalStorage = localStorage.getItem('userData');
    if (token && userDataFromLocalStorage) {
      setIsLoggedIn(true);
      setUserData(userDataFromLocalStorage);
    }
  }, []);

  const login = (token, refreshToken, userData) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userData', userData);
    setIsLoggedIn(true);
    setUserData(userData);
    // console.log("User data: ", userData);
  };

  const logout = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.post('/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Logout successful');
    } catch (error) {
      console.error('Error en el cierre de sesión:', error);
    }
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("comienza el refresh")
    try {
      const response = await apiBancoProyecto.post('/refresh_token/', { refresh_token: refreshToken });
      if (response.data.access_token) {
        localStorage.setItem('userToken', response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem('refreshToken', response.data.refresh_token);
        }
        // No eliminar los datos del usuario; actualizar solo los tokens
        return response.data.access_token;
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      // Considera manejar un logout o redirección aquí, dependiendo del error
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};