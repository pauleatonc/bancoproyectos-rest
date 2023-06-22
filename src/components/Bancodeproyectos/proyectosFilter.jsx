import '../../styles/Bancodeproyectos/proyectosFilter.css'

const FiltroProyectos = () => {
    return (
      <div id='filterContainer'>
        <h2>Filtrar</h2>
        <button>Limpiar filtro</button>
        <h4>¿En qué programa se está el proyecto que buscas?</h4>
        <h5>Puedes elegir más de uno.</h5>
        <section id='programasSection'>
            <div className='programaContainer'>
                <div className='circle'></div>
                <h5>Programa  Mejoramiento Urbano</h5>
            </div>
            <div className='programaContainer'>
                 <div className='circle'></div>
                 <h5>Programa  Mejoramiento de Barrios</h5>
            </div>
        </section>
        <div className='linea'></div>
        <section id='selectoresSection'>
            <label>¿En qué región?</label>
            <select>
                <option value=''>Elije una opción</option>
                <option value='region1'>Region 1</option>
                <option value='region2'>Region 2</option>
                <option value='region3'>Region 3</option>
            </select>
            <label>¿En que comuna?</label>
            <select>
                <option value=''>Elije una opción</option>
                <option value='comuna1'>Comuna 1</option>
                <option value='comuna2'>Comuna 2</option>
                <option value='comuna3'>Comuna 3</option>
             </select>
        </section>
        <div className='linea'></div>
        <h4>¿Qué tipo de proyecto es?</h4>
        <section id='tiposSection'>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Plazas y Áreas Verdes</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Infraestructura Deportiva</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Centros de Salud</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Luminarias</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Reciclaje</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Energía</h5>
            </div>
            <div className='tipoContainer'>
                <div className='circle'></div>
                <h5>Desarrollo Técnológico</h5>
            </div>
        </section>
        <div className='linea'></div>
        <h4>¿Qué años de construcción quieres ver?</h4>
        <section>
            <input type='checkbox' />
            <label>2019</label> <br />
            <input type='checkbox' />
            <label>2020</label> <br />
            <input type='checkbox' />
            <label>2021</label>
        </section>
        <button id='filterBtn'>Mostrar resultados</button>

      </div>
    );
  };
  
  export default FiltroProyectos;