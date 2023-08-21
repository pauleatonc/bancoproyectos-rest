import { useState } from 'react';


const useContactForm = (submitForm) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        organization: '',
        contact_reason: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        full_nameError: '',
        emailError: '',
        organizationError: '',
        contact_reasonError: '',
        messageError: ''
    });

    const validateForm = () => {
        let isValid = true;
        const errors = {
          full_nameError: '',
          emailError: '',
          organizationError: '',
          contact_reasonError: '',
          messageError: ''
        };
    
        if (formData.full_name.trim() === '') {
          errors.full_nameError = 'Por favor, introduce tu nombre completo.';
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
    
        if (formData.contact_reason.trim() === '') {
          errors.contact_reasonError = 'Por favor, indica la razón de tu contacto.';
          isValid = false;
        }
    
        if (formData.message.trim() === '') {
          errors.messageError = 'Por favor, deja un comentario.';
          isValid = false;
        }
    
        setFormErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await submitForm(formData);
            // Resetea el formulario
             setFormData({
                 full_name: '',
                 email: '',
                 organization: '',
                 contact_reason: '',
                 message: ''
             });
        } else {
            console.log('Formulario inválido. Por favor, completa todos los campos.');
        }
    };

    return {
        formData,
        formErrors,
        setFormErrors,
        validateForm,
        handleChange,
        handleSubmit
    };
};

export default useContactForm;