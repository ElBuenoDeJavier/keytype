import React, { Component } from 'react';
//importo la función de generar palabras
import { generate } from './randomwords2/index';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      palabras: generate(40).join(' '),//genera 40 palabras con la funcion de la api
      entradaUsuario: '',//tiene la entrada del usuario
      tiempo: 30,// guarda el tiempo del contador
      intervalo: null,//guarda el objeto del intervalo
      contador: false,//variable booleana para comprobar que está activo el contador
    }
  }

  //función que reinicia las palabras generadas, la entrada del usuario y el contador
  //también limpia el intervalo
  reiniciar(){
    let words = generate(40).join(' ');
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
      }
    }, 1000);
    this.setState({ intervalo: nuevoIntervalo });    
  }
  //Calcula los aciertos, errores y escritos
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

  render(){
    return (
      <div className='bg-gray-950 font-mono items-center h-screen w-screen flex justify-center'>
        <div className="w-9/12 h-8/12 relative">
            <Contador tiempoRestante={this.state.tiempo}/>
            <ReinicioBoton reiniciar={this.reiniciar.bind(this)}/>
            <div className='relative mt-3 leading-relaxed inset-0 text-4xl break-all'>
              <GenerarPalabras words={this.state.palabras} className='absolute inset-0'/>
              <InputUsuario className='absolute inset-0 ' entradaUsuario={this.state.entradaUsuario} handleInputChange={this.handleInputChange} 
              palabras={this.state.palabras}/>
            </div>
            <Resultados calcularEstadisticas = {this.calcularEstadisticas.bind(this)} contador={this.state.contador}/>
          </div>
    </div>
    )
  }
}

// Componente que genera las palabras
function GenerarPalabras(props){
  return(
      <span className="text-gray-700">{props.words}</span>
    )
}
function Contador({tiempoRestante}){
  return(
    //Aqui muestro el tiempo restante
    <h2 className="text-indigo-800 text-4xl text-center">{tiempoRestante} s</h2>
  )  
}
function ReinicioBoton({reiniciar}){
  return(
    <button onClick={reiniciar}>
      <svg className="h-8 w-8 text-indigo-800 hover:text-indigo-600" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  
    strokeLinejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
    
    </button>
  )
}
//Muestra los resultados de los aciertos, errores y caracteres escritos
function Resultados({calcularEstadisticas ,contador}){
  if(contador == false){
  return(
    <ul className='text-3xl text-gray-600 text-center'>
       <h2 className="text-indigo-800 text-3xl">Resultados:</h2>
       <li>Letras acertadas: {calcularEstadisticas().aciertos}</li>
       <li>Errores cometidos: {calcularEstadisticas().errores}</li>
       <li>Caracteres escritos: {calcularEstadisticas().escritos}</li>
    </ul>
  )
  }
}

// Para entrada de usuario
function InputUsuario({entradaUsuario, handleInputChange, palabras}){
  const entradaCaracteres = entradaUsuario.split('');
  const palabrasCaracteres = palabras.split('');

  return(
    <span className='absolute inset-0'>
      <input type="text" value={entradaUsuario} onChange={handleInputChange} className="opacity-0 absolute inset-0" autoFocus/>
      
      {entradaCaracteres.map((caracter, clave) => {
        // me comprueba si el caracter que escribo es igual al de palabras
        const correcto = palabrasCaracteres[clave] == caracter;
        return (
          // le pasa a Caracter el caracter y si es correcto o no
          <Caracter caracter={palabrasCaracteres[clave]} correcto={correcto}/>
        )
      })}
      <Cursor/>

    </span>
  )
}

function Caracter({caracter, correcto}){
  return(
    //Auí muestro el caracter y si es correcto pues se pone en blanco y si no en rojo con fondo rojo
    // si tiene un espacio en blanco y no es correcto se pone un guón bajo para que se vea el error
    //utilizo un span con un nbsp para que se vea el espacio en blanco
    
    <span className={`leading-relaxed break-all ${correcto ? 'text-white' : 'text-red-600'}`}>
      {caracter == " " && !correcto ? <span className='underline'>&nbsp;</span> : caracter}</span>
  )
}
function Cursor(){
  return(
    <span className='inline-block animate-pulse bg-indigo-800 w-0.5 h-7'></span>
  )
}

export default App
