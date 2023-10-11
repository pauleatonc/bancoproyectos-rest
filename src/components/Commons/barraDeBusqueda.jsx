import { useState, useEffect } from 'react';

const Buscador = ({ searchTerm, onSearch, isSearching, setIsSearching, placeholder }) => {
  // Estado local para almacenar el termino de busuqeda ingresado.
  const [ searchInput, setSearchInput ] = useState(searchTerm);

  // Detecta cambios en searchTerm y actualiza el estado acorde a ellos.
  useEffect(() => {
    setIsSearching(!!searchTerm); 
  }, [ searchTerm, setIsSearching ]);

  // Maneja cambios en el input de busqueda y actualiza el estado searchInput.
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Maneja evento de busqueda, llamando a la funcion onSearch con el termino de busuqeda actual.
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '')
    {
      onSearch(searchInput);
    }
    console.log("activamos el handle search desde componente buscador")
  };

  // Maneja evento de limpiar busqueda, reestablece estado de searchInput y llama a onSearch con un string vacio.
  const handleClearSearch = () => {
    setSearchInput('');
    onSearch('');
  };

  return (
      <div className="search-bar input-group border border-2 d-flex" >
        <input
          className="form-control border-0 input-search"
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder= {placeholder}
        />
        {isSearching && (
          <button className="btn border border-0 " onClick={handleClearSearch} id="icon-inputClose">
            <i className="material-symbols-outlined " >close</i>
          </button>
        )}
        <span className="input-group-append">
          <button
            className="btn border-0 "
            type="button"
            onClick={handleSearch}
            disabled={searchInput.trim() === ''} id="icon-inputSearch">
            <i className="material-symbols-outlined" >search</i>
          </button>
        </span>
      </div>
  );
};

export default Buscador;
