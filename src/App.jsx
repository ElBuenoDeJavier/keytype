import React, { Component } from 'react';
import { generate } from './randomwords2/index';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      palabras: generate(25).join(' '),
      entradaUsuario: ''
    }
  }

  reiniciar(){
    let words = generate(25).join(' ');
    this.setState({palabras: words, entradaUsuario: ''});
  }

  handleInputChange = (event) => {
    this.setState({ entradaUsuario: event.target.value });
  }

  render(){
    return (
      <div className='bg-black items-center h-screen w-screen flex justify-center'>
        <div className="w-9/12 h-8/12 relative">
          <h1 className="text-white font-bold text-5xl text-center mb-10">Typing Game ⌨️🎮 </h1><br />
          <Contador tiempoRestante={30}/>
          <ReinicioBoton reiniciar={this.reiniciar.bind(this)}/>
          <div className='relative mt-3  leading-relaxed break-all mb-10'>
            <GenerarPalabras  className='absolute inset-0' words={this.state.palabras}/>
            <InputUsuario 
              className='absolute inset-0' 
              entradaUsuario={this.state.entradaUsuario} 
              handleInputChange={this.handleInputChange}
              palabras={this.state.palabras}
            />
          </div>
          <Resultados aciertos={100} errores={10} escritos={25}/>
        </div>
      </div>
    )
  }
}

// Componente que genera las palabras
function GenerarPalabras(props){
  return(
    <div>
      <p className="text-gray-700 text-5xl">{props.words}</p>
    </div>
  )
}

// Tiempo para jugar
function Contador({tiempoRestante}){
  return(
    <h2 className="text-purple-800 text-5xl text-center">Tiempo: {tiempoRestante}</h2>
  )
}

function ReinicioBoton(props){
  return(
    <button onClick={props.reiniciar}>
      <svg className="h-8 w-8 text-purple-800 hover:text-purple-500" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  
    strokeLinejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
    </button>
  )
}

function Resultados(props){
  return(
    <ul className='text-center text-3xl text-gray-600'>
       <h2 className="text-purple-800 text-5xl text-center">Resultados:</h2>
       <li>Aciertos: {props.aciertos}</li>
       <li>Errores: {props.errores}</li>
       <li>Escritos: {props.escritos}</li>
    </ul>
  )
}

// Para entrada de usuario
function InputUsuario({entradaUsuario, handleInputChange, palabras}){
  const entradaCaracteres = entradaUsuario.split('');
  const palabrasCaracteres = palabras.split('');

  return(
    <div className='absolute inset-0'>
      <input type="text" value={entradaUsuario} onChange={handleInputChange} className="opacity-0 absolute inset-0" autoFocus/>
      {entradaCaracteres.map((caracter, clave) => {
        // me comprueba si el caracter que escribo es igual al de palabras
        const correcto = palabrasCaracteres[clave] == caracter;
        
        return (
          // le pasa a Caracter el caracter y si es correcto o no
          <Caracter caracter={palabrasCaracteres[clave]} correcto={correcto}/> 
        )
      })}
    </div>
  )
}

function Caracter({caracter, correcto}){
  return(
    //Auí muestro el caracter y si es correcto pues se pone en blanco y si no en rojo con fondo rojo
    // si tiene un espacio en blanco y no es correcto se pone un guón bajo para que se vea el error
    //utilizo un span con un nbsp para que se vea el espacio en blanco
    <span className={`text-5xl ${correcto ? 'text-white ' : 'text-red-600'}`}>{caracter == ' ' && !correcto ? <span className=' bg-red-600'>&nbsp;</span> : caracter}</span>
  )
}

export default App
