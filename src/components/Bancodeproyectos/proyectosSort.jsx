import { useEffect, useState, useRef } from "react";

const SortProyectos = ({ sortOrder, onSortChange }) => {
  const [dropdownSort, setDropdownSort] = useState(false);
  const [selectedOption, setSelectedOption] = useState("-year"); 
  const options = ["Más reciente", "Más antiguo"];
  const optionValues = ["-year", "year"];
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setSelectedOption(sortOrder);
  }, [sortOrder]);

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
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSortChange(selectedValue);
  };

  const getDropdownDisplayMessage = () => {
    const selected = options[optionValues.indexOf(selectedOption)];
      return `Ordenar por: ${selected}`;

  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        ref={buttonRef}
        className="select-dropdown mt-3 btn btn-md border border-2"
        onClick={() => {
          setDropdownSort((prevState) => !prevState);
        }}
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
                    value={optionValues[index]}
                    onChange={handleOptionChange}
                    checked={selectedOption === optionValues[index]}
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
