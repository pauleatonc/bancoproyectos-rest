import { ProyectoCard } from '../../components/Bancodeproyectos'; 

const ProyectosContainer = ({data}) =>
{

  return (
    <div className="container p-0 d-flex flex-column align-items-center ps-md-5">
      <div className="card-container d-flex flex-wrap justify-content-between">
        {data.map((project) => (
          <ProyectoCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-4 d-flex flex-column flex-md-row">
        <p className="mr-md-5"></p>
        <nav className="pagination-container flex-column flex-sm-row a11y-fonts-flex-column a11y-fonts-flex-lg-row">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <div className="page-link disabled">&lt;</div>
            </li>
            <li>
              <a className="page-link" href="#">
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProyectosContainer;