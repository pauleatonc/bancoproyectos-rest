import { Link } from 'react-router-dom';

const Navbar = () =>{  
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
          <button className="btn-principal-s mt-4 me-md-5" type="button">
            <i className="cl cl-claveunica"/> 
            <span className="text-underline mx-1">Iniciar sesión</span>
          </button>
        </div>
      </div>
    </nav>  

    <div className="row border border-primary">
      {/* Navegacion */}
      <div className="mx-md-auto mx-lg-auto mx-xl-auto d-flex flex-column flex-md-row justify-content-center">
        <Link to="/" className="link text-black text-underline mx-md-3"> Inicio </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Banco de Proyectos </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
        <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
        <Link to="/contacto" className="link text-black text-underline mx-md-3">Contacto</Link>
      </div>
    </div>   
  </>
);
};

export default Navbar;