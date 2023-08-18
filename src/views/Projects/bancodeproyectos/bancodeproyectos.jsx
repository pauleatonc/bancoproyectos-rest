import "../../../static/styles/bancodeproyectos.css";
import {ProyectoContainer , ProyectosFilter, ProyectosSort , BuscadorProyectos} from '../../../components/Bancodeproyectos';
import useApiFilter from '../../../hooks/useApiFilter';
import useApiProjectsList from "../../../hooks/useApiProjectsList";



  const BancoProyectos = () => {
    const { dataProject, loadingProject, errorProject } = useApiProjectsList();
    const { loading, error, filteredProjects, hasResults, handleFilter } = useApiFilter();

    if (loadingProject || loading) {
      return <div>CARGANDO DATOS...</div>
    }
    if (errorProject || error) {
      return <div>Error de conexion</div>
    }
    
    return (
      <div className="container col-md-10">

        <nav className="container" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style">
            <li className="breadcrumb-item"><a href="/" >Inicio</a></li>
            <li className="breadcrumb-item active" aria-current="page">Banco de Proyectos</li>
          </ol>
        </nav>

        <BuscadorProyectos />
        
        <div className="container d-flex flex-column flex-md-row">
          <ProyectosFilter onFilter={handleFilter}/>
          <div className="ml-md-5">
            <div className="d-flex justify-content-end mb-1">
              <ProyectosSort/>
            </div>
            {hasResults ? (
                  <ProyectoContainer data={filteredProjects.length > 0 ? filteredProjects : dataProject} />
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