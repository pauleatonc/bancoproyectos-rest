

export const NavbarUser = () => {
  return (
    <div className="d-flex justify-content-end me-5 w-100 sticky-top">
      <div className="align-self-center mx-2 text-sans-h5">
        <span >Hola, $userName</span>
      </div>
        <a className="btn-open mx-2 my-2 " href="/" target="_blank" ><u>Volver a Banco de Proyectos</u><i className="material-symbols-outlined mx-2" id="">
open_in_new
</i></a>
        <button className="btn-logout mx-2 my-2"><u>Cerrar Sesión</u><i className="material-symbols-outlined">
logout
</i></button>
    </div>
  )
}
