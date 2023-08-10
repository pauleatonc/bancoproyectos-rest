import "../../../static/styles/bancodeproyectos.css";
import {ProyectoContainer , ProyectosFilter, ProyectosSort , BuscadorProyectos} from '../../../components/Bancodeproyectos'; 
import useProjectFilter from '../../../hooks/useProjectFilter'; 
import useApiProjects from "../../../hooks/useApiProjects";

  const BancoProyectos = () => {

    const {selectedRegion, projectRegions, filteredComunas, isLoading, hasError, handleRegionChange }= useProjectFilter(); 

    const { dataProject, loadingProject, errorProject } = useApiProjects();


    if (loadingProject || isLoading)
    {
      return <div>CARGANDO DATOS...</div>
    }
    if (errorProject|| hasError)
    {
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
          <ProyectosFilter  
          selectedRegion={selectedRegion}
          projectRegions={projectRegions}
          filteredComunas={filteredComunas}
          handleRegionChange={handleRegionChange}/>
          <div className="ml-md-5">
            <div className="d-flex justify-content-end mb-1">
              <ProyectosSort/>
            </div>
            <ProyectoContainer data={dataProject}/>
          </div>
        </div>
        
      </div>
    );
  };
  export default BancoProyectos;

