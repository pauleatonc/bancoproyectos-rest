import { useState, useEffect, useCallback, useRef } from 'react'
import { FiltroProyectosDesktop } from './ProyectosFilterDesktop'
import { FiltroProyectoMobile } from './ProyectoFilterMobile'
import useFilterOptions from '../../../hooks/useFilterProjects';
import { useContext } from 'react';
import { ApiContext } from '../../../context/ProjectContext';

const FiltroProyectosContainer = () => {
  const [ isMobile, setIsMobile ] = useState(window.innerWidth <=1190);
  const { years, programs, types, regiones } = useFilterOptions();
  const { setSelectedFilters, updateProjects, selectedFilters } = useContext(ApiContext);
  const clearFilterCalled = useRef(false);

  // Estados para almacenar las selecciones del usuario
  const [ selectedPrograms, setSelectedPrograms ] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedPrograms') || '[]');
  });

  const [ selectedRegiones, setSelectedRegiones ] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedRegiones') || '[]');
  });

  const [ selectedComunas, setSelectedComunas ] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedComunas') || '[]');
  });

  const [ selectedTypes, setSelectedTypes ] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedTypes') || '[]');
  });

  const [ selectedYears, setSelectedYears ] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedYears') || '[]');
  });

  const [ filteredComunas, setFilteredComunas ] = useState(regiones);

  // Manejador de cambios generico
  const handleFilterChange = useCallback((setter) => (e) => {
    const value = e.target.value;
    setter((prevSelected) => {
      const isSelected = e.target.checked;
      if (isSelected) {
        if (!prevSelected.includes(value)) {
          return [ ...prevSelected, value ];
        }
      } else {
        return prevSelected.filter(item => item !== value);
      }
      return prevSelected;
    });
  }, []);

  const createToggleFunction = useCallback((setter) => (id) => {
    setter((prevSelected) => {
      if (prevSelected.includes(id)) {
        // Filtra el valor si ya está presente
        return prevSelected.filter(existingId => existingId !== id);
      } else {
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
  useEffect(() => {
    if (!selectedRegiones.length) {
      setFilteredComunas(regiones);
      return;
    }
    const relatedRegiones = regiones.filter(region => selectedRegiones.includes(region.id.toString()));
    setFilteredComunas(relatedRegiones);
  }, [ selectedRegiones, regiones ]);

  const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
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
      setTimeout(() => {
        setSelectedFilters(newFilters);
      }, 0);
    }
  
    if (Object.values(newFilters).some(arr => arr.length > 0)) {
      setTimeout(() => {
        updateProjects();
      }, 0);
    }
  }, [selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears, selectedFilters, setSelectedFilters, updateProjects]);
  
  useEffect(() => {
    updateFilterProjects();
  }, [selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears, updateFilterProjects]);
  
  useEffect(() => {
    if (clearFilterCalled.current) {
      clearFilterCalled.current = false;
      return;
    }
  
    if (selectedFilters.program__in && selectedFilters.program__in.length > 0) {
      setSelectedPrograms(selectedFilters.program__in);
    }
  }, [selectedFilters, setSelectedPrograms]);  


  useEffect(() => {
    localStorage.setItem('selectedPrograms', JSON.stringify(selectedPrograms));
    localStorage.setItem('selectedRegiones', JSON.stringify(selectedRegiones));
    localStorage.setItem('selectedComunas', JSON.stringify(selectedComunas));
    localStorage.setItem('selectedTypes', JSON.stringify(selectedTypes));
    localStorage.setItem('selectedYears', JSON.stringify(selectedYears));
  }, [selectedPrograms, selectedRegiones, selectedComunas, selectedTypes, selectedYears]);


  const handleClearFilter = () => {
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

  const handleClearLocation = () => {
    setSelectedRegiones([]);
    setSelectedComunas([]);
  };

  const handleClearTypes = () => {
    setSelectedTypes([]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1190);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const componentProps = {
    years, programs, types, regiones,
    setSelectedFilters, updateProjects, selectedFilters,
    updateFilterProjects, filteredComunas, toggleProgram,
    toggleType, handleComunaChange, handleRegionChange, 
    handleFilterChange, handleYearChange, handleClearFilter,  handleClearLocation, handleClearTypes,
    selectedComunas,selectedRegiones, selectedYears, selectedTypes, selectedPrograms,
  };
  return isMobile ? <FiltroProyectoMobile {...componentProps} /> : <FiltroProyectosDesktop {...componentProps} />
}

export default FiltroProyectosContainer