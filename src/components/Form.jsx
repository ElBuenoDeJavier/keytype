import React, { Component } from 'react';

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
        body: JSON.stringify(body)
      });
      //OBTIENE LOS DATOS DE RESPUESTA
      const data = await response.json();

      if (response.ok) {
        console.log("Usuario autenticado:", data.user);
        // Realiza cualquier acción adicional, como redirigir al usuario a otra página
        // AQUI DEBERIA REDIRIGIR AL USUARIO A LA PAGINA DEL USUARIO Y SUS ESTADISTICAS
        alert('USUARIO AUTENTICADO: '+data.user.name+data.user.email+data.user.password);
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
    <div className="flex justify-center items-center min-h-full flex-1 px-6 py-12 lg:px-8 text-4xl">
      <div className="flex space-x-8">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8 text-4xl rounded-lg shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center font-bold tracking-tight text-white">
              Accede a tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-2xl font-medium text-white">
                  Correo electrónico
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-2xl font-medium text-white">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-3xl font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Inicia sesión
                </button>
                <a className='text-indigo-600 hover:text-indigo-400 text-2xl flex justify-center mt-5' onClick={this.setMostrarLoginFalse}>Registra una cuenta</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
    }else{
      return (
        <div className="flex justify-center items-center min-h-full flex-1 px-6 py-12 lg:px-8 text-4xl">
          <div className="flex space-x-8">
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8 text-4xl rounded-lg shadow-md">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center font-bold tracking-tight text-white">
                  Crea una cuenta
                </h2>
              </div>
    
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={this.handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block text-2xl font-medium text-white">
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={this.state.nombre}
                        onChange={this.handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-2xl font-medium text-white">
                      Correo electrónico
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
    
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-2xl font-medium text-white">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
    
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-3xl font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Registrarse
                    </button>
                    <a className='text-indigo-600 hover:text-indigo-400 text-2xl flex justify-center mt-5' onClick={this.setMostrarLoginTrue}>Inicia sesión</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        );
    }
  }
}