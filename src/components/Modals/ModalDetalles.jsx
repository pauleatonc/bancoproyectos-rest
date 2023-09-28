import { ModalBase } from './ModalBase';

const ModalDetalles = () =>
{
  return (
    <>
      <ModalBase title="Detalles del Proyecto">
        <div className="modal-detalle d-flex align-items-center" >

          <form className="col">
            <div className="col-12 d-flex flex-column my-4">
              <label className="text-sans-p px-3">Elige el programa (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason">
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-12  d-flex flex-column my-4">
              <label className="text-sans-p px-3">Elige el tipo de proyecto (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason">
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-12 d-flex flex-column my-4">
              <label className="text-sans-p px-3">¿En qué región está el proyecto? (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason">
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-12 d-flex flex-column my-4">
              <label className="text-sans-p px-3">¿En qué comuna? (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason">
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-12 d-flex flex-column my-4">
              <label className="text-sans-p px-3">Elige el año de construcción del proyecto (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason">
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>
          </form>
          <div className=" col-12 d-flex border-top justify-content-between">
            <button className="btn-borderless d-flex justify-content-between my-5" data-bs-dismiss="modal" aria-label="Close">
              <i className="material-symbols-rounded ms-2 fs-2 mt-1">keyboard_arrow_left</i>
              <p className="text-sans-p-blue text-decoration-underline mb-0 py-1 px-2">Volver a la solicitud</p>
            </button>
            <button
              className="btn-principal-s d-flex text-sans-h4 pb-0 me-3 align-self-center"
            >
              <p className="text-sans-p-white text-decoration-underline">Guardar</p>
              <i className="material-symbols-rounded ms-2 pt-1">save</i>
            </button>
          </div>
        </div>
      </ModalBase>
    </>

  )
}

export default ModalDetalles