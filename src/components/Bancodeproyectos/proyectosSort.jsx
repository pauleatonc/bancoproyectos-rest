import useOrdering from '../../hooks/useOrdering';

const SortProyectos = () => {
  const { setOrder } = useOrdering();

  const handleOrderChange = (e) => {
    setOrder(e.target.value);  // Establece el nuevo valor y activa la petición.
  };

  return (
    <select className="selector text-underline mt-3 mt-lg-0" onChange={handleOrderChange}>
      <option value="">Ordenado: Más reciente</option>
      <option value="desc">Ordenado: Menos reciente</option>
    </select>
  );
};

export default SortProyectos;