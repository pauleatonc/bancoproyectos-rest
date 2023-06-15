import "../../styles/Footer/footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer id="footercontainer">

        <div id="logoContainer">
          <div id="logoSubdere"></div>
          <div id="decoGob">
            <div id="azul"></div>
            <div id="rojo"></div>
          </div>
        </div>

        <div id="secciones">
          <h1>Secciones</h1>
          <div id="seccionesContainer">
            <Link to="contacto" className="link"> Inicio </Link>
            <Link to="contacto" className="link"> Banco de Proyectos </Link>
          </div>
        </div>

        <div id="enlaces">
          <h1>Enlaces</h1>
          <div id="enlacesContainer">
            <a className="link" href="https://www.google.com/" target="_blank" rel="noreferrer">Programa Mejoramiento Urbano</a>
            <a className="link" href="https://www.google.com/" target="_blank" rel="noreferrer">Programa Mejoramiento de Barrios</a>
            <a className="link" href="https://www.google.com/" target="_blank" rel="noreferrer">Subsecretaría de Desarrollo Regional y Administrativo SUBDERE</a>
            <a className="link" href="https://www.google.com/" target="_blank" rel="noreferrer">Ministerio del Interior y Seguridad Pública</a>
          </div>
        </div>

        <div id="infoContainer">
          <h3>
            Direccion:<br/>
            Teatinos 92 - Pisos 2 y 3. Santiago, Chile. <br/>
            Teléfono Mesa Central:<br/>
            (2) 2 636 36 00
          </h3>
        </div>


      </footer>
    );
  };
  
  export default Footer;