const BuscadorProyectos = () => {
    return (
        <div className="container col-md-4 d-flex flex-column my-md-4">
            <p className="text-center my-4">Accede al buscador de proyectos escribiendo palabras clave</p>
            <form className="search mx-auto col my-3 my-md-4" action="" method="GET">
                <input className="form-control " type="text" name="search" placeholder="Texto demo" aria-label="Texto demo" aria-describedby="searchAction"/>
                <div className="search-action">
                    <button className="btn btn-outline-search" id="searchAction" type="submit"><i className="icon cl cl-search"></i></button>
                </div>
            </form>
        </div>
    );
  };
  
  export default BuscadorProyectos;