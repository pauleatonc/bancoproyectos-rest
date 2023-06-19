import "../../styles/Error/errorMsj.css";
import { Link } from 'react-router-dom';

const Error404msj = () => {
    return (
        <>
            <h1 className='errorTitle'>Página no encontrada.</h1>
            <h3 className='errorh3'>Código de error: 404 - No encontrado.</h3>
            <h2 className='errorh2'>Sentimos no haber encontrado la página que buscabas. Es posible que 
                <strong> haya cambiado de ubicación, haya sido eliminada o no exista.</strong>
            </h2>
            <ul>
                <li className='errorh2'>Si escribiste la dirección, revisa que no haya errores de escritura.</li>
                <li className='errorh2'>Si copiaste y pegaste la dirección, revisa si copiaste la dirección completa.</li>
            </ul>
            <h2 className='errorh2'>Si crees que esto se puede tratar de un error de la plataforma, 
                <Link to="/contacto" className='errorlink'> ingresa un formulario de contacto </Link> 
                explicando la situación, así podremos derivarla al área correspondiente.
            </h2>
        </>
    );
  };
  
  export default Error404msj;