import {  useContext,  } from 'react';
import { ProyectoCard } from '../../components/Bancodeproyectos';
import { ApiContext } from '../../context/ProjectContext';

const ProyectosContainer = () => {
  const {
    projects,
    metadata,
    currentPage,
    setCurrentPage
  } = useContext(ApiContext);

  const projectsPerPage = 6;

  const totalPages = Math.ceil(metadata.count / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={`card-container d-flex flex-wrap ${projects.length === 1 ? 'justify-content-md-start justify-content-center' : 'justify-content-center justify-content-lg-between'}`}>
        {projects.map((project) => (
          <ProyectoCard key={project.id} project={project} />
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex flex-column flex-md-row my-5">
        {/* Índice */}
        <p className="text-sans-h5 mx-5 text-center">
          {`Mostrando ${(currentPage - 1) * projectsPerPage + 1}- ${Math.min(currentPage * projectsPerPage, metadata.count)} de ${metadata.count} proyectos`}
        </p>
        {/* Paginación */}
        <nav className="pagination-container mx-auto mx-md-0">
          <ul className="pagination ms-md-5">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="custom-pagination-btn mx-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="page-item">
                <button className={`custom-pagination-btn text-decoration-underline px-2 mx-2 ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="custom-pagination-btn mx-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProyectosContainer;
