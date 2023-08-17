import { useState, useRef } from 'react';
import ImageModal from './modal';

const Carrusel = ({ imgPortada, imgGeneral }) => {
  const miniContainerRef = useRef(null); // Referencia al contenedor de miniaturas.
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Estado para almacenar el índice de la imagen seleccionada

  const imgArray = [imgPortada, ...imgGeneral.map(img => img.image_carousel)];
  
  return (
    <div className="container text-center mb-md-5">
      {/* Imagen portada */}
      <div className=" d-none d-md-block img-portada my-4">
        <div className=" d-flex justify-content-center">
          <img src={imgPortada} />
        </div>
      </div>

      {/* Miniaturas */}
      <div className="container mini-container d-flex flex-wrap justify-content-center" ref={miniContainerRef}>
        {imgArray.map((image, index) => (
          <div className="m-1" key={index}>
            <a data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => setSelectedImageIndex(index)}>
              <img className="miniatura" src={image} alt={`Thumbnail ${index}`} />
              {console.log(index)}
            </a>
          </div>
        ))}

        {/* Modal  */}
        <ImageModal img={imgArray} selectedImageIndex={selectedImageIndex} setSelectedImageIndex={setSelectedImageIndex}/>
      </div>
    </div>
  );
};
    
export default Carrusel;