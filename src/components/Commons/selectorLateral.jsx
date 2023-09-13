const SelectorLateral = ({ data, onGoodPracticeSelect }) => {
  return (
    <div className="d-flex flex-column">
      {data.map((practice) => (
        <button
          key={practice.id}
          className="btn-secundario-l text-decoration-underline text-start"
          onClick={() => onGoodPracticeSelect(practice)}
        >
          {practice.title}
        </button>
      ))}
    </div>
  );
};

export default SelectorLateral;