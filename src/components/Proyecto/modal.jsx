const ImageModal = ({img, selectedImageIndex, setSelectedImageIndex}) => {
  const handleModalClose = () => {
    setSelectedImageIndex(0); // Reinicia el indice al cerrar el modal
  }

  return (
    <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
          </div>
          <div className="modal-body">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" key={selectedImageIndex}>
            <div className="carousel-inner">
              {img.map((image, index) => (
                <div className={`carousel-item ${index === selectedImageIndex ? 'active' : ''}`} key={index}>
                  <img className="d-block w-100" src={image} alt={`Image ${index}`} />
                </div>
              ))}
            </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
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