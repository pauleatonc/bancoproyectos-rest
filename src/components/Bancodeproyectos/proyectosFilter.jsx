import { useState, useEffect, useCallback } from 'react';
import useApiProjectsList from '../../hooks/useApiProjectsList';
import '../../static/styles/proyectosFilter.css';
import '../../static/styles/bancodeproyectos.css';
import Dropdown from './DropdowSelect';

const FiltroProyectos = ({ dataFilter, onFilter }) =>
{
  const { fetchProjects, dataProject, errorProject } = useApiProjectsList();
  const [ selectedPrograms, setSelectedPrograms ] = useState([]);
  const [ selectedRegions, setSelectedRegions ] = useState([]);
  const [ selectedComunas, setSelectedComunas ] = useState([]);
  const [ selectedTypes, setSelectedTypes ] = useState([]);
  const [ selectedYears, setSelectedYears ] = useState([]);
  const [ filteredComunas, setFilteredComunas ] = useState([]);


  const handleFilterChange = (setter) => (e) =>
  {
    const value = e.target.value;
    setter(prevSelected =>
      e.target.checked ?
        [ ...prevSelected, value ] :
        prevSelected.filter(item => item !== value)
    );
  };

  const handleRegionChange = handleFilterChange(setSelectedRegions);
  const handleComunaChange = handleFilterChange(setSelectedComunas);
  const handleYearChange = handleFilterChange(setSelectedYears);


  useEffect(() =>
  {
    if (!selectedRegions.length)
    {
      setFilteredComunas(dataFilter.regiones);
      return;
    }
    const relatedRegions = dataFilter.regiones.filter(region => selectedRegions.includes(region.id.toString()));
    setFilteredComunas(relatedRegions);
  }, [ selectedRegions, dataFilter ]);

  const updateProjects = useCallback(() =>
  {
    const filters = {
      program__in: selectedPrograms,
      comuna__region__in: selectedRegions,
      comuna__in: selectedComunas,
      type__in: selectedTypes,
      year__in: selectedYears
    };

    const queryParams = new URLSearchParams();
    for (let key in filters)
    {
      if (filters[ key ].length)
      {
        queryParams.append(key, filters[ key ].join(','));
      }
    }

    const endpoint = '/?' + queryParams.toString();
    fetchProjects(endpoint);
  }, [ selectedPrograms, selectedRegions, selectedComunas, selectedTypes, selectedYears, fetchProjects ]);


  useEffect(() =>
  {
    updateProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedPrograms, selectedRegions, selectedComunas, selectedTypes, selectedYears ]);

  useEffect(() =>
  {
    if (dataProject && dataProject.length > 0)
    {
      onFilter(dataProject);
    }

    if (errorProject)
    {
      console.error('Error al filtrar proyectos:', errorProject);
    }
  }, [ dataProject, errorProject, onFilter ]);



  const handleClearFilter = () =>
  {
    setSelectedRegions([]);
    setSelectedComunas([]);
    setSelectedYears([]);
    setSelectedPrograms([]);
    setSelectedTypes([]);
    const allComunas = dataFilter.regiones.flatMap(region => region.comunas);
    setFilteredComunas(allComunas);
    fetchProjects();
  };

  const handleClearLocation = () =>
  {
    setSelectedRegions([]);
    setSelectedComunas([]);
  };

  const handleClearTypes = () =>
  {
    setSelectedTypes([]);
  };


  const toggleProgram = (programId) =>
  {
    setSelectedPrograms(prevSelected =>
      prevSelected.includes(programId) ?
        prevSelected.filter(id => id !== programId) :
        [ ...prevSelected, programId ]
    );
  };

  const toggleType = (typeId) =>
  {
    setSelectedTypes(prevSelected =>
      prevSelected.includes(typeId) ?
        prevSelected.filter(id => id !== typeId) :
        [ ...prevSelected, typeId ]
    );
  };

  useEffect(() =>
  {
    if (dataProject && dataProject.length > 0)
    {
      onFilter(dataProject);
    }

    if (errorProject)
    {
      console.error('Error al filtrar proyectos:', errorProject);
    }
  }, [ dataProject, errorProject, onFilter ]);

  console.log("Proyectos filtrados:", dataProject);


  return (

    <div className="mb-md-3" id="filter-container">
      <div className="container d-flex justify-content-between my-3 p-0">
        <p className="text-sans-h3 me-2">Filtrar</p>
        <button className="text-sans-p btn-limpiar p-2" onClick={handleClearFilter}>
          Limpiar filtro <i className="material-symbols-outlined">
            delete
          </i>
        </button>
      </div>

      {/* programa buttons */}
      <h3 className="text-sans-p">¿En qué programa está el proyecto que buscas?</h3>
      <p className="text-sans-h5">Puedes elegir más de uno.</p>

      <div className="container d-flex justify-content-around mx-0 p-0">
        {dataFilter.programs.map((programa) => (
          <div className=" container-btnCircle col-md-2 d-flex flex-column align-items-center mr-5" key={programa.id}>
            <a type="checkbox" id='btn-icon'
              className={`categorias-circle d-inline-flex focus-ring py-1 px-2 rounded-2 btn  rounded-circle border-2 d-flex align-items-center justify-content-center my-3 ${selectedPrograms.includes(programa.id) ? 'btn-primary' : 'btn-outline-primary'
                }`}
              onClick={() => toggleProgram(programa.id)}>
              <img src={programa.icon_program} alt={programa.sigla} id='btnIcon' className={selectedPrograms.includes(programa.id) ? 'white-icon' : ''} />
            </a>
            <p className="text-sans-h5-bold text-center">{programa.name}</p>
          </div>

        ))}
      </div>

      <hr className="col-11 my-4" />

      {/* Region select */}
      <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <h3 className="text-sans-p me-1">¿En qué región?</h3>
          <button className="btn-limpiar" onClick={handleClearLocation} >
            Borrar <i className="material-symbols-outlined">
              delete
            </i>
          </button>
        </div>
        <Dropdown
          items={dataFilter.regiones}
          selectedItems={selectedRegions}
          onItemChange={handleRegionChange}
          singleItemName="regiones"
        />


        {/* Comuna select */}
        <h3 className="text-sans-p px-1 mt-4">¿En qué comuna?</h3>

          <Dropdown 
          items={filteredComunas}
          selectedItems={selectedComunas}
          onItemChange={handleComunaChange}
          singleItemName="comunas"
          isComuna={true}
          />
        <div className="row my-4 d-flex align-items-center">
          <div className="col-2 info-circle pb-3"><span className="material-symbols-outlined" >
            info
          </span></div>
          <p className="col-10 text-sans-h5-blue">Solo encontrarás las regiones y comunas que tengan proyectos en este banco. </p>
        </div>
      </div>


      <div className="container filter-line my-3"></div>
      <div>
        <div className="container d-flex justify-content-between align-items-start px-1 mb-3">
          <h3 className="text-sans-p">¿Qué tipo de proyecto es?</h3>
          <button className="btn-limpiar" onClick={handleClearTypes}>
            Borrar <i className="material-symbols-outlined">
              delete
            </i>
          </button>
        </div>

        <div className="d-flex flex-wrap">
          {dataFilter.types.map((tipo) => (
            <div className=" container-btnCircle px-4 col-5 d-flex flex-column mx-2 align-items-center" key={tipo.id}>
              <a type="checkbox" id='btn-icon'
                className={`categorias-circle btn rounded-circle border-2 d-flex align-items-center justify-content-center my-2 ${selectedTypes.includes(tipo.id) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                key={tipo.id}
                onClick={() => toggleType(tipo.id)}>
                <i className="material-symbols-rounded">{tipo.icon_type}</i>
              </a>
              <p className="text-sans-h5-bold text-center">{tipo.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container filter-line mt-2"></div>
      {/* año select */}
      <div className='my-4'>
        <h3 className="text-sans-p px-1 ">¿Qué años de construcción quieres ver?</h3>
        <Dropdown
          items={dataFilter.years}
          selectedItems={selectedYears}
          onItemChange={handleYearChange}
          singleItemName="años"
        />
      </div>
    </div>
  );
};

export default FiltroProyectos; 