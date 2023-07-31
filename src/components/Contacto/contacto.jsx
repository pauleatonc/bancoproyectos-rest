import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    reason: '',
    comment: ''
  });

  const [formErrors, setFormErrors] = useState({
    fullNameError: '',
    emailError: '',
    organizationError: '',
    reasonError: '',
    commentError: ''
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullNameError: '',
      emailError: '',
      organizationError: '',
      reasonError: '',
      commentError: ''
    };

    if (formData.fullName.trim() === '') {
      errors.fullNameError = 'Por favor, introduce tu nombre completo.';
      isValid = false;
    }

    if (formData.email.trim() === '') {
      errors.emailError = 'Por favor, introduce tu correo electrónico.';
      isValid = false;
    }

    if (formData.organization.trim() === '') {
      errors.organizationError = 'Por favor, introduce tu organización.';
      isValid = false;
    }

    if (formData.reason.trim() === '') {
      errors.reasonError = 'Por favor, indica la razón de tu contacto.';
      isValid = false;
    }

    if (formData.comment.trim() === '') {
      errors.commentError = 'Por favor, deja un comentario.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí enviar los datos al backend
      console.log('Formulario válido. Enviar datos al backend:', formData);
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form 
        id='formularioContacto'
        onSubmit={handleSubmit}>
      <div className='inputFormulario'>
        <label htmlFor='fullName'>Nombre Completo (Obligatorio)</label>
        <input
          className='campo'
          type='text'
          id='fullName'
          name='fullName'
          placeholder='Ingresa tu nombre.'
          value={formData.fullName}
          onChange={handleChange}
        />
        {formErrors.fullNameError && <span>{formErrors.fullNameError}</span>}
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
        <label htmlFor='reason'>Razón de contacto (Obligatorio)</label>
        <select
            className='campo'
            id='reason'
            name='reason'
            value={formData.reason}
            onChange={handleChange}>
            <option value=''>Elije una opción</option>
            <option value='opcion1'>Opción 1</option>
            <option value='opcion2'>Opción 2</option>
            <option value='opcion3'>Opción 3</option>
        </select>
        {formErrors.reasonError && <span>{formErrors.reasonError}</span>}
      </div>
      <div className='inputFormulario'>
        <label htmlFor='comment'>Comentario (Obligatorio)</label>
        <textarea
        className='campocomentario'
          id='comment'
          name='comment'
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        {formErrors.commentError && <span>{formErrors.commentError}</span>}
      </div>
      <div className="contadorCaracteres">
    ({formData.comment.length}/250)
  </div>
      <button className='btn' type='submit'>Enviar</button>
    </form>
  );
};

export default ContactForm;