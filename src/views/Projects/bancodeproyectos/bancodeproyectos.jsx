import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import "../../../static/styles/bancodeproyectos.css";
import { ProyectoContainer, ProyectosFilter, ProyectosSort, BuscadorProyectos } from '../../../components/Bancodeproyectos';
import useApiFilter from '../../../hooks/useApiFilter';
import useApiProjectsList from "../../../hooks/useApiProjectsList";
import useOrdering from '../../../hooks/useOrdering';
import useProjectSearch from '../../../hooks/useProjectSearch';



const BancoProyectos = () => {
  const { dataProject, loadingProject, errorProject } = useApiProjectsList();
  const { dataFilter, loading, error, filteredProjects, handleFilter } = useApiFilter();
  const { data, loading: orderingLoading, error: orderingError, setOrder } = useOrdering();
  const { searchResults, searchActivated, handleSearch } = useProjectSearch();

  
  const projectsToDisplay = useMemo(() => {
    if (searchActivated) return searchResults;
    if (filteredProjects.length > 0) return filteredProjects;
    if (data && data.length > 0) return data; // datos ordenados
    return dataProject; // datos originales sin filtrar ni ordenar
  }, [searchActivated, searchResults, filteredProjects, data, dataProject]); 
  
  const hasResults = projectsToDisplay && projectsToDisplay.length > 0;
  
  if (loadingProject || loading || orderingLoading) return <div>CARGANDO DATOS...</div>;
  if (errorProject || error || orderingError) return <div>Error de conexión</div>;



  return (
    <div className="container col-md-10">
      <nav className="container" aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-style">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Banco de Proyectos</li>
        </ol>
      </nav>

      <BuscadorProyectos onSearch={handleSearch} />

      <div className="container d-flex flex-column flex-md-row">
        <ProyectosFilter onFilter={handleFilter} dataFilter={dataFilter}/>
        <div className="ml-md-5">
          <div className="d-flex justify-content-end mb-1">
            <ProyectosSort setOrder={setOrder}/>
          </div>
          {hasResults ? (
            <ProyectoContainer data={projectsToDisplay} />
          ) : (
            <div className="d-flex justify-content-center mt-4">
              <p className="text-muted">No hay proyectos que coincidan con los criterios seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BancoProyectos;
