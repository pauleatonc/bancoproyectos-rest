import BuscadorProyectos from "../../../components/Commons/buscadorproyectos";
import FiltroProyectos from "../../../components/Bancodeproyectos/proyectosFilter";
import SortProyectos from "../../../components/Bancodeproyectos/proyectosSort";
import ProyectosContainer from "../../../components/Bancodeproyectos/proyectosContainer";

const BancoProyectos = () => {
    return (
      <>
        <BuscadorProyectos />
        <div className="container">
          <FiltroProyectos />
          <SortProyectos />
          <ProyectosContainer />
        </div>
        
      </>
    );
  };
  
  export default BancoProyectos;
