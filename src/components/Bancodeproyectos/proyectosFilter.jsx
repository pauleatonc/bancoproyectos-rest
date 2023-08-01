import "../../static/styles/proyectosFilter.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import { getAllRegionComunas } from '../../api/RegionComuna/regioncomuna.api';


const FiltroProyectos = () => {
  const [regionComunas, setRegionComunas] = useState([]);

  useEffect(() => {
    async function loadRegionComuna(){
        const res = await getAllRegionComunas();
        setRegionComunas(res.data);
    }
    loadRegionComuna();
  }, []);

    return (
      <div className="mb-md-4" id="filter-container">
        <div className="container d-flex justify-content-between my-3 p-0">
            <p className="font-level-3">Filtrar</p>
            <button className="btn-limpiar p-2">
                Limpiar filtro <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </div>

        <p className="">¿En qué programa está el proyecto que buscas?</p>
        <p>Puedes elegir más de uno.</p>

        <div className="container d-flex justify-content-around mx-0 p-0">
            <div className="col-md-2 d-flex flex-column align-items-center mr-5">
                <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                    <span className="categorias-siglas h4 font-weight-bold mt-2">PMU</span>
                </div>
                <p className="text-center font-weight-bold">Programa Mejoramiento Urbano</p>
            </div>
            <div className="col-md-2 d-flex flex-column  align-items-center">
                <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                    <span className="categorias-siglas h4 font-weight-bold mt-2">PMB</span>
                </div>
                <p className="text-center font-weight-bold">Programa Mejoramiento de Barrios</p>
          </div>
        </div>

        <div className="container filter-line"></div>

        {/* Region select */}
      <div className="mt-3">
        <div className="container d-flex justify-content-between align-items-start px-1">
          <p>¿En qué región?</p>
          <button className="btn-limpiar">
            Borrar <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>

        <select className="container selectores mb-4 text-underline text-muted">
          <option className="" value=''>Elige una o más regiones</option>
          {/* Map over the regionComunas state to create options */}
          {regionComunas.map((data, index) => (
            <option key={index} value={data.region.region}>
              {data.region.region}
            </option>
          ))}
        </select>

        {/* Comuna select */}
        <p className="px-1">Elige una o más comunas</p>
        <select className="container selectores text-underline text-muted">
          <option value=''>Elige una opción</option>
          {/* Map over the regionComunas state to create options */}
          {regionComunas.map((data, index) => (
            <option key={index} value={data.comuna}>
              {data.comuna}
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
                    <p className="text-center font-weight-bold">Plazas y Áreas Verdes</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Infraestructura Deportiva</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Centros de Salud</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Luminarias</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Reciclaje</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Energía</p>
                </div>
                <div className="col-5 d-flex flex-column mx-2 align-items-center">
                    <div className="categorias-circle rounded-circle d-flex align-items-center justify-content-center my-md-3">
                        <img src="src/static/img/icon_categorias_landing.png" alt="Icono"/>
                    </div>
                    <p className="text-center font-weight-bold">Desarrollo Técnológico</p>
                </div>
            </div>
        </div>

        <div className="container filter-line"></div>

        <p className="mt-3 px-1">¿Qué años de construcción quieres ver?</p>
        <div className="mb-4">
            <input className="mx-2" type="checkbox" />
            <label>2019</label> <br />
            <input className="mx-2" type="checkbox" />
            <label>2020</label> <br />
            <input className="mx-2" type="checkbox" />
            <label>2021</label>
        </div>

        <div className="d-flex justify-content-center">
            <button className="btn-resultados mb-4">Mostrar resultados</button>
        </div>

      </div>
    );
  };

  export default FiltroProyectos;