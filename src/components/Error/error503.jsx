const Error503msj = () => {
    return (
        <>
            <h1 className='errorTitle'>Servicio no disponible temporalmente.</h1>
            <h3 className='errorh3'>Código de error: 500 - Servicio no disponible.</h3>
            <h2 className='errorh2'>La plataforma se encuentra en mantenimiento y 
                <strong> ha sido desactivada temporalmente</strong>
                . Sentimos los inconvenientes que esto pueda haber 
                provocado. Podrás volver a ingresar el $Date.
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
  
  export default Error503msj;