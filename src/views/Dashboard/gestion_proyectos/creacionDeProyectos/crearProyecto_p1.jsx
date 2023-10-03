import { useState } from 'react';
import UploadImg from "../../../../components/Commons/UploadImg";
import UploadImgsm from "../../../../components/Commons/UploadImgsm";
import ModalDetalles from "../../../../components/Modals/ModalDetalles";
import UploadFile from "../../../../components/Modals/UploadFile";
import { DocumentsProjects } from "../../../../components/Tables/DocumentsProjects";
import { EditableTitle } from "../../../../components/Tables/InputTitle";

const CrearProyectoP1 = () =>
{

  const [ text, setText ] = useState('');
  const [ count, setCount ] = useState(0);
  const [ isEditing, setIsEditing ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ detalles, setDetalles ] = useState({
    programa: '',
    tipoProyecto: '',
    region: '',
    comuna: '',
    year: '',
    idSubdere: '',
  });

  const handleTextChange = (e) =>
  {
    const newText = e.target.value;
    setText(newText);
    setCount(newText.length);
  };

  const handleButtonClick = () =>
  {
    setErrorMessage(null);

    if (isEditing)
    {
      if (text.length > 700)
      {
        setErrorMessage('El texto no puede superar los 700 caracteres.');
        return;
      }
      if (text.trim().length === 0)
      {
        setErrorMessage('No puede guardar un texto vacío.');
        return;
      }
      setIsEditing(false);
    } else
    {
      setIsEditing(true);
    }
  };


  return (
    <div className="container view-container">
      <div className="row">
        <h2 className="text-sans-h2 mt-4 mb-5">Subir Proyecto: Banco de Proyectos</h2>

        <div className="col-7 mx-auto">
          {/* Titulo editable  */}
          <EditableTitle />
          <div className="card-description">
            <div className="input-area">
              <div className="d-flex justify-content-between">
                <label htmlFor="FormControlTextarea" className="form-label text-sans-h3 ms-3">Descripción del Proyecto</label>
                <button
                  className={isEditing ? "btn-principal-s d-flex text-sans-h4 pb-0 me-3" : "btn-secundario-s d-flex pb-0 me-3"}
                  onClick={handleButtonClick}
                >
                  <p className={isEditing ? "text-sans-p-white text-decoration-underline" : "text-sans-p-blue  text-decoration-underline"}>{isEditing ? 'Guardar' : 'Editar'}</p>
                  <i className="material-symbols-rounded ms-2 pt-1">{isEditing ? 'save' : 'edit'}</i>
                </button>
              </div>
              {isEditing ? (
                <>
                  <textarea
                    className="form-control mt-3"
                    id="FormControlTextarea"
                    placeholder="Descripción del proyecto"
                    rows="7"
                    value={text}
                    onChange={handleTextChange}
                    maxLength="700"
                  ></textarea>
                  <span className="text-sans-h5 m-0">{count}/700 caracteres.</span>
                  {errorMessage && <div className="text-sans-h5-red m-0">{errorMessage}</div>}
                </>
              ) : (
                <div className="mt-3">
                  <span className="my-2">{text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabla detalles del proyecto */}
          <div className="detalles-del-proyecto my-4 mt-5">
            <h2 className="text-sans-h2-white ms-3 ">Detalles del proyecto</h2>
          </div>
          <div className="ms-3">
            <div className="row">
              <div className="col">
                <p className="text-sans-b-gray">Nombre del proyecto</p>
                <p className="text-sans-c-gray"></p>
              </div>

              <div className="col">
                <p className="text-sans-b-gray">Programa</p>
                <p className="text-sans-c-gray">{detalles.programa}</p>
              </div>

              <div className="col">
                <p className="text-sans-b-gray">Tipo de proyecto</p>
                <p className="text-sans-c-gray">{detalles.tipoProyecto}</p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <p className="text-sans-b-gray">Región</p>
                <p className="text-sans-c-gray">{detalles.region}</p>

              </div>

              <div className="col">
                <p className="text-sans-b-gray">Comuna</p>
                <p className="text-sans-c-gray">{detalles.comuna}</p>
              </div>

              <div className="col">
                <p className="text-sans-b-gray">Año de construcción</p>
                <p className="text-sans-c-gray">{detalles.year}</p>
              </div>
            </div>

            <div className="col d-flex justify-content-between">
              <div>
                <p className="text-sans-b-gray">Código de identificación SUBDERE</p>
                <p className="text-sans-c-gray ">{detalles.idSubdere}</p>
              </div>
              <div>
                <ModalDetalles setDetalles={setDetalles} />
              </div>
            </div>
          </div>
          <>
            <span className='text-sans-h2'>Imágenes del proyecto</span>
            <UploadImg />
            <div className="text-sans-h5-blue info d-flex  align-content-center">
              <i className="material-symbols-outlined">
                info
              </i>
              <span className="ms-2 align-self-center">La foto de portada será la primera que se verá en la galería y en el buscador de proyectos.</span></div>
            <div>
              <div>
                <UploadImgsm />
              </div>
            </div>
            <span className='text-sans-h3'>Antes del proyecto</span>
            <div className="text-sans-h5-blue info d-flex  align-content-center">
              <i className="material-symbols-outlined">
                info
              </i>
              <span className="ms-2 align-self-center">Si subes una foto de como se veia antes de la realización del proyecto, debes obligatoriamente subir una foto de como se ve después de su realización.</span></div>
            <div>
              <UploadImg />
              <span className='text-sans-h3'>
                Después del proyecto</span>
              <UploadImg />
            </div>
          </>
          <div className="my-5">
            <span className='text-sans-h2'>Video del proyecto</span>
            <p>(Máximo 1 enlace)</p>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">https://</span>
              <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
              <button className="btn-principal-s d-flex " type="button" id="button-addon2"> <i className="material-symbols-outlined ">
                upgrade
              </i><u className="align-self-center text-sans-b-white ">Subir Link</u></button>
            </div>
          </div>
          <div className="my-5">
            <span className='text-sans-h2'>Documentos del proyecto</span>
            <p className='text-sans-h3 mt-4'>Documentos Obligatorios</p>
            <p>(Máximo 1 archivo, peso máximo 5 MB, formato PDF)</p>
            <div className="row my-4 fw-bold border-top">
              <div className="col-1 mt-3">#</div>
              <div className="col mt-3">Documento</div>
              <div className="col mt-3">Formato</div>
              <div className="col mt-3">Acción</div>
            </div>
            <div className="row border-top grey-table-line align-items-center ">
              <DocumentsProjects
                index="1"
                description="Planimetría"
                fileType="Archivo"
              />
            </div>
            <div className="row border-top align-items-center ">
              <DocumentsProjects
                index="2"
                description="Especificaciones técnicas"
                fileType="Arc"
              />
            </div>
            <div className="row border-top grey-table-line align-items-center ">
              <DocumentsProjects
                index="3"
                description="Presupuesto"
                fileType="Archivo" />
            </div>
          </div>
          <span className='text-sans-h3 mt-4'>Documentos Adicionales (Opcionales)</span>
          <p>(Número de archivos máximo, peso máximo 20 MB, formato libre)</p>
          <UploadFile />
          <div className="my-5">
            <span className='text-sans-h2'>Documentos con normativa de uso general</span>
            <div className="text-sans-h5-blue info d-flex  align-content-center">
              <i className="material-symbols-outlined">
                info
              </i>
              <span className="ms-2 align-self-center">Estos documentos están asociados al programa y tipo de proyecto que elegiste anteriormente y se suben automáticamente.</span>
            </div>
            <div className="row my-4 fw-bold border-top">
              <div className="col-1 mt-3">#</div>
              <div className="col mt-3">Documento</div>
              <div className="col mt-3">Formato</div>
              <div className="col mt-3">Acción</div>
            </div>
            <div className='row border-top grey-table-line'>
              <div className="col-1 p-3">1</div>
              <div className="col p-3"> documents title</div>
              <div className="col p-3"> documents format </div>
              <a className="col p-3 text-sans-p-tertiary" href="" target="_blank" rel="noopener noreferrer">Ver</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-10 mt-5 d-flex justify-content-end align-items-center ">
        <button className="btn-principal-s d-flex text-sans-h4 pb-0">
          <p className="text-decoration-underline">Enviar solicitud</p>
          <i className="material-symbols-rounded ms-2">arrow_forward_ios</i>
        </button>
      </div>
      <div className="col-10 mt-5 d-flex justify-content-start mb-5 align-items-center ">
        <button className="red-btn text-sans-h4 d-flex pb-0 ">
          <p className="text-decoration-underline">Deshechar solicitud</p>
          <i className="material-symbols-rounded ms-2 pt-1 ">delete</i> </button>
      </div>
    </div>
  )
}
export default CrearProyectoP1; 