import React, { useState } from 'react';
import useProjectSearch from '../../hooks/useProjectSearch';

const BuscadorProyectos = ( onSearch ) => {
  const { searchResults, loadingSearch, errorSearch, searchProjects } = useProjectSearch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProjects(searchQuery).then(results => {
      if (typeof onSearch === 'function') {
        onSearch(results);
      } else {
        console.error('onSearch is not a function', onSearch);
      }
    });
  };

  return (
    <div className="container col-md-4 d-flex flex-column my-md-4">
        <p className="text-sans-p text-center my-4">Accede al buscador de proyectos escribiendo palabras clave</p>
        <form className="search mx-auto col my-3 my-md-4" onSubmit={handleSubmit}>
            <input 
            className="form-control" 
            type="text" 
            name="search" 
            placeholder="Texto demo" 
            aria-label="Texto demo" 
            aria-describedby="searchAction"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-action">
                <button className="btn btn-outline-search" id="searchAction" type="submit"><i className="icon cl cl-search"></i></button>
            </div>
        </form>
        {loadingSearch && <p>Loading...</p>}
        {errorSearch && <p>Error: {errorSearch.message}</p>}
        {searchResults.length > 0 && (
          <div>
            <p>{searchResults.length} resultado(s) encontrado(s):</p>
          </div>
        )}
    </div>
  );
};

export default BuscadorProyectos;
