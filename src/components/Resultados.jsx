import React from "react";
//Muestra los resultados de los aciertos, errores y caracteres escritos
function Resultados(props){
  //Lo muestra si el contador no esta iniciado y si se han escrito caracteres
    if(props.contador == false && props.escritos !== 0){
    return(
      <div className="text-center">
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
      <button onClick={()=>props.guardarEstadisticas()} className="text-white text-2xl mt-5 px-5 py-2 rounded-full btn hover:bg-gray-800">Guardar estadísticas</button>
      </div>
    )
    }
}
export default Resultados;