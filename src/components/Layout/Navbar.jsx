import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Navbar = () =>{  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menu desplegable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)){
      setIsMenuOpen(false); //Cierra menu al hacer click fuera de el
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
  <>
    <div id="barraGris"></div>
    <nav className="container-fluid">

      <div className="row border border-primary">
        <div className="col border border-secondary">
          {/* Logo subdere */}
          <Link to="/" className="text-decoration-none">
            <div className="line-container row">
              <div id="lineBlue" />
              <div id="lineRed" />
            </div>
            <p className="logo-subdere mt-3">Subsecretaría de Desarrollo Administrativo y Regional</p>  
          </Link>
        </div>

        <div className="col d-flex justify-content-end  border border-secondary">
          {/* Inicio sesion */}
          <button className="btn-principal-s mt-4 me-md-5 d-none d-md-block" type="button">
            <i className="cl cl-claveunica"/> 
            <span className="text-underline mx-1"> Iniciar sesión </span>
          </button>
          <button className="d-md-none" onClick={toggleMenu}> Menu </button>
        </div>
      </div>
    </nav>  

    <div className="row border border-primary">
      {/* Navegacion */}
      <div className="mx-md-auto mx-lg-auto mx-xl-auto d-flex flex-column flex-md-row justify-content-center">
        <Link to="/" className="link text-black text-underline mx-md-3 d-none d-md-block"> Inicio </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3 d-none d-md-block"> Banco de Proyectos </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3 d-none d-md-block"> Type something </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3 d-none d-md-block"> Type something </Link>
        <Link to="/contacto" className="link text-black text-underline mx-md-3 d-none d-md-block">Contacto</Link>
      </div>
    </div> 

    {/* Menu Desplegable */}
    {isMenuOpen && (
      <div className="col" ref={menuRef}>
        {/* nagevacion */}
        <Link to="/" className="link text-black text-underline mx-md-3"> Inicio </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Banco de Proyectos </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
        <Link to="/contacto" className="link text-black text-underline mx-md-3">Contacto</Link>

        <hr />
        {/* Inicio Sesion  */}
        <button className="btn-principal-l mt-4 me-md-5" type="button">
            <i className="cl cl-claveunica"/> 
            <span className="text-underline mx-1"> Iniciar sesión </span>
          </button>
      </div>
    )}


  </>
);
};

export default Navbar;