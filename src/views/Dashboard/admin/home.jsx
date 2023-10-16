import Notification from "../../../components/Commons/Notification";

const HomeDashboard = () =>
{
  return (
    <>
      <div className="container-home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <span className="text-sans-h2-tertiary" >Hola , $UserName</span>
              <div className='container-credential'>
                <span className="text-sans-h4">Tienes permisos de <span className="text-sans-h35">$TipoUsuario </span></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6 ">
              <div className="my-4">
                <Notification
                  title="una solicitud de Ususario Pendiente"
                  titleNone="las solicitudes de usuarios"
                  count="4"
                  description="Usuario creado"
                  date="12/13/2033"
                  button="Evaluar solicitud " />

              </div>
              <div className="my-4">
                <Notification
                  title="un proyecto incompleto"
                  titleNone="las revisiones de proyecto"
                  count="3"
                  description="Proyecto creado en Banco de Proyectos "
                  date="12/13/2133"
                  button="Continuar solicitud" />
              </div>
              <div className="my-4">
                <Notification
                  title="solicitudes de proyecto pendientes"
                  titleNone="las solicitudes de proyecto"
                  count="5"
                  description="Proyecto creado en Banco de Proyectos"
                  date="12/13/2133"
                  button="Evaluar solicitud" />
              </div>
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