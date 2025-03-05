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
  //LO QUE SE MUESTRA
  render(){
    return (
      <div className='bg-gray-950'>
      <Header contador={this.state.contador}/>
      <div className='font-mono items-center h-screen w-screen flex justify-center'>
        
        <div className="w-7/12 h-8/12 absolute">
            <OpcionesJuego contador={this.state.contador}
            establecerTiempo={this.establecerTiempo.bind(this)} establecerPalabras={this.establecerPalabras}/>
            <Contador tiempoRestante={this.state.tiempo}/>
            <ReinicioBoton reiniciar={this.reiniciar.bind(this)} contador={this.state.contador}/>
            <div className='relative mt-3 leading-relaxed inset-0 text-3xl break-all'>
              <GenerarPalabras words={this.state.palabras} className='absolute inset-0'/>
              <InputUsuario className='absolute inset-0 ' entradaUsuario={this.state.entradaUsuario} handleInputChange={this.handleInputChange} 
              palabras={this.state.palabras}/>
            </div>
            <Resultados aciertos = {this.state.aciertos} errores={this.state.errores} escritos={this.state.escritos} contador={this.state.contador}/>
          </div>
      </div>
    </div>
    )
  }
}

export default App
