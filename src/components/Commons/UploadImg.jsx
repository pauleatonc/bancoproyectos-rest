import { useState, useRef } from 'react';

export default function UploadImg()
{
  const [ imageURL, setImageURL ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const modalRef = useRef(null);

  const handleImageChange = (e) =>
  {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const file = files[ 0 ];
    if (file)
    {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const onDragOver = (e) =>
  {
    e.preventDefault();
  };

  const handleDelete = () =>
  {
    setImageURL(null);
  };

  const openModal = () =>
  {
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
    <div
      className="img-section my-3"
      onDrop={handleImageChange}
      onDragOver={onDragOver}
    >
      {!imageURL ? (
        <label htmlFor="formFile">
          <div className="">
            <i className="material-symbols-rounded me-2">add_a_photo</i>
            <span className="form-label">Agregar foto de portada</span>
          </div>
          <input
            className="text-sans-p"
            style={{ display: 'none' }}
            type="file"
            id="formFile"
            onChange={handleImageChange}
          />
        </label>
      ) : (
        <div className="image-container">
          <img className="upload-image" src={imageURL} alt="Portada" />
          <div className="overlay">
            <button className="btn-borderless-white  d-flex align-content-center mx-3 px-3" onClick={openModal}>
              <i className="material-symbols-outlined mx-1">visibility</i>Ver
            </button>
            <button className="btn-borderless-white d-flex align-content-center mx-3 px-3" onClick={handleDelete}>
              <i className="material-symbols-outlined mx-1">delete</i>Borrar
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div ref={modalRef} className="modal-uploadImg" onClick={handleOutsideClick}>
          <div className="modalImg-content">
            <button type="button" onClick={closeModal} className="btn-close btn-close-img" data-bs-dismiss="modal" aria-label="Close"></button>
            <img src={imageURL} alt="Modal view" className="img-modal" />
          </div>
        </div>
      )}
    </div>
  );
}