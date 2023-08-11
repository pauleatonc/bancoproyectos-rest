import useApiProjectsDetail from '../../hooks/useApiProjectsDetail';
import { useParams } from 'react-router-dom';

const Proyecto = () => {
  const { slug } = useParams();
  const { dataProject, loadingProject, errorProject } = useApiProjectsDetail(slug);

  if (loadingProject) {
    return  <div>Loading...</div>
  }
  if (errorProject) {
    return <div>Error: {errorProject.message}</div>;
  }

  return (
    <div className="container col-10">
      {/* Boton volver y breadcrumbs */}
      <div className="d-flex align-items-center">
        <button className="volver-btn d-none d-lg-block"> &lt; volver</button>
        <p className="m-0 d-none d-lg-block">|</p>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item"><a href="/" >Inicio</a></li>
            <li className="breadcrumb-item"><a href="/bancodeproyectos" >Banco de Proyectos</a></li>
            <li className="breadcrumb-item active d-none d-lg-block border border-danger" aria-current="page">Como hacer dinamico esto?</li>
          </ol>
        </nav>
      </div>

      <h1 className="text-sans-h1 my-md-5">cu</h1>

      {/* Descripcion del proyecto */}
      <div className="descripcion-container py-3 px-3">
        <h2 className="text-sans-h2 my-2">Descripción del proyecto</h2>
        <p className="text-sans-p">El permanente crecimiento de la comuna ha llevado a un desarrollo desigual con carencia en servicios de equipamiento e infraestructura a diversos sectores de articulaciones y de integración, 
          es por ello que, con esta iniciativa de inversión se busca consolidar áreas de integración social en espacios públicos y de equipamiento urbano, que mejoren de manera sostenible espacios de encuentro y de esparcimiento del área urbana.
        </p>
      </div>
      
      {/* Tabla detalles del proyecto */}
      <div className="detalles-del-proyecto my-4 mt-5">
        <h2 className="text-sans-h2-white ms-3 ">Detalles del proyecto</h2>
      </div>
      <div className="ms-3">
        <div className="row">
          <div className="col">
            <p className="text-sans-p"><strong>Nombre del proyecto</strong></p>
            <p className="text-sans-p">Mejoramiento Integral Plaza El Olivar</p>
          </div>

          <div className="col">
            <p className="text-sans-p"><strong>Programa</strong></p>
            <p className="text-sans-p">Programa de Mejoramiento Urbano (PMU)</p>
          </div>

          <div className="col">
            <p className="text-sans-p"><strong>Tipo de proyecto</strong></p>
            <p className="text-sans-p">Plazas y Áreas Verdes</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p className="text-sans-p"><strong>Región</strong></p>
            <p className="text-sans-p">Valparaíso</p>
          </div>

          <div className="col">
            <p className="text-sans-p"><strong>Comuna</strong></p>
            <p className="text-sans-p">Algarrobo</p>
          </div>

          <div className="col">
            <p className="text-sans-p"><strong>Año de construcción</strong></p>
            <p className="text-sans-p">2018</p>
          </div>
        </div>
        
        <div className="row">
          <p className="text-sans-p"><strong>Código de identificación SUBDERE</strong></p>
          <p className="text-sans-p">1-C-2018-93</p>
        </div>
      </div>
      
      {/* Imágenes del proyecto */}
      <h2 className="text-sans-h2 my-5">Imágenes del proyecto</h2>
      <div className=" border border-danger">carrusel de fotos</div>

      <div className=" p-0 d-md-flex justify-content-between my-4">
        <div className="col-md-6">
          <h3 className="text-sans-h3">Antes del proyecto</h3>
          <div className="img-proyecto"></div>
        </div>
        <div className="col-md-6">
          <h3 className="text-sans-h3">Después del proyecto</h3>
          <div className="img-proyecto" />
        </div>
      </div>

      <h3 className="text-sans-h3">Video del proyecto</h3>
      <div className="d-flex justify-content-center mb-md-5">
        <div className="col-md-7 img-proyecto" />
      </div>

      <h2 className="text-sans-h2 my-4">Documentos del proyecto</h2>
      <div className=" d-flex justify-content-between my-4 font-weight-bold">
        <div>#</div>
        <div>Documento</div>
        <div>Formato</div>
        <div>Acción</div>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div>1</div>
        <div>Planimetría</div>
        <div>PDF</div>
        <a href="#">Descargar</a>
      </div>

      <h2 className="text-sans-h2 my-4">Documentos con normativa de uso general</h2>
      <div className="d-flex justify-content-between my-4 font-weight-bold">
        <div>#</div>
        <div>Documento</div>
        <div>Formato</div>
        <div>Acción</div>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div>1</div>
        <div>Guía Operativa PMU</div>
        <div>PDF</div>
        <a href="#">Descargar</a>
      </div>

      <h2 className="text-sans-h2 my-4">Proyectos relacionados</h2>
      <div className=" border border-warning">componente?</div>
    </div>

  );
};
  
export default Proyecto;