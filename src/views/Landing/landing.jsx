import CategoriasProyecto from "../../components/Landing/categorias";
import BuscadorProyectos from "../../components/Landing/buscadorproyectos";
import Intro
 from "../../components/Landing/intro";
const Home = () => {
    return (
      <>
        <BuscadorProyectos />
        <CategoriasProyecto />
        <Intro />
      </>
    );
  };
  
  export default Home;
