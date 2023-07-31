import "../../../static/styles/bancodeproyectos.css";
import BuscadorProyectos from "../../../components/Commons/buscadorproyectos";
import FiltroProyectos from "../../../components/Bancodeproyectos/proyectosFilter";
import SortProyectos from "../../../components/Bancodeproyectos/proyectosSort";
import ProyectosContainer from "../../../components/Bancodeproyectos/proyectosContainer";

const BancoProyectos = () => {
    return (
      <div className="">

        <nav className="container" aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-style">
            <li className="breadcrumb-item"><a href="/" >Inicio</a></li>
            <li className="breadcrumb-item active" aria-current="page">Banco de Proyectos</li>
          </ol>
        </nav>

        <BuscadorProyectos />
        <div className="container d-flex flex-column flex-md-row">
          <FiltroProyectos />
          <div className="ml-md-5">
            <div className="d-flex justify-content-end mb-1">
              <SortProyectos />
            </div>
            <ProyectosContainer />
          </div>
        </div>
        
      </div>
    );
  };
  
  export default BancoProyectos;
