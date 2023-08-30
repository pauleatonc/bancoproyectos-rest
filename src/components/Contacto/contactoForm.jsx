import useContactForm from '../../hooks/useContactForm';
import apiCreatecontact from '../../services/home/createContact';

const ContactForm = () => {

  const submitForm = async (formData) => {
    try {
        const response = await apiCreatecontact.post('/', formData);
        if (response.status === 200) {
            console.log('Form data submitted successfully:', response.data);
            // You can add additional logic here, e.g., showing a success message, redirecting, etc.
        } else {
            console.log('Failed to submit form data:', response.data);
        }
    } catch (error) {
        console.error('Error submitting form data:', error);
        // Handle errors appropriately, e.g., showing an error message to the user.
    }
  };

  const {
      formData,
      formErrors,
      handleChange,
      handleSubmit
  } = useContactForm(submitForm);

  return (
    <div className="d-flex justify-content-center mt-4 mb-5">
      <form id="formularioContacto" className="col-12 col-md-8 col-lg-5 p-3 p-md-0" onSubmit={handleSubmit}>

        <div className="d-flex flex-column input-container">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="full_name">Nombre Completo (Obligatorio)</label>
          <input
            className="input-s px-3"
            type="text"
            id="full_name"
            name="full_name"
            placeholder="Ingresa tu nombre."
            value={formData.full_name}
            onChange={handleChange}
          />
          {formErrors.full_nameError && <span>{formErrors.full_nameError}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="email">Correo electrónico institucional (Obligatorio)</label>
          <input
            className="input-s px-3"
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu correo electrónico."
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.emailError && <span>{formErrors.emailError}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="organization">Organización a la que perteneces (Obligatorio)</label>
          <input
            className="input-s px-3"
            type="text"
            id="organization"
            name="organization"
            placeholder="Ingresa el nombre de tu organización."
            value={formData.organization}
            onChange={handleChange}
          />
          {formErrors.organizationError && <span>{formErrors.organizationError}</span>}
        </div>

        <div className="d-flex flex-column mt-2">
          <label className="text-sans-p px-3" htmlFor="contact_reason">Razón de contacto (Obligatorio)</label>
          <select
              className="custom-select px-3"
              id="contact_reason"
              name="contact_reason"
              value={formData.contact_reason}
              onChange={handleChange}>
              <option value="">Elije una opción</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="consulta">Consulta por programa</option>
              <option value="documento">Falta un documento</option>
              <option value="falla">Falla en la plataforma</option>
          </select>
          {formErrors.contact_reasonError && <span>{formErrors.contact_reasonError}</span>}
        </div>

        <div className="d-flex flex-column input-container mt-4">
          <label className="text-sans-p input-label ms-3 ms-sm-0" htmlFor="message">Comentario (Obligatorio)</label>
          <textarea
            className="input-l p-3"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe la razón de contacto."
          ></textarea>
          {formErrors.messageError && <span>{formErrors.messageError}</span>}
        </div>

        <div className="text-sans-h5 text-end opacity-50 mt-1">
          {formData.message.length} / 250 palabras
        </div>
        <div className="container d-flex justify-content-center">
          <button className="btn-principal-l mt-3" type="submit">Enviar</button>
        </div>
      </form>
    </div>
    
  );
};

export default ContactForm;