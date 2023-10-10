import { useEffect, useState } from 'react';
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";
import Buscador from '../../../../components/Commons/barraDeBusqueda';

const AdministrarProyectosInnovadores = () => {
  const { InnovativeAdminProjectsList, dataInnovativeProjects } = useApiInnovativeProjects();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    InnovativeAdminProjectsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Funcion para manejar la busqueda
  const handleSearch = (term) => {
    setSearchTerm(term.trim().toLowerCase());
  };

  // Filtrar proyectos basados en el termino de busqueda
  const proyectosFiltrados = dataInnovativeProjects.filter((project) => {
    const projectTitleLower = project.title.toLowerCase();
    return (
      projectTitleLower.includes(searchTerm) || // Filtrar por nombre del proyecto
      project.subdereId === searchTerm || // Filtrar por ID subdere
      project.type === searchTerm // Filtrar por tipo de proyecto
    );
  });

  return (
    <div className="container view-container mx-5">
      <h2 className="text-sans-h2 my-3">Administrar Proyectos</h2>
      <div className="col-11 my-5 d-flex justify-content-between">
        <h3 className="text-sans-h3">Proyectos Innovadores</h3>
        <div>
          <Buscador
            searchTerm={searchTerm}
            onSearch={handleSearch}
            isSearching={false} // Puedes ajustar esto según tus necesidades
            setIsSearching={() => {}} // Puedes ajustar esto según tus necesidades
            placeholder='Busca palabras clave o código SUBDERE'
          />
        </div>
      </div>
      
      <div className="row my-4 fw-bold border-top ">
        <div className="col-1 mt-3">#</div>
        <div className="col mt-3">Proyecto</div>
        <div className="col mt-3">Tipo de Proyecto</div>
        <div className="col mt-3">Estado</div>
        <div className="col mt-3">Programa</div>
        <div className="col mt-3">Acción</div>
      </div>

       {/* Mostrar proyectos según si se aplicó una búsqueda o no */}
       {searchTerm === undefined || searchTerm === '' ? (
        // Si no se aplicó ninguna búsqueda, muestra dataInnovativeProjects completa
        dataInnovativeProjects.map((project, index) => (
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
        ) : proyectosFiltrados.length > 0 ? (
          // Si se aplicó una búsqueda y hay proyectos filtrados, muestra proyectosFiltrados
          proyectosFiltrados.map((project, index) => (
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
          // Si se aplicó una búsqueda pero no hay proyectos filtrados, muestra un mensaje o maneja el caso como desees
          <div>No se encontraron proyectos.</div>
        )}
      </div>
    );
  };
  
  export default AdministrarProyectosInnovadores;