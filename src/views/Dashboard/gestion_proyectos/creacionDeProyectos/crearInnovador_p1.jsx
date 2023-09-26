const CrearProyectoInnovadorP1 = () => {

  return (
    <div className="container view-container">
      <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Proyectos Innovadores</h2>

      <div className="row">
        <div className="col-5">
          <div className="d-flex flex-row justify-content-between my-4">
            <h3 className="text-sans-h3">Título del Proyecto</h3>
            <button className="btn-secundario-s d-flex text-sans-p-bolder">Editar<i className="material-symbols-rounded ms-2">edit</i> </button>
          </div>
          <div className="d-flex flex-row justify-content-between my-4">
            <h3 className="text-sans-h35">Descripción del proyecto</h3>
            <button className="btn-secundario-s d-flex text-sans-p-bolder">Editar<i className="material-symbols-rounded ms-2">edit</i> </button>
          </div>
          <div className="d-flex flex-row justify-content-between my-4">
            <div className="d-flex flex-column">
              <h3 className="text-sans-h35">Fuentes </h3>
              <p className="text-sans-h5">(Opcional)</p>
            </div>
            <button className="btn-secundario-s d-flex mb-4 text-sans-p-bolder"> <i className="material-symbols-rounded">add</i>Agregar fuente</button>
          </div>
        </div>

        <div className="col-6 ms-5">
          <div className="">
            <h3 className="text-sans-h35">Imagen de Portada</h3>
            <div className="img-section-l my-3">
              <i className="material-symbols-rounded me-2">add_a_photo</i>
              <p className="text-sans-p">Agregar foto de portada</p>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sans-h35">Imágenes para la galería</h3>
            <p className="text-sans-h5">(Máximo 10 imágenes)</p>
            <div className="img-section-s my-3">
              <i className="material-symbols-rounded me-2">add_a_photo</i>
              <p className="text-sans-p">Agregar fotos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-10 mt-5 d-flex justify-content-end">
        <button className="btn-principal-s d-flex text-sans-h4">Enviar solicitud <i className="material-symbols-rounded ms-2">arrow_forward_ios</i> </button>
      </div>
      <div className="col-10 mt-5 d-flex justify-content-start mb-5">
        <button className="red-btn text-sans-h4">Deshechar solicitud <i className="material-symbols-rounded me-2">delete</i> </button>
      </div>
    </div>
  )
}

export default CrearProyectoInnovadorP1; 