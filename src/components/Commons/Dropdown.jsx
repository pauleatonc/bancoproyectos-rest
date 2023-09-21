import { useState, useRef, useEffect } from 'react';

const DropdownComponent = ({ data, onOptionSelect, description = 'una opción' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownButtonRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  const selectDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDropdownMessage = () => {
    if (!selectedOption) {
      return `Elige ${description}`;
    }
    return selectedOption.title;
  };

  return (
    <>
      <button
        ref={dropdownButtonRef}
        onClick={selectDropdown}
        className="select-dropdown btn-dropdown mt-3 border border-2 "
        role="button"
        tabIndex="0"
      >
        <span className="dropdown-content text-body-secondary ">
          <u>{getDropdownMessage()}</u>
          {dropdownOpen ? (
            <i className="material-symbols-outlined pr-0">expand_less</i>
          ) : (
            <i className="material-symbols-outlined pr-0">expand_more</i>
          )}
        </span>
      </button>
      {dropdownOpen && (
        <div ref={dropdownMenuRef} className="panel-dropdown">
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                <button
                  className={`dropdown-option ${selectedOption && item.id === selectedOption.id ? 'active-option' : ''}`}
                  onClick={() => {
                    setSelectedOption(item);
                    onOptionSelect(item);
                    setDropdownOpen(false);
                  }}
                  type='button'
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DropdownComponent;
