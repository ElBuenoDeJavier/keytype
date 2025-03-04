import React from "react";
//Muestra los resultados de los aciertos, errores y caracteres escritos
function Resultados(props){
    if(props.contador == false){
    return(
      <ul className='text-3xl text-gray-600 text-center mt-20'>
         <h2 className="text-indigo-800 text-3xl">Resultados:</h2>
         <li>Letras acertadas: {props.aciertos}</li>
         <li>Errores cometidos: {props.errores}</li>
         <li>Caracteres escritos: {props.escritos}</li>
      </ul>
    )
    }
}
export default Resultados;