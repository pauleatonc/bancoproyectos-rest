import { useState, useEffect, useRef } from "react";

const SelectorLateral = ({ data, onGoodPracticeSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controla si el dropdown esta abierto o cerrado.
  const [selectedOption, setSelectedOption] = useState(null); // Almacena la opcion seleccionada.

  // Funcion que maneja apertura y cierre de dropdown (DD)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Referencias a elementos del DOM, detectan clicks fuera del DD.
  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // Funcion que maneja clicks fuera del DD para cerrarlo
  const handleClickOutsideDropdown = (e) => {
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(e.target) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
    }
  };
  // Manejador de clicks en opciones del DD para evitar su cierre anticipado.
  const handleDropdownOptionClick = (e) => {
    if (dropdownMenuRef.current && dropdownMenuRef.current.contains(e.target)) {
      e.stopPropagation();
    }
  };

  // Evento que quita o agrega el evento click fuera del DD
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  // Evento que selecciona primera opcion del listado al cambiar opciones o montar componente.
  useEffect(() => {
    if (!selectedOption && data.length > 0) {
      setSelectedOption(data[0]);
    }
  }, [data, selectedOption]);

  // Evento que actualiza opcion seleccionada al primer elemento de 'data' cuando 'data' cambia.
  useEffect(() => {
    if (data.length > 0) {
      setSelectedOption(data[0]);
    }
  }, [data]);

  return (
    <div>
      <div className="d-flex flex-column d-none d-lg-block">
        {data.map((practice) => (
          <button
          key={practice.id}
          className="btn-secundario-l d-flex justify-content-between"
          onClick={() => {
            setSelectedOption(practice);
            onGoodPracticeSelect(practice);
            setDropdownOpen(false); // Cierra el dropdown al seleccionar una opción
          }}
          >
            <p className="text-decoration-underline mb-0 py-1">{practice.title}</p>
            <i className="material-symbols-rounded ms-2">keyboard_arrow_right</i>
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-center my-4 d-lg-none">
        <button
        ref={dropdownButtonRef}
        className="select-box d-flex justify-content-center px-3 pt-3"
        onClick={toggleDropdown}
        onClickCapture={handleDropdownOptionClick}
        >
          <p className="text-decoration-underline">
            {selectedOption ? selectedOption.title : "Elige una buena práctica"}
          </p>{" "}
          <i className="material-symbols-rounded ms-2">keyboard_arrow_down</i>
        </button>
      </div>

      <div ref={dropdownMenuRef} className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
        <div className="d-flex flex-column">
          {data.map((practice) => (
            <button
              key={practice.id}
              className="select-option text-start px-3 p-2 m-1"
              onClick={() => {
                setSelectedOption(practice);
                onGoodPracticeSelect(practice);
                setDropdownOpen(false); // Cierra el dropdown al seleccionar una opción
              }}
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