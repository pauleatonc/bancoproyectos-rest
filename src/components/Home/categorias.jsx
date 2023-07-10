import { Link } from "react-router-dom";

const CategoriasProyecto = () => {
    return (
        <>
            <h1 className='homeH1'>Categorías principales</h1>
            <section id='catsContainer'>
                <Link to='/contacto'>
                <div className='catContainer'>
                    <div className='simbolo'></div>
                    <h3 className='homeH3'>Programa  Mejoramiento Urbano</h3>
                </div>
                </Link>
                <Link to='/contacto'>
                <div className='catContainer'>
                    <div className='simbolo'></div>
                    <h3 className='homeH3'>Programa  Mejoramiento de Barrios</h3>
                </div>
                </Link>
                <Link to='/contacto'>
                <div className='catContainer'>
                    <div className='simbolo'></div>
                    <h3 className='homeH3'>Ver todos los proyectos</h3>
                </div>
                </Link>
            </section>
        </>
    );
  };
  
  export default CategoriasProyecto;