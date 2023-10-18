import Notification from "../../../components/Commons/Notification";
import { useAuth } from "../../../context/AuthContext";
import useApiAdminNotificacions from "../../../hooks/useApiAdminNotificacions";

const HomeDashboard = () =>{

  const { userData } = useAuth();
  const { dataInnovativeProjectNotificacions, loadingInnovativeProjectNotificacions, errorInnovativeProjectNotificacions } = useApiAdminNotificacions();

  if (loadingInnovativeProjectNotificacions) {
    return <p>Cargando...</p>;
  }

  if (errorInnovativeProjectNotificacions) {
    return <p>Error: {errorInnovativeProjectNotificacions}</p>;
  }

  return (
    <>
      <div className="container-home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span className="text-sans-h2-tertiary" >Hola, {userData.full_name || userData.rut}</span>
              <div className='container-credential'>
              <span className="text-sans-h4">
                {"Tienes permisos de "}
                <span className="text-sans-h35">
                  {userData.tipo_de_usuario} 
                  {userData.program ? ` ${userData.program.name}` : ""}
                </span>
              </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 ">
              <div className="my-4">
                <Notification
                  title="Solicitudes de Usuarios"
                  titleNone="las solicitudes de usuarios"
                  count="4"
                  description="Usuario creado"
                  date="12/13/2033"
                  button="Evaluar solicitud " />
              </div>

              {dataInnovativeProjectNotificacions && (
                <div>
                  <div className="my-4">
                    <Notification
                      count={dataInnovativeProjectNotificacions.total_count}
                      title="Proyectos Innovadores"
                      ver_mas="dashboard/administrarproyectosinnovadores"
                      latest_projects={dataInnovativeProjectNotificacions.latest_projects.map(project => ({
                        status: project.application_status.toLowerCase(),
                        title: project.title,
                        date: project.modified,
                        id: project.id
                      }))}
                    />
                  </div>
                </div>
              )}

            </div>


            <div className="col-3">
              <div className="container-history my-4">
                <div className="title-history text-sans-h4"><i className="material-symbols-outlined">
                  history
                </i>Mis acciones recientes
                </div>
                <div>
                  <div className="body-history">
                    <ul className="list-group list-group-flush">
                      {/* item solo se debe mostrar cuando no hay historial*/}
                      <li className="list-group-item">Aun no haz realizado acciones dentro de la plataforma.</li>
                      {/**/}
                      {/* item de hisotial  */}
                      <li className="list-group-item">
                        <div className="d-flex mb-1 ">
                          <div className="text-start text-sans-b-gray">Proyecto creado</div>
                          <div className="ms-auto text-sans-c-gray">24/08/2023</div>
                        </div>
                        <div className="text-sans-p">$projectName</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HomeDashboard; 