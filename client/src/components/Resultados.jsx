import React from "react";

//Muestra los resultados de los aciertos, errores y caracteres escritos
function Resultados(props){
  //Lo muestra si el contador no esta iniciado y si se han escrito caracteres
    if(props.contador == false && props.escritos !== 0){
    return(
      <div className="text-center">
      <h1 className="flex justify-center fieldset-legend text-4xl font-extrabold bg-gradient-to-bl from-purple-500 to-indigo-800 bg-clip-text text-transparent leading-normal">Resultados</h1>
      <div className="stats shadow border-2 border-indigo-800 flex justify-center">
        <div className="stat place-items-center hover:bg-gray-900">
            <div className="stat-title">Puntuacion</div>
            <div className="stat-value">{Math.round(100*(props.aciertos/props.escritos))}</div>
            <div className="stat-desc">{
                Math.round(100*(props.aciertos/props.escritos)) == 100 ? "⭐⭐⭐⭐⭐":
                Math.round(100*(props.aciertos/props.escritos)) > 80 ? "⭐⭐⭐⭐":
                Math.round(100*(props.aciertos/props.escritos)) > 70 ? "⭐⭐⭐":
                "⭐⭐"
            }</div>
        </div>
        
        <div className="stat place-items-center hover:bg-green-800">
            <div className="stat-title">Aciertos</div>
            <div className="stat-value">{props.aciertos}</div>
        </div>
        
        <div className="stat place-items-center hover:bg-red-800">
            <div className="stat-title">Errores</div>
            <div className="stat-value">{props.errores}</div>
        </div>

        <div className="stat place-items-center hover:bg-gray-900">
            <div className="stat-title">Caracteres escritos</div>
            <div className="stat-value">{props.escritos}</div>
        </div>
      </div>
      <button onClick={()=>props.guardarEstadisticas()} className="mr-0.5 animate-bounce text-white text-2xl mt-5 px-5 py-2 rounded-full btn hover:bg-gray-800">
        Guardar estadísticas
        <svg class="h-8 w-8 text-indigo-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
        strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path 
        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />  <polyline points="17 21 17 13 7 13 7 21" />  <polyline points="7 3 7 8 15 8" /></svg>
      </button>
      <div className="flex justify-center mt-4">
      <svg onClick={()=>props.borrarEstadisticas()} class="h-8 w-8 text-red-400 hover:text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  
          strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
      </div>
      </div>
    )
    }
}
export default Resultados;