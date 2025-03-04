import React from 'react';
function Contador({tiempoRestante}){
    return(
      //Aqui muestro el tiempo restante
      <h2 className="text-indigo-800 text-4xl text-center">{tiempoRestante} s</h2>
    )  
}
export default Contador;