import { useState } from 'react';
import ImageModal from '../../components/Commons/modal'; 

const MiniaturasCarousel = ({ img }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-start">
        {img.map((image, index) => (
          <div className={`img-s m-1`} key={index} onClick={() => handleThumbnailClick(index)}>
            <img className="img-s" src={image} alt={`miniatura ${index+1}`} />
          </div>
        ))}
      </div>

      {showModal && (
        <ImageModal
          img={img}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default MiniaturasCarousel;