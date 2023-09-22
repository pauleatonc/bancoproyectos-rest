import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiBancoProyecto } from '../services/bancoproyecto.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Verifica si el usuario ya está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userDataFromLocalStorage = localStorage.getItem('userData');
    if (token && userDataFromLocalStorage) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);

  const login = (token, refreshToken, user) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userData', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserData(user);
  };

  const logout = async () => {
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};