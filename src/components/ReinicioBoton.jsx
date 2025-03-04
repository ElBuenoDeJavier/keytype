import React from "react";
function ReinicioBoton({reiniciar , contador}){
    if(contador == false){
    return(
      <button onClick={reiniciar}>
        <svg className="h-8 w-8 text-indigo-800 hover:text-indigo-600" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  
      strokeLinejoin="round">  <polyline points="1 4 1 10 7 10" />  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
      </button>
    )
    }
}
export default ReinicioBoton;