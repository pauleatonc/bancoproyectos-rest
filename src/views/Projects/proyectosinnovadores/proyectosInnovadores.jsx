import { useState } from 'react';
import useApiInnovativeProjectsList from '../../../hooks/useApiInnovativeProjectsList';
import useApiGoodPractices from '../../../hooks/useApiGoodPractices';
import IconPMU from '../../../static/img/icons/PMU.svg';
import IconPMB from '../../../static/img/icons/PMB.svg';
import Carrusel from '../../../components/Commons/carrusel';
import SelectorLateral from '../../../components/Commons/selectorLateral';

const ProyectosInnovadores = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { dataInnovativeProjects, loadingInnovativeProjects, errorInnovativeProjects } = useApiInnovativeProjectsList();

    const {
    dataGoodPractices,
    loadingGoodPractices,
    errorGoodPractices,
  } = useApiGoodPractices();

  if (loadingInnovativeProjects) {
    return <div>Cargando datos...</div>;
  }
  if (errorInnovativeProjects) {
    return <div>Error: {errorInnovativeProjects}</div>;
  }

  if (loadingGoodPractices) {
    return <div>Cargando datos de buenas prácticas...</div>;
  }
  if (errorGoodPractices) {
    return <div>Error en los datos de buenas prácticas: {errorGoodPractices}</div>;
  }

  return (
    <div className="container col-md-8">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb ms-3">
          <li className="breadcrumb-item "><a className="breadcrumbs" href="/">Inicio</a></li>
          <li className="breadcrumb-item active" aria-current="page">Proyectos Innovadores</li>
        </ol>
      </nav>
      <h1 className="text-sans-h1">Proyectos Innovadores</h1>
      <p className="text-sans-p my-md-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <h2 className="text-sans-h2 mt-5">Listado de proyectos innovadores</h2>
      <h3 className="text-sans-h3 mt-3">Primero, elige un programa:</h3>
      {/* Tipo de programa */}
      <div className="container d-flex flex-row justify-content-center">
        <div className="col-md-2 d-flex flex-column mx-md-5 align-items-center">
          <a   type="button"   id='btn-icon' className="categorias-circle  btn btn-outline-primary  border-2 rounded-circle d-flex align-items-center justify-content-center my-3">
            <img src={IconPMU} alt='iconPMU'  id='btnIcon' />
          </a>
          <p className="text-sans-p text-center">Programa Mejoramiento Urbano</p>
        </div>
          
        <div className="col-md-2 d-flex flex-column mx-md-5 align-items-center">
          <a  type="button"  id='btn-icon' className="categorias-circle btn btn-outline-primary  rounded-circle border-2 d-flex align-items-center justify-content-center my-3">
            <img src={IconPMB} alt='iconPMU' id='btnIcon' />
          </a>
          <p className="text-sans-p text-center">Programa Mejoramiento de Barrios</p>
        </div>
      </div>

      <p className="text-sans-p">Los espacios públicos, al igual que nuestra sociedad, son dinámicos y varían acorde a los tiempos y lugares en los que se encuentran. Es por esto, que la innovación en el espacio urbano se hace fundamental a la hora de entregar a la ciudadanía una mejor, más amplia y moderna oferta de espacio público.
        Aquí te mostramos algunas ideas de espacios deportivos, culturales y de protección ambiental para que puedas considerar posibles soluciones a desarrollar con financiamiento PMU.
      </p>

      {/* Selector Proyectos */}
      <div className="container my-3 d-none d-lg-block">
        {dataInnovativeProjects.map((project) => (
          <button key={project.id} className="btn-terciario text-decoration-underline px-3 p-2 m-1">
            {project.title}
          </button>
        ))}
      </div>

      {/* Boton y Dropdown */}
      <div className="d-flex justify-content-center m-3 d-lg-none">
        <button className="select-box text-decoration-underline px-3 p-2" onClick={toggleDropdown}>
          Elige un proyecto
        </button>
      </div>

      <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
        <div className="d-flex flex-column">
        {dataInnovativeProjects.map((project) => (
          <button key={project.id} className="select-option text-start px-3 p-2 m-1">
            {project.title}
          </button>
        ))}
        </div> 
      </div>

      <div>
        <h4 className="text-sans-h3 text-center text-md-start mt-5">Patinódromo</h4>
        <div>
          <div className="carrusel-container float-md-end m-4"> 
            <Carrusel imgPortada={dataInnovativeProjects.portada} imgGeneral={dataInnovativeProjects.innovative_gallery_images}/> 
          </div>
          <p className="text-sans-p mt-3">Los Patinódromos son pistas de asfalto que permiten el deslizamiento de patines, fomentan la competencia sana y la vida saludable.
            Es una infraestructura que no requiere mucha mantención y ofrece una disciplina diferente a los deportes tradicionales como fútbol, basquetbol y tenis. Los Patinódromos son pistas de asfalto que permiten el deslizamiento de patines, fomentan la competencia sana y la vida saludable.
            Es una infraestructura que no requiere mucha mantención y ofrece una disciplina diferente a los deportes tradicionales como fútbol, basquetbol y tenis.Los Patinódromos son pistas de asfalto que permiten el deslizamiento de patines, fomentan la competencia sana y la vida saludable.
            Es una infraestructura que no requiere mucha mantención y ofrece una disciplina diferente a los deportes tradicionales como fútbol, basquetbol y tenis.Los Patinódromos son pistas de asfalto que permiten el deslizamiento de patines, fomentan la competencia sana y la vida saludable.
            Es una infraestructura que no requiere mucha mantención y ofrece una disciplina diferente a los deportes tradicionales como fútbol, basquetbol y tenis.Los Patinódromos son pistas de asfalto que permiten el deslizamiento de patines, fomentan la competencia sana y la vida saludable.
            Es una infraestructura que no requiere mucha mantención y ofrece una disciplina diferente a los deportes tradicionales como fútbol, basquetbol y tenis.
          </p>
          
        </div>
        <div className="d-flex flex-column">
          <a>Visitar fuente 1 </a>
          <a>Visitar fuente 1 </a>
        </div>
      </div>

      <hr className="my-5" />

      <h2 className="text-sans-h2">Buenas prácticas para el diseño de los espacios públicos</h2>
      <p className="text-sans-p mt-3">Con estas prácticas buscamos promover criterios sustentables a considerar en el diseño actual de los espacios públicos.</p>
      <div className="row">
        <div className="col-md-4">
          < SelectorLateral />
        </div>
        <div className="col">
          detalle practica seleccionada
          <div className="border border-alert my-4">
            <Carrusel imgPortada={dataGoodPractices.portada} imgGeneral={dataGoodPractices.good_practices_gallery_images}/> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectosInnovadores;