import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userData, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  <>
    <nav className="container">
      <div className="row">
        <div className="col">
          {/* Logo subdere */}
          <Link to="/" className="text-decoration-none">
            <div className="line-container row">
              <div id="lineBlue" />
              <div id="lineRed" />
            </div>
            <p className="logo-subdere mt-3">Subsecretaría de Desarrollo Administrativo y Regional</p>  
          </Link>
        </div>
        {/* boton login */}
        <div className="col d-flex justify-content-end align-items-center">
        { isLoggedIn ? (
          <>
            <span>Hola, {userData.full_name || userData.rut}</span>
            <button className="btn-secundario-s mx-3 mt-4 me-md-4 d-none d-md-block">
              <Link to="/dashboard">ir a Admin</Link>
            </button>
            <button className="btn-principal-s mt-4 me-md-5 d-none d-md-block" type="button" onClick={logout}>
                Cerrar sesión
            </button>
          </>
        ) : (
          <button className="btn-principal-s mt-4 me-md-5 d-none d-md-block" type="button">
            <i className="cl cl-claveunica" />
            <Link to="/login" className="text-sans-p-white text-underline mx-md-3 d-none d-md-block">
              Iniciar sesión
            </Link>
          </button>
        )}
      </div>
      </div>
    </nav>  

    <div className="row mt-4 col-12">
      {/* Navegacion */}
      <div className="mx-md-auto mx-lg-auto mx-xl-auto d-flex flex-column flex-md-row justify-content-center p-0">
        <Link to="/" className="link text-black text-underline mx-md-3 d-none d-md-block"> Inicio </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3 d-none d-md-block"> Banco de Proyectos </Link>
        <Link to="/bancodeideas" className="link text-black text-underline mx-md-3 d-none d-md-block"> Proyectos Innovadores </Link>
        <Link to="/documentacion" className="link text-black text-underline mx-md-3 d-none d-md-block"> Documentación </Link>
        <Link to="/contacto" className="link text-black text-underline mx-md-3 d-none d-md-block">Contacto</Link>
      </div>
    </div> 

    {/* Menu Desplegable */}
    {isMenuOpen && (
      <div className={`menu-modal ${isMenuOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-end my-4 me-2">
          <button className="btn-close-modal"onClick={toggleMenu}> Cerrar
            <FontAwesomeIcon icon={faTimes} className="fa-xl ms-2"/> 
          </button>
        </div>

        {/* navegacion */}
        <div className="d-flex flex-column ms-3">
          <Link to="/" className="link text-sans-p-white text-underline my-2"> Inicio </Link>
          <Link to="/bancodeproyectos" className="link text-sans-p-white text-underline my-2"> Banco de Proyectos </Link>
          <Link to="/bancodeideas" className="link text-sans-p-white text-underline my-2"> Proyectos Innovadores </Link>
          <Link to="/documentacion" className="link text-sans-p-white text-underline my-2"> Documentación </Link>
          <Link to="/contacto" className="link text-sans-p-white text-underline my-2">Contacto</Link>
        </div>

        <hr id="menu-divider"/>
      </div>
    )}


  </>
);
};

export default Navbar;