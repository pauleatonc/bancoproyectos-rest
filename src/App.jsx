import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/mainLayout';
import Home from './views/Home/home/home';
import Contacto from './views/Home/contacto/contacto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;