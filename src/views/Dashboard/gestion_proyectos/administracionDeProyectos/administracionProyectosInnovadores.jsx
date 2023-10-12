import { useEffect } from 'react';
import useApiInnovativeProjects from "../../../../hooks/useApiInnovativeProjects";
import { useAuth } from '../../../../context/AuthContext';


const renderActionButton = (project, isEditorOrSuperuser) => {
  if (['Privado', 'Publicado', 'Rechazado'].includes(project.application_status)) {
    return <button className="btn btn-secondary" disabled>Ver proyecto</button>;
  } else if (project.application_status === 'Incompleto') {
    return <a href={`/dashboard/crearinnovador_paso1?id=${project.id}`} className="btn btn-primary">Ver solicitud</a>;
  } else if (project.application_status === 'Pendiente') {
    if (isEditorOrSuperuser) {
      return <a href={`/dashboard/evaluarinnovador?id=${project.id}`} className="btn btn-primary">Evaluar solicitud</a>;
    } else {
      return <button className="btn btn-secondary" disabled>Ver proyecto</button>;
    }
  } else {
    return <button className="btn btn-secondary" disabled>Estado desconocido</button>;
  }
};


const AdministrarProyectosInnovadores = () => {
  const { InnovativeAdminProjectsList, dataInnovativeProjects } = useApiInnovativeProjects();
  const { userData } = useAuth();

  const isEditorOrSuperuser = ['Superusuario', 'Editor General', 'Editor Programa'].includes(userData.tipo_de_usuario);

  useEffect(() => {
    InnovativeAdminProjectsList();
  });
    

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
              {renderActionButton(project, isEditorOrSuperuser)}
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default AdministrarProyectosInnovadores;