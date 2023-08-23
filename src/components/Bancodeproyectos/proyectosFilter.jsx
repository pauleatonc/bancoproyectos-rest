import React, { useState } from 'react';
import useApiFilter from "../../hooks/useApiFilter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import apiProjects from '../../services/project/projects.api';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';



const FiltroProyectos = (props) => {
  const { dataFilter, loading, error } = useApiFilter();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  

  if (loading) {
    return  <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleClearFilter = () => {
    setSelectedRegion('');
    setSelectedComuna('');
    setSelectedYear('');
    // También debes resetear cualquier otro estado relacionado con los filtros aquí

    fetchAllProjects();
  };

  const fetchAllProjects = async () => {
    try {
        const response = await apiProjects.get('v1/');

        if (response.status === 200) {
            const allProjects = response.data;
            props.onFilter(allProjects); // Pasar todos los proyectos a BancoProyectos
        }
    } catch (error) {
        console.error('Error al obtener todos los proyectos:', error);
    }
  };

  const handleSubmit = async () => {
    const queryParams = new URLSearchParams({
        region: selectedRegion,
        comuna: selectedComuna,
        year: selectedYear,
        // ... añadir otros filtros
    });

    try {
        const endpoint = '/?' + queryParams.toString(); 
        const response = await apiProjects.get(endpoint);

        if (response.status === 200) {
            const filteredProjects = response.data;
            props.onFilter(filteredProjects); // Pasar los proyectos filtrados a BancoProyectos
        }
    } catch (error) {
        console.error('Error al filtrar proyectos:', error);
    }
  };

  return (

    <div className="mb-md-4" id="filter-container">
      <div className="container d-flex justify-content-between my-3 p-0">
        <p className="text-sans-h3 me-2">Filtrar</p>
        <button className="text-sans-p btn-limpiar p-2" onClick={handleClearFilter}>
          Limpiar filtro <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>

      {/* programa select */}
      <h3 className="text-sans-p">¿En qué programa está el proyecto que buscas?</h3>
      <p className="text-sans-h5">Puedes elegir más de uno.</p>

      <div className="container d-flex justify-content-around mx-0 p-0">
        {dataFilter.programs.map((programa) => (
          <div className="col-md-2 d-flex flex-column align-items-center mr-5" key={programa.id}>
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <span className="categorias-siglas font-weight-bold">{programa.sigla}</span>
            </div>
            <p className="text-sans-h5-bold text-center">{programa.name}</p>
          </div>
        ))}
      </div>

      <hr className="col-11 my-4"/>

      {/* Region select */}
      <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <h3 className="text-sans-p me-1">¿En qué región?</h3>
          <button className="btn-limpiar" >
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <select className="container selectores mb-4 text-underline text-muted" 
        onChange={(e) => setSelectedRegion(e.target.value)}
        value={selectedRegion}>
          <option className="" value=''>Elige una o más regiones</option>
          {/* Map over the regionComunas state to create options */}
          {dataFilter.regiones.map((region) => (
            <option key={region.id} value={region.region}>
              {region.region}
            </option>
          ))}
        </select>

        {/* Comuna select */}
        <h3 className="text-sans-p px-1">¿En qué comuna?</h3>
        <select className="container selectores text-underline text-muted"
        onChange={(e) => setSelectedComuna(e.target.value)}
        value={selectedComuna}>
          <option className="" value=''>Elige una o más comunas</option>
          {/* Map over the selectedComunas state to create options */}
          {dataFilter.regiones.map((region) => (
            <option key={region.id} value={region.region}>
              {region.region}
            </option>
          ))}
        </select>
        <div className="row my-4 d-flex align-items-center">
          <div className="col-2 info-circle pb-3"><FontAwesomeIcon icon={faCircleInfo} /></div>
          <p className="col-10 text-sans-h5-blue">Solo encontrarás las regiones y comunas que tengan proyectos en este banco. </p>
        </div>
      </div>

      {/* tipo select */}
      <div className="container filter-line my-3"></div>
      <hr className="col-11 my-4"/>

      <div>
        <div className="container d-flex justify-content-between align-items-start px-1 mb-3">
          <h3 className="text-sans-p">¿Qué tipo de proyecto es?</h3>
          <button className="btn-limpiar">
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <div className="d-flex flex-wrap">
          {dataFilter.types.map((tipo) => (
            <div className="col-5 d-flex flex-column mx-2 align-items-center" key={tipo.id}>
              <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                <i class="material-symbols-rounded mx-2">{ tipo.icon_type }</i>
              </div>
              <p className="text-sans-h5-bold text-center">{tipo.name}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="col-11 my-4"/>

      {/* año select */}
      <h3 className="text-sans-p px-1">¿Qué años de construcción quieres ver?</h3>
        <select className="container selectores text-underline text-muted"
        onChange={(e) => setSelectedYear(e.target.value)}
        value={selectedYear}>
          <option className="" value=''>Elige el año</option>
          {/* Map over the selectedComunas state to create options */}
          {dataFilter.years.map((year) => (
            <option key={year.id} value={year.number}>
              {year.number}
            </option>
          ))}
        </select>

      <div className="d-flex justify-content-center">
        <button className="btn-principal-l mb-4" onClick={handleSubmit}>Mostrar resultados</button>
      </div>

    </div>
  );
};

export default FiltroProyectos;