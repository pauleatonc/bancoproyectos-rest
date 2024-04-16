import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { useLogin } from './hooks/useLogin';
import ReactGA from "react-ga4";

const Main = () => {
  const { handleAuthentication } = useLogin();
  const location = useLocation();
  const [codeProcessed, setCodeProcessed] = useState(false);
  const [authProcessStarted, setAuthProcessStarted] = useState(false);

  useEffect(() => {
    ReactGA.initialize('G-45DT9TXBFN');
  
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state'); // Captura el state encriptado de la URL

    console.log("state de vuelta: ", state)
    console.log("code de vuelta: ", code)
  
    if (code && state && !authProcessStarted && !codeProcessed) {
      setAuthProcessStarted(true);
      console.log("Hay code y state y se inicia handleAuthentication");
  
      handleAuthentication(code, state).then(() => {
        console.log("Autenticación exitosa y code en url: ", code);
      }).catch(error => {
        console.log("Falló handleAuthentication");
        console.error('Error during handleAuthentication:', error);
      }).finally(() => {
        console.log("Se completa el proceso de handleAuthentication");
        queryParams.delete('code');
        queryParams.delete('state');
        const newUrl = window.location.pathname + window.location.search;
        window.history.pushState({}, '', newUrl);
        setCodeProcessed(true); // Marca la finalización del proceso
        setAuthProcessStarted(false); // Resetear para futuras autenticaciones si es necesario
      });
    } else {
      console.log("No hay código en la URL o el proceso de autenticación ya se inició");
    }
    const currentPage = location.pathname + location.search;
    ReactGA.send({ hitType: 'pageview', page: currentPage });
  }, [location, handleAuthentication, codeProcessed]);

  return null; // No es necesario renderizar nada aquí
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

