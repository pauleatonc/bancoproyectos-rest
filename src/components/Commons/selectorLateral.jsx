import { useState, useEffect, useRef } from "react";

const SelectorLateral = ({ data, onGoodPracticeSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);

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

  const handleDropdownOptionClick = (e) => {
    if (dropdownMenuRef.current && dropdownMenuRef.current.contains(e.target)) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  useEffect(() => {
    if (!selectedPractice && data.length > 0) {
      setSelectedPractice(data[0]);
    }
  }, [data, selectedPractice]);

  return (
    <div>
      <div className="d-flex flex-column d-none d-lg-block">
        {data
        .map((practice) => (
          <button
          key={practice.id}
          className="btn-secundario-l d-flex justify-content-between"
          onClick={() => onGoodPracticeSelect(practice)}
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
            {selectedPractice ? selectedPractice.title : "Elige una buena práctica"}
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
                setSelectedPractice(practice);
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