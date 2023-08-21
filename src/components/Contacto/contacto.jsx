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
    <form 
        id='formularioContacto'
        onSubmit={handleSubmit}>
      <div className='inputFormulario'>
        <label htmlFor='full_name'>Nombre Completo (Obligatorio)</label>
        <input
          className='campo'
          type='text'
          id='full_name'
          name='full_name'
          placeholder='Ingresa tu nombre.'
          value={formData.full_name}
          onChange={handleChange}
        />
        {formErrors.full_nameError && <span>{formErrors.full_nameError}</span>}
      </div>
      <div className='inputFormulario'>
        <label htmlFor='email'>Correo electrónico institucional (Obligatorio)</label>
        <input
          className='campo'
          type='email'
          id='email'
          name='email'
          placeholder='Ingresa tu correo electrónico.'
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.emailError && <span>{formErrors.emailError}</span>}
      </div>
      <div className='inputFormulario'>
        <label htmlFor="organization">Organización a la que perteneces (Obligatorio)</label>
        <input
          className='campo'
          type='text'
          id='organization'
          name='organization'
          placeholder='Ingresa el nombre de tu organización.'
          value={formData.organization}
          onChange={handleChange}
        />
        {formErrors.organizationError && <span>{formErrors.organizationError}</span>}
      </div>
      <div className='inputFormulario'>
        <label htmlFor='contact_reason'>Razón de contacto (Obligatorio)</label>
        <select
            className='campo'
            id='contact_reason'
            name='contact_reason'
            value={formData.contact_reason}
            onChange={handleChange}>
            <option value=''>Elije una opción</option>
            <option value='sugerencia'>Sugerencia</option>
            <option value='consulta'>Consulta por programa</option>
            <option value='documento'>Falta un documento</option>
            <option value='falla'>Falla en la plataforma</option>
        </select>
        {formErrors.contact_reasonError && <span>{formErrors.contact_reasonError}</span>}
      </div>
      <div className='inputFormulario'>
        <label htmlFor='message'>Comentario (Obligatorio)</label>
        <textarea
        className='campocomentario'
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {formErrors.messageError && <span>{formErrors.messageError}</span>}
      </div>
      <div className="contadorCaracteres">
    ({formData.message.length}/500)
  </div>
      <button className='btn' type='submit'>Enviar</button>
    </form>
  );
};

export default ContactForm;