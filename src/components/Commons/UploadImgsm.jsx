import { useState, useRef } from 'react';

function UploadImgsm()
{
  const [ imageURLs, setImageURLs ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ currentImg, setCurrentImg ] = useState(null);
  const modalRef = useRef(null);

  const handleImageChange = (e) =>
  {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    const newImageURLs = [ ...imageURLs ];

    for (let file of files)
    {
      if (newImageURLs.length >= 10) break; 
      const url = URL.createObjectURL(file);
      newImageURLs.push(url);
    }

    setImageURLs(newImageURLs);
  };

  const handleDelete = (index) =>
  {
    const newImageURLs = [ ...imageURLs ];
    newImageURLs.splice(index, 1);
    setImageURLs(newImageURLs);
  };

  const openModal = (index) =>
  {
    setCurrentImg(imageURLs[ index ]);
    setShowModal(true);
  };

  const closeModal = () =>
  {
    setShowModal(false);
  };

  const handleOutsideClick = (e) =>
  {
    if (e.target === modalRef.current)
    {
      closeModal();
    }
  };

  return (
    <div className="my-5">
      <h3 className="text-sans-h3 ">Imágenes para la galería</h3>
      <p className="text-sans-h5">(Máximo 10 imágenes)</p>

      <div className="grid-container">
        {imageURLs.map((url, index) => (
          <div key={index} className="image-container-fixed">
            <img className="upload-image-fixed" src={url} alt={`Img ${index}`} />
            <div className="overlay-sm">
              <button className="btn-borderless-white  d-flex align-content-center mx-3 my-3 px-3" onClick={() => openModal(index)}>
                <i className="material-symbols-outlined mx-1">visibility</i>Ver
              </button>
              <button className="btn-borderless-white d-flex align-content-center mx-3 mb-4 pb-3 px-3"  onClick={() => handleDelete(index)}>
                <i className="material-symbols-outlined mx-1">delete</i>Borrar
              </button>
            </div>
          </div>
        ))}

        {imageURLs.length < 10 && (
          <div className="img-section-s " onDrop={handleImageChange} onDragOver={(e) => e.preventDefault()}>
            <label htmlFor="formMultiFile">
              <div className=" d-flex  flex-column align-items-center">
                <i className="material-symbols-rounded">add_a_photo</i>
                <p className="text-sans-p">Agregar fotos</p>
              </div>
              <input
                style={{ display: 'none' }}
                type="file"
                id="formMultiFile"
                multiple
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </div>

      {showModal && (
        <div ref={modalRef} className="modal-uploadImg" onClick={handleOutsideClick}>
          <div className="modalImg-content">
            <button type="button" onClick={closeModal} className="btn-close btn-close-img" data-bs-dismiss="modal" aria-label="Close"></button>
            <img src={currentImg} alt="Modal view" className="img-modal" />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImgsm;

