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
            <div id='resumenContainer'>
                <h5 className='resumen'>PMU</h5>
                <h5 className='resumen'>2018</h5>
                <h5 className='resumen'>Plazas y Áreas Verdes</h5>
            </div>
            <button id='btnMas'>Ver más</button>
        </div>
    );
  };
  
  export default ProyectoCard;