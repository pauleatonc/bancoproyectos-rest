
const SortProyectos = ({ setOrder }) => {
  const handleOrderChange = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    console.log(e.target.value)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
};


  return (
    <form onSubmit={handleSubmit}>
        <select className="selector text-underline mt-3 mt-lg-0" onChange={handleOrderChange}>
            <option value="-year">Ordenado: Más reciente</option>
            <option value="year">Ordenado: Menos reciente</option>
        </select>
    </form>
  );
};

export default SortProyectos;