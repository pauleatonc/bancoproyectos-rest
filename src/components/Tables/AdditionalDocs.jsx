
export const AdditionalDocs = (props) => {
  const getFileExtension = (fileName) => {
    return fileName.split('.').pop();
  }

  return (
    <>
      <div className="row my-4 fw-bold border-top">
        <div className="col-1 mt-3">#</div>
        <div className="col mt-3">Documento</div>
        <div className="col mt-3">Formato</div>
        <div className="col mt-3">Acción</div>
      </div>
      {props.files.map((fileObj, index) => (
        <div key={index} className={`row border-top align-items-center  ${index % 2 === 0 ? 'grey-table-line' : 'white-table-line'}`}>
          <div className="col-1 p-3">{index + 1}</div>
          <div className="col p-3">{fileObj.title}</div>
          <div className="col p-3">{getFileExtension(fileObj.file.name)}</div>
          <div className="col p-3">
          <button className="btn-secundario-s text-sans-p-blue d-flex" 
          type="button" 
          id="button-addon2" 
          data-bs-toggle="modal"   
          data-bs-target="#uploadFile"   
          onClick={() => props.onEdit(index)}>
          <u className="text-decoration-underline mx-2">Modificar</u>
          <i className="material-symbols-outlined "> edit</i>
        </button>
          </div>
        </div>
      ))}
    </>
  )
}