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
          className="btn-secundario-l text-decoration-underline text-start"
          onClick={() => onGoodPracticeSelect(practice)}
        >
          {practice.title}
        </button>
      ))}
    </div>

    {/* Boton que abre en dropdown */}
    <div className="d-flex justify-content-center my-4 d-lg-none">
      <button 
      className="select-box text-decoration-underline px-3 p-2"
      onClick={toggleDropdown} 
      >
        Elige una buena practica
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