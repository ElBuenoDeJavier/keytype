import React from 'react';
// Componente que genera las palabras
function GenerarPalabras(props){
    return(
        <span className="text-gray-700">{props.words}</span>
      )
}
export default GenerarPalabras;