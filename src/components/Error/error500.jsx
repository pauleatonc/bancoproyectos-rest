const Error500msj = () => {
    return (
        <>
            <h1 className='errorTitle'>Problemas con la plataforma.</h1>
            <h3 className='errorh3'>Código de error: 500 - Error interno del servidor</h3>
            <h2 className='errorh2'>La plataforma está presentando 
                <strong> problemas inesperados</strong>
                . El sistema envió una notificación con este error a la 
                administración de la plataforma. Sentimos los inconvenientes que esto pueda haber provocado.    
            </h2>
            <h2 className='errorh2'>Si te encontrabas ingresando información o llenando formularios,  
                <strong> no ha sido posible guardar tus respuestas. </strong>
                Cuando la plataforma vuelva a estar disponible, deberás hacerlo nuevamente.
            </h2>
            <h2 className='errorh2'>Te puedes contactar con la SUBDERE al teléfono de mesa central: 
                <strong> (2) 2 636 36 00</strong>
            </h2>
        </>
    );
  };
  
  export default Error500msj;