import { useEffect, useState, useRef } from "react";
import '../../static/styles/proyectosFilter.css';

const SortProyectos = ({ onSort }) => {
  const [dropdownSort, setDropdownSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Año de construcción:  Más reciente ", "Año de construcción: Más antiguo"];
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [currentSortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownSort(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "Año de construcción: Más reciente") {
      setSortOrder("desc");
      onSort && onSort("desc");
    } else if (event.target.value === "Año de construcción: Más antiguo") {
      setSortOrder("asc");
      onSort && onSort("asc");
    }
  };

  const getDropdownDisplayMessage = () => {
    if (selectedOption) {
      return `Ordenar por ${selectedOption}`;
    } else {
      return "Ordenar por";
    }
  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        ref={buttonRef}
        className="select-dropdown mt-3 btn btn-md border border-2"
        onClick={() => setDropdownSort((prevState) => !prevState)}
      >
        {getDropdownDisplayMessage()} <i className="material-symbols-outlined pr-0">expand_more</i>
      </button>

      {dropdownSort && (
        <div ref={dropdownRef} className="panel">
          <ul className="list-group">
            {options.map((option, index) => (
              <li className="list-group-item my-1" key={index}>
                <label className="form-check-label px-2" htmlFor={`option-${index}`}>
                  <input
                    className="form-check-input"
                    id={`option-${index}`}
                    type="radio"
                    value={option}
                    onChange={handleOptionChange}
                    checked={selectedOption === option}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortProyectos;
