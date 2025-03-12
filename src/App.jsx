import React, { Component } from 'react';
//importo la función de generar palabras
import Header from './components/Header';
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
      //Para mostrar el div del login
      mostrarlogin: false,
      mostrarjuego: true,
      mostrarestadisticas: false,
      mostrarConfigUsuario: false,
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
  establecerTiempo(event){
    return(
      this.setState({tiempo : event.target.value})
    )
  }

  //PARA ESTABLECER EL NUMERO DE PALABRAS
  establecerPalabras = (event)=>{
    this.setState({palabras : generarPalabrasAleatorias(event.target.value)});
  }

  //PARA ESTABLECER EL NUMERO DE PALABRAS
  pulsarBotonLogin (){
    this.setState({mostrarlogin : true, mostrarjuego: false, mostrarestadisticas: false, mostrarConfigUsuario: false,});
  }

  //Mostrar el juego si pulsas el logo
  pulsarLogo (){
    this.setState({mostrarlogin : false, mostrarjuego: true, mostrarestadisticas: false, mostrarConfigUsuario: false,});
  }

  // OBTENER DATOS DEL USUARIO EN FORMATO JSON
  setDataUsuario(data){
    this.setState({dataUsuario : data});
  }

  cerrarSesion(){
    this.setState({dataUsuario: false, mostrarConfigUsuario: false, mostrarjuego: true});
  }
  // PARA GUARDAR LAS ESTADÍSTICAS
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      //Si la respuesta no es true me devuelve la excepcion con el error
      if (response.ok){
        alert('Se han guardado tus estadísticas');
        //Para reiniciar los valores de los aciertos, errores y escritos
        // Y que no se muestren por pantalla
        this.setState({aciertos:0,errores:0,escritos:0});
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
  }

  //LO QUE SE MUESTRA
  render(){
    return (
      <div>
      <Header 
      contador={this.state.contador} 
      pulsarBotonLogin={this.pulsarBotonLogin.bind(this)} 
      pulsarLogo={this.pulsarLogo.bind(this)}
      //Para poner el estado a true y mostrar las estadísticas
      pulsarEstadisticas={()=>this.setState({mostrarestadisticas : true, mostrarlogin: false, mostrarjuego: false, mostrarConfigUsuario: false,})}
      pulsarUsuario={()=>this.setState({mostrarestadisticas : false, mostrarlogin: false, mostrarjuego: false, mostrarConfigUsuario: true,})}
      dataUsuario={this.state.dataUsuario}
      />
      
      <div className='font-mono items-center h-screen w-screen flex justify-center'>
        
        <MostrarJuego 
        mostrarlogin={this.state.mostrarlogin} 
        mostrarestadisticas={this.state.mostrarestadisticas} 
        mostrarjuego={this.state.mostrarjuego}
        mostrarConfigUsuario={this.state.mostrarConfigUsuario}
        contador={this.state.contador}
        teclaPresionada={this.state.teclaPresionada}>
            <OpcionesJuego 
            contador={this.state.contador}
            establecerTiempo={this.establecerTiempo.bind(this)} 
            establecerPalabras={this.establecerPalabras}/>
            <Contador tiempoRestante={this.state.tiempo}/><br />
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
            
            <Resultados 
            aciertos = {this.state.aciertos} 
            errores={this.state.errores} 
            escritos={this.state.escritos} 
            contador={this.state.contador}
            guardarEstadisticas={this.guardarEstadisticas.bind(this)}
            />
            
          </MostrarJuego>
          
          <MostrarLogin 
          mostrarlogin={this.state.mostrarlogin} 
          mostrarestadisticas={this.state.mostrarestadisticas} 
          mostrarjuego={this.state.mostrarjuego} 
          mostrarConfigUsuario={this.state.mostrarConfigUsuario}>
              <Form setDataUsuario={this.setDataUsuario.bind(this)}/>
          </MostrarLogin>
          
          <MostrarEstadisticas 
          mostrarlogin={this.state.mostrarlogin} 
          mostrarestadisticas={this.state.mostrarestadisticas} 
          mostrarjuego={this.state.mostrarjuego} 
          mostrarConfigUsuario={this.state.mostrarConfigUsuario}>
              <Estadisticas/>
          </MostrarEstadisticas>

          <ConfigUsuario 
          dataUsuario={this.state.dataUsuario}

          mostrarlogin={this.state.mostrarlogin} 
          mostrarestadisticas={this.state.mostrarestadisticas} 
          mostrarjuego={this.state.mostrarjuego} 
          mostrarConfigUsuario={this.state.mostrarConfigUsuario}
          
          cerrarSesion={this.cerrarSesion.bind(this)}/>
      </div>
    </div>
    )
  }
}

export default App
