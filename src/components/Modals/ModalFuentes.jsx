import { ModalBase } from './ModalBase';

const ModalFuentes = () =>
{
  return (
    <>
      <ModalBase btnName="Agregar fuentes" btnIcon="add" title="Agregar fuente (Opcional)">
        <p>Enlace de la fuente referencial:</p>
        <div className="input-group-prepend d-flex">
          <span className="input-group-text">https://</span>
          <input type="text" className="form-control" placeholder="Ingrese la dirección web"/>
        </div>
        <hr/>
        <div className="d-flex justify-content-between">
          <button className="btn-secundario-s d-flex align-items-center">
            <i className="material-symbols-rounded">chevron_left</i>
            <p className="text-decoration-underline mb-0">Volver a la solicitud</p>
          </button>
          <button className="btn-principal-s d-flex  align-items-center">
            <i className="material-symbols-rounded">add</i>
            <p className="text-decoration-underline mb-0">Agregar Fuente</p>
          </button>
        </div> 
      </ModalBase>
    </>
  )
}

export default ModalFuentes;