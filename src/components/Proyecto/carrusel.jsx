import { useEffect, useRef } from 'react';
import ImageModal from './modal';

const Carrusel = () => {
  const miniContainerRef = useRef(null); // Referencia al contenedor de miniaturas.
  const thumbnailsRef = useRef([]); // Referencia a las miniaturas individuales.

  useEffect(() => {
    // Obtiene referencia al contenedor de miniaturas.
    const miniContainer = miniContainerRef.current;
    // Selecciona todas las mini y las guarda en la referencia.
    const thumbnails = Array.from(miniContainer.querySelectorAll('.miniatura'));
    thumbnailsRef.current = thumbnails;

    // Funcion para actualizar contador de miniaturas ocultas.
    const updateHiddenThumbnails = () => {
      // Obtiene el estilo de la primera mini para calcular su tamano.
      const miniaturaStyles = getComputedStyle(thumbnails[0]);
      const miniaturaWidth = thumbnails[0].offsetWidth + parseFloat(miniaturaStyles.marginLeft) + parseFloat(miniaturaStyles.marginRight);
      // Calcula el ancho del contenedor y la cantidad de mini visibles.
      const containerWidth = miniContainer.offsetWidth;
      const visibleThumbnailsCount = Math.floor(containerWidth / miniaturaWidth);

      // Limpia los contadores individuales de todas las mini.
      thumbnails.forEach((thumbnail) => {
        const counterElement = thumbnail.querySelector('.thumbnail-counter');
        if (counterElement) {
          counterElement.textContent = '';
        }
      });

      // Calcula cantidad total de mini y mini ocultas.
      const totalThumbnailsCount = thumbnails.length;
      const hiddenThumbnailsCount = totalThumbnailsCount - visibleThumbnailsCount;

      // Muestra contador en ultima mini visible, en caso de haber mini ocultas.
      if (hiddenThumbnailsCount > 0) {
        const lastVisibleIndex = visibleThumbnailsCount - 1;
        const lastVisibleThumbnail = thumbnails[lastVisibleIndex];
        const counterElement = lastVisibleThumbnail.querySelector('.thumbnail-counter');
        if (counterElement) {
          counterElement.textContent = '+' + hiddenThumbnailsCount;
        }
      }
    };

    // Actualiza contadores al cargar pagina o redimensionar ventana.
    updateHiddenThumbnails();
    window.addEventListener('resize', updateHiddenThumbnails);

    return () => {
      window.removeEventListener('resize', updateHiddenThumbnails);
    };
  }, []);
  
  return (
    <div className="container text-center mb-md-5">
      {/* Imagen portada */}
      <div className="row d-none d-md-block img-portada my-4">
        <div className="col d-flex justify-content-center">
          <div className="img-proyecto col-lg-10">Portada</div>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="container mini-container d-flex flex-wrap justify-content-center" ref={miniContainerRef}>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imageModal">
            View Image
          </button>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imageModal">
            View Image
          </button>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
        <div className="miniatura m-1">
          <div>img</div>
          <div className="thumbnail-counter d-none d-md-block"></div>
        </div>
      </div>

      {/* Modal  */}
      < ImageModal imagenUrl="../static/img/que_es_1.png"/>

    </div>
  );
};
    
export default Carrusel;