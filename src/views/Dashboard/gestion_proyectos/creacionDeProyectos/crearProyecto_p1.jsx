const CrearProyectoP1 = () => {
    return (
      <div className="container view-container">
        <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>
        
        <div className="col-10 mx-5">
          <div className="d-flex justify-content-center border border-alert"> PASOS </div>
          <form className="col">
            <div className="col-6 d-flex flex-column mt-3 my-5">
              <label className="text-sans-p px-3" htmlFor="contact_reason">Elige el programa (Obligatorio)</label>
              <select
                className="custom-select px-3"
                id="contact_reason"> 
                {/* GENERAR DE MANERA DINAMICA */}
                <option value="">Elije una opción</option>
                <option value="sugerencia">PMU</option>
                <option value="consulta">PMB</option>
              </select>
            </div>

            <div className="col-6 d-flex flex-column input-container my-5">
              <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="organization"> Nombre del proyecto </label>
              <input
                className="input-s px-3"
                type="text"
                placeholder="Ingresa el nombre de tu organización."
              />
            </div>

            <div className="col-10 d-flex flex-column input-container mt-4">
              <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="message">Describe el proyecto</label>
              <textarea
                className="input-l p-3"
                id="message"
                placeholder="Describe la razón de contacto."
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    )
  }
  export default CrearProyectoP1; 