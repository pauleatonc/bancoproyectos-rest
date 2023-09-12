import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '../../../context/ProjectContext';
import
{
  ProyectoContainer,
  ProyectosFilter,
  ProyectosSort,
  BuscadorProyectos
} from '../../../components/Bancodeproyectos';

const BancoProyectos = () =>
{
  const {
    listProjects,
    searchTerm,
    setSearchTerm,
    filterParams,
    setFilterParams,
    sortOrder,
    handleSortChange,
    projects,
    selectedFilters,
    updateProjects
  } = useContext(ApiContext);

  const [ isSearching, setIsSearching ] = useState(false);

  useEffect(() =>
  {
    updateProjects();
  }, [ selectedFilters, updateProjects ]);

  useEffect(() =>
  {
    listProjects(searchTerm, filterParams, sortOrder);
  }, [ searchTerm, filterParams, sortOrder, listProjects ]);




  return (
    <div className="container col-md-10">
      <nav className="container" aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-style">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Banco de Proyectos</li>
        </ol>
      </nav>
      <BuscadorProyectos
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        onSearch={(newSearchTerm) =>
        {
          setSearchTerm(newSearchTerm);
        }}
      />
      <div className="row">
        <div className="col col-md-4">
          <ProyectosFilter filterParams={filterParams} setFilterParams={setFilterParams} selectedFilters={selectedFilters} />
        </div>
        <div className="col col-md-8">
          <div className="d-flex justify-content-end mb-1">
            <ProyectosSort sortOrder={sortOrder} onSortChange={handleSortChange} />
          </div>
          {
            projects && projects.length > 0 ? (
              <ProyectoContainer data={projects} />
            ) : (
              <div className="alerta d-flex justify-content-center mt-4 " id='icon-alert'>
                <i className="material-symbols-outlined">
                  info
                </i>
                <p className="text-alert fs-5 text-left mx-2 my-auto align-self-center">
                  No encontramos proyectos con los filtros que elegiste. Intenta con otros distintos.
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default BancoProyectos;
