import React from 'react'
import { generate } from './randomwords2/index'
const words = generate(25).join(' ');
function App() {
  return (
    <div className='bg-black items-center h-screen w-screen flex justify-center'>
      <div class="block w-8/12 h-8/12">
        <Contador tiempoRestante={30}/>
        <Reiniciar/>
      </div>
    </div>
  )
}
// Componente que genera las palabras
function GenerarPalabras(props){
  return(
      <p class="text-gray-700 text-5xl">{props.words}</p>
  )
}
//Tiempo para jugar
function Contador({tiempoRestante}){
  return(
    <h2 class="text-purple-800 text-5xl text-center">Tiempo: {tiempoRestante}</h2>
  )
}
export default App
