import { Link } from 'react-router-dom';
import "../../styles/Header/header.css";
import BuscadorGeneral from "./buscadorGeneral";
import Accesibilidad from './accesibilidad';

const Header = () => {
    return (
      <header id="header">
        <div id="decoBlk"></div>
        <div id="firstRow">
          <div>logo</div>
          <Accesibilidad />
          <button>inicio sesion</button>
        </div>
        <div id="secondRow">
          <div>RRSS</div>
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
