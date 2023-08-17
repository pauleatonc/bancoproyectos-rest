import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({img, selectedImageIndex, setSelectedImageIndex}) => {
  const handleModalClose = () => {
    setSelectedImageIndex(0); // Reinicia el indice al cerrar el modal
  }

  const imageIndicator = `${selectedImageIndex + 1} de ${img.length}`;

  return (
    <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border border-secondary">
          <div className="modal-header d-flex justify-content-end">
            <button type="button" className=" custom-close-button" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
              Cerrar <FontAwesomeIcon icon={faTimes}/>
            </button>
          </div>
          <div className="modal-body">
            <div id="carouselExampleControls" className="carousel slide"  key={selectedImageIndex}>
            <div className="carousel-inner">
              {img.map((image, index) => (
                <div className={`carousel-item ${index === selectedImageIndex ? 'active' : ''}`} key={index}>
                  <img className="d-block w-100" src={image} alt={`Image ${index}`} />
                </div>
              ))}
            </div>

            <div className="image-indicator">{imageIndicator}</div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-btn carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-btn carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;