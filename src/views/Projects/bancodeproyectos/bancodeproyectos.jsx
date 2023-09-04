import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import
{
  ProyectoContainer,
  ProyectosFilter,
  ProyectosSort,
  BuscadorProyectos

} from '../../../components/Bancodeproyectos';
import useApiFilter from '../../../hooks/useApiFilter';
import useApiProjectsList from "../../../hooks/useApiProjectsList";

const BancoProyectos = () =>
{
  const { loadingProject, errorProject } = useApiProjectsList();
  const { dataFilter, loading, error, filteredProjects, handleFilter } = useApiFilter();

  const projectsToDisplay = useMemo(() =>
  {
    if (filteredProjects.length > 0)
    {
      return filteredProjects;
    }

    return [];
  }, [ filteredProjects ]);

  const hasResults = projectsToDisplay.length > 0;

  if (loadingProject || loading) return <div>CARGANDO DATOS...</div>;
  if (errorProject || error) return <div>Error de conexión</div>;

  return (
    <div className="container col-md-10">
      <nav className="container" aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-style">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Banco de Proyectos</li>
        </ol>
      </nav>
      <BuscadorProyectos />
      <div className="row">
        <div className="col col-md-4">
          <ProyectosFilter onFilter={handleFilter} dataFilter={dataFilter} />
        </div>

        <div className="col col-md-8">
          <div className="d-flex justify-content-end mb-1">
            <ProyectosSort />
          </div>

          {hasResults ? (
            <ProyectoContainer data={projectsToDisplay} />
          ) : (
            <div className="alerta d-flex justify-content-center mt-4 " id='icon-alert'>
              <i className ="material-symbols-outlined" >
                info
              </i>
              <p className="text-alert fs-5 text-left mx-2 my-auto align-self-center">No encontramos proyectos con los filtros que elegiste. Intenta con otros distintos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BancoProyectos;