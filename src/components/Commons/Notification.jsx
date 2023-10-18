import NotificationIcon from '../../static/img/icons/notification.svg'

const Notification = ({ title, count, ver_mas, latest_projects }) => {

  return (
    <>
      {count > 0 ? (
        <>
          <div className="container-notification">
            <div className="title-notification">
              <span className="text-sans-h4">
                <img src={NotificationIcon} className="mx-2" />
                  Tareas pendientes en {title}
                <i className="badge rounded-circle badge-notification mx-3">{count}</i>
              </span>
            </div>
            <div className="body-notification">
              <ul className="list-group list-group-flush list-item w-100 mx-0 px-0">
              {latest_projects && latest_projects.map((project, index) => (
                  <li className="list-group-item item-notification" key={index}>
                    <div className="d-flex mb-1">
                      <div className="p-2 text-start text-sans-b-gray">{project.title}</div>
                      <div className="ms-auto p-2 text-sans-c-gray">{project.date}</div>
                    </div>
                    <div className="d-flex mb-1">
                      <div className="p-2 text-sans-p">Este proyecto se encuentra:</div>                      
                    </div>    
                    <div className="d-flex mb-1">
                      <div className={`px-3 py-1 ${project.status.toLowerCase()}`}>
                        {project.status}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end px-0 mx-0 my-2">                
                      <button 
                        className="btn-pill-white" 
                        onClick={() => window.location.href= 
                          `${project.status === 'Incompleto' ? '/dashboard/completarinnovador' : project.status === 'Rechazado' ? '/dashboard/revisarinnovador' : '/dashboard/evaluarinnovador'}?id=${project.id}`
                        }
                      >
                        <u>
                          {project.status === 'Incompleto' ? 'Completar Solicitud' : project.status === 'Rechazado' ? 'Revisar Proyecto' : 'Ir al Proyecto'}
                        </u>
                        <i className="material-symbols-outlined">
                          chevron_right
                        </i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {count >= 3 && (
            <div className="my-4 d-flex justify-content-end mx-2">
  <button 
    className="btn-pill-blue" 
    onClick={() => window.location.href = ver_mas}
  >
    <u>Ver más</u>
    <i className="material-symbols-outlined">
      chevron_right
    </i>
  </button>
</div>
          )}
        </>
      ) : (
        <div className="container-notification">
          <div className="title-notification">
            <span className="text-sans-h4"><span className="material-symbols-outlined py-2 mx-2">
              check_circle
            </span>
              Estás al día con {title}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;

