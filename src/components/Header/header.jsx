import { Link } from 'react-router-dom';
import "../../styles/Header/header.css";
import BuscadorGeneral from "./buscadorGeneral";
import Accesibilidad from './accesibilidad';
import Rrss from './rrss';

const Header = () => {
    return (
      <header id="header">
        <div id="decoBlk"></div>
        <div id="firstRow">
          <div>logo</div>
          <Accesibilidad />
          <Link to="/login" className="linkHeader"> Inicio Sesion </Link>
        </div>
        <div id="secondRow">
          <Rrss />
          <BuscadorGeneral/>
        </div>
        <div id="thirdRow">
        <div id="seccionesHeader">
          <Link to="/" className="linkHeader"> Inicio </Link>
          <Link to="/contacto" className="linkHeader"> Banco de Proyectos </Link>
        </div>
        </div>
      </header>
    );
  };
  
  export default Header;
