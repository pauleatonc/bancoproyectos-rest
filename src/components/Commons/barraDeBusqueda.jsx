import { useState, useEffect } from 'react';

const Buscador = ({ searchTerm, onSearch, isSearching, setIsSearching, placeholder }) => {
  const [ searchInput, setSearchInput ] = useState(searchTerm);

  useEffect(() => {
    setIsSearching(!!searchTerm); 
  }, [ searchTerm, setIsSearching ]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== '')
    {
      onSearch(searchInput);
    }
  };

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
