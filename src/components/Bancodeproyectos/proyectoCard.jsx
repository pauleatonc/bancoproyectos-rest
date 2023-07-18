import "../../static/styles/proyectoCard.css"

const ProyectoCard = () => {
    return (
        <div className="card my-3">
            <div >foto</div>
            <div >
                <h6>Region:</h6>
                <h6>Comuna:</h6>
            </div>
            <h4 className="">Mejoramiento Integral Plaza El Olivar</h4>
            <h5 className="">El permanente crecimiento de la comuna ha llevado a un 
                desarrollo desigual con carencia en servicios de 
                equipamiento e infraestructura ...
            </h5>
            <div>
                <h5>PMU</h5>
                <h5>2018</h5>
                <h5>Plazas y Áreas Verdes</h5>
            </div>
            <button >Ver más</button>
        </div>
    );
  };
  
  export default ProyectoCard;