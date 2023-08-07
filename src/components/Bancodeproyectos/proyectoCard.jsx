
const ProyectoCard = () => {
  return (
    <div className="proyect-card my-3">
      <div className="card-img mt-2"></div>

      <div className="d-flex flex-row justify-content-between p-3">
        <p className="text-sans-h5 text-muted">Región: Araucanía</p>
        <p className="text-sans-h5 text-muted">Comuna: Cholol</p>
      </div>

      <p className="text-serif-h2 text-decoration-underline ml-3 mb-3 mx-3">Paneles Solares para sectores aislados en Cholchol</p>
      <p className="text-sans-p mx-3">El presente proyecto busca mejorar la calidad de vida de los beneficiarios por intermedio del 
      suministro de energía eléctrica de sistema ...
      </p>

      <div className="container d-flex justify-content-between">
        <p className="tag p-1">PMU</p>
        <p className="tag p-1">2018</p>
        <p className="tag p-1">Plazas y Áreas Verdes</p>
      </div>
      <div className="d-flex justify-content-end p-3">
        <button className="font-level-4 btn-principal-s text-decoration-underline px-3">Ver más &gt; </button>
      </div>
    </div>
  );
};
  
export default ProyectoCard;