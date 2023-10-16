import NotificationIcon from '../../static/img/icons/notification.svg'

const Notification = ({ title, titleNone, description, date, button, count }) =>
{


  return (
    <>
      <div className="container-notification">
        <div className="title-notification">
          <span className="text-sans-h35"><img src={NotificationIcon} className="mx-2" /> Tienes {title} <i className="badge rounded-circle badge-notification mx-3">{count}</i></span>
        </div>
        <div className="body-notification">
          <ul className="list-group list-group-flush list-item w-100 mx-0 px-0">
            <li className="list-group-item  item-notification">
              <div className="d-flex mb-1 ">
                <div className="p-2 text-start text-sans-b-gray">{description}</div>
                <div className="ms-auto p-2 text-sans-c-gray">{date}</div>
              </div>
              <div className="d-flex justify-content-end px-0 mx-0 my-2">
                <button className="btn-pill-white"><u className="text-sans-p-bold-blue">{button}</u>
                  <i className="material-symbols-outlined">
                    chevron_right
                  </i>
                </button>
              </div>
            </li>
            {/* solo ejemplo , arriba se itera */}
            <li className="list-group-item  item-notification">
              <div className="d-flex mb-1 ">
                <div className="p-2 text-start text-sans-b-gray">{description}</div>
                <div className="ms-auto p-2 text-sans-c-gray">{date}</div>
              </div>
              <div className="d-flex justify-content-end px-0 mx-0">
                <button className="btn-pill-white"><u className="text-sans-p-bold-blue">{button}</u>
                  <i className="material-symbols-outlined">
                    chevron_right
                  </i>
                </button>
              </div>
            </li>
            {/**/}
          </ul>
        </div>
      </div>
      {/* boton debe aparece  cuando hay mas de tres  notificaciones */}
      <div className="my-4 d-flex justify-content-end  mx-2">
        <button className="btn-pill-blue">Ver más  <i className="material-symbols-outlined">
          chevron_right
        </i> </button>
      </div>

      {/* si no hay notificaciones de debe mostrar los siguiente */}
      <div className="container-notification">
        <div className="title-notification">
          <span className="text-sans-h35"><span className="material-symbols-outlined py-2 mx-2">
            check_circle
          </span>
          Estás al día con {titleNone}</span>
        </div>
      </div>
      {/* */}
    </>
  )
}

export default Notification