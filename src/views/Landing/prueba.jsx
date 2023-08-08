import useApiRegionComuna  from "../../hooks/useApiRegionComuna";

const SelectRegionComuna = () => {
  const {data, loading , error } = useApiRegionComuna();

  if (loading) {
    return  <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    {data.map((regionData) => (
      <div key={regionData.region}>
        <h2>Region: {regionData.region}</h2>
        <ul>
          {regionData.comunas.map((comunaData) => (
            <li key={comunaData.comuna}>{comunaData.comuna}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  );
};

export default SelectRegionComuna; 