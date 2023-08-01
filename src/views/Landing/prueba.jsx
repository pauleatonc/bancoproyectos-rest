import BuscadorProyectos from "../../components/Commons/buscadorproyectos";
import "../../static/styles/landing.css"

import { useEffect, useState } from 'react';

import { getAllRegionComunas } from '../../api/RegionComuna/regioncomuna.api';

const Home = () => {
  const [regionComunas, setRegionComunas] = useState([]);

  useEffect(() => {
    async function loadRegionComuna(){
        const res = await getAllRegionComunas();
        setRegionComunas(res.data);
    }
    loadRegionComuna();
  }, []);

  return (
    <>

        {regionComunas.map(comuna =>(
            <div>
                <h4>{comuna.comuna}</h4>
                <p>{comuna.region.region}</p>
            </div>
        ))}


    </>
  );
};
  
  export default Home;
