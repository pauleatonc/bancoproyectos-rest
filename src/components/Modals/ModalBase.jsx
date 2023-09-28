export const ModalBase = ({ title,children }) =>
{

  return (
    <>
      <button type="button" className="btn-secundario-s text-sans-p-blue d-flex pb-0 me-4 " data-bs-toggle="modal" data-bs-target="#ModalBase">
        <p className="text-decoration-underline">Editar</p>
        <i className="material-symbols-rounded ms-2">edit</i> </button>


      <div className="modal fade " id="ModalBase" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-sans-h4" id="ModalLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

