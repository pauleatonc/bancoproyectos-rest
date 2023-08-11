import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


const FiltroProyectos = ({ selectedRegion, projectRegions, filteredComunas, handleRegionChange }) =>
{
  return (

    <div className="mb-md-4" id="filter-container">
      <div className="container d-flex justify-content-between my-3 p-0">
        <p className="text-sans-h3 me-2">Filtrar</p>
        <button className="text-sans-p btn-limpiar p-2">
          Limpiar filtro <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>

      <h3 className="text-sans-p">¿En qué programa está el proyecto que buscas?</h3>
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

      <hr className="col-11 my-4"/>

      {/* Region select */}
      <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <h3 className="text-sans-p me-1">¿En qué región?</h3>
          <button className="btn-limpiar" onClick={handleRegionChange}>
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <select className="container selectores mb-4 text-underline text-muted" 
        onChange={handleRegionChange} 
        value={selectedRegion}>
          <option className="" value=''>Elige una o más regiones</option>
          {/* Map over the regionComunas state to create options */}
          {projectRegions.map((region) => (
            <option key={region.id} value={region.region}>
              {region.region}
            </option>
          ))}
        </select>

        {/* Comuna select */}
        <h3 className="text-sans-p px-1">¿En qué comuna?</h3>
        <select className="container selectores text-underline text-muted">
          <option value=''>Elige una o más comunas</option>
          {/* Map over the selectedComunas state to create options */}
          {filteredComunas.map((comuna) => (
            <option key={comuna.id} value={comuna.comuna}>
              {comuna.comuna}
            </option>
          ))}
        </select>
        <div className="row my-4 d-flex align-items-center">
          <div className="col-2 info-circle pb-3"><FontAwesomeIcon icon={faCircleInfo} /></div>
          <p className="col-10 text-sans-h5-blue">Solo encontrarás las regiones y comunas que tengan proyectos en este banco. </p>
        </div>
      </div>

      <hr className="col-11 my-4"/>

      <div>
        <div className="container d-flex justify-content-between align-items-start px-1 mb-3">
          <h3 className="text-sans-p">¿Qué tipo de proyecto es?</h3>
          <button className="btn-limpiar">
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <div className="d-flex flex-wrap">
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Plazas y Áreas Verdes</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Infraestructura Deportiva</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Centros de Salud</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Luminarias</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Reciclaje</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Energía</p>
          </div>
          <div className="col-5 d-flex flex-column mx-2 align-items-center">
            <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
              <img src="src/static/img/icon_categorias_landing.png" alt="Icono" />
            </div>
            <p className="text-sans-h5-bold text-center">Desarrollo Técnológico</p>
          </div>
        </div>
      </div>

      <hr className="col-11 my-4"/>

      <h3 className="text-sans-p mt-3 px-1">¿Qué años de construcción quieres ver?</h3>
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