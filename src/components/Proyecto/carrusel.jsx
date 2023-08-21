import { useState, useRef, useEffect } from 'react';
import ImageModal from './modal';

const Carrusel = ({ imgPortada, imgGeneral }) => {
  const miniContainerRef = useRef(null); // Referencia al contenedor de miniaturas.
  const thumbnailsRef = useRef([]); // Referencia a las miniaturas individuales.
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Estado para almacenar el índice de la imagen seleccionada.
  const [hiddenThumbnailsCount, setHiddenThumbnailsCount] = useState(0); // Almacena conteo de miniaturas ocultas.

  const imgArray = [imgPortada, ...imgGeneral.map(img => img.image_carousel)];

  useEffect(() => {
    const miniContainer = miniContainerRef.current;
    const thumbnails = Array.from(miniContainer.querySelectorAll('.miniatura'));
    thumbnailsRef.current = thumbnails;

    const updateHiddenThumbnails = () => {
      const miniaturaStyles = getComputedStyle(thumbnails[0]);
      const miniaturaWidth = thumbnails[0].offsetWidth + parseFloat(miniaturaStyles.marginLeft) + parseFloat(miniaturaStyles.marginRight);
      const containerWidth = miniContainer.offsetWidth;
      const visibleThumbnailsCount = Math.floor(containerWidth / miniaturaWidth);
    
      thumbnails.forEach((thumbnail) => {
        const counterElement = thumbnail.querySelector('.thumbnail-counter');
        if (counterElement) {
          thumbnail.classList.remove('visible');
          counterElement.textContent = '';
        }
      });
    
      for (let i = 0; i < visibleThumbnailsCount; i++) {
        const thumbnail = thumbnails[i];
        if (thumbnail) {
          thumbnail.classList.add('visible');
        }
      }
    
      setHiddenThumbnailsCount(Math.max(0, imgArray.length - visibleThumbnailsCount));
    };

    updateHiddenThumbnails();
    window.addEventListener('resize', updateHiddenThumbnails);

    return () => {
      window.removeEventListener('resize', updateHiddenThumbnails);
    };
  }, [imgArray.length]);

  return (
    <div className="container text-center mb-md-5 d-flex flex-column align-items-center">
      {/* Imagen portada */}
      <div className="col-10 d-none d-md-block img-portada my-4 d-flex justify-content-center">
        <img className="img-fluid" src={imgPortada} /> 
      </div>

      <div className="thumbnail-counter d-none d-md-block border border-primary p-4">+{hiddenThumbnailsCount}</div>

      {/* Miniaturas */}
      <div className="container-fluid container-md mini-container d-flex flex-wrap justify-content-center" ref={miniContainerRef}>
        {imgArray.map((image, index) => (
          <div className={`m-1 m-md-2 miniatura`} key={index}>
            <a data-bs-toggle="modal" data-bs-target="#imageModal" onClick={() => setSelectedImageIndex(index)}>
              <img className="miniatura" src={image} alt={`Thumbnail ${index}`} />
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