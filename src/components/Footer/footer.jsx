import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="content-always-on-display">
        <div className="container">

          <div className="line w-sm-50"></div>

          <div className="row">
            <div className="col-md-3 a11y-fonts-col-12">
              <img className="mw-100 h-75 mb-3 img-fluid img-sm" src="src/static/img/logo_SubDesarrollo.png" />
            </div>

            <div className="col-md-3 a11y-fonts-col-12">
              <p className="mb-3">Secciones</p>
              <Link to="/" className="link"> Inicio </Link>
              <Link to="/bancodeproyectos" className="link"> Banco de Proyectos </Link>
            </div>

            <div className="col-md-3 a11y-fonts-col-12 h-100 mt-5 mt-md-0">
              <p className="mb-3">Enlaces de Interés</p>
              <a className="link" href="https://www.subdere.gov.cl/programas/divisi%C3%B3n-municipalidades/programa-mejoramiento-urbano-y-equipamiento-comunal-pmu" target="_blank" rel="noreferrer">Programa Mejoramiento Urbano</a>
              <a className="link" href="https://www.subdere.gov.cl/programas/divisi%C3%B3n-municipalidades/programa-mejoramiento-de-barrios-pmb" target="_blank" rel="noreferrer">Programa Mejoramiento de Barrios</a>
              <a className="link text-wrap h-75" href="https://www.subdere.gov.cl/" target="_blank" rel="noreferrer">Subsecretaría de Desarrollo Regional y Administrativo SUBDERE</a>
              <a className="link text-wrap h-75" href="https://www.interior.gob.cl/" target="_blank" rel="noreferrer">Ministerio del Interior y Seguridad Pública</a>
            </div>

            <div className="col-md-3 a11y-fonts-col-12 mt-5 mt-md-0">
              <p className="mb-3">Ayuda</p>
              <Link to="/contacto" className="link">Ingresa un Formulario de Contacto</Link>
              <p className="mb-3 mt-md-5">Dirección:</p>
              <p className="mb-3"> Teatinos 92 - Pisos 2 y 3. Santiago, Chile.</p>
             
            </div>
          </div>
        </div>
      </footer>  
    );
  };
  
  export default Footer;