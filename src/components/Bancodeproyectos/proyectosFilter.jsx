import { useEffect, useState, useCallback , useRef} from 'react';
import Dropdown from './DropdowSelect';
import useFilterOptions from '../../hooks/useFilterProjects';
import { useContext } from 'react';
import { ApiContext } from '../../context/ProjectContext';
const FiltroProyectos = () =>
{
  // Obtener datos del hook personalizado
  const { years, programs, types, regiones } = useFilterOptions();
  const { setSelectedFilters, updateProjects, selectedFilters } = useContext(ApiContext);
  const clearFilterCalled = useRef(false);

  // Estados para almacenar las selecciones del usuario
  const [ selectedPrograms, setSelectedPrograms ] = useState(() =>
  {
    return JSON.parse(localStorage.getItem('selectedPrograms') || '[]');
  });

  const [ selectedRegiones, setSelectedRegiones ] = useState(() =>
  {
    return JSON.parse(localStorage.getItem('selectedRegiones') || '[]');
  });

  const [ selectedComunas, setSelectedComunas ] = useState(() =>
  {
    return JSON.parse(localStorage.getItem('selectedComunas') || '[]');
  });

  const [ selectedTypes, setSelectedTypes ] = useState(() =>
  {
    return JSON.parse(localStorage.getItem('selectedTypes') || '[]');
  });

  const [ selectedYears, setSelectedYears ] = useState(() =>
  {
    return JSON.parse(localStorage.getItem('selectedYears') || '[]');
  });

  const [ filteredComunas, setFilteredComunas ] = useState(regiones);



  // Manejador de cambios generico
  const handleFilterChange = useCallback((setter) => (e) =>
  {
    const value = e.target.value;
    setter((prevSelected) =>
    {
      const isSelected = e.target.checked;
      if (isSelected)
      {
        if (!prevSelected.includes(value))
        {
          return [ ...prevSelected, value ];
        }
      } else
      {
        return prevSelected.filter(item => item !== value);
      }
      return prevSelected;
    });
  }, []);

  const createToggleFunction = useCallback((setter) => (id) =>
  {
    setter((prevSelected) =>
    {
      if (prevSelected.includes(id))
      {
        // Filtra el valor si ya está presente
        return prevSelected.filter(existingId => existingId !== id);
      } else
      {
        // Agrega el valor si no está presente
        return [ ...prevSelected, id ];
      }
    });
  }, []);

  const toggleProgram = createToggleFunction(setSelectedPrograms);
  const toggleType = createToggleFunction(setSelectedTypes);



  // Manejadores de cambios específicos
  const handleRegionChange = handleFilterChange(setSelectedRegiones);
  const handleYearChange = handleFilterChange(setSelectedYears);
  const handleComunaChange = handleFilterChange(setSelectedComunas);


  // Actualizar comunas basadas en la región seleccionada
  useEffect(() =>
  {
    if (!selectedRegiones.length)
    {
      setFilteredComunas(regiones);
      return;
    }
    const relatedRegiones = regiones.filter(region => selectedRegiones.includes(region.id.toString()));
    setFilteredComunas(relatedRegiones);
  }, [ selectedRegiones, regiones ]);

  const areObjectsEqual = (obj1, obj2) =>
  {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1)
    {
      if (obj1[ key ] !== obj2[ key ]) return false;
    }

    return true;
  };

  const updateFilterProjects = useCallback(() => {
    const newFilters = {
      program__in: selectedPrograms,
      comuna__region__in: selectedRegiones,
      comuna__in: selectedComunas,
      type__in: selectedTypes,
      year__in: selectedYears,
    };

    if (!areObjectsEqual(newFilters, selectedFilters)) {
      setSelectedFilters(newFilters);
    }

    if (Object.values(newFilters).some(arr => arr.length > 0)) {
      updateProjects();
    }
  }, [selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears, selectedFilters, setSelectedFilters, updateProjects]);

  useEffect(() =>
  {
    updateFilterProjects();
  }, [ selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears, updateFilterProjects ]);


  useEffect(() => {
    if (clearFilterCalled.current) {

        clearFilterCalled.current = false;
        return;
    }
    
    if (selectedFilters.program__in && selectedFilters.program__in.length > 0) {
        setSelectedPrograms(selectedFilters.program__in);
    }
}, [selectedFilters]);


  useEffect(() => {
    localStorage.setItem('selectedPrograms', JSON.stringify(selectedPrograms));
    localStorage.setItem('selectedRegiones', JSON.stringify(selectedRegiones));
    localStorage.setItem('selectedComunas', JSON.stringify(selectedComunas));
    localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
    localStorage.setItem('selectedYears', JSON.stringify(selectedYears));
  }, [selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears]);


  const handleClearFilter = () =>
  {
    setSelectedRegiones([]);
    setSelectedComunas([]);
    setSelectedYears([]);
    setSelectedPrograms([]);
    setSelectedTypes([]);
    setFilteredComunas(regiones);
    setSelectedFilters({});
    clearFilterCalled.current = true;

    // Limpia el localStorage
    localStorage.removeItem('selectedPrograms');
    localStorage.removeItem('selectedRegiones');
    localStorage.removeItem('selectedComunas');
    localStorage.removeItem('selectedTypes');
    localStorage.removeItem('selectedYears');
  };

  const handleClearLocation = () =>
  {
    setSelectedRegiones([]);
    setSelectedComunas([]);
  };

  const handleClearTypes = () =>
  {
    setSelectedTypes([]);
  };


  return (

    <div className="mb-md-3" id="filter-container">
      <div className="container d-flex justify-content-between my-3 p-0">
        <h2 className="text-sans-h3 me-2">Filtrar</h2>
        <button className="text-sans-p btn-limpiar p-2" onClick={handleClearFilter} >
          Limpiar filtro <i className="material-symbols-outlined">
            delete
          </i>
        </button>
      </div>

      {/* programa buttons */}
      <h3 className="text-sans-p">¿En qué programa está el proyecto que buscas?</h3>
      <p className="text-sans-h5">Puedes elegir más de uno.</p>

      <div className="container d-flex justify-content-around">

        {programs.map(program => (
          <div tabIndex="0" className="container-btnCircle px-4 col-5 d-flex flex-column mx-2 align-items-center" key={program.id}>
            <button
              className={`categorias-circle btn rounded-circle border-2 d-flex align-items-center justify-content-center my-2 ${selectedPrograms.includes(program.id) ? 'btn-primary' : 'btn-outline-primary white-text'
                }`}
              onClick={() => toggleProgram(program.id)}
            >
              <img src={program.icon_program} alt={program.sigla} id='btnIcon' className={selectedPrograms.includes(program.id) ? 'white-icon' : ''} />
            </button>
            <p className="text-sans-h5-bold text-center">{program.name}</p>
          </div>

        ))}
      </div>

      <hr className="col-11 my-4" />

      {/* Region select */}
      <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <h3 className="text-sans-p me-1">¿En qué región?</h3>
          <button role="button" className="btn-limpiar" onClick={handleClearLocation} >
            Borrar <i className="material-symbols-outlined">
              delete
            </i>
          </button>
        </div>
        <Dropdown
          tabIndex="0"
          items={regiones}
          selectedItems={selectedRegiones}
          onItemChange={handleRegionChange}
          singleItemName="regiones"
        />

        {/* Comuna select */}
        <h3 className="text-sans-p px-1 mt-4">¿En qué comuna?</h3>

        <Dropdown
          tabIndex="0"
          items={filteredComunas}
          selectedItems={selectedComunas}
          onItemChange={handleComunaChange}
          singleItemName="comunas"
          isComuna={true}
        />
        <div className="row my-4 d-flex align-items-center">
          <div className="col-2 info-circle pb-3"><i className="material-symbols-outlined" >
            info
          </i></div>
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
          {types.map(type => (
            <div tabIndex="0" className="container-btnCircle px-4 col-5 d-flex flex-column mx-2 align-items-center" key={type.id}>
              <button type="checkbox" id='btn-icon'
                className={`categorias-circle btn rounded-circle border-2 d-flex align-items-center justify-content-center my-2 ${selectedTypes.includes(type.id) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                key={type.id}
                onClick={() => toggleType(type.id)}>
                <i className="material-symbols-rounded">{type.icon_type}</i>
              </button>
              <p className="text-sans-h5-bold text-center">{type.name}</p>
            </div>

          ))}
        </div>
      </div>
      <div className="container filter-line mt-2"></div>
      {/* año select */}
      <div className='my-4'>
        <h3 className="text-sans-p px-1 ">¿Qué años de construcción quieres ver?</h3>
        <Dropdown
          tabIndex="0"
          items={years}
          selectedItems={selectedYears}
          singleItemName="años" 
          onItemChange={handleYearChange}
        />
      </div>
    </div>
  );
};

export default FiltroProyectos; 