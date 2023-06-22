import BuscadorProyectos from "../../../components/Bancodeproyectos/proyectosBuscador";
import FiltroProyectos from "../../../components/Bancodeproyectos/proyectosFilter";
import SortProyectos from "../../../components/Bancodeproyectos/proyectosSort";
import "../../styles/Bancodeproyectos/bancodeproyectos.css";

const BancoProyectos = () => {
    return (
      <>
        <BuscadorProyectos />
        <FiltroProyectos />
        <SortProyectos />
      </>
    );
  };
  
  export default BancoProyectos;
