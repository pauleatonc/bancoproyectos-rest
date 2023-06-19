import { Link } from 'react-router-dom';
import "../../styles/Header/header.css";
import BuscadorGeneral from "./buscadorGeneral";
import Accesibilidad from './accesibilidad';
import Rrss from './rrss';

const Header = () => {
    return (
      <header id="header">
        <div id="decoBlk"></div>
        <section id="upperSection">
          <div>
            <h1 id="logoHeader">Subsecretaría de Desarrollo <br /> Administrativo y Regional</h1>
            <div id="decoGob">
            <div id="azul"></div>
            <div id="rojo"></div>
          </div>
          </div>
          <Accesibilidad />
          <Link to="/login" className="linkHeader"> Inicio Sesion </Link>
        </section>
        <section id="middleSection">
          <Rrss />
          <BuscadorGeneral/>
        </section>
        <section id="lowerSection">
        <div id="seccionesHeader">
          <Link to="/" className="linkHeader"> Inicio </Link>
          <Link to="/bancodeproyectos" className="linkHeader"> Banco de Proyectos </Link>
          <Link to="/contacto" className="linkHeader"> Contacto </Link>
        </div>
        </section>
      </header>
    );
  };
  
  export default Header;
