import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import withNavigate from './withNavigate';
import Header from './components/Header';
//importo la función que genera mis palabras aleatorias
import GenerarPalabras from './components/GenerarPalabras';
import Contador from './components/Contador';
import InputUsuario from './components/InputUsuario';
import ReinicioBoton from './components/ReinicioBoton';
import Resultados from './components/Resultados';
import { generarPalabrasAleatorias } from './palabrasAleatorias/generador';
import OpcionesJuego from './components/OpcionesJuego';
import MostrarJuego from './components/MostrarJuego';
import MostrarLogin from './components/MostrarLogin';
import ConfigUsuario from './components/ConfigUsuario';
import Form from './components/Form';
import MostrarEstadisticas from './components/MostrarEstadisticas';
import Estadisticas from './components/Estadisticas';
import SalirJuego from './components/SalirJuego';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      palabras: generarPalabrasAleatorias(40),//genera 40 palabras
      entradaUsuario: '',//tiene la entrada del usuario
      tiempo: 30,// guarda el tiempo del contador
      intervalo: null,//guarda el objeto del intervalo
      contador: false,//variable booleana para comprobar que está activo el contador
      //resultados
      aciertos: 0,
      errores: 0,
      escritos: 0,
      //DATOS DEL USUARIO
      dataUsuario: false,
    }
  }

  //función que reinicia las palabras generadas, la entrada del usuario y el contador
  //también limpia el intervalo
  reiniciar(){
    let words = generarPalabrasAleatorias(40);
    this.setState({palabras: words, entradaUsuario: '', tiempo: 30});
    clearInterval(this.state.intervalo);
  }

  // Cada vez que se pulsa una tecla se activa la función y comprueba si el contador
  // está activo si no lo está llama a la función comenzarContador y establece el contador a true
  // establece en entradaUsuario el valor del input para que se vea por pantalla
  handleInputChange = (event) => {
    if(!this.state.contador){
      this.comenzarContador();
      this.setState({ contador: true });
    }
    if(this.state.entradaUsuario.length == this.state.palabras.length){
      let words = generarPalabrasAleatorias(40);
      this.setState({palabras: words, entradaUsuario: ''});
    }
    if(this.state.tiempo != 0 && this.state.entradaUsuario.length < this.state.palabras.length){
      this.setState({ entradaUsuario: event.target.value });
    }
  }

  //Con un set interval resta 1 al tiempo, comprueba si el tiempo es 0
  // si es 0 borra el intervalo y establece, tiempo a 30 otra vez y contador a false
  comenzarContador(){
    const nuevoIntervalo = setInterval(() => {
      this.setState((prevState) => ({ tiempo: prevState.tiempo - 1 }));
      if (this.state.tiempo === 0) {
        clearInterval(nuevoIntervalo);
        this.setState({ tiempo: 30, contador: false, intervalo: null });
        //guardar estadisticas en el state
        const { aciertos, errores, escritos } = {...this.calcularEstadisticas()};
        this.setState({aciertos:aciertos,errores:errores,escritos:escritos});
        //volver a generar texto y limpiar la entrada del usuario
        let words = generarPalabrasAleatorias(40);
        this.setState({palabras: words, entradaUsuario: ''});
      }
    }, 1000);
    this.setState({ intervalo: nuevoIntervalo });    
  }

  salirJuego(){
    this.setState({intervalo: null, contador: false, tiempo: 0,});
  }
  //Calcula los aciertos, errores y escritos en tiempo real
  calcularEstadisticas(){
    //obtengo la entrada del usuario y las palabras originales y la divido por espacios en un array caracteres
    const entradaCaracteres = this.state.entradaUsuario.split('');
    const palabrasCaracteres = this.state.palabras.split('');
    // compruebo los errores y aciertos con un filter y un length para obtener el número de elementos del array devuelto
    const errores = entradaCaracteres.filter((caracter, index) => palabrasCaracteres[index] != caracter).length;
    const aciertos = entradaCaracteres.filter((caracter, index) => palabrasCaracteres[index] == caracter).length;
    const escritos = entradaCaracteres.length;
    return { aciertos, errores, escritos };
  }

  //PARA ESTABLECER EL TIEMPO CON LA BOTONERA
  //El valor que se le pasa como parámetro se guardará en el state de tiempo
  establecerTiempo(event){
    return(
      this.setState({tiempo : event.target.value})
    )
  }

  //PARA ESTABLECER EL NUMERO DE PALABRAS
  //El valor que se le pasa como parámetro se guardará en el state de palabras
  establecerPalabras = (event)=>{
    this.setState({palabras : generarPalabrasAleatorias(event.target.value)});
  }

  // GUARDAR DATOS DEL USUARIO EN FORMATO JSON
  setDataUsuario(data){
    this.setState({dataUsuario : data});
  }
  //Funcion que se llamará cuando se haya iniciado sesión para que redirija a inicio
  iniciarSesion(){
    this.props.navigate('/');
  }

  cerrarSesion(){
    this.setState({dataUsuario: false});
    this.props.navigate('/');
  }

  // CONSULTA AL SERVIDOR PARA GUARDAR LAS ESTADÍSTICAS EN LA BASE DE DATOS
  guardarEstadisticas = async () => {
    // PARA ACCEDER A LA RUTA DE MI BACKEND DONDE ESTA MI ROUTE
    const endpoint = 'http://localhost:5050/puntuacion/add';
    // OBTENGO LOS VALORES DEL ESTADO EN ESTAS CONSTANTES
    const dataUsuario = this.state.dataUsuario;
    const aciertos = this.state.aciertos;
    const errores = this.state.errores;
    const escritos = this.state.escritos;
    // CREO EL BODY CON LOS DATOS QUE VOY A ENVIAR
    const body = {aciertos, errores, escritos, dataUsuario };

    // Hago la peticion con la api fetch si es registro
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        //Significa que devolverá un json
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      //Si la respuesta no es true me devuelve la excepcion con el error
      if (response.ok){
        // SE MUESTRA UN ALERT PARA INDICAR QUE HE GUARDADO LA INFORMACIÓN
        alert('Información guardada correctamente.');
        //Como ya se ha guardado se reinician los valores del state a 0 para que no sigan
        //apareciendo por pantalla
        this.setState({aciertos:0,errores:0,escritos:0});
      }else{
        // LA RESPUESTA NO ES CORRECTA, hay algun problema al crearlo
        console.error(data.message); 
        // Mostrar el mensaje de error en un alert
        alert(data.message);
      }
    } catch (error) {
      // Si hay algun error en la petición lo capturo
      console.error('Error:', error);
      alert('Error:'+ error);
    }
  }

  render(){
    return (
      <div>
        <Header 
          //Para controlar que no está iniciado el contador y poder mostrar el header
          contador={this.state.contador} 
          //cuando pulsas el botón de login te lleva a la página de login
          pulsarBotonLogin={() => this.props.navigate('/login')} 
          //para volver a la página de inicio
          pulsarLogo={() => this.props.navigate('/')}
          //Para poner el estado a true y mostrar las estadísticas
          pulsarEstadisticas={() => this.props.navigate('/estadisticas')}
          pulsarUsuario={() => this.props.navigate('/configuracion')}
          dataUsuario={this.state.dataUsuario}
        />
        
        <div className='font-mono items-center h-screen w-screen flex justify-center'>
          <Routes>
            <Route exact path="/" element={
              <MostrarJuego>
                <OpcionesJuego 
                  contador={this.state.contador}
                  establecerTiempo={this.establecerTiempo.bind(this)} 
                  establecerPalabras={this.establecerPalabras}/>
                <Contador tiempoRestante={this.state.tiempo}/>
                <ReinicioBoton 
                  reiniciar={this.reiniciar.bind(this)} 
                  contador={this.state.contador}/>
                
                <div className='relative mt-3 leading-relaxed inset-0 text-3xl break-all'>
                  <GenerarPalabras 
                    words={this.state.palabras} 
                    className='absolute inset-0'/>
                  
                  <InputUsuario 
                    className='absolute inset-0 ' 
                    entradaUsuario={this.state.entradaUsuario} 
                    handleInputChange={this.handleInputChange} 
                    palabras={this.state.palabras}/>
                </div>
                
                <SalirJuego 
                  salirJuego={this.salirJuego.bind(this)}
                  contador={this.state.contador}/>
                
                <Resultados 
                  aciertos = {this.state.aciertos} 
                  errores={this.state.errores} 
                  escritos={this.state.escritos} 
                  contador={this.state.contador}
                  guardarEstadisticas={this.guardarEstadisticas.bind(this)}
                />
              </MostrarJuego>
            } />
            <Route path="/login" element={
              <MostrarLogin>
                <Form 
                  setDataUsuario={this.setDataUsuario.bind(this)}
                  iniciarSesion={this.iniciarSesion.bind(this)}
                  volverInicio={() => this.props.navigate('/')}
                />
              </MostrarLogin>
            } />
            <Route path="/estadisticas" element={
              <MostrarEstadisticas>
                <Estadisticas volverInicio={() => this.props.navigate('/')}/>
              </MostrarEstadisticas>
            } />
            <Route path="/configuracion" element={
              <ConfigUsuario 
                dataUsuario={this.state.dataUsuario}
                cerrarSesion={this.cerrarSesion.bind(this)}
                volverInicio={() => this.props.navigate('/')}
              />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default withNavigate(App);
