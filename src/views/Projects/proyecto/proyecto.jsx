import "../../../static/styles/proyecto.css";

const Proyecto = () => {

  return (
    <>
      {/* Boton volver y breadcrumbs */}
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

        {/* Descripcion del proyecto */}
        <div className="container descripcion-container py-md-3">
          <p className="font-level-2 my-md-2">Descripción del proyecto</p>
          <p className="text-body">El permanente crecimiento de la comuna ha llevado a un desarrollo desigual con carencia en servicios de 
            equipamiento e infraestructura a diversos sectores de articulaciones y de integración, es por ello que, con esta 
            iniciativa de inversión se busca consolidar áreas de integración social en espacios públicos y de equipamiento 
            urbano, que mejoren de manera sostenible espacios de encuentro y de esparcimiento del área urbana.
          </p>
        </div>
      </div>

      {/* Tabla detalles del proyecto */}
      <div className="container">
        <div className="container detalles-del-proyecto mt-md-5">
            <p className="font-level-2 pt-2 pt-md-0 my-md-2 ml-md-1">Detalles del proyecto</p>
        </div>
      </div>
      <div className="parent container my-4 my-md-5">
        <div className="div1 ml-md-3">
          <p><strong>Nombre del proyecto</strong></p>
          <p>Mejoramiento Integral Plaza El Olivar</p>
        </div>
        <div className="div2">
          <p><strong>Programa</strong></p>
          <p>Programa de Mejoramiento Urbano (PMU)</p>
        </div>
        <div className="div3">
          <p><strong>Tipo de proyecto</strong></p>
          <p>Plazas y Áreas Verdes</p>
        </div>
        <div className="div4 ml-md-3">
          <p><strong>Región</strong></p>
          <p>Valparaíso</p>
        </div>
        <div className="div5">
          <p><strong>Comuna</strong></p>
          <p>Algarrobo</p>
        </div>
        <div className="div6">
          <p><strong>Año de construcción</strong></p>
          <p>2018</p>
        </div>
        <div className="div7 ml-md-3">
          <div>
            <p><strong>Código de identificación SUBDERE</strong></p>
            <p>1-C-2018-93</p>
          </div>
        </div>
        <div className="div8 d-block d-sm-none"></div>
      </div>

      {/* Imágenes del proyecto */}
      <p className="font-level-2 container">Imágenes del proyecto</p>
      <div className="container border border-danger">carrusel de fotos</div>

      <div className="container p-0 d-md-flex justify-content-between my-4">
        <div className="col-md-6">
          <p className="font-level-4">Antes del proyecto</p>
          <div className="img-proyecto"></div>
        </div>
        <div className="col-md-6">
          <p className="font-level-4">Después del proyecto</p>
          <div className="img-proyecto" />
        </div>
      </div>

      <p className="container font-level-4">Video del proyecto</p>
      <div className="container d-flex justify-content-center mb-md-5">
        <div className="col-md-7 img-proyecto" />
      </div>

      <p className="font-level-2 container">Documentos del proyecto</p>
      <div className="container border border-warning">componente? tabla? ver como</div>

      <p className="font-level-2 container">Documentos con normativa de uso general</p>
      <div className="container border border-warning">componente? tabla? ver como</div>

      <p className="font-level-2 container">Proyectos relacionados</p>
      <div className="container border border-warning">componente?</div>

    </>
  );
};
  
export default Proyecto;