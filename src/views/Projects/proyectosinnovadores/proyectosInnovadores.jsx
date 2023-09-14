import { useState, useEffect, useMemo } from 'react';
import useApiInnovativeProjects from '../../../hooks/useApiInnovativeProjects';
import useFilterOptions from '../../../hooks/useFilterProjects';
import useApiGoodPractices from '../../../hooks/useApiGoodPractices';
import Carrusel from '../../../components/Commons/carrusel';
import SelectorLateral from '../../../components/Commons/selectorLateral';

const ProyectosInnovadores = () => {
  const { programs } = useFilterOptions();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState([2]); // Inicialmente selecciona "PMU"
  const [selectedPracticesPrograms, setSelectedPracticesPrograms] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedGoodPracticesPrograms') || '[]');
  });
  

  const filterPracticesByPrograms = (data, selectedPrograms) => {
    if (selectedPrograms.length === 0) {
      return data;
    } else {
      return data.filter((item) =>
        selectedPrograms.includes(item.program)
      );
    }
  };

  const toggleProgram = (id) => {
    if (selectedProgram.includes(id)) {
      // Si ya está seleccionado, no hagas nada o puedes limpiar el programa
      setSelectedProgram([]);
      setSelectedPracticesPrograms([]);
    } else {
      // Si no está seleccionado, selecciona el nuevo programa y filtra las Buenas Prácticas
      setSelectedProgram([id]);
      const filteredPractices = filterPracticesByPrograms(dataGoodPractices, [id]);
      setSelectedPracticesPrograms(filteredPractices.map((practice) => practice.id));
      console.log('selectedPracticesPrograms:', selectedPracticesPrograms);
      console.log('filteredPractices después de la actualización:', filteredPractices);
    }
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onGoodPracticeSelect = (practice) => {
    setSelectedPractice(practice);
    // Guardar la buena práctica seleccionada en el almacenamiento local
    localStorage.setItem('selectedPractice', JSON.stringify(practice));
    console.log('Buena Práctica seleccionada:', practice);
  };

  const { 
    dataInnovativeProjects, 
    loadingInnovativeProjects, 
    errorInnovativeProjects 
  } = useApiInnovativeProjects();

  const {
    dataGoodPractices,
    loadingGoodPractices,
    errorGoodPractices,
  } = useApiGoodPractices();

  const filterProjectsByPrograms = (data, selectedPrograms) => {
    if (selectedPrograms.length === 0) {
      return data;
    } else {
      return data.filter((item) =>
        selectedPrograms.includes(parseInt(item.program[0].id, 10))
      );
    }
  };

  const filteredProjects = useMemo(() => {
    return filterProjectsByPrograms(dataInnovativeProjects, selectedProgram);
  }, [selectedProgram, dataInnovativeProjects]);

  const filteredPractices = useMemo(() => {
    return filterProjectsByPrograms(dataGoodPractices, selectedPracticesPrograms);
  }, [selectedPracticesPrograms, dataGoodPractices]);

  useEffect(() => {
    console.log('filteredPractices:', filteredPractices);
    // Cambio aquí para actualizar la buena práctica seleccionada al cambiar la lista
    if (filteredPractices.length > 0) {
      setSelectedPractice(filteredPractices[0]);
    }
  }, [filteredPractices]);

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
  console.log('filteredPractices antes de pasarla como prop:', filteredPractices);
  
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
        {programs.map((program) => (
          <div tabIndex="0" className="container-btnCircle col-md-2 d-flex flex-column align-items-center mx-5" key={program.id}>
            <button
            className={`categorias-circle d-inline-flex focus-ring py-1 px-2 rounded-2 btn rounded-circle border-2 d-flex align-items-center justify-content-center my-3 ${selectedProgram.includes(program.id) ? 'btn-primary' : 'btn-outline-primary white-text'}`}
            onClick={() => toggleProgram(program.id)}
            >
              <img src={program.icon_program} alt={program.sigla} id='btnIcon' className={selectedProgram.includes(program.id) ? 'white-icon' : ''} />
            </button>
            <p className="text-sans-p text-center">{program.name}</p>
          </div>
        ))}
      </div>

      <p className="text-sans-p d-none d-lg-block">Los espacios públicos, al igual que nuestra sociedad, son dinámicos y varían acorde a los tiempos y lugares en los que se encuentran. Es por esto, que la innovación en el espacio urbano se hace fundamental a la hora de entregar a la ciudadanía una mejor, más amplia y moderna oferta de espacio público.
        Aquí te mostramos algunas ideas de espacios deportivos, culturales y de protección ambiental para que puedas considerar posibles soluciones a desarrollar con financiamiento PMU.
      </p>

      {/* Selector Proyectos */}
      <div className="container my-3 d-none d-lg-block">
        {filteredProjects.map((project) => (
          <button 
          key={project.id} 
          className="btn-terciario text-decoration-underline px-3 p-2 m-1"
          onClick={() => setSelectedProject(project)}
          >
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
         {filteredProjects.map((project) => (
          <button 
          key={project.id} 
          className="select-option text-start px-3 p-2 m-1"
          onClick={() => setSelectedProject(project)}
          >
            {project.title}
          </button>
        ))}
        </div> 
      </div>

      {/* Datos del proyecto */}
      <div>
      {selectedProject ? (
        <>
          <h4 className="text-sans-h3 text-center text-md-start mt-5">
            {selectedProject.title}
          </h4>
          <div>
            <div className="carrusel-container container col-xl-7 float-md-end m-4">
              <Carrusel
                imgPortada={selectedProject.portada}
                imgGeneral={selectedProject.innovative_gallery_images}
                context="proyectosInnovadores"
              />
            </div>
            <p className="text-sans-p mt-3">{selectedProject.description}</p>
          </div>
          <div className="d-flex flex-column">
            {selectedProject.web_sources.map((source, index) => (
              <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">
                Visitar fuente {index + 1}
              </a>
            ))}
          </div>
        </>
        ) : (
        filteredProjects.length > 0 ? (
          <>
            <h4 className="text-sans-h3 text-center text-md-start mt-5">
              {filteredProjects[0].title}
            </h4>
            <div>
              <div className="carrusel-container container col-xl-7 float-md-end m-4">
                <Carrusel
                imgPortada={filteredProjects[0].portada}
                imgGeneral={filteredProjects[0].innovative_gallery_images}
                context="proyectosInnovadores"
                />
              </div>
              <p className="text-sans-p mt-3">{filteredProjects[0].description}</p>
            </div>
            <div className="d-flex flex-column">
              {filteredProjects[0].web_sources.map((source, index) => (
                <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">
                  Visitar fuente {index + 1}
                </a>
              ))}
            </div>
          </>
          ) : (
          <p className="text-sans-h4 mt-3">Selecciona un proyecto para ver los detalles.</p>
        )
      )}
    
      <hr className="my-5" />

      <h2 className="text-sans-h2">Buenas prácticas para el diseño de los espacios públicos</h2>
      <p className="text-sans-p mt-3">Con estas prácticas buscamos promover criterios sustentables a considerar en el diseño actual de los espacios públicos.</p>
      <div className="row">
        <div className="col-lg-4">
          <SelectorLateral 
          data={filteredPractices} 
          selectedPrograms={selectedPracticesPrograms} 
          toggleProgram={toggleProgram}
          onGoodPracticeSelect={onGoodPracticeSelect} 
          />
        </div>
        <div className="col">
          {selectedPractice ? (
            <>
              <h2>{selectedPractice.title}</h2>
              <p>{selectedPractice.description}</p>
              <div className="my-4">
                <Carrusel
                imgPortada={selectedPractice.portada}
                imgGeneral={selectedPractice.good_practices_gallery_images}
                context="buenasPracticas"
                />
              </div>
            </>
            ) : (
            <p className="text-sans-h4 mt-3">Selecciona una buena práctica para ver los detalles.</p>
            )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ProyectosInnovadores;