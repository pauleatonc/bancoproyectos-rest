import { useState, useEffect } from "react";
import DropdownComponent from "./Dropdown";

const SelectorLateral = ({ data, onGoodPracticeSelect }) =>
{
  const [ selectedOption, setSelectedOption ] = useState(null); // Almacena la opcion seleccionada.



  // Evento que selecciona primera opcion del listado al cambiar opciones o montar componente.
  useEffect(() =>
  {
    if (!selectedOption && data.length > 0)
    {
      setSelectedOption(data[ 0 ]);
    }
  }, [ data, selectedOption ]);

  // Evento que actualiza opcion seleccionada al primer elemento de 'data' cuando 'data' cambia.
  useEffect(() =>
  {
    if (data.length > 0)
    {
      setSelectedOption(data[ 0 ]);
    }
  }, [ data ]);

  return (
    <div>
      <div className="d-flex flex-column d-none d-lg-block">
        {data.map((practice) => (
          <button
            key={practice.id}
            className="btn-secundario-l d-flex justify-content-between"
            onClick={() =>
            {
              setSelectedOption(practice);
              onGoodPracticeSelect(practice);
            }}
          >
            <p className="text-decoration-underline mb-0 py-1">{practice.title}</p>
            <i className="material-symbols-rounded ms-2">keyboard_arrow_right</i>
          </button>
        ))}
      </div>

      <div className="d-flex justify-content-center my-4 d-lg-none">
        <DropdownComponent
          data={data}
          description="una buena practica"
          onOptionSelect={(practice) =>
          {
            onGoodPracticeSelect(practice);
          }}
        />
      </div>
    </div>
  );
};

export default SelectorLateral;