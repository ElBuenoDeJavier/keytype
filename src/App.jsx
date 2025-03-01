import React from 'react'
import { generate } from './randomwords2/index'
import { Component } from 'react';
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      //Genera 25 palabras en un array y las une en un string con espacio por medio
      palabras: generate(25).join(' '),
    }
  }
  reiniciar(){
    let words = generate(25).join(' ');
    this.setState({palabras: words});
  }
  render(){
  return (
    <div className='bg-black items-center h-screen w-screen flex justify-center'>
      <div className="w-8/12 h-8/12 relative">
      <h1 className="text-white font-bold text-5xl text-center mb-10">Typing Game ⌨️🎮 </h1><br />
        <Contador tiempoRestante={30}/>
        <ReinicioBoton reiniciar={this.reiniciar.bind(this)}/>
        <div className='relative mt-3 leading-relaxed break-all mb-10'>
          <GenerarPalabras words={this.state.palabras}/>
          <InputUsuario className='absolute inset' userInput={this.state.palabras}/>
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
//Tiempo para jugar
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
       <li>Aciertos:{props.aciertos}</li>
       <li>Errores:{props.errores}</li>
       <li>Escritos:{props.escritos}</li>
    </ul>
  )
}
// PARA LA ENTRADA DEL USUARIO
function InputUsuario({userInput}){
  //convierto la cadena de texto en un array de caracteres
  const entradaCaracteres = userInput.split("");
  //La reccoro y muestro cada caracter
  return(
    <div className='absolute inset-0'>
      {entradaCaracteres.map((caracter, clave)=>(
        <Caracter clave={caracter+'_'+clave} caracter={caracter}/> 
        ))}
    </div>
  )
}
function Caracter({caracter}){
  return(
    <span className="text-5xl text-white">{caracter}</span>
  )
}
export default App
