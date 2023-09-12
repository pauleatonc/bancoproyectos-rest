import { useState, useRef, useEffect } from 'react';
import ImageModal from '../Commons/modal';

const Carrusel = ({ imgPortada, imgGeneral, context }) => {
  const miniContainerRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hiddenThumbnailsCount, setHiddenThumbnailsCount] = useState(0);

  let imgArray = [imgPortada];

  if (Array.isArray(imgGeneral)) {
    imgArray = [...imgArray, ...imgGeneral.map(img => img.image)];
  }

  useEffect(() => {
    const miniContainer = miniContainerRef.current;
    const thumbnails = Array.from(miniContainer.querySelectorAll('.miniatura'));

    const updateHiddenThumbnails = () => {
      const miniaturaStyles = getComputedStyle(thumbnails[0]);
      const miniaturaWidth = thumbnails[0].offsetWidth + parseFloat(miniaturaStyles.marginLeft) + parseFloat(miniaturaStyles.marginRight);
      const containerWidth = miniContainer.offsetWidth;
      const visibleThumbnailsCount = Math.floor(containerWidth / miniaturaWidth);
    
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
      {/* Portada */}
      <div className="col-10 d-none d-md-block img-portada my-4 d-flex justify-content-center">
        <a data-bs-toggle="modal" data-bs-target={`#imageModal-${context}`} onClick={() => setSelectedImageIndex(0)}>
          <img className="img-fluid" src={imgPortada} />
        </a>
      </div>

      {/* Miniaturas */}
      <div className="container-fluid container-md mini-container d-flex flex-wrap justify-content-center" ref={miniContainerRef}>
        {imgArray.map((image, index) => (
          <div className={`m-1 m-md-2 miniatura`} key={index}>
            <a data-bs-toggle="modal" data-bs-target={`#imageModal-${context}`} onClick={() => setSelectedImageIndex(index)}>
              <img className="miniatura" src={image} alt={`Thumbnail ${index}`} />
              {index === imgArray.length - hiddenThumbnailsCount -1 && hiddenThumbnailsCount > 0 && (
                <div className="thumbnail-counter-overlay">+{hiddenThumbnailsCount}</div>
              )}
            </a>
          </div>
        ))}

        <ImageModal 
        img={imgArray} 
        selectedImageIndex={selectedImageIndex} 
        setSelectedImageIndex={setSelectedImageIndex} 
        context={context}
        />
      </div>
    </div>
  );
};

export default Carrusel;