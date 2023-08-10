const ProyectoCard = ({ project }) =>
{

  return (
    <div className="proyect-card my-3" >
      <div className="card-img" >
        <img src={project.portada} className="img-fluid p-1" alt={project.name}/>
      </div>
      <div className="d-flex flex-row justify-content-between p-3">
        <p className="text-sans-h5 text-muted">Región: {project.comuna.region}</p>
        <p className="text-sans-h5 text-muted">Comuna: {project.comuna.comuna}</p>
      </div>

      <h2 className="text-serif-h2 text-decoration-underline ml-3 mb-3 mx-3">{project.name}</h2>
      <p className="text-sans-p mx-3">{project.description}</p>

      <div className="container d-flex justify-content-between">
        <p className="tag p-1">{project.program.sigla}</p>
        <p className="tag p-1">{project.type.name}</p>
        <p className="tag p-1">{project.year.number}</p>
      </div>
      <div className="d-flex justify-content-end p-3">
        <button className="font-level-4 btn-principal-s text-decoration-underline px-3" >Ver más &gt; </button>
      </div>
    </div>
  );
};

export default ProyectoCard;