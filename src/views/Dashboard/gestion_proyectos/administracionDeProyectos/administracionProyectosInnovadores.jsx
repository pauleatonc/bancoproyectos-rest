import { useEffect } from 'react';
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";

const AdministrarProyectosInnovadores = () => {
  const { InnovativeAdminProjectsList, dataInnovativeProjects } = useApiInnovativeProjects();

  useEffect(() => {
    InnovativeAdminProjectsList();
  }, []);

  return (
    <div className="container view-container mx-5">
      <div>ADMINISTRAR PROYECTOS</div>
      <h2 className="text-sans-h2 my-4 mx-5">Documentos del proyecto</h2>
      <div className="row my-4 fw-bold border-top ">
        <div className="col-1 mt-3">#</div>
        <div className="col mt-3">Proyecto</div>
        <div className="col mt-3">Estado</div>
        <div className="col mt-3">Programa</div>
        <div className="col mt-3">Acción</div>
      </div>
      {
        dataInnovativeProjects.map((project, index) => (
          <div key={index} className={`row border-top ${index % 2 === 0 ? 'grey-table-line' : 'white-table-line'}`}>
            <div className="col-1 p-3">{index + 1}</div>
            <div className="col p-3">{project.title}</div>
            <div className="col p-3">{project.application_status}</div>
            <div className="col p-3">{project.program?.sigla || "N/A"}</div>
            <div className="col p-3">
              {
                (project.application_status !== 'Publicado' && project.application_status !== 'Privado') ? (
                  <a href={`/dashboard/crearinnovador_paso1?id=${project.id}`} className="btn btn-primary">Ver solicitud</a>
                ) : (
                  <button className="btn btn-secondary" disabled>Ver proyecto</button>
                )
              }
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default AdministrarProyectosInnovadores;
