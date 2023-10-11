import { useEffect, useState } from 'react';
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";
import Buscador from '../../../../components/Commons/barraDeBusqueda';

const AdministrarProyectosInnovadores = () => {
  const { InnovativeAdminProjectsList, dataInnovativeProjects } = useApiInnovativeProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    InnovativeAdminProjectsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funcion para manejar la busqueda
  const handleSearch = (term) => {
    // Normaliza el termino de busqueda a minusculas
    const normalizedTerm = term.trim().toLowerCase();
    setSearchTerm(normalizedTerm);

  // Filtrar proyectos basados en el termino de busqueda
  const filteredProjects = dataInnovativeProjects.filter((project) => {
    const projectTitleLower = project.title.toLowerCase();
    return (
      projectTitleLower.includes(normalizedTerm) ||
      project.id.toString().includes(normalizedTerm)
    );
  });
    setSearchResults(filteredProjects);
    setSearching(!!normalizedTerm);
  };

  return (
    <div className="container view-container mx-5">
      <h2 className="text-sans-h2 my-3">Administrar Proyectos</h2>
      <div className="col-11 my-5 d-flex justify-content-between">
        <h3 className="text-sans-h3">Proyectos Innovadores</h3>
        <div>
          <Buscador
            searchTerm={searchTerm}
            onSearch={handleSearch}
            isSearching={searching}
            setIsSearching={setSearching}
            placeholder="Busca palabras clave o código SUBDERE"
          />
        </div>
      </div>
      
      <div className="row my-4 fw-bold border-top ">
        <div className="col-1 mt-3">#</div>
        <div className="col mt-3">Proyecto</div>
        <div className="col mt-3">Estado</div>
        <div className="col mt-3">Programa</div>
        <div className="col mt-3">Acción</div>
      </div>

       {/* Mostrar proyectos segun si se aplico una busqueda o no */}
       {searchTerm === '' ? (
        // Si no se aplico ninguna, muestra dataInnovativeProjects completa
        dataInnovativeProjects.map((project, index) => (
          <div key={index} className={`row border-top ${index % 2 === 0 ? 'grey-table-line' : 'white-table-line'}`}>
            <div className="col-1 p-3">{index + 1}</div>
            <div className="col p-3">{project.title}</div>
            <div className="col p-3">{project.application_status}</div>
            <div className="col p-3">{project.program?.sigla || "N/A"}</div>
            <div className="col p-3">
              {
                (project.application_status !== 'Publicado' && project.application_status !== 'Privado') ? (
                  <a href={`/dashboard/crearinnovador_paso1?id=${project.id}`} className="btn btn-primary">Ver solicitud</a>
                ) : (
                  <button className="btn btn-secondary" disabled>Ver proyecto</button>
                )
              }
            </div>
          </div>
        ))
        ) : searchTerm !== '' ? (
          // Si se aplico una busqueda y hay proyectos filtrados, muestra proyectosFiltrados
          searchResults.map((project, index) => (
            <div key={index} className={`row border-top ${index % 2 === 0 ? 'grey-table-line' : 'white-table-line'}`}>
              <div className="col-1 p-3">{index + 1}</div>
              <div className="col p-3">{project.title}</div>
              <div className="col p-3">{project.type}</div>
              <div className="col p-3">{project.application_status}</div>
              <div className="col p-3">{project.program?.sigla || "N/A"}</div>
              <div className="col p-3">
                {
                  (project.application_status !== 'Publicado' && project.application_status !== 'Privado') ? (
                    <a href={`/dashboard/crearinnovador_paso1?id=${project.id}`} className="btn btn-primary">Ver solicitud</a>
                  ) : (
                    <button className="btn btn-secondary" disabled>Ver proyecto</button>
                  )
                }
              </div>
            </div>
          ))
        ) : (
          // Si se aplico una busqueda pero no hay proyectos filtrados, muestra un mensaje
          <div>No se encontraron proyectos coincidentes.</div>
        )}
      </div>
    );
  };
  
  export default AdministrarProyectosInnovadores;