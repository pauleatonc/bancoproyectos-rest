import "../../static/styles/proyectosSort.css"

const SortProyectos = () => {
    return (
      <select className="selector text-underline mt-3 mt-lg-0">
        <option value="">Ordenado: Más reciente</option>
        <option value="desc">Ordenado: Menos reciente</option>
      </select>
    );
  };
  
  export default SortProyectos;