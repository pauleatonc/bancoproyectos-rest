import { useState } from 'react';

function BuscadorGeneral() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí realizar acciones adicionales cuando se envíe el formulario de búsqueda,
    // como realizar la búsqueda en la base de datos o filtrar datos.
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default BuscadorGeneral;