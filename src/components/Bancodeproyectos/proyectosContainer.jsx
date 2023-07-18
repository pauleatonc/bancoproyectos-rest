import ProyectoCard from "./proyectoCard";

const ProyectosContainer = () => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <ProyectoCard />
            <ProyectoCard />
            <ProyectoCard />
        </div>
    );
  };
  
  export default ProyectosContainer;