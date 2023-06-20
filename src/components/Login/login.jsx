import '../../styles/Users/login.css'
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    rut: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí agregar la lógica para enviar los datos al backend cuando esté listo
    console.log('Enviar datos de inicio de sesión:', formData);
    // Resto del código para manejar la respuesta del backend
  };

  return (
    <div id='loginContainer'>
      <h2 className='title'>Portal Banco de Proyectos</h2>
      <h3 className='subtitle'>Requiere credenciales otorgadas por la Subdere</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='rut'></label>
          <input
            className='loginInput'
            placeholder='Ingresa tu RUT'
            type='text'
            id='rut'
            name='rut'
            value={formData.rut}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'></label>
          <input
            className='loginInput'
            placeholder='Ingresa tu contraseña'
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button id='loginButton' type="submit">Ingresar al portal</button>
      </form>
      <h3 className="text">¿No tienes credenciales para ingresar al Banco de Proyectos? <br />
      Debes solicitarlas en tu municipalidad.</h3>
    </div>
  );
};

export default Login;