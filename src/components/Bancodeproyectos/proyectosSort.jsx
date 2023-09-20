import { useEffect, useState, useRef } from "react";

const SortProyectos = ({ sortOrder, onSortChange }) =>
{
  const [ opendropdownSort, setOpenDropdownSort ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState("-year");
  const options = [ "Más reciente", "Más antiguo" ];
  const optionValues = [ "-year", "year" ];
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const sortDropdown = () =>
  {
    setOpenDropdownSort(prevState => !prevState)
  }

  useEffect(() =>
  {
    setSelectedOption(sortOrder);
  }, [ sortOrder ]);

  useEffect(() =>
  {
    function handleClickOutside(event)
    {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      )
      {
        setOpenDropdownSort(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
    {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionChange = (event) =>
  {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSortChange(selectedValue);
  };

  const getDropdownDisplayMessage = () =>
  {
    const selected = options[ optionValues.indexOf(selectedOption) ];
    return `Ordenar por: ${selected}`;

  };

  return (
    <div>
      <button
        role="button"
        tabIndex="0"
        ref={buttonRef}
        className="sort-dropdown mt-3 text-decoration-none  d-flex align-items-center nowrap"
        onClick={sortDropdown}
      ><span className="dropdown-content">
          <u>{getDropdownDisplayMessage()}</u>
          {opendropdownSort ? (<i className="material-symbols-outlined pr-0"> arrow_drop_up</i>) : (<i className="material-symbols-outlined">
            arrow_drop_down
          </i>)}
        </span>
      </button>

      {opendropdownSort && (
        <div ref={dropdownRef} className="panel-sort">
          <ul className="list-sort">
            {options.map((option, index) => (
              <li className="items-sort my-1" key={index}>
                <input
                  className="form-check-input"
                  id={`option-${index}`}
                  type="radio"
                  value={optionValues[ index ]}
                  onChange={handleOptionChange}
                  checked={selectedOption === optionValues[ index ]}
                />
                <label className="form-check-label" htmlFor={`option-${index}`}>
                  Año de construcción: {option}
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
