import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
//import Select from 'react-select';

import { getAllRegionComunas } from '../../api/RegionComuna/regioncomuna.api';


const FiltroProyectos = () => {

  const [regionComunas, setRegionComunas] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedComunas, setSelectedComunas] = useState([]);

  useEffect(() => {
    async function loadRegionComuna() {
      const response = await getAllRegionComunas();
      setRegionComunas(response.data);
    }
    loadRegionComuna();
  }, []);

  // Function to handle region selection
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setSelectedRegion(selectedRegion);
    // Find the selected region object from the API data
    const selectedRegionData = regionComunas.find((data) => data.region === selectedRegion);
    if (selectedRegionData) {
      // Set the selected comunas for the selected region
      setSelectedComunas(selectedRegionData.comunas);
    } else {
      setSelectedComunas([]); // If no region is selected or comunas are available, reset the selected comunas
    }
  };

  // Function to handle clearing the selected region
  const handleClearRegion = () => {
    setSelectedRegion(''); // Reset the selected region to empty string
    setSelectedComunas([]); // Reset the selected comunas to an empty array
  };

    return (

      <div className="mb-md-4" id="filter-container">
        <div className="container d-flex justify-content-between my-3 p-0">
          <p className="text-sans-h3">Filtrar</p>
          <button className="text-sans-p btn-limpiar p-2">
            Limpiar filtro <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <p className="text-sans-p">¿En qué programa está el proyecto que buscas?</p>
        <p className="text-sans-h5">Puedes elegir más de uno.</p>

        <div className="container d-flex justify-content-around mx-0 p-0">
          <div className="col-md-2 d-flex flex-column align-items-center mr-5">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <span className="categorias-siglas font-weight-bold">PMU</span>
            </div>
            <p className="text-sans-h5-bold text-center">Programa Mejoramiento Urbano</p>
          </div>
          <div className="col-md-2 d-flex flex-column  align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <span className="categorias-siglas font-weight-bold">PMB</span>
            </div>
            <p className="text-sans-h5-bold text-center">Programa Mejoramiento de Barrios</p>
          </div>
        </div>

        <div className="container filter-line"></div>

        {/* Region select */}
        <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <p className="text-sans-p me-1">¿En qué región?</p>
          <button className="btn-limpiar" onClick={handleClearRegion}>
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <select className="container selectores mb-4 text-underline text-muted" onChange={handleRegionChange} value={selectedRegion}>
        <option className="" value=''>Elige una o más regiones</option>
        {/* Map over the regionComunas state to create options */}
        {regionComunas.map((data, index) => (
          <option key={index} value={data.region}>
            {data.region}
          </option>
        ))}
      </select>

      {/* Comuna select */}
      <p className="text-sans-p px-1">¿En qué comuna?</p>
      <select className="container selectores text-underline text-muted">
        <option value=''>Elige una o más comunas</option>
        {/* Map over the selectedComunas state to create options */}
        {selectedComunas.map((comuna, index) => (
          <option key={index} value={comuna.comuna}>
            {comuna.comuna}
          </option>
        ))}
      </select>

      </div>

      <div className="container filter-line my-3"></div>

      <div>
        <div className="container d-flex justify-content-between align-items-start px-1 mb-3">
          <p>¿Qué tipo de proyecto es?</p>
          <button className="btn-limpiar">
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <div className="d-flex flex-wrap">
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Plazas y Áreas Verdes</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Infraestructura Deportiva</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Centros de Salud</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Luminarias</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Reciclaje</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Energía</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
            </div>
            <p className="text-sans-h5-bold text-center">Desarrollo Técnológico</p>
          </div>
        </div>
      </div>

      <div className="container filter-line"></div>

      <p className="text-sans-p mt-3 px-1">¿Qué años de construcción quieres ver?</p>
      <div className="mb-4">
        <input className="mx-2" type="checkbox" />
        <label>2019</label> <br />
        <input className="mx-2" type="checkbox" />
        <label>2020</label> <br />
        <input className="mx-2" type="checkbox" />
        <label>2021</label>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn-principal-l mb-4">Mostrar resultados</button>
      </div>

    </div>
  );
};

export default FiltroProyectos;