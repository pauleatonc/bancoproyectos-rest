import useApiProjectsList from "../../hooks/useApiProjectsList";

const SelectRegionComuna = () => {
  const { dataProject, loadingProject, errorProject } = useApiProjectsList();

  if (loading) {
    return  <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loadingProject) {
    return  <div>Loading...</div>
  }
  if (errorProject) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    <div className="container">
        {dataProject.map((projectData) => (
          <div key={projectData.id_subdere}>
            <h2> Proyecto: {projectData.name}</h2>
            <ul>
              <li>{projectData.description}</li>
              <li>{projectData.year.number}</li>
              <li>{projectData.program.name}</li>
              <li>{projectData.comuna.comuna}</li>
            </ul>
          </div>
        ))}

    </div>
  </div>
  );
};

export default SelectRegionComuna; 