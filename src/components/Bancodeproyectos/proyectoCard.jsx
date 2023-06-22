import '../../styles/Bancodeproyectos/proyectoCard.css'

const ProyectoCard = () => {
    return (
        <div id='proyectoContainer'>
            <div id='foto'>foto</div>
            <div id='pie'>
                <h6>Region:</h6>
                <h6>Comuna:</h6>
            </div>
            <h4 className='titulo'>Mejoramiento Integral Plaza El Olivar</h4>
            <h5 className='descripcion'>El permanente crecimiento de la comuna ha llevado a un 
                desarrollo desigual con carencia en servicios de 
                equipamiento e infraestructura ...
            </h5>
            <div>
                <h7>PMU</h7>
                <h7>2018</h7>
                <h7>Plazas y Áreas Verdes</h7>
            </div>
            <button id='btnMas'>Ver más</button>
        </div>
    );
  };
  
  export default ProyectoCard;