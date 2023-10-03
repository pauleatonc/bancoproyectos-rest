import { ModalBase } from './ModalBase';

const ModalEditarFuente = () => {
  
  return (
    <>
      <ModalBase btnName="Editar" btnIcon="edit" title="Editar fuente" modalID="ModalEditarFuente">
        <p>Enlace de la fuente referencial:</p>
        <div className="input-group-prepend d-flex">
          <span className="input-group-text">https://</span>
          <input 
          type="text" 
          className="form-control" 
          placeholder="fuente a editar" // Aqui poner dinamicamente la fuente a editar
          />
        </div>

        <hr/>
        <div className="d-flex justify-content-between">
          <button className="btn-secundario-s d-flex align-items-center" >
            <i className="material-symbols-rounded me-1">chevron_left</i>
            <p className="text-decoration-underline mb-0">Volver a la solicitud</p>
          </button>
          <button className="btn-principal-s d-flex  align-items-center">
            <i className="material-symbols-rounded me-2">edit</i>
            <p className="text-decoration-underline mb-0">Editar Fuente</p>
          </button>
        </div> 
      </ModalBase>
    </>
  )
}

export default ModalEditarFuente;