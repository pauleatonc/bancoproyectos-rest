const EvaluarSeccion = () => {
  return (
    <div className="blue-sky-container p-3">
      <p className="text-sans-p fw-bolder">¿El contenido de esta sección es correcto?</p>
      <div className="d-flex">
        <button className="alert-btn d-flex">
          <i className="material-symbols-rounded">close</i>
          <p className="text-decoration-underline mx-2 mb-0">No</p>
        </button>
        <button className="btn-secundario-s px-4 ms-2">
          <p className="text-decoration-underline mx-2 mb-0">Si</p>
        </button>
      </div>
      <p className="text-sans-p fw-bolder my-3">Justifica</p>
      <div>DROPDOWN DE CHECKBOXES - SE GENERAN DE MANERA DINAMICA</div>
    </div>
  )
};

export default EvaluarSeccion;