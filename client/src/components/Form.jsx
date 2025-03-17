import React, { Component } from 'react';
import { data } from 'react-router-dom';

export default class Form extends Component {
  constructor(props){
      super(props)
      this.state = {
        mostrarLogin: true,
        nombre: '',
        email: '',
        password: '',
      }
  }
  
  setMostrarLoginFalse = ()=>{
    this.setState({ mostrarLogin : false });
  }

  setMostrarLoginTrue = ()=>{
    this.setState({mostrarLogin : true});
  }

  // Para establecer cada valor del formulario al estado
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  //Controlar el envio
  handleSubmit = async (e) => {
    // EVITAR EL COMPORTAMIENTO POR DEFECTO
    e.preventDefault();
    // PARA ACCEDER A LA RUTA DE MI BACKEND DONDE ESTA MI ROUTE
    const endpointRegister = 'http://localhost:5050/usuario/register';
    const endpointLogin = 'http://localhost:5050/usuario/login';
    // OBTENGO LOS VALORES DEL ESTADO EN ESTAS CONSTANTES
    const { nombre, email, password, mostrarLogin } = this.state;
    // Para saber si estoy registrando o iniciando sesion
    const body = mostrarLogin ? { email, password } : { name: nombre, email, password };

    // Hago la peticion con la api fetch si es registro
    if(!mostrarLogin){
      try {
        const response = await fetch(endpointRegister, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        //Si la respuesta no es true me devuelve la excepcion con el error
        if (response.ok){
          //Si la respuesta es ok, muestro un mensaje de inicio de sesion correcto o de registro
          if(mostrarLogin) alert('Inicio de sesión exitoso');
          else alert('Usuario registrado exitosamente');
        }else{
          // LA RESPUESTA NO ES CORRECTA, hay algun problema al crearlo
          console.error(data.message); 
          // Mostrar el mensaje de error
          alert(data.message);
        }
        

      } catch (error) {
        // Si hay algun error lo capturo
        console.error('Error:', error);
        alert('Error:'+ error);
      }
  }else{ // ES INICIO DE SESION
    try {
      const response = await fetch(endpointLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      //OBTIENE LOS DATOS DE RESPUESTA
      const data = await response.json();

      if (response.ok) {
        console.log("Usuario autenticado:", data.user);
        // Realiza cualquier acción adicional, como redirigir al usuario a otra página
        // AQUI DEBERIA REDIRIGIR AL USUARIO A LA PAGINA DEL USUARIO Y SUS ESTADISTICAS
        alert('Inicio de sesion correcto para ',data.user.name);
        this.props.iniciarSesion();
        //Guardo en el estado la informacion del usuario
        this.props.setDataUsuario(data.user);
      } else {
        console.error(data.message); 
        // Mostrar el mensaje de error
        alert(data.message);
      }

    } catch (error) {
      // Si hay algun error lo capturo
      console.error('Error:', error);
      alert('Error:'+ error);
    }
  }
  };


  render(){
  if(this.state.mostrarLogin === true){
  return (
    <div className='grid justify-center mt-30'>
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-xl text-center">
      <form onSubmit={this.handleSubmit}>
      <legend className="fieldset-legend text-4xl font-extrabold bg-gradient-to-bl from-purple-500 to-indigo-800 bg-clip-text text-transparent leading-normal">Login</legend>
      
      <label className="fieldset-label">Email</label>
      <input id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            required className="input" placeholder="Email" />

      <label className="fieldset-label">Password</label>
      <input id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required className="input" placeholder="Password" />
      
      <button  type="submit" className="btn btn-neutral mt-4">Login</button><br />
      <a className='text-indigo-700 hover:text-indigo-500 flex justify-center mt-5' onClick={this.setMostrarLoginFalse}>Registra una cuenta</a>
      </form>
    </fieldset>
    <button onClick={this.props.volverInicio} className='cursor-pointer underline mt-10 hover:text-indigo-600'>Volver</button>
    </div>
    );
    }else{
      return (
        <div className='grid justify-center mt-30'>
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-xl text-center">
        <form onSubmit={this.handleSubmit}>
        <legend className="fieldset-legend text-4xl font-extrabold bg-gradient-to-bl from-purple-500 to-indigo-800 bg-clip-text text-transparent leading-normal">Register</legend>
        
        <label className="fieldset-label">Nombre</label>
        <input id="nombre"
              name="nombre"
              type="text"
              value={this.state.nombre}
              onChange={this.handleChange}
              required className="input" placeholder="Nombre" />

        <label className="fieldset-label">Email</label>
        <input id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              required className="input" placeholder="Email" />

        <label className="fieldset-label">Password</label>
        <input id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required className="input" placeholder="Password" />
        
        <button  type="submit" className="btn btn-neutral mt-4">Registrarse</button><br />
        <a className='text-indigo-700 hover:text-indigo-500 flex justify-center mt-5' onClick={this.setMostrarLoginTrue}>Inicia sesión</a>
        </form>
        </fieldset>
        <button onClick={this.props.volverInicio} className='cursor-pointer underline mt-10 hover:text-indigo-600'>Volver</button>
        </div>
        );
    }
  }
}