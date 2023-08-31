import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container content-always-on-display position-relative">
      <div className="container py-5">

        {/* linea decorativa?? */}
        <div className="deco-line position-absolute">
          <div className="azul"></div>
          <div className="rojo"></div>
        </div>
      
        <div className="row">

          <div className="col-md-2 col-8 a11y-fonts-col-12 me-5">
            <div className="aspect-ratio ratio-4x3">
              <img className="mb-3 img-fluid img-sm" src="../../src/static/img/logo_Subdere.png" />
            </div>  
          </div>

          <div className="col-lg-3 ms-3 ms-lg-0 d-flex flex-column">
            <p className="text-sans-p-white mb-3">Secciones</p>
            <Link to="/" className="text-sans-p-white text-decoration-underline"> Inicio </Link>
            <Link to="/bancodeproyectos" className="text-sans-p-white text-decoration-underline"> Banco de Proyectos </Link>
          </div>

          <div className="container d-lg-none d-flex justify-content-center">
            <div className="divider mt-4"></div>
          </div>

          <div className="col-lg-3 d-flex flex-column h-100 mt-5 mt-lg-0 ms-3 ms-lg-0">
            <p className="text-sans-p-white mb-3">Enlaces de Interés</p>
            <a className="text-sans-p-white text-decoration-underline" href="https://www.subdere.gov.cl/programas/divisi%C3%B3n-municipalidades/programa-mejoramiento-urbano-y-equipamiento-comunal-pmu" target="_blank" rel="noreferrer">Programa Mejoramiento Urbano</a>
            <a className="text-sans-p-white text-decoration-underline" href="https://www.subdere.gov.cl/programas/divisi%C3%B3n-municipalidades/programa-mejoramiento-de-barrios-pmb" target="_blank" rel="noreferrer">Programa Mejoramiento de Barrios</a>
            <a className="text-sans-p-white text-wrap h-75 text-underline" href="https://www.subdere.gov.cl/" target="_blank" rel="noreferrer">Subsecretaría de Desarrollo Regional y Administrativo SUBDERE</a>
            <a className="text-sans-p-white text-wrap h-75 text-underline" href="https://www.interior.gob.cl/" target="_blank" rel="noreferrer">Ministerio del Interior y Seguridad Pública</a>
          </div>

          <div className="d-lg-none d-flex justify-content-center">
            <div className="divider mt-4"></div>
          </div>

          <div className="col-lg-3 d-flex flex-column mt-5 mt-lg-0 ms-3 ms-lg-0">
            <p className="text-sans-p-white mb-3">Ayuda</p>
            <Link to="/contacto" className="text-sans-p-white text-decoration-underline">Ingresa un Formulario de Contacto</Link>
            <p className="text-sans-p-white mb-3 mt-md-5">Dirección:</p>
            <p className="text-sans-p-white mb-3"> Teatinos 92 - Pisos 2 y 3. Santiago, Chile.</p>
          </div>
        </div>
      </div>
    </footer>  
  );
};
  
export default Footer;