import { useState } from 'react';

export default function UploadImg()
{
  const [ imageURL, setImageURL ] = useState(null);

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

  return (
    <div
      className="img-section-xl my-3"
      onDrop={handleImageChange}
      onDragOver={onDragOver}
    >
      <label htmlFor="formFile">
        {!imageURL && (
          <div className="img-section-xl">
            <i className="material-symbols-rounded me-2">add_a_photo</i>
            <span className="form-label">Agregar foto de portada</span>
          </div>
        )}
        <input
          className="text-sans-p"
          style={{ display: 'none' }}
          type="file"
          id="formFile"
          onChange={handleImageChange}
        />
        {imageURL && (
          <div className="image-container">
            <img
              className="upload-image "
              src={imageURL}
              alt="Portada"
            />
            <div className="overlay">
              <button className="btn-borderless-white d-flex align-content-center mx-3" onClick={() => alert('Ver imagen')}>
                <i className="material-symbols-outlined mx-1">
                  visibility
                </i>Ver</button>
              <button className="btn-borderless-white d-flex align-content-center mx-3" onClick={handleDelete}><i className="material-symbols-outlined mx-1">
                delete
              </i>Borrar</button>
            </div>
          </div>
        )}
      </label>
    </div>
  );
}