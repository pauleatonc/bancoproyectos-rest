import React from 'react';
import useApiFilter from "../../hooks/useApiFilter";

const Filters = () => {
  const { dataFilter, loading, error } = useApiFilter();

  if (loading) {
    return  <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
        <ul>
          <li>
            Years:
            <ul>
              {dataFilter.years.map(year => (
                <li key={year.number}>{year.number}</li>
              ))}
            </ul>
          </li>
          <li>
            Programs:
            <ul>
              {dataFilter.programs.map(program => (
                <li key={program.sigla}>{program.name} ({program.sigla})</li>
              ))}
            </ul>
          </li>
          <li>
            Types:
            <ul>
              {dataFilter.types.map(type => (
                <li key={type.name}>{type.name} ({type.icon_type})</li>
              ))}
            </ul>
          </li>
          <li>
            Comunas:
            <ul>
              {dataFilter.comunas.map(comuna => (
                <li key={comuna.id}>{comuna.comuna}</li>
              ))}
            </ul>
          </li>
        </ul>   
    </div>
  );
};

export default Filters; 
