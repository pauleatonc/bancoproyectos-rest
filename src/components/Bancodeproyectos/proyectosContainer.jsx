import { useState } from "react";
import ProyectoCard from "./proyectoCard";

const ProyectosContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  {/* Maximo de proyectos por pagina */}
  const projectsPerPage = 6;

  {/* Array con proyectos ficticios (ejemplo) */}
  const allProjects = [
    { id: 1, title: "Proyecto 1", description: "Descripción del proyecto 1" },
    { id: 2, title: "Proyecto 2", description: "Descripción del proyecto 2" },
    { id: 3, title: "Proyecto 3", description: "Descripción del proyecto 3" },
    { id: 4, title: "Proyecto 4", description: "Descripción del proyecto 4" },
    { id: 5, title: "Proyecto 5", description: "Descripción del proyecto 5" },
    { id: 6, title: "Proyecto 6", description: "Descripción del proyecto 6" },
    { id: 7, title: "Proyecto 7", description: "Descripción del proyecto 7" },
    { id: 8, title: "Proyecto 8", description: "Descripción del proyecto 8" },
    { id: 9, title: "Proyecto 9", description: "Descripción del proyecto 9" },
    { id: 10, title: "Proyecto 10", description: "Descripción del proyecto 10" },
    { id: 11, title: "Proyecto 11", description: "Descripción del proyecto 11" },
    { id: 12, title: "Proyecto 12", description: "Descripción del proyecto 12" },
    { id: 13, title: "Proyecto 13", description: "Descripción del proyecto 13" },
    { id: 14, title: "Proyecto 14", description: "Descripción del proyecto 14" },
    { id: 15, title: "Proyecto 15", description: "Descripción del proyecto 15" },
  ];

  {/* Logica para calcular los indices de los proyectos a mostrar en la pagina actual */}
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = allProjects.slice(indexOfFirstProject, indexOfLastProject);

  {/* Funcion para manejar el cambio de pagina */}
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  {/* Calculo del rango y el total de proyectos */}
  const rangeStart = indexOfFirstProject + 1;
  const rangeEnd = Math.min(indexOfLastProject, allProjects.length);
  const totalProjects = allProjects.length;

  return (
    <div className="container p-0 d-flex flex-column align-items-center">
      <div className="card-container d-flex flex-wrap justify-content-between">
        {currentProjects.map((project) => (
          <ProyectoCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-4 d-flex flex-row">
        <p className="mr-5"> {`${rangeStart} - ${rangeEnd}, de ${totalProjects} publicaciones`} </p>
        <nav className="pagination-container flex-column flex-sm-row a11y-fonts-flex-column a11y-fonts-flex-lg-row">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <div className="page-link disabled">&lt;</div>
            </li>
            {/* Renderizar los numeros de pagina segun la cantidad de proyectos */}
            {Array.from({ length: Math.ceil(allProjects.length / projectsPerPage) }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}> 
                <a className="page-link" href="#" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </a>
              </li>
            ))}
            <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
          </ul>
        </nav>
      </div> 
   
    </div>
  );
};

export default ProyectosContainer;