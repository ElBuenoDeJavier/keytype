import React from 'react';
// Componente que genera las palabras
function GenerarPalabras(props){
    return(
        <span className="bg-gradient-to-bl from-gray-600 break-all to-gray-500 bg-clip-text text-transparent leading-normal">{props.words}</span>
      )
}
export default GenerarPalabras;