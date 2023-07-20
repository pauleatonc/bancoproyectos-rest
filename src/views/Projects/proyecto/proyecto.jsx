import "../../../static/styles/proyecto.css";

const Proyecto = () => {

  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center">
          <button className="volver-btn d-none d-lg-block"> &lt; volver</button>
          <p className="m-0 d-none d-lg-block">|</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-style m-0">
              <li className="breadcrumb-item"><a href="/" >Inicio</a></li>
              <li className="breadcrumb-item"><a href="/bancodeproyectos" >Banco de Proyectos</a></li>
              <li className="breadcrumb-item active d-none d-lg-block border border-danger" aria-current="page">Como hacer dinamico esto?</li>
            </ol>
          </nav>
        </div>
        

        <p className="font-level-1 my-md-4">Mejoramiento Integral Plaza El Olivar</p>

        <div className="container descripcion-container py-md-3">
          <p className="font-level-2 my-md-2">Descripción del proyecto</p>
          <p className="text-body">El permanente crecimiento de la comuna ha llevado a un desarrollo desigual con carencia en servicios de 
            equipamiento e infraestructura a diversos sectores de articulaciones y de integración, es por ello que, con esta 
            iniciativa de inversión se busca consolidar áreas de integración social en espacios públicos y de equipamiento 
            urbano, que mejoren de manera sostenible espacios de encuentro y de esparcimiento del área urbana.
          </p>
        </div>
      </div>

      <div className="my-md-5">
        <div className="container border border-primary">
          <p>Detalles del proyecto</p>
        </div>

        <div className="container d-flex flex-row justify-content-between">
          <div>
            <p>Nombre del proyecto</p>
            <p>Mejoramiento Integral Plaza El Olivar</p>
          </div>
          <div>
            <p>Programa</p>
            <p>Programa de Mejoramiento Urbano (PMU)</p>
          </div>
          <div>
            <p>Tipo de proyecto</p>
            <p>Plazas y Áreas Verdes</p>
          </div>
        </div>

        <div className="container d-flex flex-row justify-content-between">
          <div>
            <p>Región</p>
            <p>Valparaíso</p>
          </div>
          <div>
            <p>Comuna</p>
            <p>Algarrobo</p>
          </div>
          <div>
            <p>Año de construcción</p>
            <p>2018</p>
          </div>
        </div>

        <div className="container">
          <div>
            <p>Código de identificación SUBDERE</p>
            <p>1-C-2018-93</p>
          </div>
        </div>
      </div>

      <p className="container">Imágenes del proyecto</p>
      <div className="container border border-warning">carrusel de fotos</div>

      <div className="container">
        <div>
          <p>Antes del proyecto</p>
          <div>img</div>
        </div>
        <div>
          <p>Después del proyecto</p>
          <div>img</div>
        </div>
      </div>

      <p className="container">Video del proyecto</p>
      <div className="container border border-warning"> contenedor video</div>

      <p className="container">Documentos del proyecto</p>
      <div className="container border border-warning">componente? tabla? ver como</div>

      <p className="container">Documentos con normativa de uso general</p>
      <div className="container border border-warning">componente? tabla? ver como</div>

    </>
  );
};
  
export default Proyecto;