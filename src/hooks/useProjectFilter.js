import { useState } from 'react';
import useApiProjectsList from './useApiProjectsList';
import { useApiRegionComuna } from './useApiRegionComuna';

const useProjectFilter = () =>
{
  const { data: projectData, loading: projectLoading, error: projectError } = useApiProjectsList();
  const { data: regionComunaData, loading: regionComunaLoading, error: regionComunaError } = useApiRegionComuna();
  const [ selectedRegion, setSelectedRegion ] = useState(null);
  const [ filteredComunas, setFilteredComunas ] = useState([]);

  const isLoading = projectLoading || regionComunaLoading;
  const hasError = projectError || regionComunaError;

  const projectRegions = projectData ? [ ...new Set(projectData.map(project => project.region)) ] : [];

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;

    if (selectedRegion !== '') {
      setSelectedRegion((prevSelectedRegion) => {
        if (selectedRegion !== prevSelectedRegion) {
          const selectedRegionData = regionComunaData.find(item => item.region === selectedRegion);
  
          if (selectedRegionData) {
            const filteredComunas = selectedRegionData.comunas;
            setFilteredComunas(filteredComunas);
          } else {
            setFilteredComunas([]);
          }
        }
  
        return selectedRegion;
      });
    } else {
      setSelectedRegion(null);
      setFilteredComunas([]);
    }
  };

  return {
    selectedRegion,
    projectRegions,
    filteredComunas,
    isLoading,
    hasError,
    handleRegionChange,
  };
};

export default useProjectFilter;
