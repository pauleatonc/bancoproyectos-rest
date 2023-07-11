import BuscadorProyectos from "../../components/Landing/buscadorproyectos";

const Home = () => {
  return (
    <>
      <BuscadorProyectos />

      {/* Categorias principales */}
      <div className="container mb-md-5">
        <p className="font-level-1 text-center">Categorías principales</p>
        <div className="container d-flex flex-row justify-content-center">

          <div className="col-md-2 d-flex flex-column mx-md-5 align-items-center">
            <div className="rounded-circle border border-primary d-flex align-items-center justify-content-center my-md-3" style={{ width: '65px', height: '65px' }}>
              <span className="h4 font-weight-bold text-primary mt-2">PMU</span>
            </div>
            <p className="text-center">Programa Mejoramiento Urbano</p>
          </div>
          
          <div className="col-md-2 d-flex flex-column mx-md-5 align-items-center">
            <div className="rounded-circle border border-primary d-flex align-items-center justify-content-center my-md-3" style={{ width: '65px', height: '65px' }}>
              <span className="h4 font-weight-bold text-primary mt-2">PMB</span>
            </div>
            <p className="text-center">Programa Mejoramiento de Barrios</p>
          </div>

          <div className="col-md-2 d-flex flex-column mx-md-5 align-items-center">
            <div className="rounded-circle border border-primary d-flex align-items-center justify-content-center my-md-3" style={{ width: '65px', height: '65px' }}>
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-center">Ver todos los proyectos</p>
          </div>

        </div>
      </div>
      

      {/* Que es el Banco de Proyectos */}
      <div className="container col-md-8">
        <p className="font-level-1">¿Qué es el Banco de Proyectos?</p>
        <p> El <strong> Banco de Proyectos </strong> de la Subsecretaría de Desarrollo Regional y Administrativo es un
          <strong> repositorio de proyectos ya ejecutados por distintas municipalidades </strong>a lo largo del país, que tiene por objetivo
          <strong> poner a disposición diversas iniciativas y su documentación </strong>asociada al momento de postular a los
          <strong>Programas de Mejoramiento Urbano (PMU) y de Mejoramiento de Barrios (PMB) de esta Subsecretaría.</strong></p>
        <p className="my-md-4"> Toda la información en este repositorio es referencial, <strong>siendo responsabilidad de la unidad ejecutora revisar y actualizar 
          sus valores y aspectos normativos</strong>
        </p>

        <div className="container d-md-flex my-md-5">
          <div className="col-md-4 d-flex flex-column mx-md-2 align-items-center">
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mb-md-4" style={{ width: '200px', height: '200px' }}>
              <img src="src/static/img/que_es_1.png" alt="Imagen" className="img-fluid rounded-circle h-100" />
            </div>
            <strong className="text-center font-level-4 text-gray-a">Para personas encargadas de Programas de Mejoramiento Urbano y de Barrios</strong>
            <p className="text-center my-md-4">Dirigido a todo profesional municipal encargado de la formulación de proyectos que se enmarquen en los programas PMU y PMB.</p>
          </div>

          <div className="col-md-4 d-flex flex-column mx-md-2 align-items-center">
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mb-md-4" style={{ width: '200px', height: '200px' }}>
              <img src="src/static/img/que_es_2.png" alt="Imagen" className="img-fluid rounded-circle h-100" />
            </div>
            <strong className="text-center font-level-4 text-gray-a">Filtra información y encuentra el proyecto que se ajuste a tu comuna</strong>
            <p className="text-center my-md-4">Podrás filtrar proyectos por tipo de programa, revisar antecedentes y descargar documentación referencial para postular proyectos adecuados a la realidad de tu comuna.</p>
          </div>

          <div className="col-md-4 d-flex flex-column mx-md-2 align-items-center">
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mb-md-4" style={{ width: '200px', height: '200px' }}>
              <img src="src/static/img/que_es_3.png" alt="Imagen" className="img-fluid rounded-circle h-100" />
            </div>
            <strong className="text-center font-level-4 text-gray-a">Entregamos información referencial para la realización de proyectos</strong>
            <p className="text-center my-md-4">Encontrarás información referencial detallada de proyectos como: planos, especificaciones, presupuestos, e información referencial para su elaboración. </p>
          </div>
        </div>
      </div>

      {/* Quienes somos */}
      <div className="container col-md-8">
        <p className="font-level-1 text-center">¿Quiénes somos?</p>
        <p>El Banco de Proyectos es una iniciativa directa de la  Subsecretaría de Desarrollo Regional y Administrativo, cuya información está en permanente actualización.</p>
      </div>

      {/* Banner mapa chile */}
      <div className="container col-md-10 mw-75 d-flex flex-column justify-content-center align-items-center">
        <img src="src/static/img/banner_chile.png" className="w-100 m-5 " alt="mapa de chile" />
      </div>

    </>
  );
};
  
  export default Home;
