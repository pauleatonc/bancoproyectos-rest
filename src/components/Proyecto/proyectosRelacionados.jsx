import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiProject from '../../services/project/projects.api';

const ProyectosRelacionados = ({ currentSlug }) => {
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    async function fetchRelatedProjects() {
      try {
        const response = await apiProject.get(`projects/v1/${currentSlug}/related_projects/`);
        setRelatedProjects(response.data);

      } catch (error) {
        console.error('Error fetching related projects:', error);
      }
    }

    fetchRelatedProjects();
  }, [currentSlug]);

  return (
    <div className="container row">
      {relatedProjects.map(project => (
        <div key={project.slug} className="col-md my-3 mx-2">
          <div className="row">
            <div className="col">
              <img className="imagen" src={project.portada} alt={project.name} />
            </div>
            <div className="col">
              <Link to={`/project/${project.slug}`} className="text-sans-p">
                  {project.name}
              </Link>
              <p className="text-sans-h5 mt-3">{project.type.name}</p>
              <p className="text-sans-h5">{project.program.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ProyectosRelacionados;