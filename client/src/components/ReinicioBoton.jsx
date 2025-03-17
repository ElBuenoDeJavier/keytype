import React from "react";
function ReinicioBoton({reiniciar , contador}){
    if(contador == false){
    return(
      <button onClick={reiniciar} className="btn hover:bg-gray-700 tooltip" data-tip="Reiniciar por defecto">
        <svg className="h-8 w-8 text-indigo-600 hover:text-white" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  
      strokeLinejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
      </button>
    )
    }
}
export default ReinicioBoton;