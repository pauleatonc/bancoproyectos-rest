import CategoriasProyecto from "../../components/Home/categorias";
import BuscadorProyectos from "../../components/Home/buscadorproyectos";
import Intro
 from "../../components/Home/intro";
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
