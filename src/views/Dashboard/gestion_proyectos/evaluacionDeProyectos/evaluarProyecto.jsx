import { useNavigate } from "react-router-dom";
import icon from "../../../../static/img/icons/InfoBlue.svg"

const EvaluarProyecto = () => {

  // Maneja boton de volver atras
  const history = useNavigate();
  const handleBackButtonClick = () => {
    history(-1); 
  };

  return (
    <div className="container view-container ms-4">
      <h1 className="text-sans-h2 mb-3 mt-2">Banco de Proyectos: Ver solicitud</h1>
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

      {/* Detalles del proyecto */}
      <div className="dashed-container my-5">
        <h1 className="text-sans-h1 ms-5 my-3">Titulo  del Proyecto - dinamico</h1>
        <div className="neutral-container mx-5 my-5 p-3">
          <h3 className="text-sans-h2">Descripción del proyecto</h3>
          <p className="text-sans-p">descripcion - dinamico</p>
        </div>

        <div>traer tabla de la otra vista</div>

        <div>COMPONENTE EVALUADOR</div>
      </div>

      {/* Imagenes del proyecto */}
      <div className="dashed-container my-5">
        <h2 className="text-sans-h2 ms-5">Imágenes del proyecto</h2>
        <div className="ms-5">img</div>
        <div className="d-flex flex-row text-sans-h5-blue mt-2 ms-5">
          <i className="material-symbols-rounded me-2">info</i>
          <p className="pt-1">La foto de portada será la primera que se verá en la galería y en el buscador de proyectos.</p>
        </div>

        <h3 className="text-sans-h3 ms-5">Imágenes para la gallería</h3>
        <p className="text-sans-h5 ms-5">(máximo 10 imágenes)</p>
        <div className="ms-5">COMPONENTE GALERIA</div>

        <h3 className="text-sans-h3 ms-5">Antes del proyecto</h3>
        <div className="ms-5">img</div>
        <h3 className="text-sans-h3 ms-5">Después del proyecto</h3>
        <div className="ms-5">img</div>

        <h2 className="text-sans-h2 ms-5">Video del proyecto</h2>
        <div className="ms-5">img</div>

        <div className="ms-5">COMPONENTE EVALUADOR</div>
      </div>

      {/* Documentos del proyecto */}
      <div className="dashed-container my-5">
        <h3 className="text-sans-h2 ms-5">Documentos del proyecto</h3>
        <h4 className="text-sans-h4 ms-5">Documentos Obligatorios</h4>
        <p className="text-sans-h5 ms-5">(Máximo 1 archivo, peso máximo 5 MB, formato PDF)</p>
        <div className="ms-5">TABLA 1</div>
        <h4 className="text-sans-h4 ms-5">Documentos Adicionales (Opcionales)</h4>
        <p className="text-sans-h5 ms-5">(Número de archivos máximo, peso máximo 20 MB, formato libre)</p>
        <div className="ms-5">TABLA 2</div>

        <h3 className="text-sans-h2 ms-5">Documentos con normativa de uso general</h3>
        <div className="ms-5">TABLA 3</div>

        <div className="ms-5">COMPONENTE EVALUADOR</div>
      </div>

      {/* Resumen evaluacion */}
      <div className="ms-5">
        <h3 className="text-sans-h3">Evaluación de la solicitud</h3>
        <p className="text-sans-p">Marcaste que estas secciones tienen problemas:</p>
        <div>TABLA EVALUACION</div>

        <div className="d-flex">
          <p className="text-sans-p-tertiary"><strong>Por lo tanto la solicitud será:</strong></p>
          <p className="text-sans-p ms-2 border">etiqueta</p>
        </div>

        <p className="text-sans-p-tertiary">Esta retroalimentación le llegará a $userName(solicitante), si crees que necesita más detalles para hacer las correcciones, puedes agregarlos a continuación.</p>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="message">Comentarios (Opcional)</label>
          <textarea
            className="input-l p-3"
            id="message"
            placeholder="Escribe un comentario adicional."
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <p>CONTADOR CARACTERES</p>
        </div>

        <div className="d-flex justify-content-between my-5">
          <button className="btn-secundario-s d-flex"  onClick={handleBackButtonClick}>
            <i className="material-symbols-rounded me-2">arrow_back_ios</i>
            <p className="mb-0">Volver a Solicitudes de Proyectos</p>
          </button>
          <button className="btn-principal-s d-flex">
            <p className="mb-0">Enviar evaluación</p>
            <i className="material-symbols-rounded ms-2">arrow_forward_ios</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EvaluarProyecto; 