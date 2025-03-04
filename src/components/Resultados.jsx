import React from "react";
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
export default Resultados;