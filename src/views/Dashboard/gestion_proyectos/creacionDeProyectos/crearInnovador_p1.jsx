const CrearProyectoInnovadorP1 = () => {
  return (
    <div className="container view-container">
      <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>
      
      <div className="col-10 mx-5">
        <div className="d-flex justify-content-center border border-alert"> PASOS </div>
        <form className="col">
          <div className="col-6 d-flex flex-column mt-3 my-5">
            <label className="text-sans-p px-3">Elige el programa (Obligatorio)</label>
            <select
              className="custom-select px-3"
              id="contact_reason"> 
              {/* GENERAR DE MANERA DINAMICA */}
              <option value="">Elige una opción</option>
              <option value="sugerencia">PMU</option>
              <option value="consulta">PMB</option>
            </select>
          </div>

          <div className="col-6 d-flex flex-column input-container my-5">
            <label className="text-sans-p input-label ms-3 ms-sm-0"> Nombre del proyecto </label>
            <input
              className="input-s px-3"
              type="text"
              placeholder="Text example"
            />
            <p>conteo caracteres</p>
          </div>

          <div className="col-10 d-flex flex-column input-container mt-4">
            <label className="text-sans-p input-label ms-3 ms-sm-0">Describe el proyecto</label>
            <textarea
              className="input-l p-3"
              id="message"
              placeholder="Text example"
            />
            <p>conteo caracteres</p>
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

export default CrearProyectoInnovadorP1; 