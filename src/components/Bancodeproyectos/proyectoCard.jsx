import { Link } from 'react-router-dom';

const ProyectoCard = ({ project }) => {

  const truncateText = (text, maxWords) => {
    const words = text.split(" "); // Dividir el texto en palabras individuales
    if (words.length <= maxWords) {
      return text; // Si el número de palabras es igual o menor que el límite, no se recorta.
    } else {
      const truncatedWords = words.slice(0, maxWords); // Tomar solo las primeras maxWords palabras
      return truncatedWords.join(" ") + " ..."; // Unir las palabras truncadas y agregar "..." al final.
    }
  };

  return (
    <div className="proyect-card my-3" >
      <div className="img-container d-flex justify-content-center" >
        <img src={project.portada} className="image p-1" alt={project.name}/>
      </div>
      <div className="d-flex flex-row justify-content-between ms-3 my-2">
        <p className="col-6 text-sans-h5 text-muted">Región: {project.comuna.region}</p>
        <p className="col-5 text-sans-h5 text-muted">Comuna: {project.comuna.comuna}</p>
      </div>

      <h2 className="text-serif-h2 text-decoration-underline ml-3 mb-3 mx-3">{project.name}</h2>
      <p className="text-sans-p mx-3">{truncateText(project.description, 20)}</p>

      <div className="container d-flex justify-content-between">
        <p className="tag p-1">{project.program.sigla}</p>
        <p className="tag p-1">{project.type.name}</p>
        <p className="tag p-1">{project.year.number}</p>
      </div>
      <div className="d-flex justify-content-end p-3">
        <button className="font-level-4 btn-principal-s text-decoration-underline px-3">
            <Link to={`/project/${project.slug}/`} className="font-level-4 btn-principal-s text-decoration-underline px-3">
                Ver más &gt;
            </Link>
        </button>
      </div>
    </div>
  );
};

export default ProyectoCard;