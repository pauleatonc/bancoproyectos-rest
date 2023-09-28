import ModalDetalles from "../../../../components/Modals/ModalDetalles";

const CrearProyectoP1 = () =>
{
  return (
    <div className="container view-container">
      <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>

      <div className="row">
        <div className="col-7 mx-auto">
          <div className="d-flex flex-row justify-content-between my-4">
            <h3 className="text-sans-h3">Título del Proyecto</h3>
            <button className="btn-secundario-s text-sans-p-blue d-flex pb-0 me-4 ">
              <p className="text-decoration-underline">Editar</p>
              <i className="material-symbols-rounded ms-2">edit</i> </button>
          </div>
          <div className="card-description">
            <div className="input-area">
              <div className="d-flex justify-content-between">

                <label forHtml="FormControlTextarea" className="form-label text-sans-h3 ms-3">Descripción Proyecto</label>
                <button
                  className="btn-principal-s d-flex text-sans-h4 pb-0 me-3"
                >
                  <p className="text-sans-p-white text-decoration-underline">Guardar</p>
                  <i className="material-symbols-rounded ms-2 pt-1">save</i>
                </button>
              </div>
              <textarea className="form-control mt-3" id="FormControlTextarea" placeholder="Descripción del proyecto" rows="5"></textarea>
              <span>0/700 caracteres</span>
            </div>
          </div>

          {/* Tabla detalles del proyecto */}
          <div className="detalles-del-proyecto my-4 mt-5">
            <h2 className="text-sans-h2-white ms-3 ">Detalles del proyecto</h2>
          </div>
          <div className="ms-3">
            <div className="row">
              <div className="col">
                <p className="text-sans-p"><strong>Nombre del proyecto</strong></p>
                <p className="text-sans-p"></p>
              </div>

              <div className="col">
                <p className="text-sans-p"><strong>Programa</strong></p>
                <p className="text-sans-p"></p>
              </div>

              <div className="col">
                <p className="text-sans-p"><strong>Tipo de proyecto</strong></p>
                <p className="text-sans-p"></p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <p className="text-sans-p"><strong>Región</strong></p>
                <p className="text-sans-p"></p>
              </div>

              <div className="col">
                <p className="text-sans-p"><strong>Comuna</strong></p>
                <p className="text-sans-p"></p>
              </div>

              <div className="col">
                <p className="text-sans-p"><strong>Año de construcción</strong></p>
                <p className="text-sans-p"></p>
              </div>
            </div>

            <div className="row d-flex">
              <p className="text-sans-p"><strong>Código de identificación SUBDERE</strong></p>
              <p className="text-sans-p"></p>
              <div className="">
                  <ModalDetalles/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CrearProyectoP1; 