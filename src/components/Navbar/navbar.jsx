import { Link } from 'react-router-dom';
import "../../static/styles/navbar.css";

const Navbar = () =>{  
    return (
    <>
        <div id="barraGris"></div> 
        <nav id="navbar" className="navbar navbar-light navbar-expand-lg navbar-lines">
            <div className="cols-12-extended column ml-3  mr-5">
                {/* logo subdere */}
                <Link to="/">
                    <div className="col-8">
                        <div id="lineContainer">
                            <div id="lineBlue" />
                            <div id="lineRed" />
                        </div>
                        <p id="logoSubdere">Subsecretaría de Desarrollo Administrativo y Regional</p>
                    </div>
                </Link>


                {/* colapsable accesibilidad */}
                <div className="toolbar align-items-end my-2 d-sm-block d-md-none">
                    <a className="toolbar-btn toolbar-behavior-contrast" href="#"><i className="cl cl-contrast"></i></a>
                    <div className="toolbar-btn-group">
                        <a className="toolbar-btn toolbar-behavior-decrease" href="#"><i className="cl cl-decrease-text"></i></a>
                        <a className="toolbar-btn toolbar-behavior-increase" href="#"><i className="cl cl-increase-text"></i></a>
                    </div>
                    <a className="toolbar-btn toolbar-toggler ml-1" href="#"><i className="cl cl-accessibility toolbar-behavior-on"></i><span className="toolbar-behavior-off">X</span></a>
                </div>
            </div>

            <button className="navbar-toggler text-gray-600" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <u>Menú</u>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mx-md-5 my-md-3 mx-4">
                    {/* botones accesibilidad */}
                    <li className="d-none d-lg-block nav-item">
                        <div className="toolbar with-read-speaker">
                            <a className="btnAccesibilidadM toolbar-behavior-contrast" href="#"><i className="cl cl-contrast"></i></a>
                            <div className="toolbar-btn-group d-flex flex-row">
                                <a className="btnAccesibilidadM toolbar-behavior-decrease" href="#"><i className="cl cl-decrease-text"></i></a>
                                <a className="btnAccesibilidadM toolbar-behavior-increase mx-1" href="#"><i className="cl cl-increase-text"></i></a>
                            </div>

                            <div className="d-none d-lg-block toolbar-player toolbar-behavior-read rs_skip rsbtn-gobcl-skin" id="readspeaker_button1">
                                <a rel="nofollow" accessKey="L" href="#">
                                    <span className="rsbtn_left rsimg rspart">
                                    <span className="btnEscuchar rsbtn_text d-flex align-items-center p-1">
                                        <div className="toolbar-btn-icon-content mx-1">
                                        <em className="cl cl-sound"></em>
                                        </div>
                                        <span className="mx-2">Escuchar</span>
                                    </span>
                                    </span>
                                    <span className="rsbtn_right rsimg rsplay rspart"></span>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="toolbar-btn-group d-flex flex-row mx-2 text-center">
                            <a className="d-none d-lg-block btnAccesibilidadS toolbar-behavior-decrease text-uppercase text-underline" href="#">en</a>
                            <a className="d-none d-lg-block btnAccesibilidadS toolbar-behavior-increase mx-1" href="#"><i className="cl cl-login"></i></a>
                        </div>
                        <button className="btnIniciarsesion ml-4" type="button"><i className="cl cl-claveunica"/> <span className="text-underline mx-1">Iniciar sesión</span></button>
                    </li>
                </ul>

                <div className="d-flex justify-content-end">
                    {/* Botones RRSS */}
                    <div className="d-flex align-items-center m-2">
                        <div className="d-none d-lg-block doc-icon m-2"> <span className="cl cl-youtube text-dark"></span> </div>
                        <div className="d-none d-lg-block doc-icon m-2"> <span className="cl cl-facebook text-dark"></span> </div>
                        <div className="d-none d-lg-block doc-icon m-2"> <span className="cl cl-twitter text-dark"></span> </div>
                        <div className="d-none d-lg-block doc-icon m-2"> <span className="cl cl-messenger text-dark"></span> </div> 
                    </div>
                    {/* Buscador */}
                    <form className="search col-6 my-3 my-md-4" action="" method="GET">
                        <input className="buscador form-control" type="text" name="search" placeholder="Texto demo" aria-label="Texto demo" aria-describedby="searchAction"/>
                        <div className="search-action">
                            <button className="btn btn-outline-search" id="searchAction" type="submit"><i className="icon cl cl-search"></i></button>
                        </div>
                    </form>
                </div>

                {/* Navegacion */}
                <div className="container mx-md-auto mx-lg-auto mx-xl-auto d-flex flex-column flex-md-row">
                    <Link to="/" className="link text-black text-underline mx-md-3"> Inicio </Link>
                    <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Banco de Proyectos </Link>
                    <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
                    <Link to="/bancodeproyectos" className="link text-black text-underline mx-md-3"> Type something </Link>
                    <Link to="/contacto" className="link text-black text-underline mx-md-3">Contacto</Link>
                </div>

            </div>
        </nav>
    </>
    );
};

export default Navbar;