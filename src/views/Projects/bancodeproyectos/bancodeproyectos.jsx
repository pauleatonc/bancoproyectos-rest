import BuscadorProyectos from "../../../components/Bancodeproyectos/proyectosBuscador";
import FiltroProyectos from "../../../components/Bancodeproyectos/proyectosFilter";
import SortProyectos from "../../../components/Bancodeproyectos/proyectosSort";
import ProyectosContainer from "../../../components/Bancodeproyectos/proyectosContainer";

const BancoProyectos = () => {
    return (
      <>
        <BuscadorProyectos />
        <FiltroProyectos />
        <SortProyectos />
        <ProyectosContainer />
      </>
    );
  };
  
  export default BancoProyectos;
