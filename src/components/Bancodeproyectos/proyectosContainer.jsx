import { useState } from 'react';
import { ProyectoCard } from '../../components/Bancodeproyectos';

const ProyectosContainer = ({ data = [] }) => { 
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Verificar si `data` está disponible y es un array
  if (!data || !Array.isArray(data)) {
    return <div>Cargando Proyectos...</div>;
  }

  const lastProjectIndex = currentPage * projectsPerPage;
  const firstProjectIndex = lastProjectIndex - projectsPerPage;
  const currentProjects = data.slice(firstProjectIndex, lastProjectIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const rangeStart = firstProjectIndex + 1;
  const rangeEnd = Math.min(lastProjectIndex, data.length);
  const totalProjects = data.length;

  return (
    <div className="container p-0 d-flex flex-column align-items-center">
      <div className="card-container d-flex flex-wrap justify-content-between">
        {currentProjects.map((project) => (
          <ProyectoCard key={project.id} project={project} />
        ))}
      </div>

      {/* Paginación */}
      <div className="mt-5 d-flex flex-column flex-md-row">
        {/* Índice */}
        <p className="text-sans-h5">{`${rangeStart} - ${rangeEnd} de ${totalProjects} publicaciones`}</p>
        {/* Paginación */}
        <nav className="pagination-container">
          <ul className="pagination ms-5">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="custom-pagination-btn mx-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
              </button>
            </li>
            {Array.from({ length: Math.ceil(data.length / projectsPerPage) }, (_, i) => (
              <li key={i} className="page-item">
                <button className={`custom-pagination-btn text-decoration-underline px-2 mx-2 ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(data.length / projectsPerPage) ? 'disabled' : ''}`}>
              <button className="custom-pagination-btn mx-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / projectsPerPage)}>
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProyectosContainer;
