import { useState, useRef, useEffect } from 'react'; 
import Dropdown from '../DropdowSelect';


export const FiltroProyectoMobile = (componentProps) =>
{ const {
  years, programs, types, regiones,
  filteredComunas, toggleProgram,
  toggleType, handleComunaChange, handleRegionChange,
  handleYearChange, handleClearFilter, handleClearLocation, handleClearTypes, selectedComunas, selectedRegiones, selectedYears, selectedPrograms, selectedTypes
} = componentProps;
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const filtroDropdown = () => {
  setIsDropdownOpen(prevState => !prevState); 
}
const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() =>
  {
    function handleClickOutside(event)
    {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target))
      {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
    {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

return (

<>
<button
  className="filter-dropdown text-decoration-none dropdown-toggle-filtro d-flex align-items-center nowrap"
  type="button"
  ref={buttonRef}
  onClick={filtroDropdown}
>
  <u className="mr-md-5">Filtrar</u>
  {isDropdownOpen ? (
    <i className="material-symbols-outlined">close</i>
  ) : (
    <i className="material-symbols-outlined pr-0">tune</i>
  )}
</button>

<div  ref={dropdownRef}  className={`dropdown-menu  panel-filter p-0 border border-primary  border-1 rounded  bg-light ${isDropdownOpen ? 'show' : ''}`} id="dropdown-menu">
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
        items={regiones}
        selectedItems={selectedRegiones}
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
              <i className="material-symbols-rounded" id='icon-type'>{type.icon_type}</i>
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
        items={years}
        selectedItems={selectedYears}
        singleItemName="años"
        onItemChange={handleYearChange}
      />
    </div>
  </div>
  </div>
  </>
);

}

