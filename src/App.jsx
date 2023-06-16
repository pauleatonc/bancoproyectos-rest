import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import Home from './views/Home/home/home';
import Contacto from './views/Home/contacto/contacto';
import Login from './views/Users/login/login';
import ErrorLayout from './layout/errorLayout';
import Error404 from './views/Error/error404';
import Error500 from './views/Error/error500';
import Error503 from './views/Error/error503';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="error" element={<ErrorLayout />}>
          <Route path="error404" element={<Error404 />} />
          <Route path="error500" element={<Error500 />} />
          <Route path="error503" element={<Error503 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;