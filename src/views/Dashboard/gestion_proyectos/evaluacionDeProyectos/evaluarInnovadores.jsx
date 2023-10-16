import { useNavigate } from "react-router-dom";
import icon from "../../../../static/img/icons/InfoBlue.svg"

const EvaluarInnovador = () => {

  // Maneja boton de volver atras
  const history = useNavigate();
  const handleBackButtonClick = () => {
    history(-1); 
  };

  return (
    <div className="container view-container ms-4">
      <h1 className="text-sans-h2 mb-3 mt-2">Proyectos Innovadores: Ver solicitud</h1>
      <button className="btn-secundario-s d-flex mb-4" onClick={handleBackButtonClick}>
        <i className="material-symbols-rounded me-2">arrow_back_ios</i>
        <p className="mb-0 text-decoration-underline">Volver atrás</p>
      </button>

      {/* Mensaje */}
      <div className="conainer d-flex justify-content-center my-5">
        <div className="tertiary-container d-flex col-9 p-3 px-5">
          <div className="col-2 d-flex align-items-center">
            <img className="" src={icon} />
          </div>
          <div>
            <h2 className="text-sans-h2">Esta solicitud está pendiente de evaluación</h2>
            <p className="text-sans-p">Revisa que está todo bien para enviar la solicitud de publicación al final de esta página.</p>
          </div>
        </div>
      </div>

      <div>
        {/* Descripcion del proyecto */}
        <div></div>
      </div>
    
    </div>
  )
}

export default EvaluarInnovador; 