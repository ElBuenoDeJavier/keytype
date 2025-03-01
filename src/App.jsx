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
      <div class="block w-8/12 h-8/12">
        <Contador tiempoRestante={30}/>
        <ReinicioBoton reiniciar={this.reiniciar.bind(this)}/>
        <GenerarPalabras words={this.state.palabras}/>
        
      </div>
    </div>
  )
  }
}
// Componente que genera las palabras
function GenerarPalabras(props){
  return(
    <div>
      <p class="text-gray-700 text-5xl">{props.words}</p>
    </div>
  )
}
//Tiempo para jugar
function Contador({tiempoRestante}){
  return(
    <h2 class="text-purple-800 text-5xl text-center">Tiempo: {tiempoRestante}</h2>
  )
}
function ReinicioBoton(props){
  return(
    <button onClick={props.reiniciar}>
      <svg class="h-8 w-8 text-purple-800 hover:text-purple-500" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  
    stroke-linejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
    </button>
  )
}
export default App
