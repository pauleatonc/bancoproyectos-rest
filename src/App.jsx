import React , { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import MainLayout from './layout/mainLayout';
// import Home from './views/Home/home/home';
// import Contacto from './views/Home/contacto/contacto';
// import Login from './views/Users/login/login';
// import BancoProyectos from './views/Projects/bancodeproyectos/bancodeproyectos';
// import ErrorLayout from './layout/errorLayout';
// import Error404 from './views/Error/error404';
// import Error500 from './views/Error/error500';
// import Error503 from './views/Error/error503';

const MainLayout = React.lazy(() => import('./layout/mainLayout'));
const Home = React.lazy(() => import('./views/Home/home/home'));
const Contacto = React.lazy(() => import('./views/Home/contacto/contacto'));
const Login = React.lazy(() => import('./views/Users/login/login'));
const BancoProyectos = React.lazy(() => import('./views/Projects/bancodeproyectos/bancodeproyectos'));
const ErrorLayout = React.lazy(() => import('./layout/errorLayout'));
const Error404 = React.lazy(() => import('./views/Error/error404'));
const Error500 = React.lazy(() => import('./views/Error/error500'));
const Error503 = React.lazy(() => import('./views/Error/error503'));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
          <Route path="bancodeproyectos" element={<BancoProyectos />} />
          <Route path="*" element={<Navigate to="/error/error404" />} />
        </Route>
        <Route path="error" element={<ErrorLayout />}>
          <Route path="error404" element={<Error404 />} />
          <Route path="error500" element={<Error500 />} />
          <Route path="error503" element={<Error503 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;