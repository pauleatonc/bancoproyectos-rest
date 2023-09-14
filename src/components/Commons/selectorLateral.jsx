import { useState } from "react";

const SelectorLateral = ({ data, onGoodPracticeSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
  <div>
    {/* Botones vista desktop */}
     <div className="d-flex flex-column d-none d-lg-block">
      {data.map((practice) => (
        <button
        key={practice.id}
        className="btn-secundario-l d-flex justify-content-between"
        onClick={() => onGoodPracticeSelect(practice)}
        >
          <p className="text-decoration-underline mb-0 py-1">{practice.title} </p><i className="material-symbols-rounded ms-2">keyboard_arrow_right</i>
        </button>
      ))}
    </div>

    {/* Boton que abre en dropdown */}
    <div className="d-flex justify-content-center my-4 d-lg-none">
      <button 
      className="select-box d-flex justify-content-center px-3 pt-3"
      onClick={toggleDropdown} 
      >
        <p className="text-decoration-underline">Elige una buena practica</p> <i className="material-symbols-rounded ms-2">keyboard_arrow_down</i>
      </button>
    </div>

    {/* Botones dropdown */}
    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
      <div className="d-flex flex-column">
        {data.map((practice) => (
          <button
            key={practice.id}
            className="select-option text-start px-3 p-2 m-1"
            onClick={() => onGoodPracticeSelect(practice)}
          >
            {practice.title}
          </button>
        ))}
      </div>
    </div>

  </div>
  );
};

export default SelectorLateral;