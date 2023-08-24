import { useState, useEffect } from 'react';
import useApiProjectsList from '../../hooks/useApiProjectsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const FiltroProyectos = ({ dataFilter, onFilter }) =>
{
  const { fetchProjects, dataProject, errorProject } = useApiProjectsList();
  const [ selectedPrograms, setSelectedPrograms ] = useState([]);
  const [ selectedRegions, setSelectedRegions ] = useState([]);
  const [ selectedComunas, setSelectedComunas ] = useState([]);
  const [ selectedTypes, setSelectedTypes ] = useState([]);
  const [ selectedYears, setSelectedYears ] = useState([]);
  const [ filteredComunas, setFilteredComunas ] = useState([]);

  useEffect(() =>
  {
    if (!selectedRegions.length)
    {
      const allComunas = dataFilter.regiones.flatMap(region => region.comunas);
      setFilteredComunas(allComunas);
      return;
    }
    const relatedRegions = dataFilter.regiones.filter(region => selectedRegions.includes(region.region));
    const relatedComunas = relatedRegions.flatMap(region => region.comunas);
    setFilteredComunas(relatedComunas);
  }, [ selectedRegions, dataFilter ]);

  const handleRegionChange = (e) =>
  {
    const selectedOptions = [ ...e.target.selectedOptions ].map(option => option.value);
    setSelectedRegions(selectedOptions);
  };

  const handleComunaChange = (e) =>
  {
    const selectedOptions = [ ...e.target.selectedOptions ].map(option => option.value);
    setSelectedComunas(selectedOptions);
  };

  const handleYearChange = (e) =>
  {
    const selectedOptions = [ ...e.target.selectedOptions ].map(option => option.value);
    setSelectedYears(selectedOptions);
  };

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
    const allComunas = dataFilter.regiones.flatMap(region => region.comunas);
    setFilteredComunas(allComunas);
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

  const handleSubmit = async () =>
  {
    if (!selectedPrograms.length && !selectedRegions.length && !selectedComunas.length && !selectedTypes.length && !selectedYears.length)
    {
      return;
    }

    const queryParams = new URLSearchParams();
    if (selectedPrograms.length) queryParams.append('program', selectedPrograms.join(','));
    if (selectedRegions.length) queryParams.append('region', selectedRegions.join(','));
    if (selectedComunas.length) queryParams.append('comuna', selectedComunas.join(','));
    if (selectedTypes.length) queryParams.append('type', selectedTypes.join(','));
    if (selectedYears.length) queryParams.append('year', selectedYears.join(','));
    const endpoint = '/?' + queryParams.toString();
    fetchProjects(endpoint);
    console.log(endpoint)
  };

  return (

    <div className="mb-md-4" id="filter-container">
      <div className="container d-flex justify-content-between my-3 p-0">
        <p className="text-sans-h3 me-2">Filtrar</p>
        <button className="text-sans-p btn-limpiar p-2" onClick={handleClearFilter}>
          Limpiar filtro <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>

      {/* programa buttons */}
      <h3 className="text-sans-p">¿En qué programa está el proyecto que buscas?</h3>
      <p className="text-sans-h5">Puedes elegir más de uno.</p>

      <div className="container d-flex justify-content-around mx-0 p-0">
        {dataFilter.programs.map((programa) => (
          <div className="col-md-2 d-flex flex-column align-items-center mr-5" key={programa.id}>
            <a type="button" id='btn-icon'
              className={`categorias-circle btn rounded-circle border-2 d-flex align-items-center justify-content-center my-3 ${selectedPrograms.includes(programa.id) ? 'btn-primary' : 'btn-outline-primary'
                }`}
              onClick={() => toggleProgram(programa.id)}>
              <img src={programa.icon_program} alt={programa.sigla} id='btnIcon' />
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
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <select multiple className="container selectores mb-4 text-underline text-muted"
          onChange={handleRegionChange}
          value={selectedRegions}>
          <option className="" value=''>Elige una o más regiones</option>
          {/* Map over the regionComunas state to create options */}
          {dataFilter.regiones.map((region) => (
            <option key={region.id} value={region.region} type='checkbox'>
              {region.region}
            </option>
          ))}
        </select>

        {/* Comuna select */}
        <h3 className="text-sans-p px-1">¿En qué comuna?</h3>
        <select multiple className="container selectores text-underline text-muted"
          onChange={handleComunaChange}
          value={selectedComunas}>
          <option className="" value=''>Elige una o más comunas</option>
          {/* Map over the selectedComunas state to create options */}
          {filteredComunas.map((comuna) => (
            <option key={comuna.id} value={comuna.comuna} type='checkbox'>
              {comuna.comuna}
            </option>
          ))}
        </select>
        <div className="row my-4 d-flex align-items-center">
          <div className="col-2 info-circle pb-3"><FontAwesomeIcon icon={faCircleInfo} /></div>
          <p className="col-10 text-sans-h5-blue">Solo encontrarás las regiones y comunas que tengan proyectos en este banco. </p>
        </div>
      </div>

      <div className="container filter-line my-3"></div>
      <hr className="col-11 my-4" />

      <div>
        <div className="container d-flex justify-content-between align-items-start px-1 mb-3">
          <h3 className="text-sans-p">¿Qué tipo de proyecto es?</h3>
          <button className="btn-limpiar" onClick={handleClearTypes}>
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <div className="d-flex flex-wrap">
          {dataFilter.types.map((tipo) => (
            <div className="col-5 d-flex flex-column mx-2 align-items-center" key={tipo.id}>
              <a type="button" id='btn-icon'
                className={`categorias-circle btn rounded-circle border-2 d-flex align-items-center justify-content-center my-3 ${selectedTypes.includes(tipo.id) ? 'btn-primary' : 'btn-outline-primary'
                  }`}
                key={tipo.id}
                onClick={() => toggleType(tipo.id)}>
                <i className="material-symbols-rounded mx-2">{tipo.icon_type}</i>
              </a>
              <p className="text-sans-h5-bold text-center">{tipo.name}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="col-11 my-4" />

      {/* año select */}
      <h3 className="text-sans-p px-1">¿Qué años de construcción quieres ver?</h3>
      <select className="form-select container selectores text-underline text-muted mb-5"
        multiple
        size='0'
        onChange={handleYearChange}
        value={selectedYears}>
        <option className="" value=''>Elige el año</option>
        {/* Map over the selectedComunas state to create options */}
        {dataFilter.years.map((year) => (
          <option key={year.id} value={year.number} type='checkbox'>
            {year.number}
          </option>
        ))}
      </select>
      <div className="d-flex justify-content-center my-3">
        <button className="btn-principal-l mb-4" onClick={handleSubmit} >Mostrar resultados</button>
      </div>

    </div>
  );
};

export default FiltroProyectos; 