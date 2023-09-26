const CrearProyectoP1 = () => {
    return (
      <div className="container view-container">
        <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>
        
        <div className="col-10 mx-5">

          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-row align-items-center">
              <div className="contador-circle-active text-center mx-1"><p className="mt-1">1</p></div>
              <div className="contador-line-active"></div>
              <div className="contador-line"></div>
              <div className="contador-circle text-center mx-1">2</div>
              <div className="contador-line"></div>
              <div className="contador-line"></div>
              <div className="contador-circle text-center mx-1">3</div>
              <div className="contador-line"></div>
              <div className="contador-line"></div>
              <div className="contador-circle text-center mx-1">4</div>
            </div>
            <div className="col-9 d-flex flex-row justify-content-between mt-2">
              <p className="text-sans-p"><strong>Información <br/> General</strong></p>
              <p className="text-sans-p">Descripción, fotos <br/> y videos</p>
              <p className="text-sans-p">Documentación</p>
              <p className="text-sans-p">Vista previa</p>
            </div>
          </div>

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