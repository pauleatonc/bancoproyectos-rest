import BuscadorProyectos from "../../../components/Commons/buscadorproyectos";
import FiltroProyectos from "../../../components/Bancodeproyectos/proyectosFilter";
import SortProyectos from "../../../components/Bancodeproyectos/proyectosSort";
import ProyectosContainer from "../../../components/Bancodeproyectos/proyectosContainer";

const BancoProyectos = () => {
    return (
      <div className="">
        <BuscadorProyectos />
        <div className="container d-flex flex-column flex-md-row">
          <FiltroProyectos />
          <div className="ml-md-5">
            <div className="d-flex justify-content-end mb-4">
              <SortProyectos />
            </div>
            <ProyectosContainer />
          </div>
        </div>
        
      </div>
    );
  };
  
  export default BancoProyectos;
