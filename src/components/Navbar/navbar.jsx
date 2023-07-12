import { Link } from 'react-router-dom';
import "../../static/styles/navbar.css"

const Navbar = () => {
  return (  
    <nav className="container col-md-10 navbar navbar-light navbar-expand-lg">
      <div className="col">

        <div className="d-flex">
          <div className="border border-primary">
            {/* Logo SUBDERE reducido */}
            <div className="col-8">
              <div id="lineContainer">
                <div id="lineBlue" />
                <div id="lineRed" />
              </div>
              <p id="logoSubdere" >Subsecretaría de Desarrollo Administrativo y Regional</p>
            </div>
            
            {/* Boton hamburguesa - vista mobile */}
            <button className="navbar-toggler collapsed border border-primary" type="button" data-toggle="collapse" data-target="#navbarLightExampleCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="navbar-collapse collapse" id="navbarLightExampleCollapse">
            <ul className="navbar-nav ml-auto">

              {/* Accesibilidad */}
              <div className="toolbar with-read-speaker">
                <a className="btnAccesibilidadM toolbar-behavior-contrast" href="#"><i className="cl cl-contrast"></i></a>
                <div className="toolbar-btn-group d-flex flex-row">
                  <a className="btnAccesibilidadM toolbar-behavior-decrease" href="#"><i className="cl cl-decrease-text"></i></a>
                  <a className="btnAccesibilidadM toolbar-behavior-increase mx-1" href="#"><i className="cl cl-increase-text"></i></a>
                </div>

                <div className=" toolbar-player toolbar-behavior-read rs_skip rsbtn-gobcl-skin" id="readspeaker_button1">
                  <a rel="nofollow" accessKey="L" href="#">
                    <span className="rsbtn_left rsimg rspart">
                      <span className="btnEscuchar rsbtn_text d-flex align-items-center p-1">
                        <div className="toolbar-btn-icon-content mx-1">
                          <em className="cl cl-sound"></em>
                        </div>
                        <span className="mx-2">Escuchar</span>
                      </span>
                    </span>
                    <span className="rsbtn_right rsimg rsplay rspart"></span>
                  </a>
                </div>

                <a className="toolbar-btn toolbar-toggler" href="#">
                  <i className="cl cl-accessibility toolbar-behavior-on"></i>
                  <span className="toolbar-behavior-off">X</span>
                </a>
              </div>

              {/* EN - login? - Iniciar Sesion */}
              <div className="toolbar-btn-group d-flex flex-row mx-4">
                <a className="btnAccesibilidadS toolbar-behavior-decrease text-uppercase text-underline" href="#">en</a>
                <a className="btnAccesibilidadS toolbar-behavior-increase mx-1" href="#"><i className="cl cl-login"></i></a>
              </div>
              <li className="nav-item"><button className="btnIniciarsesion" type="button"><i className="cl cl-claveunica"/> <span className="text-underline mx-1">Iniciar sesión</span></button></li>
            </ul>
          </div>
        </div>
        
        <div className="d-flex justify-content-end">
          {/* Botones RRSS */}
          <div className="d-flex align-items-center m-2">
            <div className="doc-icon m-2"> <span className="cl cl-youtube mb-2 text-dark"></span> </div>
            <div className="doc-icon m-2"> <span className="cl cl-facebook mb-2 text-dark"></span> </div>
            <div className="doc-icon m-2"> <span className="cl cl-twitter mb-2 text-dark"></span> </div>
            <div className="doc-icon m-2"> <span className="cl cl-messenger mb-2 text-dark"></span> </div> 
          </div>
          {/* Buscador */}
          <form className="search col-4 my-3 my-md-4" action="" method="GET">
            <input className="form-control " type="text" name="search" placeholder="Texto demo" aria-label="Texto demo" aria-describedby="searchAction"/>
            <div className="search-action">
              <button className="btn btn-outline-search" id="searchAction" type="submit"><i className="icon cl cl-search"></i></button>
            </div>
          </form>
          
        </div>

        {/* Navegacion */}
        <div className="container col-md-8 d-flex justify-content-around my-md-5">
          <Link to="/" className="link text-black text-underline"> Inicio </Link>
          <Link to="/bancodeproyectos" className="link text-black text-underline"> Banco de Proyectos </Link>
          <Link to="/bancodeproyectos" className="link text-black text-underline"> Type something </Link>
          <Link to="/bancodeproyectos" className="link text-black text-underline"> Type something </Link>
          <Link to="/contacto" className="link text-black text-underline">Contacto</Link>
        </div>

      </div>
    </nav>    
  );
};

export default Navbar;
