import { useState, useEffect, useRef } from 'react';

const Carrusel = () => {
  const [hiddenThumbnails, setHiddenThumbnails] = useState(0);
  const miniContainerRef = useRef(null);

  useEffect(() => {
    const miniContainer = miniContainerRef.current;

    const updateHiddenThumbnails = () => {
      if (miniContainer) {
        const miniaturaStyles = window.getComputedStyle(miniContainer.firstElementChild);
        const miniaturaWidth = miniContainer.firstElementChild.offsetWidth + parseFloat(miniaturaStyles.marginLeft) + parseFloat(miniaturaStyles.marginRight);
        const containerWidth = miniContainer.offsetWidth;
        const visibleThumbnailsCount = Math.floor(containerWidth / miniaturaWidth);
        const totalThumbnailsCount = miniContainer.children.length;
        const hiddenThumbnailsCount = totalThumbnailsCount - visibleThumbnailsCount;
        setHiddenThumbnails(hiddenThumbnailsCount);
      }
    };

    updateHiddenThumbnails();
    window.addEventListener('resize', updateHiddenThumbnails);

    return () => {
      window.removeEventListener('resize', updateHiddenThumbnails);
    };
  }, []);
  
  return (
    <div className="container text-center">
      {/* Imagen portada */}
      <div className="row d-none d-lg-block img-portada my-4">
        <div className="col d-flex justify-content-center">
          <div className="img-proyecto col-lg-7">Portada</div>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="container mini-container d-flex flex-wrap justify-content-center" ref={miniContainerRef}>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
        </div>
      </div>

      {hiddenThumbnails > 0 && (
        <p>{hiddenThumbnails} miniaturas ocultas</p>
      )}

    </div>

    

  );
};
    
export default Carrusel;