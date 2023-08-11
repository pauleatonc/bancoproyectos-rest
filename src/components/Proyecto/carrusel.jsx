const Carrusel = () => {
    return (
      <div className="container text-center">
        {/* Imagen portada */}
        <div className="row d-none d-lg-block img-portada my-4">
          <div className="col d-flex justify-content-center">
            <div className="img-proyecto col-lg-7">Portada</div>
          </div>
        </div>
        {/* Miniaturas */}
        <div className="row">
          <div className="col border border-secondary">
            <div className="miniatura">img1</div>
          </div>
          <div className="col border border-secondary">
            <div className="miniatura">img2</div>
          </div>
          <div className="col border border-secondary">
            <div className="miniatura">img3</div>
          </div>
          <div className="col border border-secondary">
            <div className="miniatura">img4</div>
          </div>
          <div className="col border border-secondary">
            <div className="miniatura">img5</div>
          </div>
          <div className="col border border-secondary">
            <div className="miniatura">img6</div>
          </div>
        </div>
        
      </div>
    );
  };
    
  export default Carrusel;