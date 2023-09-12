const SelectorLateral = ({ data }) => {
  return (
    <div className="d-flex flex-column">
      {data.map((practice) => (
        <button
          key={practice.id}
          className="btn-secundario-l text-decoration-underline text-start"
        >
          {practice.title}
        </button>
      ))}
    </div>
  );
};

export default SelectorLateral;