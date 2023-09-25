const CrearProyectoP1 = () => {
    return (
      <div className="container view-container">
        <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>
        
        <div className="col-10 mx-5">
          <div className="d-flex justify-content-center border border-alert"> PASOS </div>
          <form className="col">
            <div className="col-6 d-flex flex-column my-4">
              <label className="text-sans-p px-3">Elige el programa (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason"> 
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-6 d-flex flex-column my-4">
              <label className="text-sans-p px-3">Elige el tipo de proyecto (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason"> 
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

            <div className="col-6 d-flex flex-column my-4">
              <label className="text-sans-p px-3">¿En qué región está el proyecto? (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason"> 
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elige una opción</option>
              </select>
            </div>

              <div className="col-6 d-flex flex-column my-4">
                <label className="text-sans-p px-3">¿En qué comuna? (Obligatorio)</label>
                <select
                  className="custom-select px-3"
                  id="contact_reason"> 
                  {/* GENERAR DE MANERA DINAMICA */}
                  <option value="">Elige una opción</option>
                </select>
              </div>

              <div className="col-6 d-flex flex-column my-4">
                <label className="text-sans-p px-3">Elige el año de construcción del proyecto (Obligatorio)</label>
                <select
                  className="custom-select px-3"
                  id="contact_reason"> 
                  {/* GENERAR DE MANERA DINAMICA */}
                  <option value="">Elige una opción</option>
                </select>
              </div>
          </form>
          <button className="btn-principal-s d-flex justify-content-between my-5">
            <p className="text-sans-p-white text-decoration-underline mb-0 py-1 px-2">Seguir con “paso siguiente”</p>
            <i className="material-symbols-rounded ms-2 fs-2 mt-1">keyboard_arrow_right</i>
          </button>
        </div>
      </div>
    )
  }
export default CrearProyectoP1; 