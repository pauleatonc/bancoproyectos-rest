import useContactForm from '../../hooks/useContactForm';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    errors
  } = useContactForm();

  return (
    <div className="d-flex justify-content-center mt-4 mb-5">
      <form id="formularioContacto" className="col-12 col-md-8 col-lg-5 p-3 p-md-0" onSubmit={handleSubmit}>

        <div className="d-flex flex-column input-container">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="full_name">Nombre Completo (Obligatorio)</label>
          <input
            {...register('full_name')}
            className="input-s px-3"
            type="text"
            id="full_name"
            placeholder="Ingresa tu nombre."
          />
          {errors.full_name && <span>{errors.full_name.message}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="email">Correo electrónico institucional (Obligatorio)</label>
          <input
            {...register('email')}
            className="input-s px-3"
            type="email"
            id="email"
            placeholder="Ingresa tu correo electrónico."
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="organization">Organización a la que perteneces (Obligatorio)</label>
          <input
            {...register('organization')}
            className="input-s px-3"
            type="text"
            id="organization"
            placeholder="Ingresa el nombre de tu organización."
          />
          {errors.organization && <span>{errors.organization.message}</span>}
        </div>

        <div className="d-flex flex-column mt-2">
          <label className="text-sans-p px-3" htmlFor="contact_reason">Razón de contacto (Obligatorio)</label>
          <select
            {...register('contact_reason')}
            className="custom-select px-3"
            id="contact_reason">
            <option value="">Elige una opción</option>
            <option value="sugerencia">Sugerencia</option>
            <option value="consulta">Consulta por programa</option>
            <option value="documento">Falta un documento</option>
            <option value="falla">Falla en la plataforma</option>
          </select>
          {errors.contact_reason && <span>{errors.contact_reason.message}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="message">Comentario (Obligatorio)</label>
          <textarea
            {...register('message')}
            className="input-l p-3"
            id="message"
            placeholder="Describe la razón de contacto."
          ></textarea>
          {errors.message && <span>{errors.message.message}</span>}
        </div>

        <div className="text-sans-h5 text-end opacity-50 mt-1">
        </div>
        <div className="container d-flex justify-content-center">
          <button className="btn-principal-l mt-3" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;